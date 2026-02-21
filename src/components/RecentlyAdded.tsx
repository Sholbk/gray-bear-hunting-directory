import Link from "next/link";
import { getAllListings } from "@/lib/listings";
import Icon from "@/components/Icon";
import { getPlaceholderImage } from "@/lib/placeholders";

export default function RecentlyAdded() {
  // Get non-featured listings as "recently added"
  const all = getAllListings();
  const recent = all.filter((l) => !l.featured).slice(0, 5);

  return (
    <section className="py-6">
      <div className="max-w-md mx-auto lg:max-w-3xl px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-text-primary">Recently Added</h2>
          <Link href="/search" className="text-primary text-sm font-medium hover:underline">
            See all
          </Link>
        </div>

        <div className="space-y-3">
          {recent.map((listing) => (
            <Link
              key={listing.slug}
              href={`/listing/${listing.slug}`}
              className="flex items-center gap-3 bg-bg-card rounded-xl p-3 border border-border hover:shadow-sm transition-shadow"
            >
              <img
                src={listing.image || getPlaceholderImage(listing.type)}
                alt={listing.name}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                loading="lazy"
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text-primary text-sm truncate">
                  {listing.name}
                </h3>
                <div className="flex items-center gap-1 text-text-muted text-xs mt-0.5">
                  <Icon name="location_on" className="w-3 h-3" />
                  {listing.location.city}, {listing.location.state}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {listing.rating > 0 ? (
                    <div className="flex items-center gap-0.5">
                      <Icon name="star" className="w-3 h-3 text-star" />
                      <span className="text-xs font-medium text-text-primary">
                        {listing.rating.toFixed(1)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-text-muted">New</span>
                  )}
                  <span className="text-xs text-text-muted">
                    {listing.species.slice(0, 2).join(", ")}
                  </span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                {listing.priceRange.min > 0 ? (
                  <>
                    <p className="text-accent font-bold text-sm">
                      ${listing.priceRange.min.toLocaleString()}
                    </p>
                    <p className="text-text-muted text-xs">per person</p>
                  </>
                ) : (
                  <p className="text-text-muted text-xs">Contact for pricing</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
