import { Link } from "react-router-dom";
import OracleIcon from "./OracleIcon";

const GameFooter = () => (
  <footer className="bg-card border-t border-border mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <OracleIcon className="w-6 h-6" />
            <span className="font-display text-lg font-bold">LazyDecacorn</span>
          </div>
          <p className="text-sm text-muted-foreground">
            The forecasting game for startup nerds. Free to play.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Play</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link to="/predict" className="block hover:text-foreground transition-colors">Predictions</Link>
            <Link to="/leaderboard" className="block hover:text-foreground transition-colors">Leaderboard</Link>
            <Link to="/pricing" className="block hover:text-foreground transition-colors">Power-Ups</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Account</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link to="/profile" className="block hover:text-foreground transition-colors">Profile</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Legal</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <span className="block">Terms of Service</span>
            <span className="block">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Permanent game disclaimer */}
      <div className="bg-muted rounded-2xl p-4 text-center text-xs text-muted-foreground leading-relaxed">
        🎮 LazyDecacorn is a free-to-play forecasting GAME. Oracles (₽) are in-game points with no monetary value and cannot be exchanged for cash. Tournament prize pools are funded by subscription fees, similar to esports tournaments. This is a game of skill, not gambling. Not affiliated with any founders listed. Not financial advice. 18+.
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        © {new Date().getFullYear()} LazyDecacorn. All rights reserved.
      </p>
    </div>
  </footer>
);

export default GameFooter;
