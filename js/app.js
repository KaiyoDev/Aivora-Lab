/* ==========================================================================
   Aivora Lab - Application Logic
   Handles: tab switching, RQ accordion, scroll reveal
   Uses safe DOM APIs (no innerHTML for content)
   ========================================================================== */

(function () {
  'use strict';

  // ── Safe HTML renderer (minimal, no execScript) ────────────────────────
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === 'className') node.className = v;
      else if (k === 'dataset') Object.assign(node.dataset, v);
      else node.setAttribute(k, v);
    }
    for (const child of (children || [])) {
      if (typeof child === 'string') node.appendChild(document.createTextNode(child));
      else if (child instanceof Node) node.appendChild(child);
    }
    return node;
  }

  // ── Scroll Reveal ──────────────────────────────────────────────────────
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      items.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );
    items.forEach(item => observer.observe(item));
  }

  // ── Chart Tab Switching ────────────────────────────────────────────────
  function initChartTabs() {
    const btns = document.querySelectorAll('.tab-btn[data-chart]');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.chart;
        document.querySelectorAll('.chart-panel').forEach(p => p.classList.add('hidden'));
        const panel = document.getElementById('panel-' + target);
        if (panel) panel.classList.remove('hidden');
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // ── RQ Accordion ───────────────────────────────────────────────────────
  const RQ_CATEGORIES = {
    Char: 'Character Modeling',
    Soc:  'Social Intelligence',
    Tech: 'Technical Foundation',
    Eval: 'Evaluation'
  };

  function renderRQs(filter) {
    const container = document.getElementById('rq-container');
    if (!container) return;
    container.innerHTML = ''; // clear existing

    const filtered = filter === 'all' ? RQ_DATA : RQ_DATA.filter(r => r.cl === filter);

    filtered.forEach((r, idx) => {
      const item = el('div', {
        className: 'rq-item reveal',
        dataset: { cl: r.cl }
      });

      // Header
      const header = el('div', { className: 'rq-header' });
      header.appendChild(el('span', { className: 'rq-badge ' + r.cl }, r.id));

      const qDiv = el('div', { className: 'rq-question' }, r.q);
      header.appendChild(qDiv);

      const chevron = el('svg', {
        className: 'rq-chevron',
        width: '12', height: '12',
        viewBox: '0 0 12 12',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      }, [el('path', { d: 'M4 2l4 4-4 4' })]);
      header.appendChild(chevron);
      item.appendChild(header);

      // Body
      const body = el('div', { className: 'rq-body' });
      const bodyInner = el('div', { className: 'rq-body-inner' });

      const answer = el('p', { className: 'rq-answer' }, r.a);
      bodyInner.appendChild(answer);

      const example = el('p', { className: 'rq-example' });
      example.appendChild(el('strong', {}, 'Example: '));
      example.appendChild(document.createTextNode(r.e));
      bodyInner.appendChild(example);

      body.appendChild(bodyInner);
      item.appendChild(body);

      // Click handler
      item.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.rq-item.open').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });

      container.appendChild(item);
    });

    // Observe new reveal items
    setTimeout(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const newItems = container.querySelectorAll('.reveal');
      if (prefersReduced) {
        newItems.forEach(e => e.classList.add('visible'));
        return;
      }
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
        { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
      );
      newItems.forEach(item => obs.observe(item));
    }, 10);
  }

  function initRQFilters() {
    const btns = document.querySelectorAll('.rq-filter-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderRQs(btn.dataset.filter);
      });
    });
  }

  // ── Init on DOM Ready ──────────────────────────────────────────────────
  function init() {
    initReveal();
    initChartTabs();
    initRQFilters();
    renderRQs('all');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
