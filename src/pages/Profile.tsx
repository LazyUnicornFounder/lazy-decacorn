import { motion } from "framer-motion";
import { Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import GameFooter from "@/components/GameFooter";
import OracleIcon from "@/components/OracleIcon";
import { achievements } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useMyForecasts } from "@/hooks/usePredictions";

const ProfilePage = () => {
  const { user, profile, loading } = useAuth();
  const { data: myForecasts = [] } = useMyForecasts(user?.id);

  if (loading) return null;
  if (!user || !profile) return <Navigate to="/" replace />;

  const xpNext = profile.level * 500;

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
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-20 h-20 rounded-3xl ring-4 ring-primary/20 object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-3xl ring-4 ring-primary/20">
                🧙
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display text-xl font-bold">{profile.display_name || "Forecaster"}</h2>
                <span className="game-badge">Lv.{profile.level}</span>
                <span className="game-badge bg-muted text-muted-foreground capitalize">{profile.subscription_tier} Player</span>
              </div>

              {/* XP bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>XP: {profile.xp}/{xpNext}</span>
                  <span>Level {profile.level + 1}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (profile.xp / xpNext) * 100)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-muted rounded-2xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <OracleIcon className="w-4 h-4" />
                    <span className="font-bold text-primary">₽{profile.oracles_balance.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Decacorns</p>
                </div>
                <div className="bg-muted rounded-2xl p-3 text-center">
                  <p className="font-bold">{myForecasts.length}</p>
                  <p className="text-xs text-muted-foreground">Predictions</p>
                </div>
                <div className="bg-muted rounded-2xl p-3 text-center">
                  <p className="font-bold">{profile.streak_days > 0 ? `🔥 ${profile.streak_days}` : "—"}</p>
                  <p className="text-xs text-muted-foreground">Streak</p>
                </div>
                <div className="bg-muted rounded-2xl p-3 text-center">
                  <p className="font-bold">{profile.xp}</p>
                  <p className="text-xs text-muted-foreground">Total XP</p>
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
              <p className="font-semibold capitalize">{profile.subscription_tier} Player</p>
              <p className="text-sm text-muted-foreground">Upgrade to get more Decacorns and unlock tournaments</p>
            </div>
            <Link to="/pricing" className="btn-game btn-primary-game text-sm px-5 py-2">
              Upgrade
            </Link>
          </div>
        </motion.div>

        {/* Active predictions */}
        <motion.div
          className="card-game p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="font-display text-lg font-bold mb-3">Your Predictions 🔮</h3>
          {myForecasts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No predictions yet. <Link to="/" className="text-primary font-semibold">Go make your first forecast!</Link>
            </p>
          ) : (
            <div className="space-y-3">
              {myForecasts.map((f: any) => (
                <Link
                  key={f.id}
                  to={`/predict/${f.predictions?.slug}`}
                  className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <span className={`font-bold ${f.side === "yes" ? "text-yes" : "text-no"}`}>
                    {f.side.toUpperCase()}
                  </span>
                  <span className="flex-1 truncate">{f.predictions?.question}</span>
                  <span className="text-muted-foreground shrink-0">₽{Number(f.oracles_amount).toLocaleString()}</span>
                </Link>
              ))}
            </div>
          )}
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
