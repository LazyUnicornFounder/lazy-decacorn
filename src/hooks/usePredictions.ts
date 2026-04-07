import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DBPrediction {
  id: string;
  slug: string;
  question: string;
  founder_name: string;
  founder_photo_url: string | null;
  company_name: string;
  description: string;
  yes_pool: number;
  no_pool: number;
  volume: number;
  resolution_date: string;
  resolution_criteria: string;
  status: string;
  category: string;
  created_at: string;
}

export const usePredictions = () => {
  return useQuery({
    queryKey: ["predictions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as DBPrediction[];
    },
  });
};

export const usePrediction = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["prediction", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .eq("slug", slug!)
        .single();
      if (error) throw error;
      return data as DBPrediction;
    },
    enabled: !!slug,
  });
};

export const useForecasts = (predictionId: string | undefined) => {
  return useQuery({
    queryKey: ["forecasts", predictionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forecasts")
        .select("id, side, oracles_amount, created_at, user_id, profiles(display_name, avatar_url)")
        .eq("prediction_id", predictionId!)
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data;
    },
    enabled: !!predictionId,
  });
};

export const useMyForecasts = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["my-forecasts", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forecasts")
        .select("id, side, oracles_amount, created_at, prediction_id, predictions(question, slug, status)")
        .eq("user_id", userId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export const crowdBelief = (p: { yes_pool: number; no_pool: number }) => {
  const total = p.yes_pool + p.no_pool;
  if (total === 0) return 50;
  return Math.round((p.no_pool / total) * 100);
};

export const daysUntil = (date: string) => {
  const diff = new Date(date).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};
