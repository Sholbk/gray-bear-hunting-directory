"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
  slug: string;
  name: string;
  type: string;
  city: string;
  state: string;
}

export default function ClaimListingSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState<SearchResult | null>(null);
  const [verificationNote, setVerificationNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (query.length < 2) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(
        `/api/listings/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleClaim = async () => {
    if (!selected) return;
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/claims", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listingSlug: selected.slug,
        verificationNote,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to submit claim");
      setSubmitting(false);
      return;
    }

    setSelected(null);
    setQuery("");
    setVerificationNote("");
    setSubmitting(false);
    router.refresh();
  };

  return (
    <div className="bg-bg-card rounded-2xl border border-border p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-3">
        Claim Your Business
      </h2>
      <input
        type="text"
        placeholder="Search for your business name..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(null);
        }}
        className="w-full px-3 py-2 bg-bg-input border border-border rounded-xl text-text-primary text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />

      {results.length > 0 && !selected && (
        <ul className="mt-2 border border-border rounded-xl divide-y divide-border max-h-60 overflow-y-auto">
          {results.map((r) => (
            <li key={r.slug}>
              <button
                onClick={() => setSelected(r)}
                className="w-full text-left px-4 py-3 hover:bg-bg-input transition-colors"
              >
                <span className="font-medium text-text-primary">{r.name}</span>
                <span className="text-text-muted text-sm ml-2">
                  {r.city}, {r.state}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="mt-4 p-4 bg-bg-input rounded-xl border border-border">
          <p className="font-semibold text-text-primary">{selected.name}</p>
          <p className="text-text-muted text-sm mb-3">
            {selected.city}, {selected.state}
          </p>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Verification Note (optional)
          </label>
          <textarea
            rows={3}
            placeholder="Tell us how you are connected to this business..."
            value={verificationNote}
            onChange={(e) => setVerificationNote(e.target.value)}
            className="w-full px-3 py-2 bg-bg-card border border-border rounded-xl text-text-primary text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none mb-3"
          />
          {error && <p className="text-error text-sm mb-2">{error}</p>}
          <div className="flex gap-3">
            <button
              onClick={handleClaim}
              disabled={submitting}
              className="bg-accent text-white px-5 py-2 rounded-xl font-semibold hover:bg-accent-light transition-colors disabled:opacity-50 text-sm"
            >
              {submitting ? "Submitting..." : "Submit Claim"}
            </button>
            <button
              onClick={() => setSelected(null)}
              className="border border-border text-text-primary px-5 py-2 rounded-xl font-semibold hover:border-accent transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
