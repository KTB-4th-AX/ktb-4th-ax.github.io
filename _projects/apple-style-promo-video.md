---
title: Apple-style Promo Video
description: URL 하나로 내 웹·앱을 애플 광고·키노트풍 홍보영상(MP4)으로 만드는 스킬입니다. 키네틱 타이포그래피와 UI 모션을 코드로 렌더링합니다.
thumbnail: /assets/img/apple-style-promo-video.jpg
demo: /assets/videos/apple-style-promo-video.mp4
install: |-
  /plugin marketplace add seoddhh/apple-style-promo-video-skills
  /plugin install apple-style-promo-video@seoddhh-skills
repo: https://github.com/seoddhh/apple-style-promo-video-skills
authors: [seoddhh]
tags: [스킬, 영상]
date: 2026-10-03
---
서비스 URL이나 스크린샷을 주고 용도·스타일 같은 질문에 한 번만 답하면 완성 영상을 받습니다. AI 영상 모델을 쓰지 않고, 에이전트가 장면을 HTML/CSS/JS로 코딩한 뒤 헤드리스 Chromium으로 프레임 단위 캡처해 ffmpeg로 MP4를 만듭니다.

- **글자와 타이밍**: 실제 폰트(Pretendard)로 렌더링해 한글이 깨지지 않고, 모든 화면을 시간 값으로 계산해 타이밍을 프레임 단위로 맞춥니다.
- **스타일과 비율**: 키노트 다크·클린 화이트·컬러 블록·템포 키네틱 스타일과 16:9·9:16·1:1·4:5 비율을 지원합니다.
- **자동 검수**: 렌더가 끝나면 프레임을 뽑아 텍스트 대비, 깜빡임, 장면별 시간 배분을 검사하고 문제를 고친 뒤 전달합니다.
- **수정**: "더 애플스럽게", "9:16 버전도"처럼 요청하면 문구·색·길이를 코드에서 바꿔 다시 렌더링합니다.

## 설치 (Claude Code)

```
/plugin marketplace add seoddhh/apple-style-promo-video-skills
/plugin install apple-style-promo-video@seoddhh-skills
```

Claude 데스크탑 앱·웹, Claude Code 웹, Codex 설치 방법은 [README](https://github.com/seoddhh/apple-style-promo-video-skills#설치와-사용)에 있습니다.

## 사용 예시

```
우리 서비스 홍보영상 만들어줘. https://example.com
```

```
https://example.com 홍보영상 알아서 만들어줘. 키노트 다크, 16:9 30초.
```

## 사용 전 참고

- 실사 촬영, 3D 제품 렌더, 음악 생성은 할 수 없습니다. 음원을 주면 영상에 합쳐 줍니다.
- 수치는 지어내지 않습니다. 예시 데이터를 쓴 화면에는 "시연용 화면"이라고 표기합니다.
- Chromium, ffmpeg, 폰트는 에이전트가 작업 환경에 직접 설치합니다. 채팅 환경에서 설치가 막히면 완성된 HTML과 렌더 명령을 대신 줍니다.
- 위 영상은 이 스킬로 만든 산출물 예시입니다.
