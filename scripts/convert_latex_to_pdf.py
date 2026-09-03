"""
Convert LaTeX main.tex -> clean PDF using Playwright + MathJax rendering.
Each subagent writes its section to a .tex file, then we merge and compile.
Since no local LaTeX compiler exists, we use a two-step approach:
1. Subagents produce clean LaTeX chunks
2. A single orchestrator merges them and uses pandoc/online compiler
"""
import os
import re
import sys
import json
from pathlib import Path

LAB_DIR = Path(r"D:\Kaiyo\Project\Aivora-studio\aivora-lab")
TEX_FILE = LAB_DIR / "latex" / "main.tex"
PREAMBLE_FILE = LAB_DIR / "latex" / "preamble.tex"
OUTPUT_PDF = LAB_DIR / "Aivora_Lab_Research_Report_2026.pdf"
FIGURES_DIR = LAB_DIR / "latex" / "figures"

# Section line numbers from LaTeX
SECTIONS = [
    ("01_intro", 89, 126, "Giới thiệu"),
    ("02_definition", 127, 166, "Định nghĩa vấn đề"),
    ("03_rqs", 168, 204, "Câu hỏi nghiên cứu"),
    ("04_method", 206, 247, "Phương pháp"),
    ("05_litreview", 249, 310, "Tổng quan tài liệu"),
    ("06_state_model", 311, 370, "Mô hình trạng thái Character"),
    ("07_personality", 372, 437, "Nhân cách"),
    ("08_memory", 439, 473, "Bộ nhớ"),
    ("09_relationship", 475, 551, "Quan hệ"),
    ("10_emotion", 553, 615, "Cảm xúc"),
    ("11_worldsim", 617, 656, "Mô phỏng thế giới"),
    ("12_multiagent", 658, 701, "Đa agent"),
    ("13_context", 703, 736, "Kỹ thuật context"),
    ("14_ml", 738, 770, "Học máy và Học sâu"),
    ("15_rl", 772, 792, "Học tăng cường"),
    ("16_continual", 794, 828, "Học liên tục"),
    ("17_adaptation", 830, 869, "Thích nghi và Trệch định danh"),
    ("18_experiment", 871, 907, "Thực nghiệm tính toán"),
    ("19_stats", 909, 941, "Phân tích thống kê"),
    ("20_evaluation", 943, 994, "Đánh giá"),
    ("21_human", 996, 1027, "Nghiên cứu con người"),
    ("22_longitudinal", 1029, 1054, "Nghiên cứu dọc"),
    ("23_arch_compare", 1056, 1099, "So sánh kiến trúc"),
    ("24_architecture", 1101, 1171, "Kiến trúc Aivora"),
    ("25_gaps", 1173, 1233, "Khoảng trống nghiên cứu"),
    ("26_limits", 1235, 1257, "Giới hạn"),
    ("27_threats", 1259, 1287, "Mối đe dọa tính hợp lệ"),
    ("28_future", 1289, 1320, "Nghiên cứu tương lai"),
    ("29_conclusion", 1322, 1353, "Kết luận"),
    ("30_evidence_db", 1355, 1357, "Cơ sở dữ liệu bằng chứng"),
    ("31_quant_results", 1359, 1361, "Kết quả định lượng"),
    ("32_research_gaps", 1363, 1365, "Khoảng trống nghiên cứu"),
    ("33_experiment_detail", 1367, 1395, "Chi tiết thực nghiệm"),
    ("34_ics_rules", 1397, 1423, "Quy tắc tính ICS"),
    ("35_roadmap", 1425, 1448, "Lộ trình nghiên cứu"),
]

def extract_section(lines, start, end):
    """Extract lines from start (inclusive) to end (exclusive), 1-indexed."""
    return lines[start-1:end-1]

def main():
    print("Reading LaTeX source...")
    content = str(TEX_FILE.read_text(encoding="utf-8"))
    lines = content.split("\n")

    # Extract preamble (lines before \begin{document})
    preamble_end = None
    for i, l in enumerate(lines):
        if "\\begin{document}" in l:
            preamble_end = i
            break

    preamble = "\n".join(lines[:preamble_end+1])

    # Extract each section
    print("Extracting sections...")
    section_files = []
    for name, start, end, title in SECTIONS:
        sec_lines = extract_section(lines, start, end)
        sec_text = "\n".join(sec_lines)
        sec_path = LAB_DIR / "latex" / f"{name}.tex"
        sec_path.write_text(sec_text, encoding="utf-8")
        section_files.append((name, title, sec_path))
        print(f"  OK {name}: {len(sec_lines)} lines")

    # Write preamble
    PREAMBLE_FILE.write_text(preamble, encoding="utf-8")
    print(f"Preamble: {preamble_end+1} lines -> {PREAMBLE_FILE.name}")

    # Find all figure references
    imgs = re.findall(r"\\includegraphics[^{]*\{(.*?)\}", content)
    print(f"\nFigures referenced: {len(imgs)}")
    for i in imgs:
        print(f"  {i}")

    print(f"\nExtracted {len(section_files)} sections")

if __name__ == "__main__":
    main()
