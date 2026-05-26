/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import WalletScreen from './components/WalletScreen';
import RankingScreen from './components/RankingScreen';
import ProfileScreen from './components/ProfileScreen';
import { Home, Wallet, BarChart3, User } from 'lucide-react';
import { MedicalRecord, ActivityLog, TabType } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [notifications, setNotifications] = useState<string[]>([
    '보안 검증 DID 네트워크 Omnione Chain 연동 완료.',
    '환영합니다! 홍길동님의 MyMedi Pass 디지털 지갑이 성공적으로 활성화되었습니다.',
  ]);

  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: 'vc-1',
      institution: '서울 이비인후과',
      code: 'J20.9',
      description: 'J20.9 (급성 기관지염)',
      issuedDate: 'Oct 24, 2023',
      verified: true,
      status: '변조 불가',
      iconType: 'ent',
    },
    {
      id: 'vc-2',
      institution: '메디체크 의원',
      code: 'E11.9',
      description: 'E11.9 (제2형 당뇨병)',
      issuedDate: 'Sep 12, 2023',
      verified: true,
      status: '변조 불가',
      iconType: 'clinic',
    },
    {
      id: 'vc-3',
      institution: '성모 메디컬',
      code: 'Z23',
      description: 'Z23 (예방 접종)',
      issuedDate: 'Aug 05, 2023',
      verified: true,
      status: '변조 불가',
      iconType: 'general',
    },
  ]);

  const [recentClaimsCount, setRecentClaimsCount] = useState<number>(1);

  const [activities, setActivities] = useState<ActivityLog[]>([
    {
      id: 'act-1',
      title: '건강검진 기록 연동 완료',
      description: '서울 중앙 병원정기 데이터 갱신 완료',
      timestamp: 'Today, 09:24 AM',
      status: '정상 연동',
      type: 'record',
    },
    {
      id: 'act-2',
      title: '보험금 청구 신청 완료',
      description: '심사 수납 기관 연계 승인 대기',
      timestamp: 'Yesterday, 11:15 AM',
      status: '심사 대기',
      type: 'claim',
      amount: '₩124.00',
    },
  ]);

  const handleAddNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev]);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleAddRecord = (newRecord: MedicalRecord) => {
    setRecords(prev => [newRecord, ...prev]);

    // Also inject into activities list
    const timestampStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }) + `, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;

    const newActivity: ActivityLog = {
      id: `act-${Date.now()}`,
      title: `${newRecord.institution} 실증 자격 발급`,
      description: `${newRecord.code} 질병 증명 추가`,
      timestamp: timestampStr,
      status: '정상 발급',
      type: 'record',
    };

    setActivities(prev => [newActivity, ...prev]);
  };

  const handleIncrementClaim = () => {
    setRecentClaimsCount(prev => prev + 1);

    // Also update claims list status
    const timestampStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }) + `, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;

    const claimActivity: ActivityLog = {
      id: `act-${Date.now()}`,
      title: '원클릭 실시간 보험금 청구',
      description: '시티 치과 의원 (₩1,250.00)',
      timestamp: timestampStr,
      status: '심사 완료',
      type: 'claim',
      amount: '₩1,250.00',
    };

    setActivities(prev => [claimActivity, ...prev]);
  };

  return (
    <div className="h-[100dvh] bg-[#031635]/15 flex items-center justify-center p-0 md:p-4">
      {/* Device framing layout to center smartphone container view */}
      <div className="w-full max-w-[480px] h-[100dvh] md:h-[95vh] md:max-h-[920px] md:rounded-[40px] bg-[#f7f9fc] shadow-2xl relative border border-slate-200/50 flex flex-col overflow-hidden">

        {/* Top Header — fixed inside container */}
        <div className="flex-shrink-0 pt-[env(safe-area-inset-top)]">
          <Header
            notifications={notifications}
            clearNotifications={handleClearNotifications}
          />
        </div>

        {/* Dynamic Screen View Router — scrollable middle */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {activeTab === 'home' && (
            <HomeScreen
              recordsCount={records.length}
              recentClaimsCount={recentClaimsCount}
              activities={activities}
              onNavigate={(tab) => setActiveTab(tab)}
              onAddNotification={handleAddNotification}
            />
          )}

          {activeTab === 'wallet' && (
            <WalletScreen
              records={records}
              onAddRecord={handleAddRecord}
              onAddNotification={handleAddNotification}
            />
          )}

          {activeTab === 'ranking' && (
            <RankingScreen
              onAddNotification={handleAddNotification}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileScreen
              onAddNotification={handleAddNotification}
              onIncrementClaim={handleIncrementClaim}
              activities={activities}
              recentClaimsCount={recentClaimsCount}
            />
          )}
        </main>

        {/* Bottom navigation bar — fixed inside container */}
        <nav className="flex-shrink-0 bg-white/90 backdrop-blur-md border-t border-slate-100 flex items-center justify-around pt-2.5 px-4 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-40">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 py-1 px-3 transition duration-200 ${
              activeTab === 'home' ? 'text-[#0070eb]' : 'text-slate-400 hover:text-[#031635]'
            }`}
          >
            <Home size={20} className={activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-2'} />
            <span className="text-[10px] font-bold">홈</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex flex-col items-center gap-1 py-1 px-3 transition duration-200 ${
              activeTab === 'wallet' ? 'text-[#0070eb]' : 'text-slate-400 hover:text-[#031635]'
            }`}
          >
            <Wallet size={20} className={activeTab === 'wallet' ? 'stroke-[2.5]' : 'stroke-2'} />
            <span className="text-[10px] font-bold">지갑</span>
          </button>

          <button
            onClick={() => setActiveTab('ranking')}
            className={`flex flex-col items-center gap-1 py-1 px-3 transition duration-200 ${
              activeTab === 'ranking' ? 'text-[#0070eb]' : 'text-slate-400 hover:text-[#031635]'
            }`}
          >
            <BarChart3 size={20} className={activeTab === 'ranking' ? 'stroke-[2.5]' : 'stroke-2'} />
            <span className="text-[10px] font-bold">랭킹</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 py-1 px-3 transition duration-200 ${
              activeTab === 'profile' ? 'text-[#0070eb]' : 'text-slate-400 hover:text-[#031635]'
            }`}
          >
            <User size={20} className={activeTab === 'profile' ? 'stroke-[2.5]' : 'stroke-2'} />
            <span className="text-[10px] font-bold">내 정보</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

