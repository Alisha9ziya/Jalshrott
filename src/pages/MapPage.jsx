import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Marker } from 'react-leaflet';
import {
  FiPlus,
  FiSearch,
  FiMapPin,
  FiCrosshair,
  FiChevronRight,
  FiX,
  FiAlertCircle,
  FiLayers,
} from 'react-icons/fi';
import PageHeader from '../components/layout/PageHeader';
import MapCanvas from '../components/map/MapCanvas';
import SourceDetailsModal from '../components/sources/SourceDetailsModal';
import SourceFormModal from '../components/sources/SourceFormModal';
import Button from '../components/ui/Button';
import { Field, Input, Select } from '../components/ui/Field';
import { useSources } from '../hooks/useSources';
import { useAuth } from '../context/AuthContext';
import { useAuthDialog } from '../context/AuthDialogContext';
import { useToast } from '../context/ToastContext';
import { DEFAULT_CENTER, DEFAULT_ZOOM, haversineKm, geocode } from '../lib/geo';
import { createPickedIcon } from '../lib/marker';
import { filterSources, searchSources, uniqueValues } from '../lib/source';
import { SOURCE_TYPES, sourceTypeMeta } from '../constants';

const PICK_ICON = createPickedIcon();
const RADIUS_KM = 15;

const emptyFilters = { search: '', state: '', district: '', type: '' };

