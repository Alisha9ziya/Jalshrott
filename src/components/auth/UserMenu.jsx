import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiGrid, FiLogOut, FiShield, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function UserMenu() {
  const { user, logout, isGovernment, canManageSources } = useAuth();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  if (!user) return null;

  const handle = (user.email || 'user').split('@')[0];
  const initial = handle.charAt(0).toUpperCase() || 'U';

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 rounded-full border border-ink-200 bg-white py-1 pl-1 pr-2.5 text-sm font-semibold text-ink-700 transition hover:border-brand-300 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">
          {initial}
        </span>
        <span className="hidden max-w-24 truncate sm:block">{handle}</span>
        <FiChevronDown size={14} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-ink-200 bg-white shadow-lift animate-slide-up dark:border-ink-700 dark:bg-ink-900"
        >
          <div className="border-b border-ink-100 px-4 py-3 dark:border-ink-800">
            <p className="truncate text-sm font-semibold text-ink-800 dark:text-white">{user.email}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-500 dark:text-ink-400">
              {isGovernment ? <FiShield size={12} /> : <FiUser size={12} />}
              {isGovernment
                ? 'Government administrator'
                : canManageSources
                  ? 'Source manager'
                  : 'Public member'}
            </p>
            {(user.district || user.state) && (
              <p className="mt-0.5 text-xs text-ink-400">
                {[user.district, user.state].filter(Boolean).join(', ')}
              </p>
            )}
          </div>

          {canManageSources && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-ink-700 transition hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800"
              role="menuitem"
            >
              <FiGrid size={15} /> Admin dashboard
            </Link>
          )}

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
            role="menuitem"
          >
            <FiLogOut size={15} /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}
