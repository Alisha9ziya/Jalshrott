import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiDroplet,
  FiLayers,
  FiMap,
  FiShield,
} from 'react-icons/fi';
import { useSources } from '../hooks/useSources';
import { SITE, sourceTypeMeta } from '../constants';
import SourceCard from '../components/sources/SourceCard';
import { Spinner } from '../components/ui/Spinner';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=80';

function Stat({ value, label, loading }) {
  return (
    <div className="rounded-xl border border-ink-200 bg-white px-4 py-3.5 dark:border-ink-800 dark:bg-ink-900">
      <p className="font-display text-2xl font-bold text-brand-700 dark:text-brand-300">
        {loading ? <Spinner size={18} className="text-brand-500" /> : value}
      </p>
      <p className="mt-0.5 text-xs font-medium text-ink-500 dark:text-ink-400">{label}</p>
    </div>
  );
}

export default function HomePage() {
  const { sources, stats, loading, error } = useSources();
  const navigate = useNavigate();

  const districtCount =
    stats?.byDistrict ? Object.keys(stats.byDistrict).length : new Set(sources.map((s) => s.district).filter(Boolean)).size;
  const potable = stats?.potable ?? sources.filter((source) => source.isPotable).length;
  const typeCount = Object.keys(stats?.byType || {}).length || new Set(sources.map((s) => s.sourceType)).size;
  const latest = sources.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Himalayan mountain range with clouds"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-900/60 to-brand-800/25" />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
            <FiDroplet size={12} /> {SITE.project}
          </p>
          <h1 className="max-w-3xl text-balance text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.9rem]">
            Discover and Protect Our Water Sources
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            A living registry of springs, streams, ponds and community water sources across
            Uttarakhand — mapped, measured and maintained together.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/sources"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-brand-800 shadow-sm transition hover:bg-brand-50"
            >
              Explore water sources <FiArrowRight size={15} />
            </Link>
            <Link
              to="/map"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/40 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <FiMap size={15} /> Open map view
            </Link>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-ink-200 bg-white/95 p-3 shadow-soft backdrop-blur sm:grid-cols-4 dark:border-ink-800 dark:bg-ink-900/95">
          <Stat value={stats?.total ?? sources.length} label="Documented sources" loading={loading} />
          <Stat value={districtCount} label="Districts covered" loading={loading} />
          <Stat value={typeCount} label="Source types" loading={loading} />
          <Stat value={potable} label="Marked potable" loading={loading} />
        </div>
      </section>

      {/* Project intro */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700 ring-1 ring-inset ring-brand-200 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30">
            {SITE.project}
          </span>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.1em] text-ink-400">
            {SITE.subtitle}
          </p>
          <h2 className="mt-3 text-balance text-2xl font-bold leading-tight text-ink-900 sm:text-[2rem] dark:text-white">
            {SITE.title}
          </h2>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-ink-200 shadow-soft dark:border-ink-800">
            <img
              src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=80"
              alt="Water flowing through a forested Himalayan stream"
              className="h-72 w-full object-cover sm:h-96"
              loading="lazy"
            />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-ink-600 sm:text-[15px] dark:text-ink-300">
            <p>
              A research project focused on the sustainable management of water resources and the
              resilience of Himalayan communities and downstream areas in Uttarakhand.
            </p>
            <p>
              The project is being carried out at {SITE.institution}, with a focus on understanding,
              documenting and supporting water resources in the region. Field teams record source
              locations, seasonal behaviour and water quality so that communities and administrators
              can plan with reliable data.
            </p>
            <ul className="grid gap-2.5 pt-2 sm:grid-cols-2">
              {[
                'Open, map-based source registry',
                'Field-verified water quality data',
                'Community-led monitoring',
                'Evidence for policy planning',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-medium text-ink-700 dark:text-ink-200">
                  <FiCheckCircle size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline dark:text-brand-300"
            >
              Learn more about the project <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="border-y border-ink-200 bg-white py-16 dark:border-ink-800 dark:bg-ink-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-ink-900 dark:text-white">Everything in one place</h2>
              <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">
                Browse the registry, inspect water quality, or explore sources on the map.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: FiLayers,
                title: 'Complete registry',
                text: 'Every documented source with coordinates, village, duration and full water quality results.',
                to: '/sources',
                cta: 'Browse sources',
              },
              {
                icon: FiMap,
                title: 'Interactive map',
                text: 'Explore sources on OpenStreetMap, filter by region and search any location in the Himalayas.',
                to: '/map',
                cta: 'Open the map',
              },
              {
                icon: FiShield,
                title: 'Managed data',
                text: 'Authorised administrators keep records current, verifying quality tests and maintenance history.',
                to: '/contact',
                cta: 'Request access',
              },
            ].map((feature) => (
              <Link
                key={feature.title}
                to={feature.to}
                className="group rounded-xl border border-ink-200 bg-ink-50/50 p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft dark:border-ink-800 dark:bg-ink-900/60 dark:hover:border-brand-500/40"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-600/10 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                  <feature.icon size={19} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink-900 dark:text-white">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{feature.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 group-hover:gap-1.5 dark:text-brand-300">
                  {feature.cta} <FiArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest sources */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white">Recently documented</h2>
            <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">
              The latest entries added to the water source registry.
            </p>
          </div>
          <Link
            to="/sources"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            View all <FiArrowRight size={14} />
          </Link>
        </div>

        {error ? (
          <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
            {error}
          </p>
        ) : loading ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-44 animate-pulse rounded-xl border border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900" />
            ))}
          </div>
        ) : latest.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((source) => (
              <SourceCard key={source.id} source={source} onView={() => navigate('/sources')} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-ink-300 px-6 py-12 text-center dark:border-ink-700">
            <FiBookOpen size={22} className="mx-auto text-ink-400" />
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
              No sources documented yet. Sign in as an administrator to add the first one.
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-brand-800 px-6 py-10 sm:px-10">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold text-white">Know a water source we missed?</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-100">
                Help us keep the registry accurate. Report a new spring, a dried stream, or a change
                in water quality in your area.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
            >
              Contact the team <FiArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {Object.entries(stats?.byType || {}).map(([type, count]) => {
            const meta = sourceTypeMeta(type);
            return (
              <Link
                key={type}
                to={`/sources?type=${type}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-600 transition hover:border-brand-300 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300"
              >
                <span className="h-2 w-2 rounded-full" style={{ background: meta.color }} />
                {meta.label}
                <span className="text-ink-400">{count}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
