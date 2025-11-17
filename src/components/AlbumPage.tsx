import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VlendingSymbol } from './VlendingSymbol';
import { SectionTitle } from './SectionTitle';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AlbumItem {
  id: string;
  title: string;
  subtitle: string;
  artist: string;
  image?: string;
  description: string;
  youtubeUrl?: string;
  releaseDate?: string;
  label?: string;
  tracks?: Array<{
    number: number;
    title: string;
    duration?: string;
  }>;
  credits?: Array<{
    role: string;
    name: string;
  }>;
  detailedDescription?: string;
}

interface AlbumPageProps {
  albums: AlbumItem[];
  onAlbumClick: (albumId: string) => void;
}

const ITEMS_PER_PAGE = 8;
const MAX_ITEMS = 20;

export function AlbumPage({ albums, onAlbumClick }: AlbumPageProps) {
  // 최대 20개로 제한
  const limitedAlbums = albums.slice(0, MAX_ITEMS);
  
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일: 무한스크롤
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < limitedAlbums.length && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, limitedAlbums.length));
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [displayCount, limitedAlbums.length, isLoading, isMobile]);

  // PC: 페이지 변경 시 스크롤 최상단 이동
  useEffect(() => {
    if (!isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, isMobile]);

  const totalPages = Math.ceil(limitedAlbums.length / ITEMS_PER_PAGE);
  
  // PC: 페이지네이션, 모바일: 무한스크롤
  const displayedAlbums = isMobile 
    ? limitedAlbums.slice(0, displayCount)
    : limitedAlbums.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="px-4 md:px-12 lg:px-16 pt-12 md:pt-16 lg:pt-20 pb-8">
        <SectionTitle 
          title="Album" 
          subtitle="최신 앨범과 발매된 모든 음악을 만나보세요"
        />
      </div>

      {/* Album Grid */}
      <div className="px-4 md:px-12 lg:px-16 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {displayedAlbums.map((album, index) => (
            <motion.article
              key={album.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index % ITEMS_PER_PAGE) * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onAlbumClick(album.id)}
            >
              <div className="space-y-4">
                {/* Album Cover */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  {album.image ? (
                    <ImageWithFallback
                      src={album.image}
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <VlendingSymbol />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>

                {/* Album Info */}
                <div className="space-y-2">
                  <h3 className="text-lg tracking-tight group-hover:text-gray-600 transition-colors">
                    {album.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {album.artist}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Loading Indicator & Observer Target - 모바일만 */}
        {isMobile && displayCount < limitedAlbums.length && (
          <div ref={observerTarget} className="flex justify-center py-12">
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                <span>Loading more albums...</span>
              </div>
            )}
          </div>
        )}

        {/* End Message - 모바일만 */}
        {isMobile && displayCount >= limitedAlbums.length && limitedAlbums.length > ITEMS_PER_PAGE && (
          <div className="text-center py-12 text-gray-500">
            모든 앨범을 확인하셨습니다
          </div>
        )}

        {/* Pagination - PC만 */}
        {!isMobile && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, idx) => (
                page === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    className={`min-w-[40px] px-3 py-2 rounded transition-colors ${
                      page === currentPage 
                        ? 'bg-black text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handlePageChange(page as number)}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>
            
            <button
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}