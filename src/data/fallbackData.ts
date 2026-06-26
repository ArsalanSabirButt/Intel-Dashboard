import { DashboardData } from "../types";

const rawAssets = [
  { id: "bitcoin", rank: 1, symbol: "BTC", name: "Bitcoin", price: 64250, change24h: 1.85, volume24h: 28450000000, marketCap: 1260000000000, valToCap: 0.0225 },
  { id: "ethereum", rank: 2, symbol: "ETH", name: "Ethereum", price: 3480, change24h: 3.12, volume24h: 17210000000, marketCap: 418000000000, valToCap: 0.0411 },
  { id: "tether", rank: 3, symbol: "USDT", name: "Tether", price: 1.00, change24h: 0.02, volume24h: 45100000000, marketCap: 112500000000, valToCap: 0.4009 },
  { id: "binancecoin", rank: 4, symbol: "BNB", name: "BNB", price: 578.40, change24h: 1.12, volume24h: 1450000000, marketCap: 84500000000, valToCap: 0.0171 },
  { id: "solana", rank: 5, symbol: "SOL", name: "Solana", price: 148.50, change24h: 5.45, volume24h: 3450000000, marketCap: 68600000000, valToCap: 0.0502 },
  { id: "ripple", rank: 6, symbol: "XRP", name: "Ripple", price: 0.4950, change24h: 0.25, volume24h: 980000000, marketCap: 27500000000, valToCap: 0.0356 },
  { id: "usd-coin", rank: 7, symbol: "USDC", name: "USD Coin", price: 1.00, change24h: -0.01, volume24h: 6200000000, marketCap: 32800000000, valToCap: 0.1890 },
  { id: "cardano", rank: 8, symbol: "ADA", name: "Cardano", price: 0.3850, change24h: -0.65, volume24h: 280000000, marketCap: 13700000000, valToCap: 0.0204 },
  { id: "dogecoin", rank: 9, symbol: "DOGE", name: "Dogecoin", price: 0.1240, change24h: -1.55, volume24h: 1120000000, marketCap: 18000000000, valToCap: 0.0622 },
  { id: "shiba-inu", rank: 10, symbol: "SHIB", name: "Shiba Inu", price: 0.00001780, change24h: -2.34, volume24h: 420000000, marketCap: 10500000000, valToCap: 0.0400 },
  { id: "toncoin", rank: 11, symbol: "TON", name: "Toncoin", price: 7.25, change24h: 4.85, volume24h: 350000000, marketCap: 17900000000, valToCap: 0.0195 },
  { id: "avalanche-2", rank: 12, symbol: "AVAX", name: "Avalanche", price: 28.40, change24h: 2.15, volume24h: 310000000, marketCap: 11100000000, valToCap: 0.0279 },
  { id: "polkadot", rank: 13, symbol: "DOT", name: "Polkadot", price: 6.25, change24h: -0.85, volume24h: 180000000, marketCap: 8900000000, valToCap: 0.0202 },
  { id: "chainlink", rank: 14, symbol: "LINK", name: "Chainlink", price: 14.20, change24h: 1.85, volume24h: 340000000, marketCap: 8300000000, valToCap: 0.0409 },
  { id: "tron", rank: 15, symbol: "TRX", name: "TRON", price: 0.1220, change24h: 0.45, volume24h: 290000000, marketCap: 10600000000, valToCap: 0.0273 },
  { id: "bitcoin-cash", rank: 16, symbol: "BCH", name: "Bitcoin Cash", price: 385.00, change24h: 0.95, volume24h: 240000000, marketCap: 7600000000, valToCap: 0.0315 },
  { id: "near", rank: 17, symbol: "NEAR", name: "Near Protocol", price: 5.20, change24h: 3.85, volume24h: 290000000, marketCap: 5600000000, valToCap: 0.0517 },
  { id: "polygon", rank: 18, symbol: "MATIC", name: "Polygon", price: 0.58, change24h: -1.25, volume24h: 210000000, marketCap: 5700000000, valToCap: 0.0368 },
  { id: "litecoin", rank: 19, symbol: "LTC", name: "Litecoin", price: 74.50, change24h: 0.15, volume24h: 310000000, marketCap: 5500000000, valToCap: 0.0563 },
  { id: "pepe", rank: 20, symbol: "PEPE", name: "Pepe", price: 0.00001220, change24h: 8.45, volume24h: 980000000, marketCap: 5100000000, valToCap: 0.1921 },
  { id: "uniswap", rank: 21, symbol: "UNI", name: "Uniswap", price: 7.85, change24h: 2.35, volume24h: 170000000, marketCap: 4700000000, valToCap: 0.0361 },
  { id: "aptos", rank: 22, symbol: "APT", name: "Aptos", price: 6.95, change24h: -1.85, volume24h: 120000000, marketCap: 3100000000, valToCap: 0.0387 },
  { id: "internet-computer", rank: 23, symbol: "ICP", name: "Internet Computer", price: 8.25, change24h: -0.55, volume24h: 95000000, marketCap: 3800000000, valToCap: 0.0250 },
  { id: "hedera-hashgraph", rank: 24, symbol: "HBAR", name: "Hedera", price: 0.078, change24h: 1.25, volume24h: 65000000, marketCap: 2800000000, valToCap: 0.0232 },
  { id: "stellar", rank: 25, symbol: "XLM", name: "Stellar", price: 0.095, change24h: -0.15, volume24h: 75000000, marketCap: 2700000000, valToCap: 0.0277 },
  { id: "cosmos", rank: 26, symbol: "ATOM", name: "Cosmos", price: 6.85, change24h: 0.45, volume24h: 130000000, marketCap: 2600000000, valToCap: 0.0500 },
  { id: "ethereum-classic", rank: 27, symbol: "ETC", name: "Ethereum Classic", price: 23.40, change24h: -1.15, volume24h: 140000000, marketCap: 3400000000, valToCap: 0.0411 },
  { id: "render-token", rank: 28, symbol: "RNDR", name: "Render", price: 7.85, change24h: 6.25, volume24h: 210000000, marketCap: 3000000000, valToCap: 0.0700 },
  { id: "filecoin", rank: 29, symbol: "FIL", name: "Filecoin", price: 4.45, change24h: -2.15, volume24h: 110000000, marketCap: 2400000000, valToCap: 0.0458 },
  { id: "the-graph", rank: 30, symbol: "GRT", name: "The Graph", price: 0.185, change24h: 3.15, volume24h: 85000000, marketCap: 1700000000, valToCap: 0.0500 },
  { id: "maker", rank: 31, symbol: "MKR", name: "Maker", price: 2150.00, change24h: -1.25, volume24h: 88500000, marketCap: 1980000000, valToCap: 0.0447 },
  { id: "lido-dao", rank: 32, symbol: "LDO", name: "Lido DAO", price: 1.85, change24h: 2.45, volume24h: 95000000, marketCap: 1600000000, valToCap: 0.0593 },
  { id: "optimism", rank: 33, symbol: "OP", name: "Optimism", price: 1.95, change24h: 1.15, volume24h: 120000000, marketCap: 2100000000, valToCap: 0.0571 },
  { id: "arbitrum", rank: 34, symbol: "ARB", name: "Arbitrum", price: 0.82, change24h: -2.45, volume24h: 160000000, marketCap: 2300000000, valToCap: 0.0695 },
  { id: "immutable-x", rank: 35, symbol: "IMX", name: "Immutable", price: 1.45, change24h: 0.75, volume24h: 55000000, marketCap: 2100000000, valToCap: 0.0261 },
  { id: "sui", rank: 36, symbol: "SUI", name: "Sui", price: 0.88, change24h: 4.15, volume24h: 180000000, marketCap: 2100000000, valToCap: 0.0857 },
  { id: "vechain", rank: 37, symbol: "VET", name: "VeChain", price: 0.024, change24h: -0.95, volume24h: 45000000, marketCap: 1900000000, valToCap: 0.0236 },
  { id: "fantom", rank: 38, symbol: "FTM", name: "Fantom", price: 0.58, change24h: 3.85, volume24h: 115000000, marketCap: 1600000000, valToCap: 0.0718 },
  { id: "theta-token", rank: 39, symbol: "THETA", name: "Theta", price: 1.35, change24h: 0.25, volume24h: 35000000, marketCap: 1300000000, valToCap: 0.0269 },
  { id: "thorchain", rank: 40, symbol: "RUNE", name: "THORChain", price: 4.15, change24h: 1.85, volume24h: 95000000, marketCap: 1400000000, valToCap: 0.0678 },
  { id: "injective-protocol", rank: 41, symbol: "INJ", name: "Injective", price: 21.40, change24h: 2.15, volume24h: 85000000, marketCap: 2000000000, valToCap: 0.0425 },
  { id: "terra-luna", rank: 42, symbol: "LUNC", name: "Terra Classic", price: 0.000085, change24h: -5.15, volume24h: 55000000, marketCap: 500000000, valToCap: 0.1100 },
  { id: "celestia", rank: 43, symbol: "TIA", name: "Celestia", price: 6.25, change24h: 5.45, volume24h: 110000000, marketCap: 1200000000, valToCap: 0.0916 },
  { id: "algorand", rank: 44, symbol: "ALGO", name: "Algorand", price: 0.135, change24h: -0.45, volume24h: 42000000, marketCap: 1100000000, valToCap: 0.0311 },
  { id: "sei-network", rank: 45, symbol: "SEI", name: "Sei", price: 0.35, change24h: 4.25, volume24h: 75000000, marketCap: 1000000000, valToCap: 0.0750 },
  { id: "flow", rank: 46, symbol: "FLOW", name: "Flow", price: 0.62, change24h: 0.15, volume24h: 22000000, marketCap: 900000000, valToCap: 0.0244 },
  { id: "the-sandbox", rank: 47, symbol: "SAND", name: "The Sandbox", price: 0.32, change24h: -1.85, volume24h: 52000000, marketCap: 700000000, valToCap: 0.0742 },
  { id: "decentraland", rank: 48, symbol: "MANA", name: "Decentraland", price: 0.34, change24h: -1.45, volume24h: 48000000, marketCap: 600000000, valToCap: 0.0800 },
  { id: "aave", rank: 49, symbol: "AAVE", name: "Aave", price: 84.50, change24h: 1.95, volume24h: 90000000, marketCap: 1200000000, valToCap: 0.0750 },
  { id: "dogwifhat", rank: 50, symbol: "WIF", name: "dogwifhat", price: 2.15, change24h: 12.45, volume24h: 380000000, marketCap: 2100000000, valToCap: 0.1809 }
];

