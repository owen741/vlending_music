import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronDown } from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

interface FullScreenHeroProps {
  slides: Slide[];
}

export function FullScreenHero({ slides }: FullScreenHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden mb-24 md:mb-32 lg:mb-40 bg-[#222222]" id="home">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-5xl mb-12">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 tracking-tight">
              {currentSlide.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90 tracking-wide">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 transition-all ${
              index === currentIndex ? 'w-12 bg-white' : 'w-8 bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll to content"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}
