"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { getAllStates, getAllSpecies } from "@/lib/listings";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const states = getAllStates();
  const species = getAllSpecies();

  const currentQuery = searchParams.get("query") || "";
  const currentTypes = searchParams.getAll("type");
  const currentSuccessMin = searchParams.get("successRateMin") || "0";
  const currentPriceMax = searchParams.get("priceMax") || "30000";
  const currentIntensities = searchParams.getAll("intensity");
  const currentRatingMin = searchParams.get("ratingMin") || "";
  const currentState = searchParams.get("state") || "";
  const currentSpecies = searchParams.get("species") || "";

  const updateParams = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        params.delete(key);
        if (value === null) return;
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else if (value !== "") {
          params.set(key, value);
        }
      });

      router.push(`/search?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleTypeToggle = (type: string, extraType?: string) => {
    const valuesToToggle = extraType ? [type, extraType] : [type];
    const isActive = currentTypes.includes(type);
    const types = isActive
      ? currentTypes.filter((t) => !valuesToToggle.includes(t))
      : [...currentTypes, ...valuesToToggle];
    updateParams({ type: types.length > 0 ? types : null });
  };

  const handleIntensityToggle = (level: string) => {
    const intensities = currentIntensities.includes(level)
      ? currentIntensities.filter((i) => i !== level)
      : [...currentIntensities, level];
    updateParams({
      intensity: intensities.length > 0 ? intensities : null,
    });
  };

  const clearFilters = () => {
    router.push("/search");
  };

  const hasActiveFilters =
    currentTypes.length > 0 ||
    currentSuccessMin !== "0" ||
    currentPriceMax !== "30000" ||
    currentIntensities.length > 0 ||
    currentRatingMin !== "" ||
    currentState !== "" ||
    currentSpecies !== "" ||
    currentQuery !== "";

  return (
    <div className="bg-bg-card rounded-2xl border border-border p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-text-primary font-bold text-lg">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-accent text-xs hover:text-accent-light transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      <div>
        <label className="text-text-primary text-sm font-medium block mb-2">
          Search
        </label>
        <input
          type="text"
          value={currentQuery}
          onChange={(e) => updateParams({ query: e.target.value || null })}
          placeholder="Name, species, location..."
          className="w-full bg-bg-input border border-border text-text-primary text-sm rounded-xl px-3 py-2 placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Type */}
      <div>
        <label className="text-text-primary text-sm font-medium block mb-2">
          Type
        </label>
        <div className="space-y-2">
          {([
            { value: "guide", label: "Guides & Outfitters", extraValue: "outfitter" },
            { value: "charter", label: "Charters" },
            { value: "lodge", label: "Accommodations" },
            { value: "boat", label: "Boats & Vehicles" },
            { value: "taxidermy", label: "Taxidermy" },
            { value: "retailer", label: "Retailers" },
            { value: "dog-trainer", label: "Gun Dogs" },
            { value: "shooting-range", label: "Shooting Ranges" },
            { value: "education", label: "Education" },
            { value: "processor", label: "Game Processing" },
            { value: "land", label: "Land & Leases" },
            { value: "photographer", label: "Photographers" },
          ] as { value: string; label: string; extraValue?: string }[]).map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={currentTypes.includes(opt.value)}
                onChange={() => handleTypeToggle(opt.value, opt.extraValue)}
                className="rounded border-border bg-bg-input text-primary focus:ring-primary"
              />
              <span className="text-text-secondary text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Success Rate */}
      <div>
        <label className="text-text-primary text-sm font-medium block mb-2">
          Min Success Rate: {currentSuccessMin}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={currentSuccessMin}
          onChange={(e) =>
            updateParams({
              successRateMin: e.target.value === "0" ? null : e.target.value,
            })
          }
          className="w-full"
        />
        <div className="flex justify-between text-xs text-text-muted mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-text-primary text-sm font-medium block mb-2">
          Max Price: ${Number(currentPriceMax).toLocaleString()}
        </label>
        <input
          type="range"
          min="0"
          max="30000"
          step="500"
          value={currentPriceMax}
          onChange={(e) =>
            updateParams({
              priceMax: e.target.value === "30000" ? null : e.target.value,
            })
          }
          className="w-full"
        />
        <div className="flex justify-between text-xs text-text-muted mt-1">
          <span>$0</span>
          <span>$30,000</span>
        </div>
      </div>

      {/* Physical Intensity */}
      <div>
        <label className="text-text-primary text-sm font-medium block mb-2">
          Physical Intensity
        </label>
        <div className="flex gap-2">
          {["1", "2", "3", "4", "5"].map((level) => (
            <button
              key={level}
              onClick={() => handleIntensityToggle(level)}
              className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                currentIntensities.includes(level)
                  ? "bg-accent text-white"
                  : "bg-bg-input text-text-muted border border-border hover:border-primary hover:text-primary"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="text-text-primary text-sm font-medium block mb-2">
          Minimum Rating
        </label>
        <div className="flex gap-2">
          {["3", "3.5", "4", "4.5"].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                updateParams({
                  ratingMin: currentRatingMin === rating ? null : rating,
                })
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                currentRatingMin === rating
                  ? "bg-accent text-white"
                  : "bg-bg-input text-text-muted border border-border hover:border-primary hover:text-primary"
              }`}
            >
              {rating}+
            </button>
          ))}
        </div>
      </div>

      {/* State */}
      <div>
        <label className="text-text-primary text-sm font-medium block mb-2">
          State
        </label>
        <select
          value={currentState}
          onChange={(e) =>
            updateParams({ state: e.target.value || null })
          }
          className="w-full bg-bg-input border border-border text-text-primary text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">All States</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Species */}
      <div>
        <label className="text-text-primary text-sm font-medium block mb-2">
          Species / Game
        </label>
        <select
          value={currentSpecies}
          onChange={(e) =>
            updateParams({ species: e.target.value || null })
          }
          className="w-full bg-bg-input border border-border text-text-primary text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">All Species</option>
          {species.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
