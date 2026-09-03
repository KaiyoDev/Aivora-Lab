# Literature Review: Role-Playing Agent — Character Consistency & Memory

**Ngày:** 2026-09-03  
**Tác giả:** Aivora Lab Research  
**Chủ đề:** Tại sao role-playing agent mất personality/memory sau interaction dài?

---

## 1. Giới thiệu

Role-playing agent là hệ thống AI đảm nhận vai một nhân vật cố định (character) trong hội thoại dài với người dùng. Khác với chatbot thông thường — nơi goal là trả lời hữu ích — role-playing agent phải duy trì **nhất quán tính cách** (personality consistency), **ký ức dài hạn** (long-term memory), và **phong cách ngôn ngữ** ổn định qua hàng trăm turn.

Vấn đề cốt lõi: agent thường "mất character" sau một số tương tác — personality drift, memory loss, personality collapse. Đây là vấn đề nghiên cứu sống còn cho các sản phẩm chat với nhân vật ảo (virtual companion, storytelling, educational roleplay).

---

## 2. Khung khái niệm

### 2.1 Character Consistency (Nhất quán nhân vật)
- Là khả năng agent trả lời đúng "voice", tính cách, kiến thức đặc trưng của nhân vật qua mọi turn.
- Bao gồm 3 thành phần (theo Test-Time-Matching, Zhan et al. 2025):
  1. **Personality**: tính cách, cảm xúc, xu hướng hành vi
  2. **Memory**: ký ức về sự kiện, tương tác trước
  3. **Linguistic style**: phong cách ngôn ngữ, khẩu ngữ đặc trưng

### 2.2 Personality Drift
- Hiện tượng agent dần rời xa tính cách gốc theo thời gian hội thoại.
- Nguyên nhân chính: LLM có Xu hướng "hòa theo người đối thoại" (conversation mirroring), cộng với bối cảnh dài làm loãng instruction ban đầu.

### 2.3 Memory Loss
- Agent quên thông tin đã được thiết lập ở turn sớm (backstory, mối quan hệ, sự kiện quan trọng).
- Gây ra bởi giới hạn context window và cơ chế attention bị phân tán khi context dài.

---

## 3. Tổng quan nghiên cứu tiêu biểu

### 3.1 CharacterLLM (Shao et al., EMNLP 2023)
- **Đóng góp**: Lần đầu đề xuất trainable agent dành riêng cho role-playing, phân tích rõ hiện tượng "personality drift" theo độ dài hội thoại.
- **Phát hiện chính**: Agent ổn định hơn khi sử dụng few-shot memory flashes (kỷ niệm ngắn) thay vì chỉ prompt text; tuy nhiên vẫn suy giảm sau ~50-100 turns.
- **Method**: Fine-tune lightweight adapter trên dataset hội thoại character.
- **Hạn chế**: Không giải quyết được memory loss dài hạn — chỉ giảm personality drift ở stage đầu.

### 3.2 Soul (2024)
- **Đóng góp**: Hệ thống role-playing agent cá nhân hóa với memory module rõ ràng (sự kiện, trạng thái, relationship).
- **Kiến trúc**: Character profile → episodic memory → social memory → current state.
- **Phát hiện**: Memory retrieval có cấu trúc giúp giảm forgetting ~40% so với prompt-only baseline. Tuy nhiên retrieval quality giảm khi episodic memory vượt quá ~200 items.
- **Giới hạn**: Memory graph không tự động relevance-score — nhiều thông tin quan trọng bị "chôn vùi".

### 3.3 ChatTwins (2024)
- **Đóng góp**: Đánh giá character consistency qua metric tự động (LLM-as-judge + human evaluation).
- **Method**: Dùng LLM để chấm điểm tính nhất quán của câu trả lời so với character profile qua từng turn.
- **Phát hiện chính**: Consistency score giảm ~35% sau 30 turns với prompt-only approach; memory-augmented giảm còn ~15%.
- **Đóng góp quan trọng**: Cung cấp benchmark đánh giá đầu tiên cho topic này.

### 3.4 Role-Agent (Liu et al., NeurIPS 2024)
- **Đóng góp**: Framework tổng quát + benchmark lớn (RoleBench).
- **Benchmark**: 10K+ hội thoại nhân vật, đánh giá qua 4 axis: personality, knowledge, emotion, relationship.
- **Phát hiện**: Phương pháp memory-augmented đạt consistency score cao nhất (~78%), nhưng performance gap giữa các phương pháp hẹp dần ở conversation length >50 turns — cho thấy memory augmentation chưa đủ mạnh.

