import Link from "next/link";

export function generateMetadata() {
  return {
    title: "Blog Post | Gray Bear Hunting Directory",
  };
}

// Placeholder blog post content for static rendering
const samplePost = {
  title: "Top 10 Elk Hunting Tips for Beginners",
  author: "Gray Bear Team",
  date: "December 15, 2025",
  tags: ["Hunting Tips", "Elk"],
  content: `
## Planning Your First Elk Hunt

Elk hunting is one of the most challenging and rewarding pursuits in North American hunting. Whether you're heading to Colorado, Montana, or another western state, proper preparation is the key to success.

### 1. Start With Physical Preparation

Elk country is steep, high, and unforgiving. Start a fitness regimen at least 3 months before your hunt. Focus on cardio, leg strength, and carrying a loaded pack uphill.

### 2. Practice Shooting at Long Range

While many elk are taken under 200 yards, you should be confident out to 300+ yards. Practice from field positions — sitting, kneeling, and using shooting sticks.

### 3. Learn to Glass Effectively

You'll spend more time behind your binoculars than behind your rifle. Invest in quality optics and learn systematic glassing techniques.

### 4. Understand Elk Behavior

Elk are herd animals with predictable patterns. Learn about their feeding, bedding, and travel habits throughout the season.

### 5. Pack Smart

Every ounce matters at 10,000 feet. Bring what you need, not what you might want. Quality layering systems beat heavy jackets.

### 6. Hire a Guide for Your First Hunt

A good guide dramatically increases your odds and teaches you skills you'll use for the rest of your hunting career.

### 7. Get Your Tag Early

Many of the best elk units require drawing a tag through a lottery system. Apply early and build preference points.

### 8. Study Maps Before You Go

Spend hours on OnX or similar mapping tools learning the terrain, access points, and land ownership before you arrive.

### 9. Be Ready for Weather

Mountain weather changes fast. Snow, rain, and wind can roll in at any time. Prepare for the worst and hope for the best.

### 10. Enjoy the Experience

Don't get so focused on the harvest that you miss the beauty of elk country. Some of the best memories come from the journey, not just the destination.

---

*Looking for an elk hunting guide? [Browse our directory](/search?species=Elk) of verified elk hunting guides and outfitters.*
  `,
};

export default function BlogPostPage() {
  return (
    <div className="bg-gray-darker min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-muted hover:text-amber-brand transition-colors text-sm mb-8"
        >
          &larr; Back to Blog
        </Link>

        <article>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {samplePost.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-amber-brand bg-amber-brand/10 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-text mb-4">
              {samplePost.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-muted">
              <span>By {samplePost.author}</span>
              <span>·</span>
              <span>{samplePost.date}</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="text-gray-text leading-relaxed space-y-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-text [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-text [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-gray-muted [&_p]:leading-relaxed [&_a]:text-amber-brand [&_a]:hover:text-amber-light [&_em]:text-gray-muted [&_hr]:border-gray-light [&_hr]:my-8">
              {samplePost.content.split("\n\n").map((block, i) => {
                if (block.startsWith("## ")) {
                  return <h2 key={i}>{block.replace("## ", "")}</h2>;
                }
                if (block.startsWith("### ")) {
                  return <h3 key={i}>{block.replace("### ", "")}</h3>;
                }
                if (block.startsWith("---")) {
                  return <hr key={i} />;
                }
                if (block.startsWith("*")) {
                  return <p key={i}><em>{block.replace(/\*/g, "")}</em></p>;
                }
                return <p key={i}>{block}</p>;
              })}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
