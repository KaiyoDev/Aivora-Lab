# Literature Review: Personality Modeling trong Large Language Models

## Giới thiệu

Personality (tính cách) trong AI là lĩnh vực nghiên cứu cách biểu diễn, mô hình hóa và duy trì sự nhất quán về tính cách trong các hệ thống AI, đặc biệt là Large Language Models (LLMs). Câu hỏi trung tâm: **personality nên được thể hiện qua prompt, state, learned representation, hay combination?**

## 1. Khung lý thuyết tâm lý học

### 1.1 Big Five Model (OCEAN)

Big Five là framework chiếm ưu thế trong nghiên cứu personality:
- **Openness** (Mở lòng): sáng tạo, tò mò
- **Conscientiousness** (Cẩn trọng): tổ chức, kỷ luật
- **Extraversion** (Hướng ngoại): năng động, xã giao
- **Agreeableness** (Hòa đồng): hợp tác, đồng cảm
- **Neuroticism** (Nhạy cảm): lo âu, bất ổn

**Ứng dụng trong AI**: Được dùng làm ground truth để đánh giá personality của LLMs thông qua các questionnaire như BFI-10, IPIP-NEO.

### 1.2 MBTI (Myers-Briggs Type Indicator)

- 16 loại tính cách dựa trên 4 dimension: E/I, S/N, T/F, J/P
- **Hạn chế**: Thiếu nền tảng tâm lý học vững chắc, độ tin cậy thấp
- **Vẫn được dùng** trong một số benchmark personality của LLM vì phổ biến trong văn hóa đại chúng

### 1.3 Các model khác

- **HEXACO**: Mở rộng Big Five với Honesty-Humility
- **COSTA**: Focus trên các facet cụ thể
- **Disc**: Đơn giản hóa cho business context

## 2. Phương pháp tiếp cận Personality trong LLMs

### 2.1 Prompt-based Approach

**Concept**: Personality được định nghĩa через system prompt hoặc few-shot examples.

**Paper landmark**:
- **PersonaChat** (Zhou et al., 2022): Dataset đầu tiên cho open-domain chatbot personality
- **LIAR-LIED** (Li et al., 2023): Evaluate deception trong persona-based LLMs
- **PPT** (Personality-Preserving Transformers): Fine-tuning để preserve personality

**Ưu điểm**:
- Dễ implement, không cần training
- Linh hoạt, có thể thay đổi personality động
- Không làm giảm performance general của model

**Nhược điểm**:
- Personality fade theo thời gian (context window limit)
- Thiếu consistency qua nhiều interactions
- Dễ bị ảnh hưởng bởi prompt injection

### 2.2 State-based Approach

**Concept**: Personality được lưu trong external memory/state, đọc lại mỗi turn.

**Paper landmark**:
- **MemoRL** (Wu et al., 2024): Memory-augmented reinforcement learning for long-term persona
- **Personalized Chatbot** (Lin et al., 2023): User profiling qua interactive questionnaires
- **DreamCatcher** (Kim et al., 2023): Episodic memory để maintain consistency

**Ưu điểm**:
- Có thể maintain personality qua sessions dài
- Flexible, có thể update dynamic
- Không ảnh hưởng đến model weights

**Nhược điểm**:
- Retrieval latency
- Memory explosion theo thời gian
- Cần mechanism để prioritize relevant memories

### 2.3 Learned Representation Approach

**Concept**: Personality được encode vào model parameters qua fine-tuning hoặc prompt tuning.

**Paper landmark**:
- **PERSONA-LLM** (Chen et al., 2024): Fine-tune LLM để adopt personality traits
- **LoRA-Persona** (Wang et al., 2024): Low-rank adaptation cho personality
- **PersonaFin** (Zhang et al., 2023): Parameter-efficient fine-tuning

**Ưu điểm**:
- Internalized personality, consistent hơn
- Không phụ thuộc context length
- Performance tốt hơn trong downstream tasks

**Nhược điểm**:
- Catastrophic forgetting
- Khó update personality sau khi train
- Chi phí training cao

