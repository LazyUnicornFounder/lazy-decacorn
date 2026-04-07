
-- Create predictions table
CREATE TABLE public.predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  question TEXT NOT NULL,
  founder_name TEXT NOT NULL,
  founder_photo_url TEXT,
  company_name TEXT NOT NULL,
  description TEXT NOT NULL,
  yes_pool NUMERIC NOT NULL DEFAULT 0,
  no_pool NUMERIC NOT NULL DEFAULT 0,
  volume NUMERIC NOT NULL DEFAULT 0,
  resolution_date DATE NOT NULL,
  resolution_criteria TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved_yes', 'resolved_no')),
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create forecasts table
CREATE TABLE public.forecasts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  prediction_id UUID REFERENCES public.predictions(id) ON DELETE CASCADE NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('yes', 'no')),
  oracles_amount NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS for predictions (public read, no direct write)
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Predictions are viewable by everyone" ON public.predictions FOR SELECT TO public USING (true);

-- RLS for forecasts
ALTER TABLE public.forecasts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all forecasts" ON public.forecasts FOR SELECT TO public USING (true);
CREATE POLICY "Users can insert own forecasts" ON public.forecasts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Enable realtime for forecasts
ALTER PUBLICATION supabase_realtime ADD TABLE public.forecasts;

