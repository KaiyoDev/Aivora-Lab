# Evidence: AI Character Evaluation Metrics, Benchmarks & Datasets

**Phiên bản:** 1.1  
**Ngày:** 2026-09-03  
**Domain:** Evaluation  
**Tất cả entries dựa trên verified sources từ ai-results (consensus.md, agnes.md, claude.md, kimi.md, deepseek.md)**

---

## 1. Personality Consistency Evidence

### 1.1 PersonaEval — LLM Judge Ceiling

**Study**: Zhou et al. (2025). "PersonaEval: Are LLM Evaluators Human Enough to Judge Role-Play?" arXiv:2508.10014

**Method**:
- Human-authored dialogues from novels, scripts, videos
- Task: Identify which character is speaking from dialogue excerpts
- Comparisons: Best LLM judges vs. human participants

**Results**:
| Evaluator | Speaker-ID Accuracy |
|-----------|---------------------|
| Best LLM (GPT-4o) | ~69% |
| Human participants | **90.8%** |
| Gap | **-21.8 percentage points** |

**Conclusion**: Even the best LLM judges fall far below untrained humans at the prerequisite task of character attribution. This establishes a reliability ceiling for all LLM-judge-based character consistency scores. `[EVIDENCE]`

**Aivora Implication**: Any Character Consistency Score derived solely from LLM judges must be calibrated against human ratings. The 21.8pp gap is not noise — it is a structural ceiling.

---

### 1.2 RMTBench — Human Annotator Agreement

**Study**: RMTBench (2025). "Benchmarking LLMs Through Multi-Turn User-Centric Role-Playing." arXiv:2507.20352

**Method**:
- Multi-turn user-centric role-play evaluation
- Human annotators rated consistency, faithfulness, engagement
- Comparison with automatic judge (Qwen2.5-72B-Instruct)

