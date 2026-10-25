import { request } from './client';

const query = (params = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, value);
    }
  });
  const string = search.toString();
  return string ? `?${string}` : '';
};

export const listSources = (params, signal) =>
  request(`/water-sources${query(params)}`, { signal });

export const getSource = (id) => request(`/water-sources/${id}`);

export const getSourceStats = (signal) =>
  request('/water-sources/stats/summary', { signal });

export const createSource = (token, payload) =>
  request('/water-sources', { method: 'POST', token, body: payload });

export const updateSource = (token, id, payload) =>
  request(`/water-sources/${id}`, { method: 'PATCH', token, body: payload });

export const deleteSource = (token, id) =>
  request(`/water-sources/${id}`, { method: 'DELETE', token });
