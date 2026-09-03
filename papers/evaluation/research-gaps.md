# Research Gaps: Evaluation của Long-Term AI Character Systems

**Phiên bản:** 1.0  
**Ngày:** 2026-09-03  
**Domain:** Evaluation

---

## Overview

File này tổng hợp các khoảng trống nghiên cứu (research gaps) trong evaluation của AI Character systems, được xác định dựa trên systematic review của 40+ papers. Mỗi gap được đánh giá mức độ nghiêm trọng và đề xuất hướng khắc phục.

---

## Gap 1: Thiếu Benchmark cho Long-Term Character Consistency

### Mức độ nghiêm trọng: **CRITICAL**

**Problem:** Không có benchmark nào test character identity retention beyond 7-30 ngày. Tất cả benchmarks hiện tại (CharacterEval, CharacterBench, PersonaEval, RP-Bench) tập trung single-session hoặc short-horizon (< 200 turns).

**Evidence:**
- CharacterEval: 1,785 dialogues, nhưng không có longitudinal component
- CharacterBench: 22,859 samples, nhưng static evaluation
- PersonaEval: focuses on LLM judge reliability, not temporal stability
- LongMemEval: measures memory recall, not character consistency per se
- PTCBench: contextual stability within single session, not across days/weeks

**Impact on Aivora:** Không có baseline để đánh giá xem Character của Aivora có duy trì được identity sau 30/60/90 ngày hay không. Đây là câu hỏi cốt lõi của dự án.

**Proposed solution:**
```
Benchmark proposal: "CharacterStabilityBench"
- Thiết kế: 30-day longitudinal interaction simulation
- Metrics: Personality fidelity decay curve, memory accuracy over time, 
           relationship quality trajectory, identity contradiction rate
- Baseline: GPT-4o full-context, Mem0, various prompt strategies
- Scale: Minimum 100 simulated users × 30 days × daily interaction
```

---

## Gap 2: Selective Forgetting Chưa Được Giải Quyết

### Mức độ nghiêm trọng: **HIGH**

**Problem:** Khả năng override/gỡ bỏ memories cũ khi có thông tin mới là yếu nhất trong tất cả memory competencies.

**Evidence:**
- MemoryAgentBench: Best system (HippoRAG-v2) chỉ 54.0% accuracy trên FactConsolidation
- Zep/Graphiti: chỉ 7.0% — Despite reporting strong results on other benchmarks
- Mem0/Contriever: 18.0%
- Findings tái diễn across 22 tested systems và multiple architectures

**Impact on Aivora:** Aivora's Memory Engine (Short/Medium/Long tiers) giả định rằng older facts có thể đơn giản被 superseded bởi newer ones. Evidence nói capability này gần như chưa được giải quyết trong toàn ngành.

**Proposed solution:**
```
Research direction:
1. Develop explicit contradiction detection + resolution module
2. Test các forgetting strategies: time-decay, importance-weighted, 
   conflict-aware consolidation
3. Benchmark trên FactConsolidation-style tasks before production
4. Consider biological-inspired forgetting (FadeMem approach)
```

---

## Gap 3: Benchmark Generalization Gap

### Mức độ nghiêm trọng: **HIGH**

**Problem:** Hệ thống score ~90% trên easy benchmarks (LoCoMo, LongMemEval) có thể drop xuống 40-60% trên harder benchmarks (LifeBench).

**Evidence:**
- LifeBench: MemOS (top system) chỉ 55.22%, Hindsight 40.99% — Despite scoring ~90% trên LoCoMo/LongMemEval
- MemoryArena: Similar generalization gap reported
- This is a direct warning against "benchmark shopping"

**Impact on Aivora:** Nếu Aivora chỉ benchmark trên một vài easy benchmarks, có thể overestimate capability thực tế 30-40 percentage points.

**Proposed solution:**
```
Evaluation protocol:
1. Test on ≥3 benchmarks với different difficulty levels
2. Report spread/variance across benchmarks, not just best score
3. Include at least one "hard" benchmark (LifeBench-style) 
   trong evaluation pipeline
4. Track generalization gap as a quality signal
```

---

## Gap 4: LLM-Judge Reliability Ceiling

### Mức độ nghiêm trọng: **MEDIUM-HIGH**

**Problem:** LLM judges có ceiling effect cho persona/character tasks — chỉ đạt ~69% accuracy so với 90.8% của human.

