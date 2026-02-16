import Link from "next/link";

export const metadata = {
  title: "Manage Blog Posts | Gray Bear Hunting Directory",
};

export default function DashboardBlogPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-text">Blog Posts</h1>
        <Link
          href="/dashboard/blog/new"
          className="bg-amber-brand text-gray-dark px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-light transition-colors"
        >
          New Post
        </Link>
      </div>

      <div className="bg-gray-dark rounded-xl border border-gray-light p-8 text-center">
        <p className="text-gray-muted mb-4">You haven&apos;t written any blog posts yet.</p>
        <Link
          href="/dashboard/blog/new"
          className="inline-block bg-amber-brand text-gray-dark px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-light transition-colors"
        >
          Write Your First Post
        </Link>
      </div>
    </div>
  );
}
