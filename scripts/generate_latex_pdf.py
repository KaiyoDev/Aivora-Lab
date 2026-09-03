"""Convert LaTeX main.tex to PDF using Playwright HTML rendering."""
import os
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

LAB_DIR = Path(r"D:\Kaiyo\Project\Aivora-studio\aivora-lab")
TEX_FILE = LAB_DIR / "latex" / "main.tex"
OUTPUT_PDF = LAB_DIR / "Aivora_Lab_Research_Report_2026.pdf"
FIGURES_DIR = LAB_DIR / "latex" / "figures"

def tex_to_html(tex_path: str) -> str:
    """Convert LaTeX to HTML for PDF rendering."""
    with open(tex_path, encoding='utf-8') as f:
        content = f.read()

    # Remove comments
    lines = content.split('\n')
    clean_lines = []
    for line in lines:
        if line.strip().startswith('%'):
            continue
        # Remove inline comments
        if '%' in line:
            line = line[:line.index('%')]
        clean_lines.append(line)
    content = '\n'.join(clean_lines)

    # Extract content between \begin{document} and \end{document}
    match = re.search(r'\\begin\{document\}(.*?)\\end\{document\}', content, re.DOTALL)
    if not match:
        raise ValueError("No document environment found")
    body = match.group(1)

    html_parts = []

    # Title
    title_match = re.search(r'\\title\{(.*?)\}', body)
    author_match = re.search(r'\\author\{(.*?)\}', body)
    date_match = re.search(r'\\date\{(.*?)\}', body)

    if title_match:
        title_text = title_match.group(1).replace(r'\\', '<br>').replace('&', '&amp;')
        html_parts.append(f'<h1 style="text-align:center;color:#1a3a5c;font-size:18pt;margin-bottom:10px;">{title_text}</h1>')

    if author_match:
        html_parts.append(f'<p style="text-align:center;font-size:12pt;">{author_match.group(1)}</p>')

    if date_match:
        html_parts.append(f'<p style="text-align:center;font-size:10pt;color:#666;">{date_match.group(1)}</p>')

    html_parts.append('<hr>')

    # Process body
    i = 0
    while i < len(body):
        # Skip document markers
        if '\\begin{document}' in body[i:] or '\\end{document}' in body[i:]:
            i += 1
            continue

        # Abstract
        if body[i:].startswith('\\begin{abstract}'):
            end_idx = body.find('\\end{abstract}', i)
            abstract = body[i+17:end_idx]
            abstract = process_latex_content(abstract)
            html_parts.append(f'<div style="background:#f8f9fa;padding:15px;margin:15px 0;border-left:4px solid #1a3a5c;">')
            html_parts.append(f'<h2>Tóm tắt</h2>')
            html_parts.append(f'<p>{abstract}</p>')
            html_parts.append('</div>')
            i = end_idx + 18
            continue

        # Sections
        if body[i:].startswith('\\section{'):
            end_idx = body.find('}', i)
            title = body[i+9:end_idx]
            html_parts.append(f'<h1 style="color:#1a3a5c;border-bottom:2px solid #1a3a5c;padding-bottom:5px;margin-top:30px;">{process_latex_content(title)}</h1>')
            i = end_idx + 1
            continue

        # Subsections
        if body[i:].startswith('\\subsection{'):
            end_idx = body.find('}', i)
            title = body[i+12:end_idx]
            html_parts.append(f'<h2 style="color:#2c5f8a;border-bottom:1px solid #ccc;padding-bottom:3px;margin-top:20px;">{process_latex_content(title)}</h2>')
            i = end_idx + 1
            continue

        # Subsubsections
        if body[i:].startswith('\\subsubsection{'):
            end_idx = body.find('}', i)
            title = body[i+15:end_idx]
            html_parts.append(f'<h3 style="color:#333;margin-top:15px;">{process_latex_content(title)}</h3>')
            i = end_idx + 1
            continue

        # Figures
        if body[i:].startswith('\\begin{figure}'):
            end_idx = body.find('\\end{figure}', i)
            fig_content = body[i+15:end_idx]
            img_match = re.search(r'\\includegraphics.*?\{(.*?)\}', fig_content)
            cap_match = re.search(r'\\caption\{(.*?)\}', fig_content)
            if img_match:
                img_path = img_match.group(1)
                fig_title = cap_match.group(1) if cap_match else 'Figure'
                # Handle relative path
                if not os.path.isabs(img_path):
                    img_path = FIGURES_DIR / img_path
                if os.path.exists(img_path):
                    html_parts.append(f'<div style="text-align:center;margin:20px 0;"><img src="file:///{img_path.as_posix()}" style="max-width:100%;height:auto;" /><p style="font-size:9pt;color:#666;margin-top:5px;">{process_latex_content(fig_title)}</p></div>')
            i = end_idx + 14
            continue

        # Tables
        if body[i:].startswith('\\begin{table}'):
            end_idx = body.find('\\end{table}', i)
            table_content = body[i+13:end_idx]
            html_parts.append('<table style="border-collapse:collapse;width:100%;margin:10px 0;font-size:9pt;">')
            # Process table content
            rows = table_content.split('\\midrule')
            for row_idx, row in enumerate(rows):
                if '\\toprule' in row:
                    continue
                cells = row.split('&')
                html_parts.append('<tr>')
                for cell in cells:
                    if '\\\\$' in cell:
                        continue
                    cell_text = process_latex_content(cell.strip())
                    tag = 'th' if row_idx == 0 else 'td'
                    html_parts.append(f'<{tag} style="border:1px solid #999;padding:4px 8px;text-align:left;vertical-align:top;">{cell_text}</{tag}>')
                html_parts.append('</tr>')
            html_parts.append('</table>')
            i = end_idx + 13
            continue

        # Itemize
        if body[i:].startswith('\\begin{itemize}'):
            end_idx = body.find('\\end{itemize}', i)
            items = body[i+15:end_idx]
            html_parts.append('<ul style="margin:10px 0;padding-left:20px;">')
            for item in items.split('\\item'):
                item_text = process_latex_content(item.strip())
                if item_text:
                    html_parts.append(f'<li>{item_text}</li>')
            html_parts.append('</ul>')
            i = end_idx + 15
            continue

        # Enumerate
        if body[i:].startswith('\\begin{enumerate}'):
            end_idx = body.find('\\end{enumerate}', i)
            items = body[i+16:end_idx]
            html_parts.append('<ol style="margin:10px 0;padding-left:20px;">')
            for idx, item in enumerate(items.split('\\item'), 1):
                item_text = process_latex_content(item.strip())
                if item_text:
                    html_parts.append(f'<li>{item_text}</li>')
            html_parts.append('</ol>')
            i = end_idx + 16
            continue

        # Verbatim
        if body[i:].startswith('\\begin{verbatim}'):
            end_idx = body.find('\\end{verbatim}', i)
            code = body[i+17:end_idx]
            html_parts.append(f'<pre style="background:#f5f5f5;padding:10px;font-size:8pt;overflow-x:auto;border-radius:4px;">{code}</pre>')
            i = end_idx + 16
            continue

        # Equations
        if body[i:].startswith('\\begin{equation}'):
            end_idx = body.find('\\end{equation}', i)
            eq = body[i+17:end_idx]
            html_parts.append(f'<div style="text-align:center;margin:15px 0;font-style:italic;">{process_latex_content(eq)}</div>')
            i = end_idx + 16
            continue

        # Quotations
        if body[i:].startswith('\\begin{quote}'):
            end_idx = body.find('\\end{quote}', i)
            quote = body[i+13:end_idx]
            html_parts.append(f'<blockquote style="border-left:3px solid #1a3a5c;margin:10px 0;padding:10px 15px;background:#f8f9fa;font-style:italic;">{process_latex_content(quote)}</blockquote>')
            i = end_idx + 13
            continue

        # Inline math
        match = re.search(r'\$([^\$]+)\$', body[i:])
        if match:
            math_text = process_latex_content(match.group(1))
            html_parts.append(f'<span style="font-style:italic;">{math_text}</span>')
            i += match.end()
            continue

        # Regular text
        line = body[i]
        if line.strip():
            processed = process_latex_content(line)
            if processed.strip() and not processed.startswith('<'):
                html_parts.append(f'<p>{processed}</p>')
        i += 1

    # Bibliography
    html_parts.append('<hr><h1>Tài liệu tham khảo</h1>')
    html_parts.append('<ol style="font-size:9pt;">')
    bib_content = re.search(r'\\begin\{thebibliography\}(.*?)\\end\{thebibliography\}', body, re.DOTALL)
    if bib_content:
        refs = bib_content.group(1)
        for ref in re.findall(r'\\bibitem.*?\\end\{thebibliography\}', refs, re.DOTALL):
            text = process_latex_content(ref)
            if text.strip():
                html_parts.append(f'<li>{text}</li>')
    html_parts.append('</ol>')

    return '\n'.join(html_parts)


