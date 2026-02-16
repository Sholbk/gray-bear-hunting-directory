import Link from "next/link";

export const metadata = {
  title: "Blog | Gray Bear Hunting Directory",
  description: "Hunting tips, fishing reports, gear reviews, and outdoor adventure stories from the Gray Bear team.",
};

const placeholderPosts = [
  {
    slug: "top-elk-hunting-tips",
    title: "Top 10 Elk Hunting Tips for Beginners",
    excerpt: "Planning your first elk hunt? Here are the essential tips every beginner needs to know before heading into the mountains.",
    date: "2025-12-15",
    tag: "Hunting Tips",
  },
  {
    slug: "choosing-fishing-charter",
    title: "How to Choose the Right Fishing Charter",
    excerpt: "Not all fishing charters are created equal. Learn what to look for when booking your next deep sea adventure.",
    date: "2025-12-10",
    tag: "Fishing",
  },
  {
    slug: "gear-review-2025",
    title: "Best Hunting Gear of 2025: Our Top Picks",
    excerpt: "We tested dozens of products to bring you the definitive guide to this year's best hunting gear and equipment.",
    date: "2025-12-05",
    tag: "Gear Reviews",
  },
  {
    slug: "whitetail-season-prep",
    title: "Preparing for Whitetail Season: A Complete Guide",
    excerpt: "From scouting to stand placement, everything you need to do before opening day of whitetail deer season.",
    date: "2025-11-28",
    tag: "Hunting Tips",
  },
  {
    slug: "conservation-matters",
    title: "Why Conservation Matters to Every Hunter",
    excerpt: "Understanding the critical role hunters play in wildlife conservation and habitat preservation across America.",
    date: "2025-11-20",
    tag: "Conservation",
  },
  {
    slug: "fly-fishing-basics",
    title: "Fly Fishing 101: Getting Started",
    excerpt: "Everything you need to know about fly fishing, from choosing your first rod to landing your first trout.",
    date: "2025-11-15",
    tag: "Fishing",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-gray-darker min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-text mb-4">
            Blog
          </h1>
          <p className="text-gray-muted max-w-2xl mx-auto">
            Hunting tips, fishing reports, gear reviews, and stories from the field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-gray-dark rounded-xl border border-gray-light overflow-hidden hover:border-amber-brand transition-all group"
            >
              <div className="h-48 bg-gray-medium flex items-center justify-center">
                <span className="text-gray-muted text-sm">Image Coming Soon</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-amber-brand bg-amber-brand/10 px-2 py-1 rounded">
                    {post.tag}
                  </span>
                  <span className="text-xs text-gray-muted">{post.date}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-text mb-2 group-hover:text-amber-brand transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-muted text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="text-amber-brand text-sm font-medium">
                  Read More &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
