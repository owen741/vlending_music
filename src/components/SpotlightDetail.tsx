import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FloatingButtons } from './FloatingButtons';

interface SpotlightItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  content: {
    sections: {
      heading?: string;
      text: string;
      image?: string;
    }[];
  };
  date?: string;
  author?: string;
}

interface SpotlightDetailProps {
  spotlight: SpotlightItem;
  onBack: () => void;
  previousPageName?: string;
}

export function SpotlightDetail({ spotlight, onBack, previousPageName = 'Home' }: SpotlightDetailProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
        <div className="px-4 md:px-12 lg:px-16 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to {previousPageName}</span>
          </button>
        </div>
      </header>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full aspect-[5/3] md:aspect-[10/3] bg-gray-100 pt-20"
      >
        <ImageWithFallback
          src={spotlight.image}
          alt={spotlight.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </motion.div>

      {/* Two Column Layout */}
      <div className="px-4 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - Sticky Title Area */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-gray-500">
                <span>{spotlight.category}</span>
                {spotlight.date && (
                  <>
                    <span>·</span>
                    <time>{spotlight.date}</time>
                  </>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight">
                {spotlight.title}
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {spotlight.description}
              </p>
              
              {spotlight.author && (
                <div className="text-sm text-gray-500">
                  <span>By {spotlight.author}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column - Scrollable Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-8 space-y-12"
          >
            {spotlight.content.sections.map((section, index) => (
              <div key={index} className="space-y-6">
                {section.heading && (
                  <h2 className="text-2xl md:text-3xl tracking-tight">
                    {section.heading}
                  </h2>
                )}
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {section.text}
                </p>
                {section.image && (
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={section.image}
                      alt={section.heading || spotlight.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Floating buttons */}
      <FloatingButtons />
    </div>
  );
}