import Link from "next/link";
import { categories } from "@/data/categories";
import { getAllListings } from "@/lib/listings";

export default function CategoryCards() {
  const listings = getAllListings();

  function getCount(types: string[]): number {
    return listings.filter((l) => types.includes(l.type)).length;
  }

  // Show top 6 categories on homepage
  const displayCategories = categories.slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-dark text-center mb-10">
        Browse by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/search?type=${cat.types[0]}`}
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
                {getCount(cat.types)} listings
              </span>
              <span className="text-gray-muted group-hover:text-amber-brand transition-colors">
                &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href="/directory"
          className="text-amber-brand hover:text-amber-light font-medium text-sm transition-colors"
        >
          View All Categories &rarr;
        </Link>
      </div>
    </section>
  );
}
