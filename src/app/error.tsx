"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-bg-light min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">Something Went Wrong</h1>
        <p className="text-text-muted mb-8 max-w-md">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-light transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
