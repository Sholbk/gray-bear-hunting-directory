import Link from "next/link";

export const metadata = {
  title: "About | Gray Bear Hunting Directory",
  description: "Learn about Gray Bear Hunting Directory - our mission to connect hunters and anglers with the best guides, outfitters, and charters in America.",
};

export default function AboutPage() {
  return (
    <div className="bg-bg-light min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-8">
          About Gray Bear
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-accent mb-3">Our Mission</h2>
            <p className="text-text-muted leading-relaxed">
              Gray Bear Hunting Directory was founded to solve a simple problem: finding a quality hunting guide
              or fishing charter shouldn&apos;t be a gamble. We connect sportsmen and women with verified, reviewed
              guides, outfitters, and charters across the United States. Every listing is vetted for quality,
              and our honest review system helps you make informed decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-accent mb-3">What We Believe</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Transparency", desc: "Real success rates, honest reviews, and upfront pricing. No surprises." },
                { title: "Quality First", desc: "Every listing is verified. We partner with professionals who take pride in their craft." },
                { title: "Community", desc: "We believe the outdoor community thrives when we help each other find great experiences." },
                { title: "Conservation", desc: "We support ethical hunting and fishing practices that preserve our wild places for future generations." },
              ].map((value) => (
                <div key={value.title} className="bg-bg-card rounded-xl p-5 border border-border">
                  <h3 className="text-text-primary font-semibold mb-2">{value.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-accent mb-3">Our Team</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              We&apos;re a team of avid hunters, anglers, and outdoor enthusiasts based across the country.
              With decades of combined experience in the field, we understand what makes a great hunting
              or fishing experience — and what to watch out for.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Jake Morrison", role: "Founder & CEO", bg: "from-primary/20 to-primary/5" },
                { name: "Sarah Chen", role: "Head of Partnerships", bg: "from-accent/20 to-accent/5" },
                { name: "Mike Rawlings", role: "Content & Community", bg: "from-primary/15 to-accent/10" },
              ].map((member) => (
                <div key={member.name} className="bg-bg-card rounded-xl border border-border p-5 text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.bg} mx-auto mb-3 flex items-center justify-center`}>
                    <span className="text-2xl font-bold text-primary/60">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="text-text-primary font-semibold">{member.name}</h3>
                  <p className="text-text-muted text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-bg-card rounded-xl p-8 border border-border text-center">
            <h2 className="text-xl font-bold text-text-primary mb-3">Ready to Find Your Next Adventure?</h2>
            <p className="text-text-muted mb-6">
              Browse our directory of verified guides, outfitters, and charters.
            </p>
            <Link
              href="/search"
              className="inline-block bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-light transition-colors"
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
