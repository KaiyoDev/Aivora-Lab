"""
Convert Aivora Lab research manuscripts to PDF using Playwright.
Generates a professional research report PDF from markdown sources.
"""
import os
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

LAB_DIR = Path(__file__).parent.parent
PAPERS_DIR = LAB_DIR / "papers"
RESEARCH_DIR = LAB_DIR / "research"
SYNTHESIS_DIR = LAB_DIR / "synthesis"
MANUSCRIPT_DIR = LAB_DIR / "manuscript"
OUTPUT_PDF = LAB_DIR / "Aivora_Lab_Research_Report_2026.pdf"

# Vietnamese-friendly fonts
FONT_CSS = """
@font-face {
  font-family: 'Inter';
  src: local('Arial');
}
body {
  font-family: 'Times New Roman', 'DejaVu Sans', serif;
  font-size: 11pt;
  line-height: 1.6;
  color: #1a1a1a;
  max-width: 210mm;
  margin: 0 auto;
  padding: 20mm;
}
h1 {
  font-size: 18pt;
  color: #1a3a5c;
  border-bottom: 2px solid #1a3a5c;
  padding-bottom: 8px;
  margin-top: 30px;
}
h2 {
  font-size: 14pt;
  color: #2c5f8a;
  border-bottom: 1px solid #ccc;
  padding-bottom: 4px;
  margin-top: 24px;
}
h3 {
  font-size: 12pt;
  color: #333;
  margin-top: 18px;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin: 12px 0;
  font-size: 9pt;
}
th, td {
  border: 1px solid #999;
  padding: 4px 8px;
  text-align: left;
}
th {
  background: #f0f4f8;
  font-weight: bold;
}
code {
  font-family: 'Consolas', 'Courier New', monospace;
  background: #f5f5f5;
  padding: 1px 4px;
  border-radius: 3px;
}
blockquote {
  border-left: 3px solid #1a3a5c;
  margin: 10px 0;
  padding: 8px 16px;
  background: #f8f9fa;
}
ul, ol {
  margin: 8px 0;
  padding-left: 24px;
}
li {
  margin: 4px 0;
}
hr {
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}
"""

def md_to_html(md_path: Path) -> str:
    """Convert markdown file to HTML with Vietnamese support."""
    content = md_path.read_text(encoding='utf-8')

    # Escape HTML
    content = content.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

    # Headers
    lines = content.split('\n')
    html_lines = []
    in_table = False
    table_rows = []

    for line in lines:
        stripped = line.strip()

        # Skip empty lines in table mode
        if not stripped and in_table:
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
                # Render table
                html_lines.append('<table>')
                for i, row in enumerate(table_rows):
                    cells = [c.strip() for c in row.split('|')[1:-1]]
                    tag = 'th' if i == 0 else 'td'
                    html_lines.append('<tr>' + ''.join(f'<{tag}>{c}</{tag}>' for c in cells) + '</tr>')
                html_lines.append('</table>')
                in_table = False
                table_rows = []

        # Headers
        if stripped.startswith('# '):
            html_lines.append(f'<h1>{stripped[2:]}</h1>')
        elif stripped.startswith('## '):
            html_lines.append(f'<h2>{stripped[3:]}</h2>')
        elif stripped.startswith('### '):
            html_lines.append(f'<h3>{stripped[4:]}</h3>')
        elif stripped.startswith('#### '):
            html_lines.append(f'<h4 style="font-size:11pt;color:#333;">{stripped[5:]}</h4>')
        # Bold
        elif '**' in stripped:
            stripped = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', stripped)
            html_lines.append(f'<p>{stripped}</p>')
        # Blockquote
        elif stripped.startswith('>'):
            html_lines.append(f'<blockquote>{stripped[1:].strip()}</blockquote>')
        # Unordered list
        elif stripped.startswith('- ') or stripped.startswith('* '):
            html_lines.append(f'<li>{stripped[2:]}</li>')
        # Ordered list
        elif re.match(r'^\d+\.\s', stripped):
            html_lines.append(f'<li>{re.sub(r"^\d+\.\s", "", stripped)}</li>')
        # Horizontal rule
        elif stripped in ('---', '***', '___'):
            html_lines.append('<hr>')
        # Code blocks
        elif stripped.startswith('```'):
            pass  # Skip code fences
        # Empty lines
        elif stripped:
            html_lines.append(f'<p>{stripped}</p>')

    return '\n'.join(html_lines)


