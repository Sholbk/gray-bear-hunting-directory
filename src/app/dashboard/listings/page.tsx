import Link from "next/link";

export default function DashboardListingsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-text">My Listings</h1>
        <Link
          href="/dashboard/listings/new"
          className="bg-amber-brand text-gray-dark px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-light transition-colors"
        >
          Add New Listing
        </Link>
      </div>

      <div className="bg-gray-dark rounded-xl border border-gray-light p-8 text-center">
        <p className="text-gray-muted mb-4">You don&apos;t have any listings yet.</p>
        <Link
          href="/dashboard/listings/new"
          className="inline-block bg-amber-brand text-gray-dark px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-light transition-colors"
        >
          Create Your First Listing
        </Link>
      </div>
    </div>
  );
}
