export default function BearLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Ears */}
      <circle cx="16" cy="12" r="9" />
      <circle cx="48" cy="12" r="9" />
      <circle cx="16" cy="12" r="5" opacity="0.3" />
      <circle cx="48" cy="12" r="5" opacity="0.3" />
      {/* Head */}
      <ellipse cx="32" cy="30" rx="22" ry="20" />
      {/* Muzzle */}
      <ellipse cx="32" cy="37" rx="11" ry="9" opacity="0.25" />
      {/* Eyes */}
      <circle cx="23" cy="26" r="3" fill="#181f13" />
      <circle cx="41" cy="26" r="3" fill="#181f13" />
      <circle cx="24" cy="25" r="1" fill="white" />
      <circle cx="42" cy="25" r="1" fill="white" />
      {/* Nose */}
      <ellipse cx="32" cy="33" rx="4" ry="3" fill="#181f13" />
      <ellipse cx="32" cy="32.5" rx="1.5" ry="0.8" fill="white" opacity="0.4" />
      {/* Mouth */}
      <path
        d="M29 37 Q32 41 35 37"
        fill="none"
        stroke="#181f13"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
