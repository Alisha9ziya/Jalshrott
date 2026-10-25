import { useCallback, useEffect, useState } from 'react';
import { getSourceStats, listSources } from '../api/sources';
import { normalizeSource } from '../lib/source';

export function useSources() {
  const [sources, setSources] = useState([]);
  const [stats, setStats] = useState(null);
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
        const data = await listSources(undefined, controller.signal);
        if (!active) return;
        setSources((data || []).map(normalizeSource));
      } catch (err) {
        if (!active || err.name === 'AbortError') return;
        setError(err.message || 'Could not load water sources.');
        setSources([]);
      } finally {
        if (active) setLoading(false);
      }

      try {
        const summary = await getSourceStats(controller.signal);
        if (active) setStats(summary);
      } catch {
        /* stats are optional for public pages */
      }
    };

    load();
    return () => {
      active = false;
      controller.abort();
    };
  }, [refreshKey]);

  const reload = useCallback(() => setRefreshKey((key) => key + 1), []);

  return { sources, stats, loading, error, reload };
}

export function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
