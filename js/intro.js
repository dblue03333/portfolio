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
    // SLOWER: Targeted for ~3.5s loading phase
    const increment = Math.random() * 4 + 2; 
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
      setTimeout(updateLoader, 100); 
    } else {
      // 100% REACHED: Assemble the puzzle!
      setTimeout(assemblePuzzle, 600);
    }
  };

  const assemblePuzzle = () => {
    overlay.classList.add('intro--merged');
    puzzle.classList.add('merged');
    loadText.textContent = "Identity Confirmed.";
    
    // Hold the complete puzzle for impact
    setTimeout(finishIntro, 1000); 
  };

  const finishIntro = () => {
    // 1. Trigger Gate Slide
    overlay.classList.add('intro--active');
    
    // 2. DISPATCH READY IMMEDIATELY so portfolio starts animating as gates part
    document.dispatchEvent(new Event('portfolioReady'));

    // 3. Cleanup after gates finish (1.2s in CSS)
    setTimeout(() => {
      document.body.style.overflow = '';
      overlay.style.pointerEvents = 'none';
      
      // Gentle removal after gates are completely out of view
      setTimeout(() => overlay.remove(), 1200);
    }, 1200);
  };

  // Start the loading sequence
  updateLoader();
})();
