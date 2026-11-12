# T3 Code I18n

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

[![Localization checks](https://github.com/qidlek114/t3code/actions/workflows/localization-ci.yml/badge.svg?branch=localization)](https://github.com/qidlek114/t3code/actions/workflows/localization-ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)

A community multilingual edition of [T3 Code](https://github.com/pingdotgg/t3code), the open-source interface for coding agents. Use your own provider accounts with a localized desktop and web interface.

**English · 简体中文 · 繁體中文 · 日本語 · 한국어**

[Download for macOS](https://github.com/qidlek114/t3code/releases) · [Report a problem](https://github.com/qidlek114/t3code/issues/new/choose) · [Upstream project](https://github.com/pingdotgg/t3code)

> [!WARNING]
> **Unofficial community preview. T3 Connect is not supported in this release.** This fork's independent app identity has not received official T3 Connect approval. A visible cloud entry point does not mean the feature works. See the limitations below before installing.

## Install

1. Open this fork's [Releases](https://github.com/qidlek114/t3code/releases) and choose the newest **published** preview. Read that release's language list; existing downloads do not gain new languages when source code changes.
2. Download the `.dmg` for your Mac: **`arm64` for Apple Silicon (M-series)** or **`x64` for Intel**.
3. Open the disk image and drag **T3 Code I18n** to Applications. Signed releases include Apple Developer ID signing and notarization, ZIP updates and SHA-256 checksums.
4. Configure and sign in to a supported coding provider on the computer running the server. Provider subscriptions and API usage are separate from this project.
5. Open **Settings → General → Language**. Choose a language or follow your system setting.

This fork publishes macOS installers. Windows, Linux and native mobile builds are not distributed here. Official Homebrew, npm and winget commands install the upstream edition, not this multilingual fork. GitHub **Packages** is not required for DMG/ZIP downloads; installers live in **Releases**.

## What is localized?

The desktop/web interface, settings, native desktop menus and application-owned prompts share the language preference. Japanese and Korean are new preview translations; terminology feedback is welcome. Existing English and both Chinese variants remain available.

Your source code, project names, paths, messages, terminal output and model responses remain unchanged. Provider CLIs and external websites manage their own languages. Translating an account screen does not enable the cloud service behind it.

## T3 Connect limitations

| Feature                                                                                                                  | Status in this fork                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Native macOS passkey sign-in                                                                                             | Unavailable: the independent app identity is not associated with the official login domain.            |
| Browser SSO / OAuth return to this app                                                                                   | Unsupported: the independent callback is not approved; sign-in may fail or return to the official app. |
| Other T3 Connect account sign-in, including email/password/verification codes                                            | Not accepted with a real account; not offered as a supported workaround.                               |
| Account-linked cloud environments, cross-device access through T3 Connect, official managed tunnels                      | Unsupported in this preview.                                                                           |
| MCP access through those tunnels, Relay Webhooks and offline webhook holding, T3 Chat account linking and related quotas | Dependent cloud workflows are unsupported or unverified.                                               |
| Local projects, local provider accounts, direct SSH / LAN / Tailscale connections                                        | Do not require T3 Connect; each connection still needs its own authentication and setup.               |

The cloud entry points remain in the interface. This table distinguishes missing integration from flows that have not been accepted; it does not claim every cloud flow was tested and failed. Read the [detailed preview limitations](../docs/user/localization-preview.md) and [official integration request](https://github.com/pingdotgg/t3code/discussions/34667).

## Updates and coexistence

The app has its own identity and data directories and can coexist with the official app. Signed update metadata points to **qidlek114/t3code**, not official binaries that would remove the translations. **Pre-release** is a public preview; **Draft** is unpublished and is not offered by the updater. An end-to-end upgrade between consecutive public versions still needs acceptance.

Upstream changes are merged with their history preserved, checked, then built and signed on GitHub-hosted macOS runners. New upstream text and merge conflicts still need review; an upstream release does not instantly produce a fork release. Scheduled upstream checking is opt-in. See the [maintenance and release guide](../docs/operations/localization-fork.md).

## Feedback and development

Please report translation, packaging and fork-specific problems in [this repository's Issues](https://github.com/qidlek114/t3code/issues). Include the release version, language, OS and steps; a screenshot is useful. Remove account details, tokens and private project data first. Use [the localization contribution guide](localization-contributing.md) for translation changes.

For source builds, install Vite+ and run `vp install --frozen-lockfile`, then `vp run dev --no-seed --home-dir /absolute/path/to/isolated-t3-home`. The [development guide](../docs/operations/development.md) covers prerequisites. Native mobile and upstream architecture documentation remain in [docs](../docs/README.md).

## Credits and license

Based on [pingdotgg/t3code](https://github.com/pingdotgg/t3code), with Simplified Chinese integration informed by [ZhiweiXiao98/t3code](https://github.com/ZhiweiXiao98/t3code). This is an independently maintained community fork, not an official T3 product or endorsement. Original copyright notices and the [MIT license](../LICENSE) are retained.
