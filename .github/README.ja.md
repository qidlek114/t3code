# T3 Code I18n

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

[![Localization checks](https://github.com/qidlek114/t3code/actions/workflows/localization-ci.yml/badge.svg?branch=localization)](https://github.com/qidlek114/t3code/actions/workflows/localization-ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)

コーディングエージェント向けのオープンソース GUI、[T3 Code](https://github.com/pingdotgg/t3code) のコミュニティ多言語版です。ご自身のプロバイダーアカウントを使い、日本語などのデスクトップ・Web 画面で作業できます。

**English · 简体中文 · 繁體中文 · 日本語 · 한국어**

[macOS 版をダウンロード](https://github.com/qidlek114/t3code/releases) · [問題を報告](https://github.com/qidlek114/t3code/issues/new/choose) · [公式プロジェクト](https://github.com/pingdotgg/t3code)

> [!WARNING]
> **非公式のコミュニティプレビュー版です。このリリースでは T3 Connect をサポートしていません。** この fork 固有のアプリ ID は、公式 T3 Connect への接続承認を受けていません。クラウド機能のボタンが表示されても、利用できることを意味しません。導入前に以下の制限をご確認ください。

## インストール

1. この fork の [Releases](https://github.com/qidlek114/t3code/releases) で最新の**公開済みプレビュー版**を選びます。対応言語は各リリースの説明をご確認ください。ソースコードに言語を追加しても、公開済みのインストーラーは変わりません。
2. お使いの Mac に合う `.dmg` を選びます。**Apple Silicon（M シリーズ）は `arm64`、Intel は `x64`** です。
3. ディスクイメージを開き、**T3 Code I18n** を「アプリケーション」にドラッグします。署名版には Apple Developer ID 署名と公証、ZIP 更新ファイル、SHA-256 チェックサムが含まれます。
4. サーバーを実行するコンピューターで、利用するコーディングプロバイダーを設定してログインします。プロバイダーのサブスクリプションや API 利用料金は本プロジェクトとは別です。
5. **設定 → 一般 → 言語**で言語を選ぶか、システム設定に合わせます。

この fork が配布するのは macOS 版です。Windows、Linux、ネイティブモバイル版は配布していません。公式の Homebrew、npm、winget コマンドは本多言語版ではなく上流版をインストールします。DMG/ZIP は **Releases** から取得します。GitHub **Packages** は不要です。

## 翻訳の範囲

デスクトップ・Web の画面、設定、ネイティブメニュー、アプリ内の案内が言語設定に従います。日本語と韓国語は新しいプレビュー翻訳です。用語や表現の改善提案を歓迎します。英語、簡体字中国語、繁体字中国語も引き続き利用できます。

コード、プロジェクト名、パス、チャットメッセージ、ターミナル出力、モデルの回答は変更しません。プロバイダーの CLI や外部サイトの言語はそれぞれで管理されます。アカウント画面の翻訳は、クラウドサービスへの接続承認を意味しません。

## T3 Connect の制限

| 機能                                                                                                     | この fork での状態                                                                     |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| macOS ネイティブのパスキー認証                                                                           | 利用不可。独自のアプリ ID が公式ログインドメインと関連付けられていません。             |
| ブラウザー SSO / OAuth から本アプリへの復帰                                                              | 未対応。独自のコールバックは未承認で、ログイン失敗や公式アプリへの復帰が起こり得ます。 |
| メール・パスワード・認証コードなど、その他の T3 Connect ログイン                                         | 実アカウントでの受け入れ確認が未完了であり、対応済みの代替手段として案内していません。 |
| アカウントに紐づくクラウド環境、T3 Connect 経由の端末間アクセス、公式の管理トンネル                      | このプレビューでは未対応です。                                                         |
| 上記トンネル経由の MCP、Relay Webhook、オフライン時の Webhook 保留、T3 Chat のアカウント連携と関連利用枠 | 依存するクラウドの処理は未対応、または未検証です。                                     |
| ローカルプロジェクト、ローカルのプロバイダー認証、SSH / LAN / Tailscale での直接接続                     | T3 Connect を必要としません。それぞれの設定と認証は必要です。                          |

クラウド機能の入口は画面に残っています。「未接続」と「未検証」を区別しており、すべてのクラウド処理で失敗を実測したという意味ではありません。[詳細な制限](../docs/user/localization-preview.md)と[公式への接続申請](https://github.com/pingdotgg/t3code/discussions/34667)もご覧ください。

## 更新と公式版との併用

独自のアプリ ID とデータディレクトリを使うため、公式版と共存できます。署名版の更新先は **qidlek114/t3code** です。翻訳が消えてしまう公式バイナリには更新しません。**Pre-release** は公開プレビュー、**Draft** は未公開の下書きで、自動更新の対象になりません。連続する公開版間の自動更新は、まだ一連の動作確認が必要です。

上流の履歴を保持して変更をマージし、検証後に GitHub ホステッド macOS runner でビルド・署名・公証します。新しい文言の翻訳や競合の解消は引き続き必要です。公式のリリースと同時にこの fork が公開される仕組みではありません。定期的な上流確認は明示的に有効化します。[保守とリリースの手順](../docs/operations/localization-fork.md)を参照してください。

## フィードバックと開発

翻訳、インストーラー、この fork 固有の問題は[本リポジトリの Issues](https://github.com/qidlek114/t3code/issues)へお願いします。リリース、言語、OS、再現手順、必要なスクリーンショットを記載し、アカウント情報、トークン、非公開プロジェクトの内容は除いてください。翻訳の変更は[翻訳への貢献ガイド](localization-contributing.md)をご覧ください。

ソースから実行する場合は Vite+ を用意し、`vp install --frozen-lockfile`、続いて `vp run dev --no-seed --home-dir /absolute/path/to/isolated-t3-home` を実行します。前提条件は[開発ガイド](../docs/operations/development.md)を参照してください。ネイティブモバイル版や上流の設計資料は [docs](../docs/README.md) にあります。

## 謝辞とライセンス

[pingdotgg/t3code](https://github.com/pingdotgg/t3code) を基盤とし、簡体字中国語の統合では [ZhiweiXiao98/t3code](https://github.com/ZhiweiXiao98/t3code) を参考にしています。独立したコミュニティ fork であり、T3 の公式製品・承認を示すものではありません。元の著作権表示と [MIT ライセンス](../LICENSE)を保持しています。
