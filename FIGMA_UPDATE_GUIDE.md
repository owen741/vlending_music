# Figma 디자인 변경 시 업데이트 가이드

## 📋 현재까지의 주요 수정사항

### 1. 프로젝트 구조 변경
- ✅ **main.tsx를 메인 페이지로 변경**: `App.tsx`의 모든 로직을 `main.tsx`로 이동
- ✅ **GitHub Pages 배포 설정**: `base: '/vlending_music/'` 설정 및 `gh-pages` 배포 스크립트 추가
- ✅ **타입 에러 수정**: `@types/react`, `@types/react-dom` 설치 및 타입 오류 해결
- ✅ **코드 정리**: 사용하지 않는 import 및 변수 제거

### 2. Figma Asset 관리 구조
- ✅ **vite.config.ts**: Figma asset 경로를 alias로 매핑
- ✅ **src/vite-env.d.ts**: Figma asset 타입 선언
- ✅ **src/assets/**: 실제 이미지 파일 저장 위치
- ✅ **코드 내 사용**: `figma:asset/[파일명]` 형식으로 참조

---

## 🎨 Figma 디자인 변경 시 업데이트 절차

### ⚠️ 중요: 기존 수정사항 보호 방법

#### 1. **이미지 파일 교체 시 (기존 파일명 유지)**

**상황**: Figma에서 같은 이름의 이미지를 새로 내보내는 경우

**절차**:
1. Figma에서 새 이미지 내보내기 (기존 파일명과 동일하게)
2. `src/assets/` 폴더의 기존 파일을 새 파일로 교체
3. **변경 불필요**: `vite.config.ts`, `vite-env.d.ts`, 코드 모두 그대로 유지

**주의사항**:
- ✅ 파일명이 정확히 일치해야 함
- ✅ 파일 확장자도 동일해야 함 (.png → .png)
- ✅ `vite.config.ts`의 alias는 파일명 기반이므로 자동으로 새 파일 참조

---

#### 2. **새 이미지 추가 시**

**상황**: Figma에서 새로운 이미지를 추가하는 경우

**절차**:
1. Figma에서 새 이미지 내보내기 → 파일명 확인 (예: `abc123def456.png`)
2. `src/assets/` 폴더에 새 이미지 파일 추가
3. **vite.config.ts 수정**:
   ```typescript
   alias: {
     // ... 기존 alias들 ...
     'figma:asset/abc123def456.png': path.resolve(__dirname, './src/assets/abc123def456.png'),
   }
   ```
4. **src/vite-env.d.ts 수정**:
   ```typescript
   declare module 'figma:asset/abc123def456.png' {
     const src: string;
     export default src;
   }
   ```
5. 코드에서 사용:
   ```typescript
   image: 'figma:asset/abc123def456.png'
   ```

**주의사항**:
- ✅ 기존 alias는 절대 삭제하지 말 것
- ✅ 새 alias만 추가할 것
- ✅ 파일명은 Figma에서 내보낸 그대로 사용

---

#### 3. **이미지 삭제 시**

**상황**: 더 이상 사용하지 않는 이미지를 제거하는 경우

**절차**:
1. 코드에서 해당 이미지 참조를 모두 찾아 제거
2. `src/assets/` 폴더에서 파일 삭제
3. **vite.config.ts에서 alias 제거**:
   ```typescript
   // 이 줄 삭제
   'figma:asset/old-image.png': path.resolve(__dirname, './src/assets/old-image.png'),
   ```
4. **src/vite-env.d.ts에서 타입 선언 제거**:
   ```typescript
   // 이 블록 삭제
   declare module 'figma:asset/old-image.png' {
     const src: string;
     export default src;
   }
   ```

**주의사항**:
- ✅ 코드에서 참조가 남아있으면 빌드 에러 발생
- ✅ `grep -r "figma:asset/old-image" src/` 명령어로 모든 참조 확인

---

#### 4. **이미지 파일명 변경 시**

**상황**: Figma에서 다른 이름으로 내보내는 경우

**절차**:
1. 기존 이미지 사용처 확인:
   ```bash
   grep -r "figma:asset/old-name.png" src/
   ```
2. 새 이미지 파일을 `src/assets/`에 추가
3. **vite.config.ts에 새 alias 추가** (기존 alias는 유지)
4. **vite-env.d.ts에 새 타입 선언 추가** (기존 선언은 유지)
5. 코드에서 모든 참조를 새 파일명으로 변경
6. 변경 완료 후 기존 alias와 타입 선언 제거

**주의사항**:
- ✅ 단계적으로 진행: 새 것 추가 → 코드 변경 → 기존 것 제거
- ✅ 한 번에 모두 변경하지 말 것

---

## 🔒 보호해야 할 핵심 파일들

### 절대 변경하지 말 것:
1. **vite.config.ts의 base 경로**: `base: '/vlending_music/'` (GitHub Pages 배포용)
2. **package.json의 배포 스크립트**: `deploy`, `predeploy` 스크립트
3. **main.tsx의 구조**: 페이지 라우팅 및 상태 관리 로직
4. **.gitignore**: `dist`, `build` 폴더 설정

### 신중하게 변경할 것:
1. **vite.config.ts의 alias**: Figma asset 관련 alias만 추가/수정
2. **src/vite-env.d.ts**: 새 이미지 추가 시에만 수정
3. **src/assets/**: 이미지 파일만 교체/추가/삭제

---

## 📝 체크리스트: Figma 업데이트 전

- [ ] 현재 사용 중인 모든 이미지 파일명 확인
- [ ] `src/assets/` 폴더의 파일 목록 확인
- [ ] `vite.config.ts`의 alias 목록 확인
- [ ] `src/vite-env.d.ts`의 타입 선언 확인
- [ ] 코드에서 사용 중인 `figma:asset/` 경로 확인

---

## 📝 체크리스트: Figma 업데이트 후

- [ ] 새 이미지 파일이 `src/assets/`에 올바르게 추가되었는지 확인
- [ ] `vite.config.ts`에 새 alias가 추가되었는지 확인
- [ ] `src/vite-env.d.ts`에 새 타입 선언이 추가되었는지 확인
- [ ] 코드에서 새 이미지 경로가 올바르게 사용되는지 확인
- [ ] `npm run dev`로 개발 서버 실행하여 이미지가 정상 표시되는지 확인
- [ ] `npm run build`로 빌드가 성공하는지 확인

---

## 🛠️ 유용한 명령어

### 이미지 사용처 찾기
```bash
# 특정 이미지가 어디서 사용되는지 찾기
grep -r "figma:asset/파일명.png" src/

# 모든 figma asset 사용처 찾기
grep -r "figma:asset" src/
```

### assets 폴더 파일 목록 확인
```bash
ls -la src/assets/
```

### vite.config.ts의 alias 확인
```bash
grep "figma:asset" vite.config.ts
```

---

## ⚠️ 주의사항

1. **파일명은 절대 수동으로 변경하지 말 것**
   - Figma에서 내보낸 파일명을 그대로 사용
   - 파일명은 해시값이므로 의미 있는 이름이 아님

2. **기존 alias는 보존**
   - 새 이미지 추가 시 기존 alias는 그대로 유지
   - 삭제는 코드에서 참조가 완전히 제거된 후에만

3. **타입 선언과 alias는 항상 쌍으로 관리**
   - `vite.config.ts`에 alias 추가 시 → `vite-env.d.ts`에도 타입 선언 추가
   - `vite-env.d.ts`에서 제거 시 → `vite.config.ts`에서도 제거

4. **GitHub Pages 배포 설정은 건드리지 말 것**
   - `base: '/vlending_music/'` 경로는 레포지토리 이름과 일치해야 함
   - 변경 시 배포가 깨질 수 있음

---

## 📚 현재 사용 중인 Figma Assets

### vite.config.ts에 등록된 이미지:
- `cf320bfbbebca72033488fd4ef9e0deb4709b537.png` (FLO 로고)
- `86541cecdcdc8d8afe04beb54183b1487e179887.png` (YouTube Music 로고)
- `5f42d67e62fa7db7bf638517ea80153730216a73.png` (Bugs 로고)
- `5d21c33d521df6750f1f0f6f37eb4d4d4fae8567.png` (Melon 로고)
- `5a0a7495d9267dfd7b6a9685a5d4d5e2fdb7e180.png` (Genie 로고)
- `2ad3921d833025d653938e1a7ef2510edd23103a.png` (VIBE 로고)

### 코드에서 사용 중이지만 alias/파일이 없는 이미지:
- `e9ed646b50580335279cf7eb2aa6c834cbc0f7b4.png` (main.tsx, App.tsx에서 사용)
  - ⚠️ **이미지 파일이 없고 alias도 없음 - Figma에서 내보내서 추가 필요**
  - 현재 상태: 코드에서 참조하지만 실제 파일과 설정이 없어 빌드 시 에러 가능

---

## 🔄 업데이트 예시

### 예시 1: 새 로고 이미지 추가
```typescript
// 1. vite.config.ts에 추가
'figma:asset/new-logo-abc123.png': path.resolve(__dirname, './src/assets/new-logo-abc123.png'),

// 2. vite-env.d.ts에 추가
declare module 'figma:asset/new-logo-abc123.png' {
  const src: string;
  export default src;
}

// 3. 코드에서 사용
import newLogo from 'figma:asset/new-logo-abc123.png';
```

### 예시 2: 기존 이미지 교체 (파일명 동일)
```
1. src/assets/old-image.png 삭제
2. 새 이미지를 같은 이름(old-image.png)으로 src/assets/에 추가
3. 끝! (별도 설정 불필요)
```

---

## 💡 권장 사항

1. **이미지 변경 전 백업**: `src/assets/` 폴더를 백업
2. **단계적 업데이트**: 한 번에 하나씩 업데이트
3. **테스트**: 각 변경 후 `npm run dev`로 확인
4. **문서화**: 변경한 이미지와 용도를 기록

