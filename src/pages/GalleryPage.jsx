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
import { GALLERY } from '../constants';
import {
  getEmbedUrl,
  getVideoThumbnail,
  normalizeMedia,
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
      className={`group relative overflow-hidden rounded-xl border border-ink-200 text-left dark:border-ink-800 ${
        featured ? 'sm:row-span-2' : ''
      }`}
    >
      {showThumbnail ? (
        <img
          src={thumbnail}
          alt={item.title}
          loading="lazy"
          onError={() => setThumbnailFailed(true)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-700 to-brand-950">
          {item.type === 'video' ? (
            <FiPlay size={34} className="text-white/40" />
          ) : (
            <FiImage size={34} className="text-white/40" />
          )}
        </span>
      )}

      <span className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />

      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-ink-950/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">
        {item.type === 'video' ? <FiFilm size={11} /> : <FiImage size={11} />}
        {item.type === 'video' ? 'Video' : 'Photo'}
      </span>

      {item.type === 'video' && (
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-brand-800 shadow-lift transition group-hover:scale-105">
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
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-ink-950/60 text-white backdrop-blur transition hover:bg-rose-600"
          aria-label={`Delete ${item.title}`}
        >
          <FiTrash2 size={14} />
        </span>
      )}

      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-white">{item.title}</span>
          <FiMaximize2 size={14} className="shrink-0 text-white/70" />
        </span>
        {item.caption && (
          <span className="mt-0.5 line-clamp-2 block text-xs text-white/70">{item.caption}</span>
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

  const usingFallback = !loading && items.length === 0;
  const media = usingFallback ? GALLERY.map(normalizeMedia) : items;

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
        eyebrow="Gallery"
        title="Water sources in the field"
        description="Photos and videos from field surveys across the watersheds of Uttarakhand."
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
          <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-xl border border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900"
              />
            ))}
          </div>
        ) : media.length ? (
          <>
            <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            {usingFallback && (
              <p className="mt-5 text-center text-xs text-ink-400">
                Showing sample project photos. Administrators can add real photos and videos.
              </p>
            )}
            {!usingFallback && error && (
              <p className="mt-5 text-center text-xs text-rose-500">{error}</p>
            )}
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-ink-300 px-6 py-16 text-center dark:border-ink-700">
            <FiImage size={26} className="mx-auto text-ink-400" />
            <h2 className="mt-3 text-base font-semibold text-ink-800 dark:text-ink-100">
              The gallery is empty
            </h2>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
              Administrators can add photos and videos from the field.
            </p>
            {canManageSources && (
              <Button className="mt-4" icon={<FiPlus size={14} />} onClick={() => setFormOpen(true)}>
                Add the first media
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
