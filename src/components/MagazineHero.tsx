import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
}

interface MagazineHeroProps {
  slides: Slide[];
}

export function MagazineHero({ slides }: MagazineHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 min-h-[85vh] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* Left: Main Content */}
          <div className="lg:col-span-9 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h1 className="text-6xl sm:text-7xl lg:text-8xl tracking-tight">
                  Music
                </h1>

                <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
                    <div className="text-sm lg:text-base mb-3 opacity-90">
                      {currentSlide.date}
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-tight">
                      {currentSlide.title}
                    </h2>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className="h-1 flex-1 bg-black/10 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-blue-600"
                        initial={{ width: '0%' }}
                        animate={{
                          width: index === currentIndex ? '100%' : index < currentIndex ? '100%' : '0%',
                        }}
                        transition={{
                          duration: index === currentIndex ? 5 : 0.3,
                          ease: 'linear',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Side Stories */}
          <div className="lg:col-span-3 space-y-4">
            {slides.slice(0, 3).map((slide, index) => (
              <motion.button
                key={slide.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-full text-left transition-opacity ${
                  index === currentIndex ? 'opacity-100' : 'opacity-50 hover:opacity-70'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-2">
                  <div className="aspect-[16/11] rounded overflow-hidden">
                    <ImageWithFallback
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">{slide.date}</div>
                    <h3 className="text-xs leading-tight">{slide.subtitle || slide.title}</h3>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
