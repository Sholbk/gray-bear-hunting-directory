import Link from "next/link";
import { getFishingSpecies, getSubcategories } from "@/data/species";

export const metadata = {
  title: "Fishing Species | Gray Bear Hunting Directory",
  description: "Browse fishing charters and guides by species - freshwater and saltwater fishing across the US.",
};

export default function FishPage() {
  const fishingSpecies = getFishingSpecies();
  const subcategories = getSubcategories("fishing");

  return (
    <div className="bg-gray-darker min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-text mb-4">
            Fishing Species
          </h1>
          <p className="text-gray-muted max-w-2xl mx-auto">
            Find fishing charters and guides for your target species, from freshwater to deep sea.
          </p>
        </div>

        {subcategories.map((sub) => {
          const speciesInSub = fishingSpecies.filter((s) => s.subcategory === sub);
          return (
            <div key={sub} className="mb-10">
              <h2 className="text-xl font-bold text-amber-brand mb-4 border-b border-gray-light pb-2">
                {sub}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {speciesInSub.map((sp) => (
                  <Link
                    key={sp.slug}
                    href={`/search?species=${sp.name}&type=charter`}
                    className="bg-gray-dark rounded-lg p-4 border border-gray-light hover:border-amber-brand transition-all text-center group"
                  >
                    <span className="text-sm font-medium text-gray-text group-hover:text-amber-brand transition-colors">
                      {sp.name}
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
