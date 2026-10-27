# KTB AX

KTB 4기 AX 동아리원이 만든 플러그인·도구와 활동 기록을 모은 사이트입니다.

## 추가하기

| 무엇을 | 어디에 | 템플릿 |
|---|---|---|
| 프로젝트 카드 | `_projects/이름.md` | `templates/project.md` |
| 동아리원 | `_members/github-아이디.md` | `templates/member.md` |
| 활동 기록 | `_posts/YYYY-MM-DD-제목.md` | 아래 예시 |

활동 기록 예시:

```markdown
---
title: 3주차 모임
video: /assets/videos/2026-11-10-week3.mp4   # 영상이 없으면 지웁니다
---
본문 (마크다운)
```

이미지는 `assets/img/`, 영상은 `assets/videos/`에 둡니다. `main`에 push하면 GitHub Pages가 자동으로 빌드합니다.

## 영상 압축

파일당 100MB 제한(50MB부터 경고)과 사이트 전체 1GB 제한이 있습니다. Git LFS 파일은 Pages에서 서빙되지 않으니 쓰지 마세요.

```sh
ffmpeg -i 원본.mov -vf scale=-2:720 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart assets/videos/이름.mp4
```

전체 용량이 1GB에 가까워지면 큰 영상은 YouTube 미등록 링크로 옮깁니다.
