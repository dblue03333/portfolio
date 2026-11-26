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
      document.documentElement.classList.remove('is-transitioning', 'is-intro-boot');
    };

    if (!container || prefersReduced || !hasGSAP) {
      clearPrePaintClass();
      if (container) container.classList.remove('is-active', 'is-boot-mode', 'is-greeting-phase');
      sessionStorage.removeItem('dennis_page_transition');
      return;
    }

    const screen = container.querySelector('.loading-screen');
    const topCurve = container.querySelector('.rounded-div-wrap.top');
    const bottomCurve = container.querySelector('.rounded-div-wrap.bottom');
    const wordEl = container.querySelector('[data-loading-word]');
    const aiHud = container.querySelector('[data-loading-ai-hud]');
    const aiLog = container.querySelector('[data-ai-log]');
    const aiBar = container.querySelector('[data-ai-bar]');
    const aiPercent = container.querySelector('[data-ai-percent]');
    const chipWeights = container.querySelector('[data-ai-chip="weights"]');
    const chipSources = container.querySelector('[data-ai-chip="sources"]');
    const chipGuardrails = container.querySelector('[data-ai-chip="guardrails"]');

    const isHome = document.body.dataset.page === 'home';
    const navEntries = performance.getEntriesByType?.('navigation');
    const navType = navEntries && navEntries[0] ? navEntries[0].type : 'navigate';
    const comingFromNav = sessionStorage.getItem('dennis_page_transition') === '1';

    function resetCurtain() {
      clearPrePaintClass();
      container.classList.remove('is-active', 'is-boot-mode', 'is-greeting-phase');
      window.gsap.set(screen, { yPercent: 120 });
      window.gsap.set([topCurve, bottomCurve], { height: 0 });
      if (aiHud) window.gsap.set(aiHud, { clearProps: 'opacity,transform' });
    }

    // Handle bfcache back/forward restoration cleanly
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) resetCurtain();
    });

    // 1. Internal route transition (e.g. Work -> Home, Home -> About)
    if (comingFromNav) {
      sessionStorage.removeItem('dennis_page_transition');
      const storedLabel = sessionStorage.getItem('dennis_page_label');
      sessionStorage.removeItem('dennis_page_label');
      const activeLang = window.__i18n?.getLang() || document.documentElement.dataset.lang || 'en';
      const defaultBrand = activeLang === 'vi' ? 'Nguyễn Đức Tuấn Đạt' : 'Kelvin Nguyen';
      const pageTitle = storedLabel || document.body.dataset.pageTitle || defaultBrand;
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
    } else if (isHome && navType !== 'back_forward' && aiHud) {
      // 2. Home fresh load OR F5 / Cmd+R reload -> Full AI Model Weights Boot + Multilingual Greeting
      container.classList.add('is-active', 'is-boot-mode');
      window.gsap.set(screen, { yPercent: 0 });
      window.gsap.set(topCurve, { height: 0 });
      window.gsap.set(bottomCurve, { height: '12vh' });
      clearPrePaintClass();

      const heroImg = document.querySelector('.home-hero-media img');
      if (heroImg) window.gsap.set(heroImg, { scale: 1.055 });

      const state = { pct: 0 };
      const activeLang = window.__i18n?.getLang() || document.documentElement.dataset.lang || 'en';
      const greetings =
        activeLang === 'vi'
          ? ['Xin chào', 'Hello', 'こんにちは', 'Nguyễn Đức Tuấn Đạt']
          : ['Hello', 'Xin chào', 'こんにちは', 'Kelvin Nguyen'];
      if (wordEl) wordEl.textContent = greetings[0];

      const updateHud = () => {
        const p = Math.round(state.pct);
        if (aiPercent) aiPercent.textContent = `${String(p).padStart(2, '0')}%`;
        if (aiBar) aiBar.style.width = `${p}%`;

        if (p < 35) {
          if (aiLog) aiLog.textContent = activeLang === 'vi' ? 'loading weights · tuandat-v26' : 'loading weights · kelvin-v26';
        } else if (p < 70) {
          if (aiLog) aiLog.textContent = 'grounding sources · healthlab ✓';
          chipWeights?.classList.add('is-done');
        } else if (p < 96) {
          if (aiLog) aiLog.textContent = 'guardrails verified · 368/368 ✓';
          chipWeights?.classList.add('is-done');
          chipSources?.classList.add('is-done');
        } else {
          if (aiLog) aiLog.textContent = 'inference online · ready ✓';
          chipWeights?.classList.add('is-done');
          chipSources?.classList.add('is-done');
          chipGuardrails?.classList.add('is-done');
        }
      };

      const tl = window.gsap.timeline({
        onComplete: resetCurtain,
      });

      // Phase 1: Model weights counter 00% -> 100% (non-linear feel)
      tl.to(state, {
        pct: 100,
        duration: 1.08,
        ease: 'power2.inOut',
        onUpdate: updateHud,
      })
        // Phase 2: Fade out AI HUD completely BEFORE revealing multilingual Dennis greeting
        .to(aiHud, {
          opacity: 0,
          y: -12,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            container.classList.add('is-greeting-phase');
          },
        });

      greetings.slice(1).forEach((greeting, idx) => {
        tl.to(
          {},
          {
            duration: idx === greetings.length - 2 ? 0.2 : 0.14,
            onComplete: () => {
              if (wordEl) wordEl.textContent = greeting;
            },
          }
        );
      });

      // Phase 3: Iconic Dennis curved upward reveal + subtle hero portrait settle
      tl.to(screen, {
        yPercent: -118,
        duration: 0.82,
        delay: 0.16,
        ease: 'power4.inOut',
      })
        .to(
          bottomCurve,
          {
            height: 0,
            duration: 0.6,
            ease: 'power4.inOut',
          },
          '<0.18'
        );

      if (heroImg) {
        tl.to(
          heroImg,
          {
            scale: 1,
            duration: 1.05,
            ease: 'power3.out',
            clearProps: 'scale',
          },
          '<0.06'
        );
      }
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

      const localizedText = link.hasAttribute('data-i18n') ? link.textContent.trim() : '';
      const label = localizedText || link.dataset.transitionLabel || link.textContent.trim().replace(/\s+/g, ' ').slice(0, 32) || 'Loading';
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
    window.__closeNavDrawer = closeDrawer;
  }

  /* ---------- 4. Scroll-Direction Reversing Vinyl Marquee + Hero Delights ---------- */

  function initHeroMarquee() {
    const marqueeBox = document.querySelector('.big-name');
    const track = document.querySelector('.name-h1');
    const unit = track?.querySelector('.name-wrap');
    if (!marqueeBox || !track || !unit || prefersReduced || !hasGSAP) return;

    // Clone once for seamless loop (preserve data-i18n-html so EN/VI/JP marquee swaps both halves)
    const clone = unit.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    const headingInClone = clone.querySelector('h1');
    if (headingInClone) {
      const span = document.createElement('span');
      span.className = 'marquee-text';
      if (headingInClone.dataset.i18nHtml) {
        span.dataset.i18nHtml = headingInClone.dataset.i18nHtml;
      }
      span.innerHTML = headingInClone.innerHTML;
      headingInClone.replaceWith(span);
    }
    track.appendChild(clone);

    let direction = 1;
    let hoverScale = 1;

    const tween = window.gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: 'none',
    });

    const syncVelocity = (dur = 0.65, ease = 'power3.out') => {
      window.gsap.to(tween, {
        timeScale: direction * hoverScale,
        duration: dur,
        ease,
        overwrite: true,
      });
    };

    // Vinyl-record slow-down when hovering the big name
    if (finePointer) {
      marqueeBox.addEventListener('pointerenter', () => {
        hoverScale = 0.22;
        syncVelocity(0.6, 'power3.out');
      });

      marqueeBox.addEventListener('pointerleave', () => {
        hoverScale = 1;
        syncVelocity(0.85, 'power2.out');
      });
    }

    // Playful direction flip on click
    marqueeBox.addEventListener('click', () => {
      direction *= -1;
      window.gsap.fromTo(
        tween,
        { timeScale: direction * 1.45 },
        { timeScale: direction * hoverScale, duration: 0.9, ease: 'power3.out', overwrite: true }
      );
    });

    if (hasScrollTrigger) {
      window.ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: 'max',
        onUpdate(self) {
          if (self.direction !== direction) {
            direction = self.direction;
            syncVelocity(0.55, 'power2.out');
          }
        },
      });
    }
  }

  function initHeroPlayfulDelights() {
    // 1. Role Cycler (AI Engineer -> LLMs, Agents & Backend / Data & RAG Pipelines / Applied AI Systems)
    const cycler = document.querySelector('[data-role-cycler]');
    const heroArrow = document.querySelector('[data-hero-arrow]');
    if (cycler) {
      const slots = [...cycler.querySelectorAll('.role-cycler-slot')];
      let current = 0;
      let cycleTimer = null;

      function advanceRole() {
        if (slots.length < 2) return;
        const prev = slots[current];
        current = (current + 1) % slots.length;
        const next = slots[current];

        slots.forEach((s) => s.classList.remove('is-leaving'));
        prev.classList.remove('is-active');
        prev.classList.add('is-leaving');
        next.classList.add('is-active');

        if (heroArrow && hasGSAP && !prefersReduced) {
          window.gsap.fromTo(
            heroArrow,
            { x: 0, y: 0 },
            { x: 4, y: 4, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }
          );
        }
      }

      function startTimer() {
        if (prefersReduced || cycleTimer) return;
        cycleTimer = window.setInterval(advanceRole, 3000);
      }

      function stopTimer() {
        if (cycleTimer) {
          clearInterval(cycleTimer);
          cycleTimer = null;
        }
      }

      cycler.addEventListener('click', () => {
        stopTimer();
        advanceRole();
        startTimer();
      });

      if (finePointer) {
        cycler.addEventListener('mouseenter', stopTimer);
        cycler.addEventListener('mouseleave', startTimer);
      }

      startTimer();
    }

    // 2. Interactive Globe (click -> turbo spin impulse + Saigon coordinates flip)
    const hanger = document.querySelector('[data-globe-interactive]');
    if (hanger) {
      const globe = hanger.querySelector('.globe');
      const faceDefault = hanger.querySelector('[data-hanger-default]');
      const faceCoords = hanger.querySelector('[data-hanger-coords]');
      let showingCoords = false;
      let revertTimer = null;
      let boostTimer = null;
      let spinAngle = -16;

      function setFace(showCoords) {
        showingCoords = showCoords;
        faceDefault?.classList.toggle('is-active', !showCoords);
        faceCoords?.classList.toggle('is-active', showCoords);
        faceDefault?.setAttribute('aria-hidden', String(showCoords));
        faceCoords?.setAttribute('aria-hidden', String(!showCoords));
      }

      hanger.addEventListener('click', () => {
        setFace(!showingCoords);

        clearTimeout(revertTimer);
        if (showingCoords) {
          revertTimer = window.setTimeout(() => setFace(false), 3800);
        }

        if (!prefersReduced) {
          hanger.classList.remove('is-boosting');
          void hanger.offsetWidth; // restart pulse ring cleanly
          hanger.classList.add('is-boosting');
          clearTimeout(boostTimer);
          boostTimer = window.setTimeout(() => hanger.classList.remove('is-boosting'), 1150);

          if (globe && hasGSAP) {
            spinAngle += 360;
            window.gsap.to(globe, {
              rotation: spinAngle,
              duration: 1.15,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          }
        }
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
      if (el.classList.contains('home-intro-lead')) return;
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

  /* ---------- 5B. Top Scroll Progress Thread ---------- */

  function initScrollProgress() {
    let bar = document.querySelector('.scroll-progress-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'scroll-progress-bar';
      bar.setAttribute('aria-hidden', 'true');
      document.body.appendChild(bar);
    }

    const update = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      bar.style.transform = `scaleX(${progress.toFixed(4)})`;
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ---------- 5C. Scroll-Scrubbed Reading Highlight (Home Intro Lead) ---------- */

  let wordScrubTween = null;

  function initScrollScrubLead() {
    const lead = document.querySelector('.home-intro-lead');
    if (!lead) return;

    const build = () => {
      if (wordScrubTween) {
        wordScrubTween.scrollTrigger?.kill();
        wordScrubTween.kill();
        wordScrubTween = null;
      }

      if (prefersReduced || !hasScrollTrigger) {
        lead.style.opacity = '1';
        return;
      }
      if (document.documentElement.classList.contains('is-xray-mode')) return;
      if (lead.classList.contains('is-hallucinating')) return;

      const rawText = lead.textContent.replace(/\s+/g, ' ').trim();
      if (!rawText) return;

      const parts = rawText.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      parts.forEach((part) => {
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else if (part) {
          const span = document.createElement('span');
          span.className = 'scrub-word';
          span.textContent = part;
          frag.appendChild(span);
        }
      });

      lead.textContent = '';
      lead.appendChild(frag);

      const words = lead.querySelectorAll('.scrub-word');
      if (!words.length) return;

      wordScrubTween = window.gsap.fromTo(
        words,
        { opacity: 0.22 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: lead,
            start: 'top 88%',
            end: 'bottom 54%',
            scrub: 0.4,
          },
        }
      );
    };

    window.__refreshWordScrub = build;
    window.addEventListener('portfolio:langchange', () => {
      requestAnimationFrame(build);
    });
    build();
  }

  /* ---------- 5D. Hero Subtle Atmospheric Mist Field Canvas ---------- */

  function initHeroMistCanvas() {
    const canvas = document.querySelector('.hero-mist-canvas');
    const hero = document.querySelector('.home-header');
    if (!canvas || !hero || prefersReduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let rafId = null;
    let isVisible = true;
    const pointer = { x: -9999, y: -9999, active: false };

    function resize() {
      const rect = hero.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = width < 640 ? 18 : 34;
      if (particles.length !== targetCount) {
        particles = Array.from({ length: targetCount }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.6 + 0.9,
        }));
      }
    }

    function draw() {
      if (!isVisible || document.hidden) {
        rafId = null;
        return;
      }
      if (window.__vtPaused) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.dataset.theme === 'dark';
      const nodeRgb = isDark ? '127, 226, 184' : '211, 230, 235';
      const lineRgb = isDark ? '127, 226, 184' : '235, 244, 250';
      const maxDist = width < 640 ? 115 : 150;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180 && dist > 1) {
            p.x += (dx / dist) * 0.14;
            p.y += (dy / dist) * 0.14;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeRgb}, 0.45)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${lineRgb}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        if (pointer.active) {
          const dp = Math.hypot(p.x - pointer.x, p.y - pointer.y);
          if (dp < 165) {
            const alpha = (1 - dp / 165) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = `rgba(127, 226, 184, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    function start() {
      if (!rafId && isVisible && !document.hidden) {
        rafId = requestAnimationFrame(draw);
      }
    }

    if (finePointer) {
      hero.addEventListener('pointermove', (e) => {
        const rect = hero.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
        pointer.active = true;
      }, { passive: true });
      hero.addEventListener('pointerleave', () => {
        pointer.active = false;
      });
    }

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0]?.isIntersecting ?? true;
          if (isVisible) start();
        },
        { threshold: 0.02 }
      );
      io.observe(hero);
    }

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) start();
    });
    window.addEventListener('resize', resize, { passive: true });

    resize();
    start();
  }

  /* ---------- 5E. Ambient Cursor Spotlight on Dark Surfaces ---------- */

  function initAmbientSpotlight() {
    if (!finePointer || prefersReduced) return;
    document.querySelectorAll('[data-spotlight]').forEach((surface) => {
      surface.addEventListener('pointermove', (e) => {
        const rect = surface.getBoundingClientRect();
        surface.style.setProperty('--spot-x', `${(e.clientX - rect.left).toFixed(1)}px`);
        surface.style.setProperty('--spot-y', `${(e.clientY - rect.top).toFixed(1)}px`);
        surface.style.setProperty('--spot-opacity', '1');
      }, { passive: true });
      surface.addEventListener('pointerleave', () => {
        surface.style.setProperty('--spot-opacity', '0');
      });
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
    initHeroPlayfulDelights();
    initScrollChoreography();
    initScrollProgress();
    initScrollScrubLead();
    initHeroMistCanvas();
    initAmbientSpotlight();
    initLocalClock();
  });
})();
