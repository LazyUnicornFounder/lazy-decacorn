import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Mascot from "@/components/Mascot";
import PredictionCard from "@/components/PredictionCard";
import Navbar from "@/components/Navbar";
import GameFooter from "@/components/GameFooter";
import OracleIcon from "@/components/OracleIcon";
import { predictions } from "@/lib/mockData";

const tiers = [
  {
    name: "Free Player",
    price: "Free",
    icon: "🎮",
    features: ["1,000 starting Oracles", "Basic predictions", "Leaderboard access"],
    cta: "Play Free",
    highlight: false,
  },
  {
    name: "Pro Forecaster",
    price: "₽9/mo",
    icon: "✨",
    features: ["+5,000 Oracles monthly", "1.5x score multiplier", "Pro badge ✨", "Prize tournaments", "Early access predictions"],
    cta: "Get This Power-Up",
    highlight: true,
  },
  {
    name: "Whale Oracle",
    price: "₽29/mo",
    icon: "🐋",
    features: ["+20,000 Oracles monthly", "Create predictions", "Premium charts", "Whale badge 🐋", "Double prize eligibility", "Discord access"],
    cta: "Get This Power-Up",
    highlight: false,
  },
];

const faqs = [
  { q: "Is this real money?", a: "No! Oracles (₽) are in-game points with no cash value. LazyDecacorn is a free-to-play forecasting game." },
  { q: "How do cash prizes work?", a: "Monthly tournament prizes are funded by subscription fees, similar to esports tournaments. Top forecasters on the leaderboard split the prize pool." },
  { q: "How does scoring work?", a: "Each prediction has a crowd belief percentage. When you back a side and the prediction resolves in your favor, you earn Oracles based on how early and how much you committed." },
  { q: "Can I create my own predictions?", a: "Whale Oracle subscribers can propose new predictions! We review and publish the best ones." },
];

const LandingPage = () => {
  const featured = predictions.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mascot size={140} className="mx-auto mb-6" />

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            The Forecasting Game for{" "}
            <span className="text-gradient-primary">Startup Nerds</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Predict which solo founders will hit $10 billion first. Free to play. Real prizes for the best forecasters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/predict" className="btn-game btn-primary-game text-lg px-10 py-4">
              🎮 Play Free
            </Link>
            <a href="#how-to-play" className="btn-game bg-card border border-border text-foreground hover:bg-muted text-lg px-10 py-4">
              How to Play
            </a>
          </motion.div>
        </div>

        {/* Live ticker */}
        <div className="mt-16 overflow-hidden border-y border-border bg-card/50 py-3">
          <div className="animate-ticker flex gap-8 whitespace-nowrap">
            {[...predictions, ...predictions].map((p, i) => {
              const belief = Math.round((p.no_pool / (p.yes_pool + p.no_pool)) * 100);
              return (
                <span key={i} className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-muted-foreground">{p.founder_name}</span>
                  <span className={belief > 50 ? "text-yes" : "text-no"}>
                    {belief}% YES
                  </span>
                  <span className="text-muted-foreground/40">•</span>
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Play */}
      <section id="how-to-play" className="py-20 bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">
            How to Play 🎯
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", icon: "🎁", title: "Sign Up", desc: "Get 1,000 free Oracles ₽ to start predicting" },
              { step: "2", icon: "🔮", title: "Make Predictions", desc: "Back YES or NO on founder predictions" },
              { step: "3", icon: "🏆", title: "Win Trophies", desc: "Climb the leaderboard, win monthly cash prizes" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center p-8 rounded-3xl bg-background border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="game-badge mb-3 inline-block">Step {item.step}</div>
                <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Predictions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl font-bold">Featured Predictions 🔥</h2>
            <Link to="/predict" className="text-primary font-semibold text-sm hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <PredictionCard key={p.id} prediction={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">
            Power-Ups ⚡
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Subscriptions support the game and fund tournament prize pools — not pay-to-win.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                className={`rounded-3xl p-6 border ${
                  tier.highlight
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border bg-background"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl mb-3">{tier.icon}</div>
                <h3 className="font-display text-xl font-bold mb-1">{tier.name}</h3>
                <p className="text-2xl font-bold text-primary mb-4">{tier.price}</p>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <span className="text-yes">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full btn-game ${tier.highlight ? "btn-primary-game" : "bg-muted text-foreground hover:bg-muted/80"}`}>
                  {tier.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-center mb-12">FAQ 🤔</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                className="card-game p-5 cursor-pointer group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <summary className="font-display font-semibold list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <GameFooter />
    </div>
  );
};

export default LandingPage;
