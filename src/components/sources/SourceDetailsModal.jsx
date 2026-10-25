import { FiEdit3, FiMapPin, FiExternalLink, FiCalendar, FiActivity } from 'react-icons/fi';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { ConditionBadge, PotableBadge, SourceTypeBadge } from './SourceBadges';
import Badge from '../ui/Badge';
import {
  formatCoord,
  formatDate,
  formatNumber,
  formatVolume,
  qualityMetrics,
  sourceLocationLabel,
} from '../../lib/source';

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-ink-100 py-2.5 last:border-0 dark:border-ink-800">
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</dt>
      <dd className="max-w-[62%] break-all text-right text-sm font-medium text-ink-800 dark:text-ink-100">
        {value || '—'}
      </dd>
    </div>
  );
}

export default function SourceDetailsModal({ source, open, onClose, onEdit, canManage }) {
  if (!source) return null;

  const metrics = qualityMetrics(source);
  const measured = metrics.filter((metric) => metric.value !== null && metric.value !== '');
  const osmLink =
    source.latitude != null && source.longitude != null
      ? `https://www.openstreetmap.org/?mlat=${source.latitude}&mlon=${source.longitude}#map=16/${source.latitude}/${source.longitude}`
      : null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={source.name}
      description={sourceLocationLabel(source)}
      size="lg"
      footer={
        <>
          {osmLink && (
            <a
              href={osmLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-ink-500 transition hover:bg-ink-100 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-white"
            >
              <FiExternalLink size={14} /> Open in OSM
            </a>
          )}
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {canManage && (
            <Button icon={<FiEdit3 size={15} />} onClick={() => onEdit?.(source)}>
              Edit source
            </Button>
          )}
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <SourceTypeBadge type={source.sourceType} />
        <ConditionBadge condition={source.condition} />
        <PotableBadge potable={source.isPotable} />
        {source.seasonal && (
          <Badge tone="bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30">
            Seasonal
          </Badge>
        )}
        {source.verified && (
          <Badge tone="bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30">
            Verified
          </Badge>
        )}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <section className="rounded-xl border border-ink-200 p-4 dark:border-ink-800">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink-800 dark:text-ink-100">
            <FiMapPin size={15} className="text-brand-600" /> Location &amp; access
          </h3>
          <dl>
            <DetailRow label="ID" value={source.id} />
            <DetailRow label="Village" value={source.village} />
            <DetailRow label="District" value={source.district} />
            <DetailRow label="State" value={source.state} />
            <DetailRow label="Latitude" value={formatCoord(source.latitude)} />
            <DetailRow label="Longitude" value={formatCoord(source.longitude)} />
            <DetailRow label="Duration" value={source.duration || 'Not recorded'} />
            <DetailRow
              label="Users / day"
              value={source.usersPerDay ? formatNumber(source.usersPerDay, 0) : '—'}
            />
            <DetailRow
              label="Distance from village"
              value={source.distanceFromVillage ? `${formatNumber(source.distanceFromVillage)} km` : '—'}
            />
            <DetailRow
              label="Storage area"
              value={
                source.area !== null && source.area !== undefined
                  ? `${formatNumber(source.area)} m²`
                  : 'Not configured'
              }
            />
            <DetailRow
              label="Latest water height"
              value={
                source.latestHeight !== null && source.latestHeight !== undefined
                  ? `${formatNumber(source.latestHeight)} m`
                  : '—'
              }
            />
            <DetailRow label="Volume" value={formatVolume(source.volume)} />
            <DetailRow label="Sensor device" value={source.deviceId || 'Not linked'} />
            <DetailRow
              label="Last reading"
              value={source.lastReadingAt ? formatDate(source.lastReadingAt) : 'No readings yet'}
            />
          </dl>
        </section>

        <section className="rounded-xl border border-ink-200 p-4 dark:border-ink-800">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-800 dark:text-ink-100">
            <FiActivity size={15} className="text-brand-600" /> Water quality
          </h3>

          {measured.length ? (
            <div className="grid grid-cols-2 gap-2">
              {metrics.map((metric) => (
                <div
                  key={metric.key}
                  className="rounded-lg bg-ink-50 px-3 py-2.5 dark:bg-ink-950/60"
                >
                  <p className="text-[11px] font-medium leading-tight text-ink-400">{metric.label}</p>
                  <p className="mt-1 text-sm font-semibold text-ink-800 dark:text-ink-100">
                    {formatNumber(metric.value)}
                    {metric.unit && metric.value !== null && metric.value !== '' && (
                      <span className="ml-1 text-[11px] font-normal text-ink-400">{metric.unit}</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-lg bg-ink-50 px-3 py-6 text-center text-sm text-ink-400 dark:bg-ink-950/60">
              No water quality tests recorded yet.
            </p>
          )}

          <div className="mt-3 space-y-1.5 text-xs text-ink-500 dark:text-ink-400">
            <p className="flex items-center gap-2">
              <FiCalendar size={12} /> Last tested: {formatDate(source.lastTestedAt)}
            </p>
            <p className="flex items-center gap-2">
              <FiCalendar size={12} /> Last maintained: {formatDate(source.lastMaintenanceAt)}
            </p>
          </div>
        </section>
      </div>

      <section className="mt-4 rounded-xl border border-ink-200 p-4 dark:border-ink-800">
        <h3 className="mb-1.5 text-sm font-semibold text-ink-800 dark:text-ink-100">Notes</h3>
        <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {source.notes || 'No additional notes recorded for this source.'}
        </p>
      </section>

      <p className="mt-4 text-right text-[11px] text-ink-400">
        Added {formatDate(source.createdAt)} · Updated {formatDate(source.updatedAt)}
      </p>
    </Modal>
  );
}
