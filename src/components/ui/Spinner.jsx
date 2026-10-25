export function Spinner({ size = 20, className = '' }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export function LoadingPanel({ label = 'Loading water sources…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-ink-200 bg-white py-16 text-ink-500 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-400">
      <Spinner size={26} className="text-brand-600" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}

export function TableSkeleton({ rows = 6 }) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border-b border-ink-100 px-4 py-4 last:border-0 dark:border-ink-800"
        >
          <div className="h-3 w-6 animate-pulse rounded bg-ink-100 dark:bg-ink-800" />
          <div className="h-3 flex-1 animate-pulse rounded bg-ink-100 dark:bg-ink-800" />
          <div className="h-3 w-20 animate-pulse rounded bg-ink-100 dark:bg-ink-800" />
          <div className="hidden h-3 w-28 animate-pulse rounded bg-ink-100 dark:bg-ink-800 sm:block" />
          <div className="h-3 w-16 animate-pulse rounded bg-ink-100 dark:bg-ink-800" />
        </div>
      ))}
    </div>
  );
}
