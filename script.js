// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // FAQ Category Filter
  const faqFilterBtns = document.querySelectorAll('.faq-filter-btn');
  const faqItems = document.querySelectorAll('.faq-item');

  faqFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      faqFilterBtns.forEach((b) => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-md', 'font-bold');
        b.classList.add('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200', 'font-semibold');
      });
      btn.classList.remove('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200', 'font-semibold');
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md', 'font-bold');

      faqItems.forEach((item) => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
          const answer = item.querySelector('.faq-answer');
          const chevron = item.querySelector('[data-lucide="chevron-down"]');
          if (answer) answer.classList.add('hidden');
          if (chevron) chevron.classList.remove('rotate-180');
        }
      });
    });
  });

  // FAQ Accordion
  faqItems.forEach((item) => {
    const button = item.querySelector('button');
    const answer = item.querySelector('.faq-answer');
    const chevron = item.querySelector('[data-lucide="chevron-down"]');

    if (button && answer) {
      button.addEventListener('click', () => {
        const isHidden = answer.classList.contains('hidden');

        faqItems.forEach((other) => {
          if (other !== item) {
            const otherAnswer = other.querySelector('.faq-answer');
            const otherChevron = other.querySelector('[data-lucide="chevron-down"]');
            if (otherAnswer) otherAnswer.classList.add('hidden');
            if (otherChevron) otherChevron.classList.remove('rotate-180');
          }
        });

        if (isHidden) {
          answer.classList.remove('hidden');
          if (chevron) chevron.classList.add('rotate-180');
        } else {
          answer.classList.add('hidden');
          if (chevron) chevron.classList.remove('rotate-180');
        }
      });
    }
  });

  // ==================== 5대 설비 상세 안내 모달 (브랜드 공식 스펙 & 공식 이미지 연동) ====================
  const ITEM_DETAILS = {
    cctv: {
      brandBadge: 'SK쉴더스 ADT캡스 공식 파트너',
      title: 'CCTV (ADT캡스) - 500만 화소 AI 상업용 보안 시스템',
      serviceVal: 'CCTV(ADT캡스)',
      themeColor: 'blue',
      intro: '국내 보안 전문 1위 브랜드 ADT캡스의 초고화질 IP 카메라와 24시간 전국 출동망으로 사장님의 소중한 매장을 365일 빈틈없이 지킵니다.',
      images: [
        {
          src: 'images/adt_cctv_banner2.png',
          title: 'ADT캡스 AI CCTV만의 특별함 (5대 핵심 기능)',
          caption: '① AI 영상 모니터링/분석 (500만 화소 초고화질)  ② AI 이상신호 감지(금고/카운터/창고 침입/쓰러짐 감지 시 App 즉시 알림)  ③ 24시간 긴급출동 및 경찰/소방 유관기관 지원요청  ④ AI 빠른 검색 (인물 성별/옷 색상/차량 색상 검색으로 1초 검색)  ⑤ 전국 100여개 지사 신속한 A/S 및 보상 서비스'
        },
        {
          src: 'images/adt_cctv_banner3.png',
          title: 'ADT캡스 5단계 통합 보안 프로세스',
          caption: 'AI 영상 모니터링 → 이상신호 감지 → 24시간 긴급출동 요청 → 빠른 AI 검색 → A/S 및 도난·화재 보상 서비스 지원'
        },
        {
          src: 'images/adt_cctv_banner1.png',
          title: '업종별 현장 설치 업그레이드 시나리오 5',
          caption: '노후된 CCTV 고화질 업그레이드, 사건사고 현장 선명한 확인, 야간 무단침입 및 도난 방지, 자가설치 대비 사각지대 없는 전문 엔지니어 무료 실사 및 책임 시공, 24시간 긴급출동 연동'
        }
      ],
      highlights: [
        {
          icon: 'video',
          title: '500만 화소 초고화질 Full IP 카메라',
          desc: '얼굴 표정, 손동작, 계산대 지폐 단위까지 또렷하게 식별 가능한 초고해상도. 스마트폰 전용 앱으로 주야간 선명한 실시간 모니터링이 가능합니다.'
        },
        {
          icon: 'alert-triangle',
          title: 'AI 스마트 이상신호 실시간 감지',
          desc: '금고, 카운터, 창고 등 지정 보안 구역 내 비인가 침입, 배회, 쓰러짐 등 이상 신호 감지 시 스마트폰 App으로 1초 즉각 푸시 알림을 전송합니다.'
        },
        {
          icon: 'shield-check',
          title: '24시간 최단거리 긴급출동 & 경찰 공조',
          desc: '비상 상황 발생 시 24시간 관제 센터에서 실시간 상황을 파악하고 최단거리 ADT 순찰 대원이 즉시 출동하며 112/119 유관기관 비상 공조를 가동합니다.'
        },
        {
          icon: 'award',
          title: '도난·화재 안심 배상 보험 기본 제공',
          desc: '예기치 못한 도난 파손 사고 및 화재 피해 발생 시 공식 배상 보상 프로그램을 기본 지원하며, 전문 엔지니어가 무료 방문 실사로 사각지대 없이 시공합니다.'
        }
      ],
      specs: [
        { label: '카메라 해상도', val: '500만 화소 초고화질 Full IP 실내/실외 적외선 카메라' },
        { label: '관제 & 모니터링', val: '24시간 ADT 종합상황실 관제 + 스마트폰 App 무제한 실시간 뷰' },
        { label: 'AI 스마트 기능', val: '인물 인상착의 색상 / 차량 색상 조건 검색으로 녹화 영상 1초 초고속 검색' },
        { label: '긴급 출동 경비', val: '전국 ADT 순찰 대원 최단거리 24시간 긴급출동 연동' },
        { label: '설치 및 A/S', val: '본사 전문 엔지니어 방문 무료 실사 & 배선 깔끔 책임 시공' },
        { label: '오픈케어 제휴 혜택', val: '제휴 파트너 전용 비공개 특별 할인 요율 + 초기 설치비 맞춤 지원' }
      ]
    },
    internet: {
      brandBadge: '통신 3사 (KT · SKB · LGU+) 공식 제휴 파트너',
      title: '인터넷 + 일반전화 - 통신 3사 비교 & 매장 결제안심 패키지',
      serviceVal: '인터넷+일반전화',
      themeColor: 'indigo',
      intro: '통신 3사(KT, SKB, LGU+) 전 통신사를 공식 취급하여 대표님 스마트폰 결합 할인과 매장 위치별 최적 회선을 비교 매칭해 드립니다. 특히 결제 끊김을 원천 차단하는 0.3초 무선 백업과 24시간 AI 통화비서(LGU+ 주력 솔루션)를 특화 지원합니다.',
      images: [
        {
          src: 'images/lg_payment_backup.webp',
          title: '[주력 추천 솔루션] 결제안심 인터넷 (피크타임 0.3초 자동 무선 백업)',
          caption: '도로 공사나 케이블 단선 등 예기치 못한 유선 인터넷 장애 발생 시 LTE 무선망으로 0.3초 만에 즉시 자동 전환되어 피크타임 포스기, 카드단말기 결제가 1초도 멈추지 않습니다.'
        },
        {
          src: 'images/lg_ai_phone.webp',
          title: '[주력 추천 솔루션] U+ AI전화 (24시간 스마트 통화비서)',
          caption: '바쁜 점심·저녁 피크타임과 영업 외 시간에도 AI가 전화 예약, 주차 위치, 영업시간 안내를 대신 응대하여 손님 이탈을 방지하고 통화 요약 문자를 발송합니다.'
        }
      ],
      highlights: [
        {
          icon: 'layers',
          title: '통신 3사(KT · SKB · LGU+) 1:1 맞춤 비교 견적',
          desc: '대표님이 사용 중이신 휴대폰 통신사 결합 할인과 매장 위치의 광케이블 인입 상태, 비공개 사은 혜택을 전면 비교하여 매월 통신 요금이 가장 절감되는 최적 통신사를 맞춤 설계합니다.'
        },
        {
          icon: 'wifi-off',
          title: '피크타임 결제안심 0.3초 LTE 무선 백업 (LGU+ 주력 특화)',
          desc: '도로 공사나 케이블 단선 등 예기치 못한 유선 인터넷 장애 발생 시 LTE 무선망으로 0.3초 만에 자동 전환되어 포스기 및 카드단말기 결제가 단 1초도 멈추지 않습니다.'
        },
        {
          icon: 'phone-call',
          title: 'U+ AI전화 (24시간 스마트 통화비서)',
          desc: '조리와 서빙으로 전화받기 어려울 때 AI가 대신 전화를 받아 매장 예약, 주차 안내, 영업시간을 친절히 응대하고 통화 요약 문자를 사장님께 즉시 발송합니다.'
        },
        {
          icon: 'gift',
          title: '소상공인 제휴 단독 사은 혜택',
          desc: '500M 이상 신청 시 고성능 기가 와이파이(Wi-Fi) 공유기 무상 임대, 최신형 디지털 키폰 단말기 및 비공개 사은 혜택을 맞춤 지급합니다.'
        }
      ],
      specs: [
        { label: '취급 통신사', val: 'KT / SK브로드밴드 / LG U+ 전 통신사 공식 비교 취급' },
        { label: '인터넷 속도', val: '100M / 500M / 1G 기가 인터넷 매장 맞춤 선택' },
        { label: '백업 시스템', val: 'LTE 무선 모뎀 내장 결제안심 (유선 장애 시 0.3초 자동 무선 백업)' },
        { label: '일반전화 서비스', val: '24시간 U+ AI 통화비서 + 최신형 키폰 단말기 무상 제공' },
        { label: '매장 편의 기능', val: '스마트폰 착신전환, 매장 홍보 비즈링 음원, 통화 후 자동 콜백 문자' },
        { label: '오픈케어 제휴 혜택', val: '제휴 단독 비공개 사은 혜택 및 결합 우대 지원' }
      ]
    },
    pos: {
      brandBadge: '국내 시장점유율 1위 OK포스 공식 솔루션',
      title: '포스기 - 배달 연동 & 실시간 모바일 매출 관리',
      serviceVal: '포스기',
      themeColor: 'emerald',
      intro: '국내 25만 개 이상의 가맹점이 선택한 압도적 1위 OKPOS! 배달 3사 주문 1초 접수부터 전 카드사 등록비 면제까지 완벽 지원합니다.',
      images: [],
      highlights: [
        {
          icon: 'credit-card',
          title: '최신형 정전식 터치 포스기 풀패키지',
          desc: '초슬림 베젤 ZED 시리즈 및 옵티머스 최신형 터치 포스 본체, 고속 영수증 프린터, IC/MS 멀티패드가 기본 포함된 안정적인 세트입니다.'
        },
        {
          icon: 'shopping-bag',
          title: '배민 / 요기요 / 쿠팡이츠 배달 3사 원클릭 접수',
          desc: '별도의 배달 접수 프로그램 설치 없이 포스 화면에서 배달 3사 주문을 원클릭으로 접수하고 주방 프린터로 즉시 자동 출력됩니다.'
        },
        {
          icon: 'bar-chart-2',
          title: '실시간 모바일 매출 관리 (오늘얼마 앱)',
          desc: '매장에 없어도 스마트폰으로 오늘의 실시간 매출 현황, 결제 수단별 통계, 테이블 회전율, 재방문 고객 비율을 한눈에 조회할 수 있습니다.'
        },
        {
          icon: 'shield-check',
          title: '8개 카드사 가맹 등록비 0원 전액 면제',
          desc: '복잡하고 번거로운 8개 카드사 신규 가맹점 신청 대행을 무료로 전담해 드리며, 가맹 등록비 전액을 0원으로 지원합니다.'
        }
      ],
      specs: [
        { label: '하드웨어 구성', val: '최신 터치 포스기 본체 + 고속 영수증 프린터 + 서명패드 풀세트' },
        { label: '배달 플랫폼 연동', val: '배달의민족, 요기요, 쿠팡이츠 원클릭 자동 주문 접수' },
        { label: '간편 결제 지원', val: 'IC카드, 삼성페이, 애플페이, 카카오페이, 제로페이 완벽 지원' },
        { label: '모바일 매출 관리', val: '스마트폰 전용 모바일 앱(오늘얼마) 실시간 매출 통계 제공' },
        { label: '오픈케어 제휴 혜택', val: '초기 가맹비 / 설치비 0원 전액 지원 + 전산 관리비 우대 혜택' }
      ]
    },
    highorder: {
      brandBadge: 'KT 공식 파트너 하이오더',
      title: '하이오더 (KT 테이블오더) - 비대면 스마트 주문·결제',
      serviceVal: '하이오더',
      themeColor: 'amber',
      intro: '각 테이블에서 고객이 고화질 사진 메뉴판을 보고 직접 주문·결제하여 홀 서빙 인건비를 획기적으로 줄이고 매장 회전율을 극대화합니다.',
      images: [],
      highlights: [
        {
          icon: 'users',
          title: '홀 서빙 인건비 월 150~200만 원 절감',
          desc: '주문 접수, 메뉴판 전달, 계산 동선을 비대면으로 전환하여 피크타임 인력 부족 문제를 확실하게 해결하고 구인 스트레스를 줄입니다.'
        },
        {
          icon: 'sparkles',
          title: '고화질 사진 메뉴판 & 사이드 메뉴 추천 노출',
          desc: '음식의 매력을 극대화하는 선명한 사진과 함께 사이드 메뉴, 주류, 토핑 추가 유도 팝업을 노출하여 테이블당 객단가를 자연스럽게 높입니다.'
        },
        {
          icon: 'tablet',
          title: '선불형 / 후불형 맞춤 선택 & 포스 실시간 동기화',
          desc: '매장 운영 동선에 맞춰 테이블에서 카드/페이 즉시 결제하는 선불형 또는 식사 후 카운터 결제하는 후불형을 자유롭게 선택할 수 있습니다.'
        },
        {
          icon: 'wifi',
          title: 'KT 전용 무선망 & 본사 직영 A/S 인프라',
          desc: '피크타임에도 주문 끊김 없는 고성능 KT 무선 Wi-Fi 환경 구축과 본사 직영 엔지니어의 신속한 현장 점검 서비스를 지원합니다.'
        }
      ],
      specs: [
        { label: '단말기 사양', val: '초고화질 IPS 멀티터치 디스플레이 무선 테이블 태블릿' },
        { label: '결제 방식', val: '선불형 (테이블 즉시 결제) / 후불형 (카운터 결제) 매장 맞춤 선택' },
        { label: '포스기 연동', val: '기존 및 신규 포스기와 실시간 메뉴 품절/주문 즉시 동기화' },
        { label: '네트워크', val: 'KT 전용 프리미엄 매장 무선 Wi-Fi 환경 무료 구성' },
        { label: '오픈케어 제휴 혜택', val: '테이블 설치 대수별 단독 패키지 할인 + 전용 거치대 무상 지원' }
      ]
    },
    purifier: {
      brandBadge: '전 브랜드 비교 공식 렌탈',
      title: '정수기 (업소용·오피스) - 코웨이 / SK매직 / 쿠쿠 비교 렌탈',
      serviceVal: '정수기',
      themeColor: 'cyan',
      intro: '식당 손님용 대용량 냉온정수기부터 사무실 탕비실용 콤팩트 직수형까지! 브랜드별 실시간 프로모션과 결합 특가를 투명하게 안내합니다.',
      images: [],
      highlights: [
        {
          icon: 'droplet',
          title: '업종 및 매장 규모 맞춤 최적 용량 매칭',
          desc: '손님 회전이 빠른 음식점용 대용량 스탠드형부터 공간 활용도가 뛰어난 슬림 직수형까지 매장 환경에 딱 맞는 모델을 비교 추천해 드립니다.'
        },
        {
          icon: 'check-circle-2',
          title: '정기 방문 살균 케어 & 정품 필터 무상 교체',
          desc: '전문 위생 매니저의 주기적인 스팀 살균, 코크 세척, 정품 나노/중공사막 필터 무상 교체로 고객에게 언제나 맑고 위생적인 물을 제공합니다.'
        },
        {
          icon: 'shield-check',
          title: '렌탈 기간 전 기간 무상 A/S 보증',
          desc: '렌탈 이용 기간 동안 기기 결함이나 부품 이상 발생 시 브랜드 공식 본사 A/S 센터에서 신속하게 100% 무상 수리를 지원합니다.'
        },
        {
          icon: 'sparkles',
          title: '5대 설비 동시 결합 시 월 렌탈료 추가 할인',
          desc: '인터넷, CCTV, 포스기와 함께 결합 신청 시 제휴 단독 비공개 결합 프로모션이 적용되어 월 렌탈료를 대폭 낮춰 드립니다.'
        }
      ],
      specs: [
        { label: '비교 브랜드', val: '코웨이 / SK매직 / 쿠쿠 / 청호나이스 등 전 브랜드 공식 파트너' },
        { label: '제품 라인업', val: '식당용 대용량 냉온 스탠드형 / 카페·오피스용 슬림 직수형' },
        { label: '필터 및 위생', val: '고성능 복합 필터 시스템 탑재 & 방문 살균 위생 관리' },
        { label: 'A/S 보증', val: '각 제조사 공식 본사 전국 무상 A/S 보증 지원' },
        { label: '오픈케어 제휴 혜택', val: '타 설비 결합 시 월 렌탈료 비공개 특별가 + 등록비/설치비 전액 면제' }
      ]
    }
  };

  const modalItemDetail = document.getElementById('modal-item-detail');
  const detailBrandBadge = document.getElementById('detail-brand-badge');
  const detailTitle = document.getElementById('detail-title');
  const detailContent = document.getElementById('detail-content');
  const btnCloseDetail = document.getElementById('btn-close-detail');
  const btnCloseDetailFooter = document.getElementById('btn-close-detail-footer');
  const btnApplyDetailItem = document.getElementById('btn-apply-detail-item');
  let currentDetailServiceVal = '';

  // 카드 클릭 시 모달 열기
  const itemCards = document.querySelectorAll('.item-card');
  itemCards.forEach((card) => {
    card.addEventListener('click', () => {
      const itemKey = card.getAttribute('data-item');
      const data = ITEM_DETAILS[itemKey];
      if (!data || !modalItemDetail) return;

      currentDetailServiceVal = data.serviceVal;

      // 1. 헤더 업데이트
      if (detailBrandBadge) detailBrandBadge.textContent = data.brandBadge;
      if (detailTitle) detailTitle.textContent = data.title;

      // 2. 바디 내용 빌드
      let html = '';

      // 안내 서두
      html += `
        <div class="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 sm:p-5 text-slate-800 text-sm leading-relaxed flex items-start gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
            <i data-lucide="info" class="w-4 h-4"></i>
          </div>
          <div>
            <p class="font-bold text-slate-900 mb-1">오픈케어 제휴 공식 안내</p>
            <p class="text-slate-600">${data.intro}</p>
          </div>
        </div>
      `;

      // 공식 소개 이미지 섹션 (공식 이미지 보유 시 - 압축 제한 없이 100% 폭으로 시원하게 노출)
      if (data.images && data.images.length > 0) {
        html += `
          <div>
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <i data-lucide="image" class="w-5 h-5 text-blue-600"></i>
                <span>브랜드 공식 솔루션 소개 이미지</span>
              </h4>
              <span class="text-xs text-blue-600 font-semibold flex items-center gap-1">
                <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
                사진 터치 시 고화질 확대
              </span>
            </div>
            <div class="grid gap-6">
        `;

        data.images.forEach((img) => {
          html += `
            <div class="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-5 shadow-sm space-y-3">
              <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <p class="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block flex-shrink-0"></span>
                  <span>${img.title}</span>
                </p>
                <button type="button" class="btn-trigger-zoom flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition border border-blue-200 cursor-pointer shadow-sm" data-src="${img.src}" data-title="${img.title}">
                  <i data-lucide="zoom-in" class="w-3.5 h-3.5"></i>
                  <span>크게 보기</span>
                </button>
              </div>

              <!-- 원본 비율 그대로 시원하게 꽉 채우는 이미지 컨테이너 (세로/가로 찌그러짐 원천 차단) -->
              <div class="overflow-hidden rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer group btn-trigger-zoom relative" data-src="${img.src}" data-title="${img.title}">
                <img src="${img.src}" alt="${img.title}" class="w-full h-auto block rounded-xl transition-transform duration-300 group-hover:scale-[1.008]" />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                  <span class="opacity-0 group-hover:opacity-100 bg-slate-900/85 text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-lg transition-opacity flex items-center gap-1.5 backdrop-blur-sm">
                    <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
                    클릭 시 고화질 원본 확대
                  </span>
                </div>
              </div>

              <div class="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                ${img.caption}
              </div>
            </div>
          `;
        });

        html += `
            </div>
          </div>
        `;
      }

      // 핵심 특장점 4개 그리드
      if (data.highlights && data.highlights.length > 0) {
        html += `
          <div>
            <h4 class="text-base sm:text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <i data-lucide="check-circle" class="w-5 h-5 text-blue-600"></i>
              <span>핵심 특장점 및 사장님 혜택</span>
            </h4>
            <div class="grid sm:grid-cols-2 gap-4">
        `;

        data.highlights.forEach((h) => {
          html += `
            <div class="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:bg-white hover:shadow-md transition">
              <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                <i data-lucide="${h.icon}" class="w-5 h-5"></i>
              </div>
              <h5 class="font-bold text-slate-900 text-sm mb-1.5">${h.title}</h5>
              <p class="text-xs text-slate-600 leading-relaxed">${h.desc}</p>
            </div>
          `;
        });

        html += `
            </div>
          </div>
        `;
      }

      // 상세 스펙 테이블
      if (data.specs && data.specs.length > 0) {
        html += `
          <div>
            <h4 class="text-base sm:text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <i data-lucide="list" class="w-5 h-5 text-blue-600"></i>
              <span>공식 상세 사양 및 지원 내용</span>
            </h4>
            <div class="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table class="w-full text-xs sm:text-sm text-left border-collapse">
                <tbody>
        `;

        data.specs.forEach((s, idx) => {
          const bgClass = idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70';
          html += `
            <tr class="${bgClass} border-b border-slate-200/70 last:border-b-0">
              <th class="py-3 px-4 font-bold text-slate-900 w-1/3 sm:w-1/4 bg-slate-100/60 border-r border-slate-200/70">${s.label}</th>
              <td class="py-3 px-4 text-slate-700 leading-relaxed">${s.val}</td>
            </tr>
          `;
        });

        html += `
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      // 오픈케어 비공개 상담 안내 알림 (외부 번호나 카카오톡 링크 없이 내부 신청 안내)
      html += `
        <div class="bg-slate-100 rounded-2xl p-4 text-xs text-slate-600 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <i data-lucide="shield-alert" class="w-4 h-4 text-slate-500 flex-shrink-0"></i>
            <span>본 설비는 사업장 환경(평수, 회선, 테이블 대수)에 따라 최적 요율이 산출되므로 아래 견적 문의를 통해 1:1 맞춤 견적서를 받아보실 수 있습니다.</span>
          </div>
        </div>
      `;

      if (detailContent) {
        detailContent.innerHTML = html;

        // 이미지 확대(라이트박스) 이벤트 바인딩
        detailContent.querySelectorAll('.btn-trigger-zoom').forEach((trigger) => {
          trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const target = trigger.closest('[data-src]') || trigger;
            const src = target.getAttribute('data-src');
            const title = target.getAttribute('data-title');
            if (src) {
              openZoomModal(src, title);
            }
          });
        });
      }

      // 1. 모달 표시 (display: none 해제) & 배경 스크롤 방지
      modalItemDetail.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');

      // 2. 모달이 렌더링된 직후 스크롤을 최상단으로 강력 리셋 (즉시, rAF 2중, 타이머 3중 보정)
      function resetScrollToTop() {
        if (detailContent) {
          detailContent.scrollTop = 0;
          try {
            detailContent.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          } catch (e) {
            detailContent.scrollTop = 0;
          }
        }
        if (modalItemDetail) {
          modalItemDetail.scrollTop = 0;
          const innerCard = modalItemDetail.firstElementChild;
          if (innerCard) innerCard.scrollTop = 0;
        }
      }

      resetScrollToTop();
      requestAnimationFrame(() => {
        resetScrollToTop();
        requestAnimationFrame(resetScrollToTop);
      });
      setTimeout(resetScrollToTop, 20);
      setTimeout(resetScrollToTop, 60);
      setTimeout(resetScrollToTop, 150);

      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  });

  // 모달 닫기 핸들러: 닫힐 때도 스크롤 위치를 0으로 선제 복구
  function closeDetailModal() {
    if (detailContent) {
      detailContent.scrollTop = 0;
      try {
        detailContent.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } catch (e) {}
    }
    if (modalItemDetail) {
      modalItemDetail.scrollTop = 0;
      const innerCard = modalItemDetail.firstElementChild;
      if (innerCard) innerCard.scrollTop = 0;
      modalItemDetail.classList.add('hidden');
    }
    document.body.classList.remove('overflow-hidden');
  }

  if (btnCloseDetail) btnCloseDetail.addEventListener('click', closeDetailModal);
  if (btnCloseDetailFooter) btnCloseDetailFooter.addEventListener('click', closeDetailModal);

  if (modalItemDetail) {
    modalItemDetail.addEventListener('click', (e) => {
      if (e.target === modalItemDetail) {
        closeDetailModal();
      }
    });
  }

  // ESC 키 누를 때도 모달 닫기 및 스크롤 리셋
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalItemDetail && !modalItemDetail.classList.contains('hidden')) {
      closeDetailModal();
    }
  });

  // ==================== 이미지 고화질 확대 뷰어 (라이트박스) 핸들러 ====================
  const modalImageZoom = document.getElementById('modal-image-zoom');
  const zoomImageSrc = document.getElementById('zoom-image-src');
  const zoomImageTitle = document.getElementById('zoom-image-title');
  const btnCloseZoom = document.getElementById('btn-close-zoom');

  function openZoomModal(src, title) {
    if (!modalImageZoom || !zoomImageSrc) return;
    zoomImageSrc.src = src;
    if (zoomImageTitle) zoomImageTitle.textContent = title || '공식 이미지 고화질 원본';
    modalImageZoom.classList.remove('hidden');
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closeZoomModal() {
    if (modalImageZoom) {
      modalImageZoom.classList.add('hidden');
    }
  }

  if (btnCloseZoom) btnCloseZoom.addEventListener('click', closeZoomModal);
  if (modalImageZoom) {
    modalImageZoom.addEventListener('click', (e) => {
      if (e.target === modalImageZoom || e.target.id === 'zoom-img-container' || e.target === zoomImageSrc) {
        closeZoomModal();
      }
    });
  }

  // "이 설비 비공개 견적 문의" 버튼 클릭 시
  if (btnApplyDetailItem) {
    btnApplyDetailItem.addEventListener('click', () => {
      closeDetailModal();

      // 해당 서비스 체크박스 자동 선택
      if (currentDetailServiceVal) {
        const targetCheckbox = document.querySelector(`input[name="services"][value="${currentDetailServiceVal}"]`);
        if (targetCheckbox) {
          targetCheckbox.checked = true;
          targetCheckbox.dispatchEvent(new Event('change'));
        }
      }

      // 견적 신청 폼 섹션으로 부드럽게 스크롤
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }

      // 성함 입력창 포커스
      setTimeout(() => {
        const custNameInput = document.getElementById('custName');
        if (custNameInput) {
          custNameInput.focus();
        }
      }, 600);
    });
  }

  // Modal Handlers (이용약관, 개인정보처리방침)
  const modalTerms = document.getElementById('modal-terms');
  const modalPrivacy = document.getElementById('modal-privacy');
  const btnOpenTerms = document.getElementById('btn-open-terms');
  const btnOpenPrivacy = document.getElementById('btn-open-privacy');
  const closeButtons = document.querySelectorAll('.btn-close-modal');

  if (btnOpenTerms && modalTerms) {
    btnOpenTerms.addEventListener('click', () => {
      modalTerms.classList.remove('hidden');
    });
  }

  if (btnOpenPrivacy && modalPrivacy) {
    btnOpenPrivacy.addEventListener('click', () => {
      modalPrivacy.classList.remove('hidden');
    });
  }

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (modalTerms) modalTerms.classList.add('hidden');
      if (modalPrivacy) modalPrivacy.classList.add('hidden');
    });
  });

  [modalTerms, modalPrivacy].forEach((modal) => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    }
  });

  // Kakao / Daum 우편번호 서비스 연동
  const btnSearchAddr = document.getElementById('btn-search-addr');
  const custAddressInput = document.getElementById('custAddress');
  const custAddressDetailInput = document.getElementById('custAddressDetail');

  function openPostcode() {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          let fullAddr = data.address;
          let extraAddr = '';

          if (data.addressType === 'R') {
            if (data.bname !== '') {
              extraAddr += data.bname;
            }
            if (data.buildingName !== '') {
              extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
          }

          if (custAddressInput) {
            custAddressInput.value = fullAddr;
          }
          if (custAddressDetailInput) {
            custAddressDetailInput.focus();
          }
        }
      }).open();
    } else {
      alert('우편번호 검색 서비스를 불러오는 중입니다. 잠시 후 다시 클릭해 주세요.');
    }
  }

  if (btnSearchAddr) {
    btnSearchAddr.addEventListener('click', openPostcode);
  }
  if (custAddressInput) {
    custAddressInput.addEventListener('click', openPostcode);
  }

  // Inquiry Form Handler -> zkfn1125@gmail.com & Telegram Bot
  const inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    const submitBtn = inquiryForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '견적 신청하기';
    let isSubmitting = false;

    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // 1. 중복 클릭 / 버튼 연타 원천 차단
      if (isSubmitting) return;

      const name = document.getElementById('custName')?.value.trim() || '';
      const phoneInput = document.getElementById('custPhone');
      const phone = phoneInput?.value.trim() || '';
      const address = custAddressInput?.value.trim() || '';
      const addressDetail = custAddressDetailInput?.value.trim() || '';
      const fullAddress = address ? `${address} ${addressDetail}`.trim() : '미입력';
      const memo = document.getElementById('custMemo')?.value.trim() || '없음';

      // 2. 오접수 방지: 연락처 유효성 검사 (숫자 9~12자리)
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 9 || cleanPhone.length > 12) {
        alert('올바른 연락처(휴대폰 번호 또는 일반 전화번호)를 입력해 주세요.\n(예: 010-1234-5678)');
        if (phoneInput) phoneInput.focus();
        return;
      }

      // 3. 한 명의 중복 오접수 방지 (동일 연락처 5분 쿨다운)
      const COOLDOWN_MS = 5 * 60 * 1000; // 5분
      let submittedMap = {};
      try {
        submittedMap = JSON.parse(localStorage.getItem('opencare_recent_submissions') || '{}');
      } catch (err) {
        submittedMap = {};
      }

      const lastTime = submittedMap[cleanPhone];
      if (lastTime && (Date.now() - lastTime < COOLDOWN_MS)) {
        const remainingMin = Math.ceil((COOLDOWN_MS - (Date.now() - lastTime)) / 60000);
        alert(`[중복 접수 안내]\n\n이미 방금 동일한 연락처(${phone})로 상담 신청이 정상 접수되었습니다!\n\n전담 매니저가 확인 후 순차적으로 연락을 드리고 있으니 잠시만 기다려 주세요.\n(추가 문의사항은 약 ${remainingMin}분 뒤에 다시 신청하실 수 있습니다.)`);
        return;
      }

      const businessType = inquiryForm.querySelector('input[name="businessType"]:checked')?.value || '선택 안됨';
      const selectedServices = Array.from(inquiryForm.querySelectorAll('input[name="services"]:checked'))
        .map((cb) => cb.value);

      if (selectedServices.length === 0) {
        alert('필요한 설비 상품을 최소 1개 이상 선택해 주세요.');
        return;
      }

      const serviceListText = selectedServices.join(', ');

      isSubmitting = true;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>신청 접수 중입니다...</span>';
      }

      try {
        const now = new Date().toLocaleString('ko-KR');

        // 1. 텔레그램 봇 실시간 알림 전송 (설치 주소 포함)
        const telegramToken = "8924688857:AAGUnyWhwUmsIXeL2ZEnZxeGoG-lL0smtfc";
        const telegramChatId = "1273571393";
        const tgText = `🔔 <b>[오픈케어 신규 견적 접수]</b>\n\n` +
          `👤 <b>성함/상호명:</b> ${name}\n` +
          `📞 <b>연락처:</b> ${phone}\n` +
          `📍 <b>설치 주소:</b> ${fullAddress}\n` +
          `🏢 <b>사업장 형태:</b> ${businessType}\n` +
          `📦 <b>선택 설비 품목:</b> ${serviceListText}\n` +
          `📝 <b>문의/오픈일정:</b> ${memo}\n` +
          `⏰ <b>신청 일시:</b> ${now}`;

        fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: tgText,
            parse_mode: "HTML"
          })
        }).catch((err) => console.warn('Telegram send error:', err));

        // 2. 구글 이메일 백업 전송 (FormSubmit)
        const payload = {
          "_subject": `[오픈케어 견적문의] ${name} 사장님 (${phone})`,
          "_template": "table",
          "_captcha": "false",
          "고객 성함 / 상호명": name,
          "연락처": phone,
          "설치 희망 주소": fullAddress,
          "사업장 형태": businessType,
          "선택한 5대 설비 품목": serviceListText,
          "오픈 예정일 및 문의 내용": memo,
          "신청 일시": now
        };

        const response = await fetch("https://formsubmit.co/ajax/zkfn1125@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });

        await response.json().catch(() => ({}));

        // 4. 성공 시 연락처 접수 시간 기록 (5분간 재접수 방지)
        submittedMap[cleanPhone] = Date.now();
        try {
          localStorage.setItem('opencare_recent_submissions', JSON.stringify(submittedMap));
        } catch (storageErr) {}

        alert(`[견적 신청이 정상 접수되었습니다]\n\n성함/상호: ${name} (${phone})\n선택 품목: ${serviceListText}\n\n신청 내용이 담당자에게 실시간 전송되었습니다. 확인 후 신속하게 연락드리겠습니다!`);
        inquiryForm.reset();
      } catch (err) {
        console.error('Submit error:', err);
        alert('전송 중 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.');
      } finally {
        isSubmitting = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }
});
