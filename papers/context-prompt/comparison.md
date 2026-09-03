# Comparison: Context/Prompt Engineering Approaches

**Ngày tạo:** 2026-09-03

---

## 1. Rule-based vs. LLM-based vs. Hybrid Methods

### Bảng 1.1: So sánh ba phương pháp chính

| Dimension | Rule-based | LLM-based | Hybrid |
|---|---|---|---|
| **Xác định context** | Heuristics, templates | LLM tự quyết định | Combine cả hai |
| **Flexibility** | Thấp | Cao | Trung bình-Cao |
| **Chi phí** | Thấp | Cao (API calls) | Trung bình |
| **Tốc độ** | Nhanh | Chậm hơn | Trung bình |
| **Quality** | Ổn định nhưng rigid | Adaptive nhưng variable | Cân bằng |
| **Example** | Fixed prompt templates | Self-RAG adaptive retrieve | LongLLMLingua + rules |

### Phân tích chi tiết

**Rule-based Methods:**
- Dùng template cố định, heuristics đơn giản
- Pros: Predictable, cheap, fast
- Cons: Không adapt được khi context thay đổi, cứng nhắc
- **Aivora applicability:** Dùng cho static world info, cố định character traits

**LLM-based Methods:**
- Dùng LLM tự quyết định context selection, compression, retrieval
- Pros: Adaptive, learns từ data, quality cao
- Cons: costly, slow, non-deterministic
- **Aivora applicability:** Dùng cho dynamic memory selection, relationship queries

**Hybrid Methods:**
- Kết hợp rule-based foundation + LLM-based refinement
- Pros: Best of both worlds
- Cons: Complex implementation
- **Aivora applicability:** Rule-based template + LLM-based compression + GraphRAG structure

---

## 2. Prompt Types Comparison

### Bảng 2.1: Các loại prompt chính

| Prompt Type | Description | Use Case | Example |
|---|---|---|---|
| **System Prompt** | Fixed instructions, defines role/personality | Character core behavior | "You are a helpful assistant..." |
| **In-Context Examples** | Few-shot demonstrations | Task-specific adaptation | 3-5 example Q&A pairs |
| **Retrieved Context** | Dynamic knowledge injection | Factual accuracy | RAG-retrieved passages |
| **Memory Context** | Historical interaction data | Continuity | Past conversations summary |
| **State Context** | Current character status | Real-time adaptation | Emotion, goal, health |
| **Relationship Context** | Entity relationship data | Social dynamics | "Character A likes Character B" |

### Bảng 2.2: Prompt Type Mapping đến Aivora

| Aivora Component | Primary Prompt Type | Secondary Types |
|---|---|---|
| Character State | State Context | System Prompt |
| Memory | Memory Context | Retrieved Context |
| Relationship | Relationship Context | Memory Context |
| World | System Prompt | Retrieved Context |
| Scenario | In-Context Examples | State Context |

---

## 3. Compression Methods Comparison

### Bảng 3.1: Context Compression Approaches

| Method | Mechanism | Compression Ratio | Quality Impact | Latency Impact | Source |
|---|---|---|---|---|---|
| **LongLLMLingua** | Query-aware select + compress | 2×-6× | +21.4% (improved) | -30% to -62% | E-001 |
| **Naive truncation** | Cut from end | Variable | Generally negative | Proportional | — |
| **Sliding window** | Keep last N tokens | Fixed | Variable | Proportional | — |
| **Summarization** | LLM summarize chunks | 2×-10× | Depends on quality | Higher upfront | Survey |
| **Importance scoring** | Score each token | Variable | Variable | Low | General |
| **GraphRAG** | Graph structure | N/A (different approach) | Improved | Higher build time | E-003 |

### Bảng 3.2: Compression Method Recommendation cho Aivora

| Component | Recommended Method | Rationale |
|---|---|---|
| Character State | Importance scoring + selective keep | State items have clear priority |
| Memory | LongLLMLingua query-aware compression | Memory cần compress theo query |
| Relationship | GraphRAG structure | Relationships inherently graph-like |
| World | Hybrid: template + selective compression | World có cả static + dynamic parts |
| Scenario | In-context examples (few-shot) | Scenario best expressed as examples |

---

## 4. Retrieval Methods Comparison

### Bảng 4.1: Retrieval Approaches

