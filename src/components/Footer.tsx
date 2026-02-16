import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-dark border-t border-gray-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
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

          {/* Directory */}
          <div>
            <h4 className="text-gray-text font-semibold text-sm mb-3 uppercase tracking-wider">
              Directory
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="text-gray-muted hover:text-amber-brand transition-colors text-sm">
                  Browse All
                </Link>
              </li>
              <li>
                <Link href="/state" className="text-gray-muted hover:text-amber-brand transition-colors text-sm">
                  By State
                </Link>
              </li>
              <li>
                <Link href="/hunt" className="text-gray-muted hover:text-amber-brand transition-colors text-sm">
                  By Species
                </Link>
              </li>
              <li>
                <Link href="/directory" className="text-gray-muted hover:text-amber-brand transition-colors text-sm">
                  All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-text font-semibold text-sm mb-3 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-muted hover:text-amber-brand transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-muted hover:text-amber-brand transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/why-gray-bear" className="text-gray-muted hover:text-amber-brand transition-colors text-sm">
                  Why Gray Bear
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-muted hover:text-amber-brand transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* For Members */}
          <div>
            <h4 className="text-gray-text font-semibold text-sm mb-3 uppercase tracking-wider">
              For Members
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/membership" className="text-gray-muted hover:text-amber-brand transition-colors text-sm">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-muted hover:text-amber-brand transition-colors text-sm">
                  List Your Business
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-muted hover:text-amber-brand transition-colors text-sm">
                  Login
                </Link>
              </li>
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
