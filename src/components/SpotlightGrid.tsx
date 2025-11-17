import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SectionTitle } from './SectionTitle';

interface SpotlightItem {
  id: string;
  thumbnail: string;
  title: string;
  description?: string;
}

interface SpotlightGridProps {
  items: SpotlightItem[];
  onSpotlightClick?: (spotlightId: string) => void;
  maxItems?: number;
}

export function SpotlightGrid({ items, onSpotlightClick, maxItems = 6 }: SpotlightGridProps) {
  // maxItems 개수만 표시
  const displayItems = items.slice(0, maxItems);

  return (
    <section className="py-20 md:py-24 lg:py-32 px-4 md:px-12 lg:px-16">
      <div className="mb-8">
        <SectionTitle 
          title="Spotlight" 
          subtitle="주목할 만한 아티스트와 음악" 
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {displayItems.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => onSpotlightClick?.(item.id)}
          >
            <div className="relative aspect-[3/4] overflow-hidden mb-3">
              <ImageWithFallback
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="space-y-1">
              <h4 className="tracking-tight group-hover:text-gray-600 transition-colors line-clamp-2 text-[24px]">
                {item.title}
              </h4>
              {item.description && (
                <p className="text-gray-600 line-clamp-2">
                  <small>{item.description}</small>
                </p>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}