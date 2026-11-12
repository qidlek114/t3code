# T3 Code I18n

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

[![Localization checks](https://github.com/qidlek114/t3code/actions/workflows/localization-ci.yml/badge.svg?branch=localization)](https://github.com/qidlek114/t3code/actions/workflows/localization-ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)

[T3 Code](https://github.com/pingdotgg/t3code) 的社群多語言版本，為程式開發 Agent 提供開源圖形介面。使用你自己的服務供應商帳號，在本地化的桌面與網頁介面中工作。

**English · 简体中文 · 繁體中文 · 日本語 · 한국어**

[下載 macOS 版](https://github.com/qidlek114/t3code/releases) · [回報問題](https://github.com/qidlek114/t3code/issues/new/choose) · [官方專案](https://github.com/pingdotgg/t3code)

> [!WARNING]
> **非官方社群預覽版。本版本暫不支援 T3 Connect。** 本 fork 的獨立應用程式身分尚未獲得官方 T3 Connect 接入核准。介面中保留雲端功能入口不代表可用，請先閱讀下方限制。

## 安裝

1. 開啟本 fork 的 [Releases](https://github.com/qidlek114/t3code/releases)，選擇最新的**已公開預覽版**。以該 Release 列出的語言為準；原始碼新增語言不會改變已發布的安裝檔。
2. 下載適合這台 Mac 的 `.dmg`：**M 系列晶片選 `arm64`，Intel 晶片選 `x64`**。
3. 開啟磁碟映像，將 **T3 Code I18n** 拖入「應用程式」。簽署版本附有 Apple Developer ID 簽章、公證、ZIP 更新檔和 SHA-256 校驗檔。
4. 在執行伺服器的電腦上安裝並登入程式開發服務供應商。供應商訂閱與 API 用量費用和本專案分開。
5. 前往**設定 → 常規 → 語言**，選擇語言或跟隨系統。

本 fork 發布 macOS 安裝檔，暫不發布 Windows、Linux 與原生行動版。官方 Homebrew、npm、winget 指令安裝的是上游版本，而非本多語言版。DMG/ZIP 安裝檔可在 **Releases** 下載，不需要 GitHub **Packages**。

## 翻譯範圍

桌面與網頁介面、設定、原生桌面選單和應用程式提示共用語言偏好。日文、韓文是新增的預覽譯文，歡迎回報術語與表達問題。英文、簡體中文和繁體中文持續提供。

程式碼、專案名稱、路徑、聊天訊息、終端機輸出與模型回覆保持原樣。供應商命令列工具與外部網頁自行管理語言。帳號頁面完成翻譯，不代表對應雲端服務已接入。

## T3 Connect 功能限制

| 功能                                                                               | 本 fork 狀態                                                 |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| macOS 原生通行金鑰登入                                                             | 無法使用：獨立應用程式身分尚未與官方登入網域建立關聯。       |
| 瀏覽器 SSO / OAuth 返回本應用程式                                                  | 暫不支援：獨立回呼尚未核准，可能登入失敗或返回官方應用程式。 |
| 其他 T3 Connect 登入，包括電子郵件、密碼、驗證碼                                   | 尚未完成真實帳號驗收，不作為受支援的替代登入方式。           |
| 帳號綁定的雲端環境、透過 T3 Connect 跨裝置存取、官方託管通道                       | 本預覽版暫不支援。                                           |
| 透過上述通道使用 MCP、Relay Webhook、離線 Webhook 保留、T3 Chat 帳號綁定與相關額度 | 依賴雲端服務的流程暫不支援或尚未驗收。                       |
| 本機專案、本機供應商帳號、SSH / 區域網路 / Tailscale 直連                          | 不依賴 T3 Connect；仍需分別設定並完成驗證。                  |

介面暫時保留雲端功能入口。上表區分「尚未接入」與「尚未驗收」，並不表示每一項雲端流程都已實測失敗。請見[完整預覽版說明](../docs/user/localization-preview.md)與[官方接入申請](https://github.com/pingdotgg/t3code/discussions/34667)。

## 更新與共存

應用程式使用獨立身分與資料目錄，可與官方版共存。簽署版本的更新來源指向 **qidlek114/t3code**，不會使用覆蓋翻譯的官方安裝檔。**Pre-release** 是公開預覽版；**Draft** 是尚未公開的草稿，不會由自動更新發現。連續兩個公開版本之間的完整自動升級仍需驗收。

同步上游時保留官方提交歷史，通過檢查後，在 GitHub 託管 macOS runner 中建置、簽署與公證。官方新增文案與合併衝突仍需處理；官方發布不表示本 fork 立即同步發布。定期檢查上游更新需要主動啟用。請見[維護與發布指南](../docs/operations/localization-fork.md)。

## 回饋與開發

翻譯、安裝檔與 fork 特有問題請回報至[本倉庫 Issues](https://github.com/qidlek114/t3code/issues)。提供版本、語言、系統、重現步驟與必要截圖，並先移除帳號資訊、權杖和私人專案資料。翻譯修改請閱讀[本地化貢獻指南](localization-contributing.md)。

從原始碼執行：安裝 Vite+，執行 `vp install --frozen-lockfile`，再執行 `vp run dev --no-seed --home-dir /absolute/path/to/isolated-t3-home`。環境需求請見[開發指南](../docs/operations/development.md)。原生行動版與上游架構文件保留在 [docs](../docs/README.md)。

## 致謝與授權

基於 [pingdotgg/t3code](https://github.com/pingdotgg/t3code)，簡體中文整合參考了 [ZhiweiXiao98/t3code](https://github.com/ZhiweiXiao98/t3code)。本專案是獨立維護的社群 fork，不代表 T3 官方產品或認可。保留原作者著作權聲明與 [MIT 授權](../LICENSE)。
