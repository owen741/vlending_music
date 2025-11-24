# 수동 배포 가이드

## 방법 1: 배포 스크립트 사용 (권장)

터미널에서 다음 명령어를 실행하세요:

```bash
cd /Users/owen/Documents/GitHub/vlending_music
./deploy.sh
```

## 방법 2: npm 스크립트 사용

```bash
cd /Users/owen/Documents/GitHub/vlending_music
npm run build
npx gh-pages -d dist
```

## 방법 3: Git 직접 사용

```bash
cd /Users/owen/Documents/GitHub/vlending_music

# 1. 빌드
npm run build

# 2. dist 폴더로 이동
cd dist

# 3. Git 초기화 및 커밋
git init
git add .
git commit -m "Deploy: 피그마 디자인 업데이트 반영 (누락된 이미지 플레이스홀더 처리)"

# 4. gh-pages 브랜치로 변경
git branch -M gh-pages

# 5. 원격 저장소 추가 (이미 있으면 생략)
git remote add origin https://github.com/owen741/vlending_music.git

# 6. 배포
git push -f origin gh-pages
```

## 배포 확인

배포가 완료되면 다음 주소에서 확인할 수 있습니다:
- https://owen741.github.io/vlending_music/

배포 후 GitHub에서 변경사항이 반영되는데 몇 분 정도 걸릴 수 있습니다.

## 문제 해결

### 인증 오류가 발생하는 경우

GitHub Personal Access Token을 사용하여 원격 URL을 업데이트하세요:

```bash
git remote set-url origin https://[토큰]@github.com/owen741/vlending_music.git
```

### gh-pages 명령어가 없는 경우

```bash
npm install -g gh-pages
```

또는

```bash
npx gh-pages -d dist
```

