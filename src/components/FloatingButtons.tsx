import { Music, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FloatingButtonsProps {
  isMenuOpen?: boolean;
}

export function FloatingButtons({ isMenuOpen = false }: FloatingButtonsProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 중에는 숨김
      setIsVisible(false);

      // 기존 타임아웃 제거
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // 스크롤이 멈추면 300ms 후 다시 표시
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 300);

      setScrollTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  // 모바일 메뉴가 열려있으면 숨김
  if (isMenuOpen) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-8 right-8 flex flex-col gap-3 z-40 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {/* 음원유통신청 버튼 */}
      <a
        href="https://artist.vlending.co.kr/"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 md:w-[84px] md:h-[84px] bg-black text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
        aria-label="음원유통신청"
      >
        <Music className="w-6 h-6 md:w-9 md:h-9" />
        {/* 툴팁 */}
        <span className="absolute right-16 md:right-24 whitespace-nowrap bg-black text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          음원유통신청
        </span>
      </a>

      {/* 챗봇 버튼 */}
      <button
        onClick={() => {
          // 챗봇 기능 구현
          console.log('챗봇 열기');
        }}
        className="group relative flex items-center justify-center w-14 h-14 md:w-[84px] md:h-[84px] bg-black text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
        aria-label="챗봇"
      >
        <MessageCircle className="w-6 h-6 md:w-9 md:h-9" />
        {/* 툴팁 */}
        <span className="absolute right-16 md:right-24 whitespace-nowrap bg-black text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          챗봇
        </span>
      </button>
    </div>
  );
}
