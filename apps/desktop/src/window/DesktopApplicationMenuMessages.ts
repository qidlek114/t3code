import type { AppLocalePreference } from "@t3tools/contracts";
import { resolveAppLocale, type ResolvedAppLocale } from "@t3tools/shared/appLocale";

export interface DesktopApplicationMenuMessages {
  readonly file: string;
  readonly edit: string;
  readonly view: string;
  readonly window: string;
  readonly help: string;
  readonly settings: string;
  readonly checkForUpdates: string;
  readonly about: (appName: string) => string;
  readonly services: string;
  readonly hide: (appName: string) => string;
  readonly hideOthers: string;
  readonly showAll: string;
  readonly open: (appName: string) => string;
  readonly quit: (appName: string) => string;
  readonly closeWindow: string;
  readonly undo: string;
  readonly redo: string;
  readonly cut: string;
  readonly copy: string;
  readonly copyLink: string;
  readonly copyEmailAddress: string;
  readonly copyImage: string;
  readonly noSpellingSuggestions: string;
  readonly paste: string;
  readonly pasteAndMatchStyle: string;
  readonly pasteAsText: string;
  readonly speech: string;
  readonly startSpeaking: string;
  readonly stopSpeaking: string;
  readonly delete: string;
  readonly selectAll: string;
  readonly reload: string;
  readonly forceReload: string;
  readonly toggleDeveloperTools: string;
  readonly toggleFullScreen: string;
  readonly minimize: string;
  readonly zoomWindow: string;
  readonly bringAllToFront: string;
  readonly actualSize: string;
  readonly zoomIn: string;
  readonly zoomOut: string;
  readonly ok: string;
  readonly upToDateTitle: string;
  readonly upToDateMessage: (version: string) => string;
  readonly updateCheckFailedTitle: string;
  readonly updateCheckFailedMessage: string;
  readonly unknownUpdateError: string;
  readonly updatesUnavailableTitle: string;
  readonly updatesUnavailableMessage: string;
}

