import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import GameFooter from "@/components/GameFooter";
import PredictionCard from "@/components/PredictionCard";
import Leaderbox from "@/components/Leaderbox";
import { predictions, categories } from "@/lib/mockData";

const PredictionsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = predictions.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory ||
      (activeCategory === "Results" && p.status !== "open");
    const matchSearch = p.founder_name.toLowerCase().includes(search.toLowerCase()) ||
      p.question.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Headline */}
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-6 max-w-2xl">
          The prediction game for <span className="text-primary">solo founders</span> on their way to building{" "}
          <span className="text-gradient-primary">$10 billion decacorns</span>, and beyond.
        </h1>

        {/* Leaderbox + How It Works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Leaderbox />
          <div className="card-game col-span-1 row-span-2 p-6 flex flex-col" id="how-to-play">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <h2 className="font-display text-lg font-bold">How It Works</h2>
            </div>
            <div className="flex flex-col gap-4 text-sm text-muted-foreground flex-1">
              <p>
                Lazy Decacorn is made for solo founders — just sign up, add your X account, and let people see what you're building so they can place predictions on your journey.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <span className="bg-primary/10 text-primary rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <div>
                    <p className="font-semibold text-foreground">Sign Up & Connect</p>
                    <p>Create your account and link your X profile so the community can follow your progress.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary/10 text-primary rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <div>
                    <p className="font-semibold text-foreground">Place Predictions</p>
                    <p>Use your play-money Oracles to bet on whether founders will hit their milestones.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary/10 text-primary rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">3</span>
                  <div>
                    <p className="font-semibold text-foreground">Climb the Leaderboard</p>
                    <p>Earn XP, level up, and prove you can spot the next decacorn before anyone else.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search founders or predictions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md bg-card border border-border rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
          />
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <PredictionCard key={p.id} category={p.category} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-display text-lg">No predictions found</p>
          </div>
        )}
      </div>

      <GameFooter />
    </div>
  );
};

export default PredictionsPage;
