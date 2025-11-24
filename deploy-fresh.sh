#!/bin/bash

# 완전히 새로운 빌드 및 배포 스크립트 (캐시 무효화)

echo "🧹 이전 빌드 및 캐시 삭제 중..."
cd "$(dirname "$0")"

# 이전 빌드 삭제
rm -rf dist

# Vite 캐시 삭제
rm -rf node_modules/.vite

# 빌드 캐시 삭제
rm -rf .vite

echo "📦 새로운 빌드 생성 중..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 빌드 실패"
    exit 1
fi

echo "✅ 빌드 완료"

# 빌드 시간 확인
echo "📅 빌드 시간: $(date)"

# dist 폴더 확인
if [ ! -d "dist" ]; then
    echo "❌ dist 폴더를 찾을 수 없습니다"
    exit 1
fi

echo "🌐 GitHub Pages에 배포 중..."
npx gh-pages -d dist --message "Deploy: $(date +%Y-%m-%d\ %H:%M:%S) - 캐시 무효화된 새 빌드"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 배포 완료!"
    echo ""
    echo "📍 사이트 주소: https://owen741.github.io/vlending_music/"
    echo ""
    echo "💡 중요:"
    echo "   1. 배포 후 5-10분 정도 기다려주세요"
    echo "   2. 브라우저에서 하드 리프레시를 실행하세요:"
    echo "      - Mac: Cmd + Shift + R"
    echo "      - Windows: Ctrl + Shift + R"
    echo "   3. 시크릿 모드에서도 확인해보세요"
    echo ""
else
    echo "❌ 배포 실패"
    exit 1
fi

