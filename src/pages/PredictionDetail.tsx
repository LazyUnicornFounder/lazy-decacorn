import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import Navbar from "@/components/Navbar";
import GameFooter from "@/components/GameFooter";
import OracleIcon from "@/components/OracleIcon";
import { usePrediction, useForecasts, crowdBelief } from "@/hooks/usePredictions";
import { usePlaceForecast } from "@/hooks/usePlaceForecast";
import { useAuth } from "@/contexts/AuthContext";

const chartData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  belief: Math.max(20, Math.min(80, 50 + Math.round((Math.random() - 0.5) * 30))),
}));

const PredictionDetail = () => {
  const { slug } = useParams();
  const { data: prediction, isLoading } = usePrediction(slug);
  const { data: forecasts = [] } = useForecasts(prediction?.id);
  const { user, profile, signInWithGoogle } = useAuth();
  const placeForecast = usePlaceForecast();
  const [side, setSide] = useState<"yes" | "no">("yes");
  const [amount, setAmount] = useState(100);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-4xl mb-3">🔮</p>
          <p className="font-display text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-4xl mb-3">🔮</p>
          <p className="font-display text-xl">Prediction not found</p>
          <Link to="/" className="text-primary font-semibold mt-4 inline-block">
            ← Back to Predictions
          </Link>
        </div>
      </div>
    );
  }

  const belief = crowdBelief(prediction);
  const pool = side === "yes" ? prediction.yes_pool : prediction.no_pool;
  const otherPool = side === "yes" ? prediction.no_pool : prediction.yes_pool;
  const shares = (amount * otherPool) / (pool + amount);
  const potentialReward = Math.round(shares + amount * 0.98);

  const handlePlaceForecast = () => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    placeForecast.mutate({
      predictionId: prediction.id,
      side,
      amount,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="text-primary text-sm font-semibold mb-6 inline-block hover:underline">
          ← Back to Predictions
        </Link>

        {/* Founder profile */}
        <motion.div
          className="card-game p-6 mb-6 flex items-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {prediction.founder_photo_url ? (
            <img
              src={prediction.founder_photo_url}
              alt={prediction.founder_name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/20"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
              🔮
            </div>
          )}
          <div>
            <h2 className="font-display text-xl font-bold">{prediction.founder_name}</h2>
            <p className="text-muted-foreground text-sm">{prediction.company_name}</p>
            <p className="text-sm mt-1">{prediction.description}</p>
          </div>
          <span className="game-badge ml-auto shrink-0">{prediction.category}</span>
        </motion.div>

        {/* Question */}
        <motion.h1
          className="font-display text-2xl sm:text-3xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {prediction.question}
        </motion.h1>

        {/* Crowd belief */}
        <motion.div
          className="card-game p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="text-sm font-semibold text-muted-foreground mb-3">Crowd Belief</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-yes">{belief}% YES</span>
            <span className="text-2xl font-bold text-no">{100 - belief}% NO</span>
          </div>
          <div className="belief-bar h-5 rounded-full">
            <motion.div
              className="belief-bar-fill h-full"
              initial={{ width: 0 }}
              animate={{ width: `${belief}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            👥 {forecasts.length} forecasters predicted this
          </p>
        </motion.div>

        {/* Chart */}
        <motion.div
          className="card-game p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm font-semibold text-muted-foreground mb-4">Belief History</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="beliefGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(263, 85%, 66%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(263, 85%, 66%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" hide />
              <YAxis domain={[0, 100]} hide />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(30, 20%, 90%)",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`${value}%`, "Crowd Belief"]}
              />
              <Area
                type="monotone"
                dataKey="belief"
                stroke="hsl(263, 85%, 66%)"
                strokeWidth={2}
                fill="url(#beliefGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Make prediction panel */}
        <motion.div
          className="card-game p-6 mb-6 border-2 border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className="font-display text-lg font-bold mb-4">Make Your Prediction 🔮</h3>

          {/* Side toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setSide("yes")}
              className={`flex-1 btn-game py-3 text-sm font-bold transition-all ${
                side === "yes" ? "btn-yes scale-105" : "bg-muted text-muted-foreground"
              }`}
            >
              Back YES ✅
            </button>
            <button
              onClick={() => setSide("no")}
              className={`flex-1 btn-game py-3 text-sm font-bold transition-all ${
                side === "no" ? "btn-no scale-105" : "bg-muted text-muted-foreground"
              }`}
            >
              Back NO ❌
            </button>
          </div>

          {/* Amount slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold">Decacorns to commit</label>
              <div className="flex items-center gap-1 text-primary font-bold">
                <OracleIcon className="w-4 h-4" /> ₽{amount.toLocaleString()}
              </div>
            </div>
            <input
              type="range"
              min={10}
              max={profile ? Math.min(5000, profile.oracles_balance) : 5000}
              step={10}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₽10</span>
              <span>₽{profile ? Math.min(5000, profile.oracles_balance).toLocaleString() : "5,000"}</span>
            </div>
          </div>

          {/* Reward preview */}
          <div className="bg-muted rounded-2xl p-4 mb-6 text-center">
            <p className="text-sm text-muted-foreground">If you're right, you'll win</p>
            <p className="font-display text-2xl font-bold text-primary mt-1">
              ₽{potentialReward.toLocaleString()} ✨
            </p>
          </div>

          {user ? (
            <button
              onClick={handlePlaceForecast}
              disabled={placeForecast.isPending}
              className="w-full btn-game btn-primary-game text-lg py-4 disabled:opacity-50"
            >
              {placeForecast.isPending ? "Locking in..." : "🔮 Lock In Prediction"}
            </button>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="w-full btn-game btn-primary-game text-lg py-4"
            >
              🔑 Sign In to Predict
            </button>
          )}
        </motion.div>

        {/* Recent forecasts */}
        <motion.div
          className="card-game p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-display text-lg font-bold mb-4">Recent Forecasts</h3>
          {forecasts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No forecasts yet — be the first! 🔮
            </p>
          ) : (
            <div className="space-y-3">
              {forecasts.map((f: any) => (
                <div key={f.id} className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                    {f.profiles?.display_name?.charAt(0) || "?"}
                  </div>
                  <span className="font-semibold">{f.profiles?.display_name || "Anonymous"}</span>
                  <span className={`font-bold ${f.side === "yes" ? "text-yes" : "text-no"}`}>
                    backed {f.side.toUpperCase()}
                  </span>
                  <span className="text-muted-foreground">with ₽{Number(f.oracles_amount).toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Resolution criteria */}
        <motion.div
          className="card-game p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h3 className="font-display text-lg font-bold mb-3">Resolution Criteria ✅</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {prediction.resolution_criteria}
          </p>
        </motion.div>
      </div>

      <GameFooter />
    </div>
  );
};

export default PredictionDetail;
