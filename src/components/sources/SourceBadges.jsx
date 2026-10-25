import Badge from '../ui/Badge';
import { conditionMeta, sourceTypeMeta } from '../../constants';

export function SourceTypeBadge({ type, className = '' }) {
  const meta = sourceTypeMeta(type);
  return (
    <Badge tone={meta.tint} className={className} dot>
      {meta.label}
    </Badge>
  );
}

export function ConditionBadge({ condition, className = '' }) {
  const meta = conditionMeta(condition);
  return (
    <Badge tone={meta.tint} className={className}>
      {meta.label}
    </Badge>
  );
}

export function PotableBadge({ potable }) {
  return (
    <Badge
      tone={
        potable
          ? 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30'
          : 'bg-ink-100 text-ink-500 ring-ink-200 dark:bg-ink-800 dark:text-ink-400 dark:ring-ink-700'
      }
    >
      {potable ? 'Potable' : 'Not potable'}
    </Badge>
  );
}
