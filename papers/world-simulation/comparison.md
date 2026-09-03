# Comparison: Approaches cho World Simulation

> So sánh ba approaches chính: text-based, structured, và hybrid — xét về fidelity, scalability, cost, và suitability cho Aivora Lab.

---

## 1. Overview of Approaches

| Dimension | Text-Based | Structured | Hybrid |
|-----------|-----------|------------|--------|
| **World representation** | Natural language descriptions | JSON/schema-based state | Mixed: text narratives + structured metadata |
| **Example systems** | CharacterBox, Story Evolution | AgentBench, traditional simulation | Agent-World, GenSim |
| **Best for** | Narrative richness, creative tasks | Precision, verification, scalability | Balanced real-world applications |

---

## 2. Detailed Comparison

### 2.1. Text-Based Approach

**Đại diện**: CharacterBox (NAACL 2025), Story Evolution Benchmark (2026)

**Cách hoạt động**:
- World state được biểu diễn dưới dạng natural language
- Agents đọc/ghi world state qua text prompts
- Tương tác hoàn toàn qua dialogue

**Ưu điểm**:
| Điểm mạnh | Mức độ | Notes |
|-----------|--------|-------|
| Narrative flexibility | ⭐⭐⭐⭐⭐ | Không giới hạn bởi schema |
| Human readability | ⭐⭐⭐⭐⭐ | Dễ debug, dễ hiểu |
| Creative expression | ⭐⭐⭐⭐⭐ | Character có personality phong phú |
| Implementation speed | ⭐⭐⭐⭐ | Không cần thiết kế schema phức tạp |

**Nhược điểm**:
| Điểm yếu | Mức độ | Notes |
|-----------|--------|-------|
| Fact preservation | ⭐⭐ | Chỉ 58–71% accuracy qua 200 turns |
| Verifiability | ⭐⭐ | Khó kiểm chứng exact state |
| Token cost | ⭐⭐ |冗杂 text浪费 tokens |
| Consistency drift | ⭐⭐⭐ | Character personality loãng theo time |

**Metrics thực tế**:
- Fact preservation: 58–79%
- Causal consistency: 0.64–0.76
- Cost per turn (1 agent): $0.001–$0.01
- Latency: 3–8 seconds

---

### 2.2. Structured Approach

**Đại diện**: AgentBench (NeurIPS 2023), Agent-World (arXiv 2026)

**Cách hoạt động**:
- World state được biểu diễn bằng JSON, SQL, hoặc schema
- Agents thao tác qua API calls thay vì text
- State transitions được validate tự động

**Ưu điểm**:
| Điểm mạnh | Mức độ | Notes |
|-----------|--------|-------|
| Fact preservation | ⭐⭐⭐⭐⭐ | ~95%+ accuracy (verifiable) |
| Verifiability | ⭐⭐⭐⭐⭐ | State có thể diff, check |
| Token efficiency | ⭐⭐⭐⭐ | Compact representation |
| Determinism | ⭐⭐⭐⭐ | Same input → same output |

**Nhược điểm**:
| Điểm yếu | Mức độ | Notes |
|-----------|--------|-------|
| Flexibility | ⭐⭐ | Giới hạn bởi schema design |
| Implementation complexity | ⭐⭐⭐⭐ | Cần thiết kế system architecture |
| Narrative quality | ⭐⭐ | Thiếu expressiveness cho creative tasks |
| Agent creativity | ⭐⭐⭐ | Giới hạn trong predefined actions |

**Metrics thực tế**:
- Fact preservation: 85–95%
- Causal consistency: 0.82–0.91
- Cost per turn (1 agent): $0.0003–$0.002
- Latency: 1–3 seconds

---

### 2.3. Hybrid Approach

**Đại diện**: GenSim (NAACL 2025), AgentVerse (ICLR 2024), CAREB-MAS (ACL 2026)

