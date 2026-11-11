import { resolveAppLocale } from "@t3tools/shared/appLocale";
import { useSyncExternalStore } from "react";

import { useClientSettings } from "../hooks/useSettings";
import { readRuntimeLocales } from "./readRuntimeLocales";

function subscribeRuntimeLocale(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener("languagechange", onChange);
  return () => window.removeEventListener("languagechange", onChange);
}

function readSystemLocale() {
  return resolveAppLocale("system", readRuntimeLocales());
}

function readServerLocale() {
  return "en" as const;
}

// Clerk lives above WebI18nProvider; both subscribe to the same client preference.
export function useAppLocale() {
  const appLocale = useClientSettings((settings) => settings.appLocale);
  const runtimeLocale = useSyncExternalStore(
    subscribeRuntimeLocale,
    readSystemLocale,
    readServerLocale,
  );
  return { appLocale, locale: resolveAppLocale(appLocale, [runtimeLocale]) };
}
