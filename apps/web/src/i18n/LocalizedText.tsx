import type { WebMessageKey } from "./messages";
import { useI18n } from "./WebI18nContext";
import { translateWebExtraSource } from "./webExtraMessages";

/** Application-owned JSX text only. Never pass model output, filenames or other user data. */
export function LocalizedText({
  source,
  messageKey,
}: {
  readonly source: string;
  readonly messageKey?: WebMessageKey;
}) {
  const { locale, t } = useI18n();
  const text = source.trim();
  const start = source.indexOf(text);
  return (
    source.slice(0, start) +
    (messageKey ? t(messageKey) : translateWebExtraSource(locale, text)) +
    source.slice(start + text.length)
  );
}
