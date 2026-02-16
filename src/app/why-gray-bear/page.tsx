import Link from "next/link";

export const metadata = {
  title: "Why Gray Bear | Gray Bear Hunting Directory",
  description: "Discover why thousands of hunters and anglers trust Gray Bear Hunting Directory to find their next outdoor adventure.",
};

const benefits = [
  {
    title: "Verified Listings",
    description: "Every guide, outfitter, and charter in our directory is verified for legitimacy, licensing, and insurance. No scams, no surprises.",
    icon: "✓",
  },
  {
    title: "Honest Success Rates",
    description: "We display real success rates so you know what to expect before you book. No inflated numbers or misleading claims.",
    icon: "📊",
  },
  {
    title: "Transparent Pricing",
    description: "See price ranges upfront. Compare options easily without having to call each outfitter for a quote.",
    icon: "💰",
  },
  {
    title: "Physical Intensity Ratings",
    description: "Our unique intensity meter helps you find hunts matched to your fitness level, from easy guided sits to extreme backcountry expeditions.",
    icon: "💪",
  },
  {
    title: "Genuine Reviews",
    description: "Read reviews from real sportsmen who have been there. Our review system helps the best operations rise to the top.",
    icon: "⭐",
  },
  {
    title: "Comprehensive Coverage",
    description: "From big game guides to fishing charters, taxidermists to gun dog trainers — we cover every aspect of the hunting and fishing industry.",
    icon: "🗺️",
  },
];

export default function WhyGrayBearPage() {
  return (
    <div className="bg-bg-light min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Why Gray Bear?
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            The hunting and fishing directory built by outdoorsmen, for outdoorsmen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-bg-card rounded-xl p-6 border border-border">
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h3 className="text-lg font-bold text-text-primary mb-2">{benefit.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-bg-card rounded-xl p-8 sm:p-12 border border-border text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Ready to Find Your Optimal Hunt?
          </h2>
          <p className="text-text-muted mb-8 max-w-xl mx-auto">
            Join thousands of hunters and anglers who trust Gray Bear to connect them with the best guides, outfitters, and charters in America.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/search"
              className="bg-accent text-gray-dark px-6 py-3 rounded-xl font-semibold hover:bg-accent-light transition-colors"
            >
              Browse Listings
            </Link>
            <Link
              href="/signup"
              className="border border-accent text-accent px-6 py-3 rounded-xl font-semibold hover:bg-accent hover:text-gray-dark transition-colors"
            >
              List Your Business
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
