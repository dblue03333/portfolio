/* ==========================================================================
   INTERACTIVE AI ENGINEER DEMOS & CONTACT FORM INTERACTIONS (i18n-aware)
   1. HealthLab Evidence Intelligence (Draft vs Linked Source + Walkthrough)
   2. Reliable Agent Harness (Approval Gate Approve/Reject + Action Log)
   3. HarborMind (Quantile Wait Forecast + Uncertainty Captain Handoff)
   4. mini-llm-twin (4-Stage RAG Pipeline Step Inspector)
   5. Contact Form (Netlify Forms AJAX + Validation) & Copy Email Utility
   ========================================================================== */

(() => {
  const t = (key, fallback) => (window.__i18n ? window.__i18n.t(key, fallback) : fallback);

  /* ---------- 1. HealthLab Editorial Evidence Review Demo ---------- */
  function initHealthLabDemo() {
    const root = document.querySelector('[data-demo="healthlab"]');
    if (!root) return;

    const versionBadge = root.querySelector('[data-hl-version]');
    const draftV2 = root.querySelector('[data-hl-draft-v2]');
    const draftV3 = root.querySelector('[data-hl-draft-v3]');
    const sourcePlaceholder = root.querySelector('[data-hl-source-placeholder]');
    const sourceQuote = root.querySelector('[data-hl-source-quote]');
    const statusText = root.querySelector('[data-hl-status]');
    const nextBtn = root.querySelector('[data-hl-next]');
    const playBtn = root.querySelector('[data-hl-play]');

    let step = 0;
    let timer = null;

    function render() {
      const labels = [
        t('hl.btn_step0', 'Inspect linked source'),
        t('hl.btn_step1', 'Open revised draft v3'),
        t('hl.btn_step2', 'Approve v3'),
        t('hl.btn_step3', 'Restart simulation'),
      ];
      const statuses = [
        t('hl.status0', 'Draft v2 is awaiting editorial review.'),
        t('hl.status1', 'Mismatch flagged against linked public source.'),
        t('hl.status2', 'Draft v3 matches source evidence and is ready for approval.'),
        t('hl.status3', 'Audit recorded: Draft v3 approved (simulation state).'),
      ];

      const lang = window.__i18n?.getLang() || 'en';
      const prefix = lang === 'vi' ? 'Bản nháp · ' : lang === 'ja' ? 'ニュースレター下書き · ' : 'Newsletter Draft · ';
      if (versionBadge) versionBadge.textContent = step < 2 ? `${prefix}v2` : `${prefix}v3`;
      if (draftV2) draftV2.hidden = step >= 2;
      if (draftV3) draftV3.hidden = step < 2;
      if (sourcePlaceholder) sourcePlaceholder.hidden = step > 0;
      if (sourceQuote) sourceQuote.hidden = step === 0;
      if (statusText) statusText.textContent = statuses[step];
      if (nextBtn) nextBtn.textContent = labels[step];
      if (playBtn) {
        playBtn.textContent = timer
          ? t('hl.pause', 'Pause walkthrough')
          : step === 3
          ? t('hl.replay', 'Replay walkthrough')
          : t('hl.play', 'Play walkthrough');
      }
    }

    function stopWalkthrough() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    nextBtn?.addEventListener('click', () => {
      stopWalkthrough();
      step = (step + 1) % 4;
      render();
    });

    playBtn?.addEventListener('click', () => {
      if (timer) {
        stopWalkthrough();
      } else {
        if (step === 3) step = 0;
        render();
        timer = window.setInterval(() => {
          step += 1;
          if (step >= 3) stopWalkthrough();
          render();
        }, 1750);
      }
      render();
    });

    window.addEventListener('portfolio:langchange', render);
    render();
  }

  /* ---------- 2. Reliable Agent Harness Approval Gate Demo ---------- */
  function initHarnessDemo() {
    const root = document.querySelector('[data-demo="harness"]');
    if (!root) return;

    const statusBadge = root.querySelector('[data-harness-badge]');
    const statusText = root.querySelector('[data-harness-status]');
    const logEl = root.querySelector('[data-harness-log]');
    const approveBtn = root.querySelector('[data-harness-action="approve"]');
    const rejectBtn = root.querySelector('[data-harness-action="reject"]');
    const resetBtn = root.querySelector('[data-harness-action="reset"]');

    const baseLogs = [
      '[01] tool_call.validate(create_incident) -> schema_ok (retry 1/3)',
      '[02] policy.guardrail -> side_effect=true -> human_approval_required',
    ];

    let currentMode = 'pending';

    function renderLog(extraLine) {
      if (!logEl) return;
      const lines = extraLine ? [...baseLogs, extraLine] : baseLogs;
      logEl.innerHTML = lines.map((line) => `<div>${line}</div>`).join('');
    }

    function setState(mode) {
      currentMode = mode;
      if (mode === 'pending') {
        if (statusBadge) statusBadge.textContent = t('hr.badge_pending', 'Pending human approval');
        if (statusText) statusText.textContent = t('hr.status_pending', 'Proposed action is paused until a human reviewer approves or rejects the exact payload.');
        if (resetBtn) resetBtn.hidden = true;
        renderLog(null);
      } else if (mode === 'approved') {
        if (statusBadge) statusBadge.textContent = t('hr.badge_approved', 'Approved · Dispatched');
        if (statusText) statusText.textContent = t('hr.status_approved', 'Reviewer approved exact payload hash #9f2c. Incident INC-402 created and logged offline.');
        if (resetBtn) resetBtn.hidden = false;
        renderLog('[03] reviewer.decision=APPROVE -> dispatched INC-402 (audit_id=9f2c)');
      } else if (mode === 'rejected') {
        if (statusBadge) statusBadge.textContent = t('hr.badge_rejected', 'Rejected · Blocked');
        if (statusText) statusText.textContent = t('hr.status_rejected', 'Reviewer rejected create_incident. No external write occurred; agent halted cleanly.');
        if (resetBtn) resetBtn.hidden = false;
        renderLog('[03] reviewer.decision=REJECT -> execution_aborted (zero side effects)');
      }
    }

    approveBtn?.addEventListener('click', () => setState('approved'));
    rejectBtn?.addEventListener('click', () => setState('rejected'));
    resetBtn?.addEventListener('click', () => setState('pending'));

    window.addEventListener('portfolio:langchange', () => setState(currentMode));
    setState('pending');
  }

  /* ---------- 3. HarborMind Uncertainty & Captain Handoff Demo ---------- */
  function initHarborMindDemo() {
    const root = document.querySelector('[data-demo="harbormind"]');
    if (!root) return;

    const scenarioBtns = [...root.querySelectorAll('[data-hm-scenario]')];
    const badge = root.querySelector('[data-hm-badge]');
    const p10El = root.querySelector('[data-hm-p10]');
    const p50El = root.querySelector('[data-hm-p50]');
    const p90El = root.querySelector('[data-hm-p90]');
    const spreadEl = root.querySelector('[data-hm-spread]');
    const statusText = root.querySelector('[data-hm-status]');
    const rangeBar = root.querySelector('[data-hm-range]');
    const medianMark = root.querySelector('[data-hm-median]');

    const scenarios = {
      clear: {
        badgeKey: 'hm.badge_clear',
        statusKey: 'hm.status_clear',
        p10: '2.1 h',
        p50: '3.4 h',
        p90: '4.8 h',
        spread: '2.7 h (Low)',
        left: 12,
        width: 24,
        median: 23,
      },
      moderate: {
        badgeKey: 'hm.badge_mod',
        statusKey: 'hm.status_mod',
        p10: '6.5 h',
        p50: '10.2 h',
        p90: '14.9 h',
        spread: '8.4 h (Moderate)',
        left: 26,
        width: 34,
        median: 42,
      },
      storm: {
        badgeKey: 'hm.badge_storm',
        statusKey: 'hm.status_storm',
        p10: '11.0 h',
        p50: '22.5 h',
        p90: '38.4 h',
        spread: '27.4 h (High)',
        left: 34,
        width: 58,
        median: 60,
      },
    };

    let activeKey = 'storm';

    function apply(key) {
      activeKey = key;
      const data = scenarios[key] || scenarios.storm;
      scenarioBtns.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.hmScenario === key));
      if (badge) badge.textContent = t(data.badgeKey, 'Handoff to Captain');
      if (p10El) p10El.textContent = data.p10;
      if (p50El) p50El.textContent = data.p50;
      if (p90El) p90El.textContent = data.p90;
      if (spreadEl) spreadEl.textContent = data.spread;
      if (statusText) statusText.textContent = t(data.statusKey, '');
      if (rangeBar) {
        rangeBar.style.left = `${data.left}%`;
        rangeBar.style.width = `${data.width}%`;
      }
      if (medianMark) medianMark.style.left = `${data.median}%`;
    }

    scenarioBtns.forEach((btn) => {
      btn.addEventListener('click', () => apply(btn.dataset.hmScenario));
    });

    window.addEventListener('portfolio:langchange', () => apply(activeKey));
    apply('storm');
  }

  /* ---------- 4. mini-llm-twin RAG Pipeline Inspector ---------- */
  function initRagDemo() {
    const root = document.querySelector('[data-demo="rag"]');
    if (!root) return;

    const stageBtns = [...root.querySelectorAll('[data-rag-stage]')];
    const titleEl = root.querySelector('[data-rag-title]');
    const codeEl = root.querySelector('[data-rag-code]');
    const noteEl = root.querySelector('[data-rag-note]');

    const stages = {
      ingest: {
        titleKey: 'rag.s1_title',
        noteKey: 'rag.s1_note',
        code: 'source="notion_export.md" -> chunks=42 (overlap=64 tokens) -> metadata={doc_id, updated_at}',
      },
      embed: {
        titleKey: 'rag.s2_title',
        noteKey: 'rag.s2_note',
        code: 'model="text-embedding-004" -> dim=768 -> batch_upsert(collection="twin_vectors")',
      },
      retrieve: {
        titleKey: 'rag.s3_title',
        noteKey: 'rag.s3_note',
        code: () =>
          window.__i18n?.getLang() === 'vi'
            ? 'query="Tuấn Đạt kiểm thử an toàn agent như thế nào?" -> top_k=4 -> cosine_scores=[0.94, 0.89, 0.85, 0.81]'
            : 'query="How does Kelvin test agent safety?" -> top_k=4 -> cosine_scores=[0.94, 0.89, 0.85, 0.81]',
      },
      generate: {
        titleKey: 'rag.s4_title',
        noteKey: 'rag.s4_note',
        code: 'POST /ask -> 200 OK -> answer grounded in 3 retrieved chunks (latency=680ms, dockerized)',
      },
    };

    let activeStage = 'retrieve';

    function apply(key) {
      activeStage = key;
      const s = stages[key] || stages.ingest;
      stageBtns.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.ragStage === key));
      if (titleEl) titleEl.textContent = t(s.titleKey, '');
      if (codeEl) codeEl.textContent = typeof s.code === 'function' ? s.code() : s.code;
      if (noteEl) noteEl.textContent = t(s.noteKey, '');
    }

    stageBtns.forEach((btn) => btn.addEventListener('click', () => apply(btn.dataset.ragStage)));
    window.addEventListener('portfolio:langchange', () => apply(activeStage));
    apply('retrieve');
  }

  /* ---------- 5. Contact Form & Copy Email ---------- */
  function initContactHelpers() {
    document.querySelectorAll('[data-copy-email]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const email = btn.dataset.copyEmail || 'ndtdat.data@gmail.com';
        try {
          await navigator.clipboard.writeText(email);
          btn.textContent = t('contact.copied', 'Copied to clipboard ✓');
        } catch {
          btn.textContent = email;
        }
        window.setTimeout(() => {
          btn.textContent = t('contact.copy_email', 'Copy email');
        }, 2000);
      });
    });

    const form = document.querySelector('[data-contact-form]');
    if (!form) return;

    const feedback = form.querySelector('[data-form-feedback]');
    const submitBtn = form.querySelector('[data-submit-btn]');
    const submitLabel = form.querySelector('[data-submit-label]');
    const fallbackLink = form.querySelector('[data-mailto-fallback]');

    form.querySelectorAll('.form-col input, .form-col textarea').forEach((field) => {
      const col = field.closest('.form-col');
      const sync = () => col?.classList.toggle('is-filled', field.value.trim().length > 0);
      field.addEventListener('input', sync);
      sync();
    });

    function setFeedback(text, kind) {
      if (!feedback) return;
      feedback.textContent = text;
      feedback.classList.remove('is-error', 'is-success');
      if (kind === 'error') feedback.classList.add('is-error');
      if (kind === 'success') feedback.classList.add('is-success');
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (fallbackLink) fallbackLink.hidden = true;

      const nameField = form.querySelector('[name="name"]');
      const emailField = form.querySelector('[name="email"]');
      const orgField = form.querySelector('[name="organization"]');
      const topicField = form.querySelector('[name="topic"]');
      const messageField = form.querySelector('[name="message"]');

      const name = nameField?.value.trim() || '';
      const email = emailField?.value.trim() || '';
      const org = orgField?.value.trim() || '';
      const topic = topicField?.value.trim() || 'AI Engineering Inquiry';
      const message = messageField?.value.trim() || '';

      if (!name) {
        setFeedback(t('contact.err_name', 'Please enter your name.'), 'error');
        nameField?.focus();
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setFeedback(t('contact.err_email', 'Please enter a valid email address so I can reply.'), 'error');
        emailField?.focus();
        return;
      }
      if (!message) {
        setFeedback(t('contact.err_msg', 'Please write a short message before sending.'), 'error');
        messageField?.focus();
        return;
      }

      const isVi = window.__i18n?.getLang() === 'vi';
      const subject = encodeURIComponent(`[Portfolio] ${topic} — ${name}`);
      const body = encodeURIComponent(
        isVi
          ? `Chào Tuấn Đạt,\n\nHọ tên: ${name}\nEmail: ${email}${org ? `\nĐơn vị: ${org}` : ''}\nChủ đề: ${topic}\n\n${message}`
          : `Hi Kelvin,\n\nName: ${name}\nEmail: ${email}${org ? `\nOrganization: ${org}` : ''}\nTopic: ${topic}\n\n${message}`
      );
      const mailtoHref = `mailto:ndtdat.data@gmail.com?subject=${subject}&body=${body}`;
      if (fallbackLink) fallbackLink.href = mailtoHref;

      const isLocalPreview = /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname) || window.location.protocol === 'file:';

      if (isLocalPreview) {
        setFeedback(t('contact.local_msg', 'Local preview mode.'), 'success');
        if (fallbackLink) fallbackLink.hidden = false;
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      if (submitLabel) submitLabel.textContent = t('contact.sending', 'Sending…');
      setFeedback(t('contact.sending', 'Sending…'), null);

      try {
        const formData = new FormData(form);
        formData.set('form-name', 'contact');

        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString(),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        setFeedback(t('contact.ok_msg', 'Message sent — thank you!'), 'success');
        if (submitLabel) submitLabel.textContent = t('contact.sent', 'Sent ✓');
        form.reset();
        form.querySelectorAll('.form-col').forEach((col) => col.classList.remove('is-filled'));
        window.setTimeout(() => {
          if (submitLabel) submitLabel.textContent = t('contact.send', 'Send it!');
          if (submitBtn) submitBtn.disabled = false;
        }, 3200);
      } catch {
        setFeedback(t('contact.fail_msg', 'Could not submit right now.'), 'error');
        if (fallbackLink) fallbackLink.hidden = false;
        if (submitLabel) submitLabel.textContent = t('contact.send', 'Send it!');
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHealthLabDemo();
    initHarnessDemo();
    initHarborMindDemo();
    initRagDemo();
    initContactHelpers();
  });
})();
