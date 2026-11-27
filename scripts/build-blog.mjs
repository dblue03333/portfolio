#!/usr/bin/env node
/**
 * Static Markdown Blog Builder for Kelvin Nguyen Portfolio
 *
 * - Reads Markdown notes from content/blog/*.md (ignores _*.md)
 * - Enforces publish_at <= today (Asia/Ho_Chi_Minh) and status in {ready, published}
 * - Builds /blog/<slug>/index.html, /blog/index.html, /blog/rss.xml, /blog/posts.json
 * - Zero external dependencies (pure Node >= 20 ESM)
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT_DIR = path.resolve(import.meta.dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content', 'blog');
const BLOG_DIR = path.join(ROOT_DIR, 'blog');
const MANIFEST_PATH = path.join(BLOG_DIR, '.generated.json');
const SITE_URL = 'https://kelvinnguyen.is-a.dev';

const TRACKS = {
  paper: {
    key: 'paper',
    num: '01 · PAPER NOTES',
    titleKey: 'blog.t1.title',
    title: 'Paper Notes',
    descKey: 'blog.t1.desc',
    desc: 'Distilling ML, LLM, and agent papers — focusing on assumptions, failure modes, ablations, and open questions rather than hype.',
    cadenceKey: 'blog.t1.cadence',
    cadence: 'Cadence: Weekly digest',
  },
  build: {
    key: 'build',
    num: '02 · BUILD LOGS',
    titleKey: 'blog.t2.title',
    title: 'Build Logs',
    descKey: 'blog.t2.desc',
    desc: 'Architecture trade-offs and live benchmarks from Generalist Gaming Agent, Reliable Agent Harness, and data pipelines.',
    cadenceKey: 'blog.t2.cadence',
    cadence: 'Cadence: As experiments ship',
  },
  postmortem: {
    key: 'postmortem',
    num: '03 · POST-MORTEMS',
    titleKey: 'blog.t3.title',
    title: 'Failure Post-Mortems',
    descKey: 'blog.t3.desc',
    desc: 'Real edge cases caught in offline evals, guardrail tests, and latency profiling — and the deterministic checks that fixed them.',
    cadenceKey: 'blog.t3.cadence',
    cadence: 'Cadence: Field notes',
  },
};

function parseCliArgs(argv) {
  const args = { check: false, date: null };
  for (const raw of argv) {
    if (raw === '--check') args.check = true;
    else if (raw.startsWith('--date=')) args.date = raw.slice('--date='.length).trim();
  }
  return args;
}

function getTodayICT(overrideDate) {
  if (overrideDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(overrideDate)) {
      throw new Error(`Invalid --date format "${overrideDate}". Expected YYYY-MM-DD.`);
    }
    return overrideDate;
  }
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeXml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function stripWrappingQuotes(val) {
  const trimmed = val.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseScalar(raw) {
  const trimmed = raw.trim();
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(',').map((item) => stripWrappingQuotes(item)).filter(Boolean);
  }
  return stripWrappingQuotes(trimmed);
}

function parseFrontmatter(rawText, filePath) {
  const normalized = rawText.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    throw new Error(`Missing YAML frontmatter in ${filePath}`);
  }
  const endIdx = normalized.indexOf('\n---\n', 4);
  if (endIdx === -1) {
    throw new Error(`Unterminated YAML frontmatter in ${filePath}`);
  }

  const headerBlock = normalized.slice(4, endIdx);
  const body = normalized.slice(endIdx + 5).trim();
  const data = {};
  let currentArrayKey = null;

  for (const line of headerBlock.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const arrayItemMatch = line.match(/^\s*-\s+(.*)$/);
    if (arrayItemMatch && currentArrayKey) {
      data[currentArrayKey].push(stripWrappingQuotes(arrayItemMatch[1]));
      continue;
    }
    const kvMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!kvMatch) continue;
    const [, key, rawVal] = kvMatch;
    if (rawVal === '') {
      data[key] = [];
      currentArrayKey = key;
    } else {
      data[key] = parseScalar(rawVal);
      currentArrayKey = null;
    }
  }

  return { data, body };
}

function sanitizeHref(rawHref) {
  const href = String(rawHref || '').trim();
  if (/^(https?:\/\/|mailto:|\/|\.\.?\/|#)/i.test(href)) return href;
  return '#';
}

function renderInlineMarkdown(text, mathEnabled) {
  const tokens = [];
  const stash = (html) => {
    const idx = tokens.length;
    tokens.push(html);
    return `\u0000TOK${idx}\u0000`;
  };

  let s = String(text ?? '');

  // Stash inline code first so *, _, $ inside backticks stay literal
  s = s.replace(/`([^`]+)`/g, (_, code) => stash(`<code>${escapeHtml(code)}</code>`));

  // Stash inline math $...$ when math: true
  if (mathEnabled) {
    s = s.replace(/\$([^$\n]+?)\$/g, (_, expr) => stash(`$${escapeHtml(expr)}$`));
  }

  // Stash images ![alt](url)
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) =>
    stash(`<img src="${escapeHtml(sanitizeHref(url))}" alt="${escapeHtml(alt)}" loading="lazy">`)
  );

  // Stash links [label](url)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const safeUrl = sanitizeHref(url);
    const external = /^https?:\/\//i.test(safeUrl);
    const attrs = external ? ' target="_blank" rel="noopener"' : '';
    return stash(`<a href="${escapeHtml(safeUrl)}"${attrs}>${escapeHtml(label)}</a>`);
  });

  s = escapeHtml(s);

  // Bold & italic
  s = s.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
  s = s.replace(/(^|[\s(])_([^_\n]+)_([\s).,;!?]|$)/g, '$1<em>$2</em>$3');

  return s.replace(/\u0000TOK(\d+)\u0000/g, (_, i) => tokens[Number(i)]);
}

function isTableSeparator(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function splitTableRow(line) {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return trimmed.split('|').map((cell) => cell.trim());
}

function renderMarkdown(markdown, { mathEnabled = false } = {}) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    // Fenced code block
    const fenceMatch = line.match(/^```([a-zA-Z0-9_-]*)\s*$/);
    if (fenceMatch) {
      const lang = fenceMatch[1] || '';
      const codeLines = [];
      i += 1;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1; // skip closing ```
      const langHeader = lang ? `<div class="blog-code-lang">${escapeHtml(lang)}</div>` : '';
      out.push(
        `<div class="blog-code-block">${langHeader}<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre></div>`
      );
      continue;
    }

    // Display math block $$...$$
    if (mathEnabled && line.trim().startsWith('$$')) {
      const mathLines = [line];
      if (!line.trim().endsWith('$$') || line.trim() === '$$') {
        i += 1;
        while (i < lines.length) {
          mathLines.push(lines[i]);
          if (lines[i].trim().endsWith('$$')) break;
          i += 1;
        }
      }
      i += 1;
      out.push(`<div class="blog-math-block">${escapeHtml(mathLines.join('\n'))}</div>`);
      continue;
    }

    // Horizontal rule
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) {
      out.push('<hr>');
      i += 1;
      continue;
    }

    // Headings (H2-H4)
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const level = Math.min(4, Math.max(2, headingMatch[1].length));
      const text = headingMatch[2].trim();
      const id = slugify(text);
      out.push(`<h${level} id="${id}">${renderInlineMarkdown(text, mathEnabled)}</h${level}>`);
      i += 1;
      continue;
    }

    // GFM Pipe Table
    if (line.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const headers = splitTableRow(line);
      i += 2; // skip header & separator
      const rows = [];
      while (i < lines.length && lines[i].trim() && lines[i].includes('|')) {
        rows.push(splitTableRow(lines[i]));
        i += 1;
      }
      const thead = `<thead><tr>${headers
        .map((h) => `<th>${renderInlineMarkdown(h, mathEnabled)}</th>`)
        .join('')}</tr></thead>`;
      const tbody = `<tbody>${rows
        .map(
          (row) =>
            `<tr>${headers
              .map((_, colIdx) => `<td>${renderInlineMarkdown(row[colIdx] || '', mathEnabled)}</td>`)
              .join('')}</tr>`
        )
        .join('')}</tbody>`;
      out.push(`<div class="blog-table-wrap"><table>${thead}${tbody}</table></div>`);
      continue;
    }

    // Blockquote
    if (line.trimStart().startsWith('>')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trimStart().startsWith('>')) {
        quoteLines.push(lines[i].replace(/^\s*>\s?/, ''));
        i += 1;
      }
      const innerParas = quoteLines
        .join('\n')
        .split(/\n{2,}/)
        .map((chunk) => `<p>${renderInlineMarkdown(chunk.replace(/\n/g, ' '), mathEnabled)}</p>`)
        .join('');
      out.push(`<blockquote>${innerParas}</blockquote>`);
      continue;
    }

    // Unordered list
    if (/^\s*[-*+]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*+]\s+/, '').trim());
        i += 1;
      }
      out.push(
        `<ul>${items.map((item) => `<li>${renderInlineMarkdown(item, mathEnabled)}</li>`).join('')}</ul>`
      );
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, '').trim());
        i += 1;
      }
      out.push(
        `<ol>${items.map((item) => `<li>${renderInlineMarkdown(item, mathEnabled)}</li>`).join('')}</ol>`
      );
      continue;
    }

    // Paragraph (stop before block starts)
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^```/.test(lines[i]) &&
      !/^#{1,4}\s+/.test(lines[i]) &&
      !/^\s*(-{3,}|\*{3,})\s*$/.test(lines[i]) &&
      !/^\s*>\s?/.test(lines[i]) &&
      !/^\s*[-*+]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !(lines[i].includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1]))
    ) {
      paraLines.push(lines[i].trim());
      i += 1;
    }
    if (paraLines.length) {
      out.push(`<p>${renderInlineMarkdown(paraLines.join(' '), mathEnabled)}</p>`);
    }
  }

  return out.join('\n');
}

function estimateReadMinutes(markdown) {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#*_`>|[\]()-]/g, ' ')
    .trim();
  const words = plain ? plain.split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 210));
}

function formatDisplayDate(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(dt);
}

function formatRssDate(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 1, 0, 0)).toUTCString();
}

function renderSharedHead({
  prefix,
  title,
  description,
  canonicalPath,
  mathEnabled = false,
}) {
  const katexHead = mathEnabled
    ? `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" crossorigin="anonymous">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js" crossorigin="anonymous"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" crossorigin="anonymous" onload="renderMathInElement(document.body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}]});"></script>`
    : '';

  return `  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${SITE_URL}${canonicalPath}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${prefix}assets/og-preview.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <title>${escapeHtml(title)}</title>
  <link rel="icon" type="image/svg+xml" href="${prefix}assets/favicon.svg">
  <link rel="alternate" type="application/rss+xml" title="Kelvin Nguyen — Blog RSS" href="${SITE_URL}/blog/rss.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,400&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+JP:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${prefix}css/tokens.css?v=18">
  <link rel="stylesheet" href="${prefix}css/base.css?v=18">
  <link rel="stylesheet" href="${prefix}css/layout.css?v=18">
  <link rel="stylesheet" href="${prefix}css/sections.css?v=19">
  <link rel="stylesheet" href="${prefix}css/responsive.css?v=19">${katexHead}
  <script>
    (function(){
      var p = new URLSearchParams(location.search).get('lang');
      var l = (p === 'en' || p === 'vi' || p === 'ja') ? p : (localStorage.getItem('portfolio_lang') || 'en');
      if (l !== 'en' && l !== 'vi' && l !== 'ja') l = 'en';
      document.documentElement.dataset.lang = l;
      document.documentElement.lang = l;

      var th = localStorage.getItem('portfolio_theme');
      if (th === 'dark' || th === 'light') document.documentElement.dataset.theme = th;

      var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduced && sessionStorage.getItem('dennis_page_transition') === '1') {
        document.documentElement.classList.add('is-transitioning');
        setTimeout(function(){ document.documentElement.classList.remove('is-transitioning'); }, 2200);
      }
    })();
  </script>`;
}

function renderChromeTop({ prefix, blogHref, loadingWord }) {
  return `  <a class="skip-link" href="#main" data-i18n="nav.skip">Skip to content</a>

  <div class="loading-container" aria-hidden="true">
    <div class="loading-screen">
      <div class="rounded-div-wrap top"><div class="rounded-div"></div></div>
      <div class="loading-words"><span class="dot"></span><span data-loading-word>${escapeHtml(loadingWord)}</span></div>
      <div class="rounded-div-wrap bottom"><div class="rounded-div"></div></div>
    </div>
  </div>

  <div class="btn-hamburger-wrap">
    <div class="btn btn-hamburger">
      <button class="btn-click magnetic" type="button" data-nav-toggle data-strength="32" data-strength-text="16" aria-label="Toggle navigation menu" aria-expanded="false">
        <div class="btn-fill"></div>
        <div class="btn-text"><div class="hamburger-bars" aria-hidden="true"><span></span><span></span></div></div>
      </button>
    </div>
  </div>

  <div class="fixed-nav-back" aria-hidden="true"></div>
  <aside class="fixed-nav" aria-label="Full navigation">
    <div class="fixed-nav-rounded-div" aria-hidden="true"><div class="rounded-curve"></div></div>
    <div class="fixed-nav-inner">
      <div class="nav-header">
        <h5 data-i18n="nav.navigation">Navigation</h5>
        <div class="stripe"></div>
        <nav class="fixed-nav-links" aria-label="Primary drawer navigation">
          <a href="${prefix}index.html" data-transition-label="Home" data-i18n="nav.home">Home</a>
          <a href="${prefix}work/index.html" data-transition-label="Work" data-i18n="nav.work">Work</a>
          <a href="${prefix}about/index.html" data-transition-label="About" data-i18n="nav.about">About</a>
          <a href="${blogHref}" class="active" data-transition-label="Blog"><span data-i18n="nav.blog">Blog</span></a>
          <a href="${prefix}contact/index.html" data-transition-label="Contact" data-i18n="nav.contact">Contact</a>
        </nav>

        <div class="fixed-nav-lang">
          <h5 data-i18n="nav.language">Language</h5>
          <div class="lang-switch" role="group" aria-label="Switch language">
            <button type="button" data-set-lang="en" class="is-active" aria-pressed="true">EN</button>
            <button type="button" data-set-lang="vi" aria-pressed="false">VI</button>
            <button type="button" data-set-lang="ja" aria-pressed="false">JP</button>
          </div>
        </div>
      </div>
      <div class="fixed-nav-socials">
        <h5 data-i18n="nav.socials">Socials</h5>
        <ul>
          <li><a class="btn-link" href="https://github.com/dblue03333" target="_blank" rel="noopener">GitHub</a></li>
          <li><a class="btn-link" href="https://www.linkedin.com/in/dat-nguyen-duc-tuan-164293315/" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a class="btn-link" href="https://leetcode.com/u/NguyenDucTuanDat/" target="_blank" rel="noopener">LeetCode</a></li>
          <li><a class="btn-link" href="mailto:ndtdat.data@gmail.com">Email</a></li>
        </ul>
      </div>
    </div>
  </aside>

  <header class="nav-bar">
    <a href="${prefix}index.html" class="credits-top" data-transition-label="Home">
      <span class="credit-symbol">©</span>
      <span class="credit-copy">
        <span class="credit-track" data-i18n-html="brand.credit"><span>Code by</span><span>Kelvin</span><span class="credit-extra">Nguyen</span></span>
      </span>
    </a>
    <nav class="nav-links" aria-label="Main navigation">
      <div class="nav-link-item"><a class="btn-link" href="${prefix}work/index.html" data-transition-label="Work" data-i18n="nav.work">Work</a></div>
      <div class="nav-link-item"><a class="btn-link" href="${prefix}about/index.html" data-transition-label="About" data-i18n="nav.about">About</a></div>
      <div class="nav-link-item"><a class="btn-link active" href="${blogHref}" data-transition-label="Blog"><span data-i18n="nav.blog">Blog</span></a></div>
      <div class="nav-link-item"><a class="btn-link" href="${prefix}contact/index.html" data-transition-label="Contact" data-i18n="nav.contact">Contact</a></div>
      <div class="lang-switch" role="group" aria-label="Switch language">
        <button type="button" data-set-lang="en" class="is-active" aria-pressed="true">EN</button>
        <button type="button" data-set-lang="vi" aria-pressed="false">VI</button>
        <button type="button" data-set-lang="ja" aria-pressed="false">JP</button>
      </div>
    </nav>
    <div class="nav-mobile-right">
      <div class="lang-switch" role="group" aria-label="Switch language">
        <button type="button" data-set-lang="en" class="is-active" aria-pressed="true">EN</button>
        <button type="button" data-set-lang="vi" aria-pressed="false">VI</button>
        <button type="button" data-set-lang="ja" aria-pressed="false">JP</button>
      </div>
      <button class="nav-mobile-trigger" type="button" data-mobile-nav-open aria-label="Open menu">
        <span class="dot"></span>
        <span data-i18n="nav.menu">Menu</span>
      </button>
    </div>
  </header>`;
}

function renderChromeFooter({ prefix, extraScripts = '' }) {
  return `  <div class="footer-rounded-div" aria-hidden="true">
    <div class="rounded-div-wrap"><div class="rounded-div"></div></div>
  </div>
  <footer class="footer-wrap" data-spotlight>
    <div class="container medium">
      <div class="footer-top">
        <h2 class="footer-headline">
          <span class="footer-headline-line">
            <span class="footer-avatar">
              <img src="${prefix}assets/avatar.webp" alt="Kelvin Nguyen portrait" width="256" height="256" loading="lazy">
            </span>
            <span data-i18n="footer.lets_work">Let’s work</span>
          </span>
          <span data-i18n="footer.together">together</span>
        </h2>
        <span class="arrow-diag footer-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7v10H7"/></svg>
        </span>
      </div>

      <div class="footer-divider-row">
        <div class="stripe"></div>
        <div class="footer-cta-wrap">
          <div class="btn btn-round btn-accent">
            <a class="btn-click magnetic" href="${prefix}contact/index.html" data-strength="50" data-strength-text="24" data-transition-label="Contact">
              <div class="btn-fill"></div>
              <span class="btn-text" data-i18n="footer.get_in_touch">Get in touch</span>
            </a>
          </div>
        </div>

        <div class="footer-pills">
          <div class="btn btn-light-outline">
            <a class="btn-click magnetic" href="mailto:ndtdat.data@gmail.com" data-strength="24" data-strength-text="12">
              <div class="btn-fill"></div>
              <span class="btn-text">ndtdat.data@gmail.com</span>
            </a>
          </div>
          <div class="btn btn-light-outline">
            <a class="btn-click magnetic" href="https://github.com/dblue03333" target="_blank" rel="noopener" data-strength="24" data-strength-text="12">
              <div class="btn-fill"></div>
              <span class="btn-text">GitHub ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="footer-bottom">
        <div class="footer-meta-group">
          <div class="footer-meta-col"><h5 data-i18n="footer.version">Version</h5><p data-i18n="footer.edition">2026 © Edition</p></div>
          <div class="footer-meta-col"><h5 data-i18n="footer.local_time">Local Time</h5><p data-local-time>09:30 PM GMT+7</p></div>
        </div>
        <div class="footer-socials">
          <h5 data-i18n="nav.socials">Socials</h5>
          <ul>
            <li><a class="btn-link" href="https://github.com/dblue03333" target="_blank" rel="noopener">GitHub</a></li>
            <li><a class="btn-link" href="https://www.linkedin.com/in/dat-nguyen-duc-tuan-164293315/" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a class="btn-link" href="https://leetcode.com/u/NguyenDucTuanDat/" target="_blank" rel="noopener">LeetCode</a></li>
            <li><a class="btn-link" href="https://www.kaggle.com/datasets/nguyenductuandat/lalb-ais-port-congestion-62023-122025" target="_blank" rel="noopener">Kaggle</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js" defer></script>
  <script src="${prefix}js/i18n.js?v=19" defer></script>
  <script src="${prefix}js/motion.js?v=18" defer></script>
  <script src="${prefix}js/delights.js?v=19" defer></script>${extraScripts}`;
}

function renderBlogIndexHtml(publishedPosts, scheduledCount) {
  const counts = {
    all: publishedPosts.length,
    paper: publishedPosts.filter((p) => p.track === 'paper').length,
    build: publishedPosts.filter((p) => p.track === 'build').length,
    postmortem: publishedPosts.filter((p) => p.track === 'postmortem').length,
  };

  const trackCardsHtml = Object.values(TRACKS)
    .map(
      (tr) => `          <button type="button" class="blog-track-card once-in" data-blog-track-card="${tr.key}">
            <div>
              <span class="blog-track-num">${escapeHtml(tr.num)} · ${counts[tr.key]}</span>
              <h3 style="margin-top:0.55em;" data-i18n="${tr.titleKey}">${escapeHtml(tr.title)}</h3>
              <p style="margin-top:0.6em;" data-i18n="${tr.descKey}">
                ${escapeHtml(tr.desc)}
              </p>
            </div>
            <div class="blog-track-cadence" data-i18n="${tr.cadenceKey}">${escapeHtml(tr.cadence)}</div>
          </button>`
    )
    .join('\n\n');

  const postRowsHtml = publishedPosts
    .map((post) => {
      const tr = TRACKS[post.track] || TRACKS.paper;
      return `          <article class="blog-post-row once-in" data-post-track="${escapeHtml(post.track)}">
            <a class="blog-post-link" href="${escapeHtml(post.slug)}/index.html" data-transition-label="Note">
              <div>
                <div class="blog-post-meta">
                  <span class="blog-track-pill" data-i18n="${tr.titleKey}">${escapeHtml(tr.title)}</span>
                  <time datetime="${escapeHtml(post.publishAt)}">${escapeHtml(formatDisplayDate(post.publishAt))}</time>
                  <span>·</span>
                  <span>${post.readMinutes} <span data-i18n="blog.min_read">min read</span></span>
                </div>
                <h2 class="blog-post-title">${escapeHtml(post.title)}</h2>
                <p class="blog-post-summary">${escapeHtml(post.summary)}</p>
              </div>
              <span class="blog-post-arrow" aria-hidden="true">↗</span>
            </a>
          </article>`;
    })
    .join('\n');

  const queueNoteHtml =
    scheduledCount > 0
      ? `\n        <p class="blog-queue-note">${scheduledCount} scheduled ${scheduledCount === 1 ? 'note' : 'notes'} queued for upcoming weekly release.</p>`
      : '';

  const filterScript = `
  <script>
    (function(){
      var pills = Array.prototype.slice.call(document.querySelectorAll('[data-blog-filter]'));
      var cards = Array.prototype.slice.call(document.querySelectorAll('[data-blog-track-card]'));
      var rows = Array.prototype.slice.call(document.querySelectorAll('[data-post-track]'));
      var empty = document.querySelector('[data-blog-empty]');

      function applyFilter(track) {
        var active = (track === 'paper' || track === 'build' || track === 'postmortem') ? track : 'all';
        var visible = 0;
        pills.forEach(function(btn) {
          var isOn = btn.getAttribute('data-blog-filter') === active;
          btn.classList.toggle('is-active', isOn);
          btn.setAttribute('aria-pressed', isOn ? 'true' : 'false');
        });
        cards.forEach(function(card) {
          card.classList.toggle('is-active', card.getAttribute('data-blog-track-card') === active);
        });
        rows.forEach(function(row) {
          var show = active === 'all' || row.getAttribute('data-post-track') === active;
          row.hidden = !show;
          if (show) visible += 1;
        });
        if (empty) empty.hidden = visible > 0;
      }

      pills.forEach(function(btn) {
        btn.addEventListener('click', function() {
          applyFilter(btn.getAttribute('data-blog-filter'));
        });
      });
      cards.forEach(function(card) {
        card.addEventListener('click', function() {
          var t = card.getAttribute('data-blog-track-card');
          var isAlready = card.classList.contains('is-active');
          applyFilter(isAlready ? 'all' : t);
        });
      });

      var q = new URLSearchParams(location.search).get('track');
      if (q) applyFilter(q);
    })();
  </script>`;

  return `<!doctype html>
<html lang="en">
<head>
${renderSharedHead({
  prefix: '../',
  title: 'Blog — Kelvin Nguyen',
  description: 'Engineering notes, paper reviews, and build logs across LLMs, AI agents, ML systems, and backend engineering by Kelvin Nguyen.',
  canonicalPath: '/blog/',
})}
</head>
<body data-page="blog" data-page-title="Blog">
${renderChromeTop({ prefix: '../', blogHref: 'index.html', loadingWord: 'Blog' })}

  <main id="main">
    <section class="section page-header">
      <div class="container medium">
        <div class="blog-hero-badge">
          <span class="art-live-dot" style="margin-right:0;"></span>
          <span data-i18n="blog.badge">FIELD LOG · ENGINEERING &amp; PAPER NOTES</span>
        </div>
        <h1 data-i18n="blog.title">Engineering notes, paper reviews &amp; build logs</h1>
        <p class="blog-lead" data-i18n="blog.lead">
          A quiet weekly log of what I am studying, building, and breaking across LLMs, AI agents, ML systems, and backend engineering.
        </p>

        <div class="blog-tracks-grid">
${trackCardsHtml}
        </div>

        <div class="blog-filter-bar" role="region" aria-label="Filter notes by track">
          <div class="blog-filter-pills" role="group" aria-label="Track filters">
            <button type="button" class="blog-filter-pill is-active" data-blog-filter="all" aria-pressed="true">
              <span data-i18n="blog.filter_all">All notes</span>
              <span class="blog-filter-count">${counts.all}</span>
            </button>
            <button type="button" class="blog-filter-pill" data-blog-filter="paper" aria-pressed="false">
              <span data-i18n="blog.t1.title">Paper Notes</span>
              <span class="blog-filter-count">${counts.paper}</span>
            </button>
            <button type="button" class="blog-filter-pill" data-blog-filter="build" aria-pressed="false">
              <span data-i18n="blog.t2.title">Build Logs</span>
              <span class="blog-filter-count">${counts.build}</span>
            </button>
            <button type="button" class="blog-filter-pill" data-blog-filter="postmortem" aria-pressed="false">
              <span data-i18n="blog.t3.title">Failure Post-Mortems</span>
              <span class="blog-filter-count">${counts.postmortem}</span>
            </button>
          </div>
          <a class="blog-rss-link" href="rss.xml" target="_blank" rel="noopener" data-i18n="blog.rss">RSS Feed ↗</a>
        </div>

        <div class="blog-post-list">
${postRowsHtml || ''}
        </div>
        <p class="blog-empty-state" data-blog-empty ${publishedPosts.length > 0 ? 'hidden' : ''} data-i18n="blog.empty">No notes in this track yet — check back soon.</p>${queueNoteHtml}

        <div class="blog-actions once-in">
          <div class="btn btn-dark">
            <a class="btn-click magnetic" href="../work/index.html" data-strength="26" data-strength-text="13" data-transition-label="Work">
              <div class="btn-fill"></div>
              <span class="btn-text" data-i18n="blog.cta_work">Explore shipped work →</span>
            </a>
          </div>
          <div class="btn">
            <a class="btn-click magnetic" href="../contact/index.html" data-strength="26" data-strength-text="13" data-transition-label="Contact">
              <div class="btn-fill"></div>
              <span class="btn-text" data-i18n="blog.cta_contact">Suggest a topic</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>

${renderChromeFooter({ prefix: '../', extraScripts: filterScript })}
</body>
</html>
`;
}

function renderPostHtml(post, prevPost, nextPost) {
  const tr = TRACKS[post.track] || TRACKS.paper;
  const tagsHtml = post.tags.length
    ? `<div class="blog-tags">${post.tags.map((tag) => `<span class="blog-tag">#${escapeHtml(tag)}</span>`).join('')}</div>`
    : '';

  const sourceMetaHtml = post.sourceUrl
    ? `<span>·</span><a class="blog-source-link" href="${escapeHtml(sanitizeHref(post.sourceUrl))}" target="_blank" rel="noopener">${escapeHtml(post.sourceLabel || 'Primary source')} ↗</a>`
    : '';

  const relatedWorkHtml = post.relatedWork
    ? `
        <div class="blog-related-card">
          <div>
            <span class="blog-related-kicker" data-i18n="blog.related_work">Related case study →</span>
            <strong>${escapeHtml(post.relatedWorkLabel || post.relatedWork)}</strong>
          </div>
          <div class="btn btn-dark">
            <a class="btn-click magnetic" href="../../work/${escapeHtml(post.relatedWork)}/index.html" data-strength="24" data-strength-text="12" data-transition-label="Case">
              <div class="btn-fill"></div>
              <span class="btn-text">View Case Study →</span>
            </a>
          </div>
        </div>`
    : '';

  const prevCard = prevPost
    ? `<a class="blog-post-nav-card" href="../${escapeHtml(prevPost.slug)}/index.html" data-transition-label="Note">
            <span class="blog-post-nav-label" data-i18n="blog.prev_post">Previous note</span>
            <span class="blog-post-nav-title">← ${escapeHtml(prevPost.title)}</span>
          </a>`
    : '<div></div>';

  const nextCard = nextPost
    ? `<a class="blog-post-nav-card is-next" href="../${escapeHtml(nextPost.slug)}/index.html" data-transition-label="Note">
            <span class="blog-post-nav-label" data-i18n="blog.next_post">Next note</span>
            <span class="blog-post-nav-title">${escapeHtml(nextPost.title)} →</span>
          </a>`
    : '<div></div>';

  const postNavHtml =
    prevPost || nextPost
      ? `\n        <nav class="blog-post-nav" aria-label="Post navigation">\n          ${prevCard}\n          ${nextCard}\n        </nav>`
      : '';

  return `<!doctype html>
<html lang="${escapeHtml(post.lang || 'en')}">
<head>
${renderSharedHead({
  prefix: '../../',
  title: `${post.title} — Kelvin Nguyen`,
  description: post.summary,
  canonicalPath: `/blog/${post.slug}/`,
  mathEnabled: post.math,
})}
</head>
<body data-page="blog-post" data-page-title="Blog">
${renderChromeTop({ prefix: '../../', blogHref: '../index.html', loadingWord: 'Notes' })}

  <main id="main">
    <section class="section page-header">
      <div class="container medium">
        <a class="blog-back-link" href="../index.html" data-transition-label="Blog" data-i18n="blog.back">← Back to Blog</a>

        <header class="blog-article-header">
          <div class="blog-article-meta">
            <span class="blog-track-pill" data-i18n="${tr.titleKey}">${escapeHtml(tr.title)}</span>
            <time datetime="${escapeHtml(post.publishAt)}">${escapeHtml(formatDisplayDate(post.publishAt))}</time>
            <span>·</span>
            <span>${post.readMinutes} <span data-i18n="blog.min_read">min read</span></span>
            ${sourceMetaHtml}
          </div>
          <h1 class="blog-article-title">${escapeHtml(post.title)}</h1>
          <p class="blog-article-lead">${escapeHtml(post.summary)}</p>
          ${tagsHtml}
        </header>

        <div class="blog-prose-wrap">
          <article class="blog-prose">
${post.bodyHtml}
          </article>
        </div>
${relatedWorkHtml}${postNavHtml}
      </div>
    </section>
  </main>

${renderChromeFooter({ prefix: '../../' })}
</body>
</html>
`;
}

function renderRssXml(publishedPosts) {
  const items = publishedPosts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${escapeXml(post.slug)}/</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${escapeXml(post.slug)}/</guid>
      <pubDate>${escapeXml(formatRssDate(post.publishAt))}</pubDate>
      <description>${escapeXml(post.summary)}</description>
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kelvin Nguyen — Engineering &amp; Paper Notes</title>
    <link>${SITE_URL}/blog/</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Paper notes, build logs, and failure post-mortems on AI systems, LLMs, and ML engineering.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
}

async function loadEntries(today) {
  let files = [];
  try {
    files = await fs.readdir(CONTENT_DIR);
  } catch (err) {
    if (err.code === 'ENOENT') return { published: [], scheduled: [], drafts: [] };
    throw err;
  }

  const mdFiles = files.filter((f) => f.endsWith('.md') && !f.startsWith('_')).sort();
  const seenSlugs = new Set();
  const published = [];
  const scheduled = [];
  const drafts = [];

  for (const fileName of mdFiles) {
    const filePath = path.join(CONTENT_DIR, fileName);
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, body } = parseFrontmatter(raw, filePath);

    const title = String(data.title || '').trim();
    if (!title) throw new Error(`Missing "title" in ${fileName}`);

    const slug = slugify(data.slug || fileName.replace(/\.md$/, ''));
    if (!slug) throw new Error(`Invalid slug in ${fileName}`);
    if (seenSlugs.has(slug)) throw new Error(`Duplicate slug "${slug}" in ${fileName}`);
    seenSlugs.add(slug);

    const date = String(data.date || today).trim();
    const publishAt = String(data.publish_at || date).trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(publishAt)) {
      throw new Error(`Invalid publish_at "${publishAt}" in ${fileName} (expected YYYY-MM-DD)`);
    }

    const track = TRACKS[data.track] ? data.track : 'paper';
    const status = String(data.status || 'draft').toLowerCase();
    const math = Boolean(data.math);
    const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];

    const entry = {
      fileName,
      title,
      slug,
      date,
      publishAt,
      track,
      status,
      lang: String(data.lang || 'en'),
      summary: String(data.summary || '').trim(),
      tags,
      math,
      sourceUrl: String(data.source_url || '').trim(),
      sourceLabel: String(data.source_label || '').trim(),
      relatedWork: String(data.related_work || '').trim(),
      relatedWorkLabel: String(data.related_work_label || '').trim(),
      readMinutes: estimateReadMinutes(body),
      bodyHtml: renderMarkdown(body, { mathEnabled: math }),
    };

    const isReady = status === 'ready' || status === 'published';
    if (!isReady) {
      drafts.push(entry);
    } else if (publishAt <= today) {
      published.push(entry);
    } else {
      scheduled.push(entry);
    }
  }

  published.sort((a, b) => (a.publishAt < b.publishAt ? 1 : a.publishAt > b.publishAt ? -1 : a.slug.localeCompare(b.slug)));
  scheduled.sort((a, b) => (a.publishAt > b.publishAt ? 1 : -1));

  return { published, scheduled, drafts };
}

async function cleanStalePostDirs(activeSlugs) {
  let previousSlugs = [];
  try {
    const raw = await fs.readFile(MANIFEST_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed.slugs)) previousSlugs = parsed.slugs;
  } catch {
    previousSlugs = [];
  }

  const activeSet = new Set(activeSlugs);
  for (const oldSlug of previousSlugs) {
    if (!activeSet.has(oldSlug) && /^[a-z0-9-]+$/.test(oldSlug)) {
      await fs.rm(path.join(BLOG_DIR, oldSlug), { recursive: true, force: true });
    }
  }
}

async function main() {
  const args = parseCliArgs(process.argv.slice(2));
  const today = getTodayICT(args.date);
  const { published, scheduled, drafts } = await loadEntries(today);

  console.log(`[blog] Date (Asia/Ho_Chi_Minh): ${today}`);
  console.log(`[blog] Published: ${published.length} | Scheduled: ${scheduled.length} | Drafts: ${drafts.length}`);

  if (args.check) {
    for (const p of published) console.log(`  - [PUBLISHED ${p.publishAt}] ${p.slug} — ${p.title}`);
    for (const s of scheduled) console.log(`  - [SCHEDULED ${s.publishAt}] ${s.slug} — ${s.title}`);
    for (const d of drafts) console.log(`  - [DRAFT] ${d.slug} — ${d.title}`);
    return;
  }

  await fs.mkdir(BLOG_DIR, { recursive: true });
  await cleanStalePostDirs(published.map((p) => p.slug));

  for (let idx = 0; idx < published.length; idx += 1) {
    const post = published[idx];
    const nextPost = idx > 0 ? published[idx - 1] : null; // newer
    const prevPost = idx < published.length - 1 ? published[idx + 1] : null; // older
    const postDir = path.join(BLOG_DIR, post.slug);
    await fs.mkdir(postDir, { recursive: true });
    await fs.writeFile(path.join(postDir, 'index.html'), renderPostHtml(post, prevPost, nextPost), 'utf8');
  }

  await fs.writeFile(path.join(BLOG_DIR, 'index.html'), renderBlogIndexHtml(published, scheduled.length), 'utf8');
  await fs.writeFile(path.join(BLOG_DIR, 'rss.xml'), renderRssXml(published), 'utf8');

  const postsMeta = published.map((p) => ({
    title: p.title,
    slug: p.slug,
    date: p.publishAt,
    track: p.track,
    summary: p.summary,
    tags: p.tags,
    readMinutes: p.readMinutes,
    url: `/blog/${p.slug}/`,
  }));
  await fs.writeFile(path.join(BLOG_DIR, 'posts.json'), JSON.stringify(postsMeta, null, 2) + '\n', 'utf8');
  await fs.writeFile(
    MANIFEST_PATH,
    JSON.stringify({ slugs: published.map((p) => p.slug) }, null, 2) + '\n',
    'utf8'
  );

  console.log(`[blog] Built /blog/index.html, ${published.length} post page(s), rss.xml, and posts.json.`);
}

main().catch((err) => {
  console.error('[blog] Build failed:', err.message);
  process.exit(1);
});
