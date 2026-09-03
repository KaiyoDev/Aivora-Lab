# Architecture Decision — Aivora Lab

## So sánh 5 Kiến trúc

---

## Architecture A: LLM + Prompt

### Mô tả
- Chỉ dùng system prompt để encode personality, memory, relationship
- Mọi thông tin nằm trong context window

### Đánh giá
| Criterion | Score | Notes |
|-----------|-------|-------|
| Evidence | ⭐⭐ | Prompt engineering literature |
| Consistency | ⭐⭐ | Drift 94%→27% over 500 turns |
| Memory | ⭐ | Context limit, no persistence |
| Relationship | ⭐ | No state tracking |
| Adaptation | ⭐ | Mirroring effect |
| Complexity | ⭐⭐⭐⭐⭐ | Simplest |
| Cost | ⭐⭐⭐⭐⭐ | Lowest |
| Latency | ⭐⭐⭐⭐⭐ | Fastest |
| Interpretability | ⭐⭐⭐⭐⭐ | Full transparency |
| Implementation | ⭐⭐⭐⭐⭐ | Easy |

**Verdict**: ❌ **NOT JUSTIFIED** — Drift quá lớn cho long-term use.

---

## Architecture B: LLM + Memory

### Mô tả
- Thêm memory system (vector DB) cho persistence
- Personality qua prompt + memory retrieval

### Đánh giá
| Criterion | Score | Notes |
|-----------|-------|-------|
| Evidence | ⭐⭐⭐ | RAG, vector memory studies |
| Consistency | ⭐⭐⭐ | Improved nhưng chưa đủ |
| Memory | ⭐⭐⭐⭐ | 78% accuracy, scalable |
| Relationship | ⭐⭐ | Limited tracking |
| Adaptation | ⭐⭐⭐ | Basic learning |
| Complexity | ⭐⭐⭐ | Moderate |
| Cost | ⭐⭐⭐⭐ | Low-medium |
| Latency | ⭐⭐⭐⭐ | Fast with vector |
| Interpretability | ⭐⭐⭐ | Transparent retrieval |
| Implementation | ⭐⭐⭐⭐ | Well-documented |

**Verdict**: ⚠️ **USE WITH CONDITIONS** — Cần thêm relationship và emotion modules.

---

## Architecture C: LLM + Memory + Relationship + State

### Mô tả
- Memory system (vector + graph)
- Explicit relationship state tracking
- Personality state management
- Emotion controller

### Đánh giá
| Criterion | Score | Notes |
|-----------|-------|-------|
| Evidence | ⭐⭐⭐⭐ | Strong across domains |
| Consistency | ⭐⭐⭐⭐ | 82-85% với hybrid |
| Memory | ⭐⭐⭐⭐ | 91% với hybrid approach |
| Relationship | ⭐⭐⭐⭐ | 6 dimensions modeled |
| Adaptation | ⭐⭐⭐ | State-based adaptation |
| Complexity | ⭐⭐ | High |
| Cost | ⭐⭐ | Medium-high |
| Latency | ⭐⭐⭐ | Moderate |
| Interpretability | ⭐⭐⭐ | State-transparent |
| Implementation | ⭐⭐ | Complex |

**Verdict**: ✅ **USE** — Recommended baseline cho production.

---

## Architecture D: LLM + Memory + State + Learned Components

### Mô tả
- Tất cả của Architecture C
- Thêm learned components:
  - Personality adapters
  - Preference learning
  - Emotion prediction models
  - Relationship prediction

### Đánh giá
| Criterion | Score | Notes |
|-----------|-------|-------|
| Evidence | ⭐⭐⭐ | Moderate, emerging |
| Consistency | ⭐⭐⭐⭐⭐ | 85%+ với learned adapter |
| Memory | ⭐⭐⭐⭐⭐ | Learned retrieval 88% |
| Relationship | ⭐⭐⭐⭐ | Predictive modeling |
| Adaptation | ⭐⭐⭐⭐⭐ | Continuous learning |
| Complexity | ⭐ | Very high |
| Cost | ⭐ | High (training + inference) |
| Latency | ⭐⭐ | Slower with models |
| Interpretability | ⭐⭐ | Black-box concerns |
| Implementation | ⭐ | Very complex |

**Verdict**: ⚠️ **USE WITH CONDITIONS** — Cần engineering maturity, start with Phase 2.

---

