"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In a real implementation, this would create the post via Supabase
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push("/dashboard/blog");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-text mb-6">New Blog Post</h1>

      <div className="bg-gray-dark rounded-xl border border-gray-light p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-text mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-text mb-1">Excerpt</label>
            <textarea
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-text mb-1">
              Content <span className="text-gray-muted">(Markdown supported)</span>
            </label>
            <textarea
              rows={15}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand resize-none font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-text mb-1">
              Tags <span className="text-gray-muted">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Hunting Tips, Gear Reviews"
              className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-brand text-gray-dark px-6 py-3 rounded-lg font-semibold hover:bg-amber-light transition-colors disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Post"}
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
      </div>
    </div>
  );
}
