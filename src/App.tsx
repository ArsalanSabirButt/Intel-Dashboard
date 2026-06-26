import { useState, useEffect } from "react";
import { DashboardData } from "./types";
import { FALLBACK_DASHBOARD_DATA } from "./data/fallbackData";
import CoreMarkets from "./components/CoreMarkets";
import DerivativesIntelligence from "./components/DerivativesIntelligence";
import OnChainTracker from "./components/OnChainTracker";
import MacroMonitor from "./components/MacroMonitor";
import SentimentTerminal from "./components/SentimentTerminal";
import CycleProjections from "./components/CycleProjections";
import AIBrain from "./components/AIBrain";
import DominanceMonitor from "./components/DominanceMonitor";
import { 
  Activity, 
  Coins, 
  Landmark, 
  MessageSquare, 
  Flame, 
  BrainCircuit, 
  Compass, 
  Loader2, 
  Server, 
  RefreshCw, 
  Command, 
  Layers,
  Clock 
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<'core' | 'derivatives' | 'onchain' | 'dominance' | 'macro' | 'sentiment' | 'cycle' | 'brain'>('core');
  const [marketData, setMarketData] = useState<DashboardData | null>(null);
  const [activeChart, setActiveChart] = useState<string>("BTC/USDT");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // Clock updates
    const tInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace("GMT", "UTC"));
    }, 1000);
    return () => clearInterval(tInterval);
  }, []);

  // Fetch initial data + register live updates loop
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/market-data");
        const data = await res.json();
        setMarketData(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to sync quantitative prices", err);
        // Engage high-fidelity offline fallback data so the systematic terminal is immediately active
        setMarketData((prev) => {
          if (!prev) {
            return FALLBACK_DASHBOARD_DATA;
          }
          return prev;
        });
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 4000); // Poll and tick-tock prices every 4 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading || !marketData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4" id="global-loading">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <div className="space-y-1 text-center font-sans">
          <h2 className="text-slate-800 font-bold tracking-widest uppercase text-sm">CRYPTO INTEL V3</h2>
          <p className="text-slate-500 text-xs">Synchronizing secure server-side Aladdin indices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-none" id="app-root">
      {/* GLOBAL STATUS HEADER */}
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex flex-col sm:flex-row justify-between items-center gap-2 shrink-0 z-10" id="workspace-header">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/10">
            <Command className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-1.5 leading-none">
              Crypto Intel <span className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono font-bold">V3.5 SYSTEMATIC</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">ALADDIN + JANE STREET PROTOTYPE TERMINAL</p>
          </div>
        </div>

        {/* METADATA BAR */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
          <div className="hidden md:flex items-center gap-1.5 border border-slate-200 px-2.5 py-1 rounded bg-slate-50 shadow-sm text-slate-700">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-semibold" id="system-clock">{currentTime || "SYNCING..."}</span>
          </div>
          <div className="flex items-center gap-1.5 border border-slate-200 px-2.5 py-1 rounded bg-slate-50 shadow-sm">
            <Server className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-600 uppercase font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              Cache Synced
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <RefreshCw className="w-3.5 h-3.5 text-indigo-500 animate-spin-slow" />
            <span>LATENCY: &lt; 0.25ms (Jane local)</span>
          </div>
        </div>
      </header>

      {/* WORKSPACE AREA */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* SLIM HIGH FIDELITY NAVIGATION SIDEBAR */}
        <aside className="w-64 bg-slate-900 flex flex-col border-r border-slate-800 shrink-0" id="workspace-sidebar">
          <div className="p-4 border-b border-slate-800">
            <div className="bg-slate-800/40 border border-slate-700/30 rounded-lg p-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Operational Desk</span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 font-sans text-sm">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 py-2">Operations</div>
            
            {/* CORE MARKETS */}
            <button
              id="sidebar-core-markets"
              onClick={() => setActiveTab('core')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all text-left ${
                activeTab === 'core'
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4" />
                <span className="font-medium">Core Markets</span>
              </div>
              <span className={`text-[9px] px-1 rounded font-bold font-mono ${activeTab === 'core' ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>SEC 1</span>
            </button>

            {/* DERIVATIVES INTELLIGENCE */}
            <button
              id="sidebar-derivatives"
              onClick={() => setActiveTab('derivatives')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all text-left ${
                activeTab === 'derivatives'
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Coins className="w-4 h-4" />
                <span className="font-medium">Derivatives & Funding</span>
              </div>
              <span className={`text-[9px] px-1 rounded font-bold font-mono ${activeTab === 'derivatives' ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>SEC 2</span>
            </button>

            {/* ON-CHAIN TRACKER */}
            <button
              id="sidebar-on-chain"
              onClick={() => setActiveTab('onchain')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all text-left ${
                activeTab === 'onchain'
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4" />
                <span className="font-medium">On-Chain Tracker</span>
              </div>
              <span className={`text-[9px] px-1 rounded font-bold font-mono ${activeTab === 'onchain' ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>SEC 3</span>
            </button>

            {/* MACRO MONITOR */}
            <button
              id="sidebar-macro"
              onClick={() => setActiveTab('macro')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all text-left ${
                activeTab === 'macro'
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Landmark className="w-4 h-4" />
                <span className="font-medium">Macro Monitor</span>
              </div>
              <span className={`text-[9px] px-1 rounded font-bold font-mono ${activeTab === 'macro' ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>SEC 4</span>
            </button>

            {/* DOMINANCE & STABLECOINS */}
            <button
              id="sidebar-dominance"
              onClick={() => setActiveTab('dominance')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all text-left ${
                activeTab === 'dominance'
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span className="font-medium">Dominance & Stablecoins</span>
              </div>
              <span className={`text-[9px] px-1 rounded font-bold font-mono ${activeTab === 'dominance' ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>SEC 5</span>
            </button>

            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 py-2 mt-4">Planning & Hub</div>

            {/* SENTIMENT TERMINAL */}
            <button
              id="sidebar-sentiment"
              onClick={() => setActiveTab('sentiment')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all text-left ${
                activeTab === 'sentiment'
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span className="font-medium">Social Bulletins</span>
              </div>
              <span className={`text-[9px] px-1 rounded font-bold font-mono ${activeTab === 'sentiment' ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>SEC 6</span>
            </button>

            {/* CYCLE PROJECTIONS */}
            <button
              id="sidebar-cycle"
              onClick={() => setActiveTab('cycle')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all text-left ${
                activeTab === 'cycle'
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Flame className="w-4 h-4" />
                <span className="font-medium">Cycle Valuations</span>
              </div>
              <span className={`text-[9px] px-1 rounded font-bold font-mono ${activeTab === 'cycle' ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>SEC 7</span>
            </button>

            {/* COGNITIVE HUB */}
            <button
              id="sidebar-brain-ai"
              onClick={() => setActiveTab('brain')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all border mt-4 text-left ${
                activeTab === 'brain'
                  ? "bg-indigo-650 text-white border-indigo-500 shadow-md shadow-indigo-600/20"
                  : "text-indigo-400 border-indigo-950 bg-indigo-950/15 hover:bg-indigo-950/35 hover:text-indigo-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <BrainCircuit className="w-4.5 h-4.5 text-indigo-400" />
                <span className="font-semibold tracking-wide">Aladdin AI Brain</span>
              </div>
              <span className="text-[8px] border border-indigo-450 px-1 rounded font-mono uppercase bg-indigo-900/50 text-indigo-200">ACTIVE</span>
            </button>
          </nav>

          {/* LOWER RUN-TIME FOOTER - Jordan style */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-xs border border-slate-700">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">Sovereign Quant</p>
                <p className="text-[10px] text-slate-500 truncate">System Integrity: 100%</p>
              </div>
            </div>
          </div>
        </aside>

        {/* PRIMARY ACTIVE GRID STAGE */}
        <main className="flex-1 overflow-auto p-4 md:p-5 lg:p-6 bg-slate-50" id="stage-frame">
          {activeTab === 'core' && (
            <CoreMarkets 
              data={marketData} 
              onSelectChart={setActiveChart} 
              activeChart={activeChart} 
            />
          )}
          {activeTab === 'derivatives' && (
            <DerivativesIntelligence data={marketData.derivatives} />
          )}
          {activeTab === 'onchain' && (
            <OnChainTracker data={marketData.onChain} />
          )}
          {activeTab === 'dominance' && (
            <DominanceMonitor data={marketData} />
          )}
          {activeTab === 'macro' && (
            <MacroMonitor data={marketData.macro} />
          )}
          {activeTab === 'sentiment' && (
            <SentimentTerminal data={marketData.sentiment} />
          )}
          {activeTab === 'cycle' && (
            <CycleProjections data={marketData} />
          )}
          {activeTab === 'brain' && (
            <AIBrain data={marketData} />
          )}
        </main>
      </div>
    </div>
  );
}
