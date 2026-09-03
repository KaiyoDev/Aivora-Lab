/* ==========================================================================
   Aivora Lab - Application Logic
   Handles: tab switching, RQ accordion, scroll reveal
   Uses safe DOM APIs (no innerHTML for user content)
   ========================================================================== */

(function () {
  'use strict';

  // ── Safe HTML renderer ─────────────────────────────────────────────────
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    var keys = Object.keys(attrs || {});
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var v = attrs[k];
      if (k === 'className') node.className = v;
      else if (k === 'dataset') Object.assign(node.dataset, v);
      else node.setAttribute(k, v);
    }
    var ch = children || [];
    for (var j = 0; j < ch.length; j++) {
      if (typeof ch[j] === 'string') node.appendChild(document.createTextNode(ch[j]));
      else if (ch[j] instanceof Node) node.appendChild(ch[j]);
    }
    return node;
  }

  // ── Scroll Reveal ──────────────────────────────────────────────────────
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      for (var i = 0; i < items.length; i++) items[i].classList.add('visible');
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add('visible');
            observer.unobserve(entries[i].target);
          }
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );
    for (var k = 0; k < items.length; k++) observer.observe(items[k]);
  }

  // ── Chart Tab Switching ────────────────────────────────────────────────
  function initChartTabs() {
    var btns = document.querySelectorAll('.tab-btn[data-chart]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var target = this.dataset.chart;
        var panels = document.querySelectorAll('.chart-panel');
        for (var j = 0; j < panels.length; j++) panels[j].classList.add('hidden');
        var panel = document.getElementById('panel-' + target);
        if (panel) panel.classList.remove('hidden');
        for (var k = 0; k < btns.length; k++) btns[k].classList.remove('active');
        this.classList.add('active');
      });
    }
  }

  // ── RQ Accordion ───────────────────────────────────────────────────────
  function renderRQs(filter) {
    var container = document.getElementById('rq-container');
    if (!container) return;
    container.innerHTML = '';

    var filtered = filter === 'all' ? RQ_DATA : RQ_DATA.filter(function (r) { return r.cl === filter; });

    for (var i = 0; i < filtered.length; i++) {
      var r = filtered[i];
      var item = el('div', {
        className: 'rq-item reveal',
        dataset: { cl: r.cl }
      });

      // Header row
      var header = el('div', { className: 'rq-header' });
      header.appendChild(el('span', { className: 'rq-badge ' + r.cl }, r.id));

      var qDiv = el('div', { className: 'rq-question' }, r.q);
      header.appendChild(qDiv);

      var chevron = el('svg', {
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

      // Body (hidden by default)
      var body = el('div', { className: 'rq-body' });
      var bodyInner = el('div', { className: 'rq-body-inner' });

      var answer = el('p', { className: 'rq-answer' }, r.a);
      bodyInner.appendChild(answer);

      var example = el('p', { className: 'rq-example' });
      example.appendChild(el('strong', {}, 'Example: '));
      example.appendChild(document.createTextNode(r.e));
      bodyInner.appendChild(example);

      body.appendChild(bodyInner);
      item.appendChild(body);

      // Click to toggle
      item.addEventListener('click', function () {
        var wasOpen = this.classList.contains('open');
        var openItems = document.querySelectorAll('.rq-item.open');
        for (var j = 0; j < openItems.length; j++) openItems[j].classList.remove('open');
        if (!wasOpen) this.classList.add('open');
      });

      container.appendChild(item);
    }

    // Re-observe new reveal items
    setTimeout(function () {
      var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var newItems = container.querySelectorAll('.reveal');
      if (prefersReduced) {
        for (var k = 0; k < newItems.length; k++) newItems[k].classList.add('visible');
        return;
      }
      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
      );
      for (var m = 0; m < newItems.length; m++) obs.observe(newItems[m]);
    }, 50);
  }

  function initRQFilters() {
    var btns = document.querySelectorAll('.rq-filter');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        for (var j = 0; j < btns.length; j++) btns[j].classList.remove('active');
        this.classList.add('active');
        renderRQs(this.dataset.filter);
      });
    }
  }

  // ── Init ───────────────────────────────────────────────────────────────
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
