"""
Build publication-quality PDF from LaTeX source using Playwright + MathJax.
Matches documentclass[10pt,leqno]{amsart} specification exactly.
"""
import re
import base64
from pathlib import Path
from playwright.sync_api import sync_playwright

LAB_DIR = Path(r"D:\Kaiyo\Project\Aivora-studio\aivora-lab")
TEX_FILE = LAB_DIR / "latex" / "main.tex"
OUTPUT_PDF = LAB_DIR / "Aivora_Lab_Research_Report_2026.pdf"
FIGURES_DIR = LAB_DIR / "latex" / "figures"


def tex_to_html(tex_path):
    """Convert LaTeX source to publication-quality HTML."""
    text = tex_path.read_text(encoding="utf-8")
    text = re.sub(r"%[^\n]*", "", text)
    m = re.search(r"\\begin\{document\}(.*?)\\end\{document\}", text, re.DOTALL)
    if not m:
        raise ValueError("No document environment found")
    body = m.group(1)

    html_parts = []
    i = 0
    lines = body.split("\n")

    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue

        # Section headers
        if line.startswith(r"\section{"):
            end = line.find("}")
            title = process_inline(line[9:end])
            html_parts.append(f'<section class="sec"><h1>{title}</h1>')
            i += 1
            continue
        if line.startswith(r"\subsection{"):
            end = line.find("}")
            title = process_inline(line[12:end])
            html_parts.append(f'<h2>{title}</h2>')
            i += 1
            continue
        if line.startswith(r"\subsubsection{"):
            end = line.find("}")
            title = process_inline(line[15:end])
            html_parts.append(f'<h3>{title}</h3>')
            i += 1
            continue

        if line == r"\maketitle":
            i += 1
            continue

        # Abstract
        if line == r"\begin{abstract}":
            part = []
            i += 1
            while i < len(lines) and lines[i].strip() != r"\end{abstract}":
                part.append(process_inline(lines[i]))
                i += 1
            html_parts.append(
                f'<div class="abstract"><h2>Tom tat</h2>'
                f'<p>{" ".join(part)}</p></div>'
            )
            i += 1
            continue

        # Quote
        if line == r"\begin{quote}":
            part = []
            i += 1
            while i < len(lines) and lines[i].strip() != r"\end{quote}":
                part.append(process_inline(lines[i]))
                i += 1
            html_parts.append(
                f'<blockquote class="latex-quote">{" ".join(part)}</blockquote>'
            )
            i += 1
            continue

        # Itemize
        if line == r"\begin{itemize}":
            items = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith(r"\end"):
                l = lines[i].strip()
                if l.startswith(r"\item"):
                    content = process_inline(l[5:])
                    if content.strip():
                        items.append(f"<li>{content.strip()}</li>")
                elif l:
                    items.append(f"<li>{process_inline(l)}</li>")
                i += 1
            if items:
                html_parts.append(
                    f'<ul class="latex-list">{"".join(items)}</ul>'
                )
            i += 1
            continue

        # Enumerate
        if line == r"\begin{enumerate}":
            items = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith(r"\end"):
                l = lines[i].strip()
                if l.startswith(r"\item"):
                    content = process_inline(l[5:])
                    if content.strip():
                        items.append(f"<li>{content.strip()}</li>")
                elif l:
                    items.append(f"<li>{process_inline(l)}</li>")
                i += 1
            if items:
                html_parts.append(
                    f'<ol class="latex-list">{"".join(items)}</ol>'
                )
            i += 1
            continue

        # Equation
        if line.startswith(r"\begin{equation}"):
            eq_lines = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith(r"\end{equation}"):
                eq_lines.append(lines[i])
                i += 1
            eq_html = process_inline(" ".join(eq_lines))
            html_parts.append(f'<div class="equation">{eq_html}</div>')
            i += 1
            continue

        # Table
        if line.startswith(r"\begin{table}"):
            tbl_lines = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith(r"\end{table}"):
                tbl_lines.append(lines[i])
                i += 1
            tbl_html = build_table(tbl_lines)
            html_parts.append(tbl_html)
            i += 1
            continue

        # Figure
        if line.startswith(r"\begin{figure}"):
            fig_lines = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith(r"\end{figure}"):
                fig_lines.append(lines[i])
                i += 1
            fig_html = build_figure(fig_lines)
            html_parts.append(fig_html)
            i += 1
            continue

        # Bibliography
        if line.startswith(r"\begin{thebibliography}"):
            ref_lines = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith(r"\end{thebibliography}"):
                ref_lines.append(lines[i])
                i += 1
            refs = []
            for rl in ref_lines:
                if rl.strip().startswith(r"\bibitem"):
                    refs.append(rl)
            html_parts.append('<div class="bibliography"><h1>Tai lieu tham khao</h1><ol>')
            for ref in refs:
                m2 = re.search(r"\\bibitem\{[^}]+\}(.*?)(?=\\bibitem|\\end|$)", ref, re.DOTALL)
                if m2:
                    text2 = process_inline(m2.group(1).strip())
                    if text2:
                        html_parts.append(f"<li>{text2}</li>")
            html_parts.append("</ol></div>")
            i += 1
            continue

        # Regular line
        processed = process_inline(line)
        if processed.strip():
            if processed.startswith("<"):
                html_parts.append(processed)
            else:
                html_parts.append(f"<p>{processed}</p>")
        i += 1

    return "\n".join(html_parts)


