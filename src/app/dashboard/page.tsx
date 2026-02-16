import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-text mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-dark rounded-xl border border-gray-light p-5">
          <p className="text-gray-muted text-sm mb-1">Active Listings</p>
          <p className="text-2xl font-bold text-amber-brand">0</p>
        </div>
        <div className="bg-gray-dark rounded-xl border border-gray-light p-5">
          <p className="text-gray-muted text-sm mb-1">Total Views</p>
          <p className="text-2xl font-bold text-amber-brand">0</p>
        </div>
        <div className="bg-gray-dark rounded-xl border border-gray-light p-5">
          <p className="text-gray-muted text-sm mb-1">Membership</p>
          <p className="text-2xl font-bold text-amber-brand">Free</p>
        </div>
      </div>

      <div className="bg-gray-dark rounded-xl border border-gray-light p-6">
        <h2 className="text-lg font-bold text-gray-text mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/dashboard/listings/new"
            className="bg-amber-brand text-gray-dark px-4 py-3 rounded-lg font-semibold text-center hover:bg-amber-light transition-colors"
          >
            Add New Listing
          </Link>
          <Link
            href="/dashboard/profile"
            className="border border-gray-light text-gray-text px-4 py-3 rounded-lg font-semibold text-center hover:border-amber-brand hover:text-amber-brand transition-colors"
          >
            Edit Profile
          </Link>
          <Link
            href="/membership"
            className="border border-gray-light text-gray-text px-4 py-3 rounded-lg font-semibold text-center hover:border-amber-brand hover:text-amber-brand transition-colors"
          >
            Upgrade Membership
          </Link>
          <Link
            href="/dashboard/blog/new"
            className="border border-gray-light text-gray-text px-4 py-3 rounded-lg font-semibold text-center hover:border-amber-brand hover:text-amber-brand transition-colors"
          >
            Write Blog Post
          </Link>
        </div>
      </div>
    </div>
  );
}
