/* ============================================
   PROFESSIONAL PORTFOLIO - COMPLETE JS
   ============================================ */

(function () {
  'use strict';

  // ============ PRELOADER ============
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 800);
  });

  // ============ SCROLL PROGRESS ============
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = progress + '%';
  });

  // ============ NAVBAR ============
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Active Nav Link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  });

  // ============ MOBILE MENU ============
  const hamburger = document.getElementById('hamburger');
  const navLinksMenu = document.getElementById('navLinks');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navLinksMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navLinksMenu.classList.contains('active') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', toggleMobileMenu);
  navLinksMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { if (navLinksMenu.classList.contains('active')) toggleMobileMenu(); });
  });

  // ============ SMOOTH SCROLL ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // ============ TYPING EFFECT ============
  const typedElement = document.getElementById('typedText');
  const phrases = ['digital experiences.', 'web applications.', 'smart bots.', 'clean interfaces.', 'scalable systems.'];
  const phrasesAr = ['تجارب رقمية.', 'تطبيقات ويب.', 'بوتات ذكية.', 'واجهات نظيفة.', 'أنظمة قابلة للتوسع.'];
  let phraseIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 80;

  function typeEffect() {
    const currentPhrases = document.documentElement.lang === 'ar' ? phrasesAr : phrases;
    const currentPhrase = currentPhrases[phraseIndex];

    if (isDeleting) {
      typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % currentPhrases.length;
      typeSpeed = 400;
    }
    setTimeout(typeEffect, typeSpeed);
  }
  setTimeout(typeEffect, 1200);

  // ============ ANIMATED COUNTERS ============
  function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
      if (counter.dataset.animated) return;
      const target = parseInt(counter.dataset.target);
      const start = performance.now();
      counter.dataset.animated = 'true';
      function update(now) {
        const progress = Math.min((now - start) / 2000, 1);
        counter.textContent = Math.floor((1 - Math.pow(1 - progress, 3)) * target);
        if (progress < 1) requestAnimationFrame(update);
        else counter.textContent = target;
      }
      requestAnimationFrame(update);
    });
  }

  // ============ SKILL BARS ============
  function animateSkillBars() {
    document.querySelectorAll('.skill-fill').forEach(bar => {
      if (bar.dataset.animated) return;
      bar.dataset.animated = 'true';
      setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 300);
    });
  }

  // ============ INTERSECTION OBSERVER ============
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        if (entry.target.querySelector('.stat-number')) animateCounters();
        if (entry.target.querySelector('.skill-fill')) animateSkillBars();
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  setTimeout(animateCounters, 1500);

  // ============ MAGNETIC BUTTONS ============
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.3}px, ${(e.clientY - rect.top - rect.height / 2) * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  // ============ CURSOR TRAIL ============
  if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.style.cssText = 'position:fixed;width:8px;height:8px;background:var(--accent);border-radius:50%;pointer-events:none;z-index:9999;opacity:0.5;transition:transform 0.15s ease;mix-blend-mode:screen;';
    document.body.appendChild(cursor);

    const trails = [];
    for (let i = 0; i < 5; i++) {
      const trail = document.createElement('div');
      trail.style.cssText = `position:fixed;width:8px;height:8px;background:var(--accent);border-radius:50%;pointer-events:none;z-index:9998;opacity:${0.3 - i * 0.05};transition:transform ${0.1 + i * 0.05}s ease;mix-blend-mode:screen;`;
      document.body.appendChild(trail);
      trails.push(trail);
    }

    let mouseX = 0, mouseY = 0;
    const trailX = new Array(5).fill(0), trailY = new Array(5).fill(0);

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    });

    (function animateTrails() {
      trailX[0] += (mouseX - trailX[0]) * 0.35;
      trailY[0] += (mouseY - trailY[0]) * 0.35;
      trails[0].style.transform = `translate(${trailX[0] - 4}px, ${trailY[0] - 4}px)`;
      for (let i = 1; i < trails.length; i++) {
        trailX[i] += (trailX[i - 1] - trailX[i]) * 0.25;
        trailY[i] += (trailY[i - 1] - trailY[i]) * 0.25;
        trails[i].style.transform = `translate(${trailX[i] - 4}px, ${trailY[i] - 4}px)`;
      }
      requestAnimationFrame(animateTrails);
    })();
  }

  // ============ THEME TOGGLE ============
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });

  // ============ LANGUAGE TOGGLE ============
  const langToggle = document.getElementById('langToggle');
  let currentLang = localStorage.getItem('portfolio-lang') || 'en';

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('portfolio-lang', lang);

    document.querySelectorAll('[data-en]').forEach(el => {
      const text = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (text) el.textContent = text;
    });

    // Re-trigger typing effect
    phraseIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typedElement.textContent = '';
  }

  if (currentLang === 'ar') setLanguage('ar');

  langToggle.addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'ar' : 'en');
  });

  // ============ TESTIMONIALS SLIDER ============
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const dotsContainer = document.getElementById('testimonialDots');
  const cards = track ? track.querySelectorAll('.testimonial-card') : [];
  let currentSlide = 0;
  let autoSlideInterval;

  if (track && cards.length > 0) {
    // Create dots
    cards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('testimonial-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      currentSlide = index;
      const isRtl = document.documentElement.dir === 'rtl';
      const offset = isRtl ? index * 100 : -index * 100;
      track.style.transform = `translateX(${offset}%)`;
      dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    function nextSlide() { goToSlide((currentSlide + 1) % cards.length); }
    function prevSlide() { goToSlide((currentSlide - 1 + cards.length) % cards.length); }

    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });

    function startAutoSlide() { autoSlideInterval = setInterval(nextSlide, 5000); }
    function resetAutoSlide() { clearInterval(autoSlideInterval); startAutoSlide(); }
    startAutoSlide();
  }

  // ============ FAQ ACCORDION ============
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // ============ DISCORD STATUS (Placeholder) ============
  // Replace with your actual Discord user ID and Lanyard API
  const DISCORD_USER_ID = '1414662463130964003';
  const usernameEl = document.getElementById('discordUsername');
  const activityEl = document.getElementById('discordActivity');
  const indicatorEl = document.getElementById('discordIndicator');
  const sinceEl = document.getElementById('discordSince');

  function updateDiscordStatus(data) {
    if (!data || !data.discord_user) return;
    const user = data.discord_user;
    usernameEl.textContent = user.global_name || user.username;

    if (data.discord_status) {
      indicatorEl.className = 'discord-status-indicator ' + data.discord_status;
    }

    if (data.activities && data.activities.length > 0) {
      const activity = data.activities[0];
      activityEl.textContent = activity.name || 'Online';
    } else {
      activityEl.textContent = currentLang === 'ar' ? 'متصل الآن' : 'Online';
      activityEl.removeAttribute('data-en');
      activityEl.removeAttribute('data-ar');
    }

    sinceEl.textContent = currentLang === 'ar' ? 'نشط الآن' : 'Active now';
  }

  // Try fetching Discord status via Lanyard API
  if (DISCORD_USER_ID !== 'YOUR_DISCORD_ID') {
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) updateDiscordStatus(data.data);
      })
      .catch(() => {
        // Silently fail if API is unavailable
        indicatorEl.className = 'discord-status-indicator online';
      });
  } else {
    indicatorEl.className = 'discord-status-indicator online';
  }

  // ============ PROJECT TILT ============
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // ============ PARALLAX ============
  const heroGrid = document.querySelector('.hero-glow');
  if (heroGrid && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      heroGrid.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    });
  }

  // ============ DYNAMIC YEAR ============
  const yearEl = document.querySelector('.footer-bottom p');
  if (yearEl) yearEl.innerHTML = yearEl.innerHTML.replace('2026', new Date().getFullYear());

  // ============ CONTACT FORM ============
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('.btn');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = `<span>${currentLang === 'ar' ? 'تم الإرسال!' : 'Message Sent!'}</span>`;
      btn.style.background = '#22c55e';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.pointerEvents = '';
        this.reset();
      }, 3000);
    });
  }

  // ============================================================
  // GOOGLE IDENTITY SERVICES — OAuth 2.0 Sign-In
  // ============================================================

  const loginBox  = document.getElementById('googleLoginBox');
  const userBox   = document.getElementById('googleUserBox');
  const userName  = document.getElementById('authUserName');
  const userEmail = document.getElementById('authUserEmail');
  const userPic   = document.getElementById('authUserPic');
  const logoutBtn = document.getElementById('authLogoutBtn');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  function showLoggedIn(profile) {
    loginBox.style.display = 'none';
    userBox.style.display  = 'block';
    userName.textContent  = profile.name;
    userEmail.textContent = profile.email;
    userPic.src           = profile.picture;
    nameInput.value       = profile.name;
    emailInput.value      = profile.email;
  }

  function showLoggedOut() {
    loginBox.style.display = 'block';
    userBox.style.display  = 'none';
    nameInput.value  = '';
    emailInput.value = '';
  }

  // Restore session on page load (works even before GIS loads)
  const saved = sessionStorage.getItem('googleProfile');
  if (saved) showLoggedIn(JSON.parse(saved));

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      sessionStorage.removeItem('googleProfile');
      if (typeof google !== 'undefined') google.accounts.id.disableAutoSelect();
      showLoggedOut();
    });
  }

})();

