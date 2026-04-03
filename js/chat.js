/* ============================================
   Chat Widget — AI Assistant (Mock + API Ready)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initChat();
});

// --- Configuration ---
const CHAT_CONFIG = {
  // Set this to your deployed mini-llm-twin API endpoint when ready
  apiEndpoint: 'https://lunchless-rosaria-unrepugnantly.ngrok-free.dev/rag/ask', // LIVE Ngrok Permanent Tunnel URL
  botName: "Dat's AI",
  greeting:
    "Hi! I'm Dat's AI assistant. I'm currently using a pre-configured knowledge base while Dat finishes optimizing his live mini-llm-twin RAG pipeline. Ask me anything about his skills or projects!",
};

// --- Mock responses (used when API is not configured) ---
const MOCK_RESPONSES = {
  skills: "Dat specializes in AI Engineering and Data Engineering. His core stack includes Python, SQL, LLMs (via Google Gemini), RAG pipelines, MongoDB for vector search, Docker, and Microsoft Fabric. He holds an NVIDIA Generative AI with LLMs Associate certification.",
  projects: "Dat's flagship project is mini-llm-twin — a production-grade RAG pipeline that ingests personal knowledge, generates embeddings via Google Gemini, stores them in MongoDB Atlas with vector indexing, and retrieves contextually relevant answers. It demonstrates his end-to-end AI engineering skills.",
  experience: "Dat is a senior Data Science student at HCMUS (Ho Chi Minh University of Science). He's pivoting from Data Analytics into AI Engineering and Data Engineering, backed by hands-on projects and industry certifications from NVIDIA and Microsoft.",
  contact: "You can reach Dat at ndtdat.data@gmail.com or connect on LinkedIn: linkedin.com/in/dat-nguyen-duc-tuan-164293315",
  education: "Dat is pursuing a B.Sc. in Data Science at the University of Science (HCMUS), Ho Chi Minh City, Vietnam. He's a senior student currently open to AI Engineer and Data Engineer roles.",
  default: "I can tell you about Dat's skills, projects, or experience! Note: I'm currently in 'Dev Mode'—the full mini-llm-twin RAG integration is coming in the next update. What would you like to know?"
};

function getMockResponse(message) {
  const msg = message.toLowerCase();
  if (msg.includes('skill') || msg.includes('tech') || msg.includes('stack') || msg.includes('know'))
    return MOCK_RESPONSES.skills;
  if (msg.includes('project') || msg.includes('mini') || msg.includes('rag') || msg.includes('build'))
    return MOCK_RESPONSES.projects;
  if (msg.includes('experience') || msg.includes('work') || msg.includes('cert') || msg.includes('nvidia'))
    return MOCK_RESPONSES.experience;
  if (msg.includes('contact') || msg.includes('email') || msg.includes('reach') || msg.includes('linkedin'))
    return MOCK_RESPONSES.contact;
  if (msg.includes('education') || msg.includes('study') || msg.includes('school') || msg.includes('university'))
    return MOCK_RESPONSES.education;
  return MOCK_RESPONSES.default;
}

function initChat() {
  const fab = document.querySelector('.chat-fab__btn');
  const chatWindow = document.querySelector('.chat-window');
  const input = document.getElementById('chat-input');
  const sendBtn = document.querySelector('.chat-window__send');
  const messagesContainer = document.querySelector('.chat-window__messages');

  if (!fab || !chatWindow) return;

  // Toggle chat
  fab.addEventListener('click', () => {
    fab.classList.toggle('open');
    chatWindow.classList.toggle('open');

    if (chatWindow.classList.contains('open')) {
      input?.focus();
    }
  });

  // Send message
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    input.value = '';

    // Show typing indicator
    const typingEl = showTyping();

    // Respond (mock or API)
    if (CHAT_CONFIG.apiEndpoint) {
      fetchAPIResponse(text, typingEl);
    } else {
      setTimeout(() => {
        removeTyping(typingEl);
        appendMessage(getMockResponse(text), 'bot');
      }, 800 + Math.random() * 700);
    }
  }

  sendBtn?.addEventListener('click', sendMessage);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  function appendMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `chat-msg chat-msg--${sender}`;
    msg.textContent = text;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTyping() {
    const msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg--bot chat-msg--typing';
    msg.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return msg;
  }

  function removeTyping(el) {
    el?.remove();
  }

  async function fetchAPIResponse(text, typingEl) {
    try {
      const res = await fetch(CHAT_CONFIG.apiEndpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ query: text }),
      });
      const data = await res.json();
      removeTyping(typingEl);
      appendMessage(data.answer || data.response || 'Sorry, I could not process that.', 'bot');
    } catch (err) {
      removeTyping(typingEl);
      appendMessage("My AI is currently sleeping 😴. Email Dat instead at ndtdat.data@gmail.com!", 'bot');
    }
  }
}
