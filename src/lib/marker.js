import L from 'leaflet';

const DROP_PATH =
  '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.3 4.6 6.2 7.8 6.2 11.2a6.2 6.2 0 1 1-12.4 0c0-3.4 2.9-6.6 6.2-11.2Z"/></svg>';

export const createSourceIcon = ({ color = '#2563eb', active = false } = {}) =>
  L.divIcon({
    className: 'jalsrot-marker',
    html: `<div class="marker-pin" style="background:${color};transform:rotate(-45deg) scale(${
      active ? 1.22 : 1
    });${active ? 'box-shadow:0 0 0 4px rgb(255 255 255 / 0.55), 0 6px 16px rgb(10 30 50 / 0.45);' : ''}"><span>${DROP_PATH}</span></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 26],
    popupAnchor: [0, -22],
  });

export const createPickedIcon = () =>
  L.divIcon({
    className: 'jalsrot-marker',
    html: '<div style="width:18px;height:18px;border-radius:9999px;background:#f97316;border:3px solid #fff;box-shadow:0 0 0 6px rgb(249 115 22 / 0.22),0 4px 10px rgb(10 30 50 / 0.4)"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
