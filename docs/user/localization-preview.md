# T3 Code I18n 预览版

这是社区维护的 T3 Code 多语言 fork，提供 English、简体中文和繁體中文，可在设置中切换或跟随系统。本版本不是官方发行版，也不代表官方认可或提供支持。

## 安装

从[本 fork 的 Releases](https://github.com/qidlek114/t3code/releases)下载对应架构的已签名、公证 DMG：Apple Silicon（M 系列）使用 `arm64`，Intel Mac 使用 `x64`。打开 DMG，将 T3 Code I18n 应用拖到 Applications。ZIP 用于解压安装和更新，`SHA256SUMS.txt` 可校验下载文件。

应用具有独立名称和数据目录，可与官方 T3 Code 共存。首次打开不会自动迁移官方应用的会话和设置。已有 Codex、Claude 等提供商仍需要各自完成安装和登录。

## T3 Connect 暂不支持

**本 fork 尚未获得官方 T3 Connect 对独立应用身份的接入批准，因此本预览版暂不提供 T3 Connect 使用支持。** 申请见[官方讨论 #34667](https://github.com/pingdotgg/t3code/discussions/34667)。Apple 签名、公证通过不等于官方云服务已批准接入。

| 功能                                                                            | 本预览版状态及具体限制                                                                                     |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| macOS 原生通行密钥注册和登录                                                    | 不可用：官方登录域名尚未关联本 fork 的 Apple Team ID 与 Bundle ID。                                        |
| 系统浏览器中的 Apple、Google、GitHub、Microsoft 等 SSO 登录并返回本应用         | 不支持：独立回调地址尚未获准。当前回跳可能无法返回本应用，或打开已安装的官方应用，请勿依赖此路径。         |
| 邮箱、密码或邮件验证码登录 T3 Connect                                           | 未完成真实账号验收，不作为可用功能提供。不能因为登录界面能够打开，就视为已经接入成功。                     |
| 通过 T3 Connect 账号查看、注册、绑定和连接云端环境                              | 暂不支持：依赖上述账号登录及环境授权，未完成端到端验收。                                                   |
| 从官方网页或手机应用经 T3 Connect 访问此 fork 的环境                            | 暂不支持：官方云账号关联、托管隧道和跨设备访问尚未验收。这里指经 T3 Connect 的连接，不包括自行配置的直连。 |
| 官方托管的公网隧道、依赖该隧道的共享地址和远程 MCP 接入                         | 暂不支持：需要有效的 T3 Connect 关联和云端授权。                                                           |
| 经官方 Relay 转发 Webhook，以及环境离线时暂存 Webhook                           | 暂不支持：这些路径依赖 T3 Connect 托管的环境连接。本地或直接访问环境的 Webhook 不在此限制内。              |
| 在本 fork 中绑定 T3 Chat 账号以提高 T3 Connect 隧道额度，以及管理云端账号或设备 | 暂不支持：依赖官方账号链路，未完成验收。                                                                   |

“暂不支持”是本预览版的支持范围，并不表示以上每条路径都已实际测试失败。当前仍保留上游的云端配置和部分入口，方便后续接入；请不要通过这些入口判断功能已经可用，也不要依赖它们开展工作。官方批准后仍需完成回调配置及真实账号测试，再在后续版本宣布开放。

## 不依赖 T3 Connect 的功能

本地项目、会话、终端、Git 和工作树，以及通过本地 Codex、Claude 等提供商执行任务，不依赖 T3 Connect 账号。提供商自己的 ChatGPT、Claude 或 API 登录与 T3 Connect 是不同的认证路径。

SSH、局域网地址和 Tailscale HTTPS 直连也不需要 T3 Connect；仍需自行配置网络、环境和配对权限。保留这些上游能力不代表每种网络、提供商及真实账号组合都已在本预览版逐项验收。

## 翻译与更新范围

本次补全设置中的通知、新任务、快照、工作树、Tailscale、源码管理、版本状态及相关选项文案。模型回复、终端输出、项目文件、第三方网页和提供商的原始错误保留原文。官方后续新增界面仍可能出现需要补译的英文。

应用更新源指向 `qidlek114/t3code`，不安装官方二进制；官方二进制不包含本 fork 的翻译。维护者会在本 fork 合并官方源码、验证并发布自己的安装包。首个公开预览版没有已验证的“上一公开版本自动升级”路径；遇到更新问题可手动下载新版 DMG。

## English: unavailable and unverified cloud features

This is a community multilingual preview, not an official T3 Code distribution. Approval for the fork's independent macOS identity is [pending](https://github.com/pingdotgg/t3code/discussions/34667). Apple signing and notarization do not grant T3 Connect access approval.

- Native macOS passkey registration and sign-in are unavailable: the official credential domain does not associate this fork's signing identity.
- Browser SSO callbacks for Apple, Google, GitHub, Microsoft and other providers are unsupported. The independent callback is not allowlisted; a callback may fail or open the official app.
- Email/password/one-time-code login has not passed real-account acceptance and is not offered as a supported feature.
- Account-linked environment discovery, registration and connections, official web/mobile access through T3 Connect, managed public tunnels, and MCP access through those tunnels are unsupported in this preview.
- Relay-forwarded and offline-held webhooks, T3 Chat account linking for tunnel limits, and cloud account/device management are unsupported and unverified.

These are preview support limits, not claims that every flow was tested and failed. Some upstream cloud entry points remain visible. Local providers and projects, SSH, LAN and Tailscale direct connections do not require T3 Connect; each still requires its own setup and permissions. Updates use this fork's signed releases. The first public preview has no verified upgrade path from a preceding public version.
