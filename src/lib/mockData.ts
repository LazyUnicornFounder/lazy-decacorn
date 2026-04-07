import pieterImg from '@/assets/founders/pieter-levels.jpg';
import tonyImg from '@/assets/founders/tony-dinh.jpg';
import marcImg from '@/assets/founders/marc-lou.png';
import danielImg from '@/assets/founders/daniel-vassallo.jpg';
import justinImg from '@/assets/founders/justin-welsh.jpg';
import damonImg from '@/assets/founders/damon-chen.jpg';
import benImg from '@/assets/founders/ben-tossell.jpg';
import seanImg from '@/assets/founders/sean-dorje.jpg';
import theBigOneImg from '@/assets/the-big-one.png';
import theLongGameImg from '@/assets/the-long-game.png';
import unicornRaceImg from '@/assets/unicorn-race.png';
import aiWildCardImg from '@/assets/ai-wild-card.png';

export interface Prediction {
  id: string;
  slug: string;
  question: string;
  founder_name: string;
  founder_photo_url: string;
  company_name: string;
  description: string;
  yes_pool: number;
  no_pool: number;
  volume: number;
  resolution_date: string;
  resolution_criteria: string;
  status: 'open' | 'resolved_yes' | 'resolved_no';
  category: string;
  created_at: string;
}

export interface LeaderboardEntry {
  rank: number;
  display_name: string;
  avatar_url: string;
  level: number;
  oracles_balance: number;
  win_rate: number;
  streak_days: number;
  total_predictions: number;
}

export interface Forecast {
  id: string;
  user_name: string;
  user_avatar: string;
  side: 'yes' | 'no';
  oracles: number;
  created_at: string;
}

export const crowdBelief = (p: Prediction) =>
  Math.round((p.no_pool / (p.yes_pool + p.no_pool)) * 100);

export const forecasterCount = (p: Prediction) =>
  Math.round(p.volume / 50);