const messages = {
  ja: {
    file: "ファイル",
    edit: "編集",
    view: "表示",
    window: "ウインドウ",
    help: "ヘルプ",
    settings: "設定...",
    checkForUpdates: "アップデートを確認...",
    services: "サービス",
    hideOthers: "ほかを非表示",
    showAll: "すべて表示",
    closeWindow: "ウインドウを閉じる",
    undo: "取り消す",
    redo: "やり直す",
    cut: "切り取る",
    copy: "コピー",
    copyLink: "リンクをコピー",
    copyEmailAddress: "メールアドレスをコピー",
    copyImage: "画像をコピー",
    noSpellingSuggestions: "候補なし",
    paste: "ペースト",
    pasteAndMatchStyle: "ペーストしてスタイルを合わせる",
    pasteAsText: "標準テキストとしてペースト",
    speech: "スピーチ",
    startSpeaking: "読み上げを開始",
    stopSpeaking: "読み上げを停止",
    delete: "削除",
    selectAll: "すべて選択",
    reload: "再読み込み",
    forceReload: "強制再読み込み",
    toggleDeveloperTools: "開発者ツールを切り替える",
    toggleFullScreen: "フルスクリーンを切り替える",
    minimize: "しまう",
    zoomWindow: "拡大／縮小",
    bringAllToFront: "すべてを手前に移動",
    actualSize: "実際のサイズ",
    zoomIn: "拡大",
    zoomOut: "縮小",
    ok: "OK",
    upToDateTitle: "最新バージョンです",
    updateCheckFailedTitle: "アップデートを確認できませんでした",
    updateCheckFailedMessage: "アップデートを確認できませんでした。",
    unknownUpdateError: "不明なエラーが発生しました。しばらくしてから再試行してください。",
    updatesUnavailableTitle: "アップデートを利用できません",
    updatesUnavailableMessage: "現在、自動アップデートを利用できません。",
    about: (appName) => `${appName} について`,
    hide: (appName) => `${appName} を非表示`,
    open: (appName) => `${appName} を開く`,
    quit: (appName) => `${appName} を終了`,
    upToDateMessage: (version) => `T3 Code ${version} は現在の最新バージョンです。`,
  },
  ko: {
    file: "파일",
    edit: "편집",
    view: "보기",
    window: "윈도우",
    help: "도움말",
    settings: "설정...",
    checkForUpdates: "업데이트 확인...",
    services: "서비스",
    hideOthers: "다른 항목 가리기",
    showAll: "모두 보기",
    closeWindow: "윈도우 닫기",
    undo: "실행 취소",
    redo: "다시 실행",
    cut: "오려두기",
    copy: "복사",
    copyLink: "링크 복사",
    copyEmailAddress: "이메일 주소 복사",
    copyImage: "이미지 복사",
    noSpellingSuggestions: "제안 없음",
    paste: "붙여넣기",
    pasteAndMatchStyle: "붙여넣고 스타일 일치",
    pasteAsText: "일반 텍스트로 붙여넣기",
    speech: "말하기",
    startSpeaking: "말하기 시작",
    stopSpeaking: "말하기 중단",
    delete: "삭제",
    selectAll: "모두 선택",
    reload: "새로 고침",
    forceReload: "강제로 새로 고침",
    toggleDeveloperTools: "개발자 도구 전환",
    toggleFullScreen: "전체 화면 전환",
    minimize: "최소화",
    zoomWindow: "확대/축소",
    bringAllToFront: "모두 앞으로 가져오기",
    actualSize: "실제 크기",
    zoomIn: "확대",
    zoomOut: "축소",
    ok: "확인",
    upToDateTitle: "최신 버전입니다",
    updateCheckFailedTitle: "업데이트 확인 실패",
    updateCheckFailedMessage: "업데이트를 확인할 수 없습니다.",
    unknownUpdateError: "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도하세요.",
    updatesUnavailableTitle: "업데이트를 사용할 수 없음",
    updatesUnavailableMessage: "현재 자동 업데이트를 사용할 수 없습니다.",
    about: (appName) => `${appName} 정보`,
    hide: (appName) => `${appName} 가리기`,
    open: (appName) => `${appName} 열기`,
    quit: (appName) => `${appName} 종료`,
    upToDateMessage: (version) => `T3 Code ${version}은(는) 현재 최신 버전입니다.`,
  },
  en: {
    file: "File",
    edit: "Edit",
    view: "View",
    window: "Window",
    help: "Help",
    settings: "Settings...",
    checkForUpdates: "Check for Updates...",
    about: (appName) => `About ${appName}`,
    services: "Services",
    hide: (appName) => `Hide ${appName}`,
    hideOthers: "Hide Others",
    showAll: "Show All",
    open: (appName) => `Open ${appName}`,
    quit: (appName) => `Quit ${appName}`,
    closeWindow: "Close Window",
    undo: "Undo",
    redo: "Redo",
    cut: "Cut",
    copy: "Copy",
    copyLink: "Copy Link",
    copyEmailAddress: "Copy Email Address",
    copyImage: "Copy Image",
    noSpellingSuggestions: "No suggestions",
    paste: "Paste",
    pasteAndMatchStyle: "Paste and Match Style",
    pasteAsText: "Paste as Text",
    speech: "Speech",
    startSpeaking: "Start Speaking",
    stopSpeaking: "Stop Speaking",
    delete: "Delete",
    selectAll: "Select All",
    reload: "Reload",
    forceReload: "Force Reload",
    toggleDeveloperTools: "Toggle Developer Tools",
    toggleFullScreen: "Toggle Full Screen",
    minimize: "Minimize",
    zoomWindow: "Zoom",
    bringAllToFront: "Bring All to Front",
    actualSize: "Actual Size",
    zoomIn: "Zoom In",
    zoomOut: "Zoom Out",
    ok: "OK",
    upToDateTitle: "You're up to date!",
    upToDateMessage: (version) => `T3 Code ${version} is currently the newest version available.`,
    updateCheckFailedTitle: "Update check failed",
    updateCheckFailedMessage: "Could not check for updates.",
    unknownUpdateError: "An unknown error occurred. Please try again later.",
    updatesUnavailableTitle: "Updates unavailable",
    updatesUnavailableMessage: "Automatic updates are not available right now.",
  },
  "zh-CN": {
    file: "文件",
    edit: "编辑",
    view: "视图",
    window: "窗口",
    help: "帮助",
    settings: "设置...",
    checkForUpdates: "检查更新...",
    about: (appName) => `关于 ${appName}`,
    services: "服务",
    hide: (appName) => `隐藏 ${appName}`,
    hideOthers: "隐藏其他应用",
    showAll: "全部显示",
    open: (appName) => `打开 ${appName}`,
    quit: (appName) => `退出 ${appName}`,
    closeWindow: "关闭窗口",
    undo: "撤销",
    redo: "重做",
    cut: "剪切",
    copy: "复制",
    copyLink: "复制链接",
    copyEmailAddress: "复制电子邮箱地址",
    copyImage: "复制图片",
    noSpellingSuggestions: "无拼写建议",
    paste: "粘贴",
    pasteAndMatchStyle: "粘贴并匹配样式",
    pasteAsText: "粘贴为纯文本",
    speech: "语音",
    startSpeaking: "开始朗读",
    stopSpeaking: "停止朗读",
    delete: "删除",
    selectAll: "全选",
    reload: "重新加载",
    forceReload: "强制重新加载",
    toggleDeveloperTools: "切换开发者工具",
    toggleFullScreen: "切换全屏",
    minimize: "最小化",
    zoomWindow: "缩放",
    bringAllToFront: "全部置于最前",
    actualSize: "实际大小",
    zoomIn: "放大",
    zoomOut: "缩小",
    ok: "确定",
    upToDateTitle: "已是最新版本",
    upToDateMessage: (version) => `T3 Code ${version} 当前已是最新版本。`,
    updateCheckFailedTitle: "检查更新失败",
    updateCheckFailedMessage: "无法检查更新。",
    unknownUpdateError: "发生未知错误，请稍后重试。",
    updatesUnavailableTitle: "暂时无法更新",
    updatesUnavailableMessage: "目前无法使用自动更新。",
  },
  "zh-TW": {
    file: "檔案",
    edit: "編輯",
    view: "檢視",
    window: "視窗",
    help: "幫助",
    settings: "設定...",
    checkForUpdates: "檢查更新...",
    about: (appName) => `關於 ${appName}`,
    services: "服務",
    hide: (appName) => `隱藏 ${appName}`,
    hideOthers: "隱藏其他應用",
    showAll: "全部顯示",
    open: (appName) => `開啟 ${appName}`,
    quit: (appName) => `退出 ${appName}`,
    closeWindow: "關閉視窗",
    undo: "撤銷",
    redo: "重做",
    cut: "剪下",
    copy: "複製",
    copyLink: "複製連結",
    copyEmailAddress: "複製電子郵箱地址",
    copyImage: "複製圖片",
    noSpellingSuggestions: "無拼寫建議",
    paste: "貼上",
    pasteAndMatchStyle: "貼上並匹配樣式",
    pasteAsText: "貼上為純文本",
    speech: "語音",
    startSpeaking: "開始朗讀",
    stopSpeaking: "停止朗讀",
    delete: "刪除",
    selectAll: "全選",
    reload: "重新載入",
    forceReload: "強制重新載入",
    toggleDeveloperTools: "切換開發者工具",
    toggleFullScreen: "切換全屏",
    minimize: "最小化",
    zoomWindow: "縮放",
    bringAllToFront: "全部置於最前",
    actualSize: "實際大小",
    zoomIn: "放大",
    zoomOut: "縮小",
    ok: "確定",
    upToDateTitle: "已是最新版本",
    upToDateMessage: (version) => `T3 Code ${version} 當前已是最新版本。`,
    updateCheckFailedTitle: "檢查更新失敗",
    updateCheckFailedMessage: "無法檢查更新。",
    unknownUpdateError: "發生未知錯誤，請稍後重試。",
    updatesUnavailableTitle: "暫時無法更新",
    updatesUnavailableMessage: "目前無法使用自動更新。",
  },
} satisfies Record<ResolvedAppLocale, DesktopApplicationMenuMessages>;

export function resolveDesktopApplicationMenuMessages(
  preference: AppLocalePreference,
  runtimeLocales: ReadonlyArray<string>,
): DesktopApplicationMenuMessages {
  return messages[resolveAppLocale(preference, runtimeLocales)];
}
