import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllListings, getListingBySlug } from "@/lib/listings";
import RatingStars from "@/components/RatingStars";
import SuccessRateBadge from "@/components/SuccessRateBadge";
import IntensityMeter from "@/components/IntensityMeter";
import PriceRange from "@/components/PriceRange";
import ReviewCard from "@/components/ReviewCard";

// Generate a small subset at build time; the rest render on-demand
export function generateStaticParams() {
  return getAllListings()
    .filter((l) => l.featured)
    .map((listing) => ({ slug: listing.slug }));
}

// Allow pages not in generateStaticParams to render on-demand
export const dynamicParams = true;

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const listing = getListingBySlug(slug);
    if (!listing) return { title: "Listing Not Found" };
    return {
      title: `${listing.name} | Gray Bear Hunting Directory`,
      description: listing.description.slice(0, 160),
    };
  });
}

const typeLabels: Record<string, string> = {
  guide: "Hunting Guide",
  outfitter: "Outfitter",
  charter: "Fishing Charter",
  lodge: "Lodge",
  land: "Land",
  boat: "Boats & Vehicles",
  taxidermy: "Taxidermy",
  retailer: "Retailer",
  "dog-trainer": "Gun Dog Trainer",
  "shooting-range": "Shooting Range",
  education: "Education",
  processor: "Game Processor",
  photographer: "Photographer",
};

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  return (
    <div className="bg-bg-light">
      {/* Hero Section */}
      <div className="bg-primary relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="material-symbols-outlined text-[200px] text-white">
            {listing.type === "guide" ? "hiking" : listing.type === "outfitter" ? "camping" : listing.type === "charter" ? "sailing" : "location_on"}
          </span>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <Link
            href="/search"
            className="inline-flex items-center text-white/60 hover:text-white transition-colors text-sm mb-6"
          >
            <span className="material-symbols-outlined text-sm mr-1">arrow_back</span>
            Back to listings
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-accent text-white text-sm font-bold px-3 py-1 rounded-full">
              {typeLabels[listing.type]}
            </span>
            {listing.featured && (
              <span className="bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full border border-white/30">
                Featured
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            {listing.name}
          </h1>
          <div className="flex items-center gap-1 text-white/80 text-lg">
            <span className="material-symbols-outlined text-lg">location_on</span>
            {listing.location.city}, {listing.location.state}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                Success Rate
              </p>
              <SuccessRateBadge rate={listing.successRate} size="lg" />
            </div>
            <div>
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                Price Range
              </p>
              <PriceRange
                min={listing.priceRange.min}
                max={listing.priceRange.max}
                size="lg"
              />
            </div>
            <div>
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                Physical Intensity
              </p>
              <IntensityMeter level={listing.physicalIntensity} showLabel />
            </div>
            <div>
              <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                Rating
              </p>
              <div className="flex items-center gap-2">
                <RatingStars rating={listing.rating} size="md" />
                <span className="text-text-muted text-sm">
                  ({listing.reviewCount})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Description */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-text-primary mb-4">About</h2>
              <p className="text-text-secondary leading-relaxed text-base">
                {listing.description}
              </p>
            </section>

            {/* Species Tags */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Species & Game
              </h2>
              <div className="flex flex-wrap gap-2">
                {listing.species.map((s) => (
                  <Link
                    key={s}
                    href={`/search?species=${encodeURIComponent(s)}`}
                    className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Reviews ({listing.reviews.length})
              </h2>
              <div className="space-y-4">
                {listing.reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
            </section>
          </div>

          {/* Contact Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-bg-card rounded-2xl border border-border p-6 sticky top-24 shadow-sm">
              <h3 className="text-text-primary font-bold text-lg mb-5">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${listing.phone}`}
                    className="text-accent font-semibold hover:text-accent-light transition-colors"
                  >
                    {listing.phone}
                  </a>
                </div>
                <div>
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                    Website
                  </p>
                  <a
                    href={listing.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-semibold hover:text-accent-light transition-colors text-sm break-all"
                  >
                    Visit Website
                    <span className="material-symbols-outlined text-sm ml-1 align-middle">open_in_new</span>
                  </a>
                </div>
                <div>
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-1">
                    Location
                  </p>
                  <p className="text-text-primary font-medium">
                    {listing.location.city}, {listing.location.state}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <a
                  href={`tel:${listing.phone}`}
                  className="block w-full bg-accent hover:bg-accent-dark text-white font-bold text-center py-3 rounded-xl transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
