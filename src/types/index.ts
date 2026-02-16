export interface Review {
  author: string;
  date: string;
  rating: number;
  text: string;
}

export interface Listing {
  slug: string;
  name: string;
  type: "guide" | "outfitter" | "charter";
  description: string;
  location: { city: string; state: string };
  species: string[];
  successRate: number;
  priceRange: { min: number; max: number };
  physicalIntensity: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  phone: string;
  website: string;
  image: string;
  featured: boolean;
}

export interface FilterParams {
  query?: string;
  type?: string[];
  successRateMin?: number;
  successRateMax?: number;
  priceMin?: number;
  priceMax?: number;
  intensity?: number[];
  ratingMin?: number;
  state?: string;
  species?: string;
  sort?: "relevance" | "price-low" | "price-high" | "rating" | "success";
}
