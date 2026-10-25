import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMap } from 'react-icons/fi';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-6xl font-bold text-brand-600 dark:text-brand-300">404</p>
      <h1 className="mt-3 text-2xl font-bold text-ink-900 dark:text-white">This page could not be found</h1>
      <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
        The page you are looking for may have moved, or the link might be incorrect.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link
          to="/"
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          <FiArrowLeft size={14} /> Back home
        </Link>
        <Link
          to="/map"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 transition hover:border-brand-300 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
        >
          <FiMap size={14} /> Open map
        </Link>
      </div>
    </div>
  );
}
