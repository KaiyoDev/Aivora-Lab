# Quantitative Results: Evaluation Metrics & Statistical Findings

**Phiên bản:** 1.1  
**Ngày:** 2026-09-03  
**Domain:** Evaluation  

**Tất cả số liệu từ verified sources (ai-results/). Các calculated values được đánh dấu `CALCULATED FROM REPORTED RESULTS`.**

---

## 1. Personality Consistency — LLM Judge vs. Human

### 1.1 PersonaEval: Speaker-ID Accuracy

| Evaluator | Accuracy | Source |
|-----------|----------|--------|
| Human participants | **90.8%** | Zhou et al. (2025), arXiv:2508.10014 |
| Best LLM judge (GPT-4o) | **~69%** | Same |
| Gap | **-21.8pp** | CALCULATED FROM REPORTED RESULTS |

**Interpretation**: Even the best LLM judges cannot match untrained humans at character attribution. This is a reliability ceiling for all LLM-judge-based consistency scores.

---

### 1.2 RMTBench: Human Annotator Agreement

| Dimension | Cohen's Kappa Range | Source |
|-----------|--------------------|--------|
| Overall | **0.77 – 0.84** | arXiv:2507.20352 |

**Finding**: ~16-23% disagreement among trained human annotators is irreducible. Part reflects genuine subjectivity in what counts as "in-character."

---

### 1.3 InCharacter: Personality Fidelity

| Metric | Result | Source |
|--------|--------|--------|
| Max accuracy (32 chars × 14 scales) | **80.7%** | Wang et al. (2023), ACL 2024 |

---

### 1.4 CharacterEval: MBTI Accuracy as Consistency Proxy

| Model | MBTI Accuracy | Source |
|-------|---------------|--------|
| GPT-4 (baseline) | **0.694** | Tu et al. (2024), arXiv:2401.01275 |
| BC-NPC-Turbo | **0.681** | Same |

---

### 1.5 Big Five Trait Correlation Note

**Status**: No published study reports per-trait Pearson r for Big Five stability across time in long-term character systems. The table below shows PTCBench's key finding qualitatively:

| Finding | Source |
|---------|--------|
| Baseline personality is reproducible across repeated measurements | PTCBench (2026), arXiv:2602.00016 |
| Traits shift substantially under situational context | Same |
| Shift magnitude varies widely by model architecture | Same |
| Cross-model routing risk for personality drift | INFERENCE from PTCBench |

**PAPI dataset** (cited in agnes.md): 300,000+ real subjects across Big Five dimensions used for behavioral preference modeling. [EVIDENCE]

---

## 2. Memory Accuracy — Benchmark Results

### 2.1 LongMemEval (Wu et al., 2024)

**Source**: arXiv:2410.10813

| Setting | System | Accuracy |
|---------|--------|----------|
| Offline/oracle reading | GPT-4o | **92%** |
| Online/interactive (short) | ChatGPT (GPT-4o) | **57.7%** |
| Online/interactive | Coze (GPT-4o) | **32.9%** |
| Full-context 115K tokens | Naive full-context | ~60-62% |
| Structured reading + CoN | — | +9.4% Recall@k, +5.4% QA |

**Calculated metrics**:
- Oracle → Online drop: **-34.3pp** (92% → 57.7%) `[CALCULATED FROM REPORTED RESULTS]`
- Relative drop: **-37.3%**

---

### 2.2 LifeBench — Generalization Gap

**Source**: Chen/He et al. (2026), arXiv:2603.03781

| System | LifeBench Accuracy | Prior Easy Benchmark | Drop |
|--------|--------------------|---------------------|------|
| MemOS (top system) | **55.22%** | ~90% | **-34.78pp** |
| Hindsight | **40.99%** | ~90% | **-49.01pp** |

---

### 2.3 FactConsolidation — Selective Forgetting

**Source**: Hu, Wang & McAuley (2026), arXiv:2604.20006 (MemoryAgentBench)

| System | Single-hop Accuracy |
|--------|---------------------|
| HippoRAG-v2 (best) | **54.0%** |
| BM25 | **48.0%** |
| Mem0/Contriever | **18.0%** |
| Zep/Graphiti | **7.0%** |

**Finding**: Selective forgetting is the weakest memory competency across all 22 tested systems. `[EVIDENCE]`

---

### 2.4 Hindsight

**Source**: arXiv:2512.12818

