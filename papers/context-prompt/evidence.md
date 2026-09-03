# Evidence Database: Context/Prompt Engineering Research

**Database ID:** EP-CPT-001
**Ngày tạo:** 2026-09-03
**Nguồn:** arXiv, AAAI 2024, ACL 2024
**Tiếng:** Tiếng Việt

---

## Bảng Evidence Tổng hợp

| ID | Paper | Năm | Method | Key Finding | Relevance (1-5) | Source |
|---|---|---|---|---|---|---|
| E-001 | LongLLMLingua | 2023 | Query-aware prompt compression | +21.4% accuracy với ~4x fewer tokens; 94% cost reduction; 1.4×-2.6× latency acceleration | 5 | arXiv:2310.06839 |
| E-002 | Self-RAG | 2023 | Self-reflective retrieval + generation | Model tự adaptive retrieve on-demand; reflection tokens critique generations;显著提升 factuality và citation accuracy | 5 | arXiv:2310.11511 |
| E-003 | GraphRAG | 2024 | Graph-based knowledge index | Entity graph + community summaries; substantial improvements cho global questions trên 1M token datasets | 5 | arXiv:2404.16130 |
| E-004 | OPRO | 2023 | LLM-as-optimizer | Best prompts outperform human designs: +8% GSM8K, +50% Big-Bench Hard | 4 | arXiv:2309.03409 |
| E-005 | RGB Benchmark | 2023 | RAG capability benchmark | LLMs still struggle significantly ở negative rejection, information integration, false info handling | 4 | arXiv:2309.01431 |
| E-006 | GPTScore | 2023 | LLM-based evaluation | Zero-shot instruction evaluation effective across 19 models, 4 tasks, 22 aspects, 37 datasets | 3 | arXiv:2302.04166 |
| E-007 | RAG Survey | 2023 | Comprehensive survey | Taxonomy: Naive → Advanced → Modular RAG; key challenges: hallucination, outdated knowledge, untraceable reasoning | 4 | arXiv:2312.10997 |
| E-008 | Synthetic Prompting | 2023 | Backward-forward CoT generation | Self-generated demonstrations outperform handcrafted ones trên numerical/symbolic/algorithmic tasks | 3 | arXiv:2302.00618 |
| E-009 | GPT-3 ICL | 2020 | Few-shot in-context learning | Scaling improves few-shot performance; sometimes competitive with SOTA fine-tuning | 3 | arXiv:2005.14165 |

---

## Evidence Chi tiết theo Topic

### Topic 1: Context Compression

**E-001: LongLLMLingua**
- **Source:** https://arxiv.org/abs/2310.06839
- **Method:** Query-aware compression, two-phase (select → compress)
- **Findings:**
  - LLM performance hinges on density và position of key information
  -compress ~10k tokens at 2×-6× ratio → 1.4×-2.6× latency acceleration
  - 94% cost reduction trên LooGLE benchmark
  - +21.4% performance boost trên NaturalQuestions với 4× fewer tokens
- **Applicability:** Directly applicable cho character memory compression

---

### Topic 2: Retrieval & Context Selection

**E-002: Self-RAG**
- **Source:** https://arxiv.org/abs/2310.11511
- **Method:** Adaptive retrieve + reflection tokens
- **Findings:**
  - Model tự decide when to retrieve (on-demand)
  - Reflection tokens: usefulness, relevance, supported, correct
  - Self-RAG 7B/13B outperforms SOTA LLMs + retrieval-augmented models
  - Notable gains trong factuality và citation accuracy cho long-form generation
- **Applicability:** "Adaptive retrieve on-demand" = character system chỉ load relevant memories

**E-005: RGB Benchmark**
- **Source:** https://arxiv.org/abs/2309.01431
- **Method:** 4-testbed benchmark cho RAG evaluation
- **Findings:**
  - LLMs có "certain degree of noise robustness"
  - **Vẫn struggle significantly** ở: negative rejection, information integration, false info handling
  - "Considerable journey ahead" cho effective RAG application
