import { Link } from 'react-router-dom';
import { FiMail, FiMapPin, FiExternalLink } from 'react-icons/fi';
import Logo from '../brand/Logo';
import { NAV_LINKS, SITE } from '../../constants';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Logo size={30} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500 dark:text-ink-400">
            {SITE.tagline} A {SITE.project} documenting Himalayan water resources
            for resilient communities.
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm text-ink-500 dark:text-ink-400">
            <FiMapPin className="mt-0.5 shrink-0" size={15} />
            {SITE.institution}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-ink-400">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm font-medium text-ink-600 transition hover:text-brand-700 dark:text-ink-300 dark:hover:text-brand-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-ink-400">Support</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-600 dark:text-ink-300">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 transition hover:text-brand-700 dark:hover:text-brand-300"
              >
                <FiMail size={14} /> {SITE.email}
              </a>
            </li>
            <li>
              <a
                href="https://www.openstreetmap.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-brand-700 dark:hover:text-brand-300"
              >
                <FiExternalLink size={14} /> Map data by OpenStreetMap
              </a>
            </li>
            <li>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 transition hover:text-brand-700 dark:hover:text-brand-300"
              >
                Report incorrect data
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-100 dark:border-ink-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-ink-400 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Built for research and community water stewardship.</p>
        </div>
      </div>
    </footer>
  );
}
