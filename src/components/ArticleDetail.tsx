import { motion } from 'motion/react';
import { ArrowLeft, Share2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FloatingButtons } from './FloatingButtons';

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  thumbnail: string;
  excerpt: string;
  content: {
    sections: {
      heading?: string;
      text: string;
      image?: string;
    }[];
  };
  author?: string;
}

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  previousPageName?: string;
}

export function ArticleDetail({ article, onBack, previousPageName = 'Our Story' }: ArticleDetailProps) {
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
          src={article.thumbnail}
          alt={article.title}
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
                <span>{article.category}</span>
                <span>·</span>
                <time>{article.date}</time>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight">
                {article.title}
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {article.excerpt}
              </p>
              
              {article.author && (
                <div className="text-sm text-gray-500">
                  <span>By {article.author}</span>
                </div>
              )}
              
              {/* Share Button */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.title,
                      text: article.excerpt,
                      url: window.location.href,
                    }).catch((err) => console.log('Error sharing:', err));
                  } else {
                    // Fallback: Copy to clipboard
                    navigator.clipboard.writeText(window.location.href);
                    alert('링크가 복사되었습니다!');
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-colors group"
              >
                <Share2 className="w-4 h-4" />
                <span className="tracking-wide">공유하기</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column - Scrollable Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-8 space-y-12"
          >
            {article.content.sections.map((section, index) => (
              <div key={index} className="space-y-6">
                {section.heading && (
                  <h2 className="text-2xl md:text-3xl tracking-tight">
                    {section.heading}
                  </h2>
                )}
                {section.image && (
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100 my-8">
                    <ImageWithFallback
                      src={section.image}
                      alt={section.heading || 'Article image'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                  {section.text}
                </div>
              </div>
            ))}

            {/* Article Footer */}
            <div className="pt-12 border-t border-gray-200">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-8 py-4 bg-black text-white hover:bg-gray-800 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="tracking-wide">Back to {previousPageName}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating buttons */}
      <FloatingButtons />
    </div>
  );
}