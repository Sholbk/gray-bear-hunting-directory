import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-gray-darker min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-amber-brand mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-text mb-4">Page Not Found</h2>
        <p className="text-gray-muted mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-amber-brand text-gray-dark px-6 py-3 rounded-lg font-semibold hover:bg-amber-light transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/search"
            className="border border-gray-light text-gray-text px-6 py-3 rounded-lg font-semibold hover:border-amber-brand hover:text-amber-brand transition-colors"
          >
            Browse Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
