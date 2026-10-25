const controlClasses =
  'w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-800 shadow-sm transition placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10 disabled:bg-ink-50 disabled:text-ink-400 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-100 dark:placeholder:text-ink-500 dark:focus:border-brand-500';

export function Label({ children, htmlFor, required, hint }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between gap-2">
      <span className="text-xs font-semibold tracking-wide text-ink-500 dark:text-ink-400">
        {children}
        {required && <span className="ml-0.5 text-rose-500">*</span>}
      </span>
      {hint && <span className="text-[11px] font-normal text-ink-400">{hint}</span>}
    </label>
  );
}

export function Field({ label, required, hint, htmlFor, children, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <Label htmlFor={htmlFor} required={required} hint={hint}>
          {label}
        </Label>
      )}
      {children}
    </div>
  );
}

export function Input({ className = '', ...props }) {
  return <input className={`${controlClasses} ${className}`} {...props} />;
}

export function Textarea({ className = '', rows = 3, ...props }) {
  return <textarea rows={rows} className={`${controlClasses} ${className}`} {...props} />;
}

export function Select({ className = '', children, ...props }) {
  return (
    <select className={`${controlClasses} cursor-pointer pr-8 ${className}`} {...props}>
      {children}
    </select>
  );
}

export function Checkbox({ label, description, className = '', ...props }) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-2.5 rounded-lg border border-ink-200 bg-white px-3 py-2.5 transition hover:border-brand-300 dark:border-ink-700 dark:bg-ink-950 ${className}`}
    >
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-brand-600 accent-brand-600 focus:ring-brand-500"
        {...props}
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-ink-800 dark:text-ink-100">{label}</span>
        {description && (
          <span className="mt-0.5 block text-xs text-ink-500 dark:text-ink-400">{description}</span>
        )}
      </span>
    </label>
  );
}

export { controlClasses };
