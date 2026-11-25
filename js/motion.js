/* ==========================================================================
   MOTION ENGINE — Dennis Snellenberg × Sương xanh
   - Lenis smooth scroll + GSAP ScrollTrigger sync
   - Curved preloader & multi-page curtain transitions
   - Magnetic buttons & rising circular hover fills
   - Scroll-direction reversing Hero marquee
   - Floating hamburger & curved navigation drawer
   - Curved footer arc scrub, parallax & realtime HCMC GMT+7 clock
   ========================================================================== */

(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== 'undefined';

  if (hasScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  let lenis = null;

  function initSmoothScroll() {
    if (prefersReduced || typeof window.Lenis === 'undefined') return;
    lenis = new window.Lenis({
      duration: 1.12,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    if (hasScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    window.__dennisLenis = lenis;
  }

  /* ---------- 1. Curved Preloader & Multi-page Transition Curtain ---------- */

  function initCurtainTransitions() {
    const container = document.querySelector('.loading-container');
    const clearPrePaintClass = () => {
      document.documentElement.classList.remove('is-transitioning');
    };

    if (!container || prefersReduced || !hasGSAP) {
      clearPrePaintClass();
      if (container) container.classList.remove('is-active');
      sessionStorage.removeItem('dennis_page_transition');
      return;
    }

    const screen = container.querySelector('.loading-screen');
    const topCurve = container.querySelector('.rounded-div-wrap.top');
    const bottomCurve = container.querySelector('.rounded-div-wrap.bottom');
    const wordEl = container.querySelector('[data-loading-word]');
    const isHome = document.body.dataset.page === 'home';
    const comingFromNav = sessionStorage.getItem('dennis_page_transition') === '1';
    const introPlayed = sessionStorage.getItem('dennis_intro_done') === '1';

    function resetCurtain() {
      clearPrePaintClass();
      container.classList.remove('is-active');
      window.gsap.set(screen, { yPercent: 120 });
      window.gsap.set([topCurve, bottomCurve], { height: 0 });
    }

    // Handle bfcache back/forward restoration cleanly
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) resetCurtain();
    });

    // Entry animation (seamless from html.is-transitioning frame 0)
    if (comingFromNav) {
      sessionStorage.removeItem('dennis_page_transition');
      const storedLabel = sessionStorage.getItem('dennis_page_label');
      sessionStorage.removeItem('dennis_page_label');
      const pageTitle = storedLabel || document.body.dataset.pageTitle || 'Kelvin Nguyen';
      if (wordEl) wordEl.textContent = pageTitle;

      container.classList.add('is-active');
      window.gsap.set(screen, { yPercent: 0 });
      window.gsap.set(topCurve, { height: 0 });
      window.gsap.set(bottomCurve, { height: '12vh' });
      clearPrePaintClass();

      const tl = window.gsap.timeline({
        onComplete: resetCurtain,
      });
      tl.to(screen, {
        yPercent: -118,
        duration: 0.78,
        delay: 0.12,
        ease: 'power3.inOut',
      }).to(
        bottomCurve,
        {
          height: 0,
          duration: 0.56,
          ease: 'power3.inOut',
        },
        '<0.18'
      );
    } else if (isHome && !introPlayed) {
      sessionStorage.setItem('dennis_intro_done', '1');
      const greetings = ['Hello', 'Xin chào', 'こんにちは', 'Willkommen', 'Kelvin Nguyen'];
      container.classList.add('is-active');
      window.gsap.set(screen, { yPercent: 0 });
      window.gsap.set(topCurve, { height: 0 });
      window.gsap.set(bottomCurve, { height: '12vh' });
      clearPrePaintClass();
      if (wordEl) wordEl.textContent = greetings[0];

      const tl = window.gsap.timeline({
        onComplete: resetCurtain,
      });

      greetings.slice(1).forEach((greeting, idx) => {
        tl.to(
          {},
          {
            duration: idx === greetings.length - 2 ? 0.22 : 0.16,
            onComplete: () => {
              if (wordEl) wordEl.textContent = greeting;
            },
          }
        );
      });

      tl.to(screen, {
        yPercent: -118,
        duration: 0.84,
        delay: 0.18,
        ease: 'power4.inOut',
      }).to(
        bottomCurve,
        {
          height: 0,
          duration: 0.62,
          ease: 'power4.inOut',
        },
        '<0.18'
      );
    } else {
      resetCurtain();
    }

    // Intercept internal links for smooth curved exit curtain
    document.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a[href]');
      if (!link) return;
      if (link.target === '_blank' || link.hasAttribute('download')) return;

      const rawHref = link.getAttribute('href');
      if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return;
      if (rawHref.toLowerCase().endsWith('.pdf')) return;

      const dest = new URL(link.href, window.location.href);
      if (dest.origin !== window.location.origin) return;
      if (dest.pathname === window.location.pathname && dest.search === window.location.search && dest.hash) return;

      event.preventDefault();
      closeDrawer();
      window.__hideWorkPreview?.();

      const label = link.dataset.transitionLabel || link.textContent.trim().replace(/\s+/g, ' ').slice(0, 32) || 'Loading';
      if (wordEl) wordEl.textContent = label;
      container.classList.add('is-active');
      window.gsap.set(screen, { yPercent: 120 });
      window.gsap.set(topCurve, { height: '14vh' });
      window.gsap.set(bottomCurve, { height: 0 });

      sessionStorage.setItem('dennis_page_transition', '1');
      sessionStorage.setItem('dennis_page_label', label);

      const tl = window.gsap.timeline({
        onComplete: () => {
          window.location.href = dest.href;
        },
      });

      tl.to(screen, {
        yPercent: 0,
        duration: 0.56,
        ease: 'power3.inOut',
      }).to(
        topCurve,
        {
          height: 0,
          duration: 0.36,
          ease: 'power3.inOut',
        },
        '<0.22'
      );
    });
  }

  /* ---------- 2. Magnetic Buttons & Rising Circular Hover Fills ---------- */

  function initMagneticButtons() {
    if (!finePointer || prefersReduced || !hasGSAP) return;

    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach((btn) => {
      const strength = parseFloat(btn.dataset.strength || '32');
      const strengthText = parseFloat(btn.dataset.strengthText || '16');
      const textEl = btn.querySelector('.btn-text');
      const fillEl = btn.querySelector('.btn-fill');

      // Reset CSS translate3d into clean GSAP y:0 + yPercent:76 so GSAP never double-offsets on hover
      if (fillEl) {
        window.gsap.set(fillEl, { clearProps: 'transform' });
        window.gsap.set(fillEl, { y: 0, yPercent: 76 });
      }

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        window.gsap.to(btn, {
          x: relX * strength,
          y: relY * strength,
          duration: 0.8,
          ease: 'power4.out',
        });

        if (textEl) {
          window.gsap.to(textEl, {
            x: relX * strengthText,
            y: relY * strengthText,
            duration: 0.8,
            ease: 'power4.out',
          });
        }
      });

      btn.addEventListener('mouseenter', () => {
        btn.classList.add('is-hovered');
        if (!fillEl) return;
        window.gsap.killTweensOf(fillEl);
        window.gsap.fromTo(
          fillEl,
          { y: 0, yPercent: 76 },
          { y: 0, yPercent: 0, duration: 0.44, ease: 'power3.out', overwrite: 'auto' }
        );
      });

      btn.addEventListener('mouseleave', () => {
        btn.classList.remove('is-hovered');
        window.gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 1.05,
          ease: 'elastic.out(1, 0.35)',
        });

        if (textEl) {
          window.gsap.to(textEl, {
            x: 0,
            y: 0,
            duration: 1.05,
            ease: 'elastic.out(1, 0.35)',
          });
        }

        if (fillEl) {
          window.gsap.killTweensOf(fillEl);
          window.gsap.to(fillEl, {
            y: 0,
            yPercent: -76,
            duration: 0.38,
            ease: 'power2.inOut',
            overwrite: 'auto',
            onComplete: () => {
              if (!btn.matches(':hover')) {
                window.gsap.set(fillEl, { y: 0, yPercent: 76 });
              }
            },
          });
        }
      });
    });
  }

  /* ---------- 3. Floating Hamburger & Curved Full-Height Drawer ---------- */

  let drawerOpen = false;
  const burgerWrap = document.querySelector('.btn-hamburger-wrap');
  const burgerToggle = document.querySelector('[data-nav-toggle]');
  const mobileTrigger = document.querySelector('[data-mobile-nav-open]');
  const drawer = document.querySelector('.fixed-nav');
  const drawerBack = document.querySelector('.fixed-nav-back');

  function openDrawer() {
    if (!drawer || drawerOpen) return;
    drawerOpen = true;
    document.body.classList.add('nav-open');
    drawer.classList.add('is-open');
    drawerBack?.classList.add('is-open');
    burgerWrap?.classList.add('is-open');
    burgerToggle?.setAttribute('aria-expanded', 'true');
    lenis?.stop();
  }

  function closeDrawer() {
    if (!drawer || !drawerOpen) return;
    drawerOpen = false;
    document.body.classList.remove('nav-open');
    drawer.classList.remove('is-open');
    drawerBack?.classList.remove('is-open');
    burgerWrap?.classList.remove('is-open');
    burgerToggle?.setAttribute('aria-expanded', 'false');
    lenis?.start();
  }

  function initNavigationDrawer() {
    if (!drawer) return;

    burgerToggle?.addEventListener('click', () => {
      if (drawerOpen) closeDrawer();
      else openDrawer();
    });

    mobileTrigger?.addEventListener('click', openDrawer);
    drawerBack?.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawerOpen) closeDrawer();
    });

    // Show floating hamburger once scrolled past threshold
    const updateBurgerVisibility = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const shouldShow = y > 130 || drawerOpen;
      burgerWrap?.classList.toggle('is-visible', shouldShow);
    };

    window.addEventListener('scroll', updateBurgerVisibility, { passive: true });
    updateBurgerVisibility();
  }

  /* ---------- 4. Scroll-Direction Reversing Hero Marquee ---------- */

  function initHeroMarquee() {
    const track = document.querySelector('.name-h1');
    const unit = track?.querySelector('.name-wrap');
    if (!track || !unit || prefersReduced || !hasGSAP) return;

    // Clone once for seamless loop
    const clone = unit.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    const headingInClone = clone.querySelector('h1');
    if (headingInClone) {
      const span = document.createElement('span');
      span.className = 'marquee-text';
      span.innerHTML = headingInClone.innerHTML;
      headingInClone.replaceWith(span);
    }
    track.appendChild(clone);

    let direction = 1;
    const tween = window.gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: 'none',
    });

    if (hasScrollTrigger) {
      window.ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: 'max',
        onUpdate(self) {
          if (self.direction !== direction) {
            direction = self.direction;
            window.gsap.to(tween, {
              timeScale: direction,
              duration: 0.55,
              ease: 'power2.out',
              overwrite: true,
            });
          }
        },
      });
    }
  }

  /* ---------- 5. Scroll Parallax, Curved Footer Arc & Reveals ---------- */

  function initScrollChoreography() {
    if (prefersReduced || !hasScrollTrigger) return;

    // Hero portrait parallax
    const heroImg = document.querySelector('.home-hero-media img');
    if (heroImg) {
      window.gsap.to(heroImg, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.home-header',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // About portrait parallax
    const aboutImg = document.querySelector('.about-portrait-frame img');
    if (aboutImg) {
      window.gsap.to(aboutImg, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-portrait-frame',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Horizontal dual-row showcase opposing scrub
    const hRows = document.querySelectorAll('.horizontal-row');
    hRows.forEach((row, idx) => {
      const fromX = idx % 2 === 0 ? -4 : -14;
      const toX = idx % 2 === 0 ? -16 : -2;
      window.gsap.fromTo(
        row,
        { xPercent: fromX },
        {
          xPercent: toX,
          ease: 'none',
          scrollTrigger: {
            trigger: '.horizontal-items',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );
    });

    // Curved footer arc flattening on scroll into footer
    const footerArc = document.querySelector('.footer-rounded-div .rounded-div-wrap');
    const footerWrap = document.querySelector('.footer-wrap');
    if (footerArc && footerWrap) {
      window.gsap.fromTo(
        footerArc,
        { height: '10vh' },
        {
          height: '0vh',
          ease: 'none',
          scrollTrigger: {
            trigger: footerWrap,
            start: 'top bottom',
            end: 'top 35%',
            scrub: true,
          },
        }
      );
    }

    // Footer circular CTA gentle horizontal glide
    const footerCta = document.querySelector('.footer-cta-wrap');
    if (footerCta && footerWrap) {
      window.gsap.fromTo(
        footerCta,
        { x: -36 },
        {
          x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: footerWrap,
            start: 'top bottom',
            end: 'top 30%',
            scrub: true,
          },
        }
      );
    }

    // About spinning globe badge scroll rotation
    const aboutGlobe = document.querySelector('.about-globe-badge .globe');
    if (aboutGlobe) {
      window.gsap.to(aboutGlobe, {
        rotation: 24,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-globe-divider',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Subtle editorial reveal for .once-in elements (trigger immediately upon entering bottom edge)
    document.querySelectorAll('.once-in').forEach((el) => {
      window.gsap.fromTo(
        el,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 97%',
            once: true,
          },
        }
      );
    });
  }

  /* ---------- 6. Realtime Ho Chi Minh City Local Time (GMT+7) ---------- */

  function initLocalClock() {
    const targets = document.querySelectorAll('[data-local-time]');
    if (!targets.length) return;

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const update = () => {
      const formatted = `${formatter.format(new Date())} GMT+7`;
      targets.forEach((el) => {
        el.textContent = formatted;
      });
    };

    update();
    setInterval(update, 15000);
  }

  /* ---------- Boot ---------- */

  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initCurtainTransitions();
    initMagneticButtons();
    initNavigationDrawer();
    initHeroMarquee();
    initScrollChoreography();
    initLocalClock();
  });
})();
