/* ==========================================================================
   TRILINGUAL I18N ENGINE — EN / VI / JA
   - Supports ?lang=en|vi|ja query parameter & localStorage persistence
   - Updates DOM [data-i18n], [data-i18n-html], [data-i18n-placeholder]
   - Emits 'portfolio:langchange' for dynamic JS widgets (Work, Demos, Hero)
   ========================================================================== */

(() => {
  const SUPPORTED = ['en', 'vi', 'ja'];
  const STORAGE_KEY = 'portfolio_lang';

  const DICT = {
    en: {
      // Brand identity
      'brand.marquee': 'Kelvin Nguyen<span class="spacer">—</span>Kelvin Nguyen<span class="spacer">—</span>',
      'brand.full_name': 'Kelvin Nguyen (Nguyen Duc Tuan Dat)',
      'brand.short_name': 'Kelvin Nguyen',
      'brand.doc_home': 'Kelvin Nguyen — AI Engineer',
      'brand.credit': '<span>Code by</span><span>Kelvin</span><span class="credit-extra">Nguyen</span>',
      'brand.runtime': 'KELVIN.AI // RUNTIME',

      // Navigation & Chrome
      'nav.work': 'Work',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.home': 'Home',
      'nav.menu': 'Menu',
      'nav.navigation': 'Navigation',
      'nav.language': 'Language',
      'nav.socials': 'Socials',
      'nav.skip': 'Skip to content',

      // Footer
      'footer.lets_work': 'Let’s work',
      'footer.together': 'together',
      'footer.get_in_touch': 'Get in touch',
      'footer.version': 'Version',
      'footer.edition': '2026 © Edition',
      'footer.local_time': 'Local Time',

      // Home Hero & Intro
      'home.hanger_default': 'Located in<br>Ho Chi Minh City,<br>Vietnam',
      'home.hanger_coords': '10.7769° N<br>106.7009° E<br>Saigon · VN',
      'home.role_title': 'AI Engineer',
      'home.role_1': 'LLMs, Agents & Backend',
      'home.role_2': 'Data & RAG Pipelines',
      'home.role_3': 'Applied AI Systems',
      'home.intro_lead': 'Building reliable AI systems grounded in source evidence, bounded tool execution, and clear human oversight.',
      'home.intro_body': 'I’m Kelvin Nguyen — an AI Engineer based in Vietnam. I build LLM applications, agents, backend services, and data pipelines — testing where they fail and designing workflows people can inspect before acting.',
      'home.about_me': 'About me',
      'home.selected_work': 'Selected Work',
      'home.more_work': 'More work',

      // Project metadata & rows
      'proj.healthlab.meta_home': 'Data Pipeline & Editorial Review · Oct 2026 – Present',
      'proj.harness.meta_home': 'AI Agents & Guardrails · Sep 2026',
      'proj.harbormind.meta_home': 'Quantile ML & Local Agents · Apr – May 2026',
      'proj.rag.meta_home': 'Retrieval & Vector Indexing · Dec 2025 – Apr 2026',
      'proj.healthlab_web.role': 'Astro Typography & Figma Components',

      // Work page
      'work.title': 'Building reliable AI systems you can inspect',
      'work.filter.all': 'All',
      'work.filter.agents': 'AI Agents',
      'work.filter.data': 'Data & RAG',
      'work.filter.web': 'Web',
      'work.sort.newest': 'Timeline: Newest ↓',
      'work.sort.oldest': 'Timeline: Oldest ↑',
      'work.sort.col_newest': 'Timeline ↓',
      'work.sort.col_oldest': 'Timeline ↑',
      'work.col.project': 'Project',
      'work.col.domain': 'Domain',
      'work.col.capabilities': 'Capabilities',
      'work.domain.health': 'Public Health',
      'work.domain.web': 'Editorial Web',
      'work.domain.safety': 'Operations Safety',
      'work.domain.maritime': 'Maritime Logistics',
      'work.domain.rag': 'Personal Knowledge',
      'work.cap.health': 'Evidence Pipeline & Editorial Review',
      'work.cap.web': 'Astro Typography & Figma Components',
      'work.cap.harness': 'Tool Validation & Human Approval',
      'work.cap.harbormind': 'Quantile ML & Local Gemma Agents',
      'work.cap.rag': 'RAG Pipeline & Vector Indexing',
      'work.date.oct_present': 'Oct 2026 – Present',
      'work.date.sep_2026': 'Sep 2026',
      'work.date.apr_may_2026': 'Apr – May 2026',
      'work.date.dec_apr_2026': 'Dec 2025 – Apr 2026',
      'work.archive_cta': 'GitHub Archive ↗',

      // About page
      'about.title': 'Building AI systems people can trust and inspect',
      'about.bio_1': 'I’m Kelvin Nguyen (Nguyen Duc Tuan Dat), an AI Engineer based in Ho Chi Minh City. I studied Information Technology with a Data Science specialization at HCMUS.',
      'about.bio_2': 'My work sits where LLM applications, backend services, and data pipelines meet — making sure model outputs stay tied to verifiable evidence, tool calls pass strict validation, and uncertain decisions hand control back to a human reviewer.',
      'about.exploring': 'Always testing where systems fail…',
      'about.help_heading': 'I can help you with …',
      'about.cap1.title': 'AI Agents & Guardrails',
      'about.cap1.desc': 'Designing tool-calling assistants with typed input/output validation, bounded retry policies, offline test suites, and explicit human approval gates before side effects run.',
      'about.cap2.title': 'Evidence & Data Pipelines',
      'about.cap2.desc': 'Building versioned ingestion and transformation workflows that preserve original source material so editors, analysts, and models operate on traceable datasets.',
      'about.cap3.title': 'LLM Backends & RAG',
      'about.cap3.desc': 'Shipping production retrieval and multimodal services with vector indexing, rule-based output validators, bilingual prompt evaluation, and Dockerized FastAPI backends.',
      'about.exp_heading': 'Experience',
      'about.exp.hl.role': 'Technical Contributor',
      'about.exp.hl.desc': 'Contributing to HealthLab’s responsive Astro website and building data and editorial review tools for its supervised public health newsletter pilot on healthy ageing in Vietnam.',
      'about.exp.sf.role': 'AI Engineering Consultant',
      'about.exp.sf.org': 'Safiri Logistics · Remote contract',
      'about.exp.sf.desc': 'Providing independent AI engineering consulting services to Safiri Logistics Pty Ltd, a logistics technology company.',
      'about.exp.sf.date': 'May 2026 – Present',
      'about.exp.ad.role': 'AI Engineering Contributor',
      'about.exp.ad.desc': 'Built a Gemini multimodal prototype helping students observe and describe drawings. Evaluated Vietnamese and English prompts, strengthened the rule-based validator filtering evaluative advice, and expanded the test suite.',
      'about.exp.ad.date': 'Jun – Sep 2026',
      'about.creds_heading': 'Credentials & Background',
      'about.cred.nvidia.desc': 'Verified credential covering LLM architectures, retrieval pipelines, evaluation, and applied generative AI systems.',
      'about.cred.nvidia.link': 'Verify on Credly ↗',
      'about.cred.gadv.desc': 'Statistical modeling, Python data analysis, regression, and machine learning workflows.',
      'about.cred.view': 'View certificate ↗',
      'about.edu_heading': 'Education & Languages',
      'about.edu.hcmus': 'B.Sc. IT & Data Science · 2021–2025',
      'about.lang.vn_en.title': 'Vietnamese & English',
      'about.lang.vn_en.desc': 'Native Vietnamese · English C1',
      'about.lang.ja.title': 'Japanese',
      'about.lang.ja.desc': 'Targeting N2 · Actively learning',
      'about.lang.de.title': 'German',
      'about.lang.de.desc': 'A1 · Casually learning',

      // Contact page
      'contact.title': 'Let’s build something reliable together',
      'contact.q1': 'What’s your name?',
      'contact.p1': 'Alex Tran *',
      'contact.q2': 'What’s your email?',
      'contact.p2': 'alex@company.com *',
      'contact.q3': 'What’s the name of your team or company?',
      'contact.p3': 'Company / Research Lab',
      'contact.q4': 'What would you like to discuss?',
      'contact.p4': 'AI Engineer role, LLMs, Backend...',
      'contact.q5': 'Your message',
      'contact.p5': 'Hello Kelvin, I’d like to talk about... *',
      'contact.send': 'Send it!',
      'contact.sending': 'Sending…',
      'contact.sent': 'Sent ✓',
      'contact.details': 'Contact Details',
      'contact.info': 'Details',
      'contact.copy_email': 'Copy email',
      'contact.copied': 'Copied to clipboard ✓',
      'contact.open_draft': 'Open email draft ↗',
      'contact.location': 'Ho Chi Minh City, Vietnam',
      'contact.err_name': 'Please enter your name.',
      'contact.err_email': 'Please enter a valid email address so I can reply.',
      'contact.err_msg': 'Please write a short message before sending.',
      'contact.local_msg': 'Local preview mode: Netlify Forms automatically emails ndtdat.data@gmail.com once deployed. You can also send via your mail app below.',
      'contact.ok_msg': 'Message sent — thank you! I will get back to you soon.',
      'contact.fail_msg': 'Could not submit right now — please open the pre-filled email draft below or copy ndtdat.data@gmail.com.',

      // Case Studies shared
      'case.back': '← Back to Work',
      'case.role_focus': 'Role & Focus',
      'case.stack_verify': 'Stack & Verification',
      'case.stack_scope': 'Stack & Scope',
      'case.stack_dataset': 'Stack & Dataset',
      'case.stack': 'Stack',
      'case.timeline': 'Timeline',
      'case.view_repo': 'View repo ↗',
      'case.watch_demo': 'Watch demo ↗',
      'case.problem': 'The problem',
      'case.built': 'What I built',
      'case.verified': 'How I verified it',
      'case.artifacts': 'Public artifacts',
      'case.sys_design': 'System design',
      'case.next': 'Next Case',
      'case.all_work': 'All work',

      // Case Study 1: HealthLab
      'hl.meta_role': 'Data Engineering, Evidence Lineage, Editorial Review Workflow',
      'hl.meta_stack': 'Python, Versioned Datasets, Supervised Newsletter Pilot',
      'hl.meta_time': 'Oct 2026 – Present · Healthy Ageing Vietnam',
      'hl.tag1': 'Editorial Review · Simulation',
      'hl.tag2': 'Manual Step or Auto Walkthrough',
      'hl.demo_title': 'Does the public source actually support the draft?',
      'hl.source_label': 'Linked Public Source',
      'hl.draft_v2_html': 'The healthy ageing screening programme is available <mark>nationwide</mark>.',
      'hl.draft_v3_html': 'The healthy ageing screening programme is currently being piloted in <mark>one district</mark>.',
      'hl.src_placeholder': 'Inspect the linked source passage to verify the highlighted claim before approval.',
      'hl.src_quote_html': '“The community screening pilot is limited to <mark>one district</mark> during phase one.”',
      'hl.problem_p': 'In public health communication, even a subtle overstatement — turning a one-district pilot into a nationwide rollout — erodes trust. Automated summaries without source lineage force editors to re-read everything from scratch.',
      'hl.built_p1': 'I designed a Python pipeline for HealthLab’s supervised newsletter pilot on healthy ageing in Vietnam. It ingests public health articles, preserves original source evidence inside versioned datasets, and prepares source-linked newsletter drafts.',
      'hl.built_p2': 'Editors trace individual sentences back to their original sources and bind approval to a specific draft version before export.',
      'hl.verified_p': 'Exported evidence datasets can be audited offline, and issue approval locks directly to an exact draft version so no unreviewed edits slip into publication.',
      'hl.repo_btn': 'Public Repository ↗',
      'hl.btn_step0': 'Inspect linked source',
      'hl.btn_step1': 'Open revised draft v3',
      'hl.btn_step2': 'Approve v3',
      'hl.btn_step3': 'Restart simulation',
      'hl.play': 'Play walkthrough',
      'hl.pause': 'Pause walkthrough',
      'hl.replay': 'Replay walkthrough',
      'hl.status0': 'Draft v2 is awaiting editorial review. Click to verify the highlighted claim against its source.',
      'hl.status1': 'Mismatch flagged: the public source describes a one-district pilot, while Draft v2 claimed nationwide availability.',
      'hl.status2': 'Draft v3 narrows the claim to match the source evidence and binds approval to version v3.',
      'hl.status3': 'Audit recorded: Draft v3 approved for newsletter export (simulation state).',

      // Case Study 2: Reliable Agent Harness
      'hr.meta_role': 'AI Agent Architecture, Tool Validation, Human-in-the-Loop Guardrails',
      'hr.meta_stack': 'Python, CLI & HTTP API, 368 Offline Tests Passing',
      'hr.meta_time': 'Sep 2026 · Public Prototype',
      'hr.tag1': 'Interactive Simulation · Human Approval Gate',
      'hr.demo_title': 'An agent proposes. A person approves the exact action.',
      'hr.sheet_tool': 'Proposed Tool Call',
      'hr.sheet_claim': 'Open a high-severity incident for recurring checkout API timeouts?',
      'hr.sheet_trace': 'Harness Execution Trace',
      'hr.btn_approve': 'Approve action',
      'hr.btn_reject': 'Reject action',
      'hr.btn_reset': 'Reset simulation',
      'hr.badge_pending': 'Pending human approval',
      'hr.badge_approved': 'Approved · Dispatched',
      'hr.badge_rejected': 'Rejected · Blocked',
      'hr.status_pending': 'Proposed action is paused until a human reviewer approves or rejects the exact payload.',
      'hr.status_approved': 'Reviewer approved exact payload hash #9f2c. Incident INC-402 created and logged offline.',
      'hr.status_rejected': 'Reviewer rejected create_incident. No external write occurred; agent halted cleanly.',
      'hr.problem_p': 'Autonomous agents can diagnose operational signals quickly, but letting an LLM execute state-changing tools without deterministic checks creates silent failure modes: malformed arguments, unbounded retry loops, and unreviewed external writes.',
      'hr.built_p1': 'I built a Python harness exposed through both a CLI and an HTTP API. Every tool call passes typed input/output validation, respects strict retry budgets, and pauses before side-effecting calls so a human reviewer approves or rejects the exact proposed action.',
      'hr.built_p2': 'Every decision — approved or rejected — is bound to the exact action payload and written to an inspectable audit record.',
      'hr.verified_p': 'The proof of concept passes 368 offline tests covering schema enforcement, retry exhaustion, approval binding, and clean rejection with zero side effects. Synthetic data lets anyone run both branches locally from the repository quick start.',

      // Case Study 3: HarborMind
      'hm.meta_role': 'AIS Data Pipeline, Quantile Regression, Local Gemma 4 Decision Support',
      'hm.meta_stack': 'LightGBM, Gemma 4 (Offline), NOAA MarineCadastre AIS on Kaggle',
      'hm.meta_time': 'Apr – May 2026 · Gemma 4 Good Hackathon',
      'hm.tag1': 'Port of Long Beach · Quantile Forecast Simulation',
      'hm.demo_title': 'When forecast uncertainty spikes, hand the helm back to the captain.',
      'hm.sheet_label': 'Predicted Wait-Time Quantile Band (P10 — P50 — P90)',
      'hm.sc_clear': 'Clear Berth',
      'hm.sc_mod': 'Peak Queue',
      'hm.sc_storm': 'High Uncertainty',
      'hm.badge_clear': 'Auto-Advisory Ready',
      'hm.badge_mod': 'Advisory + Caution',
      'hm.badge_storm': 'Handoff to Captain',
      'hm.status_clear': 'Tight quantile interval at Berth 42. Local Gemma agent explains the arrival recommendation with high confidence.',
      'hm.status_mod': 'Container backlog building at San Pedro Bay. Advisory includes queue context and fuel-burn trade-off.',
      'hm.status_storm': 'Quantile spread exceeds safety threshold. HarborMind suppresses automated routing and hands the decision back to the captain.',
      'hm.problem_p': 'Point estimates for port congestion hide risk: knowing an average wait time of 22 hours is dangerous if the realistic window spans 11 to 38 hours during berth disruptions, especially at sea where connectivity is intermittent.',
      'hm.built_p': 'I processed historical NOAA MarineCadastre AIS vessel trajectories (2023–2025) for Los Angeles / Long Beach and published the resulting cleaned dataset on Kaggle. Alongside that data pipeline, HarborMind pairs LightGBM quantile regression with local offline Gemma 4 agents to explain wait advisories — and explicitly escalates back to the captain whenever prediction spread crosses the safety threshold.',
      'hm.artifacts_p': 'Explore all four public deliverables separately: the recorded walkthrough demo, the agent and dashboard codebase, the AIS data & ML pipeline, and the published Kaggle dataset.',

      // Case Study 4: mini-llm-twin
      'rag.meta_role': 'End-to-End RAG Architecture, Feature Ingestion & Vector Retrieval',
      'rag.meta_stack': 'Python, FastAPI, MongoDB Atlas Vector Search, Google Gemini, Docker',
      'rag.meta_time': 'Dec 2025 – Apr 2026 · Personal Knowledge Assistant',
      'rag.tag1': 'RAG Architecture Inspector',
      'rag.tag2': 'Click any stage to inspect',
      'rag.sheet_label': 'Stage Payload Trace',
      'rag.s1_title': '01 · Knowledge Ingestion & Chunking',
      'rag.s1_note': 'Personal notes and project logs are normalized into reproducible, overlap-preserved chunks before embedding.',
      'rag.s2_title': '02 · Gemini Embedding Generation',
      'rag.s2_note': 'Each chunk is embedded via Google Gemini and written idempotently to MongoDB Atlas.',
      'rag.s3_title': '03 · MongoDB Atlas Vector Search',
      'rag.s3_note': 'FastAPI queries the Atlas vector index with cosine similarity to retrieve the highest-signal context passages.',
      'rag.s4_title': '04 · Grounded Answer Synthesis',
      'rag.s4_note': 'Gemini synthesizes a concise answer strictly grounded in retrieved passages and returns structured JSON.',
      'rag.design_p1': 'mini-llm-twin ingests personal documents and notes, splits them into overlap-preserving chunks, generates embeddings via Google Gemini (text-embedding-004), and indexes them in MongoDB Atlas for semantic cosine similarity search.',
      'rag.design_p2': 'A containerized FastAPI backend serves structured Q&A responses grounded strictly in retrieved context passages, making the entire service reproducible across environments via Docker.',
    },

    vi: {
      // Brand identity
      'brand.marquee': 'Nguyễn Đức Tuấn Đạt<span class="spacer">—</span>Nguyễn Đức Tuấn Đạt<span class="spacer">—</span>',
      'brand.full_name': 'Nguyễn Đức Tuấn Đạt',
      'brand.short_name': 'Nguyễn Đức Tuấn Đạt',
      'brand.doc_home': 'Nguyễn Đức Tuấn Đạt — AI Engineer',
      'brand.credit': '<span>Nguyễn Đức</span><span>Tuấn Đạt</span>',
      'brand.runtime': 'TUANDAT.AI // RUNTIME',

      // Navigation & Chrome
      'nav.work': 'Dự án',
      'nav.about': 'Giới thiệu',
      'nav.contact': 'Liên hệ',
      'nav.home': 'Trang chủ',
      'nav.menu': 'Menu',
      'nav.navigation': 'Điều hướng',
      'nav.language': 'Ngôn ngữ',
      'nav.socials': 'Liên kết',
      'nav.skip': 'Bỏ qua đến nội dung',

      // Footer
      'footer.lets_work': 'Cùng hợp tác',
      'footer.together': 'với nhau nhé',
      'footer.get_in_touch': 'Liên hệ với mình',
      'footer.version': 'Phiên bản',
      'footer.edition': '2026 © Edition',
      'footer.local_time': 'Giờ địa phương',

      // Home Hero & Intro
      'home.hanger_default': 'Làm việc tại<br>TP. Hồ Chí Minh,<br>Việt Nam',
      'home.hanger_coords': '10.7769° N<br>106.7009° E<br>Sài Gòn · VN',
      'home.role_title': 'AI Engineer',
      'home.role_1': 'LLMs, Agents & Backend',
      'home.role_2': 'Data & RAG Pipelines',
      'home.role_3': 'Hệ thống AI Thực chiến',
      'home.intro_lead': 'Mình xây những hệ thống AI đáng tin cậy — câu trả lời luôn bám sát nguồn dữ liệu gốc, mỗi thao tác đều có giới hạn rõ ràng, và luôn giữ con người ở bước kiểm duyệt cuối cùng.',
      'home.intro_body': 'Mình là Nguyễn Đức Tuấn Đạt, một AI Engineer đang sống và làm việc tại Việt Nam. Công việc hàng ngày của mình xoay quanh ứng dụng LLM, AI agents, backend và data pipeline. Thay vì chỉ chạy cho ra kết quả, mình hay tìm xem hệ thống dễ lỗi ở đâu trước, rồi thiết kế quy trình để người dùng có thể tự kiểm tra lại trước khi bấm chạy.',
      'home.about_me': 'Về mình',
      'home.selected_work': 'Dự án tiêu biểu',
      'home.more_work': 'Xem thêm dự án',

      // Project metadata & rows
      'proj.healthlab.meta_home': 'Data Pipeline & Kiểm duyệt nguồn · Th10 2026 – Nay',
      'proj.harness.meta_home': 'AI Agents & Guardrails · Th9 2026',
      'proj.harbormind.meta_home': 'Dự báo Quantile & Local Agents · Th4 – Th5 2026',
      'proj.rag.meta_home': 'RAG & Vector Indexing · Th12 2025 – Th4 2026',
      'proj.healthlab_web.role': 'Astro Typography & Thành phần Figma',

      // Work page
      'work.title': 'Mình xây những hệ thống AI minh bạch và kiểm chứng được',
      'work.filter.all': 'Tất cả',
      'work.filter.agents': 'AI Agents',
      'work.filter.data': 'Data & RAG',
      'work.filter.web': 'Web',
      'work.sort.newest': 'Thời gian: Mới nhất ↓',
      'work.sort.oldest': 'Thời gian: Cũ nhất ↑',
      'work.sort.col_newest': 'Thời gian ↓',
      'work.sort.col_oldest': 'Thời gian ↑',
      'work.col.project': 'Dự án',
      'work.col.domain': 'Lĩnh vực',
      'work.col.capabilities': 'Phần mình đảm nhận',
      'work.domain.health': 'Y tế công cộng',
      'work.domain.web': 'Web biên tập',
      'work.domain.safety': 'An toàn vận hành',
      'work.domain.maritime': 'Logistics hàng hải',
      'work.domain.rag': 'Tri thức cá nhân',
      'work.cap.health': 'Evidence Pipeline & Duyệt biên tập',
      'work.cap.web': 'Astro Typography & Figma UI',
      'work.cap.harness': 'Kiểm tra Tool & Phê duyệt thủ công',
      'work.cap.harbormind': 'Quantile ML & Local Gemma Agents',
      'work.cap.rag': 'RAG Pipeline & Vector Indexing',
      'work.date.oct_present': 'Th10 2026 – Nay',
      'work.date.sep_2026': 'Th9 2026',
      'work.date.apr_may_2026': 'Th4 – Th5 2026',
      'work.date.dec_apr_2026': 'Th12 2025 – Th4 2026',
      'work.archive_cta': 'Kho GitHub ↗',

      // About page
      'about.title': 'Mình xây những hệ thống AI để bạn có thể tin và kiểm chứng',
      'about.bio_1': 'Mình là Nguyễn Đức Tuấn Đạt, hiện là AI Engineer sống và làm việc tại TP. Hồ Chí Minh. Trước đó, mình tốt nghiệp ngành Công nghệ Thông tin (chuyên ngành Khoa học Dữ liệu) tại Đại học Khoa học Tự nhiên — ĐHQG TP.HCM (HCMUS).',
      'about.bio_2': 'Công việc của mình nằm ở điểm giao giữa ứng dụng LLM, backend và data pipeline. Khi xây một hệ thống AI, điều mình quan tâm nhất là đầu ra phải truy ngược được về nguồn dữ liệu gốc, mỗi lần gọi tool đều qua bước kiểm tra chặt chẽ, và bất cứ quyết định nào chưa đủ chắc chắn đều phải trả quyền xử lý về tay con người.',
      'about.exploring': 'Mình luôn thử tìm xem hệ thống dễ lỗi ở đâu trước…',
      'about.help_heading': 'Mình có thể giúp bạn những việc này …',
      'about.cap1.title': 'AI Agents & Guardrails',
      'about.cap1.desc': 'Mình thiết kế các AI agent gọi tool một cách an toàn: kiểm tra chặt kiểu dữ liệu đầu vào/đầu ra, đặt trần số lần thử lại, phủ sẵn bộ test offline và luôn có bước chờ người duyệt trước khi hệ thống ghi dữ liệu ra bên ngoài.',
      'about.cap2.title': 'Evidence & Data Pipelines',
      'about.cap2.desc': 'Mình xây dựng các luồng thu thập và xử lý dữ liệu có quản lý phiên bản, giữ nguyên tài liệu nguồn gốc đi kèm để biên tập viên, người phân tích hay mô hình AI lúc nào cũng có thể lần ngược lại bằng chứng.',
      'about.cap3.title': 'LLM Backends & RAG',
      'about.cap3.desc': 'Mình phát triển các dịch vụ tìm kiếm tri thức (RAG) và xử lý đa phương thức chạy thực tế, kết hợp vector database, bộ lọc kiểm định đầu ra theo luật, đánh giá prompt song ngữ và đóng gói backend FastAPI bằng Docker.',
      'about.exp_heading': 'Kinh nghiệm làm việc',
      'about.exp.hl.role': 'Technical Contributor',
      'about.exp.hl.desc': 'Mình tham gia phát triển website responsive bằng Astro cho HealthLab, đồng thời xây dựng hệ thống dữ liệu và công cụ đối chiếu nguồn cho bản tin thí điểm về chủ đề lão hóa khỏe mạnh tại Việt Nam.',
      'about.exp.sf.role': 'AI Engineering Consultant',
      'about.exp.sf.org': 'Safiri Logistics · Hợp đồng từ xa',
      'about.exp.sf.desc': 'Mình đảm nhận vai trò tư vấn kỹ thuật AI độc lập cho Safiri Logistics Pty Ltd — một doanh nghiệp công nghệ trong mảng logistics.',
      'about.exp.sf.date': 'Th5 2026 – Nay',
      'about.exp.ad.role': 'AI Engineering Contributor',
      'about.exp.ad.desc': 'Mình xây dựng bản thử nghiệm đa phương thức dùng Gemini để hỗ trợ học sinh quan sát và mô tả tranh vẽ. Trong quá trình đó, mình trực tiếp đánh giá chất lượng prompt cho cả tiếng Việt lẫn tiếng Anh, siết chặt bộ lọc kiểm định theo luật để tránh nhận xét cảm tính, và viết thêm nhiều ca kiểm thử tự động.',
      'about.exp.ad.date': 'Th6 – Th9 2026',
      'about.creds_heading': 'Chứng chỉ & Nền tảng',
      'about.cred.nvidia.desc': 'Chứng chỉ xác thực năng lực về kiến trúc LLM, quy trình truy xuất thông tin (RAG), đánh giá mô hình và xây dựng hệ thống AI tạo sinh.',
      'about.cred.nvidia.link': 'Xác thực trên Credly ↗',
      'about.cred.gadv.desc': 'Chương trình chuyên sâu về mô hình thống kê, phân tích dữ liệu bằng Python, hồi quy và quy trình machine learning.',
      'about.cred.view': 'Xem chứng chỉ ↗',
      'about.edu_heading': 'Học vấn & Ngoại ngữ',
      'about.edu.hcmus': 'Cử nhân CNTT & Khoa học Dữ liệu · 2021–2025',
      'about.lang.vn_en.title': 'Tiếng Việt & Tiếng Anh',
      'about.lang.vn_en.desc': 'Tiếng Việt bản ngữ · Tiếng Anh C1',
      'about.lang.ja.title': 'Tiếng Nhật',
      'about.lang.ja.desc': 'Mục tiêu N2 · Mình đang chủ động ôn luyện',
      'about.lang.de.title': 'Tiếng Đức',
      'about.lang.de.desc': 'Trình độ A1 · Mình đang tự học thêm',

      // Contact page
      'contact.title': 'Cùng nhau xây dựng những hệ thống thật đáng tin cậy',
      'contact.q1': 'Bạn tên là gì?',
      'contact.p1': 'Minh Anh *',
      'contact.q2': 'Email để mình liên hệ lại?',
      'contact.p2': 'ban@congty.com *',
      'contact.q3': 'Bạn đang làm việc ở công ty hay nhóm nào?',
      'contact.p3': 'Công ty / Nhóm nghiên cứu',
      'contact.q4': 'Bạn muốn trao đổi với mình về chuyện gì?',
      'contact.p4': 'Vị trí AI Engineer, LLM, Backend...',
      'contact.q5': 'Lời nhắn của bạn',
      'contact.p5': 'Chào Tuấn Đạt, mình muốn trao đổi về... *',
      'contact.send': 'Gửi đi!',
      'contact.sending': 'Đang gửi…',
      'contact.sent': 'Đã gửi ✓',
      'contact.details': 'Thông tin liên hệ',
      'contact.info': 'Chi tiết',
      'contact.copy_email': 'Sao chép email',
      'contact.copied': 'Đã sao chép ✓',
      'contact.open_draft': 'Mở ứng dụng Email ↗',
      'contact.location': 'TP. Hồ Chí Minh, Việt Nam',
      'contact.err_name': 'Bạn nhập giúp mình tên của bạn nhé.',
      'contact.err_email': 'Bạn kiểm tra lại địa chỉ email giúp mình để mình có thể phản hồi lại nhé.',
      'contact.err_msg': 'Bạn viết thêm vài dòng lời nhắn trước khi gửi giúp mình nhé.',
      'contact.local_msg': 'Đang ở bản xem thử trên máy: khi đưa lên mạng, Netlify Forms sẽ tự động gửi tin nhắn về ndtdat.data@gmail.com. Bạn cũng có thể mở ứng dụng Mail ở nút bên dưới.',
      'contact.ok_msg': 'Mình đã nhận được tin nhắn rồi — cảm ơn bạn nhiều nhé! Mình sẽ sớm phản hồi lại.',
      'contact.fail_msg': 'Hiện tại form chưa gửi được — bạn có thể mở nháp email ở bên dưới hoặc sao chép địa chỉ ndtdat.data@gmail.com giúp mình nhé.',

      // Case Studies shared
      'case.back': '← Quay lại Dự án',
      'case.role_focus': 'Vai trò & Trọng tâm',
      'case.stack_verify': 'Công nghệ & Kiểm chứng',
      'case.stack_scope': 'Công nghệ & Phạm vi',
      'case.stack_dataset': 'Công nghệ & Dữ liệu',
      'case.stack': 'Công nghệ',
      'case.timeline': 'Thời gian',
      'case.view_repo': 'Xem repo ↗',
      'case.watch_demo': 'Xem demo ↗',
      'case.problem': 'Bài toán đặt ra',
      'case.built': 'Phần mình trực tiếp xây',
      'case.verified': 'Cách mình kiểm chứng',
      'case.artifacts': 'Các sản phẩm công khai',
      'case.sys_design': 'Thiết kế hệ thống',
      'case.next': 'Dự án tiếp theo',
      'case.all_work': 'Tất cả dự án',

      // Case Study 1: HealthLab
      'hl.meta_role': 'Kỹ thuật dữ liệu, Truy vết nguồn bằng chứng, Quy trình duyệt biên tập',
      'hl.meta_stack': 'Python, Dataset có phiên bản, Newsletter Pilot có giám sát',
      'hl.meta_time': 'Th10 2026 – Nay · Lão hóa khỏe mạnh tại Việt Nam',
      'hl.tag1': 'Kiểm duyệt biên tập · Mô phỏng',
      'hl.tag2': 'Tự thao tác hoặc Tự động chạy',
      'hl.demo_title': 'Nguồn tài liệu công khai có thật sự khớp với bản nháp này không?',
      'hl.source_label': 'Đoạn trích từ nguồn công khai',
      'hl.draft_v2_html': 'Chương trình tầm soát sức khỏe người cao tuổi được triển khai <mark>trên toàn quốc</mark>.',
      'hl.draft_v3_html': 'Chương trình tầm soát sức khỏe người cao tuổi hiện đang được thí điểm tại <mark>một quận</mark>.',
      'hl.src_placeholder': 'Bạn bấm nút bên dưới để mở đoạn trích từ tài liệu gốc và đối chiếu chi tiết đang được tô sáng nhé.',
      'hl.src_quote_html': '“Chương trình tầm soát cộng đồng giai đoạn một chỉ giới hạn trong phạm vi <mark>một quận</mark>.”',
      'hl.problem_p': 'Trong truyền thông y tế công cộng, chỉ cần một câu diễn đạt bị phóng đại — chẳng hạn biến một chương trình thí điểm ở một quận thành triển khai trên toàn quốc — là đủ làm giảm niềm tin của người đọc. Nếu AI chỉ tóm tắt mà không giữ lại đường dẫn về nguồn gốc, biên tập viên sẽ phải mất công đọc lại toàn bộ tài liệu từ đầu.',
      'hl.built_p1': 'Mình thiết kế một pipeline bằng Python cho bản tin thí điểm có giám sát của HealthLab về chủ đề lão hóa khỏe mạnh tại Việt Nam. Hệ thống này thu thập các bài viết y tế công cộng, lưu giữ nguyên vẹn tài liệu nguồn gốc trong từng phiên bản dữ liệu, rồi tạo ra bản nháp có gắn kèm trích dẫn đến đúng nguồn.',
      'hl.built_p2': 'Nhờ vậy, biên tập viên có thể lần ngược từng câu về đúng đoạn văn gốc để kiểm tra, và thao tác phê duyệt sẽ khóa chặt vào đúng phiên bản bản nháp đó trước khi xuất bản.',
      'hl.verified_p': 'Mình thiết kế để toàn bộ bộ dữ liệu xuất ra đều có thể kiểm toán lại ở chế độ offline. Khi biên tập viên bấm duyệt, trạng thái duyệt sẽ gắn chết vào đúng phiên bản issue đó để tránh tình trạng có chỉnh sửa ngoài ý muốn lọt vào bản phát hành.',
      'hl.repo_btn': 'Kho mã nguồn công khai ↗',
      'hl.btn_step0': 'Kiểm tra nguồn đính kèm',
      'hl.btn_step1': 'Mở bản nháp sửa v3',
      'hl.btn_step2': 'Phê duyệt v3',
      'hl.btn_step3': 'Chạy lại mô phỏng',
      'hl.play': 'Tự động trình diễn',
      'hl.pause': 'Tạm dừng',
      'hl.replay': 'Xem lại từ đầu',
      'hl.status0': 'Bản nháp v2 đang chờ biên tập viên rà soát. Bạn hãy bấm kiểm tra để đối chiếu chi tiết tô sáng với tài liệu gốc.',
      'hl.status1': 'Hệ thống phát hiện điểm không khớp: tài liệu gốc chỉ nhắc tới thí điểm ở một quận, còn bản nháp v2 lại viết thành toàn quốc.',
      'hl.status2': 'Bản nháp v3 đã được chỉnh lại phạm vi cho đúng với nguồn chứng cứ gốc và sẵn sàng để biên tập viên khóa duyệt.',
      'hl.status3': 'Nhật ký kiểm định đã được lưu lại: Bản nháp v3 chính thức được phê duyệt để xuất bản tin (trạng thái mô phỏng).',

      // Case Study 2: Reliable Agent Harness
      'hr.meta_role': 'Kiến trúc AI Agent, Kiểm định Tool, Cổng phê duyệt thủ công',
      'hr.meta_stack': 'Python, CLI & HTTP API, 368 Offline Tests đạt chuẩn',
      'hr.meta_time': 'Th9 2026 · Nguyên mẫu công khai',
      'hr.tag1': 'Mô phỏng tương tác · Cổng phê duyệt',
      'hr.demo_title': 'Agent chỉ đề xuất. Con người mới là người duyệt đúng hành động đó.',
      'hr.sheet_tool': 'Lời gọi công cụ đề xuất',
      'hr.sheet_claim': 'Bạn có muốn tạo một sự cố mức độ cao cho lỗi timeout lặp lại ở checkout API không?',
      'hr.sheet_trace': 'Nhật ký thực thi Harness',
      'hr.btn_approve': 'Phê duyệt hành động',
      'hr.btn_reject': 'Từ chối hành động',
      'hr.btn_reset': 'Đặt lại mô phỏng',
      'hr.badge_pending': 'Đang chờ người duyệt',
      'hr.badge_approved': 'Đã duyệt · Đã thực thi',
      'hr.badge_rejected': 'Đã từ chối · Đã chặn',
      'hr.status_pending': 'Hành động đề xuất đang được tạm giữ lại, chờ người phụ trách duyệt hoặc từ chối chính xác payload này.',
      'hr.status_approved': 'Người duyệt đã xác nhận đúng mã băm payload #9f2c. Hệ thống đã tạo sự cố INC-402 và lưu lại nhật ký offline.',
      'hr.status_rejected': 'Người duyệt đã từ chối lệnh create_incident. Không có thay đổi nào bị ghi ra ngoài và agent đã dừng lại an toàn.',
      'hr.problem_p': 'AI agent có thể phát hiện tín hiệu bất thường trong vận hành rất nhanh, nhưng nếu mình để LLM tự do gọi các tool có khả năng thay đổi dữ liệu mà không có lớp kiểm tra cố định, hệ thống rất dễ sinh ra những lỗi âm thầm: truyền sai tham số, lặp retry không điểm dừng, hoặc tự ý ghi dữ liệu ra ngoài mà chưa ai duyệt.',
      'hr.built_p1': 'Mình xây dựng một bộ harness bằng Python dùng được qua cả CLI lẫn HTTP API. Mọi lệnh gọi tool đều phải đi qua bước kiểm định kiểu dữ liệu đầu vào/đầu ra, tuân thủ giới hạn số lần retry và chủ động dừng lại trước các thao tác có tác động ra ngoài để chờ người kiểm duyệt bấm chấp thuận hoặc từ chối.',
      'hr.built_p2': 'Dù người duyệt chọn đồng ý hay từ chối, quyết định đó đều được ràng buộc với đúng payload của hành động và ghi vào nhật ký kiểm toán để có thể tra cứu lại bất cứ lúc nào.',
      'hr.verified_p': 'Bản thử nghiệm này đã vượt qua toàn bộ 368 ca kiểm thử offline, bao phủ từ kiểm tra schema, chạm trần retry, ràng buộc chữ ký phê duyệt cho tới trường hợp từ chối sạch mà không gây ra tác dụng phụ nào. Mình cũng chuẩn bị sẵn dữ liệu giả lập để bất kỳ ai cũng có thể tự chạy thử cả hai nhánh ngay trên máy.',

      // Case Study 3: HarborMind
      'hm.meta_role': 'Pipeline dữ liệu AIS, Hồi quy Quantile, Trợ lý Gemma 4 chạy offline',
      'hm.meta_stack': 'LightGBM, Gemma 4 (Offline), Dữ liệu NOAA AIS trên Kaggle',
      'hm.meta_time': 'Th4 – Th5 2026 · Gemma 4 Good Hackathon',
      'hm.tag1': 'Cảng Long Beach · Mô phỏng dự báo Quantile',
      'hm.demo_title': 'Khi độ bất định tăng cao, hệ thống sẽ trả lại quyền cầm lái cho thuyền trưởng.',
      'hm.sheet_label': 'Khoảng dự báo thời gian tàu chờ (P10 — P50 — P90)',
      'hm.sc_clear': 'Cầu cảng thoáng',
      'hm.sc_mod': 'Hàng chờ cao điểm',
      'hm.sc_storm': 'Độ bất định cao',
      'hm.badge_clear': 'Sẵn sàng khuyến nghị',
      'hm.badge_mod': 'Khuyến nghị kèm lưu ý',
      'hm.badge_storm': 'Bàn giao thuyền trưởng',
      'hm.status_clear': 'Khoảng dự báo tại Berth 42 đang khá hẹp và ổn định. Agent Gemma chạy nội bộ sẽ giải thích lý do khuyến nghị cập cảng với độ tin cậy cao.',
      'hm.status_mod': 'Lượng tàu chờ tại vịnh San Pedro đang bắt đầu dồn lại. Hệ thống đưa ra khuyến nghị kèm bối cảnh hàng đợi và bài toán đánh đổi nhiên liệu.',
      'hm.status_storm': 'Độ rộng khoảng dự báo đã vượt ngưỡng an toàn. HarborMind chủ động tắt điều hướng tự động và bàn giao quyền quyết định trực tiếp lại cho thuyền trưởng.',
      'hm.problem_p': 'Nếu chỉ đưa ra một con số dự báo trung bình về tình trạng tắc nghẽn cảng thì rủi ro thực tế sẽ bị che khuất. Biết rằng tàu chờ trung bình 22 tiếng là chưa đủ an toàn nếu thực tế có thể dao động từ 11 đến 38 tiếng khi cầu cảng trục trặc — nhất là lúc tàu đang ngoài khơi và mạng chập chờn.',
      'hm.built_p': 'Mình trực tiếp xử lý bộ dữ liệu hành trình tàu AIS của NOAA MarineCadastre (giai đoạn 2023–2025) tại khu vực cảng Los Angeles / Long Beach rồi công bố bản dữ liệu sạch lên Kaggle. Từ nền dữ liệu đó, HarborMind kết hợp mô hình hồi quy phân vị LightGBM với Gemma 4 chạy hoàn toàn offline để giải thích khuyến nghị chờ cảng — và tự động trả quyết định về tay thuyền trưởng ngay khi biên độ bất định vượt mức cho phép.',
      'hm.artifacts_p': 'Bạn có thể xem riêng từng phần mình đã công khai cho dự án này: video chạy demo, mã nguồn agent & dashboard, pipeline xử lý dữ liệu & ML, và bộ dữ liệu sạch trên Kaggle.',

      // Case Study 4: mini-llm-twin
      'rag.meta_role': 'Kiến trúc RAG đầu-cuối, Pipeline dữ liệu & Truy xuất Vector',
      'rag.meta_stack': 'Python, FastAPI, MongoDB Atlas Vector Search, Google Gemini, Docker',
      'rag.meta_time': 'Th12 2025 – Th4 2026 · Trợ lý tri thức cá nhân',
      'rag.tag1': 'Trình xem kiến trúc RAG',
      'rag.tag2': 'Bấm vào từng bước để xem dữ liệu',
      'rag.sheet_label': 'Dữ liệu luồng xử lý tại bước này',
      'rag.s1_title': '01 · Thu thập & Chia đoạn tri thức',
      'rag.s1_note': 'Các ghi chú cá nhân và nhật ký dự án được chuẩn hóa rồi chia thành từng đoạn có phần gối đầu (overlap) để không bị đứt mạch ngữ cảnh trước khi tạo vector.',
      'rag.s2_title': '02 · Tạo Embedding bằng Google Gemini',
      'rag.s2_note': 'Mỗi đoạn văn bản được chuyển thành vector 768 chiều thông qua Google Gemini và lưu chống trùng lặp vào MongoDB Atlas.',
      'rag.s3_title': '03 · Tìm kiếm Vector trên MongoDB Atlas',
      'rag.s3_note': 'Backend FastAPI sẽ truy vấn chỉ mục vector trên Atlas bằng độ tương đồng cosine để tìm ra những đoạn ngữ cảnh sát với câu hỏi nhất.',
      'rag.s4_title': '04 · Tổng hợp câu trả lời bám sát ngữ cảnh',
      'rag.s4_note': 'Gemini tổng hợp câu trả lời ngắn gọn, bám chặt vào các đoạn thông tin vừa tìm được rồi trả về dạng JSON có cấu trúc rõ ràng.',
      'rag.design_p1': 'Mình xây mini-llm-twin để biến kho ghi chú và tài liệu cá nhân thành một trợ lý có thể hỏi đáp được. Hệ thống đọc dữ liệu đầu vào, chia nhỏ thành các đoạn giữ ngữ cảnh gối đầu, tạo embedding bằng Google Gemini (text-embedding-004) rồi lập chỉ mục trên MongoDB Atlas để tìm kiếm theo ngữ nghĩa.',
      'rag.design_p2': 'Phía phục vụ truy vấn là một backend FastAPI được đóng gói gọn trong Docker, chuyên trả về câu trả lời có cấu trúc và chỉ bám sát các đoạn ngữ cảnh truy xuất được — nhờ đó mình có thể triển khai chạy giống hệt nhau trên mọi môi trường.',
    },

    ja: {
      // Brand identity
      'brand.marquee': 'Kelvin Nguyen<span class="spacer">—</span>Kelvin Nguyen<span class="spacer">—</span>',
      'brand.full_name': 'Kelvin Nguyen (Nguyen Duc Tuan Dat)',
      'brand.short_name': 'Kelvin Nguyen',
      'brand.doc_home': 'Kelvin Nguyen — AIエンジニア',
      'brand.credit': '<span>Code by</span><span>Kelvin</span><span class="credit-extra">Nguyen</span>',
      'brand.runtime': 'KELVIN.AI // RUNTIME',
      // Navigation & Chrome
      'nav.work': '実績',
      'nav.about': '自己紹介',
      'nav.contact': 'お問い合わせ',
      'nav.home': 'ホーム',
      'nav.menu': 'メニュー',
      'nav.navigation': 'ナビゲーション',
      'nav.language': '言語',
      'nav.socials': 'SNS・リンク',
      'nav.skip': '本文へスキップ',

      // Footer
      'footer.lets_work': '一緒に仕事を',
      'footer.together': 'しましょう',
      'footer.get_in_touch': 'お問い合わせ',
      'footer.version': 'バージョン',
      'footer.edition': '2026 © Edition',
      'footer.local_time': '現地時間',

      // Home Hero & Intro
      'home.hanger_default': '拠点:<br>ホーチミン市,<br>ベトナム',
      'home.hanger_coords': '10.7769° N<br>106.7009° E<br>Saigon · VN',
      'home.role_title': 'AIエンジニア',
      'home.role_1': 'LLM・Agent・バックエンド',
      'home.role_2': 'データ・RAGパイプライン',
      'home.role_3': '信頼性の高いAIシステム',
      'home.intro_lead': '根拠データへの追跡可能性、厳格なツール検証、そして人の承認フローを備えた信頼性の高いAIシステムを構築します。',
      'home.intro_body': 'ベトナム・ホーチミン拠点のAIエンジニア、Kelvin Nguyenです。LLMアプリケーション、AIエージェント、バックエンド、データパイプラインを開発し、失敗ケースを検証しながら人が確認・判断できるワークフローを設計しています。',
      'home.about_me': '自己紹介',
      'home.selected_work': '主な実績',
      'home.more_work': '実績一覧を見る',

      // Project metadata & rows
      'proj.healthlab.meta_home': 'データパイプライン・編集レビュー · 2026年10月 – 現在',
      'proj.harness.meta_home': 'AIエージェント・ガードレール · 2026年9月',
      'proj.harbormind.meta_home': '分位予測ML・ローカルエージェント · 2026年4月 – 5月',
      'proj.rag.meta_home': 'RAG・ベクトル検索 · 2025年12月 – 2026年4月',
      'proj.healthlab_web.role': 'Astroタイポグラフィ・Figma実装',

      // Work page
      'work.title': '検証可能で信頼できるAIシステムを構築',
      'work.filter.all': 'すべて',
      'work.filter.agents': 'AIエージェント',
      'work.filter.data': 'データ & RAG',
      'work.filter.web': 'Web',
      'work.sort.newest': '時系列: 新しい順 ↓',
      'work.sort.oldest': '時系列: 古い順 ↑',
      'work.sort.col_newest': '期間 ↓',
      'work.sort.col_oldest': '期間 ↑',
      'work.col.project': 'プロジェクト',
      'work.col.domain': '領域',
      'work.col.capabilities': '担当・技術',
      'work.domain.health': '公衆衛生',
      'work.domain.web': 'エディトリアルWeb',
      'work.domain.safety': '運用安全性',
      'work.domain.maritime': '海事ロジスティクス',
      'work.domain.rag': '個人ナレッジ検索',
      'work.cap.health': '根拠パイプライン・編集レビュー',
      'work.cap.web': 'Astroタイポグラフィ・Figma実装',
      'work.cap.harness': 'ツール検証・人間による承認ゲート',
      'work.cap.harbormind': '分位回帰ML・ローカルGemmaエージェント',
      'work.cap.rag': 'RAGパイプライン・ベクトル索引',
      'work.date.oct_present': '2026年10月 – 現在',
      'work.date.sep_2026': '2026年9月',
      'work.date.apr_may_2026': '2026年4月 – 5月',
      'work.date.dec_apr_2026': '2025年12月 – 2026年4月',
      'work.archive_cta': 'GitHubアーカイブ ↗',

      // About page
      'about.title': '信頼し検証できるAIシステムを設計・実装',
      'about.bio_1': 'ホーチミン市を拠点とするAIエンジニア、Kelvin Nguyen（Nguyen Duc Tuan Dat）です。ホーチミン市自然科学大学（HCMUS）にて情報技術・データサイエンス専攻を修了しました。',
      'about.bio_2': 'LLMアプリケーション、バックエンド開発、データパイプラインの交差点を得意としています。出力を一次ソースに紐づけ、ツール呼び出しを厳格に検証し、不確実性が高い判断は必ず人間へ引き継ぐ設計を心がけています。',
      'about.exploring': 'システムがどこで壊れるかを常に検証しています…',
      'about.help_heading': '提供できる価値 …',
      'about.cap1.title': 'AIエージェント & ガードレール',
      'about.cap1.desc': '型安全な入出力バリデーション、リトライ上限、オフラインテスト、副作用実行前の人間承認ゲートを備えたツール呼び出し型エージェントを設計します。',
      'about.cap2.title': '根拠・データパイプライン',
      'about.cap2.desc': '元ソースを保持するバージョン管理データセットを構築し、編集者・アナリスト・AIモデルが常に検証可能なデータで稼働できる基盤を整えます。',
      'about.cap3.title': 'LLMバックエンド & RAG',
      'about.cap3.desc': 'ベクトル検索、ルールベース検証器、多言語プロンプト評価、Docker化されたFastAPIバックエンドによる本番品質のRAG・マルチモーダル基盤を構築します。',
      'about.exp_heading': '経歴',
      'about.exp.hl.role': 'テクニカルコントリビューター',
      'about.exp.hl.desc': 'HealthLabのAstro製レスポンシブサイト開発に貢献するとともに、ベトナムの健康長寿ニュースレター試行版向けに根拠ソース連携データパイプラインと編集レビューツールを構築。',
      'about.exp.sf.role': 'AIエンジニアリングコンサルタント',
      'about.exp.sf.org': 'Safiri Logistics · リモート業務委託',
      'about.exp.sf.desc': '物流テクノロジー企業 Safiri Logistics Pty Ltd に対し、独立したAIエンジニアリングのコンサルティングを提供。',
      'about.exp.sf.date': '2026年5月 – 現在',
      'about.exp.ad.role': 'AIエンジニアリングコントリビューター',
      'about.exp.ad.desc': '学生の描画観察・言語化を支援するGeminiマルチモーダル試作を開発。ベトナム語・英語プロンプト評価、ルールベース検証器の強化、テストスイート拡充を担当。',
      'about.exp.ad.date': '2026年6月 – 9月',
      'about.creds_heading': '資格・バックグラウンド',
      'about.cred.nvidia.desc': 'LLMアーキテクチャ、検索拡張生成（RAG）、評価手法および応用生成AIシステムに関する認定資格。',
      'about.cred.nvidia.link': 'Credlyで確認 ↗',
      'about.cred.gadv.desc': '統計モデリング、Pythonデータ分析、回帰分析、機械学習ワークフローの実践修了資格。',
      'about.cred.view': '証明書を見る ↗',
      'about.edu_heading': '学歴・言語スキル',
      'about.edu.hcmus': '情報技術学士（データサイエンス専攻）· 2021–2025',
      'about.lang.vn_en.title': 'ベトナム語・英語',
      'about.lang.vn_en.desc': 'ベトナム語 ネイティブ · 英語 C1（ビジネスレベル）',
      'about.lang.ja.title': '日本語',
      'about.lang.ja.desc': 'JLPT N2目標 · 継続学習中',
      'about.lang.de.title': 'ドイツ語',
      'about.lang.de.desc': 'A1レベル · 基礎学習中',

      // Contact page
      'contact.title': '信頼できるAIを一緒に作りましょう',
      'contact.q1': 'お名前',
      'contact.p1': '山田 太郎 *',
      'contact.q2': 'メールアドレス',
      'contact.p2': 'taro@company.jp *',
      'contact.q3': '会社名・チーム名',
      'contact.p3': '企業・研究機関など',
      'contact.q4': 'ご相談内容',
      'contact.p4': 'AIエンジニア採用、LLM開発など…',
      'contact.q5': 'メッセージ',
      'contact.p5': 'Kelvin様、ご相談したい件があり連絡しました… *',
      'contact.send': '送信する',
      'contact.sending': '送信中…',
      'contact.sent': '送信完了 ✓',
      'contact.details': '連絡先',
      'contact.info': '基本情報',
      'contact.copy_email': 'メールをコピー',
      'contact.copied': 'コピーしました ✓',
      'contact.open_draft': 'メールアプリで開く ↗',
      'contact.location': 'ベトナム・ホーチミン市',
      'contact.err_name': 'お名前を入力してください。',
      'contact.err_email': '返信可能なメールアドレスを入力してください。',
      'contact.err_msg': 'メッセージを入力してください。',
      'contact.local_msg': 'ローカルプレビュー中：デプロイ後はNetlify Forms経由でndtdat.data@gmail.comへ直接送信されます。下のリンクからメール作成も可能です。',
      'contact.ok_msg': '送信が完了しました。ご連絡ありがとうございます！折り返しご連絡いたします。',
      'contact.fail_msg': '送信できませんでした。下のメール作成リンクまたはndtdat.data@gmail.comへ直接ご連絡ください。',

      // Case Studies shared
      'case.back': '← 実績一覧へ戻る',
      'case.role_focus': '役割・フォーカス',
      'case.stack_verify': '技術・検証',
      'case.stack_scope': '技術・スコープ',
      'case.stack_dataset': '技術・データセット',
      'case.stack': '技術スタック',
      'case.timeline': '期間',
      'case.view_repo': 'コードを見る ↗',
      'case.watch_demo': 'デモ動画 ↗',
      'case.problem': '課題',
      'case.built': '構築した内容',
      'case.verified': '検証方法',
      'case.artifacts': '公開リンク',
      'case.sys_design': 'システム設計',
      'case.next': '次のプロジェクト',
      'case.all_work': 'すべての実績',

      // Case Study 1: HealthLab
      'hl.meta_role': 'データエンジニアリング・根拠トレーサビリティ・編集レビュー基盤',
      'hl.meta_stack': 'Python・バージョン管理データセット・監修付きニュースレター試行',
      'hl.meta_time': '2026年10月 – 現在 · ベトナム健康長寿プロジェクト',
      'hl.tag1': '編集レビュー · シミュレーション',
      'hl.tag2': '手動ステップ / 自動再生',
      'hl.demo_title': '一次ソースは本当に下書きの記述を裏付けていますか？',
      'hl.source_label': '紐づけられた公開ソース',
      'hl.draft_v2_html': 'この健康長寿検診プログラムは<mark>全国で</mark>利用可能です。',
      'hl.draft_v3_html': 'この健康長寿検診プログラムは現在<mark>1つの地区で</mark>試行実施されています。',
      'hl.src_placeholder': '紐づけられたソース抜粋を開き、承認前にハイライト箇所の整合性を確認してください。',
      'hl.src_quote_html': '「第1フェーズの地域検診パイロットは<mark>1つの地区のみ</mark>を対象としています。」',
      'hl.problem_p': '公衆衛生の情報発信では、1地区での試行を全国展開と誇張するようなわずかな表現のズレでも信頼を損ないます。出典紐づけのないAI要約では、編集者が最初から原文を読み直す手間が発生します。',
      'hl.built_p1': 'ベトナムの健康長寿をテーマとしたHealthLabの監修付きニュースレター試行版向けにPythonパイプラインを設計。公開記事を収集し、一次根拠をバージョン管理データセットに保持したうえで出典リンク付き下書きを生成します。',
      'hl.built_p2': '編集者は下書きの各文を元ソースと照合し、公開前に特定バージョンへ承認を紐づけられます。',
      'hl.verified_p': '出力データセットはオフラインで監査可能であり、承認操作は厳密な下書きバージョンにロックされます。',
      'hl.repo_btn': '公開リポジトリ ↗',
      'hl.btn_step0': 'ソースを確認する',
      'hl.btn_step1': '修正版 v3 を開く',
      'hl.btn_step2': 'v3 を承認する',
      'hl.btn_step3': '最初からやり直す',
      'hl.play': '自動デモを再生',
      'hl.pause': '一時停止',
      'hl.replay': 'もう一度再生',
      'hl.status0': '下書き v2 が編集レビュー待ちです。クリックして出典との整合性を確認してください。',
      'hl.status1': '不一致を検出：公開ソースは1地区の試行と記載していますが、下書き v2 は全国対応と表現しています。',
      'hl.status2': '下書き v3 は出典の範囲に正確に合わせて修正され、v3 として承認可能です。',
      'hl.status3': '監査ログ記録完了：下書き v3 がニュースレター出力用に承認されました（シミュレーション）。',

      // Case Study 2: Reliable Agent Harness
      'hr.meta_role': 'AIエージェント設計・ツール検証・人間承認ガードレール',
      'hr.meta_stack': 'Python・CLI & HTTP API・オフラインテスト368件合格',
      'hr.meta_time': '2026年9月 · 公開プロトタイプ',
      'hr.tag1': 'インタラクティブ検証 · 承認ゲート',
      'hr.demo_title': 'エージェントが提案し、人間が正確な実行内容を承認する。',
      'hr.sheet_tool': '提案されたツール呼び出し',
      'hr.sheet_claim': '決済APIタイムアウト再発に対する高優先度インシデントを作成しますか？',
      'hr.sheet_trace': 'ハーネス実行トレース',
      'hr.btn_approve': '承認して実行',
      'hr.btn_reject': '却下する',
      'hr.btn_reset': 'リセット',
      'hr.badge_pending': '人間の承認待ち',
      'hr.badge_approved': '承認済 · 実行完了',
      'hr.badge_rejected': '却下済 · 実行ブロック',
      'hr.status_pending': 'レビュアーが正確なペイロードを承認または却下するまで実行を一時停止しています。',
      'hr.status_approved': 'ペイロードハッシュ #9f2c を承認。インシデント INC-402 を起票し監査ログへ記録しました。',
      'hr.status_rejected': 'create_incident を却下しました。外部への書き込みは一切発生せず安全に停止しました。',
      'hr.problem_p': '自律エージェントは障害兆候を素早く分析できますが、決定的チェックなしにLLMへ状態変更ツールを委ねると、不正引数・無限リトライ・未承認書き込みといった静かな障害を招きます。',
      'hr.built_p1': 'CLIおよびHTTP APIから利用できるPythonハーネスを構築しました。すべてのツール呼び出しは型付き入出力検証とリトライ上限を通過し、副作用を伴う操作前に人間の承認ゲートで一時停止します。',
      'hr.built_p2': '承認・却下の判断は提案ペイロードに厳密に紐づけられ、監査可能なログへ記録されます。',
      'hr.verified_p': 'スキーマ検証、リトライ上限、承認バインディング、副作用ゼロの却下経路を網羅する368件のオフラインテストに合格しています。',

      // Case Study 3: HarborMind
      'hm.meta_role': 'AISデータ基盤・分位回帰ML・ローカルGemma 4意思決定支援',
      'hm.meta_stack': 'LightGBM・Gemma 4（オフライン）・NOAA AISデータ（Kaggle公開）',
      'hm.meta_time': '2026年4月 – 5月 · Gemma 4 Good ハッカソン',
      'hm.tag1': 'ロングビーチ港 · 分位予測シミュレーション',
      'hm.demo_title': '予測の不確実性が高まったら、判断を船長へ引き継ぐ。',
      'hm.sheet_label': '待機時間の分位予測レンジ（P10 — P50 — P90）',
      'hm.sc_clear': '通常混雑',
      'hm.sc_mod': 'ピーク待機',
      'hm.sc_storm': '高不確実性',
      'hm.badge_clear': '自動アドバイザリ可能',
      'hm.badge_mod': '注意付きアドバイザリ',
      'hm.badge_storm': '船長へ引き継ぎ',
      'hm.status_clear': 'バース42の予測幅は狭く安定。ローカルGemmaエージェントが高信頼な入港推奨理由を提示します。',
      'hm.status_mod': 'サンペドロ湾で待機列が増加中。待機背景と燃料消費のトレードオフを併せて提示します。',
      'hm.status_storm': '分位幅が安全閾値を超過。HarborMindは自動判断を抑制し、最終判断を船長へ引き継ぎます。',
      'hm.problem_p': '港湾混雑の単一点予測はリスクを隠します。平均22時間待ちでも実際には11〜38時間の幅がある場合、通信が不安定な洋上での意思決定は大きな危険を伴います。',
      'hm.built_p': 'NOAA MarineCadastreのLA/Long Beach港AIS航跡データ（2023–2025年）を前処理しKaggleに公開。LightGBM分位回帰とオフライン動作のGemma 4を組み合わせ、待機アドバイザリの説明と高不確実性時の船長ハンドオフを実装しました。',
      'hm.artifacts_p': 'デモ動画、エージェント＆ダッシュボード、データ＆MLパイプライン、Kaggle公開データセットの4つの成果物をそれぞれ確認できます。',

      // Case Study 4: mini-llm-twin
      'rag.meta_role': 'エンドツーエンドRAG設計・データ取込・ベクトル検索',
      'rag.meta_stack': 'Python・FastAPI・MongoDB Atlas Vector Search・Google Gemini・Docker',
      'rag.meta_time': '2025年12月 – 2026年4月 · 個人ナレッジアシスタント',
      'rag.tag1': 'RAGアーキテクチャ・インスペクタ',
      'rag.tag2': '各ステージをクリックして確認',
      'rag.sheet_label': 'ステージ処理ペイロード',
      'rag.s1_title': '01 · ナレッジ取込・チャンク分割',
      'rag.s1_note': '個人メモや技術ログをオーバーラップ保持付きチャンクへ正規化し、再現性のある前処理を行います。',
      'rag.s2_title': '02 · Google Gemini 埋め込み生成',
      'rag.s2_note': '各チャンクをGeminiで768次元ベクトルへ変換し、MongoDB Atlasへ冪等に登録します。',
      'rag.s3_title': '03 · MongoDB Atlas ベクトル検索',
      'rag.s3_note': 'FastAPIがコサイン類似度でAtlasベクトル索引を検索し、関連度の高い文脈を抽出します。',
      'rag.s4_title': '04 · 根拠に基づく回答生成',
      'rag.s4_note': '取得した文脈のみを根拠にGeminiが簡潔な回答を生成し、構造化JSONとして返却します。',
      'rag.design_p1': 'mini-llm-twinは個人ドキュメントを取り込み、オーバーラップ付きで分割し、Google Gemini（text-embedding-004）でベクトル化、MongoDB Atlasでセマンティック検索を行うRAGパイプラインです。',
      'rag.design_p2': 'Docker化されたFastAPIバックエンドが取得文脈に厳密に基づいたQ&A応答を返し、あらゆる環境で再現可能に動作します。',
    },
  };

  function resolveInitialLang() {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('lang');
    if (fromUrl && SUPPORTED.includes(fromUrl)) {
      localStorage.setItem(STORAGE_KEY, fromUrl);
      return fromUrl;
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    return 'en';
  }

  let currentLang = resolveInitialLang();

  function t(key, fallback) {
    return DICT[currentLang]?.[key] ?? DICT.en?.[key] ?? fallback ?? key;
  }

  const INITIAL_TITLE = document.title;

  function updateDocumentTitle() {
    const page = document.body?.dataset?.page;
    const shortName = t('brand.short_name', 'Kelvin Nguyen');
    if (page === 'home') {
      document.title = t('brand.doc_home', 'Kelvin Nguyen — AI Engineer');
    } else if (page === 'work') {
      document.title = `${t('nav.work', 'Work')} — ${shortName}`;
    } else if (page === 'about') {
      document.title = `${t('nav.about', 'About')} — ${shortName}`;
    } else if (page === 'contact') {
      document.title = `${t('nav.contact', 'Contact')} — ${shortName}`;
    } else if (page === 'case') {
      const prefix = INITIAL_TITLE.split(' — ')[0] || document.body?.dataset?.pageTitle || 'Case Study';
      document.title = `${prefix} — ${shortName}`;
    }
  }

  function applyTranslations(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.dataset.lang = lang;
    document.documentElement.lang = lang;

    updateDocumentTitle();

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      const val = t(key);
      if (val !== undefined) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.dataset.i18nHtml;
      const val = t(key);
      if (val !== undefined) el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      const val = t(key);
      if (val !== undefined) el.placeholder = val;
    });

    // Update Role Cycler invisible sizer to the widest label in the active language
    const sizer = document.querySelector('[data-role-sizer]');
    if (sizer) {
      const candidates = [t('home.role_1'), t('home.role_2'), t('home.role_3')];
      const longest = candidates.reduce((a, b) => (b.length > a.length ? b : a), candidates[0]);
      sizer.textContent = longest;
    }

    // Highlight active language buttons everywhere
    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      const active = btn.dataset.setLang === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    window.dispatchEvent(new CustomEvent('portfolio:langchange', { detail: { lang } }));

    if (typeof window.ScrollTrigger !== 'undefined') {
      window.ScrollTrigger.refresh();
    }
    window.__dennisLenis?.resize();
  }

  window.__i18n = {
    getLang: () => currentLang,
    setLang: (lang) => applyTranslations(lang),
    t,
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyTranslations(btn.dataset.setLang);
      });
    });
    applyTranslations(currentLang);
  });
})();
