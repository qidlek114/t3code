# T3 Code I18n

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

[![Localization checks](https://github.com/qidlek114/t3code/actions/workflows/localization-ci.yml/badge.svg?branch=localization)](https://github.com/qidlek114/t3code/actions/workflows/localization-ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)

코딩 에이전트를 위한 오픈 소스 GUI인 [T3 Code](https://github.com/pingdotgg/t3code)의 커뮤니티 다국어 버전입니다. 자신의 제공업체 계정으로 한국어를 비롯한 여러 언어의 데스크톱·웹 화면에서 작업할 수 있습니다.

**English · 简体中文 · 繁體中文 · 日本語 · 한국어**

[macOS 다운로드](https://github.com/qidlek114/t3code/releases) · [문제 신고](https://github.com/qidlek114/t3code/issues/new/choose) · [공식 프로젝트](https://github.com/pingdotgg/t3code)

> [!WARNING]
> **비공식 커뮤니티 미리보기 버전입니다. 이 릴리스에서는 T3 Connect를 지원하지 않습니다.** 이 fork의 독립 앱 ID는 공식 T3 Connect 연결 승인을 받지 않았습니다. 클라우드 기능의 버튼이 표시되어도 사용할 수 있다는 뜻은 아닙니다. 설치 전에 아래 제한 사항을 확인하세요.

## 설치

1. 이 fork의 [Releases](https://github.com/qidlek114/t3code/releases)에서 최신 **공개 미리보기 버전**을 선택합니다. 지원 언어는 각 릴리스의 설명을 확인하세요. 소스 코드에 언어를 추가해도 이미 배포한 설치 파일은 바뀌지 않습니다.
2. Mac에 맞는 `.dmg`를 받습니다. **Apple Silicon(M 시리즈)은 `arm64`, Intel은 `x64`**를 선택하세요.
3. 디스크 이미지를 열고 **T3 Code I18n**을 응용 프로그램 폴더로 드래그합니다. 서명된 릴리스에는 Apple Developer ID 서명과 공증, ZIP 업데이트 파일, SHA-256 체크섬이 포함됩니다.
4. 서버를 실행하는 컴퓨터에서 사용할 코딩 제공업체를 설정하고 로그인합니다. 제공업체 구독료와 API 사용료는 이 프로젝트와 별개입니다.
5. **설정 → 일반 → 언어**에서 언어를 선택하거나 시스템 설정을 따릅니다.

이 fork는 macOS 설치 파일을 배포합니다. Windows, Linux, 네이티브 모바일 빌드는 배포하지 않습니다. 공식 Homebrew, npm, winget 명령은 이 다국어 버전이 아닌 업스트림 버전을 설치합니다. DMG/ZIP 파일은 **Releases**에서 받으면 됩니다. GitHub **Packages**는 필요하지 않습니다.

## 번역 범위

데스크톱·웹 화면, 설정, 네이티브 메뉴, 앱 자체 안내에 언어 설정이 적용됩니다. 일본어와 한국어는 새로 추가한 미리보기 번역이며, 용어와 표현에 관한 의견을 환영합니다. 영어, 중국어 간체와 번체도 계속 사용할 수 있습니다.

코드, 프로젝트 이름, 경로, 채팅 메시지, 터미널 출력, 모델 응답은 변경하지 않습니다. 제공업체 CLI와 외부 웹사이트는 자체 언어 설정을 사용합니다. 계정 화면을 번역했다고 해당 클라우드 서비스의 연결 승인이 완료된 것은 아닙니다.

## T3 Connect 제한 사항

| 기능                                                                                          | 이 fork의 상태                                                                                   |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| macOS 네이티브 패스키 로그인                                                                  | 사용할 수 없습니다. 독립 앱 ID가 공식 로그인 도메인과 연결되지 않았습니다.                       |
| 브라우저 SSO / OAuth에서 이 앱으로 돌아오기                                                   | 지원하지 않습니다. 독립 콜백이 승인되지 않아 로그인에 실패하거나 공식 앱으로 돌아갈 수 있습니다. |
| 이메일·비밀번호·인증 코드 등 기타 T3 Connect 로그인                                           | 실제 계정으로 인수 검증을 완료하지 않았으며, 지원되는 대체 로그인 방법으로 제공하지 않습니다.    |
| 계정에 연결된 클라우드 환경, T3 Connect를 통한 기기 간 접근, 공식 관리형 터널                 | 이 미리보기에서는 지원하지 않습니다.                                                             |
| 위 터널을 통한 MCP, Relay Webhook, 오프라인 Webhook 보관, T3 Chat 계정 연결 및 관련 사용 한도 | 의존하는 클라우드 흐름은 지원하지 않거나 아직 검증하지 않았습니다.                               |
| 로컬 프로젝트, 로컬 제공업체 계정, SSH / LAN / Tailscale 직접 연결                            | T3 Connect가 필요하지 않습니다. 각 연결의 설정과 인증은 별도로 필요합니다.                       |

클라우드 기능의 진입점은 화면에 남아 있습니다. 위 표는 미연동과 미검증을 구분하며, 모든 클라우드 흐름에서 실패를 직접 확인했다는 뜻이 아닙니다. [자세한 제한 사항](../docs/user/localization-preview.md)과 [공식 연결 신청](https://github.com/pingdotgg/t3code/discussions/34667)을 참고하세요.

## 업데이트와 공식 버전 함께 사용하기

독립 앱 ID와 데이터 폴더를 사용하므로 공식 버전과 함께 설치할 수 있습니다. 서명된 버전의 업데이트 대상은 **qidlek114/t3code**이며, 번역이 사라지는 공식 바이너리로 업데이트하지 않습니다. **Pre-release**는 공개 미리보기, **Draft**는 미공개 초안이며 자동 업데이트 대상이 아닙니다. 연속된 공개 버전 사이의 전체 자동 업그레이드는 아직 검증이 필요합니다.

업스트림 커밋 기록을 유지한 채 변경 사항을 병합하고 검사한 후, GitHub 호스팅 macOS runner에서 빌드·서명·공증합니다. 새 문구의 번역과 병합 충돌 처리는 계속 필요합니다. 공식 릴리스가 나왔다고 이 fork가 즉시 함께 배포되는 것은 아닙니다. 정기 업스트림 확인은 명시적으로 활성화해야 합니다. [유지 관리 및 릴리스 안내](../docs/operations/localization-fork.md)를 참고하세요.

## 피드백과 개발

번역, 설치 파일, fork 고유 문제는 [이 저장소의 Issues](https://github.com/qidlek114/t3code/issues)에 남겨 주세요. 버전, 언어, OS, 재현 단계, 필요한 스크린샷을 포함하고 계정 정보, 토큰, 비공개 프로젝트 데이터는 먼저 지워 주세요. 번역을 수정할 때는 [번역 기여 안내](localization-contributing.md)를 확인하세요.

소스에서 실행하려면 Vite+를 설치하고 `vp install --frozen-lockfile`, 이어서 `vp run dev --no-seed --home-dir /absolute/path/to/isolated-t3-home`을 실행하세요. 요구 사항은 [개발 안내](../docs/operations/development.md)를 참고하세요. 네이티브 모바일 및 업스트림 구조 문서는 [docs](../docs/README.md)에 있습니다.

## 감사의 말과 라이선스

[pingdotgg/t3code](https://github.com/pingdotgg/t3code)를 기반으로 하며, 중국어 간체 통합은 [ZhiweiXiao98/t3code](https://github.com/ZhiweiXiao98/t3code)를 참고했습니다. 독립적으로 유지 관리하는 커뮤니티 fork이며, T3의 공식 제품이나 승인을 의미하지 않습니다. 원저작자의 저작권 표시와 [MIT 라이선스](../LICENSE)를 유지합니다.
