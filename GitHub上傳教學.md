# GitHub 專案上傳指令教學

本文件說明將地端專案上傳至 GitHub 的完整步驟與指令解析。

---

## 步驟一：設定遠端倉庫 (Connect to Remote)

首先必須告訴您的專案，它的「雲端倉庫」在哪裡。

```bash
git remote add origin https://github.com/liskyo/LM_MMS.git
```

*   **`git remote add`**: 新增一個遠端連線設定。
*   **`origin`**: 這是遠端倉庫的別名（慣例上都叫 origin），代表「原始來源」。
*   **`https://...`**: GitHub 倉庫的網址。

---

## 步驟二：加入檔案到暫存區 (Stage Files)

將您修改或新增的檔案加入 Git 的追蹤清單。

```bash
git add .
```

*   **`git add`**: 將檔案內容加入索引（暫存區），準備進行提交。
*   **`.`**: 代表「目前目錄下的所有檔案」。這會把新增、修改、刪除的變更全部加進去。

---

## 步驟三：提交變更版本 (Commit)

將暫存區的檔案正式記錄為一個「版本」。

```bash
git commit -m "docs: add PLC status optimization guide"
```

*   **`git commit`**: 建立一個新的提交版本。
*   **`-m "..."`**: 後面接的是「提交訊息 (Commit Message)」。這很重要，用來描述這次改動做了什麼。
    *   範例訊息的意思是：「文件：新增 PLC 狀態優化指南」。

---

## 步驟四：設定主分支名稱 (Rename Branch)

確保您的主分支名稱符合 GitHub 目前的主流規範（現在通常用 `main` 而非 `master`）。

```bash
git branch -M main
```

*   **`git branch`**: 分支操作指令。
*   **`-M`**: 強制重新命名目前的分支。
*   **`main`**: 新的分支名稱。

---

## 步驟五：推送到遠端 (Push to Cloud)

將您電腦上的提交版本，實際上傳到 GitHub 伺服器。

```bash
git push -u origin main
```

*   **`git push`**: 將本地端的提交推送到遠端。
*   **`-u` (或是 `--set-upstream`)**: 設定「上游追蹤」。這表示以後您只要打 `git push`，Git 就知道預設要推送到 `origin` 的 `main` 分支，不用每次都打完整指令。
*   **`origin main`**: 把本地的 `main` 分支，推送到遠端 (`origin`) 的 `main` 分支。

---

## 常見問題

### Q: 如果遠端已經有東西，推不上去怎麼辦？
如果 GitHub 上已經有檔案（例如 README），而本地端沒有，git push 會失敗。這時通常需要先「拉取 (Pull)」：
```bash
git pull origin main --allow-unrelated-histories
```
之後再手動解衝突並重新 push。

### Q: 如何確認目前連到哪裡？
```bash
git remote -v
```
這會顯示目前設定的遠端倉庫網址。
