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

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
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
