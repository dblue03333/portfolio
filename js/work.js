/* ==========================================================================
   WORK ENGINE — Dennis Snellenberg Signature Interactions
   - Inertial lerp floating hover preview reel (.mouse-pos-list-image)
   - Trailing circular accent "View" cursor (.mouse-pos-list-btn)
   - /work filter pills (All, AI Agents, Data & RAG, Web) with smooth transition
   - /work List View ⇄ Grid View animated switcher + history restoration
   ========================================================================== */

(() => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initFloatingPreview() {
    const modal = document.querySelector('.mouse-pos-list-image');
    const reel = document.querySelector('.mouse-pos-list-image-reel');
    const badge = document.querySelector('.mouse-pos-list-btn');
    const triggers = document.querySelectorAll('[data-preview-index]');

    if (!modal || !reel || !triggers.length || !finePointer) return;

    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.5;
    let modalX = mouseX;
    let modalY = mouseY;
    let badgeX = mouseX;
    let badgeY = mouseY;
    let tiltX = 0;
    let tiltY = 0;
    let tiltZ = 0;
    let isActive = false;
    let rafId = null;

    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

    function tick() {
      const easeModal = prefersReduced ? 1 : 0.11;
      const easeBadge = prefersReduced ? 1 : 0.19;

      const prevModalX = modalX;
      const prevModalY = modalY;

      modalX += (mouseX - modalX) * easeModal;
      modalY += (mouseY - modalY) * easeModal;
      badgeX += (mouseX - badgeX) * easeBadge;
      badgeY += (mouseY - badgeY) * easeBadge;

      // Velocity-based physical tilt (smooth spring-like lean + natural settle back to 0deg)
      if (!prefersReduced) {
        const vx = modalX - prevModalX;
        const vy = modalY - prevModalY;
        const targetZ = clamp(vx * 0.48, -9.5, 9.5);
        const targetY = clamp(vx * 0.65, -13, 13);
        const targetX = clamp(-vy * 0.55, -11, 11);

        tiltZ += (targetZ - tiltZ) * 0.2;
        tiltY += (targetY - tiltY) * 0.2;
        tiltX += (targetX - tiltX) * 0.2;

        modal.style.setProperty('--tilt-z', `${tiltZ.toFixed(2)}deg`);
        modal.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
        modal.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
      }

      modal.style.left = `${modalX.toFixed(1)}px`;
      modal.style.top = `${modalY.toFixed(1)}px`;

      if (badge) {
        badge.style.left = `${badgeX.toFixed(1)}px`;
        badge.style.top = `${badgeY.toFixed(1)}px`;
      }

      if (isActive) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    function showPreview(index, label) {
      reel.style.transform = `translate3d(0, -${index * 100}%, 0)`;
      if (badge && label) badge.textContent = label;
      if (!isActive) {
        isActive = true;
        modalX = mouseX;
        modalY = mouseY;
        badgeX = mouseX;
        badgeY = mouseY;
        tiltX = 0;
        tiltY = 0;
        tiltZ = 0;
        modal.style.setProperty('--tilt-x', '0deg');
        modal.style.setProperty('--tilt-y', '0deg');
        modal.style.setProperty('--tilt-z', '0deg');
        modal.classList.add('is-active');
        badge?.classList.add('is-active');
        if (!rafId) rafId = requestAnimationFrame(tick);
      }
    }

    function hidePreview() {
      if (!isActive) return;
      isActive = false;
      modal.style.setProperty('--tilt-x', '0deg');
      modal.style.setProperty('--tilt-y', '0deg');
      modal.style.setProperty('--tilt-z', '0deg');
      modal.classList.remove('is-active');
      badge?.classList.remove('is-active');
    }

    window.addEventListener(
      'pointermove',
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      },
      { passive: true }
    );

    triggers.forEach((row) => {
      const idx = Number(row.dataset.previewIndex || 0);
      const label = row.dataset.previewLabel || 'View';

      row.addEventListener('pointerenter', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        showPreview(idx, label);
      });

      row.addEventListener('pointerleave', () => {
        // Delay slightly so moving smoothly between sibling rows never flickers
        requestAnimationFrame(() => {
          const hovered = document.querySelector('[data-preview-index]:hover');
          if (!hovered) hidePreview();
        });
      });
    });

    // Hide cleanly when scrolling fast or switching views
    window.addEventListener('scroll', () => {
      if (isActive && !document.querySelector('[data-preview-index]:hover')) {
        hidePreview();
      }
    }, { passive: true });

    window.__hideWorkPreview = hidePreview;
  }

  function initWorkPageControls() {
    const stageInner = document.querySelector('[data-work-stage]');
    if (!stageInner) return;

    const filterBtns = [...document.querySelectorAll('[data-filter]')];
    const viewBtns = [...document.querySelectorAll('[data-view-mode]')];
    const sortBtns = [...document.querySelectorAll('[data-sort-toggle]')];
    const sortLabel = document.querySelector('[data-sort-label]');
    const sortColLabel = document.querySelector('[data-sort-col-label]');
    const listView = document.querySelector('[data-list-view]');
    const gridView = document.querySelector('[data-grid-view]');
    const listContainer = document.querySelector('[data-list-container]');
    const gridContainer = document.querySelector('[data-grid-container]');
    const listItems = [...document.querySelectorAll('.work-list-item')];
    const gridItems = [...document.querySelectorAll('.work-tile-card')];
    const statusLive = document.querySelector('[data-work-status]');

    let currentFilter = history.state?.workFilter || 'all';
    let currentView = history.state?.workView || 'list';
    let currentSort = history.state?.workSort || 'newest';

    function sortElements(container, items, order) {
      if (!container) return;
      const sorted = [...items].sort((a, b) => {
        const da = parseFloat(a.dataset.date || '0');
        const db = parseFloat(b.dataset.date || '0');
        return order === 'newest' ? db - da : da - db;
      });
      sorted.forEach((el) => container.appendChild(el));
    }

    function syncUI(filter, view, sort) {
      let visibleCount = 0;

      sortElements(listContainer, listItems, sort);
      sortElements(gridContainer, gridItems, sort);

      listItems.forEach((item) => {
        const topics = (item.dataset.topics || '').split(' ');
        const match = filter === 'all' || topics.includes(filter);
        item.hidden = !match;
        if (match) visibleCount += 1;
      });

      gridItems.forEach((item) => {
        const topics = (item.dataset.topics || '').split(' ');
        const match = filter === 'all' || topics.includes(filter);
        item.hidden = !match;
      });

      if (listView) listView.hidden = view !== 'list';
      if (gridView) gridView.hidden = view !== 'grid';

      if (sortLabel) {
        sortLabel.textContent = sort === 'newest' ? 'Timeline: Newest ↓' : 'Timeline: Oldest ↑';
      }
      if (sortColLabel) {
        sortColLabel.textContent = sort === 'newest' ? 'Timeline ↓' : 'Timeline ↑';
      }

      filterBtns.forEach((btn) => {
        const active = btn.dataset.filter === filter;
        btn.setAttribute('aria-pressed', String(active));
        btn.classList.toggle('active', active);
        if (!btn.matches(':hover')) {
          btn.classList.remove('is-hovered');
          const fill = btn.querySelector('.btn-fill');
          if (fill && typeof window.gsap !== 'undefined') {
            window.gsap.killTweensOf(fill);
            window.gsap.set(fill, { y: 0, yPercent: 76 });
          }
        }
      });

      viewBtns.forEach((btn) => {
        const active = btn.dataset.viewMode === view;
        btn.setAttribute('aria-pressed', String(active));
        btn.classList.toggle('active', active);
        if (!btn.matches(':hover')) {
          btn.classList.remove('is-hovered');
          const fill = btn.querySelector('.btn-fill');
          if (fill && typeof window.gsap !== 'undefined') {
            window.gsap.killTweensOf(fill);
            window.gsap.set(fill, { y: 0, yPercent: 76 });
          }
        }
      });

      if (statusLive) {
        statusLive.textContent = `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'} shown in ${view} view, sorted ${sort} first.`;
      }

      if (typeof window.ScrollTrigger !== 'undefined') {
        window.ScrollTrigger.refresh();
      }
      window.__dennisLenis?.resize();
    }

    function transitionStage(nextFilter, nextView, nextSort) {
      window.__hideWorkPreview?.();
      if (prefersReduced) {
        currentFilter = nextFilter;
        currentView = nextView;
        currentSort = nextSort;
        syncUI(currentFilter, currentView, currentSort);
        return;
      }

      stageInner.classList.add('is-fading');
      window.setTimeout(() => {
        currentFilter = nextFilter;
        currentView = nextView;
        currentSort = nextSort;
        syncUI(currentFilter, currentView, currentSort);
        history.replaceState(
          { ...history.state, workFilter: currentFilter, workView: currentView, workSort: currentSort },
          ''
        );
        requestAnimationFrame(() => {
          stageInner.classList.remove('is-fading');
        });
      }, 240);
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextFilter = btn.dataset.filter;
        if (nextFilter === currentFilter) return;
        transitionStage(nextFilter, currentView, currentSort);
      });
    });

    viewBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextView = btn.dataset.viewMode;
        if (nextView === currentView) return;
        transitionStage(currentFilter, nextView, currentSort);
      });
    });

    sortBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextSort = currentSort === 'newest' ? 'oldest' : 'newest';
        transitionStage(currentFilter, currentView, nextSort);
      });
    });

    syncUI(currentFilter, currentView, currentSort);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initFloatingPreview();
    initWorkPageControls();
  });
})();
