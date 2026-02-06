export class Interlock {

  constructor(logger) {
    this.logger = logger

    this.timer  = {}
    this.active = {}

    this.alerts = []
  }

  GetAlert() {
    if (this.alerts.length <= 0)
      return null
    return this.alerts.shift()
  }

  createAlert(alertJson) {
    // console.log("================= [ ALERT ] =================")
    // console.log("[ LEVEL ]  ", alertJson.level)
    // console.log("[ NAME ]   ", alertJson.name)
    // console.log("[ MESSAGE ]", alertJson.message)
    // console.log("=============================================")
    let winstonLevel = alertJson.level
    if (winstonLevel === 'critical')
      winstonLevel = 'error'
    else if (winstonLevel === 'warning')
      winstonLevel = 'warn'
    this.logger.log({
      level:  (alertJson.level === 'critical') ? 'error' : alertJson.level,
      message: alertJson.message,
      name:    alertJson.name,
      type:   'interlock',
    })
    this.alerts.push(alertJson)
  }

  checkAndUpdateTimer(target, duration) {
    /**
     * RETURNS:
     *   isTriggered (boolean): Whether the alert rules are satisfied
     *   isActive (boolean): Whether the alert is activated
     */
    let isTriggered = false;
    let isActive = false;
  
    if (!this.timer[target]) {
      this.timer[target] = Date.now();
    } else {
      if (Date.now() - this.timer[target] > duration) {
        isActive = true;
        if (!this.active[target]) {
          isTriggered = true;
          this.active[target] = true;
        }
      }
    }
    return { isTriggered, isActive };
  }
  
  removeTimer(target) {
    /**
     * RETURNS:
     *   isRestored (boolean): Whether the alert has been triggered
     */
    let isRestored = false;
  
    if (this.timer[target]) {
      delete this.timer[target];
  
      if (this.active[target]) {
        delete this.active[target];
        isRestored = true;
      }
    }
    return isRestored;
  }

  checkEMO(values, level = 'critical', duration = 0) {
    /**
      錯誤碼:   403
      警報名稱: EMO觸發
      檢查條件: 無
      檢查內容: EMO被按下後，發送警報Critical
      持續時間: 0秒
    **/
    const name = "emo"
    let returnStatus = null

    let abnormal = false
    if (values.emo)
      abnormal = true

    if (!abnormal) {
      if (this.removeTimer(name)) {
        // remove alert and create restore information
        this.createAlert({
          level:   'info',
          name:    'EMO解除',
          message: '已恢復正常運作模式',
        })
      }
    }
    else {
      const { isTriggered, isActive } = this.checkAndUpdateTimer(name, duration)
      if (isTriggered) {
        // add alert and create alert information
        this.createAlert({
          level:   level,
          name:    'EMO觸發',
          message: '請評估情況並採取適當行動',
        })
      }
      if (isActive)
        returnStatus = level
    }

    return returnStatus
  }

  checkDoorLock(values, level = 'warning', duration = 0) {
    /**
      錯誤碼:   404
      警報名稱: 門鎖偵測
      檢查條件: 無
      檢查內容: 偵測維修門未關閉，發送警報Warning
      持續時間: 0秒
    **/
    const name = "doorLock"
    let returnStatus = null

    let abnormal = false
    if ((!values.door1Locked) || (!values.door2Locked))
      abnormal = true

    if (!abnormal) {
      if (this.removeTimer(name)) {
        // remove alert and create restore information
        this.createAlert({
          level:   'info',
          name:    '門鎖偵測解除',
          message: '已恢復正常運作模式',
        })
      }
    }
    else {
      const { isTriggered, isActive } = this.checkAndUpdateTimer(name, duration)
      if (isTriggered) {
        // add alert and create alert information
        this.createAlert({
          level:   level,
          name:    '門鎖偵測異常',
          message: '請確認維修門是否關閉',
        })
      }
      if (isActive)
        returnStatus = level
    }

    return returnStatus
  }

  checkRobotOverload(values, level = 'warning', duration = 0) {
    /**
      錯誤碼:   405
      警報名稱: Robot過載異常
      檢查條件: 無
      檢查內容: XYZ馬達過載訊號觸發，發送警報Warning
      持續時間: 0秒
    **/
    const name = "robotOverload"
    let returnStatus = null

    let abnormal = false
    if (values.robotOverload)
      abnormal = true

    if (!abnormal) {
      if (this.removeTimer(name)) {
        // remove alert and create restore information
        this.createAlert({
          level:   'info',
          name:    'Robot過載解除',
          message: '已恢復正常運作模式',
        })
      }
    }
    else {
      const { isTriggered, isActive } = this.checkAndUpdateTimer(name, duration)
      if (isTriggered) {
        // add alert and create alert information
        this.createAlert({
          level:   level,
          name:    'Robot過載異常',
          message: '請根據快速應變手冊排除',
        })
      }
      if (isActive)
        returnStatus = level
    }

    return returnStatus
  }

  checkRobotLoadAbnormal(values, level = 'warning', duration = 0) {
    /**
      錯誤碼:   406
      警報名稱: Robot負載異常
      檢查條件: 夾爪於開啟狀態
      檢查內容: 雷射測距無偵測到夾取物，發送警報Warning
      持續時間: 0秒
    **/
    const name = "robotLoadAbnormal"
    let returnStatus = null

    let abnormal = false
    if (values.robotLoadAbnormal)
      abnormal = true

    if (!abnormal) {
      if (this.removeTimer(name)) {
        // remove alert and create restore information
        this.createAlert({
          level:   'info',
          name:    'Robot負載異常解除',
          message: '已恢復正常運作模式',
        })
      }
    }
    else {
      const { isTriggered, isActive } = this.checkAndUpdateTimer(name, duration)
      if (isTriggered) {
        // add alert and create alert information
        this.createAlert({
          level:   level,
          name:    'Robot負載異常',
          message: '請確認手臂夾爪是否空抓',
        })
      }
      if (isActive)
        returnStatus = level
    }

    return returnStatus
  }

  checkAirtightAbnormal(values, level = 'warning', duration = 60) {
    /**
      錯誤碼:   407
      警報名稱: 上罩氣密異常
      檢查條件: 抽氣機啟動時
      檢查內容: 壓力小於-0.1kPa持續超過1分鐘，發送警報Warning
      持續時間: 0秒
    **/
    const name = "airtightAbnormal"
    let returnStatus = null

    let abnormal = false
    if (values.airPumpOpened && values.pressure < 0.1)
      abnormal = true

    if (!abnormal) {
      if (this.removeTimer(name)) {
        // remove alert and create restore information
        this.createAlert({
          level:   'info',
          name:    '上罩氣密恢復',
          message: '已恢復正常運作模式',
        })
      }
    }
    else {
      const { isTriggered, isActive } = this.checkAndUpdateTimer(name, duration)
      if (isTriggered) {
        // add alert and create alert information
        this.createAlert({
          level:   level,
          name:    '上罩氣密異常',
          message: '請確認對接是否完整',
        })
      }
      if (isActive)
        returnStatus = level
    }

    return returnStatus
  }

  checkLiquidTopLimit(values, level = 'warning', duration = 0) {
    /**
      錯誤碼:   408
      警報名稱: 冷卻液補液桶 上限液位異常
      檢查條件: 無
      檢查內容: 上限液位被觸發，發送警報Warning
      持續時間: 0秒
    **/
    const name = "liquidTopLimit"
    let returnStatus = null

    let abnormal = false
    if (values.liquidTopLimit)
      abnormal = true

    if (!abnormal) {
      if (this.removeTimer(name)) {
        // remove alert and create restore information
        this.createAlert({
          level:   'info',
          name:    '補液桶液位恢復',
          message: '已恢復正常運作模式',
        })
      }
    }
    else {
      const { isTriggered, isActive } = this.checkAndUpdateTimer(name, duration)
      if (isTriggered) {
        // add alert and create alert information
        this.createAlert({
          level:   level,
          name:    '補液桶液位超過上限',
          message: '請檢查補液桶液位',
        })
      }
      if (isActive)
        returnStatus = level
    }

    return returnStatus
  }

  checkLiquidBottomLimit(values, level = 'warning', duration = 0) {
    /**
      錯誤碼:   409
      警報名稱: 冷卻液補液桶 下限液位異常
      檢查條件: 無
      檢查內容: 下限液位未觸發，發送警報Warning
      持續時間: 0秒
    **/
    const name = "liquidBottomLimit"
    let returnStatus = null

    let abnormal = false
    if (!values.liquidBottomLimit)
      abnormal = true

    if (!abnormal) {
      if (this.removeTimer(name)) {
        // remove alert and create restore information
        this.createAlert({
          level:   'info',
          name:    '補液桶液位恢復',
          message: '已恢復正常運作模式',
        })
      }
    }
    else {
      const { isTriggered, isActive } = this.checkAndUpdateTimer(name, duration)
      if (isTriggered) {
        // add alert and create alert information
        this.createAlert({
          level:   level,
          name:    '補液桶液位低於下限',
          message: '請補充氟化液至補液桶',
        })
      }
      if (isActive)
        returnStatus = level
    }

    return returnStatus
  }

  checkLiquidLeak(values, level = 'critical', duration = 0) {
    /**
      錯誤碼:   410
      警報名稱: 漏液偵測
      檢查條件: 無
      檢查內容: 漏液Sensor被觸發，發送警報Critical
      持續時間: 0秒
    **/
    const name = "liquidLeak"
    let returnStatus = null

    const abnormal = values.liquidLeak;   // 直接看漏液線圈

    if (!abnormal) {
      if (this.removeTimer(name)) {
        // remove alert and create restore information
        this.createAlert({
          level:   'info',
          name:    '漏液偵測解除',
          message: '已恢復正常運作模式',
        })
      }
    }
    else {
      const { isTriggered, isActive } = this.checkAndUpdateTimer(name, duration)
      if (isTriggered) {
        // add alert and create alert information
        this.createAlert({
          level:   level,
          name:    '漏液偵測異常',
          message: '請排除漏液情況後再操作機台',
        })
      }
      if (isActive)
        returnStatus = level
    }

    return returnStatus
  }

  checkAirPumpOverload(values, level = 'warning', duration = 0) {
    /**
      錯誤碼:   411
      警報名稱: 抽氣機 電源過載異常
      檢查條件: 無
      檢查內容: 抽氣機過載被觸發，發送警報Warning
      持續時間: 0秒
    **/
    const name = "airPumpOverload"
    let returnStatus = null

    let abnormal = false
    if (values.airPumpOverload)
      abnormal = true

    if (!abnormal) {
      if (this.removeTimer(name)) {
        // remove alert and create restore information
        this.createAlert({
          level:   'info',
          name:    '抽氣機過載解除',
          message: '已恢復正常運作模式',
        })
      }
    }
    else {
      const { isTriggered, isActive } = this.checkAndUpdateTimer(name, duration)
      if (isTriggered) {
        // add alert and create alert information
        this.createAlert({
          level:   level,
          name:    '抽氣機過載異常',
          message: '請排除情況後再操作機台',
        })
      }
      if (isActive)
        returnStatus = level
    }

    return returnStatus
  }

  checkLiquidLineAbnormal(values, level = 'warning', duration = 60) {
    /**
      錯誤碼:   412
      警報名稱: 補液管路異常
      檢查條件: 幫浦開啟且電磁閥開啟
      檢查內容: 流量小於等於0，發送警報Warning
      持續時間: 0秒
    **/
    const name = "liquidLineAbnormal"
    let returnStatus = null

    let abnormal = false
    if (values.liquidPumpOpened && values.liquidOutletSwitchOpened && values.liquidFlow <= 0)
      abnormal = true

    if (!abnormal) {
      if (this.removeTimer(name)) {
        // remove alert and create restore information
        this.createAlert({
          level:   'info',
          name:    '補液管路恢復',
          message: '已恢復正常運作模式',
        })
      }
    }
    else {
      const { isTriggered, isActive } = this.checkAndUpdateTimer(name, duration)
      if (isTriggered) {
        // add alert and create alert information
        this.createAlert({
          level:   level,
          name:    '補液管路異常',
          message: '請排除情況後再操作機台',
        })
      }
      if (isActive)
        returnStatus = level
    }

    return returnStatus
  }

  checkTankCoverOpenedAbnormal(values, level = 'warning', duration = 60) {
    /**
      錯誤碼:   414
      警報名稱: TANK上蓋開啟異常
      檢查條件: 無
      檢查內容: 流量小於等於0，發送警報Warning
      持續時間: 0秒
    **/
    const name = "tankCoverOpenedAbnormal"
    let returnStatus = null

    let abnormal = false
    if ((!values.door1Locked) || (!values.door2Locked))
      abnormal = true

    if (!abnormal) {
      if (this.removeTimer(name)) {
        // remove alert and create restore information
        this.createAlert({
          level:   'info',
          name:    '門鎖偵測解除',
          message: '已恢復正常運作模式',
        })
      }
    }
    else {
      const { isTriggered, isActive } = this.checkAndUpdateTimer(name, duration)
      if (isTriggered) {
        // add alert and create alert information
        this.createAlert({
          level:   level,
          name:    '門鎖偵測異常',
          message: '請確認維修門是否關閉',
        })
      }
      if (isActive)
        returnStatus = level
    }

    return returnStatus
  }

  checkTankCoverClosedAbnormal(values, level = 'warning', duration = 60) {
    /**
      錯誤碼:   414
      警報名稱: TANK上蓋開啟異常
      檢查條件: 無
      檢查內容: 流量小於等於0，發送警報Warning
      持續時間: 0秒
    **/
    const name = "tankCoverClosedAbnormal"
    let returnStatus = null

    let abnormal = false
    if ((!values.door1Locked) || (!values.door2Locked))
      abnormal = true

    if (!abnormal) {
      if (this.removeTimer(name)) {
        // remove alert and create restore information
        this.createAlert({
          level:   'info',
          name:    '門鎖偵測解除',
          message: '已恢復正常運作模式',
        })
      }
    }
    else {
      const { isTriggered, isActive } = this.checkAndUpdateTimer(name, duration)
      if (isTriggered) {
        // add alert and create alert information
        this.createAlert({
          level:   level,
          name:    '門鎖偵測異常',
          message: '請確認維修門是否關閉',
        })
      }
      if (isActive)
        returnStatus = level
    }

    return returnStatus
  }

  Check(values) {
    this.checkEMO(values)
    this.checkDoorLock(values)
    this.checkRobotOverload(values)
    this.checkRobotLoadAbnormal(values)
    this.checkAirtightAbnormal(values)
    this.checkLiquidTopLimit(values)
    this.checkLiquidBottomLimit(values)
    this.checkLiquidLeak(values)
    this.checkAirPumpOverload(values)
    this.checkLiquidLineAbnormal(values)
    // this.checkTankCoverOpenedAbnormal(values)
    // this.checkTankCoverClosedAbnormal(values)
  }
}