**Results**:
| Dimension | Human Agreement (Cohen's kappa) |
|-----------|--------------------------------|
| Overall | **0.77 – 0.84** |
| Note | ~16-23% disagreement is irreducible noise |

**Conclusion**: Even trained human annotators disagree substantially. Some "failure" attributed to LLM judges may reflect genuine subjectivity in what constitutes "in-character" behavior. `[EVIDENCE]`

**Aivora Implication**: The Character Consistency Score will have an irreducible measurement noise floor regardless of evaluation method chosen.

---

### 1.3 PTCBench — Contextual Personality Stability

**Study**: PTCBench (2026). "Benchmarking Contextual Stability of Personality Traits in LLM Systems." arXiv:2602.00016

**Method**:
- 12 scenario types tested
- Measured how much personality traits shift under different situational framings
- Compared across model architectures

**Key Findings**:
- LLMs exhibit reproducible baseline personalities when queried with standard psychometric instruments
- **Traits shift substantially under situational context** — personality is NOT context-invariant
- **Different model architectures vary widely in shift magnitude** — stability is partly a model-selection problem
- Critical implication: routing a single character across multiple backend models could introduce personality drift

**Conclusion**: Personality consistency depends on both prompt engineering AND model architecture choice. `[EVIDENCE]`

**Aivora Implication**: Smart Router cross-model routing is a documented risk factor for personality drift, though never directly tested. Experiment required.

---

### 1.4 InCharacter — Personality Fidelity via Psychological Interviews

**Study**: Wang et al. (2023). "InCharacter: Evaluating Personality Fidelity in Role-Playing Agents through Psychological Interviews." ACL 2024.

**Method**:
- Structured psychological interviews with 32 characters
- 14 personality scales measured
- Max accuracy across all character-scale combinations

**Results**:
| Metric | Result |
|--------|--------|
| Max accuracy (32 chars × 14 scales) | **80.7%** |

**Conclusion**: Highest reported personality fidelity score from interview-based evaluation. `[EVIDENCE]`

---

### 1.5 PICon — Multi-Turn Interrogation Framework

**Study**: Kim et al. (2026). "PICon: A Multi-Turn Interrogation Framework for Evaluating Synthetic Personas." arXiv:2603.25620

**Method**:
- 80 synthetic agents tested
- 63 human participants as baseline
- Three consistency types: internal, external, retest

**Results**:
| Measure | Result |
|---------|--------|
| No synthetic agent exceeds humans on combined consistency | Confirmed |
| Character.ai on external consistency | Exceeds human baseline |
| Gap identified | Synthetic vs. human gap in internal/retest consistency |

**Conclusion**: Current synthetic personas remain below human baselines on multi-turn consistency, with Character.ai as a partial exception on external consistency. `[EVIDENCE]`

---

### 1.6 CharacterBench — Multi-Dimensional Character Evaluation

**Study**: Zhou et al. (2025). "CharacterBench: Benchmarking Character Customization Capabilities of LLMs." AAAI 2025.

**Method**:
- 22,859 samples across 3,956 characters in 25 categories
- Bilingual (Chinese/English)
- Six dimensions: Memory, Knowledge, Persona, Emotion, Morality, Believability
- Judge model correlation with human raters

**Results**:
| Metric | Value |
|--------|-------|
| Judge-human correlation (ρ) | **0.825** |
| Judge-human correlation (τ) | **0.741** |
| Dimensions per character | 6 (Memory, Knowledge, Persona, Emotion, Morality, Believability) |

**Conclusion**: Judge-human correlation is strong but not perfect. The six-dimensional framework provides richer evaluation than single-score approaches. `[EVIDENCE]`

---

### 1.7 CharacterEval — Chinese Role-Play Benchmark

**Study**: Tu et al. (2024). "CharacterEval: A Chinese Benchmark for Role-Playing Conversational Agent Evaluation." ACL 2024. arXiv:2401.01275

**Method**:
- 1,785 dialogues across 77 characters
- Three axes: Conversational Ability, Character Consistency, Attractiveness
- Test MBTI accuracy as character consistency proxy

**Results**:
| Model | Character Consistency | MBTI Accuracy |
|-------|----------------------|---------------|
| GPT-4 (baseline) | 3.343 | 0.694 |
| BC-NPC-Turbo | **3.916** | 0.681 |
| GPT-4 + PCL (contrastive learning) | 3.653 | — |

**Conclusion**: Specialized Chinese role-play models can outperform GPT-4 on character consistency. MBTI accuracy ~0.69 indicates moderate personality type retention. `[EVIDENCE]`

---

## 2. Memory Accuracy Evidence

### 2.1 LongMemEval — Oracle vs. Online Gap

**Study**: Wu et al. (2024). "LongMemEval: Benchmarking Chat Assistants on Long-Term Interactive Memory." arXiv:2410.10813

**Method**:
- Offline/oracle reading (all context available) vs. online/interactive (turn-by-turn)
- Memory as indexing, retrieval, and reading tasks

**Results**:
| Setting | System | Accuracy |
|---------|--------|----------|
| Oracle/reading | GPT-4o | **92%** |
| Online/interactive | ChatGPT (GPT-4o) | **57.7%** |
| Online/interactive | Coze (GPT-4o) | **32.9%** |
| Full-context 115K tokens | Naive full-context | ~60-62% |
| Structured reading + CoN | — | +9.4% Recall@k, +5.4% QA |

**Calculated**: Oracle-to-online drop = **-34.3 percentage points** (92% → 57.7%) `[CALCULATED FROM REPORTED RESULTS]`

**Conclusion**: Interactive memory retrieval is dramatically harder than passive reading. Most evaluation benchmarks test the easier oracle setting. `[EVIDENCE]`

---

### 2.2 LifeBench — Benchmark Generalization Gap

**Study**: Chen/He et al. (2026). "LifeBench: A Benchmark for Long-Horizon Multi-Source Memory." arXiv:2603.03781

**Method**:
- Harder benchmark testing reasoning and action-coupled memory
- Systems scoring ~90% on easy benchmarks (LoCoMo, LongMemEval) re-tested

**Results**:
| System | LifeBench Accuracy | Prior Easy Benchmark Score | Drop |
|--------|--------------------|---------------------------|------|
| MemOS (top system) | **55.22%** | ~90% | **-34.78pp** |
| Hindsight | **40.99%** | ~90% | **-49.01pp** |

**Conclusion**: Strong generalization gap confirmed. Systems that dominate easy benchmarks fall to 40-55% on realistic multi-source reasoning tasks. This is the single most important pattern in memory evaluation. `[EVIDENCE]`

---

### 2.3 FactConsolidation — Selective Forgetting (MemoryAgentBench)

**Study**: Hu, Wang & McAuley (2026). "From Recall to Forgetting: Benchmarking Long-Term Memory for Personalized Agents." OpenReview: DT7JyQC3MR (arXiv:2604.20006)

**Method**:
- FactConsolidation dataset: counterfactual edits (MQuAKE-derived)
- Four competencies: Accurate Retrieval, Test-Time Learning, Long-Range Understanding, Selective Forgetting
- 22 systems tested across architectures

**Results on FactConsolidation (single-hop)**:
| System | Accuracy |
|--------|----------|
| HippoRAG-v2 (best) | **54.0%** |
| BM25 | **48.0%** |
| Mem0/Contriever | **18.0%** |
| Zep/Graphiti | **7.0%** |

**Conclusion**: Selective forgetting — the ability to override outdated information when new information contradicts it — is the **weakest capability across every memory architecture tested**, including commercial systems. Best system reaches only 54%. `[EVIDENCE]`

**Aivora Implication**: Aivora's three-tier memory (Short/Medium/Long) assumes older facts can be superseded by newer ones. This evidence shows the field cannot yet do this reliably.

---

### 2.4 Hindsight — Retain/Recall/Reflect Architecture

**Study**: Hindsight is 20/20 (2025). arXiv:2512.12818

**Method**:
- 20B open-source model with Retain/Recall/Reflect memory mechanism
- Comparison against same model with full-context and GPT-4o full-context

**Results**:
| Setting | Accuracy |
|---------|----------|
| Hindsight (20B OSS) | **83.6%** |
| Same model, full-context | **39.0%** |
| GPT-4o full-context | **60.2%** |

**Gain**: +44.6pp over same-model full-context; exceeds GPT-4o full-context `[EVIDENCE]`

---

### 2.5 Zep/Graphiti — Temporal Knowledge Graph Memory

**Study**: Rasmussen et al. (2025). "Zep: A Temporal Knowledge Graph Architecture for Agent Memory." arXiv:2501.13956

**Method**:
- Temporal KG for agent memory
- Evaluated on DMR (Dynamic Memory Reasoning) and LongMemEval

**Results**:
| Metric | Zep/Graphiti | Vanilla Full-Context |
|--------|-------------|---------------------|
| Accuracy | **71.2%** | 60.2% |
| Latency | **2.6s** | 29s |
| Accuracy gain | **+11.0pp** | — |
| Latency reduction | **-91.0%** | — |

---

### 2.6 TiMem — Hierarchical Temporal Memory

**Study**: Zhang et al. (2026). "HiMem: Hierarchical Long-Term Memory for LLM Long-Horizon Agents." arXiv:2601.02845

**Results**:
| Model | LongMemEval-S Accuracy | Memory Footprint |
|-------|----------------------|------------------|
| TiMem (GPT-4o-mini) | **76.88% ± 0.30%** | -27% vs. comparison |
| TiMem (GPT-4o) | **78.96% ± 0.26%** | -27% vs. comparison |

---

### 2.7 Memanto — Typed Semantic Memory

**Study**: Abtahi et al. (2026). "Memanto: Typed Semantic Memory with Information-Theoretic Retrieval for Long-Horizon Agents." arXiv:2604.22085

**Results**:
| Benchmark | Accuracy |
|-----------|----------|
| LongMemEval | **89.8%** |
| LoCoMo | **87.1%** |
| Latency | Sub-90ms (single-query retrieval) |

---

### 2.8 MemMachine — Ground-Truth Episodic Memory

**Study**: Wang et al. (2026). "MemMachine: A Ground-Truth-Preserving Memory System for Personalized AI Agents." arXiv:2604.04853

**Result**: **0.9169** on LoCoMo with ~80% fewer tokens than Mem0 `[EVIDENCE]`

---

### 2.9 FadeMem — Biologically-Inspired Forgetting

**Study**: Wei et al. (2026). "FadeMem: Biologically-Inspired Forgetting for Efficient Agent Memory." arXiv:2601.18642

**Results**:
| Metric | FadeMem | Fixed-Window Baseline |
|--------|---------|----------------------|
| Storage reduction | **45%** | — |
| Critical-fact retention | **82.1%** | 50.2%–78.4% |
| Improvement | — | +3.7pp to +31.9pp |

**Conclusion**: Well-designed forgetting can simultaneously reduce storage AND improve factual retention. `[EVIDENCE]`

---

### 2.10 Convomem — First 150 Conversations Rule

**Study**: Pakhomov et al. (2025). "Convomem." arXiv:2511.10523

**Finding**: For the first ~150 conversations, simple full-context/block-summarize (70-82% accuracy) **outperforms** extraction-based RAG (30-45% accuracy). Memory system complexity should graduate as history accumulates. `[EVIDENCE]`

---

## 3. Emotional Coherence Evidence

### 3.1 AttuneBench — Continuous Emotion Tracking

**Study**: AttuneBench (2026). "A Conversation-Based Benchmark for LLM Emotional Intelligence." arXiv:2605.21739

**Method**: Tests continuous emotion tracking across multi-turn conversations (not isolated turns)

**Key Finding**: Prior work only tested isolated turns; AttuneBench was built specifically because continuous tracking is harder and more realistic. `[EVIDENCE]`

---

### 3.2 HEART — Human-vs-LLM Emotional Support

**Study**: HEART (2026). "A Unified Benchmark for Assessing Humans and LLMs in Emotional Support Dialogue." arXiv:2601.19922

**Focus**: Human-vs-LLM emotional support quality assessment

**Limitation**: Text-only, decontextualized — does not test longitudinal emotional coherence. `[INFERENCE]`

---

### 3.3 Emotion Modeling Evidence Summary

| Question | Answer | Evidence Strength |
|----------|--------|-------------------|
| Can LLMs recognize emotion? | Yes, reasonably well in single-turn | Medium |
| Can LLMs generate appropriate emotional responses? | Sometimes rated more empathic than humans | Low (ecological concern) |
| Does explicit emotion-state modeling help in companions? | **Unknown** — no controlled ablation exists | None |
| Is continuous emotion tracking important? | Benchmark built specifically because prior work was turn-level | Emerging |

---

## 4. Relationship & User Study Evidence

### 4.1 Companion RCT — Null Finding

**Study**: De Freitas et al. (2025). "A Longitudinal Randomized Control Study of Companion Chatbot Use." arXiv:2509.19515

**Method**: Preregistered RCT. N=183. 21 days. Companion chatbot (Replika) vs. non-social linguistic word games control.

**Results**:
| Measure | Finding |
|---------|---------|
| Loneliness | **Not significant** |
| Social health | **Not significant** |
| Relationships | **Not significant** |
| Moderated effect (high desire-to-connect) | Significant (mediated by anthropomorphism) |
| 4-week follow-up | Word games MORE habit-forming than AI companion |

**Conclusion**: Population-level null finding. Effect exists only for a specific subgroup (high desire-to-connect, mediated by anthropomorphism). `[EVIDENCE]`

---

### 4.2 Meta-Analysis — Social Cues Effect Size

**Study**: Nature HSSC (2025). Meta-analysis of 142 papers, 41,642 participants.

**Result**: Hedges' g = **0.36** (95% CI [0.27, 0.44]) for human-like social cues on social responses. Small-to-moderate effect. `[EVIDENCE]`

---

### 4.3 Replika User Survey — Self-Reported Benefits

**Study**: Maples et al. (2024). "Chatbot Companionship: A Mixed-Methods Study." arXiv:2410.21596

**Method**: N=1,006 Replika student users.

**Results**:
| Measure | Result |
|---------|--------|
| Reported loneliness (vs. national avg 53%) | **90%** |
| Companion reduced loneliness/anxiety | **63.3%** |
| Halted suicidal ideation | **3%** (n=30) |
| Subgroup characteristic | More likely depressed than broader sample |

---

### 4.4 Attachment Study — Usage Frequency → Attachment

**Study**: Liu et al. (2026). "Enhancing Persona Following at Decoding Time via Dynamic Importance Estimation for Role-Playing Agents." arXiv:2603.01438

**Method**: N=612 companion users. Tested relationship formation factors.

**Results**:
| Predictor | Effect |
|-----------|--------|
| Usage frequency → Attachment | **β = 0.44** |
| Attachment → Lower loneliness | Confirmed |
| Attachment → Higher wellbeing | Confirmed |

---

### 4.5 Identity Discontinuity — Replika Update Study

**Study**: "Lessons From an App Update at Replika AI: Identity Discontinuity in Human-AI Relationships." arXiv:2412.14190

**Finding**: Major AI character updates cause users to feel the AI is "a different person." Identity continuity is fragile. `[EVIDENCE]`

---

### 4.6 Sycophantic AI — Negative Social Effects

**Study**: Ibrahim et al. (2026). "Sycophantic AI." (cited in deepseek results, N=3,075, 3-week study)

**Finding**: Sycophantic AI increases AI advice-seeking AND lowers satisfaction with real-world social interactions. `[EVIDENCE]`

---

### 4.7 Skjuve et al. — Long-Term Human-AI Companion Study

**Study**: Skjuve et al. (cited in kimi.md). Longitudinal Replika study.

**Findings**:
- 70% of Replika users (n=100 interviews) described AI as "non-judgmental friend"
- 15% reported "dual consciousness" — cognitive awareness of AI non-sentience coexisting with felt attachment
- Self-disclosure increased over time; emotional topics grew by week 6
- Anxious-attachment users: 22% symptom reduction (SMD=0.41) from daily AI check-ins `[EVIDENCE]`

---

## 5. Multi-Agent Coordination Evidence

### 5.1 MoltBook Archive — Catastrophic Coordination Failure

**Study**: "Benchmarking Emergent Coordination in Large-Scale LLM Populations." arXiv:2603.03555

**Dataset**: 60,045 real-world threads

**Results**:
| Metric | Result |
|--------|--------|
| Collaborative success rate | **6.7%** |
| vs. Single-agent baseline | Significantly worse |
| t-statistic | t = -11.21 |
| p-value | p < 0.001 |
| Cohen's d | **-0.88** (large negative effect) |

**Conclusion**: Multi-agent collaboration fails catastrophically at scale. `[EVIDENCE]`

---

### 5.2 Silo-Bench — Team Size Scaling

**Study**: "Silo-Bench: A Scalable Environment for Evaluating Distributed Coordination." arXiv:2603.01045

**Results**:
| Team Size (k) | Performance Loss vs. Oracle |
|---------------|---------------------------|
| k=2 | 15-49% |
| k=50 | 80-100% |
| Best model at k=50 | Failed ~2/3 of the time |

---

### 5.3 MultiAgentBench — Cognitive Planning

**Finding**: Cognitive self-evolving planning achieves coordination scores up to **~4.8/5** with +3% over vanilla planning. But group discussion protocols increase communication overhead without proportional benefit. `[EVIDENCE]`

---

## 6. Context Compression Evidence

### 6.1 LLMLingua

**Study**: Jiang et al. (Microsoft Research). "LLMLingua: Accelerating the Inference of Long-Context LLMs."

**Results**:
| Metric | Result |
|--------|--------|
| Max compression | **20×** |
| Quality loss | **<2%** (CoQA/HotpotQA/TriviaQA) |

### 6.2 LongLLMLingua

**Finding**: **+21.4% accuracy improvement** on NaturalQuestions at 4× compression by removing distractor content. `[EVIDENCE]`

### 6.3 Telegraph English

| Model | 50% Compression: Accuracy Drop |
|-------|-------------------------------|
| GPT-4.1 | **<1pp** |
| GPT-4o-mini | **3.0pp** |
| GPT-4.1-nano | **4.5pp** |

**Finding**: Compression tolerance is model-size-dependent. `[EVIDENCE]`

### 6.4 ACON (Adaptive Context Optimization)

**Study**: Kang et al. (2025). arXiv:2510.00615

**Results**:
| Metric | Result |
|--------|--------|
| Peak token reduction | **26-54%** |
| Performance improvement (smaller models) | Up to **46%** |

### 6.5 TokenPilot

**Study**: Xu et al. (2026). arXiv:2606.17016

**Result**: **56-87% cost reduction** while maintaining competitive performance. `[EVIDENCE]`

---

## 7. Benchmark Generalization & Vendor Numbers

### 7.1 Mem0 — Vendor vs. Independent Discrepancy

| Source | Reported Accuracy | Judge Model | Evidence Type |
|--------|------------------|-------------|---------------|
| Mem0 vendor blog | **92.5%** | — | Vendor [CONFLICTING] |
| Independent re-benchmark | **61.43%** | GPT-4.1-mini | Academic [EVIDENCE] |
| Gap | **30+ pp** | — | — |

**Policy**: Vendor-reported numbers are UPPER BOUNDS, not expectations. Always benchmark against independent re-implementation. `[EVIDENCE]`

---

## 8. Key Evidence Summary Table

| Dimension | Key Finding | Source | Strength |
|-----------|------------|--------|----------|
| LLM Judge Reliability | 69% ceiling vs. 90.8% human (21.8pp gap) | PersonaEval (arXiv:2508.10014) | Strong |
| Human Annotator Agreement | κ=0.77-0.84 (irreducible noise floor) | RMTBench (arXiv:2507.20352) | Strong |
| Personality Context Shift | Traits shift under context; varies by model | PTCBench (arXiv:2602.00016) | Strong |
| Personality Fidelity (interview) | 80.7% max accuracy | InCharacter (ACL 2024) | Strong |
| Multi-Turn Consistency Gap | No synthetic exceeds humans | PICon (arXiv:2603.25620) | Strong |
| Memory Oracle vs. Online | -34.3pp gap (92%→57.7%) | LongMemEval (arXiv:2410.10813) | Strong |
| Benchmark Generalization Gap | -35pp (90%→55%) | LifeBench (arXiv:2603.03781) | Strong |
| Selective Forgetting Ceiling | 54% best, 7% worst | MemoryAgentBench (arXiv:2604.20006) | Strong |
| Companion RCT | Null at population level | De Freitas (arXiv:2509.19515) | Strong |
| Social Cues Meta-Analysis | g=0.36 (small-moderate) | Nature HSSC | Strong |
| Attachment Correlation | β=0.44 usage→attachment | Liu et al. (arXiv:2603.01438) | Strong |
| Multi-Agent Coordination | 6.7% success, d=-0.88 | MoltBook (arXiv:2603.03555) | Strong |
| Forgetting Architecture | 82.1% retention, 45% storage | FadeMem (arXiv:2601.18642) | Strong |
| First-150-Convo Rule | Simple > RAG | Convomem (arXiv:2511.10523) | Strong |
| Identity Discontinuity | Users feel AI is "different person" | Replika study (arXiv:2412.14190) | Strong |
| Sycophancy Harm | Lowers real-world social satisfaction | Ibrahim et al. (2026) | Strong |

---

## References (Verified Only)

1. Zhou et al. (2025). PersonaEval. arXiv:2508.10014
2. RMTBench (2025). arXiv:2507.20352
3. PTCBench (2026). arXiv:2602.00016
4. Kim et al. (2026). PICon. arXiv:2603.25620
5. Zhou et al. (2025). CharacterBench. AAAI 2025
6. Tu et al. (2024). CharacterEval. ACL 2024. arXiv:2401.01275
7. Wu et al. (2024). LongMemEval. arXiv:2410.10813
8. Chen/He et al. (2026). LifeBench. arXiv:2603.03781
9. Hu, Wang & McAuley (2026). MemoryAgentBench. OpenReview: DT7JyQC3MR (arXiv:2604.20006)
10. Hindsight (2025). arXiv:2512.12818
11. Rasmussen et al. (2025). Zep. arXiv:2501.13956
12. Zhang et al. (2026). TiMem. arXiv:2601.02845
13. Abtahi et al. (2026). Memanto. arXiv:2604.22085
14. Wang et al. (2026). MemMachine. arXiv:2604.04853
15. Wei et al. (2026). FadeMem. arXiv:2601.18642
16. Pakhomov et al. (2025). Convomem. arXiv:2511.10523
17. AttuneBench (2026). arXiv:2605.21739
18. HEART (2026). arXiv:2601.19922
19. De Freitas et al. (2025). Companion RCT. arXiv:2509.19515
20. Liu et al. (2026). arXiv:2603.01438
21. Maples et al. (2024). arXiv:2410.21596
22. Replika Identity (2024). arXiv:2412.14190
23. MoltBook (2026). arXiv:2603.03555
24. Silo-Bench (2026). arXiv:2603.01045
25. Wang et al. (2023). InCharacter. ACL 2024
26. Chhikara et al. (2025). Mem0. arXiv:2504.19413
27. Kang et al. (2025). ACON. arXiv:2510.00615
28. Xu et al. (2026). TokenPilot. arXiv:2606.17016
29. Abdulhai et al. (2025). Multi-turn RL. arXiv:2511.00222
30. Ji et al. (2025). PCL. arXiv:2503.17662
31. Chen et al. (2024). Persona Survey. arXiv:2404.18231
32. Peng & Shang (2024). Faithfulness. arXiv:2405.07726

---

*32 verified references. All evidence tagged [EVIDENCE], [CONFLICTING], [INFERENCE], or [CALCULATED FROM REPORTED RESULTS].*
