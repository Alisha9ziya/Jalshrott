import { FiEdit3, FiTrash2, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { SourceTypeBadge } from './SourceBadges';
import { formatCoord, formatVolume } from '../../lib/source';

const TH =
  'px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400 whitespace-nowrap';
const TD = 'px-4 py-3.5 text-sm text-ink-600 dark:text-ink-300 align-middle';

export default function SourceTable({
  sources,
  startIndex = 1,
  onView,
  onEdit,
  onDelete,
  readOnly = false,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200/90 bg-white shadow-soft dark:border-ink-800 dark:bg-ink-900">
      <div className="thin-scrollbar overflow-x-auto">
        <table className="w-full min-w-[1010px] border-collapse text-left">
          <thead className="border-b border-ink-200/80 bg-ink-50/70 dark:border-ink-800 dark:bg-ink-950/70">
            <tr>
              <th className={`${TH} w-12 text-center`}>#</th>
              <th className={TH}>Source Name</th>
              <th className={TH}>Type</th>
              <th className={TH}>Village</th>
              <th className={TH}>Seasonal Duration</th>
              <th className={TH}>Latitude</th>
              <th className={TH}>Longitude</th>
              <th className={TH}>Volume</th>
              <th className={`${TH} text-right`}>Inspection</th>
              {!readOnly && <th className={`${TH} text-right`}>Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-ink-800/80">
            {sources.map((source, index) => (
              <tr
                key={source.id}
                className="group transition-colors hover:bg-brand-50/40 dark:hover:bg-brand-500/5"
              >
                <td className={`${TD} text-center text-xs font-semibold text-ink-400`}>
                  {startIndex + index}
                </td>
                <td className={`${TD} max-w-[260px]`}>
                  <button
                    type="button"
                    onClick={() => onView?.(source)}
                    className="flex items-center gap-2 text-left font-semibold text-ink-900 transition hover:text-brand-600 dark:text-ink-100 dark:hover:text-brand-300"
                  >
                    <span className="truncate">{source.name}</span>
                    {source.verified && (
                      <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/15 dark:text-emerald-300">
                        <FiCheckCircle size={10} className="text-emerald-600 dark:text-emerald-400" />
                        Verified
                      </span>
                    )}
                  </button>
                </td>
                <td className={TD}>
                  <SourceTypeBadge type={source.sourceType} />
                </td>
                <td className={`${TD} whitespace-nowrap font-medium text-ink-700 dark:text-ink-200`}>
                  {source.village || '—'}
                </td>
                <td className={`${TD} whitespace-nowrap text-xs text-ink-500 dark:text-ink-400`}>
                  {source.duration || 'Not specified'}
                </td>
                <td className={`${TD} whitespace-nowrap`}>
                  <span className="rounded-md border border-ink-200/60 bg-ink-50 px-2 py-0.5 font-mono text-xs text-ink-700 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-300">
                    {formatCoord(source.latitude)}
                  </span>
                </td>
                <td className={`${TD} whitespace-nowrap`}>
                  <span className="rounded-md border border-ink-200/60 bg-ink-50 px-2 py-0.5 font-mono text-xs text-ink-700 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-300">
                    {formatCoord(source.longitude)}
                  </span>
                </td>
                <td className={`${TD} whitespace-nowrap font-semibold text-brand-700 dark:text-brand-300`}>
                  {formatVolume(source.volume)}
                </td>
                <td className={`${TD} text-right`}>
                  <button
                    type="button"
                    onClick={() => onView?.(source)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50/80 px-2.5 py-1.5 text-xs font-semibold text-brand-700 shadow-2xs transition hover:border-brand-300 hover:bg-brand-100 dark:border-brand-500/30 dark:bg-brand-500/15 dark:text-brand-300 dark:hover:bg-brand-500/25"
                  >
                    View details
                    <FiArrowRight size={12} />
                  </button>
                </td>
                {!readOnly && (
                  <td className={`${TD} text-right`}>
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit?.(source)}
                        className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 transition hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-500/15 dark:hover:text-brand-300"
                        title="Edit source"
                        aria-label={`Edit ${source.name}`}
                      >
                        <FiEdit3 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete?.(source)}
                        className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/15 dark:hover:text-rose-300"
                        title="Delete source"
                        aria-label={`Delete ${source.name}`}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
