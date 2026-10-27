---
title: KTB AX 아카이브
description: 동아리원이 만든 플러그인과 도구를 카드로 모아 보여 주는 이 사이트입니다.
thumbnail: /assets/img/ktb-ax-archive.png
demo: /assets/videos/ktb-ax-archive.mp4
install: https://ktb-4th-ax.github.io/
repo: https://github.com/KTB-4th-AX/KTB-4th-AX
authors: [algocean1204]
tags: [웹, Jekyll]
date: 2026-10-27
---
GitHub Pages와 Jekyll로 만든 정적 사이트입니다. 서버 없이 마크다운 파일만 추가하면 카드가 생깁니다.

## 프로젝트 추가하기

`_projects/` 폴더에 마크다운 파일을 하나 만들면 목록과 상세 페이지가 함께 생성됩니다.

```yaml
---
title: 프로젝트 이름
description: 한두 문장 설명
thumbnail: /assets/img/my-project.png
demo: /assets/videos/my-project.mp4
install: npx my-project
repo: https://github.com/아이디/my-project
authors: [github-아이디]
tags: [CLI, 자동화]
date: 2026-11-01
---
```

- `install`이 `https://`로 시작하면 설치 버튼이, 명령어면 복사 버튼이 표시됩니다.
- `demo`는 mp4 영상이나 gif·png 이미지를 쓸 수 있습니다. 카드에 마우스를 올리면 재생됩니다.
