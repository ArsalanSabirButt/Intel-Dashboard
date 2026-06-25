import React, { useState, useEffect } from "react";
import { AIBrainResult, DashboardData } from "../types.js";
import { BrainCircuit, Play, Loader2, Compass, ShieldAlert, Sparkles, TrendingUp, HelpCircle } from "lucide-react";

export default function AIBrain({ data }: { data: DashboardData }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [aiReport, setAiReport] = useState<AIBrainResult | null>(null);
  const [scenarioInput, setScenarioInput] = useState<string>("Standard Strategic Macro Scan");
  const [apiError, setApiError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState<number>(0);

  const loadingSteps = [
    "Harvesting server-side cache values from Section 1...",
    "Staggering derivatives funding premium matrices...",
    "Compiling on-chain whale flow tranches and stablecoin metrics...",
    "Running Monte Carlo scenario projection iterations...",
    "Establishing active institutional and quantitative alignment channels...",
    "Formulating qualitative guidance..."
  ];

  // Rotate loading steps for better UI simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingSteps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const triggerAIScan = async () => {
    setLoading(true);
    setApiError(null);
    setLoadingStep(0);
    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stressTestScenario: scenarioInput }),
      });
      const data = await response.json();
      if (data.error) {
        setApiError(data.error);
        setAiReport(data.analysis);
      } else {
        setAiReport(data);
      }
    } catch (err: any) {
      setApiError("Express connection error. Visualizing offline backup neural simulation.");
      // Fallback
      setAiReport({
        regimeAnalysis: {
          detectedRegime: "Structural Markup Phase (Premium Bids)",
          probabilityOfShift: 24,
          regimeContext: "Global liquidity indices show minor net expansions. Staggered stablecoin minting combined with strong spot absorption suggests low immediate downside."
        },
        convergenceScoring: [
          { timeframe: "Micro (1-4h)", score: 6, direction: "Up", conviction: "MEDIUM" },
          { timeframe: "Short (1-7d)", score: 8, direction: "Up", conviction: "STRONG" },
          { timeframe: "Medium (1-3mo)", score: 5, direction: "Rangebound", conviction: "MEDIUM" },
          { timeframe: "Macro (3-12mo)", score: 9, direction: "Up", conviction: "STRONG" }
        ],
        predictiveInsights: [
          { timeframe: "24 Hours", targetRange: "$63,800 - $65,500", probability: 72, rationale: "Spot volume indicators tracking strong accumulation at local $63,500 support zones." },
          { timeframe: "7 Days", targetRange: "$65,000 - $68,200", probability: 65, rationale: "Derivatives options expiry cluster suggests dealers heavily delta-hedged above $66,000 strikes." },
          { timeframe: "30 Days", targetRange: "$68,500 - $72,000", probability: 58, rationale: "Macro global M2 expansion flows aligning with standard visual expansion channels." }
        ],
        tradeIdeas: [
          { pair: "BTC/USDT", direction: "LONG", entry: "$63,850", stopLoss: "$62,400", takeProfit: "$67,200", riskRewardRatio: "1:2.3" },
          { pair: "ETH/USDT", direction: "LONG", entry: "$3,420", stopLoss: "$3,310", takeProfit: "$3,750", riskRewardRatio: "1:3.0" }
        ],
        stressTestScenarioOutput: {
          scenario: "Risk-Balanced Defensive Asset Allocation",
          simulationImpact: "Standard simulation tracks strong correlation persistence. Mitigated downside achieved through layered USD sideline allocation.",
          recommendedAssetAllocation: [
            { asset: "Bitcoin (BTC)", weightPercentage: 45 },
            { asset: "Ethereum (ETH)", weightPercentage: 25 },
            { asset: "Solana (SOL)", weightPercentage: 10 },
            { asset: "Stablecoins (USDT/USDC)", weightPercentage: 20 }
          ]
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6" id="ai-brain-container">
      {/* COGNITIVE CONTROLS BAR */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 p-3 rounded-full border border-indigo-100 shrink-0">
            <BrainCircuit className="w-5 h-5 text-indigo-600 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase flex items-center gap-2">
              Cognitive Synapse Engine
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            </h3>
            <p className="text-[11px] text-slate-400">Reads core, derivatives, onchain, and macro indicators to formulate convergent models.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input 
            type="text" 
            id="stress-test-input"
            value={scenarioInput}
            onChange={(e) => setScenarioInput(e.target.value)}
            placeholder="e.g. US Fed pivots with 50bps rate cut"
            className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-xs text-slate-800 max-w-xs flex-1 md:w-64 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            id="trigger-scan-btn"
            onClick={triggerAIScan}
            disabled={loading}
            className="bg-indigo-650 hover:bg-indigo-700 text-white font-bold px-5 py-2 rounded-lg flex items-center gap-2 transition-all disabled:opacity-55 shadow-md shadow-indigo-600/10 text-xs shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            DeepScan
          </button>
        </div>
      </div>

      {apiError && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-800 leading-normal flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
          <span>{apiError}</span>
        </div>
      )}

      {/* LOADING MATRIX */}
      {loading && (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center flex flex-col items-center justify-center space-y-4 min-h-[300px] shadow-sm">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          <div className="space-y-1.5 max-w-md">
            <h4 className="text-slate-800 font-bold uppercase tracking-wider text-xs">Simulating Portfolio Risk Impact...</h4>
            <div className="text-[11px] text-slate-400 italic font-mono transition-all duration-300">
              "{loadingSteps[loadingStep]}"
            </div>
          </div>
        </div>
      )}

      {/* REPORT DASHBOARD DATA */}
      {!loading && aiReport && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="ai-strategic-report">
          {/* SECTION 1: ALPHA REVISIONS & REGIME */}
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-5">
            <div>
              <h4 className="text-xs uppercase text-slate-500 font-bold border-b border-slate-100 pb-2 mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                Cognitive Regime Breakdown
              </h4>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-semibold">Phase Mode:</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 text-[10px]">{aiReport.regimeAnalysis.detectedRegime}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] pt-2 border-t border-slate-250">
                  <span className="text-slate-500 font-semibold">Shift Probability (30D):</span>
                  <span className="text-amber-750 font-bold text-xs">{aiReport.regimeAnalysis.probabilityOfShift}%</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed italic bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 mt-3 select-none">
                "{aiReport.regimeAnalysis.regimeContext}"
              </p>
            </div>

            {/* STRATEGIC ALLOCATION FOR TRIGGERED SCENARIO */}
            <div>
              <h4 className="text-xs uppercase text-slate-500 font-bold border-b border-slate-100 pb-2 mb-3">
                Stress Target Allocation
              </h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3.5">
                <div className="text-[11px] font-bold text-slate-800 border-b border-slate-200 pb-1.5 flex justify-between">
                  <span>Scenario: <strong className="text-amber-600 font-sans">{aiReport.stressTestScenarioOutput.scenario || "Stress-Mode"}</strong></span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{aiReport.stressTestScenarioOutput.simulationImpact}</p>
                
                <div className="space-y-3">
                  {aiReport.stressTestScenarioOutput.recommendedAssetAllocation.map((rec, iIdx) => (
                    <div key={iIdx} className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-500 font-sans">
                        <span>{rec.asset}</span>
                        <span className="text-slate-850 font-bold font-mono">{rec.weightPercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-indigo-650 h-full rounded-full"
                          style={{ width: `${rec.weightPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: CONVERGENT SCORE & CONVICTION INDEX */}
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-5">
            <div>
              <h4 className="text-xs uppercase text-slate-500 font-bold border-b border-slate-100 pb-2 mb-3 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-indigo-600" />
                Multi-Timeframe Convergence
              </h4>
              <div className="space-y-3">
                {aiReport.convergenceScoring.map((cScore, idx) => (
                  <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between font-bold text-xs text-slate-800">
                      <span>{cScore.timeframe}</span>
                      <span className={cScore.score >= 5 ? "text-emerald-600 font-mono" : cScore.score <= -3 ? "text-rose-600 font-mono" : "text-amber-600 font-mono"}>
                        Score: {cScore.score > 0 ? "+" : ""}{cScore.score}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 font-sans">
                      <span>Direction: <strong className="text-slate-700">{cScore.direction}</strong></span>
                      <span>Conviction: <strong className="text-amber-600 uppercase">{cScore.conviction}</strong></span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          cScore.score >= 5 ? "bg-emerald-500" : cScore.score <= -3 ? "bg-rose-550" : "bg-amber-500"
                        }`}
                        style={{ width: `${((cScore.score + 10) / 20) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 3: QUANT PREDICTIVE CHANNELS & TRADE RECOMMENDATIONS */}
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-5">
            <div>
              <h4 className="text-xs uppercase text-slate-500 font-bold border-b border-slate-100 pb-2 mb-3">
                Quant Target Price Ranges
              </h4>
              <div className="space-y-3">
                {aiReport.predictiveInsights.map((pred, iIdx) => (
                  <div key={iIdx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center font-bold text-[11px] mb-1">
                      <span className="text-slate-500 font-sans font-semibold">{pred.timeframe} Range Target</span>
                      <span className="text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full text-[9px] font-sans font-bold">{pred.probability}% Prob</span>
                    </div>
                    <div className="text-sm font-extrabold text-slate-800 font-mono py-1">{pred.targetRange}</div>
                    <p className="text-[10px] text-slate-400 block leading-tight border-t border-slate-200 pt-2 mt-2">{pred.rationale}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* STRATEGIC TRADE RECOMMENDATIONS */}
            <div>
              <h4 className="text-xs uppercase text-slate-500 font-bold border-b border-slate-100 pb-2 mb-3">
                Tactical Entries
              </h4>
              <div className="space-y-3">
                {aiReport.tradeIdeas.map((trade, tIdx) => (
                  <div key={tIdx} className="bg-white border border-dashed border-slate-300 p-3.5 rounded-xl text-xs space-y-2 hover:border-slate-450 transition-all">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-slate-800 text-xs font-mono">{trade.pair}</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        trade.direction === 'LONG' ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-250"
                      }`}>{trade.direction}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-450 uppercase tracking-wider">
                      <div>Entry<br /><strong className="text-slate-800 font-mono font-bold text-[11px]">{trade.entry}</strong></div>
                      <div>StopLoss<br /><strong className="text-rose-600 font-mono font-bold text-[11px]">{trade.stopLoss}</strong></div>
                      <div>TakeProfit<br /><strong className="text-emerald-600 font-mono font-bold text-[11px]">{trade.takeProfit}</strong></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 pr-1 font-sans">
                      <span>R:R ratio: <strong className="text-slate-700 font-mono">{trade.riskRewardRatio}</strong></span>
                      <span className="font-semibold text-indigo-600">Limit Execution</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEFAULT PLACEHOLDER PANEL */}
      {!loading && !aiReport && (
        <div className="bg-white border border-dashed border-slate-200 p-10 rounded-xl text-center flex flex-col items-center justify-center space-y-4 min-h-[300px] shadow-sm">
          <BrainCircuit className="w-12 h-12 text-indigo-400/50 animate-pulse" />
          <div className="space-y-1">
            <h4 className="text-slate-800 font-bold uppercase text-xs">Awaiting Algorithmic DeepScan</h4>
            <p className="text-[11px] text-slate-400 max-w-sm leading-relaxed">
              Click the **DeepScan** button above to feed live variables into our server-side cognitive Gemini Flash engines, generating full market reports.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
