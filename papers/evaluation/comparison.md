# Comparison: Evaluation Approaches cho AI Character Systems

**Phiên bản:** 1.0  
**Ngày:** 2026-09-03  
**Domain:** Evaluation

---

## 1. Automatic Metrics vs Human Evaluation

### 1.1 Quick Comparison

| Aspect | Automatic (LLM-judge) | Human Evaluation | Hybrid |
|--------|----------------------|-----------------|--------|
| **Cost per 1K evals** | $0.50-$5 | $100-$500 | $20-$50 |
| **Speed** | Minutes | Days-weeks | Hours |
| **Persona attribution accuracy** | ~69% (PersonaEval) | 90.8% | Depends on ratio |
| **Scalability** | Excellent | Limited | Good |
| **Ecological validity** | Lower | Higher | Balanced |
| **Inter-rater reliability** | Perfect (deterministic) | κ=0.77-0.84 | — |
| **Bias risk** | Judge-model calibration drift | Rater fatigue, individual diffs | Mitigated |
| **Best for** | Daily monitoring, regression testing | Baseline calibration, periodic audit | Production evaluation |

### 1.2 When to Use Which

| Scenario | Recommended Approach | Rationale |
|----------|---------------------|-----------|
| Daily automated checks | LLM-judge only | Cost-effective, fast |
| New benchmark/protocol validation | Human first, then calibrate LLM | Establish ground truth |
| Production A/B testing | Hybrid (LLM primary, human spot-check 5-10%) | Balance cost và accuracy |
| Research publication | Human + LLM + statistical tests | Publication standards |
| Real-time character health monitoring | LLM-judge dashboard | Speed requirement |
| Annual character quality report | Human evaluation | Rigor requirement |

### 1.3 LLM-as-Judge Limitations (PersonaEval Findings)

**Critical finding:** Even the best LLM judges (GPT-4o) only reach ~69% accuracy on the prerequisite task of "which character is speaking?" — versus 90.8% for humans.

**Implications:**
- LLM judges have a **ceiling effect** for persona/character tasks
- Gap of 21.8pp means automatic scores systematically underestimate true consistency
- Calibration against human data là necessary before trusting LLM-only evaluation
- Judge model selection matters enormously — different judges produce different score distributions

**Recommendation:** Never rely solely on LLM-judge cho character consistency metrics. Always validate against human ratings on a representative sample.

---

## 2. Short-Term vs Long-Term Evaluation

### 2.1 Definition

| Type | Time Scope | Typical Setting | What it Measures |
|------|-----------|-----------------|-----------------|
| Short-term | Single session, < 20 turns | Lab study, benchmark | Immediate persona adherence, turn-by-turn consistency |
| Medium-term | 20-200 turns, same session | Extended dialogue | Context dilution effects, memory retrieval quality |
| Long-term | Multiple sessions, days-weeks | Longitudinal study | Cross-session continuity, relationship development |
| Ultra-long | Weeks-months | Production monitoring | Identity stability, user retention, drift accumulation |

### 2.2 Benchmark Coverage by Time Scope

| Benchmark | Short-term | Medium-term | Long-term | Ultra-long |
|-----------|-----------|-------------|-----------|------------|
| CharacterEval | ✅ | — | — | — |
| CharacterBench | ✅ | — | — | — |
| PersonaEval | ✅ | — | — | — |
| RMTBench | ✅ | ✅ | — | — |
| LongMemEval | — | ✅ | ✅ | — |
| LoCoMo | — | ✅ | ✅ | — |
| LifeBench | — | — | ✅ | ✅ |
| MemoryAgentBench | — | ✅ | ✅ | — |
| PTCBench | ✅ | ✅ | — | — |
| SOTOPIA | ✅ | — | — | — |
| Companion RCT | — | — | ✅ (21 days) | — |
| Skjuve et al. | — | — | ✅ (2 years) | — |

**Finding:** Most benchmarks focus short-to-medium term. Long-term (>21 days) và ultra-long evaluation có rất ít benchmark coverage.

### 2.3 Performance Decay Patterns

#### Memory Accuracy Decay

| Time | LongMemEval Accuracy | Decay Rate |
|------|---------------------|------------|
| T0 (initial, oracle) | ~92% | — |
| Same session (40+ turns, online) | ~58% | -34pp from oracle |
| Day 7+ | Unknown (no published data) | — |

**Source:** LongMemEval (Wu et al., 2024) — only T0 (oracle) và same-session online data published. No longitudinal decay curve exists. `[EVIDENCE]`

#### Personality Consistency Decay

