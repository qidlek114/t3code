import type { AppLocalePreference } from "@t3tools/contracts";
import { resolveAppLocale, type ResolvedAppLocale } from "@t3tools/shared/appLocale";

export interface PreviewPromptMessages {
  readonly open: string;
  readonly cancel: string;
  readonly allow: string;
  readonly block: string;
  readonly openLink: (protocol: string) => string;
  readonly openLinkDetail: (url: string) => string;
  readonly clipboardRead: (origin: string) => string;
  readonly choosePasskey: string;
  readonly unnamedPasskey: string;
}

const messages = {
  ja: {
    open: "開く",
    cancel: "キャンセル",
    allow: "許可",
    block: "ブロック",
    openLink: (protocol) => `この ${protocol} リンクを開きますか？`,
    openLinkDetail: (url) => `ブラウザー内のページが別のアプリを開こうとしています：\n\n${url}`,
    clipboardRead: (origin) =>
      `${origin} がクリップボードのテキストと画像へのアクセスを求めています`,
    choosePasskey: "パスキーを選択",
    unnamedPasskey: "名前のないパスキー",
  },
  ko: {
    open: "열기",
    cancel: "취소",
    allow: "허용",
    block: "차단",
    openLink: (protocol) => `이 ${protocol} 링크를 여시겠습니까?`,
    openLinkDetail: (url) => `브라우저의 페이지에서 다른 앱을 열려고 합니다:\n\n${url}`,
    clipboardRead: (origin) => `${origin}에서 클립보드의 텍스트와 이미지에 접근하려고 합니다`,
    choosePasskey: "패스키 선택",
    unnamedPasskey: "이름 없는 패스키",
  },
  en: {
    open: "Open",
    cancel: "Cancel",
    allow: "Allow",
    block: "Block",
    openLink: (protocol) => `Open this ${protocol} link?`,
    openLinkDetail: (url) => `A page in the browser wants to open another application:\n\n${url}`,
    clipboardRead: (origin) => `${origin} wants to see text and images copied to the clipboard`,
    choosePasskey: "Choose a passkey",
    unnamedPasskey: "Unnamed passkey",
  },
  "zh-CN": {
    open: "打开",
    cancel: "取消",
    allow: "允许",
    block: "阻止",
    openLink: (protocol) => `要打开此 ${protocol} 链接吗？`,
    openLinkDetail: (url) => `浏览器中的网页想要打开另一个应用程序：\n\n${url}`,
    clipboardRead: (origin) => `${origin} 想要查看复制到剪贴板的文字和图片`,
    choosePasskey: "选择通行密钥",
    unnamedPasskey: "未命名的通行密钥",
  },
  "zh-TW": {
    open: "開啟",
    cancel: "取消",
    allow: "允許",
    block: "阻止",
    openLink: (protocol) => `要開啟此 ${protocol} 連結嗎？`,
    openLinkDetail: (url) => `瀏覽器中的網頁想要開啟另一個應用程式：\n\n${url}`,
    clipboardRead: (origin) => `${origin} 想要檢視複製到剪貼簿的文字和圖片`,
    choosePasskey: "選擇通行金鑰",
    unnamedPasskey: "未命名的通行金鑰",
  },
} satisfies Record<ResolvedAppLocale, PreviewPromptMessages>;

export function resolvePreviewPromptMessages(
  preference: AppLocalePreference,
  runtimeLocales: ReadonlyArray<string>,
): PreviewPromptMessages {
  return messages[resolveAppLocale(preference, runtimeLocales)];
}
