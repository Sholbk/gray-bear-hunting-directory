"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { states } from "@/data/states";

export default function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const [species, setSpecies] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (region) params.set("state", region);
    if (species) params.set("species", species);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="px-4 py-6 max-w-md mx-auto lg:max-w-3xl">
      <h1 className="text-2xl lg:text-4xl font-bold text-text-primary mb-1">
        Find Your Next
      </h1>
      <h1 className="text-2xl lg:text-4xl font-bold text-primary mb-4">
        Adventure
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Icon name="search" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, outfitters, species..."
            className="w-full pl-10 pr-4 py-3 bg-bg-input border border-border rounded-xl text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Icon name="location_on" className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary appearance-none"
            >
              <option value="">All States</option>
              {states.map((s) => (
                <option key={s.abbreviation} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative flex-1">
            <Icon name="pets" className="w-[18px] h-[18px] absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary appearance-none"
            >
              <option value="">Species</option>
              <option value="Elk">Elk</option>
              <option value="Whitetail">Whitetail Deer</option>
              <option value="Turkey">Turkey</option>
              <option value="Duck">Duck</option>
              <option value="Pheasant">Pheasant</option>
              <option value="Salmon">Salmon</option>
              <option value="Bass">Bass</option>
              <option value="Bear">Bear</option>
              <option value="Moose">Moose</option>
              <option value="Quail">Quail</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent-light text-white py-3.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
        >
          <Icon name="search" className="w-[18px] h-[18px]" />
          Search Expeditions
        </button>
      </form>
    </section>
  );
}
