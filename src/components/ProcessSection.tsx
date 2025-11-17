import { motion } from 'motion/react';
import { SectionTitle } from './SectionTitle';
import { Upload, FileCheck, Globe, TrendingUp } from 'lucide-react';

interface ProcessStep {
  id: string;
  label: string;
  description: string;
}

interface ProcessSectionProps {
  items: ProcessStep[];
}

export function ProcessSection({ items }: ProcessSectionProps) {
  const icons = [Upload, FileCheck, Globe, TrendingUp];
  
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-white" id="about">
      <div className="px-4 md:px-12 lg:px-16">
        <div className="mb-16 md:mb-24">
          <SectionTitle 
            title="유통 프로세스" 
            subtitle="간단한 4단계로 당신의 음악을 전 세계에 전달하세요"
          />
        </div>

        {/* Desktop: Horizontal layout with minimal design */}
        <div className="hidden lg:block relative">
          <div className="grid grid-cols-4 gap-12 xl:gap-16">
            {items.map((item, index) => {
              const Icon = icons[index] || Upload;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Large Number */}
                  <div className="mb-6 relative">
                    <span className="text-7xl tracking-tight text-black/5" style={{ fontWeight: 300 }}>
                      0{index + 1}
                    </span>
                    
                    {/* Arrow connector */}
                    {index < items.length - 1 && (
                      <div className="absolute left-[calc(100%+1.5rem)] xl:left-[calc(100%+2rem)] top-8 w-12 xl:w-16 h-px bg-black/10"></div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 tracking-tight text-black">
                    {item.label}
                  </h3>

                  {/* Description - List */}
                  <ul className="space-y-2 text-gray-600">
                    {item.description.split('\n').map((line, i) => (
                      line.trim() && (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-black/30 mt-1 flex-shrink-0">—</span>
                          <span><small>{line.trim().replace(/^-\s*/, '')}</small></span>
                        </li>
                      )
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet: Vertical layout */}
        <div className="lg:hidden space-y-12">
          {items.map((item, index) => {
            const Icon = icons[index] || Upload;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative border-l-2 border-black/10 pl-6"
              >
                {/* Number */}
                <div className="mb-4">
                  <span className="text-5xl tracking-tight text-black/5" style={{ fontWeight: 300 }}>
                    0{index + 1}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="mb-4 tracking-tight text-black">
                  {item.label}
                </h3>

                {/* Description - List */}
                <ul className="space-y-2 text-gray-600">
                  {item.description.split('\n').map((line, i) => (
                    line.trim() && (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-black/30 mt-1 flex-shrink-0">—</span>
                        <span><small>{line.trim().replace(/^-\s*/, '')}</small></span>
                      </li>
                    )
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}