import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Story {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

interface OurStorySectionProps {
  stories: Story[];
}

export function OurStorySection({ stories }: OurStorySectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="mb-32" id="story">
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl tracking-tight mb-2">Our Story</h2>
        <div className="w-16 h-0.5 bg-black"></div>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={stories[currentIndex].image}
                  alt={stories[currentIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div className="inline-block px-4 py-1 bg-black text-white text-xs tracking-widest">
                  {stories[currentIndex].category}
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                  {stories[currentIndex].title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {stories[currentIndex].description}
                </p>
                <div className="text-sm text-gray-500">{stories[currentIndex].date}</div>

                {/* Navigation Dots */}
                <div className="flex gap-2 pt-4">
                  {stories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }}
                      className={`h-1 transition-all ${
                        index === currentIndex ? 'w-12 bg-black' : 'w-6 bg-gray-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="p-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="p-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
