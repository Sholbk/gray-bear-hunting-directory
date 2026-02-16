import Link from "next/link";
import { states, regions } from "@/data/states";

export const metadata = {
  title: "Browse by State | Gray Bear Hunting Directory",
  description: "Find hunting guides, outfitters, and fishing charters in all 50 US states.",
};

export default function StatePage() {
  return (
    <div className="bg-bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Browse by State
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Find hunting and fishing services in your state or plan your next out-of-state adventure.
          </p>
        </div>

        {regions.map((region) => {
          const regionStates = states.filter((s) => s.region === region);
          return (
            <div key={region} className="mb-10">
              <h2 className="text-xl font-bold text-accent mb-4 border-b border-border pb-2">
                {region}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {regionStates.map((state) => (
                  <Link
                    key={state.abbreviation}
                    href={`/search?state=${state.name}`}
                    className="bg-bg-card rounded-xl p-3 border border-border hover:border-accent transition-all text-center group"
                  >
                    <span className="text-sm font-bold text-text-muted group-hover:text-accent transition-colors">
                      {state.abbreviation}
                    </span>
                    <span className="block text-xs text-text-muted mt-1">
                      {state.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
