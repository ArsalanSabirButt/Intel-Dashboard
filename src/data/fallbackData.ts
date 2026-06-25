import { DashboardData } from "../types";

export const FALLBACK_DASHBOARD_DATA: DashboardData = {
  timeSynced: new Date().toISOString(),
  pairs: [
    { symbol: "BTC/USDT", name: "Bitcoin", price: 64250, change24h: 1.85, low30d: 59120, high30d: 68900, category: "crypto" },
    { symbol: "ETH/USDT", name: "Ethereum", price: 3480, change24h: 3.12, low30d: 3100, high30d: 3820, category: "crypto" },
    { symbol: "BTC.D", name: "BTC Dominance", price: 54.2, change24h: -0.45, low30d: 51.5, high30d: 55.6, category: "dominance" },
    { symbol: "USDT.D", name: "USDT Dominance", price: 5.65, change24h: -1.22, low30d: 5.1, high30d: 6.8, category: "dominance" },
    { symbol: "USDC.D", name: "USDC Dominance", price: 2.15, change24h: -0.85, low30d: 1.9, high30d: 2.5, category: "dominance" },
    { symbol: "TOTAL_MC", name: "Total Crypto Market Cap", price: 2.45, change24h: 1.95, low30d: 2.15, high30d: 2.65, category: "market_cap" }, // Trillion USD
    { symbol: "BTC_MC", name: "BTC Market Cap", price: 1.26, change24h: 1.52, low30d: 1.15, high30d: 1.35, category: "market_cap" }, // Trillion USD
    { symbol: "ALT_BTC", name: "Alts / BTC Ratio", price: 0.054, change24h: 1.25, low30d: 0.048, high30d: 0.058, category: "market_cap" },
    { symbol: "ALT_MC", name: "Altcoin Market Cap", price: 1.19, change24h: 2.41, low30d: 1.02, high30d: 1.30, category: "market_cap" }, // Trillion USD
    { symbol: "M2", name: "US M2 Money Stock", price: 21.05, change24h: 0.04, low30d: 20.6, high30d: 21.3, category: "macro" }, // Trillion USD
    { symbol: "DXY", name: "US Dollar Index", price: 104.45, change24h: -0.18, low30d: 102.8, high30d: 105.9, category: "macro" },
    { symbol: "GOLD", name: "Gold Price (oz)", price: 4187.33, change24h: 0.32, low30d: 3950, high30d: 4250, category: "macro" },
    { symbol: "SILVER", name: "Silver Price (oz)", price: 65.04, change24h: 0.95, low30d: 58.20, high30d: 69.40, category: "macro" },
    { symbol: "OIL", name: "Crude Oil (WTI)", price: 80.45, change24h: -0.55, low30d: 76.5, high30d: 84.1, category: "macro" },
    { symbol: "SPX", name: "S&P 500 Index", price: 5472.5, change24h: 0.15, low30d: 5120, high30d: 5580, category: "macro" }
  ],
  regime: {
    status: "BULLISH",
    score: 3,
    signals: [
      { name: "MVRV Z-Score Accumulation", status: "BULLISH", weight: 30, reason: "MVRV ratio at 1.84 resides perfectly inside local consolidation corridors, denoting steady spot demand." },
      { name: "US Dollar Consolidation", status: "BULLISH", weight: 20, reason: "DXY structural descent towards 104.4 support releases buying pressure for high-beta assets." },
      { name: "Stablecoin Liquidity Printing", status: "BULLISH", weight: 25, reason: "Consistent stablecoin supply expansion suggests massive sidelined cash starting to deploy." },
      { name: "Derivative Funding Heat", status: "NEUTRAL", weight: 25, reason: "Funding rates remain highly stable (~0.01% - 0.02%), pointing to an absence of dangerous spec retail foam." }
    ]
  },
  topAssets: [
    {
      id: "bitcoin",
      rank: 1,
      symbol: "BTC",
      name: "Bitcoin",
      price: 64250,
      change24h: 1.85,
      volume24h: 28450000000,
      marketCap: 1260000000000,
      valToCap: 0.0225,
      fdv: 1350000000000,
      circulatingSupply: 19710000,
      totalSupply: 19710000,
      maxSupply: 21000000,
      treasuryHoldings: 8450000000,
      ath: 73750,
      athDate: "2024-03-14 14:35 UTC",
      atl: 65.5,
      atlDate: "2013-07-05 06:12 UTC",
      website: "https://bitcoin.org",
      exchanges: ["Binance", "Coinbase", "Kraken", "OKX", "Bybit"],
      holders: [
        { address: "bc1qgd9...ps8ea (MicroStrategy)", amount: 214400, valueUsd: 13775200000, percentage: 1.08, label: "Corporate Treasury" },
        { address: "37XpUHfS...6rP7P (Whale)", amount: 115400, valueUsd: 7414450000, percentage: 0.58, label: "Individual Whale" },
        { address: "1FeexV6b...4f98 (MtGox Era)", amount: 79950, valueUsd: 5136787500, percentage: 0.40, label: "Legacy Address" }
      ],
      unlocks: [
        { date: "N/A", amount: "N/A", percentage: 100, description: "Fully circulating, mined rewards occur dynamically ~10 minutes per block." }
      ]
    },
    {
      id: "ethereum",
      rank: 2,
      symbol: "ETH",
      name: "Ethereum",
      price: 3480,
      change24h: 3.12,
      volume24h: 17210000000,
      marketCap: 418000000000,
      valToCap: 0.0411,
      fdv: 418000000000,
      circulatingSupply: 120150000,
      totalSupply: 120150000,
      maxSupply: 120150000,
      treasuryHoldings: 4250000000,
      ath: 4891,
      athDate: "2021-11-16 08:35 UTC",
      atl: 0.42,
      atlDate: "2015-10-20 18:22 UTC",
      website: "https://ethereum.org",
      exchanges: ["Binance", "Coinbase", "Kraken", "OKX", "Bybit"],
      holders: [
        { address: "0x00000...00000 (Beacon Deposit)", amount: 32540000, valueUsd: 113239200000, percentage: 27.08, label: "Consensus Contract" },
        { address: "0x7a250...f56e (Uniswap V2 Router)", amount: 482000, valueUsd: 1677360000, percentage: 0.40, label: "DEX Protocol Pool" },
        { address: "0xAb580...3451d (Vitalik)", amount: 244000, valueUsd: 849120000, percentage: 0.20, label: "Founder Address" }
      ],
      unlocks: [
        { date: "None", amount: "Staked Rewards", percentage: 27.08, description: "Dynamic programmatic inflation based on active consensus stakers. Fully unlocked." }
      ]
    },
    {
      id: "solana",
      rank: 3,
      symbol: "SOL",
      name: "Solana",
      price: 135.5,
      change24h: 4.88,
      volume24h: 3150000000,
      marketCap: 62450000000,
      valToCap: 0.0504,
      fdv: 78500000000,
      circulatingSupply: 461000000,
      totalSupply: 578000000,
      maxSupply: 578000000,
      treasuryHoldings: 880000000,
      ath: 260.06,
      athDate: "2021-11-07 12:00 UTC",
      atl: 0.50,
      atlDate: "2020-05-11 11:15 UTC",
      website: "https://solana.com",
      exchanges: ["Binance", "Coinbase", "Bybit", "OKX", "Kraken"],
      holders: [
        { address: "Solana Foundation Core Custody", amount: 24500000, valueUsd: 3319750000, percentage: 5.31, label: "Protocol Treasury" },
        { address: "FTX/Alameda Liquidating Multi-Sig", amount: 18200000, valueUsd: 2466100000, percentage: 3.95, label: "Bankruptcy Liquidator" },
        { address: "System Staking Custody Pool", amount: 15400000, valueUsd: 2086700000, percentage: 3.34, label: "Institutional Custodian" }
      ],
      unlocks: [
        { date: "Monthly", amount: "Alameda Unlock", percentage: 0.25, description: "Monthly unlocked assets distributed from remaining Alameda bankruptcy lockups." }
      ]
    },
    {
      id: "maker",
      rank: 20,
      symbol: "MKR",
      name: "Maker",
      price: 2150,
      change24h: -1.25,
      volume24h: 88500000,
      marketCap: 1980000000,
      valToCap: 0.0447,
      fdv: 2150000000,
      circulatingSupply: 920000,
      totalSupply: 920000,
      maxSupply: 1000000,
      treasuryHoldings: 185000000,
      ath: 6292,
      athDate: "2021-05-03 14:00 UTC",
      atl: 21.06,
      atlDate: "2017-01-30 08:30 UTC",
      website: "https://makerdao.com",
      exchanges: ["Binance", "Coinbase", "OKX", "Kraken", "Gemini"],
      holders: [
        { address: "0x0A97...MakerDAOTreasury", amount: 84000, valueUsd: 180600000, percentage: 8.4, label: "Maker Governance lockbox" },
        { address: "0x88f...MKRBurnModule", amount: 154000, valueUsd: 331100000, percentage: 15.4, label: "MKR Surplus Auction Burn Engine" },
        { address: "0xcb...a8s3a (VC Group)", amount: 48000, valueUsd: 103200000, percentage: 4.8, label: "Andreesen Horowitz Custody Pool" }
      ],
      unlocks: [
        { date: "Continuous", amount: "Smart-Burn-Engine", percentage: -0.15, description: "Surplus buffer burns MKR programmatically as protocol collateral revenue crosses surplus thresholds." }
      ]
    }
  ],
  derivatives: {
    fundingRates: [
      { symbol: "BTC/USDT", binance: 0.0125, bybit: 0.0150, okx: 0.0118, deribit: 0.0105 },
      { symbol: "ETH/USDT", binance: 0.0210, bybit: 0.0235, okx: 0.0195, deribit: 0.0180 },
      { symbol: "SOL/USDT", binance: 0.0285, bybit: 0.0340, okx: 0.0270, deribit: 0.0215 },
      { symbol: "XRP/USDT", binance: 0.0080, bybit: 0.0095, okx: 0.0075, deribit: 0.0065 },
      { symbol: "BNB/USDT", binance: 0.0150, bybit: 0.0185, okx: 0.0140, deribit: 0.0110 }
    ],
    openInterest: [
      { symbol: "BTC/USDT", oiUsd: 14500000000, change24h: 4.85, longRatio: 51.5, shortRatio: 48.5 },
      { symbol: "ETH/USDT", oiUsd: 8200000000, change24h: 7.12, longRatio: 53.2, shortRatio: 46.8 },
      { symbol: "SOL/USDT", oiUsd: 2100000000, change24h: 12.34, longRatio: 55.8, shortRatio: 44.2 },
      { symbol: "XRP/USDT", oiUsd: 68000000, change24h: -1.45, longRatio: 49.3, shortRatio: 50.7 },
      { symbol: "BNB/USDT", oiUsd: 59000000, change24h: 2.15, longRatio: 50.8, shortRatio: 49.2 }
    ],
    liquidationsHeatmap: [
      { priceLevel: 63500, liquidationVolume: 145000000, type: 'long' },
      { priceLevel: 63800, liquidationVolume: 92000000, type: 'long' },
      { priceLevel: 64100, liquidationVolume: 42000000, type: 'long' },
      { priceLevel: 64500, liquidationVolume: 35000000, type: 'short' },
      { priceLevel: 65200, liquidationVolume: 88000000, type: 'short' },
      { priceLevel: 65800, liquidationVolume: 125000000, type: 'short' }
    ],
    optionsFlow: [
      { strikePrice: 60000, callsOI: 18500, putsOI: 24500, iv: 42.5 },
      { strikePrice: 62000, callsOI: 22000, putsOI: 31000, iv: 41.2 },
      { strikePrice: 64000, callsOI: 48500, putsOI: 19500, iv: 39.8 },
      { strikePrice: 66000, callsOI: 65000, putsOI: 12000, iv: 42.1 },
      { strikePrice: 68000, callsOI: 38000, putsOI: 4500, iv: 44.5 },
      { strikePrice: 70000, callsOI: 52000, putsOI: 1500, iv: 46.8 }
    ]
  },
  onChain: {
    exchangeInflow: 1450,
    exchangeOutflow: 2280,
    netFlow: -830,
    mvrvRatio: 1.84,
    nuplValue: 0.457,
    stablecoinCap: 158.4,
    stablecoinFlow24h: 345,
    whaleWallets: [
      { address: "Bc1qWhale...84u5", label: "BlackRock Label 01", balance: 14250, change24h: 850, timestamp: new Date().toISOString() },
      { address: "Bc1qPrime...98ef", label: "Coinbase Prime Hot", balance: 88410, change24h: -1200, timestamp: new Date().toISOString() },
      { address: "0x771Whale...fd01", label: "Uniswap Whales Core", balance: 34500, change24h: 420, timestamp: new Date().toISOString() }
    ],
    // BTC Network Health & NVT fallback data
    nvtRatio: 58.4,
    activeAddresses24h: 942500,
    hashrateEh: 612.4,
    hashrateChange24h: 1.85,
    transactionVolumeBtc: 245100,
    blockHeight: 848912,
    averageFeeUsd: 4.85
  },
  macro: {
    m2Liquidity: 104.2,
    m2ChangeYoy: 2.15,
    yield3M: 5.23,
    yield2Y: 4.72,
    yield10Y: 4.25,
    realYield10Y: 1.95,
    etfFlows: [
      { fund: "iShares Bitcoin Trust", ticker: "IBIT", dailyInflow: 184.2, cumulativeInflow: 18.2, aum: 19.5 },
      { fund: "Fidelity Wise Origin", ticker: "FBTC", dailyInflow: 42.8, cumulativeInflow: 9.8, aum: 10.5 },
      { fund: "Grayscale Bitcoin Trust", ticker: "GBTC", dailyInflow: -21.5, cumulativeInflow: -18.4, aum: 14.8 },
      { fund: "Bitwise Bitcoin ETF", ticker: "BITB", dailyInflow: 12.1, cumulativeInflow: 2.1, aum: 2.5 }
    ],
    economicCalendar: [
      { time: "June 25, 12:30 UTC", event: "US Core Durable Goods Orders MoM", importance: "MEDIUM", previous: "0.2%", forecast: "0.1%" },
      { time: "June 26, 12:30 UTC", event: "US Personal Consumption Expenditures Index (PCE)", importance: "HIGH", previous: "2.6%", forecast: "2.6%" },
      { time: "July 01, 14:00 UTC", event: "ISM Manufacturing PMI", importance: "HIGH", previous: "48.7", forecast: "49.1" },
      { time: "July 03, 12:30 UTC", event: "US Non-Farm Payrolls (NFP)", importance: "HIGH", previous: "272K", forecast: "185K" }
    ]
  },
  sentiment: {
    fearGreedValue: 64,
    fearGreedClass: "Greed",
    fearGreedRemark: "Moderate investor confidence. Altcoins showing localized momentum as BTC pauses near resistance.",
    tweeterVelocity: [
      { narrative: "Solana ETF Filings", tweetCount24h: 42500, momentumChange: 145 },
      { narrative: "Layer-2 Fee Burn", tweetCount24h: 18400, momentumChange: 85 },
      { narrative: "AI + Crypto Convergent Agents", tweetCount24h: 31200, momentumChange: 110 },
      { narrative: "US Fed Rate Cut Pivots", tweetCount24h: 65100, momentumChange: 25 }
    ],
    newsAggregated: [
      {
        time: "1h ago",
        source: "CoinTelegraph",
        title: "Institutional Ethereum ETF Accumulation Accelerates Over Q1, 13F Filings Confirm",
        sentimentScore: 0.85,
        impactWeight: "HIGH",
        category: "REGULATION & ETFS",
        summary: "Durable regulatory approvals and new filings reveal a dramatic scale-up in sovereign-backed pension funds and large advisory firm allocations. Spot ETH accumulation has exceeded original conservative bank expectations by over 35%.",
        predictedAssetImpact: "ETH: BULLISH (HIGH)"
      },
      {
        time: "3h ago",
        source: "The Block",
        title: "BlackRock Coinbase Wallet Inflows Suggest Continued ETF Creation Activity",
        sentimentScore: 0.65,
        impactWeight: "MEDIUM",
        category: "INSTITUTIONAL FLOWS",
        summary: "On-chain cluster intelligence trackers observed major liquidity minting from institutional-grade prime brokerage vaults straight to BlackRock custody, fueling continuous physical market bid pressure.",
        predictedAssetImpact: "BTC: BULLISH (MODERATE)"
      },
      {
        time: "5h ago",
        source: "Decrypt",
        title: "US Dollar Index Falls Below 104.5 as PCE Price Target Forecast Meets Investor Estimates",
        sentimentScore: 0.75,
        impactWeight: "HIGH",
        category: "MACROECONOMICS",
        summary: "Dovish inflation signals are cooling off the global fiat safe-haven demand. Sinking yields are historically highly correlated with massive capital rotations back into scarce risk assets and digital currencies.",
        predictedAssetImpact: "ALL RISK ASSETS: BULLISH (HIGH)"
      },
      {
        time: "8h ago",
        source: "CoinDesk",
        title: "Bitcoin Exchange Outflows High as In-Memory Spot Buying Drives Squeeze",
        sentimentScore: 0.80,
        impactWeight: "HIGH",
        category: "ON-CHAIN METRICS",
        summary: "Total liquid supply of Bitcoin across top-tier spot exchanges has slumped to multi-year lows. Spot market order books show significant direct-withdrawal patterns, compressing supply side buffers.",
        predictedAssetImpact: "BTC: LIQUIDITY SQUEEZE (HIGH)"
      }
    ]
  },
  cycle: {
    powerLawFairValue: 58900,
    powerLawLowerBand: 48500,
    powerLawUpperBand: 185000,
    mayerMultiple: 1.18,
    piCycleTopValue: 88500,
    piCycleShortMA: 63120,
    piCycleLongMA: 56900,
    halvingCountdownDays: 1380,
    correlations: [
      { assetA: "BTC", assetB: "S&P 500", coefficient: 0.42 },
      { assetA: "BTC", assetB: "DXY", coefficient: -0.68 },
      { assetA: "BTC", assetB: "Gold", coefficient: 0.53 },
      { assetA: "ETH", assetB: "BTC", coefficient: 0.88 }
    ]
  }
};
