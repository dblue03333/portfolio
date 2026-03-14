/* ============================================
   Animations — Intersection Observer Scroll Reveal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
});

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once revealed, stop observing for performance
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach(el => observer.observe(el));
}
