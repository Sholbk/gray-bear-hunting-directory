import { getFeaturedListings } from "@/lib/listings";
import ListingCard from "./ListingCard";

export default function FeaturedListings() {
  const featured = getFeaturedListings();

  return (
    <section className="bg-gray-darker py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Featured Listings
          </h2>
          <p className="text-gray-muted">
            Top-rated guides, outfitters, and charters hand-picked for you.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
