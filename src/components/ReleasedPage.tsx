import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AlbumPage } from './AlbumPage';
import { SpotlightPage } from './SpotlightPage';

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

interface ReleasedPageProps {
  albums: AlbumItem[];
  onAlbumClick: (albumId: string) => void;
  onSpotlightClick: (spotlightId: string) => void;
  initialTab?: 'album' | 'spotlight';
}

export function ReleasedPage({ albums, onAlbumClick, onSpotlightClick, initialTab }: ReleasedPageProps) {
  const [activeTab, setActiveTab] = useState<'album' | 'spotlight'>(initialTab || 'album');

  // initialTab이 변경되면 activeTab 업데이트
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Sub Navigation - GNB 바로 아래 */}
      <div className="border-b border-gray-200 sticky top-20 z-40">
        <div className="px-4 md:px-12 lg:px-16 backdrop-blur-md bg-white/80">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('album')}
              className={`py-4 relative transition-colors ${
                activeTab === 'album'
                  ? 'text-black'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="tracking-wider uppercase text-sm">ALBUM</span>
              {activeTab === 'album' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('spotlight')}
              className={`py-4 relative transition-colors ${
                activeTab === 'spotlight'
                  ? 'text-black'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="tracking-wider uppercase text-sm">SPOTLIGHT</span>
              {activeTab === 'spotlight' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'album' ? (
          <AlbumPage albums={albums} onAlbumClick={onAlbumClick} />
        ) : (
          <SpotlightPage onSpotlightClick={onSpotlightClick} />
        )}
      </motion.div>
    </div>
  );
}