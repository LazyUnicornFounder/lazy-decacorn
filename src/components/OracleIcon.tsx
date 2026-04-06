const OracleIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="url(#oracle-grad)" opacity="0.2" />
    <circle cx="12" cy="12" r="7" fill="url(#oracle-grad)" opacity="0.4" />
    <circle cx="12" cy="12" r="4" fill="url(#oracle-grad)" />
    <path d="M12 2C12 2 14 6 14 12C14 18 12 22 12 22" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <path d="M2 12C2 12 6 14 12 14C18 14 22 12 22 12" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <defs>
      <radialGradient id="oracle-grad" cx="0.5" cy="0.3" r="0.7">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#7c3aed" />
      </radialGradient>
    </defs>
  </svg>
);

export default OracleIcon;
