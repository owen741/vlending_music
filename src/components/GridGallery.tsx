import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VlendingSymbol } from './VlendingSymbol';
import { useEffect, useRef, useState } from 'react';
import { SectionTitle } from './SectionTitle';

interface AlbumItem {
  id: string;
  title: string;
  subtitle: string;
  artist: string;
  image?: string;
  description: string;
}

interface GridGalleryProps {
  title: string;
  items: AlbumItem[];
  onAlbumClick?: (albumId: string) => void;
}

export function GridGallery({ title, items, onAlbumClick }: GridGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let lastTimestamp = 0;
    const scrollSpeed = 0.5; // 픽셀/프레임 (속도 조절)

    const autoScroll = (timestamp: number) => {
      if (!isPaused && scrollContainer) {
        if (lastTimestamp === 0) {
          lastTimestamp = timestamp;
        }

        const delta = timestamp - lastTimestamp;
        const scrollAmount = (scrollSpeed * delta) / 16; // 60fps 기준 정규화

        scrollContainer.scrollLeft += scrollAmount;

        // 끝에 도달하면 처음으로 돌아가기
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        }

        lastTimestamp = timestamp;
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-24 lg:py-32 bg-white" id="released">
      <div className="relative z-10">
        <div className="px-4 md:px-12 lg:px-16 mb-8">
          <SectionTitle title={title} />
        </div>

        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden scrollbar-hide"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="flex gap-8 px-4 md:px-12 lg:px-16 pb-4" style={{ width: 'max-content' }}>
            {/* 무한 루프를 위해 items를 3번 반복 */}
            {[...items, ...items, ...items].map((item, index) => (
              <motion.article
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % items.length) * 0.1 }}
                className="group cursor-pointer flex-shrink-0 w-64 md:w-72 lg:w-80"
                onClick={() => onAlbumClick?.(item.id)}
              >
                <div className="block">
                  <div className="relative aspect-square overflow-hidden mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                      {item.image ? (
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <VlendingSymbol />
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="tracking-wider text-gray-500 uppercase text-[15px]"><small>{item.subtitle}</small></p>
                    <h3 className="tracking-tight group-hover:text-gray-600 transition-colors text-[20px]">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-[16px]"><small>{item.artist}</small></p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}