# Evidence Database — Aivora Lab

## Evidence đã trích xuất từ domain research (45 files, 9,761 lines)

---

## MEMORY Domain

| ID | Paper | Year | Dataset | N | Model | Baseline | Metric | Result | Ablation | Human Eval | Limitation | Evidence Type | Source |
|----|-------|------|---------|---|-------|----------|--------|--------|----------|------------|------------|-------------|--------|
| E-MEM-001 | Memory Retrieval Benchmark | 2024 | Custom | - | Keyword/Vector/LLM/Hybrid | - | Accuracy@1/5/10, F1 | Hybrid 91% F1 | - | - | Synthetic benchmark | [EVIDENCE] | papers/memory/ |
| E-MEM-002 | Embedding Model Comparison | 2024 | MTEB | - | text-embedding-ada-002/bge-m3/nomic/e5 | - | MTEB score, retrieval accuracy, latency | bge-m3: 84% acc, 32ms | - | - | Benchmark study | [EVIDENCE] | papers/memory/ |
| E-MEM-003 | Chunking Strategies | 2024 | Custom | - | Fixed/Semantic/Recursive/Parent-child | - | Recall@10, Precision@10, latency | Parent-child: 85% recall | - | - | Engineering study | [EVIDENCE] | papers/memory/ |
| E-MEM-004 | Pinecone Benchmarks | 2024 | Pinecone | 100K-100M | HNSW/IVF-PQ | - | Recall@100, QPS, latency | 100K: 98% recall, 8500 QPS | - | - | Vendor benchmark | [EVIDENCE] | papers/memory/ |
| E-MEM-005 | Hybrid Search for Enterprise | 2024 | Custom | - | BM25/Vector/RRF/LLM-rerank | BM25-only | Recall@5, Precision@5, NDCG@10 | BM25+Vector+LLM: 89% recall, 0.91 NDCG | - | - | System comparison | [EVIDENCE] | papers/memory/ |
| E-MEM-006 | LongMemEval (Wu et al.) | 2024 | LongMemEval | - | GPT-4o (offline/online) | Oracle reading | Accuracy | Offline: 92%, Online: 57.7%, Coze: 32.9% | - | - | Interactive setting gap | [EVIDENCE] | papers/evaluation/ |
| E-MEM-007 | LoCoMo Benchmark | 2024 | LoCoMo | - | Mem0 (vendor/independent) | - | Accuracy | Vendor: 92.5%, Independent: 61.43% | CONFLICT | - | Vendor vs academic discrepancy | [EVIDENCE] | papers/evaluation/ |
| E-MEM-008 | LifeBench (Chen/He et al.) | 2026 | LifeBench | - | MemOS, Hindsight | - | Accuracy, generalization gap | MemOS: 55.22% (vs ~90% LoCoMo), drop 34.78pp | - | - | Generalization gap | [EVIDENCE] | papers/evaluation/ |
| E-MEM-009 | FactConsolidation (MemoryAgentBench) | 2026 | MemoryAgentBench | - | HippoRAG-v2 | - | Single-hop accuracy | 54.0% | - | - | Forgetting mechanism | [EVIDENCE] | papers/evaluation/ |

---

## PERSONALITY Domain

| ID | Paper | Year | Dataset | N | Model | Baseline | Metric | Result | Ablation | Human Eval | Limitation | Evidence Type | Source |
|----|-------|------|---------|---|-------|----------|--------|--------|----------|------------|------------|-------------|--------|
| E-PER-001 | Chen et al. (PersonaBench) | 2024 | PersonaBench | 100 personas | GPT-4 + persona prompt/fine-tuned | Baseline prompt | Big Five correlation, MBTI accuracy | Fine-tuned: r=0.73, MBTI 72% | - | rater agreement κ=0.82 | - | [EVIDENCE] | papers/personality/ |
| E-PER-002 | Wang et al. | 2024 | Custom | - | LLaMA-2-7B + LoRA | - | Big Five correlation, MBTI | r=0.78, MBTI 76% | - | - | - | [EVIDENCE] | papers/personality/ |
| E-PER-003 | Liu et al. (Multi-Persona LLM) | 2024 | Custom | - | Multi-Persona LLM | - | Big Five correlation, MBTI accuracy | r=0.81, MBTI 80% | - | - | Cross-domain | [EVIDENCE] | papers/personality/ |
| E-PER-004 | Xu et al. | 2024 | Custom | - | Hybrid approach | - | Cross-turn consistency | Hybrid: 0.85 mean r | - | Naturalness 4.2/5 | - | [EVIDENCE] | papers/personality/ |
| E-PER-005 | Context Length Study | 2024 | Custom | - | Prompt/State/Learned | - | Consistency at different context lengths | Prompt: 0.74→0.25 (1K→32K), Learned: 0.88→0.80 | - | - | Context dilution | [EVIDENCE] | papers/personality/ |
| E-PER-006 | Temporal Stability Study | 2024 | Custom | - | Prompt/State/Learned | - | Personality drift over 30 days | Prompt: -0.23, State: -0.08, Learned: -0.06 | - | - | Long-term | [EVIDENCE] | papers/personality/ |
| E-PER-007 | Recovery from Context Loss | 2024 | Custom | - | Prompt reset/Memory recall/Learned/Hybrid | - | Recovery score after 10 turns | Hybrid: 0.89, Learned: 0.85, Memory: 0.72 | - | - | Resilience | [EVIDENCE] | papers/personality/ |

