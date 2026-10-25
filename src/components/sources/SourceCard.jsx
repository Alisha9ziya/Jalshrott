import { FiArrowUpRight, FiMapPin } from 'react-icons/fi';
import { ConditionBadge, SourceTypeBadge } from './SourceBadges';
import { formatNumber, sourceLocationLabel } from '../../lib/source';

export default function SourceCard({ source, onView }) {
  return (
    <article className="group flex flex-col rounded-xl border border-ink-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-soft dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/40">
      <div className="flex items-start justify-between gap-2">
        <SourceTypeBadge type={source.sourceType} />
        <ConditionBadge condition={source.condition} />
      </div>

      <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-snug text-ink-900 dark:text-white">
        {source.name}
      </h3>

      <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-500 dark:text-ink-400">
        <FiMapPin size={12} className="shrink-0" />
        <span className="truncate">{sourceLocationLabel(source)}</span>
      </p>

      <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-ink-100 pt-3 text-center dark:border-ink-800">
        {[
          { label: 'pH', value: formatNumber(source.ph, 1) },
          { label: 'TDS', value: formatNumber(source.quality?.tds, 0) },
          { label: 'Duration', value: source.duration || '—' },
        ].map((item) => (
          <div key={item.label}>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">
              {item.label}
            </dt>
            <dd className="mt-0.5 truncate text-xs font-semibold text-ink-700 dark:text-ink-200">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={() => onView?.(source)}
        className="mt-3 inline-flex items-center gap-1 self-start text-xs font-semibold text-brand-700 transition group-hover:gap-1.5 dark:text-brand-300"
      >
        View details <FiArrowUpRight size={13} />
      </button>
    </article>
  );
}
