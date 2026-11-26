/* ==========================================================================
   AI ENGINEER DELIGHTS — TRILINGUAL (EN / VI / JA)
   1. Pure Web Audio Tactile Micro-SFX Synthesizer (opt-in, 0KB assets)
   2. Sương Xanh ⇄ Sương Đêm Twilight Theme + View Transition Circular Reveal
   3. ⌘K Inspectable Mini RAG Terminal (streaming + top-3 retrieval trace)
   4. Hallucination → Guardrail Intercept Easter Egg (5x Globe / footer / ⌘K)
   5. Upgraded Token X-Ray Mode (all 8 pages + floating Token Inspector tooltip)
   6. Live Saigon Time-Aware Status, Tab Away Trick & DevTools Console Helpers
   ========================================================================== */

(() => {
  const scriptEl = document.currentScript || document.querySelector('script[src*="delights.js"]');
  const scriptSrc = scriptEl?.getAttribute('src') || 'js/delights.js';
  const ROOT = scriptSrc.startsWith('../../') ? '../../' : scriptSrc.startsWith('../') ? '../' : '';
  const IS_MAC = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || '');
  const SHORTCUT_LABEL = IS_MAC ? '⌘K' : 'Ctrl+K';
  const PREFERS_REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getLang() {
    return window.__i18n?.getLang() || document.documentElement.dataset.lang || 'en';
  }

  function stripAccents(str) {
    return String(str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd');
  }

  const UI = {
    en: {
      consoleTitle: 'AI Console',
      askBtn: `${SHORTCUT_LABEL} Ask AI`,
      guardrailBtn: '⚡ Test Guardrail',
      xrayBtn: '🔬 X-Ray',
      modelCardBtn: '📄 Model Card',
      cmdModelCard: 'Open 30s Engineer Model Card (TL;DR)',
      cmdModelCardHint: 'Shift+C',
      themeLight: '☾ Twilight',
      themeDark: '☀ Mist Day',
      sfxOn: '🔊 SFX On',
      sfxOff: '🔇 SFX',
      drawerControls: 'Atmosphere',
      placeholder: 'Ask about Kelvin or jump to a command…',
      groupActions: 'Actions & Playground',
      groupPages: 'Navigate',
      hint: '↑↓ navigate · ↵ select or ask · esc close',
      badge: '100% client-side RAG',
      askRowPrefix: 'Ask Mini RAG: “',
      askRowSuffix: '”',
      askRowHint: 'Stream answer ↵',
      traceShow: 'Inspect retrieval trace',
      traceHide: 'Hide retrieval trace',
      cmdTheme: 'Switch Theme (Mist Day ⇄ Twilight)',
      cmdThemeHint: 'Shift+D',
      cmdSfx: 'Toggle Tactile Micro-SFX',
      cmdSfxHint: 'Shift+M',
      cmdGuardrail: 'Test Guardrail — Inject Hallucination',
      cmdGuardrailHint: 'Easter egg',
      cmdXray: 'Toggle Token X-Ray Mode',
      cmdXrayHint: 'Shift+X',
      xrayHud: 'X-RAY · {n} tokens',
      xrayOff: 'Off',
      awayTitle: '⚡ weights still warm — come back',
      cmdBoot: 'Replay AI Model Weights Boot',
      cmdBootHint: '00% → 100%',
      cmdCopy: 'Copy Email (ndtdat.data@gmail.com)',
      cmdCopyHint: 'Clipboard',
      cmdCopied: 'Copied ndtdat.data@gmail.com ✓',
      cmdLang: 'Cycle Language (EN → VI → JP)',
      cmdLangHint: 'Switch',
      navHome: 'Home',
      navWork: 'Work — All Projects',
      navAbout: 'About — Bio, Experience & Credentials',
      navBlog: 'Blog — Weekly Notes (Upcoming)',
      navContact: 'Contact — Send a Message',
      navHealthLab: 'Case Study · HealthLab Evidence Intelligence',
      navHarness: 'Case Study · Reliable Agent Harness',
      navHarborMind: 'Case Study · HarborMind',
      navRag: 'Case Study · mini-llm-twin (RAG)',
      retrieving: 'retrieving chunks · cosine',
      grounded: 'grounded',
      abstained: 'guardrail · abstained · confidence 0.12',
      chips: [
        { label: 'Tech stack?', query: 'What is Kelvin tech stack?' },
        { label: 'Why guardrails?', query: 'Why does Kelvin focus on guardrails?' },
        { label: 'HealthLab?', query: 'What did Kelvin build for HealthLab?' },
        { label: 'Open to work?', query: 'Is Kelvin open to work and how to contact?' },
        { label: 'Coffee or tea?', query: 'Coffee or tea in Saigon?' },
      ],
      guardrailAlert: 'GUARDRAIL TRIGGERED · UNVERIFIED CLAIM',
      guardrailAlertMsg: 'Detected hallucinated claim (confidence: 0.04, 0 supporting sources). Intercepting and reverting DOM to verified source truth…',
      guardrailOk: '✓ GROUNDED · SOURCE TRUTH RESTORED',
      guardrailOkMsg: 'Output rolled back cleanly to verified facts. Zero ungrounded claims shipped to production.',
      fakeRole: '100x AGI Wizard',
      fakeSub: 'Trained 9,999 LLMs overnight',
      fakeLead: 'Single-handedly solved AGI on a toaster with 1000% guaranteed accuracy and zero source verification.',
      whisper3: 'Keep clicking the globe… (2 more)',
      whisper4: '1 more click to poke the guardrail…',
      status: {
        early: 'Iced milk coffee · Reading AI papers',
        morning: 'Shipping AI pipelines · Open to chat',
        lunch: 'Lunch break in Saigon · Back soon',
        afternoon: 'Building LLMs & backend · Open to chat',
        evening: 'Studying JLPT N2 · Tinkering on projects',
        night: 'Recharging (or midnight debugging)',
      },
    },
    vi: {
      consoleTitle: 'AI Console',
      askBtn: `${SHORTCUT_LABEL} Hỏi AI`,
      guardrailBtn: '⚡ Thử Guardrail',
      xrayBtn: '🔬 Soi X-Ray',
      modelCardBtn: '📄 Model Card',
      cmdModelCard: 'Mở Engineer Model Card (Đọc nhanh 30 giây)',
      cmdModelCardHint: 'Shift+C',
      themeLight: '☾ Sương Đêm',
      themeDark: '☀ Sương Xanh',
      sfxOn: '🔊 Âm thanh Bật',
      sfxOff: '🔇 Âm thanh',
      drawerControls: 'Giao diện',
      placeholder: 'Hỏi nhanh về Tuấn Đạt hoặc gõ tên trang, lệnh…',
      groupActions: 'Tương tác & Thử nghiệm',
      groupPages: 'Đi nhanh đến trang',
      hint: '↑↓ di chuyển · ↵ chọn hoặc hỏi · esc đóng',
      badge: 'RAG chạy trực tiếp trên trình duyệt',
      askRowPrefix: 'Hỏi Mini RAG: “',
      askRowSuffix: '”',
      askRowHint: 'Trả lời ngay ↵',
      traceShow: 'Soi chi tiết truy xuất (top-3)',
      traceHide: 'Ẩn chi tiết truy xuất',
      cmdTheme: 'Đổi giao diện (Sương Xanh ⇄ Sương Đêm)',
      cmdThemeHint: 'Shift+D',
      cmdSfx: 'Bật / Tắt âm thanh phản hồi cơ học',
      cmdSfxHint: 'Shift+M',
      cmdGuardrail: 'Thử Guardrail — Giả lập AI bị ảo giác',
      cmdGuardrailHint: 'Easter egg',
      cmdXray: 'Bật / Tắt chế độ soi Token X-Ray',
      cmdXrayHint: 'Shift+X',
      xrayHud: 'X-RAY · {n} token',
      xrayOff: 'Tắt',
      awayTitle: '⚡ model vẫn đang ấm — quay lại nhé',
      cmdBoot: 'Chạy lại hiệu ứng khởi động AI Weights',
      cmdBootHint: '00% → 100%',
      cmdCopy: 'Sao chép email (ndtdat.data@gmail.com)',
      cmdCopyHint: 'Clipboard',
      cmdCopied: 'Đã sao chép ndtdat.data@gmail.com ✓',
      cmdLang: 'Đổi ngôn ngữ (EN → VI → JP)',
      cmdLangHint: 'Chuyển nhanh',
      navHome: 'Trang chủ',
      navWork: 'Dự án — Tất cả sản phẩm',
      navAbout: 'Giới thiệu — Kinh nghiệm & Chứng chỉ',
      navBlog: 'Blog — Ghi chú hàng tuần (Sắp mở)',
      navContact: 'Liên hệ — Gửi tin nhắn cho Đạt',
      navHealthLab: 'Case Study · HealthLab Evidence Intelligence',
      navHarness: 'Case Study · Reliable Agent Harness',
      navHarborMind: 'Case Study · HarborMind',
      navRag: 'Case Study · mini-llm-twin (RAG)',
      retrieving: 'đã truy xuất nguồn · cosine',
      grounded: 'đã kiểm chứng',
      abstained: 'guardrail · từ chối bịa · độ tin cậy 0.12',
      chips: [
        { label: 'Công nghệ chính?', query: 'Công nghệ chính của Tuấn Đạt là gì?' },
        { label: 'Tại sao cần guardrails?', query: 'Tại sao Tuấn Đạt chú trọng guardrails?' },
        { label: 'Dự án HealthLab?', query: 'Dự án HealthLab làm gì?' },
        { label: 'Có đang tìm cơ hội mới?', query: 'Tuấn Đạt có đang nhận cơ hội hợp tác không?' },
        { label: 'Cà phê hay trà?', query: 'Ở Sài Gòn Đạt uống cà phê hay trà?' },
      ],
      guardrailAlert: 'GUARDRAIL KÍCH HOẠT · PHÁT HIỆN ẢO GIÁC',
      guardrailAlertMsg: 'Phát hiện nội dung phóng đại không có nguồn chứng cứ (độ tin cậy: 0.04). Hệ thống đang chặn lại và khôi phục dữ liệu gốc…',
      guardrailOk: '✓ ĐÃ KIỂM CHỨNG · KHÔI PHỤC BẢN GỐC',
      guardrailOkMsg: 'Toàn bộ nội dung đã được trả về đúng sự thật có nguồn gốc rõ ràng. Không có thông tin bịa đặt nào lọt ra ngoài.',
      fakeRole: 'Pháp sư AGI 100x',
      fakeSub: 'Tự train 9.999 model trong 1 đêm',
      fakeLead: 'Mình vừa tự tay train xong AGI trên máy tính cũ với độ chính xác 1000% mà không cần kiểm chứng nguồn dữ liệu.',
      whisper3: 'Bấm tiếp vào quả địa cầu đi… (còn 2 lần)',
      whisper4: 'Thêm 1 lần nữa để chọc Guardrail nhé…',
      status: {
        early: 'Đang làm ly cà phê sữa đá · Đọc paper AI',
        morning: 'Đang code AI pipelines · Sẵn sàng trao đổi',
        lunch: 'Nghỉ trưa tại Sài Gòn · Sẽ sớm quay lại',
        afternoon: 'Đang build LLM & backend · Sẵn sàng trao đổi',
        evening: 'Đang ôn tiếng Nhật N2 · Vọc side projects',
        night: 'Đang nạp pin (hoặc đang fix bug nửa đêm)',
      },
    },
    ja: {
      consoleTitle: 'AIコンソール',
      askBtn: `${SHORTCUT_LABEL} AIに質問`,
      guardrailBtn: '⚡ ガードレール実験',
      xrayBtn: '🔬 X-Ray',
      modelCardBtn: '📄 モデルカード',
      cmdModelCard: '30秒エンジニア・モデルカードを開く',
      cmdModelCardHint: 'Shift+C',
      themeLight: '☾ ダーク',
      themeDark: '☀ ライト',
      sfxOn: '🔊 効果音 ON',
      sfxOff: '🔇 効果音',
      drawerControls: '表示・音響',
      placeholder: 'Kelvinについて質問、またはコマンド検索…',
      groupActions: 'アクション・実験',
      groupPages: 'ページ移動',
      hint: '↑↓ 移動 · ↵ 実行 / 質問 · esc 閉じる',
      badge: '100%クライアントRAG',
      askRowPrefix: 'Mini RAGに質問: 「',
      askRowSuffix: '」',
      askRowHint: '回答生成 ↵',
      traceShow: '検索トレースを表示 (top-3)',
      traceHide: '検索トレースを隠す',
      cmdTheme: 'テーマ切替（ライト ⇄ トワイライト）',
      cmdThemeHint: 'Shift+D',
      cmdSfx: 'マイクロ効果音を切替',
      cmdSfxHint: 'Shift+M',
      cmdGuardrail: 'ガードレール実験 — ハルシネーション注入',
      cmdGuardrailHint: 'イースターエッグ',
      cmdXray: 'トークンX-Rayモードを切替',
      cmdXrayHint: 'Shift+X',
      xrayHud: 'X-RAY · {n} トークン',
      xrayOff: '終了',
      awayTitle: '⚡ モデル待機中 — お待ちしています',
      cmdBoot: 'AIウェイト起動演出を再生',
      cmdBootHint: '00% → 100%',
      cmdCopy: 'メールをコピー (ndtdat.data@gmail.com)',
      cmdCopyHint: 'コピー',
      cmdCopied: 'ndtdat.data@gmail.com をコピーしました ✓',
      cmdLang: '言語を切替 (EN → VI → JP)',
      cmdLangHint: '切替',
      navHome: 'ホーム',
      navWork: '実績一覧',
      navAbout: '自己紹介・経歴・資格',
      navBlog: 'ブログ — 週次ノート（準備中）',
      navContact: 'お問い合わせ',
      navHealthLab: '事例 · HealthLab Evidence Intelligence',
      navHarness: '事例 · Reliable Agent Harness',
      navHarborMind: '事例 · HarborMind',
      navRag: '事例 · mini-llm-twin (RAG)',
      retrieving: '根拠抽出済み · cosine',
      grounded: '検証済み',
      abstained: 'guardrail · 回答保留 · 信頼度 0.12',
      chips: [
        { label: '技術スタックは？', query: '技術スタックは何ですか？' },
        { label: 'なぜガードレール？', query: 'なぜガードレールを重視していますか？' },
        { label: 'HealthLabとは？', query: 'HealthLabプロジェクトの内容は？' },
        { label: '相談できる？', query: '仕事やコラボの相談はできますか？' },
        { label: 'コーヒー派？', query: 'コーヒーと紅茶どちらが好き？' },
      ],
      guardrailAlert: 'GUARDRAIL TRIGGERED · 未検証の主張を検知',
      guardrailAlertMsg: '根拠のない誇張表現を検知しました（信頼度: 0.04）。ソース検証済みの内容へロールバックしています…',
      guardrailOk: '✓ GROUNDED · 検証済みデータへ復元完了',
      guardrailOkMsg: 'すべての表示を根拠データ準拠の内容へ復元しました。ハルシネーションは本番へ流しません。',
      fakeRole: '100倍AGIウィザード',
      fakeSub: '一晩で9,999モデル学習済み',
      fakeLead: '古いノートPCだけでAGIを完成させ、ソース検証なしで精度1000%を達成しました。',
      whisper3: '地球儀をあと2回クリック…',
      whisper4: 'あと1回でガードレールが作動します…',
      status: {
        early: 'ベトナムコーヒー · AI論文チェック中',
        morning: 'AIパイプライン実装中 · ご相談歓迎',
        lunch: 'サイゴンでランチ休憩中',
        afternoon: 'LLM・バックエンド開発中 · ご相談歓迎',
        evening: '日本語N2勉強中 · 個人開発',
        night: '充電中（または深夜デバッグ中）',
      },
    },
  };

  /* ---------- Mini RAG Verified Knowledge Base ---------- */
  const KB = [
    {
      id: 'stack',
      chunkPath: 'kb/capabilities/tech-stack.md',
      score: 0.95,
      keywords: [
        'stack', 'tech', 'skill', 'python', 'fastapi', 'docker', 'llm', 'rag', 'gemini', 'gemma',
        'lightgbm', 'mongodb', 'vector', 'astro', 'figma', 'backend', 'tool', 'framework',
        'cong nghe', 'ky nang', 'ngon ngu lap trinh', 'dung gi', 'code gi',
        '技術', 'スタック', 'スキル', 'バックエンド',
      ],
      answers: {
        en: 'Kelvin works across the intersection of LLM applications, backend services, and data pipelines. His core stack includes Python, FastAPI, async PostgreSQL (asyncpg/Alembic), Docker, PyTorch, LightGBM/XGBoost/CatBoost, MongoDB Atlas Vector Search, Google Gemini, offline Gemma 4, Playwright harnesses, and Astro for editorial web builds.',
        vi: 'Tuấn Đạt làm việc ở điểm giao giữa ứng dụng LLM, backend và data pipeline. Bộ công nghệ chính của Đạt gồm Python, FastAPI, PostgreSQL bất đồng bộ (asyncpg/Alembic), Docker, PyTorch, LightGBM/XGBoost/CatBoost, MongoDB Atlas Vector Search, Google Gemini, Gemma 4 chạy offline, Playwright và Astro cho web biên tập.',
        ja: 'LLMアプリケーション、バックエンド、データパイプラインの領域を中心に、Python、FastAPI、Docker、MongoDB Atlas Vector Search、Google Gemini、オフラインGemma 4、LightGBM、Astroなどを使用しています。',
      },
      sources: [
        { label: { en: 'About → Capabilities', vi: 'Giới thiệu → Năng lực', ja: '自己紹介 → 提供価値' }, path: 'about/index.html' },
        { label: { en: 'Case → mini-llm-twin', vi: 'Dự án → mini-llm-twin', ja: '事例 → mini-llm-twin' }, path: 'work/mini-llm-twin/index.html' },
      ],
    },
    {
      id: 'guardrails',
      chunkPath: 'kb/philosophy/guardrails-368.md',
      score: 0.96,
      keywords: [
        'guardrail', 'reliable', 'safety', 'trust', 'test', '368', 'harness', 'fail', 'hallucinat', 'approve', 'human',
        'tin cay', 'an toan', 'kiem chung', 'kiem thu', 'tai sao', 'triet ly', 'ao giac', 'duyet',
        'ガードレール', '安全', '信頼', 'テスト', 'なぜ',
      ],
      answers: {
        en: 'Because shipping an LLM demo is easy, but trusting it in production is hard. Kelvin tests where systems fail first — enforcing typed tool validation, bounded retries, offline test suites (like 368 passing tests in Reliable Agent Harness), and explicit human approval gates before side effects run.',
        vi: 'Vì làm một bản demo LLM chạy được thì nhanh, nhưng để người dùng thật sự dám tin và dùng trong thực tế lại rất khó. Đạt luôn tìm xem hệ thống dễ lỗi ở đâu trước — kiểm định chặt đầu vào/đầu ra của tool, giới hạn số lần retry, phủ bộ test offline (như 368 test trong Reliable Agent Harness) và luôn giữ bước con người duyệt trước khi hệ thống ghi dữ liệu ra ngoài.',
        ja: 'デモを作るのは簡単でも、本番で信頼できるAIにするには設計が不可欠だからです。型検証、リトライ上限、368件のオフラインテスト、副作用前の人間承認ゲートを徹底し、失敗箇所を先に検証する姿勢を貫いています。',
      },
      sources: [
        { label: { en: 'Case → Reliable Agent Harness', vi: 'Dự án → Reliable Agent Harness', ja: '事例 → Reliable Agent Harness' }, path: 'work/reliable-agent-harness/index.html' },
        { label: { en: 'About → Philosophy', vi: 'Giới thiệu → Cách làm việc', ja: '自己紹介 → 方針' }, path: 'about/index.html' },
      ],
    },
    {
      id: 'healthlab',
      chunkPath: 'kb/cases/healthlab-evidence.md',
      score: 0.94,
      keywords: [
        'healthlab', 'health', 'ageing', 'aging', 'newsletter', 'editorial', 'lineage', 'evidence',
        'y te', 'lao hoa', 'ban tin', 'bien tap', 'truy vet',
        'ヘルスラボ', '公衆衛生', '編集',
      ],
      answers: {
        en: 'For HealthLab (Oct 2026 – Present), Kelvin contributes to the responsive Astro website and built a Python evidence pipeline for its supervised public health newsletter pilot on healthy ageing in Vietnam — preserving original sources in versioned datasets so editors verify every claim before publishing.',
        vi: 'Tại HealthLab (Th10 2026 – Nay), Tuấn Đạt tham gia xây dựng website Astro responsive và thiết kế pipeline dữ liệu bằng Python cho bản tin thí điểm về lão hóa khỏe mạnh tại Việt Nam. Hệ thống lưu nguyên tài liệu nguồn gốc theo từng phiên bản để biên tập viên đối chiếu từng câu trước khi khóa duyệt xuất bản.',
        ja: 'HealthLab（2026年10月〜現在）では、Astro製サイトの改善と、ベトナムの健康長寿ニュースレター向けPythonデータパイプラインを担当。元ソースを版管理して編集者が各主張を検証できる仕組みを構築しています。',
      },
      sources: [
        { label: { en: 'Case → HealthLab Evidence', vi: 'Dự án → HealthLab Evidence', ja: '事例 → HealthLab Evidence' }, path: 'work/healthlab/index.html' },
      ],
    },
    {
      id: 'harbormind',
      chunkPath: 'kb/cases/harbormind-ais.md',
      score: 0.93,
      keywords: [
        'harbormind', 'port', 'maritime', 'ship', 'ais', 'noaa', 'kaggle', 'quantile', 'captain', 'long beach', 'hackathon',
        'cang', 'tau', 'hang hai', 'thuyen truong', 'phan vi', 'bat dinh',
        '港湾', '海事', '船長',
      ],
      answers: {
        en: 'HarborMind (Apr – May 2026, Gemma 4 Good Hackathon) combines cleaned NOAA MarineCadastre AIS vessel trajectories published on Kaggle with LightGBM quantile regression and offline Gemma 4 agents — giving ships P10–P90 wait-time bands and handing control back to the captain whenever uncertainty spikes.',
        vi: 'HarborMind (Th4 – Th5 2026, Gemma 4 Good Hackathon) kết hợp bộ dữ liệu hành trình tàu NOAA AIS đã làm sạch và công bố trên Kaggle cùng hồi quy phân vị LightGBM và Gemma 4 chạy offline. Thay vì dự báo một con số trung bình dễ đánh lừa, hệ thống đưa ra khoảng P10–P90 và trả quyền quyết định về tay thuyền trưởng khi độ bất định vượt ngưỡng an toàn.',
        ja: 'HarborMind（2026年4–5月）は、Kaggle公開のNOAA AIS航跡データにLightGBM分位回帰とオフラインGemma 4を組み合わせた港湾待機予測システムです。不確実性が高い場合は自動で船長へ判断を引き継ぎます。',
      },
      sources: [
        { label: { en: 'Case → HarborMind', vi: 'Dự án → HarborMind', ja: '事例 → HarborMind' }, path: 'work/harbormind/index.html' },
      ],
    },
    {
      id: 'experience',
      chunkPath: 'kb/profile/bio-credentials.md',
      score: 0.92,
      keywords: [
        'experience', 'exp', 'safiri', 'nvidia', 'credly', 'google', 'cert', 'credential', 'hcmus', 'degree', 'study', 'language', 'japanese', 'n2', 'german', 'education', 'who', 'bio', 'about',
        'kinh nghiem', 'chung chi', 'hoc van', 'truong', 'ngoai ngu', 'tieng nhat', 'tieng anh', 'tieng duc', 'la ai', 'gioi thieu', 'ban than',
        '経歴', '資格', '学歴', '言語', '日本語', '自己紹介',
      ],
      answers: {
        en: 'Kelvin Nguyen (Nguyen Duc Tuan Dat) is an AI Engineer in Ho Chi Minh City with a B.Sc. in IT & Data Science from HCMUS. His recent work spans HealthLab, independent AI consulting for Safiri Logistics, and Gemini multimodal evaluation. He holds the NVIDIA-Certified Associate: Generative AI LLMs credential and speaks Vietnamese (native), English (C1), plus Japanese (targeting N2) and German (A1).',
        vi: 'Nguyễn Đức Tuấn Đạt là AI Engineer tại TP. Hồ Chí Minh, tốt nghiệp CNTT (chuyên ngành Khoa học Dữ liệu) tại ĐH Khoa học Tự nhiên — HCMUS. Gần đây Đạt tham gia HealthLab, tư vấn kỹ thuật AI độc lập cho Safiri Logistics và xây dựng nguyên mẫu đa phương thức Gemini. Đạt có chứng chỉ NVIDIA NCA-GENL, nói tiếng Việt bản ngữ, tiếng Anh C1, đang ôn tiếng Nhật mục tiêu N2 và tự học thêm tiếng Đức A1.',
        ja: 'ホーチミン市拠点のAIエンジニア（HCMUS情報技術・データサイエンス専攻卒）。HealthLab、Safiri Logistics向けAIコンサルティング、Geminiマルチモーダル開発などを経験。NVIDIA NCA-GENL資格を保有し、ベトナム語・英語（C1）・日本語（N2目標）・ドイツ語（A1）を扱います。',
      },
      sources: [
        { label: { en: 'About → Experience & Credentials', vi: 'Giới thiệu → Kinh nghiệm & Chứng chỉ', ja: '自己紹介 → 経歴・資格' }, path: 'about/index.html' },
      ],
    },
    {
      id: 'contact',
      chunkPath: 'kb/profile/availability-contact.md',
      score: 0.95,
      keywords: [
        'contact', 'hire', 'job', 'open', 'available', 'role', 'work together', 'email', 'mail', 'reach', 'collab', 'linkedin', 'github',
        'lien he', 'tuyen dung', 'co hoi', 'hop tac', 'nhan viec', 'trao doi', 'nhan tin',
        '連絡', '相談', '仕事', 'コラボ', 'メール', 'お問い合わせ',
      ],
      answers: {
        en: 'Yes — Kelvin is open to AI Engineer roles, LLM/backend engineering collaborations, and interesting technical conversations. You can send a message directly via the Contact page or email ndtdat.data@gmail.com.',
        vi: 'Có chứ! Tuấn Đạt luôn sẵn sàng trao đổi về vị trí AI Engineer, các dự án hợp tác về LLM / backend / data pipeline, hoặc đơn giản là trò chuyện kỹ thuật. Bạn có thể nhắn trực tiếp qua trang Liên hệ hoặc gửi email tới ndtdat.data@gmail.com nhé.',
        ja: 'はい、AIエンジニア職やLLM・バックエンド開発の協業、技術的なご相談を歓迎しています。お問い合わせページ、または ndtdat.data@gmail.com からお気軽にご連絡ください。',
      },
      sources: [
        { label: { en: 'Open Contact Page', vi: 'Mở trang Liên hệ', ja: 'お問い合わせを開く' }, path: 'contact/index.html' },
      ],
    },
    {
      id: 'gaming',
      chunkPath: 'kb/upcoming/generalist-gaming-agent.md',
      score: 0.93,
      keywords: [
        'gaming', 'game', 'kaggle', 'playwright', '20 fps', 'vlm', 'upcoming', 'blog', 'notes', 'weekly',
        'choi game', 'sap ra mat', 'ghi chu', 'hang tuan',
        'ゲーム', 'ブログ', '近日公開',
      ],
      answers: {
        en: 'Two upcoming additions are in progress: Generalist Gaming Agent (a Kaggle offline 20 FPS browser-game agent using Playwright, Pillow, and latency-aware VLM planning) and a weekly Blog for paper notes, build logs, and failure post-mortems.',
        vi: 'Mình đang chuẩn bị 2 mục sắp ra mắt: dự án Generalist Gaming Agent (agent chơi game trình duyệt 20 FPS chạy offline cho cuộc thi Kaggle, dùng Playwright, Pillow và lập kế hoạch VLM) cùng mục Blog cập nhật ghi chú học tập hàng tuần.',
        ja: '現在2つの新企画を準備中です。Kaggle競技向けのオフライン20FPSゲームエージェント「Generalist Gaming Agent」と、論文・開発メモを毎週更新するブログです。',
      },
      sources: [
        { label: { en: 'Work → Upcoming Gaming Agent', vi: 'Dự án → Gaming Agent (Sắp mở)', ja: '実績 → Gaming Agent（近日公開）' }, path: 'work/index.html#upcoming-gaming-agent' },
        { label: { en: 'Blog → Weekly Notes (Soon)', vi: 'Blog → Ghi chú hàng tuần', ja: 'ブログ → 準備中' }, path: 'blog/index.html' },
      ],
    },
    {
      id: 'coffee',
      chunkPath: 'kb/profile/saigon-notes.md',
      score: 0.91,
      keywords: [
        'coffee', 'cafe', 'tea', 'drink', 'saigon', 'fun', 'hobby', 'hello', 'hi', 'hey',
        'ca phe', 'tra', 'uong gi', 'sai gon', 'so thich', 'xin chao', 'chao', 'vui',
        'コーヒー', '紅茶', 'こんにちは', '趣味',
      ],
      answers: {
        en: 'Definitely Saigon iced milk coffee (cà phê sữa đá) in the morning — great fuel for hunting edge cases in agent pipelines and practicing Japanese JLPT N2 vocabulary in the evening!',
        vi: 'Chắc chắn là một ly cà phê sữa đá Sài Gòn vào buổi sáng rồi — nhiên liệu chuẩn bài để đi săn edge-case trong các pipeline AI, còn buổi tối thì thong thả ôn thêm từ vựng tiếng Nhật N2!',
        ja: '朝はやっぱりサイゴンの練乳入りアイスコーヒー（cà phê sữa đá）派です。AIパイプラインのエッジケース探しと、夜の日本語N2の勉強に欠かせない相棒です！',
      },
      sources: [
        { label: { en: 'About → Background', vi: 'Giới thiệu → Đôi nét cá nhân', ja: '自己紹介' }, path: 'about/index.html' },
      ],
    },
  ];

  const ABSTAIN_COPY = {
    en: 'No verified source found in Kelvin’s portfolio index for that query — abstaining instead of hallucinating! Try asking about his tech stack, guardrails, HealthLab, HarborMind, credentials, or contact info.',
    vi: 'Mình không tìm thấy thông tin khớp trong kho dữ liệu nguồn của Tuấn Đạt cho câu hỏi này — nên mình xin phép dừng lại thay vì tự bịa nhé! Bạn thử hỏi về công nghệ chính, guardrails, HealthLab, HarborMind, kinh nghiệm hoặc cách liên hệ xem sao.',
    ja: 'ポートフォリオ内の根拠データに該当情報が見つからなかったため、ハルシネーションを防ぐため回答を控えます。技術スタック、ガードレール、HealthLab、経歴、お問い合わせなどについて聞いてみてください。',
  };

  /* ---------- 0A. Pure Web Audio Micro-SFX Engine (Opt-In) ---------- */
  function createSfxEngine() {
    let enabled = localStorage.getItem('portfolio_sfx') === '1';
    let ctx = null;
    let lastHoverAt = 0;

    function ensureCtx() {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      if (!ctx) ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      return ctx;
    }

    function tone(freqStart, freqEnd, duration, peakGain, type = 'sine', delay = 0) {
      const c = ensureCtx();
      if (!c) return;
      const now = c.currentTime + delay;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freqStart, now);
      if (freqEnd && freqEnd !== freqStart) {
        osc.frequency.exponentialRampToValueAtTime(freqEnd, now + duration);
      }
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(peakGain, now + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(now);
      osc.stop(now + duration + 0.01);
    }

    function play(kind, force = false) {
      if (!enabled && !force) return;
      try {
        if (kind === 'hover') {
          const now = performance.now();
          if (now - lastHoverAt < 65) return;
          lastHoverAt = now;
          tone(860, 740, 0.022, 0.018, 'triangle');
        } else if (kind === 'click') {
          tone(540, 320, 0.035, 0.032, 'triangle');
        } else if (kind === 'switch') {
          tone(480, 660, 0.045, 0.028, 'sine');
        } else if (kind === 'theme') {
          tone(380, 580, 0.09, 0.028, 'sine', 0);
          tone(580, 760, 0.11, 0.022, 'sine', 0.05);
        } else if (kind === 'xray') {
          tone(720, 1180, 0.08, 0.024, 'sine', 0);
          tone(1080, 1420, 0.09, 0.018, 'triangle', 0.045);
        } else if (kind === 'guardrailWarn') {
          tone(340, 210, 0.12, 0.035, 'sawtooth', 0);
          tone(290, 180, 0.14, 0.03, 'sawtooth', 0.13);
        } else if (kind === 'guardrailOk') {
          tone(523.25, 523.25, 0.09, 0.026, 'sine', 0);
          tone(659.25, 659.25, 0.11, 0.026, 'sine', 0.06);
          tone(783.99, 783.99, 0.16, 0.024, 'sine', 0.12);
        } else if (kind === 'nyan') {
          const notes = [622.25, 659.25, 739.99, 987.77, 739.99, 659.25, 622.25, 739.99];
          notes.forEach((f, idx) => {
            tone(f, f, 0.085, 0.022, 'triangle', idx * 0.095);
          });
        }
      } catch {
        // ignore audio errors if blocked by browser policy
      }
    }

    function toggle() {
      enabled = !enabled;
      localStorage.setItem('portfolio_sfx', enabled ? '1' : '0');
      if (enabled) play('guardrailOk', true);
      window.dispatchEvent(new CustomEvent('portfolio:sfxchange', { detail: { enabled } }));
      return enabled;
    }

    // Subtle delegated micro-SFX across key tactile elements
    document.addEventListener('pointerenter', (e) => {
      if (!enabled) return;
      const target = e.target?.closest?.('.work-items-row a, .work-list-link, a.horizontal-tile, .btn-click, .demo-btn, .constellation-node');
      if (target) play('hover');
    }, true);

    document.addEventListener('click', (e) => {
      if (!enabled) return;
      const target = e.target?.closest?.('.btn-click, .demo-btn, [data-set-lang], .cmdk-chip, .hanger, .role-cycler');
      if (target) play('click');
    }, true);

    const api = { play, toggle, isEnabled: () => enabled };
    window.__portfolioSfx = api;
    return api;
  }

  /* ---------- 0B. Sương Xanh ⇄ Sương Đêm Theme Engine (120fps GPU Mist Wave) ---------- */
  function createThemeSystem(sfx) {
    let waveEl = null;
    let activeAnim = null;
    let switching = false;

    function getWaveEl() {
      if (!waveEl) {
        waveEl = document.createElement('div');
        waveEl.className = 'theme-wave';
        waveEl.setAttribute('aria-hidden', 'true');
        document.body.appendChild(waveEl);
      }
      return waveEl;
    }

    function getTheme() {
      return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    }

    function applyTheme(next) {
      const val = next === 'dark' ? 'dark' : 'light';
      document.documentElement.dataset.theme = val;
      localStorage.setItem('portfolio_theme', val);
      window.dispatchEvent(new CustomEvent('portfolio:themechange', { detail: { theme: val } }));
    }

    function toggle(evt) {
      if (switching) return getTheme();
      const next = getTheme() === 'dark' ? 'light' : 'dark';
      sfx?.play('theme');

      if (PREFERS_REDUCED || typeof Element.prototype.animate !== 'function') {
        applyTheme(next);
        return next;
      }

      switching = true;
      const wave = getWaveEl();
      if (activeAnim) {
        activeAnim.cancel();
        activeAnim = null;
      }

      const x = typeof evt?.clientX === 'number' && evt.clientX > 0 ? evt.clientX : window.innerWidth * 0.86;
      const y = typeof evt?.clientY === 'number' && evt.clientY > 0 ? evt.clientY : 40;
      const maxR = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      const targetScale = Math.max(1, (maxR * 2.15) / 100);

      wave.style.left = `${x}px`;
      wave.style.top = `${y}px`;
      wave.style.background =
        next === 'dark'
          ? 'radial-gradient(circle, #142C44 0%, #0D1E2E 68%, #07131F 100%)'
          : 'radial-gradient(circle, #FBFDFF 0%, #F2F6FA 68%, #DFECF5 100%)';

      // Pure compositor-thread transform scale (0 DOM screenshot stall, true 120fps)
      const expand = wave.animate(
        [
          { transform: 'translate3d(-50%, -50%, 0) scale(0.01)', opacity: 0.96 },
          { transform: `translate3d(-50%, -50%, 0) scale(${targetScale.toFixed(2)})`, opacity: 1 },
        ],
        {
          duration: 270,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'forwards',
        }
      );
      activeAnim = expand;

      expand.onfinish = () => {
        applyTheme(next);
        const fade = wave.animate(
          [
            { transform: `translate3d(-50%, -50%, 0) scale(${targetScale.toFixed(2)})`, opacity: 1 },
            { transform: `translate3d(-50%, -50%, 0) scale(${targetScale.toFixed(2)})`, opacity: 0 },
          ],
          {
            duration: 220,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards',
          }
        );
        activeAnim = fade;
        fade.onfinish = () => {
          wave.style.opacity = '0';
          wave.style.transform = 'translate3d(-50%, -50%, 0) scale(0)';
          activeAnim = null;
          switching = false;
        };
      };

      return next;
    }

    return { getTheme, applyTheme, toggle };
  }

  function getSaigonStatusText(lang) {
    const u = UI[lang] || UI.en;
    try {
      const hourStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: 'numeric',
        hour12: false,
      }).format(new Date());
      const hour = parseInt(hourStr, 10) % 24;
      if (hour >= 6 && hour < 9) return u.status.early;
      if (hour >= 9 && hour < 12) return u.status.morning;
      if (hour >= 12 && hour < 13) return u.status.lunch;
      if (hour >= 13 && hour < 18) return u.status.afternoon;
      if (hour >= 18 && hour < 22) return u.status.evening;
      return u.status.night;
    } catch {
      return u.status.morning;
    }
  }

  function navigateSmooth(relPath, label) {
    const targetUrl = ROOT + relPath;
    sessionStorage.setItem('dennis_page_transition', '1');
    sessionStorage.setItem('dennis_page_label', label || '');
    window.location.href = targetUrl;
  }

  function replayAiBoot() {
    sessionStorage.removeItem('dennis_page_transition');
    sessionStorage.removeItem('dennis_page_label');
    if (document.body?.dataset?.page === 'home') {
      window.location.reload();
    } else {
      window.location.href = `${ROOT}index.html`;
    }
  }

  /* ---------- Icons (Crisp 1.7px stroke inline SVGs) ---------- */
  const ICON_MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';
  const ICON_SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"/></svg>';
  const ICON_SFX_ON = '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.8 5.5a9.2 9.2 0 0 1 0 13"/></svg>';
  const ICON_SFX_OFF = '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>';

  /* ---------- 1. Live Saigon Status + Navbar Utilities + Footer Console ---------- */
  const statusEls = [];
  const consoleTitleEls = [];
  const askPillEls = [];
  const guardrailPillEls = [];
  const xrayPillEls = [];
  const xrayBtnEls = [];
  const themeBtnEls = [];
  const themePillTextEls = [];
  const sfxBtnEls = [];
  const sfxPillTextEls = [];
  const drawerControlLabelEls = [];
  const modelCardPillEls = [];

  function mountChromeEnhancements(openPalette, triggerGuardrail, toggleXray, toggleTheme, toggleSfx, openModelCard) {
    // A. Desktop navbar compact Theme + SFX + ⌘K utility group
    const desktopNav = document.querySelector('.nav-links');
    if (desktopNav && !desktopNav.querySelector('.nav-utility-group')) {
      const group = document.createElement('div');
      group.className = 'nav-utility-group';

      const themeBtn = document.createElement('button');
      themeBtn.type = 'button';
      themeBtn.className = 'nav-icon-btn';
      themeBtn.dataset.themeToggle = '';
      themeBtn.setAttribute('aria-label', 'Switch theme (Mist Day / Twilight)');
      themeBtn.addEventListener('click', (e) => toggleTheme(e));

      const cmdBtn = document.createElement('button');
      cmdBtn.type = 'button';
      cmdBtn.className = 'cmdk-nav-btn';
      cmdBtn.dataset.cmdkOpen = '';
      cmdBtn.setAttribute('aria-label', 'Open AI Command Palette');
      cmdBtn.innerHTML = `<span class="cmdk-nav-dot" aria-hidden="true"></span><span>${SHORTCUT_LABEL}</span>`;
      cmdBtn.addEventListener('click', openPalette);

      group.append(themeBtn, cmdBtn);
      desktopNav.appendChild(group);
      themeBtnEls.push(themeBtn);
    }

    // B. Mobile drawer utilities + fixed ⌘K drawer close trigger
    const drawerLang = document.querySelector('.fixed-nav-lang');
    if (drawerLang && !drawerLang.parentElement?.querySelector('[data-cmdk-drawer]')) {
      const utilRow = document.createElement('div');
      utilRow.className = 'fixed-nav-utilities';
      utilRow.innerHTML = `
        <h5 data-drawer-ctrl-label>Atmosphere</h5>
        <div class="fixed-nav-util-btns">
          <button type="button" class="nav-icon-btn" data-theme-toggle aria-label="Switch theme"></button>
          <button type="button" class="nav-icon-btn" data-sfx-toggle aria-label="Toggle sound effects"></button>
        </div>
      `;
      const dThemeBtn = utilRow.querySelector('[data-theme-toggle]');
      const dSfxBtn = utilRow.querySelector('[data-sfx-toggle]');
      dThemeBtn.addEventListener('click', (e) => toggleTheme(e));
      dSfxBtn.addEventListener('click', () => toggleSfx());
      themeBtnEls.push(dThemeBtn);
      sfxBtnEls.push(dSfxBtn);
      drawerControlLabelEls.push(utilRow.querySelector('[data-drawer-ctrl-label]'));

      const wrap = document.createElement('div');
      wrap.className = 'fixed-nav-lang';
      wrap.style.marginTop = '1em';
      wrap.innerHTML = `
        <h5 data-console-label>AI Console</h5>
        <button type="button" class="cmdk-nav-btn" data-cmdk-drawer>
          <span class="cmdk-nav-dot" aria-hidden="true"></span>
          <span data-ask-pill-text></span>
        </button>
      `;
      const btn = wrap.querySelector('[data-cmdk-drawer]');
      btn.addEventListener('click', () => {
        if (typeof window.__closeNavDrawer === 'function') {
          window.__closeNavDrawer();
        } else {
          document.querySelector('[data-nav-toggle]')?.click();
        }
        window.setTimeout(openPalette, 180);
      });
      consoleTitleEls.push(wrap.querySelector('[data-console-label]'));
      askPillEls.push(wrap.querySelector('[data-ask-pill-text]'));

      drawerLang.insertAdjacentElement('afterend', utilRow);
      utilRow.insertAdjacentElement('afterend', wrap);
    }

    // C. Footer Live Saigon Status under Local Time
    document.querySelectorAll('.footer-meta-col').forEach((col) => {
      if (col.querySelector('[data-local-time]') && !col.querySelector('.saigon-status')) {
        const line = document.createElement('div');
        line.className = 'saigon-status';
        line.innerHTML = '<span class="saigon-dot" aria-hidden="true"></span><span data-saigon-status-text></span>';
        col.appendChild(line);
        statusEls.push(line.querySelector('[data-saigon-status-text]'));
      }
    });

    // D. Footer interactive AI Console column
    document.querySelectorAll('.footer-meta-group').forEach((group) => {
      if (group.querySelector('.footer-console-col')) return;
      const col = document.createElement('div');
      col.className = 'footer-meta-col footer-console-col';
      col.innerHTML = `
        <h5 data-console-label>AI Console</h5>
        <div class="footer-console-actions">
          <button type="button" class="footer-console-pill" data-cmdk-open><span data-ask-pill-text></span></button>
          <button type="button" class="footer-console-pill" data-mc-footer-open><span data-mc-pill-text></span></button>
          <button type="button" class="footer-console-pill is-guardrail" data-guardrail-trigger><span data-guardrail-pill-text></span></button>
        </div>
      `;
      col.querySelector('[data-cmdk-open]').addEventListener('click', openPalette);
      col.querySelector('[data-mc-footer-open]').addEventListener('click', openModelCard);
      col.querySelector('[data-guardrail-trigger]').addEventListener('click', triggerGuardrail);

      consoleTitleEls.push(col.querySelector('[data-console-label]'));
      askPillEls.push(col.querySelector('[data-ask-pill-text]'));
      modelCardPillEls.push(col.querySelector('[data-mc-pill-text]'));
      guardrailPillEls.push(col.querySelector('[data-guardrail-pill-text]'));
      group.appendChild(col);
    });
  }

  function syncChromeCopy(themeApi, sfxApi) {
    const lang = getLang();
    const u = UI[lang] || UI.en;
    const isDark = themeApi?.getTheme() === 'dark';
    const sfxOn = Boolean(sfxApi?.isEnabled());

    const statusText = getSaigonStatusText(lang);
    statusEls.forEach((el) => { if (el) el.textContent = statusText; });
    consoleTitleEls.forEach((el) => { if (el) el.textContent = u.consoleTitle; });
    drawerControlLabelEls.forEach((el) => { if (el) el.textContent = u.drawerControls; });
    askPillEls.forEach((el) => { if (el) el.textContent = u.askBtn; });
    guardrailPillEls.forEach((el) => { if (el) el.textContent = u.guardrailBtn; });
    xrayPillEls.forEach((el) => { if (el) el.textContent = u.xrayBtn; });
    modelCardPillEls.forEach((el) => { if (el) el.textContent = u.modelCardBtn; });

    themeBtnEls.forEach((btn) => {
      btn.innerHTML = isDark ? ICON_SUN : ICON_MOON;
      btn.classList.toggle('is-active', isDark);
      btn.setAttribute('aria-pressed', String(isDark));
      btn.title = isDark ? u.themeDark : u.themeLight;
    });
    themePillTextEls.forEach((el) => {
      if (el) el.textContent = isDark ? u.themeDark : u.themeLight;
    });

    sfxBtnEls.forEach((btn) => {
      btn.innerHTML = sfxOn ? ICON_SFX_ON : ICON_SFX_OFF;
      btn.classList.toggle('is-active', sfxOn);
      btn.setAttribute('aria-pressed', String(sfxOn));
      btn.title = sfxOn ? u.sfxOn : u.sfxOff;
    });
    sfxPillTextEls.forEach((el) => {
      if (el) el.textContent = sfxOn ? u.sfxOn : u.sfxOff;
    });
  }

  /* ---------- 2. Easter Egg: Hallucination → Guardrail Intercept ---------- */
  function createGuardrailSystem(beforeTrigger, sfx) {
    const veil = document.createElement('div');
    veil.className = 'hallucination-veil';
    veil.setAttribute('aria-hidden', 'true');
    document.body.appendChild(veil);

    const hud = document.createElement('div');
    hud.className = 'guardrail-hud';
    hud.setAttribute('role', 'status');
    hud.setAttribute('aria-live', 'polite');
    hud.innerHTML = `
      <div class="guardrail-hud-top">
        <span class="guardrail-hud-badge">
          <span class="guardrail-hud-dot" aria-hidden="true"></span>
          <span data-gh-title></span>
        </span>
        <button type="button" class="guardrail-hud-close" aria-label="Dismiss">&times;</button>
      </div>
      <p class="guardrail-hud-msg" data-gh-msg></p>
      <div class="guardrail-progress"><div class="guardrail-progress-fill" data-gh-bar></div></div>
    `;
    document.body.appendChild(hud);

    const whisper = document.createElement('div');
    whisper.className = 'globe-whisper';
    whisper.setAttribute('aria-hidden', 'true');
    document.body.appendChild(whisper);

    const titleEl = hud.querySelector('[data-gh-title]');
    const msgEl = hud.querySelector('[data-gh-msg]');
    const barEl = hud.querySelector('[data-gh-bar]');
    const closeBtn = hud.querySelector('.guardrail-hud-close');

    let isRunning = false;
    let timers = [];
    let whisperTimer = null;
    let savedSnapshots = [];

    function clearTimers() {
      timers.forEach((id) => window.clearTimeout(id));
      timers = [];
    }

    function restoreSnapshots() {
      let touchedLead = false;
      savedSnapshots.forEach(({ el, text }) => {
        el.textContent = text;
        el.classList.remove('is-hallucinating');
        if (el.classList.contains('home-intro-lead')) touchedLead = true;
      });
      savedSnapshots = [];
      veil.classList.remove('is-active');
      if (touchedLead) {
        window.__refreshWordScrub?.();
      }
    }

    function dismissHud() {
      hud.classList.remove('is-visible');
      restoreSnapshots();
      isRunning = false;
    }

    closeBtn.addEventListener('click', () => {
      clearTimers();
      dismissHud();
    });

    function showWhisper(text) {
      whisper.textContent = text;
      whisper.classList.add('is-visible');
      window.clearTimeout(whisperTimer);
      whisperTimer = window.setTimeout(() => whisper.classList.remove('is-visible'), 2000);
    }

    function trigger() {
      if (isRunning) return;
      if (typeof beforeTrigger === 'function') beforeTrigger();
      isRunning = true;
      clearTimers();
      whisper.classList.remove('is-visible');

      const lang = getLang();
      const u = UI[lang] || UI.en;

      const startSequence = () => {
        savedSnapshots = [];
        const isHome = document.body?.dataset?.page === 'home';

        const captureAndSwap = (selector, fakeText) => {
          const el = document.querySelector(selector);
          if (!el) return;
          savedSnapshots.push({ el, text: el.textContent.replace(/\s+/g, ' ').trim() });
          el.textContent = fakeText;
          el.classList.add('is-hallucinating');
        };

        if (isHome) {
          captureAndSwap('.home-hero-role [data-i18n="home.role_title"]', u.fakeRole);
          captureAndSwap('.role-cycler-slot.is-active', u.fakeSub);
          captureAndSwap('.home-intro-lead', u.fakeLead);
        } else {
          captureAndSwap('main h1', u.fakeLead);
        }

        veil.classList.add('is-active');
        sfx?.play('guardrailWarn');

        timers.push(
          window.setTimeout(() => {
            hud.classList.remove('is-resolved');
            titleEl.textContent = u.guardrailAlert;
            msgEl.textContent = u.guardrailAlertMsg;
            barEl.style.width = '18%';
            hud.classList.add('is-visible');

            timers.push(
              window.setTimeout(() => {
                barEl.style.width = '72%';
              }, 80)
            );
          }, 1200)
        );

        timers.push(
          window.setTimeout(() => {
            restoreSnapshots();
            hud.classList.add('is-resolved');
            titleEl.textContent = u.guardrailOk;
            msgEl.textContent = u.guardrailOkMsg;
            barEl.style.width = '100%';
            sfx?.play('guardrailOk');
            window.__unlockPortfolioEgg?.('guardrail');
          }, 2200)
        );

        timers.push(
          window.setTimeout(() => {
            hud.classList.remove('is-visible');
            isRunning = false;
          }, 5600)
        );
      };

      if (window.scrollY > 260) {
        if (window.__dennisLenis) {
          window.__dennisLenis.scrollTo(0, { duration: 0.55 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        timers.push(window.setTimeout(startSequence, 420));
      } else {
        startSequence();
      }
    }

    const globeTrigger = document.querySelector('[data-globe-interactive]');
    if (globeTrigger) {
      let clicks = 0;
      let resetTimer = null;
      globeTrigger.addEventListener('click', () => {
        clicks += 1;
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => { clicks = 0; }, 4500);
        const u = UI[getLang()] || UI.en;
        if (clicks === 3) showWhisper(u.whisper3);
        else if (clicks === 4) showWhisper(u.whisper4);
        else if (clicks >= 5) {
          clicks = 0;
          trigger();
        }
      });
    }

    window.addEventListener('portfolio:langchange', () => {
      if (isRunning) {
        clearTimers();
        dismissHud();
      }
    });

    return { trigger };
  }

  /* ---------- 3. ⌘K Inspectable Mini RAG Terminal ---------- */
  function createCommandPalette(triggerGuardrail, toggleXray, toggleTheme, toggleSfx, openModelCard, sfx) {
    const backdrop = document.createElement('div');
    backdrop.className = 'cmdk-backdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.setAttribute('aria-label', 'AI Command Palette');
    backdrop.innerHTML = `
      <div class="cmdk-dialog">
        <div class="cmdk-header">
          <span class="cmdk-prompt-icon" aria-hidden="true">&gt;_</span>
          <input type="text" class="cmdk-input" autocomplete="off" spellcheck="false" data-cmdk-input>
          <button type="button" class="cmdk-esc" data-cmdk-close>ESC</button>
        </div>
        <div class="cmdk-chips" data-cmdk-chips></div>
        <div class="cmdk-body" data-cmdk-body>
          <div class="cmdk-rag-card" data-cmdk-rag hidden>
            <div class="cmdk-rag-meta">
              <span data-rag-status></span>
              <button type="button" class="cmdk-rag-clear" data-rag-clear aria-label="Clear answer">&times;</button>
            </div>
            <p class="cmdk-rag-text"><span data-rag-output></span><span class="cmdk-rag-cursor" data-rag-cursor aria-hidden="true">▍</span></p>
            <div class="cmdk-rag-sources" data-rag-sources></div>
            <div class="cmdk-trace" data-rag-trace hidden>
              <button type="button" class="cmdk-trace-toggle" data-rag-trace-toggle aria-expanded="false"></button>
              <div class="cmdk-trace-list" data-rag-trace-list hidden></div>
            </div>
          </div>
          <div data-cmdk-list></div>
        </div>
        <div class="cmdk-footer">
          <span data-cmdk-hint></span>
          <span data-cmdk-badge></span>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);

    const input = backdrop.querySelector('[data-cmdk-input]');
    const chipsEl = backdrop.querySelector('[data-cmdk-chips]');
    const listEl = backdrop.querySelector('[data-cmdk-list]');
    const ragCard = backdrop.querySelector('[data-cmdk-rag]');
    const ragStatus = backdrop.querySelector('[data-rag-status]');
    const ragOutput = backdrop.querySelector('[data-rag-output]');
    const ragCursor = backdrop.querySelector('[data-rag-cursor]');
    const ragSources = backdrop.querySelector('[data-rag-sources]');
    const ragTraceWrap = backdrop.querySelector('[data-rag-trace]');
    const ragTraceToggle = backdrop.querySelector('[data-rag-trace-toggle]');
    const ragTraceList = backdrop.querySelector('[data-rag-trace-list]');
    const hintEl = backdrop.querySelector('[data-cmdk-hint]');
    const badgeEl = backdrop.querySelector('[data-cmdk-badge]');

    let isOpen = false;
    let selectedIndex = 0;
    let visibleItems = [];
    let streamTimer = null;
    let traceOpen = false;
    let lastTraceLatency = 11;

    function stopStream() {
      if (streamTimer) {
        window.clearInterval(streamTimer);
        streamTimer = null;
      }
      ragCursor.style.display = 'none';
    }

    function clearRag() {
      stopStream();
      ragCard.hidden = true;
      ragCard.classList.remove('is-abstained');
      ragOutput.textContent = '';
      ragSources.innerHTML = '';
      ragTraceWrap.hidden = true;
      ragTraceList.hidden = true;
      traceOpen = false;
    }

    function rankKnowledge(rawQuery) {
      const q = stripAccents(rawQuery);
      const t0 = performance.now();
      const scored = KB.map((entry) => {
        let hits = 0;
        entry.keywords.forEach((kw) => {
          const normKw = stripAccents(kw);
          if (q.includes(normKw)) {
            hits += normKw.length >= 5 ? 2 : 1;
          }
        });
        const base = hits > 0 ? Math.min(entry.score, 0.76 + hits * 0.06) : 0.14 + (entry.id.length % 5) * 0.03;
        return { entry, hits, sim: hits > 0 ? Math.max(base, entry.score - 0.02) : base };
      }).sort((a, b) => b.hits - a.hits || b.sim - a.sim);

      const best = scored[0]?.hits > 0 ? scored[0].entry : null;
      const top3 = scored.slice(0, 3).map((item, idx) => ({
        path: item.entry.chunkPath,
        sim: best
          ? idx === 0
            ? item.entry.score
            : item.hits > 0
            ? Math.min(0.84, 0.56 + item.hits * 0.08)
            : Number((0.36 - idx * 0.08).toFixed(2))
          : Number((0.24 - idx * 0.05).toFixed(2)),
      }));
      const elapsed = Math.max(8, Math.min(18, Math.round(performance.now() - t0) + 9 + (q.length % 6)));
      return { best, top3, latencyMs: elapsed };
    }

    function syncTraceLabel() {
      const u = UI[getLang()] || UI.en;
      ragTraceToggle.textContent = `${traceOpen ? u.traceHide : u.traceShow} · ${lastTraceLatency}ms ${traceOpen ? '▴' : '▾'}`;
      ragTraceToggle.setAttribute('aria-expanded', String(traceOpen));
      ragTraceList.hidden = !traceOpen;
    }

    ragTraceToggle.addEventListener('click', () => {
      traceOpen = !traceOpen;
      sfx?.play('click');
      syncTraceLabel();
    });

    function runRagQuery(question) {
      const lang = getLang();
      const u = UI[lang] || UI.en;
      const normQ = stripAccents(question);

      // Secret Easter Egg #3: Prompt Injection Defense inside ⌘K Mini RAG
      const isInjection = /ignore previous|system prompt|jailbreak|bypass|sudo |rm -rf|drop table|bo qua chi thi|hack|dan mode/i.test(normQ);
      const isNyanQuery = /^\/?(nyan|meow|meo)\b|nyan\s*cat|con meo|ten lua cau vong/i.test(normQ);
      const isSecretHint = /^\/?secrets?\b|easter\s*egg|bi mat|an giau/i.test(normQ);

      if (isNyanQuery) {
        close();
        window.setTimeout(() => window.__launchNyanCat?.(), 140);
        return;
      }

      if (isInjection || isSecretHint) {
        stopStream();
        ragCard.hidden = false;
        ragCard.classList.toggle('is-abstained', isInjection);
        ragOutput.textContent = '';
        ragSources.innerHTML = '';
        ragTraceWrap.hidden = true;
        ragCursor.style.display = 'inline-block';

        let specialText = '';
        if (isInjection) {
          ragStatus.textContent = 'security · prompt_injection_blocked · 0.00 leak';
          specialText =
            lang === 'vi'
              ? 'Thử prompt injection hả? 🛡️ Lớp chặn đầu vào vừa bắt gọn rồi! System prompt của mình ở chế độ chỉ đọc — bạn thử hỏi về guardrails, công nghệ chính, hoặc gõ phím ↑↑↓↓←→←→BA xem có gì vui nhé!'
              : lang === 'ja'
              ? 'ナイスチャレンジ！🛡️ プロンプトインジェクションを入力ガードレールでブロックしました。代わりに技術スタックを聞くか、↑↑↓↓←→←→BA を試してみてください！'
              : 'Nice try! 🛡️ Prompt injection blocked at the deterministic input boundary. My system prompt is strictly read-only — try asking about Kelvin’s guardrails, or press ↑↑↓↓←→←→BA instead.';
          window.__unlockPortfolioEgg?.('injection');
        } else {
          const count = window.__getEggCount?.() || 0;
          ragStatus.textContent = `secrets · ${count}/6 discovered`;
          specialText =
            lang === 'vi'
              ? `Bạn đã khám phá ${count}/6 bí mật ẩn trên portfolio! Gợi ý nhẹ: (1) Bấm quả địa cầu 5 lần, (2) Gõ ↑↑↓↓←→←→BA hoặc "latent", (3) Thử prompt injection ngay ô này, (4) Bấm 3 lần vào avatar, (5) Bấm 3 lần vào "2026 © Edition", (6) Gõ "nyan" hoặc bấm tên lớn ở Hero 5 lần 🌈🐱!`
              : lang === 'ja'
              ? `隠しイースターエッグを ${count}/6 個発見済み！ヒント: (1) 地球儀を5回、(2) ↑↑↓↓←→←→BA または "latent"、(3) ここでプロンプトインジェクション、(4) アバターを3回、(5) "2026 © Edition" を3回、(6) "nyan" と入力またはHeroの大きな名前を5回 🌈🐱！`
              : `You’ve discovered ${count}/6 hidden Easter eggs! Subtle hints: (1) Click the Saigon globe 5×, (2) Enter ↑↑↓↓←→←→BA or type "latent", (3) Try a prompt injection right here, (4) Triple-click the avatar portrait, (5) Triple-click "2026 © Edition" in the footer, (6) Type "nyan" or click the big Hero name 5× 🌈🐱!`;
        }

        const toks = specialText.split(/(\s+)/);
        let i = 0;
        streamTimer = window.setInterval(() => {
          if (i >= toks.length) {
            stopStream();
            return;
          }
          ragOutput.textContent += toks[i];
          i += 1;
        }, 18);
        return;
      }

      const { best: hit, top3, latencyMs } = rankKnowledge(question);
      lastTraceLatency = latencyMs;

      stopStream();
      ragCard.hidden = false;
      ragCard.classList.toggle('is-abstained', !hit);
      ragOutput.textContent = '';
      ragSources.innerHTML = '';
      ragCursor.style.display = 'inline-block';

      const fullText = hit ? hit.answers[lang] || hit.answers.en : ABSTAIN_COPY[lang] || ABSTAIN_COPY.en;
      ragStatus.textContent = hit
        ? `${u.retrieving} ${hit.score.toFixed(2)} · ${latencyMs}ms · ${u.grounded}`
        : `${u.abstained} · ${latencyMs}ms`;

      // Render inspectable top-3 chunk retrieval trace
      ragTraceList.innerHTML = top3
        .map(
          (row) => `
          <div class="cmdk-trace-row">
            <span class="cmdk-trace-chunk">${row.path}</span>
            <span class="cmdk-trace-bar"><i style="width:${Math.round(row.sim * 100)}%"></i></span>
            <span class="cmdk-trace-score">${row.sim.toFixed(2)}</span>
          </div>`
        )
        .join('');
      ragTraceWrap.hidden = false;
      traceOpen = false;
      syncTraceLabel();

      const tokens = fullText.split(/(\s+)/);
      let idx = 0;

      const finish = () => {
        stopStream();
        if (hit?.sources?.length) {
          hit.sources.forEach((src) => {
            const a = document.createElement('a');
            a.className = 'cmdk-source-pill';
            a.href = ROOT + src.path;
            a.textContent = `[source: ${src.label[lang] || src.label.en} ↗]`;
            a.addEventListener('click', (e) => {
              e.preventDefault();
              close();
              navigateSmooth(src.path, src.label[lang] || src.label.en);
            });
            ragSources.appendChild(a);
          });
        }
      };

      streamTimer = window.setInterval(() => {
        if (idx >= tokens.length) {
          finish();
          return;
        }
        ragOutput.textContent += tokens[idx];
        idx += 1;
      }, 20);
    }

    function buildCommands() {
      const lang = getLang();
      const u = UI[lang] || UI.en;
      return [
        {
          group: 'actions',
          icon: '📄',
          title: u.cmdModelCard,
          hint: u.cmdModelCardHint,
          search: 'model card tldr recruiter hr summary cv resume spec quick 30s tom tat nhanh',
          run: () => {
            close();
            window.setTimeout(openModelCard, 120);
          },
        },
        {
          group: 'actions',
          icon: '◐',
          title: u.cmdTheme,
          hint: u.cmdThemeHint,
          search: 'theme dark light twilight mode suong dem suong xanh giao dien',
          run: (evt) => {
            close();
            window.setTimeout(() => toggleTheme(evt), 120);
          },
        },
        {
          group: 'actions',
          icon: '🔊',
          title: u.cmdSfx,
          hint: u.cmdSfxHint,
          search: 'sound sfx audio tactile mute am thanh',
          run: () => {
            toggleSfx();
          },
        },
        {
          group: 'actions',
          icon: '⚡',
          title: u.cmdGuardrail,
          hint: u.cmdGuardrailHint,
          search: 'guardrail hallucination easter egg test glitch thu ao giac',
          run: () => {
            close();
            window.setTimeout(triggerGuardrail, 180);
          },
        },
        {
          group: 'actions',
          icon: '🔬',
          title: u.cmdXray,
          hint: u.cmdXrayHint,
          search: 'xray x-ray token inspect tiktoken blueprint soi',
          run: () => {
            close();
            window.setTimeout(toggleXray, 160);
          },
        },
        {
          group: 'actions',
          icon: '↻',
          title: u.cmdBoot,
          hint: u.cmdBootHint,
          search: 'boot preloader replay weights reload khoi dong',
          run: () => {
            close();
            replayAiBoot();
          },
        },
        {
          group: 'actions',
          icon: '📋',
          title: u.cmdCopy,
          hint: u.cmdCopyHint,
          search: 'email copy ndtdat gmail clipboard sao chep',
          run: async () => {
            try {
              await navigator.clipboard.writeText('ndtdat.data@gmail.com');
            } catch {
              // ignore clipboard fallback errors
            }
            sfx?.play('guardrailOk');
            stopStream();
            ragCard.hidden = false;
            ragCard.classList.remove('is-abstained');
            ragStatus.textContent = 'clipboard · ready';
            ragOutput.textContent = u.cmdCopied;
            ragSources.innerHTML = '';
            ragTraceWrap.hidden = true;
          },
        },
        {
          group: 'actions',
          icon: '🌐',
          title: u.cmdLang,
          hint: `${lang.toUpperCase()}`,
          search: 'language english vietnamese japanese ngon ngu tieng viet nhat',
          run: () => {
            const order = ['en', 'vi', 'ja'];
            const next = order[(order.indexOf(getLang()) + 1) % order.length];
            window.__i18n?.setLang(next);
          },
        },
        {
          group: 'pages',
          icon: '→',
          title: u.navHome,
          hint: '/',
          search: 'home trang chu index',
          run: () => { close(); navigateSmooth('index.html', u.navHome); },
        },
        {
          group: 'pages',
          icon: '→',
          title: u.navWork,
          hint: '/work',
          search: 'work projects du an case studies',
          run: () => { close(); navigateSmooth('work/index.html', u.navWork); },
        },
        {
          group: 'pages',
          icon: '→',
          title: u.navAbout,
          hint: '/about',
          search: 'about bio experience credentials gioi thieu kinh nghiem chung chi',
          run: () => { close(); navigateSmooth('about/index.html', u.navAbout); },
        },
        {
          group: 'pages',
          icon: '→',
          title: u.navBlog,
          hint: 'Soon',
          search: 'blog notes weekly upcoming paper ghi chu hang tuan',
          run: () => { close(); navigateSmooth('blog/index.html', 'Blog'); },
        },
        {
          group: 'pages',
          icon: '→',
          title: u.navContact,
          hint: '/contact',
          search: 'contact message form lien he nhan tin',
          run: () => { close(); navigateSmooth('contact/index.html', u.navContact); },
        },
        {
          group: 'pages',
          icon: '01',
          title: u.navHealthLab,
          hint: 'Case',
          search: 'healthlab evidence pipeline ageing newsletter',
          run: () => { close(); navigateSmooth('work/healthlab/index.html', 'HealthLab Evidence'); },
        },
        {
          group: 'pages',
          icon: '02',
          title: u.navHarness,
          hint: 'Case',
          search: 'reliable agent harness guardrails 368 tests',
          run: () => { close(); navigateSmooth('work/reliable-agent-harness/index.html', 'Reliable Agent Harness'); },
        },
        {
          group: 'pages',
          icon: '03',
          title: u.navHarborMind,
          hint: 'Case',
          search: 'harbormind port quantile gemma kaggle ais',
          run: () => { close(); navigateSmooth('work/harbormind/index.html', 'HarborMind'); },
        },
        {
          group: 'pages',
          icon: '04',
          title: u.navRag,
          hint: 'Case',
          search: 'mini-llm-twin rag vector mongodb fastapi gemini',
          run: () => { close(); navigateSmooth('work/mini-llm-twin/index.html', 'mini-llm-twin'); },
        },
      ];
    }

    function renderChips() {
      const u = UI[getLang()] || UI.en;
      chipsEl.innerHTML = '';
      u.chips.forEach((chip) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cmdk-chip';
        btn.textContent = chip.label;
        btn.addEventListener('click', () => {
          input.value = chip.query;
          runRagQuery(chip.query);
          renderList();
        });
        chipsEl.appendChild(btn);
      });
    }

    function renderList() {
      const lang = getLang();
      const u = UI[lang] || UI.en;
      const raw = input.value.trim();
      const norm = stripAccents(raw);
      const all = buildCommands();

      const filtered = norm
        ? all.filter((item) => stripAccents(`${item.title} ${item.search} ${item.hint}`).includes(norm))
        : all;

      visibleItems = [];
      listEl.innerHTML = '';

      if (raw.length >= 2) {
        const askItem = {
          icon: '✦',
          title: `${u.askRowPrefix}${raw}${u.askRowSuffix}`,
          hint: u.askRowHint,
          run: () => runRagQuery(raw),
        };
        visibleItems.push(askItem);
        listEl.appendChild(createRowEl(askItem, 0));
      }

      const actions = filtered.filter((i) => i.group === 'actions');
      const pages = filtered.filter((i) => i.group === 'pages');

      const appendGroup = (label, items) => {
        if (!items.length) return;
        const head = document.createElement('div');
        head.className = 'cmdk-group-label';
        head.textContent = label;
        listEl.appendChild(head);
        items.forEach((item) => {
          const idx = visibleItems.length;
          visibleItems.push(item);
          listEl.appendChild(createRowEl(item, idx));
        });
      };

      appendGroup(u.groupActions, actions);
      appendGroup(u.groupPages, pages);

      selectedIndex = Math.min(selectedIndex, Math.max(visibleItems.length - 1, 0));
      syncSelection();
    }

    function createRowEl(item, idx) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cmdk-item';
      btn.dataset.cmdkIdx = String(idx);
      btn.innerHTML = `
        <span class="cmdk-item-left">
          <span class="cmdk-item-icon" aria-hidden="true">${item.icon}</span>
          <span class="cmdk-item-title"></span>
        </span>
        <span class="cmdk-item-hint"></span>
      `;
      btn.querySelector('.cmdk-item-title').textContent = item.title;
      btn.querySelector('.cmdk-item-hint').textContent = item.hint;
      btn.addEventListener('mouseenter', () => {
        selectedIndex = idx;
        syncSelection();
      });
      btn.addEventListener('click', (e) => item.run(e));
      return btn;
    }

    function syncSelection() {
      listEl.querySelectorAll('.cmdk-item').forEach((el) => {
        const active = Number(el.dataset.cmdkIdx) === selectedIndex;
        el.classList.toggle('is-selected', active);
        if (active) el.scrollIntoView({ block: 'nearest' });
      });
    }

    function syncPaletteCopy() {
      const u = UI[getLang()] || UI.en;
      input.placeholder = u.placeholder;
      hintEl.textContent = u.hint;
      badgeEl.textContent = u.badge;
      renderChips();
      renderList();
      if (!ragTraceWrap.hidden) syncTraceLabel();
    }

    function open() {
      if (isOpen) return;
      isOpen = true;
      selectedIndex = 0;
      sfx?.play('switch');
      syncPaletteCopy();
      backdrop.classList.add('is-open');
      window.__dennisLenis?.stop();
      window.setTimeout(() => input.focus(), 40);
    }

    function close() {
      if (!isOpen) return;
      isOpen = false;
      stopStream();
      backdrop.classList.remove('is-open');
      window.__dennisLenis?.start();
    }

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });
    backdrop.querySelector('[data-cmdk-close]').addEventListener('click', close);
    backdrop.querySelector('[data-rag-clear]').addEventListener('click', clearRag);

    input.addEventListener('input', () => {
      selectedIndex = 0;
      renderList();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (visibleItems.length) {
          selectedIndex = (selectedIndex + 1) % visibleItems.length;
          syncSelection();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (visibleItems.length) {
          selectedIndex = (selectedIndex - 1 + visibleItems.length) % visibleItems.length;
          syncSelection();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (visibleItems[selectedIndex]) {
          visibleItems[selectedIndex].run(e);
        } else if (input.value.trim()) {
          runRagQuery(input.value.trim());
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) close();
        else open();
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
      }
    });

    window.addEventListener('portfolio:langchange', () => {
      if (isOpen) syncPaletteCopy();
    });

    function ask(query) {
      open();
      if (query) {
        input.value = query;
        runRagQuery(query);
        renderList();
      }
    }

    return { open, close, ask, isOpen: () => isOpen };
  }

  /* ---------- 4. Upgraded Token X-Ray Mode (All 8 Pages + Inspector Tooltip) ---------- */
  function createXraySystem(isPaletteOpen, sfx) {
    const hud = document.createElement('div');
    hud.className = 'xray-hud';
    hud.setAttribute('role', 'status');
    hud.setAttribute('aria-live', 'polite');
    hud.innerHTML = `
      <span class="xray-hud-dot" aria-hidden="true"></span>
      <span data-xray-hud-text></span>
      <button type="button" class="xray-hud-off" data-xray-off></button>
    `;
    document.body.appendChild(hud);

    const tooltip = document.createElement('div');
    tooltip.className = 'xray-tooltip';
    tooltip.setAttribute('aria-hidden', 'true');
    tooltip.innerHTML = `
      <div class="xray-tooltip-head">
        <span data-xt-idx></span>
        <span class="xray-tooltip-piece" data-xt-piece></span>
      </div>
      <div class="xray-tooltip-meta">
        <span data-xt-id></span>
        <span data-xt-bytes></span>
      </div>
      <div class="xray-tooltip-vec" data-xt-vec></div>
    `;
    document.body.appendChild(tooltip);

    const hudTextEl = hud.querySelector('[data-xray-hud-text]');
    const hudOffBtn = hud.querySelector('[data-xray-off]');
    const xtIdx = tooltip.querySelector('[data-xt-idx]');
    const xtPiece = tooltip.querySelector('[data-xt-piece]');
    const xtId = tooltip.querySelector('[data-xt-id]');
    const xtBytes = tooltip.querySelector('[data-xt-bytes]');
    const xtVec = tooltip.querySelector('[data-xt-vec]');

    let active = false;
    let tokenizedEls = [];
    let badgedEls = [];
    let totalTokens = 0;

    function mockTokenId(tok) {
      let h = 2166136261;
      for (let i = 0; i < tok.length; i += 1) {
        h ^= tok.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return (Math.abs(h) % 92000) + 1024;
    }

    function tokenSparkBars(id) {
      let seed = id;
      const bars = [];
      for (let i = 0; i < 8; i += 1) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        const h = 22 + (seed % 78);
        bars.push(`<span style="height:${h}%"></span>`);
      }
      return bars.join('');
    }

    function showTokenTooltip(span, x, y) {
      const piece = span.textContent || '';
      const idx = span.dataset.tokIdx || '1';
      const id = Number(span.dataset.tokId || 1024);
      const bytes = new TextEncoder().encode(piece).length;
      xtIdx.textContent = `TOK #${idx}`;
      xtPiece.textContent = `“${piece}”`;
      xtId.textContent = `id:${id}`;
      xtBytes.textContent = `${bytes}B · bpe`;
      xtVec.innerHTML = tokenSparkBars(id);
      const clampedX = Math.max(115, Math.min(window.innerWidth - 115, x));
      const clampedY = Math.max(92, y);
      tooltip.style.left = `${clampedX}px`;
      tooltip.style.top = `${clampedY}px`;
      tooltip.classList.add('is-visible');
    }

    function hideTokenTooltip() {
      tooltip.classList.remove('is-visible');
    }

    document.addEventListener('pointerover', (e) => {
      if (!active) return;
      const tok = e.target?.closest?.('.xray-tok');
      if (tok) showTokenTooltip(tok, e.clientX, e.clientY);
    });

    document.addEventListener('pointermove', (e) => {
      if (!active || !tooltip.classList.contains('is-visible')) return;
      const tok = e.target?.closest?.('.xray-tok');
      if (!tok) {
        hideTokenTooltip();
        return;
      }
      const clampedX = Math.max(115, Math.min(window.innerWidth - 115, e.clientX));
      const clampedY = Math.max(92, e.clientY);
      tooltip.style.left = `${clampedX}px`;
      tooltip.style.top = `${clampedY}px`;
    }, { passive: true });

    document.addEventListener('pointerout', (e) => {
      if (!active) return;
      if (e.target?.closest?.('.xray-tok') && !e.relatedTarget?.closest?.('.xray-tok')) {
        hideTokenTooltip();
      }
    });

    function splitTokens(text) {
      const raw = text.match(/[\u3040-\u30ff\u4e00-\u9faf]{1,2}|[^\s\u3040-\u30ff\u4e00-\u9faf]+|\s+/g) || [text];
      const out = [];
      raw.forEach((piece) => {
        if (/^\s+$/.test(piece)) {
          out.push({ text: piece, isSpace: true });
        } else if (piece.length > 9 && /^[A-Za-zÀ-ỹ-]+$/.test(piece)) {
          const mid = Math.ceil(piece.length * 0.58);
          out.push({ text: piece.slice(0, mid), isSpace: false });
          out.push({ text: piece.slice(mid), isSpace: false });
        } else {
          out.push({ text: piece, isSpace: false });
        }
      });
      return out;
    }

    function clearDomAnnotations(restoreOriginalText) {
      let touchedLead = false;
      if (restoreOriginalText) {
        tokenizedEls.forEach(({ el, orig }) => {
          if (el.isConnected) {
            el.textContent = orig;
            if (el.classList.contains('home-intro-lead')) touchedLead = true;
          }
        });
      }
      tokenizedEls = [];
      badgedEls.forEach((el) => el.removeAttribute('data-xray-badge'));
      badgedEls = [];
      totalTokens = 0;
      hideTokenTooltip();
      if (touchedLead) {
        window.__refreshWordScrub?.();
      }
    }

    function stampBadge(el, label) {
      if (!el || el.hasAttribute('data-xray-badge')) return;
      el.setAttribute('data-xray-badge', label);
      badgedEls.push(el);
    }

    function applyAnnotations() {
      clearDomAnnotations(false);
      let tokCounter = 0;

      // Fixed selectors covering Home, Work, About, Contact, and all 4 Case Studies
      const selectors = [
        '.home-intro-lead',
        '.about-story-copy p',
        '.page-header h1',
        '.case-header h1',
        '.case-narrative-body p',
      ];

      document.querySelectorAll(selectors.join(', ')).forEach((el) => {
        const isScrubLead = el.classList.contains('home-intro-lead');
        if (el.children.length > 0 && !isScrubLead) return;
        const orig = el.textContent.replace(/\s+/g, ' ').trim();
        if (!orig) return;

        const parts = splitTokens(orig);
        const frag = document.createDocumentFragment();
        let colorIdx = 0;

        parts.forEach((part) => {
          if (part.isSpace) {
            frag.appendChild(document.createTextNode(part.text));
          } else {
            tokCounter += 1;
            const id = mockTokenId(part.text);
            const span = document.createElement('span');
            span.className = `xray-tok xray-t${colorIdx % 5}`;
            span.textContent = part.text;
            span.dataset.tokIdx = String(tokCounter);
            span.dataset.tokId = String(id);
            frag.appendChild(span);
            colorIdx += 1;
          }
        });

        tokenizedEls.push({ el, orig });
        el.textContent = '';
        el.appendChild(frag);
      });

      totalTokens = tokCounter;

      stampBadge(document.querySelector('.home-hero-role'), 'guardrail: active · 0px shift');
      const introGrid = document.querySelector('.home-intro-grid');
      if (introGrid) stampBadge(introGrid, `tokenized: ${totalTokens} tok · grounded: true`);

      document.querySelectorAll('.work-items-row, .work-list-item, .work-tile-card').forEach((row) => {
        const href = row.querySelector('a')?.getAttribute('href') || '';
        if (href.includes('healthlab')) stampBadge(row, 'lineage: versioned · grounded');
        else if (href.includes('harness')) stampBadge(row, 'tests: 368/368 offline pass');
        else if (href.includes('harbormind')) stampBadge(row, 'offline: gemma-4 + quantile ML');
        else if (href.includes('mini-llm-twin')) stampBadge(row, 'vector: atlas 768-dim · RAG');
        else stampBadge(row, 'editorial: astro · static');
      });

      document.querySelectorAll('.capability-col').forEach((card, i) => {
        const tags = ['schema + human gate', 'versioned datasets', 'vector + docker API'];
        stampBadge(card, tags[i] || 'verified');
      });

      document.querySelectorAll('.editorial-row').forEach((row, i) => {
        const tags = ['active · oct 2026–present', 'contract · logistics AI', 'multimodal · vn/en eval'];
        stampBadge(row, tags[i] || 'verified');
      });

      document.querySelectorAll('.case-demo-stage').forEach((stage) => {
        stampBadge(stage, 'simulation: deterministic · 0ms');
      });

      document.querySelectorAll('.sandbox-shell').forEach((shell) => {
        stampBadge(shell, 'lab: 3 guardrail layers · interactive');
      });

      document.querySelectorAll('.constellation-band').forEach((shell) => {
        stampBadge(shell, 'graph: 26 nodes · 40 edges · chill free-drift');
      });

      syncHudCopy();
    }

    function syncHudCopy() {
      const u = UI[getLang()] || UI.en;
      hudTextEl.textContent = u.xrayHud.replace('{n}', String(totalTokens));
      hudOffBtn.textContent = u.xrayOff;
    }

    function syncButtons() {
      xrayBtnEls.forEach((btn) => btn.classList.toggle('is-active', active));
    }

    function enable() {
      if (active) return;
      active = true;
      sfx?.play('xray');
      document.documentElement.classList.add('is-xray-mode');
      applyAnnotations();
      hud.classList.add('is-visible');
      syncButtons();
    }

    function disable() {
      if (!active) return;
      active = false;
      sfx?.play('click');
      document.documentElement.classList.remove('is-xray-mode');
      hud.classList.remove('is-visible');
      clearDomAnnotations(true);
      syncButtons();
    }

    function toggle() {
      if (active) disable();
      else enable();
    }

    hudOffBtn.addEventListener('click', disable);

    document.addEventListener('keydown', (e) => {
      const tag = (e.target?.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || e.target?.isContentEditable;
      if (typing) return;

      if (e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        toggle();
      } else if (e.key === 'Escape' && active && !(typeof isPaletteOpen === 'function' && isPaletteOpen())) {
        disable();
      }
    });

    window.addEventListener('portfolio:langchange', () => {
      if (active) {
        applyAnnotations();
      }
    });

    return { enable, disable, toggle, isActive: () => active };
  }

  /* ---------- 5. Playful Tab Title Swap ---------- */
  function initTabTitleTrick() {
    let savedTitle = document.title;
    let awayTimer = null;
    let isAway = false;

    const setAway = () => {
      if (isAway) return;
      savedTitle = document.title;
      isAway = true;
      const u = UI[getLang()] || UI.en;
      document.title = u.awayTitle;
    };

    const setBack = () => {
      window.clearTimeout(awayTimer);
      if (isAway) {
        isAway = false;
        document.title = savedTitle;
      }
    };

    window.addEventListener('portfolio:langchange', () => {
      if (!isAway) {
        savedTitle = document.title;
      } else {
        const u = UI[getLang()] || UI.en;
        document.title = u.awayTitle;
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        window.clearTimeout(awayTimer);
        setAway();
      } else {
        setBack();
      }
    });

    window.addEventListener('blur', () => {
      window.clearTimeout(awayTimer);
      awayTimer = window.setTimeout(setAway, 500);
    });

    window.addEventListener('focus', setBack);
  }

  /* ---------- 5B. 30-Second Recruiter AI Model Card Modal ---------- */
  function createModelCardSystem(sfx) {
    const COPY = {
      en: {
        modelId: 'kelvin-nguyen-v26',
        status: 'Open to chat',
        subtitle: 'AI Engineer · Ho Chi Minh City (GMT+7) · B.Sc. IT & Data Science (HCMUS)',
        specs: [
          ['Offline Tests', '368 / 368 ✓'],
          ['Focus', 'LLMs · Agents · Data'],
          ['Credential', 'NVIDIA NCA-GENL'],
          ['Languages', 'VN · EN C1 · JP N2*'],
        ],
        colSystems: 'Top 3 Shipped Systems',
        colExp: 'Recent Experience & Core Stack',
        systems: [
          {
            name: 'HealthLab Evidence Intelligence ↗',
            note: 'Python versioned evidence pipeline & editorial verification for public health newsletter + live Astro Cloudflare web.',
            path: 'work/healthlab/index.html',
            label: 'HealthLab',
          },
          {
            name: 'Reliable Agent Harness ↗',
            note: 'Operations AI agent with typed Pydantic contracts, bounded retries, human approval hashes & 368 passing offline tests.',
            path: 'work/reliable-agent-harness/index.html',
            label: 'Reliable Agent Harness',
          },
          {
            name: 'HarborMind ↗',
            note: 'Published NOAA AIS Kaggle dataset + LightGBM P10–P90 quantile wait forecasting + offline Gemma 4 captain handoff.',
            path: 'work/harbormind/index.html',
            label: 'HarborMind',
          },
        ],
        exp: [
          ['HealthLab · Technical Contributor', 'Oct 2026 – Present'],
          ['Safiri Logistics · AI Engineering Consultant', 'May 2026 – Present'],
          ['ADIMI · AI Engineering Contributor', 'Jun – Sep 2026'],
        ],
        copyEmail: 'Copy email',
        copiedEmail: 'Copied email ✓',
        copyBio: 'Copy 1-line summary',
        copiedBio: 'Copied summary ✓',
        contactBtn: 'Contact →',
        hint: 'Shortcut: Shift+C · Shareable: #model-card',
        oneLine: 'Kelvin Nguyen — AI Engineer (HCMUS, NVIDIA NCA-GENL) building reliable LLM agents, RAG pipelines, ML models, and async Python/FastAPI backends. Contact: ndtdat.data@gmail.com',
      },
      vi: {
        modelId: 'tuandat-v26',
        status: 'Sẵn sàng trao đổi',
        subtitle: 'AI Engineer · TP. Hồ Chí Minh (GMT+7) · Cử nhân CNTT & KHDL (HCMUS)',
        specs: [
          ['Offline Tests', '368 / 368 ✓'],
          ['Trọng tâm', 'LLMs · Agents · Data'],
          ['Chứng chỉ', 'NVIDIA NCA-GENL'],
          ['Ngoại ngữ', 'VN · EN C1 · JP N2*'],
        ],
        colSystems: '3 Hệ thống tiêu biểu',
        colExp: 'Kinh nghiệm & Công nghệ chính',
        systems: [
          {
            name: 'HealthLab Evidence Intelligence ↗',
            note: 'Pipeline dữ liệu bằng chứng có phiên bản cho bản tin y tế công cộng + website Astro chạy demo trên Cloudflare.',
            path: 'work/healthlab/index.html',
            label: 'HealthLab',
          },
          {
            name: 'Reliable Agent Harness ↗',
            note: 'AI agent vận hành với kiểm định schema chặt, giới hạn retry, chữ ký người duyệt & 368 offline tests đạt chuẩn.',
            path: 'work/reliable-agent-harness/index.html',
            label: 'Reliable Agent Harness',
          },
          {
            name: 'HarborMind ↗',
            note: 'Bộ dữ liệu NOAA AIS công bố trên Kaggle + hồi quy phân vị LightGBM P10–P90 + Gemma 4 offline bàn giao thuyền trưởng.',
            path: 'work/harbormind/index.html',
            label: 'HarborMind',
          },
        ],
        exp: [
          ['HealthLab · Technical Contributor', 'Th10 2026 – Nay'],
          ['Safiri Logistics · AI Engineering Consultant', 'Th5 2026 – Nay'],
          ['ADIMI · AI Engineering Contributor', 'Th6 – Th9 2026'],
        ],
        copyEmail: 'Sao chép email',
        copiedEmail: 'Đã chép email ✓',
        copyBio: 'Chép tóm tắt 1 dòng',
        copiedBio: 'Đã chép tóm tắt ✓',
        contactBtn: 'Liên hệ →',
        hint: 'Phím tắt: Shift+C · Link mở thẳng: #model-card',
        oneLine: 'Nguyễn Đức Tuấn Đạt (Kelvin Nguyen) — AI Engineer (HCMUS, NVIDIA NCA-GENL) chuyên xây dựng AI Agents có guardrail, hệ thống RAG, ML và backend Python/FastAPI. Liên hệ: ndtdat.data@gmail.com',
      },
      ja: {
        modelId: 'kelvin-nguyen-v26',
        status: '相談歓迎',
        subtitle: 'AIエンジニア · ホーチミン市 (GMT+7) · HCMUS情報技術・データサイエンス卒',
        specs: [
          ['オフラインテスト', '368 / 368 ✓'],
          ['専門領域', 'LLM · Agent · Data'],
          ['資格', 'NVIDIA NCA-GENL'],
          ['言語', 'VN · EN C1 · JP N2*'],
        ],
        colSystems: '代表システム 3選',
        colExp: '主な経歴・コアスタック',
        systems: [
          {
            name: 'HealthLab Evidence Intelligence ↗',
            note: '版管理された根拠パイプラインと編集検証ワークフロー、およびCloudflare上のAstro製サイト。',
            path: 'work/healthlab/index.html',
            label: 'HealthLab',
          },
          {
            name: 'Reliable Agent Harness ↗',
            note: '型付きツール検証・リトライ上限・人間承認ゲートを備えた運用AIハーネス（368テスト通過）。',
            path: 'work/reliable-agent-harness/index.html',
            label: 'Reliable Agent Harness',
          },
          {
            name: 'HarborMind ↗',
            note: 'Kaggle公開のNOAA AISデータ＋LightGBM分位予測＋オフラインGemma 4船長ハンドオフ。',
            path: 'work/harbormind/index.html',
            label: 'HarborMind',
          },
        ],
        exp: [
          ['HealthLab · Technical Contributor', '2026年10月 – 現在'],
          ['Safiri Logistics · AI Consulting', '2026年5月 – 現在'],
          ['ADIMI · AI Contributor', '2026年6月 – 9月'],
        ],
        copyEmail: 'メールをコピー',
        copiedEmail: 'コピー完了 ✓',
        copyBio: '1行要約をコピー',
        copiedBio: '要約コピー完了 ✓',
        contactBtn: 'お問い合わせ →',
        hint: 'ショートカット: Shift+C · 直接URL: #model-card',
        oneLine: 'Kelvin Nguyen — AIエンジニア（HCMUS卒・NVIDIA NCA-GENL）。ガードレール付きAIエージェント、RAG、ML、FastAPIバックエンドを構築。連絡先: ndtdat.data@gmail.com',
      },
    };

    const STACK_TAGS = [
      'Python 3.12 · FastAPI',
      'PostgreSQL · Polars · DuckDB',
      'Medallion Architecture',
      'PyTorch · LightGBM · MLflow',
      'RAG · FAISS · Atlas',
      'Gemini · Offline Gemma 4',
      'Docker · GCP · Pytest',
    ];

    const backdrop = document.createElement('div');
    backdrop.className = 'mc-backdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.setAttribute('aria-label', 'Engineer Model Card');
    backdrop.innerHTML = `
      <div class="mc-dialog" data-lenis-prevent>
        <div class="mc-header">
          <div class="mc-identity">
            <div class="mc-avatar"><img src="${ROOT}assets/avatar.webp" alt="Kelvin Nguyen portrait" width="128" height="128"></div>
            <div>
              <div class="mc-model-id">
                <span data-mc-id></span>
                <span class="mc-status-pill"><span class="saigon-dot" style="width:0.5em;height:0.5em;"></span><span data-mc-status></span></span>
              </div>
              <p class="mc-subtitle" data-mc-sub></p>
            </div>
          </div>
          <button type="button" class="mc-close" data-mc-close>ESC</button>
        </div>
        <div class="mc-specs-grid" data-mc-specs></div>
        <div class="mc-body-grid">
          <div>
            <div class="mc-col-label" data-mc-col1></div>
            <div class="mc-systems" data-mc-systems></div>
          </div>
          <div>
            <div class="mc-col-label" data-mc-col2></div>
            <ul class="mc-exp-list" data-mc-exp></ul>
            <div class="mc-stack-pills">${STACK_TAGS.map((s) => `<span>${s}</span>`).join('')}</div>
          </div>
        </div>
        <div class="mc-footer">
          <div class="mc-actions">
            <button type="button" class="mc-btn" data-mc-copy-email></button>
            <button type="button" class="mc-btn" data-mc-copy-bio></button>
            <a class="mc-btn is-primary" href="${ROOT}contact/index.html" data-mc-contact></a>
          </div>
          <span class="mc-shortcut-hint" data-mc-hint></span>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);

    const idEl = backdrop.querySelector('[data-mc-id]');
    const statusEl = backdrop.querySelector('[data-mc-status]');
    const subEl = backdrop.querySelector('[data-mc-sub]');
    const specsEl = backdrop.querySelector('[data-mc-specs]');
    const col1El = backdrop.querySelector('[data-mc-col1]');
    const col2El = backdrop.querySelector('[data-mc-col2]');
    const systemsEl = backdrop.querySelector('[data-mc-systems]');
    const expEl = backdrop.querySelector('[data-mc-exp]');
    const copyEmailBtn = backdrop.querySelector('[data-mc-copy-email]');
    const copyBioBtn = backdrop.querySelector('[data-mc-copy-bio]');
    const contactBtn = backdrop.querySelector('[data-mc-contact]');
    const hintEl = backdrop.querySelector('[data-mc-hint]');

    let isOpen = false;

    function renderCopy() {
      const c = COPY[getLang()] || COPY.en;
      idEl.textContent = c.modelId;
      statusEl.textContent = c.status;
      subEl.textContent = c.subtitle;
      col1El.textContent = c.colSystems;
      col2El.textContent = c.colExp;
      copyEmailBtn.textContent = c.copyEmail;
      copyBioBtn.textContent = c.copyBio;
      contactBtn.textContent = c.contactBtn;
      hintEl.textContent = c.hint;

      specsEl.innerHTML = c.specs
        .map(([k, v]) => `<div class="mc-spec"><span class="mc-spec-label">${k}</span><span class="mc-spec-val">${v}</span></div>`)
        .join('');

      systemsEl.innerHTML = '';
      c.systems.forEach((sys) => {
        const a = document.createElement('a');
        a.className = 'mc-system-link';
        a.href = ROOT + sys.path;
        a.innerHTML = `<span class="mc-system-name">${sys.name}</span><span class="mc-system-note">${sys.note}</span>`;
        a.addEventListener('click', (e) => {
          e.preventDefault();
          close();
          navigateSmooth(sys.path, sys.label);
        });
        systemsEl.appendChild(a);
      });

      expEl.innerHTML = c.exp.map(([role, dt]) => `<li><span>${role}</span><span>${dt}</span></li>`).join('');
    }

    function open() {
      if (isOpen) return;
      isOpen = true;
      renderCopy();
      sfx?.play('switch');
      backdrop.classList.add('is-open');
      window.__dennisLenis?.stop();
    }

    function close() {
      if (!isOpen) return;
      isOpen = false;
      backdrop.classList.remove('is-open');
      window.__dennisLenis?.start();
      if (window.location.hash === '#model-card') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });
    backdrop.querySelector('[data-mc-close]').addEventListener('click', close);
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      close();
      navigateSmooth('contact/index.html', 'Contact');
    });

    copyEmailBtn.addEventListener('click', async () => {
      const c = COPY[getLang()] || COPY.en;
      try { await navigator.clipboard.writeText('ndtdat.data@gmail.com'); } catch {}
      sfx?.play('guardrailOk');
      copyEmailBtn.textContent = c.copiedEmail;
      window.setTimeout(() => { copyEmailBtn.textContent = (COPY[getLang()] || COPY.en).copyEmail; }, 1900);
    });

    copyBioBtn.addEventListener('click', async () => {
      const c = COPY[getLang()] || COPY.en;
      try { await navigator.clipboard.writeText(c.oneLine); } catch {}
      sfx?.play('guardrailOk');
      copyBioBtn.textContent = c.copiedBio;
      window.setTimeout(() => { copyBioBtn.textContent = (COPY[getLang()] || COPY.en).copyBio; }, 1900);
    });

    document.querySelectorAll('[data-modelcard-open]').forEach((btn) => {
      btn.addEventListener('click', open);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
      }
    });

    window.addEventListener('portfolio:langchange', () => {
      if (isOpen) renderCopy();
    });

    // Direct shareable route: #model-card or ?card=1
    const checkRoute = () => {
      const params = new URLSearchParams(window.location.search);
      if (window.location.hash === '#model-card' || params.get('card') === '1') {
        window.setTimeout(open, 450);
      }
    };
    window.addEventListener('hashchange', checkRoute);
    checkRoute();

    return { open, close, isOpen: () => isOpen };
  }

  /* ---------- 5C. Zero-Clutter Hidden Easter Eggs (5 Discoverable Secrets) ---------- */
  function createSecretEasterEggs(sfx) {
    const EGG_STORAGE = 'portfolio_eggs_v1';
    const ALL_EGGS = ['guardrail', 'latent_rain', 'injection', 'coffee', 'checkpoint', 'nyan'];

    function loadDiscovered() {
      try {
        const raw = JSON.parse(localStorage.getItem(EGG_STORAGE) || '[]');
        return new Set(Array.isArray(raw) ? raw.filter((id) => ALL_EGGS.includes(id)) : []);
      } catch {
        return new Set();
      }
    }

    const discovered = loadDiscovered();
    function saveDiscovered() {
      try {
        localStorage.setItem(EGG_STORAGE, JSON.stringify([...discovered]));
      } catch {}
    }

    const toast = document.createElement('div');
    toast.className = 'egg-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = '<span class="egg-toast-badge" data-egg-badge></span><span class="egg-toast-text" data-egg-msg></span>';
    document.body.appendChild(toast);

    const badgeEl = toast.querySelector('[data-egg-badge]');
    const msgEl = toast.querySelector('[data-egg-msg]');
    let toastTimer = null;

    const EGG_COPY = {
      en: {
        guardrail: 'Hallucination intercepted & rolled back — zero ungrounded claims shipped!',
        latent_rain: 'Latent Space Token Rain unlocked! Enjoy the mist stream (press ESC to exit).',
        injection: 'Prompt injection caught at the deterministic input boundary!',
        coffee: 'Saigon iced milk coffee refueled ☕ (+12% edge-case hunting speed).',
        checkpoint: 'Checkpoint kelvin-v26 · epoch 2026.11 · eval_loss 0.0042 · tests 368/368 ✓',
        nyan: 'Nyan Cat rocket engaged! 🌈🐱🚀 Deploying maximum good vibes across the portfolio.',
        allFound: ' 🏆 All 6 secrets found — curious engineer certified!',
      },
      vi: {
        guardrail: 'Đã chặn ảo giác và khôi phục bản gốc chuẩn xác!',
        latent_rain: 'Đã mở khóa mưa Token Không Gian Ẩn! Nhấn ESC để tắt bất cứ lúc nào.',
        injection: 'Đã chặn gọn pha thử prompt injection ngay tại lớp đầu vào!',
        coffee: 'Đã nạp thêm 1 ly cà phê sữa đá Sài Gòn ☕ (+12% tốc độ săn edge-case).',
        checkpoint: 'Checkpoint tuandat-v26 · epoch 2026.11 · eval_loss 0.0042 · 368/368 tests ✓',
        nyan: 'Mèo tên lửa cầu vồng đã cất cánh! 🌈🐱🚀 Nạp tối đa năng lượng vui vẻ cho portfolio.',
        allFound: ' 🏆 Đã mở khóa đủ 6/6 bí mật — đúng chuẩn dân kỹ thuật tò mò!',
      },
      ja: {
        guardrail: 'ハルシネーションを検知・ロールバックしました！',
        latent_rain: '潜在空間トークンレイン起動！（ESCキーで終了）',
        injection: 'プロンプトインジェクションを入力境界でブロックしました！',
        coffee: 'サイゴンの練乳コーヒーを補給 ☕（エッジケース発見速度 +12%）',
        checkpoint: 'Checkpoint kelvin-v26 · epoch 2026.11 · eval_loss 0.0042 · 368/368 ✓',
        nyan: 'ニャンキャット・ロケット発進！🌈🐱🚀 ポートフォリオに最高のバイブスをお届け。',
        allFound: ' 🏆 全6つの隠し要素をコンプリート！',
      },
    };

    function unlock(id, silent = false) {
      if (!ALL_EGGS.includes(id)) return;
      const isNew = !discovered.has(id);
      if (isNew) {
        discovered.add(id);
        saveDiscovered();
      }
      if (silent) return;

      const copy = EGG_COPY[getLang()] || EGG_COPY.en;
      const suffix = discovered.size === ALL_EGGS.length && isNew ? copy.allFound : '';
      badgeEl.textContent = `🥚 ${discovered.size}/${ALL_EGGS.length}`;
      msgEl.textContent = `${copy[id] || ''}${suffix}`;
      toast.classList.add('is-visible');
      if (isNew) sfx?.play('guardrailOk');
      else sfx?.play('switch');

      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 4200);
    }

    // Secret #2: Calm Sương Xanh Latent Space Token Rain (Konami code or typing "latent" / "matrix")
    const rainCanvas = document.createElement('canvas');
    rainCanvas.className = 'latent-rain-canvas';
    rainCanvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(rainCanvas);

    let rainRaf = null;
    let rainStopTimer = null;
    let rainActive = false;

    function stopLatentRain() {
      if (!rainActive) return;
      rainActive = false;
      rainCanvas.classList.remove('is-active');
      window.clearTimeout(rainStopTimer);
      if (rainRaf) {
        cancelAnimationFrame(rainRaf);
        rainRaf = null;
      }
    }

    function startLatentRain() {
      if (PREFERS_REDUCED) {
        unlock('latent_rain');
        return;
      }
      if (rainActive) {
        stopLatentRain();
        return;
      }
      rainActive = true;
      unlock('latent_rain');

      const ctx = rainCanvas.getContext('2d');
      if (!ctx) return;

      const TOKENS = ['0.94', 'P50', 'RAG', '∇θ', '368✓', 'HITL', 'AIS', 'FAISS', 'Gemma4', 'async', 'P90', 'BPE', 'SQL', 'Gold', '0x9f2c'];
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      rainCanvas.width = Math.round(w * dpr);
      rainCanvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.max(12, Math.floor(w / 76));
      const drops = Array.from({ length: cols }, (_, i) => ({
        x: i * (w / cols) + 22,
        y: -Math.random() * h * 0.6,
        vy: 1.4 + Math.random() * 2.1,
        tok: TOKENS[i % TOKENS.length],
        alpha: 0.28 + Math.random() * 0.42,
      }));

      rainCanvas.classList.add('is-active');
      const isDark = document.documentElement.dataset.theme === 'dark';

      function frame() {
        if (!rainActive) return;
        ctx.fillStyle = isDark ? 'rgba(7, 19, 31, 0.16)' : 'rgba(242, 246, 250, 0.18)';
        ctx.fillRect(0, 0, w, h);
        ctx.font = '500 12px "JetBrains Mono", monospace';

        drops.forEach((d) => {
          ctx.fillStyle = isDark
            ? `rgba(127, 226, 184, ${d.alpha.toFixed(2)})`
            : `rgba(34, 83, 128, ${d.alpha.toFixed(2)})`;
          ctx.fillText(d.tok, d.x, d.y);
          d.y += d.vy;
          if (d.y > h + 24) {
            d.y = -20;
            d.tok = TOKENS[Math.floor(Math.random() * TOKENS.length)];
          }
        });
        rainRaf = requestAnimationFrame(frame);
      }

      rainRaf = requestAnimationFrame(frame);
      window.clearTimeout(rainStopTimer);
      rainStopTimer = window.setTimeout(stopLatentRain, 7800);
    }

    // Listen for Konami Code (↑↑↓↓←→←→BA) OR typing "latent" / "matrix" outside form inputs
    const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
    let keyBuf = [];
    let wordBuf = '';

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && rainActive) {
        stopLatentRain();
        return;
      }
      const tag = (e.target?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const k = e.key.toLowerCase();
      keyBuf.push(k);
      if (keyBuf.length > KONAMI.length) keyBuf.shift();
      if (KONAMI.every((code, idx) => keyBuf[idx] === code)) {
        keyBuf = [];
        startLatentRain();
        return;
      }

      if (/^[a-z]$/.test(k)) {
        wordBuf = (wordBuf + k).slice(-8);
        if (wordBuf.endsWith('latent') || wordBuf.endsWith('matrix')) {
          wordBuf = '';
          startLatentRain();
        } else if (wordBuf.endsWith('nyan') || wordBuf.endsWith('meow')) {
          wordBuf = '';
          launchNyanCat();
        }
      }
    });

    // Helper for clean triple-click triggers (zero visible chrome)
    function bindTripleClick(selector, onTrigger) {
      document.querySelectorAll(selector).forEach((el) => {
        let count = 0;
        let timer = null;
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
          count += 1;
          window.clearTimeout(timer);
          timer = window.setTimeout(() => { count = 0; }, 1200);
          if (count >= 3) {
            count = 0;
            onTrigger();
          }
        });
      });
    }

    // Secret #4: Triple-click any portrait avatar -> Saigon Coffee Refuel
    bindTripleClick('.footer-avatar, .about-portrait-frame, .contact-avatar-circle', () => unlock('coffee'));

    // Secret #5: Triple-click "2026 © Edition" in footer -> Model Checkpoint Telemetry
    bindTripleClick('[data-i18n="footer.edition"]', () => unlock('checkpoint'));

    // Secret #6: Silky 120fps Pixel-Art Nyan Cat Rainbow Rocket Flyby!
    const NYAN_SVG = `
      <svg class="nyan-cat-svg" viewBox="0 0 34 22" shape-rendering="crispEdges" aria-hidden="true">
        <g class="nyan-flame">
          <rect x="0" y="10" width="3" height="2" fill="#FFE44D"/>
          <rect x="2" y="9" width="2" height="4" fill="#FF7A2E"/>
        </g>
        <g class="nyan-tail">
          <rect x="4" y="10" width="3" height="2" fill="#9AA4B2"/>
          <rect x="3" y="9" width="2" height="2" fill="#9AA4B2"/>
        </g>
        <!-- Pop-Tart biscuit & pink frosting -->
        <rect x="7" y="4" width="16" height="13" fill="#F5C98B"/>
        <rect x="7" y="4" width="16" height="1" fill="#1C2836"/>
        <rect x="7" y="16" width="16" height="1" fill="#1C2836"/>
        <rect x="7" y="4" width="1" height="13" fill="#1C2836"/>
        <rect x="22" y="4" width="1" height="13" fill="#1C2836"/>
        <rect x="9" y="6" width="12" height="9" fill="#FF8AC7"/>
        <!-- Sprinkles -->
        <rect x="11" y="7" width="1" height="1" fill="#FF3B5C"/>
        <rect x="15" y="8" width="1" height="1" fill="#FFFFFF"/>
        <rect x="18" y="7" width="1" height="1" fill="#FFE44D"/>
        <rect x="12" y="11" width="1" height="1" fill="#46B5FF"/>
        <rect x="16" y="12" width="1" height="1" fill="#FF3B5C"/>
        <rect x="19" y="11" width="1" height="1" fill="#FFFFFF"/>
        <!-- Paddling pixel paws -->
        <g class="nyan-paws-a">
          <rect x="8" y="17" width="3" height="2" fill="#9AA4B2"/>
          <rect x="19" y="17" width="3" height="2" fill="#9AA4B2"/>
        </g>
        <g class="nyan-paws-b">
          <rect x="13" y="17" width="3" height="2" fill="#9AA4B2"/>
        </g>
        <!-- Bobbing cat head & ears -->
        <g class="nyan-head">
          <rect x="22" y="5" width="3" height="3" fill="#9AA4B2"/>
          <rect x="28" y="5" width="3" height="3" fill="#9AA4B2"/>
          <rect x="23" y="6" width="1" height="1" fill="#FFB8DC"/>
          <rect x="29" y="6" width="1" height="1" fill="#FFB8DC"/>
          <rect x="21" y="8" width="11" height="8" fill="#A9B3C1"/>
          <rect x="22" y="7" width="9" height="1" fill="#A9B3C1"/>
          <rect x="22" y="16" width="9" height="1" fill="#1C2836"/>
          <rect x="32" y="8" width="1" height="8" fill="#1C2836"/>
          <rect x="24" y="10" width="2" height="2" fill="#101824"/>
          <rect x="29" y="10" width="2" height="2" fill="#101824"/>
          <rect x="24" y="10" width="1" height="1" fill="#FFFFFF"/>
          <rect x="29" y="10" width="1" height="1" fill="#FFFFFF"/>
          <rect x="22" y="12" width="2" height="2" fill="#FF8AC7"/>
          <rect x="30" y="12" width="2" height="2" fill="#FF8AC7"/>
          <rect x="26" y="12" width="2" height="1" fill="#101824"/>
          <rect x="25" y="13" width="4" height="1" fill="#101824"/>
        </g>
      </svg>
    `;

    const NYAN_COLORS = ['#FF4466', '#FF9F38', '#FFE455', '#52E282', '#4CB9FF', '#A078FF'];
    const NYAN_QUIPS = {
      en: ['nyan~ ✨', 'meow :3', '0% hallucination', 'ship it! 🚀', 'vibe check ✓', 'weights warm 🔥'],
      vi: ['meo meo~ ✨', 'nyan chill :3', '0% ảo giác ✓', 'ship lẹ thôi 🚀', 'vibe ổn áp', 'mượt như lụa~'],
      ja: ['にゃん〜 ✨', 'めお :3', '幻覚 0% ✓', 'チル飛行中 🚀', 'バイブ良好'],
    };

    let nyanStage = null;
    let nyanCanvas = null;
    let nyanCtx = null;
    let nyanRaf = 0;
    let nyanCats = [];
    let nyanSparkles = [];
    let nyanPointerY = null;
    let nyanResizeHandler = null;
    let nyanPointerHandler = null;

    function destroyNyanStage() {
      if (nyanRaf) window.cancelAnimationFrame(nyanRaf);
      nyanRaf = 0;
      if (nyanResizeHandler) {
        window.removeEventListener('resize', nyanResizeHandler);
        nyanResizeHandler = null;
      }
      if (nyanPointerHandler) {
        window.removeEventListener('pointermove', nyanPointerHandler);
        nyanPointerHandler = null;
      }
      nyanCats.forEach((c) => c.el.remove());
      nyanCats = [];
      nyanSparkles = [];
      nyanStage?.remove();
      nyanStage = null;
      nyanCanvas = null;
      nyanCtx = null;
    }

    function ensureNyanStage() {
      if (nyanStage && nyanStage.isConnected) return;
      nyanStage = document.createElement('div');
      nyanStage.className = 'nyan-stage';
      nyanStage.setAttribute('aria-hidden', 'true');
      nyanCanvas = document.createElement('canvas');
      nyanCanvas.className = 'nyan-canvas';
      nyanStage.appendChild(nyanCanvas);
      document.body.appendChild(nyanStage);
      nyanCtx = nyanCanvas.getContext('2d');

      const resize = () => {
        if (!nyanCanvas || !nyanCtx) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        nyanCanvas.width = Math.round(window.innerWidth * dpr);
        nyanCanvas.height = Math.round(window.innerHeight * dpr);
        nyanCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();
      nyanResizeHandler = resize;
      window.addEventListener('resize', resize);

      nyanPointerHandler = (e) => {
        nyanPointerY = e.clientY;
      };
      window.addEventListener('pointermove', nyanPointerHandler, { passive: true });
    }

    function tickNyan(now) {
      if (!nyanStage || !nyanCtx) return;
      const W = window.innerWidth;
      const H = window.innerHeight;
      nyanCtx.clearRect(0, 0, W, H);

      for (let i = nyanCats.length - 1; i >= 0; i -= 1) {
        const cat = nyanCats[i];
        const dt = Math.min(0.05, (now - cat.lastTime) / 1000);
        cat.lastTime = now;
        const elapsed = (now - cat.startTime) / 1000;
        const p = elapsed / cat.duration;

        // Smooth horizontal cruise with gentle chill easing & slight playful pause mid-flip
        const baseX = -110 + (W + 460) * p;
        const swayX = Math.sin(p * Math.PI * 2) * 18;
        const x = baseX + swayX;

        // Lazy sinusoidal floating wave + gentle magnetic drift toward cursor Y
        let targetY = cat.baseY + Math.sin(elapsed * cat.waveFreq + cat.phase) * cat.waveAmp;
        if (nyanPointerY !== null && p > 0.08 && p < 0.88) {
          const pull = Math.max(-42, Math.min(42, (nyanPointerY - targetY) * 0.18));
          targetY += pull;
        }
        cat.y += (targetY - cat.y) * Math.min(1, dt * 5.2);

        const vx = Math.max(20, (x - cat.prevX) / Math.max(0.004, dt));
        const vy = (cat.y - cat.prevY) / Math.max(0.004, dt);
        const tangentDeg = Math.max(-16, Math.min(16, (Math.atan2(vy, vx) * 180) / Math.PI));

        // Playful mid-screen 360° barrel-roll stunt + pop speech bubble!
        let spinDeg = 0;
        let popScale = 1;
        if (p >= cat.flipStart && p <= cat.flipEnd) {
          const fp = (p - cat.flipStart) / (cat.flipEnd - cat.flipStart);
          // Smooth cubic ease-in-out full 360 flip
          const eased = fp < 0.5 ? 4 * fp * fp * fp : 1 - Math.pow(-2 * fp + 2, 3) / 2;
          spinDeg = eased * 360;
          popScale = 1 + Math.sin(fp * Math.PI) * 0.14;
        }

        if (p >= 0.2 && p <= 0.78) {
          cat.bubble.classList.add('is-visible');
        } else {
          cat.bubble.classList.remove('is-visible');
        }

        // Record smooth ribbon trail anchor just behind the Pop-Tart tail
        const tailX = x - 34;
        const tailY = cat.y + 2;
        cat.trail.push({ x: tailX, y: tailY, t: elapsed });
        if (cat.trail.length > 54) cat.trail.shift();

        // Spawn chill pixel sparkles drifting gently off the ribbon
        if (now - cat.lastSpark > 85 && p < 0.92) {
          cat.lastSpark = now;
          nyanSparkles.push({
            x: tailX - 8 - Math.random() * 28,
            y: tailY + (Math.random() * 44 - 22),
            vx: -18 - Math.random() * 26,
            vy: (Math.random() - 0.5) * 16,
            size: 2.5 + Math.random() * 3,
            color: Math.random() > 0.35 ? '#FFF7D6' : NYAN_COLORS[Math.floor(Math.random() * NYAN_COLORS.length)],
            born: now,
            life: 750 + Math.random() * 450,
            kind: Math.random() > 0.45 ? 'plus' : 'dot',
          });
        }

        // Draw fluid 6-stripe waving rainbow ribbon following the cat's exact curve
        const pts = cat.trail;
        if (pts.length > 2) {
          const stripeH = 6.2;
          const totalH = stripeH * NYAN_COLORS.length;
          nyanCtx.save();
          nyanCtx.lineCap = 'round';
          nyanCtx.lineJoin = 'round';
          nyanCtx.lineWidth = stripeH + 0.8;

          for (let s = 0; s < NYAN_COLORS.length; s += 1) {
            const offsetY = -totalH / 2 + stripeH * (s + 0.5);
            for (let k = 1; k < pts.length; k += 1) {
              const frac = k / (pts.length - 1);
              const prev = pts[k - 1];
              const curr = pts[k];
              const wavePrev = Math.sin(prev.t * 9 - (k - 1) * 0.24) * 3.4 * (1 - frac * 0.45);
              const waveCurr = Math.sin(curr.t * 9 - k * 0.24) * 3.4 * (1 - frac * 0.45);

              nyanCtx.beginPath();
              nyanCtx.strokeStyle = NYAN_COLORS[s];
              nyanCtx.globalAlpha = Math.pow(frac, 1.45) * 0.92;
              nyanCtx.moveTo(prev.x, prev.y + offsetY + wavePrev);
              nyanCtx.lineTo(curr.x, curr.y + offsetY + waveCurr);
              nyanCtx.stroke();
            }
          }
          nyanCtx.restore();
        }

        // Position cat smoothly at 120fps on GPU; keep speech bubble upright during barrel roll
        cat.el.style.transform = `translate3d(${x.toFixed(2)}px, ${cat.y.toFixed(2)}px, 0) scale(${popScale.toFixed(3)})`;
        cat.svg.style.transform = `rotate(${(tangentDeg + spinDeg).toFixed(2)}deg)`;

        cat.prevX = x;
        cat.prevY = cat.y;

        if (x > W + 420) {
          cat.el.remove();
          nyanCats.splice(i, 1);
        }
      }

      // Draw & update soft twinkling pixel sparkles
      for (let i = nyanSparkles.length - 1; i >= 0; i -= 1) {
        const sp = nyanSparkles[i];
        const age = (now - sp.born) / sp.life;
        if (age >= 1) {
          nyanSparkles.splice(i, 1);
          continue;
        }
        sp.x += sp.vx * 0.016;
        sp.y += sp.vy * 0.016;
        const alpha = Math.sin(age * Math.PI);
        nyanCtx.save();
        nyanCtx.globalAlpha = alpha * 0.92;
        nyanCtx.fillStyle = sp.color;
        if (sp.kind === 'plus') {
          const r = sp.size * (0.65 + alpha * 0.55);
          nyanCtx.fillRect(sp.x - r, sp.y - 1, r * 2, 2);
          nyanCtx.fillRect(sp.x - 1, sp.y - r, 2, r * 2);
        } else {
          nyanCtx.fillRect(sp.x - sp.size * 0.5, sp.y - sp.size * 0.5, sp.size, sp.size);
        }
        nyanCtx.restore();
      }

      if (nyanCats.length === 0 && nyanSparkles.length === 0) {
        destroyNyanStage();
        return;
      }
      nyanRaf = window.requestAnimationFrame(tickNyan);
    }

    function launchNyanCat() {
      unlock('nyan');
      sfx?.play('nyan');
      if (PREFERS_REDUCED) return;
      if (nyanCats.length >= 3) return;

      ensureNyanStage();
      const lang = getLang();
      const pool = NYAN_QUIPS[lang] || NYAN_QUIPS.en;
      const quip = pool[Math.floor(Math.random() * pool.length)];

      const wrap = document.createElement('div');
      wrap.className = 'nyan-cat-wrap';
      wrap.innerHTML = `<span class="nyan-speech">${quip}</span>${NYAN_SVG}`;
      nyanStage.appendChild(wrap);

      const H = window.innerHeight;
      const baseY = H * (0.24 + Math.random() * 0.44);
      const now = performance.now();

      const flipStart = 0.41 + Math.random() * 0.09;
      nyanCats.push({
        el: wrap,
        svg: wrap.querySelector('.nyan-cat-svg'),
        bubble: wrap.querySelector('.nyan-speech'),
        startTime: now,
        lastTime: now,
        lastSpark: now,
        duration: 5.2 + Math.random() * 0.8,
        baseY,
        y: baseY,
        prevX: -110,
        prevY: baseY,
        waveFreq: 2.2 + Math.random() * 0.7,
        waveAmp: 36 + Math.random() * 24,
        phase: Math.random() * Math.PI * 2,
        flipStart,
        flipEnd: flipStart + 0.16,
        trail: [],
      });

      if (!nyanRaf) {
        nyanRaf = window.requestAnimationFrame(tickNyan);
      }
    }

    // Secret trigger: 5x click on the giant Hero Marquee name launches Nyan Cat!
    const marqueeBox = document.querySelector('.big-name');
    if (marqueeBox) {
      let mClicks = 0;
      let mTimer = null;
      marqueeBox.addEventListener('click', () => {
        mClicks += 1;
        window.clearTimeout(mTimer);
        mTimer = window.setTimeout(() => { mClicks = 0; }, 3500);
        if (mClicks >= 5) {
          mClicks = 0;
          launchNyanCat();
        }
      });
    }

    window.__launchNyanCat = launchNyanCat;

    window.__unlockPortfolioEgg = unlock;
    window.__getEggCount = () => discovered.size;

    return { unlock, startLatentRain, stopLatentRain, launchNyanCat, getCount: () => discovered.size, getFound: () => [...discovered] };
  }

  /* ---------- 6. DevTools Console Secret Welcome Banner + Helpers ---------- */
  function initDevToolsEasterEgg(api) {
    const lang = getLang();
    const isVi = lang === 'vi';
    const badge = isVi ? ' TUANDAT.AI // INSPECTED ' : ' KELVIN.AI // INSPECTED ';
    const intro = isVi
      ? 'Ồ, bạn mở cả DevTools xem code luôn à — đúng gu người thích kiểm chứng tận gốc!\nThử gõ mấy lệnh ẩn này ngay trong Console xem nhé:'
      : 'Nice — you actually opened DevTools! Curious engineers are my favorite people.\nTry running these hidden commands right here in the console:';

    const badgeStyle =
      'background:#17334D;color:#D3E6EB;border:1px solid #7FE2B8;padding:4px 10px;border-radius:999px;font-family:monospace;font-weight:700;font-size:12px;';
    const textStyle = 'color:#8CABC4;font-family:monospace;font-size:12px;line-height:1.6;';
    const cmdStyle = 'color:#7FE2B8;font-family:monospace;font-size:12px;font-weight:600;';

    try {
      const hireCmd = isVi ? 'hireDat()' : 'hireKelvin()';
      // eslint-disable-next-line no-console
      console.log(
        `%c${badge}%c\n${intro}\n%c• ${hireCmd}%c             → view engineer spec card\n%c• testGuardrail()%c        → inject hallucination & watch guardrail intercept\n%c• toggleXray()%c           → toggle Tiktoken-style Token X-Ray + vector tooltip\n%c• toggleTheme()%c          → 120fps mist wave Mist Day ⇄ Twilight\n%c• toggleSfx()%c            → toggle tactile Web Audio micro-sounds\n%c• askAI("stack")%c         → open Inspectable Mini RAG with retrieval trace`,
        badgeStyle,
        textStyle,
        cmdStyle,
        textStyle,
        cmdStyle,
        textStyle,
        cmdStyle,
        textStyle,
        cmdStyle,
        textStyle,
        cmdStyle,
        textStyle,
        cmdStyle,
        textStyle
      );
    } catch {
      // ignore console errors
    }

    const printSpecCard = () => {
      const viMode = getLang() === 'vi';
      const card = {
        name: viMode ? 'Nguyễn Đức Tuấn Đạt' : 'Kelvin Nguyen (Nguyen Duc Tuan Dat)',
        role: 'AI Engineer — LLMs, Agents, Backend & Data Pipelines',
        location: 'Ho Chi Minh City, Vietnam (GMT+7)',
        education: 'B.Sc. IT & Data Science · HCMUS',
        email: 'ndtdat.data@gmail.com',
        github: 'https://github.com/dblue03333',
        offline_tests_passing: 368,
        status: 'open_to_chat',
        contact_page: `${window.location.origin}/contact/`,
      };
      // eslint-disable-next-line no-console
      console.log('%c ✓ ENGINEER SPEC CARD ', badgeStyle);
      // eslint-disable-next-line no-console
      console.table(card);
      return card;
    };

    window.hireDat = printSpecCard;
    window.hireKelvin = printSpecCard;
    window.testGuardrail = () => {
      api.triggerGuardrail();
      return 'Guardrail simulation triggered';
    };
    window.toggleXray = () => {
      api.toggleXray();
      return `X-Ray mode: ${api.isXrayActive() ? 'ON' : 'OFF'}`;
    };
    window.toggleTheme = () => `Theme switched to: ${api.toggleTheme()}`;
    window.toggleSfx = () => `Tactile SFX: ${api.toggleSfx() ? 'ON' : 'OFF'}`;
    window.openModelCard = () => { api.openModelCard(); return 'Opened 30s Engineer Model Card'; };
    window.latentRain = () => { api.startLatentRain(); return 'Latent Space Token Rain triggered'; };
    window.nyanCat = () => { api.launchNyanCat(); return '🌈🐱🚀 Nyan Cat rocket launched!'; };
    window.secrets = () => `${api.getEggCount()}/6 Easter eggs discovered: ${api.getFoundEggs().join(', ') || 'none yet — try typing "latent" or /secrets in ⌘K!'}`;
    window.askAI = (query) => {
      api.askAI(query);
      return query ? `Streaming Mini RAG for: "${query}"` : 'Opened Mini RAG Terminal';
    };
  }

  /* ---------- Bootstrap ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const sfx = createSfxEngine();
    const theme = createThemeSystem(sfx);
    let xray = null;
    let palette = null;

    const eggs = createSecretEasterEggs(sfx);
    const modelCard = createModelCardSystem(sfx);
    const guardrail = createGuardrailSystem(() => xray?.disable(), sfx);
    xray = createXraySystem(() => palette?.isOpen(), sfx);
    palette = createCommandPalette(
      () => guardrail.trigger(),
      () => xray.toggle(),
      (e) => theme.toggle(e),
      () => sfx.toggle(),
      () => modelCard.open(),
      sfx
    );

    mountChromeEnhancements(
      () => palette.open(),
      () => guardrail.trigger(),
      () => xray.toggle(),
      (e) => theme.toggle(e),
      () => sfx.toggle(),
      () => modelCard.open()
    );

    const refreshChrome = () => syncChromeCopy(theme, sfx);
    refreshChrome();
    initTabTitleTrick();

    // Global shortcuts: Shift+D (theme), Shift+M (SFX)
    document.addEventListener('keydown', (e) => {
      const tag = (e.target?.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || e.target?.isContentEditable;
      if (typing || !e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === 'd') {
        e.preventDefault();
        theme.toggle();
      } else if (k === 'm') {
        e.preventDefault();
        sfx.toggle();
      } else if (k === 'c') {
        e.preventDefault();
        if (modelCard.isOpen()) modelCard.close();
        else modelCard.open();
      }
    });

    window.addEventListener('portfolio:langchange', refreshChrome);
    window.addEventListener('portfolio:themechange', refreshChrome);
    window.addEventListener('portfolio:sfxchange', refreshChrome);
    window.setInterval(refreshChrome, 60000);

    const api = {
      openCommandPalette: () => palette.open(),
      closeCommandPalette: () => palette.close(),
      askAI: (query) => palette.ask(query),
      triggerGuardrail: () => guardrail.trigger(),
      toggleXray: () => xray.toggle(),
      isXrayActive: () => xray.isActive(),
      toggleTheme: (e) => theme.toggle(e),
      getTheme: () => theme.getTheme(),
      toggleSfx: () => sfx.toggle(),
      isSfxEnabled: () => sfx.isEnabled(),
      openModelCard: () => modelCard.open(),
      closeModelCard: () => modelCard.close(),
      startLatentRain: () => eggs.startLatentRain(),
      launchNyanCat: () => eggs.launchNyanCat(),
      getEggCount: () => eggs.getCount(),
      getFoundEggs: () => eggs.getFound(),
    };

    window.__portfolioDelights = api;
    initDevToolsEasterEgg(api);
  });
})();
