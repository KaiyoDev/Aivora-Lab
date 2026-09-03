# Research Gaps — Aivora Lab

## Hướng dẫn

File này phân loại tất cả research gaps được phát hiện từ domain research.

**Phân loại:**
- **KNOWN**: Gap đã được xác định rõ trong literature
- **PARTIALLY KNOWN**: Một phần đã nghiên cứu, còn khoảng trống
- **UNKNOWN**: Chưa được đề cập, hoàn toàn mới
- **RESEARCH GAP**: Khuôn khổ chung còn thiếu
- **EXPERIMENT NEEDED**: Cần experiment để giải quyết

---

## Domain-Specific Gaps

### 1. MEMORY

| Gap ID | Description | Classification | Priority | Evidence |
|--------|-------------|----------------|----------|----------|
| G-MEM-001 | Memory consolidation mechanism — chưa có model nào giải thích được cách memories được consolidate过時間 | RESEARCH GAP | P0 | papers/memory/research-gaps.md |
| G-MEM-002 | Forgetting curve modeling — chưa có longitudinal study về memory decay | EXPERIMENT NEEDED | P0 | papers/memory/research-gaps.md |
| G-MEM-003 | Conflict resolution — khi memories mâu thuẫn, hệ thống xử lý thế nào? | UNKNOWN | P1 | papers/memory/research-gaps.md |
| G-MEM-004 | Memory importance learning — làm sao system tự học được memory nào quan trọng? | EXPERIMENT NEEDED | P1 | papers/memory/research-gaps.md |
| G-MEM-005 | Learning system vs database — memory nên có learning capacity không? | RESEARCH GAP | P0 | papers/memory/research-gaps.md |

### 2. PERSONALITY

| Gap ID | Description | Classification | Priority | Evidence |
|--------|-------------|----------------|----------|----------|
| G-PER-001 | Personality drift measurement — chưa có standardized metric | RESEARCH GAP | P0 | papers/personality/research-gaps.md |
| G-PER-002 | Long-term stability mechanisms — chưa có framework cho weeks/months | EXPERIMENT NEEDED | P0 | papers/personality/research-gaps.md |
| G-PER-003 | Evolution vs drift distinction — chưa phân biệt được healthy growth vs degradation | UNKNOWN | P1 | papers/personality/research-gaps.md |
| G-PER-004 | Cross-session consistency — session boundary effects chưa understood | PARTIALLY KNOWN | P1 | papers/personality/research-gaps.md |
| G-PER-005 | Multi-persona interactions — persona interference chưa quantify | UNKNOWN | P2 | papers/personality/research-gaps.md |

### 3. EMOTION

| Gap ID | Description | Classification | Priority | Evidence |
|--------|-------------|----------------|----------|----------|
| G-EMO-001 | Emotion dynamics — accumulation, decay, threshold chưa được model | RESEARCH GAP | P0 | papers/emotion/research-gaps.md |
| G-EMO-002 | Long-term emotion tracking — persistent emotional state chưa có solution | EXPERIMENT NEEDED | P0 | papers/emotion/research-gaps.md |
| G-EMO-003 | Personality-emotion mapping — relationship giữa personality traits và emotion patterns | UNKNOWN | P1 | papers/emotion/research-gaps.md |
| G-EMO-004 | Multi-modal emotion fusion — text + voice + facial chưa được explore | PARTIALLY KNOWN | P2 | papers/emotion/research-gaps.md |
| G-EMO-005 | Ethics and safety — emotional manipulation risks chưa được study | UNKNOWN | P1 | papers/emotion/research-gaps.md |

### 4. RELATIONSHIP

| Gap ID | Description | Classification | Priority | Evidence |
|--------|-------------|----------------|----------|----------|
| G-REL-001 | Dynamic relationship modeling — R_t evolution chưa được formalize | RESEARCH GAP | P0 | papers/relationship/research-gaps.md |
| G-REL-002 | Cultural differences — 90%+ studies trên Western samples | EXPERIMENT NEEDED | P1 | papers/relationship/research-gaps.md |
| G-REL-003 | Conflict and respect dimensions — evidence weakest trong 6 dimensions | PARTIALLY KNOWN | P1 | papers/relationship/research-gaps.md |
| G-REL-004 | Multi-party relationships — dyadic focus, group dynamics unknown | UNKNOWN | P2 | papers/relationship/research-gaps.md |

### 5. MULTI-AGENT

