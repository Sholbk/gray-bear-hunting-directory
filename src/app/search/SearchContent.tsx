"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import ListingGrid from "@/components/ListingGrid";
import { filterListings } from "@/lib/listings";
import { FilterParams } from "@/types";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);

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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-dark">
            Browse Listings
          </h1>
          <p className="text-gray-muted text-sm mt-1">
            {results.length} listing{results.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden bg-gray-dark text-amber-brand px-4 py-2 rounded-lg text-sm font-medium border border-gray-light"
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
          <div className="flex items-center justify-end mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-muted">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-gray-dark border border-gray-light text-gray-text text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-brand"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="success">Success Rate</option>
              </select>
            </div>
          </div>
          <ListingGrid listings={results} />
        </div>
      </div>
    </div>
  );
}
