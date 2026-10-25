import { FiAlertTriangle } from 'react-icons/fi';
import Modal from './Modal';
import Button from './Button';

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
  tone = 'danger',
}) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex items-start gap-4">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${
            tone === 'danger'
              ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300'
              : 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300'
          }`}
        >
          <FiAlertTriangle size={20} />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-ink-900 dark:text-white">{title}</h2>
          {description && (
            <p className="mt-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button variant={tone === 'danger' ? 'danger' : 'primary'} onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
