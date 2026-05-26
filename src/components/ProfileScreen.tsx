/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, Sparkles, Receipt, FileText, CheckCircle2, RefreshCw, X, ShieldAlert, BadgeInfo, Mail, User, ShieldCheck, KeyRound, Cpu, Wifi, ClipboardList, CircleCheck, Banknote, Clock, QrCode, Share2, Download, Calendar, Stethoscope, Syringe } from 'lucide-react';
import { ActivityLog } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';

interface ProfileScreenProps {
  onAddNotification: (msg: string) => void;
  onIncrementClaim: () => void;
  activities: ActivityLog[];
  recentClaimsCount: number;
}

export default function ProfileScreen({ onAddNotification, onIncrementClaim, activities, recentClaimsCount }: ProfileScreenProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showHealth, setShowHealth] = useState(false);

  const qrPayload = JSON.stringify({
    did: 'did:omnione:0x3f77ed8fc5ca3a8e932b12ab',
    name: '홍길동',
    dob: '1982-10-24',
    gender: 'M',
    issued: new Date().toISOString().split('T')[0],
    chain: 'Omnione',
    verified: true,
  });

  const startClaimFlow = () => {
    setIsSubmitting(true);
    setSubmitStep(1);

    // Timeline steps
    setTimeout(() => setSubmitStep(2), 1200);
    setTimeout(() => setSubmitStep(3), 2400);
    setTimeout(() => {
      setSubmitStep(4);
      setHasClaimed(true);
      onIncrementClaim();
      onAddNotification('시티 치과 의원의 치과 수술 보험 청구가 Omnione Chain을 통해 안전하게 승인 완료되었습니다.');
    }, 3600);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Network indicator panel (Screen 2) */}
      <div className="mx-5 pt-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100/90 shadow-[0_2px_12px_rgba(26,43,75,0.01)] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#0070eb] rounded-full animate-pulse" />
            <span className="text-xs font-bold text-slate-700">DID 네트워크: Omnione Chain</span>
          </div>
          <div className="bg-[#0070eb]/10 border border-[#0070eb]/20 px-3 py-1 rounded-full flex items-center gap-1">
            <ShieldCheck size={12} className="text-[#0070eb]" />
            <span className="text-[10px] font-bold text-[#0070eb]">보안됨</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="px-5">
        <h2 className="text-2xl font-bold tracking-tight text-[#031635]">청구 상세 정보</h2>
        <p className="text-xs text-gray-400 mt-1">블록체인 기반 실시간 비대면 보험 수납 정보</p>
      </div>

      {/* Claim main detail container (Screen 2 style) */}
      <div className="mx-5 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_rgba(26,43,75,0.02)] overflow-hidden">
        {/* Header summary band */}
        <div className="bg-slate-50 border-b border-gray-100 p-5 flex items-start gap-4">
          <div className="w-12 h-12 bg-[#031635] rounded-xl flex items-center justify-center shrink-0 text-white shadow-md">
            <Receipt size={22} className="stroke-[1.8]" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">기록 ID: #MD-8829</span>
            <h3 className="text-lg font-bold text-[#031635] mt-0.5">치과 수술</h3>
          </div>
        </div>

        {/* Info Grid (4 quadrants) */}
        <div className="p-5 grid grid-cols-2 gap-y-5 gap-x-4 border-b border-gray-50">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono">의료기관</span>
            <p className="text-sm font-bold text-[#031635] mt-1">시티 치과 의원</p>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono">진료일</span>
            <p className="text-sm font-bold text-[#031635] mt-1">Oct 24, 2023</p>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono">청구 금액</span>
            <p className="text-lg font-black text-[#0070eb] mt-1 font-mono">₩1,250.00</p>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono">DID 상태</span>
            <span className="inline-block text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full mt-1.5 select-none">
              변조 불가
            </span>
          </div>
        </div>

        {/* File Attachments */}
        <div className="p-5 bg-slate-50/50">
          <button
            onClick={() => setShowReceipt(true)}
            className="w-full flex items-center justify-between border border-gray-200/80 bg-white hover:bg-slate-50 transition rounded-xl p-3 shadow-xs text-left"
          >
            <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
              <FileText size={16} className="text-red-500 shrink-0" />
              <span className="truncate max-w-[180px]">Receipt_241023.pdf</span>
              <span className="text-[10px] bg-slate-100 text-[#031635] px-1.5 py-0.5 rounded-md shrink-0">(서명됨)</span>
            </div>
            <span className="text-[10px] font-bold text-[#0070eb] uppercase tracking-wider hover:underline shrink-0">보기 →</span>
          </button>
        </div>
      </div>

      {/* Paperless Claim Pitch Panel */}
      <div className="mx-5 text-center flex flex-col items-center py-6 bg-blue-50/30 rounded-3xl border border-blue-50/70 p-5 mt-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xs text-[#0070eb] border border-blue-100 mb-4 animate-pulse">
          <Sparkles size={20} className="fill-[#0070eb]/10" />
        </div>
        <h4 className="text-base font-bold text-[#031635]">서류 없는 안전한 청구</h4>
        <p className="text-xs text-slate-500 mt-2 max-w-[260px] leading-relaxed mx-auto">
          귀하의 의료 데이터는 보상 청구 신청에 즉시 암호화되며, 보험사에 도달하기 전 Omnione Chain에서 암호화 및 타당성이 완전 검증됩니다.
        </p>
      </div>

      {/* Big Action Submit Button */}
      <div className="px-5">
        <button
          onClick={startClaimFlow}
          disabled={hasClaimed}
          className={`w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all relative overflow-hidden group ${
            hasClaimed
              ? 'bg-emerald-600 text-white shadow-emerald-700/10 active:scale-100'
              : 'bg-[#0070eb] hover:bg-[#0058bc] text-white shadow-indigo-600/10 active:scale-[0.98]'
          }`}
        >
          <Sparkles size={16} className="stroke-[2.5]" />
          <span>{hasClaimed ? '✓ 청구 완료됨 (영수증 보기)' : '원클릭 청구하기'}</span>
        </button>
      </div>

      {/* Beautiful Personal Profile metadata overview card */}
      <div className="mx-5 bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_4px_20px_rgba(26,43,75,0.01)] space-y-4">
        <h3 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider flex items-center gap-1">
          <BadgeInfo size={14} className="text-[#0070eb]" />
          나의 블록체인 프로필
        </h3>

        <div className="space-y-3.5 pt-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
              <User size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">이름</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">홍길동 (Hong Gil-dong)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
              <Mail size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">이메일 계정</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5 truncate font-mono">kgh3274@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* QR 신원 공유 카드 */}
      <div className="mx-5">
        <button
          onClick={() => setShowQR(true)}
          className="w-full bg-gradient-to-br from-[#031635] to-[#0a2a5e] text-white rounded-3xl p-5 shadow-xl border border-blue-900/40 flex items-center gap-4 active:scale-[0.98] transition-transform"
        >
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/15 shrink-0">
            <QrCode size={28} className="text-[#60a5fa]" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-300">IDENTITY CARD</p>
            <h3 className="text-base font-bold text-white mt-0.5">QR 신원 공유 카드</h3>
            <p className="text-[11px] text-blue-200/70 mt-1">병원 접수 시 QR로 신원 즉시 제출</p>
          </div>
          <div className="shrink-0">
            <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
              <Share2 size={16} className="text-white" />
            </div>
          </div>
        </button>
      </div>

      {/* 건강 관리 일정 카드 */}
      <div className="mx-5">
        <button
          onClick={() => setShowHealth(true)}
          className="w-full bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-3xl p-5 shadow-xl border border-emerald-700/40 flex items-center gap-4 active:scale-[0.98] transition-transform"
        >
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/15 shrink-0">
            <Calendar size={28} className="text-emerald-200" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-300">HEALTH SCHEDULE</p>
            <h3 className="text-base font-bold text-white mt-0.5">건강 관리 일정</h3>
            <p className="text-[11px] text-emerald-200/70 mt-1">정기검진 · 예방접종 리마인더</p>
          </div>
          <div className="shrink-0">
            <div className="bg-white/15 border border-white/20 px-2.5 py-1.5 rounded-xl">
              <span className="text-xs font-black text-white">D-12</span>
            </div>
          </div>
        </button>
      </div>

      {/* Security Status Card */}
      <div className="mx-5 mb-4 bg-[#031635] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden border border-blue-900/60">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0070eb]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
              <Shield size={20} className="text-[#0070eb] stroke-[1.8]" />
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-300">SECURITY STATUS</span>
              <h4 className="text-sm font-bold text-white mt-0.5">보안 인증 현황</h4>
            </div>
          </div>
          <div className="bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold text-emerald-400">보호됨</span>
          </div>
        </div>

        {/* Security Items */}
        <div className="space-y-3">
          {[
            { icon: <ShieldCheck size={14} />, label: 'DID 인증', value: '완료', color: 'text-emerald-400' },
            { icon: <KeyRound size={14} />, label: 'ECC-Secp256r1 서명 키', value: '활성', color: 'text-emerald-400' },
            { icon: <Cpu size={14} />, label: 'Omnione 노드 연결', value: '42개', color: 'text-blue-300' },
            { icon: <Wifi size={14} />, label: '마지막 보안 갱신', value: 'Today 09:24 AM', color: 'text-blue-300' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl px-3.5 py-2.5 border border-white/8">
              <div className="flex items-center gap-2 text-blue-200/70">
                {item.icon}
                <span className="text-[11px] font-medium">{item.label}</span>
              </div>
              <span className={`text-[11px] font-bold ${item.color}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Claim History Card */}
      {(() => {
        const claimActivities = activities.filter(a => a.type === 'claim');
        const completedClaims = claimActivities.filter(a => a.status === '심사 완료').length;
        const totalAmount = claimActivities.reduce((sum, a) => {
          const n = parseFloat((a.amount || '₩0').replace(/[₩,]/g, ''));
          return sum + (isNaN(n) ? 0 : n);
        }, 0);
        const avgTime = '3.6초';
        return (
          <div className="mx-5 mb-4 bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                  <ClipboardList size={18} className="text-[#0070eb]" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">CLAIM HISTORY</span>
                  <h4 className="text-sm font-bold text-slate-800 mt-0.5">청구 내역 요약</h4>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">전체 {recentClaimsCount}건</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: <ClipboardList size={14} className="text-[#0070eb]" />, label: '총 청구 건수', value: `${recentClaimsCount}건`, bg: 'bg-blue-50' },
                { icon: <CircleCheck size={14} className="text-emerald-500" />, label: '처리 완료', value: `${completedClaims}건`, bg: 'bg-emerald-50' },
                { icon: <Banknote size={14} className="text-amber-500" />, label: '총 청구 금액', value: totalAmount > 0 ? `₩${totalAmount.toLocaleString()}` : '₩1,250', bg: 'bg-amber-50' },
                { icon: <Clock size={14} className="text-slate-500" />, label: '평균 처리 시간', value: avgTime, bg: 'bg-slate-50' },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} rounded-2xl p-3`}>
                  <div className="flex items-center gap-1.5 mb-1.5">{item.icon}<span className="text-[10px] text-slate-500 font-medium">{item.label}</span></div>
                  <p className="text-sm font-black text-slate-800">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* 건강 관리 일정 모달 */}
      <AnimatePresence>
        {showHealth && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHealth(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-sm bg-white rounded-t-3xl pb-10 pt-6 px-6 shadow-2xl"
            >
              {/* Handle bar */}
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

              {/* Header */}
              <div className="flex justify-between items-center mb-5">
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600">HEALTH SCHEDULE</p>
                  <h3 className="text-lg font-bold text-[#031635]">건강 관리 일정</h3>
                </div>
                <button onClick={() => setShowHealth(false)} className="p-2 rounded-xl hover:bg-gray-100 transition">
                  <X size={18} className="text-slate-500" />
                </button>
              </div>

              {/* 정기검진 */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <Stethoscope size={14} className="text-emerald-600" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">정기검진</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: '건강검진 (국가건강검진)', date: '2026-06-07', dday: 'D-12', status: '예약완료', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                    { name: '치과 스케일링', date: '2026-07-15', dday: 'D-50', status: '예약필요', statusColor: 'bg-amber-50 text-amber-600 border-amber-100' },
                    { name: '안과 정기검진', date: '2026-08-20', dday: 'D-86', status: '예약필요', statusColor: 'bg-amber-50 text-amber-600 border-amber-100' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100">
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-800">{item.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{item.date} · {item.dday}</p>
                      </div>
                      <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full shrink-0 ml-2 ${item.statusColor}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 예방접종 */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <Syringe size={14} className="text-blue-500" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">예방접종</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: '독감 예방접종', date: '2026-10-01', dday: 'D-128', status: '권장', statusColor: 'bg-blue-50 text-blue-600 border-blue-100' },
                    { name: '폐렴구균', date: '2026-11-15', dday: '5년마다', status: '권장', statusColor: 'bg-blue-50 text-blue-600 border-blue-100' },
                    { name: '대상포진', date: '2027-03-01', dday: '권장', status: '권장', statusColor: 'bg-blue-50 text-blue-600 border-blue-100' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100">
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-800">{item.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{item.date} · {item.dday}</p>
                      </div>
                      <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full shrink-0 ml-2 ${item.statusColor}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 안내 문구 */}
              <div className="flex items-start gap-2 bg-emerald-50 rounded-xl px-4 py-3">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  예방 중심 헬스케어 — 정기검진과 예방접종으로 건강을 미리 지키세요.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QR 신원 공유 모달 */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQR(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-sm bg-white rounded-t-3xl pb-10 pt-6 px-6 shadow-2xl"
            >
              {/* Handle bar */}
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

              {/* Header */}
              <div className="flex justify-between items-center mb-5">
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0070eb]">DID IDENTITY</p>
                  <h3 className="text-lg font-bold text-[#031635]">신원 공유 QR</h3>
                </div>
                <button onClick={() => setShowQR(false)} className="p-2 rounded-xl hover:bg-gray-100 transition">
                  <X size={18} className="text-slate-500" />
                </button>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <QRCodeSVG
                    value={qrPayload}
                    size={180}
                    level="H"
                    fgColor="#031635"
                    imageSettings={{
                      src: '',
                      height: 0,
                      width: 0,
                      excavate: false,
                    }}
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm font-bold text-[#031635]">홍길동</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">did:omnione:0x3f77ed8f...2b12ab</p>
                </div>
              </div>

              {/* Info rows */}
              <div className="mt-4 space-y-2.5">
                {[
                  { label: '생년월일', value: '1982. 10. 24' },
                  { label: '성별', value: '남성' },
                  { label: '발급일', value: new Date().toLocaleDateString('ko-KR') },
                  { label: '체인', value: 'Omnione Chain' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center bg-slate-50 rounded-xl px-4 py-2.5">
                    <span className="text-xs text-slate-400 font-medium">{item.label}</span>
                    <span className="text-xs font-bold text-[#031635]">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* 안내 문구 */}
              <div className="mt-4 flex items-start gap-2 bg-blue-50 rounded-xl px-4 py-3">
                <ShieldCheck size={14} className="text-[#0070eb] shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  이 QR코드는 Omnione DID로 서명된 일회성 신원 증명입니다. 병원 접수 단말기에 스캔하여 본인 확인을 완료하세요.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PDF digital receipt drawer mockup modal */}
      <AnimatePresence>
        {showReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReceipt(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative z-10 border border-slate-100 overflow-hidden"
            >
              <div className="flex justify-between items-center pb-3 border-b border-gray-100 mb-4">
                <span className="text-xs font-bold text-[#0070eb] font-mono tracking-wider uppercase flex items-center gap-1">
                  <FileText size={14} /> Official Medical Document
                </span>
                <button
                  onClick={() => setShowReceipt(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 transition text-[#031635]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* PDF Content visual mockup */}
              <div className="bg-[#f7f9fc] rounded-2xl p-5 border border-slate-200/60 font-mono text-[10px] space-y-4 text-slate-600 leading-snug">
                <div className="text-center border-b border-dashed border-slate-300 pb-3">
                  <h4 className="text-xs font-extrabold text-[#031635]">진료비 영수증</h4>
                  <p className="text-[8px] text-gray-400 mt-0.5">CITY DENTIAL CLINIC • SIGNED BY OMNIONE</p>
                </div>

                <div className="space-y-1.5 text-slate-700">
                  <p className="flex justify-between"><span>인적사항:</span> <span className="font-bold text-[#031635]">홍길동 (821024-******)</span></p>
                  <p className="flex justify-between"><span>발급기관:</span> <span className="font-bold">시티 치과 의원</span></p>
                  <p className="flex justify-between"><span>수납일시:</span> <span className="font-bold">2023-10-24 15:32:01</span></p>
                  <p className="flex justify-between"><span>부과코드:</span> <span className="font-bold">K11.2 (Surgical Tooth Extract)</span></p>
                </div>

                <div className="border-t border-dashed border-slate-300 pt-3 text-slate-700 font-bold space-y-1">
                  <p className="flex justify-between text-[#0070eb] text-xs"><span>수납 총액:</span> <span>₩1,250.00</span></p>
                  <p className="text-[8px] text-gray-400">HASH: 3f77ed8fc5ca3a8e932b12</p>
                </div>

                {/* Digital trust stamp illustration */}
                <div className="pt-2 flex justify-center">
                  <div className="border-2 border-emerald-500 rounded-full px-2.5 py-1 text-[#10b981] font-bold text-[8px] tracking-wider uppercase rotate-[-6deg] bg-emerald-50/50">
                    OMNIONE SECURE VERIFIED
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setShowReceipt(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#031635] rounded-xl text-xs font-semibold transition"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic claim processing modal wizard */}
      <AnimatePresence>
        {isSubmitting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative z-10 border border-slate-100 text-center overflow-hidden"
            >
              {submitStep === 1 && (
                <div className="py-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    className="w-12 h-12 border-4 border-[#0070eb] border-t-transparent rounded-full mx-auto"
                  />
                  <h4 className="text-base font-bold text-[#031635] mt-5">의료 기록 암호화 중...</h4>
                  <p className="text-xs text-gray-500 mt-2 px-4 leading-relaxed">
                    시티 치과 의원의 수납 기록을 홍길동님의 DID 비밀키(P-256)로 비대면 일대일 암호화 조치를 실행 중입니다.
                  </p>
                </div>
              )}

              {submitStep === 2 && (
                <div className="py-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-12 h-12 bg-blue-50 text-[#0070eb] rounded-full mx-auto flex items-center justify-center"
                  >
                    <Shield size={24} className="stroke-[2.5]" />
                  </motion.div>
                  <h4 className="text-base font-bold text-[#031635] mt-5">Omnione Chain 합의 검증</h4>
                  <p className="text-xs text-gray-500 mt-2 px-4 leading-relaxed">
                    의료 청구 기록의 무결성을 보장하기 위해 분산 서명 노드들로부터 타당성 합의 감사가 진행되고 있습니다.
                  </p>
                </div>
              )}

              {submitStep === 3 && (
                <div className="py-6">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-12 h-12 bg-[#031635] text-white rounded-full mx-auto flex items-center justify-center"
                  >
                    <RefreshCw size={22} className="animate-spin" />
                  </motion.div>
                  <h4 className="text-base font-bold text-[#031635] mt-5">심사 접수 패키지 전송</h4>
                  <p className="text-xs text-gray-500 mt-2 px-4 leading-relaxed">
                    원장 변조 불가의 실증 정보가 연계 보험사 심사 노드로 안전한 보안 패널을 경유해 최종 전달 처리되고 있습니다.
                  </p>
                </div>
              )}

              {submitStep === 4 && (
                <div className="py-4">
                  <div className="w-14 h-14 bg-emerald-100 text-[#10b981] rounded-full mx-auto flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-base font-bold text-gray-800">보상 청구 전송 성공!</h4>
                  <p className="text-xs text-emerald-600 font-bold mt-1">SUCCESSFUL TRANSACTION RECEIVED</p>
                  <p className="text-xs text-gray-500 mt-3 px-4 leading-relaxed">
                    홍길동님의 본 이력 청구가 성공적으로 완료되었습니다! 심사 진행 현황은 '홈' 화면의 실시간 심사 상태에서 즉각적인 연계 추적이 가능합니다.
                  </p>

                  <button
                    onClick={() => setIsSubmitting(false)}
                    className="w-full mt-6 py-3 bg-[#031635] text-white font-bold text-xs rounded-xl active:scale-98 transition shadow-xs"
                  >
                    확인 및 닫기
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
