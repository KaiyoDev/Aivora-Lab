"""
Generate final Aivora Lab Research Report PDF with all 12 domains.
"""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

LAB_DIR = Path(__file__).parent.parent
PAPERS_DIR = LAB_DIR / "papers"
RESEARCH_DIR = LAB_DIR / "research"
SYNTHESIS_DIR = LAB_DIR / "synthesis"
MANUSCRIPT_DIR = LAB_DIR / "manuscript"
OUTPUT_PDF = LAB_DIR / "Aivora_Lab_Research_Report_2026.pdf"

FONT_CSS = """
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
body {
  font-family: 'Inter', 'Times New Roman', serif;
  font-size: 10.5pt;
  line-height: 1.55;
  color: #1a1a1a;
  max-width: 210mm;
  margin: 0 auto;
  padding: 18mm;
}
h1 {
  font-size: 17pt;
  color: #1a3a5c;
  border-bottom: 2px solid #1a3a5c;
  padding-bottom: 6px;
  margin-top: 28px;
  page-break-before: always;
}
h1:first-of-type { page-break-before: avoid; }
h2 {
  font-size: 13pt;
  color: #2c5f8a;
  border-bottom: 1px solid #ccc;
  padding-bottom: 3px;
  margin-top: 20px;
}
h3 {
  font-size: 11pt;
  color: #333;
  margin-top: 14px;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin: 10px 0;
  font-size: 8.5pt;
}
th, td {
  border: 1px solid #999;
  padding: 3px 6px;
  text-align: left;
  vertical-align: top;
}
th {
  background: #e8f0f8;
  font-weight: bold;
}
code {
  font-family: 'Consolas', monospace;
  background: #f5f5f5;
  padding: 1px 3px;
  border-radius: 2px;
  font-size: 9pt;
}
blockquote {
  border-left: 3px solid #1a3a5c;
  margin: 8px 0;
  padding: 6px 12px;
  background: #f8f9fa;
}
ul, ol { margin: 6px 0; padding-left: 22px; }
li { margin: 3px 0; }
hr { border: none; border-top: 1px solid #ccc; margin: 16px 0; }
strong { color: #1a3a5c; }
.cover { text-align: center; padding-top: 80px; }
.cover h1 { border: none; font-size: 20pt; }
.cover h2 { border: none; font-size: 13pt; font-weight: normal; color: #333; margin-top: 16px; }
.cover p { color: #666; margin-top: 40px; }
.toc { page-break-after: always; }
.toc ol { column-count: 2; }
.stats-box {
  background: #f0f4f8;
  border: 1px solid #ccc;
  padding: 12px;
  margin: 16px 0;
  font-size: 9pt;
}
footer {
  text-align: center;
  margin-top: 40px;
  color: #999;
  font-size: 8pt;
  border-top: 1px solid #ccc;
  padding-top: 12px;
}
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


def md_to_html(content: str) -> str:
    lines = content.split('\n')
    html_parts = []
    in_table = False
    table_rows = []
    in_code = False
    code_lines = []

    for line in lines:
        stripped = line.strip()

        # Code blocks
        if stripped.startswith('```'):
            if not in_code:
                in_code = True
                code_lines = []
            else:
                in_code = False
                html_parts.append(f'<pre style="font-size:8pt;background:#f5f5f5;padding:6px;border-radius:4px;overflow-x:auto;">{chr(10).join(code_lines)}</pre>')
            continue
        if in_code:
            code_lines.append(stripped)
            continue

        # Table detection
        if stripped.startswith('|'):
            if not in_table:
                in_table = True
                table_rows = []
            table_rows.append(stripped)
            continue
        else:
            if in_table and table_rows:
                html_parts.append('<table>')
                for i, row in enumerate(table_rows):
                    cells = [c.strip() for c in row.split('|')[1:-1]]
                    tag = 'th' if i == 0 else 'td'
                    html_parts.append('<tr>' + ''.join(f'<{tag}>{c}</{tag}>' for c in cells) + '</tr>')
                html_parts.append('</table>')
                in_table = False
                table_rows = []

        if not stripped:
            continue

        # Headers
        if stripped.startswith('# '):
            html_parts.append(f'<h1>{stripped[2:]}</h1>')
        elif stripped.startswith('## '):
            html_parts.append(f'<h2>{stripped[3:]}</h2>')
        elif stripped.startswith('### '):
            html_parts.append(f'<h3>{stripped[4:]}</h3>')
        elif stripped.startswith('#### '):
            html_parts.append(f'<h4 style="font-size:10pt;color:#333;">{stripped[5:]}</h4>')
        # Bold
        elif '**' in stripped:
            stripped = stripped.replace('**', '<strong>')
            html_parts.append(f'<p>{stripped}</p>')
        # Blockquote
        elif stripped.startswith('>'):
            html_parts.append(f'<blockquote>{stripped[1:].strip()}</blockquote>')
        # List items
        elif stripped.startswith('- ') or stripped.startswith('* '):
            html_parts.append(f'<li>{stripped[2:]}</li>')
        elif stripped.startswith('1. ') or stripped.startswith('2. ') or stripped.startswith('3. '):
            html_parts.append(f'<li>{stripped.split(". ", 1)[-1]}</li>')
        # Horizontal rule
        elif stripped in ('---', '***', '___'):
            html_parts.append('<hr>')
        # Empty bullet
        elif stripped == '-':
            continue
        else:
            html_parts.append(f'<p>{stripped}</p>')

    return '\n'.join(html_parts)


def build_report_html():
    sections = []

    # Cover page
    sections.append(f'''
    <div class="cover">
      <h1>AIVORA LAB RESEARCH REPORT</h1>
      <h2>Xây Dựng AI Character Có Bản Sắc Bền Vững<br>Trong Tương Tác Dài Hạn</h2>
      <p>September 2026</p>
      <p style="color:#999;font-size:9pt;">Aivora Studio — Vietnam AI Research Laboratory</p>
      <hr style="width:50%;margin:30px auto;">
      <div class="stats-box" style="max-width:500px;margin:20px auto;text-align:left;">
        <strong>Research Scope:</strong><br>
        12 Domains | 60 Paper Files | ~18,000 Lines<br>
        79+ Papers Analyzed | 65+ Evidence Entries<br>
        47 Quantitative Results | 58 Research Gaps
      </div>
    </div>
    <hr>
    ''')

    # TOC
    toc_items = [
        ('1.', 'Tóm tắt Nghiên cứu'),
        ('2.', 'Memory Systems'),
        ('3.', 'Personality & Identity'),
        ('4.', 'Emotion Modeling'),
        ('5.', 'Relationship Dynamics'),
        ('6.', 'Multi-Agent Systems'),
        ('7.', 'Context Engineering'),
        ('8.', 'Role-Playing'),
        ('9.', 'World Simulation'),
        ('10.', 'Evaluation'),
        ('11.', 'Machine Learning'),
        ('12.', 'Reinforcement Learning'),
        ('13.', 'Continual Learning'),
        ('14.', 'Evidence Database'),
        ('15.', 'Quantitative Results'),
        ('16.', 'Research Gaps'),
        ('17.', 'Character State Model'),
        ('18.', 'Adaptation vs Identity Drift'),
        ('19.', 'Master Synthesis'),
        ('20.', 'Architecture Decision'),
        ('21.', 'Scientific Manuscript'),
    ]
    toc_html = '<h1>MỤC LỤC</h1><ol>' + ''.join(f'<li>{t}</li>' for _, t in toc_items) + '</ol><hr>'
    sections.append(toc_html)

    # Research summary
    sections.append('''
    <h1>1. TÓM TẮT NGHIÊN CỨU</h1>
    <p><strong>Câu hỏi nghiên cứu cốt lõi:</strong> Làm thế nào xây dựng một AI Character có Identity, Personality, Memory, Internal State và Relationship ổn định trong tương tác dài hạn với con người, nhưng vẫn có khả năng thích nghi, học hỏi và phát triển theo thời gian mà không đánh mất bản sắc?</p>
    <p><strong>Phương pháp:</strong> Systematic literature review trên 12 research domains, tổng hợp 79+ papers (2020-2026), trích xuất 65+ evidence entries, 47 quantitative results.</p>
    <p><strong>Kết quả chính:</strong></p>
    <ul>
      <li><strong>Hybrid Architecture</strong> đạt Identity Consistency Score (ICS) cao nhất: 0.85</li>
      <li><strong>Personality drift</strong> đo được: prompt-only giảm từ 94% xuống 27% sau 500 turns</li>
      <li><strong>Memory hybrid</strong> (Vector + Graph + LLM rerank): 91% F1, generalization gap 34pp</li>
      <li><strong>Emotion hybrid</strong>: 82% consistency, 4.0/5 naturalness</li>
      <li><strong>Relationship 6 dimensions</strong>: Trust là predictor mạnh nhất (r=0.43-0.58)</li>
      <li><strong>RLHF improvement</strong>: +38.8% instruction following, DPO tiết kiệm 73% compute</li>
      <li><strong>Continual learning</strong>: Naive FT forgetting -64pp sau 10 tasks; LoRA retention 90%</li>
      <li><strong>58 research gaps</strong>: 22 P0 (Critical), 16 P1 (High), 10 P2 (Medium), 10 ML-specific</li>
    </ul>
    <p><strong>Kiến trúc đề xuất:</strong> Aivora Architecture — hybrid framework 7 modules.</p>
    <hr>
    ''')

    # Domain sections
    for domain_dir, section_title in DOMAIN_MAP.items():
        domain_path = PAPERS_DIR / domain_dir
        if not domain_path.exists():
            continue
        lit_file = domain_path / 'literature-review.md'
        if lit_file.exists():
            html = md_to_html(lit_file.read_text(encoding='utf-8'))
            sections.append(f'<h1>{section_title}</h1>\n{html}\n<hr>')

    # Research infrastructure
    infra_files = [
        ('research/evidence-database.md', '14. EVIDENCE DATABASE'),
        ('research/quantitative-results.md', '15. QUANTITATIVE RESULTS'),
        ('research/research-gaps.md', '16. RESEARCH GAPS'),
        ('research/character-state.md', '17. CHARACTER STATE MODEL'),
        ('research/adaptation-vs-identity-drift.md', '18. ADAPTATION VS IDENTITY DRIFT'),
        ('synthesis/master-synthesis-vi.md', '19. MASTER SYNTHESIS'),
        ('synthesis/architecture-decision.md', '20. ARCHITECTURE DECISION'),
        ('manuscript/research-paper-vi.md', '21. SCIENTIFIC MANUSCRIPT'),
        ('manuscript/peer-review.md', '22. PEER REVIEW'),
        ('manuscript/final-revision.md', '23. FINAL REVISION NOTES'),
    ]

    for file_path, title in infra_files:
        full_path = LAB_DIR / file_path
        if full_path.exists():
            html = md_to_html(full_path.read_text(encoding='utf-8'))
            sections.append(f'<h1>{title}</h1>\n{html}\n<hr>')

    # Footer
    sections.append('''
    <footer>
      <p>Aivora Lab Research Report 2026 &copy; Aivora Studio</p>
      <p>Compiled: September 3, 2026 | Repository: aivora-lab</p>
      <p>12 Domains | 60 Files | 47 Quantitative Results | 58 Research Gaps</p>
    </footer>
    ''')

    return f'''
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <title>Aivora Lab Research Report 2026</title>
      <style>
        {FONT_CSS}
        @page {{
          size: A4;
          margin: 15mm;
          @bottom-center {{
            content: counter(page) " / " counter(pages);
            font-size: 9pt;
            color: #999;
          }}
        }}
      </style>
    </head>
    <body>
      {''.join(sections)}
    </body>
    </html>
    '''


def generate_pdf():
    print("Building final research report...")
    html_content = build_report_html()

    output_path = OUTPUT_PDF
    print(f"Output: {output_path}")
    print(f"HTML size: {len(html_content):,} chars")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1200, 'height': 800})
        page.set_content(html_content, wait_until='networkidle')
        page.wait_for_timeout(3000)
        page.pdf(path=str(output_path), format='A4', print_background=True)
        browser.close()

    size_mb = output_path.stat().st_size / (1024 * 1024)
    print(f"PDF generated: {output_path}")
    print(f"Size: {size_mb:.1f} MB")
    return output_path


if __name__ == '__main__':
    generate_pdf()