---

## EMOTION Domain

| ID | Paper | Year | Dataset | N | Model | Baseline | Metric | Result | Ablation | Human Eval | Limitation | Evidence Type | Source |
|----|-------|------|---------|---|-------|----------|--------|--------|----------|------------|------------|-------------|--------|
| E-EMO-001 | Demirtas et al. (GoEmotions) | 2020 | GoEmotions | 56K | Fine-tuned BERT | - | micro-F1, accuracy | ~82-85% F1 (31 classes), ~90% (6 classes) | - | - | Text-only | [EVIDENCE] | papers/emotion/ |
| E-EMO-002 | ISEAR Dataset | 2020 | ISEAR | - | SVM | - | Accuracy | ~75% | - | Cross-cultural | [EVIDENCE] | papers/emotion/ |
| E-EMO-003 | SemEval-2018 Task 1 | 2018 | SemEval | - | Ensemble | - | F1 (multilingual) | ~62% | - | Multilingual | [EVIDENCE] | papers/emotion/ |
| E-EMO-004 | MELD Dataset | 2019 | MELD | - | Multi-modal fusion / Text-only BERT | - | Accuracy, F1 | Multi-modal: ~85%/~82%, Text-only: ~78%/~75% | - | TV show dialogues | [EVIDENCE] | papers/emotion/ |
| E-EMO-005 | IEMOCAP Dataset | 2019 | IEMOCAP | - | CRF+Deep Features / Hierarchical BiLSTM | - | Accuracy, F1 | CRF: ~72%/~70%, BiLSTM: ~70%/~68% | - | Acted dialogues | [EVIDENCE] | papers/emotion/ |
| E-EMO-006 | GPT-4 Zero-shot Emotion | 2024 | GoEmotions | - | GPT-4 (zero-shot) | - | Accuracy | ~75% | - | Positive bias observed | [EVIDENCE] | papers/emotion/ |
| E-EMO-007 | LLM Emotion Naturalness | 2024 | Custom | - | ChatGPT/Claude | - | Naturalness (1-5), Consistency | Naturalness: 4.2/5, Consistency: ~65% | Human: 4.8/5 | LLM positive bias | [EVIDENCE] | papers/emotion/ |
| E-EMO-008 | Multi-modal Fusion Gain | 2024 | MELD/IEMOCAP | - | Text+Speech / Text+Speech+Vision | Text-only | Accuracy gain | +7% (text+speech), +6% (full modal) | - | Modality availability | [EVIDENCE] | papers/emotion/ |

---

## RELATIONSHIP Domain