def process_latex_content(text: str) -> str:
    """Process LaTeX formatting in text."""
    # Bold
    text = re.sub(r'\\textbf\{(.*?)\}', r'<strong>\1</strong>', text)
    # Italic
    text = re.sub(r'\\textit\{(.*?)\}', r'<em>\1</em>', text)
    # Math symbols
    text = text.replace(r'\$', '$').replace(r'\%', '%')
    text = text.replace(r'\&', '&').replace(r'\\', '\\')
    text = text.replace(r'\rightarrow', '→').replace(r'\to', '→')
    text = text.replace(r'\leftarrow', '←').replace(r'\leftrightarrow', '↔')
    text = text.replace(r'\leq', '≤').replace(r'\geq', '≥')
    text = text.replace(r'\neq', '≠').replace(r'\approx', '≈')
    text = text.replace(r'\pm', '±').replace(r'\times', '×')
    text = text.replace(r'\infty', '∞').replace(r'\sum', 'Σ')
    text = text.replace(r'\int', '∫').replace(r'\partial', '∂')
    text = text.replace(r'\nabla', '∇').replace(r'\forall', '∀')
    text = text.replace(r'\exists', '∃').replace(r'\notin', '∉')
    text = text.replace(r'\subset', '⊂').replace(r'\supset', '⊃')
    text = text.replace(r'\cup', '∪').replace(r'\cap', '∩')
    text = text.replace(r'\land', '∧').replace(r'\lor', '∨')
    text = text.replace(r'\neg', '¬').replace(r'\Rightarrow', '⇒')
    text = text.replace(r'\Leftarrow', '⇐').replace(r'\Leftrightarrow', '⇔')
    # Greek letters
    text = text.replace(r'\alpha', 'α').replace(r'\beta', 'β')
    text = text.replace(r'\gamma', 'γ').replace(r'\delta', 'δ')
    text = text.replace(r'\epsilon', 'ε').replace(r'\theta', 'θ')
    text = text.replace(r'\lambda', 'λ').replace(r'\mu', 'μ')
    text = text.replace(r'\pi', 'π').replace(r'\sigma', 'σ')
    text = text.replace(r'\tau', 'τ').replace(r'\phi', 'φ')
    text = text.replace(r'\chi', 'χ').replace(r'\psi', 'ψ')
    text = text.replace(r'\omega', 'ω')
    text = text.replace(r'\kappa', 'κ')
    # Various
    text = text.replace(r'\hat', '^').replace(r'\bar', '-')
    text = text.replace(r'\ldots', '...').replace(r'\cdots', '...')
    text = text.replace(r'\ld', '').replace(r'\gg', '≫')
    # Superscripts and subscripts
    text = re.sub(r'\^(\{([^}]+)\}|([^ ]))', r'<sup>\2\3</sup>', text)
    text = re.sub(r'_\{([^}]+)\}', r'<sub>\1</sub>', text)
    # Hyphens and dashes
    text = text.replace(r'---', '—').replace(r'--', '–')
    # Clean up
    text = text.replace(r'\texttt', '').replace(r'\textbf', '')
    text = text.replace(r'{', '').replace(r'}', '')
    text = text.replace(r'\_', '_')
    return text


