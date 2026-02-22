export type ListingType =
  | "guide"
  | "outfitter"
  | "charter"
  | "lodge"
  | "land"
  | "boat"
  | "taxidermy"
  | "retailer"
  | "dog-trainer"
  | "shooting-range"
  | "education"
  | "processor"
  | "photographer";

export interface Review {
  author: string;
  date: string;
  rating: number;
  text: string;
}

export interface Listing {
  slug: string;
  name: string;
  type: ListingType;
  description: string;
  location: { city: string; state: string };
  coordinates: { lat: number; lng: number } | null;
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

export interface Category {
  slug: string;
  title: string;
  description: string;
  icon: string;
  types: ListingType[];
}

export interface USState {
  name: string;
  abbreviation: string;
  region: "Northeast" | "Southeast" | "Midwest" | "Southwest" | "West";
}

export interface SpeciesEntry {
  name: string;
  slug: string;
  category: "hunting" | "fishing";
  subcategory?: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  business_name?: string;
  membership_tier: "free" | "basic" | "premium" | "elite";
  avatar_url?: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  author_name: string;
  tags: string[];
  status: "draft" | "published";
  published_at?: string;
  created_at: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  end_date?: string;
  location?: string;
  category: "season" | "expo" | "class" | "tournament" | "meetup" | "deadline";
  url?: string;
}

export interface MembershipPlan {
  id: string;
  tier: "free" | "basic" | "premium" | "elite";
  name: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  max_listings: number;
  highlighted: boolean;
}

export interface ListingClaim {
  id: string;
  listing_slug: string;
  user_id: string;
  status: "pending" | "approved" | "rejected";
  verification_note: string;
  admin_note: string;
  created_at: string;
  updated_at: string;
}
