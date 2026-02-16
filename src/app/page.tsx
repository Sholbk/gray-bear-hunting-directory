import Hero from "@/components/Hero";
import CategoryCards from "@/components/CategoryCards";
import FeaturedListings from "@/components/FeaturedListings";
import { getAllListings, getAllStates } from "@/lib/listings";
import { categories } from "@/data/categories";

export default function HomePage() {
  const totalListings = getAllListings().length;
  const totalStates = getAllStates().length;

  return (
    <>
      <Hero />
      <CategoryCards />

      {/* Stats Bar */}
      <section className="bg-gray-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-amber-brand">
                {totalListings}
              </p>
              <p className="text-gray-muted text-sm mt-1">Verified Listings</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-amber-brand">
                {totalStates}
              </p>
              <p className="text-gray-muted text-sm mt-1">States Covered</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-amber-brand">
                {categories.length}
              </p>
              <p className="text-gray-muted text-sm mt-1">Categories</p>
            </div>
          </div>
        </div>
      </section>

      <FeaturedListings />
    </>
  );
}
