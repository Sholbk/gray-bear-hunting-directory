import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-bg-card rounded-2xl border border-border p-5">
          <p className="text-text-muted text-sm mb-1">Active Listings</p>
          <p className="text-2xl font-bold text-accent">0</p>
        </div>
        <div className="bg-bg-card rounded-2xl border border-border p-5">
          <p className="text-text-muted text-sm mb-1">Total Views</p>
          <p className="text-2xl font-bold text-accent">0</p>
        </div>
        <div className="bg-bg-card rounded-2xl border border-border p-5">
          <p className="text-text-muted text-sm mb-1">Membership</p>
          <p className="text-2xl font-bold text-accent">Free</p>
        </div>
      </div>

      <div className="bg-bg-card rounded-2xl border border-border p-6">
        <h2 className="text-lg font-bold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/dashboard/listings/new"
            className="bg-accent text-white px-4 py-3 rounded-xl font-semibold text-center hover:bg-accent-light transition-colors"
          >
            Add New Listing
          </Link>
          <Link
            href="/dashboard/profile"
            className="border border-border text-text-primary px-4 py-3 rounded-xl font-semibold text-center hover:border-primary hover:text-primary transition-colors"
          >
            Edit Profile
          </Link>
          <Link
            href="/membership"
            className="border border-border text-text-primary px-4 py-3 rounded-xl font-semibold text-center hover:border-primary hover:text-primary transition-colors"
          >
            Upgrade Membership
          </Link>
          <Link
            href="/dashboard/blog/new"
            className="border border-border text-text-primary px-4 py-3 rounded-xl font-semibold text-center hover:border-primary hover:text-primary transition-colors"
          >
            Write Blog Post
          </Link>
        </div>
      </div>
    </div>
  );
}
