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
  // Culturally diverse greetings
  const greetings = [
    { text: "こんにちは 🌸", lang: "Japanese" },
    { text: "Willkommen 🥨", lang: "German" },
    { text: "Hello World 🌐", lang: "English" },
    { text: "Xin chào 👋", lang: "Vietnamese" }
  ];
  const greetingEl = overlay.querySelector('.intro__greeting');
  let currentGreetingIdx = -1;

  const updateLoader = () => {
    // Variable speed for a "realistic" software load feel
    const increment = Math.random() * 12;
    progress = Math.min(progress + increment, 100);
    
    bar.style.width = `${progress}%`;
    pct.textContent = `${Math.floor(progress)}%`;

    // Cycle greetings based on progress (0-25, 25-50, 50-75, 75-100)
    const gIdx = Math.floor(progress / 25.1);
    if (gIdx !== currentGreetingIdx && gIdx < greetings.length) {
      currentGreetingIdx = gIdx;
      
      // Fade out, change, fade in
      greetingEl.classList.remove('visible');
      setTimeout(() => {
        greetingEl.textContent = greetings[currentGreetingIdx].text;
        greetingEl.classList.add('visible');
      }, 400);

      // Randomize technical text too
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
