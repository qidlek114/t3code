import type { ResolvedAppLocale } from "@t3tools/shared/appLocale";
import { useI18n } from "~/i18n/WebI18nContext";
import { useSourceTranslation } from "~/i18n/useSourceTranslation";
import { LocalizedText } from "~/i18n/LocalizedText";
import type { EnvironmentSpeechStatus } from "@t3tools/contracts";
import { effectiveSpeechLanguage } from "@t3tools/shared/speech";
import { updateClientSettings, useClientSettings } from "../../hooks/useSettings";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "../ui/select";

const languageNames = {
  en: new Intl.DisplayNames(["en"], { type: "language" }),
  "zh-CN": new Intl.DisplayNames(["zh-CN"], { type: "language" }),
  "zh-TW": new Intl.DisplayNames(["zh-TW"], { type: "language" }),
  ja: new Intl.DisplayNames(["ja"], { type: "language" }),
  ko: new Intl.DisplayNames(["ko"], { type: "language" }),
};
export const languageLabel = (code: string, locale: ResolvedAppLocale = "en") =>
  languageNames[locale].of(code) ?? code;

type ModelLanguages = Pick<
  Extract<EnvironmentSpeechStatus, { supported: true }>,
  "languages" | "supportsLanguageDetection"
>;

export function SpeechLanguageSelect({ model }: { readonly model: ModelLanguages | null }) {
  const localizeUi = useSourceTranslation();
  const { locale, t } = useI18n();

  const preference = useClientSettings((settings) => settings.speechLanguage);
  const languages = model?.languages ?? [];
  const resolved = model
    ? effectiveSpeechLanguage(
        { languages, supportsLanguageDetection: model.supportsLanguageDetection ?? false },
        preference,
      )
    : preference;
  const effectiveLabel =
    resolved === "auto" ? localizeUi("Auto-detect") : languageLabel(resolved, locale);
  const unavailable =
    preference !== "auto" && preference !== resolved
      ? t("localization.voice.unavailable", { language: languageLabel(preference, locale) })
      : null;
  const label = unavailable
    ? `${effectiveLabel} (${unavailable})`
    : preference === "auto" && resolved !== "auto"
      ? t("localization.voice.auto", { language: effectiveLabel })
      : effectiveLabel;
  return (
    <Select
      value={preference}
      disabled={!model}
      onValueChange={(value) => {
        if (value) void updateClientSettings({ speechLanguage: value });
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label={localizeUi("Transcription language")}
        className="max-w-64"
      >
        <SelectValue>{label}</SelectValue>
      </SelectTrigger>
      <SelectPopup align="end" alignItemWithTrigger={false}>
        <SelectItem value="auto">
          <LocalizedText source={"Auto"} />
        </SelectItem>
        {unavailable ? (
          <SelectItem value={preference} disabled>
            {unavailable}
          </SelectItem>
        ) : null}
        {languages
          .toSorted((left, right) =>
            languageLabel(left, locale).localeCompare(languageLabel(right, locale), locale),
          )
          .map((code) => (
            <SelectItem key={code} value={code}>
              {languageLabel(code, locale)}
            </SelectItem>
          ))}
      </SelectPopup>
    </Select>
  );
}