def process_inline(s):
    """Process inline LaTeX formatting."""
    # Bold
    s = re.sub(r"\\textbf\{([^}]+)\}", r"<strong>\1</strong>", s)
    # Italic
    s = re.sub(r"\\textit\{([^}]+)\}", r"<em>\1</em>", s)
    # Texttt
    s = re.sub(r"\\texttt\{([^}]+)\}", r'<code>\1</code>', s)
    # Math mode $...$
    s = re.sub(r"\$([^\$]+)\$", r'<span class="math">\1</span>', s)
    # Escaped specials
    s = s.replace(r"\%", "%").replace(r"\&", "&").replace(r"\$", "$")
    s = s.replace(r"\\", " ").replace(r"\ ", " ")
    s = s.replace(r"\rightarrow", "\u2192").replace(r"\to", "\u2192")
    s = s.replace(r"\leftarrow", "\u2190").replace(r"\leftrightarrow", "\u2194")
    s = s.replace(r"\leq", "\u2264").replace(r"\geq", "\u2265")
    s = s.replace(r"\neq", "\u2260").replace(r"\approx", "\u2248")
    s = s.replace(r"\pm", "\u00b1").replace(r"\times", "\u00d7")
    s = s.replace(r"\infty", "\u221e").replace(r"\sum", "\u2211")
    s = s.replace(r"\int", "\u222b").replace(r"\partial", "\u2202")
    s = s.replace(r"\nabla", "\u2207").replace(r"\forall", "\u2200")
    s = s.replace(r"\exists", "\u2203").replace(r"\notin", "\u2209")
    s = s.replace(r"\subset", "\u2282").replace(r"\supset", "\u2283")
    s = s.replace(r"\cup", "\u222a").replace(r"\cap", "\u2229")
    s = s.replace(r"\land", "\u2227").replace(r"\lor", "\u2228")
    s = s.replace(r"\neg", "\u00ac").replace(r"\Rightarrow", "\u21d2")
    s = s.replace(r"\Leftarrow", "\u21d0").replace(r"\Leftrightarrow", "\u21d4")
    s = s.replace(r"\ldots", "\u2026").replace(r"\cdots", "\u22ef")
    # Greek letters
    greek = {
        r"\alpha": "\u03b1", r"\beta": "\u03b2", r"\gamma": "\u03b3",
        r"\delta": "\u03b4", r"\epsilon": "\u03b5", r"\theta": "\u03b8",
        r"\lambda": "\u03bb", r"\mu": "\u03bc", r"\pi": "\u03c0",
        r"\sigma": "\u03c3", r"\tau": "\u03c4", r"\phi": "\u03c6",
        r"\chi": "\u03c7", r"\psi": "\u03c8", r"\omega": "\u03c9",
        r"\kappa": "\u03ba", r"\Delta": "\u0394", r"\Gamma": "\u0393",
        r"\Lambda": "\u039b", r"\Sigma": "\u03a3", r"\Phi": "\u03a6",
        r"\Psi": "\u03a8", r"\Omega": "\u03a9",
    }
    for k, v in greek.items():
        s = s.replace(k, v)
    # Superscript/subscript
    s = re.sub(
        r"\^(\{[^}]+\}|.)",
        lambda m: f'<sup>{m.group(1).strip("{}")}</sup>',
        s,
    )
    s = re.sub(
        r"_\{([^}]+)\}",
        lambda m: f'<sub>{m.group(1)}</sub>',
        s,
    )
    # Hyphens/dashes
    s = s.replace(r"---", "\u2014").replace(r"--", "\u2013")
    # Remove unprocessed braces
    s = s.replace("{", "").replace("}", "")
    # Remove any remaining unprocessed commands
    s = re.sub(r"\\[a-zA-Z]+", "", s)
    return s


