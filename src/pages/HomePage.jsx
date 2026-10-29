import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiDroplet, FiMap } from 'react-icons/fi';
import { FaMountain, FaSeedling, FaWater } from 'react-icons/fa';
import { useSources } from '../hooks/useSources';
import { SITE, sourceTypeMeta } from '../constants';
import heroImage from '../assets/hero-waterfall.jpg';

const FOCUS = [
  {
    icon: FiDroplet,
    title: 'Smart Water Resource Management',
    text: 'Exploring approaches toward smarter management of water resources in the Himalayan context.',
    tint: 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300',
  },
  {
    icon: FaSeedling,
    title: 'Sustainable Water Resources',
    text: 'Promoting a long-term perspective on the sustainable management of water resources.',
    tint: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
  },
  {
    icon: FaMountain,
    title: 'Himalayan Communities',
    text: 'Recognizing the importance of sustainable water resources for communities in the Himalayan region.',
    tint: 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
  },
  {
    icon: FaWater,
    title: 'Downstream Resilience',
    text: 'Considering the broader importance of water-resource resilience for downstream regions.',
    tint: 'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300',
  },
];

export default function HomePage() {
  const { stats } = useSources();

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate min-h-[560px] sm:min-h-[600px] lg:min-h-[640px] flex items-center overflow-hidden bg-brand-950 text-white">
        {/* Full-bleed high-res background image */}
        <img
          src={heroImage}
          alt="Pristine Himalayan waterfall and water source in Uttarakhand"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] lg:object-[center_25%]"
          loading="eager"
        />

        {/* Directional gradient overlay: deep dark protection on the left for text, clear and vivid on the right */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/75 via-45% to-brand-950/25 sm:via-brand-950/70"
        />
        {/* Subtle vertical gradients for top navigation blend and bottom section transition */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-black/25"
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Pill */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-200 backdrop-blur-md shadow-xs">
              <FiDroplet size={13} className="text-brand-300" />
              {SITE.project}
            </span>

            {/* Headline */}
            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-4xl lg:text-5xl">
              Discover and Protect Our Water Sources
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 drop-shadow-xs sm:text-base">
              A living public database of springs, streams, ponds, and community water sources
              across Uttarakhand — mapped, measured, and maintained together.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/sources"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-brand-950 shadow-md transition hover:bg-brand-50"
              >
                Explore Water Sources <FiArrowRight size={15} />
              </Link>
              <Link
                to="/map"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/30 bg-black/35 px-5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-black/50"
              >
                <FiMap size={15} /> Open Map View
              </Link>
            </div>

            {/* Verified Features Pills */}
            <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/15 pt-6 text-xs font-medium text-white/85">
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="text-emerald-400" size={15} />
                <span>Field-Verified GPS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="text-emerald-400" size={15} />
                <span>8-Parameter Lab Testing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="text-emerald-400" size={15} />
                <span>Open Community Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-right photo tag badge */}
        <div className="pointer-events-none absolute bottom-5 right-6 hidden lg:flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md shadow-xs">
          <FiDroplet size={12} className="text-brand-300" />
          <span>Himalayan Water Source · Uttarakhand</span>
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

      {/* Our focus */}
      <section className="border-y border-ink-200 bg-white py-16 dark:border-ink-800 dark:bg-ink-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
              Our focus
            </span>
            <h2 className="mt-3 text-balance text-2xl font-bold leading-tight text-ink-900 sm:text-[2rem] dark:text-white">
              Working Towards Water Resilience
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
              Our project focuses on smart management, sustainability and resilience of Himalayan
              water resources.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FOCUS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900"
              >
                <span className={`grid h-10 w-10 place-items-center rounded-lg ${item.tint}`}>
                  <item.icon size={18} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink-900 dark:text-white">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover. Document. Protect. */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-brand-100 bg-brand-50 px-6 py-10 sm:px-10 dark:border-brand-500/30 dark:bg-brand-500/10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-brand-900 dark:text-white">
                Discover. Document. Protect.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-800/80 dark:text-brand-100/80">
                Help build awareness and support sustainable water resource management.
              </p>
            </div>
            <Link
              to="/sources"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-700 px-5 text-sm font-semibold text-white transition hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-500"
            >
              View Water Sources <FiArrowRight size={15} />
            </Link>
          </div>
        </div>
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
