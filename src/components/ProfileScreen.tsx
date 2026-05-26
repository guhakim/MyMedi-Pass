/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, Sparkles, Receipt, FileText, CheckCircle2, RefreshCw, X, ShieldAlert, BadgeInfo, Mail, User, ShieldCheck, Github, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileScreenProps {
  onAddNotification: (msg: string) => void;
  onIncrementClaim: () => void;
}

export default function ProfileScreen({ onAddNotification, onIncrementClaim }: ProfileScreenProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

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
            <p className="text-lg font-black text-[#0070eb] mt-1 font-mono">$1,250.00</p>
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

      {/* GitHub Repository link card */}
      <div className="mx-5 bg-[#031635] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden border border-blue-900/60">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0070eb]/15 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10">
              <Github size={20} className="stroke-[1.8]" />
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-300">GITHUB REPOSITORY</span>
              <h4 className="text-sm font-bold text-white mt-0.5">MyMedi Pass 소스코드</h4>
            </div>
          </div>
          <div className="bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold text-emerald-400">구독 연동 완료</span>
          </div>
        </div>

        <p className="text-xs text-blue-200/80 leading-relaxed mb-4">
          본 애플리케이션의 소스코드 지적 자산이 연계된 GitHub 저장소 정보입니다. 저장소 구독을 통해 실시간 빌드 가집 장치와 소스 동기화가 활성화되었습니다.
        </p>

        <a
          href="https://github.com/guhakim/MyMedi-Pass"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-11 bg-white/10 border border-white/20 text-white rounded-xl font-semibold text-xs transition duration-200 active:scale-98 hover:bg-white/15 flex items-center justify-center gap-2"
        >
          <span>GitHub 저장소 바로가기</span>
          <ExternalLink size={13} className="text-blue-300" />
        </a>
      </div>

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
                  <p className="flex justify-between text-[#0070eb] text-xs"><span>수납 총액:</span> <span>$1,250.00</span></p>
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