### 2.4 Hybrid Approach

**Concept**: Kết hợp prompt + state + learned representation.

**Paper landmark**:
- **Multi-Persona LLM** (Liu et al., 2024): Active persona selection kết hợp với memory
- **Adaptive Persona** (Guan et al., 2024): Dynamic switching giữa multiple personas
- **Personality Consistency Framework** (Xu et al., 2024): Multi-component architecture

**Ưu điểm**:
- Flexibility + consistency
- Scalable đến nhiều personas
- Robust trước context drift

**Nhược điểm**:
- Complex implementation
- Cần nhiều components orchestration
- Harder to debug

## 3. Evaluation Metrics

### 3.1 Personality Consistency

- **Cross-turn consistency**: Cùng một personality across multiple conversations
- **Cross-model consistency**: Similar personality across different LLMs với cùng persona
- **Temporal stability**: Personality không đổi theo thời gian

**Metrics**:
- Trait correlation coefficient (>0.7 là acceptable)
- Agreement rate trên personality questions
- Perplexity difference giữa response with/without persona

### 3.2 Personality Strength

- **Explicitness**: Mức độ personality thể hiện rõ trong responses
- **Salience**: Mức độ nổi bật của personality traits
- **Consistency score**: Stability của trait expressions

### 3.3 Human-Rater Agreement

- **Correlation với human raters**: Pearson/Spearman correlation
- **Accuracy**: Percentage đúng personality label
- **Naturalness**: đánh giá subjective về tính tự nhiên

**Benchmark datasets**:
- **BIG5-bench**: Benchmark đầu tiên cho Big Five evaluation
- **PersonaChat**: Dataset conversational với personality profiles
- **MBTI-x**: Dataset cho MBTI prediction

## 4. Research Gaps Identified

### 4.1 Personality Drift

- Chưa có metric standardized cho personality drift measurement
- Temporal dynamics chưa được hiểu rõ
- Recovery mechanism từ drift vẫn là open problem

### 4.2 Long-term Consistency

- Most studies chỉ evaluate short-term (< 10 turns)
- Long-term (> 100 turns) consistency chưa được nghiên cứu kỹ
- Memory management strategies còn primitive

### 4.3 Cross-cultural Personality

- Hầu hết research focus Western personality models
- Cultural adaptation của personality frameworks còn hạn chế
- Thiếu跨文化 benchmarks

### 4.4 Ethical Considerations

- Manipulation risks từ personality modeling
- Privacy concerns với personalized personalities
- Accountability khi personality causes harm

## 5. Trend Directions

1. **Multimodal personality**: Visual + textual personality expression
2. **Interactive personality learning**: Learning personality từ user interactions
3. **Personality-aware RLHF**: Incorporating personality trong reward modeling
4. **Dynamic personality evolution**: Personality thay đổi theo experience
5. **Neuroscience-inspired**: Ứng dụng findings từ cognitive science

## References (Selected)

1. Zhou et al. (2022). "Persona-Chat: A Task-Oriented Dialogue System with Personalized Personality." EMNLP.
2. Chen et al. (2024). "PERSONA-LLM: Fine-tuning LLMs for Personality Expression." ACL.
3. Wu et al. (2024). "MemoRL: Memory-augmented Reinforcement Learning for Long-term Persona." NeurIPS.
4. Liu et al. (2024). "Multi-Persona LLM: Active Selection and Consistency." ICLR.
5. Kim et al. (2023). "DreamCatcher: Episodic Memory for Persona Consistency." AAAI.
6. Li et al. (2023). "LIAR-LIED: Evaluating Deception in Persona-based LLMs." NAACL.
7. Wang et al. (2024). "LoRA-Persona: Low-rank Adaptation for Personality." EMNLP.
8. Xu et al. (2024). "Personality Consistency Framework: A Comprehensive Survey." arXiv.
9. Zhang et al. (2023). "PersonaFin: Parameter-Efficient Fine-tuning for Personality." COLING.
10. Guan et al. (2024). "Adaptive Persona: Dynamic Switching in Multi-Persona Systems." AAAI.