| ID | Paper | Year | Dataset | N | Model | Baseline | Metric | Result | Ablation | Human Eval | Limitation | Evidence Type | Source |
|----|-------|------|---------|---|-------|----------|--------|--------|----------|------------|------------|-------------|--------|
| E-REL-001 | Gillath et al. | 2021 | Custom | N=312 | - | - | Trust-Relationship持续性 correlation | r=0.54*** | - | - | Attachment theory | [EVIDENCE] | papers/relationship/ |
| E-REL-002 | Yang & Oshio | 2025 | Custom | N=428 | - | - | Trust correlation, Intimacy correlation | r=0.52***, r=0.39*** | - | - | - | [EVIDENCE] | papers/relationship/ |
| E-REL-003 | Ng et al. | 2026 | Custom | N=567 | - | - | Trust correlation, Intimacy correlation | r=0.43***, r=0.31** | - | - | Largest sample | [EVIDENCE] | papers/relationship/ |
| E-REL-004 | Cheng et al. | 2026 | Custom | N=289 | - | - | Trust-Relationship, Trust-Intimacy | r=0.58***, r=0.52*** | - | - | Strongest effects | [EVIDENCE] | papers/relationship/ |
| E-REL-005 | Sharpe & Ciriello | 2024 | Custom | - | Regression model | - | β weights for attachment styles | Secure: β=0.31 (trust), Anxious: β=0.47 (intimacy), Avoidant: β=-0.31 (intimacy) | R²=0.34 | - | Attachment theory | [EVIDENCE] | papers/relationship/ |
| E-REL-006 | Zhao & Li | 2026 | Custom | - | Path analysis | - | Familiarity-Self-disclosure correlation | r=0.61*** (breadth), r=0.54*** (depth) | Mediation effect=0.29 | - | - | [EVIDENCE] | papers/relationship/ |
| E-REL-007 | Ananny et al. | 2018 | Simulation | - | Simulation | - | Trust change after error,修复 effect | Error: -23 to -37%, Repair: -40% loss reduction | Exponential recovery | - | - | [EVIDENCE] | papers/relationship/ |
| E-REL-008 | Bickmore & Picard | 2005 | Longitudinal | N=52 | Relational agent | - | Relationship metrics over 12 weeks | Satisfaction: 3.1→4.3/5, Trust: 3.2→4.4/5, Retention: 78%→91% | Churn 22% in first 2 weeks | - | Foundational | [EVIDENCE] | papers/relationship/ |
| E-REL-009 | Yang & Oshio | 2025 | 4-week tracking | N=200 | AI chatbot users | - | Weekly change in trust, attachment, familiarity | Familiarity: +24% over 4 weeks, Trust: +19% | - | - | [EVIDENCE] | papers/relationship/ |

---

## MULTI-AGENT Domain

| ID | Paper | Year | Dataset | N | Model | Baseline | Metric | Result | Ablation | Human Eval | Limitation | Evidence Type | Source |
|----|-------|------|---------|---|-------|----------|--------|--------|----------|------------|------------|-------------|--------|
| E-MA-001 | Stanford Generative Agents | 2023 | Virtual Town (37x larger than Smithville) | 25 agents | LLM-based agents | - | Behavioral richness, social phenomena observed | 5 emergent phenomena: friendship, romance, gossip, secrecy, social norms | - | - | 2-week simulation | [EVIDENCE] | papers/multi-agent/ |
| E-MA-002 | CAREB-MAS | 2026 | Custom simulation | Multiple | LLM agents | - | Emergent social phenomena count | 5 phenomena: labor specialization, guanxi ethics, clan stratification, punishment mechanisms, reputation systems | - | - | >1 week simulation | [EVIDENCE] | papers/multi-agent/ |
| E-MA-003 | Agent Count Study | 2024 | Custom | - | Various | - | Coordination efficiency vs agent count | Optimal: 5-7 agents, overhead >50% beyond 7 | - | - | - | [EVIDENCE] | papers/multi-agent/ |
| E-MA-004 | Architecture Comparison | 2024 | Custom | - | Centralized/Decentralized/Hybrid | - | Conversation quality, coordination efficiency | Hybrid: best balance | - | - | - | [EVIDENCE] | papers/multi-agent/ |

---

## CONTEXT/PROMPT Domain

| ID | Paper | Year | Dataset | N | Model | Bas baseline | Metric | Result | Ablation | Human Eval | Limitation | Evidence Type | Source |
|----|-------|------|---------|---|-------|-------------|--------|--------|----------|------------|------------|-------------|--------|
| E-CTX-001 | LongLLMLingua | 2024 | Custom | - | LLM + compression | Naive context | Token reduction, accuracy retention | 60% token reduction, -2% accuracy | - | - | Context compression | [EVIDENCE] | papers/context-prompt/ |
| E-CTX-002 | Self-RAG | 2024 | Multiple benchmarks | - | LLM + retrieval | No retrieval | Accuracy improvement | +5% accuracy with retrieval | - | - | Adaptive retrieval | [EVIDENCE] | papers/context-prompt/ |
| E-CTX-003 | GraphRAG | 2024 | Large documents | - | LLM + knowledge graph | Vector RAG | Reasoning accuracy, hallucination rate | +8% accuracy, reduced hallucination | - | - | Complex reasoning | [EVIDENCE] | papers/context-prompt/ |
| E-CTX-004 | OPRO | 2023 | Custom | - | LLM-as-optimizer | Manual prompt | Task performance improvement | Significant improvement on reasoning tasks | - | - | Automated prompt optimization | [EVIDENCE] | papers/context-prompt/ |
| E-CTX-005 | RGB Benchmark | 2023 | RGB dataset | - | Various RAG systems | - | Retrieval quality, generation quality | Baseline for RAG evaluation | - | - | Benchmark | [EVIDENCE] | papers/context-prompt/ |
| E-CTX-006 | GPTScore | 2023 | Custom | - | GPT-4 as judge | Human evaluation | Correlation with human judgment | High correlation (r>0.8) | - | - | LLM-as-judge | [EVIDENCE] | papers/context-prompt/ |

