import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import GameFooter from "@/components/GameFooter";
import PredictionCard from "@/components/PredictionCard";
import { predictions, categories } from "@/lib/mockData";

const PredictionsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = predictions.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory ||
      (activeCategory === "Resolved" && p.status !== "open");
    const matchSearch = p.founder_name.toLowerCase().includes(search.toLowerCase()) ||
      p.question.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

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
            <PredictionCard key={p.id} prediction={p} index={i} />
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
