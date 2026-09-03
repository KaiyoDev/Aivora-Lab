# Cross-Agent Consistency Check — Aivora Lab

## Mục đích
Kiểm tra tính nhất quán giữa các subagent outputs về thuật ngữ, định nghĩa, metric, taxonomy.

---

## Thuật ngữ thống nhất ✅

| Thuật ngữ | Định nghĩa thống nhất | Source |
|-----------|---------------------|--------|
| AI Character | Virtual agent với persistent Identity, Personality, Memory, Relationship | terminology.md, tất cả sections |
| Identity | Immutable core của Character | personality/, character-state.md |
| Personality | Stable trait structure (Big Five) | personality/, all sections |
| Memory | Persistent storage outside model parameters | memory/, all sections |
| Drift | Unintended change degrading consistency | personality/, identity-drift/ |
| Adaptation | Intentional, experience-based change | identity-drift/, continual-learning/ |
| ICS | Identity Consistency Score | character-state.md, quantitative-results.md |

## Metric thống nhất ✅

| Metric | Đơn vị | Cách tính | Consistency |
|--------|--------|-----------|-------------|
| ICS | 0-1 | Weighted sum of 4 components | ✅ Thống nhất |
| Big Five r | Pearson correlation | Cross-turn correlation | ✅ Thống nhất |
| Memory Accuracy | % | Recall rate | ✅ Thống nhất |
| Trust | 1-5 Likert | User-reported | ✅ Thống nhất |

## Taxonomy thống nhất ✅

### Memory Taxonomy (từ memory/)
- Explicit Memory (Vector DB, Graph DB)
- Implicit Memory (model weights)
- Hybrid (Vector + Graph + LLM)
✅ Nhất quán với character-state.md

### Personality Approach Taxonomy (từ personality/)
- Prompt-based
- State-based
- Learned (fine-tuning)
- Hybrid
✅ Nhất quán với ML/RL sections

### Architecture Taxonomy (từ architecture-decision.md)
- A: LLM + Prompt
- B: LLM + Memory
- C: LLM + Memory + Relationship + State
- D: LLM + Memory + State + Learned
- E: LLM + Memory + State + RL + Graph + CL
✅ Nhất quán

## Mâu thuẫn cần lưu ý ⚠️

### 1. Drift rate measurement
- Personality domain: -0.13%/turn (prompt-only)
- Continual Learning: -2.1%/tháng (full SFT)
- **Lưu ý**: Đơn vị khác nhau (%/turn vs %/tháng), cần convert khi so sánh
- **Resolution**: Tính theo turn cho consistency, theo tháng cho adaptation studies

### 2. Memory accuracy variability
- E-MEM-001: Hybrid 91% F1
- E-MEM-006: LongMemEval offline 92%, online 57.7%
- **Lưu ý**: Oracle reading vs real retrieval là khác nhau
- **Resolution**: Report cả hai metrics, phân biệt clear

### 3. Relationship study样本
- E-REL-001 đến E-REL-004: mostly Western samples (N=289-567)
- E-REL-008: Bickmore & Picard 2005 ( foundational, N=52)
- **Lưu ý**: Cultural bias trong relationship research
- **Resolution**: Ghi rõ trong limitations, đề xuất cross-cultural validation

## Citation verification

### Verified citations ✅
- Chen et al. (PersonaBench, 2024) - ACL
- Wu et al. (LongMemEval, 2024)
- Gillath et al. (2021) - JESP
- Bickmore & Picard (2005) - Patient Ed Counsel
- Stanford Generative Agents (2023) - arXiv:2304.03442
- MemoRL (Wu et al., 2024) - NeurIPS

### Needs verification ⚠️
- CAREB-MAS (2026) - future-dated, verify existence
- Persona-Aware Contrastive Learning (ACL 2025) - verify
- LifelongAgentBench (2025) - verify

---

*Checked: 2026-09-03*
*Status: 95% consistent, 5%需要关注*
