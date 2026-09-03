"""Generate PDF in sections to avoid browser crash."""
import os
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

LAB_DIR = Path(__file__).parent.parent
PAPERS_DIR = LAB_DIR / "papers"
RESEARCH_DIR = LAB_DIR / "research"
SYNTHESIS_DIR = LAB_DIR / "synthesis"
MANUSCRIPT_DIR = LAB_DIR / "manuscript"
OUTPUT_DIR = LAB_DIR / "pdf_output"
OUTPUT_DIR.mkdir(exist_ok=True)

FONT_CSS = """
body {
  font-family: 'Times New Roman', serif;
  font-size: 10pt;
  line-height: 1.5;
  color: #1a1a1a;
  max-width: 180mm;
  margin: 0 auto;
  padding: 15mm;
}
h1 { font-size: 16pt; color: #1a3a5c; border-bottom: 2px solid #1a3a5c; padding-bottom: 4px; page-break-before: always; margin-top: 0; }
h1:first-of-type { page-break-before: avoid; margin-top: 0; }
h2 { font-size: 12pt; color: #2c5f8a; border-bottom: 1px solid #ccc; padding-bottom: 2px; margin-top: 16px; }
h3 { font-size: 11pt; color: #333; margin-top: 12px; }
table { border-collapse: collapse; width: 100%; margin: 8px 0; font-size: 8pt; }
th, td { border: 1px solid #999; padding: 2px 5px; text-align: left; vertical-align: top; }
th { background: #e8f0f8; font-weight: bold; }
code { font-family: monospace; background: #f5f5f5; padding: 1px 3px; font-size: 8pt; }
blockquote { border-left: 3px solid #1a3a5c; margin: 6px 0; padding: 4px 10px; background: #f8f9fa; }
ul, ol { margin: 4px 0; padding-left: 20px; }
li { margin: 2px 0; }
hr { border: none; border-top: 1px solid #ccc; margin: 12px 0; }
strong { color: #1a3a5c; }
.cover { text-align: center; padding-top: 60px; }
.cover h1 { border: none; font-size: 18pt; }
.cover h2 { border: none; font-size: 12pt; font-weight: normal; }
.cover p { color: #666; margin-top: 30px; }
footer { text-align: center; margin-top: 30px; color: #999; font-size: 8pt; border-top: 1px solid #ccc; padding-top: 8px; }
"""

DOMAIN_MAP = {
    'memory': '2. MEMORY SYSTEMS',
    'personality': '3. PERSONALITY & IDENTITY',
    'emotion': '4. EMOTION MODELING',
    'relationship': '5. RELATIONSHIP DYNAMICS',
    'multi-agent': '6. MULTI-AGENT SYSTEMS',
    'context-prompt': '7. CONTEXT ENGINEERING',
    'role-playing': '8. ROLE-PLAYING',
    'world-simulation': '9. WORLD SIMULATION',
    'evaluation': '10. EVALUATION',
    'machine-learning': '11. MACHINE LEARNING',
    'reinforcement-learning': '12. REINFORCEMENT LEARNING',
    'continual-learning': '13. CONTINUAL LEARNING',
}

INFRA_FILES = [
    ('research/evidence-database.md', '14. EVIDENCE DATABASE'),
    ('research/quantitative-results.md', '15. QUANTITATIVE RESULTS'),
    ('research/research-gaps.md', '16. RESEARCH GAPS'),
    ('research/character-state.md', '17. CHARACTER STATE MODEL'),
    ('research/adaptation-vs-identity-drift.md', '18. ADAPTATION VS IDENTITY DRIFT'),
    ('synthesis/master-synthesis-vi.md', '19. MASTER SYNTHESIS'),
    ('synthesis/architecture-decision.md', '20. ARCHITECTURE DECISION'),
    ('manuscript/research-paper-vi.md', '21. SCIENTIFIC MANUSCRIPT'),
    ('manuscript/peer-review.md', '22. PEER REVIEW'),
    ('manuscript/final-revision.md', '23. FINAL REVISION'),
]


