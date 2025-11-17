interface ProcessGridProps {
  items: Array<{
    id: string;
    label: string;
    description: string;
  }>;
}

export function ProcessGrid({ items }: ProcessGridProps) {
  return (
    <section className="mb-32" id="about">
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl tracking-tight mb-2">유통 프로세스</h2>
        <div className="w-16 h-0.5 bg-black"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {items.map((item, idx) => (
          <div key={item.id} className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-6 bg-black text-white flex items-center justify-center rounded-full text-xl">
                {idx + 1}
              </div>
              <h3 className="text-lg mb-3 tracking-wide">{item.label}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
            {idx < items.length - 1 && (
              <div className="hidden lg:block absolute top-10 -right-3 w-6 h-0.5 bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
