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
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, species, location..."
          className={`w-full bg-white/10 border border-gray-light text-white placeholder-gray-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-brand focus:border-transparent ${
            large ? "px-6 py-4 text-lg pr-14" : "px-4 py-2.5 text-sm pr-12"
          }`}
        />
        <button
          type="submit"
          className={`absolute right-2 bg-amber-brand hover:bg-amber-dark text-gray-dark font-semibold rounded-md transition-colors ${
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