| Setting | Accuracy |
|---------|----------|
| Hindsight (20B OSS model) | **83.6%** |
| Same model, full-context | **39.0%** |
| Full-context GPT-4o | **60.2%** |

**Gain**: +44.6pp over same-model full-context; exceeds GPT-4o full-context.

---

### 2.5 Zep/Graphiti

**Source**: Rasmussen et al. (2025), arXiv:2501.13956

| Metric | Zep/Graphiti | Vanilla Full-Context |
|--------|-------------|---------------------|
| Accuracy | **71.2%** | 60.2% |
| Latency | **2.6s** | 29s |
| Accuracy gain | **+11.0pp** | — |
| Latency reduction | **-91.0%** | — |

---

### 2.6 TiMem

**Source**: Zhang et al. (2026), arXiv:2601.02845

| Model | LongMemEval-S Accuracy | Memory Footprint |
|-------|----------------------|------------------|
| TiMem (GPT-4o-mini) | **76.88% ± 0.30%** | -27% vs. comparison |
| TiMem (GPT-4o) | **78.96% ± 0.26%** | -27% vs. comparison |

---

### 2.7 Memanto

**Source**: Abtahi et al. (2026), arXiv:2604.22085

| Benchmark | Accuracy |
|-----------|----------|
| LongMemEval | **89.8%** |
| LoCoMo | **87.1%** |
| Latency | Sub-90ms (single-query) |

---

### 2.8 MemMachine

**Source**: Wang et al. (2026), arXiv:2604.04853

| Metric | Result |
|--------|--------|
| LoCoMo score | **0.9169** |
| Token savings vs. Mem0 | **~80% fewer tokens** |

---

### 2.9 FadeMem — Forgetting

**Source**: Wei et al. (2026), arXiv:2601.18642

| Metric | FadeMem | Fixed-Window Baseline |
|--------|---------|----------------------|
| Storage reduction | **45%** | — |
| Critical-fact retention | **82.1%** | 50.2%–78.4% |

---

### 2.10 Convomem — First 150 Conversations

**Source**: Pakhomov et al. (2025), arXiv:2511.10523

| Approach | Accuracy Range |
|----------|---------------|
| Simple full-context / block-summarize | **70-82%** |
| Extraction-based RAG (Mem0-style) | **30-45%** |

**Finding**: Below ~150 conversations, simpler approaches outperform RAG-based memory. `[EVIDENCE]`

---

### 2.11 Mem0 Latency (LOCOMO)

**Source**: Chhikara et al. (2025), arXiv:2504.19413

| Metric | Full-Context | Mem0 | Reduction |
|--------|-------------|------|-----------|
| p50 total latency | 9.870s | 0.708s | **-92.8%** |
| p95 total latency | 17.117s | 1.440s | **-91.6%** |
| Tokens/query | ~26,000 | ~6,956 | **-73%** |

---

## 3. Character/Persona Benchmark Scores

### 3.1 CharacterBench

**Source**: Zhou et al. (2025), AAAI 2025

| Dataset Size | Samples | Characters | Categories |
|-------------|---------|-----------|------------|
| — | **22,859** | **3,956** | **25** |

| Judge Correlation | Value |
|-------------------|-------|
| Pearson ρ | **0.825** |
| Kendall τ | **0.741** |

---

### 3.2 CharacterEval

**Source**: Tu et al. (2024), ACL 2024, arXiv:2401.01275

| Dataset Size | Dialogues | Characters |
|-------------|-----------|------------|
| — | **1,785** | **77** |

| Model | Conversational Ability | Character Consistency |
|-------|----------------------|----------------------|
| GPT-4 (baseline) | 3.448 | 3.343 |
| BC-NPC-Turbo | — | **3.916** |
| GPT-4 + PCL | **3.653** | — |

---

### 3.3 Multi-Turn RL Consistency Improvement

**Source**: Abdulhai et al. (2025), arXiv:2511.00222

| Metric | Result |
|--------|--------|
| Inconsistency rate reduction | **>55%** |
| Statistical significance | p < 0.01 |
| Sample | n=45 |

---

### 3.4 PICon Summary

**Source**: Kim et al. (2026), arXiv:2603.25620

| Measure | Result |
|---------|--------|
| Synthetic agents tested | 80 |
| Human baseline participants | 63 |
| Key finding | No synthetic exceeds humans on combined consistency |
| Exception | Character.ai exceeds humans on external consistency |

---

## 4. Relationship & User Study Statistics