| Method | Description | Pros | Cons | Source |
|---|---|---|---|---|
| **Vector similarity** | Embedding-based search | Fast, scalable | May miss semantic relations | RAG Survey |
| **Keyword search** | BM25/text matching | Simple, fast | Misses semantics | General |
| **Graph traversal** | Navigate knowledge graph | Captures relations | Complex, slower | GraphRAG |
| **Adaptive retrieve** | Model decides when to retrieve | Efficient, focused | Requires training | Self-RAG |
| **Hybrid retrieval** | Combine multiple methods | Best coverage | Most complex | RAG Survey |

### Bảng 4.2: Retrieval Recommendation cho Aivora

| Query Type | Best Method | Why |
|---|---|---|
| Character-specific memory | Adaptive retrieve (Self-RAG style) | Only retrieve relevant memories |
| Relationship queries | Graph traversal (GraphRAG style) | Relations are inherently graph |
| World knowledge | Vector similarity + keyword hybrid | Broad coverage needed |
| Scenario context | In-context examples | Direct demonstration |

---

## 5. Evaluation Methods Comparison

### Bảng 5.1: Evaluation Approaches

| Method | Description | Pros | Cons | Source |
|---|---|---|---|---|
| **Human evaluation** | Expert judges | Gold standard | Expensive, slow | GPTScore |
| **LLM-as-judge** | GPTScore-style | Fast, scalable | May have biases | GPTScore |
| **Automatic metrics** | BLEU, ROUGE, METEOR | Fast, cheap | Poor correlation with quality | General |
| **Benchmark suites** | RGB, MMLU, etc. | Standardized | May not fit domain | RGB |
| **Consistency checks** | Self-consistency voting | No external eval | Computationally expensive | General |

### Bảng 5.2: Evaluation Recommendation cho Aivora

| Aspect | Recommended Method | Rationale |
|---|---|---|
| Response quality | LLM-as-judge (GPTScore) | Fast, customizable |
| Consistency | Self-consistency checks | No external dependency |
| Factuality | RGB-style negative rejection test | Measure hallucination |
| Character fidelity | Custom rubric + LLM judge | Domain-specific needs |

---

## 6. Approach Decision Matrix

### Bảng 6.1: Which Approach When?

| Scenario | Best Approach | Components |
|---|---|---|
| Small context (< 4k tokens) | Rule-based + fixed template | System prompt + few examples |
| Medium context (4k-16k) | LLM-based compression | LongLLMLingua-style |
| Large context (> 16k) | Hybrid: compression + graph | LongLLMLingua + GraphRAG |
| Need relationship reasoning | GraphRAG | Entity graph + community summaries |
| Need adaptive retrieval | Self-RAG | Reflection tokens + on-demand retrieve |
| Need automated optimization | OPRO | LLM-as-optimizer loop |
| Need evaluation | GPTScore + RGB | LLM judge + benchmark |

### Bảng 6.2: Aivora Recommended Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Aivora Context Pipeline                 │
├─────────────────────────────────────────────────────────┤
│  Layer 1: Rule-based Foundation                         │
│    ├── System prompt template (Character core)          │
│    ├── World state template (fixed facts)               │
│    └── Relationship schema (graph structure)            │
├─────────────────────────────────────────────────────────┤
│  Layer 2: LLM-based Compression (LongLLMLingua-style)   │
│    ├── Query-aware memory compression                   │
│    ├── State importance scoring                         │
│    └── Context pruning                                  │
├─────────────────────────────────────────────────────────┤
│  Layer 3: GraphRAG Integration                          │
│    ├── Entity graph for relationships                   │
│    ├── Community detection for world groups             │
│    └── Graph traversal for relationship queries         │
├─────────────────────────────────────────────────────────┤
│  Layer 4: Adaptive Retrieval (Self-RAG-style)           │
│    ├── On-demand memory fetch                           │
│    ├── Reflection tokens for context quality            │
│    └── Dynamic context assembly                         │
├─────────────────────────────────────────────────────────┤
│  Layer 5: Evaluation (GPTScore + RGB-style)             │
│    ├── LLM-as-judge for response quality                │
│    ├── Negative rejection test for consistency          │
│    └── Custom character fidelity rubric                 │
└─────────────────────────────────────────────────────────┘
```

---

## 7. Summary of Findings

1. **Hybrid approach is optimal** — rule-based foundation + LLM-based refinement + graph structure
2. **Compression is essential** — 2×-6× compression với +performance improvement (LongLLMLingua)
3. **Graph representation best for relationships** — GraphRAG outperforms standard RAG cho global questions
4. **Adaptive retrieval critical** — Self-RAG's on-demand retrieve reduces unnecessary context
5. **Evaluation needs custom framework** — RGB + GPTScore components cần adapt cho character domain

---

*Sources: E-001 through E-009 from evidence.md. All references point to arXiv papers.*
