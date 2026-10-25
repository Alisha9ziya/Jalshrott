import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import AuthModal from '../components/auth/AuthModal';

const AuthDialogContext = createContext(null);

export function AuthDialogProvider({ children }) {
  const [state, setState] = useState({ open: false, mode: 'login' });

  const openAuth = useCallback((mode = 'login') => {
    setState({ open: true, mode });
  }, []);

  const closeAuth = useCallback(() => {
    setState((current) => ({ ...current, open: false }));
  }, []);

  const switchMode = useCallback((mode) => {
    setState((current) => ({ ...current, mode }));
  }, []);

  const value = useMemo(
    () => ({ openAuth, closeAuth, mode: state.mode, isOpen: state.open }),
    [openAuth, closeAuth, state.mode, state.open]
  );

  return (
    <AuthDialogContext.Provider value={value}>
      {children}
      <AuthModal
        key={`${state.mode}-${state.open}`}
        open={state.open}
        mode={state.mode}
        onClose={closeAuth}
        onSwitchMode={switchMode}
      />
    </AuthDialogContext.Provider>
  );
}

export const useAuthDialog = () => {
  const context = useContext(AuthDialogContext);
  if (!context) throw new Error('useAuthDialog must be used inside AuthDialogProvider');
  return context;
};
