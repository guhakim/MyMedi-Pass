/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2, History, ArrowRight, ShieldAlert, Fingerprint, RefreshCw, Key, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActivityLog } from '../types';

interface HomeScreenProps {
  recordsCount: number;
  recentClaimsCount: number;
  activities: ActivityLog[];
  onNavigate: (tab: 'home' | 'wallet' | 'ranking' | 'profile') => void;
  onAddNotification: (msg: string) => void;
}

export default function HomeScreen({
  recordsCount,
  recentClaimsCount,
  activities,
  onNavigate,
  onAddNotification,
}: HomeScreenProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(1);
  const [lastUpdated, setLastUpdated] = useState('Today, 09:24 AM');

  const startVerification = () => {
    setIsVerifying(true);
    setVerifyStep(1);
  };

  const handleNextStep = () => {
    if (verifyStep < 3) {
      setVerifyStep(prev => prev + 1);
    } else {
      // Done
      setIsVerifying(false);
      const now = new Date();
      const timeStr = `Today, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
      setLastUpdated(timeStr);
      onAddNotification('본인 인증이 성공적으로 완료되었습니다! DID 신원이 갱신되었습니다.');
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Welcome Banner */}
      <div className="px-5 pt-4">
        <p className="text-sm font-medium text-[#44474e] mb-1">다시 오신 것을 환영합니다</p>
        <h2 className="text-2xl font-bold tracking-tight text-[#031635] flex items-center gap-1.5">
          안녕하세요, <span className="text-[#0070eb]">홍길동님</span>
        </h2>
      </div>

      {/* DID Identity Card */}
      <div className="mx-5 bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_4px_20px_rgba(26,43,75,0.03)] relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-blue-50 to-transparent opacity-60 pointer-events-none" />
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">디지털 신원</span>
            <h3 className="text-lg font-bold text-[#031635] mt-0.5">Omnione Chain CX 인증됨</h3>
          </div>
          <div className="flex items-center gap-1.5 bg-[#10b981]/10 border border-[#10b981]/20 px-3 py-1.5 rounded-full select-none">
            <ShieldCheck size={14} className="text-[#10b981]" />
            <span className="text-xs font-bold text-[#10b981]">보안됨</span>
          </div>
        </div>

        {/* Central visual info */}
        <div className="flex items-center justify-between mt-6 bg-[#f7f9fc] rounded-2xl p-4 border border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white rounded-xl shadow-xs border border-gray-100 flex items-center justify-center text-[#0070eb]">
              <Fingerprint size={22} className="stroke-[1.8]" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider font-bold text-gray-400">DID 상태</p>
              <p className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                정상 활성화
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-mono font-bold text-gray-400">최종 동기화</p>
            <p className="text-xs font-semibold font-mono text-gray-600 mt-0.5">{lastUpdated}</p>
          </div>
        </div>

        {/* Dynamic Micro-Interactions */}
        <div className="mt-4 flex justify-between items-center text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-1">
            <Key size={12} className="text-[#0070eb]" />
            <span>ECC-Secp256r1 알고리즘 서명</span>
          </div>
          <button 
            onClick={() => {
              const now = new Date();
              const timeStr = `Today, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
              setLastUpdated(timeStr);
              onAddNotification('DID 동기화가 업데이트되었습니다.');
            }}
            className="flex items-center gap-1 text-[#0070eb] hover:bg-blue-50/50 px-2 py-1 rounded-lg transition active:scale-95"
          >
            <RefreshCw size={11} />
            <span>갱신</span>
          </button>
        </div>
      </div>

      {/* Two Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mx-5">
        <button
          onClick={() => onNavigate('wallet')}
          className="bg-[#f2f4f7]/70 hover:bg-[#eceef1]/90 rounded-2xl p-5 border border-slate-200/50 flex flex-col justify-between text-left transition duration-200 shadow-xs group"
        >
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/60 flex items-center justify-center text-[#031635] shadow-xs group-hover:scale-105 transition">
            <FileText size={20} className="stroke-[1.8]" />
          </div>
          <div className="mt-6">
            <p className="text-xs font-medium text-slate-500">나의 의료 데이터</p>
            <p className="text-2xl font-black text-[#031635] mt-1 font-mono">{recordsCount} <span className="text-xs font-normal">건</span></p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('profile')}
          className="bg-[#f2f4f7]/70 hover:bg-[#eceef1]/90 rounded-2xl p-5 border border-slate-200/50 flex flex-col justify-between text-left transition duration-200 shadow-xs group"
        >
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/60 flex items-center justify-center text-[#0070eb] shadow-xs group-hover:scale-105 transition">
            <CheckCircle2 size={20} className="stroke-[1.8]" />
          </div>
          <div className="mt-6">
            <p className="text-xs font-medium text-slate-500">최근 청구 완료</p>
            <p className="text-2xl font-black text-[#0070eb] mt-1 font-mono">{recentClaimsCount} <span className="text-xs font-normal">건</span></p>
          </div>
        </button>
      </div>

      {/* Recent Activities List */}
      <div className="mx-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(26,43,75,0.02)]">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-base font-bold text-[#031635] flex items-center gap-1.5">
            <History size={16} className="text-[#0070eb]" />
            최근 활동 내역
          </h3>
          <button 
            onClick={() => onNavigate('wallet')}
            className="text-xs font-semibold text-[#0070eb] flex items-center gap-1 hover:underline"
          >
            전체 보기
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex justify-between items-start border-b border-gray-50 pb-3 last:border-0 last:pb-0">
              <div className="flex gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  activity.type === 'record' ? 'bg-blue-50 text-[#0070eb]' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  <FileText size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#031635] leading-snug">{activity.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">{activity.description}</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-1">{activity.timestamp}</p>
                </div>
              </div>
              <div className="text-right">
                {activity.status && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activity.status.includes('대기') 
                    ? 'bg-amber-50 text-amber-600 border border-amber-100' 
                    : activity.status.includes('완료') || activity.status.includes('정상')
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    : 'bg-slate-50 text-slate-500'
                  }`}>
                    {activity.status}
                  </span>
                )}
                {activity.amount && (
                  <p className="text-xs font-bold font-mono text-[#031635] mt-1.5">{activity.amount}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Call to Action Button */}
      <div className="px-5">
        <button
          onClick={startVerification}
          className="w-full h-14 bg-[#0070eb] hover:bg-[#0058bc] text-white active:scale-[0.98] transition-all rounded-2xl font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,112,235,0.25)] relative overflow-hidden group"
        >
          {/* Subtle inner light reflection */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <CheckCircle2 size={18} className="stroke-[2.5]" />
          <span>본인 인증 완료하기 (OpenID)</span>
        </button>
      </div>

      {/* Biometric/OpenID Verification Flow Dialog Simulation */}
      <AnimatePresence>
        {isVerifying && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVerifying(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Modal Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative z-10 border border-slate-100 overflow-hidden"
            >
              {/* Stepper Header */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0070eb]">OpenID 인증 연동</span>
                <div className="flex gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${verifyStep >= 1 ? 'bg-[#0070eb]' : 'bg-gray-200'}`} />
                  <span className={`w-1.5 h-1.5 rounded-full ${verifyStep >= 2 ? 'bg-[#0070eb]' : 'bg-gray-200'}`} />
                  <span className={`w-1.5 h-1.5 rounded-full ${verifyStep >= 3 ? 'bg-[#0070eb]' : 'bg-gray-200'}`} />
                </div>
              </div>

              {/* Step 1: Decentralized Auth selection */}
              {verifyStep === 1 && (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-blue-50 text-[#0070eb] rounded-full mx-auto flex items-center justify-center mb-4">
                    <Fingerprint size={32} className="animate-pulse" />
                  </div>
                  <h4 className="text-lg font-bold text-[#031635]">지문 및 생체 신원 연동</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    의료 데이터 전송 승인 및 서명을 위해 디바이스에 등록된 생체 데이터를 통한 암호키 연동을 테스트합니다.
                  </p>
                </div>
              )}

              {/* Step 2: Key Pair Generation */}
              {verifyStep === 2 && (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Key size={30} className="animate-bounce" />
                  </div>
                  <h4 className="text-lg font-bold text-[#031635]">공개 키쌍 생성 중</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    Omnione Chain 블록체인 노드에 검증서 서명으로 등록될 일회성 타원곡선 서명 키쌍(ECDSA)을 안전하게 수립하고 있습니다.
                  </p>
                </div>
              )}

              {/* Step 3: Success Screen */}
              {verifyStep === 3 && (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-emerald-100 text-[#10b981] rounded-full mx-auto flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-[#031635]">DID 확인 완료!</h4>
                  <p className="text-xs text-emerald-600 mt-1.5 font-semibold">보안 채널 활성화됨</p>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    홍길동님의 신원이 Omnione CX 네트워크 및 국민건강보험공단 노드 상에서 상호 교차 검증에 성공했습니다.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 mt-6">
                <button
                  onClick={handleNextStep}
                  className="w-full py-3.5 bg-[#031635] hover:bg-slate-800 text-white rounded-xl font-semibold text-xs transition duration-200 active:scale-98 shadow-sm"
                >
                  {verifyStep === 3 ? '확인 및 적용' : '다음 단계'}
                </button>
                <button
                  onClick={() => setIsVerifying(false)}
                  className="w-full py-3 text-gray-400 hover:text-gray-600 text-xs font-semibold transition duration-150"
                >
                  취소하기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
