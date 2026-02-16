import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hidden lg:block bg-primary text-text-inverse mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-xl">landscape</span>
              <h3 className="font-bold text-lg">Gray Bear</h3>
            </div>
            <p className="text-text-inverse/60 text-sm leading-relaxed">
              Find your optimal hunt. Browse verified guides, outfitters, and
              charters filtered by success rates, price, physical intensity, and
              honest reviews.
            </p>
          </div>

          {/* Directory */}
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-text-inverse/80">
              Directory
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="text-text-inverse/60 hover:text-white transition-colors text-sm">
                  Browse All
                </Link>
              </li>
              <li>
                <Link href="/state" className="text-text-inverse/60 hover:text-white transition-colors text-sm">
                  By State
                </Link>
              </li>
              <li>
                <Link href="/hunt" className="text-text-inverse/60 hover:text-white transition-colors text-sm">
                  By Species
                </Link>
              </li>
              <li>
                <Link href="/directory" className="text-text-inverse/60 hover:text-white transition-colors text-sm">
                  All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-text-inverse/80">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-text-inverse/60 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-inverse/60 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/why-gray-bear" className="text-text-inverse/60 hover:text-white transition-colors text-sm">
                  Why Gray Bear
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-inverse/60 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* For Members */}
          <div>
            <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-text-inverse/80">
              For Members
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/membership" className="text-text-inverse/60 hover:text-white transition-colors text-sm">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-text-inverse/60 hover:text-white transition-colors text-sm">
                  List Your Business
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-text-inverse/60 hover:text-white transition-colors text-sm">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-text-inverse/40 text-xs">
            &copy; {new Date().getFullYear()} Gray Bear Hunting Directory. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