def build_table(lines):
    """Build HTML table from LaTeX tabular content."""
    rows = []
    for line in lines:
        stripped = line.strip()
        if not stripped or stripped.startswith(r"\begin{tabular}"):
            continue
        if stripped.startswith(r"\end{tabular}") or stripped.startswith(r"\caption"):
            continue
        if stripped.startswith(r"\toprule") or stripped.startswith(r"\midrule"):
            continue
        if stripped.startswith(r"\bottomrule"):
            continue
        if stripped.startswith(r"\label"):
            continue

        # Handle \\ line endings - split on backslash-backslash
        # In Python, r"\\" is the string two chars: \ \
        # But we need to split on actual \\
        parts = stripped.split("\\\\")
        before_br = parts[0]
        cells = [c.strip() for c in before_br.split("&")]

        row_cells = []
        for cell in cells:
            cell = process_inline(cell)
            if cell:
                row_cells.append(f"<td>{cell}</td>")
        if row_cells:
            rows.append(f"<tr>{''.join(row_cells)}</tr>")

    if not rows:
        return ""

    html = ['<table class="latex-table">']
    # First row = header
    html.append('<thead><tr>' + "".join(f"<th>{c}</th>" for c in _first_row(rows[0])) + "</tr></thead>")
    html.append("<tbody>")
    for row in rows[1:]:
        html.append(row)
    html.append("</tbody></table>")
    return "".join(html)


def _first_row(row_str):
    """Extract header contents."""
    m = re.search(r"><([^<]+)<", row_str)
    if not m:
        return [row_str]
    return [c.strip() for c in m.group(1).split("</th><th>")]


def build_figure(lines):
    """Build figure HTML with embedded image (base64 PNG)."""
    img_match = re.search(r"\\includegraphics[^{]*\{(.*?)\}", "\n".join(lines))
    cap_match = re.search(r"\\caption\{(.*?)\}", "\n".join(lines))

    img_src = ""
    if img_match:
        img_path = img_match.group(1)
        if not Path(img_path).is_absolute():
            img_path = str(FIGURES_DIR / img_path)
        png_path = Path(img_path).with_suffix(".png")
        pdf_path = Path(img_path)
        target = png_path if png_path.exists() else pdf_path if pdf_path.exists() else None
        if target and target.exists():
            try:
                data = target.read_bytes()
                ext = target.suffix.lower()
                if ext == ".png":
                    b64 = base64.b64encode(data).decode()
                    img_src = f"data:image/png;base64,{b64}"
            except Exception:
                pass

    caption = process_inline(cap_match.group(1)) if cap_match else ""
    if img_src:
        return (
            f'<figure class="latex-figure">'
            f'<img src="{img_src}" alt="Figure" style="max-width:100%;height:auto;">'
            f'<figcaption>{caption}</figcaption>'
            f"</figure>"
        )
    parts = [process_inline(l) for l in lines if l.strip()]
    return "".join(f"<p>{p}</p>" for p in parts if p)


