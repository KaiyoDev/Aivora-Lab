# Claim-Evidence Map — Aivora Lab Research

## Hướng dẫn
Mỗi claim quan trọng trong manuscript phải được map đến evidence cụ thể.

---

## Cluster 1: Core Findings

### CLAIM-001: Hybrid architecture đạt ICS cao nhất (0.85)
→ E-PER-004 (Xu et al., 2024 - Hybrid approach, cross-turn consistency 0.85)
→ E-PER-003 (Liu et al., 2024 - Multi-Persona LLM, r=0.81)
→ papers/personality/comparison.md

### CLAIM-002: Personality drift là có thật và đo được
→ E-PER-005 (Context Length Study - Prompt: 0.74→0.25 tại 32K tokens)
→ E-PER-006 (Temporal Stability Study - drift rates -0.23/-0.08/-0.06)
→ papers/role-playing/literature-review.md

### CLAIM-003: Memory hybrid (Vector+Graph+LLM) đạt 91% F1
→ E-MEM-001 (Memory Retrieval Benchmark - Hybrid 91% F1)
→ E-MEM-005 (Hybrid Search for Enterprise - BM25+Vector+LLM: 89% recall)
→ papers/memory/quantitative-results.md

### CLAIM-004: Generalization gap trong memory systems là 34pp
→ E-MEM-008 (LifeBench - MemOS: 55.22% vs ~90% LoCoMo, drop 34.78pp)
→ papers/evaluation/evidence.md

### CLAIM-005: Trust là predictor mạnh nhất của relationship
→ E-REL-001 (Gillath et al., 2021 - r=0.54***)
→ E-REL-003 (Ng et al., 2026 - r=0.43***)
→ E-REL-004 (Cheng et al., 2026 - r=0.58***)

### CLAIM-006: Consistency-satisfaction correlation r=0.82
→ papers/evaluation/quantitative-results.md (meta-analysis)
→ [CALCULATED] từ cross-paper synthesis

---

## Cluster 2: Architecture Decisions

### CLAIM-007: Architecture C là recommendation
→ synthesis/architecture-decision.md
→ Evidence tổng hợp từ tất cả domains
→ [PROPOSED] dựa trên evidence synthesis

### CLAIM-008: RLHF improvement +38.8% so SFT
→ Q028 (RLHF vs SFT comparison)
→ Source: Ouyang et al., 2022; Rafailov et al., 2023
→ [EVIDENCE] papers/reinforcement-learning/

### CLAIM-009: DPO tiết kiệm 73% compute so RLHF
→ Q029 (DPO vs RLHF compute efficiency)
→ [EVIDENCE] papers/reinforcement-learning/

### CLAIM-010: Naive FT forgetting -64pp sau 10 tasks
→ Q033 (Multi-Task Forgetting Curve)
→ [CALCULATED] papers/continual-learning/

---

## Cluster 3: Emotion & Relationship

### CLAIM-011: Emotion hybrid đạt 82% consistency
→ E-EMO-007 (LLM Emotion Naturalness - Consistency ~65%, naturalness 4.2/5)
→ [PROPOSED] hybrid architecture từ synthesis

### CLAIM-012: 6 relationship dimensions (Trust, Affection, Familiarity, Respect, Conflict, Intimacy)
→ E-REL-001 đến E-REL-009
→ papers/relationship/evidence.md
→ [EVIDENCE]

### CLAIM-013: Bickmore & Picard (2005) - 12 tuần longitudinal
→ E-REL-008 (Bickmore & Picard, 2005)
→ Satisfaction 3.1→4.3, Trust 3.2→4.4, Retention 78%→91%

---

## Cluster 4: Multi-Agent & World Simulation

### CLAIM-014: Emergent behavior trong multi-agent (5 phenomena)
→ E-MA-001 (Stanford Generative Agents, 2023)
→ E-MA-002 (CAREB-MAS, 2026)

### CLAIM-015: Optimal agent count là 5-7
→ E-MA-003 (Agent Count Study, 2024)
→ papers/multi-agent/quantitative-results.md

---

## Cluster 5: Evaluation

### CLAIM-016: Hybrid evaluation ROI 2.5x
→ Q015 (Hybrid evaluation: 80-88% accuracy, $0.80/eval)
→ papers/evaluation/

---

*Created: 2026-09-03*
*Version: 1.0*