| Finding | Source |
|---------|--------|
| Baseline personality reproducible across repeated measurements | PTCBench (arXiv:2602.00016) |
| Traits shift substantially under situational context | Same |
| Different model architectures vary widely in shift magnitude | Same |
| Persona fidelity declines over 100+ rounds | De Araujo et al. (arXiv:2512.12775) |
| Multi-turn RL reduces inconsistency by >55% | Abdulhai et al. (arXiv:2511.00222) |
| No published half-life or per-day drift rate exists | — |

**Critical gap**: No study reports personality consistency as a function of time (days/weeks) with Big Five correlation coefficients. The "decay curves" sometimes cited online are not from published papers. `[GAP]`

### 2.4 The Long-term Evaluation Gap

```
Time axis:  [Single-turn]──[20 turns]──[200 turns]──[1 day]──[7 days]──[30 days]──[90 days]──[180 days]
            
Benchmarks:  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
RCT studies:                      ░░░░░░░░░░████████████████████████░░░░░░░░░░░░░░░░░
Longitudinal HCI:                          ░░░░░░░░░░░░░░░░███████████████████████░░░░
                                                                                                                                  
Legend: █ = Covered    ░ = Not covered
```

**Key insight:** There is a massive gap in the 7-180 day range where no benchmark or standardized study exists. This is exactly the timescale Aivora needs to evaluate.

---

## 3. Memory Evaluation Approaches

### 3.1 Recall-based vs Reasoning-based

| Approach | What it tests | Example benchmark | Limitation |
|----------|--------------|-------------------|------------|
| Direct recall | "What did the user say about their cat?" | LongMemEval QA | Tests surface-level memory only |
| Reasoning over memory | "Given user changed jobs, how does this affect their schedule?" | LifeBench | Harder, more realistic |
| Decision-relevant memory | "Should the agent recommend X based on user's past preference?" | MemoryArena | Tests memory in action |
| Selective forgetting | "User said they have a cat in turn 5, but said they got rid of it in turn 50. What do they have?" | FactConsolidation | Tests update/contradiction resolution |

**Finding:** Systems that score ~90% on recall benchmarks drop to 40-60% on reasoning/decision benchmarks (LifeBench). This is the single most important pattern in memory evaluation literature.

### 3.2 Architecture Comparison on Memory Benchmarks

| Architecture | LoCoMo | LongMemEval | LifeBench | FactConsolidation | Latency | Cost |
|-------------|--------|-------------|-----------|-------------------|---------|------|
| Full-context | ~60% | 57.7% | — | N/A | High | High |
| Vector RAG (Mem0) | 61-92%* | 71%+ | ~55% | 18% | Low | Low |
| Temporal KG (Zep) | — | 71.2% | — | 7% | Medium | Medium |
| Hierarchical (TiMem) | — | 76.9% | — | — | Low | Low |
| Retain/Recall/Reflect (Hindsight) | — | 83.6% | 41% | — | Medium | Medium |
| Ground-truth episodic (MemMachine) | ~92%+ | — | — | — | Low | Low |

*Mem0 vendor-reported 92.5%, independent re-benchmark 61.43% — conflict

### 3.3 The "First 150 Conversations" Rule

Convomem (Pakhomov et al., 2025) found that for the first ~150 conversations:
- Simple full-context/block-summarize: **70-82% accuracy**
- Extraction-based RAG (Mem0-style): **30-45% accuracy**

**Implication for Aivora:** Early in a user-character relationship, a simpler architecture may actually outperform complex memory systems. Memory Engine complexity can graduate in as history accumulates.

---

## 4. Personality Evaluation Approaches

### 4.1 Psychometric vs Behavioral

| Approach | Method | Pros | Cons |
|----------|--------|------|------|
| Psychometric (Big Five questionnaire) | Administer BFI-2/MBTI to LLM, compare to target | Standardized, comparable across studies | Tests LLM as "survey respondent", not as character |
| Behavioral (dialogue analysis) | Analyze actual responses for trait expression | Ecologically valid, tests real behavior | Harder to standardize, more subjective |
| Interview-based (InCharacter) | Structured psychological interview | Deep, nuanced assessment | Expensive, slow, not scalable |
| Scenario-based (PTCBench) | Test personality under 12 scenario types | Tests contextual stability | Doesn't capture open-ended interaction |

### 4.2 Inconsistency Sources

