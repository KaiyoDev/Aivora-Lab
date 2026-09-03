"""Generate research figures for Aivora Lab paper."""
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import os

OUT = r"D:\Kaiyo\Project\Aivora-studio\aivora-lab\figures"
os.makedirs(OUT, exist_ok=True)

# FIG 1: Personality Drift
fig, ax = plt.subplots(figsize=(8, 5))
turns = np.array([10, 50, 100, 200, 500])
prompt = np.array([0.94, 0.68, 0.52, 0.38, 0.27])
state = np.array([0.95, 0.75, 0.63, 0.51, 0.42])
learned = np.array([0.96, 0.83, 0.78, 0.71, 0.65])
hybrid = np.array([0.97, 0.85, 0.82, 0.78, 0.70])
ax.plot(turns, prompt, 'o-', color='#e74c3c', lw=2, ms=8, label='Prompt-only')
ax.plot(turns, state, 's-', color='#f39c12', lw=2, ms=8, label='State-based')
ax.plot(turns, learned, '^-', color='#3498db', lw=2, ms=8, label='Learned (LoRA)')
ax.plot(turns, hybrid, 'd-', color='#27ae60', lw=2, ms=8, label='Hybrid')
ax.set_xlabel('Turns', fontsize=12)
ax.set_ylabel('Personality Consistency (Pearson r)', fontsize=12)
ax.set_title('Personality Drift Over Turns', fontsize=14, fontweight='bold')
ax.set_xscale('log')
ax.set_xticks([10, 50, 100, 200, 500])
ax.set_xticklabels(['10', '50', '100', '200', '500'])
ax.legend(loc='upper right', fontsize=9)
ax.grid(True, alpha=0.3)
ax.set_ylim(0, 1.0)
ax.axhline(y=0.60, color='red', ls='--', alpha=0.5, label='ICS Warning')
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'fig01-personality-drift.pdf'), dpi=150, bbox_inches='tight')
plt.savefig(os.path.join(OUT, 'fig01-personality-drift.png'), dpi=150, bbox_inches='tight')
print('Fig 1 done')

# FIG 2: Memory Comparison
fig, ax = plt.subplots(figsize=(8, 5))
apps = ['Keyword', 'Vector', 'LLM', 'Hybrid']
acc = [45, 78, 85, 91]
lat = [5, 38, 425, 150]
x = np.arange(len(apps))
w = 0.35
ax1 = ax.twinx()
ax.bar(x-w/2, acc, w, color=['#95a5a6','#3498db','#9b59b6','#27ae60'], alpha=0.8, label='Accuracy %')
ax1.bar(x+w/2, [l/100 for l in lat], w, color=['#e74c3c','#e67e22','#f39c12','#f1c40f'], alpha=0.6, label='Latency (10ms)')
ax.set_xlabel('Architecture', fontsize=12)
ax.set_ylabel('Accuracy @1 (%)', fontsize=12, color='#27ae60')
ax1.set_ylabel('Latency (10ms)', fontsize=12, color='#e74c3c')
ax.set_title('Memory Architecture Comparison', fontsize=14, fontweight='bold')
ax.set_xticks(x); ax.set_xticklabels(apps)
ax.set_ylim(0,100); ax1.set_ylim(0,50)
l1,_ = ax.get_legend_handles_labels(); l2,_ = ax1.get_legend_handles_labels()
ax.legend(l1+l2, _+_, loc='upper left')
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'fig02-memory-comparison.pdf'), dpi=150, bbox_inches='tight')
plt.savefig(os.path.join(OUT, 'fig02-memory-comparison.png'), dpi=150, bbox_inches='tight')
print('Fig 2 done')

# FIG 3: Relationship Evolution
fig, ax = plt.subplots(figsize=(8, 5))
weeks = np.array([0, 2, 4, 8, 12])
trust = np.array([3.2, 3.5, 3.9, 4.2, 4.4])
fam = np.array([2.0, 2.8, 3.5, 4.0, 4.3])
aff = np.array([2.5, 3.0, 3.4, 3.7, 3.9])
intim = np.array([1.8, 2.2, 2.6, 3.0, 3.3])
ax.plot(weeks, trust, 'o-', c='#27ae60', lw=2, ms=6, label='Trust')
ax.plot(weeks, fam, 's-', c='#3498db', lw=2, ms=6, label='Familiarity')
ax.plot(weeks, aff, '^-', c='#f39c12', lw=2, ms=6, label='Affection')
ax.plot(weeks, intim, 'd-', c='#9b59b6', lw=2, ms=6, label='Intimacy')
ax.set_xlabel('Weeks', fontsize=12)
ax.set_ylabel('Mean Score (1-5)', fontsize=12)
ax.set_title('Relationship Dimensions (12-week, N=52)', fontsize=14, fontweight='bold')
ax.set_xticks(weeks); ax.legend(loc='lower right')
ax.grid(True, alpha=0.3); ax.set_ylim(1.5, 5.0)
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'fig03-relationship.pdf'), dpi=150, bbox_inches='tight')
plt.savefig(os.path.join(OUT, 'fig03-relationship.png'), dpi=150, bbox_inches='tight')
print('Fig 3 done')

