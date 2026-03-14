/* ============================================
   Accordion — Expandable Sections
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
});

function initAccordions() {
  const toggles = document.querySelectorAll('.accordion__toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const accordion = toggle.closest('.accordion');
      const isOpen = accordion.classList.contains('open');

      // Close all accordions in the same group (optional: remove this for independent)
      // const group = accordion.closest('[data-accordion-group]');
      // if (group) {
      //   group.querySelectorAll('.accordion.open').forEach(a => a.classList.remove('open'));
      // }

      accordion.classList.toggle('open', !isOpen);
    });
  });
}
