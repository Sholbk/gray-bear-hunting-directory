import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-dark border-t border-gray-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-amber-brand font-bold text-lg mb-3">
              Gray Bear Hunting Directory
            </h3>
            <p className="text-gray-muted text-sm leading-relaxed">
              Find your optimal hunt. Browse verified guides, outfitters, and
              charters filtered by success rates, price, physical intensity, and
              honest reviews.
            </p>
          </div>
          <div>
            <h4 className="text-gray-text font-semibold text-sm mb-3 uppercase tracking-wider">
              Browse
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/search?type=guide"
                  className="text-gray-muted hover:text-amber-brand transition-colors text-sm"
                >
                  Hunting Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/search?type=outfitter"
                  className="text-gray-muted hover:text-amber-brand transition-colors text-sm"
                >
                  Outfitters
                </Link>
              </li>
              <li>
                <Link
                  href="/search?type=charter"
                  className="text-gray-muted hover:text-amber-brand transition-colors text-sm"
                >
                  Fishing Charters
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-muted hover:text-amber-brand transition-colors text-sm"
                >
                  All Listings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-text font-semibold text-sm mb-3 uppercase tracking-wider">
              Filter By
            </h4>
            <ul className="space-y-2">
              <li className="text-gray-muted text-sm">Success Rates</li>
              <li className="text-gray-muted text-sm">Price Range</li>
              <li className="text-gray-muted text-sm">Physical Intensity</li>
              <li className="text-gray-muted text-sm">Honest Reviews</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-light mt-8 pt-8 text-center">
          <p className="text-gray-muted text-xs">
            &copy; {new Date().getFullYear()} Gray Bear Hunting Directory. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
