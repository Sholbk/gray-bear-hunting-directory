import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-dark border-b border-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-amber-brand text-2xl font-bold tracking-tight">
              Gray Bear
            </span>
            <span className="text-gray-text text-sm hidden sm:inline">
              Hunting Directory
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/search"
              className="text-gray-text hover:text-amber-brand transition-colors text-sm font-medium"
            >
              Browse All
            </Link>
            <Link
              href="/search?type=guide"
              className="text-gray-text hover:text-amber-brand transition-colors text-sm font-medium hidden sm:inline"
            >
              Guides
            </Link>
            <Link
              href="/search?type=outfitter"
              className="text-gray-text hover:text-amber-brand transition-colors text-sm font-medium hidden sm:inline"
            >
              Outfitters
            </Link>
            <Link
              href="/search?type=charter"
              className="text-gray-text hover:text-amber-brand transition-colors text-sm font-medium hidden sm:inline"
            >
              Charters
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
