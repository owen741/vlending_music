# Figma Make로 코드 생성 가이드

## 📋 개요

현재 프로젝트는 Figma 디자인에서 코드로 변환된 상태입니다. 이 가이드에서는 Figma에서 코드를 생성하는 다양한 방법을 안내합니다.

원본 Figma 디자인: https://www.figma.com/design/JxjMHuwaBbBfiKtqEmEBUv/%EB%B8%94%EB%A0%8C%EB%94%A9-%EC%9D%8C%EC%9B%90%EC%9C%A0%ED%86%B5%EC%82%AC%EC%9D%B4%ED%8A%B8_%EB%A6%AC%EB%89%B4%EC%96%BC

---

## 🎨 Figma에서 코드 생성 방법

### 방법 1: Figma Dev Mode 사용 (권장)

Figma의 Dev Mode는 디자이너와 개발자 간 협업을 위한 기능입니다.

#### 단계:
1. **Figma 파일 열기**
   - Figma에서 디자인 파일 열기
   - 우측 상단의 "Dev Mode" 토글 활성화

2. **컴포넌트 선택**
   - 코드로 변환하고 싶은 컴포넌트 선택
   - 우측 패널에서 CSS, React, iOS, Android 코드 확인

3. **코드 복사**
   - 필요한 스타일 코드 복사
   - 컴포넌트별로 개별 복사 가능

#### 장점:
- ✅ Figma 공식 기능
- ✅ 실시간으로 디자인과 코드 동기화
- ✅ CSS, React, iOS, Android 코드 제공

#### 단점:
- ❌ 완전한 컴포넌트 구조는 생성하지 않음
- ❌ 스타일 코드만 제공

---

### 방법 2: Figma 플러그인 사용

#### 2-1. Anima Plugin

**설치:**
1. Figma → Plugins → Browse all plugins
2. "Anima" 검색 및 설치

**사용법:**
1. 디자인 선택
2. Plugins → Anima 실행
3. React/Vue/HTML 코드 생성
4. 코드 다운로드

**장점:**
- ✅ 완전한 React 컴포넌트 생성
- ✅ 반응형 코드 생성
- ✅ GitHub 연동 가능

**단점:**
- ❌ 유료 플랜 필요 (고급 기능)
- ❌ 생성된 코드 수정 필요

---

#### 2-2. Figma to Code Plugin

**설치:**
1. Figma → Plugins → Browse all plugins
2. "Figma to Code" 검색 및 설치

**사용법:**
1. 프레임 또는 컴포넌트 선택
2. Plugins → Figma to Code 실행
3. HTML/CSS/React 코드 생성
4. 코드 복사 또는 다운로드

**장점:**
- ✅ 무료 사용 가능
- ✅ HTML, CSS, React 코드 생성
- ✅ Tailwind CSS 지원

---

#### 2-3. Builder.io Figma Plugin

**설치:**
1. Figma → Plugins → Browse all plugins
2. "Builder.io" 검색 및 설치

**사용법:**
1. 디자인 선택
2. Plugins → Builder.io 실행
3. React/Next.js 코드 생성
4. Builder.io 플랫폼에서 관리

**장점:**
- ✅ 시각적 편집 가능
- ✅ CMS 연동
- ✅ 실시간 업데이트

---

### 방법 3: Figma API 사용 (고급)

Figma REST API를 사용하여 디자인 데이터를 가져와 코드로 변환할 수 있습니다.

#### 필요한 것:
- Figma Personal Access Token
- Node.js 환경
- API 클라이언트 라이브러리

#### 기본 예시:
```javascript
// figma-api-example.js
const fetch = require('node-fetch');

const FIGMA_TOKEN = 'your-figma-token';
const FILE_KEY = 'JxjMHuwaBbBfiKtqEmEBUv';

async function getFigmaData() {
  const response = await fetch(
    `https://api.figma.com/v1/files/${FILE_KEY}`,
    {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    }
  );
  
  const data = await response.json();
  return data;
}

// 노드 정보 가져오기
async function getNodeData(nodeId) {
  const response = await fetch(
    `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${nodeId}`,
    {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    }
  );
  
  const data = await response.json();
  return data;
}
```

---

## 🔄 현재 프로젝트와 Figma 연동 방법

### 1. Figma 디자인 변경 시 코드 업데이트

현재 프로젝트는 수동으로 Figma 디자인을 코드로 변환한 상태입니다.

#### 업데이트 프로세스:

1. **Figma에서 디자인 변경**
   - Figma 파일에서 디자인 수정
   - 변경된 컴포넌트 확인

2. **코드에 반영**
   - Dev Mode에서 변경된 스타일 확인
   - 해당 컴포넌트 파일 수정
   - 예: `src/components/AboutPage.tsx` 수정

3. **테스트 및 배포**
   ```bash
   npm run dev  # 개발 서버 실행
   npm run build  # 빌드 테스트
   npm run deploy  # 배포
   ```

---

### 2. 자동화된 워크플로우 구축 (선택사항)

#### GitHub Actions를 사용한 자동 동기화

`.github/workflows/figma-sync.yml`:
```yaml
name: Figma Sync

