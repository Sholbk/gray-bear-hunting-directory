import Link from "next/link";
import { Listing } from "@/types";
import RatingStars from "./RatingStars";
import SuccessRateBadge from "./SuccessRateBadge";
import IntensityMeter from "./IntensityMeter";
import PriceRange from "./PriceRange";

interface ListingCardProps {
  listing: Listing;
}

const typeLabels: Record<string, string> = {
  guide: "Guide",
  outfitter: "Outfitter",
  charter: "Charter",
  lodge: "Lodge",
  land: "Land",
  boat: "Boat/Vehicle",
  taxidermy: "Taxidermy",
  retailer: "Retailer",
  "dog-trainer": "Dog Trainer",
  "shooting-range": "Range",
  education: "Education",
  processor: "Processor",
  photographer: "Photographer",
};

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link
      href={`/listing/${listing.slug}`}
      className="group bg-gray-dark rounded-xl border border-gray-light hover:border-amber-brand transition-all hover:shadow-lg hover:shadow-amber-brand/10 overflow-hidden flex flex-col"
    >
      <div className="relative h-48 bg-gray-medium">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-light/50 to-gray-medium flex items-center justify-center">
          <span className="text-5xl opacity-30">
            {listing.type === "guide" ? "🎯" : listing.type === "outfitter" ? "🏕️" : listing.type === "charter" ? "🎣" : "📍"}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-amber-brand/90 text-gray-dark text-xs font-bold px-2.5 py-1 rounded-full">
            {typeLabels[listing.type]}
          </span>
        </div>
        {listing.featured && (
          <div className="absolute top-3 right-3">
            <span className="bg-gray-dark/80 text-amber-brand text-xs font-bold px-2.5 py-1 rounded-full border border-amber-brand/50">
              Featured
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-brand transition-colors">
          {listing.name}
        </h3>
        <p className="text-gray-muted text-xs mb-3">
          {listing.location.city}, {listing.location.state}
        </p>
        <div className="flex items-center gap-3 mb-3">
          <RatingStars rating={listing.rating} size="sm" />
          <span className="text-gray-muted text-xs">
            ({listing.reviewCount})
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {listing.species.slice(0, 3).map((s) => (
            <span
              key={s}
              className="bg-gray-medium text-gray-text text-xs px-2 py-0.5 rounded"
            >
              {s}
            </span>
          ))}
          {listing.species.length > 3 && (
            <span className="text-gray-muted text-xs">
              +{listing.species.length - 3}
            </span>
          )}
        </div>
        <div className="mt-auto pt-4 border-t border-gray-light flex items-center justify-between">
          <SuccessRateBadge rate={listing.successRate} size="sm" />
          <PriceRange
            min={listing.priceRange.min}
            max={listing.priceRange.max}
            size="sm"
          />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <IntensityMeter level={listing.physicalIntensity} />
        </div>
      </div>
    </Link>
  );
}
