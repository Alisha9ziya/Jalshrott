import { useCallback, useEffect, useState } from 'react';
import { listGallery } from '../api/gallery';
import { normalizeMedia } from '../lib/media';

export function useGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await listGallery(controller.signal);
        if (!active) return;
        setItems((data.items || []).map(normalizeMedia));
      } catch (err) {
        if (!active || err.name === 'AbortError') return;
        setError(err.message || 'Could not load the gallery.');
        setItems([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
      controller.abort();
    };
  }, [refreshKey]);

  const reload = useCallback(() => setRefreshKey((key) => key + 1), []);

  return { items, loading, error, reload };
}
