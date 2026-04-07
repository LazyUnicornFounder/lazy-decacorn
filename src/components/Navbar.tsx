import { Link, useLocation } from "react-router-dom";
import OracleIcon from "./OracleIcon";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { to: "/pricing", label: "Power-Ups" },
];

const Navbar = () => {
  const location = useLocation();
  const { user, profile, signInWithGoogle, signOut, loading } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <OracleIcon className="w-8 h-8" />
            <span className="font-display text-xl font-bold text-foreground">
              Lazy<span className="text-gradient-primary">Decacorn</span>
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
            {/* Power-Ups button */}
            <Link
              to="/pricing"
              className="hidden sm:flex items-center gap-1.5 bg-accent text-accent-foreground font-bold text-sm px-4 py-2 rounded-full hover:brightness-110 transition-all"
            >
              ⚡ Get Power-Ups
            </Link>

            {user && profile ? (
              <>
                {/* Oracles balance */}
                <div className="flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1.5">
                  <OracleIcon className="w-4 h-4" />
                  <span className="font-bold text-sm text-primary">
                    ₽{profile.oracles_balance.toLocaleString()}
                  </span>
                </div>

                {/* Profile link */}
                <Link to="/profile" className="flex items-center gap-2">
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt="" className="w-8 h-8 rounded-full ring-2 ring-primary/20" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                      🔮
                    </div>
                  )}
                </Link>

                {/* Sign out */}
                <button
                  onClick={signOut}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={signInWithGoogle}
                disabled={loading}
                className="btn-game btn-primary-game text-sm px-5 py-2"
              >
                Continue with Google
              </button>
            )}
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
