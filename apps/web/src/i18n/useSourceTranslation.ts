import { useI18n } from "./WebI18nContext";
import { translateWebExtraSource } from "./webExtraMessages";

/** Translate application-owned strings, including labels in native HTML attributes. */
export function useSourceTranslation() {
  const { locale } = useI18n();
  return (source: string): string => translateWebExtraSource(locale, source);
}
