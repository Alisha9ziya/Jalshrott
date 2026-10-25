import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { createSourceIcon } from '../../lib/marker';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../../lib/geo';
import { sourceTypeMeta } from '../../constants';
import { sourceLocationLabel } from '../../lib/source';

function FitBounds({ points, enabled }) {
  const map = useMap();
  const key = points.map((point) => point.join(',')).join('|');

  useEffect(() => {
    if (!enabled || !points.length) return;
    if (points.length === 1) {
      map.setView(points[0], 14, { animate: true });
      return;
    }
    map.fitBounds(points, { paddingTopLeft: [48, 84], paddingBottomRight: [48, 48], maxZoom: 15 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, enabled, key]);

  return null;
}

function FlyTo({ target, disabled }) {
  const map = useMap();

  useEffect(() => {
    if (!target || disabled) return;
    map.flyTo(target, Math.max(map.getZoom(), 13), { duration: 0.8 });
  }, [map, target, disabled]);

  return null;
}

function ClickCapture({ onPick }) {
  useMapEvents({
    click(event) {
      onPick?.([event.latlng.lat, event.latlng.lng]);
    },
  });
  return null;
}

export default function MapCanvas({
  sources = [],
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  selectedId,
  onSelect,
  onPick,
  fitToSources = true,
  className = '',
  children,
}) {
  const points = sources
    .filter((source) => Number.isFinite(source.latitude) && Number.isFinite(source.longitude))
    .map((source) => [source.latitude, source.longitude]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom
      className={`h-full w-full ${className}`}
      worldCopyJump
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />

      <FitBounds points={points} enabled={fitToSources} />
      <FlyTo target={center} disabled={fitToSources} />
      {onPick && <ClickCapture onPick={onPick} />}

      {sources
        .filter((source) => Number.isFinite(source.latitude) && Number.isFinite(source.longitude))
        .map((source) => {
          const meta = sourceTypeMeta(source.sourceType);
          return (
            <Marker
              key={source.id}
              position={[source.latitude, source.longitude]}
              icon={createSourceIcon({ color: meta.color, active: source.id === selectedId })}
              eventHandlers={{ click: () => onSelect?.(source) }}
            >
              <Popup>
                <div className="min-w-44">
                  <p className="text-sm font-semibold text-ink-900">{source.name}</p>
                  <p className="mt-0.5 text-xs text-ink-500">{sourceLocationLabel(source)}</p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide" style={{ color: meta.color }}>
                    {meta.label}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}

      {children}
    </MapContainer>
  );
}