export const daysUntil = (date: string) => {
  const diff = new Date(date).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

export const predictions: Prediction[] = [
  {
    id: '1',
    slug: 'pieter-levels-100m',
    question: 'Will Pieter Levels\' combined revenue exceed $100M ARR by Dec 31, 2027?',
    founder_name: 'Pieter Levels',
    founder_photo_url: pieterImg,
    company_name: 'Nomad List / Photo AI',
    description: 'Pieter Levels is the legendary indie hacker behind Nomad List, Remote OK, and Photo AI.',
    yes_pool: 800,
    no_pool: 1200,
    volume: 45000,
    resolution_date: '2027-12-31',
    resolution_criteria: 'Combined ARR from all of Pieter\'s products must exceed $100M as verified by public revenue data.',
    status: 'open',
    category: 'Decacorn Race',
    created_at: '2024-01-15',
  },
  {
    id: '2',
    slug: 'tony-dinh-10m',
    question: 'Will Tony Dinh reach $10M ARR by Dec 31, 2027?',
    founder_name: 'Tony Dinh',
    founder_photo_url: tonyImg,
    company_name: 'TypingMind / BlackMagic.so',
    description: 'Tony Dinh builds profitable SaaS products as a solo founder.',
    yes_pool: 1100,
    no_pool: 900,
    volume: 32000,
    resolution_date: '2027-12-31',
    resolution_criteria: 'Combined ARR from Tony\'s products must reach $10M.',
    status: 'open',
    category: 'MRR Race',
    created_at: '2024-02-01',
  },
  {
    id: '3',
    slug: 'marc-lou-5m',
    question: 'Will Marc Lou exceed $5M ARR by Dec 31, 2026?',
    founder_name: 'Marc Lou',
    founder_photo_url: marcImg,
    company_name: 'ShipFast',
    description: 'Marc Lou is the king of shipping fast. Known for building and launching products at lightning speed.',
    yes_pool: 950,
    no_pool: 1050,
    volume: 28000,
    resolution_date: '2026-12-31',
    resolution_criteria: 'Marc Lou\'s total ARR across all products exceeds $5M.',
    status: 'open',
    category: 'MRR Race',
    created_at: '2024-01-20',
  },
  {
    id: '4',
    slug: 'daniel-vassallo-5m',
    question: 'Will Daniel Vassallo\'s portfolio exceed $5M ARR by Dec 31, 2027?',
    founder_name: 'Daniel Vassallo',
    founder_photo_url: danielImg,
    company_name: 'Small Bets',
    description: 'Daniel left Amazon to build a portfolio of small bets. Can the strategy hit $5M ARR?',
    yes_pool: 1300,
    no_pool: 700,
    volume: 18000,
    resolution_date: '2027-12-31',
    resolution_criteria: 'Daniel\'s combined revenue from all products and courses exceeds $5M ARR.',
    status: 'open',
    category: 'MRR Race',
    created_at: '2024-03-01',
  },
  {
    id: '5',
    slug: 'justin-welsh-10m',
    question: 'Will Justin Welsh exceed $10M annual revenue by Dec 31, 2027?',
    founder_name: 'Justin Welsh',
    founder_photo_url: justinImg,
    company_name: 'The Saturday Solopreneur',
    description: 'Justin Welsh built a one-person media empire. Can he cross $10M?',
    yes_pool: 750,
    no_pool: 1250,
    volume: 38000,
    resolution_date: '2027-12-31',
    resolution_criteria: 'Justin\'s annual revenue from all sources exceeds $10M.',
    status: 'open',
    category: 'Decacorn Race',
    created_at: '2024-02-15',
  },
  {
    id: '6',
    slug: 'damon-chen-testimonial-10m',
    question: 'Will Testimonial.to reach $10M ARR by Dec 31, 2027?',
    founder_name: 'Damon Chen',
    founder_photo_url: damonImg,
    company_name: 'Testimonial.to',
    description: 'Damon Chen\'s Testimonial.to helps businesses collect and showcase testimonials.',
    yes_pool: 1200,
    no_pool: 800,
    volume: 15000,
    resolution_date: '2027-12-31',
    resolution_criteria: 'Testimonial.to\'s ARR reaches $10M.',
    status: 'open',
    category: 'MRR Race',
    created_at: '2024-03-15',
  },
  {
    id: '7',
    slug: 'solo-founder-10b-2030',
    question: 'Will any solo founder reach $10B valuation by Dec 31, 2030?',
    founder_name: 'The Big One',
    founder_photo_url: theBigOneImg,
    company_name: 'Any Solo Founder',
    description: 'The ultimate prediction: can a solo founder build a $10B company?',
    yes_pool: 1500,
    no_pool: 500,
    volume: 95000,
    resolution_date: '2030-12-31',
    resolution_criteria: 'Any company with a single founder reaches $10B valuation through verified funding or public markets.',
    status: 'open',
    category: 'Decacorn Race',
    created_at: '2024-01-01',
  },
  {
    id: '8',
    slug: 'solo-founder-10b-2032',
    question: 'Will a solo founder reach $10B valuation by Dec 31, 2032?',
    founder_name: 'The Long Game',
    founder_photo_url: theLongGameImg,
    company_name: 'Any Solo Founder',
    description: 'A longer timeline for the ultimate solo founder milestone.',
    yes_pool: 1100,
    no_pool: 900,
    volume: 42000,
    resolution_date: '2032-12-31',
    resolution_criteria: 'Any solo-founded company reaches $10B valuation.',
    status: 'open',
    category: 'Decacorn Race',
    created_at: '2024-01-01',
  },
  {
    id: '9',
    slug: 'solo-founder-1b-2028',
    question: 'Will a solo founder reach $1B valuation by Dec 31, 2028?',
    founder_name: 'Unicorn Race',
    founder_photo_url: unicornRaceImg,
    company_name: 'Any Solo Founder',
    description: 'Can a solo founder join the unicorn club by 2028?',
    yes_pool: 600,
    no_pool: 1400,
    volume: 67000,
    resolution_date: '2028-12-31',
    resolution_criteria: 'Any solo-founded company reaches $1B valuation.',
    status: 'open',
    category: 'Unicorn Race',
    created_at: '2024-01-01',
  },
  {
    id: '10',
    slug: 'ai-founder-1b-2028',
    question: 'Will an AI-focused solo founder reach $1B by Dec 31, 2028?',
    founder_name: 'AI Wild Card',
    founder_photo_url: aiWildCardImg,
    company_name: 'AI Founder TBD',
    description: 'With AI changing everything, could a solo AI founder build a billion-dollar company?',
    yes_pool: 850,
    no_pool: 1150,
    volume: 53000,
    resolution_date: '2028-12-31',
    resolution_criteria: 'A solo founder building primarily AI products reaches $1B valuation.',
    status: 'open',
    category: 'Unicorn Race',
    created_at: '2024-02-01',
  },
  {
    id: '11',
    slug: 'ben-tossell-10m',
    question: 'Will Ben Tossell\'s ventures exceed $10M ARR by Dec 31, 2028?',
    founder_name: 'Ben Tossell',
    founder_photo_url: benImg,
    company_name: 'Ben\'s Bites / Makerpad',
    description: 'Ben Tossell built Makerpad (acquired by Zapier) and runs Ben\'s Bites, the biggest AI newsletter.',
    yes_pool: 900,
    no_pool: 1100,
    volume: 41000,
    resolution_date: '2028-12-31',
    resolution_criteria: 'Ben Tossell\'s combined revenue from all ventures exceeds $10M ARR.',
    status: 'open',
    category: 'MRR Race',
    created_at: '2024-03-01',
  },
  {
    id: '12',
    slug: 'sean-dorje-naive-1b',
    question: 'Will Naive (usenaive.ai) reach $1B valuation by Dec 31, 2029?',
    founder_name: 'Sean Dorje',
    founder_photo_url: seanImg,
    company_name: 'Naive (YC S25)',
    description: 'Sean Dorje is building Naive, an autonomous company runtime that deploys AI employees. Backed by Y Combinator.',
    yes_pool: 700,
    no_pool: 1300,
    volume: 35000,
    resolution_date: '2029-12-31',
    resolution_criteria: 'Naive reaches $1B valuation through verified funding or public markets.',
    status: 'open',
    category: 'Unicorn Race',
    created_at: '2024-03-15',
  },
];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, display_name: 'OracleKing', avatar_url: '', level: 24, oracles_balance: 48500, win_rate: 78, streak_days: 23, total_predictions: 156 },
  { rank: 2, display_name: 'FounderWhisperer', avatar_url: '', level: 21, oracles_balance: 41200, win_rate: 72, streak_days: 15, total_predictions: 134 },
  { rank: 3, display_name: 'CrystalBallPro', avatar_url: '', level: 19, oracles_balance: 37800, win_rate: 69, streak_days: 8, total_predictions: 198 },
  { rank: 4, display_name: 'StartupSage', avatar_url: '', level: 18, oracles_balance: 33100, win_rate: 67, streak_days: 12, total_predictions: 112 },
  { rank: 5, display_name: 'IndiePredictor', avatar_url: '', level: 16, oracles_balance: 28900, win_rate: 65, streak_days: 5, total_predictions: 89 },
  { rank: 6, display_name: 'TechOracle99', avatar_url: '', level: 15, oracles_balance: 25400, win_rate: 63, streak_days: 3, total_predictions: 201 },
  { rank: 7, display_name: 'FutureSeer', avatar_url: '', level: 14, oracles_balance: 22800, win_rate: 61, streak_days: 7, total_predictions: 76 },
  { rank: 8, display_name: 'BullishOnIndie', avatar_url: '', level: 13, oracles_balance: 19500, win_rate: 59, streak_days: 0, total_predictions: 145 },
  { rank: 9, display_name: 'SoloFounderFan', avatar_url: '', level: 12, oracles_balance: 17200, win_rate: 57, streak_days: 4, total_predictions: 67 },
  { rank: 10, display_name: 'PredictionNinja', avatar_url: '', level: 11, oracles_balance: 15100, win_rate: 55, streak_days: 1, total_predictions: 93 },
];

