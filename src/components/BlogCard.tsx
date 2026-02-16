import Link from "next/link";
import { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-gray-dark rounded-xl border border-gray-light overflow-hidden hover:border-amber-brand transition-all group">
      <div className="h-48 bg-gray-medium flex items-center justify-center">
        {post.cover_image ? (
          <div className="w-full h-full bg-gray-medium" />
        ) : (
          <span className="text-gray-muted text-sm">Image Coming Soon</span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-amber-brand bg-amber-brand/10 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
          <span className="text-xs text-gray-muted">
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString()
              : ""}
          </span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-lg font-bold text-gray-text mb-2 group-hover:text-amber-brand transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-muted text-sm leading-relaxed mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-gray-muted text-xs">By {post.author_name}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-amber-brand text-sm font-medium"
          >
            Read More &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
