"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import FilterSidebar from "@/components/FilterSidebar";
import ListingGrid from "@/components/ListingGrid";
import { filterListings } from "@/lib/listings";
import { FilterParams } from "@/types";

const SearchMap = dynamic(() => import("@/components/SearchMap"), {
  ssr: false,
  loading: () => (
    <div className="bg-bg-input rounded-2xl animate-pulse h-[600px]" />
  ),
});

type ViewMode = "list" | "split" | "map";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const sort = (searchParams.get("sort") as FilterParams["sort"]) || "relevance";

  const params: FilterParams = useMemo(() => {
    const types = searchParams.getAll("type");
    const intensities = searchParams.getAll("intensity").map(Number).filter(Boolean);

    return {
      query: searchParams.get("query") || undefined,
      type: types.length > 0 ? types : undefined,
      successRateMin: searchParams.get("successRateMin")
        ? Number(searchParams.get("successRateMin"))
        : undefined,
      successRateMax: searchParams.get("successRateMax")
        ? Number(searchParams.get("successRateMax"))
        : undefined,
      priceMin: searchParams.get("priceMin")
        ? Number(searchParams.get("priceMin"))
        : undefined,
      priceMax: searchParams.get("priceMax")
        ? Number(searchParams.get("priceMax"))
        : undefined,
      intensity: intensities.length > 0 ? intensities : undefined,
      ratingMin: searchParams.get("ratingMin")
        ? Number(searchParams.get("ratingMin"))
        : undefined,
      state: searchParams.get("state") || undefined,
      species: searchParams.get("species") || undefined,
      sort,
    };
  }, [searchParams, sort]);

  const results = useMemo(() => filterListings(params), [params]);

  const handleSortChange = (newSort: string) => {
    const p = new URLSearchParams(searchParams.toString());
    if (newSort === "relevance") {
      p.delete("sort");
    } else {
      p.set("sort", newSort);
    }
    router.push(`/search?${p.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Browse Listings
          </h1>
          <p className="text-text-muted text-sm mt-1">
            {results.length} listing{results.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden bg-bg-card text-accent px-4 py-2 rounded-xl text-sm font-medium border border-border"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside
          className={`w-full lg:w-72 shrink-0 ${
            showFilters ? "block" : "hidden"
          } lg:block`}
        >
          <FilterSidebar />
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-bg-input rounded-xl p-1 border border-border">
              {(["list", "split", "map"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    viewMode === mode
                      ? "bg-accent text-white"
                      : "text-text-muted hover:text-primary"
                  }`}
                >
                  {mode === "list" ? "List" : mode === "map" ? "Map" : "Split"}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-bg-card border border-border text-text-primary text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="success">Success Rate</option>
              </select>
            </div>
          </div>

          {/* List View */}
          {viewMode === "list" && <ListingGrid listings={results} />}

          {/* Map View */}
          {viewMode === "map" && <SearchMap listings={results} />}

          {/* Split View */}
          {viewMode === "split" && (
            <div className="flex gap-6">
              <div className="w-1/2 min-w-0">
                <ListingGrid listings={results} />
              </div>
              <div className="w-1/2 sticky top-24 self-start">
                <SearchMap listings={results} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
