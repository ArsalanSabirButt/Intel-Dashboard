export interface MarketPair {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  low30d: number;
  high30d: number;
  category: 'crypto' | 'dominance' | 'market_cap' | 'macro';
}

export interface CoinAsset {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  valToCap: number;
  fdv?: number;
  circulatingSupply?: number;
  totalSupply?: number;
  maxSupply?: number;
  treasuryHoldings?: number;
  ath?: number;
  athDate?: string;
  atl?: number;
  atlDate?: string;
  website?: string;
  exchanges?: string[];
  holders?: { address: string; amount: number; valueUsd: number; percentage: number; label?: string }[];
  unlocks?: { date: string; amount: string; percentage: number; description?: string }[];
}

export interface DerivativesData {
  fundingRates: {
    symbol: string;
    binance: number;
    bybit: number;
    okx: number;
    deribit: number;
  }[];
  openInterest: {
    symbol: string;
    oiUsd: number;
    change24h: number;
    longRatio: number;
    shortRatio: number;
  }[];
  liquidationsHeatmap: {
    priceLevel: number;
    liquidationVolume: number;
    type: 'long' | 'short';
  }[];
  optionsFlow: {
    strikePrice: number;
    callsOI: number;
    putsOI: number;
    iv: number;
  }[];
}

export interface OnChainData {
  exchangeInflow: number; // BTC
  exchangeOutflow: number; // BTC
  netFlow: number; // BTC
  mvrvRatio: number;
  nuplValue: number;
  stablecoinCap: number; // Billion USD
  stablecoinFlow24h: number; // Million USD
  whaleWallets: {
    address: string;
    label: string;
    balance: number;
    change24h: number;
    timestamp: string;
  }[];
  // BTC Network Health & NVT
  nvtRatio: number;
  activeAddresses24h: number;
  hashrateEh: number; // Exahashes per second
  hashrateChange24h: number; // percentage change
  transactionVolumeBtc: number;
  blockHeight: number;
  averageFeeUsd: number;
}

export interface MacroData {
  m2Liquidity: number; // Trillion USD
  m2ChangeYoy: number;
  yield3M: number;
  yield2Y: number;
  yield10Y: number;
  realYield10Y: number;
  etfFlows: {
    fund: string;
    ticker: string;
    dailyInflow: number; // Million USD
    cumulativeInflow: number; // Billion USD
    aum: number; // Billion USD
  }[];
  economicCalendar: {
    time: string;
    event: string;
    importance: 'HIGH' | 'MEDIUM' | 'LOW';
    previous: string;
    forecast: string;
    actual?: string;
  }[];
}

export interface SentimentData {
  fearGreedValue: number;
  fearGreedClass: string;
  fearGreedRemark: string;
  tweeterVelocity: {
    narrative: string;
    tweetCount24h: number;
    momentumChange: number;
  }[];
  newsAggregated: {
    time: string;
    source: string;
    title: string;
    sentimentScore: number; // -1 to +1
    impactWeight: 'HIGH' | 'MEDIUM' | 'LOW';
    category?: string;
    summary?: string;
    predictedAssetImpact?: string;
  }[];
}

export interface CycleData {
  powerLawFairValue: number;
  powerLawLowerBand: number;
  powerLawUpperBand: number;
  mayerMultiple: number;
  piCycleTopValue: number;
  piCycleShortMA: number;
  piCycleLongMA: number;
  halvingCountdownDays: number;
  correlations: {
    assetA: string;
    assetB: string;
    coefficient: number;
  }[];
}

export interface RegimeResult {
  status: 'BULLISH' | 'NEUTRAL' | 'BEARISH';
  score: number;
  signals: {
    name: string;
    status: 'BULLISH' | 'NEUTRAL' | 'BEARISH';
    weight: number;
    reason: string;
  }[];
}

export interface DashboardData {
  timeSynced: string;
  pairs: MarketPair[];
  regime: RegimeResult;
  topAssets: CoinAsset[];
  derivatives: DerivativesData;
  onChain: OnChainData;
  macro: MacroData;
  sentiment: SentimentData;
  cycle: CycleData;
}

export interface AIBrainResult {
  regimeAnalysis: {
    detectedRegime: string;
    probabilityOfShift: number;
    regimeContext: string;
  };
  convergenceScoring: {
    timeframe: string;
    score: number;
    direction: string;
    conviction: 'STRONG' | 'MEDIUM' | 'WEAK';
  }[];
  predictiveInsights: {
    timeframe: string;
    targetRange: string;
    probability: number;
    rationale: string;
  }[];
  tradeIdeas: {
    pair: string;
    direction: 'LONG' | 'SHORT' | 'NEUTRAL';
    entry: string;
    stopLoss: string;
    takeProfit: string;
    riskRewardRatio: string;
  }[];
  stressTestScenarioOutput: {
    scenario: string;
    simulationImpact: string;
    recommendedAssetAllocation: { asset: string; weightPercentage: number }[];
  };
}
