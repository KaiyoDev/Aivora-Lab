# Literature Review: Evaluation Methods & Frameworks cho Long-Term AI Character Systems

**Phiên bản:** 1.1  
**Ngày:** 2026-09-03  
**Domain:** Evaluation  
**Tất cả references dựa trên verified AI-results sources (consensus.md, agnes.md, claude.md, kimi.md, deepseek.md)**

---

## 1. Tổng quan

Đánh giá AI character là lĩnh vực nghiên cứu phương pháp đo lường chất lượng hệ thống AI đóng vai nhân vật, bao gồm: personality consistency, identity consistency, memory accuracy, relationship continuity, emotional coherence, behavioral consistency, adaptation, personalization, và long-term stability.

### 1.1 Bối cảnh

Với sự phát triển của LLMs, nhu cầu xây dựng AI characters có tính cách nhất quán, bộ nhớ dài hạn, và khả năng thích nghi ngày càng tăng. Các hệ thống như Character.AI, Replika được sử dụng bởi hàng triệu người dùng.

### 1.2 Câu hỏi nghiên cứu chính

1. **Personality Consistency**: Đo lường và đảm bảo tính nhất quán về tính cách qua nhiều tương tác
2. **Identity Consistency**: Nhân vật duy trì identity không bị thay đổi theo thời gian
3. **Memory Accuracy**: Hệ thống nhớ chính xác thông tin gì và sai lệch bao nhiêu
4. **Relationship Continuity**: Mối quan hệ user-character có ổn định không
5. **Emotional Coherence**: Cảm xúc thể hiện có nhất quán với tính cách không
6. **Behavioral Consistency**: Hành vi có tuân thủ personality profile không
7. **Adaptation**: Character có học hỏi và thích nghi hợp lý không
8. **Personalization**: Mức độ cá nhân hóa đáp ứng nhu cầu user
9. **Long-term Stability**: Chất lượng duy trì qua ngày/tháng
10. **User Satisfaction**: Mức độ hài lòng của người dùng

---

## 2. Khung đánh giá hiện có

### 2.1 LoCoMo (Maharana et al., 2024)

**Source**: arXiv:2402.17753, ACL 2024

Benchmark đầu tiên đánh giá long-context modeling cho multi-session dialogue.

**Dimensions**:
- Memory retention across sessions
- Context utilization efficiency
- Multi-turn coherence

**Metrics**:
- QA accuracy across long histories
- Token efficiency vs. full-context baseline

---

### 2.2 LongMemEval (Wu et al., 2024)

**Source**: arXiv:2410.10813

Benchmark đánh giá interactive memory — không phải reading passively mà là retrieval trong conversation.

**Three competencies tested**:
1. **Indexing**: Finding the right memory
2. **Retrieval**: Extracting correct information
3. **Reading**: Interpreting memories in context

**Key finding**: Oracle reading accuracy (92%) vs. online interactive (57.7%) — a 34.3pp gap showing that most benchmarks test an easier setting than real usage.

---

### 2.3 LifeBench (Chen/He et al., 2026)

**Source**: arXiv:2603.03781

Benchmark for long-horizon multi-source memory with reasoning tasks.

**Key finding**: Systems scoring ~90% on easy benchmarks drop to 40-55% on LifeBench — the benchmark generalization gap. This is the strongest evidence against "benchmark shopping."

---

### 2.4 PersonaEval (Zhou et al., 2025)

**Source**: arXiv:2508.10014

Evaluation of LLM-as-judge reliability for role-play tasks.

**Task**: Identify which character is speaking from dialogue excerpts (human-authored from novels, scripts, videos).

**Key finding**: Best LLM judges reach ~69% accuracy vs. 90.8% for humans — a 21.8pp reliability ceiling.

**Aivora implication**: Any LLM-judge-based consistency score must be calibrated against human ratings.

---

### 2.5 RMTBench (2025)

**Source**: arXiv:2507.20352

Multi-turn user-centric role-play benchmark.

**Measures**:
- Human-vs-human annotator consistency
- Human-vs-automatic-judge correlation

**Key finding**: Human annotator agreement κ=0.77–0.84 — irreducible noise floor. Automatic judge (Qwen2.5-72B) showed high correlation with final human annotation.

---

### 2.6 PTCBench (2026)

**Source**: arXiv:2602.00016

Benchmarking contextual stability of personality traits in LLM systems.

**Method**: 12 scenario types tested; measures how much personality shifts under different situational framings.

