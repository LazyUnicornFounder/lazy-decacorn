import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const usePlaceForecast = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      predictionId,
      side,
      amount,
    }: {
      predictionId: string;
      side: "yes" | "no";
      amount: number;
    }) => {
      const { data, error } = await supabase.rpc("place_forecast", {
        p_prediction_id: predictionId,
        p_side: side,
        p_amount: amount,
      });
      if (error) throw error;
      const result = data as { success?: boolean; error?: string; forecast_id?: string };
      if (result.error) throw new Error(result.error);
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Prediction locked in! 🔮",
        description: "Your forecast has been placed. Good luck!",
      });
      queryClient.invalidateQueries({ queryKey: ["predictions"] });
      queryClient.invalidateQueries({ queryKey: ["prediction"] });
      queryClient.invalidateQueries({ queryKey: ["forecasts"] });
      queryClient.invalidateQueries({ queryKey: ["my-forecasts"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Couldn't place forecast",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
