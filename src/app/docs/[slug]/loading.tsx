export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-slate-200 dark:border-slate-700 flex items-center px-6 z-50 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg animate-pulse" />
          <div className="w-24 h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
        <div className="ml-auto flex gap-4 items-center">
          <div className="w-64 h-10 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse max-md:hidden" />
          <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
        </div>
      </header>

      {/* Sidebar Skeleton */}
      <nav className="fixed left-0 top-16 bottom-0 w-72 bg-background border-r border-slate-200 dark:border-slate-700 overflow-y-auto py-8 max-md:hidden">
        <div className="px-6 space-y-8">
          {[1, 2, 3].map((group) => (
            <div key={group}>
              <div className="w-32 h-4 bg-slate-200 dark:bg-slate-700 rounded mb-3 animate-pulse" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="w-full h-8 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Main Content Skeleton */}
      <main className="ml-0 md:ml-72 mt-16 py-12 px-6 md:px-16 max-w-screen-xl">
        <div className="space-y-6 animate-pulse">
          {/* Title */}
          <div className="w-3/4 h-12 bg-slate-200 dark:bg-slate-700 rounded" />
          
          {/* Paragraphs */}
          {[1, 2, 3, 4, 5].map((para) => (
            <div key={para} className="space-y-2">
              <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="w-2/3 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
