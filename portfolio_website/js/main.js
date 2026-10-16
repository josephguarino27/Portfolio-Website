/**
 * Rey Joseph Guarino — Portfolio JavaScript Engine
 * Handles navigation, interactive modals, copy-to-clipboard, live clock & form interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initScrollSpy();
  initMobileDrawer();
  initCopyEmail();
  initCaseStudyModal();
  initLiveClock();
  initContactForm();
});

/* ==========================================================================
   1. STICKY HEADER EFFECT
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. SCROLL SPY ACTIVE NAV LINK
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');
  if (!toggleBtn || !drawer) return;

  const toggleDrawer = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  const openDrawer = () => {
    drawer.classList.add('open');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', toggleDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   4. COPY EMAIL TO CLIPBOARD WITH TOAST
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('email-text');
  const copyBtnText = document.getElementById('copy-btn-text');
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-msg');

  if (!copyBtn || !emailTextEl || !toast) return;

  let toastTimer = null;

  const showToast = (message) => {
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  copyBtn.addEventListener('click', async () => {
    const email = emailTextEl.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      if (copyBtnText) copyBtnText.textContent = 'Copied!';
      showToast('Copied email to clipboard!');
      
      setTimeout(() => {
        if (copyBtnText) copyBtnText.textContent = 'Copy';
      }, 2500);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (copyBtnText) copyBtnText.textContent = 'Copied!';
      showToast('Copied email to clipboard!');
      setTimeout(() => {
        if (copyBtnText) copyBtnText.textContent = 'Copy';
      }, 2500);
    }
  });
}

/* ==========================================================================
   5. CASE STUDY MODAL DATA & CONTROLLER
   ========================================================================== */
const CASE_STUDIES = {
  1: {
    title: 'Salon Appointment Scheduling & Management System',
    category: 'FULL-STACK // BOOKING & CLIENT MANAGEMENT',
    year: '2025',
    image: 'assets/images/project-1.png',
    summary: 'A comprehensive booking, queue management, and service scheduling system engineered for beauty salons and wellness centers to optimize daily operations.',
    challenge: 'Managing overlapping stylist schedules, real-time client queues, service packages, and revenue tracking without double-booking or scheduling friction.',
    solution: 'Architected a responsive scheduling dashboard with automated appointment slot validation, client history records, live queue tracking, and revenue calculation tables.',
    stack: ['Next.js 14', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    metrics: [
      { val: '100%', label: 'Schedule Accuracy' },
      { val: '0', label: 'Double Bookings' },
      { val: '< 150ms', label: 'Response Time' }
    ]
  },
  2: {
    title: 'VacTrack — Vaccine & Patient Tracking System',
    category: 'HEALTHCARE // CLINIC & INVENTORY SYSTEM',
    year: '2024',
    image: 'assets/images/project-2.png',
    summary: 'A robust clinic and immunization tracking system designed to streamline patient records, monitor vaccine batch inventories, manage dosage schedules, and generate public health compliance reports.',
    challenge: 'Ensuring accurate tracking of multi-dose immunization schedules, cold-chain batch expiration dates, and rapid patient referral retrieval across clinic staff.',
    solution: 'Developed an intuitive clinical dashboard with automated dose milestone reminders, real-time inventory decrementing on administration, and instant printable referral slips.',
    stack: ['React', 'Node.js', 'REST APIs', 'MySQL', 'Bootstrap'],
    metrics: [
      { val: '100%', label: 'Record Accuracy' },
      { val: '4x', label: 'Faster Check-In' },
      { val: 'Real-Time', label: 'Stock Tracking' }
    ]
  },
  3: {
    title: 'InventoryHub — Stock & Order Management System',
    category: 'E-COMMERCE // INVENTORY & WAREHOUSE DASHBOARD',
    year: '2024',
    image: 'assets/images/project-3.png',
    summary: 'A centralized inventory and warehouse dashboard providing real-time stock level monitoring, automated low-inventory alerts, purchase order workflows, and supplier management.',
    challenge: 'Preventing stock-outs across fast-moving product SKUs and unifying purchase orders, supplier coordination, and product valuations in a single unified interface.',
    solution: 'Engineered an automated threshold monitoring system that triggers immediate low-stock alerts, computes total valuation metrics, and enables seamless order dispatch.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'REST APIs'],
    metrics: [
      { val: '3.4k+', label: 'Tracked SKUs' },
      { val: '99.8%', label: 'Inventory Precision' },
      { val: 'Instant', label: 'Low-Stock Alerts' }
    ]
  },
  4: {
    title: 'StaffPulse — Employee Attendance & HR Dashboard',
    category: 'HR TECH // WORKFORCE & ATTENDANCE MANAGEMENT',
    year: '2024',
    image: 'assets/images/project-4.png',
    summary: 'A modern workforce attendance and human resource dashboard featuring real-time check-in/out tracking, automated timesheet calculation, leave request approvals, and shift scheduling.',
    challenge: 'Eliminating manual attendance punch reconciliation, handling multi-shift employee schedules, and automating leave approval workflows across departments.',
    solution: 'Built a unified HR management portal with live daily presence metrics, one-click leave approval queues, department filtering, and exportable payroll-ready attendance reports.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    metrics: [
      { val: '96.4%', label: 'On-Time Arrival Rate' },
      { val: '90%', label: 'Less HR Admin Time' },
      { val: '100%', label: 'Automated Timesheets' }
    ]
  }
};

