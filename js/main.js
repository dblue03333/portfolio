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

  // 2. Name Cycling (English / Vietnamese / Japanese)
  const typingNameEl = document.querySelector('.hero__name-typing');
  if (typingNameEl) {
    const names = ['Kelvin Nguyen', 'Nguyễn Đức Tuấn Đạt', '阮 徳新達'];
    let nameIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeName() {
      const currentName = names[nameIndex];
      if (isDeleting) {
        typingNameEl.textContent = currentName.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingNameEl.textContent = currentName.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 40 : 80; // Names type slightly faster
      if (!isDeleting && charIndex === currentName.length) {
        delay = 3000; // Hold Kelvin longer
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        nameIndex = (nameIndex + 1) % names.length;
        delay = 300;
      }
      setTimeout(typeName, delay);
    }
    setTimeout(typeName, 1500);
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
