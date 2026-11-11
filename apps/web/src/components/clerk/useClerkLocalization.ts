import { useAppLocale } from "../../i18n/useAppLocale";
import { clerkLocalizations } from "./clerkLocalizations";

export function useClerkLocalization() {
  return clerkLocalizations[useAppLocale().locale];
}
