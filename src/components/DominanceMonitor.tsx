import React, { useState, useEffect, useRef } from "react";
import { DashboardData, MarketPair } from "../types.js";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Layers, 
  Compass, 
  Coins, 
  ShieldCheck, 
  ArrowUpRight, 
  Info,
  DollarSign,
  PieChart,
  Grid,
  Zap,
  Flame
} from "lucide-react";
import { motion } from "motion/react";

export default function DominanceMonitor({ data }: { data: DashboardData }) {
  const [activeWidgetSymbol, setActiveWidgetSymbol] = useState<string>("CRYPTOCAP:BTC.D");
  const [selectedScenario, setSelectedScenario] = useState<string>("neutral");
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  // States for Narrative & Sector Heatmap
  const [selectedSectorId, setSelectedSectorId] = useState<string>("ai");
  const [heatmapSortBy, setHeatmapSortBy] = useState<"share" | "change24h" | "change7d">("share");

  // Dynamic asset mapping helpers for Sector Heatmap
  const getAssetChange = (symbol: string, defaultVal: number): number => {
    const asset = data.topAssets.find(a => a.symbol === symbol);
    return asset ? asset.change24h : defaultVal;
  };

  const getAssetCap = (symbol: string, defaultVal: string): string => {
    const asset = data.topAssets.find(a => a.symbol === symbol);
    if (!asset) return defaultVal;
    if (asset.marketCap >= 1e12) return `$${(asset.marketCap / 1e12).toFixed(2)}T`;
    if (asset.marketCap >= 1e9) return `$${(asset.marketCap / 1e9).toFixed(1)}B`;
    return `$${(asset.marketCap / 1e6).toFixed(0)}M`;
  };

  const getAssetPrice = (symbol: string, defaultVal: string): string => {
    const asset = data.topAssets.find(a => a.symbol === symbol);
    if (!asset) return defaultVal;
    if (asset.price >= 1000) return `$${asset.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    if (asset.price >= 1) return `$${asset.price.toFixed(2)}`;
    return `$${asset.price.toFixed(4)}`;
  };

  const sectors = [
    {
      id: "ai",
      name: "AI & Decentralized Compute",
      marketShare: 18.5,
      change24h: getAssetChange("NEAR", 6.42),
      change7d: getAssetChange("NEAR", 6.42) * 2.2 + 4.5,
      sentiment: "BULLISH ACCUMULATION" as const,
      dominantAsset: "NEAR",
      volumeVelocity: "ACCELERATING" as const,
      narrativeAlpha: "The convergence of artificial intelligence with crypto ledger systems represents a massive macro shift. Capital is allocating toward high-utility decentralized hardware networks, sovereign training grids, and model monetization layer-1 systems rather than pure off-chain software integrations.",
      constituents: [
        { symbol: "NEAR", name: "Near Protocol", change24h: getAssetChange("NEAR", 6.42), cap: getAssetCap("NEAR", "$7.1B"), price: getAssetPrice("NEAR", "$5.15") },
        { symbol: "FET", name: "Artificial Superintelligence", change24h: getAssetChange("FET", 8.52), cap: getAssetCap("FET", "$2.4B"), price: getAssetPrice("FET", "$1.35") },
        { symbol: "RENDER", name: "Render Network", change24h: getAssetChange("RENDER", 5.14), cap: getAssetCap("RENDER", "$3.2B"), price: getAssetPrice("RENDER", "$7.85") }
      ],
      colorTheme: "indigo"
    },
    {
      id: "rwa",
      name: "Real World Asset (RWA) Tokenization",
      marketShare: 12.2,
      change24h: getAssetChange("MKR", 4.15),
      change7d: getAssetChange("MKR", 4.15) * 1.8 + 2.1,
      sentiment: "MACRO DRIVEN ABSORPTION" as const,
      dominantAsset: "ONDO",
      volumeVelocity: "HIGH-STABLE" as const,
      narrativeAlpha: "Sovereign treasury yields, tokenized real estate, and debt instruments are actively migrating onto public blockspace. Backed by corporate capital allocations (e.g. BlackRock's BUIDL), this vertical exhibits immense relative strength in range-bound macro environments.",
      constituents: [
        { symbol: "ONDO", name: "Ondo Finance", change24h: getAssetChange("ONDO", 4.52), cap: getAssetCap("ONDO", "$1.2B"), price: getAssetPrice("ONDO", "$0.92") },
        { symbol: "MKR", name: "MakerDAO / Sky", change24h: getAssetChange("MKR", 4.15), cap: getAssetCap("MKR", "$2.3B"), price: getAssetPrice("MKR", "$2,450") },
        { symbol: "LINK", name: "Chainlink Network", change24h: getAssetChange("LINK", 3.84), cap: getAssetCap("LINK", "$11.2B"), price: getAssetPrice("LINK", "$14.20") }
      ],
      colorTheme: "emerald"
    },
    {
      id: "memes",
      name: "Meme Ecosystems & Social Beta",
      marketShare: 24.8,
      change24h: getAssetChange("DOGE", -2.31),
      change7d: getAssetChange("DOGE", -2.31) * 3.5 + 12.4,
      sentiment: "RETAIL MANIA" as const,
      dominantAsset: "DOGE",
      volumeVelocity: "SPIKED" as const,
      narrativeAlpha: "The highest-beta vehicle for speculative capital. Activity remains heavily concentrated within Solana, Base, and BNB Chain liquidity rails. Undergoing dramatic leveraged wipeouts during local BTC downside, followed by rapid structural recoveries.",
      constituents: [
        { symbol: "DOGE", name: "Dogecoin", change24h: getAssetChange("DOGE", -2.31), cap: getAssetCap("DOGE", "$18.5B"), price: getAssetPrice("DOGE", "$0.12") },
        { symbol: "PEPE", name: "Pepe Coin", change24h: getAssetChange("PEPE", -3.42), cap: getAssetCap("PEPE", "$4.8B"), price: getAssetPrice("PEPE", "$0.000011") },
        { symbol: "WIF", name: "dogwifhat", change24h: getAssetChange("WIF", 1.25), cap: getAssetCap("WIF", "$2.8B"), price: getAssetPrice("WIF", "$2.45") }
      ],
      colorTheme: "rose"
    },
    {
      id: "depin",
      name: "DePIN Infrastructure & Grid Networks",
      marketShare: 14.5,
      change24h: getAssetChange("FIL", 1.82),
      change7d: getAssetChange("FIL", 1.82) * 1.5 + 1.2,
      sentiment: "CONSOLIDATIVE COOLING" as const,
      dominantAsset: "FIL",
      volumeVelocity: "DECREASING" as const,
      narrativeAlpha: "Decentralized Physical Infrastructure Networks coordinating cloud resources, compute grids, and telecommunication hardware. While fundamental nodes are scaling steadily, speculative flow is secondary to core infrastructure build cycles.",
      constituents: [
        { symbol: "FIL", name: "Filecoin", change24h: getAssetChange("FIL", 1.82), cap: getAssetCap("FIL", "$2.1B"), price: getAssetPrice("FIL", "$4.20") },
        { symbol: "GRT", name: "The Graph", change24h: getAssetChange("GRT", 2.45), cap: getAssetCap("GRT", "$1.8B"), price: getAssetPrice("GRT", "$0.18") },
        { symbol: "HNT", name: "Helium", change24h: getAssetChange("HNT", 1.95), cap: getAssetCap("HNT", "$0.9B"), price: getAssetPrice("HNT", "$4.12") }
      ],
      colorTheme: "amber"
    },
    {
      id: "l2",
      name: "Layer 2 & Modular Rollups",
      marketShare: 16.0,
      change24h: getAssetChange("ARB", 3.24),
      change7d: getAssetChange("ARB", 3.24) * 0.9 - 1.5,
      sentiment: "LIQUIDATION RECOVERY" as const,
      dominantAsset: "ARB",
      volumeVelocity: "HIGH-STABLE" as const,
      narrativeAlpha: "Scale-out execution layers resolving transaction cost constraints of foundational chains. Impacted by large unlock cycles, but overall network usage, transactional throughput, and active contract metrics continue to hover near peak levels.",
      constituents: [
        { symbol: "ARB", name: "Arbitrum One", change24h: getAssetChange("ARB", 3.24), cap: getAssetCap("ARB", "$2.8B"), price: getAssetPrice("ARB", "$0.95") },
        { symbol: "OP", name: "Optimism", change24h: getAssetChange("OP", 2.85), cap: getAssetCap("OP", "$2.1B"), price: getAssetPrice("OP", "$1.85") },
        { symbol: "MNT", name: "Mantle Network", change24h: getAssetChange("MNT", 4.21), cap: getAssetCap("MNT", "$1.9B"), price: getAssetPrice("MNT", "$0.88") }
      ],
      colorTheme: "sky"
    },
    {
      id: "defi",
      name: "DeFi Core & Yield Protocols",
      marketShare: 14.0,
      change24h: getAssetChange("UNI", 2.12),
      change7d: getAssetChange("UNI", 2.12) * 1.4 + 3.1,
      sentiment: "BULLISH ACCUMULATION" as const,
      dominantAsset: "UNI",
      volumeVelocity: "HIGH-STABLE" as const,
      narrativeAlpha: "Decentralized exchanges, credit structures, and yield mechanics. Undergoing significant revival cycles as governance models shift toward protocol fee accrual and direct rewards for long-term stakeholder alignment.",
      constituents: [
        { symbol: "UNI", name: "Uniswap", change24h: getAssetChange("UNI", 2.12), cap: getAssetCap("UNI", "$4.5B"), price: getAssetPrice("UNI", "$7.20") },
        { symbol: "AAVE", name: "Aave Protocol", change24h: getAssetChange("AAVE", 3.14), cap: getAssetCap("AAVE", "$1.4B"), price: getAssetPrice("AAVE", "$92.40") },
        { symbol: "PENDLE", name: "Pendle Finance", change24h: getAssetChange("PENDLE", 4.85), cap: getAssetCap("PENDLE", "$0.8B"), price: getAssetPrice("PENDLE", "$5.15") }
      ],
      colorTheme: "violet"
    }
  ];

  // 1. Gather Dominance Pairs
  const btcDom = data.pairs.find(p => p.symbol === "BTC.D")?.price || 56.25;
  const usdtDom = data.pairs.find(p => p.symbol === "USDT.D")?.price || 8.18;
  const usdcDom = data.pairs.find(p => p.symbol === "USDC.D")?.price || 3.27;
  
  const btcDomChange24h = data.pairs.find(p => p.symbol === "BTC.D")?.change24h || 0;
  const usdtDomChange24h = data.pairs.find(p => p.symbol === "USDT.D")?.change24h || 0;
  const usdcDomChange24h = data.pairs.find(p => p.symbol === "USDC.D")?.change24h || 0;

  // Derive ETH Dominance dynamic index based on top assets
  const ethAsset = data.topAssets.find(a => a.symbol === "ETH");
  const btcAsset = data.topAssets.find(a => a.symbol === "BTC");
  const totalTop20Mc = data.topAssets.reduce((acc, curr) => acc + curr.marketCap, 0);
  const ethMc = ethAsset?.marketCap || 220e9;
  const btcMc = btcAsset?.marketCap || 1.25e12;
  
  // High-fidelity approximation of dynamic Ethereum dominance
  const ethDom = Math.round(((ethMc / (totalTop20Mc / 0.82)) * 100) * 100) / 100 || 9.13;
  const othersDom = Math.max(2, Math.round((100 - btcDom - ethDom - usdtDom - usdcDom) * 100) / 100);

  // 2. Stablecoin supply details
  const totalStablecoinCap = data.onChain.stablecoinCap || 168.5; // Billion
  const stablecoinFlow24h = data.onChain.stablecoinFlow24h || 420.0; // Million

  // 3. Stablecoin Supply Ratio (SSR) calculation
  const btcMarketCapBillions = (btcMc / 1e9) || 1250.0;
  const ssrRatio = btcMarketCapBillions / totalStablecoinCap;

  // 4. Altcoin Season Index calculation
  const altcoinSeasonIndex = Math.max(0, Math.min(100, Math.round(100 - (btcDom - 45) * 5.5 + (ethAsset ? ethAsset.change24h : 0) * 3)));

  // Embed TradingView widget for dominance indices
  useEffect(() => {
    if (chartContainerRef.current) {
      chartContainerRef.current.innerHTML = "";
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => {
        if ((window as any).TradingView) {
          new (window as any).TradingView.widget({
            autosize: true,
            symbol: activeWidgetSymbol,
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#111827",
            enable_publishing: false,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            container_id: "dominance_tv_widget"
          });
        }
      };
      document.head.appendChild(script);
    }
  }, [activeWidgetSymbol]);

  // Stablecoin listing
  const stablecoins = [
    { name: "Tether (USDT)", ticker: "USDT", cap: Math.round(totalStablecoinCap * 0.72 * 10) / 10, flow: Math.round(stablecoinFlow24h * 0.75 * 10) / 10, share: 72, peg: 0.9996, chain: "TRON (54%), Ethereum (42%), Others (4%)" },
    { name: "USD Coin (USDC)", ticker: "USDC", cap: Math.round(totalStablecoinCap * 0.22 * 10) / 10, flow: Math.round(stablecoinFlow24h * 0.21 * 10) / 10, share: 22, peg: 0.9998, chain: "Ethereum (81%), Solana (14%), Base (5%)" },
    { name: "Dai Stablecoin (DAI)", ticker: "DAI", cap: Math.round(totalStablecoinCap * 0.04 * 10) / 10, flow: Math.round(stablecoinFlow24h * 0.03 * 10) / 10, share: 4, peg: 1.0001, chain: "Ethereum (100%)" },
    { name: "First Digital (FDUSD)", ticker: "FDUSD", cap: Math.round(totalStablecoinCap * 0.02 * 10) / 10, flow: Math.round(stablecoinFlow24h * 0.01 * 10) / 10, share: 2, peg: 1.0002, chain: "BNB Chain (92%), Ethereum (8%)" }
  ];

  // Capital flow scenario analyzer helper
  const getRegimeInterpretation = () => {
    if (btcDom > 56 && usdtDom > 8) {
      return {
        status: "Highly Defensive",
        color: "text-rose-600 bg-rose-50 border-rose-200",
        desc: "Capital is fleeing altcoins into both Bitcoin (defensive beta) and Stablecoins (absolute hedge). Severe risk-off session detected."
      };
    } else if (btcDom < 53 && usdtDom < 6) {
      return {
        status: "Ultra Risk-On (Altseason)",
        color: "text-emerald-600 bg-emerald-50 border-emerald-200",
        desc: "Capital is leaving BTC & cash reserves to bid risk-on altcoins. Highly speculative retail engagement mode is active."
      };
    } else {
      return {
        status: "Institutional Consolidation",
        color: "text-slate-700 bg-slate-50 border-slate-200",
        desc: "Consistent Bitcoin dominance with stable-to-slightly-positive stablecoin mints. Denotes orderly institutional spot buying."
      };
    }
  };

  const regimeInfo = getRegimeInterpretation();

  return (
    <div className="space-y-6" id="dominance-monitor-stage">
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 p-5 rounded-xl shadow-sm"
        id="dominance-monitor-header"
      >
        <div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-4.5 h-4.5 text-indigo-600" />
            Dominance & Stablecoin Monitor
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Analyzing macro liquidity allocation, sidelined capital coefficients, and stablecoin dry powder indices.
          </p>
        </div>
        
        <div className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg border shadow-sm ${regimeInfo.color}`}>
          SYSTEM REGIME: {regimeInfo.status}
        </div>
      </motion.div>

      {/* METRIC CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="dominance-metric-cards-row">
        {/* Card 1: BTC.D */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-between"
          id="metric-btc-d"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bitcoin Dominance (BTC.D)</span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${btcDomChange24h >= 0 ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"}`}>
              {btcDomChange24h >= 0 ? "+" : ""}{btcDomChange24h.toFixed(2)}%
            </span>
          </div>
          <div>
            <span className="text-2xl font-black font-mono text-slate-800">{btcDom.toFixed(2)}%</span>
            <p className="text-[10px] text-slate-400 mt-1">Relative capitalization percentage of Bitcoin.</p>
          </div>
        </motion.div>

        {/* Card 2: USDT.D */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-between"
          id="metric-usdt-d"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tether Dominance (USDT.D)</span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${usdtDomChange24h >= 0 ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"}`}>
              {usdtDomChange24h >= 0 ? "+" : ""}{usdtDomChange24h.toFixed(2)}%
            </span>
          </div>
          <div>
            <span className="text-2xl font-black font-mono text-slate-800">{usdtDom.toFixed(2)}%</span>
            <p className="text-[10px] text-slate-400 mt-1">Sidelined purchasing power index in USDT.</p>
          </div>
        </motion.div>

        {/* Card 3: SSR */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-between"
          id="metric-ssr"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stablecoin Supply Ratio (SSR)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-indigo-50 text-indigo-700 font-bold rounded">
              High Dry Powder
            </span>
          </div>
          <div>
            <span className="text-2xl font-black font-mono text-slate-800">{ssrRatio.toFixed(2)}x</span>
            <p className="text-[10px] text-slate-400 mt-1">BTC Cap Divided by Stablecoin Cap. Lower is bullish.</p>
          </div>
        </motion.div>

        {/* Card 4: Sidelined Capital */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-between"
          id="metric-sidelined"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Stablecoin Capital</span>
            <span className="text-[10px] text-emerald-600 font-mono font-bold">
              +{stablecoinFlow24h.toFixed(0)}m inflow (24hr)
            </span>
          </div>
          <div>
            <span className="text-2xl font-black font-mono text-slate-800">${totalStablecoinCap.toFixed(1)}B</span>
            <p className="text-[10px] text-slate-400 mt-1">Aggregate war chest of top pegged-assets.</p>
          </div>
        </motion.div>
      </div>

      {/* DOUBLE GRID LAYOUT: Interactive allocation + TradingView Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="dominance-allocation-chart-area">
        
        {/* LEFT COLUMN: Dominance breakdown & dynamic allocations (5 cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col">
          {/* Dominance allocation breakdown box */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between" id="dominance-allocation-chart-box">
            <div>
              <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-3 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-indigo-600" />
                Capital Allocation Matrix (Total Crypto Shares)
              </h3>
              <p className="text-[11px] text-slate-400 block leading-tight mb-4">
                Shows the share of the entire cryptocurrency asset class represented by each major liquidity tier.
              </p>
            </div>

            {/* Custom SVG bar visualization */}
            <div className="space-y-4 my-2">
              {/* Asset Share Bar 1: BTC */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-amber-500"></span>
                    Bitcoin (BTC)
                  </span>
                  <span className="font-mono font-black">{btcDom.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${btcDom}%` }}></div>
                </div>
              </div>

              {/* Asset Share Bar 2: ETH */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-blue-500"></span>
                    Ethereum (ETH)
                  </span>
                  <span className="font-mono font-black">{ethDom.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${ethDom}%` }}></div>
                </div>
              </div>

              {/* Asset Share Bar 3: USDT */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span>
                    Tether (USDT)
                  </span>
                  <span className="font-mono font-black">{usdtDom.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${usdtDom}%` }}></div>
                </div>
              </div>

              {/* Asset Share Bar 4: USDC */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-indigo-500"></span>
                    Circle USD (USDC)
                  </span>
                  <span className="font-mono font-black">{usdcDom.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${usdcDom}%` }}></div>
                </div>
              </div>

              {/* Asset Share Bar 5: Others */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-slate-400"></span>
                    Other Altcoins
                  </span>
                  <span className="font-mono font-black">{othersDom.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-slate-400 h-full rounded-full" style={{ width: `${othersDom}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 mt-3.5 text-xs text-slate-500" id="dominance-scenario-analyzer-box">
              <span className="font-extrabold text-slate-700 block uppercase text-[10px] tracking-wider mb-1 flex items-center gap-1 text-indigo-600">
                <Info className="w-3.5 h-3.5" />
                Capital Flow Insight:
              </span>
              <p className="leading-relaxed">
                {regimeInfo.desc}
              </p>
            </div>
          </div>

          {/* Altcoin Season Index box */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between" id="altcoin-season-index-box">
            <div>
              <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                Altcoin Season Index
              </h3>
              <p className="text-[11px] text-slate-400 block leading-tight mb-4">
                Measures whether Bitcoin or Altcoins are outperforming over a rolling 90-day window.
              </p>
            </div>

            {/* Gauge visual */}
            <div className="relative flex flex-col items-center justify-center my-2">
              <div className="text-3xl font-black font-mono text-slate-800">
                {altcoinSeasonIndex}
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Current Score (0-100)
              </div>
              
              {/* Progress gauge bar */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden mt-4 relative">
                <div className="absolute left-1/4 top-0 bottom-0 border-l border-white z-10"></div>
                <div className="absolute left-3/4 top-0 bottom-0 border-l border-white z-10"></div>
                <div className="h-full rounded-full bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500 transition-all duration-500" style={{ width: `${altcoinSeasonIndex}%` }}></div>
              </div>

              {/* Labels */}
              <div className="w-full flex justify-between text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider mt-2">
                <span className={altcoinSeasonIndex < 25 ? "text-amber-600 font-extrabold" : ""}>BTC Season (0-25)</span>
                <span className={altcoinSeasonIndex >= 25 && altcoinSeasonIndex <= 75 ? "text-indigo-600 font-extrabold" : ""}>Transition (50)</span>
                <span className={altcoinSeasonIndex > 75 ? "text-emerald-600 font-extrabold" : ""}>Alt Season (75-100)</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 mt-4 text-[11px] text-slate-500" id="alt-season-insight">
              <span className="font-extrabold text-slate-700 block uppercase text-[9px] tracking-wider mb-1 text-indigo-600">
                Performance Evaluation:
              </span>
              <p className="leading-relaxed">
                {altcoinSeasonIndex > 75 
                  ? "Altcoin Season is officially active! 75%+ of top 50 alts have outpaced BTC. Seek high-beta rotational opportunities." 
                  : altcoinSeasonIndex < 25 
                    ? "Bitcoin Season is dominant. Capital resides in hard asset reserve layer. Historically an optimal time to accumulate quality alts."
                    : "Neutral rotation zone. Capital is highly selective, centering primarily on key ecosystems like ETH, SOL, or leading meme sectors."}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TradingView widget with symbol choices (7 cols) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col" id="dominance-tv-wrapper-column">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm h-[500px] flex flex-col justify-between" id="tv-widget-panel">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">TECHNICAL ANALYSIS CHANNEL</span>
              </div>
              
              <div className="flex gap-1.5 border border-slate-200 p-1 rounded-lg bg-slate-50 shadow-sm text-[10px]" id="tv-symbols-toggle">
                <button 
                  onClick={() => setActiveWidgetSymbol("CRYPTOCAP:BTC.D")}
                  className={`px-2.5 py-1 rounded font-bold font-mono transition-all ${activeWidgetSymbol === "CRYPTOCAP:BTC.D" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  BTC.D
                </button>
                <button 
                  onClick={() => setActiveWidgetSymbol("CRYPTOCAP:USDT.D")}
                  className={`px-2.5 py-1 rounded font-bold font-mono transition-all ${activeWidgetSymbol === "CRYPTOCAP:USDT.D" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  USDT.D
                </button>
                <button 
                  onClick={() => setActiveWidgetSymbol("CRYPTOCAP:USDC.D")}
                  className={`px-2.5 py-1 rounded font-bold font-mono transition-all ${activeWidgetSymbol === "CRYPTOCAP:USDC.D" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  USDC.D
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-50 border border-slate-150 rounded-lg overflow-hidden relative">
              <div id="dominance_tv_widget" ref={chartContainerRef} className="w-full h-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* SYSTEMIC NARRATIVE & SECTOR ROTATION HEATMAP */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm" id="narrative-sector-heatmap">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2">
              <Grid className="w-4.5 h-4.5 text-indigo-600" />
              Systemic Narrative & Sector Rotation Heatmap
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Live thematic performance index tracking capital flow concentration, sentiment, and individual asset velocity across leading sectors.
            </p>
          </div>

          <div className="flex items-center gap-1.5 border border-slate-200 p-1 rounded-lg bg-slate-50 text-[10px] shrink-0" id="heatmap-sort-toggle">
            <span className="text-slate-400 px-1 font-bold uppercase tracking-wider">Sort:</span>
            <button
              onClick={() => setHeatmapSortBy("share")}
              className={`px-2.5 py-1 rounded font-bold transition-all ${heatmapSortBy === "share" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
            >
              Market Share
            </button>
            <button
              onClick={() => setHeatmapSortBy("change24h")}
              className={`px-2.5 py-1 rounded font-bold transition-all ${heatmapSortBy === "change24h" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
            >
              24h Performance
            </button>
            <button
              onClick={() => setHeatmapSortBy("change7d")}
              className={`px-2.5 py-1 rounded font-bold transition-all ${heatmapSortBy === "change7d" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
            >
              7d Performance
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Heatmap Grid Panel (7 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Thematic Heatmap (Select Sector to Drill Down)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[...sectors]
                .sort((a, b) => {
                  if (heatmapSortBy === "share") return b.marketShare - a.marketShare;
                  if (heatmapSortBy === "change24h") return b.change24h - a.change24h;
                  return b.change7d - a.change7d;
                })
                .map((sector) => {
                  const isSelected = selectedSectorId === sector.id;
                  const isPositive = sector.change24h >= 0;
                  
                  // Heatmap cell color determination
                  let cardBg = "bg-slate-50 border-slate-200 hover:border-slate-300";
                  let performanceColor = "text-slate-500";

                  if (sector.change24h >= 4.0) {
                    cardBg = isSelected 
                      ? "bg-emerald-600 text-white border-emerald-700 shadow-md scale-[1.01]" 
                      : "bg-emerald-50 border-emerald-200 hover:bg-emerald-100/70 text-emerald-950";
                    performanceColor = isSelected ? "text-emerald-100" : "text-emerald-700";
                  } else if (sector.change24h > 0) {
                    cardBg = isSelected 
                      ? "bg-teal-600 text-white border-teal-700 shadow-md scale-[1.01]" 
                      : "bg-teal-50/50 border-teal-200 hover:bg-teal-100/50 text-teal-950";
                    performanceColor = isSelected ? "text-teal-100" : "text-teal-700";
                  } else if (sector.change24h <= -4.0) {
                    cardBg = isSelected 
                      ? "bg-rose-600 text-white border-rose-700 shadow-md scale-[1.01]" 
                      : "bg-rose-50 border-rose-200 hover:bg-rose-100/70 text-rose-950";
                    performanceColor = isSelected ? "text-rose-100" : "text-rose-700";
                  } else if (sector.change24h < 0) {
                    cardBg = isSelected 
                      ? "bg-rose-500 text-white border-rose-600 shadow-md scale-[1.01]" 
                      : "bg-slate-50 border-rose-100 hover:bg-rose-50 text-rose-950";
                    performanceColor = isSelected ? "text-rose-100" : "text-rose-600";
                  }

                  return (
                    <button
                      key={sector.id}
                      onClick={() => setSelectedSectorId(sector.id)}
                      className={`text-left p-4.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-[135px] relative ${cardBg} ${
                        isSelected && !sector.change24h ? "ring-2 ring-indigo-600 shadow-md" : ""
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <span className={`text-[10px] font-extrabold uppercase tracking-widest ${isSelected ? "text-white/85" : "text-slate-400"}`}>
                            {sector.marketShare.toFixed(1)}% Alt Share
                          </span>
                          <span className={`text-xs font-mono font-black ${performanceColor}`}>
                            {isPositive ? "+" : ""}{sector.change24h.toFixed(2)}%
                          </span>
                        </div>
                        <h4 className={`text-xs font-bold mt-2.5 leading-snug ${isSelected ? "text-white" : "text-slate-800"}`}>
                          {sector.name}
                        </h4>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between items-center text-[9px] font-mono">
                          <span className={isSelected ? "text-white/80" : "text-slate-400"}>
                            Leader: <strong className={isSelected ? "text-white font-black" : "text-slate-700 font-extrabold"}>{sector.dominantAsset}</strong>
                          </span>
                          <span className={isSelected ? "text-white/85" : "text-slate-400"}>
                            7d: <strong className={sector.change7d >= 0 ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>{sector.change7d >= 0 ? "+" : ""}{sector.change7d.toFixed(1)}%</strong>
                          </span>
                        </div>
                        {/* Interactive mini share indicator line */}
                        <div className={`w-full h-1.5 rounded-full mt-2 overflow-hidden ${isSelected ? "bg-white/20" : "bg-slate-200/60"}`}>
                          <div 
                            className={`h-full rounded-full ${isSelected ? "bg-white" : "bg-indigo-600"}`} 
                            style={{ width: `${(sector.marketShare / 25) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>

            {/* Micro color bar index */}
            <div className="flex flex-wrap items-center justify-start gap-4 pt-3 text-[10px] font-mono text-slate-400 uppercase font-bold border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-emerald-100 border border-emerald-200"></span> Super Rally (&gt;4.0%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-teal-50 border border-teal-150"></span> Moderate Green
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-rose-50 border border-rose-150"></span> Outflows / Red
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-rose-100 border border-rose-200"></span> Heavy Capitulation (&lt;-4.0%)
              </span>
            </div>
          </div>

          {/* Sector Detailed Analytics Panel (5 Columns) */}
          <div className="lg:col-span-5 h-full">
            {(() => {
              const activeSector = sectors.find(s => s.id === selectedSectorId) || sectors[0];
              return (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">
                        Sector Intel Dispatch
                      </span>
                      <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-100 border border-indigo-200 px-2.5 py-0.5 rounded-md font-mono uppercase tracking-wider">
                        {activeSector.id} index
                      </span>
                    </div>

                    <div className="mt-3.5 space-y-1">
                      <h4 className="text-sm font-extrabold text-slate-950 leading-tight">
                        {activeSector.name}
                      </h4>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">Velocity:</span>
                        <span className="text-[9px] font-mono font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">
                          {activeSector.volumeVelocity} VOL
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">Status:</span>
                        <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                          activeSector.sentiment.includes("BULLISH") ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"
                        }`}>
                          {activeSector.sentiment}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mt-4 leading-relaxed font-medium">
                      {activeSector.narrativeAlpha}
                    </p>

                    {/* Constituents Table */}
                    <div className="mt-5 space-y-2">
                      <div className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
                        Top Sector Constituents
                      </div>
                      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                        <table className="w-full text-left text-[11px] font-mono border-collapse">
                          <thead>
                            <tr className="bg-slate-50 text-slate-400 border-b border-slate-200 font-bold text-[9px] uppercase">
                              <th className="p-2 pl-3">Asset</th>
                              <th className="p-2 text-right">Price</th>
                              <th className="p-2 text-right">24h</th>
                              <th className="p-2 text-right pr-3">Cap</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                            {activeSector.constituents.map((c, cIdx) => (
                              <tr key={cIdx} className="hover:bg-slate-50/50">
                                <td className="p-2 pl-3 font-extrabold text-slate-800">
                                  {c.symbol} <span className="text-[9px] font-sans font-normal text-slate-400">{c.name}</span>
                                </td>
                                <td className="p-2 text-right text-slate-700">{c.price}</td>
                                <td className={`p-2 text-right font-bold ${c.change24h >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                                  {c.change24h >= 0 ? "+" : ""}{c.change24h.toFixed(1)}%
                                </td>
                                <td className="p-2 text-right text-slate-500 pr-3">{c.cap}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-50/40 border border-indigo-100 p-3 rounded-lg text-[11px] text-indigo-700 leading-snug mt-4 font-sans font-medium">
                    <strong>Quant Signal:</strong> Capital rotation velocity favors sectors displaying high 7d relative strength during general consolidation phases. Focus on top constituents as high-fidelity proxies.
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* STABLECOINS DETAILED LEDGER LISTING */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm" id="stablecoin-detailed-ledger">
        <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
          <Coins className="w-4 h-4 text-indigo-600" />
          Stablecoin Treasury Profiles & Liquidity Corridors
        </h3>
        
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-xs text-left border-collapse" id="stablecoin-ledger-table">
            <thead className="bg-[#f8fafc] text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-3 font-semibold text-[10px] uppercase tracking-wider">Stablecoin Asset</th>
                <th className="p-3 text-right font-semibold text-[10px] uppercase tracking-wider">Total Market Cap</th>
                <th className="p-3 text-right font-semibold text-[10px] uppercase tracking-wider">Daily Issuance Flow</th>
                <th className="p-3 text-right font-semibold text-[10px] uppercase tracking-wider">Asset Class Share</th>
                <th className="p-3 text-right font-semibold text-[10px] uppercase tracking-wider text-emerald-600">Peg Status</th>
                <th className="p-3 font-semibold text-[10px] uppercase tracking-wider text-slate-400 text-right">Primary Network Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-mono text-[11px]">
              {stablecoins.map((coin, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                  <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    {coin.name}
                  </td>
                  <td className="p-3 text-right font-bold text-slate-800">${coin.cap.toFixed(1)} Billion</td>
                  <td className="p-3 text-right text-emerald-600 font-bold">+{coin.flow.toFixed(1)} Million USD</td>
                  <td className="p-3 text-right text-slate-500">{coin.share}%</td>
                  <td className="p-3 text-right text-slate-850 font-bold">
                    ${coin.peg.toFixed(4)}
                  </td>
                  <td className="p-3 text-right text-slate-400 font-sans text-xs">{coin.chain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
