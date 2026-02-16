import { SpeciesEntry } from "@/types";

export const species: SpeciesEntry[] = [
  // Big Game - Hunting
  { name: "Elk", slug: "elk", category: "hunting", subcategory: "Big Game" },
  { name: "Whitetail Deer", slug: "whitetail-deer", category: "hunting", subcategory: "Big Game" },
  { name: "Mule Deer", slug: "mule-deer", category: "hunting", subcategory: "Big Game" },
  { name: "Moose", slug: "moose", category: "hunting", subcategory: "Big Game" },
  { name: "Black Bear", slug: "black-bear", category: "hunting", subcategory: "Big Game" },
  { name: "Grizzly Bear", slug: "grizzly-bear", category: "hunting", subcategory: "Big Game" },
  { name: "Pronghorn Antelope", slug: "pronghorn-antelope", category: "hunting", subcategory: "Big Game" },
  { name: "Mountain Lion", slug: "mountain-lion", category: "hunting", subcategory: "Big Game" },
  { name: "Bighorn Sheep", slug: "bighorn-sheep", category: "hunting", subcategory: "Big Game" },
  { name: "Wild Boar", slug: "wild-boar", category: "hunting", subcategory: "Big Game" },
  { name: "Caribou", slug: "caribou", category: "hunting", subcategory: "Big Game" },
  { name: "Bison", slug: "bison", category: "hunting", subcategory: "Big Game" },

  // Upland Birds - Hunting
  { name: "Pheasant", slug: "pheasant", category: "hunting", subcategory: "Upland Birds" },
  { name: "Quail", slug: "quail", category: "hunting", subcategory: "Upland Birds" },
  { name: "Grouse", slug: "grouse", category: "hunting", subcategory: "Upland Birds" },
  { name: "Chukar", slug: "chukar", category: "hunting", subcategory: "Upland Birds" },
  { name: "Dove", slug: "dove", category: "hunting", subcategory: "Upland Birds" },
  { name: "Woodcock", slug: "woodcock", category: "hunting", subcategory: "Upland Birds" },

  // Waterfowl - Hunting
  { name: "Duck", slug: "duck", category: "hunting", subcategory: "Waterfowl" },
  { name: "Goose", slug: "goose", category: "hunting", subcategory: "Waterfowl" },
  { name: "Sandhill Crane", slug: "sandhill-crane", category: "hunting", subcategory: "Waterfowl" },

  // Turkey - Hunting
  { name: "Turkey", slug: "turkey", category: "hunting", subcategory: "Turkey" },

  // Small Game - Hunting
  { name: "Rabbit", slug: "rabbit", category: "hunting", subcategory: "Small Game" },
  { name: "Squirrel", slug: "squirrel", category: "hunting", subcategory: "Small Game" },
  { name: "Coyote", slug: "coyote", category: "hunting", subcategory: "Small Game" },
  { name: "Prairie Dog", slug: "prairie-dog", category: "hunting", subcategory: "Small Game" },

  // Freshwater Fish
  { name: "Bass", slug: "bass", category: "fishing", subcategory: "Freshwater" },
  { name: "Walleye", slug: "walleye", category: "fishing", subcategory: "Freshwater" },
  { name: "Trout", slug: "trout", category: "fishing", subcategory: "Freshwater" },
  { name: "Salmon", slug: "salmon", category: "fishing", subcategory: "Freshwater" },
  { name: "Catfish", slug: "catfish", category: "fishing", subcategory: "Freshwater" },
  { name: "Musky", slug: "musky", category: "fishing", subcategory: "Freshwater" },
  { name: "Pike", slug: "pike", category: "fishing", subcategory: "Freshwater" },
  { name: "Crappie", slug: "crappie", category: "fishing", subcategory: "Freshwater" },
  { name: "Steelhead", slug: "steelhead", category: "fishing", subcategory: "Freshwater" },
  { name: "Striped Bass", slug: "striped-bass", category: "fishing", subcategory: "Freshwater" },

  // Saltwater Fish
  { name: "Marlin", slug: "marlin", category: "fishing", subcategory: "Saltwater" },
  { name: "Tuna", slug: "tuna", category: "fishing", subcategory: "Saltwater" },
  { name: "Mahi-Mahi", slug: "mahi-mahi", category: "fishing", subcategory: "Saltwater" },
  { name: "Red Snapper", slug: "red-snapper", category: "fishing", subcategory: "Saltwater" },
  { name: "Grouper", slug: "grouper", category: "fishing", subcategory: "Saltwater" },
  { name: "Tarpon", slug: "tarpon", category: "fishing", subcategory: "Saltwater" },
  { name: "Redfish", slug: "redfish", category: "fishing", subcategory: "Saltwater" },
  { name: "Sailfish", slug: "sailfish", category: "fishing", subcategory: "Saltwater" },
  { name: "Swordfish", slug: "swordfish", category: "fishing", subcategory: "Saltwater" },
  { name: "Halibut", slug: "halibut", category: "fishing", subcategory: "Saltwater" },
];

export function getHuntingSpecies(): SpeciesEntry[] {
  return species.filter((s) => s.category === "hunting");
}

export function getFishingSpecies(): SpeciesEntry[] {
  return species.filter((s) => s.category === "fishing");
}

export function getSpeciesBySubcategory(subcategory: string): SpeciesEntry[] {
  return species.filter((s) => s.subcategory === subcategory);
}

export function getSubcategories(category: "hunting" | "fishing"): string[] {
  const subs = new Set(
    species.filter((s) => s.category === category).map((s) => s.subcategory).filter(Boolean)
  );
  return Array.from(subs) as string[];
}