on:
  schedule:
    - cron: '0 0 * * *'  # 매일 자정 실행
  workflow_dispatch:  # 수동 실행 가능

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Sync from Figma
        run: |
          # Figma API를 사용하여 디자인 데이터 가져오기
          # 코드 생성 및 업데이트
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "Auto-sync from Figma" || exit 0
          git push
```

---

## 🛠️ 추천 워크플로우

### 초기 개발 단계:
1. **Figma에서 디자인 완성**
2. **Dev Mode로 스타일 확인**
3. **수동으로 컴포넌트 구현**
4. **코드 최적화 및 기능 추가**

### 유지보수 단계:
1. **Figma에서 디자인 변경**
2. **Dev Mode로 변경사항 확인**
3. **해당 컴포넌트 파일 수정**
4. **테스트 및 배포**

---

## 📚 유용한 리소스

### Figma 공식 문서:
- [Figma Dev Mode 가이드](https://help.figma.com/hc/en-us/articles/360055204533)
- [Figma API 문서](https://www.figma.com/developers/api)
- [Figma 플러그인 개발](https://www.figma.com/plugin-docs/)

### 추천 플러그인:
1. **Anima** - React/Vue 코드 생성
2. **Figma to Code** - HTML/CSS/React 변환
3. **Builder.io** - 시각적 편집 및 코드 생성
4. **Figma to React** - React 컴포넌트 생성

### 코드 생성 도구:
1. **html.to.design** - 코드를 Figma로 변환 (역방향)
2. **Figma to React** - React 컴포넌트 생성
3. **Figma to Flutter** - Flutter 코드 생성

---

## ⚠️ 주의사항

### 코드 생성의 한계:

1. **완벽한 변환 불가능**
   - 생성된 코드는 항상 수정이 필요
   - 비즈니스 로직은 수동 구현 필요

2. **스타일 차이**
   - Figma의 픽셀 퍼펙트 디자인과 실제 렌더링 차이
   - 브라우저 호환성 고려 필요

3. **성능 최적화**
   - 생성된 코드는 최적화되지 않음
   - 번들 크기 최적화 필요

4. **접근성**
   - 자동 생성 코드는 접근성 고려 안 됨
   - 수동으로 ARIA 속성 추가 필요

---

## 🎯 현재 프로젝트 구조

### Figma Asset 관리:
```
vite.config.ts          # Figma asset alias 설정
src/vite-env.d.ts       # Figma asset 타입 선언
src/assets/             # 실제 이미지 파일
```

### 컴포넌트 구조:
```
src/components/         # React 컴포넌트
  - AboutPage.tsx       # About Us 페이지
  - ContactPage.tsx     # Contact 페이지
  - AlbumDetail.tsx     # 앨범 상세 페이지
  - ...                 # 기타 컴포넌트
```

### 스타일링:
- Tailwind CSS 사용
- 컴포넌트별 스타일 관리
- 반응형 디자인 적용

---

## 💡 팁

1. **디자인 시스템 구축**
   - Figma에서 디자인 토큰 정의
   - 코드에서 동일한 토큰 사용
   - 일관성 유지

2. **컴포넌트 라이브러리**
   - Figma 컴포넌트와 React 컴포넌트 매핑
   - 재사용 가능한 컴포넌트 구조

3. **자동화 도구 활용**
   - Storybook으로 컴포넌트 문서화
   - Chromatic으로 시각적 회귀 테스트

4. **협업 프로세스**
   - 디자이너와 개발자 간 명확한 커뮤니케이션
   - 변경사항 추적 및 문서화

---

## 🔗 관련 문서

- [FIGMA_UPDATE_GUIDE.md](./FIGMA_UPDATE_GUIDE.md) - Figma 디자인 변경 시 업데이트 가이드
- [README.md](./README.md) - 프로젝트 개요 및 배포 가이드

---

## 📞 추가 도움이 필요한 경우

1. **Figma 커뮤니티**: https://forum.figma.com/
2. **Figma Discord**: https://discord.gg/figma
3. **Figma YouTube 채널**: https://www.youtube.com/c/figmadesign



