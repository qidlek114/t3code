// Build-only identity changes keep the fork separate from the official install.
// Apply only in a disposable build checkout, after checking the source branch.
const fs = require("node:fs");
const path = require("node:path");

const replacements = {
  "apps/desktop/package.json": [
    ['"productName": "T3 Code (Beta)"', '"productName": "T3 Code I18n"'],
  ],
  "apps/desktop/src/app/DesktopStatePaths.ts": [
    ['input.homeDirectory, ".t3"', 'input.homeDirectory, ".t3-i18n"'],
  ],
  "apps/desktop/src/app/DesktopEnvironment.ts": [
    ['const APP_BASE_NAME = "T3 Code"', 'const APP_BASE_NAME = "T3 Code I18n"'],
  ],
  "apps/desktop/src/app/DesktopUserData.ts": [
    [
      'current: "t3code-dev", legacy: "T3 Code (Dev)"',
      'current: "t3code-i18n-dev", legacy: "T3 Code I18n (Dev)"',
    ],
    [
      'current: "t3code-v2", legacy: "T3 Code (Alpha)"',
      'current: "t3code-i18n-v2", legacy: "T3 Code I18n (Alpha)"',
    ],
    [
      'input.appDataDirectory, "t3code", "Local State"',
      'input.appDataDirectory, "t3code-i18n", "Local State"',
    ],
  ],
  "scripts/build-desktop-artifact.ts": [
    [
      'const DESKTOP_APP_ID = "com.t3tools.t3code"',
      'const DESKTOP_APP_ID = "com.qidlek114.t3code.i18n"',
    ],
    [
      'DESKTOP_ELECTRON_LANGUAGES = ["en-US"]',
      'DESKTOP_ELECTRON_LANGUAGES = ["en-US", "zh-CN", "zh-TW"]',
    ],
    ['? "T3 Code (Nightly)"', '? "T3 Code I18n (Nightly)"'],
    [
      'artifactName: "T3-Code-${version}-${arch}.${ext}"',
      'artifactName: "T3-Code-I18n-${version}-${arch}.${ext}"',
    ],
    // Keep the internal renderer origin compatible, but do not register the
    // preview package as an OS handler for the official app's deep links.
    ['schemes: ["t3code", "t3code-dev"]', 'schemes: ["t3code-i18n", "t3code-i18n-dev"]'],
  ],
};

function prepare(root, apply = false) {
  const pending = [];
  for (const [file, edits] of Object.entries(replacements)) {
    let source = fs.readFileSync(path.join(root, file), "utf8");
    for (const [before, after] of edits) {
      const expected = before.startsWith("schemes:") ? 2 : 1;
      if (source.split(before).length !== expected + 1) {
        throw new Error(
          `Upstream build layout changed: ${file}. Review isolation before releasing.`,
        );
      }
      source = source.replaceAll(before, after);
    }
    pending.push([file, source]);
  }
  // Validate every file before writing any of them.
  if (apply) for (const [file, source] of pending) fs.writeFileSync(path.join(root, file), source);
  return pending;
}

module.exports = { prepare };
if (require.main === module) {
  const root = path.resolve(__dirname, "../..");
  const apply = process.argv.includes("--apply");
  const files = prepare(root, apply);
  console.log(
    `${apply ? "Prepared" : "Verified"} isolated fork identity in ${files.length} files.`,
  );
}