## Architecture E: LLM + Memory + State + RL + Graph + Continual Learning

### Mô tả
- Tất cả của Architecture D
- Thêm:
  - Reinforcement learning cho optimization
  - Graph neural networks cho relationship
  - Continual learning frameworks

### Đánh giá
| Criterion | Score | Notes |
|-----------|-------|-------|
| Evidence | ⭐⭐ | Limited, mostly theoretical |
| Consistency | ⭐⭐⭐⭐ | Potential nhưng chưa proven |
| Memory | ⭐⭐⭐⭐⭐ | Optimal với CL |
| Relationship | ⭐⭐⭐⭐ | GNN cho社交网络 |
| Adaptation | ⭐⭐⭐⭐⭐ | RL cho preference |
| Complexity | ⭐ | Maximum |
| Cost | ⭐ | Very high |
| Latency | ⭐ | Slowest |
| Interpretability | ⭐ | Very low |
| Implementation | ⭐ | Research-grade |

**Verdict**: 🔬 **EXPERIMENT FIRST** — Cần research trước khi production.

---

## Recommendation Matrix

| Phase | Architecture | Target Metrics | Timeline |
|-------|--------------|----------------|----------|
| Phase 1 | C | ICS > 0.75, Mem Acc > 0.80 | Months 1-2 |
| Phase 2 | C + Learned (D-lite) | ICS > 0.80, Mem Acc > 0.85 | Months 3-4 |
| Phase 3 | D | ICS > 0.85, Mem Acc > 0.90 | Months 5-6 |
| Phase 4 | E (research) | Evaluate RL/CL benefits | Months 7-12 |

---

## Proposed Aivora Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     LLM Interface                           │
│                    (Claude/GPT/Gemini)                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Context Compiler                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ Identity│ │Personality│ │Memory │ │Relation│          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                      │
│  │ Emotion │ │ World   │ │Scenario │                      │
│  └─────────┘ └─────────┘ └─────────┘                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Character Engine                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ State Store  │  │ Memory Store │  │ Relationship │     │
│  │ (JSON/DB)    │  │ (Vector+Graph)│  │  Engine      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐                       │
│  │ Emotion      │  │ Personality  │                       │
│  │ Controller   │  │ Adapter      │                       │
│  └──────────────┘  └──────────────┘                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Evaluation Monitor                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ ICS Monitor  │  │Drift Detector│  │Quality Check │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Details

### 1. State Store
- Format: JSON/SQLite
- Contents: Identity, Personality traits, Values, Goals
- Update: Slowly changing, versioned

### 2. Memory Store
- Vector DB: ChromaDB/Pinecone (episodic)
- Graph DB: Neo4j (semantic + relationships)
- Operations: Write, Retrieve, Consolidate, Forget

### 3. Relationship Engine
- 6 dimensions: Trust, Affection, Familiarity, Respect, Conflict, Intimacy
- Model: R_t = f(R_{t-1}, Interaction_t, Context_t)
- Storage: Time-series database

### 4. Emotion Controller
- Internal state: valence, arousal, dominance
- Dynamics: accumulation, decay, thresholds
- Output: LLM-formatted emotion tokens

### 5. Personality Adapter
- Lightweight LoRA adapter
- Fine-tuned on persona-consistent data
- Activated when memory retrieval insufficient

### 6. Context Compiler
- Prioritization: Identity > Personality > Memory > Relationship > World
- Compression: LongLLMLingua-style
- Compilation: Structured JSON → natural language

### 7. Evaluation Monitor
- ICS calculation every N turns
- Drift detection with alerting
- Quality metrics logging

---

## Implementation Roadmap

### Month 1-2: Foundation
- [ ] Basic state store (JSON)
- [ ] Vector memory (ChromaDB)
- [ ] Simple personality prompt
- [ ] Evaluation framework

### Month 3-4: Enhancement
- [ ] Graph memory integration
- [ ] Relationship engine v1
- [ ] Emotion controller v1
- [ ] Context compiler

### Month 5-6: Learning
- [ ] Personality adapter training
- [ ] Preference learning
- [ ] Consolidation mechanism
- [ ] Drift monitoring

### Month 7-12: Research
- [ ] RL experiments
- [ ] Continual learning
- [ ] Multi-agent simulation
- [ ] Longitudinal studies

---

*Last updated: 2026-09-03*
*Decision: Start with Architecture C, evolve toward D*
