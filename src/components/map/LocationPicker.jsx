import { useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { FiCrosshair } from 'react-icons/fi';
import { createPickedIcon } from '../../lib/marker';
import { DEFAULT_CENTER } from '../../lib/geo';

const PICK_ICON = createPickedIcon();

function PickerEvents({ onPick }) {
  useMapEvents({
    click(event) {
      onPick(event.latlng.lat, event.latlng.lng);
    },
  });
  return null;
}

function SyncView({ position }) {
  const map = useMap();
  const key = position ? position.join(',') : '';

  useEffect(() => {
    if (!position) return;
    map.setView(position, Math.max(map.getZoom(), 12), { animate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, map]);

  return null;
}

export default function LocationPicker({ latitude, longitude, onChange, onLocate, locating }) {
  const hasValue = Number.isFinite(Number(latitude)) && Number.isFinite(Number(longitude));
  const position = hasValue ? [Number(latitude), Number(longitude)] : null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-ink-200 dark:border-ink-700">
      <div className="h-56 w-full">
        <MapContainer
          center={position || DEFAULT_CENTER}
          zoom={position ? 14 : 11}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <PickerEvents
            onPick={(lat, lng) => onChange(Number(lat.toFixed(6)), Number(lng.toFixed(6)))}
          />
          <SyncView position={position} />
          {position && (
            <Marker
              position={position}
              icon={PICK_ICON}
              draggable
              eventHandlers={{
                dragend: (event) => {
                  const { lat, lng } = event.target.getLatLng();
                  onChange(Number(lat.toFixed(6)), Number(lng.toFixed(6)));
                },
              }}
            />
          )}
        </MapContainer>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-ink-950/60 to-transparent px-3 pb-2.5 pt-8">
        <p className="pointer-events-auto rounded-md bg-white/90 px-2 py-1 text-[11px] font-medium text-ink-600 shadow-sm">
          {hasValue
            ? `${Number(latitude).toFixed(5)}, ${Number(longitude).toFixed(5)}`
            : 'Click on the map to drop a pin'}
        </p>
        {onLocate && (
          <button
            type="button"
            onClick={onLocate}
            disabled={locating}
            className="pointer-events-auto inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1.5 text-[11px] font-semibold text-brand-700 shadow-sm transition hover:bg-white disabled:opacity-60"
          >
            <FiCrosshair size={12} />
            {locating ? 'Locating…' : 'Use my location'}
          </button>
        )}
      </div>
    </div>
  );
}
