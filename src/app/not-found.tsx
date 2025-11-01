import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-500 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Sorry, we couldn't find the page you're looking for. The page might
            have been moved or doesn't exist.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            Go to Home
          </Link>
          <Link
            href="/docs/getting-started"
            className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors duration-200"
          >
            View Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
