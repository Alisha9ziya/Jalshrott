import { QUALITY_FIELDS, sourceTypeMeta } from '../constants';

const toNumberOrNull = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

export const normalizeSource = (source = {}) => {
  const coordinates = source.location?.coordinates || [];
  const longitude = source.longitude ?? coordinates[0];
  const latitude = source.latitude ?? coordinates[1];

  return {
    ...source,
    id: source.id || source._id,
    latitude: Number.isFinite(Number(latitude)) ? Number(latitude) : null,
    longitude: Number.isFinite(Number(longitude)) ? Number(longitude) : null,
    quality: source.quality || {},
    village: source.village || '',
    district: source.district || '',
    state: source.state || '',
    condition: source.condition || 'good',
    sourceType: source.sourceType || 'spring',
    deviceId: source.deviceId || '',
    area: toNumberOrNull(source.area),
    latestHeight: toNumberOrNull(source.latestHeight),
    volume: toNumberOrNull(source.volume),
    lastReadingAt: source.lastReadingAt || null,
  };
};

export const hasCoordinates = (source) =>
  Number.isFinite(source?.latitude) && Number.isFinite(source?.longitude);

export const qualityMetrics = (source) =>
  QUALITY_FIELDS.map((field) => ({
    key: field.key,
    label: field.label,
    unit: field.unit,
    value:
      field.key === 'ph'
        ? source?.ph ?? null
        : source?.quality?.[field.key] ?? null,
  }));

export const formatNumber = (value, digits = 2) => {
  if (value === null || value === undefined || value === '') return '—';
  const number = Number(value);
  if (!Number.isFinite(number)) return '—';
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: digits,
  }).format(number);
};

export const formatVolume = (value) => {
  const number = toNumberOrNull(value);
  if (number === null) return '—';
  return `${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(number)} m³`;
};

export const formatCoord = (value) => {
  if (value === null || value === undefined || value === '') return '—';
  return Number(value).toFixed(5);
};

export const formatDate = (value) => {
  if (!value) return 'Not recorded';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not recorded';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const sourceLocationLabel = (source) =>
  [source.village, source.district, source.state].filter(Boolean).join(', ') || 'Location not recorded';

export const toFormValues = (source) => ({
  name: source.name || '',
  sourceType: source.sourceType || 'spring',
  latitude: source.latitude ?? '',
  longitude: source.longitude ?? '',
  village: source.village || '',
  district: source.district || '',
  state: source.state || '',
  duration: source.duration || '',
  condition: source.condition || 'good',
  isPotable: Boolean(source.isPotable),
  seasonal: Boolean(source.seasonal),
  verified: Boolean(source.verified),
  usersPerDay: source.usersPerDay ?? '',
  distanceFromVillage: source.distanceFromVillage ?? '',
  area: source.area ?? '',
  deviceId: source.deviceId || '',
  notes: source.notes || '',
  ph: source.ph ?? '',
  tds: source.quality?.tds ?? '',
  electricalConductivity: source.quality?.electricalConductivity ?? '',
  turbidity: source.quality?.turbidity ?? '',
  totalAlkalinity: source.quality?.totalAlkalinity ?? '',
  totalAcidity: source.quality?.totalAcidity ?? '',
  totalHardness: source.quality?.totalHardness ?? '',
  chlorides: source.quality?.chlorides ?? '',
});

export const toApiPayload = (values) => {
  const numberOrUndefined = (value) =>
    value === '' || value === null || value === undefined ? undefined : Number(value);

  return {
    name: values.name.trim(),
    sourceType: values.sourceType,
    latitude: numberOrUndefined(values.latitude),
    longitude: numberOrUndefined(values.longitude),
    village: values.village.trim(),
    district: values.district.trim(),
    state: values.state.trim(),
    duration: values.duration.trim(),
    condition: values.condition,
    isPotable: Boolean(values.isPotable),
    seasonal: Boolean(values.seasonal),
    verified: Boolean(values.verified),
    usersPerDay: numberOrUndefined(values.usersPerDay),
    distanceFromVillage: numberOrUndefined(values.distanceFromVillage),
    area: numberOrUndefined(values.area),
    deviceId: String(values.deviceId || '').trim(),
    notes: values.notes.trim(),
    ph: numberOrUndefined(values.ph),
    quality: {
      tds: numberOrUndefined(values.tds),
      electricalConductivity: numberOrUndefined(values.electricalConductivity),
      turbidity: numberOrUndefined(values.turbidity),
      totalAlkalinity: numberOrUndefined(values.totalAlkalinity),
      totalAcidity: numberOrUndefined(values.totalAcidity),
      totalHardness: numberOrUndefined(values.totalHardness),
      chlorides: numberOrUndefined(values.chlorides),
    },
  };
};

export const searchSources = (sources, term) => {
  const query = term.trim().toLowerCase();
  if (!query) return sources;
  return sources.filter((source) =>
    [
      source.name,
      source.village,
      source.district,
      source.state,
      source.duration,
      sourceTypeMeta(source.sourceType).label,
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query))
  );
};

export const filterSources = (sources, filters) =>
  sources.filter((source) => {
    if (filters.state && source.state !== filters.state) return false;
    if (filters.district && source.district !== filters.district) return false;
    if (filters.type && source.sourceType !== filters.type) return false;
    if (filters.condition && source.condition !== filters.condition) return false;
    if (filters.potableOnly && !source.isPotable) return false;
    return true;
  });

export const uniqueValues = (sources, key) =>
  [...new Set(sources.map((source) => source[key]).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );
