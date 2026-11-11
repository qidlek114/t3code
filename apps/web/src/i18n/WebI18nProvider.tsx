import type { AppLocalePreference } from "@t3tools/contracts/settings";
import { type ReactNode, useEffect } from "react";

import { updateClientSettings } from "../hooks/useSettings";
import { useAppLocale } from "./useAppLocale";
import { translateWebMessage } from "./messages";
import { WebI18nContext, type WebI18nContextValue, type WebTranslate } from "./WebI18nContext";

export function WebI18nProvider({ children }: { readonly children: ReactNode }) {
  const { appLocale, locale } = useAppLocale();

  // oxlint-disable-next-line t3code/no-unreasoned-state-sync -- Synchronize the document language used by screen readers and browser translation with the selected UI locale.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setAppLocale = (nextLocale: AppLocalePreference) =>
    updateClientSettings({ appLocale: nextLocale });
  const t: WebTranslate = (key, values) => translateWebMessage(locale, key, values);
  const value: WebI18nContextValue = { appLocale, locale, setAppLocale, t };

  return <WebI18nContext value={value}>{children}</WebI18nContext>;
}
