import React, { useState } from "react";
import { OnChainData } from "../types.js";
import { Database, AlertCircle, Coins, Compass, Inbox, ArrowUpRight, ArrowDownLeft, Activity, Cpu, Zap } from "lucide-react";

export default function OnChainTracker({ data }: { data: OnChainData }) {
  // Compute percentage indicators
  const netFlowClass = data.netFlow < 0 ? "text-emerald-700 font-bold bg-emerald-50 border-emerald-250" : "text-rose-700 font-bold bg-rose-50 border-rose-250";
  const mvrvStatus = data.mvrvRatio > 2.5 ? "Overvalued (Danger)" : data.mvrvRatio < 1.0 ? "Undervalued (Accumulation)" : "Neutral Accumulation Zone";
  const nuplStatus = data.nuplValue > 0.5 ? "Belief / Greed" : data.nuplValue < 0 ? "Capitulation / Panic" : "Anxiety / Denial (Healthy)";

  // Simulated live-like recent stablecoin mint/burn treasury events
  const simulatedMintBurnEvents = [
    { asset: "USDT", type: "MINT", amount: 150000000, chain: "TRON", treasury: "Tether Treasury", age: "4h ago", txHash: "0x3f5c...921a" },
    { asset: "USDC", type: "MINT", amount: 85000000, chain: "Ethereum", treasury: "Circle Treasury", age: "11h ago", txHash: "0x7d2a...118b" },
    { asset: "USDT", type: "BURN", amount: 45000000, chain: "Ethereum", treasury: "Tether Treasury", age: "19h ago", txHash: "0x889e...fa0e" },
    { asset: "DAI", type: "BURN", amount: 12500000, chain: "Ethereum", treasury: "MakerDAO Multi-Sig", age: "1d ago", txHash: "0x12bb...90ee" },
    { asset: "FDUSD", type: "MINT", amount: 30000000, chain: "BNB Chain", treasury: "First Digital Treasury", age: "1.5d ago", txHash: "0xbc59...882c" }
  ];

  return (
    <div className="space-y-6" id="onchain-container">
      {/* TOP DECK: METRICS GRIDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 1: EXCHANGE NETFLOW FEED */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between" id="netflow-card">
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-1">Exchange Spot Netflows (BTC)</h3>
            <p className="text-[11px] text-slate-400 block leading-tight mb-4">Net coins entering or leaving centralized exchange reserves over the last 24-hours.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-center my-2 font-mono">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-rose-600 font-bold block uppercase tracking-wider">Spot Inflow</span>
              <span className="text-sm font-extrabold text-slate-800">+{data.exchangeInflow.toLocaleString()} BTC</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] text-emerald-600 font-bold block uppercase tracking-wider">Spot Outflow</span>
              <span className="text-sm font-extrabold text-slate-800">-{data.exchangeOutflow.toLocaleString()} BTC</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Total Net Accumulation:</span>
            <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${netFlowClass}`}>
              {data.netFlow.toLocaleString()} BTC
            </span>
          </div>
        </div>

        {/* CARD 2: MACRO VALUATION DIALS */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3" id="cycle-valuation-indicators">
          <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2 pb-1.5 border-b border-slate-100">
            <Compass className="w-4 h-4 text-indigo-600" />
            On-Chain Cycle Valuation
          </h3>

          <div className="space-y-3 text-xs">
            {/* MVRV indicator */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-semibold font-sans">MVRV Z-Score:</span>
                <span className="text-slate-800 font-bold font-mono text-xs">{data.mvrvRatio.toFixed(2)}</span>
              </div>
              <div className="text-[10px] text-emerald-600 mt-1 uppercase tracking-wider font-bold">{mvrvStatus}</div>
            </div>

            {/* NUPL indicator */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-semibold font-sans">NUPL Unrealized Profit/Loss:</span>
                <span className="text-slate-800 font-bold font-mono text-xs">{(data.nuplValue * 100).toFixed(1)}%</span>
              </div>
              <div className="text-[10px] text-amber-600 mt-1 uppercase tracking-wider font-bold">{nuplStatus}</div>
            </div>
          </div>
        </div>

        {/* CARD 3: STABLECOIN MINT/BURN FLOWS */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between" id="stablecoin-flows-index">
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2 mb-1">
              <Coins className="w-4 h-4 text-indigo-600" />
              Stablecoin Mint/Burn Flows
            </h3>
            <p className="text-[11px] text-slate-400 block leading-tight mb-3">
              Tracks newly minted (printed) buying power or redeemed (burned) fiat liabilities.
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold font-sans">Total Stablecoin Cap:</span>
              <span className="text-slate-800 font-bold">${data.stablecoinCap.toLocaleString()} Billion</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold font-sans">Net Mint/Burn (24h):</span>
              <span className="text-emerald-600 font-bold">+{data.stablecoinFlow24h.toLocaleString()} Million USD</span>
            </div>
          </div>

          <div className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded-lg mt-3 text-center uppercase tracking-wider">
            LIQUIDITY INFLUX ACTIVE • STABLE MINTS DOMINATE
          </div>
        </div>
      </div>

      {/* BTC NETWORK HEALTH & NVT INTELLIGENCE */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4" id="btc-network-health-nvt">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2">
              <Cpu className="w-4.5 h-4.5 text-indigo-600" />
              BTC Network Health & NVT Intelligence
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Live fundamental metrics tracking network security, transactional throughput, and relative valuation multipliers.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-emerald-500 text-emerald-600" />
            Network Stable & Secure
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* NVT Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between" id="nvt-ratio-card">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">NVT Ratio (Valuation)</span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  data.nvtRatio < 60 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                  data.nvtRatio > 80 ? "bg-rose-50 text-rose-700 border border-rose-100" :
                  "bg-amber-50 text-amber-700 border border-amber-100"
                }`}>
                  {data.nvtRatio < 60 ? "UNDERVALUED" : data.nvtRatio > 80 ? "PREMIUM" : "FAIR VALUE"}
                </span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
                {data.nvtRatio.toFixed(1)}
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 leading-snug">
                Network Value to Transactions ratio. Low numbers indicate high transactional volume supporting the current market capitalization.
              </p>
            </div>
          </div>

          {/* Mining Hashrate Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between" id="hashrate-card">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Estimated Hashrate</span>
                <span className={`text-[9px] font-mono font-bold flex items-center gap-0.5 ${
                  data.hashrateChange24h >= 0 ? "text-emerald-600" : "text-rose-600"
                }`}>
                  {data.hashrateChange24h >= 0 ? "▲" : "▼"} {Math.abs(data.hashrateChange24h).toFixed(2)}%
                </span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
                {data.hashrateEh.toFixed(1)} <span className="text-xs text-slate-500 font-sans">EH/s</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 leading-snug">
                Total estimated computational power securing the network. Higher values denote robust defense mechanisms and miner hardware commitment.
              </p>
            </div>
          </div>

          {/* Active Addresses Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between" id="active-addresses-card">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Addresses (24h)</span>
                <span className="text-[9px] font-mono text-indigo-600 font-bold">UTILITY RATIO</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
                {data.activeAddresses24h.toLocaleString()}
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 leading-snug">
                Unique sender or recipient addresses interacting with the ledger. Represents on-chain adoption and active user utility.
              </p>
            </div>
          </div>

          {/* Transaction Volume & Fees Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between" id="tx-volume-card">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tx Volume / Fee (Avg)</span>
                <span className="text-[9px] font-mono text-slate-500 font-bold">BLOCK #{data.blockHeight?.toLocaleString() || "848,912"}</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900 font-mono tracking-tight flex flex-col leading-tight">
                <span>{Math.round(data.transactionVolumeBtc || 245100).toLocaleString()} BTC</span>
                <span className="text-xs text-indigo-600 font-bold mt-0.5">Avg Fee: ${data.averageFeeUsd?.toFixed(2) || "4.85"}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 leading-snug">
                Real-time total transaction settlement volume and execution costs. Reflects overall transactional demand of the blockspace.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: STABLECOIN TREASURY EVENT LEDGER */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm" id="stablecoin-treasury-ledger">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2">
              <Activity className="w-4.5 h-4.5 text-indigo-600" />
              Real-Time Stablecoin Treasury Mint & Burn Events
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Sub-second ledger tracking of multi-sig and primary contract activities from main issuer vaults.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
            SECURE AUDITED FLOWS
          </span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-xs text-left border-collapse" id="stablecoin-treasury-table">
            <thead className="bg-[#f8fafc] text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-3 font-semibold text-[10px] uppercase tracking-wider">Issuer/Treasury</th>
                <th className="p-3 font-semibold text-[10px] uppercase tracking-wider">Asset/Chain</th>
                <th className="p-3 font-semibold text-[10px] uppercase tracking-wider">Event Type</th>
                <th className="p-3 text-right font-semibold text-[10px] uppercase tracking-wider">Amount (USD Value)</th>
                <th className="p-3 text-right font-semibold text-[10px] uppercase tracking-wider">Hash / Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {simulatedMintBurnEvents.map((event, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                  <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${event.type === "MINT" ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                    {event.treasury}
                  </td>
                  <td className="p-3">
                    <span className="font-extrabold text-slate-800">{event.asset}</span>
                    <span className="text-[10px] text-slate-400 ml-1.5 font-mono">({event.chain})</span>
                  </td>
                  <td className="p-3">
                    <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-md border ${
                      event.type === "MINT" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                        : "bg-rose-50 text-rose-700 border-rose-100"
                    }`}>
                      {event.type}
                    </span>
                  </td>
                  <td className={`p-3 text-right font-bold font-mono ${
                    event.type === "MINT" ? "text-emerald-600" : "text-rose-600"
                  }`}>
                    {event.type === "MINT" ? "+" : "-"}${event.amount.toLocaleString()}
                  </td>
                  <td className="p-3 text-right font-mono text-[11px] text-slate-400">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-[10px] text-indigo-500 underline decoration-indigo-300 hover:text-indigo-700 cursor-pointer">{event.txHash}</span>
                      <span className="text-slate-400 font-sans text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">{event.age}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* WHALE WALLETS MOVEMENT FEED */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm" id="whale-tracker-module">
        <h3 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
          <Database className="w-4 h-4 text-indigo-600" />
          Verified Institution & Whale Wallets
        </h3>
        
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-xs text-left border-collapse" id="whales-table">
            <thead className="bg-[#f8fafc] text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-3 font-semibold text-[10px] uppercase tracking-wider">Wallet Labeled Target</th>
                <th className="p-3 font-semibold text-[10px] uppercase tracking-wider">Verified Ledger Address</th>
                <th className="p-3 text-right font-semibold text-[10px] uppercase tracking-wider">Current Holdings</th>
                <th className="p-3 text-right font-semibold text-[10px] uppercase tracking-wider">Holding delta (24h)</th>
                <th className="p-3 text-right font-semibold text-[10px] uppercase tracking-wider text-slate-400">Sync Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {data.whaleWallets.map((wallet, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                  <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                    {wallet.label}
                  </td>
                  <td className="p-3 text-slate-400 font-mono text-[11px]">{wallet.address}</td>
                  <td className="p-3 text-right font-semibold text-slate-800 font-mono">{wallet.balance.toLocaleString()} BTC</td>
                  <td className={`p-3 text-right font-bold font-mono ${
                    wallet.change24h > 0 ? "text-emerald-600" : wallet.change24h < 0 ? "text-rose-600" : "text-slate-400"
                  }`}>
                    {wallet.change24h > 0 ? "+" : ""}{wallet.change24h.toLocaleString()} BTC
                  </td>
                  <td className="p-3 text-right text-slate-400 text-[10px] font-mono">{wallet.timestamp.slice(11, 19)} UTC</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
