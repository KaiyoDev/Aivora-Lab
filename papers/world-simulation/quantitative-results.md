# Quantitative Results: Metrics cho World Simulation

> Tổng hợp các metrics định lượng được sử dụng trong research, bao gồm simulation fidelity, agent autonomy, computational cost, và các metric đánh giá quality.

---

## 1. Simulation Fidelity Metrics

### 1.1. Fact Preservation Rate

Đo tỷ lệ thông tin world state được giữ nguyên qua các turns.

**Công thức**: 
```
FactPreservation = |CorrectlyMaintainedStates| / |TotalStateChanged|
```

| Model | 50 turns | 100 turns | 200 turns | Source |
|-------|----------|-----------|-----------|--------|
| GPT-4o | 78% | 71% | 63% | Story Evolution (2026) |
| Claude 3.5 Sonnet | 81% | 74% | 66% | Story Evolution (2026) |
| o1-preview | 86% | 79% | 71% | Story Evolution (2026) |
| Llama 3 70B | 65% | 54% | 43% | CharacterBox (2025) |

**Nhận xét**: Fact preservation giảm ~0.5–1% per turn. o1-preview tốt nhất nhờ chain-of-thought reasoning.

---

### 1.2. Causal Consistency Score

Đo mức độ thỏa mãn các quan hệ cause-effect trong world.

**Methodology**: Human annotators đánh giá từng event pair (A gây B) có hợp lý không.

| Model | Causal Score (0–1) | Source |
|-------|-------------------|--------|
| GPT-4o | 0.64 | Story Evolution (2026) |
| Claude 3.5 Sonnet | 0.69 | Story Evolution (2026) |
| o1-preview | 0.76 | Story Evolution (2026) |

---

### 1.3. Character Consistency Index

Đo mức độ character giữ được personality traits qua thời gian.

**Methodology**: So sánh trait expression giữa turn đầu và turn cuối.

| Model | Turn 1–50 | Turn 1–100 | Turn 1–200 | Source |
|-------|-----------|------------|------------|--------|
| GPT-4o | 0.89 | 0.82 | 0.78 | CharacterBox (2025) |
| Claude 3 Opus | 0.87 | 0.81 | 0.74 | CharacterBox (2025) |
| Gemini 1.5 Pro | 0.83 | 0.76 | 0.68 | CharacterBox (2025) |
| Llama 3 70B | 0.72 | 0.61 | 0.52 | CharacterBox (2025) |

---

## 2. Agent Autonomy Metrics

### 2.1. Self-Directed Action Ratio

Tỷ lệ hành động do agent tự quyết định (không phải được prompt trực tiếp).

**Công thức**:
```
AutonomyRatio = |SelfInitiatedActions| / |TotalActions|
```

| System | Autonomy Ratio | Notes | Source |
|--------|---------------|-------|--------|
| Voyager | 0.94 | Agent tự explore liên tục | Wang et al. (2023) |
| AgentVerse | 0.76 | Cần coordination prompts | Chen et al. (2024) |
| GenSim | 0.82 | Tự tổ chức social roles | Tang et al. (2025) |
| CAREB-MAS | 0.88 | Emergent social behavior | Ji et al. (2026) |

---

### 2.2. Skill Acquisition Rate

Tốc độ học skill mới trong embodiment environments.

| System | Skills Acquired | Time (hours) | Rate (skill/hour) | Source |
|--------|----------------|--------------|-------------------|--------|
| Voyager | 56 | ~40 | 1.4 | Wang et al. (2023) |
| prior SOTA | 18 | ~40 | 0.45 | Wang et al. (2023) |

Voyager đạt **3.1×** faster skill acquisition so prior methods.

---

### 2.3. Lifelong Learning Transfer

Khả năng transfer learned skills sang environment mới.

| Model | Env 1 Accuracy | Env 2 Accuracy (transfer) | Drop | Source |
|-------|---------------|---------------------------|------|--------|
| Agent-World-14B | 89% | 82% | 7% | Dong et al. (2026) |
| Baseline (no transfer) | — | 64% | — | Dong et al. (2026) |
| GPT-4o fine-tuned | 85% | 71% | 14% | Zheng et al. (2025) |

