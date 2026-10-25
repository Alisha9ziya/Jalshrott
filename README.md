# JalSrot — Web App

Frontend for the JalSrot water resource registry. Built with **React 19 + Vite**, **Tailwind CSS v4**, **React Router**, **OpenStreetMap (Leaflet)** and **react-icons**.

The app has two experiences:

- **Public view** — browse the water source registry, filter and search, inspect full water quality details, and explore sources on an OpenStreetMap map.
- **Admin view** — government users / authorised source managers can add, edit and delete sources, manage user permissions, set their region, and add photos or videos to the gallery.
- **Live storage volume** — each source can have a storage area (m²) and a linked sensor device. Hardware pushes water-height readings to the backend, and the dashboard shows the resulting **Volume** (m³).

## Quick start

```bash
npm install
cp .env.example .env    # point VITE_API_URL at the backend
npm run dev
```

The dev server runs on <http://localhost:5173> by default.

```bash
npm run build     # production build → dist/
npm run preview   # preview the production build
npm run lint
```

## Backend

The API lives in `../../global_backend`. Start it first:

```bash
cd ../../global_backend
npm install
npm run dev        # http://localhost:5000
```

Optional demo data (10 sources in Pauri Garhwal):

```bash
npm run seed            # only if the registry is empty
npm run seed -- --reset # replace existing sources
```

## Environment

| Variable       | Default                     | Description                    |
| -------------- | --------------------------- | ------------------------------ |
| `VITE_API_URL` | `http://localhost:5000/api` | Base URL of the backend API.   |

## Routes

| Route       | Page              | Access            |
| ----------- | ----------------- | ----------------- |
| `/`         | Home              | Public            |
| `/about`    | About the project | Public            |
| `/sources`  | Water source list | Public            |
| `/map`      | Map view          | Public            |
| `/research` | Research team     | Public            |
| `/gallery`  | Gallery           | Public            |
| `/contact`  | Contact & support | Public            |
| `/admin`    | Admin dashboard   | Source managers   |

## Project structure

```
src/
├── api/            # fetch client + auth/source endpoints
├── components/
│   ├── auth/       # sign-in modal, user menu
│   ├── brand/      # logo
│   ├── gallery/    # add-media modal
│   ├── layout/     # navbar, footer, page header, layout
│   ├── map/        # Leaflet map canvas + location picker
│   ├── sources/    # table, filters, cards, detail + form modals
│   └── ui/         # buttons, fields, modal, badges, pagination…
├── constants/      # site copy, source types, quality fields, navigation
├── context/        # auth, theme, toasts, auth dialog
├── hooks/          # source/gallery fetching + debounce helpers
├── lib/            # normalisation, filtering, geo/media helpers
├── pages/          # route-level pages
├── App.jsx         # providers + routes
└── main.jsx        # entry point
```

## Data model (frontend)

Each source is normalised in `src/lib/source.js`:

```js
{
  id, name, sourceType, village, district, state,
  latitude, longitude, duration, condition,
  isPotable, seasonal, verified,
  ph, quality: { tds, electricalConductivity, turbidity,
                 totalAlkalinity, totalAcidity, totalHardness, chlorides },
  usersPerDay, distanceFromVillage, notes,
  area, deviceId, latestHeight, volume, lastReadingAt,
  lastTestedAt, lastMaintenanceAt, createdAt, updatedAt
}
```

## Storage volume & hardware readings

Administrators set two extra fields on a source:

| Field            | Unit | Meaning                                                        |
| ---------------- | ---- | -------------------------------------------------------------- |
| Storage area     | m²   | Cross-section/storage area configured by an admin.              |
| Sensor device ID | —    | Identifier the field hardware sends, e.g. `jalsrot-sensor-01`. |

When hardware posts a height reading, the backend computes:

```text
volume (m³) = area (m²) × height (m)
```

and stores the latest height/volume on the source plus a full reading history. Hardware authenticates with the shared `HARDWARE_API_KEY` from `global_backend/.env` (restart the backend after changing it):

```bash
curl -X POST http://localhost:5000/api/hardware/readings \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: YOUR_HARDWARE_API_KEY' \
  -d '{"deviceId":"jalsrot-sensor-01","height":75,"unit":"cm"}'
```

- Send either `deviceId` or `sourceId`.
- `unit` accepts `m` (default), `cm` or `mm`; the backend normalises to metres.
- `recordedAt` is optional (ISO timestamp).
- `GET /api/hardware/readings/:sourceId` (admin token) returns recent readings.

If a source has no area yet, readings are still recorded but `volume` stays empty until an admin sets the area — saving the area recalculates the volume immediately.

## Gallery

`/gallery` is public. Source managers see **Add media** and can add photos and videos by URL:

- Direct image links (any `http(s)` image URL).
- YouTube, Vimeo, or direct video links (`.mp4`, `.webm`, `.ogg`, `.mov`).
- An optional caption and thumbnail; YouTube covers are detected automatically.

Gallery records are stored by the backend (`/api/gallery`) and the page falls back to built-in sample photos while the database is empty.


## Roles

- **Government** — full admin access; can also toggle source-management permission for other users.
- **Source manager** — can add/edit/delete sources.
- **Public** — read-only access to the registry and map.

The **first registered account becomes a government administrator**. Additional government emails can be configured on the backend with `GOVERNMENT_EMAILS`.

## Map & geocoding

- Tiles: OpenStreetMap (`tile.openstreetmap.org`).
- Location search uses the public Nominatim geocoder. It is rate-limited — for high-traffic deployments, proxy geocoding through your backend or use a commercial provider.
