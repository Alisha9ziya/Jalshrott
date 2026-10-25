import { request } from './client';

export const loginRequest = (email, password) =>
  request('/auth/login', { method: 'POST', body: { email, password } });

export const registerRequest = (email, password) =>
  request('/auth/register', { method: 'POST', body: { email, password } });

export const meRequest = (token) => request('/auth/me', { token });

export const updateRegionRequest = (token, { state, district }) =>
  request('/auth/region', { method: 'PATCH', token, body: { state, district } });

export const listUsersRequest = (token) => request('/auth/users', { token });

export const setSourcePermissionRequest = (token, userId, canManageSources) =>
  request(`/auth/users/${userId}/source-permission`, {
    method: 'PATCH',
    token,
    body: { canManageSources },
  });
