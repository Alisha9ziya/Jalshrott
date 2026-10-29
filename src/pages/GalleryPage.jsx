import { useState } from 'react';
import { FiFilm, FiImage, FiMaximize2, FiPlus, FiTrash2, FiPlay } from 'react-icons/fi';
import PageHeader from '../components/layout/PageHeader';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import GalleryFormModal from '../components/gallery/GalleryFormModal';
import { useGallery } from '../hooks/useGallery';
import { useAuth } from '../context/AuthContext';
import { useAuthDialog } from '../context/AuthDialogContext';
import { useToast } from '../context/ToastContext';
import { deleteGalleryItem } from '../api/gallery';
import {
  getEmbedUrl,
  getVideoThumbnail,
} from '../lib/media';

function MediaCard({ item, featured, onOpen, onDelete, canManage }) {
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const thumbnail =
    item.type === 'video' ? getVideoThumbnail(item) : item.thumbnailUrl || item.url;
  const showThumbnail = Boolean(thumbnail) && !thumbnailFailed;

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`group relative overflow-hidden rounded-2xl border border-ink-200/90 bg-ink-950 text-left shadow-soft transition-all duration-300 hover:border-brand-400/60 hover:shadow-lift dark:border-ink-800 ${
        featured ? 'sm:row-span-2' : ''
      }`}
    >
      {showThumbnail ? (
        <img
          src={thumbnail}
          alt={item.title}
          loading="lazy"
          onError={() => setThumbnailFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-700 via-brand-850 to-brand-950">
          {item.type === 'video' ? (
            <FiPlay size={36} className="text-white/40" />
          ) : (
            <FiImage size={36} className="text-white/40" />
          )}
        </span>
      )}

      <span className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />

      <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
        {item.type === 'video' ? <FiFilm size={11} /> : <FiImage size={11} />}
        {item.type === 'video' ? 'Video' : 'Photo'}
      </span>

      {item.type === 'video' && (
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/95 text-brand-800 shadow-lift backdrop-blur-xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white">
            <FiPlay size={18} className="ml-0.5" />
          </span>
        </span>
      )}

      {canManage && item.fromApi && (
        <span
          role="button"
          tabIndex={0}
          onClick={(event) => {
            event.stopPropagation();
            onDelete(item);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              event.stopPropagation();
              onDelete(item);
            }
          }}
          className="absolute right-3.5 top-3.5 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-ink-950/70 text-white backdrop-blur-md transition hover:border-rose-500 hover:bg-rose-600"
          aria-label={`Delete ${item.title}`}
        >
          <FiTrash2 size={14} />
        </span>
      )}

      <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <span className="flex items-center justify-between gap-2">
          <span className="font-display text-sm sm:text-base font-bold tracking-tight text-white drop-shadow-xs">
            {item.title}
          </span>
          <FiMaximize2 size={14} className="shrink-0 text-white/70 transition group-hover:scale-110 group-hover:text-white" />
        </span>
        {item.caption && (
          <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-white/80">
            {item.caption}
          </span>
        )}
      </span>
    </button>
  );
}

export default function GalleryPage() {
  const { items, loading, error, reload } = useGallery();
  const { canManageSources, token } = useAuth();
  const { openAuth } = useAuthDialog();
  const toast = useToast();

  const [active, setActive] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const media = items;

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      await deleteGalleryItem(token, deleting.id);
      toast.success('Media removed from the gallery.');
      setDeleting(null);
      reload();
    } catch (err) {
      toast.error(err.message || 'Could not remove this media.');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Field Gallery"
        title="Water Sources in the Field"
        description="Photographic and video documentation from hydrological surveys across Uttarakhand watersheds."
        actions={
          canManageSources ? (
            <Button icon={<FiPlus size={15} />} onClick={() => setFormOpen(true)}>
              Add media
            </Button>
          ) : (
            <Button variant="outline" onClick={() => openAuth('login')}>
              Sign in to manage
            </Button>
          )
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid auto-rows-[230px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900"
              />
            ))}
          </div>
        ) : media.length ? (
          <>
            <div className="grid auto-rows-[230px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {media.map((item, index) => (
                <MediaCard
                  key={item.id || `${item.url}-${index}`}
                  item={item}
                  featured={index === 0}
                  onOpen={setActive}
                  onDelete={setDeleting}
                  canManage={canManageSources}
                />
              ))}
            </div>
            {error && (
              <p className="mt-5 text-center text-xs text-rose-500">{error}</p>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-ink-200/90 bg-white px-6 py-16 text-center shadow-soft dark:border-ink-800 dark:bg-ink-900">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-200/70 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30">
              <FiImage size={26} />
            </div>
            <h2 className="mt-4 font-display text-lg font-bold text-ink-900 dark:text-white">
              The Field Gallery is Empty
            </h2>
            <p className="mx-auto mt-1.5 max-w-md text-sm text-ink-500 dark:text-ink-400">
              Field survey teams and researchers can upload verified photos and video captures of water sources directly to this gallery.
            </p>
            {error && <p className="mt-3 text-xs text-rose-500">{error}</p>}
            {canManageSources && (
              <Button className="mt-5" icon={<FiPlus size={14} />} onClick={() => setFormOpen(true)}>
                Add First Media
              </Button>
            )}
          </div>
        )}
      </div>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active?.title}
        description={active?.caption}
        size="xl"
        bodyClassName="!p-0"
      >
        {active &&
          (active.type === 'video' ? (
            getEmbedUrl(active.url) ? (
              <iframe
                src={getEmbedUrl(active.url)}
                title={active.title}
                className="aspect-video w-full bg-ink-950"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={active.url}
                poster={active.thumbnailUrl || getVideoThumbnail(active) || undefined}
                controls
                autoPlay
                className="max-h-[70vh] w-full bg-ink-950"
              />
            )
          ) : (
            <img
              src={active.url}
              alt={active.title}
              className="max-h-[70vh] w-full bg-ink-950 object-contain"
            />
          ))}
      </Modal>

      {formOpen && (
        <GalleryFormModal
          open
          onClose={() => setFormOpen(false)}
          onSaved={reload}
        />
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        confirmLabel="Remove media"
        title="Remove this gallery item?"
        description={deleting ? `"${deleting.title}" will be removed from the gallery.` : ''}
      />
    </>
  );
}
