import Link from "next/link";
import { getTypeCount } from "@/lib/listings";

const categories = [
  {
    type: "guide" as const,
    title: "Hunting Guides",
    description: "Expert local guides for big game, upland birds, waterfowl, and more.",
    icon: "🎯",
  },
  {
    type: "outfitter" as const,
    title: "Outfitters",
    description: "Full-service outfitters with lodging, meals, and gear included.",
    icon: "🏕️",
  },
  {
    type: "charter" as const,
    title: "Fishing Charters",
    description: "Deep sea, river, and lake fishing charters with experienced captains.",
    icon: "🎣",
  },
];

export default function CategoryCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-dark text-center mb-10">
        Browse by Category
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.type}
            href={`/search?type=${cat.type}`}
            className="group bg-gray-dark rounded-xl p-6 border border-gray-light hover:border-amber-brand transition-all hover:shadow-lg hover:shadow-amber-brand/10"
          >
            <div className="text-4xl mb-4">{cat.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-brand transition-colors">
              {cat.title}
            </h3>
            <p className="text-gray-muted text-sm mb-4 leading-relaxed">
              {cat.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-amber-brand font-semibold text-sm">
                {getTypeCount(cat.type)} listings
              </span>
              <span className="text-gray-muted group-hover:text-amber-brand transition-colors">
                &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
