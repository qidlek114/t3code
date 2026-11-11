import { traditionalUi } from "./locales/zh-TW.ts";

/** Only static UI templates enter this lookup; interpolated user values are appended afterwards. */
export function chineseText(locale: string, source: string): string {
  return locale === "zh-TW" && Object.hasOwn(traditionalUi, source)
    ? (traditionalUi[source] ?? source)
    : source;
}

export function chineseTemplate(locale: string) {
  return (parts: TemplateStringsArray, ...values: ReadonlyArray<unknown>): string =>
    parts.reduce(
      (result, part, index) =>
        result + chineseText(locale, part) + (index < values.length ? String(values[index]) : ""),
      "",
    );
}

export function traditionalMessages<T extends Readonly<Record<string, string>>>(
  messages: T,
): { readonly [K in keyof T]: string } {
  return Object.fromEntries(
    Object.entries(messages).map(([key, value]) => [key, chineseText("zh-TW", value)]),
  ) as { readonly [K in keyof T]: string };
}

export function hasTraditionalTranslation(source: string): boolean {
  return Object.hasOwn(traditionalUi, source);
}