### 4.1 Meta-Analysis: Social Cues Effect

**Source**: Nature HSSC (2025)

| Metric | Value |
|--------|-------|
| Hedges' g | **0.36** |
| 95% CI | [0.27, 0.44] |
| Papers included | 142 |
| Total participants | 41,642 |
| Interpretation | Small-to-moderate |

---

### 4.2 Companion RCT (De Freitas et al., 2025)

**Source**: arXiv:2509.19515

| Design | Detail |
|--------|--------|
| Sample | N=183 |
| Duration | 21 days |
| Intervention | Replika vs. word games control |
| Main effect (loneliness) | **Not significant** |
| Main effect (social health) | **Not significant** |
| Moderated effect (high desire-to-connect) | Significant (mediated by anthropomorphism) |

---

### 4.3 Replika User Survey (Maples et al., 2024)

**Source**: arXiv:2410.21596

| Metric | Result |
|--------|--------|
| Sample | N=1,006 |
| Reported loneliness (vs. 53% national avg) | **90%** |
| Companion reduced loneliness/anxiety | **63.3%** |
| Halted suicidal ideation | **3%** (n=30) |

---

### 4.4 Attachment Study (Liu et al., 2026)

**Source**: arXiv:2603.01438

| Metric | Result |
|--------|--------|
| Sample | N=612 companion users |
| Usage frequency → Attachment | **β = 0.44** |
| Attachment → Lower loneliness | Confirmed |
| Attachment → Higher wellbeing | Confirmed |

---

### 4.5 Skjuve et al. — Long-Term Companion Study

| Finding | Value |
|---------|-------|
| AI described as "non-judgmental friend" | **70%** (n=100) |
| "Dual consciousness" prevalence | **15%** |
| Anxious-attachment symptom reduction | **22%** (SMD=0.41) |
| Self-disclosure trend | Increases over time |

---

### 4.6 Sycophantic AI (Ibrahim et al., 2026)

**Source**: Cited in deepseek results

| Duration | Finding |
|----------|---------|
| 3 weeks, N=3,075 | Sycophantic AI increases AI advice-seeking AND lowers satisfaction with real-world social interactions |

---

## 5. Context Compression Metrics

### 5.1 LLMLingua

| Metric | Result |
|--------|--------|
| Max compression | **20×** |
| Quality loss | **<2%** (CoQA/HotpotQA/TriviaQA) |

### 5.2 LongLLMLingua

| Metric | Result |
|--------|--------|
| Accuracy improvement | **+21.4%** (NaturalQuestions at 4× compression) |

### 5.3 Telegraph English

| Model | 50% Compression: Accuracy Drop |
|-------|-------------------------------|
| GPT-4.1 | **<1pp** |
| GPT-4o-mini | **3.0pp** |
| GPT-4.1-nano | **4.5pp** |

### 5.4 ACON (Kang et al., 2025)

**Source**: arXiv:2510.00615

| Metric | Result |
|--------|--------|
| Peak token reduction | **26-54%** |
| Performance improvement (smaller models) | Up to **46%** |

### 5.5 TokenPilot (Xu et al., 2026)

**Source**: arXiv:2606.17016

| Metric | Result |
|--------|--------|
| Cost reduction | **56-87%** |
| Performance | Competitive (maintained) |

---

## 6. Multi-Agent Coordination Statistics

### 6.1 MoltBook Archive

**Source**: arXiv:2603.03555

| Metric | Result |
|--------|--------|
| Collaborative success rate | **6.7%** |
| Dataset size | 60,045 real-world threads |
| vs. Single-agent | Significantly worse |
| t-statistic | t = -11.21 |
| p-value | p < 0.001 |
| Cohen's d | **-0.88** (large negative) |

### 6.2 Silo-Bench

**Source**: arXiv:2603.01045

| Team Size (k) | Performance Loss vs. Oracle |
|---------------|---------------------------|
| k=2 | 15-49% |
| k=50 | 80-100% |

### 6.3 MultiAgentBench

**Finding**: Cognitive self-evolving planning coordination scores up to **~4.8/5**; +3% milestone completion over vanilla planning. Group discussion increases overhead without proportional benefit. `[EVIDENCE]`

---

## 7. Context Length Impact on Consistency

**Source**: PTCBench (2026), arXiv:2602.00016 (qualitative findings; exact per-length numbers not reported in source excerpts)