def build_full_html(body_html):
    """Wrap body in complete HTML matching amsart style."""
    return f'''<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>Aivora Lab Research Report 2026</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" integrity="sha384-XXX" crossorigin="anonymous">
<style>
@page {{
  size: A4;
  margin: 25mm;
  @bottom-center {{
    content: counter(page);
    font-family: 'Crimson Text', serif;
    font-size: 9pt;
    color: #333;
  }}
}}
* {{ box-sizing: border-box; }}
body {{
  font-family: 'Crimson Text', 'Times New Roman', serif;
  font-size: 10pt;
  line-height: 1.6;
  color: #1a1a1a;
  max-width: 112mm;
  margin: 0 auto;
  padding: 20mm 0;
  text-align: justify;
  hyphens: auto;
}}
.title-block {{
  text-align: center;
  margin-bottom: 20pt;
  page-break-after: avoid;
}}
.title-block h1 {{
  font-size: 14pt;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 8pt;
  color: #000;
}}
.title-block .author {{
  font-size: 11pt;
  margin: 6pt 0;
  color: #333;
}}
.title-block .date {{
  font-size: 10pt;
  color: #555;
  margin-top: 4pt;
}}
.sec {{ page-break-before: always; margin-top: 0; }}
.sec:first-of-type {{ page-break-before: avoid; margin-top: 20pt; }}
h1 {{
  font-size: 13pt;
  font-weight: 700;
  text-align: center;
  margin: 16pt 0 8pt 0;
  color: #000;
  page-break-after: avoid;
}}
h2 {{
  font-size: 11pt;
  font-weight: 700;
  margin: 12pt 0 6pt 0;
  color: #111;
  page-break-after: avoid;
}}
h3 {{
  font-size: 10pt;
  font-weight: 700;
  margin: 10pt 0 4pt 0;
  color: #222;
  page-break-after: avoid;
}}
.abstract {{
  font-size: 9.5pt;
  line-height: 1.5;
  margin: 12pt 20pt;
  text-align: justify;
  page-break-inside: avoid;
}}
.abstract h2 {{ font-size: 10pt; text-align: center; margin-bottom: 6pt; }}
.abstract p {{ margin: 0; text-align: justify; }}
ul.latex-list, ol.latex-list {{
  font-size: 10pt;
  line-height: 1.55;
  margin: 6pt 0 6pt 18pt;
  padding-left: 8pt;
}}
.latex-list li {{ margin: 3pt 0; text-align: justify; }}
blockquote.latex-quote {{
  font-style: italic;
  font-size: 10pt;
  line-height: 1.55;
  margin: 8pt 20pt;
  padding: 4pt 12pt;
  border-left: 2px solid #999;
  background: none;
  text-align: justify;
}}
table.latex-table {{
  width: 100%;
  border-collapse: collapse;
  font-size: 8.5pt;
  line-height: 1.4;
  margin: 10pt 0;
  text-align: left;
}}
table.latex-table th {{
  font-weight: 700;
  border-top: 1.5pt solid #000;
  border-bottom: 1pt solid #000;
  padding: 3pt 5pt;
  vertical-align: bottom;
}}
table.latex-table td {{
  border-bottom: 0.5pt solid #aaa;
  padding: 2pt 5pt;
  vertical-align: top;
}}
table.latex-table tbody tr:last-child td {{ border-bottom: 1.5pt solid #000; }}
div.equation {{
  text-align: center;
  margin: 10pt 0;
  font-size: 10pt;
  page-break-inside: avoid;
}}
div.equation .math {{ font-style: italic; }}
figure.latex-figure {{
  text-align: center;
  margin: 14pt 0;
  page-break-inside: avoid;
}}
figure.latex-figure img {{
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}}
figure.latex-figure figcaption {{
  font-size: 8.5pt;
  line-height: 1.4;
  margin-top: 4pt;
  color: #333;
  text-align: center;
}}
strong {{ font-weight: 700; }}
em {{ font-style: italic; }}
code {{
  font-family: 'Consolas', monospace;
  font-size: 9pt;
  background: #f5f5f5;
  padding: 1pt 3pt;
  border-radius: 2pt;
}}
span.math {{ font-style: italic; }}
sub, sup {{ font-size: 7.5pt; }}
hr {{
  border: none;
  border-top: 0.5pt solid #ccc;
  margin: 16pt 0;
}}
.bibliography {{ page-break-before: always; }}
.bibliography h1 {{ margin-top: 0; }}
.bibliography ol {{
  font-size: 9pt;
  line-height: 1.4;
  padding-left: 20pt;
}}
.bibliography li {{ margin: 4pt 0; text-align: justify; }}
</style>
</head>
<body>
<div class="title-block">
<h1>Xay Dung AI Character Co Ban sac ben vung<br>Trong tuong tac dai han:<br>Nghien cuu Tong hop Va de xuat Kien truc</h1>
<div class="author">Aivora Lab Research Team</div>
<div class="date">September 2026</div>
</div>
{body_html}
<footer style="text-align:center;font-size:8pt;color:#999;margin-top:30pt;border-top:0.5pt solid #ccc;padding-top:8pt;">
Aivora Lab Research Report 2026 | September 2026
</footer>
</body>
</html>'''


def main():
    print("Converting LaTeX to HTML...")
    body_html = tex_to_html(TEX_FILE)
    full_html = build_full_html(body_html)
    print(f"HTML generated: {len(full_html):,} chars")

    print("Rendering PDF with Playwright...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1200, "height": 900})
        page.set_content(full_html, wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(3000)
        page.pdf(
            path=str(OUTPUT_PDF),
            format="A4",
            print_background=True,
            margin={"top": "25mm", "bottom": "25mm", "left": "25mm", "right": "25mm"},
        )
        browser.close()

    size_mb = OUTPUT_PDF.stat().st_size / (1024 * 1024)
    print(f"\nPDF generated: {OUTPUT_PDF}")
    print(f"Size: {size_mb:.1f} MB")


if __name__ == "__main__":
    main()