function initCaseStudyModal() {
  const modal = document.getElementById('case-study-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body-content');
  const triggerBtns = document.querySelectorAll('.view-case-study-btn');

  if (!modal || !modalBody) return;

  const openModal = (projectId) => {
    const data = CASE_STUDIES[projectId] || CASE_STUDIES[1];

    const imageHtml = data.image 
      ? `<img src="${data.image}" alt="${data.title}" class="modal-hero-img">`
      : '';

    const metricsHtml = data.metrics.map(m => `
      <div class="metric-pill">
        <span class="metric-val">${m.val}</span>
        <span class="metric-desc">${m.label}</span>
      </div>
    `).join('');

    const stackHtml = data.stack.map(s => `
      <span class="tech-pill">${s}</span>
    `).join('');

    modalBody.innerHTML = `
      ${imageHtml}
      <span class="modal-tag">${data.category} • ${data.year}</span>
      <h3 class="modal-title">${data.title}</h3>
      <p style="color: #cbd5e1; font-size: 1.05rem; line-height: 1.6; margin-bottom: 24px;">${data.summary}</p>

      <div class="modal-metrics-row">
        ${metricsHtml}
      </div>

      <div class="modal-grid">
        <div class="modal-block">
          <h5>The Challenge</h5>
          <p>${data.challenge}</p>
        </div>
        <div class="modal-block">
          <h5>The Architectural Solution</h5>
          <p>${data.solution}</p>
        </div>
      </div>

      <div style="margin-top: 24px;">
        <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 10px;">Technologies Deployed</span>
        <div class="tech-stack-pills" style="margin-bottom: 28px;">
          ${stackHtml}
        </div>
      </div>

      <div style="display: flex; gap: 14px; flex-wrap: wrap;">
        <a href="#contact" class="btn btn-primary" onclick="window.closeCaseStudyModal();">Inquire About Similar Solutions</a>
        <button class="btn btn-outline" onclick="window.closeCaseStudyModal();">Close Preview</button>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closeCaseStudyModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-id') || '1';
      openModal(id);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', window.closeCaseStudyModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      window.closeCaseStudyModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      window.closeCaseStudyModal();
    }
  });
}

/* ==========================================================================
   6. REAL-TIME MANILA CLOCK
   ========================================================================== */
function initLiveClock() {
  const clockEl = document.getElementById('local-time');
  if (!clockEl) return;

  const updateClock = () => {
    try {
      const now = new Date();
      // Format time in Asia/Manila (GMT+8)
      const options = {
        timeZone: 'Asia/Manila',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const formatted = new Intl.DateTimeFormat('en-US', options).format(now);
      clockEl.textContent = `Manila, PH: ${formatted} GMT+8`;
    } catch (e) {
      clockEl.textContent = `Manila, PH: Available Worldwide`;
    }
  };

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   7. INTERACTIVE CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  window.handleContactSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById('contact-form');
    if (!form) return;

    const name = document.getElementById('form-name')?.value || 'Guest';
    const email = document.getElementById('form-email')?.value || '';
    const project = document.getElementById('form-project')?.value || 'inquiry';
    const message = document.getElementById('form-message')?.value || '';

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-msg');

    if (toast && toastMsg) {
      toastMsg.textContent = `Thank you, ${name}! Your message has been sent.`;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }

    // Reset form fields
    form.reset();
  };
}