- **Applicability:** Benchmark framework có thể adapt cho character consistency evaluation

---

### Topic 3: Graph-based Context Representation

**E-003: GraphRAG**
- **Source:** https://arxiv.org/abs/2404.16130
- **Method:** Entity graph + community detection + summarization
- **Findings:**
  - Two-stage graph index: entity extraction → community detection
  - Community summaries generate partial responses → aggregate thành final answer
  - "Substantial improvements" cho global questions trên ~1M token datasets
  - Cải thiện cả comprehensiveness lẫn diversity
- **Applicability:** Graph structure = relationship model cho character system

---

### Topic 4: Automated Prompt Optimization

**E-004: OPRO**
- **Source:** https://arxiv.org/abs/2309.03409
- **Method:** LLM iteratively optimizes prompts using history
- **Findings:**
  - OPRO generates new solutions từ prompt chứa past solutions + scores
  - Prompt history hoạt động như accumulating working memory
  - Best prompts: +8% GSM8K, +50% Big-Bench Hard so với human-designed
- **Applicability:** Automated context template optimization cho character systems

---

### Topic 5: Evaluation Frameworks

**E-006: GPTScore**
- **Source:** https://arxiv.org/abs/2302.04166
- **Method:** Zero-shot LLM-based evaluation
- **Findings:**
  - Testing: 19 models, 4 tasks, 22 aspects, 37 datasets
  - "Effectively achieve what one desires to evaluate... simply by natural language instructions"
  - Customized multi-faceted evaluation without annotated samples
- **Applicability:** Custom evaluation metrics cho character response quality

---

### Topic 6: Synthesis & Survey

**E-007: RAG Survey**
- **Source:** https://arxiv.org/abs/2312.10997
- **Method:** Comprehensive survey
- **Findings:**
  - Taxonomy: Naive RAG → Advanced RAG → Modular RAG
  - Key challenges identified: hallucination, outdated knowledge, untraceable reasoning
  - RAG addresses: factual inaccuracies, knowledge cutoff, transparency
- **Applicability:** Framework classification cho context engineering approaches

**E-008: Synthetic Prompting**
- **Source:** https://arxiv.org/abs/2302.00618
- **Method:** Backward-forward demonstration generation
- **Findings:**
  - Backward: generate question matching reasoning chain
  - Forward: produce detailed reasoning chain từ question
  - Outperforms existing techniques trên numerical/symbolic/algorithmic reasoning
- **Applicability:** Automated character reaction synthesis

---

## Evidence Mapping đến Aivora Components

| Aivora Component | Corresponding Evidence IDs | Expected Impact |
|---|---|---|
| Character State | E-001, E-004 | Compression + optimization |
| Memory | E-001, E-002, E-005 | Compression + adaptive retrieval |
| Relationship | E-003 | Graph-based representation |
| World | E-003, E-007 | Graph indexing + taxonomy |
| Scenario | E-002, E-008 | Adaptive context + synthetic demo |
| Context Compiler | E-001, E-002, E-003 | Combined compression + selection + graph |

---

## Confidence Assessment

| Evidence ID | Reading Level | Confidence | Notes |
|---|---|---|---|
| E-001 | Full text | High | ACL 2024 accepted, quantitative results clear |
| E-002 | Abstract + content | High | Strong methodology, clear findings |
| E-003 | Abstract + content | High | Microsoft Research, industry validation |
| E-004 | Abstract + content | High | Google DeepMind, strong results |
| E-005 | Abstract | Medium | Benchmark paper, methodology clear but limited detail |
| E-006 | Abstract | Medium | Evaluation-focused, less method detail |
| E-007 | Abstract + content | High | Comprehensive survey, good taxonomy |
| E-008 | Abstract | Medium | Narrow scope (reasoning tasks) |
| E-009 | Landmark paper | High | Foundation work, widely cited |

---

*Có 9 evidence entries. Nguồn: arXiv, AAAI 2024, ACL 2024. Không có evidence nào được tạo giả.*
