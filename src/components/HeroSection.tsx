export function HeroSection() {
  return (
    <section className="relative h-[60vh] min-h-[400px] max-h-[600px] mb-24">
      <div
        className="absolute inset-0 bg-gray-100"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #f5f5f5 10px, #f5f5f5 20px)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-4">
              MUSIC DISTRIBUTION
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 tracking-wide">
              Your Sound, Everywhere
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
