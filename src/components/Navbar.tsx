import { Link, useLocation } from "react-router-dom";
import OracleIcon from "./OracleIcon";

const navLinks = [
  { to: "/predict", label: "Predictions" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/pricing", label: "Power-Ups" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <OracleIcon className="w-8 h-8" />
            <span className="font-display text-xl font-bold text-foreground">
              Lazy<span className="text-gradient-primary">Oracle</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Game badge */}
            <div className="game-badge hidden sm:flex items-center gap-1">
              🎮 PLAY MONEY GAME
            </div>

            {/* Oracles balance */}
            <div className="flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1.5">
              <OracleIcon className="w-4 h-4" />
              <span className="font-bold text-sm text-primary">₽1,000</span>
            </div>

            {/* Play Free CTA */}
            <Link
              to="/predict"
              className="btn-game btn-primary-game text-sm px-5 py-2"
            >
              Play Free
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex items-center justify-center gap-1 pb-2 px-4">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              location.pathname === link.to
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