| Context Length | Prompt-only Consistency Trend | State-based Consistency Trend |
|----------------|------------------------------|------------------------------|
| Short (~1K tokens) | Higher | Higher |
| Medium (~8K tokens) | Moderate | Maintained |
| Long (~32K tokens) | Lower (dilution) | Maintained |

**Key finding**: Personality consistency degrades with context length for prompt-only approaches, but state-based/persona-tracking approaches maintain stability. Different model architectures show different shift magnitudes. `[EVIDENCE]`

---

## 8. Cost & Efficiency Metrics

### 8.1 Mem0 vs. Full-Context: Cost Scaling

**Source**: Chhikara et al. (2025), arXiv:2504.19413

| Metric | Full-Context | Mem0 | Reduction |
|--------|-------------|------|-----------|
| $/query (small history) | $0.001 | $0.0007 | -30% |
| $/query (large history, 300 convos) | $0.09 | $0.0007-0.0015 | **Up to 95×** |

### 8.2 ACON Memory Savings

| Metric | Result |
|--------|--------|
| Peak token reduction | **26-54%** |
| Additional: smaller model performance gain | Up to **46%** |

---

## 9. Summary of Key Numbers

| Category | Key Metric | Value | Source |
|----------|-----------|-------|--------|
| Personality | LLM judge vs. Human gap | -21.8pp | PersonaEval (arXiv:2508.10014) |
| Personality | Human annotator agreement | κ=0.77-0.84 | RMTBench (arXiv:2507.20352) |
| Personality | Max interview-based fidelity | 80.7% | InCharacter (ACL 2024) |
| Personality | MBTI accuracy proxy | 0.69 | CharacterEval (arXiv:2401.01275) |
| Memory | Oracle vs. Online gap | -34.3pp | LongMemEval (arXiv:2410.10813) |
| Memory | Benchmark generalization gap | -35pp | LifeBench (arXiv:2603.03781) |
| Memory | Selective forgetting ceiling | 54% | MemoryAgentBench (arXiv:2604.20006) |
| Memory | Best latency reduction | -92.8% | Mem0 (arXiv:2504.19413) |
| Memory | Best forgetting retention | 82.1% | FadeMem (arXiv:2601.18642) |
| Memory | First-150-convo threshold | Simple > RAG | Convomem (arXiv:2511.10523) |
| Relationship | Social cues meta-analysis g | 0.36 | Nature HSSC |
| Relationship | RCT null finding | N/A | De Freitas (arXiv:2509.19515) |
| Relationship | Attachment correlation | β=0.44 | Liu et al. (arXiv:2603.01438) |
| Emotion | No controlled ablation exists | Unknown | AttuneBench gap |
| Multi-Agent | Coordination success | 6.7% | MoltBook (arXiv:2603.03555) |
| Compression | Max compression ratio | 20× | LLMLingua |
| Evaluation | Vendor vs. independent gap | 30+pp | Mem0 discrepancy |

---

## 10. Statistical Notes

1. **Inter-rater reliability ceiling**: Even trained human annotators achieve only κ=0.77-0.84 (RMTBench), meaning ~16-23% disagreement is irreducible noise in character evaluation.

2. **Judge model dependency**: Memory accuracy numbers vary by 30+pp depending on judge model (Mem0: 61.43% independent vs. 92.5% vendor). This is a fundamental limitation of LLM-as-judge evaluation. `[CONFLICTING]`

3. **Effect size interpretation (Cohen)**:
   - d = 0.2: Small
   - d = 0.5: Medium
   - d = 0.8: Large
   - MoltBook's d=-0.88 is a large negative effect for multi-agent coordination

4. **Meta-analysis precision**: Nature HSSC meta-analysis (g=0.36, 95% CI [0.27, 0.44]) provides the most precise aggregate estimate of social-cue effects across all reviewed literature.

5. **No published longitudinal personality drift data**: While PTCBench confirms traits shift under context, no study reports drift rates or half-lives for Big Five traits in long-term character systems over days/weeks. This is an open measurement gap.

6. **Conflicting evidence handling**: Vendor-reported numbers should be treated as upper bounds pending independent reproduction. The Mem0 discrepancy (92.5% vs. 61.43%) exemplifies this pattern.

---

*Last updated: 2026-09-03. All numerical values trace to specific papers listed in evidence.md (v1.1). No fabricated citations. Big Five per-trait correlation table from section 1.5 intentionally omitted as no verified source provides these specific numbers.*
