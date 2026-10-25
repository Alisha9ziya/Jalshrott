import { FiEdit3, FiTrash2, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { SourceTypeBadge } from './SourceBadges';
import { formatCoord, formatVolume } from '../../lib/source';

const TH =
  'px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-ink-400 whitespace-nowrap';
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
    <div className="overflow-hidden rounded-xl border border-ink-200 bg-white shadow-soft dark:border-ink-800 dark:bg-ink-900">
      <div className="thin-scrollbar overflow-x-auto">
        <table className="w-full min-w-[1010px] border-collapse">
          <thead className="bg-ink-50/80 dark:bg-ink-950/50">
            <tr className="border-b border-ink-200 dark:border-ink-800">
              <th className={`${TH} w-12`}>#</th>
              <th className={TH}>Name</th>
              <th className={TH}>Type</th>
              <th className={TH}>Village</th>
              <th className={TH}>Duration</th>
              <th className={TH}>Latitude</th>
              <th className={TH}>Longitude</th>
              <th className={TH}>Volume</th>
              <th className={`${TH} text-right`}>Details</th>
              {!readOnly && <th className={`${TH} text-right`}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sources.map((source, index) => (
              <tr
                key={source.id}
                className="group border-b border-ink-100 transition-colors last:border-0 hover:bg-brand-50/40 dark:border-ink-800 dark:hover:bg-ink-800/40"
              >
                <td className={`${TD} text-xs font-medium text-ink-400`}>{startIndex + index}</td>
                <td className={`${TD} max-w-[260px]`}>
                  <button
                    type="button"
                    onClick={() => onView?.(source)}
                    className="flex items-center gap-1.5 text-left font-semibold text-ink-800 transition hover:text-brand-700 dark:text-ink-100 dark:hover:text-brand-300"
                  >
                    <span className="truncate">{source.name}</span>
                    {source.verified && (
                      <FiCheckCircle
                        size={13}
                        className="shrink-0 text-emerald-500"
                        title="Verified source"
                      />
                    )}
                  </button>
                </td>
                <td className={TD}>
                  <SourceTypeBadge type={source.sourceType} />
                </td>
                <td className={`${TD} whitespace-nowrap`}>{source.village || '—'}</td>
                <td className={`${TD} whitespace-nowrap`}>{source.duration || 'none'}</td>
                <td className={`${TD} whitespace-nowrap font-mono text-xs`}>
                  {formatCoord(source.latitude)}
                </td>
                <td className={`${TD} whitespace-nowrap font-mono text-xs`}>
                  {formatCoord(source.longitude)}
                </td>
                <td className={`${TD} whitespace-nowrap font-semibold text-brand-700 dark:text-brand-300`}>
                  {formatVolume(source.volume)}
                </td>
                <td className={`${TD} text-right`}>
                  <button
                    type="button"
                    onClick={() => onView?.(source)}
                    className="inline-flex items-center gap-1 rounded-md border border-brand-200 bg-brand-50/60 px-2.5 py-1.5 text-xs font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-brand-100 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/20"
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
                        className="grid h-7 w-7 place-items-center rounded-md text-ink-400 transition hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-500/15 dark:hover:text-brand-300"
                        title="Edit source"
                        aria-label={`Edit ${source.name}`}
                      >
                        <FiEdit3 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete?.(source)}
                        className="grid h-7 w-7 place-items-center rounded-md text-ink-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/15 dark:hover:text-rose-300"
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
