import { request } from './client';

export const listGallery = (signal) => request('/gallery', { signal });

export const createGalleryItem = (token, payload) =>
  request('/gallery', { method: 'POST', token, body: payload });

export const updateGalleryItem = (token, id, payload) =>
  request(`/gallery/${id}`, { method: 'PATCH', token, body: payload });

export const deleteGalleryItem = (token, id) =>
  request(`/gallery/${id}`, { method: 'DELETE', token });