export const recentForecasts: Forecast[] = [
  { id: '1', user_name: 'OracleKing', user_avatar: '', side: 'yes', oracles: 500, created_at: '2024-03-15T10:30:00Z' },
  { id: '2', user_name: 'CrystalBallPro', user_avatar: '', side: 'no', oracles: 200, created_at: '2024-03-15T09:15:00Z' },
  { id: '3', user_name: 'StartupSage', user_avatar: '', side: 'yes', oracles: 1000, created_at: '2024-03-15T08:45:00Z' },
  { id: '4', user_name: 'IndiePredictor', user_avatar: '', side: 'yes', oracles: 300, created_at: '2024-03-14T22:00:00Z' },
  { id: '5', user_name: 'FutureSeer', user_avatar: '', side: 'no', oracles: 750, created_at: '2024-03-14T18:30:00Z' },
];

export const categories = ['All', 'MRR Race', 'Unicorn Race', 'Decacorn Race', 'Resolved'];

export const achievements = [
  { id: 'first-prediction', name: 'First Prediction', description: 'Make your first forecast', icon: '🔮', unlocked: true },
  { id: 'lucky-streak', name: 'Lucky Streak', description: '5 correct predictions in a row', icon: '🍀', unlocked: false },
  { id: 'crowd-defier', name: 'Crowd Defier', description: 'Win a prediction going against the crowd', icon: '🦁', unlocked: false },
  { id: 'big-caller', name: 'Big Caller', description: 'Back a prediction that swings >20%', icon: '📢', unlocked: true },
  { id: 'whale-watcher', name: 'Whale Watcher', description: 'Back a prediction with >₽5,000', icon: '🐋', unlocked: false },
  { id: 'day-one', name: 'Day One', description: 'Sign up in the first month', icon: '🌟', unlocked: true },
  { id: 'top-10', name: 'Top 10', description: 'Finish a month in the top 10', icon: '🏆', unlocked: false },
];
