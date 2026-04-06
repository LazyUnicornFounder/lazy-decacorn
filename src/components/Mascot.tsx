import { motion } from "framer-motion";

const Mascot = ({ size = 120, className = "" }: { size?: number; className?: string }) => (
  <motion.div
    className={`inline-block ${className}`}
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      {/* Base / stand */}
      <ellipse cx="60" cy="105" rx="30" ry="8" fill="#d8b4fe" opacity="0.4" />
      <path d="M40 100 Q60 115 80 100 L75 95 Q60 105 45 95 Z" fill="#a78bfa" />

      {/* Crystal ball body */}
      <circle cx="60" cy="60" r="38" fill="url(#ball-gradient)" />
      <circle cx="60" cy="60" r="38" fill="url(#ball-shine)" opacity="0.6" />

      {/* Inner glow */}
      <circle cx="60" cy="60" r="28" fill="url(#inner-glow)" opacity="0.3" />

      {/* Sparkles inside */}
      <circle cx="48" cy="50" r="2" fill="#fef3c7" opacity="0.8" />
      <circle cx="70" cy="45" r="1.5" fill="#fef3c7" opacity="0.6" />
      <circle cx="55" cy="70" r="1" fill="#fef3c7" opacity="0.7" />

      {/* Eyes */}
      <motion.g>
        <ellipse cx="50" cy="58" rx="4" ry="5" fill="#1e293b" />
        <ellipse cx="70" cy="58" rx="4" ry="5" fill="#1e293b" />
        <circle cx="48" cy="56" r="1.5" fill="white" />
        <circle cx="68" cy="56" r="1.5" fill="white" />
      </motion.g>

      {/* Smile */}
      <path d="M52 68 Q60 74 68 68" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Wizard hat */}
      <path d="M30 42 L60 5 L90 42 Q60 35 30 42Z" fill="url(#hat-gradient)" />
      <ellipse cx="60" cy="42" rx="32" ry="8" fill="#6d28d9" />
      <circle cx="60" cy="8" r="5" fill="#fbbf24" />
      <circle cx="60" cy="8" r="3" fill="#fef3c7" />

      {/* Hat stars */}
      <text x="45" y="32" fontSize="8" fill="#fef3c7" opacity="0.8">✦</text>
      <text x="65" y="28" fontSize="6" fill="#fef3c7" opacity="0.6">✦</text>

      {/* Glass shine */}
      <ellipse cx="45" cy="48" rx="8" ry="12" fill="white" opacity="0.15" transform="rotate(-20 45 48)" />

      <defs>
        <radialGradient id="ball-gradient" cx="0.4" cy="0.35" r="0.65">
          <stop offset="0%" stopColor="#e9d5ff" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#7c3aed" />
        </radialGradient>
        <radialGradient id="ball-shine" cx="0.35" cy="0.3" r="0.4">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="inner-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hat-gradient" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
);

export default Mascot;
