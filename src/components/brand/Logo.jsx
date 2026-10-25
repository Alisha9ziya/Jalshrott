export function LogoMark({ size = 34, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="JalSrot logo"
    >
      <defs>
        <linearGradient id="jalsrot-drop" x1="8" y1="4" x2="34" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#52bcff" />
          <stop offset="0.55" stopColor="#0d8ed8" />
          <stop offset="1" stopColor="#055a93" />
        </linearGradient>
      </defs>
      <path
        d="M20 2.5c5.6 6.6 10.2 11.9 10.2 17.2a10.2 10.2 0 0 1-20.4 0C9.8 14.4 14.4 9.1 20 2.5Z"
        fill="url(#jalsrot-drop)"
      />
      <path
        d="M13.4 24.6c2.2 1.7 4.6 2.5 7.3 2.5 2.4 0 4.4-.6 6.2-1.8"
        stroke="#ffffff"
        strokeWidth="2.1"
        strokeLinecap="round"
        opacity="0.95"
        fill="none"
      />
      <path
        d="M15.2 19.9c1.6-2.6 3.5-4.4 5.7-6.1"
        stroke="#ffffff"
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.55"
        fill="none"
      />
    </svg>
  );
}

export default function Logo({ size = 34, className = '', textClassName = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={size} />
      <span
        className={`font-display text-[1.35rem] font-bold leading-none tracking-tight text-brand-800 dark:text-white ${textClassName}`}
      >
        Jal<span className="text-brand-600 dark:text-brand-300">Srot</span>
      </span>
    </span>
  );
}