---

## ROLE-PLAYING Domain

| ID | Paper | Year | Dataset | N | Model | Baseline | Metric | Result | Ablation | Human Eval | Limitation | Evidence Type | Source |
|----|-------|------|---------|---|-------|----------|--------|--------|----------|------------|------------|-------------|--------|
| E-RP-001 | RoleBench (Role-Agent) | 2024 | RoleBench | 10K conversations, 500 characters | Various | - | Consistency Score, Memory Recall, Style Drift | Baseline for role-playing evaluation | - | κ=0.82 inter-rater | - | [EVIDENCE] | papers/role-playing/ |
| E-RP-002 | ChatTwins | 2024 | Custom | 2.5K conversations, 120 characters | - | - | Consistency, personalization | Evaluated on custom dataset | - | - | - | [EVIDENCE] | papers/role-playing/ |
| E-RP-003 | Long-term Consistency Study | 2024 | Custom | 800 conversations, 50 characters, 200 turns avg | Prompt-only / Memory-aug / Graph-memory | - | Consistency over turns | Prompt: 94%→27%, Graph-memory: 94%→65% at turn 500 | - | - | Drift quantification | [EVIDENCE] | papers/role-playing/ |
| E-RP-004 | DREAM (2026) | 2026 | Custom | - | Graph-memory agent | Memory-augmented | Consistency@500 turns | 65% vs 58% (memory-aug) vs 27% (prompt-only) | - | - | Best performing | [EVIDENCE] | papers/role-playing/ |
| E-RP-005 | 3 Root Causes Study | 2024 | Analysis | - | - | - | Context dilution, mirroring effect, memory overflow | Quantified drift rates | - | - | Mechanism identification | [EVIDENCE] | papers/role-playing/ |

---

## WORLD-SIMULATION Domain

| ID | Paper | Year | Dataset | N | Model | Baseline | Metric | Result | Ablation | Human Eval | Limitation | Evidence Type | Source |
|----|-------|------|---------|---|-------|----------|--------|--------|----------|------------|------------|-------------|--------|
| E-WS-001 | Voyager | 2024 | Minecraft | 1 agent | LLM + code execution | - | Items collected, skills learned | 3.3× more items, 56 skills | - | - | Single agent | [EVIDENCE] | papers/world-simulation/ |
| E-WS-002 | CharacterBox | 2025 | Custom | - | Persistent character system | - | Consistency over 200 turns | 78% consistency | - | - | - | [EVIDENCE] | papers/world-simulation/ |
| E-WS-003 | GenSim | 2025 | Virtual world | 100K agents | LLM agents | - | Scalability, social behaviors | 100K agents simulated | - | - | Scale record | [EVIDENCE] | papers/world-simulation/ |
| E-WS-004 | CAREB-MAS | 2026 | Custom | - | LLM agents in simulated society | - | Emergent social phenomena | 5 phenomena observed | - | - | Social simulation | [EVIDENCE] | papers/world-simulation/ |

---

## EVALUATION Domain

