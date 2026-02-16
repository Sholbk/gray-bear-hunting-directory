import { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "guides",
    title: "Hunting Guides",
    description: "Expert local guides for big game, upland birds, waterfowl, and more.",
    icon: "🎯",
    types: ["guide"],
  },
  {
    slug: "outfitters",
    title: "Outfitters",
    description: "Full-service outfitters with lodging, meals, and gear included.",
    icon: "🏕️",
    types: ["outfitter"],
  },
  {
    slug: "charters",
    title: "Fishing Charters",
    description: "Deep sea, river, and lake fishing charters with experienced captains.",
    icon: "🎣",
    types: ["charter"],
  },
  {
    slug: "boats-vehicles",
    title: "Boats & Vehicles",
    description: "Boat dealers, ATV rentals, and vehicle outfitting for the outdoors.",
    icon: "🚤",
    types: ["boat"],
  },
  {
    slug: "taxidermy",
    title: "Taxidermy",
    description: "Skilled taxidermists to preserve and mount your trophy harvests.",
    icon: "🦌",
    types: ["taxidermy"],
  },
  {
    slug: "retailers",
    title: "Retailers & Pro Shops",
    description: "Hunting and fishing gear, firearms, ammunition, and outdoor apparel.",
    icon: "🏪",
    types: ["retailer"],
  },
  {
    slug: "education",
    title: "Education & Safety",
    description: "Hunter education courses, safety certifications, and skills training.",
    icon: "📚",
    types: ["education"],
  },
  {
    slug: "gun-dogs",
    title: "Gun Dogs",
    description: "Dog trainers, breeders, and kennels specializing in hunting breeds.",
    icon: "🐕",
    types: ["dog-trainer"],
  },
  {
    slug: "shooting-ranges",
    title: "Shooting Ranges",
    description: "Indoor and outdoor ranges for rifle, shotgun, pistol, and archery.",
    icon: "🎯",
    types: ["shooting-range"],
  },
  {
    slug: "processing",
    title: "Game Processing",
    description: "Meat processors, butchers, and wild game specialty services.",
    icon: "🥩",
    types: ["processor"],
  },
];
