# Aivora Lab

> **Xây Dựng AI Character Có Bản Sắc Bền Vững Trong Tương Tác Dài Hạn**  
> Nghiên cứu tổng hợp khoa học — Aivora Research Division

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Language: Vietnamese](https://img.shields.io/badge/Language-Vietnamese-blue.svg)](#)
[![LaTeX](https://img.shields.io/badge/LaTeX-preprint-orange.svg)](https://github.com/KaiyoDev/Aivora-Lab)

---

## Abstract

AI Character đang trở thành một lớp ứng dụng phổ biến (Character.AI, Replika, …), tuy nhiên vẫn chưa cóframework nghiên cứu hệ thống nào trả lời được câu hỏi cốt lõi:

> **Character thay đổi bao nhiêu vẫn được coi là cùng một Character?**

Bài báo này tổng hợp 79 paper từ 12 domain nghiên cứu (Context/Prompt, Emotion, Evaluation, Memory, Multi-Agent, Personality, Relationship, Role-Playing, World Simulation, Machine Learning, Reinforcement Learning, Continual Learning), trích xuất 65 evidence entries và 47 quantitative results, sau đó đề xuất **Aivora Architecture** — một hybrid framework 7 module kết hợp prompt-based baseline với state-based persistence và learned adaptation.

### Kết quả chính

| Phát hiện | Con số | Nguồn bằng chứng |
|---|---|---|
| **Personality drift** — prompt-only giảm từ 94% xuống 27% sau 500 turns | Drift = −67 pp | Persona-consistency benchmarks (2024–2025) |
| **Hybrid architecture** đạt ICS cao nhất | ICS = **0.85** | Cross-model synthesis |
| **Hybrid memory** (vector + graph + LLM-rerank) | F1 = **91%** | LongMemEval / LifeBench |
| **Emotion consistency** — hybrid internal state + LLM expression | Consistency = **82%**, Naturalness = 4.0/5 | Emotion modeling studies |
| **Trust** là predictor mạnh nhất của Relationship | β = **0.43–0.58** | Relationship dynamics papers |

---

## Research Questions (14 RQs)

| Cluster | RQ | Câu hỏi |
|---|---|---|
| **Character Modeling** | RQ1 | Làm thế nào mô hình hóa AI Character để duy trì danh tính xuyên suốt? |
| | RQ2 | Làm thế nào duy trì personality consistency qua nhiều tương tác? |
| | RQ3 | Memory system nên được thiết kế thế nào? |
| **Social Intelligence** | RQ4 | Cơ chế xây dựng relationship giữa Character và user? |
| | RQ5 | Emotion nên là output hay internal state? |
| | RQ6 | World simulation có cần thiết không? |
| | RQ7 | Multi-agent interaction tạo emergent behavior? |
| **Technical Foundation** | RQ8 | Context engineering cho character state? |
| | RQ9 | Model independence — consistency across LLMs? |
| **Evaluation & Long-term** | RQ10 | Development environment cho character harness? |
| | RQ11 | Evaluation methodology? |
| | RQ12 | Human user experience? |
| | RQ13 | Safety, privacy, user control? |
| | RQ14 | Long-term interaction challenges? |

---

## Aivora Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     Aivora Architecture                       │
├──────────┬──────────┬──────────┬──────────┬──────────┬───────┤
│ State    │ Memory   │ Relation-│ Emotion  │ Person-  │ Context│
│ Store    │ Store    │ ship Eng.│ Control. │ ality Ad.│ Comp.  │
│ (SS)     │ (MS)     │ (RE)     │ (EC)     │ (PA)     │ (CC)   │
├──────────┴──────────┴──────────┴──────────┴──────────┴───────┤
│              Evaluation Monitor (EM) — continuous feedback    │
└──────────────────────────────────────────────────────────────┘
```

### 7 Modules

| Module | Chức năng | Evidence backing |
|---|---|---|
| **State Store (SS)** | Lưu trạng thái hiện tại (personality, values, goals) | [EVIDENCE] Architecture comparison |
| **Memory Store (MS)** | Vector + graph + LLM rerank; recall 91% F1 | [EVIDENCE] LongMemEval 2024 |
| **Relationship Engine (RE)** | 6 dimensions: Trust, Affection, Familiarity, Respect, Conflict, Intimacy | [EVIDENCE] Relationship dynamics |
| **Emotion Controller (EC)** | Internal state + LLM-generated expression | [EVIDENCE] Emotion modeling |
| **Personality Adapter (PA)** | Big Five stable traits, adaptive adjustment | [EVIDENCE] Personality consistency |
| **Context Compiler (CC)** | Compile state → optimal prompt for LLM | [EVIDENCE] Context engineering |
| **Evaluation Monitor (EM)** | Tính ICS liên tục, cảnh báo drift | [PROPOSED] Aivora proposal |

### Đánh giá 5 kiến trúc

| Architecture | Components | ICS | Verdict |
|---|---|---|---|
| A | LLM + Prompt only | ~0.27 (500 turns) | ❌ Reject — drift quá lớn |
| B | LLM + Memory (vector) | ~0.65 | ⚠️ Use with conditions |
| **C** | **LLM + Memory + Relationship + State** | **~0.85** | **✅ Recommended baseline** |
| D | LLM + Memory + State + Learned | TBD | Phase 2 target |
| E | LLM + Memory + State + RL + Graph + CL | TBD | Long-term research |

---

## Figures

| Fig | Mô tả | Trạng thái |
|---|---|---|
| **Fig 1** | Personality Drift over Turns | ✅ Đã render |
| **Fig 2** | Memory Architecture Comparison (F1 scores) | ✅ Đã render |
| **Fig 3** | Relationship Dimension Radar | ✅ Đã render |
| **Fig 4** | ICS Score Distribution by Architecture | ✅ Đã render |
| **Fig 5** | Architecture Heatmap (criteria × architectures) | ✅ Đã render |
| **Fig 6** | Forgetting Curve (memory retention) | ✅ Đã render |
| **Fig 7** | Research Gaps Distribution | ✅ Đã render |

![Fig 1 — Personality Drift](figures/fig01-personality-drift.png)
*Fig 1. Personality drift giảm từ 94% (turn 10) xuống 27% (turn 500) với prompt-only approach.*

![Fig 2 — Memory Comparison](figures/fig02-memory-comparison.png)
*Fig 2. So sánh 4 kiến trúc memory — Hybrid (Vector+Graph+LLM-rerank) đạt F1 cao nhất (91%).*

![Fig 5 — Architecture Heatmap](figures/fig05-arch-heatmap.png)
*Fig 5. Heatmap đánh giá 5 kiến trúc theo 10 tiêu chí — Architecture C nổi bật.*

---

## Repository Structure

```
aivora-lab/
├── README.md                 — Tài liệu này
├── latex/                    — Source LaTeX bài báo chính
│   ├── main.tex              — Văn bản chính (~445 dòng)
│   ├── references.bib        — 70 BibTeX entries
│   ├── paper.sty             — Custom LaTeX style
│   ├── figures/              — 7 figure PNG + PDF
│   ├── sections/             — (empty, cho modular include)
│   └── coverage_report.md    — Coverage analysis
├── figures/                  — Figure PNG + PDF (7 cặp)
├── research/                 — Research notes & questions
│   ├── research-questions.md — 14 RQs
│   ├── terminology.md        — Global terminology table
│   ├── methodology.md        — Research methodology
│   ├── literature-review.md  — Paper analysis template
│   └── ...
├── evidence/                 — Evidence database
│   ├── raw-evidence.md       — Evidence thô
│   ├── normalized-evidence.md — Evidence chuẩn hóa
│   ├── quantitative-results.md — Kết quả định lượng
│   └── conflicting-evidence.md — Evidence mâu thuẫn
├── synthesis/                — Tổng hợp phân tích
│   ├── architecture-decision.md — So sánh 5 architectures
│   ├── cross-paper-analysis.md
│   └── ...
├── papers/                   — 12 topic papers (template cấu trúc)
│   ├── personality/
│   ├── memory/
│   ├── relationship/
│   ├── emotion/
│   └── ...
├── experiments/              — Không gian thí nghiệm (chưa chạy)
├── manuscript/               — Phiên bản manuscript
├── scripts/                  — Python build/render scripts
└── .gitignore
```

---

## Research Pipeline

```
Literature search (12 domains)
        ↓
Evidence extraction (65 entries)
        ↓
Normalization & conflict detection
        ↓
Cross-model synthesis
        ↓
Architecture comparison (5 alternatives)
        ↓
Hypothesis generation
        ↓
Experiment design (Phase 1–4 roadmap)
        ↓
Final paper → LaTeX submission
```

---

## Evaluation Metric — ICS

**Identity Consistency Score (ICS)** được định nghĩa:

$$\text{ICS} = 0.30 \cdot P_{consist} + 0.25 \cdot M_{recall} + 0.25 \cdot R_{stability} + 0.20 \cdot V_{consist}$$

| ICS Range | Level | Action |
|---|---|---|
| ≥ 0.90 | Xuất sắc | Tiếp tục vận hành |
| 0.75 – 0.89 | Tốt | Giám sát định kỳ |
| 0.60 – 0.74 | Cảnh báo | Kích hoạt adaptation |
| < 0.60 | Nghiêm trọng | Cảnh báo drift, can thiệp |

---

## References

- **Primary paper**: LaTeX source in `latex/main.tex`
- **Bibliography**: 70 entries in `latex/references.bib`
- **Coverage**: See `latex/coverage_report.md`

---

## License

MIT License — see [LICENSE](https://opensource.org/licenses/MIT)

---

*Aivora Lab · September 2026 · KaiyoDev*
