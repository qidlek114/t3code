# 多语言 fork 的维护与发布

本分支提供 English、简体中文和繁體中文，语言选项位于设置中，支持跟随系统。语言偏好保存在客户端，不修改远程环境的语言、项目文件、提示词或模型输出。

## 同步官方源码

`upstream` 指向 `pingdotgg/t3code`，`origin` 指向 `qidlek114/t3code`。保留官方提交历史，在 `localization` 上合并上游；不要把本分支重置为官方分支。官方大幅改动界面时仍可能有合并冲突，新文案也需要补译。

```sh
git fetch upstream --tags
git switch localization
git switch -c sync/upstream-<版本>
git merge <官方 tag 或 upstream/main>
vp install --frozen-lockfile
vp run check:changed upstream/main
node .github/scripts/localization-build.cjs
```

合并冲突应同时保留官方新行为和本地翻译。不要整文件选择旧中文分支覆盖官方文件。检查通过、完成界面验收后再合并回 `localization`。

`Sync official source` 工作流检查官方最新稳定 Release，创建保留历史的合并分支及草稿 PR，并显式触发 `Localization checks`。遇到冲突会失败退出，不会改写 `localization`。默认不自动定时运行；启用步骤：

1. 将这些工作流放到 fork 的默认分支，保留 `localization` 为产品分支。
2. 在 GitHub Actions 设置中允许工作流创建 PR，并启用 fork 的 Actions。
3. 将仓库变量 `LOCALIZATION_AUTO_SYNC` 设置为 `true`。每六小时检查一次，也可手动运行。

同步并不意味着可以直接发布。官方的 Release 事件不会自动触发 fork 的工作流，且官方安装包不包含本 fork 的翻译。

## 翻译维护

主要词条在 `apps/web/src/i18n/messages.ts`；繁体文案在 `packages/shared/src/locales/zh-TW.ts`；原生菜单和权限提示词条在 `apps/desktop/src/*/*Messages.ts`。繁体使用台湾地区用语，香港、澳门和 `zh-Hant` 系统语言也会选择这一版本。

新增文案应增加词条，以参数插值传入项目名、路径和服务器输出。禁止对整个 DOM、聊天消息、终端输出或插值后的字符串做简繁转换。`chineseTemplate(locale)` 只转换模板的静态片段，动态参数原样保留。

已加入三语言切换、系统语言识别、占位符一致性、繁体词条完整性和用户值保持不变的检查。未知文案保留英文，避免显示空白；这些检查不能代替新功能的翻译审校。模型输出、第三方网站、提供商 CLI 的原始错误和网页内容不属于界面翻译。

## 独立环境

开发时明确关闭真实数据复制，并指定本任务的数据目录：

```sh
vp run dev --no-seed --home-dir /absolute/path/to/isolated-t3-home
```

不要使用 `~/.t3/userdata`。使用仓库自带的 Replay 开发提供商和合成测试数据。不要把个人凭据或生产数据库提交到仓库。

发布工作流在一次性构建目录运行 `.github/scripts/localization-build.cjs --apply`，生成以下独立标识：

| 项目              | 测试版                        |
| ----------------- | ----------------------------- |
| 应用名称          | T3 Code I18n                  |
| macOS bundle ID   | com.qidlek114.t3code.i18n     |
| 默认 T3 数据目录  | ~/.t3-i18n                    |
| Electron 资料目录 | t3code-i18n-v2                |
| 系统注册链接协议  | t3code-i18n / t3code-i18n-dev |

不要在维护源码的 checkout 直接使用 `--apply`；先运行不带参数的预检查，实际修改仅用于可丢弃的构建 checkout。任一上游结构变化都会让预检查失败，防止失去隔离。测试包的官方深链接跳转和云端通行密钥登录需要另行验收。

## macOS 构建、签名与 Releases

`Build multilingual Mac preview` 使用 GitHub 托管的 `macos-15`（Apple Silicon）和 `macos-15-intel` 构建两种架构，不需要部署自托管 runner。流程依次执行变更检查、独立标识预检查、DMG/ZIP 打包及合成会话启动测试；两种架构都通过后才创建草稿预发布，并附上 SHA-256 校验值。

目前工作流只生成未签名预览版，默认不公开发布，也不提供自动更新清单。macOS 可能阻止打开下载的未签名应用。先验收草稿中的包，再决定公开发布；不要把未验证的包设为稳定更新。

正式发布需要你的 Apple Developer 身份、Developer ID Application 证书及私钥、证书密码、用于公证的 App Store Connect API 凭据，以及与独立 bundle ID 匹配的 provisioning profile。官方证书无法从开源仓库取得。配置应遵循官方 `release-desktop.yml` 中的签名步骤，凭据存入 GitHub Actions Secrets；切勿提交到 Git。

正式更新的构建环境须设置 `T3CODE_DESKTOP_UPDATE_REPOSITORY=qidlek114/t3code`，并发布本 fork 的已签名 ZIP 和更新清单。先用两个连续测试版本验证更新、数据保留和签名一致性，再启用自动发布。不得直接更新到官方二进制，否则界面翻译会消失。

## 来源

官方基线：`pingdotgg/t3code`，提交 `3ed5fb29bd2ffdb31cf146f016300e26ca237f99`。

简体译文和显式界面翻译接入参考 [ZhiweiXiao98/t3code](https://github.com/ZhiweiXiao98/t3code/tree/3270444c64826f67c953c2816dd1fd8f10d87953)，保留原项目的 MIT 许可。没有整体合并其移动端、发布和基础设施改动。繁体初稿由 OpenCC 1.4.2（MIT AND Apache-2.0）辅助转换，并按界面用语调整；运行时不依赖 OpenCC，也不转换用户内容。今后译文可直接独立编辑。
