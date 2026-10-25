import { useState } from 'react';
import { FiFilm, FiImage, FiLink, FiSave } from 'react-icons/fi';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Field, Input, Select, Textarea } from '../ui/Field';
import { createGalleryItem } from '../../api/gallery';
import { getEmbedUrl, getVideoThumbnail, isDirectVideo, isVideoUrl } from '../../lib/media';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const EMPTY_MEDIA = {
  title: '',
  type: 'image',
  url: '',
  thumbnailUrl: '',
  caption: '',
};

export default function GalleryFormModal({ open, onClose, onSaved }) {
  const { token } = useAuth();
  const toast = useToast();

  const [values, setValues] = useState({ ...EMPTY_MEDIA });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const setField = (key, value) => setValues((current) => ({ ...current, [key]: value }));

  const handleUrlBlur = () => {
    if (isVideoUrl(values.url) && values.type !== 'video') {
      setField('type', 'video');
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');

    if (!values.title.trim()) return setError('Give this media a title.');
    if (!values.url.trim()) return setError('Paste an image or video link.');

    setSaving(true);
    try {
      await createGalleryItem(token, {
        title: values.title.trim(),
        type: values.type,
        url: values.url.trim(),
        thumbnailUrl: values.thumbnailUrl.trim(),
        caption: values.caption.trim(),
      });
      toast.success('Media added to the gallery.');
      onSaved?.();
      onClose();
    } catch (err) {
      setError(err.message || 'Could not add this media.');
    } finally {
      setSaving(false);
    }
  };

  const previewEmbed = values.type === 'video' ? getEmbedUrl(values.url) : null;
  const previewThumb =
    values.type === 'video' ? getVideoThumbnail({ url: values.url, thumbnailUrl: values.thumbnailUrl }) : null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add media to the gallery"
      description="Link a photo or video from your hosting site, YouTube or Vimeo."
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" form="gallery-form" loading={saving} icon={<FiSave size={15} />}>
            Add media
          </Button>
        </>
      }
    >
      <form id="gallery-form" onSubmit={submit} className="space-y-4" noValidate>
        {error && (
          <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
            {error}
          </p>
        )}

        <div className="grid gap-3 sm:grid-cols-[1fr_140px]">
          <Field label="Title" required htmlFor="gallery-title">
            <Input
              id="gallery-title"
              value={values.title}
              onChange={(event) => setField('title', event.target.value)}
              placeholder="e.g. Spring monitoring, Unchar"
              required
            />
          </Field>
          <Field label="Media type" htmlFor="gallery-type">
            <Select
              id="gallery-type"
              value={values.type}
              onChange={(event) => setField('type', event.target.value)}
            >
              <option value="image">Photo</option>
              <option value="video">Video</option>
            </Select>
          </Field>
        </div>

        <Field
          label="Media URL"
          required
          htmlFor="gallery-url"
          hint="Image/video link or YouTube/Vimeo URL"
        >
          <div className="relative">
            <FiLink
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
              size={15}
            />
            <Input
              id="gallery-url"
              type="url"
              value={values.url}
              onChange={(event) => setField('url', event.target.value)}
              onBlur={handleUrlBlur}
              placeholder="https://…"
              className="pl-9"
              required
            />
          </div>
        </Field>

        {values.type === 'video' && (
          <Field
            label="Thumbnail URL"
            htmlFor="gallery-thumb"
            hint="Optional — YouTube covers are detected automatically"
          >
            <Input
              id="gallery-thumb"
              type="url"
              value={values.thumbnailUrl}
              onChange={(event) => setField('thumbnailUrl', event.target.value)}
              placeholder="https://…/cover.jpg"
            />
          </Field>
        )}

        <Field label="Caption" htmlFor="gallery-caption">
          <Textarea
            id="gallery-caption"
            rows={2}
            value={values.caption}
            onChange={(event) => setField('caption', event.target.value)}
            placeholder="A short description shown under the media."
          />
        </Field>

        <div className="overflow-hidden rounded-xl border border-ink-200 dark:border-ink-700">
          <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50 px-3 py-2 text-xs font-semibold text-ink-500 dark:border-ink-800 dark:bg-ink-950/50 dark:text-ink-400">
            {values.type === 'video' ? <FiFilm size={13} /> : <FiImage size={13} />} Preview
          </div>
          <div className="flex h-44 items-center justify-center bg-ink-100/60 dark:bg-ink-950">
            {!values.url ? (
              <p className="px-4 text-center text-xs text-ink-400">
                Paste a link above to see a preview.
              </p>
            ) : values.type === 'video' ? (
              previewEmbed ? (
                <iframe
                  src={previewEmbed}
                  title="Video preview"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : isDirectVideo(values.url) ? (
                <video src={values.url} className="h-full w-full object-contain" controls />
              ) : previewThumb ? (
                <img src={previewThumb} alt="" className="h-full w-full object-cover" />
              ) : (
                <p className="px-4 text-center text-xs text-ink-400">Video link detected.</p>
              )
            ) : (
              <img src={values.url} alt="" className="h-full w-full object-cover" />
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}
