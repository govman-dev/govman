"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-500 mb-4">Error</h1>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Something went wrong!
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            An unexpected error occurred. Please try again or return to the home
            page.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
