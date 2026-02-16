import { Listing } from "@/types";
import ListingCard from "./ListingCard";

interface ListingGridProps {
  listings: Listing[];
}

export default function ListingGrid({ listings }: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-text-muted text-lg mb-2">No listings found</p>
        <p className="text-text-muted text-sm">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.slug} listing={listing} />
      ))}
    </div>
  );
}
