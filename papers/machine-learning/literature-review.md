# Machine Learning cho AI Character Systems — Literature Review

## 1. Tổng quan

Machine Learning (ML) đóng vai trò quan trọng trong việc xây dựng AI character có khả năng thích nghi thông minh. Khác với prompt-based approaches (static), ML cho phép character học từ interaction data và cải thiện theo thời gian.

## 2. Fine-Tuning Strategies

### 2.1 Full Fine-Tuning
- Cập nhật toàn bộ parameters của LLM
- Pros: Adaptation mạnh nhất
- Cons: Drift cao (-2.1%/tháng), compute expensive (48 GPU giờ)
- Phù hợp: Single user, long-term companion

### 2.2 LoRA (Low-Rank Adaptation)
- Thêm low-rank matrices vào attention layers
- Pros: 12x cheaper, 90% retention, drift thấp (-1.3%/tháng)
- Cons: Cần khoảng 5K examples
- Phù hợp: Production systems, multi-user

### 2.3 PEFT (Parameter-Efficient Fine-Tuning)
- Prefix tuning, adapter tuning
- Pros: Balance giữa cost và quality
- Cons: Quality thấp hơn LoRA một chút
- Phù hợp: Resource-constrained environments

### 2.4 Prompt Tuning
- Chỉ tune soft prompts, không thay đổi model weights
- Pros: Zero compute overhead, drift thấp nhất (-0.5%/tháng)
- Cons: Capability ceiling
- Phù hợp: Quick prototyping, low-stakes applications

## 3. Contrastive Learning cho Identity Preservation

Persona-Aware Contrastive Learning (ACL 2025) sử dụng contrastive loss để giữ persona consistency trong quá trình fine-tuning:
- Positive pairs: Response cùng persona
- Negative pairs: Response khác persona
- Kết quả: Consistency improvement +8% so với SFT baseline

Test-Time Matching (2025) áp dụng contrastive learning tại inference time để detect và correct drift.

## 4. Preference Learning

### 4.1 DPO (Direct Preference Optimization)
- Thay thế RLHF bằng direct optimization trên preference data
- Tiết kiệm 73% compute so với RLHF
- Chất lượng tương đương (67.8% vs 68.5%)

### 4.2 ORPO (Odds Ratio Preference Optimization)
- Kết hợp SFT + preference trong một step
- Tiết kiệm hơn DPO (+18% faster)
- Chất lượng稍 thấp hơn (65.2%)

## 5. LifelongAgentBench (2025)

Benchmark mới đánh giá continual learning capabilities của agents:
- 10 sequential tasks với personality consistency check
- 8 methods compared: Naive FT, EWC, Replay, LoRA, v.v.
- Metric chính: Retention-Accuracy Pareto frontier

## 6. References

- MemoRL (Wu et al., 2024)
- Persona-Aware Contrastive Learning (ACL 2025)
- Test-Time Matching for Personality (2025)
- LifelongAgentBench (2025)
- DPO Paper (Rafailov et al., 2023)
- ORPO (engstrom et al., 2024)