# FIG 4: ICS Pie
fig, ax = plt.subplots(figsize=(7, 5))
comps = ['Personality\nConsistency', 'Memory\nAccuracy', 'Relationship\nContinuity', 'Value\nConsistency']
wts = [0.30, 0.25, 0.25, 0.20]
cols = ['#27ae60','#3498db','#f39c12','#9b59b6']
ax.pie(wts, labels=comps, colors=cols, autopct='%1.0f%%', startangle=90, explode=[0.02,0,0,0])
ax.set_title('ICS Component Weights', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'fig04-ics-pie.pdf'), dpi=150, bbox_inches='tight')
plt.savefig(os.path.join(OUT, 'fig04-ics-pie.png'), dpi=150, bbox_inches='tight')
print('Fig 4 done')

# FIG 5: Architecture Heatmap
fig, ax = plt.subplots(figsize=(9, 5))
archs = ['A\nPrompt', 'B\n+Memory', 'C\n+Rel+State', 'D\n+Learned', 'E\nFull']
mets = ['Consist.', 'Adapt.', 'Cost', 'Scale', 'Safety']
vals = np.array([[.55,.30,.95,.90,.80],[.74,.50,.85,.70,.70],[.82,.70,.70,.60,.65],[.85,.85,.50,.50,.55],[.90,.95,.30,.40,.40]])
im = ax.imshow(vals, cmap='RdYlGn', aspect='auto', vmin=0, vmax=1)
ax.set_xticks(np.arange(5)); ax.set_yticks(np.arange(5))
ax.set_xticklabels(mets, fontsize=10); ax.set_yticklabels(archs, fontsize=10)
for i in range(5):
    for j in range(5):
        ax.text(j, i, f'{vals[i,j]:.2f}', ha='center', va='center', color='white' if vals[i,j]>0.7 else 'black', fontsize=9)
ax.set_title('Architecture Comparison Matrix', fontsize=14, fontweight='bold')
plt.colorbar(im, ax=ax).set_label('Score')
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'fig05-arch-heatmap.pdf'), dpi=150, bbox_inches='tight')
plt.savefig(os.path.join(OUT, 'fig05-arch-heatmap.png'), dpi=150, bbox_inches='tight')
print('Fig 5 done')

# FIG 6: Forgetting Curve
fig, ax = plt.subplots(figsize=(8, 5))
tasks = np.array([1, 2, 3, 5, 7, 10])
naive = np.array([95, 72, 61, 48, 39, 31])
ewc = np.array([95, 89, 84, 76, 70, 62])
replay = np.array([95, 93, 91, 87, 83, 78])
lora = np.array([95, 92, 91, 90, 90, 90])
ax.plot(tasks, naive, 'o-', c='#e74c3c', lw=2, ms=7, label='Naive FT')
ax.plot(tasks, ewc, 's-', c='#f39c12', lw=2, ms=7, label='EWC (lambda=500)')
ax.plot(tasks, replay, '^-', c='#3498db', lw=2, ms=7, label='Replay (10%)')
ax.plot(tasks, lora, 'd-', c='#27ae60', lw=2, ms=7, label='LoRA')
ax.set_xlabel('Number of Adaptation Tasks', fontsize=12)
ax.set_ylabel('Retention on Task 1 (%)', fontsize=12)
ax.set_title('Multi-Task Forgetting Curve', fontsize=14, fontweight='bold')
ax.set_xticks(tasks); ax.legend(loc='lower right')
ax.grid(True, alpha=0.3); ax.set_ylim(25, 100)
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'fig06-forgetting-curve.pdf'), dpi=150, bbox_inches='tight')
plt.savefig(os.path.join(OUT, 'fig06-forgetting-curve.png'), dpi=150, bbox_inches='tight')
print('Fig 6 done')

# FIG 7: Research Gaps Distribution
fig, ax = plt.subplots(figsize=(8, 4))
domains = ['Memory', 'Persona.', 'Emotion', 'Relation.', 'Multi-Agent', 'Context', 'RL', 'CL']
p0 = [2, 2, 1, 2, 1, 1, 2, 2]
p1 = [2, 2, 1, 2, 1, 1, 2, 2]
p2 = [1, 1, 1, 1, 1, 1, 1, 1]
x = np.arange(len(domains))
w = 0.25
ax.bar(x-w, p0, w, color='#e74c3c', label='P0 Critical')
ax.bar(x, p1, w, color='#f39c12', label='P1 High')
ax.bar(x+w, p2, w, color='#3498db', label='P2 Medium')
ax.set_xlabel('Domain', fontsize=12)
ax.set_ylabel('Number of Gaps', fontsize=12)
ax.set_title('Research Gaps by Domain and Priority', fontsize=14, fontweight='bold')
ax.set_xticks(x); ax.set_xticklabels(domains, rotation=15, ha='right')
ax.legend(fontsize=9)
ax.grid(True, alpha=0.3, axis='y')
for i,(a,b,c) in enumerate(zip(p0,p1,p2)):
    if a+b+c > 0:
        ax.text(i, a+b+c+0.3, str(a+b+c), ha='center', fontsize=9)
plt.tight_layout()
plt.savefig(os.path.join(OUT, 'fig07-gaps-distribution.pdf'), dpi=150, bbox_inches='tight')
plt.savefig(os.path.join(OUT, 'fig07-gaps-distribution.png'), dpi=150, bbox_inches='tight')
print('Fig 7 done')

print('\nAll 7 figures generated!')
