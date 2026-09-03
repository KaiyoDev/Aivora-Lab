"""
Render research_report.html → publication-quality amsart PDF.
Uses Crimson Text (Times-like serif) + proper margins matching \documentclass[10pt,leqno]{amsart}.
Preserves all 80 pages from the original HTML report.
"""
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

LAB_DIR = Path(r"D:\Kaiyo\Project\Aivora-studio\aivora-lab")
INPUT_HTML = LAB_DIR / "research_report.html"
OUTPUT_PDF = LAB_DIR / "Aivora_Lab_Research_Report_2026.pdf"
FIGURES_DIR = LAB_DIR / "latex" / "figures"


def load_and_enhance_html(path: Path) -> str:
    """Load existing HTML and enhance it with amsart styling."""
    html = path.read_text(encoding="utf-8")

    # Inject better CSS into <head>
    amsart_css = """
<style>
/* === AMSART 10pt specification === */
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Latin+Modern+Roman&display=swap');

@page {
  size: A4;
  margin: 25mm;
  @bottom-center {
    content: counter(page);
    font-family: 'Crimson Text', serif;
    font-size: 9pt;
    color: #333;
  }
}

* { box-sizing: border-box; }

body {
  font-family: 'Crimson Text', 'Times New Roman', serif;
  font-size: 10pt;
  line-height: 1.6;
  color: #1a1a1a;
  max-width: 112mm;
  margin: 0 auto;
  padding: 20mm 0;
  text-align: justify;
  hyphens: auto;
}

/* Title block */
.cover {
  text-align: center;
  padding-top: 60px;
  page-break-after: avoid;
}
.cover h1 {
  border: none;
  font-size: 16pt;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 12pt;
  color: #000;
}
.cover h2 {
  border: none;
  font-size: 11pt;
  font-weight: 400;
  color: #333;
  margin: 10pt 0;
}
.cover p {
  color: #555;
  margin-top: 20pt;
  font-size: 10pt;
}

/* TOC */
.toc ol {
  column-count: 2;
  column-gap: 16pt;
  font-size: 9.5pt;
  line-height: 1.5;
  padding-left: 14pt;
}
.toc li {
  break-inside: avoid;
}

/* Sections - each h1 gets page break */
h1 {
  font-size: 13pt;
  font-weight: 700;
  text-align: center;
  color: #000;
  border-bottom: none;
  padding-bottom: 0;
  margin-top: 20pt;
  page-break-before: always;
}
h1:first-of-type { page-break-before: avoid; margin-top: 0; }

h2 {
  font-size: 11pt;
  font-weight: 700;
  color: #000;
  border-bottom: none;
  padding-bottom: 0;
  margin-top: 14pt;
  page-break-after: avoid;
}

h3 {
  font-size: 10pt;
  font-weight: 700;
  color: #111;
  margin-top: 10pt;
  page-break-after: avoid;
}

h4 {
  font-size: 9.5pt;
  font-weight: 700;
  color: #222;
  margin-top: 8pt;
}

/* Paragraphs */
p {
  font-size: 10pt;
  line-height: 1.6;
  margin: 6pt 0;
  text-align: justify;
}

/* Lists */
ul, ol {
  font-size: 10pt;
  line-height: 1.55;
  margin: 6pt 0 6pt 18pt;
  padding-left: 8pt;
}
li {
  margin: 3pt 0;
  text-align: justify;
}

/* Tables - amsart style */
table {
  border-collapse: collapse;
  width: 100%;
  margin: 10pt 0;
  font-size: 8.5pt;
  line-height: 1.4;
}
th {
  font-weight: 700;
  border-top: 1.5pt solid #000;
  border-bottom: 1pt solid #000;
  padding: 3pt 5pt;
  vertical-align: bottom;
  text-align: left;
  background: none;
}
td {
  border-bottom: 0.5pt solid #aaa;
  padding: 2pt 5pt;
  vertical-align: top;
  text-align: left;
}
tbody tr:last-child td {
  border-bottom: 1.5pt solid #000;
}

/* Equations */
.math, .equation {
  text-align: center;
  font-style: italic;
  margin: 8pt 0;
  font-size: 10pt;
}

/* Figures */
figure, .latex-figure {
  text-align: center;
  margin: 14pt 0;
  page-break-inside: avoid;
}
figure img, .latex-figure img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
figure figcaption, .latex-figure figcaption {
  font-size: 8.5pt;
  line-height: 1.4;
  margin-top: 4pt;
  color: #333;
  text-align: center;
}

/* Blockquotes */
blockquote {
  font-style: italic;
  font-size: 10pt;
  line-height: 1.55;
  margin: 8pt 20pt;
  padding: 4pt 12pt;
  border-left: 2px solid #999;
  background: none;
  text-align: justify;
}

/* Code */
code {
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 8.5pt;
  background: #f5f5f5;
  padding: 1pt 3pt;
  border-radius: 2pt;
}

/* Strong/Emphasis */
strong { font-weight: 700; color: #000; }
em { font-style: italic; }

/* Horizontal rule */
hr {
  border: none;
  border-top: 0.5pt solid #ccc;
  margin: 16pt 0;
}

/* Stats box */
.stats-box {
  border: none;
  padding: 0;
  background: none;
  font-size: 9.5pt;
  line-height: 1.5;
}

/* Sub/sup */
sub, sup { font-size: 7.5pt; }

/* Page break helpers */
.page-break-before { page-break-before: always; }
.page-break-after { page-break-after: always; }
.no-break { page-break-inside: avoid; }
</style>
"""

    # Inject CSS before </head>
    if "</head>" in html:
        html = html.replace("</head>", amsart_css + "\n</head>")
    else:
        html = amsart_css + html

    return html


def main():
    print(f"Loading HTML: {INPUT_HTML}")
    html = load_and_enhance_html(INPUT_HTML)
    print(f"HTML size: {len(html):,} chars")

    print("Rendering PDF with Playwright (amsart style)...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1200, "height": 900})
        page.set_content(html, wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(4000)

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
