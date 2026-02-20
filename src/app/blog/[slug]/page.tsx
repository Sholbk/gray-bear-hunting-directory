import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<string, {
  title: string;
  author: string;
  date: string;
  tags: string[];
  content: string;
}> = {
  "top-elk-hunting-tips": {
    title: "Top 10 Elk Hunting Tips for Beginners",
    author: "Gray Bear Team",
    date: "February 15, 2026",
    tags: ["Hunting Tips", "Elk"],
    content: `## Planning Your First Elk Hunt

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

*Looking for an elk hunting guide? Browse our directory of verified elk hunting guides and outfitters.*`,
  },
  "choosing-fishing-charter": {
    title: "How to Choose the Right Fishing Charter",
    author: "Gray Bear Team",
    date: "February 15, 2026",
    tags: ["Fishing", "Charters"],
    content: `## Finding the Perfect Charter for Your Trip

Not all fishing charters are created equal. Whether you're planning a deep-sea adventure or a calm inshore trip, choosing the right charter can make the difference between a memorable experience and a disappointing day on the water.

### Know What You Want to Catch

Different charters specialize in different species. Offshore charters target tuna, marlin, and mahi-mahi, while inshore trips focus on redfish, snook, and speckled trout. Be clear about your goals before you book.

### Check the Captain's Experience

A great captain knows the local waters intimately. Look for captains with years of experience in the specific area and species you're targeting. Ask about their background and how long they've been running charters.

### Read Real Reviews

Online reviews from past clients tell you what the marketing materials won't. Pay attention to comments about the captain's attitude, boat condition, and whether clients actually caught fish.

### Ask About the Boat

The vessel matters. Ask about the size, age, and equipment on board. A well-maintained boat with modern electronics and safety gear is a sign of a professional operation.

### Understand What's Included

Some charters include everything — rods, reels, tackle, bait, licenses, and even fish cleaning. Others expect you to bring your own gear. Clarify this before booking to avoid surprises.

### Consider Group Size

Smaller groups mean more personalized attention and more time with a rod in your hand. If you're booking a shared charter, ask how many other anglers will be on board.

### Book Early for Peak Season

The best charters book up months in advance during peak season. If you have specific dates in mind, don't wait to make your reservation.

---

*Ready to book? Browse our directory of verified fishing charters across the country.*`,
  },
  "gear-review-2026": {
    title: "Best Hunting Gear of 2026: Our Top Picks",
    author: "Gray Bear Team",
    date: "February 15, 2026",
    tags: ["Gear Reviews", "Equipment"],
    content: `## The Definitive Gear Guide for 2026

We tested dozens of products over the past year to bring you the best hunting gear and equipment for the 2026 season. From optics to outerwear, here are our top picks.

### Best Binoculars: Vortex Razor UHD 10x42

The Razor UHD continues to dominate with exceptional clarity, edge-to-edge sharpness, and rugged durability. At this price point, nothing else comes close for serious hunters.

### Best Rangefinder: Leupold RX-2800 TBR/W

Accurate to 2,800 yards with True Ballistic Range technology that accounts for angle and wind. The OLED display is easy to read in any lighting condition.

### Best Hunting Boot: Crispi Thor II GTX

Italian craftsmanship meets mountain durability. These boots offer exceptional ankle support, waterproof protection, and all-day comfort in steep terrain. Worth every penny for serious mountain hunters.

### Best Base Layer: Sitka Core Merino

Merino wool that manages moisture and odor better than any synthetic we've tested. The fit is athletic without being restrictive, and the durability has improved significantly this year.

### Best Rain Gear: First Lite Stormtight

Waterproof, breathable, and quiet — the trifecta that most rain gear fails to achieve. The Stormtight jacket and pants kept us dry through three days of Pacific Northwest downpour.

### Best Pack: Mystery Ranch Pop Up 38

Versatile enough for a day hunt and expandable enough to pack out meat. The load-carrying harness is the best in the business, and the removable lid doubles as a summit pack.

### Best Game Call: Phelps Game Calls AMP

The most realistic elk bugle we've ever used. The interchangeable reed system lets you go from cow calls to screaming bugles without switching calls.

---

*Find retailers and pro shops near you that carry these products in our directory.*`,
  },
  "whitetail-season-prep": {
    title: "Preparing for Whitetail Season: A Complete Guide",
    author: "Gray Bear Team",
    date: "February 15, 2026",
    tags: ["Hunting Tips", "Whitetail"],
    content: `## Your Pre-Season Whitetail Checklist

Success during whitetail season starts months before opening day. Here's everything you need to do to be ready when that buck steps into range.

### Start Scouting Early

Summer scouting gives you a huge advantage. Use trail cameras to pattern deer movement, identify key food sources, and locate bedding areas. The more data you have, the better your strategy.

### Check and Maintain Your Stands

Inspect all tree stands and blinds for damage, rust, or worn straps before the season. Replace any questionable safety equipment — it's not worth the risk. Set new stands based on your summer scouting data.

### Plant Food Plots

If you have access to land, late summer food plots of clover, brassicas, or winter wheat can be a magnet for deer during the hunting season. Plan your plots to create natural funnels toward your stand locations.

### Practice, Practice, Practice

Whether you're a rifle or bow hunter, consistent practice builds the muscle memory and confidence you need for a clean, ethical shot. Simulate real hunting conditions — shoot from elevated positions, in low light, and at varying distances.

### Tune Your Equipment

Get your bow professionally tuned or sight in your rifle well before the season opens. Don't wait until the week before to discover a problem with your equipment.

### Study the Rut Calendar

Understanding the phases of the rut — pre-rut, seeking, chasing, breeding, and post-rut — helps you adjust your tactics throughout the season. Each phase requires a different approach to calling, scent use, and stand placement.

### Get Your Licenses and Tags

Don't let paperwork keep you out of the woods. Purchase your licenses, tags, and any required permits well in advance. Check regulation changes from last year.

### Prepare Your Pack

Assemble your day pack with essentials: knife, drag rope, flashlight, first aid kit, snacks, water, and game bags. Having everything ready means you can head out on short notice when conditions are perfect.

---

*Find whitetail hunting guides in your state through our directory.*`,
  },
  "conservation-matters": {
    title: "Why Conservation Matters to Every Hunter",
    author: "Gray Bear Team",
    date: "February 15, 2026",
    tags: ["Conservation", "Community"],
    content: `## Hunters as Conservationists

Hunters have been the backbone of wildlife conservation in North America for over a century. Through license fees, excise taxes, and direct contributions, hunters fund the vast majority of habitat preservation and wildlife management programs across the continent.

### The North American Model

The North American Model of Wildlife Conservation is the most successful wildlife management system in history. It's built on the principle that wildlife belongs to all citizens and must be managed sustainably for future generations. Hunters were instrumental in creating this model.

### Pittman-Robertson Act

Since 1937, the Pittman-Robertson Act has generated over $14 billion for wildlife conservation through an excise tax on firearms, ammunition, and archery equipment. This funding supports habitat restoration, wildlife research, and hunter education programs in every state.

### Habitat Preservation

Organizations like Ducks Unlimited, the Rocky Mountain Elk Foundation, and the National Wild Turkey Federation — all founded and funded primarily by hunters — have conserved millions of acres of critical wildlife habitat across North America.

### Population Recovery Success Stories

Many species that were once on the brink of extinction have made remarkable comebacks thanks to hunter-funded conservation. White-tailed deer, wild turkeys, elk, and wood ducks are just a few examples of populations that have thrived under the stewardship of hunters.

### The Ethical Responsibility

With the privilege of hunting comes the responsibility to be stewards of the land. Fair chase principles, bag limits, and season dates all exist to ensure that hunting remains sustainable for generations to come.

### How You Can Help

Beyond buying licenses and tags, consider joining a conservation organization, volunteering for habitat projects, or mentoring new hunters. Every contribution makes a difference for wildlife and wild places.

---

*Support conservation-minded outfitters and guides by browsing our verified directory.*`,
  },
  "fly-fishing-basics": {
    title: "Fly Fishing 101: Getting Started",
    author: "Gray Bear Team",
    date: "February 15, 2026",
    tags: ["Fishing", "Beginners"],
    content: `## Welcome to Fly Fishing

Fly fishing is one of the most rewarding ways to experience the outdoors. While it may seem intimidating at first, the basics are simpler than you think. Here's everything you need to know to get started.

### Choosing Your First Rod

A 9-foot, 5-weight rod is the most versatile setup for beginners. It handles trout, panfish, and small bass comfortably. Look for a combo kit that includes a matched reel and line — these take the guesswork out of pairing components.

### Understanding Fly Line

Unlike conventional fishing where the lure provides casting weight, in fly fishing the line itself carries the fly. The three main types are floating, sinking, and sink-tip. Start with a floating line — it's the most versatile and easiest to cast.

### Learning to Cast

The overhead cast is the foundation of fly fishing. The key is timing: let the line fully extend behind you before starting the forward cast. Practice on grass before hitting the water. Short, controlled casts are more effective than trying to launch the fly across the river.

### Selecting Flies

Flies imitate the insects, baitfish, and other food that fish eat. The three main categories are dry flies (float on the surface), nymphs (sink below the surface), and streamers (imitate baitfish). A basic box with a dozen patterns in various sizes will cover most situations.

### Reading the Water

Fish don't randomly cruise around — they hold in specific spots where food is delivered to them by the current. Look for seams where fast and slow water meet, eddies behind rocks, and deeper pools. These are the most productive spots to present your fly.

### Knots You Need to Know

Master three knots to start: the improved clinch knot (tying fly to tippet), the surgeon's knot (connecting tippet to leader), and the nail knot or loop-to-loop connection (attaching leader to fly line). Practice these at home until they're second nature.

### Etiquette on the Water

Give other anglers plenty of space, don't walk through water someone is fishing, and always practice catch and release with proper technique. The fly fishing community values respect for both the fish and fellow anglers.

---

*Find fly fishing guides and charters near you in our directory.*`,
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Blog Post Not Found | Gray Bear Hunting Directory" };
  return {
    title: `${post.title} | Gray Bear Hunting Directory`,
    description: post.content.replace(/[#*\-\n]+/g, " ").trim().slice(0, 160),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-bg-light min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center text-text-muted hover:text-accent transition-colors text-sm mb-8"
        >
          &larr; Back to Blog
        </Link>

        <article>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <span>By {post.author}</span>
              <span>&middot;</span>
              <span>{post.date}</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="text-text-primary leading-relaxed space-y-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text-primary [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-text-primary [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-text-muted [&_p]:leading-relaxed [&_a]:text-accent [&_a]:hover:text-accent-light [&_em]:text-text-muted [&_hr]:border-border [&_hr]:my-8">
              {post.content.split("\n\n").map((block, i) => {
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