// ── Google auth init (global, called by script onload) ────────
function initGoogleAuth() {
  const GOOGLE_CLIENT_ID = '300324984434-u19s3mq7c9qmg8h6khs17o0kp4ajb5om.apps.googleusercontent.com';

  function handleCredentialResponse(response) {
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    const profile = { name: payload.name, email: payload.email, picture: payload.picture };
    sessionStorage.setItem('googleProfile', JSON.stringify(profile));

    const loginBox  = document.getElementById('googleLoginBox');
    const userBox   = document.getElementById('googleUserBox');
    const userName  = document.getElementById('authUserName');
    const userEmail = document.getElementById('authUserEmail');
    const userPic   = document.getElementById('authUserPic');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    loginBox.style.display = 'none';
    userBox.style.display  = 'block';
    userName.textContent  = profile.name;
    userEmail.textContent = profile.email;
    userPic.src           = profile.picture;
    nameInput.value       = profile.name;
    emailInput.value      = profile.email;
  }

  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(
    document.getElementById('googleSignInBtn'),
    { theme: 'filled_black', size: 'large', text: 'signin_with', shape: 'pill', width: 280 }
  );

  // If user already logged in, show the form immediately
  const saved = sessionStorage.getItem('googleProfile');
  if (saved) {
    const p = JSON.parse(saved);
    document.getElementById('googleLoginBox').style.display = 'none';
    document.getElementById('googleUserBox').style.display  = 'block';
    document.getElementById('authUserName').textContent  = p.name;
    document.getElementById('authUserEmail').textContent = p.email;
    document.getElementById('authUserPic').src           = p.picture;
    document.getElementById('name').value  = p.name;
    document.getElementById('email').value = p.email;
  }
}

// Auto-init when GIS script finishes loading
window.addEventListener('load', function () {
  if (typeof google !== 'undefined' && google.accounts) {
    initGoogleAuth();
  } else {
    // Retry in case GIS script hasn't finished yet
    var retry = setInterval(function () {
      if (typeof google !== 'undefined' && google.accounts) {
        clearInterval(retry);
        initGoogleAuth();
      }
    }, 200);
    setTimeout(function () { clearInterval(retry); }, 8000);
  }
});
