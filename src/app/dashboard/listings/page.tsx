import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUserClaims } from "@/lib/supabase/queries";
import { getListingBySlug } from "@/lib/listings";
import ClaimListingSearch from "@/components/dashboard/ClaimListingSearch";

export default async function DashboardListingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const claims = user ? await getUserClaims(user.id) : [];

  const enrichedClaims = claims.map((claim) => ({
    ...claim,
    listing: getListingBySlug(claim.listing_slug),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">My Listings</h1>
      </div>

      <ClaimListingSearch />

      {enrichedClaims.length > 0 ? (
        <div className="space-y-4 mt-6">
          {enrichedClaims.map((claim) => (
            <div
              key={claim.id}
              className="bg-bg-card rounded-2xl border border-border p-6 flex items-center justify-between"
            >
              <div>
                <Link
                  href={`/listing/${claim.listing_slug}`}
                  className="text-lg font-semibold text-text-primary hover:text-accent transition-colors"
                >
                  {claim.listing?.name || claim.listing_slug}
                </Link>
                {claim.listing && (
                  <p className="text-text-muted text-sm">
                    {claim.listing.location.city},{" "}
                    {claim.listing.location.state}
                  </p>
                )}
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  claim.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : claim.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-bg-card rounded-2xl border border-border p-8 text-center mt-6">
          <p className="text-text-muted">
            Search above to find and claim your business listing.
          </p>
        </div>
      )}
    </div>
  );
}
