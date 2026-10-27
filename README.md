# KTB-4th-AX

AX 동아리 활동 기록과 작업 결과물 아카이브입니다. 사이트 주소: https://ktb-4th-ax.github.io/KTB-4th-AX/

## 기록 추가

1. `_posts/YYYY-MM-DD-제목.md` 파일을 만듭니다.

   ```markdown
   ---
   layout: default
   title: 제목
   category: 기록        # 기록 또는 결과물
   video: /assets/videos/YYYY-MM-DD-제목.mp4   # 영상이 없으면 이 줄은 지웁니다
   ---
   본문 (마크다운)
   ```

2. 영상은 50MB 이하로 압축해서 `assets/videos/`에 넣습니다.

   ```sh
   ffmpeg -i 원본.mov -vf scale=-2:720 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart assets/videos/YYYY-MM-DD-제목.mp4
   ```

3. `main`에 push하면 GitHub Pages가 자동으로 빌드합니다.

## 제한

- 파일당 100MB 제한이 있고 50MB부터 경고가 뜹니다. 사이트 전체는 1GB까지입니다.
- Git LFS 파일은 Pages에서 서빙되지 않으므로 LFS를 쓰지 마세요.
- 전체 용량이 1GB에 가까워지면 큰 영상은 YouTube 미등록 링크로 옮겨야 합니다.
