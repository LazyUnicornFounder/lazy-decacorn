import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Prediction } from "@/lib/mockData";

const PredictionCard = ({ prediction, index = 0 }: { prediction: Prediction; index?: number }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Link to={`/predict/${prediction.slug}`} className="block card-game p-5 h-full">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          {prediction.founder_photo_url ? (
            <img
              src={prediction.founder_photo_url}
              alt={prediction.founder_name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-primary/20"
            />
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-xl">
              🔮
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm truncate">{prediction.founder_name}</p>
            <p className="text-xs text-muted-foreground">{prediction.company_name}</p>
          </div>
          <span className="game-badge text-[10px]">{prediction.category}</span>
        </div>

        {/* Question */}
        <h3 className="font-display font-semibold text-sm leading-snug mb-4 line-clamp-2">
          {prediction.question}
        </h3>

      </Link>
    </motion.div>
  );
};

export default PredictionCard;
