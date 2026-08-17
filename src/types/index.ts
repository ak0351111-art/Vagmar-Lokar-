export type NavSection = 'heritage' | 'studio' | 'locker' | 'tracker';

export interface WoolFiber {
  id: string;
  name: string;
  marathiName: string;
  origin: string;
  micronCount: string;
  micronNumeric: number; // For sorting & filtering
  grade: string;
  stapleLength: string;
  crimpHarvest: string;
  lanolinContent: string;
  waterRepellency: number; // 1 to 5
  thermalWarmth: number; // 1 to 5
  softnessScore: number; // 1 to 5
  durabilityScore: number; // 1 to 5
  pastoralCommunity: string;
  regionDescription: string;
  traditionalUses: string[];
  bestNeedleSizes: string;
  primaryDyeAffinities: string[];
  careInstructions: string;
  imageAccentColor: string;
  badge: string;
}

export type StitchType = 'K' | 'P' | 'YO' | 'CL' | 'CR' | 'SL';

export interface StitchInfo {
  code: StitchType;
  name: string;
  symbol: string;
  description: string;
  colorClass: string;
}

export type LockerCategory = 'stash' | 'patterns' | 'formulas' | 'logs' | 'certificates';

export interface LockerItem {
  id: string;
  title: string;
  category: LockerCategory;
  content: string;
  tags: string[];
  yarnBrand?: string;
  colorway?: string;
  quantitySkeins?: number;
  needleSize?: string;
  isLockedWithPin: boolean;
  isFavorite: boolean;
  createdAt: string;
}

export interface ActiveProject {
  id: string;
  title: string;
  craftType: 'Knitting' | 'Crochet' | 'Pit Loom / Handloom' | 'Felting';
  targetRows: number;
  currentRows: number;
  yarnUsed: string;
  needleHook: string;
  notes: string;
  progressPercent: number;
  isCompleted: boolean;
}

export interface NeedleGaugeSpec {
  metricMm: string;
  usSize: string;
  ukSize: string;
  recommendedYarnWeight: string;
  stitchesPer10Cm: string;
}
