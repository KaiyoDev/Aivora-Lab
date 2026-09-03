# Literature Review: Context/Prompt Engineering cho LLM

**Chủ đề nghiên cứu:** Làm thế nào biến Character State + Memory + Relationship + World + Scenario thành context tối ưu cho LLM?
**Thời gian:** 2026-09-03
**Tác giả:** Aivora Lab Research Team

---

## Mục lục

1. [Tổng quan lĩnh vực](#1-tổng-quan-lĩnh-vực)
2. [Phân nhóm phương pháp](#2-phân-nhóm-phương-pháp)
3. [Phân tích chi tiết các paper](#3-phân-tích-chi-tiết-các-paper)
4. [Nhận định tổng hợp](#4-nhận-định-tổng-hợp)
5. [Tài liệu tham khảo](#5-tài-liệu-tham-khảo)

---

## 1. Tổng quan lĩnh vực

Lĩnh vực Context/Prompt Engineering cho LLM đang phát triển nhanh với các hướng nghiên cứu chính:

| Hướng nghiên cứu | Mô tả | Mức độ matures |
|---|---|---|
| Prompt Engineering | Thiết kế prompt hiệu quả | Cao |
| Context Compression | Nén context để tiết kiệm token | Trung bình |
| Retrieval-Augmented Generation (RAG) | Kết hợp retrieval + generation | Cao |
| Context Selection | Chọn context phù hợp cho query | Thấp |
| Memory-to-Context | Chuyển memory sang context tối ưu | Rất thấp |
| Token Efficiency | Tối ưu hóa token usage | Trung bình |
| Prompt Compilation | Tổng hợp prompt động từ components | Thấp |

### Câu hỏi nghiên cứu trọng tâm

Từ master-research.md, câu hỏi chính là:
> "Làm thế nào biến Character State + Memory + Relationship + World + Scenario thành context tối ưu cho LLM?"

Điều này yêu cầu kết hợp nhiều khía cạnh:
- **Character State**: Trạng thái hiện tại của nhân vật (emotions, goals, health, ...)
- **Memory**: Lịch sử tương tác, ký ức dài hạn
- **Relationship**: Mối quan hệ giữa các entities
- **World**: Ngữ cảnh thế giới, setting
- **Scenario**: Tình huống cụ thể tại thời điểm hiện tại

---

## 2. Phân nhóm phương pháp

### 2.1 Prompt Engineering Methods

#### Few-Shot / In-Context Learning (ICL)
- **GPT-3** (Brown et al., 2020): Mở ra kỷ nguyên in-context learning, chứng minh scaling up models improves few-shot performance
- **Synthetic Prompting** (Shao et al., 2023): Tự sinh chain-of-thought demonstrations

#### Optimization-based Prompting
- **OPRO** (Yang et al., 2023): Dùng LLM làm optimizer, iteratively cải thiện prompt qua history
- **GPTScore** (Fu et al., 2023): Dùng LLM tự đánh giá output của chính nó

### 2.2 Context Compression Methods

#### Query-Aware Compression
- **LongLLMLingua** (Jiang et al., 2023): Nén prompt dựa trên query-aware importance, giảm 4x tokens, tăng 21.4% accuracy

#### Selective Context
- Phương pháp chọn chỉ giữ lại context liên quan đến query, loại bỏ noise

### 2.3 RAG & Context Augmentation

#### Naive RAG → Advanced RAG → Modular RAG
- **LLM RAG Survey** (Gao et al., 2023): Phân loại 3 tier RAG

#### Self-RAG
- **Self-RAG** (Asai et al., 2023): Model tự quyết định có nên retrieve không, tự critique generation

#### GraphRAG
- **GraphRAG** (Edge et al., 2024): Dùng knowledge graph index để trả lời global questions

### 2.4 Benchmark & Evaluation

- **RGB** (Chen et al., 2023): Benchmark đánh giá RAG capability của LLM
- **GPTScore** (Fu et al., 2023): Evaluation framework dựa trên LLM

---

## 3. Phân tích chi tiết các paper

### PAPER 1: LongLLMLingua — Context Compression cho Long Context Scenarios

**Thông tin:**
- **Tên:** LongLLMLingua: Accelerating and Enhancing LLMs in Long Context Scenarios via Prompt Compression
- **Tác giả:** Huiqiang Jiang, Qianhui Wu, Xufang Luo, Dongsheng Li, Chin-Yew Lin, Yuqing Yang, Lili Qiu
- **Năm:** 2023 (v1 Oct 2023; v2 Aug 2024)
- **arXiv:** https://arxiv.org/abs/2310.06839
- **Venue:** Accepted to ACL 2024

**Bài toán:**
- LLM performance giảm khi context dài do: (1) computational cost cao, (2) performance degradation, (3) position bias
- Key information bị "ngập" trong noise

**Phương pháp:**
- Query-aware prompt compression: sử dụng LLM để xác định thông tin quan trọng liên quan đến query
- Compress bằng cách: (1) remove ít quan trọng, (2) rewrite quan trọng thành concise form
- Two-phase approach: select then compress

**Kết quả định lượng:**
| Metric | Result |
|---|---|
| Performance boost (NaturalQuestions) | +21.4% với ~4x fewer tokens |
| Cost reduction (LooGLE) | 94.0% |
| Latency acceleration | 1.4×-2.6× khi compress ~10k tokens ở ratio 2×-6× |

**Relevance đến Aivora:**
- **CỰC KỲ LIÊN QUAN**: Methodology trực tiếp áp dụng cho việc nén Character State + Memory + World info trước khi đưa vào context
- Có thể dùng làm component trong context pipeline của Aivora

---

### PAPER 2: Self-RAG — Learning to Retrieve and Generate with Self-Reflection

**Thông tin:**
- **Tên:** Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection
- **Tác giả:** Akari Asai, Zeqiu Wu, Yizhong Wang, Avirup Sil, Hannaneh Hajishirzi
- **Năm:** 2023
- **arXiv:** https://arxiv.org/abs/2310.11511

**Bài toán:**
- Standard RAG: retrieve fixed chunks → generate, không có cơ chế đánh giá quality
- Problem: retrieved context có thể irrelevant hoặc low-quality

**Phương pháp:**
- Train một LM duy nhất để:
  1. Adaptive retrieve on-demand (chỉ retrieve khi cần)
  2. Generate reflection tokens (critique passages và generations)
- Reflection tokens: task-specific (usefulness, relevance, supported, correct)
- Model tự học khi nào nên retrieve, khi nào không

**Kết quả định lượng:**
- Self-RAG (7B/13B) significantly outperforms SOTA LLMs và retrieval-augmented models
- Improvements trên: Open-domain QA, reasoning, fact verification, long-form generation factuality/citation accuracy
- Gains đáng kể về factuality và citation accuracy cho long-form generation

**Relevance đến Aivora:**
- **LIÊN QUAN CAO**: Cơ chế "reflect-and-select" có thể áp dụng cho việc chọn memory/relation/context nào nên đưa vào context window
- "Adaptive retrieve on-demand" = chỉ load memory relevant đến current conversation

---

### PAPER 3: GraphRAG — Local to Global Context Understanding

**Thông tin:**
- **Tên:** From Local to Global: A Graph RAG Approach to Query-Focused Summarization
- **Tác giả:** Darren Edge, Ha Trinh, Newman Cheng, Joshua Bradley, Alex Chao, Apurva Mody, Steven Truitt, Dasha Metropolitansky, Robert Osazuwa Ness, Jonathan Larson
- **Năm:** 2024
- **arXiv:** https://arxiv.org/abs/2404.16130

**Bài toán:**
- Standard RAG dùng chunking văn bản → retrieve top-k chunks
- Vấn đề: global questions (cần tổng hợp thông tin từ nhiều source) bị fail

**Phương pháp:**
- Hai stage build graph index:
  1. **Entity extraction**: LLM trích entity và relationships từ source documents → knowledge graph
  2. **Community detection**:louvain community detection → generate community summaries
- Query-time: Mỗi community summary generate partial response → summing thành final answer

**Kết quả định lượng:**
- "Substantial improvements" so với conventional RAG baseline
- Đặc biệt tốt cho global sensemaking questions trên datasets ~1M tokens
- Cải thiện cả comprehensiveness và diversity của generated answers

**Relevance đến Aivora:**
- **CỰC KỲ LIÊN QUAN**: Knowledge graph approach ánh xạ trực tiếp vào Relationship + World model
- Entity = Characters, Community summaries = World context
- Có thể dùng graph để query "tất cả relationships liên quan đến Character X" thay vì linear retrieval

---

### PAPER 4: OPRO — Large Language Models as Optimizers

**Thông tin:**
- **Tên:** Large Language Models as Optimizers
- **Tác giả:** Chengrun Yang, Xuezhi Wang, Yifeng Lu, Hanxiao Liu, Quoc V. Le, Denny Zhou, Xinyun Chen
- **Năm:** 2023 (v1), published 2024
- **arXiv:** https://arxiv.org/abs/2309.03409

**Bài toán:**
- Prompt engineering hiện tại chủ yếu manual/human-designed
- Không có automated optimization cho prompts

**Phương pháp:**
- OPRO (Optimization by PROmpting): Dùng LLM làm optimizer
- Iterative process: append past solutions + scores vào prompt → LLM sinh solution mới tốt hơn
- Prompt history hoạt động như accumulating working memory

**Kết quả định lượng:**
- Best prompts optimized bởi OPRO outperform human-designed prompts:
  - +8% trên GSM8K
  - +50% trên Big-Bench Hard tasks
- "Prompt is all you need" philosophy

**Relevance đến Aivora:**
- **LIÊN QUAN CAO**: OPRO có thể dùng để tự động optimize context template cho character system
- Prompt history mechanism tương tự memory accumulation trong character system

---

### PAPER 5: RGB — Benchmarking LLMs in RAG

**Thông tin:**
- **Tên:** Benchmarking Large Language Models in Retrieval-Augmented Generation
- **Tác giả:** Jiawei Chen, Hongyu Lin, Xianpei Han, Le Sun
- **Năm:** 2023 (accepted AAAI 2024)
- **arXiv:** https://arxiv.org/abs/2309.01431

**Bài toán:**
- Thiếu benchmark đánh giá RAG capability thực sự của LLM
- Các benchmark hiện tại chưa đo được noise robustness

**Phương pháp:**
- Tạo RGB benchmark: bilingual (EN/ZH), 4 testbeds:
  1. **Noise robustness**: performance khi context có nhiễu
  2. **Negative rejection**: khả năng từ chối trả lời khi không có info
  3. **Information integration**: tổng hợp multiple sources
  4. **Counterfactual robustness**: resist false information

**Kết quả định lượng:**
- LLMs có "certain degree of noise robustness"
- **Vẫn struggle significantly** ở: negative rejection, information integration, dealing with false information
- "Considerable journey ahead to effectively apply RAG to LLMs"

**Relevance đến Aivora:**
- **LIÊN QUAN TRUNG BÌNH-CAO**: 4 testbeds có thể áp dụng để đánh giá character system
- Negative rejection = character không nói điều không đúng về world state
- Information integration = combining memory + current state

---

### PAPER 6: GPTScore — Evaluate as You Desire

**Thông tin:**
- **Tên:** GPTScore: Evaluate as You Desire
- **Tác giả:** Jinlan Fu, See-Kiong Ng, Zhengbao Jiang, Pengfei Liu
- **Năm:** 2023
- **arXiv:** https://arxiv.org/abs/2302.04166

**Bài toán:**
- Human evaluation tốn kém, khó scale
- Automatic metrics (BLEU, ROUGE) không correlate tốt với human judgment

**Phương pháp:**
- Dùng zero-shot instruction capabilities của generative LLM (80M-175B params) để evaluate text
- Natural language prompts thay vì fixed metrics
- Test trên 19 models, 4 tasks, 22 aspects, 37 datasets

**Kết quả định lượng:**
- "Can effectively allow us to achieve what one desires to evaluate for texts simply by natural language instructions"
- Enables customized, multi-faceted evaluation without annotated samples

**Relevance đến Aivora:**
- **LIÊN QUAN TRUNG BÌNH**: Có thể dùng GPTScore-style evaluation để đo chất lượng character responses
- Tự động đánh giá consistency, factuality, personality alignment

---

### PAPER 7: LLM RAG Survey — Comprehensive Survey

**Thông tin:**
- **Tên:** Retrieval-Augmented Generation for Large Language Models: A Survey
- **Tác giả:** Yunfan Gao, Yun Xiong, Xinyu Gao, Kangxiang Jia, Jinliu Pan, Yuxi Bi, Yi Dai, Jiawei Sun, Meng Wang, Haofen Wang
- **Năm:** 2023
- **arXiv:** https://arxiv.org/abs/2312.10997

**Bài toán:**
- Cần tổng quan hệ thống về RAG techniques và challenges

**Phương pháp:**
- Survey ba paradigm: Naive RAG, Advanced RAG, Modular RAG
- Cover: retrieval techniques, generation techniques, augmentation techniques
- Discuss: challenges (hallucination, outdated knowledge, untraceable reasoning)

**Kết quả định lượng:**
- Phân loại comprehensive taxonomy của RAG approaches
- Highlight open problems: hallucination mitigation, dynamic knowledge updates, multi-hop reasoning

**Relevance đến Aivora:**
- **LIÊN QUAN CAO**: Taxonomy cung cấp framework để phân loại các context components
- Hallucination challenge trực tiếp liên quan đến character consistency

---

### PAPER 8: Synthetic Prompting — Chain-of-Thought Generation

**Thông tin:**
- **Tên:** Synthetic Prompting: Generating Chain-of-Thought Demonstrations for Large Language Models
- **Tác giả:** Zhihong Shao, Yeyun Gong, Yelong Shen, Minlie Huang, Nan Duan, Weizhu Chen
- **Năm:** 2023
- **arXiv:** https://arxiv.org/abs/2302.00618

**Bài toán:**
- Few-shot demonstrations cần handcrafted examples
- Quality of demonstrations ảnh hưởng lớn đến performance

**Phương pháp:**
- Alternating backward-forward process:
  - Backward: sinh question matching sampled reasoning chain
  - Forward: produce detailed reasoning chain từ question
- Few handcrafted examples → self-generate higher-quality demonstrations

**Kết quả định lượng:**
- Outperforms existing prompting techniques trên numerical, symbolic, algorithmic reasoning tasks

**Relevance đến Aivora:**
- **LIÊN QUAN TRUNG BÌNH**: Methodology có thể áp dụng để sinh character reaction demonstrations tự động
- Backward-forward process = generate scenario → generate appropriate character response

---

## 4. Nhận định tổng hợp

### 4.1 Knowledge Gaps phát hiện

| Gap | Mô tả | Mức độ nghiêm trọng |
|---|---|---|
| **Memory-to-Context formalization** | Chưa có framework chuẩn chuyển memory sang context tối ưu | Cao |
| **Character state representation** | Chưa có tiêu chuẩn biểu diễn character state trong context | Cao |
| **Multi-component context integration** | Chưa có nghiên cứu về kết hợp state + memory + relationship + world | Rất cao |
| **Context selection for roleplay** | Chưa có benchmark specific cho character-driven context | Cao |
| **Dynamic context adaptation** | Context chưa adapts theo conversation progress | Trung bình |

### 4.2 Key Insights cho Aivora

1. **Compression là bắt buộc**: LongLLMLingua chứng minh compression + performance boost cùng lúc
2. **Graph-based representation mạnh cho relationships**: GraphRAG cho thấy graph index superior cho global questions
3. **Self-reflection mechanism quan trọng**: Self-RAG cho thấy model tự evaluate context quality giúp improvement đáng kể
4. **Automated prompt optimization khả thi**: OPRO chứng minh LLM có thể optimize prompts tốt hơn human
5. **Evaluation frameworks cần custom**: RGB + GPTScore gợi ý cần benchmark riêng cho character context

### 4.3 Recommended Research Directions

1. **Character Context Compiler**: Combine LongLLMLingua methodology + GraphRAG structure
2. **Dynamic Memory Prioritization**: Adapt context dựa trên conversation phase (như Self-RAG adaptive retrieve)
3. **Relationship-Aware Retrieval**: Dùng graph structure để prioritize relationship-relevant memories
4. **Character Consistency Evaluation**: Extend RGB benchmark cho character-driven QA

---

## 5. Tài liệu tham khảo

1. Jiang, H. et al. (2023). *LongLLMLingua: Accelerating and Enhancing LLMs in Long Context Scenarios via Prompt Compression*. arXiv:2310.06839. https://arxiv.org/abs/2310.06839

2. Asai, A. et al. (2023). *Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection*. arXiv:2310.11511. https://arxiv.org/abs/2310.11511

3. Edge, D. et al. (2024). *From Local to Global: A Graph RAG Approach to Query-Focused Summarization*. arXiv:2404.16130. https://arxiv.org/abs/2404.16130

4. Yang, C. et al. (2023). *Large Language Models as Optimizers*. arXiv:2309.03409. https://arxiv.org/abs/2309.03409

5. Chen, J. et al. (2023). *Benchmarking Large Language Models in Retrieval-Augmented Generation*. arXiv:2309.01431. https://arxiv.org/abs/2309.01431

6. Fu, J. et al. (2023). *GPTScore: Evaluate as You Desire*. arXiv:2302.04166. https://arxiv.org/abs/2302.04166

7. Gao, Y. et al. (2023). *Retrieval-Augmented Generation for Large Language Models: A Survey*. arXiv:2312.10997. https://arxiv.org/abs/2312.10997

8. Shao, Z. et al. (2023). *Synthetic Prompting: Generating Chain-of-Thought Demonstrations for Large Language Models*. arXiv:2302.00618. https://arxiv.org/abs/2302.00618

9. Brown, T. et al. (2020). *Language Models are Few-Shot Learners*. arXiv:2005.14165. https://arxiv.org/abs/2005.14165
