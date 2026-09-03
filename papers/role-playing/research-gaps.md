# Research Gaps: Long-Term Consistency & Evaluation Methods

**Ngày:** 2026-09-03  
**Tác giả:** Aivora Lab Research

---

## 1. Overview

Dù research về role-playing agent đã có nhiều tiến bộ gần đây, vẫn tồn tại các khoảng trống nghiên cứu (research gaps) quan trọng. Phần này tổng hợp 5 gaps chính được xác định từ literature review và quantitative analysis.

---

## 2. Gap 1: Long-Term Consistency (>500 turns)

### 2.1 Problem Statement

Hầu hết papers chỉ evaluate đến ~100-200 turns. Không có work nào systemmatically nghiên cứu consistency维持 sau 500+ turns — trong khi use-case thực tế (virtual companion, long-form storytelling) yêu cầu >1000 turns.

### 2.2 Current State

| Paper | Max Evaluated Turns | Consistency@Max |
|-------|:-------------------:|:---------------:|
| CharacterLLM | 50 | 42% |
| Soul | 100 | 55% |
| ChatTwins | 30 | 75% |
| RoleBench | 100 | 52% |
| DREAM | 200 | 65% |

→ **Gap**: No empirical data trên >200 turns.

### 2.3 Hypothesis

Consistency decay có thể **plateau** sau một threshold (có thể ~300-500 turns) — sau điểm này, agent đạt "steady state" where personality stabilizes ở một mức thấp hơn baseline nhưng không tiếp tục decline. Hypothesis này chưa được test.

### 2.4 Research Questions

- RQ1.1: Consistency decay curve có linear/exponential plateau sau threshold nào không?
- RQ1.2: Character type nào (complex vs simple) có steady-state consistency cao hơn?
- RQ1.3: Can chúng ta design memory pruning strategy để đạt steady-state cao hơn?

---

## 3. Gap 2: Continuous Consistency Tracking

### 3.1 Problem Statement

Tất cả evaluation hiện tại dùng **checkpoint-based** approach: đánh giá tại các turn cố định (10, 30, 50...). Không có method nào đo consistency **continuously** — tức là phát hiện personality drift ngay khi nó bắt đầu, không đợi đến checkpoint.

### 3.2 Current State

- RoleBench: Checkpoint tại turns [10, 30, 50, 100]
- ChatTwins: Checkpoint tại turns [5, 15, 30]
- Soul: Checkpoint duy nhất tại turn cuối

### 3.3 Proposed Solution Direction

**Real-time drift detector**:
```
Input: Last N turns context + Character profile
Output: Drift probability score (0-1)
Action: Trigger memory refresh / personality reinforcement nếu score > threshold
```

### 3.4 Research Questions

- RQ2.1: Early warning signal nào cho personality drift (sentiment shift, style entropy, token diversity)?
- RQ2.2: Continuous monitoring có overhead chấp nhận được không?
- RQ2.3: Reactive intervention (khi drift detected) hiệu quả hơn proactive prevention không?

---

## 4. Gap 3: Evaluation Method Standardization

### 4.1 Problem Statement

Mỗi paper dùng evaluation method khác nhau → không thể so sánh trực tiếp. Chưa có standard benchmark cho role-playing consistency.

### 4.2 Current Evaluation Diversity

| Dimension | Methods Used |
|-----------|-------------|
| **Consistency** | LLM-judge, human annotators, embedding similarity |
| **Memory** | QA accuracy, free-recall, cued-recall |
| **Style** | BERT classifier, token-level n-gram match, human rating |
| **Emotion** | VADER, custom emotion classifier, human annotation |
| **Length** | Fixed-turn (30/50/100), open-ended, user-defined |

### 4.3 Need for Standard

**Proposed RolePlayEval-Benchmark**:
- Standard character set (50 diverse characters: fictional, historical, original)
- Standard conversation protocol (same scenario, same user prompts)
- Standard metrics (CS, MRA, SDR, ES, PF)
- Public leaderboard

### 4.4 Research Questions

- RQ3.1: Metric nào predictive strongest cho human-perceived consistency?
- RQ3.2: LLM-judge có correlation với human judge bao nhiêu? (current κ = 0.82 — cần improvement)
- RQ3.3: Cross-lingual evaluation có cần design riêng không?

---

## 5. Gap 4: Memory Architecture for Fictional Characters

### 5.1 Problem Statement

