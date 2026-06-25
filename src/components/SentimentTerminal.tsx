import React, { useState } from "react";
import { SentimentData } from "../types.js";
import { MessageSquare, Flame, FileText, Smile, Newspaper, Zap, Calendar, TrendingUp } from "lucide-react";

export default function SentimentTerminal({ data }: { data: SentimentData }) {
  // Active selected article for the interactive news analysis detail panel
  const [selectedNewsIdx, setSelectedNewsIdx] = useState<number>(0);

  const activeArticle = data.newsAggregated[selectedNewsIdx] || data.newsAggregated[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="sentiment-terminal-container">
      {/* COLUMN 1: NARRATIVE VELOCITY MONITOR */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col h-[60vh] min-h-[420px]" id="narrative-velocity-monitor">
        <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
          <Flame className="w-4 h-4 text-indigo-600" />
          Narrative Social Velocity Tracker
        </h3>

        <p className="text-[11px] text-slate-400 mb-3 leading-snug">
          Measures the velocity of specific social narratives over the last 24-hours across financial media platforms. Surges represent leading indicators for momentum capital shifts.
        </p>

        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {data.tweeterVelocity.map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-bold text-slate-800 text-xs truncate w-40">{item.narrative}</span>
                <span className="text-emerald-600 font-bold font-mono text-[11px]">+{item.momentumChange}%</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Social Weight (24h):</span>
                <span className="text-slate-700 font-semibold">{item.tweetCount24h.toLocaleString()} mentions</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, (item.tweetCount24h / 80000) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COLUMN 2 & 3: CRYPTO NEWS INTELLIGENCE SPLIT SYSTEM */}
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col h-[60vh] min-h-[420px]" id="crypto-news-intelligence-terminal">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2">
              <Newspaper className="w-4.5 h-4.5 text-indigo-600" />
              Crypto News Intelligence
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Live fundamental updates fused with quant sentiment matrices and automated systemic trade direction projections.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-indigo-500 text-indigo-600" />
            AI Analytics Synchronized
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 overflow-hidden">
          {/* Headline Feed Panel (Left 5 cols on md+) */}
          <div className="md:col-span-5 flex flex-col h-full overflow-hidden border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Latest Bulletin Feed
            </div>
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1.5 scrollbar-thin">
              {data.newsAggregated.map((news, idx) => {
                const isSelected = selectedNewsIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedNewsIdx(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? "bg-indigo-50/50 border-indigo-600 shadow-sm"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/30"
                    }`}
                  >
                    <div className="flex justify-between items-center text-[9px] font-mono font-bold">
                      <span className="text-indigo-600 uppercase">{news.source}</span>
                      <span className="text-slate-400 font-semibold">{news.time}</span>
                    </div>
                    
                    <h4 className={`text-[11px] leading-snug font-bold ${
                      isSelected ? "text-indigo-950 font-extrabold" : "text-slate-800"
                    }`}>
                      {news.title}
                    </h4>

                    <div className="flex gap-2 mt-0.5">
                      <span className="text-[9px] font-semibold text-slate-400">
                        {news.category || "GENERAL"}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className={`text-[9px] font-mono font-bold ${
                        news.sentimentScore >= 0.75 ? "text-emerald-600" : "text-amber-600"
                      }`}>
                        {(news.sentimentScore * 100).toFixed(0)}% Pos
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deep Analytics & Briefing Panel (Right 7 cols on md+) */}
          <div className="md:col-span-7 flex flex-col justify-between h-full overflow-y-auto pr-1">
            {activeArticle ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 font-mono tracking-wider">
                      {activeArticle.category || "CRYPTO MARKET INTEL"}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-[10px] text-slate-400 font-bold font-mono">
                      SOURCE: {activeArticle.source.toUpperCase()}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[10px] text-slate-400 font-semibold font-mono">
                      {activeArticle.time}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-950 leading-snug">
                    {activeArticle.title}
                  </h3>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5 space-y-3.5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                      Quantitative Executive Summary
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {activeArticle.summary || "No automated summary currently recorded. This institutional bulletin is categorized under critical fundamental action loops."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 pt-3 border-t border-slate-200">
                    <div className="space-y-1">
                      <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                        Sentiment Multiplier
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Smile className={`w-4 h-4 ${activeArticle.sentimentScore >= 0.75 ? "text-emerald-500" : "text-amber-500"}`} />
                        <span className="text-xs font-bold font-mono text-slate-800">
                          {activeArticle.sentimentScore >= 0.75 ? "Highly Positive" : "Moderate Consolidated"} ({Math.round(activeArticle.sentimentScore * 100)}%)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                        Systemic Impact Weight
                      </span>
                      <span className={`inline-block text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md border ${
                        activeArticle.impactWeight === "HIGH" 
                          ? "bg-rose-50 text-rose-700 border-rose-100" 
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}>
                        {activeArticle.impactWeight} VOLATILITY IMPACT
                      </span>
                    </div>
                  </div>
                </div>

                {activeArticle.predictedAssetImpact && (
                  <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3.5 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-extrabold text-indigo-400 uppercase tracking-wider block">
                        Target Projection Direction
                      </span>
                      <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                        Systemic Trade Momentum
                      </span>
                    </div>
                    <span className="text-xs font-black font-mono text-indigo-700 bg-indigo-100/80 px-3 py-1.5 rounded-lg border border-indigo-200 shadow-sm">
                      {activeArticle.predictedAssetImpact}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center py-6">
                <FileText className="w-8 h-8 text-slate-300 mb-2" />
                <p className="text-xs font-bold font-sans">Select any headline from the newsfeed to see detailed market intelligence.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
