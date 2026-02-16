import { Suspense } from "react";
import SearchContent from "./SearchContent";

export const metadata = {
  title: "Search Listings | Gray Bear Hunting Directory",
  description:
    "Browse and filter hunting guides, outfitters, and fishing charters by success rate, price, intensity, and reviews.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-gray-muted text-center py-16">
            Loading listings...
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