**Evidence:**
- PersonaEval: 21.8pp gap giữa LLM judge và human
- RMTBench: Human annotator agreement chỉ 0.77-0.84 — một phần disagreement là genuine subjectivity, không phải measurement error
- Judge model selection ảnh hưởng lớn đến absolute scores

**Impact on Aivora:** Nếu Aivora dùng LLM-judge cho Character Consistency Score, scores có thể systematically underestimate true consistency. Gap 21.8pp là irreducible nếu không có human calibration.

**Proposed solution:**
```
Hybrid evaluation strategy:
1. LLM-judge cho scalable monitoring (daily/weekly)
2. Human spot-check 5-10% samples để calibration
3. Report both LLM score và calibrated estimate
4. Regular recalibration (monthly) vì judge drift theo thời gian
```

---

## Gap 5: Không Có Metric Cho "Adaptation vs Identity Drift"

### Mức độ nghiêm trọng: **CRITICAL**

**Problem:** Literature chưa có quantitative framework để trả lời: "Character thay đổi bao nhiêu vẫn được coi là cùng một Character?"

**Evidence:**
- PTCBench đo contextual stability nhưng không define threshold cho "acceptable drift"
- De Araujo et al. (2025) phát hiện persona fidelity decline sau 100+ turns nhưng không định nghĩa breakpoint
- No paper decomposes: Total Change = Drift + Evolution + Adaptation

**Impact on Aivora:** Đây là research question trung tâm của Aivora. Không có metric chuẩn, không thể làm engineering decision informed.

**Proposed solution:**
```
Metric proposal:
1. Define "identity core" — những aspects của character KHÔNG được phép change
2. Define "peripheral traits" — những aspects CÓ thể adapt
3. Measure drift trong core vs peripheral separately
4. Threshold: Core drift < Xpp/week là acceptable; Peripheral adaptation không giới hạn
5. User perception study: what do ACTUAL users consider "the same character"?
```

---

## Gap 6: Cross-Model Personality Drift

### Mức độ nghiêm trọng: **MEDIUM**

**Problem:** PTCBench hint rằng personality stability varies by model architecture, nhưng không có study nào test cross-model routing cho một character.

**Evidence:**
- PTCBench (2026): "Different model architectures vary widely in how much they shift" under contextual pressure
- Aivora's Smart Router route同一 character's dialogue across multiple models
- Plausible rằng routing giữa các models gây personality drift, nhưng chưa được test

**Impact on Aivora:** Nếu Smart Router route từ GPT-4o sang Claude sang LLaMA, personality có thể inconsistent across turns — user perceives "character changed".

**Proposed solution:**
```
Experiment required:
1. Take one persona profile
2. Generate 500-turn dialogue routing across 3+ models
3. Measure personality consistency within single dialogue
4. Compare vs single-model baseline
5. If drift detected, develop cross-model persona alignment technique
```

---

## Gap 7: Emotion Modeling — Không Có Controlled Ablation

### Mức độ nghiêm trọng: **MEDIUM**

**Problem:** Không có paper nào so sánh có control explicit emotion-state modeling vs implicit (LLM-inferred) emotion trong companion-chat setting.

**Evidence:**
- HEART, AttuneBench, JMIR Review đều test isolated aspects
- No paper does: Group A (explicit emotion) vs Group B (implicit emotion) vs Group C (no emotion) — controlled RCT
- Emotion modeling evidence là weakest trong tất cả Aivora components

**Impact on Aivora:** Building explicit Emotion Engine dựa trên assumed benefit chưa được chứng minh.

**Proposed solution:**
```
Small-scale ablation recommended before full build:
1. 3 conditions: explicit emotion state / implicit (prompt-based) / no emotion
2. 50 users × 14 days × daily interaction
3. Measures: interaction quality rating, emotional coherence score, 
             user satisfaction, perceived empathy
4. If no significant difference, defer Emotion Engine to v2
```

---

## Gap 8: Longitudinal Multi-Dimensional Studies

### Mức độ nghiêm trọng: **CRITICAL**

**Problem:** Không có study nào đo simultaneous personality + memory + relationship + user satisfaction trong > 30 ngày với N > 200.

