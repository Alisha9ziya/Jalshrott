import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getToken, setToken } from '../api/client';
import {
  loginRequest,
  meRequest,
  registerRequest,
  updateRegionRequest,
} from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      const stored = getToken();
      if (!stored) {
        setInitializing(false);
        return;
      }
      try {
        const data = await meRequest(stored);
        if (!active) return;
        setUser(data.user);
        setTokenState(stored);
      } catch {
        if (!active) return;
        setToken(null);
        setTokenState(null);
        setUser(null);
      } finally {
        if (active) setInitializing(false);
      }
    };

    bootstrap();
    return () => {
      active = false;
    };
  }, []);

  const applySession = useCallback((data) => {
    setToken(data.token);
    setTokenState(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const login = useCallback(
    async (email, password) => applySession(await loginRequest(email, password)),
    [applySession]
  );

  const register = useCallback(
    async (email, password) => applySession(await registerRequest(email, password)),
    [applySession]
  );

  const logout = useCallback(() => {
    setToken(null);
    setTokenState(null);
    setUser(null);
  }, []);

  const updateRegion = useCallback(
    async (region) => {
      const data = await updateRegionRequest(token, region);
      setUser(data.user);
      return data.user;
    },
    [token]
  );

  const canManageSources = Boolean(user?.role === 'government' || user?.canManageSources);

  const value = useMemo(
    () => ({
      user,
      token,
      initializing,
      isAuthenticated: Boolean(user),
      canManageSources,
      isGovernment: user?.role === 'government',
      login,
      register,
      logout,
      updateRegion,
    }),
    [user, token, initializing, canManageSources, login, register, logout, updateRegion]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
