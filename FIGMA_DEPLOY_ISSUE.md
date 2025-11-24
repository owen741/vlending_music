# 피그마 디자인이 배포에 반영되지 않는 이유 진단

## 🔍 가능한 원인들

### 1. 새로운 이미지 파일이 추가되지 않음
**문제**: 피그마에서 내보낸 새로운 이미지 파일이 프로젝트에 추가되지 않았을 수 있습니다.

**확인 방법**:
```bash
# src/assets 폴더 확인
ls -la src/assets/

# vite.config.ts에서 alias 확인
grep "figma:asset" vite.config.ts

# vite-env.d.ts에서 타입 선언 확인
grep "figma:asset" src/vite-env.d.ts
```

**해결 방법**:
1. 피그마에서 새 이미지 내보내기
2. `src/assets/` 폴더에 파일 추가
3. `vite.config.ts`에 alias 추가
4. `src/vite-env.d.ts`에 타입 선언 추가
5. 코드에서 새 이미지 경로 사용

---

### 2. 스타일/레이아웃 변경사항이 코드에 반영되지 않음
**문제**: 피그마에서 스타일이나 레이아웃을 변경했지만 코드에 반영되지 않았을 수 있습니다.

**확인 방법**:
- 피그마 Dev Mode에서 변경된 스타일 확인
- 컴포넌트 파일에서 해당 스타일 비교
- Tailwind CSS 클래스가 올바르게 적용되었는지 확인

**해결 방법**:
1. 피그마 Dev Mode에서 변경된 스타일 확인
2. 해당 컴포넌트 파일 수정
3. Tailwind CSS 클래스 업데이트
4. 빌드 및 배포

---

### 3. 배포가 실제로 완료되지 않음
**문제**: 배포 명령어가 실행되었지만 실제로 GitHub Pages에 반영되지 않았을 수 있습니다.

**확인 방법**:
```bash
# gh-pages 브랜치 확인
git branch -a | grep gh-pages

# 최근 커밋 확인
git log --oneline -5
```

**해결 방법**:
1. 빌드 다시 실행: `npm run build`
2. 배포 다시 실행: `npx gh-pages -d dist`
3. GitHub 저장소에서 gh-pages 브랜치 확인

---

### 4. 브라우저 캐시 문제
**문제**: 브라우저가 이전 버전을 캐시하고 있을 수 있습니다.

**해결 방법**:
- 하드 리프레시: `Cmd + Shift + R` (Mac) / `Ctrl + Shift + R` (Windows)
- 시크릿 모드에서 확인
- 브라우저 캐시 삭제

---

### 5. 빌드가 최신 코드로 실행되지 않음
**문제**: 이전 빌드 파일이 남아있을 수 있습니다.

**해결 방법**:
```bash
# dist 폴더 삭제 후 재빌드
rm -rf dist
npm run build
npm run deploy
```

---

## 📋 체크리스트

배포 전 확인사항:
- [ ] 피그마에서 내보낸 모든 새 이미지 파일이 `src/assets/`에 있는가?
- [ ] `vite.config.ts`에 새 이미지 alias가 추가되었는가?
- [ ] `src/vite-env.d.ts`에 새 이미지 타입 선언이 추가되었는가?
- [ ] 코드에서 새 이미지 경로가 올바르게 사용되는가?
- [ ] 스타일/레이아웃 변경사항이 코드에 반영되었는가?
- [ ] `npm run build`가 성공적으로 완료되었는가?
- [ ] 배포 명령어가 성공적으로 실행되었는가?
- [ ] GitHub Pages 설정이 올바른가? (Settings → Pages → Source: gh-pages)

---

## 🛠️ 문제 해결 단계

### Step 1: 현재 상태 확인
```bash
# 프로젝트 루트로 이동
cd /Users/owen/Documents/GitHub/vlending_music

# 빌드 상태 확인
npm run build

# dist 폴더 확인
ls -la dist/
```

### Step 2: 피그마 변경사항 확인
1. 피그마 파일 열기
2. Dev Mode 활성화
3. 변경된 컴포넌트/이미지 확인
4. 변경사항 목록 작성

### Step 3: 코드 업데이트
1. 새 이미지 파일 추가 (필요시)
2. 스타일/레이아웃 코드 수정
3. 빌드 테스트

### Step 4: 배포
```bash
# 빌드
npm run build

# 배포
npx gh-pages -d dist
```

### Step 5: 확인
- 배포 후 5-10분 대기
- 하드 리프레시로 확인
- GitHub 저장소의 gh-pages 브랜치 확인

---

## 💡 피그마 디자인 업데이트 반영 가이드

### 이미지 파일 업데이트
1. 피그마에서 이미지 내보내기
2. 파일명 확인 (해시값)
3. `src/assets/`에 파일 추가
4. `vite.config.ts`에 alias 추가:
   ```typescript
   'figma:asset/[파일명].png': path.resolve(__dirname, './src/assets/[파일명].png'),
   ```
5. `src/vite-env.d.ts`에 타입 선언 추가:
   ```typescript
   declare module 'figma:asset/[파일명].png' {
     const src: string;
     export default src;
   }
   ```
6. 코드에서 사용:
   ```typescript
   image: 'figma:asset/[파일명].png'
   ```

### 스타일 업데이트
1. 피그마 Dev Mode에서 스타일 확인
2. 해당 컴포넌트 파일 찾기
3. Tailwind CSS 클래스 업데이트
4. 빌드 및 테스트

---

## 🔗 관련 문서
- [FIGMA_UPDATE_GUIDE.md](./FIGMA_UPDATE_GUIDE.md) - 피그마 업데이트 가이드
- [DEPLOY_MANUAL.md](./DEPLOY_MANUAL.md) - 수동 배포 가이드

