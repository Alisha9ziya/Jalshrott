import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import Logo from '../brand/Logo';
import Button from '../ui/Button';
import UserMenu from '../auth/UserMenu';
import { NAV_LINKS } from '../../constants';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useAuthDialog } from '../../context/AuthDialogContext';

const linkClasses = ({ isActive }) =>
  `relative rounded-md px-2.5 py-2 text-[13px] font-semibold transition ${
    isActive
      ? 'text-brand-700 dark:text-brand-300'
      : 'text-ink-600 hover:text-brand-700 dark:text-ink-300 dark:hover:text-white'
  }`;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, initializing } = useAuth();
  const { openAuth } = useAuthDialog();

  return (
    <header className="sticky top-0 z-[900] border-b border-ink-200/80 bg-white/95 backdrop-blur-md dark:border-ink-800 dark:bg-ink-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0" aria-label="JalSrot home">
          <Logo size={32} />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses} end={link.to === '/'}>
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-2.5 -bottom-1 h-0.5 rounded-full bg-brand-600 dark:bg-brand-300" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-full border border-ink-200 text-ink-600 transition hover:border-brand-300 hover:text-brand-700 dark:border-ink-700 dark:text-ink-300 dark:hover:text-white"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          {!initializing &&
            (isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button size="sm" className="px-4" onClick={() => openAuth('login')}>
                Sign In
              </Button>
            ))}

          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg border border-ink-200 text-ink-600 lg:hidden dark:border-ink-700 dark:text-ink-300"
            onClick={() => setMobileOpen((current) => !current)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink-200 bg-white px-4 pb-4 pt-2 lg:hidden dark:border-ink-800 dark:bg-ink-950">
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200'
                      : 'text-ink-600 hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
