const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

function stableVersion(release) {
  if (
    release?.draft !== false ||
    release.prerelease !== false ||
    !release.published_at ||
    !Number.isFinite(Date.parse(release.published_at)) ||
    !/^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(release.tag_name)
  ) {
    throw new Error("Only a published official stable release with a vX.Y.Z tag is allowed.");
  }
  return release.tag_name.slice(1);
}

function assertStableSource(release, root) {
  const version = stableVersion(release);
  const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
  if (git("rev-parse", "--is-shallow-repository") !== "false") {
    throw new Error("Stable source verification requires complete commit history.");
  }
  const stable = git("rev-parse", "refs/remotes/upstream/stable^{commit}");
  const base = git("merge-base", "--all", "HEAD", "refs/remotes/upstream/main");
  // Including the stable tag is insufficient: a fork may already include newer nightly code.
  if (base !== stable) {
    throw new Error(
      `Fork upstream base ${base} does not match official ${release.tag_name} (${stable}). Sync an official stable release before building.`,
    );
  }
  const desktop = JSON.parse(fs.readFileSync(path.join(root, "apps/desktop/package.json"), "utf8"));
  if (desktop.version !== version) {
    throw new Error(
      `Desktop version ${desktop.version} does not match official ${release.tag_name}.`,
    );
  }
  return version;
}

module.exports = { stableVersion, assertStableSource };

if (require.main === module) {
  const [mode, releaseFile] = process.argv.slice(2);
  if (!releaseFile || !["metadata", "source"].includes(mode)) {
    throw new Error("Usage: localization-stable-release.cjs <metadata|source> <release.json>");
  }
  const release = JSON.parse(fs.readFileSync(releaseFile, "utf8"));
  console.log(
    mode === "source"
      ? assertStableSource(release, path.resolve(__dirname, "../.."))
      : stableVersion(release),
  );
}
