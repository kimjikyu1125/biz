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

  // Inquiry Form Handler
  const inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const businessType = inquiryForm.querySelector('input[name="businessType"]:checked')?.value || '선택 안됨';
      const selectedServices = Array.from(inquiryForm.querySelectorAll('input[name="services"]:checked'))
        .map((cb) => cb.value);
      const name = document.getElementById('custName')?.value || '';
      const phone = document.getElementById('custPhone')?.value || '';

      const serviceListText = selectedServices.length > 0 ? selectedServices.join(', ') : '선택 없음';

      alert(`[비공개 견적 신청 완료]\n성함/상호: ${name} (${phone})\n업종: ${businessType}\n선택 품목: ${serviceListText}\n\n폐쇄몰 제휴 특가 정책이 정상 적용되었습니다! 전담 VIP 매니저가 비공개 최대 지원금을 확인 후 신속히 연락드리겠습니다.`);
      inquiryForm.reset();
    });
  }
});
