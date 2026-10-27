---
title: clonamic-create-agent
description: 에이전트 파이프라인을 그래프로 그려 설계하고, 검토를 거쳐 바로 구현할 수 있는 한국어 설계 문서로 내보냅니다.
thumbnail: /assets/img/clonamic-create-agent.jpg
demo: /assets/videos/clonamic-create-agent.mp4
install: |-
  /plugin marketplace add clonamic/plugin
  /plugin install clonamic-create-agent@clonamic
repo: https://github.com/clonamic/plugin/tree/main/clonamic-create-agent
authors: [algocean1204]
tags: [플러그인, 에이전트 설계]
date: 2026-10-21
---
`/clonamic-create-agent` 명령 하나로 로컬 웹 편집기가 열립니다. 코드는 만들지 않고, 사람이나 AI가 문서만 보고 구현할 수 있는 설계를 만드는 데 집중합니다.

- 에이전트 지도에서 에이전트와 연결을 그리고, 에이전트를 두 번 눌러 안쪽 단계를 설계합니다.
- 검토 챗봇이 설계를 평가해 제안 카드를 내고, 고른 항목만 반영합니다.
- 검사를 통과하면 한국어로 다듬은 설계 문서를 내보냅니다.

## 설치 (Claude Code)

```
/plugin marketplace add clonamic/plugin
/plugin install clonamic-create-agent@clonamic
```

Codex, Cursor, Grok Build에서도 쓸 수 있습니다. 설치 방법은 레포지토리 README에 있습니다.
