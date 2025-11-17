import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Story {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

interface FullWidthStoryProps {
  story: Story;
  index: number;
}

export function FullWidthStory({ story, index }: FullWidthStoryProps) {
  const isReverse = story.reverse || index % 2 === 1;

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className="w-full mb-24 md:mb-32 lg:mb-40"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${isReverse ? 'lg:direction-rtl' : ''}`}>
        {/* Image */}
        <div className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[600px] ${isReverse ? 'lg:order-2' : ''}`}>
          <ImageWithFallback
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className={`flex items-center bg-gray-50 ${isReverse ? 'lg:order-1' : ''}`}>
          <div className="px-8 md:px-12 lg:px-16 xl:px-24 py-12 md:py-16 lg:py-20">
            <div className="inline-block px-4 py-1 bg-black text-white text-xs tracking-widest mb-6">
              {story.category}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-6 tracking-tight leading-tight">
              {story.title}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
              {story.description}
            </p>
            <button className="group inline-flex items-center gap-2 text-sm tracking-wide hover:gap-4 transition-all">
              <span>자세히 보기</span>
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
