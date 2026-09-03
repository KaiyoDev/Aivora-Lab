/* ==========================================================================
   Aivora Lab - Chart Initialisation
   Uses Chart.js 4.4.0 via CDN (synchronous load in HTML).
   All configs read from data.js.
   ========================================================================== */

(function () {
  'use strict';

  const GRID   = '#1e2740';
  const TICK   = '#5a6480';
  const TT_BG  = '#111827';
  const TT_BDR = '#1e2740';
  const TT_TTL = '#818cf8';
  const TT_BDY = '#c8d0e0';

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
    const ctx = document.getElementById('driftChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: DRIFT_DATA.map(function (d) { return d.t + 't'; }),
        datasets: [
          {
            label: 'Prompt-only',
            data: DRIFT_DATA.map(function (d) { return Math.round(d.p * 100); }),
            borderColor: '#ef4444', borderWidth: 2, pointRadius: 4, tension: 0.3, fill: false
          },
          {
            label: 'State-based',
            data: DRIFT_DATA.map(function (d) { return Math.round(d.s * 100); }),
            borderColor: '#fbbf24', borderWidth: 2, pointRadius: 4, tension: 0.3
          },
          {
            label: 'LoRA',
            data: DRIFT_DATA.map(function (d) { return Math.round(d.l * 100); }),
            borderColor: '#6366f1', borderWidth: 2, pointRadius: 4, tension: 0.3
          },
          {
            label: 'Hybrid',
            data: DRIFT_DATA.map(function (d) { return Math.round(d.h * 100); }),
            borderColor: '#22c55e', borderWidth: 2, pointRadius: 4, tension: 0.3,
            fill: true, backgroundColor: 'rgba(34,197,94,.07)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          y: {
            min: 0, max: 100,
            ticks: { callback: pct, color: TICK },
            grid: { color: GRID }
          },
          x: {
            ticks: { color: TICK, font: { size: 11 } },
            grid: { display: false }
          }
        },
        plugins: {
          legend: { position: 'top', align: 'end' },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return ctx.dataset.label + ': ' + ctx.parsed.y + '%';
              }
            }
          }
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
          // Label
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
    const ctx = document.getElementById('forgettingChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: FORGETTING_DATA.map(function (d) { return d.tasks + ''; }),
        datasets: [
          {
            label: 'Naive FT',
            data: FORGETTING_DATA.map(function (d) { return d.naive; }),
            borderColor: '#ef4444', borderWidth: 2, pointRadius: 4, tension: 0.3, fill: false
          },
          {
            label: 'EWC',
            data: FORGETTING_DATA.map(function (d) { return d.ewc; }),
            borderColor: '#fbbf24', borderWidth: 2, pointRadius: 4, tension: 0.3
          },
          {
            label: 'Replay',
            data: FORGETTING_DATA.map(function (d) { return d.replay; }),
            borderColor: '#6366f1', borderWidth: 2, pointRadius: 4, tension: 0.3
          },
          {
            label: 'LoRA',
            data: FORGETTING_DATA.map(function (d) { return d.lora; }),
            borderColor: '#22c55e', borderWidth: 2, pointRadius: 4, tension: 0.3,
            fill: true, backgroundColor: 'rgba(34,197,94,.07)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          y: {
            min: 25, max: 100,
            ticks: { callback: pct, color: TICK },
            grid: { color: GRID }
          },
          x: {
            title: { display: true, text: 'Number of Tasks', color: TICK, font: { size: 11 } },
            ticks: { color: TICK, font: { size: 11 } },
            grid: { display: false }
          }
        },
        plugins: {
          legend: { position: 'top', align: 'end' },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return ctx.dataset.label + ': ' + ctx.parsed.y + '% accuracy';
              }
            }
          }
        }
      }
    });
  }

  // ── Memory Methods ──────────────────────────────────────────────────────
  function buildMemoryChart() {
    const ctx = document.getElementById('memoryChart');
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
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            min: 0, max: 100,
            ticks: { callback: pct, color: TICK },
            grid: { color: GRID }
          },
          y: { ticks: { color: TICK, font: { size: 11 } }, grid: { display: false } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  // ── Relationship Radar ──────────────────────────────────────────────────
  function buildRelationChart() {
    const ctx = document.getElementById('relationChart');
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
        responsive: true,
        maintainAspectRatio: false,
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
    const ctx = document.getElementById('icsChart');
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
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            min: 0, max: 40,
            ticks: { callback: pct, color: TICK },
            grid: { color: GRID }
          },
          x: {
            ticks: { color: TICK, font: { size: 14, weight: '700' } },
            grid: { display: false }
          }
        }
      }
    });
  }

  // ── Research Gaps Stacked Bar ───────────────────────────────────────────
  function buildGapsChart() {
    const ctx = document.getElementById('gapsChart');
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
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', align: 'end', labels: { boxWidth: 10, padding: 10 } }
        },
        scales: {
          x: {
            stacked: true,
            ticks: { color: TICK, maxRotation: 15, font: { size: 10 } },
            grid: { display: false }
          },
          y: {
            stacked: true,
            ticks: { color: TICK },
            grid: { color: GRID }
          }
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
      // Fallback: wait for load
      window.addEventListener('load', initCharts);
    }
  }

  startWhenReady();
})();
