"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ListingFormData {
  name: string;
  type: string;
  description: string;
  city: string;
  state: string;
  species: string;
  successRate: string;
  priceMin: string;
  priceMax: string;
  physicalIntensity: string;
  phone: string;
  website: string;
}

interface ListingFormProps {
  initialData?: Partial<ListingFormData>;
  mode: "create" | "edit";
}

const typeOptions = [
  { value: "guide", label: "Hunting Guide" },
  { value: "outfitter", label: "Outfitter" },
  { value: "charter", label: "Fishing Charter" },
  { value: "lodge", label: "Accommodation" },
  { value: "boat", label: "Boats & Vehicles" },
  { value: "taxidermy", label: "Taxidermy" },
  { value: "retailer", label: "Retailer" },
  { value: "dog-trainer", label: "Gun Dog Trainer" },
  { value: "shooting-range", label: "Shooting Range" },
  { value: "education", label: "Education & Safety" },
  { value: "processor", label: "Game Processing" },
];

export default function ListingForm({ initialData, mode }: ListingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ListingFormData>({
    name: initialData?.name || "",
    type: initialData?.type || "guide",
    description: initialData?.description || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    species: initialData?.species || "",
    successRate: initialData?.successRate || "80",
    priceMin: initialData?.priceMin || "",
    priceMax: initialData?.priceMax || "",
    physicalIntensity: initialData?.physicalIntensity || "2",
    phone: initialData?.phone || "",
    website: initialData?.website || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In a real implementation, this would call Supabase to create/update the listing
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push("/dashboard/listings");
  };

  const update = (field: keyof ListingFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-text mb-1">Business Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-text mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => update("type", e.target.value)}
            className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-text mb-1">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-text mb-1">City</label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) => update("city", e.target.value)}
            className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-text mb-1">State</label>
          <input
            type="text"
            required
            value={formData.state}
            onChange={(e) => update("state", e.target.value)}
            className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-text mb-1">Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => update("website", e.target.value)}
            className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-text mb-1">Species (comma-separated)</label>
          <input
            type="text"
            value={formData.species}
            onChange={(e) => update("species", e.target.value)}
            placeholder="Elk, Mule Deer, Black Bear"
            className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-text mb-1">Success Rate (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.successRate}
            onChange={(e) => update("successRate", e.target.value)}
            className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-text mb-1">Min Price ($)</label>
          <input
            type="number"
            min="0"
            value={formData.priceMin}
            onChange={(e) => update("priceMin", e.target.value)}
            className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-text mb-1">Max Price ($)</label>
          <input
            type="number"
            min="0"
            value={formData.priceMax}
            onChange={(e) => update("priceMax", e.target.value)}
            className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-text mb-1">Physical Intensity (1-5)</label>
          <select
            value={formData.physicalIntensity}
            onChange={(e) => update("physicalIntensity", e.target.value)}
            className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
          >
            <option value="1">1 - Easy</option>
            <option value="2">2 - Moderate</option>
            <option value="3">3 - Challenging</option>
            <option value="4">4 - Strenuous</option>
            <option value="5">5 - Extreme</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-text mb-1">Description</label>
          <textarea
            rows={5}
            required
            value={formData.description}
            onChange={(e) => update("description", e.target.value)}
            className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-amber-brand text-gray-dark px-6 py-3 rounded-lg font-semibold hover:bg-amber-light transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : mode === "create" ? "Create Listing" : "Update Listing"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-gray-light text-gray-text px-6 py-3 rounded-lg font-semibold hover:border-amber-brand hover:text-amber-brand transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
