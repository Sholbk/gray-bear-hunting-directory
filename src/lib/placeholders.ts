import { ListingType } from "@/types";

const placeholderMap: Record<ListingType, string> = {
  guide: "/images/placeholders/guide.svg",
  outfitter: "/images/placeholders/outfitter.svg",
  charter: "/images/placeholders/charter.svg",
  lodge: "/images/placeholders/lodge.svg",
  land: "/images/placeholders/land.svg",
  boat: "/images/placeholders/boat.svg",
  taxidermy: "/images/placeholders/taxidermy.svg",
  retailer: "/images/placeholders/retailer.svg",
  "dog-trainer": "/images/placeholders/dog-trainer.svg",
  "shooting-range": "/images/placeholders/shooting-range.svg",
  education: "/images/placeholders/education.svg",
  processor: "/images/placeholders/processor.svg",
  photographer: "/images/placeholders/photographer.svg",
};

export function getPlaceholderImage(type: ListingType): string {
  return placeholderMap[type] || "/images/placeholders/guide.svg";
}
