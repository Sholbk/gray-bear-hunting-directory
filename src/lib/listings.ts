import listingsData from "@/data/listings.json";
import { Listing, FilterParams } from "@/types";

const listings: Listing[] = listingsData as Listing[];

// Static data access (used for builds and when Supabase isn't configured)
export function getAllListings(): Listing[] {
  return listings;
}

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function getFeaturedListings(): Listing[] {
  return listings.filter((l) => l.featured);
}

export function getListingsByType(type: string): Listing[] {
  return listings.filter((l) => l.type === type);
}

export function getTypeCount(type: string): number {
  return listings.filter((l) => l.type === type).length;
}

export function getAllStates(): string[] {
  const states = new Set(listings.map((l) => l.location.state));
  return Array.from(states).sort();
}

export function getAllSpecies(): string[] {
  const species = new Set(listings.flatMap((l) => l.species));
  return Array.from(species).sort();
}

export function filterListings(params: FilterParams): Listing[] {
  let results = [...listings];

  if (params.query) {
    const q = params.query.toLowerCase();
    results = results.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.species.some((s) => s.toLowerCase().includes(q)) ||
        l.location.city.toLowerCase().includes(q) ||
        l.location.state.toLowerCase().includes(q)
    );
  }

  if (params.type && params.type.length > 0) {
    results = results.filter((l) => params.type!.includes(l.type));
  }

  if (params.successRateMin !== undefined) {
    results = results.filter((l) => l.successRate >= params.successRateMin!);
  }
  if (params.successRateMax !== undefined) {
    results = results.filter((l) => l.successRate <= params.successRateMax!);
  }

  if (params.priceMin !== undefined) {
    results = results.filter((l) => l.priceRange.max >= params.priceMin!);
  }
  if (params.priceMax !== undefined) {
    results = results.filter((l) => l.priceRange.min <= params.priceMax!);
  }

  if (params.intensity && params.intensity.length > 0) {
    results = results.filter((l) =>
      params.intensity!.includes(l.physicalIntensity)
    );
  }

  if (params.ratingMin !== undefined) {
    results = results.filter((l) => l.rating >= params.ratingMin!);
  }

  if (params.state) {
    results = results.filter((l) => l.location.state === params.state);
  }

  if (params.species) {
    const sp = params.species.toLowerCase();
    results = results.filter((l) =>
      l.species.some((s) => s.toLowerCase().includes(sp))
    );
  }

  // Sort
  switch (params.sort) {
    case "price-low":
      results.sort((a, b) => a.priceRange.min - b.priceRange.min);
      break;
    case "price-high":
      results.sort((a, b) => b.priceRange.max - a.priceRange.max);
      break;
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "success":
      results.sort((a, b) => b.successRate - a.successRate);
      break;
    default:
      // relevance: featured first, then by rating
      results.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.rating - a.rating;
      });
  }

  return results;
}
