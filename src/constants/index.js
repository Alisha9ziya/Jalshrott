export const SITE = {
  name: 'JalSrot',
  tagline: 'Documenting and protecting every water source.',
  project: 'UCOST Funded Research Project',
  subtitle: 'Building a Sustainable and Resilient Water Future',
  title:
    'Smart and Sustainable Water Resource Management for Himalayan Communities and Downstream Resilience in Uttarakhand',
  institution: 'G.B. Pant Institute of Engineering & Technology, Pauri Garhwal',
  email: 'jalsrotuk@gmail.com',
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Water Sources', to: '/sources' },
  { label: 'Map View', to: '/map' },
  { label: 'Research Team', to: '/research' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact & Support', to: '/contact' },
];

export const SOURCE_TYPES = [
  { value: 'spring', label: 'Spring', color: '#2563eb', tint: 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/30' },
  { value: 'river', label: 'River', color: '#0284c7', tint: 'bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-500/30' },
  { value: 'pond', label: 'Pond', color: '#0d9488', tint: 'bg-teal-50 text-teal-700 ring-teal-200 dark:bg-teal-500/15 dark:text-teal-300 dark:ring-teal-500/30' },
  { value: 'well', label: 'Well', color: '#7c3aed', tint: 'bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-500/15 dark:text-violet-300 dark:ring-violet-500/30' },
  { value: 'borewell', label: 'Borewell', color: '#9333ea', tint: 'bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-500/15 dark:text-purple-300 dark:ring-purple-500/30' },
  { value: 'tap', label: 'Tap / Spout', color: '#db2777', tint: 'bg-pink-50 text-pink-700 ring-pink-200 dark:bg-pink-500/15 dark:text-pink-300 dark:ring-pink-500/30' },
  { value: 'waterfall', label: 'Waterfall', color: '#0891b2', tint: 'bg-cyan-50 text-cyan-700 ring-cyan-200 dark:bg-cyan-500/15 dark:text-cyan-300 dark:ring-cyan-500/30' },
];

export const sourceTypeMeta = (value) =>
  SOURCE_TYPES.find((type) => type.value === value) || {
    value: value || 'unknown',
    label: value ? value[0].toUpperCase() + value.slice(1) : 'Unknown',
    color: '#64748b',
    tint: 'bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-500/15 dark:text-slate-300 dark:ring-slate-500/30',
  };

export const CONDITIONS = [
  { value: 'good', label: 'Good', tint: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30' },
  { value: 'moderate', label: 'Moderate', tint: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30' },
  { value: 'poor', label: 'Poor', tint: 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:ring-rose-500/30' },
];

export const conditionMeta = (value) =>
  CONDITIONS.find((condition) => condition.value === value) || CONDITIONS[0];

export const QUALITY_FIELDS = [
  { key: 'ph', label: 'pH', unit: '', step: '0.1', placeholder: '7.2' },
  { key: 'tds', label: 'Total Dissolved Solids', unit: 'mg/L', step: '0.01', placeholder: '50' },
  { key: 'electricalConductivity', label: 'Electrical Conductivity', unit: 'µS/cm', step: '0.01', placeholder: '100' },
  { key: 'turbidity', label: 'Turbidity', unit: 'NTU', step: '0.01', placeholder: '4' },
  { key: 'totalAlkalinity', label: 'Total Alkalinity', unit: 'mg/L', step: '0.01', placeholder: '56' },
  { key: 'totalAcidity', label: 'Total Acidity', unit: 'mg/L', step: '0.01', placeholder: '16' },
  { key: 'totalHardness', label: 'Total Hardness', unit: 'mg/L', step: '0.01', placeholder: '62' },
  { key: 'chlorides', label: 'Chlorides', unit: 'mg/L', step: '0.01', placeholder: '28' },
];

export const EMPTY_SOURCE = {
  name: '',
  sourceType: 'spring',
  latitude: '',
  longitude: '',
  village: '',
  district: '',
  state: 'Uttarakhand',
  duration: '',
  condition: 'good',
  isPotable: false,
  seasonal: false,
  verified: false,
  usersPerDay: '',
  distanceFromVillage: '',
  area: '',
  deviceId: '',
  notes: '',
  ph: '',
  tds: '',
  electricalConductivity: '',
  turbidity: '',
  totalAlkalinity: '',
  totalAcidity: '',
  totalHardness: '',
  chlorides: '',
};