| Gap ID | Description | Classification | Priority | Evidence |
|--------|-------------|----------------|----------|----------|
| G-MA-001 | Scaling beyond 100 agents — chưa có study nào scale lớn | EXPERIMENT NEEDED | P0 | papers/multi-agent/research-gaps.md |
| G-MA-002 | Emergence measurement — chưa có standardized metric | RESEARCH GAP | P0 | papers/multi-agent/research-gaps.md |
| G-MA-003 | Long-running simulations (>1 week) — chưa tồn tại | EXPERIMENT NEEDED | P1 | papers/multi-agent/research-gaps.md |
| G-MA-004 | Communication protocols — emergent language chưa được understand | UNKNOWN | P2 | papers/multi-agent/research-gaps.md |

### 6. CONTEXT/PROMPT

| Gap ID | Description | Classification | Priority | Evidence |
|--------|-------------|----------------|----------|----------|
| G-CTX-001 | Memory-to-Context translation — chưa có method chuẩn | RESEARCH GAP | P0 | papers/context-prompt/research-gaps.md |
| G-CTX-002 | Multi-component context integration — State+Memory+Relationship+World chưa được combine | UNKNOWN | P0 | papers/context-prompt/research-gaps.md |
| G-CTX-003 | Relationship-aware context selection — graph structure retrieval chưa được explore | PARTIALLY KNOWN | P1 | papers/context-prompt/research-gaps.md |
| G-CTX-004 | Character-specific benchmarks — chưa có benchmark riêng cho consistency evaluation | EXPERIMENT NEEDED | P1 | papers/context-prompt/research-gaps.md |

### 7. ROLE-PLAYING

| Gap ID | Description | Classification | Priority | Evidence |
|--------|-------------|----------------|----------|----------|
| G-RP-001 | Long-term consistency (>500 turns) — chưa có study nào | EXPERIMENT NEEDED | P0 | papers/role-playing/research-gaps.md |
| G-RP-002 | Continuous personality tracking — lack of longitudinal data | EXPERIMENT NEEDED | P0 | papers/role-playing/research-gaps.md |
| G-RP-003 | Evaluation standardization — different papers dùng different metrics | RESEARCH GAP | P1 | papers/role-playing/research-gaps.md |
| G-RP-004 | Fictional character memory — characters with fictional backstories | UNKNOWN | P2 | papers/role-playing/research-gaps.md |

### 8. WORLD-SIMULATION

| Gap ID | Description | Classification | Priority | Evidence |
|--------|-------------|----------------|----------|----------|
| G-WS-001 | Scalability vs fidelity tradeoff — chưa có balanced solution | RESEARCH GAP | P0 | papers/world-simulation/research-gaps.md |
| G-WS-002 | Persistent world evaluation — chưa có benchmark | EXPERIMENT NEEDED | P1 | papers/world-simulation/research-gaps.md |
| G-WS-003 | Time progression modeling — how time affects world state | UNKNOWN | P1 | papers/world-simulation/research-gaps.md |
| G-WS-004 | Event simulation — causal reasoning về events trong world | PARTIALLY KNOWN | P2 | papers/world-simulation/research-gaps.md |

### 9. EVALUATION

| Gap ID | Description | Classification | Priority | Evidence |
|--------|-------------|----------------|----------|----------|
| G-EVAL-001 | Longitudinal evaluation framework — Day 1/7/30/90/180+ chưa có | RESEARCH GAP | P0 | papers/evaluation/research-gaps.md |
| G-EVAL-002 | Cross-domain consistency — chưa có metric đánh giá consistency across domains | EXPERIMENT NEEDED | P0 | papers/evaluation/research-gaps.md |
| G-EVAL-003 | Human evaluation standards — inter-rater reliability chưa được establish | PARTIALLY KNOWN | P1 | papers/evaluation/research-gaps.md |
| G-EVAL-004 | Automated vs human correlation — chưa có study so sánh systematic | EXPERIMENT NEEDED | P1 | papers/evaluation/research-gaps.md |

---

## Priority Matrix

| Priority | Count | Domains Affected |
|----------|-------|------------------|
| P0 (Critical) | 14 | Memory, Personality, Emotion, Relationship, Multi-Agent, Context, Role-Playing, World, Evaluation |
| P1 (High) | 12 | Memory, Personality, Emotion, Relationship, Multi-Agent, Context, Role-Playing, World |
| P2 (Medium) | 8 | Personality, Emotion, Relationship, Multi-Agent, Context, Role-Playing, World |

---

## Research Agenda Recommendation

