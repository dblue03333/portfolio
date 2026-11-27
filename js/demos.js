/* ==========================================================================
   INTERACTIVE AI ENGINEER DEMOS & CONTACT FORM INTERACTIONS (i18n-aware)
   1. HealthLab Evidence Intelligence (Draft vs Linked Source + Walkthrough)
   2. Reliable Agent Harness (Approval Gate Approve/Reject + Action Log)
   3. HarborMind (Quantile Wait Forecast + Uncertainty Captain Handoff)
   4. mini-llm-twin (4-Stage RAG Pipeline Step Inspector)
   5. Contact Form (Web3Forms AJAX + Validation) & Copy Email Utility
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
      const accessKey = (form.dataset.web3formsKey || '').trim();
      const hasWeb3Key = accessKey.length > 0 && accessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY';

      if (isLocalPreview || !hasWeb3Key) {
        setFeedback(t('contact.local_msg', 'Preview mode: once configured with Web3Forms, messages are emailed directly to ndtdat.data@gmail.com.'), 'success');
        if (fallbackLink) fallbackLink.hidden = false;
        return;
      }

      if (form.querySelector('[name="botcheck"]')?.checked) {
        setFeedback(t('contact.ok_msg', 'Message sent — thank you!'), 'success');
        form.reset();
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      if (submitLabel) submitLabel.textContent = t('contact.sending', 'Sending…');
      setFeedback(t('contact.sending', 'Sending…'), null);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `[Portfolio] ${topic} — ${name}`,
            from_name: name,
            name,
            email,
            organization: org || '—',
            topic,
            message,
            botcheck: false,
          }),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.success) {
          throw new Error(data.message || `HTTP ${response.status}`);
        }

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

  /* ---------- 6. Home Reliability & Guardrail Sandbox ---------- */
  function initGuardrailSandbox() {
    const root = document.querySelector('[data-sandbox="reliability"]');
    if (!root) return;

    const slider = root.querySelector('[data-sb-temp]');
    const tempValEl = root.querySelector('[data-sb-temp-val]');
    const toggleBtns = [...root.querySelectorAll('[data-sb-toggle]')];
    const presetBtns = [...root.querySelectorAll('[data-sb-preset]')];
    const pipeNodes = {
      schema: root.querySelector('[data-pipe-node="schema"]'),
      lineage: root.querySelector('[data-pipe-node="lineage"]'),
      human: root.querySelector('[data-pipe-node="human"]'),
    };
    const metricRiskEl = root.querySelector('[data-sb-risk]');
    const metricEffectsEl = root.querySelector('[data-sb-effects]');
    const metricLatencyEl = root.querySelector('[data-sb-latency]');
    const outBox = root.querySelector('[data-sb-outbox]');
    const outStatus = root.querySelector('[data-sb-out-status]');
    const outBadge = root.querySelector('[data-sb-out-badge]');
    const outClaim = root.querySelector('[data-sb-out-claim]');
    const outTrace = root.querySelector('[data-sb-out-trace]');

    const state = {
      temp: 0.7,
      schema: true,
      lineage: true,
      human: true,
    };

    function sync() {
      const lang = window.__i18n?.getLang() || 'en';
      if (slider) slider.value = String(state.temp);
      if (tempValEl) tempValEl.textContent = state.temp.toFixed(1);

      toggleBtns.forEach((btn) => {
        const key = btn.dataset.sbToggle;
        const on = Boolean(state[key]);
        btn.classList.toggle('is-on', on);
        btn.setAttribute('aria-pressed', String(on));
      });

      Object.entries(pipeNodes).forEach(([key, node]) => {
        if (!node) return;
        const on = Boolean(state[key]);
        node.classList.toggle('is-guarded', on);
        node.classList.toggle('is-bypassed', !on);
      });

      // Compute deterministic reliability metrics
      const baseRisk = 6 + state.temp * 34; // ~9% at 0.1, ~46.8% at 1.2
      let risk = baseRisk;
      if (state.schema) risk *= 0.58;
      if (state.lineage) risk *= 0.22;
      if (state.human) risk *= 0.08;
      if (state.schema && state.lineage && state.human) risk = 0;

      const overhead = (state.schema ? 14 : 0) + (state.lineage ? 26 : 0) + (state.human ? 8 : 0);

      let severity = 'safe';
      if (!state.schema && !state.lineage && !state.human) severity = 'danger';
      else if (risk >= 8 || !state.human) severity = 'warn';
      if (risk >= 20) severity = 'danger';

      if (metricRiskEl) {
        metricRiskEl.textContent = `${risk.toFixed(1)}%`;
        metricRiskEl.classList.toggle('is-warn', severity === 'warn');
        metricRiskEl.classList.toggle('is-danger', severity === 'danger');
      }

      if (metricEffectsEl) {
        const effText = state.human
          ? t('sb.eff_blocked', 'Gated ✓')
          : state.schema
          ? t('sb.eff_typed', 'Auto-Write')
          : t('sb.eff_open', 'Exposed!');
        metricEffectsEl.textContent = effText;
        metricEffectsEl.classList.toggle('is-warn', !state.human && state.schema);
        metricEffectsEl.classList.toggle('is-danger', !state.human && !state.schema);
      }

      if (metricLatencyEl) {
        metricLatencyEl.textContent = `+${overhead}ms`;
      }

      if (outBox) {
        outBox.classList.toggle('is-warn', severity === 'warn');
        outBox.classList.toggle('is-danger', severity === 'danger');
      }

      // Sync presets active state
      const isUnsafePreset = !state.schema && !state.lineage && !state.human && state.temp >= 1.0;
      const isGuardedPreset = state.schema && state.lineage && state.human && state.temp <= 0.35;
      presetBtns.forEach((btn) => {
        const p = btn.dataset.sbPreset;
        btn.classList.toggle('is-active', (p === 'unsafe' && isUnsafePreset) || (p === 'guarded' && isGuardedPreset));
      });

      // Contextual live simulation output
      if (state.schema && state.lineage && state.human) {
        if (outStatus) outStatus.textContent = t('sb.st_safe', '✓ INTERCEPTED & GROUNDED');
        if (outBadge) outBadge.textContent = 'HASH #9F2C · 0 LEAKS';
        if (outClaim) outClaim.textContent = t('sb.out_safe', 'Claim narrowed from “nationwide” to “one district” via source citation, and tool call create_incident paused cleanly for reviewer approval.');
        if (outTrace) {
          outTrace.innerHTML = [
            `[schema]  validate(create_incident, sev="SEV-2") → PASS (14ms)`,
            `[lineage] verify_claim(src="pilot_phase1.md") → CORRECTED (cosine 0.94)`,
            `[gate]    pause_for_human(payload_hash="#9f2c") → AWAITING_APPROVAL`,
          ].join('<br>');
        }
      } else if (!state.schema && !state.lineage && !state.human) {
        if (outStatus) outStatus.textContent = t('sb.st_danger', '✕ UNGUARDED HALLUCINATION SHIPPED');
        if (outBadge) outBadge.textContent = `TEMP ${state.temp.toFixed(1)} · CRITICAL`;
        if (outClaim) outClaim.textContent = t('sb.out_danger', 'Raw LLM fabricated “nationwide rollout confirmed” with zero source citation and fired a malformed SEV-1 incident directly into production!');
        if (outTrace) {
          outTrace.innerHTML = [
            `[schema]  BYPASSED → malformed severity="URGENT_999" sent upstream`,
            `[lineage] BYPASSED → fabricated scope "nationwide" published unverified`,
            `[gate]    BYPASSED → external side effect executed without human review`,
          ].join('<br>');
        }
      } else {
        if (outStatus) outStatus.textContent = t('sb.st_warn', '⚠ PARTIAL PROTECTION · GAP DETECTED');
        if (outBadge) outBadge.textContent = `RISK ${risk.toFixed(1)}%`;
        const missing = [
          !state.schema ? (lang === 'vi' ? 'Kiểm định Schema' : lang === 'ja' ? 'スキーマ検証' : 'Typed Schema') : null,
          !state.lineage ? (lang === 'vi' ? 'Truy vết nguồn' : lang === 'ja' ? 'ソース照合' : 'Source Lineage') : null,
          !state.human ? (lang === 'vi' ? 'Cổng duyệt người dùng' : lang === 'ja' ? '人間承認ゲート' : 'Human Approval Gate') : null,
        ].filter(Boolean).join(' + ');

        if (outClaim) {
          const prefix = t('sb.out_warn_prefix', 'Missing protection: ');
          const suffix = t('sb.out_warn_suffix', ' — subtle errors or unreviewed writes can still slip through at elevated temperature.');
          outClaim.textContent = `${prefix}${missing}${suffix}`;
        }
        if (outTrace) {
          outTrace.innerHTML = [
            `[schema]  ${state.schema ? 'PASS · typed args verified (14ms)' : 'BYPASSED · unvalidated tool arguments'}`,
            `[lineage] ${state.lineage ? 'PASS · claim anchored to public source' : 'BYPASSED · overstatement risk unflagged'}`,
            `[gate]    ${state.human ? 'PASS · side effect paused for reviewer' : 'BYPASSED · agent auto-executes writes'}`,
          ].join('<br>');
        }
      }
    }

    slider?.addEventListener('input', () => {
      state.temp = parseFloat(slider.value);
      sync();
    });

    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.sbToggle;
        state[key] = !state[key];
        window.__portfolioSfx?.play('switch');
        sync();
      });
    });

    presetBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const p = btn.dataset.sbPreset;
        if (p === 'unsafe') {
          state.temp = 1.1;
          state.schema = false;
          state.lineage = false;
          state.human = false;
          window.__portfolioSfx?.play('guardrailWarn');
        } else {
          state.temp = 0.2;
          state.schema = true;
          state.lineage = true;
          state.human = true;
          window.__portfolioSfx?.play('guardrailOk');
        }
        sync();
      });
    });

    window.addEventListener('portfolio:langchange', sync);
    sync();
  }

  /* ---------- 7. Full-Bleed 100vw Chill Free-Drifting Skill & Project Horizon ---------- */
  function initSkillConstellation() {
    const root = document.querySelector('[data-constellation]');
    if (!root) return;

    const stage = root.querySelector('[data-cs-stage]');
    const svg = root.querySelector('[data-cs-svg]');
    const filterBtns = [...root.querySelectorAll('[data-cs-filter]')];
    const kickerEl = root.querySelector('[data-cs-kicker]');
    const titleEl = root.querySelector('[data-cs-title]');
    const descEl = root.querySelector('[data-cs-desc]');
    const tagsEl = root.querySelector('[data-cs-tags]');
    const ctaEl = root.querySelector('[data-cs-cta]');

    if (!stage || !svg) return;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 26 verified nodes (20 general engineering, ML/AI & architecture competencies + 6 projects)
    const NODES = [
      // AI, Agents, Retrieval & Eval (7)
      {
        id: 'agents',
        kind: 'skill',
        group: 'ai',
        label: 'Agentic Workflows',
        x: 12,
        y: 22,
        descKey: 'cs.desc.agents',
        tags: ['Tool Calling', 'Multi-Step Planning', 'Bounded Retries', 'Deterministic Fallbacks'],
        href: '../work/reliable-agent-harness/index.html',
        ctaKey: 'cs.cta.harness',
      },
      {
        id: 'guardrails',
        kind: 'skill',
        group: 'ai',
        label: 'Guardrails & HITL',
        x: 34,
        y: 34,
        descKey: 'cs.desc.guardrails',
        tags: ['Human Approval Gate', 'Payload Hashing', 'Rule Validators', 'Zero Silent Writes'],
        href: '../work/reliable-agent-harness/index.html',
        ctaKey: 'cs.cta.harness',
      },
      {
        id: 'rag',
        kind: 'skill',
        group: 'ai',
        label: 'Hybrid Retrieval & RAG',
        x: 56,
        y: 24,
        descKey: 'cs.desc.rag',
        tags: ['FAISS', 'MongoDB Atlas Vector', 'Semantic Search', 'Source Lineage'],
        href: '../work/mini-llm-twin/index.html',
        ctaKey: 'cs.cta.rag',
      },
      {
        id: 'evals',
        kind: 'skill',
        group: 'ai',
        label: 'Model & Prompt Eval',
        x: 76,
        y: 36,
        descKey: 'cs.desc.evals',
        tags: ['Retrieval Benchmarks', 'Bilingual Prompt Eval', 'Offline Regression', 'Error Analysis'],
        href: '../about/index.html#experience',
        ctaKey: 'cs.cta.experience',
      },
      {
        id: 'gemini',
        kind: 'skill',
        group: 'ai',
        label: 'Gemini · Gemma 4 · LiteLLM',
        x: 92,
        y: 22,
        descKey: 'cs.desc.gemini',
        tags: ['Google GenAI', 'Offline Gemma 4', 'LiteLLM Routing', 'Text Embeddings'],
        href: '../work/harbormind/index.html',
        ctaKey: 'cs.cta.harbormind',
      },
      {
        id: 'docling',
        kind: 'skill',
        group: 'ai',
        label: 'Document & Vision AI',
        x: 20,
        y: 48,
        descKey: 'cs.desc.docling',
        tags: ['Docling', 'PyMuPDF', 'OpenCV', 'Pillow', 'PDF Table Extraction'],
        href: '../work/index.html',
        ctaKey: 'cs.cta.work',
      },
      {
        id: 'playwright',
        kind: 'skill',
        group: 'ai',
        label: 'Playwright · Speech AI',
        x: 84,
        y: 50,
        descKey: 'cs.desc.playwright',
        tags: ['Playwright', 'Headless Chromium', '20 FPS Control Loops', 'GCP Speech & TTS'],
        href: '../work/index.html#upcoming-gaming-agent',
        ctaKey: 'cs.cta.gaming',
      },

      // ML, Data Architecture & Analytics (7)
      {
        id: 'medallion',
        kind: 'skill',
        group: 'ml',
        label: 'Medallion Architecture',
        x: 8,
        y: 62,
        descKey: 'cs.desc.medallion',
        tags: ['Bronze · Silver · Gold', 'Immutable Raw Layers', 'Versioned Evidence', 'Lineage'],
        href: '../work/healthlab/index.html',
        ctaKey: 'cs.cta.healthlab',
      },
      {
        id: 'trees',
        kind: 'skill',
        group: 'ml',
        label: 'Quantile & Tree ML',
        x: 28,
        y: 66,
        descKey: 'cs.desc.ml',
        tags: ['LightGBM P10–P90', 'XGBoost', 'CatBoost', 'Scikit-Learn'],
        href: '../work/harbormind/index.html',
        ctaKey: 'cs.cta.harbormind',
      },
      {
        id: 'pytorch',
        kind: 'skill',
        group: 'ml',
        label: 'PyTorch · Deep Learning',
        x: 47,
        y: 56,
        descKey: 'cs.desc.pytorch',
        tags: ['PyTorch', 'Einops', 'Neural Architectures', 'Local Inference'],
        href: '../about/index.html#experience',
        ctaKey: 'cs.cta.experience',
      },
      {
        id: 'mlflow',
        kind: 'skill',
        group: 'ml',
        label: 'MLflow · Optuna · SHAP',
        x: 66,
        y: 64,
        descKey: 'cs.desc.mlflow',
        tags: ['MLflow Tracking', 'Optuna Tuning', 'SHAP Explainability', 'Reproducible Runs'],
        href: '../work/harbormind/index.html',
        ctaKey: 'cs.cta.harbormind',
      },
      {
        id: 'polars',
        kind: 'skill',
        group: 'ml',
        label: 'Polars · DuckDB · Pandas',
        x: 42,
        y: 74,
        descKey: 'cs.desc.polars',
        tags: ['Polars', 'DuckDB', 'Pandas', 'NumPy', 'Parquet ETL'],
        href: '../work/harbormind/index.html',
        ctaKey: 'cs.cta.harbormind',
      },
      {
        id: 'geospatial',
        kind: 'skill',
        group: 'ml',
        label: 'Geospatial & AIS Data',
        x: 80,
        y: 68,
        descKey: 'cs.desc.geospatial',
        tags: ['GeoAlchemy2', 'Shapely', 'NOAA AIS', 'Folium', 'Spatial Indexing'],
        href: '../work/harbormind/index.html',
        ctaKey: 'cs.cta.harbormind',
      },
      {
        id: 'simulation',
        kind: 'skill',
        group: 'ml',
        label: 'Time-Based Simulation',
        x: 96,
        y: 60,
        descKey: 'cs.desc.simulation',
        tags: ['Tick-Independent Time', 'Telemetry Ingestion', 'Decoupled State', 'Synthetic Data'],
        href: '../about/index.html#experience',
        ctaKey: 'cs.cta.experience',
      },

      // Backend, Data Contracts, Cloud & Engineering Quality (6)
      {
        id: 'contracts',
        kind: 'skill',
        group: 'backend',
        label: 'Schema & Data Contracts',
        x: 15,
        y: 84,
        descKey: 'cs.desc.contracts',
        tags: ['Pydantic v2', 'StrEnum', 'Boundary Validation', 'Storage vs API Schemas'],
        href: '../work/reliable-agent-harness/index.html',
        ctaKey: 'cs.cta.harness',
      },
      {
        id: 'fastapi',
        kind: 'skill',
        group: 'backend',
        label: 'FastAPI · Async Python',
        x: 34,
        y: 88,
        descKey: 'cs.desc.fastapi',
        tags: ['FastAPI', 'Uvicorn', 'Python 3.12 · uv', 'Typer CLI', 'JWT · Argon2'],
        href: '../work/mini-llm-twin/index.html',
        ctaKey: 'cs.cta.rag',
      },
      {
        id: 'postgres',
        kind: 'skill',
        group: 'backend',
        label: 'PostgreSQL · Alembic',
        x: 53,
        y: 84,
        descKey: 'cs.desc.postgres',
        tags: ['PostgreSQL', 'asyncpg · psycopg', 'Alembic Migrations', 'SQLite · MongoDB'],
        href: '../about/index.html#experience',
        ctaKey: 'cs.cta.experience',
      },
      {
        id: 'cloud',
        kind: 'skill',
        group: 'backend',
        label: 'Docker · GCP · Firebase',
        x: 71,
        y: 86,
        descKey: 'cs.desc.cloud',
        tags: ['Docker Compose', 'Google Cloud Storage', 'Firebase Functions', 'Cloudflare Workers'],
        href: '../about/index.html#experience',
        ctaKey: 'cs.cta.experience',
      },
      {
        id: 'testing',
        kind: 'skill',
        group: 'backend',
        label: 'Pytest · Mypy · Stacked PRs',
        x: 88,
        y: 82,
        descKey: 'cs.desc.testing',
        tags: ['pytest-asyncio', '368+ Offline Tests', 'Mypy Strict', 'Ruff', 'Git Rebase'],
        href: '../work/reliable-agent-harness/index.html',
        ctaKey: 'cs.cta.harness',
      },
      {
        id: 'astro',
        kind: 'skill',
        group: 'backend',
        label: 'Astro · Gradio · Figma',
        x: 62,
        y: 44,
        descKey: 'cs.desc.astro',
        tags: ['Astro Static', 'Gradio Demos', 'Figma Tokens', 'Responsive Editorial UI'],
        href: 'https://healthlab-demo.snowy-auroraceratops.workers.dev/',
        external: true,
        ctaKey: 'cs.cta.healthlab_web',
      },

      // Shipped & Upcoming Projects (6)
      {
        id: 'p_healthlab',
        kind: 'project',
        group: 'project',
        label: 'HealthLab Evidence',
        x: 18,
        y: 12,
        descKey: 'cs.desc.p_healthlab',
        tags: ['Oct 2026 – Present', 'Public Health', 'Medallion & Evidence Lineage'],
        href: '../work/healthlab/index.html',
        ctaKey: 'cs.cta.healthlab',
      },
      {
        id: 'p_harness',
        kind: 'project',
        group: 'project',
        label: 'Agent Harness',
        x: 38,
        y: 12,
        descKey: 'cs.desc.p_harness',
        tags: ['Sep 2026', '368 Offline Tests', 'Human Approval Gate'],
        href: '../work/reliable-agent-harness/index.html',
        ctaKey: 'cs.cta.harness',
      },
      {
        id: 'p_gaming',
        kind: 'upcoming',
        group: 'project',
        label: 'Gaming Agent · Soon',
        x: 58,
        y: 12,
        descKey: 'cs.desc.p_gaming',
        tags: ['Upcoming', 'Kaggle 20 FPS', 'Playwright + VLM Planner'],
        href: '../work/index.html#upcoming-gaming-agent',
        ctaKey: 'cs.cta.gaming',
      },
      {
        id: 'p_harbormind',
        kind: 'project',
        group: 'project',
        label: 'HarborMind',
        x: 78,
        y: 12,
        descKey: 'cs.desc.p_harbormind',
        tags: ['Kaggle AIS', 'LightGBM Quantile', 'Offline Gemma 4'],
        href: '../work/harbormind/index.html',
        ctaKey: 'cs.cta.harbormind',
      },
      {
        id: 'p_rag',
        kind: 'project',
        group: 'project',
        label: 'mini-llm-twin',
        x: 4,
        y: 38,
        descKey: 'cs.desc.p_rag',
        tags: ['768-dim Vector', 'FastAPI', 'Dockerized RAG'],
        href: '../work/mini-llm-twin/index.html',
        ctaKey: 'cs.cta.rag',
      },
      {
        id: 'p_healthlab_web',
        kind: 'project',
        group: 'project',
        label: 'HealthLab Web ↗',
        x: 94,
        y: 38,
        descKey: 'cs.desc.p_healthlab_web',
        tags: ['Cloudflare Live', 'Astro + Figma', 'Responsive'],
        href: 'https://healthlab-demo.snowy-auroraceratops.workers.dev/',
        external: true,
        ctaKey: 'cs.cta.healthlab_web',
      },
    ];

    const EDGES = [
      ['p_healthlab', 'medallion'],
      ['p_healthlab', 'guardrails'],
      ['p_healthlab', 'postgres'],
      ['p_healthlab', 'contracts'],
      ['p_healthlab_web', 'astro'],
      ['p_healthlab_web', 'cloud'],
      ['p_healthlab_web', 'p_healthlab'],
      ['p_harness', 'agents'],
      ['p_harness', 'guardrails'],
      ['p_harness', 'contracts'],
      ['p_harness', 'fastapi'],
      ['p_harness', 'testing'],
      ['p_gaming', 'playwright'],
      ['p_gaming', 'agents'],
      ['p_gaming', 'gemini'],
      ['p_gaming', 'docling'],
      ['p_harbormind', 'trees'],
      ['p_harbormind', 'mlflow'],
      ['p_harbormind', 'polars'],
      ['p_harbormind', 'geospatial'],
      ['p_harbormind', 'gemini'],
      ['p_rag', 'rag'],
      ['p_rag', 'gemini'],
      ['p_rag', 'fastapi'],
      ['p_rag', 'cloud'],
      ['agents', 'guardrails'],
      ['agents', 'evals'],
      ['rag', 'evals'],
      ['rag', 'docling'],
      ['medallion', 'polars'],
      ['medallion', 'postgres'],
      ['polars', 'trees'],
      ['pytorch', 'trees'],
      ['pytorch', 'mlflow'],
      ['geospatial', 'simulation'],
      ['contracts', 'fastapi'],
      ['contracts', 'testing'],
      ['fastapi', 'postgres'],
      ['fastapi', 'cloud'],
      ['simulation', 'contracts'],
    ];

    let activeId = 'guardrails';
    let activeFilter = 'all';
    let hoveredId = null;
    let tappedId = null;
    let tappedUntil = 0;
    let draggingItem = null;
    let dragMoved = false;
    let dragStartX = 0;
    let dragStartY = 0;

    const nodeMap = new Map();
    const edgeObjs = [];

    // Free-drifting 360-degree autonomous cruise velocity (chill slow multi-directional streams)
    const state = NODES.map((node, i) => {
      const angle = i * 2.39996 + 0.45; // golden angle for natural omnidirectional spread
      const speed = 0.18 + (i % 5) * 0.045; // super chill 0.18–0.36 px/frame
      const cvx = Math.cos(angle) * speed;
      const cvy = Math.sin(angle) * speed * 0.85;
      return {
        node,
        cruiseVx: cvx,
        cruiseVy: cvy,
        waveFreq: 0.00038 + (i % 4) * 0.0001,
        wavePhase: i * 1.47,
        curX: 0,
        curY: 0,
        vx: cvx,
        vy: cvy,
        tx: 0,
        ty: 0,
        el: null,
        pushedOut: false,
        initialized: false,
      };
    });

    svg.innerHTML = '';
    EDGES.forEach(([a, b]) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', 'constellation-edge');
      svg.appendChild(line);
      edgeObjs.push({ a, b, el: line });
    });

    function computeClusterTargets(w, h) {
      if (activeFilter === 'all') {
        state.forEach((item) => {
          item.pushedOut = false;
        });
        return;
      }

      const matched = state.filter((item) => item.node.group === activeFilter);
      const unmatched = state.filter((item) => item.node.group !== activeFilter);

      const isCompact = w < 720;
      const cols = isCompact
        ? Math.min(2, Math.max(1, matched.length))
        : Math.min(4, Math.max(2, Math.ceil(matched.length / 2)));
      const rows = Math.ceil(matched.length / cols);
      matched.forEach((item, idx) => {
        const r = Math.floor(idx / cols);
        const rowItems = Math.min(cols, matched.length - r * cols);
        const c = idx - r * cols;
        const xFrac = rowItems === 1 ? 0.5 : (isCompact ? 0.27 + (c / (rowItems - 1)) * 0.46 : 0.2 + (c / (rowItems - 1)) * 0.6);
        const yFrac = rows === 1 ? 0.5 : (isCompact ? 0.16 + (r / (rows - 1)) * 0.68 : 0.3 + (r / (rows - 1)) * 0.4);
        item.tx = xFrac * w;
        item.ty = yFrac * h;
        item.pushedOut = false;
      });

      unmatched.forEach((item) => {
        item.pushedOut = true;
      });
    }

    function syncVisualClasses() {
      const neighbors = new Set([activeId]);
      edgeObjs.forEach(({ a, b, el }) => {
        const na = nodeMap.get(a);
        const nb = nodeMap.get(b);
        const eitherPushed = Boolean(na?.pushedOut || nb?.pushedOut);
        const hit = !eitherPushed && (a === activeId || b === activeId);
        if (hit) {
          neighbors.add(a);
          neighbors.add(b);
        }
        el.classList.toggle('is-highlighted', hit);
        el.classList.toggle('is-dimmed', eitherPushed || !hit);
      });

      nodeMap.forEach((item, nid) => {
        item.el.classList.toggle('is-pushed-out', item.pushedOut);
        item.el.classList.toggle('is-selected', !item.pushedOut && nid === activeId);
        item.el.classList.toggle('is-related', !item.pushedOut && nid !== activeId && neighbors.has(nid));
        item.el.classList.toggle('is-dimmed', !item.pushedOut && !neighbors.has(nid));
      });
    }

    function select(id, playSound) {
      activeId = id;
      if (playSound) window.__portfolioSfx?.play('click');
      syncVisualClasses();

      const item = nodeMap.get(id) || state[0];
      const { node } = item;
      if (kickerEl) {
        const groupLabel =
          node.kind === 'upcoming'
            ? t('cs.kicker_upcoming', 'IN PROGRESS · UPCOMING')
            : node.kind === 'project'
            ? t('cs.kicker_project', 'SHIPPED SYSTEM · CASE STUDY')
            : node.group === 'ai'
            ? t('cs.kicker_ai', 'CORE SKILL · AI & AGENTS')
            : node.group === 'ml'
            ? t('cs.kicker_ml', 'CORE SKILL · ML & DATA')
            : t('cs.kicker_backend', 'CORE SKILL · BACKEND & CLOUD');
        kickerEl.textContent = groupLabel;
      }
      if (titleEl) titleEl.textContent = node.label;
      if (descEl) descEl.textContent = t(node.descKey, '');
      if (tagsEl) {
        tagsEl.innerHTML = node.tags.map((tag) => `<span>${tag}</span>`).join('');
      }
      if (ctaEl) {
        ctaEl.href = node.href;
        ctaEl.textContent = t(node.ctaKey, 'Open case study →');
        if (node.external) {
          ctaEl.target = '_blank';
          ctaEl.rel = 'noopener';
        } else {
          ctaEl.removeAttribute('target');
          ctaEl.removeAttribute('rel');
        }
      }
    }

    state.forEach((item) => {
      const { node } = item;
      const btn = document.createElement('button');
      btn.type = 'button';
      const kindCls =
        node.kind === 'upcoming'
          ? 'is-upcoming'
          : node.kind === 'project'
          ? 'is-project'
          : 'is-skill';
      btn.className = `constellation-node ${kindCls}`;
      btn.textContent = node.label;

      btn.addEventListener('mouseenter', () => {
        if (draggingItem) return;
        hoveredId = node.id;
        if (!item.pushedOut) select(node.id, false);
      });
      btn.addEventListener('mouseleave', () => {
        if (hoveredId === node.id) hoveredId = null;
      });
      btn.addEventListener('focus', () => {
        hoveredId = node.id;
        select(node.id, false);
      });
      btn.addEventListener('blur', () => {
        if (hoveredId === node.id) hoveredId = null;
      });

      // Drag & chill flick with mouse/pen (touch keeps native vertical page scroll + tap-to-pause!)
      btn.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch' || e.button !== 0) return;
        draggingItem = item;
        dragMoved = false;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        btn.classList.add('is-dragging');
        try {
          btn.setPointerCapture(e.pointerId);
        } catch {
          // ignore synthetic pointer events
        }
        select(node.id, false);
      });

      btn.addEventListener('pointermove', (e) => {
        if (draggingItem !== item) return;
        if (Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY) > 4) {
          dragMoved = true;
        }
        const rect = stage.getBoundingClientRect();
        const nx = e.clientX - rect.left;
        const ny = Math.max(24, Math.min(rect.height - 24, e.clientY - rect.top));
        item.vx = Math.max(-5, Math.min(5, (nx - item.curX) * 0.35));
        item.vy = Math.max(-5, Math.min(5, (ny - item.curY) * 0.35));
        item.curX = nx;
        item.curY = ny;
      });

      const endDrag = () => {
        if (draggingItem !== item) return;
        btn.classList.remove('is-dragging');
        draggingItem = null;
      };
      btn.addEventListener('pointerup', endDrag);
      btn.addEventListener('pointercancel', endDrag);

      btn.addEventListener('click', () => {
        if (dragMoved) {
          dragMoved = false;
          return;
        }
        if (item.pushedOut) {
          setFilter('all');
        }
        tappedId = node.id;
        tappedUntil = performance.now() + 2600;
        select(node.id, true);
      });

      stage.appendChild(btn);
      item.el = btn;
      nodeMap.set(node.id, item);
    });

    function setFilter(nextFilter) {
      activeFilter = nextFilter;
      filterBtns.forEach((btn) => {
        const on = btn.dataset.csFilter === activeFilter;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-pressed', String(on));
      });
      window.__portfolioSfx?.play('switch');

      const rect = stage.getBoundingClientRect();
      computeClusterTargets(Math.max(rect.width, 1), Math.max(rect.height, 1));

      const current = nodeMap.get(activeId);
      if (current?.pushedOut) {
        const firstMatch = state.find((s) => !s.pushedOut);
        if (firstMatch) activeId = firstMatch.node.id;
      }
      select(activeId, false);
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => setFilter(btn.dataset.csFilter));
    });

    // Autonomous chill free-drift + wrap-around physics loop
    let rafId = null;
    let isVisible = true;
    const pointer = { x: -9999, y: -9999, inside: false };

    stage.addEventListener('pointermove', (e) => {
      const rect = stage.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.inside = true;
    }, { passive: true });
    stage.addEventListener('pointerleave', () => {
      pointer.inside = false;
    });

    function getWrapBounds(w) {
      const isCompact = w < 720;
      const wrapPadX = isCompact ? Math.max(220, (920 - w) * 0.5) : 110;
      const wrapPadY = isCompact ? 54 : 42;
      return { isCompact, wrapPadX, wrapPadY };
    }

    function initPositions(w, h) {
      const { isCompact, wrapPadX } = getWrapBounds(w);
      const minX = isCompact ? -wrapPadX + 48 : 0;
      const spanX = isCompact ? w + wrapPadX * 2 - 96 : w;
      state.forEach((item) => {
        item.curX = minX + (item.node.x / 100) * spanX;
        item.curY = (item.node.y / 100) * h;
        item.initialized = true;
      });
      // On narrow mobile screens, ensure the default active node starts right in view
      if (isCompact) {
        const active = nodeMap.get(activeId);
        if (active) {
          active.curX = w * 0.5;
          active.curY = h * 0.48;
        }
      }
      computeClusterTargets(w, h);
    }

    function stepPhysics(now) {
      const rect = stage.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) {
        rafId = null;
        return;
      }

      const w = rect.width;
      const h = rect.height;
      const { isCompact, wrapPadX, wrapPadY } = getWrapBounds(w);

      if (!state[0].initialized) {
        initPositions(w, h);
      }
      computeClusterTargets(w, h);

      state.forEach((item) => {
        if (draggingItem === item) return;

        if (prefersReduced) {
          if (activeFilter !== 'all' && !item.pushedOut) {
            item.curX = item.tx;
            item.curY = item.ty;
          }
          return;
        }

        const isHovered = hoveredId === item.node.id || (tappedId === item.node.id && now < tappedUntil);

        if (isHovered) {
          // Gently brake right under the user's cursor/tap for effortless reading/clicking
          item.vx *= 0.82;
          item.vy *= 0.82;
        } else if (activeFilter !== 'all' && !item.pushedOut) {
          // Focused cluster: gently gather into the spacious center while still floating lazily
          const driftX = Math.sin(now * item.waveFreq + item.wavePhase) * (isCompact ? 8 : 14);
          const driftY = Math.cos(now * item.waveFreq * 0.9 + item.wavePhase) * (isCompact ? 6 : 9);
          item.vx = (item.vx + (item.tx + driftX - item.curX) * 0.018) * 0.86;
          item.vy = (item.vy + (item.ty + driftY - item.curY) * 0.018) * 0.86;
        } else {
          // Free 360-degree chill drift across all 4 directions!
          const swayX = Math.cos(now * item.waveFreq * 0.85 + item.wavePhase) * 0.08;
          const swayY = Math.sin(now * item.waveFreq + item.wavePhase) * 0.08;
          const mobilePace = isCompact ? 0.86 : 1;
          const speedScale = (item.pushedOut ? 0.55 : 1) * mobilePace;
          item.vx += ((item.cruiseVx + swayX) * speedScale - item.vx) * 0.025;
          item.vy += ((item.cruiseVy + swayY) * speedScale - item.vy) * 0.025;

          // If pushed out during a filter, gently steer away from the center band toward edges
          if (item.pushedOut && item.curX > w * 0.12 && item.curX < w * 0.88) {
            const awayDir = item.curX < w * 0.5 ? -1 : 1;
            item.vx += awayDir * 0.22;
          }
        }

        // Soft pointer wake push when cursor sweeps through the drifting sky
        if (pointer.inside && !draggingItem && !isHovered && !item.pushedOut && !isCompact) {
          const dx = item.curX - pointer.x;
          const dy = item.curY - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d > 14 && d < 140) {
            const push = ((140 - d) / 140) * 0.42;
            item.vx += (dx / d) * push;
            item.vy += (dy / d) * push;
          }
        }

        // Apply velocity
        item.curX += item.vx;
        item.curY += item.vy;

        // Seamless 4-edge wrap-around (trôi tự do ra cả trên/dưới/trái/phải rồi chui vô lại!)
        if (activeFilter === 'all' || item.pushedOut) {
          if (item.curX > w + wrapPadX) {
            item.curX = -wrapPadX + 4;
          } else if (item.curX < -wrapPadX) {
            item.curX = w + wrapPadX - 4;
          }
          if (item.curY > h + wrapPadY) {
            item.curY = -wrapPadY + 4;
          } else if (item.curY < -wrapPadY) {
            item.curY = h + wrapPadY - 4;
          }
        } else {
          // Keep focused cluster nodes comfortably inside viewport
          const halfW = (item.el.offsetWidth || 110) * 0.5 + (isCompact ? 6 : 12);
          const halfH = (item.el.offsetHeight || 28) * 0.52 + (isCompact ? 10 : 14);
          if (item.curX < halfW) {
            item.curX = halfW;
            item.vx = Math.abs(item.vx) * 0.5;
          } else if (item.curX > w - halfW) {
            item.curX = w - halfW;
            item.vx = -Math.abs(item.vx) * 0.5;
          }
          if (item.curY < halfH) {
            item.curY = halfH;
            item.vy = Math.abs(item.vy) * 0.5;
          } else if (item.curY > h - halfH) {
            item.curY = h - halfH;
            item.vy = -Math.abs(item.vy) * 0.5;
          }
        }
      });

      // Soft anti-stacking cushion so free-floating nodes weave gracefully around each other
      const activeNodes = state.filter((s) => !s.pushedOut);
      const cushionFactor = isCompact ? 0.48 : 0.53;
      const cushionPad = isCompact ? 5 : 8;
      for (let i = 0; i < activeNodes.length; i += 1) {
        const a = activeNodes[i];
        const aw = (a.el.offsetWidth || 120) * cushionFactor + cushionPad;
        const ah = (a.el.offsetHeight || 30) * cushionFactor + cushionPad;
        for (let j = i + 1; j < activeNodes.length; j += 1) {
          const b = activeNodes[j];
          const bw = (b.el.offsetWidth || 120) * cushionFactor + cushionPad;
          const bh = (b.el.offsetHeight || 30) * cushionFactor + cushionPad;
          const dx = b.curX - a.curX;
          const dy = b.curY - a.curY;
          const ox = aw + bw - Math.abs(dx);
          const oy = ah + bh - Math.abs(dy);
          if (ox > 0 && oy > 0) {
            const aPin = draggingItem === a || hoveredId === a.node.id ? 0 : 0.45;
            const bPin = draggingItem === b || hoveredId === b.node.id ? 0 : 0.45;
            if (ox < oy) {
              const dir = dx >= 0 ? 1 : -1;
              a.curX -= ox * aPin * dir * 0.35;
              b.curX += ox * bPin * dir * 0.35;
              a.vx -= dir * 0.04 * aPin;
              b.vx += dir * 0.04 * bPin;
            } else {
              const dir = dy >= 0 ? 1 : -1;
              a.curY -= oy * aPin * dir * 0.35;
              b.curY += oy * bPin * dir * 0.35;
              a.vy -= dir * 0.04 * aPin;
              b.vy += dir * 0.04 * bPin;
            }
          }
        }
      }

      // Commit GPU transforms
      state.forEach((item) => {
        item.el.style.transform = `translate3d(${item.curX.toFixed(1)}px, ${item.curY.toFixed(1)}px, 0) translate(-50%, -50%) scale(var(--node-scale, 1))`;
      });

      // Update SVG filaments cleanly (auto-hide wrapped cross-screen edges on BOTH X and Y + proximity fade)
      const maxSpanX = (w + wrapPadX * 2) * 0.54;
      const maxSpanY = (h + wrapPadY * 2) * 0.62;
      const proxSpan = isCompact ? 340 : 460;
      edgeObjs.forEach(({ a, b, el }) => {
        const na = nodeMap.get(a);
        const nb = nodeMap.get(b);
        if (!na || !nb) return;
        const dx = Math.abs(na.curX - nb.curX);
        const dy = Math.abs(na.curY - nb.curY);
        const dist = Math.hypot(dx, dy);
        const wrappedAcross = dx > maxSpanX || dy > maxSpanY;
        const isActiveEdge = !na.pushedOut && !nb.pushedOut && (a === activeId || b === activeId);

        if (wrappedAcross || (na.pushedOut && nb.pushedOut)) {
          el.style.opacity = '0';
          return;
        }

        el.setAttribute('x1', na.curX.toFixed(1));
        el.setAttribute('y1', na.curY.toFixed(1));
        el.setAttribute('x2', nb.curX.toFixed(1));
        el.setAttribute('y2', nb.curY.toFixed(1));

        if (isActiveEdge) {
          el.style.opacity = '0.88';
        } else if (na.pushedOut || nb.pushedOut) {
          el.style.opacity = '0.05';
        } else {
          // Organic proximity visibility so nearby drifting nodes subtly connect
          const prox = Math.max(0, 1 - dist / proxSpan);
          el.style.opacity = (prox * 0.34).toFixed(3);
        }
      });
    }

    function tick(now) {
      if (!isVisible || document.hidden) {
        rafId = null;
        return;
      }
      stepPhysics(now);
      if (!prefersReduced) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    function startLoop() {
      if (prefersReduced) {
        stepPhysics(performance.now());
        return;
      }
      if (!rafId && isVisible && !document.hidden) {
        rafId = requestAnimationFrame(tick);
      }
    }

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0]?.isIntersecting ?? true;
          if (isVisible) startLoop();
        },
        { threshold: 0.04 }
      );
      io.observe(stage);
    }

    let lastW = window.innerWidth;
    window.addEventListener('resize', () => {
      if (Math.abs(window.innerWidth - lastW) < 40) return;
      lastW = window.innerWidth;
      const rect = stage.getBoundingClientRect();
      initPositions(Math.max(rect.width, 1), Math.max(rect.height, 1));
      stepPhysics(performance.now());
      startLoop();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) startLoop();
    });

    window.addEventListener('portfolio:langchange', () => select(activeId, false));
    select(activeId, false);
    stepPhysics(performance.now());
    startLoop();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHealthLabDemo();
    initHarnessDemo();
    initHarborMindDemo();
    initRagDemo();
    initContactHelpers();
    initGuardrailSandbox();
    initSkillConstellation();
  });
})();
