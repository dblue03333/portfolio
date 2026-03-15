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

  // Culture Pieces defined in corners
  const puzzle = overlay.querySelector('.intro__puzzle');
  const pieces = overlay.querySelectorAll('.intro__piece');
  const loadText = overlay.querySelector('.intro__load-text');
  let currentPieceIdx = -1;

  const updateLoader = () => {
    // FASTER: Ensure we reach 100% in ~2s
    const increment = Math.random() * 12 + 8; 
    progress = Math.min(progress + increment, 100);
    
    bar.style.width = `${progress}%`;
    pct.textContent = `${Math.floor(progress)}%`;

    const pieceIdx = Math.floor(progress / 25.1);
    if (pieceIdx > currentPieceIdx && pieceIdx < pieces.length) {
      currentPieceIdx = pieceIdx;
      pieces[currentPieceIdx].classList.add('visible');
      loadText.textContent = messages[Math.floor(Math.random() * messages.length)];
    }

    if (progress < 100) {
      setTimeout(updateLoader, 80); // Consistent fast beats
    } else {
      setTimeout(assemblePuzzle, 100); // Snap almost immediately
    }
  };

  const assemblePuzzle = () => {
    overlay.classList.add('intro--merged');
    puzzle.classList.add('merged');
    loadText.textContent = "Identity Confirmed.";
    
    // Hold briefly then open the gate
    setTimeout(finishIntro, 400); 
  };

  const finishIntro = () => {
    // 1. Trigger Gate Slide
    overlay.classList.add('intro--active');
    
    // 2. Immediate cleanup after transition
    setTimeout(() => {
      document.body.style.overflow = '';
      overlay.style.pointerEvents = 'none';
      
      // Remove overlay quickly to prevent "phantom" layers
      setTimeout(() => overlay.remove(), 800);

      document.dispatchEvent(new Event('portfolioReady'));
    }, 600); // Faster gate slide sync
  };

  // Start the loading sequence
  updateLoader();
})();
