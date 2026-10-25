import { FiInbox } from 'react-icons/fi';

export default function EmptyState({
  icon: Icon = FiInbox,
  title = 'Nothing here yet',
  description,
  action,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-ink-300 bg-white/60 px-6 py-14 text-center dark:border-ink-700 dark:bg-ink-900/40 ${className}`}
    >
      <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
        <Icon size={22} />
      </span>
      <div>
        <h3 className="text-base font-semibold text-ink-800 dark:text-ink-100">{title}</h3>
        {description && (
          <p className="mx-auto mt-1 max-w-sm text-sm text-ink-500 dark:text-ink-400">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