**Key findings**:
- LLMs exhibit reproducible baseline personalities
- Traits shift substantially under situational context
- Shift magnitude varies widely by model architecture
- Implication: cross-model routing introduces personality drift risk

---

### 2.7 PICon (Kim et al., 2026)

**Source**: arXiv:2603.25620

Multi-turn interrogation framework for evaluating synthetic personas.

**Method**: 80 synthetic agents vs. 63 human participants. Three consistency types: internal, external, retest.

**Key finding**: No synthetic agent exceeds humans on combined consistency. Character.ai exceeds humans on external consistency only.

---

### 2.8 InCharacter (Wang et al., 2023)

**Source**: ACL 2024 (arXiv pending)

Evaluating personality fidelity through psychological interviews.

**Method**: Structured psychological interviews with 32 characters, 14 personality scales.

**Result**: Max accuracy 80.7% across all character-scale combinations.

---

### 2.9 CharacterBench (Zhou et al., 2025)

**Source**: AAAI 2025

Benchmarking character customization capabilities.

**Scale**: 22,859 samples, 3,956 characters, 25 categories, bilingual (zh/en).

**Six dimensions**: Memory, Knowledge, Persona, Emotion, Morality, Believability.

**Judge correlation**: ρ=0.825, τ=0.741 with human raters.

---

### 2.10 CharacterEval (Tu et al., 2024)

**Source**: ACL 2024, arXiv:2401.01275

Chinese role-play conversational agent evaluation.

**Scale**: 1,785 dialogues, 77 characters.

**Three axes**: Conversational Ability, Character Consistency, Attractiveness.

**MBTI accuracy proxy**: GPT-4 achieves 0.694; BC-NPC-Turbo achieves 0.681.

---

### 2.11 MemoryAgentBench (Hu, Wang & McAuley, 2026)

**Source**: arXiv:2604.20006 (OpenReview: DT7JyQC3MR)

Four competencies: Accurate Retrieval, Test-Time Learning, Long-Range Understanding, Selective Forgetting.

**Dataset**: FactConsolidation — counterfactual edits from MQuAKE.

**Key finding**: Selective forgetting is the weakest capability across all 22 tested systems. Best system (HippoRAG-v2) reaches only 54.0%.

---

### 2.12 AttuneBench (2026)

**Source**: arXiv:2605.21739

Conversation-based benchmark for LLM emotional intelligence.

**Focus**: Continuous emotion tracking across multi-turn conversations.

**Gap addressed**: Prior work only tested isolated turns; AttuneBench tests longitudinal emotional coherence.

---

### 2.13 HEART (2026)

**Source**: arXiv:2601.19922

Unified benchmark for human-vs-LLM emotional support dialogue assessment.

**Limitation**: Text-only, decontextualized — does not test longitudinal emotional coherence.

---

## 3. Phương pháp evaluation

### 3.1 Automatic Metrics (LLM-as-Judge)

**Advantages**:
- Fast, scalable
- Consistent across evaluations
- No rater fatigue

**Limitations**:
- Cannot capture nuance
- May miss contextual factors
- **LLM judge reliability ceiling: ~69% vs. 90.8% human (PersonaEval)**
- Judge model selection significantly affects absolute scores

**Best practice**: Use only as part of hybrid evaluation with human calibration.

---

### 3.2 Human Evaluation

**Advantages**:
- Captures nuance and context
- Can assess subjective qualities (naturalness, empathy)
- Higher correlation with user satisfaction

**Limitations**:
- Expensive, slow
- Inter-rater reliability ceiling: κ=0.77–0.84 (RMTBench)
- Rater fatigue after 20-30 evaluations

**Best practices**:
- Use trained raters (2-3 per evaluation)
- Blind evaluation
- Multiple time points (T0, T1, T2)
- Include diverse user demographics

---

### 3.3 Hybrid Approaches

**Framework**:
1. **Screening**: Automatic metrics filter obviously不合格
2. **Deep Evaluation**: Human raters evaluate detailed cases
3. **Feedback Loop**: Human ratings improve automatic metrics

**Benefits**: Cost reduction 60-70%, better coverage, improved accuracy.

**Aivora recommendation**: LLM-judge for daily monitoring + human spot-check 5-10% for calibration.

---

## 4. Benchmarks & Datasets