def main():
    print("Converting LaTeX to HTML...")
    html_content = tex_to_html(TEX_FILE)

    full_html = f'''<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Aivora Lab Research Report 2026</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body {{
            font-family: 'Inter', 'Times New Roman', serif;
            font-size: 10.5pt;
            line-height: 1.6;
            color: #1a1a1a;
            max-width: 210mm;
            margin: 0 auto;
            padding: 15mm;
        }}
        h1 {{
            font-size: 16pt;
            color: #1a3a5c;
            border-bottom: 2px solid #1a3a5c;
            padding-bottom: 6px;
            margin-top: 28px;
            page-break-before: always;
        }}
        h1:first-of-type {{ page-break-before: avoid; }}
        h2 {{
            font-size: 13pt;
            color: #2c5f8a;
            border-bottom: 1px solid #ccc;
            padding-bottom: 3px;
            margin-top: 20px;
        }}
        h3 {{
            font-size: 11pt;
            color: #333;
            margin-top: 14px;
        }}
        table {{
            border-collapse: collapse;
            width: 100%;
            margin: 10px 0;
            font-size: 8.5pt;
        }}
        th, td {{
            border: 1px solid #999;
            padding: 3px 6px;
            text-align: left;
            vertical-align: top;
        }}
        th {{
            background: #e8f0f8;
            font-weight: bold;
        }}
        pre {{
            font-size: 8pt;
            background: #f5f5f5;
            padding: 6px;
            border-radius: 4px;
            overflow-x: auto;
        }}
        ul, ol {{
            margin: 6px 0;
            padding-left: 22px;
        }}
        li {{
            margin: 3px 0;
        }}
        hr {{
            border: none;
            border-top: 1px solid #ccc;
            margin: 16px 0;
        }}
        blockquote {{
            border-left: 3px solid #1a3a5c;
            margin: 8px 0;
            padding: 6px 12px;
            background: #f8f9fa;
        }}
        @page {{
            size: A4;
            margin: 12mm;
            @bottom-center {{
                content: counter(page) " / " counter(pages);
                font-size: 9pt;
                color: #999;
            }}
        }}
        img {{
            max-width: 100%;
            height: auto;
        }}
    </style>
</head>
<body>
{html_content}
<footer style="text-align:center;margin-top:40px;color:#999;font-size:8pt;border-top:1px solid #ccc;padding-top:12px;">
    <p>Aivora Lab Research Report 2026 | September 2026</p>
</footer>
</body>
</html>'''

    print(f"HTML size: {len(html_content):,} chars")

    output_dir = OUTPUT_PDF.parent
    output_dir.mkdir(parents=True, exist_ok=True)

    print("Rendering PDF with Playwright...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1200, 'height': 800})
        page.set_content(full_html, wait_until='networkidle')
        page.wait_for_timeout(3000)
        page.pdf(path=str(OUTPUT_PDF), format='A4', print_background=True)
        browser.close()

    size_mb = OUTPUT_PDF.stat().st_size / (1024 * 1024)
    print(f"\nPDF generated: {OUTPUT_PDF}")
    print(f"Size: {size_mb:.1f} MB")


if __name__ == '__main__':
    main()
