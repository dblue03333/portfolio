/* ============================================
   Main — Nav, Scroll, Typing Animation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTypingAnimation();
  initScrollSpy();
  initSmoothScroll();
});

/* ---- Navigation ---- */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu__overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  // Scroll effect on nav
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on overlay click
  overlay?.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  });
}

/* ---- Multilingual Typing Animations ---- */
function initTypingAnimation() {
  // 1. Role Typing (AI / DE)
  const typingRoleEl = document.querySelector('.hero__typing-text');
  if (typingRoleEl) {
    const roles = ['AI Engineer', 'Data Engineer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeRole() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingRoleEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingRoleEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 60 : 100;
      if (!isDeleting && charIndex === currentRole.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      }
      setTimeout(typeRole, delay);
    }
    setTimeout(typeRole, 1200);
  }

  // 2. Name Rotation (English / Vietnamese / Japanese) - Slide + Fade
  const nameItems = document.querySelectorAll('.hero__name-item');
  if (nameItems.length > 0) {
    let currentIdx = 0;
    const rotateName = () => {
      const exiting = nameItems[currentIdx];
      currentIdx = (currentIdx + 1) % nameItems.length;
      const entering = nameItems[currentIdx];

      // Reset states
      nameItems.forEach(item => item.classList.remove('active', 'exit'));

      // Apply transition
      exiting.classList.add('exit');
      entering.classList.add('active');

      // Kelvin (first item) stays longer for branding
      const waitTime = currentIdx === 0 ? 4000 : 2500;
      setTimeout(rotateName, waitTime);
    };

    // Initial delay after page load (gate opening)
    setTimeout(rotateName, 3000);
  }
}

/* ---- Scroll Spy ---- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -60% 0px'
    }
  );

  sections.forEach(section => observer.observe(section));
}

/* ---- Smooth Scroll ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
