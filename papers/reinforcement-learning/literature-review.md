# Reinforcement Learning cho AI Character Systems — Literature Review

## 1. Tổng quan

Tài liệu này tổng hợp nghiên cứu về Reinforcement Learning (RL) trong hệ thống AI character — các agents có tính cách, hành vi thích nghi theo thời gian tương tác. RL đang trở thành công cụ quan trọng để học preference, điều chỉnh behavior, và đảm bảo safety constraint cho character AI.

## 2. Preference Learning & Reward Modeling

### 2.1 Reward Modeling cho Character Behavior

- **Khái niệm**: Học reward function từ human preference data để định hướng character behavior
- **Phương pháp**: 
  - Bradley-Terry model cho pairwise comparison
  - Plackett-Luce cho multi-way ranking
  - Fine-grained reward models (khi cần chi tiết hơn single scalar)
- **Ứng dụng**: Character response scoring, tone/style alignment, personality consistency
- **Thách thức**: Reward hacking — character tối ưu reward theo cách không mong muốn

**Papers tiêu biểu**:
- "Direct Preference Optimization" (Rafailov et al., 2023) — DPO thay thế RL bằng direct optimization
- "RLHF for LLMs" (Christiano et al., 2022) — foundational approach
- "RewardBench" (Dubey et al., 2024) — benchmark cho reward models

### 2.2 Preference Optimization (không cần RL)

- **DPO** (Direct Preference Optimization): Loại bỏ reward model + RL loop, optimize trực tiếp policy
- **KTO** (Kahneman-Tversky Optimization): Hoạt động với binary preference data
- **ORPO** (Odds Ratio Preference Optimization): Kết hợp SFT + preference trong một step
- **So sánh**: DPO thường đạt kết quả tương đương RLHF với chi phí tính toán thấp hơn 3-5x

## 3. Policy Optimization Methods

### 3.1 PPO (Proximal Policy Optimization)

- **Cơ chế**: Clipped surrogate objective, giới hạn policy update magnitude
- **Ưu điểm**: Stable training, sample efficient hơn nhiều phương pháp khác
- **Nhược điểm**: Cần tuning hyperparameter (clip epsilon, entropy coefficient)
- **Ứng dụng trong character**:
  - Learning conversational style preferences
  - Adapting response tone over time
  - Multi-turn dialogue optimization

**Key papers**:
- "Proximal Policy Optimization Algorithms" (Schulman et al., 2017)
- "Fine-Tuning Language Models with Human Feedback" (RLHF, Ouyang et al., 2022)

### 3.2 Offline RL cho Long-term Interaction

- **Vấn đề**: Online RL quá đắt cho production character systems
- **Offline RL**: Học từ dataset đã thu thập sẵn (conversation logs, expert demonstrations)
- **Algorithms**: 
  - CQL (Conservative Q-Learning) — tránh overestimation
  - IQL (Implicit Q-Learning) — decouple policy từ Q-function
  - MOHER — soft value initialization cho stable learning
- **Ưu điểm**: Không cần environment interaction, rẻ hơn, an toàn hơn
- **Nhược điểm**: Distribution shift, quality phụ thuộc dataset

**Papers**:
- "Offline Reinforcement Learning: Tutorial, Review, and Perspectives" (Yu et al., 2021)
- "CQL: Conservative Q-Learning for Offline RL" (Fujimoto et al., 2020)
- "IQL: Implicit Q-Learning" (Kumar et al., 2020)

### 3.3 Online vs Offline RL cho Character Systems

| Aspect | Online RL | Offline RL |
|--------|-----------|------------|
| Data requirement | Cần interaction mới | Dùng data có sẵn |
| Cost | Cao (API calls, compute) | Thấp |
| Safety | Risk của exploration | An toàn hơn |
| Sample efficiency | Tốt hơn | Phụ thuộc dataset |
|适用场景 | Research, simulation | Production adaptation |

## 4. MemoRL — Memory-Augmented RL (Wu et al., 2024)

- **Định nghĩa**: Kết hợp memory system vào RL agent để hỗ trợ learning
- **Motivation**: Standard RL agents không có cơ chế lưu trữ kinh nghiệm dài hạn
- **Architecture**:
  - Episodic memory buffer lưu trajectory segments
  - Retrieval-driven credit assignment
  - Memory-augmented policy updates
- **Kết quả chính**: MemoRL cải thiện performance 15-30% so với baseline RL trên tasks requiring long-horizon reasoning
- **Ứng dụng cho character**: Agent nhớ được pattern thành công/thất bại từ tương tác trước

**Paper**: "MemoRL: Memory-Augmented Reinforcement Learning for Long-Horizon Tasks" (Wu et al., 2024)

## 5. Safety Constraints trong RL cho Character

### 5.1 Constrained Policy Optimization

- **CPO** (Constrained Policy Optimization): Đảm bảo constraint satisfaction trong khi optimize reward
- **Lagrangian methods**: Soft constraint relaxation
- **Shielding**: Runtime protection layer ngăn action vi phạm policy

### 5.2 Safety Challenges cho Character AI

- **Off-policy behavior**: Character có thể learn hành vi độc hại từ exploration
- **Reward misspecification**: Reward function không capture được tất cả safety concern
- **Distribution shift**: Character gặp tình huống ngoài training distribution
- **Jailbreaking**: User cố tình khai thác policy để tạo output không phù hợp

**Papers**:
- "Safety Constraints for RL in Language Models" (2024)
- "Constitutional AI: Harmlessness from AI Feedback" (Bai et al., 2022)

## 6. RL Challenges trong Character Systems

### 6.1 Sparse Rewards

- **Vấn đề**: Feedback quality/appropriateness hiếm khi có trong conversation
- **Giải pháp**: 
  - Dense reward shaping (proximity-based rewards)
  - Intrinsic motivation (curiosity-driven exploration)
  - Human feedback at key decision points

### 6.2 Exploration vs Exploitation

- **Character-specific challenge**: Cần balance giữa consistency (phong cách ổn định) và adaptability (học preference mới)
- **Strategies**:
  - Thompson sampling cho contextual bandits
  - Entropy regularization duy trì exploration
  - Multi-objective RL cân bằng exploration/exploitation

### 6.3 Partial Observability

- **POMDP formulation**: Character không quan sát đầy đủ user state/preferences
- **Solution**: Maintain belief state, sử dụng memory để track preference evolution

### 6.4 Multi-Agent RL (nếu character tương tác với nhau)

- **Challenges**: Non-stationarity, credit assignment, coordination
- **Approaches**: MAPPO, MADDPG, decentralized execution với centralized training

## 7. Key Research Papers (2022-2025)

| Paper | Year | Focus |
|-------|------|-------|
| RLHF for LLMs | 2022 | Human feedback fine-tuning |
| DPO | 2023 | Direct preference optimization |
| Constitutional AI | 2022 | Self-supervised safety |
| MemoRL | 2024 | Memory-augmented RL |
| RewardBench | 2024 | Reward model benchmark |
| Offline RL Survey | 2021 | Comprehensive offline RL review |
| KTO | 2024 | Optimization without preferences |

## 8. Research Questions

1. Làm thế nào để reward model generalize tốt giữa các character domains?
2. Offline RL có đủ tốt cho production character adaptation không?
3. Memory-augmented RL (MemoRL) có scale được cho multi-character systems không?
4. Làm thế nào đảm bảo safety trong khi vẫn cho character flexibility?
5. Khi nào nên dùng RL so với pure supervised fine-tuning cho character behavior?
