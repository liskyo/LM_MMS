# 高效能 PLC 狀態同步機制說明

本文件說明如何實作 **「後端合併讀取 + 差異比對 + 主動推播」** 機制，以最低效能消耗達成即時 UI 更新。

---

## 核心概念

傳統做法是前端定時詢問 (Polling)，這會造成大量的 IPC 與 Modbus 通訊浪費。優化後的流程如下：

1.  **合併讀取 (Batch Read)**：
    *   **問題**：原本分開讀取 Tank (301-318) 和 MM (341-358) 需要兩次 Modbus 指令。
    *   **解法**：一次讀取 **60 個點** (從 301 到 360)，涵蓋所有需要的區段。這減少了一半的 PLC 通訊次數。

2.  **差異比對 (Diffing)**：
    *   **問題**：PLC 狀態 99% 的時間是不變的，一直送資料給前端是浪費。
    *   **解法**：在後端記錄「上次狀態」。只有當**新讀到的狀態與上次不同**時，才視為有效變更。

3.  **主動推播 (Push)**：
    *   **問題**：前端不知道何時有變更，只能一直問。
    *   **解法**：後端 (`entrypoint.js`) 透過 `webContents.send` 主動發送事件。前端只需被動監聽 (Listen)。

---

## 實作步驟

### 1. 修改 `src/electron/modules.js`

在 `GPIO` 類別中新增快取變數與合併掃描函式。

```javascript
// src/electron/modules.js

export class GPIO {
  constructor(logger) {
    // ...
    // [新增] 用於記錄上次狀態
    this.lastSlotsState = { tank: [], mm: [] }
  }

  // [新增] 高效率掃描並比對
  async ScanAllSlots() {
    try {
      // 一次讀取 301~360 (共60個點)，涵蓋 Tank(301開頭) 與 MM(341開頭)
      const response = await this.client.readCoils(301, 60)
      const bits = response.response.body.valuesAsArray.map(value => Boolean(value))

      if (bits.length >= 58) {
        // 切割數據：Tank (前18個), MM (第40個開始的18個)
        const currentTank = bits.slice(0, 18)
        const currentMM = bits.slice(40, 58)

        // 比對差異 (轉字串比對最快)
        const isChanged = 
          JSON.stringify(currentTank) !== JSON.stringify(this.lastSlotsState.tank) || 
          JSON.stringify(currentMM) !== JSON.stringify(this.lastSlotsState.mm)

        if (isChanged) {
          // 更新快取
          this.lastSlotsState = { tank: currentTank, mm: currentMM }
          // 回傳變更
          return { changed: true, data: this.lastSlotsState }
        }
      }
    } catch (error) {
      this.logger.log('error', `ScanAllSlots failed: ${error}`, { type: 'modules'})
    }
    return { changed: false }
  }
}
```

### 2. 修改 `src/background.js`

將 `BrowserWindow` 物件傳遞給 `mainFunction`，讓後端有能力發送訊息給視窗。

```javascript
// src/background.js

async function createWindow() {
  // [移動] 原本在上面的 mainFunction 移下來
  
  const win = new BrowserWindow({ ... })

  // [修改] 將 win 傳入 mainFunction
  mainFunction(isDevelopment, app, ipcMain, win) 
}
```

### 3. 修改 `src/electron/entrypoint.js`

在主要迴圈中加入掃描邏輯。

```javascript
// src/electron/entrypoint.js

// [修改] 接收 win 參數
export const mainFunction = (isDevelopment, app, ipcMain, win) => {
  // ...
  
  setInterval(async () => {
    // 原有的 Loop
    const values = await gpio.Loop()
    if (values) interlock.Check(values)

    // [新增] 只有變更時才推播，極度節省資源
    const slotsResult = await gpio.ScanAllSlots()
    if (slotsResult.changed && win && !win.isDestroyed()) {
      win.webContents.send('main/slots-update', slotsResult.data)
    }
  }, 100)
}
```

### 4. 前端 Vue 實作 (`MainFunction.vue` & `DockServer.vue`)

這兩個檔案是主要顯示槽位狀態的 UI 元件。主要修改內容為將 `setInterval` 移除，改為監聽 IPC 事件。

**修改重點：**
1.  **移除 Polling**：註解掉原本每 500ms 呼叫一次 `getMMSlots()` 的計時器。
2.  **新增監聽**：在 `mounted` 新增 `ipcRenderer.on`。
3.  **移除監聽**：在 `beforeDestroy` 新增 `ipcRenderer.removeListener`。
4.  **共用邏輯**：兩個元件都使用相同的 `main/slots-update` 事件源。

```javascript
// src/components/MainFunction.vue & src/components/DockServer.vue

mounted() {
  // [移除] 舊的輪詢
  // this.timer = setInterval(() => { this.getMMSlots() }, 500)

  // [新增] 監聽事件
  ipcRenderer.on('main/slots-update', this.onSlotsUpdate)
},
beforeDestroy() {
  // [新增] 移除監聽
  ipcRenderer.removeListener('main/slots-update', this.onSlotsUpdate)
}
```

---

## 測試與驗證

為了在沒有真實硬體的環境下驗證邏輯，專案中新增了一個獨立測試腳本。

### 新增 `test_logic_standalone.js`

此腳本模擬了 `modules.js` 中的核心邏輯，驗證以下場景：
1.  **初始掃描**：確認第一次讀取會觸發 `Changed=true`。
2.  **無變動**：確認數值未變時回傳 `Changed=false`。
3.  **狀態變動**：模擬 Modbus 回傳值改變，確認能偵測到差異。
4.  **恢復穩態**：再次讀取新值，確認不再重複觸發。

**執行方式：**
```bash
node test_logic_standalone.js
```

---

## 修改檔案清單總整

本次優化共涉及以下檔案：

| 檔案路徑 | 分類 | 說明 |
| :--- | :--- | :--- |
| `src/electron/modules.js` | **核心讀取邏輯** | 新增 `ScanAllSlots`，用於合併讀取與實作差異比對。 |
| `src/background.js` | **視窗傳遞** | 將 `BrowserWindow` 實例傳給 `mainFunction`，開啟推播能力。 |
| `src/electron/entrypoint.js` | **推播迴圈** | 在主迴圈呼叫 `ScanAllSlots`，若有變動則透過 `win.webContents` 推播。 |
| `src/components/MainFunction.vue` | **前端監聽** | 主畫面 UI，接收並更新 Tank 與 MMS 槽位顯示。 |
| `src/components/DockServer.vue` | **前端監聽** | Dock 伺服器 UI，接收並更新對應的槽位顯示。 |
| `test_logic_standalone.js` | **測試腳本** | 獨立的 Node.js 腳本，用於驗證後端邏輯正確性。 |

