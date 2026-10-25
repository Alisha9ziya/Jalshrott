export default function PageHeader({ eyebrow, title, description, actions, children }) {
  return (
    <div className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
                {eyebrow}
              </p>
            )}
            <h1 className="text-2xl font-bold text-ink-900 sm:text-3xl dark:text-white">{title}</h1>
            {description && (
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}
