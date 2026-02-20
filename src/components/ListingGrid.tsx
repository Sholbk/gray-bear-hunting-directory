"use client";

import { useState } from "react";
import { Listing } from "@/types";
import ListingCard from "./ListingCard";

interface ListingGridProps {
  listings: Listing[];
}

const PAGE_SIZE = 24;

export default function ListingGrid({ listings }: ListingGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

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

  const visible = listings.slice(0, visibleCount);
  const hasMore = visibleCount < listings.length;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((listing) => (
          <ListingCard key={listing.slug} listing={listing} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="bg-bg-card border border-border text-text-primary px-8 py-3 rounded-xl font-semibold hover:border-primary hover:text-primary transition-colors"
          >
            Load More ({listings.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