**Evidence:**
- LongMemEval: N/A (simulated), measures memory only
- Companion RCT: N=183, 21 days, measures wellbeing only (no personality/memory)
- Skjuve et al.: 2 years, qualitative + small quantitative (no benchmark)
- Persona studies: short-term, lab setting
- Memory studies: simulated, no human users

**Impact on Aivora:** Không có single source of truth cho how all dimensions interact over long term. Cần own longitudinal study.

**Proposed solution:**
```
Aivora Longitudinal Study Proposal:
- Duration: 90 days (minimum), target 180 days
- N: 200+ users
- Frequency: Daily lightweight survey + weekly deep interview (subset)
- Measures: 
  * Personality consistency (weekly BFI-2 short form)
  * Memory accuracy (monthly probe questions)
  * Relationship quality (validates scales)
  * User satisfaction (continuous)
  * Drift detection (automated)
- Control: Matched non-character chat control group
- Analysis: Mixed-effects models với random intercepts per user
```

---

## Gap 9: Prompt Compression trên Character-Structured Prompts

### Mức độ nghiêm trọng: **LOW-MEDIUM**

**Problem:** All compression papers (LLMLingua, LongLLMLingua, Telegraph) test trên QA/summarization/math benchmarks, không test trên character/memory/relationship structured prompts.

**Evidence:**
- LLMLingua: CoQA, HotpotQA, TriviaQA
- LongLLMLingua: NaturalQuestions
- Telegraph: headline fact accuracy
- None test on: persona description + memory snippets + relationship state + scenario context

**Impact on Aivora:** Aivora's Prompt Compiler (6000→1800 tokens) chưa có evidence base specific cho structured character prompts.

**Proposed solution:**
```
Test required:
1. Create representative Aivora structured prompt (persona + memory + relationship)
2. Apply compression at 50%, 60%, 70% ratios
3. Measure: persona consistency, memory recall accuracy, response naturalness
4. Compare vs uncompressed baseline
5. Determine safe compression ceiling for Aivora
```

---

## Gap 10: User Perception của Drift vs Human Detection

### Mức độ nghiêm trọng: **HIGH**

**Problem:** Không có study nào so sánh personality drift detected bởi psychometric tests vs drift detected bởi actual human users.

**Evidence:**
- PTCBench, Big Five studies: đo LLM personality "as if it were a survey respondent"
- Character consistency literature: đo dialogue behavior
- Intersection (user-perceived drift) chưa được researched
- Question: Nếu psychometric test phát hiện drift, nhưng user không nhận ra — cái nào quan trọng hơn?

**Impact on Aivora:** Có thể optimize cho metric mà user không cảm nhận được, hoặc ngược lại.

**Proposed solution:**
```
Study design:
1. Deploy character system với known injected drift (controlled)
2. Daily: administer short personality probe (automated)
3. Weekly: ask users "Does this character feel the same as before?"
4. Correlate: psychometric drift vs user-perceived drift
5. Identify: which types of drift are detectable by users?
```

---

## Gap 11: No Standardized "Character Health" Dashboard Metrics

### Mức độ nghiêm trọng: **MEDIUM**

**Problem:** Không có industry-standard set of metrics để monitor character health over time. Mỗi paper dùng metrics khác nhau, không so sánh được.

**Evidence:**
- Memory papers: accuracy, Recall@k, NDCG@k
- Persona papers: Big Five r, fidelity score, inconsistency rate
- Relationship papers: trust scale, attachment scale, disclosure rate
- No unified framework

**Impact on Aivora:** Không có common language cho character quality across components.

**Proposed solution:**
```
Aivora Character Health Score (proposed):
CHS = w1 × MemoryRetrievalScore + w2 × PersonalityFidelity + 
      w3 × RelationshipContinuity + w4 × EmotionalCoherence + 
      w5 × BehavioralConsistency
      
Weights learned từ human preference data (Pareto-optimal until then)
Reported weekly per character per user
```

---

## Gap 12: Vendor-Reported Numbers Uncertainty

### Mức độ nghiêm trọng: **MEDIUM**

**Problem:** Vendor blog numbers (Mem0: 92.5%) khác biệt đáng kể so với independent benchmarks (61.43%) — gap 30pp.

**Evidence:**
- Section 18.2 của consensus.md đã phân tích detail
- Pattern: higher numbers come from vendors, lower từ independent sources
- Judge model differences, algorithm version differences, retrieval budget differences — all contribute

