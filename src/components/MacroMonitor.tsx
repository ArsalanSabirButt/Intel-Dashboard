import React from "react";
import { MacroData } from "../types.js";
import { Landmark, Calendar, Activity, Zap } from "lucide-react";

export default function MacroMonitor({ data }: { data: MacroData }) {
  // Compute spreads
  const yieldSpread2Y10Y = data.yield10Y - data.yield2Y;
  const isInverted = yieldSpread2Y10Y < 0;

  return (
    <div className="space-y-6" id="macro-container">
      {/* CARD 1: GLOBAL M2 LIQUIDITY INDEX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between" id="m2-liquidity-card">
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-indigo-600" />
              Global M2 Liquidity Index
            </h3>
            <p className="text-[11px] text-slate-400 block leading-tight mb-4">Total fiat money supply circulating across USA, China, EU, Japan, UK. This is the absolute ultimate macro driver for long-term crypto appreciation.</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold block">M2 Money Index</span>
              <span className="text-base font-extrabold text-slate-800">${data.m2Liquidity.toFixed(1)} Trillion</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold block">Year-over-Year Growth</span>
              <span className="text-emerald-600 font-bold">+{data.m2ChangeYoy.toFixed(2)}%</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 italic leading-relaxed mt-4 border-l-2 border-indigo-500 pl-3">
            "Bitcoin acts as a monetary sponge. When global fiat supply expands, BTC absorbs a highly leveraged premium coefficient of that capital."
          </p>
        </div>

        {/* CARD 2: GOVERNMENT BOND YIELD CURVE */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2 mb-2.5">
              <Landmark className="w-4 h-4 text-indigo-600" />
              US Treasury Bond Yield Curve
            </h3>
            <p className="text-[11px] text-slate-400 block leading-tight mb-4">Treasury yields reflect macro interest rates and inflation expectations.</p>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center font-mono my-2 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 block font-sans">3-Month</span>
              <span className="text-slate-800 font-extrabold">{data.yield3M.toFixed(2)}%</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 block font-sans">2-Year</span>
              <span className="text-slate-800 font-extrabold">{data.yield2Y.toFixed(2)}%</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 block font-sans">10-Year</span>
              <span className="text-slate-800 font-extrabold">{data.yield10Y.toFixed(2)}%</span>
            </div>
            <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200">
              <span className="text-[10px] text-amber-700 block font-sans font-semibold">Real Yield</span>
              <span className="text-amber-700 font-extrabold">{data.realYield10Y.toFixed(2)}%</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs font-mono border-t border-slate-100 pt-3 mt-4 flex-wrap gap-2">
            <span className="text-slate-500 font-sans font-medium">Yield Spread (10Y - 2Y):</span>
            <span className={`font-bold px-2.5 py-1 rounded-full text-xs font-sans ${
              isInverted ? "bg-rose-550/10 text-rose-700 border border-rose-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
            }`}>
              {yieldSpread2Y10Y.toFixed(2)}% ({isInverted ? "Inverted - Recession Risk" : "Normalizing Spread"})
            </span>
          </div>
        </div>
      </div>

      {/* INSTITUTIONAL SPOT ETF INFLOW TRACKER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm" id="etf-flows-tracker">
          <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-4 flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              Institutional Bitcoin Spot ETF Flows
            </span>
            <span className="text-[10px] text-indigo-605 font-bold uppercase tracking-widest font-mono">Form-13F Sync Active</span>
          </h3>

          <div className="overflow-x-auto rounded-lg border border-slate-200 text-xs">
            <table className="w-full text-left" id="etf-table">
              <thead className="bg-[#f8fafc] text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="p-3 font-semibold text-[10px] uppercase tracking-wider">Custodian Fund Name</th>
                  <th className="p-3 text-center font-semibold text-[10px] uppercase tracking-wider">Ticker</th>
                  <th className="p-3 text-right font-semibold text-[10px] uppercase tracking-wider">Daily netflow</th>
                  <th className="p-3 text-right font-semibold text-[10px] uppercase tracking-wider">Cumulative netflow</th>
                  <th className="p-3 text-right font-semibold text-[10px] uppercase tracking-wider text-slate-700">Fund AUM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                {data.etfFlows.map((etf, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                    <td className="p-3 font-bold text-slate-900 font-sans">{etf.fund}</td>
                    <td className="p-3 text-center">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">{etf.ticker}</span>
                    </td>
                    <td className={`p-3 text-right font-bold ${etf.dailyInflow >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {etf.dailyInflow >= 0 ? "+" : ""}{etf.dailyInflow.toFixed(1)}M USD
                    </td>
                    <td className="p-3 text-right text-slate-500">${etf.cumulativeInflow.toFixed(1)}B</td>
                    <td className="p-3 text-right font-extrabold text-slate-800">${etf.aum.toFixed(1)}B</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* HIGH VELOCITY ECONOMIC CALENDAR */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm" id="economic-calendar">
          <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            Macro Economic Calendar
          </h3>

          <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
            {data.economicCalendar.map((ev, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-[11px]">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-slate-400 font-semibold">{ev.time}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    ev.importance === "HIGH" ? "bg-rose-50 text-rose-700 border border-rose-100" : "bg-amber-50 text-amber-700 border border-amber-100"
                  }`}>
                    {ev.importance} IMPACT
                  </span>
                </div>
                <div className="text-slate-800 font-bold leading-normal mb-2 font-sans select-none">{ev.event}</div>
                <div className="flex justify-between text-[10px] text-slate-500 pr-2">
                  <span>Prev: <strong className="text-slate-700">{ev.previous}</strong></span>
                  <span>Fore: <strong className="text-slate-700">{ev.forecast}</strong></span>
                  {ev.actual && <span>Actual: <strong className="text-emerald-600">{ev.actual}</strong></span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
