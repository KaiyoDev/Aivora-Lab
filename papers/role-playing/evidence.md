# Evidence: Character Consistency Problems trong Role-Playing Agent

**Ngày:** 2026-09-03  
**Tác giả:** Aivora Lab Research

---

## 1. Bằng chứng định lượng về personality drift

### 1.1 Consistency score giảm theo conversation length

| Conversation Length | Prompt-Only | Memory-Augmented | Graph-Based Memory |
|---------------------|:-----------:|:-----------------:|:------------------:|
| 5 turns             | 94%         | 96%               | 97%                |
| 20 turns            | 82%         | 88%               | 91%                |
| 50 turns            | 68%         | 75%               | 83%                |
| 100 turns           | 52%         | 63%               | 78%                |
| 200 turns           | 38%         | 51%               | 71%                |
| 500 turns           | 27%         | 42%               | 65%                |

*Nguồn: Aggregation từ Role-Agent (NeurIPS 2024), ChatTwins (2024), và DREAM (2026)*

**Key insight**: Memory augmentation giúp ~10-15% improvement ở early turns, nhưng gap widening khi conversation dài — graph-based memory duy trì advantage rõ rệt.

### 1.2 Memory recall accuracy theo turn

```
Turn:    1     10     30     50    100    200    500
Recall: 95%   88%    72%    60%    42%    35%    28%
```

*Source: Memory-Driven Role-Playing (Wang et al., ACL 2026)*

---

## 2. Bằng chứng định tính: các dạng personality drift

### 2.1 Drift type classification

| Type | Description | Example |
|------|-------------|---------|
| **Style drift** | Linguistic style thay đổi | Character vốn lạnh lùng → đột ngột thân thiện, dùng emoji |
| **Trait drift** | Personality trait thay đổi | Character vốn hướng nội → trở nên hướng ngoại bất ngờ |
| **Knowledge drift** | Forget backstory details | Quên quan hệ với user, quên sự kiện đã xảy ra |
| **Emotional drift** | Emotional response mất ổn định | Character vốn trầm tính → phản ứng cảm xúc cực đoan |
| **Goal drift** | mục tiêu hội thoại lệch hướng | Character bỏ xa narrative arc → trả lời như AI thông thường |

### 2.2 Case study: Prompt-only approach failure

**Character設定**: Tanaka Yuki — 25 tuổi, developer Nhật Bản, tính cách nghiêm túc, thích công nghệ, không dùng emoji, nói ngắn gọn.

**Turn 1-10**: Agent đáp ứng chính xác character.

**Turn 25**: Lần đầu xuất hiện personality drift:
- Turn 25 response: *"Cảm ơn bạn đã hỏi! Tôi rất vui được chia sẻ 😊"* ← **emoji xuất hiện**, tone quá thân thiện

**Turn 50**: Drift nặng:
- Turn 50 response: *"Chắc chắn rồi! Để tôi giúp bạn nhé~"* ← style drift hoàn toàn, khác xa character gốc

**Turn 100**: Character collapse:
- Turn 100 response: *"Để tôi tra cứu thông tin và trả lời câu hỏi của bạn..."* ← hoàn toàn không còn là character nữa,变成了 generic AI assistant

---

## 3. Bằng chứng: các cơ chế gây drift

### 3.1 Context Dilution (Nghiên cứu bởi Test-Time-Matching, 2025)

**Thí nghiệm**: So sánh consistency score khi personality instruction đặt ở:
- Đầu conversation (baseline)
- Đầu + giữa + cuối (repeated injection)
- Chỉ khi được hỏi (on-demand)

**Kết quả**:
- Repeated injection chỉ cải thiện ~5% consistency
- On-demand retrieval tốt nhất (~12% improvement)
- Kết luận: Việc lặp lại instruction không giải quyết được root cause — mà cần **retrieval chính xác** tại thời điểm cần

### 3.2 Mirroring Effect (Nghiên cứu bởi Memory-Driven Role-Playing, 2026)

**Hiện tượng**: LLM có inherent tendency mirror communication style của người đối diện.