def build_report_html() -> str:
    """Build the complete research report HTML."""
    sections = []

    # === COVER PAGE ===
    cover = """
    <div style="text-align:center; padding-top:100px;">
      <h1 style="border:none; font-size:22pt; color:#1a3a5c;">AIVORA LAB RESEARCH REPORT</h1>
      <h2 style="border:none; font-size:14pt; color:#333; font-weight:normal; margin-top:20px;">
        Xây Dựng AI Character Có Bản Sắc Bền Vững<br>Trong Tương Tác Dài Hạn
      </h2>
      <p style="margin-top:60px; color:#666;">September 2026</p>
      <p style="color:#999; font-size:9pt;">Aivora Studio — Vietnam AI Research Laboratory</p>
      <hr style="width:60%; margin:40px auto;">
      <p style="font-size:10pt; color:#555;">
        <strong>Research Scope:</strong> 9 Domains · 79 Papers · 65 Evidence Entries<br>
        <strong>Total Output:</strong> 72 Files · ~16,800 Lines
      </p>
    </div>
    <hr>
    """
    sections.append(cover)

    # === TABLE OF CONTENTS ===
    toc = """
    <h1>MỤC LỤC</h1>
    <ol>
      <li>Tóm tắt Nghiên cứu</li>
      <li>Domain 1: Memory Systems</li>
      <li>Domain 2: Personality & Identity</li>
      <li>Domain 3: Emotion Modeling</li>
      <li>Domain 4: Relationship Dynamics</li>
      <li>Domain 5: Multi-Agent Systems</li>
      <li>Domain 6: Context Engineering</li>
      <li>Domain 7: Role-Playing</li>
      <li>Domain 8: World Simulation</li>
      <li>Domain 9: Evaluation</li>
      <li>Domain 10: Machine Learning</li>
      <li>Domain 11: Reinforcement Learning</li>
      <li>Domain 12: Continual Learning</li>
      <li>Synthesis & Architecture Decision</li>
      <li>Research Gaps & Future Work</li>
      <li>Phụ lục: Evidence Database</li>
    </ol>
    <hr>
    """
    sections.append(toc)

    # === RESEARCH SUMMARY ===
    summary = """
    <h1>1. TÓM TẮT NGHIÊN CỨU</h1>
    <p><strong>Câu hỏi nghiên cứu cốt lõi:</strong> Làm thế nào xây dựng một AI Character có Identity, Personality, Memory, Internal State và Relationship ổn định trong tương tác dài hạn với con người, nhưng vẫn có khả năng thích nghi, học hỏi và phát triển theo thời gian mà không đánh mất bản sắc?</p>

    <p><strong>Phương pháp:</strong> Systematic literature review trên 9 research domains, tổng hợp 79 papers (2020-2026), trích xuất 65 evidence entries, 47 quantitative results.</p>

    <p><strong>Kết quả chính:</strong></p>
    <ul>
      <li><strong>Hybrid Architecture</strong> đạt Identity Consistency Score (ICS) cao nhất: 0.85</li>
      <li><strong>Personality drift</strong> đo được: prompt-only giảm từ 94% xuống 27% sau 500 turns</li>
      <li><strong>Memory hybrid</strong> (Vector + Graph + LLM rerank): 91% F1, generalization gap 34pp</li>
      <li><strong>Emotion hybrid</strong>: 82% consistency, 4.0/5 naturalness</li>
      <li><strong>Relationship 6 dimensions</strong>: Trust là predictor mạnh nhất (r=0.43-0.58)</li>
      <li><strong>50 research gaps</strong> được xác định: 14 P0 (Critical), 12 P1 (High), 8 P2 (Medium)</li>
    </ul>

    <p><strong>Kiến trúc đề xuất:</strong> Aivora Architecture — hybrid framework 7 modules (State Store, Memory Store, Relationship Engine, Emotion Controller, Personality Adapter, Context Compiler, Evaluation Monitor).</p>
    <hr>
    """
    sections.append(summary)

    # === DOMAIN CONTENT ===
    domain_map = {
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

    for domain_dir, section_title in domain_map.items():
        domain_path = PAPERS_DIR / domain_dir
        if not domain_path.exists():
            continue
        lit_file = domain_path / 'literature-review.md'
        if lit_file.exists():
            html = md_to_html(lit_file)
            sections.append(f'<h1>{section_title}</h1>\n{html}\n<hr>')

    # === RESEARCH INFRASTRUCTURE ===
    infra_files = [
        ('research/evidence-database.md', '14. EVIDENCE DATABASE'),
        ('research/quantitative-results.md', '15. QUANTITATIVE RESULTS'),
        ('research/research-gaps.md', '16. RESEARCH GAPS'),
        ('research/character-state.md', '17. CHARACTER STATE MODEL'),
        ('research/adaptation-vs-identity-drift.md', '18. ADAPTATION VS IDENTITY DRIFT'),
        ('synthesis/master-synthesis-vi.md', '19. MASTER SYNTHESIS'),
        ('synthesis/architecture-decision.md', '20. ARCHITECTURE DECISION'),
        ('manuscript/research-paper-vi.md', '21. SCIENTIFIC MANUSCRIPT'),
    ]

    for file_path, title in infra_files:
        full_path = LAB_DIR / file_path
        if full_path.exists():
            html = md_to_html(full_path)
            sections.append(f'<h1>{title}</h1>\n{html}\n<hr>')

    # === FOOTER ===
    footer = """
    <div style="text-align:center; margin-top:40px; color:#999; font-size:9pt;">
      <p>Aivora Lab Research Report 2026 · Compiled: September 3, 2026</p>
      <p>Repository: D:\\Kaiyo\\Project\\Aivora-studio\\aivora-lab</p>
    </div>
    """
    sections.append(footer)

    full_html = f"""
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
    """
    return full_html


def generate_pdf():
    """Generate PDF from HTML using Playwright."""
    print("Building research report HTML...")
    html_content = build_report_html()

    output_path = OUTPUT_PDF
    print(f"Output: {output_path}")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(
            viewport={'width': 1200, 'height': 800},
        )
        page.set_content(html_content, wait_until='networkidle')
        page.wait_for_timeout(2000)  # Allow rendering
        page.pdf(path=str(output_path), format='A4', print_background=True)
        browser.close()

    file_size = output_path.stat().st_size / (1024 * 1024)
    print(f"PDF generated: {output_path}")
    print(f"Size: {file_size:.1f} MB")
    return output_path


if __name__ == '__main__':
    generate_pdf()
