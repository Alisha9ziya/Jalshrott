import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiCheckCircle,
  FiDroplet,
  FiMapPin,
  FiLayers,
  FiActivity,
  FiDatabase,
  FiShield,
  FiCompass,
  FiUsers,
} from 'react-icons/fi';
import { FaMountain, FaWater, FaUniversity } from 'react-icons/fa';
import { SITE } from '../constants';

const METADATA_PILLS = [
  { label: 'Funding Agency', value: 'UCOST, Govt. of Uttarakhand' },
  { label: 'Host Institution', value: 'G.B. Pant Institute of Engg. & Tech. (GBPIET)' },
  { label: 'Principal Investigator', value: 'Dr. Pushkar Praveen' },
  { label: 'Co-Principal Investigators', value: 'Dr. Agya Ram Verma & Dr. Papendra Kumar' },
];

const PILLARS = [
  {
    icon: FaMountain,
    badge: 'Local Water Security',
    title: 'Himalayan Communities',
    description:
      'Natural springs (dharas) and mountain streams provide more than 80% of rural water across Uttarakhand. Sustainable management secures drinking supply, protects mountain livelihoods, and strengthens village climate resilience.',
    accent: 'from-amber-500/10 to-transparent border-amber-200/80 text-amber-700 dark:border-amber-500/30 dark:text-amber-300',
    iconBg: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  },
  {
    icon: FaWater,
    badge: 'Basin Hydrology',
    title: 'Downstream Resilience',
    description:
      'Himalayan headwaters regulate the volume, baseflow, and seasonal water quality across the Indo-Gangetic and Yamuna river basins. Preserving mountain catchments protects downstream populations and river ecosystems.',
    accent: 'from-sky-500/10 to-transparent border-sky-200/80 text-sky-700 dark:border-sky-500/30 dark:text-sky-300',
    iconBg: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300',
  },
  {
    icon: FiActivity,
    badge: 'Smart & Sustainable Science',
    title: 'Data-Driven Management',
    description:
      'Combines in-situ field surveys, multi-parameter water chemistry testing (pH, TDS, EC, hardness), and open geospatial mapping to transition from ad-hoc responses to proactive, empirical water governance.',
    accent: 'from-emerald-500/10 to-transparent border-emerald-200/80 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  },
];

const OBJECTIVES = [
  {
    num: '01',
    title: 'Smart Approaches for Water Management',
    text: 'Explore, validate, and apply smart, technology-assisted methodologies tailored to the rugged topography and hydrological realities of Uttarakhand.',
  },
  {
    num: '02',
    title: 'Community Needs & Local Resilience',
    text: 'Address the immediate drinking water security and socio-ecological resilience of Himalayan villages vulnerable to spring drying and climate shifts.',
  },
  {
    num: '03',
    title: 'Open Geospatial & Chemical Inventory',
    text: 'Build a permanent, verifiable digital registry detailing exact coordinates, accessibility, elevation, and 8 physical-chemical water quality metrics.',
  },
  {
    num: '04',
    title: 'Downstream Basin Safeguards',
    text: 'Provide actionable empirical evidence for state policymakers, UCOST, and watershed planners to support upstream-downstream integrated basin governance.',
  },
];

const STEPS = [
  {
    step: '01',
    title: 'Field Survey & GPS Tagging',
    text: 'Research teams traverse remote watersheds, mapping precise GPS coordinates, photographic proof, catchment geography, and seasonal flow behavior.',
    icon: FiCompass,
  },
  {
    step: '02',
    title: 'Physicochemical Lab Testing',
    text: 'Samples undergo in-situ testing and lab assays across 8 key parameters: pH, TDS, Electrical Conductivity, Turbidity, Hardness, Alkalinity, Acidity, and Chlorides.',
    icon: FiDroplet,
  },
  {
    step: '03',
    title: 'Peer & Scientific Verification',
    text: 'Field notes and laboratory reports are vetted by GBPIET Principal Investigators before awarding official research-verified status.',
    icon: FiShield,
  },
  {
    step: '04',
    title: 'Public Open-Access Registry',
    text: 'Records and maps are published on JalSrot with free CSV export so village councils, researchers, students, and planners can utilize the data directly.',
    icon: FiDatabase,
  },
];

export default function AboutPage() {
  return (
    <div className="bg-ink-50/40 text-ink-800 dark:bg-ink-950 dark:text-ink-100">
      {/* =========================================================================
          HERO BANNER: Authoritative, Clear, Non-vague, Production-Ready
          ========================================================================= */}
      <section className="relative overflow-hidden border-b border-ink-200/80 bg-gradient-to-b from-white via-brand-50/25 to-ink-50/60 pb-12 pt-10 sm:pb-16 sm:pt-14 dark:border-ink-800 dark:from-ink-950 dark:via-ink-900/50 dark:to-ink-950">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top badging */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/80 bg-brand-50/90 px-3 py-1 text-xs font-semibold text-brand-700 shadow-xs dark:border-brand-500/30 dark:bg-brand-500/15 dark:text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-pulse" />
              UCOST Sanctioned Research Initiative
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white/80 px-3 py-1 text-xs font-medium text-ink-600 dark:border-ink-700 dark:bg-ink-900/80 dark:text-ink-300">
              <FaUniversity className="text-ink-400" />
              G.B. Pant Institute of Engg. & Technology, Pauri Garhwal
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="mt-6 max-w-4xl">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl dark:text-white">
              Smart &amp; Sustainable Water Resource Management
            </h1>
            <p className="mt-3 text-lg font-medium text-brand-700 sm:text-xl dark:text-brand-400">
              For Himalayan Communities and Downstream Resilience in Uttarakhand
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-600 sm:text-base dark:text-ink-300">
              A state-supported scientific research project documenting, testing, and safeguarding
              the vital natural springs, streams, and community water sources across the Garhwal
              Himalayas. JalSrot translates field science into open public knowledge.
            </p>
          </div>

          {/* Quick Project Metadata Bar */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {METADATA_PILLS.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-ink-200/80 bg-white/90 p-3.5 shadow-xs transition hover:border-brand-300 dark:border-ink-800 dark:bg-ink-900/70 dark:hover:border-brand-500/40"
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {item.label}
                </div>
                <div className="mt-1 text-xs font-semibold text-ink-800 dark:text-ink-100">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN CONTENT CONTAINER
          ========================================================================= */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* SECTION 1: Narrative Overview & Visual Block */}
        <section className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
              Project Context &amp; Purpose
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl dark:text-white">
              Why Documenting Himalayan Water Is Critical
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-600 sm:text-base dark:text-ink-300">
              <p>
                Water resources in the Himalayan region are closely connected with the well-being of
                mountain communities as well as downstream areas. Across Uttarakhand, natural springs
                (<em>dharas</em>) and traditional seepages (<em>naulas</em>) supply the overwhelming
                majority of drinking and domestic water in rural settlements.
              </p>
              <p>
                However, rapid climate variability, erratic precipitation, land-use transformations,
                and out-migration have placed severe strain on these natural sources. Many springs
                face seasonal drying or declining discharge, yet historically they remained
                unmapped and undocumented in formal governmental data.
              </p>
              <p>
                The sanctioned project,{' '}
                <strong className="font-semibold text-ink-900 dark:text-white">
                  &ldquo;Smart and Sustainable Water Resource Management for Himalayan Communities and
                  Downstream Resilience in Uttarakhand,&rdquo;
                </strong>{' '}
                was established to bridge this gap by creating an empirical, verified public
                inventory of our water sources.
              </p>
              <p>
                Conducted at{' '}
                <strong className="font-semibold text-ink-900 dark:text-white">
                  G.B. Pant Institute of Engineering &amp; Technology (GBPIET), Pauri Garhwal
                </strong>
                , with financial backing from{' '}
                <strong className="font-semibold text-ink-900 dark:text-white">
                  UCOST, Government of Uttarakhand
                </strong>
                , the project is led by{' '}
                <strong className="font-semibold text-ink-900 dark:text-white">
                  Dr. Pushkar Praveen
                </strong>{' '}
                (Principal Investigator), with{' '}
                <strong className="font-semibold text-ink-900 dark:text-white">
                  Dr. Agya Ram Verma
                </strong>{' '}
                and{' '}
                <strong className="font-semibold text-ink-900 dark:text-white">
                  Dr. Papendra Kumar
                </strong>{' '}
                serving as Co-principal Investigators.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {[
                'UCOST Funded Research Initiative',
                'Comprehensive 8-Parameter Quality Testing',
                'Field-Verified GPS Geotagging',
                'Open Public Access for Planners & Communities',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-ink-200/80 bg-white/70 px-3 py-2 text-xs font-semibold text-ink-700 dark:border-ink-800 dark:bg-ink-900/60 dark:text-ink-200"
                >
                  <FiCheckCircle size={15} className="shrink-0 text-emerald-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Block */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-ink-200 shadow-soft dark:border-ink-800">
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
                alt="Himalayan lake and mountain landscape"
                className="h-[360px] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: Project Vision Banner */}
        <section className="mt-14 rounded-2xl border border-brand-200/70 bg-gradient-to-br from-brand-500/10 via-brand-50/50 to-white p-6 sm:p-8 dark:border-brand-500/30 dark:from-brand-500/15 dark:via-ink-900 dark:to-ink-900">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                <FiDroplet /> Project Vision &amp; Mandate
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-ink-900 sm:text-2xl dark:text-white">
                Building a Sustainable &amp; Resilient Mountain Water Future
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 sm:text-base dark:text-ink-300">
                To support sustainable and smart water resource management approaches that empower
                resilient Himalayan communities, protect high-altitude headwaters, and fortify
                downstream water-resource resilience across Uttarakhand.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to="/sources"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600"
              >
                Explore Water Sources <FiArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 3: Why This Project Matters (3 Thematic Pillars) */}
        <section className="mt-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Core Pillars
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl dark:text-white">
              Why This Project Matters
            </h2>
            <p className="mt-2 text-sm text-ink-500 sm:text-base dark:text-ink-400">
              The project title embodies three interconnected spheres of ecological, community, and
              downstream resilience.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="flex flex-col justify-between rounded-2xl border border-ink-200/90 bg-white p-6 shadow-xs transition hover:border-brand-300 hover:shadow-soft dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/40"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className={`grid h-11 w-11 place-items-center rounded-xl ${pillar.iconBg}`}>
                        <Icon size={20} />
                      </div>
                      <span className="rounded-full bg-ink-100 px-2.5 py-0.5 text-[11px] font-semibold text-ink-700 dark:bg-ink-800 dark:text-ink-300">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-bold text-ink-900 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: Sanctioned Project Objectives */}
        <section className="mt-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Research Goals
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl dark:text-white">
              Project Objectives
            </h2>
            <p className="mt-2 text-sm text-ink-500 sm:text-base dark:text-ink-400">
              Key milestones guiding field surveys, water testing, and the open public registry.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {OBJECTIVES.map((obj) => (
              <div
                key={obj.num}
                className="group relative flex gap-4 rounded-xl border border-ink-200/90 bg-white p-5 shadow-xs transition hover:border-brand-300 hover:shadow-soft dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/40"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 font-display text-sm font-bold text-brand-700 ring-1 ring-inset ring-brand-200 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30">
                  {obj.num}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ink-900 dark:text-white">
                    {obj.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-600 sm:text-sm dark:text-ink-300">
                    {obj.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: How a Source is Documented (Workflow) */}
        <section className="mt-16 rounded-2xl border border-ink-200/90 bg-white p-6 sm:p-10 shadow-soft dark:border-ink-800 dark:bg-ink-900">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Standardized Methodology
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl dark:text-white">
              How Every Water Source Is Documented
            </h2>
            <p className="mt-2 text-sm text-ink-500 sm:text-base dark:text-ink-400">
              A 4-tier scientific pipeline transforming on-ground surveys into verifiable public data.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.step}
                  className="relative rounded-xl border border-ink-100 bg-ink-50/50 p-5 dark:border-ink-800/80 dark:bg-ink-950/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-extrabold tracking-wider text-brand-600 dark:text-brand-400">
                      STAGE {step.step}
                    </span>
                    <StepIcon className="text-ink-400 dark:text-ink-500" size={16} />
                  </div>
                  <h3 className="mt-3 font-display text-sm font-bold text-ink-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-500 sm:text-[13px] dark:text-ink-400">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 6: Institutional Leadership Callout */}
        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-between rounded-2xl border border-ink-200 bg-white p-6 shadow-xs dark:border-ink-800 dark:bg-ink-900">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                <FaUniversity /> Executing Institution
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-ink-900 dark:text-white">
                G.B. Pant Institute of Engineering &amp; Technology
              </h3>
              <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">
                Ghurdauri, Pauri Garhwal, Uttarakhand — 246194
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                An autonomous institute of the Government of Uttarakhand, leading applied research
                in water resources, environmental sensing, and digital geospatial systems.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-ink-100 dark:border-ink-800">
              <Link
                to="/research"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                Meet the Research Team &amp; Investigators <FiArrowRight />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-ink-200 bg-white p-6 shadow-xs dark:border-ink-800 dark:bg-ink-900">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                <FiShield /> Sponsoring Council
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-ink-900 dark:text-white">
                Uttarakhand State Council for Science &amp; Technology (UCOST)
              </h3>
              <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">
                Department of Science &amp; Technology, Government of Uttarakhand
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                Providing financial and strategic research sanction to investigate sustainable water
                management frameworks for Himalayan communities and downstream resilience.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-ink-100 dark:border-ink-800">
              <span className="text-xs text-ink-500 dark:text-ink-400">
                Official Sanctioned Grant · Department of Science &amp; Technology
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 7: Call to Action (Explore the Registry) */}
        <section className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-900 via-brand-800 to-brand-950 p-8 sm:p-10 text-white shadow-soft">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brand-200">
                <FiDatabase /> Public Access Database
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl text-white">
                Explore Documented Water Sources
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-100">
                Browse every documented water source, inspect measured physical-chemical parameters,
                or launch the interactive map to inspect sources across Uttarakhand watersheds.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/sources"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-brand-900 shadow-sm transition hover:bg-brand-50"
              >
                Water Sources <FiArrowRight size={15} />
              </Link>
              <Link
                to="/map"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <FiMapPin size={15} /> Open Map View
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
