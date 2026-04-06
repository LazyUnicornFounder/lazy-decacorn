import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import GameFooter from "@/components/GameFooter";

const tiers = [
  {
    name: "Free Player",
    price: "Free",
    priceDetail: "forever",
    icon: "🎮",
    color: "border-border",
    features: [
      "1,000 starting Oracles",
      "Basic predictions",
      "Leaderboard access",
      "Community forecasts",
    ],
    cta: "Play Free",
    highlight: false,
  },
  {
    name: "Pro Forecaster",
    price: "₽9",
    priceDetail: "/month",
    icon: "✨",
    color: "border-primary ring-2 ring-primary/20",
    features: [
      "+5,000 Oracles monthly",
      "1.5x score multiplier",
      "Pro badge ✨",
      "Prize tournament eligibility",
      "Early access predictions",
    ],
    cta: "Get This Power-Up",
    highlight: true,
  },
  {
    name: "Whale Oracle",
    price: "₽29",
    priceDetail: "/month",
    icon: "🐋",
    color: "border-border",
    features: [
      "+20,000 Oracles monthly",
      "Create your own predictions",
      "Premium charts & analytics",
      "Exclusive Whale badge 🐋",
      "Double prize pool eligibility",
      "Discord access",
    ],
    cta: "Get This Power-Up",
    highlight: false,
  },
];

const PricingPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
          Power-Ups ⚡
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Level up your forecasting game. Subscriptions support the game and fund tournament prize pools — not pay-to-win.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier, i) => (
          <motion.div
            key={i}
            className={`rounded-3xl p-8 border-2 ${tier.color} ${
              tier.highlight ? "bg-primary/5 relative" : "bg-card"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
          >
            {tier.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}
            <div className="text-4xl mb-4">{tier.icon}</div>
            <h3 className="font-display text-xl font-bold mb-2">{tier.name}</h3>
            <div className="mb-6">
              <span className="font-display text-3xl font-bold text-primary">{tier.price}</span>
              <span className="text-muted-foreground text-sm">{tier.priceDetail}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {tier.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-sm">
                  <span className="text-yes mt-0.5">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full btn-game ${
                tier.highlight
                  ? "btn-primary-game"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {tier.cta}
            </button>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-12">
        All subscriptions can be canceled anytime. Prize pools are distributed to top leaderboard performers monthly.
      </p>
    </div>

    <GameFooter />
  </div>
);

export default PricingPage;
