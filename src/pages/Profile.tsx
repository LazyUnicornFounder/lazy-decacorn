import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import GameFooter from "@/components/GameFooter";
import OracleIcon from "@/components/OracleIcon";
import { achievements } from "@/lib/mockData";

const ProfilePage = () => {
  const user = {
    display_name: "NewForecaster",
    level: 3,
    xp: 320,
    xp_next: 500,
    oracles: 1000,
    win_rate: 0,
    total_predictions: 0,
    streak: 0,
    tier: "free",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-3xl font-bold mb-8">Your Profile 🧙</h1>

        {/* Stats card */}
        <motion.div
          className="card-game p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-3xl ring-4 ring-primary/20">
              🧙
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display text-xl font-bold">{user.display_name}</h2>
                <span className="game-badge">Lv.{user.level}</span>
                <span className="game-badge bg-muted text-muted-foreground">Free Player</span>
              </div>

              {/* XP bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>XP: {user.xp}/{user.xp_next}</span>
                  <span>Level {user.level + 1}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(user.xp / user.xp_next) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-muted rounded-2xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <OracleIcon className="w-4 h-4" />
                    <span className="font-bold text-primary">₽{user.oracles.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Oracles</p>
                </div>
                <div className="bg-muted rounded-2xl p-3 text-center">
                  <p className="font-bold">{user.win_rate}%</p>
                  <p className="text-xs text-muted-foreground">Win Rate</p>
                </div>
                <div className="bg-muted rounded-2xl p-3 text-center">
                  <p className="font-bold">{user.total_predictions}</p>
                  <p className="text-xs text-muted-foreground">Predictions</p>
                </div>
                <div className="bg-muted rounded-2xl p-3 text-center">
                  <p className="font-bold">{user.streak > 0 ? `🔥 ${user.streak}` : "—"}</p>
                  <p className="text-xs text-muted-foreground">Streak</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subscription */}
        <motion.div
          className="card-game p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-display text-lg font-bold mb-3">Power-Up Status ⚡</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Free Player</p>
              <p className="text-sm text-muted-foreground">Upgrade to get more Oracles and unlock tournaments</p>
            </div>
            <a href="/pricing" className="btn-game btn-primary-game text-sm px-5 py-2">
              Upgrade
            </a>
          </div>
        </motion.div>

        {/* Active predictions */}
        <motion.div
          className="card-game p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="font-display text-lg font-bold mb-3">Active Predictions 🔮</h3>
          <p className="text-sm text-muted-foreground text-center py-8">
            No active predictions yet. Go make your first forecast!
          </p>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="card-game p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-display text-lg font-bold mb-4">Achievements 🏅</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {achievements.map((a) => (
              <div
                key={a.id}
                className={`rounded-2xl p-4 text-center border transition-all ${
                  a.unlocked
                    ? "bg-gold/5 border-gold/30"
                    : "bg-muted/50 border-border opacity-50"
                }`}
              >
                <p className="text-3xl mb-2">{a.icon}</p>
                <p className="font-bold text-xs">{a.name}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{a.description}</p>
                {a.unlocked && <span className="text-[10px] text-yes font-bold">✓ Unlocked</span>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <GameFooter />
    </div>
  );
};

export default ProfilePage;
