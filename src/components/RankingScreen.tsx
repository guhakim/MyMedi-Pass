/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Award, Zap, Flame, MoveUpRight, HelpCircle, Activity, Server, Shield, Database, ChevronRight, BarChart3, Clock, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HospitalRanking } from '../types';

interface RankingScreenProps {
  onAddNotification: (msg: string) => void;
}

export default function RankingScreen({ onAddNotification }: RankingScreenProps) {
  const [rankings, setRankings] = useState<HospitalRanking[]>([
    { rank: 1, name: 'Mayo Clinic', txCount: 1248, statusType: 'exploding', nodesCount: 42 },
    { rank: 2, name: 'Cleveland Clinic', txCount: 984, statusType: 'rising', nodesCount: 36 },
    { rank: 3, name: 'Johns Hopkins', txCount: 872, statusType: 'stable', nodesCount: 28 },
    { rank: 4, name: 'Seoul National Univ Hospital', txCount: 754, statusType: 'rising', nodesCount: 22 },
    { rank: 5, name: 'Samsung Medical Center', txCount: 681, statusType: 'stable', nodesCount: 19 },
  ]);

  const [liveBlocks, setLiveBlocks] = useState<Array<{ id: string; time: string; msg: string; blockHash: string }>>([
    { id: '1', time: 'Just now', msg: 'Mayo Clinic signed 12 new VCs on Omnione Chain.', blockHash: '0x8f2a...110b' },
    { id: '2', time: '1m ago', msg: 'Cleveland Clinic initiated a secure insurance claims contract.', blockHash: '0x3cc1...e98e' },
    { id: '3', time: '3m ago', msg: 'Johns Hopkins verified double-encryption zero-knowledge keys.', blockHash: '0xf4a8...d242' }
  ]);

  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Simulate real-time Tx growth and logs
  useEffect(() => {
    const timer = setInterval(() => {
      // Pick a random ranking item to increment its stats
      setRankings(prev => {
        const index = Math.floor(Math.random() * prev.length);
        const updated = [...prev];
        const txIncrement = Math.floor(Math.random() * 8) + 1;
        updated[index] = {
          ...updated[index],
          txCount: updated[index].txCount + txIncrement
        };
        // Re-sort ranking list
        return updated.sort((a, b) => b.txCount - a.txCount).map((item, idx) => ({
          ...item,
          rank: idx + 1
        }));
      });

      // Add a live log block simulation
      if (Math.random() > 0.6) {
        const hospitals = ['Mayo Clinic', 'Cleveland Clinic', 'Johns Hopkins', 'SNU Hospital', 'Samsung Medical'];
        const chosenHops = hospitals[Math.floor(Math.random() * hospitals.length)];
        const msgs = [
          `New secure anchor block published successfully.`,
          `Verified ECDSA signatures for Patient Claim query.`,
          `Synchronized credential verification with Health Guard node.`,
          `Successfully packed 4 medical transactions in secure ledger.`
        ];
        const chosenMsg = msgs[Math.floor(Math.random() * msgs.length)];
        const randomHash = '0x' + Math.random().toString(16).substr(2, 4) + '...' + Math.random().toString(16).substr(2, 4);

        setLiveBlocks(prev => [
          {
            id: Date.now().toString(),
            time: 'Just now',
            msg: `[${chosenHops}] ${chosenMsg}`,
            blockHash: randomHash
          },
          ...prev.slice(0, 2)
        ]);
      }
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const strengthBars = [23, 42, 58, 71, 35, 48, 88, 62, 79, 68, 55, 92, 44, 73, 59];

  return (
    <div className="space-y-6 pb-24">
      {/* Header section */}
      <div className="px-5 pt-4">
        <h2 className="text-2xl font-bold tracking-tight text-[#031635]">오늘의 병원 인기 순위</h2>
        <div className="flex items-center gap-1.5 text-[#0070eb] mt-1 font-medium select-none text-xs">
          <Shield size={12} className="stroke-[2.5]" />
          <span>실시간 블록체인 트랜잭션(Tx) 기반</span>
        </div>
      </div>

      {/* Live Blockchain Stream Log overlay */}
      <div className="mx-5 bg-[#031635] text-white rounded-2xl p-4 border border-blue-900/60 overflow-hidden relative">
        <div className="flex justify-between items-center mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-300">Omnione Block Ledger live Feed</span>
          </div>
          <span className="text-[10px] font-mono font-medium text-slate-400">4.2k/s load</span>
        </div>

        <div className="space-y-2">
          {liveBlocks.map((block) => (
            <div key={block.id} className="text-[10px] font-mono text-blue-200/90 flex justify-between gap-1 items-start bg-blue-950/40 p-1.5 rounded-lg">
              <span className="truncate flex-1 font-semibold">{block.msg}</span>
              <span className="text-blue-400 shrink-0 select-all ml-1 bg-black/30 px-1 rounded">{block.blockHash}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rankings Cards List */}
      <div className="mx-5 space-y-3.5">
        {rankings.map((hospital, index) => {
          const isFirst = hospital.rank === 1;

          return (
            <div
              key={hospital.name}
              className={`rounded-2xl p-5 border transition-all duration-300 ${
                isFirst
                  ? 'bg-white border-blue-200 shadow-[0_4px_24px_rgba(0,112,235,0.06)]'
                  : 'bg-white border-gray-100 shadow-[0_4px_16px_rgba(26,43,75,0.01)]'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3.5">
                  <div className="flex items-baseline shrink-0">
                    <span className={`text-xl font-black font-mono leading-none ${
                      isFirst ? 'text-[#0070eb] text-2xl' : 'text-slate-400 font-normal'
                    }`}>
                      #{hospital.rank}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#031635]">
                    <Activity size={18} className="stroke-[1.8]" />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#031635] leading-tight">
                      {hospital.name}
                    </h4>
                    {isFirst && (
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5 leading-none">
                        +{hospital.nodesCount} SECURE NODES SATELLITE
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  {/* Tx indicators styled as screenshots */}
                  <div className="bg-[#0070eb]/10 border border-[#0070eb]/25 text-[#0070eb] px-3 py-1 rounded-full text-[10px] font-extrabold font-mono tracking-wide">
                    {hospital.txCount.toLocaleString()} {isFirst ? 'Tx' : '트랜잭션'}
                  </div>

                  {hospital.statusType === 'exploding' && (
                    <span className="text-[10px] font-black text-amber-500 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full flex items-center gap-0.5 select-none animate-pulse">
                      <Flame size={10} className="fill-amber-500" />
                      <span>폭발적</span>
                    </span>
                  )}
                  {hospital.statusType === 'rising' && (
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full flex items-center gap-0.5 select-none">
                      <TrendingUp size={10} />
                      <span>급상승</span>
                    </span>
                  )}
                  {hospital.statusType === 'stable' && (
                    <span className="text-[10px] font-black text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full flex items-center gap-0.5 select-none">
                      <span>➖ 안정</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Detail view trigger */}
              <div className="flex justify-between items-center border-t border-gray-50 mt-4 pt-3 text-xs">
                <span className="text-[10px] text-gray-400 font-mono">TRUST SCORE: <span className="font-bold text-gray-700">99.8%</span></span>
                <button
                  onClick={() => {
                    onAddNotification(`${hospital.name}의 실시간 검증 노드 보안 서명 점검 정보가 수집되었습니다.`);
                  }}
                  className="flex items-center gap-1 font-semibold text-[#0070eb] hover:bg-blue-50/50 px-2.5 py-1.5 rounded-lg transition"
                >
                  <span>상세 보기</span>
                  <MoveUpRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Network Intensity Chart Grid (Dark Blue elegant block) */}
      <div className="mx-5 bg-[#031635] text-white rounded-3xl p-6 border border-blue-900/45 shadow-lg relative overflow-hidden">
        <div>
          <h3 className="text-sm font-bold tracking-tight text-white mb-1 flex items-center gap-1.5">
            <Server size={14} className="text-[#0070eb]" />
            네트워크 강도
          </h3>
          <p className="text-xs text-blue-200/70 leading-relaxed mb-6">
            분산형 그리드 전체에서 오늘 이루어진 총 보안 의료 데이터 연동 수입니다.
          </p>
        </div>

        {/* Dynamic bar graphics with tooltips */}
        <div className="flex items-end justify-between h-20 gap-1.5 px-2 relative border-b border-blue-900/50 pb-2">
          {strengthBars.map((val, idx) => (
            <div
              key={idx}
              className="flex-1 relative flex flex-col items-center group cursor-pointer"
              onMouseEnter={() => setHoveredBarIndex(idx)}
              onMouseLeave={() => setHoveredBarIndex(null)}
            >
              {/* Tooltip displaying individual metrics */}
              {hoveredBarIndex === idx && (
                <div className="absolute -top-12 bg-white text-slate-800 border select-none border-gray-100 text-[9px] font-mono leading-none tracking-tight py-1.5 px-2.5 rounded-lg shadow-xl z-20 whitespace-nowrap animate-bounce font-bold">
                  {val * 45} audits/s
                </div>
              )}
              {/* Render Bar */}
              <div
                style={{ height: `${val}%` }}
                className={`w-full rounded-md transition-all duration-300 ${
                  hoveredBarIndex === idx 
                    ? 'bg-[#0070eb] shadow-[0_0_12px_rgba(0,112,235,0.8)]' 
                    : 'bg-[#0070eb] opacity-75 group-hover:opacity-100'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Chart timeline axis label */}
        <div className="flex justify-between items-center text-[10px] text-blue-200/50 font-mono tracking-widest mt-3 uppercase font-semibold">
          <span>00:00 AM</span>
          <span className="font-bold text-blue-100/90 lowercase text-center">
            라이브 그리드 최고치: <span className="font-mono text-emerald-400">4.2k/s</span>
          </span>
          <span>11:59 PM</span>
        </div>
      </div>
    </div>
  );
}
