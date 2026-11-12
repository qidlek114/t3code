import { traditionalUi } from "./locales/zh-TW.ts";
import { japaneseUi } from "./locales/ja.ts";
import { koreanUi } from "./locales/ko.ts";
import { sourceOverrides } from "./locales/sourceOverrides.ts";

const catalogs: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  "zh-TW": traditionalUi,
  ja: japaneseUi,
  ko: koreanUi,
};

/** Only static UI templates enter this lookup; interpolated user values are appended afterwards. */
export function chineseText(locale: string, source: string): string {
  const catalog = catalogs[locale];
  return catalog && Object.hasOwn(catalog, source) ? (catalog[source] ?? source) : source;
}

export function chineseTemplate(locale: string) {
  return (parts: TemplateStringsArray, ...values: ReadonlyArray<unknown>): string => {
    const source = parts
      .map((part, index) => part + (index < values.length ? `{${index}}` : ""))
      .join("");
    const translated = chineseText(locale, source);
    if (translated !== source) {
      return translated.replace(/\{(\d+)\}/g, (placeholder, index: string) =>
        Number(index) < values.length ? String(values[Number(index)]) : placeholder,
      );
    }
    return parts.reduce(
      (result, part, index) =>
        result + chineseText(locale, part) + (index < values.length ? String(values[index]) : ""),
      "",
    );
  };
}

export function localizedMessages<T extends Readonly<Record<string, string>>>(
  locale: string,
  messages: T,
  englishMessages?: Readonly<Record<string, string>>,
): { readonly [K in keyof T]: string } {
  return Object.fromEntries(
    Object.entries(messages).map(([key, value]) => [
      key,
      translateEnglishUi(locale, englishMessages?.[key] ?? "") ?? chineseText(locale, value),
    ]),
  ) as { readonly [K in keyof T]: string };
}

export function translateEnglishUi(locale: string, source: string): string | undefined {
  const catalog = sourceOverrides[locale];
  return catalog && Object.hasOwn(catalog, source) ? catalog[source] : undefined;
}

export function traditionalMessages<T extends Readonly<Record<string, string>>>(
  messages: T,
): { readonly [K in keyof T]: string } {
  return localizedMessages("zh-TW", messages);
}

export function hasTraditionalTranslation(source: string): boolean {
  return Object.hasOwn(traditionalUi, source);
}

export function hasUiTranslation(locale: string, source: string): boolean {
  const catalog = catalogs[locale];
  return catalog !== undefined && Object.hasOwn(catalog, source);
}