def md_to_html(content: str) -> str:
    lines = content.split('\n')
    parts = []
    in_table = False
    table_rows = []
    in_code = False
    code_lines = []

    for line in lines:
        s = line.strip()
        if s.startswith('```'):
            if not in_code:
                in_code = True
                code_lines = []
            else:
                in_code = False
                parts.append(f'<pre style="font-size:8pt;background:#f5f5f5;padding:4px;border-radius:3px;overflow-x:auto;">{chr(10).join(code_lines)}</pre>')
            continue
        if in_code:
            code_lines.append(s)
            continue
        if s.startswith('|'):
            if not in_table:
                in_table = True
                table_rows = []
            table_rows.append(s)
            continue
        else:
            if in_table and table_rows:
                parts.append('<table>')
                for i, row in enumerate(table_rows):
                    cells = [c.strip() for c in row.split('|')[1:-1]]
                    tag = 'th' if i == 0 else 'td'
                    parts.append('<tr>' + ''.join(f'<{tag}>{c}</{tag}>' for c in cells) + '</tr>')
                parts.append('</table>')
                in_table = False
                table_rows = []
        if not s:
            continue
        if s.startswith('# '):
            parts.append(f'<h1>{s[2:]}</h1>')
        elif s.startswith('## '):
            parts.append(f'<h2>{s[3:]}</h2>')
        elif s.startswith('### '):
            parts.append(f'<h3>{s[4:]}</h3>')
        elif '**' in s:
            s = s.replace('**', '<strong>')
            parts.append(f'<p>{s}</p>')
        elif s.startswith('>'):
            parts.append(f'<blockquote>{s[1:].strip()}</blockquote>')
        elif s.startswith('- ') or s.startswith('* '):
            parts.append(f'<li>{s[2:]}</li>')
        elif s.startswith('1. ') or s.startswith('2. ') or s.startswith('3. ') or s.startswith('4. ') or s.startswith('5. '):
            parts.append(f'<li>{s.split(". ", 1)[-1]}</li>')
        elif s in ('---', '***', '___'):
            parts.append('<hr>')
        else:
            parts.append(f'<p>{s}</p>')
    return '\n'.join(parts)


def make_html(title, content_html):
    return f'''<!DOCTYPE html>
<html lang="vi"><head><meta charset="UTF-8">
<title>{title}</title>
<style>{FONT_CSS}@page {{ size: A4; margin: 12mm; @bottom-center {{ content: counter(page); font-size: 8pt; color: #999; }} }}</style>
</head><body>{content_html}<footer>Aivora Lab Research Report 2026 | Page {{ print() }} of {{ page.count() }}</footer></body></html>'''


def generate_pdf(html_content, output_name):
    html_path = OUTPUT_DIR / output_name
    html_path.write_text(html_content, encoding='utf-8')
    pdf_path = OUTPUT_DIR / output_name.replace('.html', '.pdf')
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1000, 'height': 700})
        page.goto(f'file:///{html_path.as_posix().replace(chr(92), "/")}', wait_until='domcontentloaded', timeout=30000)
        page.wait_for_timeout(2000)
        page.pdf(path=str(pdf_path), format='A4', print_background=True)
        browser.close()
    size_kb = pdf_path.stat().st_size // 1024
    print(f"  {output_name}.pdf ({size_kb} KB)")
    return pdf_path


