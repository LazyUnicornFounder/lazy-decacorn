import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import OracleIcon from "./OracleIcon";
import { leaderboard } from "@/lib/mockData";

const medals = ["🥇", "🥈", "🥉"];

const Leaderbox = () => {
  const top5 = leaderboard.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card-game col-span-1 md:col-span-2 row-span-2 p-6 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏆</span>
          <h2 className="font-display text-lg font-bold">Top Oracles</h2>
        </div>
        <Link
          to="/leaderboard"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* Leaderboard rows */}
      <div className="flex flex-col gap-3 flex-1">
        {top5.map((entry, i) => (
          <div
            key={entry.display_name}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors ${
              i === 0
                ? "bg-accent/10 border border-accent/20"
                : "bg-muted/50 hover:bg-muted"
            }`}
          >
            {/* Rank */}
            <span className="text-lg w-8 text-center">
              {i < 3 ? medals[i] : <span className="text-sm font-bold text-muted-foreground">#{entry.rank}</span>}
            </span>

            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                i === 0
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {entry.display_name.charAt(0)}
            </div>

            {/* Name & level */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{entry.display_name}</p>
              <p className="text-xs text-muted-foreground">Lv. {entry.level} · {entry.win_rate}% win</p>
            </div>

            {/* Balance */}
            <div className="flex items-center gap-1 bg-primary/10 rounded-full px-2.5 py-1">
              <OracleIcon className="w-3.5 h-3.5" />
              <span className="font-bold text-xs text-primary">
                ₽{entry.oracles_balance.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Leaderbox;
