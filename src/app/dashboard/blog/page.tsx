import Link from "next/link";

export const metadata = {
  title: "Manage Blog Posts | Gray Bear Hunting Directory",
};

export default function DashboardBlogPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Blog Posts</h1>
        <Link
          href="/dashboard/blog/new"
          className="bg-accent text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-accent-light transition-colors"
        >
          New Post
        </Link>
      </div>

      <div className="bg-bg-card rounded-2xl border border-border p-8 text-center">
        <p className="text-text-muted mb-4">You haven&apos;t written any blog posts yet.</p>
        <Link
          href="/dashboard/blog/new"
          className="inline-block bg-accent text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent-light transition-colors"
        >
          Write Your First Post
        </Link>
      </div>
    </div>
  );
}
