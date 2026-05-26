/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Copy, Plus, Activity, Hospital, FileCheck2, ClipboardList, ChevronRight, X, ExternalLink, RefreshCw, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MedicalRecord } from '../types';

interface WalletScreenProps {
  records: MedicalRecord[];
  onAddRecord: (newRecord: MedicalRecord) => void;
  onAddNotification: (msg: string) => void;
}

export default function WalletScreen({ records, onAddRecord, onAddNotification }: WalletScreenProps) {
  const [copied, setCopied] = useState(false);
  const [selectedVc, setSelectedVc] = useState<MedicalRecord | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newHospital, setNewHospital] = useState('');
  const [newDiagnosis, setNewDiagnosis] = useState('');
  const [newCode, setNewCode] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);

  const didIdentifier = 'did:mymedi:eth:0x71Cc9B3BA3C4f2a770B9E2b3DF8fe00df124f2a';

  const handleCopyDid = () => {
    navigator.clipboard.writeText(didIdentifier);
    setCopied(true);
    onAddNotification('DID 식별자가 클립보드에 복사되었습니다.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHospital || !newDiagnosis) return;

    setIsQuerying(true);
    
    // Simulate query timeline
    setTimeout(() => {
      const formattedDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });

      const cleanCode = newCode || `K${Math.floor(Math.random() * 80) + 10}.${Math.floor(Math.random() * 9)}`;

      const newRec: MedicalRecord = {
        id: `MD-${Math.floor(Math.random() * 8999) + 1000}`,
        institution: newHospital,
        code: cleanCode,
        description: `${cleanCode} (${newDiagnosis})`,
        issuedDate: formattedDate,
        verified: true,
        status: '변조 불가',
        iconType: 'general'
      };

      onAddRecord(newRec);
      setIsQuerying(false);
      setIsAddingNew(false);
      setNewHospital('');
      setNewDiagnosis('');
      setNewCode('');
      onAddNotification(`새로운 의료 실증 데이터 가 발급되어 데이터 지갑에 안전하게 저장되었습니다.`);
    }, 1800);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Page Title Section */}
      <div className="px-5 pt-4">
        <h2 className="text-2xl font-bold tracking-tight text-[#031635]">나의 의료 데이터 지갑</h2>
        <p className="text-xs text-gray-500 mt-1">보안된 OpenDID 검증 가능한 자격증명(VC)을 관리하세요.</p>
      </div>

      {/* Digital Health Passport Credentials Card */}
      <div className="mx-5 bg-radial from-[#041a3d] to-[#01091a] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
        {/* Glowing visual accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0070eb]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-mono font-bold tracking-wider text-blue-300 uppercase opacity-90 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
            디지털 건강 패스포트
          </span>
          <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 border border-white/20">
            <Check size={12} className="text-emerald-400 stroke-[3]" />
            <span className="text-[10px] font-bold text-white tracking-tight">DID 인증됨</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold tracking-tight">홍길동</h3>
        
        <div className="mt-8 pt-4 border-t border-white/10">
          <p className="text-[10px] text-blue-200/60 font-mono tracking-wider font-semibold">DID 식별자</p>
          <div className="flex items-center justify-between gap-2 mt-1 bg-black/20 hover:bg-black/30 transition p-2.5 rounded-xl border border-white/5">
            <span className="text-xs font-mono text-blue-100 truncate flex-1">
              {didIdentifier}
            </span>
            <button
              onClick={handleCopyDid}
              className="text-blue-300 hover:text-white p-1 transition shrink-0 active:scale-90"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* List of Issued Verifiable Credentials (VCs) */}
      <div className="mx-5 space-y-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">
            발급된 검증서 ({records.length}건)
          </span>
        </div>

        {records.length === 0 ? (
          <div className="text-center py-10 bg-white border border-dashed border-gray-200 rounded-3xl p-6">
            <ClipboardList className="mx-auto text-gray-300 mb-2" size={32} />
            <p className="text-sm font-semibold text-gray-600">등록된 의료 데이터가 없습니다.</p>
            <p className="text-xs text-gray-400 mt-1">하단의 버튼을 눌러 새 데이터를 발급받아보세요.</p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {records.map((vc) => (
              <div
                key={vc.id}
                className="bg-white rounded-2xl border border-gray-100/80 p-5 shadow-[0_4px_16px_rgba(26,43,75,0.015)] hover:shadow-[0_4px_24px_rgba(26,43,75,0.04)] transition-all duration-300 relative group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3.5">
                    {/* Visual icon badge */}
                    <div className="w-11 h-11 rounded-xl bg-[#f7f9fc] border border-gray-100/50 flex items-center justify-center shrink-0 text-[#0070eb]">
                      {vc.iconType === 'ent' ? (
                        <Hospital size={20} className="stroke-[1.8]" />
                      ) : (
                        <Activity size={20} className="stroke-[1.8]" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#031635] leading-tight flex items-center gap-1.5 group-hover:text-[#0070eb] transition duration-150">
                        {vc.institution}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        {vc.description}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#10b981]/10 border border-[#10b981]/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full" />
                    <span className="text-[10px] font-bold text-[#10b981]">VC 발급됨</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 mt-4 pt-3 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider font-mono">발급일</span>
                    <span className="text-[11px] text-gray-600 font-mono font-bold">{vc.issuedDate}</span>
                  </div>
                  <button
                    onClick={() => setSelectedVc(vc)}
                    className="flex items-center gap-1 text-xs font-semibold text-[#0070eb] hover:bg-blue-50/50 px-2.5 py-1.5 rounded-lg transition"
                  >
                    <span>상세 보기</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Plus button at bottom to Receive New Data */}
      <div className="px-5 pt-2">
        <button
          onClick={() => setIsAddingNew(true)}
          className="w-full h-14 bg-white border-2 border-dashed border-[#0070eb]/40 text-[#0070eb] hover:border-[#0070eb] hover:bg-blue-50/20 active:scale-[0.99] transition-all rounded-2xl font-bold flex items-center justify-center gap-2"
        >
          <Plus size={18} className="stroke-[2.5]" />
          <span>새 데이터 발급받기</span>
        </button>
      </div>

      {/* Verifiable Credential Cryptographic Detail Modal */}
      <AnimatePresence>
        {selectedVc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVc(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative z-10 border border-slate-100 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
                <span className="text-xs font-bold text-[#0070eb] font-mono tracking-wider uppercase">
                  Verifiable Credential Cryptographics
                </span>
                <button
                  onClick={() => setSelectedVc(null)}
                  className="p-1 rounded-lg hover:bg-gray-100 transition text-[#031635]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Basic VC Info */}
              <div className="space-y-4">
                <div className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#031635] shadow-xs shrink-0">
                    <Hospital size={18} />
                  </div>
                  <div>
                    <h5 className="text-xs text-gray-400 font-mono">ISSUER INSTITUTION</h5>
                    <p className="text-sm font-bold text-[#031635]">{selectedVc.institution}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-gray-400 font-mono block">DIAGNOSIS CODE</span>
                    <span className="text-xs font-mono font-bold text-gray-800">{selectedVc.code}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-gray-400 font-mono block">ISSUED AT</span>
                    <span className="text-xs font-mono font-bold text-gray-800">{selectedVc.issuedDate}</span>
                  </div>
                </div>

                {/* Encrypted Raw Blockchain Block */}
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 font-semibold font-mono uppercase tracking-wider">encrypted payload (jws/jwt proof)</span>
                  <div className="bg-[#031635] rounded-xl p-3.5 text-[10px] text-blue-200/90 font-mono leading-relaxed select-all max-h-40 overflow-y-auto break-all scrollbar-hide border border-blue-900/40">
                    {`{"alg": "ES256K", "typ": "JWT", "kid": "${didIdentifier}"}.${btoa(JSON.stringify(selectedVc))}.eyJpc3N1ZXIiOiJkaWQ6bXltZWRpOmV0aDpjbGluaWMiLCJzdWJqZWN0IjoiZGlkOm15bWVkaTpldGg6aG9uZ2dpbGRvbmciLCJzaWduYXR1cmUiOiIweDhlMWRmNGYwY2E4MzMwOWI4ZGE3ZTlkOTEwOTJjYjZkOGVkYWNhMzE5OWNhZTE4M2EyMzI5Yzg2MDM5MTBiY2U2Z..."`}
                  </div>
                </div>

                {/* Signature status summary */}
                <div className="bg-[#10b981]/5 rounded-xl p-3.5 border border-[#10b981]/20 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-[#10b981]" />
                    <span className="text-xs font-bold text-[#10b981]">암호학적 서명 검증 성공</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-normal">
                    본 Credential은 공인 의료기관의 비밀키로 개인화 서명되었으며 블록체인에서 원장 변조 여부 조작 테스트(Integrity check)를 거쳐 100% 무결함이 인증되었습니다.
                  </p>
                </div>
              </div>

              {/* External blockchain scan block link */}
              <div className="mt-5 border-t border-gray-100 pt-3 flex justify-between items-center">
                <a
                  href={`https://etherscan.io/address/0x71Cc9B3BA3C4f2a770B9E2b3DF8fe00df124f2a`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-mono text-gray-400 hover:text-[#0070eb] flex items-center gap-1"
                >
                  <ExternalLink size={11} />
                  <span>Block #19382218 View</span>
                </a>
                <button
                  onClick={() => setSelectedVc(null)}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-[#031635] rounded-xl text-xs font-semibold transition"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Simulated Issuing Dialog for new VC */}
      <AnimatePresence>
        {isAddingNew && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isQuerying && setIsAddingNew(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative z-10 border border-slate-100 overflow-hidden"
            >
              {isQuerying ? (
                <div className="text-center py-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    className="w-14 h-14 border-4 border-dashed border-[#0070eb] border-t-transparent rounded-full mx-auto flex items-center justify-center"
                  >
                    <RefreshCw size={18} className="text-[#0070eb]" />
                  </motion.div>
                  <h4 className="text-lg font-bold text-[#031635] mt-5">의료 증빙 조회 중...</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed px-4">
                    국민건강보험공단 노드 및 병원 API를 조회하여 홍길동님의 최근 보안 진료 이력을 연계해 오고 있습니다.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCreateRecord} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-[#031635]">새 의료자격 검증서 발급</h3>
                    <p className="text-xs text-gray-500 mt-0.5">최근 다녀온 의료기관을 선택해 나의 DID 지갑에 암호화 보관하세요.</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 font-mono block mb-1 uppercase tracking-wider">진료 의료기관</label>
                      <select
                        required
                        value={newHospital}
                        onChange={(e) => setNewHospital(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-[#0070eb] focus:border-[#0070eb] outline-hidden text-[#031635] font-semibold"
                      >
                        <option value="">-- 병원/의원 선택 --</option>
                        <option value="세브란스 이비인후과">세브란스 이비인후과</option>
                        <option value="조은치과병원">조은치과병원</option>
                        <option value="강남중앙병원">강남중앙병원</option>
                        <option value="연세내과의원">연세내과의원</option>
                        <option value="아산내과정형외과">아산내과정형외과</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 font-mono block mb-1 uppercase tracking-wider">진단 내용 (질환명)</label>
                      <input
                        type="text"
                        required
                        placeholder="예: 급성 비염, 충치 보철, 고혈압"
                        value={newDiagnosis}
                        onChange={(e) => setNewDiagnosis(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-[#0070eb] focus:border-[#0070eb] outline-hidden text-[#031635]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 font-mono block mb-1 uppercase tracking-wider">질병 코드 (선택사항)</label>
                      <input
                        type="text"
                        placeholder="예: J00 (미입력시 자동 생성)"
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-[#0070eb] focus:border-[#0070eb] outline-hidden text-[#031635] font-mono"
                      />
                    </div>
                  </div>

                  {/* Submit buttons */}
                  <div className="flex gap-2.5 pt-4">
                    <button
                      type="button"
                      disabled={isQuerying}
                      onClick={() => setIsAddingNew(false)}
                      className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-500 font-semibold text-xs rounded-xl transition"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={isQuerying}
                      className="flex-1 py-3 bg-[#0070eb] hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1 shadow-xs"
                    >
                      <Send size={12} />
                      <span>기록 연동요청</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
