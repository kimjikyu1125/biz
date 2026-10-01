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

        // Close other items
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

  // Close modals
  closeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (modalTerms) modalTerms.classList.add('hidden');
      if (modalPrivacy) modalPrivacy.classList.add('hidden');
    });
  });

  // Close modal when clicking background overlay
  [modalTerms, modalPrivacy].forEach((modal) => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    }
  });

  // Inquiry Form Handler -> zkfn1125@gmail.com
  const inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    const submitBtn = inquiryForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '견적 신청하기';

    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const businessType = inquiryForm.querySelector('input[name="businessType"]:checked')?.value || '선택 안됨';
      const selectedServices = Array.from(inquiryForm.querySelectorAll('input[name="services"]:checked'))
        .map((cb) => cb.value);
      const name = document.getElementById('custName')?.value.trim() || '';
      const phone = document.getElementById('custPhone')?.value.trim() || '';
      const memo = document.getElementById('custMemo')?.value.trim() || '없음';

      const serviceListText = selectedServices.length > 0 ? selectedServices.join(', ') : '선택 없음';

      // Button loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>메일 전송 중입니다...</span>';
      }

      try {
        const payload = {
          "_subject": `[오픈케어 견적문의] ${name} 사장님 (${phone})`,
          "_template": "table",
          "고객 성함 / 상호명": name,
          "연락처": phone,
          "사업장 형태": businessType,
          "선택한 5대 설비 품목": serviceListText,
          "오픈 예정일 및 문의 내용": memo,
          "신청 일시": new Date().toLocaleString('ko-KR')
        };

        const response = await fetch("https://formsubmit.co/ajax/zkfn1125@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          alert(`[견적 신청 완료]\n성함/상호: ${name} (${phone})\n선택 품목: ${serviceListText}\n\n작성하신 내용이 대표님 이메일(zkfn1125@gmail.com)로 정상 발송되었습니다! 확인 후 신속히 연락드리겠습니다.`);
          inquiryForm.reset();
        } else {
          alert('전송 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주시거나 1588-0000으로 문의해 주세요.');
        }
      } catch (err) {
        console.error('Submit error:', err);
        alert('전송 중 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }
});
