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

这个预览工作流生成未签名包，默认不公开发布，也不提供自动更新清单。macOS 可能阻止打开下载的未签名应用。

`Build signed multilingual Mac release` 只能从本 fork 的 `localization` 分支手动启动。它使用相同的两种 GitHub 托管 macOS runner，执行 Apple 签名、公证、签名身份校验、Gatekeeper 检查和合成会话启动测试，最后合并两种架构的更新清单并创建草稿预发布。凭据缺失或任一验证失败都会停止，不会回退到未签名包。

签名需要 Apple Developer 身份、Developer ID Application 证书及私钥、证书密码、用于公证的 App Store Connect API 凭据，以及启用了 Associated Domains 且与独立 bundle ID 匹配的 Developer ID provisioning profile。官方证书无法从开源仓库取得。

创建 GitHub Environment `macos-release`，部署分支策略只允许 `localization`，然后配置这些环境 Secrets：

| 名称                         | 内容                                      |
| ---------------------------- | ----------------------------------------- |
| `CSC_LINK`                   | 带私钥的加密 P12 文件的 Base64            |
| `CSC_KEY_PASSWORD`           | P12 密码                                  |
| `APPLE_API_KEY`              | 团队 App Store Connect API 私钥的 P8 内容 |
| `APPLE_API_KEY_ID`           | API Key ID                                |
| `APPLE_API_ISSUER`           | API Issuer ID                             |
| `MACOS_PROVISIONING_PROFILE` | Developer ID 描述文件的 Base64            |

同一环境添加变量 `APPLE_TEAM_ID`。私钥只在签名步骤注入，不写进源码、缓存或发布产物。签名工作流不监听 PR，也不接受其他分支的签名请求。维护者仍需审查合并到 `localization` 的构建代码及依赖。

签名版本采用官方支持的 `<基础版本>-nightly.<UTC日期>.<工作流运行号>` 格式。构建环境固定 `T3CODE_DESKTOP_UPDATE_REPOSITORY=qidlek114/t3code`，更新清单包含本 fork 的两种架构已签名 ZIP。草稿不会被自动更新发现。首个公开版本按预览版发布，明确披露 T3 Connect 尚未批准、相关功能暂不支持和首次自动升级尚未验收，详见[预览版限制](../user/localization-preview.md)。完整支持声明需要真实云登录验收，以及两个连续签名版本的更新、数据保留和签名一致性验证；不得直接更新到官方二进制，否则界面翻译会消失。

## 官方 T3 Connect

两种构建工作流都会把官方 `.env.example` 复制为一次性构建目录的 `.env`。其中只有官方明确公开的 Clerk publishable key、JWT template 名称、CLI OAuth client ID 和 relay URL，不使用官方后台私钥，也不另建云服务。配置必须在 web、server 和 desktop 编译之前载入。

应用内的 Clerk 登录和账号界面使用 `@clerk/localizations` 的三种语言包，与主界面共享语言偏好和系统语言订阅。`clerkLocalizations.ts` 补充当前语言包缺失的登录、通行密钥、多因素验证、个人资料和认证错误词条。独立浏览器打开的官方托管页面由官方管理，无法通过本地语言选项修改。

独立签名身份不会自动继承官方的域名关联。完整验收至少包括：

- 在独立应用中登录真实 T3 Connect 账号，读取该账号的环境列表，并验证远程连接。
- 原生通行密钥：官方 `clerk.t3.codes` 的 AASA `webcredentials.apps` 必须包含 `<APPLE_TEAM_ID>.com.qidlek114.t3code.i18n`；需要官方 Clerk 管理员添加。
- 系统浏览器 OAuth 回跳：当前 Clerk Electron SDK 把内部 renderer scheme 同时用作 OAuth callback。构建保留内部 `t3code://app`，但只在系统注册独立的 `t3code-i18n` 协议，因此不能把普通账号登录成功视为浏览器回跳也通过。完整独立回跳需官方允许 `t3code-i18n://app/` 和对应 origin 后，再同步调整 renderer scheme 及相关链接处理，并验证与官方应用共存。

这些配置由官方服务控制，fork 无法自行修改。打包、签名、公证和合成启动测试通过，不代表真实账号、通行密钥或 OAuth 已验收。

## 来源

官方基线：`pingdotgg/t3code`，提交 `3ed5fb29bd2ffdb31cf146f016300e26ca237f99`。

简体译文和显式界面翻译接入参考 [ZhiweiXiao98/t3code](https://github.com/ZhiweiXiao98/t3code/tree/3270444c64826f67c953c2816dd1fd8f10d87953)，保留原项目的 MIT 许可。没有整体合并其移动端、发布和基础设施改动。繁体初稿由 OpenCC 1.4.2（MIT AND Apache-2.0）辅助转换，并按界面用语调整；运行时不依赖 OpenCC，也不转换用户内容。今后译文可直接独立编辑。

云登录基础词条来自 Clerk 官方 `@clerk/localizations` 4.24.6（MIT）。缺失的简体账号词条参考其繁体版本，离线转换后补充安全提示；繁体缺失词条另行补齐。更新该依赖后应检查补充词条是否仍然需要，并运行账号词条与插值检查。