### Phase 1 (Months 1-2): Foundation
1. G-MEM-001: Memory consolidation model
2. G-PER-001: Personality drift metric
3. G-EMO-001: Emotion dynamics model
4. G-REL-001: Relationship dynamics formalization

### Phase 2 (Months 3-4): Integration
1. G-CTX-001: Memory-to-Context translation
2. G-CTX-002: Multi-component integration
3. G-EVAL-001: Longitudinal framework
4. G-RP-001: Long-term consistency study

### Phase 3 (Months 5-6): Advanced
1. G-MA-001: Large-scale multi-agent
2. G-WS-001: Scalability solutions
3. G-PER-003: Evolution vs drift
4. G-EMO-002: Long-term emotion tracking

---

### P0 Critical Gaps (Machine Learning)

| ID | Gap | Domain | Priority | Description |
|----|-----|--------|----------|-------------|
| G-ML-001 | Optimal fine-tuning strategy for characters | ML | P0 | Chưa có guideline rõ ràng về khi nào dùng SFT vs LoRA vs PEFT |
| G-ML-002 | Multi-persona fine-tuning at scale | ML | P0 | Fine-tuning cho 100+ personas với shared compute chưa được nghiên cứu |
| G-ML-003 | Compute-cost vs quality frontier | ML | P0 | Quantified tradeoff giữa training cost và quality gain chưa có |
| G-ML-004 | Data efficiency for rare personalities | ML | P1 | Character phức tạp (nghề nghiệp đặc thù) cần bao nhiêu data? |

### P0 Critical Gaps (Reinforcement Learning)

| ID | Gap | Domain | Priority | Description |
|----|-----|--------|----------|-------------|
| G-RL-001 | Reward function specification for characters | RL | P0 | Cách design reward function đa chiều cho character behavior |
| G-RL-002 | Safety-constrained RL for public-facing characters | RL | P0 | 23% reward hacking rate — cần solution real-time |
| G-RL-003 | Online vs offline RL tradeoff quantification | RL | P1 | Khi nào cần online RL vs offline replay sufficient? |
| G-RL-004 | Multi-objective reward optimization | RL | P1 | Consistency + warmth + helpfulness — simultaneous optimization |

### P0 Critical Gaps (Continual Learning)

| ID | Gap | Domain | Priority | Description |
|----|-----|--------|----------|-------------|
| G-CL-001 | Catastrophic forgetting prevention mechanism | CL | P0 | Naive FT: 62% retention → cần mechanism bảo vệ identity |
| G-CL-002 | Personality trait malleability differences | CL | P0 | Openness drift 3.5x nhanh hơn Agreeableness — differential adaptation |
| G-CL-003 | Optimal consolidation interval | CL | P0 | 12h optimal nhưng không có empirical justification mạnh |
| G-CL-004 | Cross-domain transfer for character systems | CL | P1 | Transfer boost +28% same-domain vs +12% cross-domain |

---

## Research Agenda Update (Expanded)

### Phase 1 (Months 1-2): Foundation
1. G-MEM-001: Memory consolidation model
2. G-PER-001: Personality drift metric
3. G-EMO-001: Emotion dynamics model
4. G-REL-001: Relationship dynamics formalization
5. **G-ML-001: Fine-tuning strategy guideline**
6. **G-CL-001: Catastrophic forgetting prevention**

### Phase 2 (Months 3-4): Integration
1. G-CTX-001: Memory-to-Context translation
2. G-CTX-002: Multi-component integration
3. G-EVAL-001: Longitudinal framework
4. G-RP-001: Long-term consistency study
5. **G-RL-001: Multi-dimensional reward specification**
6. **G-CL-003: Consolidation interval optimization**

### Phase 3 (Months 5-6): Advanced
1. G-MA-001: Large-scale multi-agent
2. G-WS-001: Scalability solutions
3. G-PER-003: Evolution vs drift
4. G-EMO-002: Long-term emotion tracking
5. **G-ML-002: Multi-persona fine-tuning at scale**
6. **G-RL-002: Safety-constrained RL production**

### Phase 4 (Months 7-12): Production
1. G-CL-004: Cross-domain transfer framework
2. G-ML-003: Compute-quality frontier mapping
3. G-RL-003: Online/offline RL decision tree
4. G-CL-002: Differential trait adaptation rates

---

*Last updated: 2026-09-03*
*Total gaps identified: 58 (14 P0, 16 P1, 10 P2, 18 new from ML/RL/CL)*
*P0 gaps: 22*
*Domains covered: 12*
