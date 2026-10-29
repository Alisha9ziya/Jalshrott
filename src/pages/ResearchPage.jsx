import { FiBookOpen, FiExternalLink, FiMail, FiMapPin, FiUsers } from 'react-icons/fi';
import PageHeader from '../components/layout/PageHeader';
import { SITE } from '../constants';
import vkBanga from '../assets/team/vk-banga.jpg';
import mamtaBaunthiyal from '../assets/team/mamta-baunthiyal.jpg';
import pushkarPraveen from '../assets/team/pushkar-praveen.jpg';
import agyaRamVerma from '../assets/team/agya-ram-verma.jpg';
import papendraKumar from '../assets/team/papendra-kumar.jpg';

const INSTITUTE = 'G.B. Pant Institute of Engineering & Technology, Uttarakhand';
const DIRECTORATE =
  'Govind Ballabh Pant Institute Of Engineering and Technology, Pauri Uttarakhand';

const LEADERSHIP = [
  {
    name: 'Prof. (Dr.) V. K. Banga',
    role: 'Director',
    institute: DIRECTORATE,
    photo: vkBanga,
  },
  {
    name: 'Dr. Mamta Baunthiyal',
    role: 'Dean Research & Development',
    institute: DIRECTORATE,
    photo: mamtaBaunthiyal,
  },
];

const INVESTIGATORS = [
  {
    name: 'Dr. Pushkar Praveen',
    badge: 'Principal Investigator',
    title: 'Assistant Professor',
    department: 'Department of Electronics & Communication Engineering',
    photo: pushkarPraveen,
  },
  {
    name: 'Dr. Agya Ram Verma',
    badge: 'Co-Principal Investigator',
    title: 'Assistant Professor',
    department: 'Department of Electronics & Communication Engineering',
    photo: agyaRamVerma,
  },
  {
    name: 'Dr. Papendra Kumar',
    badge: 'Co-Principal Investigator',
    title: 'Assistant Professor',
    department: 'Department of Computer Science & Engineering',
    photo: papendraKumar,
  },
];

// Photos for the project implementation team will be added here later.
const IMPLEMENTATION = [
  { name: 'Abhishek Pokhriyal', initials: 'AP' },
  { name: 'Alisha Ziya Kavish', initials: 'AZ' },
  { name: 'Meet Chauhan', initials: 'MC' },
];

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research Team"
        title="People Behind the Project"
        description="An interdisciplinary faculty and student research team from G.B. Pant Institute of Engineering & Technology, Pauri Garhwal."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Section 1: Institute Leadership */}
        <section>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Institutional Governance
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl dark:text-white">
              Institute Leadership
            </h2>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {LEADERSHIP.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-5 rounded-2xl border border-ink-200/90 bg-white p-5 sm:p-6 shadow-xs transition hover:border-brand-300 hover:shadow-soft dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/40"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-brand-50 shadow-xs dark:ring-brand-500/20"
                />
                <div className="min-w-0">
                  <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-brand-700 ring-1 ring-inset ring-brand-200/70 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30">
                    {member.role}
                  </span>
                  <h3 className="mt-1.5 font-display text-base font-bold text-ink-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500 dark:text-ink-400">
                    {member.institute}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Principal Investigators */}
        <section className="mt-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Scientific Leadership
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl dark:text-white">
              Principal Investigators &amp; Project Leadership
            </h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INVESTIGATORS.map((member) => (
              <div
                key={member.name}
                className="flex flex-col justify-between rounded-2xl border border-ink-200/90 bg-white p-6 text-center shadow-xs transition hover:border-brand-300 hover:shadow-soft dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/40"
              >
                <div>
                  <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700 ring-1 ring-inset ring-brand-200 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30">
                    {member.badge}
                  </span>
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                    className="mx-auto mt-4 h-28 w-28 rounded-full object-cover ring-4 ring-brand-50 shadow-soft dark:ring-brand-500/20"
                  />
                  <h3 className="mt-4 font-display text-base font-bold text-ink-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
                    {member.title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-600 dark:text-ink-300">
                    {member.department}
                  </p>
                </div>
                <div className="mt-4 border-t border-ink-100 pt-3 dark:border-ink-800">
                  <p className="text-[11px] font-medium text-ink-400 dark:text-ink-500">{INSTITUTE}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Project Implementation Team */}
        <section className="mt-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Technical &amp; Field Execution
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl dark:text-white">
              Project Implementation Team
            </h2>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {IMPLEMENTATION.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-4 rounded-2xl border border-ink-200/90 bg-white p-5 shadow-xs transition hover:border-brand-300 hover:shadow-soft dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/40"
              >
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100/90 font-display text-base font-bold text-brand-700 ring-1 ring-inset ring-brand-200/80 shadow-2xs dark:from-brand-500/15 dark:to-brand-500/5 dark:text-brand-300 dark:ring-brand-500/30">
                  {member.initials}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-bold text-ink-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500 dark:text-ink-400">
                    Project Research &amp; Implementation
                  </p>
                  <p className="mt-0.5 text-[11px] text-ink-400 dark:text-ink-500">{INSTITUTE}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Outputs, Collaboration, Institution */}
        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col justify-between rounded-2xl border border-ink-200/90 bg-white p-6 shadow-xs dark:border-ink-800 dark:bg-ink-900">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                <FiBookOpen size={14} /> Project Deliverables
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-ink-900 dark:text-white">
                Expected Outputs
              </h3>
              <ul className="mt-3 space-y-2.5 text-xs sm:text-sm text-ink-600 dark:text-ink-300">
                {[
                  'Open water source database for Uttarakhand',
                  'Seasonal water quality monitoring reports',
                  'Community training on source protection',
                  'Policy briefs for local administration',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-ink-200/90 bg-white p-6 shadow-xs dark:border-ink-800 dark:bg-ink-900">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                <FiUsers size={14} /> Community &amp; Partners
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-ink-900 dark:text-white">
                Field Collaboration
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                The project works with village water committees, district administration, and student
                volunteers. If you would like to collaborate or share field data, reach out directly.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-ink-100 dark:border-ink-800">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                <FiMail size={13} /> {SITE.email}
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-ink-200/90 bg-white p-6 shadow-xs dark:border-ink-800 dark:bg-ink-900">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-500/15 dark:text-purple-300">
                <FiMapPin size={14} /> Academic Base
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-ink-900 dark:text-white">
                Host Institution
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                {SITE.institution}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-ink-100 dark:border-ink-800">
              <a
                href="https://www.openstreetmap.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                OpenStreetMap GIS Data <FiExternalLink size={12} />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
