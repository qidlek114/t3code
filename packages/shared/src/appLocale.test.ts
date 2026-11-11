import { describe, expect, it } from "vite-plus/test";

import { resolveAppLocale } from "./appLocale.ts";

describe("resolveAppLocale", () => {
  it("honors an explicit locale preference", () => {
    expect(resolveAppLocale("en", ["zh-CN"])).toBe("en");
    expect(resolveAppLocale("zh-CN", ["en-US"])).toBe("zh-CN");
    expect(resolveAppLocale("zh-TW", ["zh-CN"])).toBe("zh-TW");
  });

  it.each(["zh", "zh-CN", "zh-SG", "zh-Hans", "zh-Hans-CN"])(
    "resolves Simplified Chinese runtime locale %s",
    (runtimeLocale) => {
      expect(resolveAppLocale("system", [runtimeLocale])).toBe("zh-CN");
    },
  );

  it.each(["zh-TW", "zh-HK", "zh-MO", "zh-Hant", "zh-Hant-TW"])(
    "resolves Traditional Chinese runtime locale %s",
    (runtimeLocale) => {
      expect(resolveAppLocale("system", [runtimeLocale])).toBe("zh-TW");
    },
  );

  it("uses the first supported runtime locale", () => {
    expect(resolveAppLocale("system", ["fr-FR", "zh-CN", "en-US"])).toBe("zh-CN");
    expect(resolveAppLocale("system", ["fr-FR", "en-GB", "zh-CN"])).toBe("en");
  });

  it("keeps an explicit Traditional Chinese preference from falling through to bare Chinese", () => {
    expect(resolveAppLocale("system", ["zh-TW", "zh"])).toBe("zh-TW");
  });

  it("skips invalid tags and safely falls back to English", () => {
    expect(resolveAppLocale("system", ["not-a-valid-locale", "zh-CN"])).toBe("zh-CN");
    expect(resolveAppLocale("system", ["not-a-valid-locale", ""])).toBe("en");
    expect(resolveAppLocale("system", [])).toBe("en");
  });
});
