interface AlbumItem {
  id: string;
  title: string;
  artist: string;
}

interface AlbumSectionProps {
  items: AlbumItem[];
}

export function AlbumSection({ items }: AlbumSectionProps) {
  return (
    <section className="mb-32" id="released">
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl tracking-tight mb-2">Album</h2>
        <div className="w-16 h-0.5 bg-black"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:gap-8">
        {items.map((item) => (
          <article key={item.id} className="group cursor-pointer">
            <div className="w-full aspect-square bg-gray-100 relative overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-[1.05]">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100"></div>
            </div>
            <div className="text-sm leading-tight">
              <div className="mb-1 group-hover:opacity-60 transition-opacity">{item.title}</div>
              <div className="text-gray-500 text-xs">{item.artist}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
