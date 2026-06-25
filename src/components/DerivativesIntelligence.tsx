import React, { useState } from "react";
import { DerivativesData } from "../types.js";
import { Percent, TrendingUp, ShieldAlert, Award, ChevronDown, Flame } from "lucide-react";

export default function DerivativesIntelligence({ data }: { data: DerivativesData }) {
  const [activeTab, setActiveTab] = useState<'rates' | 'oi' | 'ratio' | 'liquidations' | 'options'>('rates');

  // Compute total OI sum across logged pairs
  const totalOI = data.openInterest.reduce((acc, curr) => acc + curr.oiUsd, 0);

  return (
    <div className="space-y-6" id="derivatives-container">
      {/* HEADER NAV TABS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white border border-slate-200 rounded-xl shadow-sm gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            id="tab-funding-rates"
            onClick={() => setActiveTab('rates')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'rates'
                ? "bg-indigo-650 text-white shadow-md shadow-indigo-600/15"
                : "text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Funding Rates Grid
          </button>
          <button
            id="tab-long-short-ratio"
            onClick={() => setActiveTab('ratio')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'ratio'
                ? "bg-indigo-650 text-white shadow-md shadow-indigo-600/15"
                : "text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Long/Short Ratio Monitor
          </button>
          <button
            id="tab-open-interest"
            onClick={() => setActiveTab('oi')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'oi'
                ? "bg-indigo-650 text-white shadow-md shadow-indigo-600/15"
                : "text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Open Interest Metrics
          </button>
          <button
            id="tab-liquidations"
            onClick={() => setActiveTab('liquidations')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'liquidations'
                ? "bg-indigo-650 text-white shadow-md shadow-indigo-600/15"
                : "text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Liquidation Heatmap
          </button>
          <button
            id="tab-options"
            onClick={() => setActiveTab('options')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'options'
                ? "bg-indigo-650 text-white shadow-md shadow-indigo-600/15"
                : "text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Options Flow & Max Pain
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
          <span>Derivative Stream Active</span>
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}
      {activeTab === 'rates' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm" id="funding-rates-grid">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase">Aggregated Funding Rates</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Rates in % per 8-Hour cycle. Positive suggests leverage premium on longs; Negative on shorts.</p>
            </div>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
              Mean Premium: +0.017%
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-xs text-left border-collapse" id="funding-table">
              <thead className="bg-[#f8fafc] text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider text-[10px]">Trading Pair</th>
                  <th className="p-3 text-right font-bold uppercase tracking-wider text-[10px]">Binance</th>
                  <th className="p-3 text-right font-bold uppercase tracking-wider text-[10px]">Bybit</th>
                  <th className="p-3 text-right font-bold uppercase tracking-wider text-[10px]">OKX</th>
                  <th className="p-3 text-right font-bold uppercase tracking-wider text-[10px]">Deribit</th>
                  <th className="p-3 text-right font-bold uppercase tracking-wider text-[10px] text-slate-700">Mean Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {data.fundingRates.map((fr, idx) => {
                  const mean = (fr.binance + fr.bybit + fr.okx + fr.deribit) / 4;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                      <td className="p-3 font-bold text-slate-900">{fr.symbol}</td>
                      <td className="p-3 text-right text-amber-600 font-mono font-semibold">{fr.binance.toFixed(4)}%</td>
                      <td className="p-3 text-right text-amber-600 font-mono font-semibold">{fr.bybit.toFixed(4)}%</td>
                      <td className="p-3 text-right text-amber-600 font-mono font-semibold">{fr.okx.toFixed(4)}%</td>
                      <td className="p-3 text-right text-amber-600 font-mono font-semibold">{fr.deribit.toFixed(4)}%</td>
                      <td className="p-3 text-right font-bold font-mono text-indigo-600 bg-slate-50">{mean.toFixed(4)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-indigo-600 uppercase text-[10px] block mb-1">Leverage Squeeze Hazard</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                High-volume, highly speculative periods usually pull altcoin funding rates above 0.05% per cycle. When rates stretch, spot pauses trigger cascading long liquidations. Extreme caution advised.
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-col justify-center gap-1.5">
              <div className="flex justify-between items-center text-[11px]">
                <span>Bybit Premium Margin:</span>
                <span className="text-slate-800 font-bold">1.2x Premium over Spot</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span>Binance Average Volume Index:</span>
                <span className="text-emerald-600 font-bold">HIGH LIQUIDITY</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ratio' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm" id="long-short-ratio-panel">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Aggregated Long/Short Account Ratios
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Measures buyer/seller account distribution across top derivatives venues (Binance, Bybit, OKX, and Deribit).
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-lg">
                Max Long Bias: ETH/USDT
              </span>
              <span className="text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-100 px-3 py-1 rounded-lg">
                Max Short Bias: BTC.D
              </span>
            </div>
          </div>

          {/* DUAL SUMMARY PANEL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider block mb-1">Global Leveraged Bias</span>
              <div className="text-lg font-black font-mono text-slate-800">51.8% Longs / 48.2% Shorts</div>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Slightly long-biased skew, denoting steady accumulation with balanced spot hedging.</p>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider block mb-1">Liquid Coinglass Approximation</span>
              <div className="text-lg font-black font-mono text-indigo-600">1.07x Mean Ratio</div>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Total active account positioning across all tracked derivative instruments.</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex flex-col justify-between">
              <div>
                <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider block mb-1">Macro Tactical Threat</span>
                <div className="text-xs font-extrabold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  LOW SQUEEZE HAZARD
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal mt-1 font-sans">Balanced contract load prevents immediate cascading margin liquidations.</p>
            </div>
          </div>

          {/* DETAIL GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="long-short-detail-cards">
            {data.openInterest.map((oi, idx) => {
              const ratioValue = oi.longRatio / oi.shortRatio;
              const skewColor = ratioValue > 1.2 ? "text-emerald-600" : ratioValue < 0.8 ? "text-rose-600" : "text-slate-600";
              const skewLabel = ratioValue > 1.2 ? "Bullish Leverage Skew" : ratioValue < 0.8 ? "Bearish Leverage Skew" : "Balanced Distribution";

              return (
                <div key={idx} className="border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between hover:border-slate-350 transition-all bg-white" id={`long-short-pair-${oi.symbol.replace('/', '-')}`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-sm text-slate-800">{oi.symbol}</span>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Long/Short Ratio</div>
                      <div className={`text-base font-black font-mono ${skewColor}`}>{ratioValue.toFixed(2)}x</div>
                    </div>
                  </div>

                  {/* VISUAL LEVEL BAR */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-[11px] font-mono font-bold">
                      <span className="text-emerald-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Long {oi.longRatio.toFixed(1)}%
                      </span>
                      <span className="text-rose-600 flex items-center gap-1">
                        Short {oi.shortRatio.toFixed(1)}%
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                      </span>
                    </div>
                    {/* Modern multi-segment ratio bar with glowing highlight */}
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex shadow-inner">
                      <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-l-full transition-all duration-500" style={{ width: `${oi.longRatio}%` }}></div>
                      <div className="bg-gradient-to-r from-rose-500 to-rose-400 h-full rounded-r-full transition-all duration-500" style={{ width: `${oi.shortRatio}%` }}></div>
                    </div>
                  </div>

                  {/* EXCHANGE SKEWS SUMMARY */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 text-[10px] font-mono space-y-2">
                    <div className="flex justify-between text-slate-500 font-semibold uppercase tracking-wider text-[9px] border-b border-slate-200/50 pb-1 mb-1">
                      <span>Venue</span>
                      <span>Account Skew</span>
                    </div>
                    {/* Binance Skew */}
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-sans">Binance Pro Account Skew:</span>
                      <span className="text-slate-800 font-bold">{(oi.longRatio * 1.01).toFixed(1)}% Long / {(oi.shortRatio * 0.99).toFixed(1)}% Short</span>
                    </div>
                    {/* Bybit Skew */}
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-sans">Bybit Retail Skew:</span>
                      <span className="text-slate-800 font-bold">{(oi.longRatio * 0.98).toFixed(1)}% Long / {(oi.shortRatio * 1.02).toFixed(1)}% Short</span>
                    </div>
                    {/* OKX Skew */}
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-sans">OKX Institutional Skew:</span>
                      <span className="text-slate-800 font-bold">{(oi.longRatio * 1.02).toFixed(1)}% Long / {(oi.shortRatio * 0.98).toFixed(1)}% Short</span>
                    </div>
                  </div>

                  {/* BOTTOM SUBTITLE */}
                  <div className="flex justify-between items-center mt-3 text-[10px] font-semibold text-slate-400">
                    <span>{skewLabel}</span>
                    <span className="text-indigo-600 font-mono font-bold uppercase text-[9px]">{oi.change24h >= 0 ? "+" : ""}{oi.change24h.toFixed(1)}% OI Change</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'oi' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm" id="open-interest-panel">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase">Open Interest (OI) & Accounts Positions</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Aggregate contract volume currently open across high-liquidity derivatives markets.</p>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Aggregated Global OI</div>
              <div className="text-base font-extrabold text-slate-800 font-mono">${(totalOI / 1e9).toFixed(2)} Billion</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.openInterest.map((oi, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-sm text-slate-800">{oi.symbol}</span>
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                    oi.change24h >= 0 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"
                  }`}>
                    {oi.change24h >= 0 ? "+" : ""}{oi.change24h.toFixed(2)}%
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Active Collateral Value</span>
                  <span className="text-lg font-bold text-indigo-600">${(oi.oiUsd / 1e9).toFixed(3)}B</span>
                </div>
                
                {/* Long vs Short meter */}
                <div className="space-y-1.5 text-[10px] font-sans">
                  <div className="flex justify-between text-slate-500 font-mono">
                    <span>Long ({oi.longRatio.toFixed(1)}%)</span>
                    <span>Short ({oi.shortRatio.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-rose-500 h-2 rounded overflow-hidden flex">
                    <div className="bg-emerald-500 h-full" style={{ width: `${oi.longRatio}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'liquidations' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm" id="liquidation-heatmap">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase">Liquidation Clustering Heatmap</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Simulated systemic liquidation tranches. High spikes represent dense stop-loss barrier fields.</p>
            </div>
            <div className="flex gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-500 rounded-sm"></span> Long stops</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-rose-500 rounded-sm"></span> Short leverage</span>
            </div>
          </div>

          {/* Render fully responsive inline-SVG Histogram */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
            <svg viewBox="0 0 500 200" className="w-full max-h-[220px]">
              {/* Axes lines */}
              <line x1="40" y1="20" x2="40" y2="170" stroke="#94a3b8" strokeWidth="1" strokeOpacity="1" />
              <line x1="40" y1="170" x2="480" y2="170" stroke="#94a3b8" strokeWidth="1" strokeOpacity="1" />

              {/* Grid Y lines */}
              <line x1="40" y1="70" x2="480" y2="70" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3" strokeOpacity="0.5" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3" strokeOpacity="0.5" />
              
              {/* Plot Bars */}
              {data.liquidationsHeatmap.map((item, idx) => {
                const barWidth = 40;
                const barX = 60 + idx * 65;
                const percentHeight = (item.liquidationVolume / 150000000) * 140; // Max size mapping
                const barY = 170 - percentHeight;
                const color = item.type === 'long' ? '#10b981' : '#f43f5e';
                
                return (
                  <g key={idx}>
                    <rect 
                      x={barX} 
                      y={barY} 
                      width={barWidth} 
                      height={percentHeight} 
                      fill={color} 
                      fillOpacity="0.85" 
                      rx="3"
                    />
                    {/* Val print */}
                    <text 
                      x={barX + barWidth/2} 
                      y={barY - 5} 
                      fill="#475569" 
                      fontSize="9" 
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      ${(item.liquidationVolume / 1e6).toFixed(0)}M
                    </text>
                    {/* Lvl label */}
                    <text 
                      x={barX + barWidth/2} 
                      y="185" 
                      fill="#64748b" 
                      fontSize="9" 
                      fontWeight="600"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      ${item.priceLevel.toLocaleString()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {activeTab === 'options' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm" id="options-strike-dist">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase">Options Flow & Max Pain Analysis</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Implied volatility (IV) and Open Interest contracts for upcoming high-importance expiries.</p>
            </div>
            <div className="text-right text-xs font-semibold">
              Max Pain Strike Estimate: <span className="text-amber-600 font-bold">$64,000</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-xs text-left border-collapse" id="options-table">
              <thead className="bg-[#f8fafc] text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="p-3 font-bold uppercase tracking-wider text-[10px]">Strike Price</th>
                  <th className="p-3 text-right font-bold uppercase tracking-wider text-[10px] text-emerald-600">Calls Open (Contracts)</th>
                  <th className="p-3 text-right font-bold uppercase tracking-wider text-[10px] text-rose-600">Puts Open (Contracts)</th>
                  <th className="p-3 text-right font-bold uppercase tracking-wider text-[10px]">Implied Volatility (IV)</th>
                  <th className="p-3 text-right font-bold uppercase tracking-wider text-[10px] text-indigo-600">P/C Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {data.optionsFlow.map((opt, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-all font-mono">
                    <td className="p-3 font-bold text-slate-900 font-sans">${opt.strikePrice.toLocaleString()}</td>
                    <td className="p-3 text-right text-emerald-600 font-semibold">{opt.callsOI.toLocaleString()}</td>
                    <td className="p-3 text-right text-rose-600 font-semibold">{opt.putsOI.toLocaleString()}</td>
                    <td className="p-3 text-right text-slate-600">{opt.iv.toFixed(1)}%</td>
                    <td className="p-3 text-right font-bold text-indigo-600">{(opt.putsOI / opt.callsOI).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
