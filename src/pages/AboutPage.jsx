import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiCompass, FiDroplet, FiGlobe, FiUsers } from 'react-icons/fi';
import PageHeader from '../components/layout/PageHeader';
import { SITE } from '../constants';

const OBJECTIVES = [
  {
    icon: FiCompass,
    title: 'Map every source',
    text: 'Create a verified, open registry of springs, streams, ponds and community water points across the study region.',
  },
  {
    icon: FiDroplet,
    title: 'Measure water quality',
    text: 'Record pH, dissolved solids, conductivity, hardness and more so changes in water quality are visible over time.',
  },
  {
    icon: FiUsers,
    title: 'Support communities',
    text: 'Give villages and local administrators simple tools to report issues and plan maintenance with confidence.',
  },
  {
    icon: FiGlobe,
    title: 'Inform resilience',
    text: 'Build the evidence base needed for climate-resilient water planning in the Himalayan watershed.',
  },
];

const STEPS = [
  {
    step: '01',
    title: 'Field survey',
    text: 'Teams visit each watershed and record the source location, access route and seasonal behaviour.',
  },
  {
    step: '02',
    title: 'Water testing',
    text: 'Samples are tested for physical and chemical parameters and uploaded with the source record.',
  },
  {
    step: '03',
    title: 'Verification',
    text: 'Records are reviewed by the research team and marked verified once checked against field notes.',
  },
  {
    step: '04',
    title: 'Open access',
    text: 'Data is published here and on the map so communities, students and planners can use it.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the project"
        title="Protecting Himalayan water, together"
        description={`${SITE.project} · ${SITE.institution}`}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-ink-900 dark:text-white">{SITE.title}</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              <p>
                Himalayan communities depend on springs and streams that are increasingly stressed by
                changing rainfall, land use and out-migration. The JalSrot project documents these
                sources before they disappear from institutional memory.
              </p>
              <p>
                Working with local partners in Uttarakhand, the team combines field surveys, water
                quality testing and open mapping to build a shared picture of water availability — and
                to identify the sources that most need protection.
              </p>
              <p>
                Every record in this registry includes coordinates, village-level context and, where
                available, measured water quality parameters. The data is designed to be useful to the
                communities who steward these sources, not only to researchers.
              </p>
            </div>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {[
                'UCOST funded research',
                'OpenStreetMap based mapping',
                'Field-verified records',
                'Community participation',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium text-ink-700 dark:text-ink-200">
                  <FiCheckCircle size={15} className="text-emerald-500" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-ink-200 shadow-soft dark:border-ink-800">
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
              alt="Himalayan lake and mountain landscape"
              className="h-[360px] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-ink-900 dark:text-white">What the project does</h2>
          <p className="mt-1.5 max-w-2xl text-sm text-ink-500 dark:text-ink-400">
            Four connected workstreams turn scattered field observations into usable public knowledge.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OBJECTIVES.map((objective) => (
              <div
                key={objective.title}
                className="rounded-xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                  <objective.icon size={18} />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-ink-900 dark:text-white">{objective.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                  {objective.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-ink-200 bg-white p-6 sm:p-8 dark:border-ink-800 dark:bg-ink-900">
          <h2 className="text-2xl font-bold text-ink-900 dark:text-white">How a source is documented</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((item) => (
              <div key={item.step} className="relative border-l-2 border-brand-100 pl-4 dark:border-brand-500/30">
                <span className="text-xs font-bold text-brand-600 dark:text-brand-300">{item.step}</span>
                <h3 className="mt-1 text-sm font-semibold text-ink-900 dark:text-white">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-brand-800 px-6 py-8 sm:px-10">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold text-white sm:text-2xl">Explore the living registry</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-100">
              Browse documented sources or open the map to see where they are located across the
              watershed.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/sources"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-brand-800"
            >
              Water sources <FiArrowRight size={14} />
            </Link>
            <Link
              to="/map"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/40 px-4 text-sm font-semibold text-white hover:bg-white/10"
            >
              Map view
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