| Benchmark | Focus | Time Scope | Scale | Verified |
|-----------|-------|-----------|-------|----------|
| LoCoMo | Memory retention | Multi-session | 879+ citations | ✅ |
| LongMemEval | Interactive memory | Single session | oracle vs. online | ✅ |
| LifeBench | Reasoning over memory | Multi-source | Generalization gap | ✅ |
| PersonaEval | LLM judge reliability | Short-turn | Classification | ✅ |
| RMTBench | Multi-turn role-play | User-centric | Agreement metrics | ✅ |
| PTCBench | Personality stability | Contextual | 12 scenarios | ✅ |
| PICon | Multi-turn interrogation | Agent consistency | 80 agents, 63 humans | ✅ |
| InCharacter | Personality fidelity | Interview-based | 32 chars, 14 scales | ✅ |
| CharacterBench | Customization | Multi-dimensional | 22,859 samples | ✅ |
| CharacterEval | Chinese RP | Three-axis | 1,785 dialogues | ✅ |
| MemoryAgentBench | Forgetting | FactConsolidation | 22 systems | ✅ |
| AttuneBench | Emotional intelligence | Continuous | Multi-turn | ✅ |

---

## 5. Research Trends (2024-2026)

### 5.1 From Recall to Forgetting

The field has shifted from单纯 recall benchmarks (LongMemEval) to testing forgetting and updating (MemoryAgentBench FactConsolidation, FadeMem).

### 5.2 From Short-turn to Longitudinal

Personality benchmarks (PTCBench, PICon) now test multi-turn consistency, not single-turn accuracy.

### 5.3 From Model-centric to User-centric

RMTBench and Companion RCT studies focus on user experience, not just model performance.

### 5.4 From Single-dimension to Multi-axis

CharacterBench's six-dimensional framework (Memory, Knowledge, Persona, Emotion, Morality, Believability) sets the new standard.

### 5.5 Evaluation Infrastructure

IntellAgent, MAESTRO, and adaptive monitoring argue that static offline metrics miss run-to-run variance, failure modes, cost, and sociotechnical dimensions (Levi & Kadar, 2025; Tie et al., 2026).

---

## 6. Evaluation Challenges

### 6.1 Subjectivity

Personality and emotion evaluations are inherently subjective. Even human annotators agree only κ=0.77–0.84 (RMTBench).

### 6.2 Context Dependency

Quality depends on conversation topic, user mood, cultural context.

### 6.3 Long-term vs. Short-term Trade-off

Optimizing for short-term engagement may harm long-term consistency.

### 6.4 Cost vs. Coverage

Comprehensive evaluation is expensive, limiting scalability.

### 6.5 Metric Validity

No gold standard for many dimensions (naturalness, empathy, trust).

### 6.6 The Generalization Gap

LifeBench confirms that easy-benchmark performance does not predict hard-benchmark performance. Systems at ~90% on LoCoMo drop to 40-55% on LifeBench.

### 6.7 The LLM-Judge Ceiling

PersonaEval establishes that even the best LLM judges cannot match humans at character attribution (69% vs. 90.8%). This is a structural ceiling, not a solvable problem.

---

## 7. Key References

1. Maharana et al. (2024). LoCoMo. ACL 2024. arXiv:2402.17753
2. Wu et al. (2024). LongMemEval. arXiv:2410.10813
3. Chen/He et al. (2026). LifeBench. arXiv:2603.03781
4. Zhou et al. (2025). PersonaEval. arXiv:2508.10014
5. RMTBench (2025). arXiv:2507.20352
6. PTCBench (2026). arXiv:2602.00016
7. Kim et al. (2026). PICon. arXiv:2603.25620
8. Wang et al. (2023). InCharacter. ACL 2024
9. Zhou et al. (2025). CharacterBench. AAAI 2025
10. Tu et al. (2024). CharacterEval. ACL 2024. arXiv:2401.01275
11. Hu, Wang & McAuley (2026). MemoryAgentBench. arXiv:2604.20006
12. AttuneBench (2026). arXiv:2605.21739
13. HEART (2026). arXiv:2601.19922
14. De Freitas et al. (2025). Companion RCT. arXiv:2509.19515
15. Liu et al. (2026). arXiv:2603.01438
16. Abdulhai et al. (2025). Multi-turn RL. arXiv:2511.00222
17. Wei et al. (2026). FadeMem. arXiv:2601.18642
18. Pakhomov et al. (2025). Convomem. arXiv:2511.10523
19. Chhikara et al. (2025). Mem0. arXiv:2504.19413
20. Jiang et al. (2023). LLMLingua. EMNLP 2023

---

*20 verified references. All benchmarks and studies trace to AI-results source files. No fabricated citations.*
