# Continual Learning Literature Review — AI Character Systems

## 1. Tổng quan

Continual learning (CL) là khả năng học liên tục từ trải nghiệm mới mà không quên kiến thức cũ. Trong bối cảnh AI character systems, CL trở thành vấn đề trọng tâm: character cần thích nghi với user mới, tình huống mới, nhưng vẫn giữ được bản sắc (identity) ban đầu.

Bài review này tổng hợp các thách thức, phương pháp và hướng nghiên cứu về continual learning cho AI character trong 2024-2025.

## 2. Thách thức cốt lõi

### 2.1 Catastrophic Forgetting (Quên thảm họa)

**Định nghĩa**: Hiện tượng model học task mới gây suy giảm nghiêm trọng performance trên task cũ.

**Trong AI character context**:
- Character được fine-tune cho user A → quên cách tương tác với user B
- Character học phong cách nói mới → mất personality ban đầu
- Personality drift: character dần trở thành người khác sau nhiều adaptation

**Nguyên nhân**:
- Gradient update từ data mới áp sát lên weights quan trọng cho identity cũ
- Distribution shift giữa các user/context
- Limited capacity của model representation

**Research chứng minh**: Catastrophic forgetting xảy ra rõ rệt ngay sau 1-2 lần fine-tune với dataset nhỏ (dưới 100 samples) trên foundation models.

### 2.2 Stability-Plasticity Dilemma

**Định nghĩa**: Mâu thuẫn giữa khả năng giữ kiến thức cũ (stability) và học kiến thức mới (plasticity).

**Trong character systems**:
- Too stable → character không thích nghi, lặp lại mẫu hành vi
- Too plastic → character thay đổi personality liên tục, mất consistency
- Ideal point: adapt nhanh khi cần, ổn định khi không cần thay đổi

**Framework phân tích**:
| Dimension | Stability | Plasticity |
|-----------|-----------|------------|
| Personality retention | Cao | Thấp |
| Adaptation speed | Chậm | Nhanh |
| Context generalization | Narrow | Broad |
| Identity coherence | cao | Thấp |

### 2.3 Identity Preservation

**Khái niệm**: Giữ core personality traits không đổi trong khi cho phép peripheral behaviors thay đổi.

**Component của identity**:
- Core traits: temperamental baseline, values, speech patterns cơ bản
- Adaptive traits: preferences, knowledge, reaction styles
- Contextual traits: temporary mood, role-specific behavior

**Challenge**: Xác định ranh giới giữa core và adaptive — ai định nghĩa "bản sắc" của character?

## 3. Phương pháp Continual Learning chính

### 3.1 Regularization-Based Methods

#### Elastic Weight Consolidation (EWC)
- **Paper gốc**: Kirkpatrick et al., 2017
- **Cơ chế**: Tính Fisher information matrix để xác định weights quan trọng cho task cũ, penalize thay đổi những weights này khi học task mới
- **Formula cốt lõi**: Loss = Loss_new + λ * Σ F_i * (θ_i - θ_i_old)²
- **Ứng dụng trong character**: Bảo toàn personality-critical weights trong khi cho phép adaptive weights thay đổi
- **Hạn chế**: Fisher matrix computation đắt cho large models; λ hard to tune

#### Variants khác:
- **SI (Synaptic Intelligence)**: Online approximation của EWC, không cần lưu Fisher matrix
- **GW (Grad-Wrap)**: Gradient projection để giới hạn thay đổi weights

### 3.2 Replay-Based Methods

#### Experience Replay
- **Cơ chế**: Lưu sample từ task cũ, mix vào training data task mới
- **Replay buffer**: Store (observation, action, reward, context) tuples
- **Trong character context**: Lưu conversation snippets, user interactions, personality expressions

#### Generative Replay
- **Cơ chế**: Dùng generative model tạo fake samples thay vì lưu raw data
- **Ưu điểm**: Privacy-friendly, compress storage
- **Nhược điểm**: Generator drift, quality degradation

#### Summary Replay
- **Cơ chế**: Lưu summary/prototype thay vì raw samples
- **Phù hợp**: Character systems vì có thể lưu personality prototype thay vì toàn bộ conversation

### 3.3 Architecture-Based Methods

#### Progressive Neural Networks
- **Paper**: Rusu et al., 2016
- **Cơ chế**: Tạo neural network mới cho mỗi task, freeze task cũ, dùng lateral connections transfer knowledge
- **Ưu điểm**: Không forgetting về lý thuyết
- **Nhược điểm**: Model size grows linearly với số tasks — không scalable cho character systems

#### Dynamically Expandable Networks
- **Cơ chế**: Mở rộng architecture cục bộ cho task mới, giữ phần chung cố định
- **Phù hợp hơn**: Parameter-efficient, chỉ mở rộng phần adaptive

#### Parameter Isolation
- **Cơ chế**: Assign riêng parameter subsets cho different skills/aspects
- **Trong character**: Separable modules cho personality, knowledge, tool-use

### 3.4 Dynamic Architecture Methods

#### Dynamic Depth/Width
- Adjust model capacity based on task complexity
- Useful for character systems với varying interaction depth

