import { Suspense } from "react";
import SearchContent from "./SearchContent";
import { filterListings } from "@/lib/listings";
import ListingGrid from "@/components/ListingGrid";

export const metadata = {
  title: "Search Listings | Gray Bear Hunting Directory",
  description:
    "Browse and filter hunting guides, outfitters, and fishing charters by success rate, price, intensity, and reviews.",
};

function SearchFallback() {
  // Server-render first 24 listings so SSR/SEO gets real content
  const initial = filterListings({});
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Browse Listings
          </h1>
          <p className="text-text-muted text-sm mt-1">
            {initial.length} listing{initial.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>
      <ListingGrid listings={initial} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchContent />
    </Suspense>
  );
}