def main():
    print("Generating section PDFs...")

    # 1. Cover + TOC
    cover_html = md_to_html(f'''# AIVORA LAB RESEARCH REPORT 2026

## Xây Dựng AI Character Có Bản Sắc Bền Vững Trong Tương Tác Dài Hạn

**September 2026**

---

### Research Scope
- **12 Domains** | **60 Paper Files** | **~18,000 Lines**
- **79+ Papers Analyzed** | **65+ Evidence Entries**
- **47 Quantitative Results** | **58 Research Gaps**

---

### Table of Contents

1. **Tóm tắt Nghiên cứu** — Overview and key findings
2. **Memory Systems** — Vector, Graph, Hybrid architectures
3. **Personality & Identity** — Drift measurement, consistency
4. **Emotion Modeling** — Internal state vs LLM output
5. **Relationship Dynamics** — 6 dimensions, trust predictors
6. **Multi-Agent Systems** — Emergent behavior, scaling
7. **Context Engineering** — Compression, compilation
8. **Role-Playing** — Long-term consistency benchmarks
9. **World Simulation** — Persistent environments
10. **Evaluation** — Benchmarks, human studies
11. **Machine Learning** — Fine-tuning, LoRA, contrastive learning
12. **Reinforcement Learning** — RLHF, DPO, MemoRL
13. **Continual Learning** — Catastrophic forgetting, EWC
14. **Evidence Database** — 65+ entries across domains
15. **Quantitative Results** — 47 metrics
16. **Research Gaps** — 58 gaps (22 P0)
17. **Character State Model** — S_t framework
18. **Adaptation vs Drift** — ICS thresholds
19. **Master Synthesis** — Cross-domain patterns
20. **Architecture Decision** — Aivora Architecture
21. **Scientific Manuscript** — Full paper in Vietnamese
22. **Peer Review** — Major Revision findings
23. **Final Revision** — Response to review

---

*Compiled: September 3, 2026*
*Aivora Studio — Vietnam AI Research Laboratory*
''')
    generate_pdf(make_html("Cover", cover_html), "00_cover")

    # 2. Summary
    summary_html = md_to_html('''# TÓM TẮT NGHIÊN CỨU

**Câu hỏi cốt lõi:** Làm thế nào xây dựng AI Character có Identity, Personality, Memory, Internal State và Relationship ổn định trong tương tác dài hạn, nhưng vẫn có khả năng thích nghi, học hỏi và phát triển?

**Phương pháp:** Systematic literature review, 12 domains, 79+ papers (2020-2026), 65+ evidence entries.

**Kết quả chính:**

| Finding | Value | Status |
|---------|-------|--------|
| Best architecture (hybrid ICS) | 0.85 | Strong evidence |
| Personality drift (prompt-only) | -0.13%/turn | Critical finding |
| Memory hybrid accuracy | 91% F1 | Strong evidence |
| Emotion hybrid consistency | 82% | Strong evidence |
| Trust as relationship predictor | r=0.43-0.58 | Strong evidence |
| RLHF improvement over SFT | +38.8% | Strong evidence |
| DPO compute saving | 73% | Important finding |
| Naive FT forgetting (10 tasks) | -64pp | Critical finding |
| LoRA best tradeoff | 90% retention | Strong evidence |
| Research gaps | 58 total (22 P0) | Comprehensive |

**Architecture đề xuất:** Aivora Architecture — 7 modules hybrid framework.
''')
    generate_pdf(make_html("Summary", summary_html), "01_summary")

    # 3. Domain sections (grouped to avoid crashes)
    # Group 1: Core domains
    core_domains = ['memory', 'personality', 'emotion', 'relationship']
    for domain in core_domains:
        domain_path = PAPERS_DIR / domain
        if domain_path.exists():
            lit = domain_path / 'literature-review.md'
            comp = domain_path / 'comparison.md'
            gaps = domain_path / 'research-gaps.md'
            if lit.exists():
                content = f'# {DOMAIN_MAP[domain]}\n\n'
                content += md_to_html(lit.read_text(encoding='utf-8'))
                if comp.exists():
                    content += '\n\n---\n\n' + md_to_html(comp.read_text(encoding='utf-8'))
                if gaps.exists():
                    content += '\n\n---\n\n' + md_to_html(gaps.read_text(encoding='utf-8'))
                generate_pdf(make_html(DOMAIN_MAP[domain], content), f"02_{domain}")

    # Group 2: Advanced domains
    adv_domains = ['multi-agent', 'context-prompt', 'role-playing', 'world-simulation']
    for domain in adv_domains:
        domain_path = PAPERS_DIR / domain
        if domain_path.exists():
            lit = domain_path / 'literature-review.md'
            comp = domain_path / 'comparison.md'
            gaps = domain_path / 'research-gaps.md'
            if lit.exists():
                content = f'# {DOMAIN_MAP[domain]}\n\n'
                content += md_to_html(lit.read_text(encoding='utf-8'))
                if comp.exists():
                    content += '\n\n---\n\n' + md_to_html(comp.read_text(encoding='utf-8'))
                if gaps.exists():
                    content += '\n\n---\n\n' + md_to_html(gaps.read_text(encoding='utf-8'))
                generate_pdf(make_html(DOMAIN_MAP[domain], content), f"03_{domain}")

    # Group 3: ML domains
    ml_domains = ['evaluation', 'machine-learning', 'reinforcement-learning', 'continual-learning']
    for domain in ml_domains:
        domain_path = PAPERS_DIR / domain
        if domain_path.exists():
            lit = domain_path / 'literature-review.md'
            comp = domain_path / 'comparison.md'
            gaps = domain_path / 'research-gaps.md'
            if lit.exists():
                content = f'# {DOMAIN_MAP[domain]}\n\n'
                content += md_to_html(lit.read_text(encoding='utf-8'))
                if comp.exists():
                    content += '\n\n---\n\n' + md_to_html(comp.read_text(encoding='utf-8'))
                if gaps.exists():
                    content += '\n\n---\n\n' + md_to_html(gaps.read_text(encoding='utf-8'))
                generate_pdf(make_html(DOMAIN_MAP[domain], content), f"04_{domain}")

    # Group 4: Research infrastructure
    for rel_path, title in INFRA_FILES:
        full_path = LAB_DIR / rel_path
        if full_path.exists():
            content = md_to_html(full_path.read_text(encoding='utf-8'))
            safe_name = title.lower().replace(' ', '_').replace('/', '_').replace('.', '_')
            generate_pdf(make_html(title, content), f"05_{safe_name}")

    # 5. Final footer
    footer_html = md_to_html('''
---

## Research Completion Summary

| Metric | Value |
|--------|-------|
| Total domains researched | 12 |
| Total paper files | 60 |
| Total research lines | ~18,000 |
| Evidence entries | 65+ |
| Quantitative results | 47 (Q001-Q047) |
| Research gaps | 58 (22 P0, 16 P1, 10 P2, 10 ML) |
| Architecture recommendation | Aivora Architecture (Hybrid C) |
| Manuscript status | Complete, peer-reviewed |
| Next steps | Computational experiments, longitudinal study |

### Implementation Roadmap
- **Phase 1 (Months 1-2):** State Store + Vector Memory → ICS > 0.75
- **Phase 2 (Months 3-4):** Graph Memory + Relationship Engine → ICS > 0.80
- **Phase 3 (Months 5-6):** Personality Adapter + Context Compiler → ICS > 0.85
- **Phase 4 (Months 7-12):** RL experiments, Continual Learning, Multi-agent

---

*Aivora Lab Research Report 2026*
*All content in Vietnamese as required by yeucau.md*
''')
    generate_pdf(make_html("Summary", footer_html), "06_final_summary")

    print(f"\nAll PDFs generated in: {OUTPUT_DIR}")
    pdfs = list(OUTPUT_DIR.glob("*.pdf"))
    total_size = sum(p.stat().st_size for p in pdfs) / (1024*1024)
    print(f"Total: {len(pdfs)} PDFs, {total_size:.1f} MB")


if __name__ == '__main__':
    main()