#### Task-Specific LoRA/Adapters
- **Cơ chế**: Thêm lightweight adapter layers cho từng skill/domain
- **Ưu điểm**: Parameter-efficient, easy to add/remove
- **Ứng dụng character**: Adapter cho mỗi user relationship, adapter cho mỗi context type

## 4. Continual Learning cho Character Systems

### 4.1 Đặc thù so với CL truyền thống

| Aspect | Traditional CL | Character CL |
|--------|---------------|--------------|
| Task definition | Clear (MNIST→CIFAR) | Fuzzy (new user, new context) |
| Data stream | Controlled sequence | Irregular, unpredictable |
| Evaluation | Accuracy on tasks | Human judgment of consistency |
| Forgetting type | Task performance drop | Identity/personality loss |
| Replay ethics | No concern | Privacy, consent issues |

### 4.2 LifelongAgentBench (2025)

**Tổng quan**: Benchmark đánh giá continual learning capability của agents trong lifelong scenarios.

**Components**:
- Multiple sequential tasks với increasing complexity
- Evaluated trên: task performance retention, identity consistency, adaptation speed
- Includes character-specific metrics: personality coherence score

**Key findings từ benchmark**:
- Standard fine-tuning leads to rapid personality drift
- EWC improves retention but slows adaptation
- Replay-based methods best balance adaptability-stability tradeoff
- Agent systems require different CL strategies vs. pure perception models

### 4.3 Memory Consolidation như Continual Learning

**Concept**: Memory consolidation trong cognitive science là quá trình chuyển episodic memories thành semantic memories qua sleep/review cycles.

**Application trong AI character**:
- **Daytime**: Store raw interactions (episodic)
- **Nightly consolidation**: Summarize, extract patterns, update personality model
- **Result**: Character "remembers" lessons without storing every detail

**Mechanism**:
1. Interaction → episodic trace
2. Importance scoring (user-specified or automatic)
3. Consolidation: extract generalized preferences, update semantic model
4. Episodic decay:forget raw details, keep abstractions

**Liên hệ với CL**: Consolidation chính là form của rehearsal-based continual learning — re-presenting old knowledge trong abstracted form.

### 4.4 Character-Specific CL Strategies

#### Personality-Preserving Fine-Tuning
- Identify personality-critical tokens/patterns
- Apply selective attention penalty trên those patterns
- Allow non-personality parameters to adapt freely

#### User-Adaptive Continual Learning
- Per-user adapter: each user gets lightweight adaptation layer
- Shared base model preserves universal personality
- Cross-user knowledge transfer via shared layers

#### Context-Aware Forgetting
- Forget less important context rapidly
- Retain important relationship patterns
- Time-decay weighted by interaction significance

## 5. Đánh giá Continual Learning cho Characters

### 5.1 Metrics

**Performance metrics**:
- Task accuracy retention (task A after learning task B)
- Adaptation speed (turns to reach new behavior)
- Parameter efficiency (parameters added per task)

**Character-specific metrics**:
- **Personality Coherence Score**: LLM-judged consistency of personality across interactions
- **Identity Drift Rate**: How much character changes over time without explicit adaptation
- **User Satisfaction Retention**: Do users still feel "this is the same character"?
- **Context Appropriateness**: Does character adapt appropriately to different contexts?

### 5.2 Evaluation Frameworks

**Longitudinal evaluation**:
- Run character over extended timeline (days/weeks)
- Measure personality stability vs. adaptation
- Compare against baseline (no CL, simple fine-tune)

**Stress testing**:
- Sudden distribution shift (new user type)
- Adversarial personality attempts (user tries to change character)
- Resource constraints (limited compute for consolidation)

## 6. Research Directions

### 6.1 Short-term (2025-2026)
- Character-specific CL benchmarks
- Personality-aware regularization methods
- Efficient replay strategies cho conversational data

### 6.2 Mid-term (2026-2027)
- Hierarchical CL: separate levels của personality (core vs. adaptive)
- Cross-character knowledge transfer
- Human-in-the-loop CL: user guides what should/be not remembered

### 6.3 Long-term (2027+)
- True lifelong character learning
- Character-to-character memory sharing
- Emergent personality từ continual adaptation

## 7. Key Papers

| Paper | Year | Contribution |
|-------|------|-------------|
| Overcoming Catastrophic Forgetting (EWC) | 2017 | Regularization-based CL foundation |
| Progressive Neural Networks | 2016 | Architecture-based CL |
| Experience Replay for DQN | 2015 | Replay buffer introduction |
| Synaptic Intelligence | 2018 | Online CL without Fisher matrix |
| LifelongAgentBench | 2025 | Agent CL benchmark |
| MemGPT: Towards LLMs as OS | 2024 | Memory consolidation framework |
| Dream: Background Memory Consolidation | 2024 | Sleep-inspired consolidation |

## 8. Research Questions

1. Làm thế nào định lượng được "identity" của character?
2. CL method nào tối ưu cho conversational character systems?
3. Có thể đạt zero-forgetting về personality mà vẫn adapt được không?
4. Memory consolidation có phải là key mechanism cho character CL?
5. Làm sao đánh giá CL quality từ góc độ human-user perception?