**Impact on Aivora:** Nếu dựa vào vendor numbers để set targets, có thể overestimate achievable performance.

**Proposed solution:**
```
Policy:
1. Treat vendor-reported numbers as UPPER BOUNDS, not expectations
2. Always benchmark against independent re-implementation
3. Report both vendor và independent numbers in any evaluation
4. Flag discrepancies > 10pp in evaluation reports
```

---

## Gap Summary Matrix

| Gap | Severity | Evidence Base | Effort to Close | Timeline |
|-----|----------|--------------|-----------------|----------|
| G1: Long-term consistency benchmark | CRITICAL | Strong (absence confirmed) | High | 6-12 months |
| G2: Selective forgetting | HIGH | Strong (54% ceiling) | High | 3-6 months |
| G3: Benchmark generalization | HIGH | Strong (LifeBench) | Medium | Immediate |
| G4: LLM-judge ceiling | MEDIUM-HIGH | Strong (PersonaEval) | Medium | Ongoing |
| G5: Adaptation vs drift threshold | CRITICAL | Weak (question unasked) | High | 6-12 months |
| G6: Cross-model drift | MEDIUM | Plausible (PTCBench implication) | Medium | 3 months |
| G7: Emotion ablation | MEDIUM | Weak (no studies exist) | Medium | 3 months |
| G8: Longitudinal multi-dimensional | CRITICAL | Strong (all studies short) | Very High | 6-12 months |
| G9: Compression on character prompts | LOW-MEDIUM | Strong (gap confirmed) | Low | 1 month |
| G10: User perception of drift | HIGH | Weak (unexplored) | High | 6 months |
| G11: Standardized health dashboard | MEDIUM | Weak (no framework) | Medium | 3 months |
| G12: Vendor number uncertainty | MEDIUM | Strong (30pp gap documented) | Low | Immediate |

---

## Priority Research Agenda

### Phase 1 (Immediate — 0-3 months)
1. G3: Adopt multi-benchmark evaluation protocol (LifeBench + LongMemEval + CharacterBench)
2. G12: Establish policy on vendor numbers
3. G9: Test compression on Aivora's specific prompt format
4. G4: Implement hybrid LLM+human evaluation pipeline

### Phase 2 (Short-term — 3-6 months)
5. G2: Build/select FactConsolidation benchmark for Aivora
6. G6: Test cross-model routing consistency
7. G7: Run small-scale emotion ablation
8. G11: Design Character Health Score framework

### Phase 3 (Long-term — 6-18 months)
9. G1: Build CharacterStabilityBench (30-day longitudinal benchmark)
10. G5: Define adaptation vs drift threshold via user study
11. G8: Launch Aivora Longitudinal Study (N=200+, 90+ days)
12. G10: Study user perception of drift vs psychometric detection

---

## Open Questions for Aivora

```
1. What is the minimum viable longitudinal study design for Aivora's context?
   (Constraints: cost, user privacy, data volume)

2. Can we borrow evaluation methods from clinical psychology 
   (e.g., test-retest reliability, clinical significance thresholds)
   for character evaluation?

3. Should we prioritize building our own benchmark (CharacterStabilityBench)
   or contributing to existing ones (CharacterBench, SOTOPIA)?

4. How do we handle the "user perception vs objective metric" tension?
   (If user doesn't notice drift but metric says it drifted, what do we do?)

5. What is the right balance between automated monitoring và human review
   for a production character system with 10K+ users?
```

---

## References

1. Zhou et al. (2025). PersonaEval. arXiv:2508.10014
2. Hu, Wang & McAuley (2026). MemoryAgentBench. OpenReview: DT7JyQC3MR
3. Chen/He et al. (2026). LifeBench. arXiv:2603.03781
4. PTCBench (2026). arXiv:2602.00016
5. De Freitas et al. (2025). Companion RCT. arXiv:2509.19515
6. Kim et al. (2026). PICon. arXiv:2603.25620
7. De Araujo et al. (2025). arXiv:2512.12775
8. Abdulhai et al. (2025). arXiv:2511.00222
9. Pakhomov et al. (2025). Convomem. arXiv:2511.10523
10. Jiang et al. (2023). LLMLingua. Microsoft Research

---

*12 research gaps identified. 3 CRITICAL, 4 HIGH, 4 MEDIUM, 1 LOW-MEDIUM.*