**Cách hoạt động**:
- World có structured core state (vị trí, inventory, relationships)
- Narrative layers được thêm vào qua text generation
- Agents tương tác qua cả hai modality

**Ưu điểm**:
| Điểm mạnh | Mức độ | Notes |
|-----------|--------|-------|
| Best of both worlds | ⭐⭐⭐⭐ | Balance giữa precision và flexibility |
| Scalability | ⭐⭐⭐⭐ | GenSim đạt 100K agents |
| Verifiability | ⭐⭐⭐ | Core state verifiable, narrative soft |
| Richness | ⭐⭐⭐⭐ | Narrative cho personality, structure cho mechanics |

**Nhược điểm**:
| Điểm yếu | Mức độ | Notes |
|-----------|--------|-------|
| Complexity | ⭐⭐⭐⭐⭐ | Hard để implement và maintain |
| Coordination overhead | ⭐⭐⭐ |需要同步 state ↔ narrative |
| Debugging difficulty | ⭐⭐⭐ | Khó trace issues giữa hai layers |

**Metrics thực tế**:
- Fact preservation: 75–85%
- Causal consistency: 0.72–0.85
- Cost per turn (100 agents): $0.03–$0.30
- Latency: 2–18 seconds
- Max agents tested: 100,000

---

## 3. Side-by-Side Comparison Matrix

| Criterion | Text-Based | Structured | Hybrid | Winner |
|-----------|-----------|------------|--------|--------|
| **Fidelity** | 60–75% | 85–95% | 75–85% | Structured |
| **Creativity** | 90–95% | 40–60% | 70–85% | Text |
| **Scalability** | 10–100 | 1K–10K | 10K–100K | Hybrid |
| **Cost Efficiency** | $$ | $ | $$$ | Structured |
| **Implementation Speed** | Fast | Medium | Slow | Text |
| **Maintainability** | High | High | Low | Structured |
| **Debuggability** | High | High | Low | Structured |
| **Realism** | Medium | Low | High | Hybrid |
| **Human-like interaction** | High | Low | Medium-High | Text/Hybrid |

---

## 4. Recommendation cho Aivora Lab

### Recommended: Hybrid Approach

**Lý do**:

1. **Domain phù hợp**: Aivora Lab là AI assistant platform — cần cả personality (text) và tool execution (structured)
2. **Scalability requirement**: Hướng đến multi-user, cần support nhiều sessions đồng thời
3. **Character persistence**: Cần world state management (structured) + personality consistency (text)
4. **Implementation timeline**: Có thể start với structured core, thêm narrative layer sau

### Architecture Suggestion

```
┌─────────────────────────────────────────┐
│         World State Engine              │  ← Structured core
│  (PostgreSQL + Redis for real-time)      │     JSON schema
├─────────────────────────────────────────┤
│         Narrative Layer                 │  ← Text generation
│  (Character dialogue, world events)     │     LLM-powered
├─────────────────────────────────────────┤
│         Agent Interface                 │  ← Unified API
│  (REST/WebSocket for client apps)       │     Hybrid I/O
└─────────────────────────────────────────┘
```

### Implementation Phases

| Phase | Scope | Duration | Cost Est. |
|-------|-------|----------|-----------|
| Phase 1 | Structured world state + single character | 2–3 weeks | Low |
| Phase 2 | Add narrative layer + persistence | 3–4 weeks | Medium |
| Phase 3 | Multi-agent coordination | 4–6 weeks | High |
| Phase 4 | Scale to 100+ concurrent users | 6–8 weeks | High |

---

## 5. Alternative Approaches Considered (và tại sao không chọn)

| Approach | Lý do loại trừ |
|----------|---------------|
| Pure text-based | Fact preservation quá thấp (~60%), không suitable cho production |
| Pure structured | Thiếu personality depth, character sẽ feel "robotic" |
| Traditional game engine (Unity/Unreal) | Overkill cho text-first interaction, high development cost |
| Fully neural world model | Research-phase only, chưa stable cho production |
