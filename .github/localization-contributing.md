# Contributing translations to T3 Code I18n

This guide applies to `qidlek114/t3code`. Contributions to the official project follow its own [contribution rules](https://github.com/pingdotgg/t3code/blob/main/CONTRIBUTING.md).

Report translation and packaging problems in [this fork's Issues](https://github.com/qidlek114/t3code/issues/new/choose), in English, 简体中文, 繁體中文, 日本語 or 한국어. Include the release version, selected language, location, current wording and suggested wording. Remove private content from screenshots. Native-speaker review of Japanese and Korean preview copy is especially welcome.

## Editing a translation

- Shared interface messages are in `apps/web/src/i18n/messages.ts`. Japanese and Korean catalogs are in `packages/shared/src/locales/ja.ts` and `ko.ts`; Traditional Chinese is in `zh-TW.ts`.
- The Chinese source strings are compatibility keys for the existing localization layer. Change the translated value, preserving its key. The English source overrides distinguish controls such as **Off** and **Close** that share a Chinese translation.
- Keep identifiers inside `{name}` placeholders unchanged. Numeric placeholders such as `{0}` represent complete, opaque user values; reorder them to produce a natural sentence, never translate their contents. Keep commands, URLs, paths and product names intact.
- Native desktop menus, permission prompts and startup recovery messages have their own small catalogs. Dates and calendars use the selected locale.
- Translate application-owned interface text only. Do not translate chat content, terminal output, project names, provider responses or the entire DOM.

Japanese and Korean catalogs were seeded with a local [M2M100 translation model](https://huggingface.co/facebook/m2m100_418M), then corrected for common controls, core settings, terminology and parameterized templates. They are preview translations, not a claim of exhaustive native-speaker review. There is no runtime translation request, model download or added translation service dependency in the app.

## Verify

Use isolated state as described in the [maintenance guide](../docs/operations/localization-fork.md). Run the focused localization tests and `vp run check:changed` before pushing. Check that language switching persists, native menus follow the selection, and opaque values survive interpolation. Inspect the affected screen in a real client, including narrow layouts and long text.

## Keeping the homepage current

GitHub displays `.github/README.md` before the root README. Keep its four sibling translations in sync when installation, language support or limitations change. Root `README.md` retains upstream documentation so routine upstream documentation changes need less conflict resolution. Link downloads and fork-specific support to this fork; do not imply official cloud approval or redirect multilingual users to official binaries.
