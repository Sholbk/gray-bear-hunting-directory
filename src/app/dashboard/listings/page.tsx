import Link from "next/link";

export default function DashboardListingsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">My Listings</h1>
        <Link
          href="/dashboard/listings/new"
          className="bg-accent text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-accent-light transition-colors"
        >
          Add New Listing
        </Link>
      </div>

      <div className="bg-bg-card rounded-2xl border border-border p-8 text-center">
        <p className="text-text-muted mb-4">You don&apos;t have any listings yet.</p>
        <Link
          href="/dashboard/listings/new"
          className="inline-block bg-accent text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent-light transition-colors"
        >
          Create Your First Listing
        </Link>
      </div>
    </div>
  );
}
