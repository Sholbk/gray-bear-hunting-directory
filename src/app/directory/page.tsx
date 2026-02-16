import Link from "next/link";
import { categories } from "@/data/categories";
import { getAllListings } from "@/lib/listings";

export const metadata = {
  title: "All Categories | Gray Bear Hunting Directory",
  description: "Browse all hunting and fishing directory categories including guides, outfitters, charters, taxidermy, retailers, and more.",
};

export default function DirectoryPage() {
  const listings = getAllListings();

  function getCategoryCount(types: string[]): number {
    return listings.filter((l) => types.includes(l.type)).length;
  }

  return (
    <div className="bg-bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Browse by Category
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Explore our complete directory of hunting and fishing services across all categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const count = getCategoryCount(cat.types);
            return (
              <Link
                key={cat.slug}
                href={`/search?type=${cat.types[0]}`}
                className="group bg-bg-card rounded-xl p-6 border border-border hover:border-accent transition-all hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h2 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                  {cat.title}
                </h2>
                <p className="text-text-muted text-sm mb-4 leading-relaxed">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-accent font-semibold text-sm">
                    {count} {count === 1 ? "listing" : "listings"}
                  </span>
                  <span className="text-text-muted group-hover:text-accent transition-colors">
                    &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
