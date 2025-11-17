# 블렌딩 음원유통사이트_리뉴얼

This is a code bundle for 블렌딩 음원유통사이트_리뉴얼. The original project is available at https://www.figma.com/design/JxjMHuwaBbBfiKtqEmEBUv/%EB%B8%94%EB%A0%8C%EB%94%A9-%EC%9D%8C%EC%9B%90%EC%9C%A0%ED%86%B5%EC%82%AC%EC%9D%B4%ED%8A%B8_%EB%A6%AC%EB%89%B4%EC%96%BC.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## GitHub Pages 배포

### 배포 실행
```bash
npm install
npm run deploy
```

### GitHub 설정
1. GitHub 레포지토리로 이동
2. Settings → Pages 메뉴로 이동
3. Source를 "Deploy from a branch"로 선택
4. Branch를 "gh-pages"로 선택
5. Save 클릭

### 사이트 접속
배포가 완료되면 다음 주소로 접속할 수 있습니다:
- `https://[사용자명].github.io/vlending_music/`

### 인증 문제 해결

배포 시 인증 오류가 발생하는 경우:

#### 방법 1: GitHub Personal Access Token 사용 (권장)

1. GitHub에서 Personal Access Token 생성:
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - "Generate new token (classic)" 클릭
   - `repo` 권한 선택
   - 토큰 생성 후 복사

2. 원격 URL 업데이트:
```bash
git remote set-url origin https://[토큰]@github.com/owen741/vlending_music.git
```

3. 배포 실행:
```bash
npm run deploy
```

#### 방법 2: 수동 배포

```bash
npm run build
cd dist
git init
git add .
git commit -m "Deploy to GitHub Pages"
git branch -M gh-pages
git remote add origin https://github.com/owen741/vlending_music.git
git push -f origin gh-pages
```

### 기타 문제 해결
- 배포가 안 될 경우: `vite.config.ts`의 `base` 경로가 레포지토리 이름과 일치하는지 확인하세요.
- 현재 설정: `base: '/vlending_music/'`
