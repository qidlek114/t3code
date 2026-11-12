import { useI18n } from "../i18n/WebI18nContext";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "./ui/select";

export function LanguageSelect() {
  const { appLocale, setAppLocale, t } = useI18n();
  const labels = {
    system: t("settings.language.system"),
    en: "English",
    "zh-CN": "简体中文",
    "zh-TW": "繁體中文",
    ja: "日本語",
    ko: "한국어",
  };

  return (
    <Select
      value={appLocale}
      onValueChange={(value) => {
        if (
          value === "system" ||
          value === "en" ||
          value === "zh-CN" ||
          value === "zh-TW" ||
          value === "ja" ||
          value === "ko"
        )
          setAppLocale(value);
      }}
    >
      <SelectTrigger size="sm" aria-label={t("settings.language.label")}>
        <SelectValue>{labels[appLocale]}</SelectValue>
      </SelectTrigger>
      <SelectPopup align="end" alignItemWithTrigger={false}>
        <SelectItem value="system">{labels.system}</SelectItem>
        <SelectItem value="en" lang="en">
          {labels.en}
        </SelectItem>
        <SelectItem value="zh-CN" lang="zh-CN">
          {labels["zh-CN"]}
        </SelectItem>
        <SelectItem value="zh-TW" lang="zh-TW">
          {labels["zh-TW"]}
        </SelectItem>
        <SelectItem value="ja" lang="ja">
          {labels.ja}
        </SelectItem>
        <SelectItem value="ko" lang="ko">
          {labels.ko}
        </SelectItem>
      </SelectPopup>
    </Select>
  );
}
