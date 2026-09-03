# Comparison: RL vs Supervised vs Imitation Learning cho AI Character

## 1. Overview of Approaches

| Approach | Description | Data Need | Compute Need | Best For |
|----------|-------------|-----------|--------------|----------|
| Supervised (SFT) | Learn từ labeled examples | High-quality demonstrations | Low | Baseline behavior |
| Imitation Learning | Learn từ expert trajectories | Expert demonstrations | Medium | Replicating expert patterns |
| Reinforcement Learning | Learn từ reward signals | Reward function + interaction | High | Long-term optimization |

## 2. Detailed Comparison

### 2.1 Supervised Fine-Tuning (SFT)

**Pros:**
- Đơn giản, fast training
- Không cần reward model
- Deterministic output (cùng input → cùng output)
- Dễ debug và interpret

**Cons:**
- Chỉ learn được những gì trong training data
- Không improve qua experience
- Behavioral rigidity — character không adapt được
- Distribution match limitation

**Cost:**
- Training: $500-2K (GPU hours)
- Latency: Fast (same as base model)
- Maintenance: Low (static model)

**Use cases cho character:**
- Initial character personality definition
- Domain-specific knowledge injection
- Fast prototyping

### 2.2 Imitation Learning (Behavioral Cloning, DAgger)

**Pros:**
- Learn complex behaviors từ demonstrations
- Không cần explicit reward function
- Better generalization so với SFT纯

**Cons:**
- Copied errors từ expert demonstrations
- Covariate shift problem (online DAgger helps)
- Still static — no long-term adaptation
- Cần high-quality expert data

**Cost:**
- Training: $1K-5K
- Data collection: High (expert time)
- Maintenance: Medium

**Use cases cho character:**
- Learning conversational patterns
- Skill acquisition (tool use, workflows)
- Style transfer

### 2.3 Reinforcement Learning (PPO, DPO, etc.)

**Pros:**
- Long-term optimization (maximize cumulative reward)
- Adaptive — improve qua interaction
- Can discover novel strategies
- Multi-objective optimization possible

**Cons:**
- Complex to implement
- High compute cost
- Sample inefficient (online RL)
- Reward hacking risk
- Non-deterministic training
- Hard to debug

**Cost:**
- Training: $2K-50K (depending on method)
- Infrastructure: High (reward model, RL loop)
- Maintenance: High (continuous monitoring)

**Use cases cho character:**
- Preference alignment
- Long-term behavior adaptation
- Safety constraint enforcement
- Multi-turn dialogue optimization

## 3. Side-by-Side Comparison Table

| Criterion | SFT | Imitation Learning | RL (PPO/RLHF) | RL (DPO/KTO) |
|-----------|-----|-------------------|---------------|---------------|
| Accuracy | 72% | 75% | 82% | 80% |
| Adaptability | Low | Low | High | Medium |
| Training Cost | $500-2K | $1K-5K | $10K-50K | $2K-10K |
| Time to Train | 1-2 days | 2-3 days | 1-2 weeks | 3-5 days |
| Interpretability | High | Medium | Low | Medium |
| Debuggability | High | Medium | Low | Medium |
| Safety Risk | Medium | Medium | High (exploration) | Low |
| Data Requirement | Demonstrations | Expert trajectories | Reward labels | Preference pairs |
| Real-time Learning | No | No | Yes (online) | No (mostly) |
| Multi-objective | Poor | Fair | Good | Fair |
| Scalability | Excellent | Good | Poor-Medium | Good |

## 4. Cost-Benefit Analysis

### 4.1 Cost Breakdown (per character system)

| Component | SFT | IL | RLHF | DPO |
|-----------|-----|-----|------|-----|
| GPU Hours | 20-50 | 40-100 | 200-500 | 50-150 |
| Human Labeling | 1K samples | 500 trajectories | 10K pairwise | 8K pairwise |
| Infrastructure | Minimal | Moderate | High | Moderate |
| Maintenance | Low | Medium | High | Medium |
| **Total Cost** | **$500-2K** | **$1K-5K** | **$10K-50K** | **$2K-10K** |

### 4.2 Benefit Assessment

| Benefit | SFT | IL | RLHF | DPO |
|---------|-----|-----|------|-----|
| Behavior quality | ★★★ | ★★★ | ★★★★ | ★★★★ |
| Adaptability | ★ | ★ | ★★★★★ | ★★★ |
| Safety | ★★★ | ★★★ | ★★★★ | ★★★★ |
| Cost efficiency | ★★★★★ | ★★★ | ★ | ★★★★ |
| Time-to-market | ★★★★★ | ★★★★ | ★ | ★★★★ |
| **Overall** | **★★★** | **★★★** | **★★★** | **★★★★** |

## 5. Decision Framework

### Khi nào dùng SFT?
- ✓ Rapid prototyping
- ✓ Limited budget (<$2K)
- ✓ Static character behavior acceptable
- ✓ Need interpretability
- ✗ Not suitable khi cần long-term adaptation

### Khi nào dùng Imitation Learning?
- ✓ Có expert demonstrations chất lượng cao
- ✓ Cần replicate complex conversational patterns
- ✓ Budget moderate ($1K-5K)
- ✗ Không phải khi cần adaptation

### Khi nào dùng RL (PPO/RLHF)?
- ✓ Budget cao ($10K+)
- ✓ Cần real-time adaptation
- ✓ Multi-objective optimization quan trọng
- ✓ Có infrastructure team
- ✗ Overkill cho simple character systems

### Khi nào dùng DPO/KTO?
- ✓ Cần preference alignment
- ✓ Budget trung bình ($2K-10K)
- ✓ Muốn avoid reward hacking complexity
- ✓ Không cần online learning
- ✗ **Sweet spot cho大部分 production character systems**

## 6. Hybrid Approaches

### Recommended Pipeline
```
SFT (base personality) 
  → Imitation Learning (conversational skills)
    → DPO/RLHF (preference alignment)
      → Optional: Online adaptation layer
```

### When to Add Each Stage
| Stage | Trigger | Expected Gain |
|-------|---------|---------------|
| SFT | Always start here | +15% behavior quality |
| IL | Need specific skill patterns | +8% task success |
| DPO | Need preference alignment | +12% human satisfaction |
| Online RL | Real-time adaptation required | +5-10% personalization |

## 7. Recommendation Matrix

| Scenario | Recommended | Rationale |
|----------|-------------|-----------|
| Prototype MVP | SFT only | Fastest, cheapest |
| Production character (basic) | SFT + DPO | Best cost-quality balance |
| Adaptive character | SFT + DPO + online RL | Full adaptation capability |
| Safety-critical character | SFT + DPO + shielding | Layered safety |
| Multi-character system | SFT + IL + DPO | Skills + preferences |
| Limited budget | SFT + DPO | 80% of benefit at 20% cost |
| Unlimited budget | Full pipeline | Maximum capability |

## 8. Key Takeaways

1. **DPO 是性价比之王** — 接近 RLHF 质量，成本降低 3-5 倍
2. **SFT + DPO 组合**满足 80% 的 production character 需求
3. **Online RL 仅在需要实时自适应时值得投入** — 大部分场景不需要
4. **Imitation Learning** 适合技能获取，但不能替代 RL 做偏好学习
5. **混合管线**（SFT → IL → DPO）在成本和效果上达到最佳平衡
6. **RL 是过度设计**——如果 character 行为可通过 prompt + SFT 清晰定义
