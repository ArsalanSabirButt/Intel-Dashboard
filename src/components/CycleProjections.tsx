import React, { useState } from "react";
import { DashboardData } from "../types.js";
import { 
  RefreshCw, 
  Hourglass, 
  BarChart3, 
  Radio, 
  Compass, 
  ShieldAlert, 
  ArrowUpRight, 
  ShieldCheck, 
  Gauge, 
  Coins, 
  Calendar, 
  HelpCircle,
  TrendingUp,
  Sliders,
  DollarSign
} from "lucide-react";
import { motion } from "motion/react";

export default function CycleProjections({ data }: { data: DashboardData }) {
  // Extract key values from dashboard data
  const cycle = data.cycle;
  const btcPair = data.pairs.find(p => p.symbol === "BTC/USDT");
  const btcPrice = btcPair?.price || 64250;
  const btcChange24h = btcPair?.change24h || 0;

  const powerLawFairValue = cycle.powerLawFairValue || 58900;
  const powerLawLowerBand = cycle.powerLawLowerBand || 48500;
  const powerLawUpperBand = cycle.powerLawUpperBand || 185000;
  const mayerMultiple = cycle.mayerMultiple || 1.18;
  const piCycleTopValue = cycle.piCycleTopValue || 88500;
  const piCycleShortMA = cycle.piCycleShortMA || 63120;
  const piCycleLongMA = cycle.piCycleLongMA || 56900;
  const halvingCountdownDays = cycle.halvingCountdownDays || 1380;
  const correlations = cycle.correlations || [];

  const mvrvRatio = data.onChain?.mvrvRatio || 1.82;
  const nuplValue = data.onChain?.nuplValue || 0.45;

  // State for interactive scenario simulator
  const [simulatedPrice, setSimulatedPrice] = useState<number>(Math.round(btcPrice));

  // State for Cross-Asset Systemic Correlation Matrix selected cell
  const [selectedCell, setSelectedCell] = useState<{ a: string; b: string } | null>({ a: "BTC", b: "DXY" });

  const matrixAssets = ["BTC", "ETH", "SPX", "DXY", "GOLD"];

  const getCoefficient = (a: string, b: string): number => {
    if (a === b) return 1.0;
    // Map alternate names
    const normalize = (name: string) => {
      const upper = name.toUpperCase();
      if (upper === "S&P 500" || upper === "SPX") return "SPX";
      if (upper === "GOLD" || upper === "GLD") return "GOLD";
      return upper;
    };
    
    const normA = normalize(a);
    const normB = normalize(b);
    
    const found = correlations.find(c => {
      const cA = normalize(c.assetA);
      const cB = normalize(c.assetB);
      return (cA === normA && cB === normB) || (cA === normB && cB === normA);
    });
    
    if (found) return found.coefficient;
    
    const defaultMatrix: Record<string, Record<string, number>> = {
      BTC:  { BTC: 1.0,  ETH: 0.88,  SPX: 0.42,  DXY: -0.68, GOLD: 0.53 },
      ETH:  { BTC: 0.88, ETH: 1.0,   SPX: 0.38,  DXY: -0.59, GOLD: 0.41 },
      SPX:  { BTC: 0.42, ETH: 0.38,  SPX: 1.0,   DXY: -0.45, GOLD: 0.15 },
      DXY:  { BTC: -0.68, ETH: -0.59, SPX: -0.45, DXY: 1.0,   GOLD: -0.35 },
      GOLD: { BTC: 0.53, ETH: 0.41,  SPX: 0.15,  DXY: -0.35, GOLD: 1.0 }
    };
    
    return defaultMatrix[normA]?.[normB] ?? 0.0;
  };

  const getCorrelationLabel = (val: number): { text: string; color: string } => {
    if (val === 1.0) return { text: "Identical Asset", color: "text-slate-500" };
    if (val >= 0.7) return { text: "Strong Positive Coupling", color: "text-emerald-600 font-bold" };
    if (val >= 0.3) return { text: "Moderate Positive Correlation", color: "text-teal-600 font-medium" };
    if (val >= -0.3 && val < 0.3) return { text: "Neutral / Decoupled Action", color: "text-slate-500" };
    if (val >= -0.7 && val < -0.3) return { text: "Moderate Negative Correlation", color: "text-rose-600 font-medium" };
    return { text: "Strong Inverse Hedge", color: "text-rose-700 font-bold" };
  };

  const getCorrelationExplanation = (a: string, b: string, val: number): string => {
    if (a === b) return `${a} correlated with itself is naturally a perfect 1.00.`;
    
    const pairKey = `${a}-${b}`;
    const explanations: Record<string, string> = {
      "BTC-ETH": "Highly coupled. ETH behaves as a high-beta version of BTC. They rarely decouple for long periods.",
      "BTC-SPX": "Moderate positive correlation. Reflects high-risk-asset global liquidity cycles and macroeconomic trends.",
      "BTC-DXY": "Strong inverse relationship. A strengthening US Dollar (DXY) drains systemic fiat liquidity from risk assets.",
      "BTC-GOLD": "Positive correlation. Portrays a shared 'scarcity hedge' and store of value positioning in macro debasement eras.",
      "ETH-SPX": "Moderate correlation. Shows alignment with equity markets and generalized global tech/growth sector risk appetite.",
      "ETH-DXY": "Inverse correlation. Global liquidity tightening usually impacts Ethereum's capital deployment and DeFi yields.",
      "ETH-GOLD": "Moderate correlation. Both capture inflows from global currency devaluations, though ETH remains higher volatility.",
      "SPX-DXY": "Consistent inverse pairing. As domestic and international risk liquidity contracts, capital flows back to USD.",
      "SPX-GOLD": "Low positive correlation. Gold acts as a safe haven while equities are productive yield-generating assets.",
      "DXY-GOLD": "Standard inverse relationship. Gold is priced in USD, so a weaker greenback typically lifts commodity values."
    };
    
    return explanations[pairKey] || explanations[`${b}-${a}`] || `Indicates a correlation multiplier of ${val.toFixed(2)} between ${a} and ${b}.`;
  };

  // Determine Cycle Position helper
  const getCyclePositionDetails = (price: number, mmVal: number) => {
    if (price <= powerLawLowerBand || mmVal < 0.8) {
      return {
        phase: "Cycle Bottom / Deep Accumulation",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        indicatorBg: "bg-emerald-500",
        description: "Smart money is heavily accumulating. Spot supply is squeezed. Historically matches the absolute asymmetric risk-reward buying zone.",
        progressPercent: 12,
        action: "Strong Buy / DCA"
      };
    } else if (price > powerLawLowerBand && price <= powerLawFairValue && mmVal < 1.2) {
      return {
        phase: "Post-Bottom Re-accumulation (Early Bull)",
        color: "text-teal-700 bg-teal-50 border-teal-200",
        indicatorBg: "bg-teal-500",
        description: "Initial breakout completed. The market digests leverage and transfers spot ownership to long-term holders. High floor confirmation.",
        progressPercent: 35,
        action: "DCA / Accumulate"
      };
    } else if (price > powerLawFairValue && price <= powerLawFairValue * 1.5 && mmVal < 1.8) {
      return {
        phase: "Mid-Cycle Expansion (Growth)",
        color: "text-indigo-700 bg-indigo-50 border-indigo-200",
        indicatorBg: "bg-indigo-500",
        description: "Strong directional momentum. High retail spot volume and consistent corporate/ETF inflows. Macro trends are firmly bullish.",
        progressPercent: 62,
        action: "Hold / Moderate Buys"
      };
    } else if (price > powerLawFairValue * 1.5 && price <= powerLawUpperBand && mmVal < 2.4) {
      return {
        phase: "Belief / Late-Cycle Acceleration",
        color: "text-amber-700 bg-amber-50 border-amber-200",
        indicatorBg: "bg-amber-500",
        description: "Extremely high hype and low local liquidity. Leverage funding is elevated. Extreme risk of brief sharp liquidations but high velocity expansion remains.",
        progressPercent: 85,
        action: "Hold / Profit Scale Out"
      };
    } else {
      return {
        phase: "Euphoria / Cycle Peak Overheat",
        color: "text-rose-700 bg-rose-50 border-rose-200",
        indicatorBg: "bg-rose-500",
        description: "Absolute retail frenzy. Funding rates are unsustainably high and on-chain whale distribution is peak. Prepare for cycle top structure.",
        progressPercent: 98,
        action: "Strong Sell / Hedge"
      };
    }
  };

  const activePosition = getCyclePositionDetails(btcPrice, mayerMultiple);

  // Halving epoch math
  const epochDurationDays = 1460; // 4 years
  const daysPassed = Math.max(0, Math.min(epochDurationDays, epochDurationDays - halvingCountdownDays));
  const epochProgressPercent = Math.round((daysPassed / epochDurationDays) * 100);

  const getHalvingRegime = () => {
    if (daysPassed <= 365) {
      return {
        regime: "Phase 1: Post-Halving Re-Accumulation",
        desc: "Historically, the first 12 months after a halving consist of quiet consolidation and strong spot base formation."
      };
    } else if (daysPassed > 365 && daysPassed <= 730) {
      return {
        regime: "Phase 2: Parabolic Expansion & Top",
        desc: "Months 12 to 24 after halving have historically triggered the supply squeeze and the main parabolic run to cycle peaks."
      };
    } else if (daysPassed > 730 && daysPassed <= 1095) {
      return {
        regime: "Phase 3: Bear Market Correction",
        desc: "Months 24 to 36 represent the standard macro downcycle as speculative leverage unwinds and valuations reset to lower bands."
      };
    } else {
      return {
        regime: "Phase 4: Pre-Halving Frontrunning",
        desc: "The final 12 months see the market anticipation of the upcoming halving, slowly frontrunning scarcity shifts."
      };
    }
  };

  const halvingRegime = getHalvingRegime();

  // Dynamic values based on simulator price
  const simulatedMayerMultiple = (simulatedPrice / (btcPrice / mayerMultiple));
  const simulatedPowerLawFairRatio = simulatedPrice / powerLawFairValue;
  
  // Approximate simulated NUPL assuming realized price is around 32,000
  const estimatedRealizedPrice = 32000;
  const simulatedNupl = Math.max(-0.2, Math.min(0.9, (simulatedPrice - estimatedRealizedPrice) / simulatedPrice));
  const simulatedPosition = getCyclePositionDetails(simulatedPrice, simulatedMayerMultiple);

  return (
    <div className="space-y-6" id="cycle-projections-stage">
      
      {/* 1. CYCLE POSITION MAIN DASHBOARD HERO */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
        className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col xl:flex-row gap-6 justify-between items-start"
        id="btc-cycle-hero-panel"
      >
        {/* Left Side: Current State Info */}
        <div className="space-y-4 max-w-2xl">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Gauge className="w-4.5 h-4.5 text-indigo-600" />
              BTC Cycle Position Locator
            </h2>
            <div className="flex items-baseline gap-3 mt-1.5">
              <span className="text-3xl font-black font-mono text-slate-900">${btcPrice.toLocaleString()}</span>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${btcChange24h >= 0 ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"}`}>
                {btcChange24h >= 0 ? "▲" : "▼"} {Math.abs(btcChange24h).toFixed(2)}%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-semibold text-slate-500">Current Phase:</span>
              <span className={`text-xs font-mono font-extrabold px-3 py-1 rounded-lg border shadow-sm ${activePosition.color}`}>
                {activePosition.phase}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {activePosition.description}
            </p>
          </div>

          {/* Core Cycle Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-400 font-sans block mb-0.5">Mayer Multiple</span>
              <span className="font-extrabold text-slate-800">{mayerMultiple.toFixed(2)}x</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans block mb-0.5">MVRV Z-Score</span>
              <span className="font-extrabold text-slate-800">{mvrvRatio.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans block mb-0.5">NUPL Index</span>
              <span className="font-extrabold text-slate-800">{nuplValue.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans block mb-0.5">Tactical Guide</span>
              <span className="font-extrabold text-indigo-600 uppercase font-sans text-[10px]">{activePosition.action}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Temperature Gauge bar */}
        <div className="w-full xl:w-80 bg-slate-50 border border-slate-200 p-5 rounded-xl flex flex-col justify-between self-stretch" id="cycle-gauge-sub-box">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center justify-between">
            <span>Cycle Overheat Gauge</span>
            <span className="font-mono text-indigo-600 font-extrabold">{activePosition.progressPercent}%</span>
          </div>

          <div className="my-5 relative">
            {/* Horizontal Gauge Slider */}
            <div className="w-full h-3 bg-slate-200 rounded-full flex overflow-hidden">
              <div className="w-[20%] bg-emerald-400 h-full border-r border-white/20"></div>
              <div className="w-[30%] bg-teal-400 h-full border-r border-white/20"></div>
              <div className="w-[25%] bg-indigo-400 h-full border-r border-white/20"></div>
              <div className="w-[15%] bg-amber-400 h-full border-r border-white/20"></div>
              <div className="w-[10%] bg-rose-500 h-full"></div>
            </div>

            {/* Current Position Pointer */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-3 border-indigo-600 shadow-md transition-all duration-500"
              style={{ left: `calc(${activePosition.progressPercent}% - 8px)` }}
            ></div>
          </div>

          <div className="flex justify-between text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            <span>Bottom</span>
            <span>Early Bull</span>
            <span>Growth</span>
            <span>Overheat</span>
          </div>
        </div>
      </motion.div>

      {/* 2. HALVING LIFECYCLE PROGRESS */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm" id="halving-timeline-container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              4-Year Halving Epoch Timeline ({epochProgressPercent}% Completed)
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Tracking structural scarcity changes in the 1,460-day macro halving cycle.</p>
          </div>
          <div className="text-xs font-mono font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-lg">
            {halvingCountdownDays} DAYS TO HALVING
          </div>
        </div>

        {/* Horizontal Timeline Bar */}
        <div className="my-6">
          <div className="relative">
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${epochProgressPercent}%` }}></div>
            </div>
            
            {/* Labels on Timeline */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-1 pointer-events-none">
              <div className="w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-indigo-50 border border-white"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300 border border-white"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300 border border-white"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300 border border-white"></div>
              <div className="w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-indigo-50 border border-white"></div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center mt-3 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
            <div className={daysPassed <= 365 ? "text-indigo-600 font-black" : ""}>Q1: Re-Accumulate</div>
            <div className={daysPassed > 365 && daysPassed <= 730 ? "text-indigo-600 font-black" : ""}>Q2: Parabolic Run</div>
            <div className={daysPassed > 730 && daysPassed <= 1095 ? "text-indigo-600 font-black" : ""}>Q3: Bear / Reset</div>
            <div className={daysPassed > 1095 ? "text-indigo-600 font-black" : ""}>Q4: Pre-Frontrun</div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs space-y-1 text-slate-600">
          <span className="font-extrabold text-slate-800 uppercase text-[10px] tracking-wider block text-indigo-600 mb-0.5">
            CURRENT HALVING ERA: {halvingRegime.regime}
          </span>
          <p className="leading-relaxed">
            {halvingRegime.desc} Estimated block subsidy cut target date: <strong className="text-slate-800 font-bold">February 2028</strong>. Block subsidy cuts mechanically reduce liquid daily miners' sell pressure from 3.125 BTC to 1.5625 BTC.
          </p>
        </div>
      </div>

      {/* 3. DOUBLE MODEL GRIDS: Power Law Regression & Pi Cycle Overheat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="models-metrics-sub-row">
        {/* Power Law Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between" id="power-law-detail-card">
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2 mb-1.5 border-b border-slate-100 pb-2">
              <BarChart3 className="w-4.5 h-4.5 text-indigo-600" />
              Power Law Projection model
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed block">
              Evaluates regression bands based on time on a log-log scale. Pinpoints long term floor values and overextension targets.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 mt-4 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Lower Support Band:</span>
              <span className="text-slate-800 font-bold">${powerLawLowerBand.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-200">
              <span className="text-indigo-600 font-extrabold font-sans">Model Fair Value:</span>
              <span className="text-indigo-600 font-black">${powerLawFairValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-200">
              <span className="text-slate-500 font-sans">Upper Overheat Target:</span>
              <span className="text-slate-800 font-bold">${powerLawUpperBand.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Pi Cycle Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between" id="pi-cycle-detail-card">
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2 mb-1.5 border-b border-slate-100 pb-2">
              <Radio className="w-4.5 h-4.5 text-indigo-600" />
              Pi Cycle Top Indicator
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed block">
              Uses the 111-day DMA and 350-day DMA (*2). Historically crosses within 3 days of absolute Bitcoin cycle peaks.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 mt-4 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Pi Short MA (111d):</span>
              <span className="text-slate-800 font-semibold">${piCycleShortMA.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Pi Long MA (350d * 2):</span>
              <span className="text-slate-800 font-semibold">${piCycleLongMA.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200 text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg mt-1.5">
              <span className="font-sans">Top Intersection Safety Level:</span>
              <span>${piCycleTopValue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. INTERACTIVE CYCLE SCENARIO SIMULATOR (AESTHETIC UPGRADE) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm" id="cycle-scenario-simulator">
        <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-2">
          <Sliders className="w-4.5 h-4.5 text-indigo-600" />
          <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500">
            Interactive BTC Cycle Scenario Simulator
          </h3>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed block mb-5">
          Drag the slider or enter a custom target price to simulate exactly where Bitcoin would sit in the macro cycle model bands, calculating simulated Mayer Multiples and On-Chain conditions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center" id="simulator-grid-layout">
          {/* Slider input controls (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 font-sans">Simulated BTC Price Target</span>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <span className="text-slate-400 font-bold font-mono text-xs">$</span>
                <input 
                  type="number" 
                  value={simulatedPrice}
                  onChange={(e) => setSimulatedPrice(Math.max(1000, Math.min(500000, Number(e.target.value))))}
                  className="w-24 bg-transparent outline-none border-none font-mono font-black text-xs text-slate-800 text-right"
                />
              </div>
            </div>

            <div className="space-y-2">
              <input 
                type="range"
                min={20000}
                max={250000}
                step={1000}
                value={simulatedPrice}
                onChange={(e) => setSimulatedPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                <span>$20,000</span>
                <span>$80,000</span>
                <span>$140,000</span>
                <span>$200,000</span>
                <span>$250,000</span>
              </div>
            </div>
          </div>

          {/* Simulated Outputs (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-xs space-y-3" id="simulator-output-box">
            <div className="text-center pb-2 border-b border-slate-200">
              <span className="text-[10px] text-slate-400 font-sans font-bold uppercase block tracking-wider mb-1">Simulated Regime Output</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded border shadow-sm inline-block ${simulatedPosition.color}`}>
                {simulatedPosition.phase}
              </span>
            </div>

            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500 font-sans">Mayer Multiple Estimate:</span>
              <span className="font-extrabold text-slate-800">{simulatedMayerMultiple.toFixed(2)}x</span>
            </div>

            <div className="flex justify-between text-[11px] pt-1.5 border-t border-slate-200/50">
              <span className="text-slate-500 font-sans">Power Law deviation:</span>
              <span className={`font-extrabold ${simulatedPowerLawFairRatio >= 1 ? "text-amber-600" : "text-emerald-600"}`}>
                {simulatedPowerLawFairRatio >= 1 ? "+" : ""}{((simulatedPowerLawFairRatio - 1) * 100).toFixed(0)}% from Fair Value
              </span>
            </div>

            <div className="flex justify-between text-[11px] pt-1.5 border-t border-slate-200/50">
              <span className="text-slate-500 font-sans">Approx. Simulated NUPL:</span>
              <span className="font-extrabold text-slate-800">
                {simulatedNupl.toFixed(2)} ({simulatedNupl >= 0.75 ? "Euphoria" : simulatedNupl >= 0.5 ? "Belief" : simulatedNupl >= 0.25 ? "Optimism" : "Hope/Fear"})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. CROSS-ASSET CORRELATION MATRIX */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm" id="correlations-matrix">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2">
              <TrendingUp className="w-4.5 h-4.5 text-indigo-600" />
              Cross-Asset Systemic Correlation Matrix (30-Day Rolling)
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Interactive Pearson correlation grid displaying coupling indices across digital assets, equities, currencies, and precious metals.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
            Scale: -1.0 to +1.0
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Heatmap Grid */}
          <div className="lg:col-span-7 overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-[10px] font-bold text-slate-400 uppercase font-mono text-left w-16">Asset</th>
                  {matrixAssets.map(asset => (
                    <th key={asset} className="p-2 text-[10px] font-bold text-slate-500 uppercase font-mono w-16">
                      {asset}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixAssets.map(rowAsset => (
                  <tr key={rowAsset} className="border-t border-slate-100">
                    <td className="p-2 text-left text-[11px] font-bold text-slate-700 font-mono uppercase bg-slate-50/50">
                      {rowAsset}
                    </td>
                    {matrixAssets.map(colAsset => {
                      const coeff = getCoefficient(rowAsset, colAsset);
                      
                      // Background color classification
                      let bgClass = "bg-slate-50 text-slate-400";
                      
                      if (rowAsset === colAsset) {
                        bgClass = "bg-slate-100 text-slate-700 font-bold";
                      } else if (coeff >= 0.7) {
                        bgClass = "bg-emerald-600 text-white font-bold hover:bg-emerald-500";
                      } else if (coeff >= 0.3) {
                        bgClass = "bg-emerald-100 text-emerald-800 font-bold hover:bg-emerald-200/80";
                      } else if (coeff > -0.3 && coeff < 0.3) {
                        bgClass = "bg-slate-50 text-slate-500 hover:bg-slate-100";
                      } else if (coeff <= -0.7) {
                        bgClass = "bg-rose-600 text-white font-bold hover:bg-rose-500";
                      } else if (coeff <= -0.3) {
                        bgClass = "bg-rose-100 text-rose-800 font-bold hover:bg-rose-200/80";
                      }
                      
                      const isSelected = selectedCell?.a === rowAsset && selectedCell?.b === colAsset;
                      
                      return (
                        <td key={colAsset} className="p-1">
                          <button
                            onClick={() => setSelectedCell({ a: rowAsset, b: colAsset })}
                            className={`w-full py-3.5 rounded-lg text-xs font-mono transition-all duration-150 cursor-pointer flex flex-col items-center justify-center relative ${bgClass} ${
                              isSelected ? "ring-2 ring-indigo-600 ring-offset-1 scale-102 z-10 shadow-sm" : ""
                            }`}
                            title={`${rowAsset} vs ${colAsset}: ${coeff.toFixed(2)}`}
                          >
                            <span>{coeff >= 0 ? "+" : ""}{coeff.toFixed(2)}</span>
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Color Legend */}
            <div className="flex flex-wrap items-center justify-start gap-4 mt-4 pt-4 border-t border-slate-100 text-[10px] font-mono text-slate-400 uppercase font-bold">
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-emerald-600"></span> Strong Positive
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-emerald-100"></span> Moderate Positive
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-slate-50"></span> Neutral
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-rose-100"></span> Moderate Negative
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-rose-600"></span> Strong Negative
              </span>
            </div>
          </div>

          {/* Explanation Box */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {selectedCell ? (
              <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-xl space-y-4 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center pb-2.5 border-b border-slate-200">
                    <span className="text-[11px] font-extrabold text-slate-700 font-mono uppercase tracking-wider">
                      Systemic Pairing Analysis
                    </span>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md font-mono">
                      {selectedCell.a} / {selectedCell.b}
                    </span>
                  </div>
                  
                  <div className="mt-3.5 space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-sans">Correlation Index:</span>
                      <span className="text-xl font-black font-mono text-slate-800">
                        {getCoefficient(selectedCell.a, selectedCell.b) >= 0 ? "+" : ""}
                        {getCoefficient(selectedCell.a, selectedCell.b).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-sans">Strength:</span>
                      <span className={`text-[11px] font-bold uppercase ${getCorrelationLabel(getCoefficient(selectedCell.a, selectedCell.b)).color}`}>
                        {getCorrelationLabel(getCoefficient(selectedCell.a, selectedCell.b)).text}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-4 leading-relaxed font-medium">
                    {getCorrelationExplanation(selectedCell.a, selectedCell.b, getCoefficient(selectedCell.a, selectedCell.b))}
                  </p>
                </div>

                <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-lg text-[11px] text-indigo-700 leading-snug mt-4 font-sans font-medium">
                  <strong>Quantitative Impact:</strong> This rolling value is compiled continuously across a 30-day window to isolate long-term structural trends from short-term programmatic leverage spikes. Use this matrix to assess hedge efficacy and potential asset class rotations.
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl text-center flex flex-col items-center justify-center h-full text-slate-400">
                <TrendingUp className="w-8 h-8 text-slate-300 mb-2" />
                <p className="text-xs font-bold font-sans">Select any grid cell to view systemic macro pairing analytics</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
