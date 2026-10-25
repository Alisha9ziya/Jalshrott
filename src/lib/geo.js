export const DEFAULT_CENTER = [30.1635, 78.7555]; // Pauri Garhwal, Uttarakhand
export const DEFAULT_ZOOM = 11;
export const REGION_ZOOM = 11;

export const haversineKm = (a, b) => {
  const toRad = (degrees) => (degrees * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
};

export const averageCenter = (points) => {
  const valid = points.filter(
    (point) => Number.isFinite(point[0]) && Number.isFinite(point[1])
  );
  if (!valid.length) return DEFAULT_CENTER;
  const sum = valid.reduce((acc, point) => [acc[0] + point[0], acc[1] + point[1]], [0, 0]);
  return [sum[0] / valid.length, sum[1] / valid.length];
};

export async function geocode(query) {
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('limit', '5');
  url.searchParams.set('addressdetails', '1');
  url.searchParams.set('q', query);

  const response = await fetch(url, {
    headers: { 'Accept-Language': 'en' },
  });

  if (!response.ok) {
    throw new Error('Location search is unavailable right now. Please try again.');
  }

  const results = await response.json();
  return results.map((result) => ({
    label: result.display_name,
    lat: Number(result.lat),
    lon: Number(result.lon),
    type: result.type,
  }));
}

export const boundsOf = (points) => {
  const valid = points.filter(
    (point) => Number.isFinite(point[0]) && Number.isFinite(point[1])
  );
  if (!valid.length) return null;
  const lats = valid.map((point) => point[0]);
  const lngs = valid.map((point) => point[1]);
  return [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ];
};
