import Link from "next/link";
import { getFeaturedListings } from "@/lib/listings";

export default function FeaturedExpeditions() {
  const featured = getFeaturedListings();

  return (
    <section className="py-6">
      <div className="max-w-md mx-auto lg:max-w-3xl px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-text-primary">Featured Expeditions</h2>
          <Link href="/search" className="text-primary text-sm font-medium hover:underline">
            See all
          </Link>
        </div>
      </div>

      <div className="max-w-md mx-auto lg:max-w-3xl px-4">
        <div className="flex gap-4 overflow-x-auto scroll-hidden pb-4">
          {featured.map((listing) => (
            <Link
              key={listing.slug}
              href={`/listing/${listing.slug}`}
              className="min-w-[260px] max-w-[260px] bg-bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
            >
              {/* Image placeholder */}
              <div className="relative h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-primary/30">
                  {listing.type === "guide"
                    ? "hiking"
                    : listing.type === "charter"
                    ? "sailing"
                    : listing.type === "outfitter"
                    ? "camping"
                    : "location_on"}
                </span>
                <div className="absolute top-3 left-3">
                  <span className="bg-primary/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                    {listing.type}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-star text-sm">star</span>
                  <span className="text-sm font-semibold text-text-primary">
                    {listing.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-text-muted">
                    ({listing.reviewCount})
                  </span>
                </div>
                <h3 className="font-semibold text-text-primary text-sm mb-1 line-clamp-1">
                  {listing.name}
                </h3>
                <div className="flex items-center gap-1 text-text-muted text-xs mb-2">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {listing.location.city}, {listing.location.state}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-accent font-bold text-sm">
                      ${listing.priceRange.min.toLocaleString()}
                    </span>
                    <span className="text-text-muted text-xs"> / person</span>
                  </div>
                  <span className="text-xs text-text-muted bg-bg-input px-2 py-0.5 rounded-full">
                    {listing.successRate}% success
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
