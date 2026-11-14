const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { stableVersion, assertStableSource } = require("./localization-stable-release.cjs");

const release = {
  tag_name: "v0.1.9",
  draft: false,
  prerelease: false,
  published_at: "2026-11-11T11:33:49Z",
};

test("requires a published stable release, including metadata flags", () => {
  assert.equal(stableVersion(release), "0.1.9");
  for (const invalid of [
    { ...release, draft: true },
    { ...release, prerelease: true },
    { ...release, prerelease: undefined },
    { ...release, published_at: null },
    { ...release, published_at: "invalid" },
    ...["v0.1.10-nightly.20261114.4682", "v0.1.9-preview.1", "v0.1.9-rc.1", "v01.1.9", "main"].map(
      (tag_name) => ({ ...release, tag_name }),
    ),
  ]) {
    assert.throws(() => stableVersion(invalid), /Only a published official stable release/);
  }
});

test("checks actual upstream ancestry, including forks already ahead of stable", (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "localization-stable-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const git = (...args) =>
    execFileSync(
      "git",
      [
        "-c",
        "user.name=Release test",
        "-c",
        "user.email=release-test@example.invalid",
        "-c",
        "commit.gpgsign=false",
        "-c",
        "core.hooksPath=/dev/null",
        ...args,
      ],
      { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    ).trim();
  const commit = (message) => {
    git("commit", "--allow-empty", "-m", message);
    return git("rev-parse", "HEAD");
  };
  git("init", "--initial-branch=main");
  const old = commit("Previous official source");
  const stable = commit("Official stable source");
  git("update-ref", "refs/remotes/upstream/stable", stable);
  const nightly = commit("Unreleased official source");
  git("update-ref", "refs/remotes/upstream/main", nightly);
  git("checkout", "-b", "localization", old);
  commit("Fork translations");
  fs.mkdirSync(path.join(root, "apps/desktop"), { recursive: true });
  const packageFile = path.join(root, "apps/desktop/package.json");
  fs.writeFileSync(packageFile, JSON.stringify({ version: "0.1.9" }));

  assert.throws(() => assertStableSource(release, root), /does not match official v0.1.9/);
  git("merge", "--no-edit", stable);
  assert.equal(assertStableSource(release, root), "0.1.9");
  fs.writeFileSync(packageFile, JSON.stringify({ version: "0.1.10" }));
  assert.throws(() => assertStableSource(release, root), /Desktop version/);
  fs.writeFileSync(packageFile, JSON.stringify({ version: "0.1.9" }));

  git("merge", "--no-edit", nightly);
  assert.throws(() => assertStableSource(release, root), /does not match official v0.1.9/);
  fs.writeFileSync(path.join(root, ".git/shallow"), `${git("rev-parse", "HEAD")}\n`);
  assert.throws(() => assertStableSource(release, root), /requires complete commit history/);
});
