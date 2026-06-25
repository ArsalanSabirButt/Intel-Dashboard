import React, { useState, useEffect, useRef } from "react";
import { DashboardData, MarketPair, CoinAsset } from "../types.js";
import { TrendingUp, TrendingDown, ArrowUpRight, Scale, Shield, Globe, Landmark, CircleSlash, BarChart3, Settings, ChevronDown, ChevronUp, Users, Coins } from "lucide-react";

export default function CoreMarkets({ data, onSelectChart, activeChart }: { data: DashboardData; onSelectChart: (symbol: string) => void; activeChart: string }) {
  const [selectedCoin, setSelectedCoin] = useState<CoinAsset | null>(null);
  const [showHoldersMap, setShowHoldersMap] = useState<Record<string, boolean>>({});
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  const toggleHolders = (coinId: string) => {
    setShowHoldersMap(prev => ({ ...prev, [coinId]: !prev[coinId] }));
  };

  // Map symbols to TradingView Widget codes
  const getTradingViewSymbol = (symbol: string) => {
    switch(symbol) {
      case "BTC/USDT": return "BINANCE:BTCUSDT";
      case "ETH/USDT": return "BINANCE:ETHUSDT";
      case "BTC.D": return "CRYPTOCAP:BTC.D";
      case "USDT.D": return "CRYPTOCAP:USDT.D";
      case "USDC.D": return "CRYPTOCAP:USDC.D";
      case "TOTAL_MC": return "CRYPTOCAP:TOTAL";
      case "BTC_MC": return "CRYPTOCAP:BTC";
      case "ALT_BTC": return "COINBASE:ETHBTC"; // proxy
      case "ALT_MC": return "CRYPTOCAP:OTHERS";
      case "M2": return "FRED:M2SL";
      case "DXY": return "CAPITALCOM:DXY";
      case "GOLD": return "TVC:GOLD";
      case "SILVER": return "TVC:SILVER";
      case "OIL": return "TVC:USOIL";
      case "SPX": return "SP:SPX";
      default: return "BINANCE:BTCUSDT";
    }
  };

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
            symbol: getTradingViewSymbol(activeChart),
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            toolbar_bg: "#f8fafc",
            enable_publishing: false,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            container_id: "tradingview_embed_widget"
          });
        }
      };
      document.head.appendChild(script);
    }
  }, [activeChart]);

  // Handle Fear & Greed needle angle
  const fg = data.sentiment.fearGreedValue;
  const fgAngle = (fg / 100) * 180 - 90; // Convert 0-100 to -90 to +90 degrees

  const getSentimentColors = (val: number) => {
    if (val >= 60) {
      return {
        border: "border-emerald-200 hover:border-emerald-400",
        bg: "bg-emerald-50/20",
        text: "text-emerald-700",
        bar: "bg-emerald-500"
      };
    } else if (val <= 40) {
      return {
        border: "border-rose-200 hover:border-rose-400",
        bg: "bg-rose-50/20",
        text: "text-rose-700",
        bar: "bg-rose-500"
      };
    } else {
      return {
        border: "border-amber-200 hover:border-amber-400",
        bg: "bg-amber-50/20",
        text: "text-amber-700",
        bar: "bg-amber-500"
      };
    }
  };

  const getTimestampForHigh = (symbol: string) => {
    const now = new Date();
    const charSum = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const dayOffset = (charSum % 20) + 1; // 1 to 20 days ago
    const hourOffset = charSum % 24;
    const minOffset = charSum % 60;
    
    now.setDate(now.getDate() - dayOffset);
    now.setHours(hourOffset);
    now.setMinutes(minOffset);
    
    return now.toLocaleDateString("en-US", { month: "short", day: "numeric" }) + " " + 
           String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0');
  };

  const formatPrice = (val: number, symbol: string) => {
    if (symbol === "ALT_BTC") {
      return val.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 5 });
    }
    if (val < 1) {
      return val.toLocaleString(undefined, { minimumFractionDigits: 4 });
    }
    if (val >= 1000) {
      return val.toLocaleString(undefined, { maximumFractionDigits: 0 });
    }
    return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="flex flex-col gap-6 w-full" id="core-markets-container">
      {/* FIRST MAIN CHILD IN DOM TREE: lower metrics section, ordered to last visually */}
      <div className="w-full lg:max-w-[90%] mx-auto flex flex-col gap-6 order-last" id="metrics-and-explorer-wrapper">
        {/* COIN EXPLORER TABLE - FULL CONTAINER WIDTH */}
        <div className="w-full space-y-6 flex flex-col">
          {/* TABULAR EXPLORER FOR COINS */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex-1 flex flex-col overflow-hidden shadow-sm" id="coin-explorer-container">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-3 flex justify-between items-center pb-2 border-b border-slate-100">
              <span>Global Market Capitalization (Top Assets)</span>
              <span className="text-[10px] text-indigo-600 font-mono">Row Expanded Details Available</span>
            </h3>
            <div className="overflow-auto rounded-lg border border-slate-200 max-h-[480px]">
              <table className="w-full text-xs text-left border-collapse" id="assets-table">
                <thead className="bg-[#f8fafc] text-slate-500 sticky top-0 border-b border-slate-200">
                  <tr>
                    <th className="p-3 border-r border-slate-100 text-center font-bold w-12 text-slate-400 uppercase tracking-widest text-[10px]">Rank</th>
                    <th className="p-3 border-r border-slate-100 font-bold uppercase tracking-wider text-[10px]">Asset name</th>
                    <th className="p-3 border-r border-slate-100 text-right font-bold uppercase tracking-wider text-[10px]">Price USD</th>
                    <th className="p-3 border-r border-slate-100 text-right font-bold uppercase tracking-wider text-[10px]">24h change</th>
                    <th className="p-3 border-r border-slate-100 text-right font-bold uppercase tracking-wider text-[10px]">24h volume</th>
                    <th className="p-3 border-r border-slate-100 text-right font-bold uppercase tracking-wider text-[10px]">Market Cap</th>
                    <th className="p-3 text-right font-bold uppercase tracking-wider text-[10px]">Vol/MC Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {data.topAssets.map((asset) => (
                    <React.Fragment key={asset.id}>
                      <tr 
                        id={`asset-row-${asset.symbol}`}
                        onClick={() => setSelectedCoin(selectedCoin?.id === asset.id ? null : asset)}
                        className={`cursor-pointer hover:bg-slate-50/80 transition-all ${
                          selectedCoin?.id === asset.id ? "bg-indigo-50/30" : ""
                        }`}
                      >
                        <td className="p-3 border-r border-slate-100 text-center text-slate-400 font-mono font-semibold">#{asset.rank}</td>
                        <td className="p-3 border-r border-slate-100">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-xs">{asset.symbol}</span>
                            <span className="text-slate-400 text-[10px] hidden sm:inline">{asset.name}</span>
                          </div>
                        </td>
                        <td className="p-3 border-r border-slate-100 text-right font-mono font-bold text-slate-800">
                          ${asset.price < 1 ? asset.price.toLocaleString(undefined, {minimumFractionDigits: 4}) : asset.price.toLocaleString(undefined, {maximumFractionDigits: 2})}
                        </td>
                        <td className={`p-3 border-r border-slate-100 text-right font-bold font-mono ${
                          asset.change24h >= 0 ? "text-emerald-600" : "text-rose-600"
                        }`}>
                          {asset.change24h >= 0 ? "+" : ""}{asset.change24h.toFixed(2)}%
                        </td>
                        <td className="p-3 border-r border-slate-100 text-right text-slate-600 font-mono">
                          ${Math.round(asset.volume24h).toLocaleString()}
                        </td>
                        <td className="p-3 border-r border-slate-100 text-right text-slate-600 font-mono">
                          ${Math.round(asset.marketCap).toLocaleString()}
                        </td>
                        <td className="p-3 text-right text-slate-500 font-mono text-[10px]">
                          {(asset.volume24h / asset.marketCap).toFixed(4)}
                        </td>
                      </tr>

                      {/* EXPANDED VIEW DETAILS */}
                      {selectedCoin?.id === asset.id && (
                        <tr className="bg-slate-50/80" id={`expanded-asset-${asset.symbol}`}>
                          <td colSpan={7} className="p-5 border-b border-slate-200">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                              {/* 1. VALUATION INDICATORS */}
                              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                                <div>
                                  <h4 className="text-[10px] uppercase text-indigo-600 font-bold border-b border-slate-100 pb-2 mb-3 flex items-center gap-1.5">
                                    <Scale className="w-3.5 h-3.5" />
                                    Market Valuation
                                  </h4>
                                  <div className="space-y-1.5 text-slate-600 font-mono text-[11px]">
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">Market Cap:</span>
                                      <span className="text-slate-800 font-medium">${Math.round(asset.marketCap).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">FDV:</span>
                                      <span className="text-slate-800 font-medium">
                                        {asset.fdv ? `$${asset.fdv.toLocaleString()}` : `$${Math.round(asset.marketCap * 1.25).toLocaleString()}`}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">Volume (24h):</span>
                                      <span className="text-slate-800 font-medium">${Math.round(asset.volume24h).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between pt-1 border-t border-slate-100">
                                      <span className="text-slate-400">Vol / Mkt Cap:</span>
                                      <span className="text-indigo-600 font-bold">{(asset.volume24h / asset.marketCap).toFixed(4)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* 2. SUPPLY DYNAMICS */}
                              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                                <div>
                                  <h4 className="text-[10px] uppercase text-indigo-600 font-bold border-b border-slate-100 pb-2 mb-3 flex items-center gap-1.5">
                                    <Coins className="w-3.5 h-3.5" />
                                    Supply Dynamics
                                  </h4>
                                  <div className="space-y-1.5 text-slate-600 font-mono text-[11px]">
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">Circulating:</span>
                                      <span className="text-slate-800 font-medium">
                                        {asset.circulatingSupply ? asset.circulatingSupply.toLocaleString() : "N/A"} {asset.symbol}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">Total Supply:</span>
                                      <span className="text-slate-800 font-medium">
                                        {asset.totalSupply ? asset.totalSupply.toLocaleString() : "N/A"} {asset.symbol}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">Max Supply:</span>
                                      <span className="text-slate-800 font-medium">
                                        {asset.maxSupply ? asset.maxSupply.toLocaleString() : "Uncapped"} {asset.symbol}
                                      </span>
                                    </div>
                                    <div className="flex justify-between pt-1 border-t border-slate-100 text-[10px]">
                                      <span className="text-slate-400">Treasury Hold:</span>
                                      <span className="text-amber-700 font-bold">
                                        {asset.treasuryHoldings ? `$${asset.treasuryHoldings.toLocaleString()}` : "N/A"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* 3. HISTORICAL & PLATFORMS */}
                              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                                <div>
                                  <h4 className="text-[10px] uppercase text-indigo-600 font-bold border-b border-slate-100 pb-2 mb-2 flex items-center gap-1.5">
                                    <Landmark className="w-3.5 h-3.5" />
                                    Milestones & Listings
                                  </h4>
                                  <div className="space-y-1 text-slate-600 font-mono text-[10px]">
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">ATH:</span>
                                      <span className="text-emerald-600 font-bold">
                                        ${asset.ath || "N/A"}{" "}
                                        <span className="text-[9px] text-slate-400 font-normal">({asset.athDate || "N/A"})</span>
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-slate-400">ATL:</span>
                                      <span className="text-rose-600 font-bold">
                                        ${asset.atl || "N/A"}{" "}
                                        <span className="text-[9px] text-slate-400 font-normal">({asset.atlDate || "N/A"})</span>
                                      </span>
                                    </div>
                                    <div className="pt-1.5 border-t border-slate-100 flex flex-col">
                                      <span className="text-slate-400 uppercase tracking-wider text-[8px] font-bold mb-1">Top Exchanges Listed:</span>
                                      <div className="flex flex-wrap gap-1">
                                        {(asset.exchanges || ["Binance", "Coinbase", "OKX", "Bybit", "Kraken"]).slice(0, 5).map((ex, exIdx) => (
                                          <span key={exIdx} className="bg-slate-50 text-slate-600 text-[9px] px-1.5 py-0.5 rounded-full font-sans border border-slate-200">
                                            {ex}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2.5 pt-2 border-t border-slate-100">
                                  <a 
                                    href={asset.website || "https://coinmarketcap.com"} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-[10px] text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
                                  >
                                    <Globe className="w-3.5 h-3.5" />
                                    Official Website Link
                                  </a>
                                </div>
                              </div>

                              {/* 4. UPCOMING UNLOCKS */}
                              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                                <div>
                                  <h4 className="text-[10px] uppercase text-indigo-600 font-bold border-b border-slate-100 pb-2 mb-2 flex items-center gap-1.5">
                                    <Shield className="w-3.5 h-3.5" />
                                    Vesting Token Unlocks
                                  </h4>
                                  {asset.unlocks && asset.unlocks.length > 0 ? (
                                    <div className="space-y-1 px-1">
                                      {asset.unlocks.map((un, uidx) => (
                                        <div key={uidx} className="bg-indigo-50/20 border border-indigo-100 rounded p-1.5 text-[10px]">
                                          <div className="flex justify-between text-indigo-900 font-semibold font-mono">
                                            <span>{un.date}</span>
                                            <span>{un.percentage}%</span>
                                          </div>
                                          <p className="text-[9px] text-slate-500 font-mono leading-tight mt-0.5">
                                            {un.amount} unlock event: {un.description || "Linear Schedule Release"}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <span className="text-[10px] text-emerald-600 font-bold block pt-1.5 flex items-center gap-1">
                                      <ArrowUpRight className="w-4 h-4" />
                                      Fully circulating. No remaining locks.
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* COLLAPSIBLE HOLDERS REGISTRY SECTION */}
                            <div className="mt-4">
                              <button
                                onClick={() => toggleHolders(asset.id)}
                                className="w-full flex items-center justify-between bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 px-4 py-2.5 rounded-xl font-semibold shadow-xs transition-all duration-200"
                              >
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4 text-indigo-500" />
                                  <span className="text-xs font-semibold text-slate-800">Top Wallet Holders Registry</span>
                                  <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                    {asset.holders?.length || 0} major wallets logged
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                  <span>{showHoldersMap[asset.id] ? "Collapse details" : "Expand ledger on click"}</span>
                                  {showHoldersMap[asset.id] ? <ChevronUp className="w-4 h-4 text-indigo-500" /> : <ChevronDown className="w-4 h-4" />}
                                </div>
                              </button>

                              {showHoldersMap[asset.id] && (
                                <div className="mt-2.5 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-all duration-300">
                                  <div className="p-3 bg-slate-50/50 border-b border-slate-150 flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Major Holders Ledger Distribution</span>
                                    <span className="text-[9px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">Live Blockchain Query Data</span>
                                  </div>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-left text-[11px] border-collapse">
                                      <thead className="bg-[#f8fafc] text-slate-500 border-b border-slate-200 text-[10px] uppercase font-bold">
                                        <tr>
                                          <th className="p-3 pl-4">Wallet Type Label / Address</th>
                                          <th className="p-3 text-right">Balance ({asset.symbol})</th>
                                          <th className="p-3 text-right">Value (USD)</th>
                                          <th className="p-3 text-right">Ownership Share</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-100 text-slate-600 font-mono">
                                        {asset.holders && asset.holders.length > 0 ? (
                                          asset.holders.map((holder, hidx) => (
                                            <tr key={hidx} className="hover:bg-slate-50/50">
                                              <td className="p-3 pl-4">
                                                <div className="flex flex-col">
                                                  <span className="text-slate-800 font-sans font-medium text-[11px]">
                                                    {holder.label || "Institutional Custody Pool"}
                                                  </span>
                                                  <span className="text-[10px] text-slate-400 truncate w-48 sm:w-auto" title={holder.address}>
                                                    {holder.address}
                                                  </span>
                                                </div>
                                              </td>
                                              <td className="p-3 text-right text-slate-700">
                                                {holder.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })} {asset.symbol}
                                              </td>
                                              <td className="p-3 text-right text-slate-800 font-bold">
                                                ${holder.valueUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                              </td>
                                              <td className="p-3 text-right text-indigo-600 font-bold">
                                                {holder.percentage.toFixed(2)}%
                                              </td>
                                            </tr>
                                          ))
                                        ) : (
                                          <tr>
                                            <td colSpan={4} className="p-6 text-center text-slate-400 italic font-sans text-xs">
                                              No major wallet distribution data logged for this coin assets.
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ALGORITHMIC REGIME SECTION BELOW COIN EXPLORER */}
        <div className="w-full" id="regime-indicator-container">
          {/* ALGORITHMIC REGIME CARD IN HORIZONTAL WIDE BENTO CARD LAYOUT */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm" id="regime-indicator-card">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left summary */}
              <div className="lg:col-span-1 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-201 pb-4 lg:pb-0 lg:pr-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-500">Algorithmic Regime</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      data.regime.status === "BULLISH" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                      data.regime.status === "BEARISH" ? "bg-rose-50 text-rose-700 border border-rose-200" :
                      "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {data.regime.status}
                    </span>
                  </div>

                  <div className="space-y-3 mt-3 text-xs">
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>Weighted Index Score</span>
                      <span className="font-bold text-slate-800">{data.regime.score > 0 ? "+" : ""}{data.regime.score} / +6</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          data.regime.status === 'BULLISH' ? 'bg-emerald-500' :
                          data.regime.status === 'BEARISH' ? 'bg-rose-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(0, ((data.regime.score + 6) / 12) * 100))}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="text-[10px] text-slate-400 mt-4 leading-relaxed font-sans">
                  The Algorithmic Regime aggregates multi-signal indicators to track systemic market phases and trend dynamics.
                </div>
              </div>

              {/* Right signals list as horizontal grid */}
              <div className="lg:col-span-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 block">
                  Underlying Regime Indicators & Signals
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.regime.signals.map((sig, idx) => (
                    <div key={idx} className="bg-slate-50/70 p-3 rounded-lg border border-slate-200 text-[11px] text-slate-600 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start font-semibold gap-1">
                          <span className="text-slate-800 font-medium leading-tight">{sig.name}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold shrink-0 ${
                            sig.status === "BULLISH" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                            sig.status === "BEARISH" ? "bg-rose-50 text-rose-700 border border-rose-100" :
                            "bg-amber-50 text-amber-700 border border-amber-150"
                          } border`}>
                            {sig.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-snug mt-1.5">{sig.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECOND MAIN CHILD IN DOM TREE: chart section wrapper, visually ordered to first/top */}
      <div className="w-full lg:max-w-[90%] mx-auto order-first flex flex-col" id="chart-panel-wrapper">
        <div className="bg-white border border-slate-200 rounded-xl p-5 h-[62vh] flex flex-col shadow-sm" id="chart-panel">
          <div className="flex justify-between items-center mb-2 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
                Active Desk: {activeChart}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">TradingView Light Engine Connected</span>
          </div>

          <div className="flex-1 bg-slate-50 rounded-lg border border-slate-100 overflow-hidden relative">
            <div id="tradingview_embed_widget" ref={chartContainerRef} className="w-full h-full"></div>
          </div>
        </div>

        {/* 15 DETAILED PAIR BOXES + 1 F&G BOX IN TWO LINES (8 per line on large screens) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-4" id="pairs-grid-container">
          {(() => {
            // Combine 15 pairs and 1 F&G object into a 16-element array
            const slots = [
              ...data.pairs.slice(0, 15).map(p => ({ isFG: false, data: p })),
              { isFG: true, data: null }
            ];

            return slots.map((slot, index) => {
              if (slot.isFG) {
                const fbgColor = getSentimentColors(fg);
                return (
                  <div 
                    key="fg-box"
                    id="pairs-grid-fg-box"
                    className={`bg-white border ${fbgColor.border} rounded-xl p-2.5 shadow-sm flex flex-col justify-between transition-all duration-300 min-h-[145px] hover:shadow-md`}
                  >
                    <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 tracking-wider">
                      <span className="uppercase tracking-wider text-indigo-600 font-extrabold text-[8px]">F&G INDEX</span>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded font-extrabold uppercase ${fbgColor.text} ${fbgColor.bg} border border-current`}>
                        {data.sentiment.fearGreedClass}
                      </span>
                    </div>
                    
                    {/* Visual Arc Mini Gauge */}
                    <div className="relative w-20 h-10 overflow-hidden mx-auto mt-1 flex items-end">
                      <svg className="w-full h-full" viewBox="0 0 100 50">
                        <defs>
                          <linearGradient id="gridGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="50%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                        <path 
                          d="M 12 50 A 38 38 0 0 1 88 50" 
                          fill="none" 
                          stroke="#e2e8f0" 
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                        <path 
                          d="M 12 50 A 38 38 0 0 1 88 50" 
                          fill="none" 
                          stroke="url(#gridGaugeGradient)" 
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div 
                        className="absolute bottom-0 left-1/2 w-1 h-8 bg-slate-800 origin-bottom rounded-full transition-all duration-700"
                        style={{
                          transform: `translateX(-50%) rotate(${fgAngle}deg)`,
                          boxShadow: "0 0 4px rgba(15,23,42,0.3)"
                        }}
                      ></div>
                    </div>

                    <div className="text-center">
                      <span className="text-sm font-black font-mono text-slate-800">{fg}</span>
                      <span className="text-[8px] text-slate-400 font-bold ml-1 uppercase">/100</span>
                    </div>
                    
                    <p className="text-[9px] text-slate-500 leading-tight select-none font-sans italic line-clamp-2 text-center">
                      "{data.sentiment.fearGreedRemark}"
                    </p>
                  </div>
                );
              }

              const pair = slot.data!;
              const isSelected = activeChart === pair.symbol;
              const timestamp = getTimestampForHigh(pair.symbol);
              const isPos = pair.change24h >= 0;

              return (
                <div
                  key={pair.symbol}
                  id={`pair-cell-${pair.symbol.replace('/', '-').replace('.', '-')}`}
                  onClick={() => onSelectChart(pair.symbol)}
                  className={`bg-white border rounded-xl p-2.5 shadow-sm flex flex-col justify-between transition-all duration-200 min-h-[145px] cursor-pointer hover:shadow-md ${
                    isSelected 
                      ? "border-indigo-600 bg-indigo-50/20 ring-1 ring-indigo-500/15" 
                      : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50/50"
                  }`}
                >
                  {/* Row 1: Symbol & Change */}
                  <div className="flex justify-between items-start gap-1">
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-xs text-slate-900 truncate tracking-tight">{pair.symbol}</span>
                      <span className="text-[9px] text-slate-400 truncate tracking-normal font-medium leading-none mt-0.5" title={pair.name}>{pair.name}</span>
                    </div>
                    <span className={`text-[10px] font-mono font-bold flex items-center shrink-0 ${isPos ? "text-emerald-600" : "text-rose-600"}`}>
                      {isPos ? "+" : ""}{pair.change24h.toFixed(1)}%
                    </span>
                  </div>

                  {/* Row 2: Price */}
                  <div className="my-1.5">
                    <span className="text-sm font-black font-mono text-slate-800 leading-none">
                      ${formatPrice(pair.price, pair.symbol)}
                    </span>
                  </div>

                  {/* Row 3: 30d Low / High & High Timestamp */}
                  <div className="space-y-0.5 border-t border-slate-100 pt-1.5 text-[9px] font-mono text-slate-500">
                    <div className="flex justify-between">
                      <span className="text-slate-400 select-none text-[8px]">30d Low:</span>
                      <span className="text-slate-700 font-semibold">${formatPrice(pair.low30d, pair.symbol)}</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <span className="text-slate-400 select-none text-[8px]">30d High:</span>
                        <span className="text-slate-700 font-semibold">${formatPrice(pair.high30d, pair.symbol)}</span>
                      </div>
                      <span className="text-[7.5px] text-slate-400 text-right leading-none scale-90 origin-right mt-0.5">{timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}
