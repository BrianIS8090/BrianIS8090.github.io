/* ============================================
   BRIAN :: ARCADE PORTFOLIO — JS
   ============================================ */

(function () {
  'use strict';

  // --- Typing Effect ---
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');

  const titleText = 'BRIAN';
  const subtitleText = 'SENIOR VIBEDEVELOPER // ИНЖЕНЕР-ПРОГРАММИСТ // FULL-STACK // ИНЖЕНЕР-КОНСТРУКТОР';

  let charIndex = 0;
  let subtitleIndex = 0;

  function typeTitle() {
    if (charIndex < titleText.length) {
      heroTitle.textContent += titleText[charIndex];
      charIndex++;
      playBeep('type');
      setTimeout(typeTitle, 120);
    } else {
      heroTitle.innerHTML += '<span class="blink">_</span>';
      setTimeout(typeSubtitle, 400);
    }
  }

  function typeSubtitle() {
    if (subtitleIndex < subtitleText.length) {
      heroSubtitle.textContent += subtitleText[subtitleIndex];
      subtitleIndex++;
      setTimeout(typeSubtitle, 30);
    }
  }

  // Start typing after a short delay
  setTimeout(typeTitle, 800);

  // --- Sound Effects ---
  let soundEnabled = true;
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playBeep(type) {
    if (!soundEnabled) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'type') {
        osc.frequency.value = 800 + Math.random() * 200;
        gain.gain.value = 0.02;
        osc.start();
        osc.stop(audioCtx.currentTime + 0.03);
      } else if (type === 'hover') {
        osc.frequency.value = 1200;
        gain.gain.value = 0.015;
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } else if (type === 'click') {
        osc.frequency.value = 600;
        gain.gain.value = 0.03;
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      }
    } catch (e) {
      // Audio not available
    }
  }

  // Sound toggle
  const soundToggle = document.getElementById('soundToggle');
  soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.querySelector('.sound-on').style.display = soundEnabled ? '' : 'none';
    soundToggle.querySelector('.sound-off').style.display = soundEnabled ? 'none' : '';
    if (soundEnabled && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    playBeep('click');
  });

  // Hover sounds on interactive elements
  document.querySelectorAll('.nav-link, .card-link, .press-start, .project-card, .skill-card, .footer-link').forEach(el => {
    el.addEventListener('mouseenter', () => playBeep('hover'));
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => playBeep('click'));
  });

  // --- Mobile Menu ---
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  // --- Score Counter Animation ---
  function animateCounters() {
    document.querySelectorAll('.score-value').forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 1500;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    });
  }

  // --- Scroll Reveal & Bar Animations ---
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate bars inside this section
        entry.target.querySelectorAll('.bar-fill, .skill-fill, .activity-bar').forEach((bar, i) => {
          setTimeout(() => {
            bar.classList.add('animated');
          }, i * 100);
        });

        // Animate counters if in stats section
        if (entry.target.id === 'stats' || entry.target.querySelector('.score-value')) {
          animateCounters();
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply reveal class to sections and observe them
  document.querySelectorAll('.section, .hud-panel, .project-card, .skill-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // --- Smooth scroll for nav links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- Nav background on scroll ---
  const nav = document.getElementById('arcadeNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.borderBottomColor = 'var(--neon-cyan)';
    } else {
      nav.style.borderBottomColor = 'var(--neon-green)';
    }
  });

})();