export default function MapPage() {
  const { sources, loading, error, reload } = useSources();
  const { canManageSources, user } = useAuth();
  const { openAuth } = useAuthDialog();
  const toast = useToast();

  const [draft, setDraft] = useState(emptyFilters);
  const [applied, setApplied] = useState(emptyFilters);
  const [pickedPoint, setPickedPoint] = useState(null);
  const [radiusFilter, setRadiusFilter] = useState(null);
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [fitToSources, setFitToSources] = useState(true);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState('');
  const suggestionRef = useRef(null);

  const visibleSources = useMemo(() => {
    let list = searchSources(filterSources(sources, applied), applied.search);
    if (radiusFilter) {
      list = list.filter(
        (source) =>
          Number.isFinite(source.latitude) &&
          Number.isFinite(source.longitude) &&
          haversineKm(radiusFilter, [source.latitude, source.longitude]) <= RADIUS_KM
      );
    }
    return list;
  }, [sources, applied, radiusFilter]);

  const states = uniqueValues(sources, 'state');
  const districts = uniqueValues(
    applied.state ? sources.filter((source) => source.state === applied.state) : sources,
    'district'
  );

  const legendTypes = useMemo(() => {
    const used = new Set(sources.map((source) => source.sourceType));
    return SOURCE_TYPES.filter((type) => used.has(type.value));
  }, [sources]);

  useEffect(() => {
    if (!suggestions.length) return undefined;
    const handleClick = (event) => {
      if (!suggestionRef.current?.contains(event.target)) setSuggestions([]);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [suggestions.length]);

  const runSearch = () => {
    setApplied(draft);
    setRadiusFilter(null);
    setFitToSources(true);
  };

  const clearFilters = () => {
    setDraft(emptyFilters);
    setApplied(emptyFilters);
    setRadiusFilter(null);
    setPickedPoint(null);
    setFitToSources(true);
    setCenter(DEFAULT_CENTER);
  };

  const handleGeocode = async (event) => {
    event?.preventDefault();
    if (!query.trim()) return;

    setGeoLoading(true);
    setGeoError('');
    try {
      const results = await geocode(query.trim());
      if (!results.length) {
        setGeoError('No matching location found. Try a village, district or landmark.');
        setSuggestions([]);
        return;
      }
      setSuggestions(results);
    } catch (err) {
      setGeoError(err.message || 'Location search failed.');
    } finally {
      setGeoLoading(false);
    }
  };

  const chooseSuggestion = (suggestion) => {
    setCenter([suggestion.lat, suggestion.lon]);
    setPickedPoint([suggestion.lat, suggestion.lon]);
    setFitToSources(false);
    setSuggestions([]);
    setQuery(suggestion.label.split(',')[0]);
  };

  const useMyRegion = async () => {
    if (!user) {
      toast.info('Sign in to use your saved region.');
      openAuth('login');
      return;
    }
    const region = [user.district, user.state].filter(Boolean).join(', ');
    if (!region) {
      toast.info('Set your district in the admin dashboard to use this shortcut.');
      return;
    }
    try {
      const results = await geocode(`${region}, India`);
      if (!results.length) {
        toast.error(`Could not locate ${region}.`);
        return;
      }
      setCenter([results[0].lat, results[0].lon]);
      setFitToSources(false);
      toast.success(`Centered on ${region}.`);
    } catch (err) {
      toast.error(err.message || 'Could not locate your region.');
    }
  };

  const applyPickedPoint = () => {
    if (!pickedPoint) {
      toast.info('Click anywhere on the map (or search a location) to pick a point.');
      return;
    }
    setRadiusFilter(pickedPoint);
    setFitToSources(true);
    setCenter(pickedPoint);
    const count = sources.filter(
      (source) =>
        Number.isFinite(source.latitude) &&
        haversineKm(pickedPoint, [source.latitude, source.longitude]) <= RADIUS_KM
    ).length;
    toast.success(`${count} source${count === 1 ? '' : 's'} within ${RADIUS_KM} km of the picked point.`);
  };

  const handlePick = useCallback((latlng) => {
    setPickedPoint([latlng.lat, latlng.lng]);
    setRadiusFilter(null);
  }, []);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (source) => {
    setSelected(null);
    setEditing(source);
    setFormOpen(true);
  };

  return (
    <>
      {/* Sleek, Purpose-Built Map Header Bar */}
      <div className="border-b border-ink-200/80 bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-3.5 lg:px-8 dark:border-ink-800 dark:bg-ink-950/95">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-200/70 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30">
                <FiMapPin size={18} />
              </span>
              <div>
                <h1 className="font-display text-base font-bold tracking-tight text-ink-900 sm:text-lg dark:text-white">
                  Map View
                </h1>
                <p className="text-xs text-ink-500 dark:text-ink-400">
                  Interactive GIS Database &middot; Uttarakhand Watersheds
                </p>
              </div>
            </div>

            <div className="hidden h-6 w-px bg-ink-200 sm:block dark:bg-ink-800" />

            <div className="hidden items-center gap-1.5 rounded-full border border-ink-200 bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-700 sm:inline-flex dark:border-ink-800 dark:bg-ink-900 dark:text-ink-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {loading ? 'Loading sources…' : `${visibleSources.length} of ${sources.length} sources visible`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/sources"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-ink-200/80 bg-white px-3.5 text-xs font-semibold text-ink-700 shadow-2xs transition hover:border-brand-300 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200 dark:hover:border-brand-500/40"
            >
              <FiLayers size={13} />
              <span>List View</span>
            </Link>

            {canManageSources && (
              <Button size="sm" onClick={openAdd} icon={<FiPlus size={14} />}>
                Add Source
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:h-[calc(100dvh-7.75rem)] lg:flex-row">
        {/* Sidebar */}
        <aside className="thin-scrollbar flex w-full shrink-0 flex-col border-b border-ink-200 bg-white lg:w-80 lg:overflow-y-auto lg:border-b-0 lg:border-r dark:border-ink-800 dark:bg-ink-950">
          <div className="border-b border-ink-100 px-4 py-4 dark:border-ink-800">
            <h2 className="text-sm font-bold text-ink-900 dark:text-white">Find water sources</h2>
            <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">
              {loading ? 'Loading…' : `${visibleSources.length} of ${sources.length} sources shown`}
            </p>
          </div>

          <div className="space-y-3 px-4 py-4">
            <Field label="Search by name" htmlFor="map-name">
              <div className="relative">
                <FiSearch
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
                  size={14}
                />
                <Input
                  id="map-name"
                  value={draft.search}
                  onChange={(event) => setDraft({ ...draft, search: event.target.value })}
                  onKeyDown={(event) => event.key === 'Enter' && runSearch()}
                  placeholder="Name, village or district"
                  className="pl-8"
                />
              </div>
            </Field>

            <Field label="State / UT" htmlFor="map-state">
              <Select
                id="map-state"
                value={draft.state}
                onChange={(event) => setDraft({ ...draft, state: event.target.value, district: '' })}
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="District" htmlFor="map-district">
              <Select
                id="map-district"
                value={draft.district}
                onChange={(event) => setDraft({ ...draft, district: event.target.value })}
              >
                <option value="">All Districts</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Resource type" htmlFor="map-type">
              <Select
                id="map-type"
                value={draft.type}
                onChange={(event) => setDraft({ ...draft, type: event.target.value })}
              >
                <option value="">All Types</option>
                {SOURCE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
            </Field>

            <div className="flex gap-2 pt-1">
              <Button onClick={runSearch} icon={<FiSearch size={14} />} className="flex-1">
                Search sources
              </Button>
              <Button variant="outline" size="icon" onClick={clearFilters} title="Clear filters">
                <FiX size={15} />
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 border-t border-ink-100 dark:border-ink-800">
            <p className="px-4 pb-1 pt-3 text-[11px] font-bold uppercase tracking-wider text-ink-400">
              Results
            </p>
            <ul className="thin-scrollbar max-h-64 overflow-y-auto px-2 pb-3 lg:max-h-none">
              {error ? (
                <li className="mx-2 mt-2 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
                  <FiAlertCircle size={13} className="mt-0.5 shrink-0" /> {error}
                </li>
              ) : visibleSources.length ? (
                visibleSources.map((source) => {
                  const meta = sourceTypeMeta(source.sourceType);
                  return (
                    <li key={source.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(source);
                          setCenter([source.latitude, source.longitude]);
                          setFitToSources(false);
                        }}
                        className="flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition hover:bg-ink-50 dark:hover:bg-ink-900"
                      >
                        <span
                          className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white dark:ring-ink-950"
                          style={{ background: meta.color }}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-xs font-semibold text-ink-800 dark:text-ink-100">
                            {source.name}
                          </span>
                          <span className="block truncate text-[11px] text-ink-400">
                            {[source.village, source.district].filter(Boolean).join(', ') || meta.label}
                          </span>
                        </span>
                        <FiChevronRight size={13} className="mt-1 shrink-0 text-ink-300" />
                      </button>
                    </li>
                  );
                })
              ) : (
                <li className="px-4 py-6 text-center text-xs text-ink-400">
                  No sources match the selected filters.
                </li>
              )}
            </ul>
          </div>

          <div className="hidden items-center justify-between border-t border-ink-100 px-4 py-3 lg:flex dark:border-ink-800">
            <div className="flex flex-wrap gap-2.5">
              {legendTypes.map((type) => (
                <span key={type.value} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-500 dark:text-ink-400">
                  <span className="h-2 w-2 rounded-full" style={{ background: type.color }} />
                  {type.label}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Map */}
        <div className="relative z-0 min-h-[420px] flex-1 lg:min-h-0">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-3">
            <div className="pointer-events-auto flex flex-col gap-2 rounded-xl border border-ink-200 bg-white/95 p-2 shadow-soft backdrop-blur sm:flex-row sm:items-center dark:border-ink-800 dark:bg-ink-900/95">
              <form onSubmit={handleGeocode} className="flex flex-1 items-center gap-2">
                <div className="relative flex-1">
                  <FiSearch
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
                    size={15}
                  />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search a location in Uttarakhand…"
                    className="h-9 w-full rounded-lg border border-ink-200 bg-white pl-9 pr-3 text-sm text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-ink-700 dark:bg-ink-950 dark:text-ink-100"
                    aria-label="Search a location"
                  />
                  {suggestions.length > 0 && (
                    <div
                      ref={suggestionRef}
                      className="absolute inset-x-0 top-11 z-20 max-h-64 overflow-y-auto rounded-lg border border-ink-200 bg-white py-1 shadow-lift dark:border-ink-700 dark:bg-ink-900"
                    >
                      {suggestions.map((suggestion) => (
                        <button
                          key={`${suggestion.lat}-${suggestion.lon}`}
                          type="button"
                          onClick={() => chooseSuggestion(suggestion)}
                          className="flex w-full items-start gap-2 px-3 py-2 text-left text-xs text-ink-600 transition hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800"
                        >
                          <FiMapPin size={13} className="mt-0.5 shrink-0 text-brand-500" />
                          <span className="line-clamp-2">{suggestion.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Button type="submit" size="md" loading={geoLoading} className="shrink-0">
                  Search
                </Button>
              </form>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="md" onClick={useMyRegion} className="flex-1 sm:flex-none">
                  My region
                </Button>
                <Button
                  size="md"
                  variant={radiusFilter ? 'secondary' : 'primary'}
                  onClick={applyPickedPoint}
                  icon={<FiCrosshair size={14} />}
                  className="flex-1 sm:flex-none"
                >
                  {radiusFilter ? 'Clear point' : 'Use picked point'}
                </Button>
              </div>
            </div>

            {geoError && (
              <p className="mt-2 inline-flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 shadow-sm dark:bg-rose-500/15 dark:text-rose-200">
                <FiAlertCircle size={13} /> {geoError}
              </p>
            )}
          </div>

          <MapCanvas
            sources={visibleSources}
            center={center}
            zoom={DEFAULT_ZOOM}
            selectedId={selected?.id}
            onSelect={setSelected}
            onPick={handlePick}
            fitToSources={fitToSources}
          >
            {pickedPoint && <Marker position={pickedPoint} icon={PICK_ICON} />}
          </MapCanvas>

          <p className="pointer-events-none absolute bottom-2 left-3 z-10 text-[10px] text-ink-500">
            Click the map to pick a point · markers show documented sources
          </p>
        </div>
      </div>

      <SourceDetailsModal
        source={selected}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        onEdit={openEdit}
        canManage={canManageSources}
      />

      {formOpen && (
        <SourceFormModal
          open
          source={editing}
          onClose={() => setFormOpen(false)}
          onSaved={reload}
        />
      )}
    </>
  );
}
