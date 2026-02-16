"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchBarProps {
  defaultValue?: string;
  large?: boolean;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  defaultValue = "",
  large = false,
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xl">
          search
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, species, location..."
          className={`w-full bg-bg-input border border-border text-text-primary placeholder-text-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            large ? "pl-11 pr-24 py-4 text-base" : "pl-10 pr-20 py-2.5 text-sm"
          }`}
        />
        <button
          type="submit"
          className={`absolute right-2 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-colors ${
            large
              ? "top-2 px-4 py-2 text-sm"
              : "top-1.5 px-3 py-1.5 text-xs"
          }`}
        >
          Search
        </button>
      </div>
    </form>
  );
}
