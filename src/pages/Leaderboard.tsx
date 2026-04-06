import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import GameFooter from "@/components/GameFooter";
import { leaderboard } from "@/lib/mockData";

const tabs = ["All Time Champions", "This Month", "This Week"];
const medals = ["🥇", "🥈", "🥉"];

const starRating = (rate: number) => {
  const stars = Math.round(rate / 20);
  return "★".repeat(stars) + "☆".repeat(5 - stars);
};

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trophy banner */}
        <motion.div
          className="card-game p-6 text-center mb-8 border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-transparent"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-4xl mb-2">🏆</p>
          <h2 className="font-display text-2xl font-bold mb-1">
            This Month's Tournament Prize Pool
          </h2>
          <p className="font-display text-3xl font-bold text-primary">$500</p>
          <p className="text-sm text-muted-foreground mt-1">Top 10 forecasters split it</p>
        </motion.div>

        <h1 className="font-display text-3xl font-bold mb-6">Leaderboard 🏅</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="space-y-3">
          {leaderboard.map((entry, i) => (
            <motion.div
              key={entry.rank}
              className={`card-game p-4 flex items-center gap-4 ${
                i < 3 ? "border-gold/30 bg-gold/5" : ""
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              {/* Rank */}
              <div className="w-10 text-center font-display font-bold text-lg">
                {i < 3 ? medals[i] : entry.rank}
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold ring-2 ring-primary/20">
                {entry.display_name.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm truncate">{entry.display_name}</span>
                  <span className="game-badge text-[10px]">Lv.{entry.level}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span className="text-gold">{starRating(entry.win_rate)}</span>
                  <span>{entry.win_rate}% win rate</span>
                  {entry.streak_days > 0 && (
                    <span className="text-destructive">🔥 {entry.streak_days}</span>
                  )}
                </div>
              </div>

              {/* Oracles */}
              <div className="text-right">
                <p className="font-bold text-primary text-sm">₽{entry.oracles_balance.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{entry.total_predictions} predictions</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <GameFooter />
    </div>
  );
};

export default LeaderboardPage;