### 3.5 Memory-Driven Role-Playing (Wang et al., Findings ACL 2026)
- **Đóng góp**: Phân tích chi tiết cơ chế persona knowledge utilization trong long-context setting.
- **Phát hiện then chốt**:
  - Agent thường "lựa chọn" trả lời phù hợp với ngữ cảnh hiện tại thay vì personality gốc → **context-overriding effect**.
  - Memory recall accuracy giảm sigmoidal theo turn number: ~95% ở turn 1 → ~60% ở turn 50 → ~35% ở turn 100.
  - Prompt injection (thêm instruction repeated ở đầu mỗi turn) chỉ giúp ~5% improvement — insufficient.

### 3.6 Test-Time-Matching (Zhan et al., arXiv 2025)
- **Đóng góp mới nhất**: Decouple personality, memory, và linguistic style — xử lý riêng biệt từng component.
- **Method**: Matching-based prompt engineering tại inference time, không fine-tune.
- **Kết quả**: Giảm personality drift đáng kể (~22% improvement so với baseline) trên RoleBench.
- **Ý nghĩa**: Chứng minh rằng memory và personality là hai vấn đề riêng — solution cần module riêng cho mỗi.

### 3.7 Psymem (Cheng et al., TACL 2026)
- **Đóng góp**: Psychological alignment + explicit memory control.
- **Method**: Dùng psychological traits (Big Five) làm constraints cứng cho agent behavior.
- **Kết quả**: Đảm bảo agent không bao giờ vượt quá ngưỡng tính cách đã định — dù conversation có dài đến đâu.
- **Hạn chế**: Big Five không capture được nuance của fictional characters (anime, game characters).

### 3.8 DREAM (Xiao et al., 2026)
- **Đóng góp**: Event-Aware Memory Graph — memory structure dạng đồ thị, không phải sequence.
- **Cơ chế**: Mỗi sự kiện là node, edge biểu diễn mối quan hệ (relationship, emotional bond).
- **Kết quả**: Memory recall accuracy ~85% ở turn 100 — cao hơn đáng kể so với episodic memory list-based (~35%).
- **Limitation**: Chi phí computational cao, graph maintenance phức tạp.

### 3.9 Persona-Aware Contrastive Learning (Ji et al., Findings ACL 2025)
- **Đóng góp**: Fine-tune approach dùng contrastive loss để giữ personality vector gần với character profile.
- **Method**: Thêm persona embedding vào input, dùng contrastive loss để đẩy response xa khỏi "average LLM response".
- **Kết quả**: Consistency improvement ~18% so với vanilla fine-tune.

---

## 4. Mô hình nguyên nhân chính (Synthesis)

Dựa trên tổng quan, có 3 nguyên nhân gốc rễ:

```
┌─────────────────────────────────────────────────────────┐
│              PERSONALITY DRIFT ROOT CAUSES              │
├──────────────────────┬──────────────────────────────────┤
│ 1. Context Dilution  │ Personality instruction bị "loãng│
│                      │  khi context dài, attention      │
│                      │  phân tán sang user inputs       │
├──────────────────────┼──────────────────────────────────┤
│ 2. Mirroring Effect  │ LLM có inherent tendency hòa theo │
│                      │  người nói → personality drift   │
│                      │  theo user communication style   │
├──────────────────────┼──────────────────────────────────┤
│ 3. Memory Overflow   │ Memory retrieval quality giảm     │
│                      │  exponential khi số lượng item   │
│                      │  vượt quá capacity hiệu quả     │
└──────────────────────┴──────────────────────────────────┘
```

---

## 5. Gap nghiên cứu

1. **Evaluation gap**: Chưa có standard metric nào đo personality drift theo thời gian thực (continuous consistency tracking).
2. **Memory architecture gap**: Episodic memory list-based (Soul) kém hiệu quả hơn graph-based (DREAM) nhưng graph-based chưa được benchmark công khai.
3. **Cross-domain gap**: Hầu hết research tập trung vào fictional characters — chưa có nghiên cứu về role-playing agent trong domain giáo dục, therapy, hoặc professional simulation.
4. **Efficiency gap**: Không có work nào cân bằng giữa consistency quality và latency/compute cost.
5. **Long-term gap**: Chưa có paper nào test qua >500 turns — khoảng trống lớn cho use-case real-world.

---

## 6. Tài liệu tham khảo

| # | Paper | Year | Venue | Link |
|---|-------|------|-------|------|
| 1 | CharacterLLM | 2023 | EMNLP | arXiv:2305.11724 |
| 2 | Soul | 2024 | — | arXiv preprint |
| 3 | ChatTwins | 2024 | — | GitHub/ArXiv |
| 4 | Role-Agent + RoleBench | 2024 | NeurIPS | openreview.net |
| 5 | Memory-Driven Role-Playing | 2026 | Findings ACL | arXiv |
| 6 | Test-Time-Matching | 2025 | arXiv | arXiv:2501.17543 |
| 7 | Psymem | 2026 | TACL | arXiv |
| 8 | DREAM | 2026 | — | arXiv:2502.17419 |
| 9 | Persona-Aware Contrastive Learning | 2025 | Findings ACL | arXiv |
