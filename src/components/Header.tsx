/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bell, Shield, CheckCircle } from 'lucide-react';

interface HeaderProps {
  notifications: string[];
  clearNotifications: () => void;
}

export default function Header({ notifications, clearNotifications }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-45 bg-[#f7f9fc]/90 backdrop-blur-md border-b border-gray-100 px-5 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src="/src/assets/images/doctor_avatar_1779765027224.png"
            referrerPolicy="no-referrer"
            alt="Doctor Avatar"
            className="w-10 h-10 rounded-full border border-gray-200 object-cover shadow-sm bg-gray-100"
          />
          <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-[#0070eb] rounded-full flex items-center justify-center text-white border-2 border-[#f7f9fc]">
            <Shield size={9} className="stroke-[2.5]" />
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold text-[#031635] leading-tight tracking-tight flex items-center gap-1">
            MyMedi Pass
          </h1>
          <p className="text-[10px] text-gray-500 font-mono tracking-wider font-semibold">
            OMNIONE CHAIN DID
          </p>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2.5 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition active:scale-95 text-[#031635] shadow-xs"
        >
          <Bell size={18} className="stroke-[2]" />
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border-2 border-white" />
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 transition-all duration-200 z-50">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
              <span className="text-xs font-semibold text-gray-800">최근 알림 ({notifications.length})</span>
              {notifications.length > 0 && (
                <button
                  onClick={() => {
                    clearNotifications();
                    setShowNotifications(false);
                  }}
                  className="text-[10px] text-[#0070eb] hover:underline"
                >
                  모두 지우기
                </button>
              )}
            </div>
            {notifications.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">새로운 알림이 없습니다.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {notifications.map((notif, index) => (
                  <div
                    key={index}
                    className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-700 flex gap-2"
                  >
                    <CheckCircle size={14} className="text-[#10b981] shrink-0 mt-0.5" />
                    <span className="leading-snug">{notif}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
