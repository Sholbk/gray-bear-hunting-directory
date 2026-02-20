import Link from "next/link";
import { Listing } from "@/types";
import Icon from "@/components/Icon";
import RatingStars from "./RatingStars";
import SuccessRateBadge from "./SuccessRateBadge";
import IntensityMeter from "./IntensityMeter";
import PriceRange from "./PriceRange";

interface ListingCardProps {
  listing: Listing;
}

const typeLabels: Record<string, string> = {
  guide: "Guide & Outfitter",
  outfitter: "Guide & Outfitter",
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
      className="group bg-bg-card rounded-2xl border border-border hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/10 overflow-hidden flex flex-col"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary/15 to-primary/5">
        {listing.image ? (
          <img
            src={listing.image}
            alt={listing.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name={listing.type === "guide" ? "hiking" : listing.type === "outfitter" ? "camping" : listing.type === "charter" ? "sailing" : "location_on"} className="w-12 h-12 text-primary/20" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-primary/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {typeLabels[listing.type]}
          </span>
        </div>
        {listing.featured && (
          <div className="absolute top-3 right-3">
            <span className="bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-text-primary font-bold text-lg mb-1 group-hover:text-primary transition-colors">
          {listing.name}
        </h3>
        <p className="text-text-muted text-xs mb-3">
          {listing.location.city}, {listing.location.state}
        </p>
        <div className="flex items-center gap-3 mb-3">
          <RatingStars rating={listing.rating} size="sm" />
          {listing.reviewCount > 0 && (
            <span className="text-text-muted text-xs">
              ({listing.reviewCount})
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {listing.species.slice(0, 3).map((s) => (
            <span
              key={s}
              className="bg-bg-input text-text-secondary text-xs px-2 py-0.5 rounded"
            >
              {s}
            </span>
          ))}
          {listing.species.length > 3 && (
            <span className="text-text-muted text-xs">
              +{listing.species.length - 3}
            </span>
          )}
        </div>
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
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
