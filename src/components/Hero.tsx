import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="relative bg-gray-darker overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-dark via-gray-darker to-gray-dark" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-brand/30 via-transparent to-transparent" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Find Your{" "}
            <span className="text-amber-brand">Optimal Hunt</span>
          </h1>
          <p className="text-gray-text text-lg sm:text-xl mb-8 leading-relaxed">
            Browse verified guides, outfitters, and charters — filtered by
            success rates, price, physical intensity, and honest reviews.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar large />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-gray-muted">
            <span>Popular:</span>
            <a href="/search?species=Elk" className="text-amber-brand hover:text-amber-light transition-colors">Elk</a>
            <a href="/search?species=Whitetail" className="text-amber-brand hover:text-amber-light transition-colors">Whitetail</a>
            <a href="/search?species=Salmon" className="text-amber-brand hover:text-amber-light transition-colors">Salmon</a>
            <a href="/search?species=Turkey" className="text-amber-brand hover:text-amber-light transition-colors">Turkey</a>
            <a href="/search?species=Pheasant" className="text-amber-brand hover:text-amber-light transition-colors">Pheasant</a>
          </div>
        </div>
      </div>
    </section>
  );
}
