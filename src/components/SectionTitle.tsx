import { motion } from 'motion/react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionTitle({ title, subtitle, align = 'left', className = '' }: SectionTitleProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`${alignClass} ${className}`}
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-3 font-semibold uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}