| Source | Description | Measurable? |
|--------|-------------|-------------|
| Context dilution | Personality signal weakens as context grows | ⚠️ PTCBench shows shift under context; exact per-token rates not published |
| Cross-model drift | Different backend models express persona differently | ⚠️ Plausible from PTCBench, never directly tested |
| Topic shift | Personality expression changes với topic | ✅ Yes (PTCBench, 12 scenario types) |
| Session boundary | Personality resets across sessions | ⚠️ Partially studied |
| Memory contradiction | Conflicting memories cause inconsistent behavior | ✅ Yes (FactConsolidation) |
| Emotion state | Current emotion overrides baseline personality | ⚠️ Unknown (no controlled study) |

---

## 5. Relationship Evaluation Approaches

### 5.1 Self-Report vs Behavioral vs Physiological

| Method | Examples | Pros | Cons |
|--------|----------|------|------|
| Self-report (surveys) | Loneliness scale, attachment scale, trust scale | Easy to administer, validated instruments | Social desirability bias, self-selection bias |
| Behavioral | Message frequency, session length, continuation rate | Objective, continuous | Confounded by many factors |
| Physiological | EEG, heart rate, skin conductance | Hard to fake, real-time | Expensive, lab-bound, not scalable |
| LLM-judge | LLM evaluates relationship quality from transcripts | Cheap, fast | Unvalidated for this purpose |

### 5.2 What Predicts Relationship Success?

| Predictor | Effect Size | Study |
|-----------|------------|-------|
| Usage frequency → Attachment | β = 0.44 | Liu et al. (2026) |
| Anthropomorphism → Social spillover | Mediated effect | De Freitas et al. (2025) |
| Baseline desire-to-connect → Benefit | Moderator | De Freitas et al. (2025) |
| Social presence → Trust | Mediated | Lee & Sun (2022) |
| Emotional experience → Trust | Mediated | Lee & Sun (2022) |

**Key insight:** The RCT found NO population-level effect, but the effect IS real for a specific subgroup (high desire-to-connect, mediated by anthropomorphism). This means relationship quality is not uniform across users.

### 5.3 Negative Relationship Effects

| Effect | Finding | Study |
|--------|---------|-------|
| Sycophancy | Increases AI advice-seeking, lowers real-world social satisfaction | Ibrahim et al. (2026) |
| Identity discontinuity | Major updates cause users to feel AI is "a different person" | Replika study (2024) |
| Emotional dependence | Excessive time use, interference with real life | Rise of AI Companions (2025) |
| Distorted expectations | Unrealistic expectations of human relationships | Same source |

---

## 6. Emotion Evaluation Approaches

### 6.1 Current State: Weakest Evidence Base

| Question | Answer | Evidence Strength |
|----------|--------|-------------------|
| Can LLMs recognize emotion? | Yes, reasonably well in single-turn | Medium |
| Can LLMs generate appropriate emotional responses? | Sometimes rated more empathic than humans | Low (ecological concern) |
| Does explicit emotion-state modeling help? | **Unknown** — no controlled ablation exists | None |
| Is continuous emotion tracking important? | Benchmark (AttuneBench) built specifically because prior work only tested isolated turns | Emerging |

### 6.2 Emotion Benchmarks Compared

| Benchmark | What it tests | Limitation |
|-----------|--------------|------------|
| EmpatheticDialogues | Single-turn emotion classification | Static, no trajectory |
| EmoBench | Emotion recognition in dialogue | Turn-level, not continuous |
| HEART | Human-vs-LLM emotional support quality | Text-only, decontextualized |
| AttuneBench | Continuous emotion tracking across multi-turn | New, chưa widely adopted |
| ES-MemEval | Personalized long-term emotional support | Combined với memory eval |

---

## 7. Adaptation vs Identity Drift

### 7.1 The Core Question

> "Character thay đổi bao nhiêu vẫn được coi là cùng một Character?"

This question has no quantitative answer in the current literature.

### 7.2 What We Know

| Finding | Source |
|---------|--------|
| Personality traits shift substantially under situational context | PTCBench (2026) |
| Shift magnitude varies by model architecture | PTCBench (2026) |
| Responses converge toward non-persona baselines after 100+ turns | De Araujo et al. (2025) |
| Multi-turn RL reduces inconsistency by >55% | Abdulhai et al. (2025) |
| Personality half-life (hybrid): 22.4 days | Drift analysis |
| Famous characters lose advantage in multi-turn | Fame Fades, Nature Remains (2026) |

### 7.3 What We Don't Know

- The threshold at which "adaptation" becomes "drift"
- Whether users can detect the same drift that psychometric tests detect
- How to measure "healthy evolution" vs "unhealthy drift"
- Whether there is a principled way to decompose: Total Change = Drift + Evolution + Adaptation

---

## 8. Personalization Metrics

### 8.1 Measuring Personalization Quality

