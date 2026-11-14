# T3 Code I18n

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

[![Localization checks](https://github.com/qidlek114/t3code/actions/workflows/localization-ci.yml/badge.svg?branch=localization)](https://github.com/qidlek114/t3code/actions/workflows/localization-ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)

[T3 Code](https://github.com/pingdotgg/t3code) 的社区多语言版本，为编程 Agent 提供开源图形界面。使用你自己的提供商账号，在本地化的桌面和网页界面中工作。

**English · 简体中文 · 繁體中文 · 日本語 · 한국어**

[下载 macOS 版](https://github.com/qidlek114/t3code/releases) · [反馈问题](https://github.com/qidlek114/t3code/issues/new/choose) · [官方项目](https://github.com/pingdotgg/t3code)

> [!WARNING]
> **非官方社区版本。本版本暂不支持 T3 Connect。** 本 fork 的独立应用身份尚未获得官方 T3 Connect 接入批准。界面中保留云功能入口不代表可用，请先阅读下方限制。

## 安装

1. 打开本 fork 的 [Releases](https://github.com/qidlek114/t3code/releases)，选择最新的**已公开正式版**。如果只有 **Pre-release**，表示本 fork 的正式安装包尚未发布。以该 Release 标明的语言为准；源码新增语言不会改变已经发布的安装包。
2. 下载适合这台 Mac 的 `.dmg`：**M 系列芯片选 `arm64`，Intel 芯片选 `x64`**。
3. 打开磁盘映像，将 **T3 Code I18n** 拖入“应用程序”。签名版附有 Apple Developer ID 签名、公证、ZIP 更新包和 SHA-256 校验文件。
4. 在运行服务器的电脑上安装并登录编程提供商。提供商订阅和 API 用量费用与本项目分开。
5. 进入**设置 → 常规 → 语言**，选择语言或跟随系统。

本 fork 发布 macOS 安装包，暂不发布 Windows、Linux 和原生移动端构建。官方 Homebrew、npm、winget 命令安装的是上游版本，不是本多语言版。DMG/ZIP 安装包在 **Releases** 下载，无需使用 GitHub **Packages**。

## 翻译范围

桌面与网页界面、设置、原生桌面菜单和应用自有提示共用语言偏好。日语、韩语为新增的预览译文，欢迎反馈术语和表达问题。英文、简体中文和繁体中文继续保留。

代码、项目名、路径、聊天消息、终端输出和模型回答保持原样。提供商命令行工具和外部网页自行管理语言。账号页面翻译完成不等于对应云服务已经接入。

## T3 Connect 功能限制

| 功能                                                                             | 本 fork 状态                                             |
| -------------------------------------------------------------------------------- | -------------------------------------------------------- |
| macOS 原生通行密钥登录                                                           | 不可用：独立应用身份尚未关联官方登录域名。               |
| 浏览器 SSO / OAuth 回跳本应用                                                    | 暂不支持：独立回调尚未获批，可能登录失败或回到官方应用。 |
| 其他 T3 Connect 登录，包括邮箱、密码、验证码                                     | 未完成真实账号验收，不作为受支持的替代登录方式。         |
| 账号绑定的云端环境、经 T3 Connect 跨设备访问、官方托管隧道                       | 本 fork 暂不支持。                                       |
| 经上述隧道使用 MCP、Relay Webhook、离线 Webhook 保留、T3 Chat 账号绑定及相关额度 | 依赖云服务的流程暂不支持或尚未验收。                     |
| 本地项目、本地提供商账号、SSH / 局域网 / Tailscale 直连                          | 不依赖 T3 Connect；仍需分别配置并完成认证。              |

界面暂时保留云功能入口。上表区分了“尚未接入”和“未经验收”，并不表示每一条云流程都已实测失败。详见[完整功能限制](../docs/user/localization-preview.md)和[官方接入申请](https://github.com/pingdotgg/t3code/discussions/34667)。

## 更新与共存

今后**只跟随官方正式版发布**，跳过 Nightly、Preview 和 RC。历史预览版保留 **Pre-release** 标记。正式版使用稳定更新渠道；旧预览版用户请手动安装首个正式版 DMG。发布渠道变化不代表 T3 Connect 已获批准，上述功能限制继续有效。

应用使用独立身份和数据目录，可与官方版共存。签名版的更新源指向 **qidlek114/t3code**，不会使用覆盖翻译的官方安装包。**Pre-release** 表示公开预览版；**Draft** 是未公开草稿，不会被自动更新发现。连续两个公开版本之间的完整自动升级仍需验收。

同步上游时保留官方提交历史，经过检查后，在 GitHub 托管 macOS runner 中打包、签名和公证。官方新增文案和合并冲突仍需处理；官方发布不等于本 fork 立即同步发布。定时检查上游更新需要主动启用。详见[维护与发布指南](../docs/operations/localization-fork.md)。

## 反馈与开发

翻译、安装包及 fork 特有问题请发到[本仓库 Issues](https://github.com/qidlek114/t3code/issues)。提供版本、语言、系统、复现步骤及必要截图，并先移除账号信息、令牌和私人项目数据。翻译修改请阅读[本地化贡献指南](localization-contributing.md)。

从源码运行：安装 Vite+，执行 `vp install --frozen-lockfile`，然后执行 `vp run dev --no-seed --home-dir /absolute/path/to/isolated-t3-home`。环境要求见[开发指南](../docs/operations/development.md)。原生移动端与上游架构文档保留在 [docs](../docs/README.md)。

## 致谢与许可

基于 [pingdotgg/t3code](https://github.com/pingdotgg/t3code)，简体中文接入参考了 [ZhiweiXiao98/t3code](https://github.com/ZhiweiXiao98/t3code)。本项目是独立维护的社区 fork，不代表 T3 官方产品或背书。保留原作者版权声明和 [MIT 许可](../LICENSE)。
