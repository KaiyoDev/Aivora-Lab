/* ==========================================================================
   Aivora Lab - Application Logic
   Handles: tab switching, RQ accordion (expanded with bullets), scroll reveal
   Uses safe DOM APIs only (no innerHTML for user content)
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

  // ── RQ Accordion (Expanded with bullet list, DOM-safe) ─────────────────
  function renderRQs(filter) {
    var container = document.getElementById('rq-container');
    if (!container) return;
    container.innerHTML = '';

    var filtered = filter === 'all' ? RQ_DATA : RQ_DATA.filter(function (r) { return r.cl === filter; });

    for (var i = 0; i < filtered.length; i++) {
      var r = filtered[i];
      var item = el('div', { className: 'rq-item reveal', dataset: { cl: r.cl } });

      // Header row
      var header = el('div', { className: 'rq-header' });
      header.appendChild(el('span', { className: 'rq-badge ' + r.cl }, r.id));
      var qDiv = el('div', { className: 'rq-question' }, r.q);
      header.appendChild(qDiv);
      item.appendChild(header);

      // Answer card (always visible)
      var card = el('div', { className: 'rq-card' });

      // Answer bullets
      var answer = el('div', { className: 'rq-answer' });
      if (Array.isArray(r.a_list)) {
        var ul = el('ul', { className: 'rq-bullets' });
        for (var b = 0; b < r.a_list.length; b++) {
          ul.appendChild(el('li', {}, r.a_list[b]));
        }
        answer.appendChild(ul);
      } else {
        answer.appendChild(document.createTextNode(r.a));
      }
      card.appendChild(answer);

      // Example box
      var exWrap = el('div', { className: 'rq-example' });
      exWrap.appendChild(el('span', { className: 'rq-ex-label' }, 'Example'));
      var exP = el('p', {}, r.e);
      exWrap.appendChild(exP);
      card.appendChild(exWrap);

      item.appendChild(card);
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

  // Domain List Sidebar
  function initDomainList() {
    var container = document.getElementById('domainList');
    if (!container) return;
    for (var i = 0; i < DOMAINS_DATA.length; i++) {
      var d = DOMAINS_DATA[i];
      var item = el('div', { className: 'domain-item' });
      var dot = el('div', { className: 'domain-dot', style: 'background:' + d.color });
      var info = el('div', { className: 'domain-info' });
      var name = el('div', { className: 'domain-name' }, d.name);
      var meta = el('div', { className: 'domain-meta' }, d.papers + ' papers');
      info.appendChild(name);
      info.appendChild(meta);
      var gap = el('div', { className: 'domain-gap' }, 'GAP ' + d.gap);
      item.appendChild(dot);
      item.appendChild(info);
      item.appendChild(gap);
      container.appendChild(item);
    }
  }

  // ── Init ───────────────────────────────────────────────────────────────
  function init() {
    initReveal();
    initChartTabs();
    initDomainList();
    initRQFilters();
    renderRQs('all');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
