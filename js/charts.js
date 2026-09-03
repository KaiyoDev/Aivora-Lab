/* ==========================================================================
   Aivora Lab - Chart Initialisation
   Uses Chart.js 4.4.0 via CDN (synchronous load in HTML).
   All configs read from data.js.
   ========================================================================== */

(function () {
  'use strict';

  var GRID = '#1e2740';
  var TICK = '#5a6480';
  var TT_BG = '#111827';
  var TT_BDR = '#1e2740';
  var TT_TTL = '#818cf8';
  var TT_BDY = '#c8d0e0';

  Chart.defaults.color = TICK;
  Chart.defaults.borderColor = GRID;
  Chart.defaults.plugins.tooltip.backgroundColor = TT_BG;
  Chart.defaults.plugins.tooltip.titleColor = TT_TTL;
  Chart.defaults.plugins.tooltip.bodyColor = TT_BDY;
  Chart.defaults.plugins.tooltip.borderColor = TT_BDR;
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.cornerRadius = 6;
  Chart.defaults.plugins.tooltip.padding = 8;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.padding = 12;

  function pct(v) { return v + '%'; }

  // ── Personality Drift ───────────────────────────────────────────────────
  function buildDriftChart() {
    var ctx = document.getElementById('driftChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: DRIFT_DATA.map(function (d) { return d.t + 't'; }),
        datasets: [
          { label: 'Prompt-only', data: DRIFT_DATA.map(function (d) { return Math.round(d.p * 100); }), borderColor: '#ef4444', borderWidth: 2, pointRadius: 4, tension: 0.3, fill: false },
          { label: 'State-based', data: DRIFT_DATA.map(function (d) { return Math.round(d.s * 100); }), borderColor: '#fbbf24', borderWidth: 2, pointRadius: 4, tension: 0.3 },
          { label: 'LoRA',        data: DRIFT_DATA.map(function (d) { return Math.round(d.l * 100); }), borderColor: '#6366f1', borderWidth: 2, pointRadius: 4, tension: 0.3 },
          { label: 'Hybrid',      data: DRIFT_DATA.map(function (d) { return Math.round(d.h * 100); }), borderColor: '#22c55e', borderWidth: 2, pointRadius: 4, tension: 0.3, fill: true, backgroundColor: 'rgba(34,197,94,.07)' }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          y: { min: 0, max: 100, ticks: { callback: pct, color: TICK }, grid: { color: GRID } },
          x: { ticks: { color: TICK, font: { size: 11 } }, grid: { display: false } }
        },
        plugins: {
          legend: { position: 'top', align: 'end' },
          tooltip: { callbacks: { label: function (ctx) { return ctx.dataset.label + ': ' + ctx.parsed.y + '%'; } } }
        }
      },
      plugins: [{
        id: 'threshold-line',
        beforeDraw: function (chart) {
          var yScale = chart.scales.y;
          var xScale = chart.scales.x;
          var py = yScale.getPixelForValue(60);
          chart.ctx.save();
          chart.ctx.setLineDash([4, 4]);
          chart.ctx.strokeStyle = 'rgba(239,68,68,0.35)';
          chart.ctx.lineWidth = 1;
          chart.ctx.beginPath();
          chart.ctx.moveTo(xScale.left, py);
          chart.ctx.lineTo(xScale.right, py);
          chart.ctx.stroke();
          chart.ctx.fillStyle = 'rgba(239,68,68,0.7)';
          chart.ctx.font = '10px JetBrains Mono';
          chart.ctx.fillText('Threshold 60%', xScale.right - 72, py - 5);
          chart.ctx.restore();
        }
      }]
    });
  }

  // ── Forgetting Curve ────────────────────────────────────────────────────
  function buildForgettingChart() {
    var ctx = document.getElementById('forgettingChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: FORGETTING_DATA.map(function (d) { return d.tasks + ''; }),
        datasets: [
          { label: 'Naive FT', data: FORGETTING_DATA.map(function (d) { return d.naive; }), borderColor: '#ef4444', borderWidth: 2, pointRadius: 4, tension: 0.3, fill: false },
          { label: 'EWC',       data: FORGETTING_DATA.map(function (d) { return d.ewc; }),  borderColor: '#fbbf24', borderWidth: 2, pointRadius: 4, tension: 0.3 },
          { label: 'Replay',    data: FORGETTING_DATA.map(function (d) { return d.replay; }), borderColor: '#6366f1', borderWidth: 2, pointRadius: 4, tension: 0.3 },
          { label: 'LoRA',      data: FORGETTING_DATA.map(function (d) { return d.lora; }),  borderColor: '#22c55e', borderWidth: 2, pointRadius: 4, tension: 0.3, fill: true, backgroundColor: 'rgba(34,197,94,.07)' }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          y: { min: 25, max: 100, ticks: { callback: pct, color: TICK }, grid: { color: GRID } },
          x: { title: { display: true, text: 'Number of Tasks', color: TICK, font: { size: 11 } }, ticks: { color: TICK, font: { size: 11 } }, grid: { display: false } }
        },
        plugins: {
          legend: { position: 'top', align: 'end' },
          tooltip: { callbacks: { label: function (ctx) { return ctx.dataset.label + ': ' + ctx.parsed.y + '% accuracy'; } } }
        }
      }
    });
  }

  // ── Memory Methods ──────────────────────────────────────────────────────
  function buildMemoryChart() {
    var ctx = document.getElementById('memoryChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: MEMORY_DATA.map(function (d) { return d.name; }),
        datasets: [{
          label: 'Accuracy %',
          data: MEMORY_DATA.map(function (d) { return d.acc; }),
          backgroundColor: MEMORY_DATA.map(function (d) { return d.color; }),
          borderRadius: 4,
          barThickness: 32
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true, maintainAspectRatio: false,
        scales: {
          x: { min: 0, max: 100, ticks: { callback: pct, color: TICK }, grid: { color: GRID } },
          y: { ticks: { color: TICK, font: { size: 11 } }, grid: { display: false } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  // ── Relationship Radar ──────────────────────────────────────────────────
  function buildRelationChart() {
    var ctx = document.getElementById('relationChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: RELATION_DATA.map(function (d) { return d.subject; }),
        datasets: [{
          label: 'Score',
          data: RELATION_DATA.map(function (d) { return d.value; }),
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99,102,241,.12)',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: '#6366f1',
          pointBorderColor: '#111827',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            angleLines: { color: GRID },
            grid: { color: GRID },
            pointLabels: { color: TICK, font: { size: 11 } },
            ticks: { display: false, backdropColor: 'transparent' },
            suggestedMin: 0,
            suggestedMax: 5
          }
        }
      }
    });
  }

  // ── ICS Weight Bar ──────────────────────────────────────────────────────
  function buildIcsChart() {
    var ctx = document.getElementById('icsChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ICS_WEIGHTS.map(function (w) { return w.short; }),
        datasets: [{
          label: 'Weight %',
          data: ICS_WEIGHTS.map(function (w) { return w.weight; }),
          backgroundColor: ICS_WEIGHTS.map(function (w) { return w.color; }),
          borderRadius: 4,
          barThickness: 40
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 0, max: 40, ticks: { callback: pct, color: TICK }, grid: { color: GRID } },
          x: { ticks: { color: TICK, font: { size: 14, weight: '700' } }, grid: { display: false } }
        }
      }
    });
  }

  // ── Research Gaps Stacked Bar ───────────────────────────────────────────
  function buildGapsChart() {
    var ctx = document.getElementById('gapsChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: GAPS_DATA.map(function (d) { return d.domain; }),
        datasets: [
          { label: 'P0 (Critical)', data: GAPS_DATA.map(function (d) { return d.p0; }), backgroundColor: '#ef4444', borderRadius: 2 },
          { label: 'P1 (High)',     data: GAPS_DATA.map(function (d) { return d.p1; }), backgroundColor: '#f97316', borderRadius: 2 },
          { label: 'P2 (Medium)',   data: GAPS_DATA.map(function (d) { return d.p2; }), backgroundColor: '#6366f1', borderRadius: 2 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', align: 'end', labels: { boxWidth: 10, padding: 10 } } },
        scales: {
          x: { stacked: true, ticks: { color: TICK, maxRotation: 15, font: { size: 10 } }, grid: { display: false } },
          y: { stacked: true, ticks: { color: TICK }, grid: { color: GRID } }
        }
      }
    });
  }

  // ── Research Map (SVG force graph) ──────────────────────────────────────
  // Uses DOM-safe API (createElementNS), no innerHTML for content
  function buildResearchMap() {
    var container = document.getElementById('researchMap');
    if (!container) return;

    var W = 800, H = 500;
    var nodes = DOMAINS_DATA.map(function (d, i) {
      var angle = (i / DOMAINS_DATA.length) * Math.PI * 2 - Math.PI / 2;
      var r = 180 + Math.random() * 40;
      return {
        id: d.id, name: d.name, papers: d.papers,
        gap: d.gap, color: d.color, desc: d.desc,
        x: W / 2 + Math.cos(angle) * r,
        y: H / 2 + Math.sin(angle) * r,
        r: 18 + d.papers * 1.5
      };
    });

    var edges = [];
    DOMAIN_EDGES.forEach(function (pair) {
      var src = nodes.find(function (n) { return n.id === pair[0]; });
      var dst = nodes.find(function (n) { return n.id === pair[1]; });
      if (src && dst) edges.push({ src: src, dst: dst });
    });

    // Create SVG using createElementNS (safe)
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.display = 'block';
    svg.style.maxWidth = W + 'px';
    svg.style.margin = '0 auto';

    // Defs - glow filter
    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    var filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'map-glow');
    var blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    blur.setAttribute('stdDeviation', '3');
    blur.setAttribute('result', 'coloredBlur');
    filter.appendChild(blur);
    var merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    var mn1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    mn1.setAttribute('in', 'coloredBlur');
    var mn2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    mn2.setAttribute('in', 'SourceGraphic');
    merge.appendChild(mn1);
    merge.appendChild(mn2);
    filter.appendChild(merge);
    defs.appendChild(filter);
    svg.appendChild(defs);

    // Draw edges
    edges.forEach(function (e) {
      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', e.src.x);
      line.setAttribute('y1', e.src.y);
      line.setAttribute('x2', e.dst.x);
      line.setAttribute('y2', e.dst.y);
      line.setAttribute('stroke', '#1e2740');
      line.setAttribute('stroke-width', '1.5');
      svg.appendChild(line);
    });

    // Draw nodes
    nodes.forEach(function (n) {
      var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.style.cursor = 'pointer';

      // Outer glow ring
      var ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      ring.setAttribute('cx', n.x);
      ring.setAttribute('cy', n.y);
      ring.setAttribute('r', n.r + 4);
      ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', n.color);
      ring.setAttribute('stroke-width', '1');
      ring.setAttribute('opacity', '0.25');
      g.appendChild(ring);

      // Main circle
      var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', n.x);
      circle.setAttribute('cy', n.y);
      circle.setAttribute('r', n.r);
      circle.setAttribute('fill', n.color);
      circle.setAttribute('fill-opacity', '0.15');
      circle.setAttribute('stroke', n.color);
      circle.setAttribute('stroke-width', '1.5');
      g.appendChild(circle);

      // Papers count
      var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', n.x);
      text.setAttribute('y', n.y + 1);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', '#c8d0e0');
      text.setAttribute('font-size', '11');
      text.setAttribute('font-weight', '700');
      text.setAttribute('font-family', 'JetBrains Mono, monospace');
      text.textContent = n.papers;
      g.appendChild(text);

      // Name below
      var nameEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      nameEl.setAttribute('x', n.x);
      nameEl.setAttribute('y', n.y + n.r + 14);
      nameEl.setAttribute('text-anchor', 'middle');
      nameEl.setAttribute('fill', '#5a6480');
      nameEl.setAttribute('font-size', '9');
      nameEl.setAttribute('font-family', 'Inter, system-ui, sans-serif');
      nameEl.textContent = n.name;
      g.appendChild(nameEl);

      // Gap severity dots
      if (n.gap > 0) {
        for (var gi = 0; gi < n.gap; gi++) {
          var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          dot.setAttribute('cx', n.x - n.gap * 4 + gi * 8 + 4);
          dot.setAttribute('cy', n.y - n.r - 8);
          dot.setAttribute('r', 2.5);
          dot.setAttribute('fill', gi < 2 ? '#ef4444' : '#f97316');
          g.appendChild(dot);
        }
      }

      // Hover interactions (DOM-safe)
      var origFill = '0.15';
      var origRing = '0.25';
      g.addEventListener('mouseenter', function () {
        circle.setAttribute('fill-opacity', '0.35');
        ring.setAttribute('opacity', '0.6');
      });
      g.addEventListener('mouseleave', function () {
        circle.setAttribute('fill-opacity', origFill);
        ring.setAttribute('opacity', origRing);
      });

      svg.appendChild(g);
    });

    // Append SVG to container (safe - container is our own DOM element)
    container.appendChild(svg);
  }

  // ── Domain Papers Bar ───────────────────────────────────────────────────
  function buildDomainPapersChart() {
    var ctx = document.getElementById('domainPapersChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: DOMAINS_DATA.map(function (d) { return d.name; }),
        datasets: [{
          label: 'Papers',
          data: DOMAINS_DATA.map(function (d) { return d.papers; }),
          backgroundColor: DOMAINS_DATA.map(function (d) { return d.color; }),
          borderRadius: 4,
          barThickness: 16
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true, maintainAspectRatio: false,
        scales: {
          x: { min: 0, max: 22, ticks: { color: TICK, stepSize: 5 }, grid: { color: GRID } },
          y: { ticks: { color: TICK, font: { size: 10 } }, grid: { display: false } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  // ── Trust Evolution Line ────────────────────────────────────────────────
  function buildTrustChart() {
    var ctx = document.getElementById('trustChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: TRUST_DATA.map(function (d) { return d.turn + ''; }),
        datasets: [
          { label: 'Trust',      data: TRUST_DATA.map(function (d) { return d.trust; }),      borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,.1)', borderWidth: 2, pointRadius: 3, tension: 0.3, fill: true },
          { label: 'Affection',  data: TRUST_DATA.map(function (d) { return d.affection; }),  borderColor: '#f97316', borderWidth: 2, pointRadius: 3, tension: 0.3, fill: false },
          { label: 'Familiarity',data: TRUST_DATA.map(function (d) { return d.familiarity; }),borderColor: '#22c55e', borderWidth: 2, pointRadius: 3, tension: 0.3, fill: false }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          y: { min: 0, max: 5, ticks: { color: TICK, stepSize: 1 }, grid: { color: GRID } },
          x: { ticks: { color: TICK, font: { size: 10 } }, grid: { display: false }, title: { display: true, text: 'Turn', color: TICK, font: { size: 11 } } }
        },
        plugins: { legend: { position: 'top', align: 'end', labels: { boxWidth: 10, padding: 10 } } }
      }
    });
  }

  // ── ICS Component Donut ─────────────────────────────────────────────────
  function buildIcsDonut() {
    var ctx = document.getElementById('icsDonut');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ICS_COMPONENT_DATA.map(function (d) { return d.label; }),
        datasets: [{
          data: ICS_COMPONENT_DATA.map(function (d) { return d.value; }),
          backgroundColor: ICS_COMPONENT_DATA.map(function (d) { return d.color; }),
          borderColor: '#111827',
          borderWidth: 3,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 12, padding: 12, font: { size: 12 } } },
          tooltip: { callbacks: { label: function (ctx) { return ctx.label + ': ' + ctx.parsed + '%'; } } }
        }
      }
    });
  }

  // ── Gap Severity Over Time ─────────────────────────────────────────────
  function buildGapSeverityChart() {
    var ctx = document.getElementById('gapSeverityChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: GAP_SEVERITY.map(function (d) { return d.phase; }),
        datasets: [
          { label: 'Critical', data: GAP_SEVERITY.map(function (d) { return d.critical; }), backgroundColor: '#ef4444', borderRadius: 2 },
          { label: 'High',     data: GAP_SEVERITY.map(function (d) { return d.high; }),     backgroundColor: '#f97316', borderRadius: 2 },
          { label: 'Medium',   data: GAP_SEVERITY.map(function (d) { return d.medium; }),   backgroundColor: '#6366f1', borderRadius: 2 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', align: 'end', labels: { boxWidth: 10, padding: 10 } } },
        scales: {
          x: { stacked: true, ticks: { color: TICK, font: { size: 11 } }, grid: { display: false } },
          y: { stacked: true, ticks: { color: TICK, stepSize: 1 }, grid: { color: GRID } }
        }
      }
    });
  }

  // ── Confidence Distribution ─────────────────────────────────────────────
  function buildConfidenceChart() {
    var ctx = document.getElementById('confidenceChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: CONFIDENCE_DATA.map(function (d) { return d.level; }),
        datasets: [{
          label: 'Count',
          data: CONFIDENCE_DATA.map(function (d) { return d.count; }),
          backgroundColor: CONFIDENCE_DATA.map(function (d) { return d.color; }),
          borderRadius: 4,
          barThickness: 36
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 0, max: 35, ticks: { color: TICK, stepSize: 5 }, grid: { color: GRID } },
          x: { ticks: { color: TICK, font: { size: 11 } }, grid: { display: false } }
        }
      }
    });
  }

  // ── Cost-Benefit Scatter ────────────────────────────────────────────────
  function buildCbChart() {
    var ctx = document.getElementById('cbChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: CB_DATA.map(function (d) {
          return {
            label: d.label,
            data: [{ x: d.x, y: d.y }],
            backgroundColor: d.color,
            pointRadius: d.r,
            pointHoverRadius: d.r + 3
          };
        })
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: 'Adaptability %', color: TICK, font: { size: 11 } }, min: 0, max: 100, ticks: { color: TICK }, grid: { color: GRID } },
          y: { title: { display: true, text: 'Cost Efficiency %', color: TICK, font: { size: 11 } }, min: 0, max: 100, ticks: { color: TICK }, grid: { color: GRID } }
        },
        plugins: {
          legend: { position: 'top', align: 'end', labels: { boxWidth: 10, padding: 8, font: { size: 10 } } },
          tooltip: { callbacks: { label: function (ctx) { return ctx.dataset.label + ': Adapt=' + ctx.parsed.x + '%, Cost=' + ctx.parsed.y + '%'; } } }
        }
      }
    });
  }

  // ── Paper Years Bar ─────────────────────────────────────────────────────
  function buildYearsChart() {
    var ctx = document.getElementById('yearsChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: PAPER_YEARS.map(function (d) { return d.year; }),
        datasets: [{
          label: 'Papers',
          data: PAPER_YEARS.map(function (d) { return d.count; }),
          backgroundColor: '#6366f1',
          borderRadius: 4,
          barThickness: 32
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 0, max: 25, ticks: { color: TICK, stepSize: 5 }, grid: { color: GRID } },
          x: { ticks: { color: TICK, font: { size: 11 } }, grid: { display: false } }
        }
      }
    });
  }

  // ── Init All Charts ─────────────────────────────────────────────────────
  function initCharts() {
    buildDriftChart();
    buildForgettingChart();
    buildMemoryChart();
    buildRelationChart();
    buildIcsChart();
    buildGapsChart();
    buildResearchMap();
    buildDomainPapersChart();
    buildTrustChart();
    buildIcsDonut();
    buildGapSeverityChart();
    buildConfidenceChart();
    buildCbChart();
    buildYearsChart();
  }

  // Wait for Chart.js and DOM
  function startWhenReady() {
    if (typeof Chart !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCharts);
      } else {
        initCharts();
      }
    } else {
      window.addEventListener('load', initCharts);
    }
  }

  startWhenReady();
})();
