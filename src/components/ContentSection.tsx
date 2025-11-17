interface ContentSectionProps {
  title: string;
  items: Array<{
    id: string;
    thumbnail: string;
    title: string;
    description?: string;
  }>;
  type: 'story' | 'spotlight';
}

export function ContentSection({ title, items, type }: ContentSectionProps) {
  return (
    <section className="mb-32" id={type === 'story' ? 'story' : 'spotlight'}>
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl tracking-tight mb-2">{title}</h2>
        <div className="w-16 h-0.5 bg-black"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {items.map((item) => (
          <article key={item.id} className="group cursor-pointer">
            <div
              className="w-full bg-gray-100 relative overflow-hidden mb-6 transition-transform duration-300 group-hover:scale-[1.02]"
              style={{
                aspectRatio: '4/3',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <div className="text-sm tracking-widest">{item.thumbnail}</div>
              </div>
            </div>
            <h3 className="text-lg tracking-wide mb-2 group-hover:opacity-60 transition-opacity">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