-- Place forecast function (atomic: deduct balance, insert forecast, update pools)
CREATE OR REPLACE FUNCTION public.place_forecast(
  p_prediction_id UUID,
  p_side TEXT,
  p_amount NUMERIC
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_balance NUMERIC;
  v_status TEXT;
  v_forecast_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN json_build_object('error', 'Not authenticated');
  END IF;

  IF p_side NOT IN ('yes', 'no') THEN
    RETURN json_build_object('error', 'Side must be yes or no');
  END IF;

  IF p_amount < 10 THEN
    RETURN json_build_object('error', 'Minimum bet is 10 Oracles');
  END IF;

  -- Check prediction is open
  SELECT status INTO v_status FROM predictions WHERE id = p_prediction_id;
  IF v_status IS NULL THEN
    RETURN json_build_object('error', 'Prediction not found');
  END IF;
  IF v_status != 'open' THEN
    RETURN json_build_object('error', 'Prediction is closed');
  END IF;

  -- Check balance
  SELECT oracles_balance INTO v_balance FROM profiles WHERE id = v_user_id FOR UPDATE;
  IF v_balance < p_amount THEN
    RETURN json_build_object('error', 'Insufficient Oracles balance');
  END IF;

  -- Deduct balance
  UPDATE profiles SET oracles_balance = oracles_balance - p_amount WHERE id = v_user_id;

  -- Insert forecast
  INSERT INTO forecasts (user_id, prediction_id, side, oracles_amount)
  VALUES (v_user_id, p_prediction_id, p_side, p_amount)
  RETURNING id INTO v_forecast_id;

  -- Update prediction pools
  IF p_side = 'yes' THEN
    UPDATE predictions SET yes_pool = yes_pool + p_amount, volume = volume + p_amount WHERE id = p_prediction_id;
  ELSE
    UPDATE predictions SET no_pool = no_pool + p_amount, volume = volume + p_amount WHERE id = p_prediction_id;
  END IF;

  -- Award XP
  UPDATE profiles SET xp = xp + 10 WHERE id = v_user_id;

  RETURN json_build_object('success', true, 'forecast_id', v_forecast_id);
END;
$$;

-- Seed predictions
INSERT INTO public.predictions (slug, question, founder_name, founder_photo_url, company_name, description, yes_pool, no_pool, volume, resolution_date, resolution_criteria, status, category) VALUES
('pieter-levels-100m', 'Will Pieter Levels'' combined revenue exceed $100M ARR by Dec 31, 2027?', 'Pieter Levels', null, 'Nomad List / Photo AI', 'Pieter Levels is the legendary indie hacker behind Nomad List, Remote OK, and Photo AI.', 800, 1200, 45000, '2027-12-31', 'Combined ARR from all of Pieter''s products must exceed $100M as verified by public revenue data.', 'open', 'Decacorn Race'),
('tony-dinh-10m', 'Will Tony Dinh reach $10M ARR by Dec 31, 2027?', 'Tony Dinh', null, 'TypingMind / BlackMagic.so', 'Tony Dinh builds profitable SaaS products as a solo founder.', 1100, 900, 32000, '2027-12-31', 'Combined ARR from Tony''s products must reach $10M.', 'open', 'MRR Race'),
('marc-lou-5m', 'Will Marc Lou exceed $5M ARR by Dec 31, 2026?', 'Marc Lou', null, 'ShipFast', 'Marc Lou is the king of shipping fast. Known for building and launching products at lightning speed.', 950, 1050, 28000, '2026-12-31', 'Marc Lou''s total ARR across all products exceeds $5M.', 'open', 'MRR Race'),
('daniel-vassallo-5m', 'Will Daniel Vassallo''s portfolio exceed $5M ARR by Dec 31, 2027?', 'Daniel Vassallo', null, 'Small Bets', 'Daniel left Amazon to build a portfolio of small bets. Can the strategy hit $5M ARR?', 1300, 700, 18000, '2027-12-31', 'Daniel''s combined revenue from all products and courses exceeds $5M ARR.', 'open', 'MRR Race'),
('justin-welsh-10m', 'Will Justin Welsh exceed $10M annual revenue by Dec 31, 2027?', 'Justin Welsh', null, 'The Saturday Solopreneur', 'Justin Welsh built a one-person media empire. Can he cross $10M?', 750, 1250, 38000, '2027-12-31', 'Justin''s annual revenue from all sources exceeds $10M.', 'open', 'Decacorn Race'),
('damon-chen-testimonial-10m', 'Will Testimonial.to reach $10M ARR by Dec 31, 2027?', 'Damon Chen', null, 'Testimonial.to', 'Damon Chen''s Testimonial.to helps businesses collect and showcase testimonials.', 1200, 800, 15000, '2027-12-31', 'Testimonial.to''s ARR reaches $10M.', 'open', 'MRR Race'),
('solo-founder-10b-2030', 'Will any solo founder reach $10B valuation by Dec 31, 2030?', 'The Big One', null, 'Any Solo Founder', 'The ultimate prediction: can a solo founder build a $10B company?', 1500, 500, 95000, '2030-12-31', 'Any company with a single founder reaches $10B valuation through verified funding or public markets.', 'open', 'Decacorn Race'),
('solo-founder-10b-2032', 'Will a solo founder reach $10B valuation by Dec 31, 2032?', 'The Long Game', null, 'Any Solo Founder', 'A longer timeline for the ultimate solo founder milestone.', 1100, 900, 42000, '2032-12-31', 'Any solo-founded company reaches $10B valuation.', 'open', 'Decacorn Race'),
('solo-founder-1b-2028', 'Will a solo founder reach $1B valuation by Dec 31, 2028?', 'Unicorn Race', null, 'Any Solo Founder', 'Can a solo founder join the unicorn club by 2028?', 600, 1400, 67000, '2028-12-31', 'Any solo-founded company reaches $1B valuation.', 'open', 'Unicorn Race'),
('ai-founder-1b-2028', 'Will an AI-focused solo founder reach $1B by Dec 31, 2028?', 'AI Wild Card', null, 'AI Founder TBD', 'With AI changing everything, could a solo AI founder build a billion-dollar company?', 850, 1150, 53000, '2028-12-31', 'A solo founder building primarily AI products reaches $1B valuation.', 'open', 'Unicorn Race'),
('ben-tossell-10m', 'Will Ben Tossell''s ventures exceed $10M ARR by Dec 31, 2028?', 'Ben Tossell', null, 'Ben''s Bites / Makerpad', 'Ben Tossell built Makerpad (acquired by Zapier) and runs Ben''s Bites, the biggest AI newsletter.', 900, 1100, 41000, '2028-12-31', 'Ben Tossell''s combined revenue from all ventures exceeds $10M ARR.', 'open', 'MRR Race'),
('sean-dorje-naive-1b', 'Will Naive (usenaive.ai) reach $1B valuation by Dec 31, 2029?', 'Sean Dorje', null, 'Naive (YC S25)', 'Sean Dorje is building Naive, an autonomous company runtime that deploys AI employees. Backed by Y Combinator.', 700, 1300, 35000, '2029-12-31', 'Naive reaches $1B valuation through verified funding or public markets.', 'open', 'Y Combinator Race'),
('ramen-race-first-5k', 'Will a new solo founder hit $5K MRR within 6 months of launch by Dec 31, 2026?', 'Ramen Challenge', null, 'Any New Founder', 'The first milestone: can a brand-new solo founder reach ramen profitability in just 6 months?', 600, 400, 12000, '2026-12-31', 'A solo founder who launched after Jan 1 2026 reaches $5K MRR within 6 months.', 'open', 'Ramen Profitable Race'),
('ramen-race-bootstrapped-1k', 'Will 10+ solo founders cross $1K MRR on Lazy Decacorn by Dec 31, 2026?', 'The $1K Club', null, 'Community Milestone', 'Can the Lazy Decacorn community produce 10 founders who cross ramen profitability?', 800, 200, 9000, '2026-12-31', 'At least 10 founders on the platform reach $1K MRR.', 'open', 'Ramen Profitable Race'),
('100m-arr-solo-founder', 'Will any solo founder reach $100M ARR by Dec 31, 2030?', 'The $100M Bet', null, 'Any Solo Founder', 'The ultimate revenue milestone — can a one-person company hit $100M in recurring revenue?', 500, 1500, 78000, '2030-12-31', 'Any solo-founded company reaches $100M ARR as verified by public revenue data.', 'open', '$100M ARR Race'),
('100m-arr-pieter-levels', 'Will Pieter Levels be the first solo founder to $100M ARR?', 'Pieter Levels', null, 'Nomad List / Photo AI', 'Already the highest-earning indie hacker — can Pieter be first to the $100M mark?', 1200, 800, 55000, '2030-12-31', 'Pieter Levels'' combined ARR reaches $100M before any other solo founder.', 'open', '$100M ARR Race'),
('ipo-solo-founder-2030', 'Will a solo-founded company IPO by Dec 31, 2030?', 'IPO Watch', null, 'Any Solo Founder', 'Has a solo founder ever rung the opening bell? Predict if it happens this decade.', 400, 1600, 62000, '2030-12-31', 'A company with a single founder completes an IPO on a major stock exchange.', 'open', 'IPO Race'),
('ipo-ai-solo-founder', 'Will an AI-focused solo founder IPO before any other solo founder?', 'AI IPO First?', null, 'AI Founder TBD', 'AI companies are moving fast — will the first solo-founder IPO come from an AI startup?', 700, 1300, 44000, '2032-12-31', 'The first solo-founded company to IPO is primarily an AI company.', 'open', 'IPO Race'),
('acquisition-100m-2028', 'Will a solo-founded company be acquired for $100M+ by Dec 31, 2028?', 'Big Exit', null, 'Any Solo Founder', 'Makerpad sold to Zapier — can a solo founder land an even bigger exit?', 900, 1100, 38000, '2028-12-31', 'A solo-founded company is acquired for $100M+ as reported by credible sources.', 'open', 'Acquisition Race'),
('acquisition-1b-2030', 'Will a solo-founded company be acquired for $1B+ by Dec 31, 2030?', 'Billion-Dollar Exit', null, 'Any Solo Founder', 'The ultimate acquisition — can a one-person company command a billion-dollar buyout?', 300, 1700, 71000, '2030-12-31', 'A solo-founded company is acquired for $1B+ as verified by public reporting.', 'open', 'Acquisition Race');
