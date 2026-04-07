import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import OracleIcon from "@/components/OracleIcon";
import type { DBPrediction } from "@/hooks/usePredictions";
import { crowdBelief, daysUntil } from "@/hooks/usePredictions";

const PredictionCard = ({ prediction, index = 0 }: { prediction: DBPrediction; index?: number }) => {
  const belief = crowdBelief(prediction);
  const days = daysUntil(prediction.resolution_date);

  return (
    <Link to={`/predict/${prediction.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        whileHover={{ y: -4, borderColor: "hsl(var(--primary))" }}
        className="card-game p-5 flex flex-col gap-3 min-h-[220px] cursor-pointer"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          {prediction.founder_photo_url ? (
            <img
              src={prediction.founder_photo_url}
              alt={prediction.founder_name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/20"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg">
              🔮
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm truncate">{prediction.founder_name}</p>
            <p className="text-xs text-muted-foreground truncate">{prediction.company_name}</p>
          </div>
          <span className="game-badge text-[10px] shrink-0">{prediction.category}</span>
        </div>

        {/* Question */}
        <p className="font-display font-bold text-sm leading-snug line-clamp-3">
          {prediction.question}
        </p>

        {/* Belief bar */}
        <div className="mt-auto">
          <div className="flex items-center justify-between text-xs font-bold mb-1">
            <span className="text-yes">{belief}% YES</span>
            <span className="text-no">{100 - belief}% NO</span>
          </div>
          <div className="belief-bar h-2 rounded-full">
            <div className="belief-bar-fill h-full" style={{ width: `${belief}%` }} />
          </div>
        </div>

        {/* Footer stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <OracleIcon className="w-3 h-3" />
            <span>₽{prediction.volume.toLocaleString()}</span>
          </div>
          <span>⏰ {days}d left</span>
        </div>
      </motion.div>
    </Link>
  );
};

export default PredictionCard;
