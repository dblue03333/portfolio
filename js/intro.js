/* ============================================
   Intro Animation — Jigsaw Puzzle Assembly
   ============================================ */

(function () {
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;

  const bar = overlay.querySelector('.intro__progress-bar');
  const pct = overlay.querySelector('.intro__progress-pct');
  const loader = overlay.querySelector('.intro__loader');

  document.body.style.overflow = 'hidden';

  let progress = 0;

  const messages = [
    "Initializing Neural Network...",
    "Crawling Pipeline...",
    "Embedding Personas...",
    "Optimizing Vector Index...",
    "Training Dat_v2.0...",
    "Deploying Datacraft..."
  ];

  const puzzle = overlay.querySelector('.intro__puzzle');
  const pieces = overlay.querySelectorAll('.intro__piece');
  const loadText = overlay.querySelector('.intro__load-text');
  let currentPieceIdx = -1;

  const updateLoader = () => {
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
      setTimeout(assemblePuzzle, 600);
    }
  };

  const assemblePuzzle = () => {
    overlay.classList.add('intro--merged');
    puzzle.classList.add('merged');
    loadText.textContent = "Identity Confirmed.";

    setTimeout(finishIntro, 1000);
  };

  const finishIntro = () => {
    overlay.classList.add('intro--active');
    document.dispatchEvent(new Event('portfolioReady'));

    setTimeout(() => {
      document.body.style.overflow = '';
      overlay.style.pointerEvents = 'none';
      setTimeout(() => overlay.remove(), 1200);
    }, 1200);
  };

  updateLoader();
})();
