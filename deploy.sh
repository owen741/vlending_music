#!/bin/bash

# 피그마 디자인 업데이트 배포 스크립트

echo "🚀 배포를 시작합니다..."

# 프로젝트 루트로 이동
cd "$(dirname "$0")"

# 1. 빌드
echo "📦 빌드 중..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 빌드 실패"
    exit 1
fi

echo "✅ 빌드 완료"

# 2. dist 폴더 확인
if [ ! -d "dist" ]; then
    echo "❌ dist 폴더를 찾을 수 없습니다"
    exit 1
fi

# 3. gh-pages로 배포
echo "🌐 GitHub Pages에 배포 중..."
npx gh-pages -d dist

if [ $? -eq 0 ]; then
    echo "✅ 배포 완료!"
    echo "📍 사이트 주소: https://owen741.github.io/vlending_music/"
else
    echo "❌ 배포 실패"
    echo "💡 수동 배포 방법:"
    echo "   cd dist"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Deploy: 피그마 디자인 업데이트 반영'"
    echo "   git branch -M gh-pages"
    echo "   git remote add origin https://github.com/owen741/vlending_music.git"
    echo "   git push -f origin gh-pages"
    exit 1
fi

