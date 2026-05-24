/* ==========================================================================
   MYMEDI PASS PREMIUM INTERACTIVE JAVASCRIPT ENGINE (CLINICAL MATERIAL-3)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- STATE SYSTEM ---
  const state = {
    medicalDataCount: 3,
    recentClaimsCount: 1,
    isHomeVerified: true,
    hospitalsCount: 5,
    customClaims: [
      { id: 'vc-hosp', title: '급성 기관지염', hosp: '서울 이비인후과', date: 'Oct 24, 2023', cost: '$124.00', pdf: 'Receipt_241024.pdf' },
      { id: 'vc-check', title: '제2형 당뇨병', hosp: '메디체크 의원', date: 'Sep 12, 2023', cost: '$310.00', pdf: 'Receipt_230912.pdf' },
      { id: 'vc-vac', title: '예방 접종', hosp: '성모 메디컬', date: 'Aug 05, 2023', cost: '$45.00', pdf: 'Receipt_230805.pdf' }
    ],
    selectedClaim: {
      title: '치과 수술',
      hosp: '시티 치과 의원',
      date: 'Oct 24, 2023',
      cost: '$1,250.00',
      pdf: 'Receipt_241023.pdf',
      recordId: '#MD-8829'
    }
  };

  // --- DYNAMIC CLOCK & STATUS BAR ---
  function updateStatusBarClock() {
    const clockElements = document.querySelectorAll('.live-clock');
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    // Formatting
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    clockElements.forEach(el => {
      el.textContent = `${hours}:${minutes}`;
    });
  }
  updateStatusBarClock();
  setInterval(updateStatusBarClock, 10000); // Update clock every 10 seconds

  // --- TOAST NOTIFICATIONS ---
  function showToast(text, emoji = '🛡️') {
    const toast = document.getElementById('appToast');
    if (!toast) return;
    const toastText = toast.querySelector('.toast-text');
    const toastIcon = toast.querySelector('.toast-icon');
    
    toastIcon.textContent = emoji;
    toastText.textContent = text;
    
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // --- SINGLE-PAGE TAB ROUTER NAVIGATION ---
  const navItems = document.querySelectorAll('.nav-tab-item');
  const appPages = document.querySelectorAll('.app-page');
  const appMainScroll = document.getElementById('appMainScroll');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetPageId = item.getAttribute('data-target');
      const currentPageEl = document.querySelector('.app-page.active');
      const targetPageEl = document.getElementById(targetPageId);
      
      if (!targetPageEl || currentPageEl === targetPageEl) return;
      
      // Update persistent bottom navigation highlight capsules
      navItems.forEach(nav => {
        nav.classList.remove('bg-secondary-container', 'text-on-secondary-container', 'active');
        nav.classList.add('text-on-surface-variant');
        const icon = nav.querySelector('.material-symbols-outlined');
        if (icon) icon.style.fontVariationSettings = "'FILL' 0";
      });
      
      item.classList.remove('text-on-surface-variant');
      item.classList.add('bg-secondary-container', 'text-on-secondary-container', 'active');
      const activeIcon = item.querySelector('.material-symbols-outlined');
      if (activeIcon) activeIcon.style.fontVariationSettings = "'FILL' 1";
      
      // Handle screen page transitions
      currentPageEl.classList.remove('active');
      setTimeout(() => {
        targetPageEl.classList.add('active');
        // Reset scroll position to top
        if (appMainScroll) appMainScroll.scrollTop = 0;
      }, 100);
    });
  });

  // --- HOME BIO VERIFICATION SIMULATOR ---
  const homeBioTriggerBtn = document.getElementById('homeBioTriggerBtn');
  const homeBioBtnText = document.getElementById('homeBioBtnText');
  const homeDidTitle = document.getElementById('homeDidTitle');
  const homeDidBadge = document.getElementById('homeDidBadge');
  const homeDidBadgeText = document.getElementById('homeDidBadgeText');
  const homeFingerprintBox = document.getElementById('homeFingerprintBox');
  const homeDidStatusText = document.getElementById('homeDidStatusText');

  if (homeBioTriggerBtn) {
    homeBioTriggerBtn.addEventListener('click', () => {
      if (state.isHomeVerified) {
        // Reset state back to unverified to demonstrate loop
        state.isHomeVerified = false;
        homeDidTitle.textContent = 'Omnione DID 인증 대기';
        homeDidStatusText.textContent = 'DID 상태: 미인증';
        homeDidBadge.className = 'glass-effect px-3 py-1 rounded-full border border-orange-200 flex items-center gap-1.5 shadow-sm';
        homeDidBadge.innerHTML = `
          <span class="material-symbols-outlined text-[16px] text-orange-600">pending</span>
          <span class="text-orange-600 font-label-sm font-bold text-[11px]">미인증</span>
        `;
        homeFingerprintBox.className = 'w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center shadow-sm';
        homeBioBtnText.textContent = '본인 인증하기';
        showToast('🔓 DID 상태가 초기화되었습니다. 다시 스캔해 주세요.', '🔑');
      } else {
        // Start verification pipeline
        showToast('🔒 Face ID 생체스캔을 진행하고 있습니다...', '👤');
        homeBioTriggerBtn.style.pointerEvents = 'none';
        homeBioBtnText.textContent = '스캔 매칭 중...';
        
        setTimeout(() => {
          state.isHomeVerified = true;
          homeDidTitle.textContent = 'Omnione CX 인증됨';
          homeDidStatusText.textContent = 'DID 상태: 활성';
          
          homeDidBadge.className = 'glass-effect px-3 py-1 rounded-full border border-green-200 flex items-center gap-1.5 shadow-sm';
          homeDidBadge.innerHTML = `
            <span class="material-symbols-outlined text-[16px] text-green-600" style="font-variation-settings: 'FILL' 1;">verified</span>
            <span class="text-green-600 font-label-sm font-bold text-[11px]">보안됨</span>
          `;
          
          homeFingerprintBox.className = 'w-11 h-11 rounded-lg bg-surface-container flex items-center justify-center shadow-sm';
          homeBioBtnText.textContent = '인증 완료 (초기화하려면 클릭)';
          homeBioTriggerBtn.style.pointerEvents = 'auto';
          
          showToast('🔓 Omnione CX 생체인증이 검증되었습니다!', '🔓');
        }, 1600);
      }
    });
  }

  // --- DYNAMIC CLAIM PIPELINE ENGINE ---
  const oneClickClaimBtn = document.getElementById('oneClickClaimBtn');
  const stateInitial = document.getElementById('state-initial');
  const stateProcessing = document.getElementById('state-processing');
  const stateSuccess = document.getElementById('state-success');
  const txHash = document.getElementById('tx-hash');
  const resetClaimBtn = document.getElementById('resetClaimBtn');
  const recentClaimsCountEl = document.getElementById('recentClaimsCount');
  const claimsActivitySubtext = document.getElementById('claimsActivitySubtext');

  if (oneClickClaimBtn) {
    oneClickClaimBtn.addEventListener('click', () => {
      stateInitial.classList.add('hidden');
      stateProcessing.classList.remove('hidden');
      
      // Roll random transaction hashes for immersive blockchain feeling
      let ticks = 0;
      const interval = setInterval(() => {
        const hex = '0123456789abcdef';
        let hash = '0x';
        for (let i = 0; i < 40; i++) {
          hash += hex[Math.floor(Math.random() * 16)];
        }
        txHash.textContent = hash;
        ticks++;
        
        if (ticks >= 20) {
          clearInterval(interval);
          
          // Complete claim
          stateProcessing.classList.add('hidden');
          stateSuccess.classList.remove('hidden');
          
          // Update global counts
          state.recentClaimsCount++;
          if (recentClaimsCountEl) {
            recentClaimsCountEl.textContent = state.recentClaimsCount;
          }
          if (claimsActivitySubtext) {
            claimsActivitySubtext.textContent = `심사 대기 중 • ${state.selectedClaim.cost}`;
          }
          
          showToast('💰 보험 청구서가 성공적으로 접수되었습니다!', '💰');
        }
      }, 95);
    });
  }

  if (resetClaimBtn) {
    resetClaimBtn.addEventListener('click', () => {
      stateSuccess.classList.add('hidden');
      stateInitial.classList.remove('hidden');
      showToast('🛡️ 청구 인터페이스가 초기화되었습니다.', '🔄');
    });
  }

  // --- CONNECTING CREDENTIAL DETAIL TAPS TO CLAIM SCREENS ---
  const credentials = document.querySelectorAll('#credentialsContainer .group');
  const claimRecordId = document.getElementById('claimRecordId');
  const claimTreatmentName = document.getElementById('claimTreatmentName');
  const claimHospName = document.getElementById('claimHospName');
  const claimVisitDate = document.getElementById('claimVisitDate');
  const claimTotalCost = document.getElementById('claimTotalCost');
  const claimPdfName = document.getElementById('claimPdfName');
  const navTabClaim = document.getElementById('navTabClaim');

  credentials.forEach(card => {
    card.addEventListener('click', () => {
      const vcId = card.getAttribute('data-vc-id');
      let matchedData = null;
      
      if (vcId === 'vc-hosp') {
        matchedData = {
          title: '급성 기관지염 진료',
          hosp: '서울 이비인후과',
          date: 'Oct 24, 2023',
          cost: '$124.00',
          pdf: 'Receipt_241024.pdf',
          recordId: '#MD-9912'
        };
      } else if (vcId === 'vc-check') {
        matchedData = {
          title: '제2형 당뇨 진료',
          hosp: '메디체크 의원',
          date: 'Sep 12, 2023',
          cost: '$310.00',
          pdf: 'Receipt_230912.pdf',
          recordId: '#MD-8239'
        };
      } else if (vcId === 'vc-vac') {
        matchedData = {
          title: '코로나 예방 접종',
          hosp: '성모 메디컬',
          date: 'Aug 05, 2023',
          cost: '$45.00',
          pdf: 'Receipt_230805.pdf',
          recordId: '#MD-7182'
        };
      }

      if (matchedData) {
        state.selectedClaim = matchedData;
        
        // Populate Claim form fields
        if (claimRecordId) claimRecordId.textContent = `기록 ID: ${matchedData.recordId}`;
        if (claimTreatmentName) claimTreatmentName.textContent = matchedData.title;
        if (claimHospName) claimHospName.textContent = matchedData.hosp;
        if (claimVisitDate) claimVisitDate.textContent = matchedData.date;
        if (claimTotalCost) claimTotalCost.textContent = matchedData.cost;
        if (claimPdfName) claimPdfName.textContent = `${matchedData.pdf} (서명됨)`;
        
        // Reset claims screen state back to initial submission card
        if (stateInitial) stateInitial.classList.remove('hidden');
        if (stateProcessing) stateProcessing.classList.add('hidden');
        if (stateSuccess) stateSuccess.classList.add('hidden');

        // Route beautifully to the Claim screen!
        if (navTabClaim) {
          navTabClaim.click();
          showToast(`📋 ${matchedData.hosp} 청구서 정보가 지갑에서 로드되었습니다!`, '📥');
        }
      }
    });
  });

  // --- NEW CREDENTIAL DATA DOWNLOAD ISSUANCE (WALLET) ---
  const issueNewDataBtn = document.getElementById('issueNewDataBtn');
  const credentialsContainer = document.getElementById('credentialsContainer');
  const summaryDataCardCount = document.querySelector('#summaryDataCard p.font-bold');

  if (issueNewDataBtn && credentialsContainer) {
    issueNewDataBtn.addEventListener('click', () => {
      showToast('🔑 Omnione DID 서버에 보안 인증을 시도하고 있습니다...', '📡');
      issueNewDataBtn.style.pointerEvents = 'none';
      issueNewDataBtn.classList.add('opacity-75');

      setTimeout(() => {
        // Create new credential card
        const newCard = document.createElement('div');
        newCard.className = 'bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md shadow-sm hover:border-secondary transition-all cursor-pointer group';
        newCard.setAttribute('data-vc-id', 'vc-new-gast');
        newCard.innerHTML = `
          <div class="flex justify-between items-start mb-md">
            <div class="flex items-center gap-md">
              <div class="w-11 h-11 bg-surface-container-high rounded-lg flex items-center justify-center shadow-sm">
                <span class="material-symbols-outlined text-secondary text-[22px]">medical_services</span>
              </div>
              <div>
                <h3 class="font-headline-md text-[16px] text-primary font-bold">삼성서울병원</h3>
                <p class="text-label-md font-label-md text-on-surface-variant text-[12px]">K29.7 (위염 진료 기록)</p>
              </div>
            </div>
            <div class="bg-[#e6f4ea] text-[#1e7e34] px-2.5 py-0.5 rounded-full text-label-sm font-label-sm flex items-center gap-1 border border-[#1e7e34]/10 text-[10px] font-bold">
              <span class="material-symbols-outlined text-[12px]" style="font-variation-settings: 'FILL' 1;">check_circle</span> VC 발급됨
            </div>
          </div>
          <div class="flex justify-between items-center border-t border-outline-variant/20 pt-md mt-1">
            <div class="flex flex-col">
              <span class="text-label-sm font-label-sm text-outline text-[10px]">발급일</span>
              <span class="text-body-md font-medium text-[13px]">오늘 (Today)</span>
            </div>
            <button class="text-secondary font-label-md flex items-center gap-0.5 group-hover:underline text-[12px] font-bold">
              상세 보기 <span class="material-symbols-outlined text-[14px] mt-0.5">arrow_forward</span>
            </button>
          </div>
        `;

        // Prepend and hook listener
        credentialsContainer.insertBefore(newCard, credentialsContainer.firstChild);
        newCard.addEventListener('click', () => {
          const matchedData = {
            title: '위염 진료 기록',
            hosp: '삼성서울병원',
            date: '오늘',
            cost: '$85.00',
            pdf: 'Receipt_260524.pdf',
            recordId: '#MD-9945'
          };
          state.selectedClaim = matchedData;
          if (claimRecordId) claimRecordId.textContent = `기록 ID: ${matchedData.recordId}`;
          if (claimTreatmentName) claimTreatmentName.textContent = matchedData.title;
          if (claimHospName) claimHospName.textContent = matchedData.hosp;
          if (claimVisitDate) claimVisitDate.textContent = matchedData.date;
          if (claimTotalCost) claimTotalCost.textContent = matchedData.cost;
          if (claimPdfName) claimPdfName.textContent = `${matchedData.pdf} (서명됨)`;
          
          if (stateInitial) stateInitial.classList.remove('hidden');
          if (stateProcessing) stateProcessing.classList.add('hidden');
          if (stateSuccess) stateSuccess.classList.add('hidden');

          if (navTabClaim) {
            navTabClaim.click();
            showToast(`📋 ${matchedData.hosp} 청구서 정보가 지갑에서 로드되었습니다!`, '📥');
          }
        });

        // Update stats
        state.medicalDataCount++;
        if (summaryDataCardCount) {
          summaryDataCardCount.textContent = state.medicalDataCount;
        }

        // Restore button state
        issueNewDataBtn.style.pointerEvents = 'auto';
        issueNewDataBtn.classList.remove('opacity-75');

        showToast('🎉 새 의료 데이터 VC 자격증명이 발급되었습니다!', '🎉');
      }, 1200);
    });
  }

  // --- HOME QUICK CARD LINKS ---
  const summaryDataCard = document.getElementById('summaryDataCard');
  const summaryClaimCard = document.getElementById('summaryClaimCard');
  const navTabWallet = document.getElementById('navTabWallet');
  const activityItem1 = document.getElementById('activityItem1');
  const activityItem2 = document.getElementById('activityItem2');

  if (summaryDataCard && navTabWallet) {
    summaryDataCard.addEventListener('click', () => {
      navTabWallet.click();
    });
  }
  if (summaryClaimCard && navTabClaim) {
    summaryClaimCard.addEventListener('click', () => {
      navTabClaim.click();
    });
  }
  if (activityItem1 && navTabWallet) {
    activityItem1.addEventListener('click', () => {
      navTabWallet.click();
    });
  }
  if (activityItem2 && navTabClaim) {
    activityItem2.addEventListener('click', () => {
      navTabClaim.click();
    });
  }

  // --- HOSPITAL DETAIL ACTIONS (RANKING) ---
  const rank1DetailBtn = document.getElementById('rank1DetailBtn');
  const rankingItems = document.querySelectorAll('#rankingItemsContainer .glass-card');

  if (rank1DetailBtn) {
    rank1DetailBtn.addEventListener('click', () => {
      showToast('🏥 Mayo Clinic: 오늘 1,248건의 보안 블록체인 연동 완료!', '🏥');
    });
  }

  rankingItems.forEach(item => {
    item.addEventListener('click', () => {
      const name = item.querySelector('p.text-primary').textContent;
      const tx = item.querySelector('p.text-on-surface-variant').textContent;
      showToast(`🏥 ${name}: 실시간 연동 강도 - ${tx}`, '🏥');
    });
  });

});
