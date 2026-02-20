import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-bg-light min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-2xl font-bold text-text-primary mb-4">Page Not Found</h2>
        <p className="text-text-muted mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-light transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/search"
            className="border border-border text-text-primary px-6 py-3 rounded-xl font-semibold hover:border-accent hover:text-accent transition-colors"
          >
            Browse Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
