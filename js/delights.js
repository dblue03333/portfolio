/* ==========================================================================
   AI ENGINEER DELIGHTS — TRILINGUAL (EN / VI / JA)
   1. ⌘K Mini RAG Terminal (token streaming + source citations + anti-hallucination)
   2. Hallucination → Guardrail Intercept Easter Egg (5x Globe click, footer pill, or ⌘K)
   3. Live Saigon Time-Aware Status in Footer
   ========================================================================== */

(() => {
  const scriptEl = document.currentScript || document.querySelector('script[src*="delights.js"]');
  const scriptSrc = scriptEl?.getAttribute('src') || 'js/delights.js';
  const ROOT = scriptSrc.startsWith('../../') ? '../../' : scriptSrc.startsWith('../') ? '../' : '';
  const IS_MAC = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || '');
  const SHORTCUT_LABEL = IS_MAC ? '⌘K' : 'Ctrl+K';

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
      placeholder: 'Ask about Kelvin or jump to a command…',
      groupActions: 'Actions & Playground',
      groupPages: 'Navigate',
      hint: '↑↓ navigate · ↵ select or ask · esc close',
      badge: '100% client-side RAG',
      askRowPrefix: 'Ask Mini RAG: “',
      askRowSuffix: '”',
      askRowHint: 'Stream answer ↵',
      cmdGuardrail: 'Test Guardrail — Inject Hallucination',
      cmdGuardrailHint: 'Easter egg',
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
      placeholder: 'Hỏi nhanh về Tuấn Đạt hoặc gõ tên trang, lệnh…',
      groupActions: 'Tương tác & Thử nghiệm',
      groupPages: 'Đi nhanh đến trang',
      hint: '↑↓ di chuyển · ↵ chọn hoặc hỏi · esc đóng',
      badge: 'RAG chạy trực tiếp trên trình duyệt',
      askRowPrefix: 'Hỏi Mini RAG: “',
      askRowSuffix: '”',
      askRowHint: 'Trả lời ngay ↵',
      cmdGuardrail: 'Thử Guardrail — Giả lập AI bị ảo giác',
      cmdGuardrailHint: 'Easter egg',
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
      placeholder: 'Kelvinについて質問、またはコマンド検索…',
      groupActions: 'アクション・実験',
      groupPages: 'ページ移動',
      hint: '↑↓ 移動 · ↵ 実行 / 質問 · esc 閉じる',
      badge: '100%クライアントRAG',
      askRowPrefix: 'Mini RAGに質問: 「',
      askRowSuffix: '」',
      askRowHint: '回答生成 ↵',
      cmdGuardrail: 'ガードレール実験 — ハルシネーション注入',
      cmdGuardrailHint: 'イースターエッグ',
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
      score: '0.95',
      keywords: [
        'stack', 'tech', 'skill', 'python', 'fastapi', 'docker', 'llm', 'rag', 'gemini', 'gemma',
        'lightgbm', 'mongodb', 'vector', 'astro', 'figma', 'backend', 'tool', 'framework',
        'cong nghe', 'ky nang', 'ngon ngu lap trinh', 'dung gi', 'code gi',
        '技術', 'スタック', 'スキル', 'バックエンド',
      ],
      answers: {
        en: 'Kelvin works across the intersection of LLM applications, backend services, and data pipelines. His core stack includes Python, FastAPI, Docker, MongoDB Atlas Vector Search, Google Gemini, offline Gemma 4, LightGBM quantile models, and Astro for editorial web builds.',
        vi: 'Tuấn Đạt làm việc ở điểm giao giữa ứng dụng LLM, backend và data pipeline. Bộ công nghệ chính của Đạt gồm Python, FastAPI, Docker, MongoDB Atlas Vector Search, Google Gemini, Gemma 4 chạy offline, LightGBM hồi quy phân vị và Astro cho web biên tập.',
        ja: 'LLMアプリケーション、バックエンド、データパイプラインの領域を中心に、Python、FastAPI、Docker、MongoDB Atlas Vector Search、Google Gemini、オフラインGemma 4、LightGBM、Astroなどを使用しています。',
      },
      sources: [
        { label: { en: 'About → Capabilities', vi: 'Giới thiệu → Năng lực', ja: '自己紹介 → 提供価値' }, path: 'about/index.html' },
        { label: { en: 'Case → mini-llm-twin', vi: 'Dự án → mini-llm-twin', ja: '事例 → mini-llm-twin' }, path: 'work/mini-llm-twin/index.html' },
      ],
    },
    {
      id: 'guardrails',
      score: '0.96',
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
      score: '0.94',
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
      score: '0.93',
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
      score: '0.92',
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
      score: '0.95',
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
      id: 'coffee',
      score: '0.91',
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

  /* ---------- 1. Live Saigon Status + Footer Console + Navbar ⌘K ---------- */
  const statusEls = [];
  const consoleTitleEls = [];
  const askPillEls = [];
  const guardrailPillEls = [];

  function mountChromeEnhancements(openPalette, triggerGuardrail) {
    // A. Desktop navbar subtle ⌘K trigger pill
    const desktopNav = document.querySelector('.nav-links');
    if (desktopNav && !desktopNav.querySelector('[data-cmdk-open]')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cmdk-nav-btn';
      btn.dataset.cmdkOpen = '';
      btn.setAttribute('aria-label', 'Open AI Command Palette');
      btn.innerHTML = `<span class="cmdk-nav-dot" aria-hidden="true"></span><span>${SHORTCUT_LABEL}</span>`;
      btn.addEventListener('click', openPalette);
      desktopNav.appendChild(btn);
    }

    // B. Mobile drawer quick ⌘K trigger
    const drawerLang = document.querySelector('.fixed-nav-lang');
    if (drawerLang && !drawerLang.parentElement?.querySelector('[data-cmdk-drawer]')) {
      const wrap = document.createElement('div');
      wrap.className = 'fixed-nav-lang';
      wrap.style.marginTop = '1em';
      wrap.innerHTML = `
        <span class="eyebrow" style="color: rgba(211, 230, 235, 0.56);" data-console-label>AI Console</span>
        <button type="button" class="cmdk-nav-btn" data-cmdk-drawer>
          <span class="cmdk-nav-dot" aria-hidden="true"></span>
          <span data-ask-pill-text></span>
        </button>
      `;
      const btn = wrap.querySelector('[data-cmdk-drawer]');
      btn.addEventListener('click', () => {
        document.querySelector('[data-mobile-nav-close]')?.click();
        window.setTimeout(openPalette, 180);
      });
      consoleTitleEls.push(wrap.querySelector('[data-console-label]'));
      askPillEls.push(wrap.querySelector('[data-ask-pill-text]'));
      drawerLang.insertAdjacentElement('afterend', wrap);
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

    // D. Footer interactive AI Console column (⌘K Ask AI + ⚡ Test Guardrail)
    document.querySelectorAll('.footer-meta-group').forEach((group) => {
      if (group.querySelector('.footer-console-col')) return;
      const col = document.createElement('div');
      col.className = 'footer-meta-col footer-console-col';
      col.innerHTML = `
        <h5 data-console-label>AI Console</h5>
        <div class="footer-console-actions">
          <button type="button" class="footer-console-pill" data-cmdk-open><span data-ask-pill-text></span></button>
          <button type="button" class="footer-console-pill is-guardrail" data-guardrail-trigger><span data-guardrail-pill-text></span></button>
        </div>
      `;
      col.querySelector('[data-cmdk-open]').addEventListener('click', openPalette);
      col.querySelector('[data-guardrail-trigger]').addEventListener('click', triggerGuardrail);
      consoleTitleEls.push(col.querySelector('[data-console-label]'));
      askPillEls.push(col.querySelector('[data-ask-pill-text]'));
      guardrailPillEls.push(col.querySelector('[data-guardrail-pill-text]'));
      group.appendChild(col);
    });
  }

  function syncChromeCopy() {
    const lang = getLang();
    const u = UI[lang] || UI.en;
    const statusText = getSaigonStatusText(lang);
    statusEls.forEach((el) => { if (el) el.textContent = statusText; });
    consoleTitleEls.forEach((el) => { if (el) el.textContent = u.consoleTitle; });
    askPillEls.forEach((el) => { if (el) el.textContent = u.askBtn; });
    guardrailPillEls.forEach((el) => { if (el) el.textContent = u.guardrailBtn; });
  }

  /* ---------- 2. Easter Egg: Hallucination → Guardrail Intercept ---------- */
  function createGuardrailSystem() {
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
      savedSnapshots.forEach(({ el, text }) => {
        el.textContent = text;
        el.classList.remove('is-hallucinating');
      });
      savedSnapshots = [];
      veil.classList.remove('is-active');
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
          savedSnapshots.push({ el, text: el.textContent });
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

        // Phase 2: Guardrail intercepts unverified claim
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
          }, 1250)
        );

        // Phase 3: Roll back to verified source truth cleanly
        timers.push(
          window.setTimeout(() => {
            restoreSnapshots();
            hud.classList.add('is-resolved');
            titleEl.textContent = u.guardrailOk;
            msgEl.textContent = u.guardrailOkMsg;
            barEl.style.width = '100%';
          }, 2250)
        );

        // Phase 4: Auto-dismiss HUD
        timers.push(
          window.setTimeout(() => {
            hud.classList.remove('is-visible');
            isRunning = false;
          }, 5600)
        );
      };

      // If triggered from footer far down the page, scroll smoothly up to see the hero/headline glitch
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

    // Secret Easter Egg: clicking Saigon Globe 5 times triggers Guardrail!
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

    // If language changes mid-hallucination, safely abort & restore
    window.addEventListener('portfolio:langchange', () => {
      if (isRunning) {
        clearTimers();
        dismissHud();
      }
    });

    return { trigger };
  }

  /* ---------- 3. ⌘K Mini RAG Terminal ---------- */
  function createCommandPalette(triggerGuardrail) {
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
    const hintEl = backdrop.querySelector('[data-cmdk-hint]');
    const badgeEl = backdrop.querySelector('[data-cmdk-badge]');

    let isOpen = false;
    let selectedIndex = 0;
    let visibleItems = [];
    let streamTimer = null;

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
    }

    function matchKnowledge(rawQuery) {
      const q = stripAccents(rawQuery);
      let best = null;
      let bestHits = 0;
      KB.forEach((entry) => {
        let hits = 0;
        entry.keywords.forEach((kw) => {
          const normKw = stripAccents(kw);
          if (q.includes(normKw)) {
            hits += normKw.length >= 5 ? 2 : 1;
          }
        });
        if (hits > bestHits) {
          bestHits = hits;
          best = entry;
        }
      });
      return bestHits > 0 ? best : null;
    }

    function runRagQuery(question) {
      const lang = getLang();
      const u = UI[lang] || UI.en;
      const hit = matchKnowledge(question);

      stopStream();
      ragCard.hidden = false;
      ragCard.classList.toggle('is-abstained', !hit);
      ragOutput.textContent = '';
      ragSources.innerHTML = '';
      ragCursor.style.display = 'inline-block';

      const fullText = hit ? hit.answers[lang] || hit.answers.en : ABSTAIN_COPY[lang] || ABSTAIN_COPY.en;
      ragStatus.textContent = hit
        ? `${u.retrieving} ${hit.score} · ${u.grounded}`
        : u.abstained;

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
      }, 22);
    }

    function buildCommands() {
      const lang = getLang();
      const u = UI[lang] || UI.en;
      return [
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
            stopStream();
            ragCard.hidden = false;
            ragCard.classList.remove('is-abstained');
            ragStatus.textContent = 'clipboard · ready';
            ragOutput.textContent = u.cmdCopied;
            ragSources.innerHTML = '';
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

      // If user typed a question/phrase, offer "Ask Mini RAG" right at the top
      if (raw.length >= 2) {
        const askItem = {
          icon: '✦',
          title: `${u.askRowPrefix}${raw}${u.askRowSuffix}`,
          hint: u.askRowHint,
          run: () => runRagQuery(raw),
        };
        visibleItems.push(askItem);
        const btn = createRowEl(askItem, 0);
        listEl.appendChild(btn);
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
      btn.addEventListener('click', () => item.run());
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
    }

    function open() {
      if (isOpen) return;
      isOpen = true;
      selectedIndex = 0;
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
          visibleItems[selectedIndex].run();
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

    return { open, close };
  }

  /* ---------- Bootstrap ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const guardrail = createGuardrailSystem();
    const palette = createCommandPalette(() => guardrail.trigger());
    mountChromeEnhancements(() => palette.open(), () => guardrail.trigger());
    syncChromeCopy();

    window.addEventListener('portfolio:langchange', syncChromeCopy);
    window.setInterval(syncChromeCopy, 60000);

    // Expose clean API for testing or future extensions
    window.__portfolioDelights = {
      openCommandPalette: () => palette.open(),
      closeCommandPalette: () => palette.close(),
      triggerGuardrail: () => guardrail.trigger(),
    };
  });
})();
