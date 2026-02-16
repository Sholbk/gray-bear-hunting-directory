import Link from "next/link";
import { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-bg-card rounded-xl border border-border overflow-hidden hover:border-accent transition-all group">
      <div className="h-48 bg-bg-input flex items-center justify-center">
        {post.cover_image ? (
          <div className="w-full h-full bg-bg-input" />
        ) : (
          <span className="text-text-muted text-sm">Image Coming Soon</span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
          <span className="text-xs text-text-muted">
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString()
              : ""}
          </span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-text-muted text-sm leading-relaxed mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-text-muted text-xs">By {post.author_name}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-accent text-sm font-medium"
          >
            Read More &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
