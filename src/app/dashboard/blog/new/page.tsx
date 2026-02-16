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
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push("/dashboard/blog");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">New Blog Post</h1>

      <div className="bg-bg-card rounded-2xl border border-border p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Excerpt</label>
            <textarea
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-3 py-2 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Content <span className="text-text-muted">(Markdown supported)</span>
            </label>
            <textarea
              rows={15}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary resize-none font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Tags <span className="text-text-muted">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Hunting Tips, Gear Reviews"
              className="w-full px-3 py-2 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-light transition-colors disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="border border-border text-text-primary px-6 py-3 rounded-xl font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
