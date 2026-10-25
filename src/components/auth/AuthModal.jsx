import { useState } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Input, Label } from '../ui/Field';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AuthModal({ open, mode, onClose, onSwitchMode }) {
  const { login, register } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isRegister = mode === 'register';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = isRegister ? await register(email, password) : await login(email, password);
      toast.success(isRegister ? 'Account created. Welcome to JalSrot!' : 'Signed in successfully.');
      if (user?.role === 'government') {
        toast.info('Administrator access enabled — you can manage water sources.');
      }
      onClose();
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isRegister ? 'Create an account' : 'Welcome back'}
      description={
        isRegister
          ? 'Register to keep the water source registry up to date.'
          : 'Sign in to add and manage water sources.'
      }
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="auth-email" required>
            Email
          </Label>
          <div className="relative">
            <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={15} />
            <Input
              id="auth-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="pl-9"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="auth-password" required hint={isRegister ? 'Min. 6 characters' : undefined}>
            Password
          </Label>
          <div className="relative">
            <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={15} />
            <Input
              id="auth-password"
              type="password"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="pl-9"
            />
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
            {error}
          </p>
        )}

        <div className="flex items-center justify-end gap-2 pt-1">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {isRegister ? 'Create account' : 'Sign in'}
          </Button>
        </div>

        <p className="pt-1 text-center text-sm text-ink-500 dark:text-ink-400">
          {isRegister ? 'Already registered?' : 'New here?'}{' '}
          <button
            type="button"
            className="font-semibold text-brand-600 hover:underline dark:text-brand-300"
            onClick={() => onSwitchMode(isRegister ? 'login' : 'register')}
          >
            {isRegister ? 'Sign in' : 'Create an account'}
          </button>
        </p>
      </form>
    </Modal>
  );
}
