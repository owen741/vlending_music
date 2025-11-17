import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  thumbnail: string;
  excerpt: string;
  author: string;
  views?: number;
}

interface MagazineGridProps {
  articles: Article[];
  onArticleClick: (articleId: string) => void;
  onSpotlightClick?: (spotlightId: string) => void;
}

export function MagazineGrid({ articles, onArticleClick }: MagazineGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTrioIndex, setCurrentTrioIndex] = useState(0);

  // OUR STORY 최근 항목 (9개 = 3조)
  const displayArticles = articles.slice(0, 9);
  
  // 3개씩 묶기
  const articleTrios = [];
  for (let i = 0; i < displayArticles.length; i += 3) {
    articleTrios.push(displayArticles.slice(i, i + 3));
  }

  // 데스크톱: 5초마다 자동 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrioIndex((prev) => (prev + 1) % articleTrios.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articleTrios.length]);

  // 모바: 스와이프 감지
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.offsetWidth;
    const index = Math.round(scrollLeft / itemWidth);
    setCurrentIndex(index);
  };

  return (
    <section className="pt-20">
      {/* Desktop - 3 Column Layout (Small + Large + Small) */}
      <div className="hidden lg:block w-full px-0 relative overflow-hidden">
        <div className="flex gap-4 md:gap-6 items-center justify-center -mx-48">
          {articleTrios[currentTrioIndex]?.map((article, index) => (
            <article
              key={`${article.id}-${currentTrioIndex}`}
              className="group cursor-pointer relative overflow-hidden aspect-[4/3] flex-[20]"
              onClick={() => onArticleClick(article.id)}
            >
              {/* Article Image */}
              <ImageWithFallback
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Article Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 space-y-1 md:space-y-2 z-10">
                {/* Date */}
                <p className="text-white/70 tracking-wide text-[14px]">
                  {article.date}
                </p>
                
                {/* Title */}
                <h2 className="tracking-tight text-white group-hover:text-white/80 transition-colors text-xl md:text-2xl lg:text-3xl">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-white/60 line-clamp-2 text-sm md:text-base">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop Navigation Buttons */}
        <button
          onClick={() => setCurrentTrioIndex((prev) => (prev - 1 + articleTrios.length) % articleTrios.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 transition-all hover:scale-110"
          aria-label="Previous"
        >
          <ChevronLeft className="w-10 h-10 text-white drop-shadow-lg" />
        </button>
        <button
          onClick={() => setCurrentTrioIndex((prev) => (prev + 1) % articleTrios.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 transition-all hover:scale-110"
          aria-label="Next"
        >
          <ChevronRight className="w-10 h-10 text-white drop-shadow-lg" />
        </button>

        {/* Desktop Pagination Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {articleTrios.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTrioIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                currentTrioIndex === index 
                  ? 'w-6 bg-black' 
                  : 'w-1.5 bg-gray-300'
              }`}
              aria-label={`Go to trio ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile - Swipe Carousel */}
      <div className="lg:hidden w-full px-0">
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={handleScroll}
          >
            {displayArticles.map((article) => (
              <div
                key={article.id}
                className="w-full flex-shrink-0 snap-center"
              >
                <article
                  className="group cursor-pointer relative aspect-[4/3] overflow-hidden"
                  onClick={() => onArticleClick(article.id)}
                >
                  {/* Article Image */}
                  <ImageWithFallback
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Article Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1 z-10">
                    {/* Date */}
                    <p className="text-white/70 tracking-wide text-[10px]">{article.date}</p>
                    
                    {/* Title */}
                    <h2 className="tracking-tight text-white group-hover:text-white/80 transition-colors text-lg">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-white/60 line-clamp-1 text-xs">
                      {article.excerpt}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          <button
            onClick={() => {
              const newIndex = (currentIndex - 1 + displayArticles.length) % displayArticles.length;
              scrollContainerRef.current?.scrollTo({
                left: newIndex * scrollContainerRef.current.offsetWidth,
                behavior: 'smooth'
              });
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 transition-all hover:scale-110"
            aria-label="Previous"
          >
            <ChevronLeft className="w-10 h-10 text-white drop-shadow-lg" />
          </button>
          <button
            onClick={() => {
              const newIndex = (currentIndex + 1) % displayArticles.length;
              scrollContainerRef.current?.scrollTo({
                left: newIndex * scrollContainerRef.current.offsetWidth,
                behavior: 'smooth'
              });
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 transition-all hover:scale-110"
            aria-label="Next"
          >
            <ChevronRight className="w-10 h-10 text-white drop-shadow-lg" />
          </button>

          {/* Mobile Pagination Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {displayArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  scrollContainerRef.current?.scrollTo({
                    left: index * scrollContainerRef.current.offsetWidth,
                    behavior: 'smooth'
                  });
                }}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === index 
                    ? 'w-6 bg-black' 
                    : 'w-1.5 bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}