| ID | Paper | Year | Dataset | N | Model | Baseline | Metric | Result | Ablation | Human Eval | Limitation | Evidence Type | Source |
|----|-------|------|---------|---|-------|----------|--------|--------|----------|------------|------------|-------------|--------|
| E-EVAL-001 | BIG5-bench (PersonaBench) | 2024 | PersonaBench | 100 personas | GPT-4, Claude 3, Gemini, LLaMA-3 | - | Big Five correlation, drift per day | Claude 3: mean r=0.72, GPT-4: 0.70, Gemini: 0.67, LLaMA-3: 0.61 | - | - | First personality benchmark | [EVIDENCE] | papers/evaluation/ |
| E-EVAL-002 | MemoRL (Wu et al.) | 2024 | Custom | - | With/without memory | - | Cross-turn consistency | 100 turns: 0.58 (no memory) → 0.82 (with memory), +24pp | - | - | Memory effect | [EVIDENCE] | papers/evaluation/ |
| E-EVAL-003 | MBTI Consistency (Liu et al.) | 2024 | Custom | - | Multi-Persona LLM | - | Type accuracy, Kappa, F1 | Mean accuracy: 77%, Kappa: 0.69, F1: 0.73 | - | - | Type-level analysis | [EVIDENCE] | papers/evaluation/ |
| E-EVAL-004 | DreamCatcher (Kim et al.) | 2023 | Longitudinal | N=500 users, 30 days | Episodic memory system | - | Memory accuracy over time | 1.3pp decay/day | - | - | Longitudinal | [EVIDENCE] | papers/evaluation/ |
| E-EVAL-005 | PersonaEval (Zhou et al.) | 2025 | Custom | - | GPT-4o (LLM judge) | Human participants | Speaker-ID accuracy | Human: 90.8%, GPT-4o: ~69%, gap -21.8pp | - | - | LLM judge limitation | [EVIDENCE] | papers/evaluation/ |
| E-EVAL-006 | RMTBench | 2025 | Custom | - | Human annotators | - | Inter-rater agreement (Cohen's kappa) | κ=0.77-0.84 (even humans disagree 16-23%) | - | - | Human evaluation noise | [EVIDENCE] | papers/evaluation/ |
| E-EVAL-007 | LongMemEval | 2024 | LongMemEval | - | GPT-4o (offline/online) | Oracle reading | Accuracy by setting | Offline: 92%, Online short: 57.7%, Online Coze: 32.9% | -34.3pp drop | - | Setting gap | [EVIDENCE] | papers/evaluation/ |
| E-EVAL-008 | LifeBench | 2026 | LifeBench | - | MemOS, Hindsight | - | Accuracy, generalization gap | MemOS: 55.22% (34.78pp drop from LoCoMo) | - | - | Generalization gap | [EVIDENCE] | papers/evaluation/ |
| E-EVAL-009 | FactConsolidation | 2026 | MemoryAgentBench | - | HippoRAG-v2 | - | Single-hop accuracy | 54.0% | - | - | Selective forgetting | [EVIDENCE] | papers/evaluation/ |
| E-EVAL-010 | Memory Decay Study | 2024 | Longitudinal | - | - | - | Memory accuracy over days | Day 1: 94%, Day 90: 58% (-1.3pp/day) | - | - | Daily decay rate | [EVIDENCE] | papers/evaluation/ |
| E-EVAL-011 | Evaluation Cost Study | 2024 | Analysis | - | Auto/Human/Hybrid | - | Cost per evaluation, accuracy | Auto: $0.01/eval (65-75%), Human: $2.50 (85-92%), Hybrid: $0.80 (80-88%) | ROI 2.5x for hybrid | - | Cost-effectiveness | [EVIDENCE] | papers/evaluation/ |
| E-EVAL-012 | Consistency-Satisfaction Correlation | 2024 | Studies meta-analysis | - | - | - | Correlation between consistency and satisfaction | r=0.82, p<0.001 | - | - | Key relationship | [EVIDENCE] | papers/evaluation/ |

---

## Summary Statistics

| Domain | Evidence Count | Key Finding |
|--------|---------------|-------------|
| Memory | 9 | Hybrid approach optimal (91% F1) |
| Personality | 7 | Hybrid consistency 0.85, learned 0.81 |
| Emotion | 8 | Hybrid architecture recommended |
| Relationship | 9 | Trust strongest predictor (β=0.43-0.58) |
| Multi-Agent | 4 | Emergent behavior confirmed, optimal 5-7 agents |
| Context-Prompt | 6 | LongLLMLingua: 60% token reduction |
| Role-Playing | 5 | Drift quantified: 94%→27% (prompt-only, 500 turns) |
| World-Simulation | 4 | Persistent world possible but scalability challenge |
| Evaluation | 12 | Memory decay -1.3pp/day, consistency-satisfaction r=0.82 |
| **TOTAL** | **65** | |

---

*Last updated: 2026-09-03*
*Total evidence entries: 65*
*Domains covered: 9*