---

## 3. Computational Cost Metrics

### 3.1. Token Consumption per Turn

| System | Agents | Tokens/turn | Cost/turn (USD) | Latency (sec) | Source |
|--------|--------|-------------|-----------------|---------------|--------|
| GenSim (small) | 100 | 1.5M | $0.03 | 2.3 | Tang et al. (2025) |
| GenSim (medium) | 1,000 | 15M | $0.30 | 18 | Tang et al. (2025) |
| GenSim (large) | 10,000 | 150M | $3.00 | 45 | Tang et al. (2025) |
| GenSim (xlarge) | 100,000 | 1.5B | $30.00 | 480 | Tang et al. (2025) |
| Voyager (single) | 1 | 50K | $0.001 | 3.2 | Wang et al. (2023) |
| AgentVerse | 10 | 500K | $0.10 | 12 | Chen et al. (2024) |

**Lưu ý**: Chi phí tính theo GPT-4o pricing (~$0.03/M input tokens). Model nhỏ hơn (Haiku, Sonnet) giảm 3–5× chi phí.

---

### 3.2. Memory (Context Window) Requirements

| System | Max Context | Peak Memory (GB) | Storage (GB) | Source |
|--------|-------------|------------------|--------------|--------|
| Voyager | 128K | 8 (server) | 2 (skills) | Wang et al. (2023) |
| GenSim (100K) | 32K/agent | 64 | 120 | Tang et al. (2025) |
| Agent-World | 200K | 32 | 45 | Dong et al. (2026) |
| CharacterBox eval | 128K | 16 | 8 | Wang et al. (2025) |

---

### 3.3. Time-to-Simulation-Start

| System | Warmup Time | First Output | Notes | Source |
|--------|-------------|--------------|-------|--------|
| GenSim | 5 min | 30 sec | Need agent initialization | Tang et al. (2025) |
| Voyager | 2 min | 5 sec | Single agent | Wang et al. (2023) |
| AgentVerse | 10 min | 45 sec | Role assignment overhead | Chen et al. (2024) |
| CAREB-MAS | 8 min | 60 sec | Theory parameter setup | Ji et al. (2026) |

---

## 4. Evaluation Benchmarks Summary

| Benchmark | Domains | Tasks | Agents | Metric Focus | Year |
|-----------|---------|-------|--------|--------------|------|
| AgentBench | 6 environments | 523 tasks | 1 | Task completion | 2023 |
| Voyager | Minecraft | Open-ended | 1 | Skills, discovery | 2023 |
| LifelongAgentBench | DB, OS, KG | 100+ tasks | 1 | Transfer, retention | 2025 |
| CharacterBox | Text world | Role-play | 12 models | Consistency | 2025 |
| Story Evolution | Narrative | Continuity | Multiple | Fact preservation | 2026 |
| Agent-World | 23 domains | Auto-generated | 8B/14B | Benchmark scores | 2026 |

---

## 5. Key Quantitative Findings

1. **Fact preservation drops ~0.7%/turn** — cần explicit state management, không chỉ context accumulation
2. **Skill transfer works at ~80–90% rate** — lifelong learning là khả thi
3. **Cost scales linearly với agent count** — 100K agents ≈ $30/turn cho GPT-4o tier
4. **Character consistency maintained at ~75% over 200 turns** với model top-tier
5. **Autonomy ratio cao (0.82–0.94)** — agents có thể tự hoạt động không cần human guidance
6. **Context window là bottleneck** — khi >32K tokens, performance giảm đáng kể

---

## 6. Recommendations cho Aivora Lab

| Mục tiêu | Metric target | Reference |
|----------|--------------|-----------|
| Character persistence | >80% consistency over 100 turns | CharacterBox baseline |
| World state accuracy | >75% fact preservation | Story Evolution target |
| Cost efficiency | <$0.10/turn cho 10 agents | GenSim optimization |
| Response latency | <5 sec/turn | Voyager standard |
| Scalability | 1K+ agents đồng thời | GenSim capacity |