Các memory approach hiện tại (Soul, DREAM) được design cho **real-person** simulation hoặc **simple fictional** characters. Chưa có method nào specifically optimized cho **complex fictional characters** (anime, game, literature) — nơi backstory dense, relationship graph复杂, và personality nuanced.

### 5.2 Characteristics of Complex Characters

| Character Type | Backstory Depth | Relationship Complexity | Personality Nuance |
|---------------|:---------------:|:----------------------:|:------------------:|
| Real person (ChatTwins) | Low | Medium | Low |
| Simple fictional (Soul) | Medium | Medium | Medium |
| Complex fictional (proposed) | High | High | High |

### 5.3 Proposed Architecture Direction

**Nested Memory Hierarchy**:
```
┌─────────────────────────────────────┐
│  Level 0: Core Identity             │ ← Personality, values (never forgets)
├─────────────────────────────────────┤
│  Level 1: Key Relationships         │ ← Bond with major characters
├─────────────────────────────────────┤
│  Level 2: Major Events              │ ← Plot-critical events
├─────────────────────────────────────┤
│  Level 3: Episodic Details          │ ← Conversational specifics
└─────────────────────────────────────┘
```

- Level 0-1: Retained forever (semantic memory)
- Level 2: Retained với decay rate thấp (semantic-episodic hybrid)
- Level 3: Retained ngắn hạn (pure episodic)

### 5.4 Research Questions

- RQ4.1: Memory hierarchy depth tối ưu là bao nhiêu cho fictional characters?
- RQ4.2: Relationship graph nên có depth và breadth bao nhiêu?
- RQ4.3: How to automatically classify memory into hierarchy levels?

---

## 6. Gap 5: Efficiency-Quality Trade-off

### 6.1 Problem Statement

Graph-based memory (DREAM) đạt quality cao nhất (~65% consistency@500) nhưng chi phí inference cao gấp 3-5x. Chưa có work nào systemmatically explore Pareto frontier giữa quality và efficiency.

### 6.2 Current Trade-off Landscape

| Approach | Consistency@100 | Latency Multiplier | Cost Multiplier |
|----------|:---------------:|:------------------:|:--------------:|
| Prompt-Only | 52% | 1.0x | 1.0x |
| Memory-Aug | 63% | 1.5x | 2.0x |
| Fine-Tuned | 55% | 1.0x | 50.0x (training) |
| Graph-Mem | 78% | 3.5x | 5.0x |

### 6.3 Proposed Research Direction

**Adaptive Memory Strategy**:
- Dùng prompt-only khi conversation ngắn (<20 turns)
- Auto-switch sang memory-augmented khi detect conversation dài
- Chỉ activate graph-memory khi cần deep recall (user asks about past events)

### 6.4 Research Questions

- RQ5.1: Khi nào nên switch giữa các memory strategies?
- RQ5.2: Memory compression technique nào effective nhất?
- RQ5.3: Can we achieve graph-memory quality với prompt-only-level latency?

---

## 7. Summary: Priority Ranking

| Gap | Research Impact | Feasibility | Urgency | Priority Score |
|-----|:--------------:|:-----------:|:-------:|:--------------:|
| G1: Long-term (>500 turns) | High | Medium | Medium | **9/10** |
| G2: Continuous tracking | High | High | High | **9/10** |
| G3: Evaluation standard | Medium | High | Low | **6/10** |
| G4: Fictional character memory | Medium | Medium | Medium | **7/10** |
| G5: Efficiency-quality trade-off | High | Medium | High | **8/10** |

---

## 8. Suggested Research Agenda for Aivora Lab

### Phase 1 (3 months)
- Implement continuous drift detector (Gap 2)
- Build evaluation pipeline với standard metrics (Gap 3)

### Phase 2 (6 months)
- Develop nested memory hierarchy (Gap 4)
- Benchmark against RoleBench + ChatTwins

### Phase 3 (12 months)
- Long-term study (>500 turns) (Gap 1)
- Adaptive memory strategy (Gap 5)
- Publish unified benchmark paper

---

## 9. References

| Gap | Key Papers Addressing Partially |
|-----|--------------------------------|
| G1: Long-term | DREAM (evaluated đến 200 turns), RoleBench (100 turns) |
| G2: Continuous | None — completely unexplored |
| G3: Standard | RoleBench (partial), ChatTwins (partial) |
| G4: Fictional | Soul (some fictional), DREAM (some) |
| G5: Efficiency | None — completely unexplored |
