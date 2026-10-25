import { FiBookOpen, FiExternalLink, FiMail, FiMapPin, FiUsers } from 'react-icons/fi';
import PageHeader from '../components/layout/PageHeader';
import { SITE, TEAM } from '../constants';

const FOCUS = [
  {
    title: 'Hydrology & spring recharge',
    text: 'Understanding how forest cover, slope and rainfall translate into spring discharge across the watershed.',
  },
  {
    title: 'Water quality & public health',
    text: 'Tracking physical and chemical parameters to flag sources that need treatment or protection.',
  },
  {
    title: 'Community water governance',
    text: 'Working with village institutions on maintenance, ownership and equitable access.',
  },
  {
    title: 'Open geospatial data',
    text: 'Publishing source locations and attributes through open standards and OpenStreetMap.',
  },
];

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research team"
        title="People behind the registry"
        description="A interdisciplinary team from G.B. Pant Institute of Engineering & Technology, Pauri Garhwal."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div
              key={`${member.role}-${member.name}`}
              className="rounded-xl border border-ink-200 bg-white p-5 text-center dark:border-ink-800 dark:bg-ink-900"
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-600/10 font-display text-lg font-bold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                {member.initials}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-ink-900 dark:text-white">{member.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
                {member.role}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-ink-500 dark:text-ink-400">{member.focus}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <section>
            <h2 className="text-xl font-bold text-ink-900 dark:text-white">Research focus areas</h2>
            <div className="mt-4 space-y-3">
              {FOCUS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-900"
                >
                  <h3 className="text-sm font-semibold text-ink-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="rounded-xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
                <FiBookOpen size={15} className="text-brand-600" /> Outputs
              </h2>
              <ul className="mt-3 space-y-2.5 text-sm text-ink-600 dark:text-ink-300">
                {[
                  'Open water source registry for Uttarakhand',
                  'Seasonal water quality monitoring reports',
                  'Community training on source protection',
                  'Policy briefs for local administration',
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
                <FiUsers size={15} className="text-brand-600" /> Collaboration
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                The project works with village water committees, district administration and student
                volunteers. If you would like to collaborate, we would like to hear from you.
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline dark:text-brand-300"
              >
                <FiMail size={14} /> {SITE.email}
              </a>
            </div>

            <div className="rounded-xl border border-ink-200 bg-white p-5 dark:border-ink-800 dark:bg-ink-900">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
                <FiMapPin size={15} className="text-brand-600" /> Institution
              </h2>
              <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{SITE.institution}</p>
              <a
                href="https://www.openstreetmap.org/"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:underline dark:text-brand-300"
              >
                Mapping data <FiExternalLink size={12} />
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
