import { chineseText } from "@t3tools/shared/chineseUi";
import type { ResolvedAppLocale } from "@t3tools/shared/appLocale";

export function welcomePrivacyClause(
  locale: ResolvedAppLocale,
  telemetryDisabled: boolean,
): string {
  if (locale !== "en")
    return telemetryDisabled
      ? chineseText(locale, "请参阅")
      : chineseText(locale, "如需退出，请参阅");
  return telemetryDisabled ? "See the" : "To opt out, see the";
}
