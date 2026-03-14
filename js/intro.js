/* ============================================
   Intro Animation — Loader into Sliding Gates
   ============================================ */

(function () {
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;

  const bar = overlay.querySelector('.intro__progress-bar');
  const pct = overlay.querySelector('.intro__progress-pct');
  const loader = overlay.querySelector('.intro__loader');

  // Disable scroll
  document.body.style.overflow = 'hidden';

  let progress = 0;
  
  // Fun DE/AI themed loading messages
  const messages = [
    "Initializing Neural Network...",
    "Crawling Pipeline...",
    "Embedding Personas...",
    "Optimizing Vector Index...",
    "Training Dat_v2.0...",
    "Deploying Datacraft..."
  ];
  const loadText = overlay.querySelector('.intro__load-text');

  const updateLoader = () => {
    // Variable speed for a "realistic" software load feel
    const increment = Math.random() * 15;
    progress = Math.min(progress + increment, 100);
    
    bar.style.width = `${progress}%`;
    pct.textContent = `${Math.floor(progress)}%`;

    // Randomize text every few intervals
    if (Math.random() > 0.8) {
        loadText.textContent = messages[Math.floor(Math.random() * messages.length)];
    }

    if (progress < 100) {
      setTimeout(updateLoader, 50 + Math.random() * 150);
    } else {
      setTimeout(finishIntro, 500);
    }
  };

  const finishIntro = () => {
    // 1. Hide the loader
    overlay.classList.add('intro--active');
    
    // 2. Enable scroll after gates are fully open
    setTimeout(() => {
      document.body.style.overflow = '';
      overlay.style.pointerEvents = 'none'; // Allow clicking through
      
      // Cleanup DOM after 2s (after transitions finish)
      setTimeout(() => {
        overlay.remove();
      }, 2000);

      // Trigger reveal animations
      document.dispatchEvent(new Event('portfolioReady'));
    }, 1200); // Matches transition duration in CSS
  };

  // Start the loading sequence
  updateLoader();
})();