export const FALLBACK_DASHBOARD_DATA: DashboardData = {
  timeSynced: new Date().toISOString(),
  pairs: [
    { symbol: "BTC/USDT", name: "Bitcoin", price: 64250, change24h: 1.85, low30d: 59120, high30d: 68900, category: "crypto" },
    { symbol: "ETH/USDT", name: "Ethereum", price: 3480, change24h: 3.12, low30d: 3100, high30d: 3820, category: "crypto" },
    { symbol: "BTC.D", name: "BTC Dominance", price: 54.2, change24h: -0.45, low30d: 51.5, high30d: 55.6, category: "dominance" },
    { symbol: "USDT.D", name: "USDT Dominance", price: 5.65, change24h: -1.22, low30d: 5.1, high30d: 6.8, category: "dominance" },
    { symbol: "USDC.D", name: "USDC Dominance", price: 2.15, change24h: -0.85, low30d: 1.9, high30d: 2.5, category: "dominance" },
    { symbol: "TOTAL_MC", name: "Total Crypto Market Cap", price: 2.45, change24h: 1.95, low30d: 2.15, high30d: 2.65, category: "market_cap" },
    { symbol: "BTC_MC", name: "BTC Market Cap", price: 1.26, change24h: 1.52, low30d: 1.15, high30d: 1.35, category: "market_cap" },
    { symbol: "ALT_BTC", name: "Alts / BTC Ratio", price: 0.054, change24h: 1.25, low30d: 0.048, high30d: 0.058, category: "market_cap" },
    { symbol: "ALT_MC", name: "Altcoin Market Cap", price: 1.19, change24h: 2.41, low30d: 1.02, high30d: 1.30, category: "market_cap" },
    { symbol: "M2", name: "US M2 Money Stock", price: 21.05, change24h: 0.04, low30d: 20.6, high30d: 21.3, category: "macro" },
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
  topAssets: rawAssets.map((asset) => {
    const exchanges = ["Binance", "Coinbase", "Kraken", "OKX", "Bybit", "HTX", "Gate.io"].slice(0, 3 + (asset.rank % 4));
    const website = `https://${asset.id || asset.name.toLowerCase().replace(/\s+/g, "")}.org`;
    const ath = asset.price * (1.5 + (asset.rank * 0.05));
    const athDate = "2024-03-14 14:35 UTC";
    const atl = asset.price * (0.001 + (1 / (asset.rank * 10)));
    const atlDate = "2018-12-15 03:10 UTC";
    const circulatingSupply = Math.round(asset.marketCap / asset.price);
    const fdv = asset.price * (circulatingSupply * (1 + (asset.rank * 0.01)));

    return {
      ...asset,
      fdv,
      circulatingSupply,
      totalSupply: circulatingSupply * 1.2,
      maxSupply: circulatingSupply * 1.5,
      treasuryHoldings: Math.round(asset.marketCap * 0.02),
      ath,
      athDate,
      atl,
      atlDate,
      website,
      exchanges,
      holders: [
        { address: `0x${asset.symbol.toLowerCase()}...wallet1`, amount: Math.round(circulatingSupply * 0.05), valueUsd: Math.round(asset.marketCap * 0.05), percentage: 5.0, label: "Protocol Reserve" },
        { address: `0x${asset.symbol.toLowerCase()}...wallet2`, amount: Math.round(circulatingSupply * 0.03), valueUsd: Math.round(asset.marketCap * 0.03), percentage: 3.0, label: "Institutional Custody" },
        { address: `0x${asset.symbol.toLowerCase()}...wallet3`, amount: Math.round(circulatingSupply * 0.01), valueUsd: Math.round(asset.marketCap * 0.01), percentage: 1.0, label: "Top Individual Whale" }
      ],
      unlocks: [
        { date: "Continuous", amount: `${(Math.round(circulatingSupply * 0.001)).toLocaleString()} ${asset.symbol}`, percentage: 0.1, description: "Programmatic emissions and validator fee redistribution pools." }
      ]
    };
  }),
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
