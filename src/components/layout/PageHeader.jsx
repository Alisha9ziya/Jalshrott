export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  children,
}) {
  return (
    <div className="relative isolate overflow-hidden border-b border-ink-200/80 bg-gradient-to-b from-white via-brand-50/25 to-ink-50/50 py-8 sm:py-10 dark:border-ink-800 dark:from-ink-950 dark:via-brand-950/15 dark:to-ink-950">
      {/* Ambient background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-1/4 -z-10 h-72 w-72 rounded-full bg-brand-400/10 blur-3xl dark:bg-brand-500/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-10 -z-10 h-48 w-48 rounded-full bg-brand-500/5 blur-2xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-3xl">
            {eyebrow && (
              <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700 shadow-2xs backdrop-blur-md dark:border-brand-500/30 dark:bg-brand-500/15 dark:text-brand-300">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(42,157,244,0.8)] animate-pulse" />
                {eyebrow}
              </div>
            )}
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl lg:text-4xl dark:text-white">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-sm leading-relaxed text-ink-600 sm:text-base dark:text-ink-300 font-normal">
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              {actions}
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
