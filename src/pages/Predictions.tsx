import { useState } from "react";
import Navbar from "@/components/Navbar";
import GameFooter from "@/components/GameFooter";
import PredictionCard from "@/components/PredictionCard";
import Leaderbox from "@/components/Leaderbox";
import { usePredictions } from "@/hooks/usePredictions";
import { categories } from "@/lib/mockData";

const PredictionsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { data: predictions = [], isLoading } = usePredictions();

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
                Lazy Decacorn is where solo founders race to hit massive milestones — and the crowd predicts who'll make it.
              </p>

              <div>
                <p className="font-semibold text-foreground mb-2">🚀 For Founders</p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-primary/10 text-primary rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                    <div>
                      <p className="font-semibold text-foreground">Pick a Race</p>
                      <p>Choose your milestone — MRR, Unicorn, Decacorn, or YC Race.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-primary/10 text-primary rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                    <div>
                      <p className="font-semibold text-foreground">Enter & Build in Public</p>
                      <p>Link your X account and let the community follow your journey to the top.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">🔮 For Predictors</p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-accent/20 text-accent-foreground rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                    <div>
                      <p className="font-semibold text-foreground">Place Predictions</p>
                      <p>Use play-money Oracles to bet on which founders will hit their milestones.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-accent/20 text-accent-foreground rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                    <div>
                      <p className="font-semibold text-foreground">Climb the Leaderboard</p>
                      <p>Earn XP, level up, and prove you can spot the next decacorn before anyone else.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">🏆 Prizes</p>
                <div className="flex flex-col gap-2 text-sm">
                  <p>Win predictions and earn Decacorns (₽). Top predictors each season win exclusive Power-Ups, badges, and leaderboard glory. The better your calls, the bigger your rewards.</p>
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
        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-4xl mb-3">🔮</p>
            <p className="font-display text-lg">Loading predictions...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <PredictionCard key={p.id} prediction={p} index={i} />
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
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
