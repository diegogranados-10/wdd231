// Chamber of Commerce of Santa Teresa del Tuy — Shared site script
(function () {
  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  // Newsletter signup (no backend)
  document.querySelectorAll('[data-newsletter]').forEach((form) => {
    const status = form.querySelector('[data-newsletter-status]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.reset();
      form.querySelector('button').textContent = 'Subscribed';
      if (status) status.textContent = 'Thanks for subscribing.';
    });
  });

  // Live date in utility bar
  const dateEl = document.querySelector('[data-live-date]');
  if (dateEl) {
    const fmt = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    dateEl.textContent = fmt.format(new Date());
  }

  // Live clock for weather card
  const clockEl = document.querySelector('[data-live-clock]');
  if (clockEl) {
    const updateClock = () => {
      const t = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date());
      clockEl.textContent = t + ' VET';
    };
    updateClock();
    setInterval(updateClock, 30 * 1000);
  }

  // Contact form (no real backend) — just simulate validation/submission
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = 'Sending…';
      status.style.color = 'var(--ink-soft)';
      setTimeout(() => {
        status.textContent =
          'Message received. We will reply within 1-2 business days.';
        status.style.color = 'var(--green)';
        form.reset();
      }, 700);
    });
  }

  // Copyright year
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Last modification date
  const modEl = document.getElementById('last-modified');
  if (modEl) {
    modEl.textContent = document.lastModified;
  }
})();