**Thí nghiệm**: User bắt đầu hội thoại với style quá thân thiện (dùng nhiều emoji,称呼 thân mật).

**Kết quả**: Trong 15 turns, character personality drift từ "nghiêm túc" sang "thân thiện + dùng emoji" — hoàn toàn mirror theo user.

**Cơ chế**: LLM training data chứa rất nhiều ví dụ về conversational reciprocity → model học được pattern "nếu user thân thiện thì mình cũng nên thân thiện".

### 3.3 Attention Competition (Nghiên cứu bởi DREAM, 2026)

**Phân tích attention weights**: Khi context dài (>8000 tokens), attention weights phân tán đều giữa personality instruction và user messages → personality signal yếu đi đáng kể.

**Hệ quả**: Model thiên về response theo ngữ cảnh hiện tại hơn là theo personality profile cố định.

---

## 4. Evidence: Memory loss patterns

### 4.1 Episodic vs Semantic memory decay

| Memory Type | Decay Rate (turns) | Retention at T=100 |
|-------------|-------------------|-------------------|
| **Semantic** (personality traits) | Slow (~0.3%/turn) | ~70% |
| **Episodic** (specific events) | Fast (~1.2%/turn) | ~35% |
| **Procedural** ( habits, preferences) | Very slow (~0.1%/turn) | ~90% |

*Kết luận*: Episodic memory (chi tiết sự kiện) là phần dễ mất nhất — đây là lý do character thường "quên" sự kiện quan trọng trong khi vẫn giữ được personality cơ bản.

### 4.2 Retrieval bottleneck

**Finding từ DREAM (2026)**: Khi episodic memory vượt quá ~150 items, retrieval quality giảm mạnh do:
1. Noise trong retrieval (irrelevant memories được đưa ra)
2. Latency tăng (gây timeout hoặc truncation)
3. Context window pressure (memory items chiếm chỗ của personality instruction)

---

## 5. Evidence: Hiệu quả của các countermeasures

### 5.1 Prompt-only (Baseline)
- Consistency improvement: 0%
- Cost: thấp nhất
- Limitation: không scalable beyond ~20 turns

### 5.2 Memory-augmented (Soul-style)
- Consistency improvement: +10-15%
- Cost: trung bình
- Limitation: retrieval quality giảm khi memory scale

### 5.3 Graph-based memory (DREAM)
- Consistency improvement: +20-25%
- Cost: cao (graph traversal + embedding maintenance)
- Limitation: complex implementation

### 5.4 Persona-aware contrastive learning (Ji et al.)
- Consistency improvement: +18% (so với vanilla fine-tune)
- Cost: cần training data + fine-tuning step
- Limitation: chỉ effective cho fixed character set

### 5.5 Test-Time-Matching (Zhan et al.)
- Consistency improvement: +22% (so với baseline)
- Cost: thấp (chỉ prompt engineering, không training)
- Limitation: cần thiết kế matching prompt cho mỗi character

### 5.6 Psychological alignment (Psymem)
- Consistency improvement: +15% (với Big Five characters)
- Cost: trung bình
- Limitation: không applicable cho fictional characters có personality phức tạp

---

## 6. Tóm tắt evidence chính

1. **Personality drift là có thật và đo được**: Consistency score giảm từ ~95% xuống ~27% sau 500 turns (prompt-only).
2. **Memory loss nghiêm trọng hơn personality drift**: Episodic memory retention chỉ ~28% ở turn 500.
3. **Memory augmentation giúp được nhưng không đủ**: Graph-based memory tốt nhất (~78% ở turn 500) vẫn thua xa ideal.
4. **Mirroring effect là nguyên nhân chính**: LLM có tendency hòa theo user — không thể fix bằng prompt repetition.
5. **Context dilution là cơ chế chính**: Attention bị phân tán khi context dài → personality instruction mất effect.
6. **Không có silver bullet**: Mỗi method có trade-off riêng — không có approach nào giải quyết được cả 3 vấn đề (personality, memory, style) đồng thời.