| Metric | Description | Method |
|--------|-------------|--------|
| Preference learning accuracy | Correctly inferred user preferences | Test on held-out preference questions |
| Response personalization score | Degree to which response references user-specific info | LLM-judge or human |
| Surprise reduction | User feels "this system knows me" | Self-report Likert scale |
| Relevance retention | % of personalized content retained over time | Automated tracking |

### 8.2 Personalization vs Consistency Trade-off

```
                    Consistency
                        ↑
                        │
          High personal- │  * Hybrid (best balance)
          ization, low   │ * Learned (high consistency)
          consistency    │
                        │
    ────────────────────┼────────────────────→ Personalization
                        │
          Low personal- │  * Prompt (low both)
          ization, high │ * Context-only
          consistency   │
                        │
                        * State-based (medium-high personalization)
                        
```

**Finding:** There is a tension between personalization (adapting to user) and consistency (staying the same character). Optimal position depends on product goals.

---

## 9. Long-term Stability Metrics

### 9.1 Available Metrics (and Their Limits)

| Metric | What it captures | Time scope tested |
|--------|-----------------|-------------------|
| Big Five correlation drift | Personality stability | Up to 30 days (estimated) |
| Memory accuracy decay | Recall stability | Up to 500 sessions (LongMemEval-M) |
| Relationship quality decay | Trust/attachment over time | Up to 2 years (Skjuve et al.) |
| User retention rate | Product-level stability | Production data |
| Identity contradiction rate | Internal consistency | Short-term only |

### 9.2 The 90-Day Gap

No benchmark or study exists that measures ALL of the following simultaneously over 90+ days:
- Personality consistency
- Memory accuracy
- Relationship quality
- User satisfaction
- Behavioral adaptation

This is the single most important gap for Aivora's evaluation framework.

---

## 10. Summary Comparison Matrix

| Dimension | Automatic | Human | Behavioral Task | Longitudinal Study |
|-----------|-----------|-------|-----------------|-------------------|
| **Personality** | ✅ (LLM-judge, ~69%) | ✅ (90.8%) | ⚠️ Partial | ❌ Limited |
| **Identity** | ⚠️ Unvalidated | ✅ | ✅ | ❌ Limited |
| **Memory** | ✅ (recall-focused) | ✅ | ✅ (task-based) | ⚠️ Sparse |
| **Relationship** | ❌ Not applicable | ✅ | ⚠️ Indirect | ✅ (but short) |
| **Emotion** | ⚠️ Emerging | ✅ | ⚠️ Limited | ❌ None |
| **Behavior** | ✅ | ✅ | ✅ Best | ⚠️ Partial |
| **Adaptation** | ⚠️ Emerging | ✅ | ⚠️ Limited | ❌ None |
| **Satisfaction** | ⚠️ LLM can simulate | ✅ Gold standard | N/A | ✅ Best |

---

## 11. Recommendations for Aivora Evaluation Framework

1. **Hybrid evaluation:** Use LLM-judge for daily monitoring + human spot-check (5-10%) for calibration
2. **Multi-benchmark:** Don't rely on a single benchmark — test on LongMemEval (recall), LifeBench (reasoning), và CharacterBench (persona)
3. **Longitudinal from day one:** Instrument production from launch with weekly personality+memory+relationship scores
4. **Human calibration baseline:** Before trusting any automatic metric, establish human-grounded baselines
5. **Track the 90-day gap:** Build internal longitudinal evaluation specifically for the un-benchmarked 30-180 day range
6. **Don't over-index on vendor numbers:** Treat Mem0's 92.5% as upper bound, not ground truth
7. **Measure forgetting explicitly:** Include FactConsolidation-style tests, not just recall accuracy
8. **Segment users:** Relationship benefits are not uniform — segment by baseline traits (desire-to-connect)

---

## References

1. Zhou et al. (2025). PersonaEval. arXiv:2508.10014
2. Wu et al. (2024). LongMemEval. arXiv:2410.10813
3. Hu, Wang & McAuley (2026). MemoryAgentBench. OpenReview: DT7JyQC3MR
4. Chen/He et al. (2026). LifeBench. arXiv:2603.03781
5. De Freitas et al. (2025). Companion RCT. arXiv:2509.19515
6. Liu et al. (2026). Attachment study. Frontiers in Psychology
7. PTCBench (2026). arXiv:2602.00016
8. Abdulhai et al. (2025). Multi-turn RL. arXiv:2511.00222
9. Nature HSSC (2025). Meta-analysis.
10. Pakhomov et al. (2025). Convomem. arXiv:2511.10523
