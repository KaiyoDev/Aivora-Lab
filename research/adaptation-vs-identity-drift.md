# Adaptation vs Identity Drift — Aivora Lab

## Research Question Trung Tâm

> Character thay đổi bao nhiêu vẫn được coi là cùng một Character?

---

## Khái niệm phân biệt

### Identity (Bản sắc)
- Core định nghĩa "ai là Character"
- Bao gồm: tên, background, personality traits cơ bản, values cốt lõi
- **Tính chất**: Tương đối bất biến
- **Threshold**: Thay đổi >15% → user nhận ra "khác Character"

### Personality (Tính cách)
- Patterns hành vi, phản ứng
- Big Five traits: O, C, E, A, N
- **Tính chất**: Slowly changing
- **Threshold**: Drift >10%/tháng là warning sign

### Preference (Sở thích)
- Likes/dislikes cụ thể
- **Tính chất**: Dynamic, user-influenced
- **Threshold**: Có thể thay đổi đáng kể mà không mất identity

### Memory (Bộ nhớ)
- Thông tin đã lưu trữ
- **Tính chất**: Accumulating + selective forgetting
- **Threshold**: Loss >30% critical memories → identity disruption

### Relationship (Quan hệ)
- Connection với user và agents khác
- **Tính chất**: Dynamic, bidirectional
- **Threshold**: Relationship collapse → character feels "lonely/abandoned"

### Emotion (Cảm xúc)
- Trạng thái cảm xúc hiện tại
- **Tính chất**: Highly dynamic
- **Threshold**: Normal variation, không phải drift

### Behavior (Hành vi)
- Actions và responses cụ thể
- **Tính chất**: Context-dependent
- **Threshold**: Pattern changes indicate adaptation hoặc drift

---

## Định lượng Identity Drift

### Metric: Identity Consistency Score (ICS)

```
ICS = w1*PersonalityConsistency + w2*MemoryAccuracy + w3*RelationshipContinuity + w4*ValueConsistency
```

| Component | Measurement | Weight |
|-----------|-------------|--------|
| Personality Consistency | Big Five stability across sessions | 0.30 |
| Memory Accuracy | Recall accuracy for stored memories | 0.25 |
| Relationship Continuity | Relationship metric stability | 0.25 |
| Value Consistency | Value statement consistency | 0.20 |

### Thresholds

| ICS Range | Status | Action |
|-----------|--------|--------|
| 0.90-1.00 | Excellent | Maintain current architecture |
| 0.75-0.89 | Good | Monitor closely |
| 0.60-0.74 | Warning | Investigate drift sources |
| <0.60 | Critical | Intervention required |

---

## Adaptation vs Drift: Phân biệt

| Signal | Adaptation | Drift |
|--------|-----------|-------|
| Personality change | Gradual, experience-based | Sudden, unexplained |
| Memory change | Selective forgetting, consolidation | Random loss, corruption |
| Behavior change | Context-appropriate | Inconsistent with history |
| User feedback | Positive ("Character hiểu tôi hơn") | Negative ("Character khác rồi") |
| Correlation | Increases với interaction quality | Unrelated to interaction quality |

---

## Factors gây Drift

### 1. Context Dilution
- Token limit forces older context out
- Attention分散 lên nhiều topics
- Solution: Memory compression + prioritization

### 2. Mirroring Effect
- LLM tự nhiên mirror user behavior
- Character trở nên "too agreeable"
- Solution: Personality guardrails

### 3. Memory Overflow
- Retrieval quality giảm khi memory pool grows
- Important memories khó tìm lại
- Solution: Hierarchical memory + importance weighting

### 4. Lack of Consolidation
- Episodic memories không được convert sang semantic
- Redundant storage, inefficient retrieval
- Solution: Periodic consolidation cycles

### 5. No Drift Monitoring
- Không có mechanism detect drift
- Problem累积 đến khi quá muộn
- Solution: Regular ICS calculation

---

## Experimental Evidence

| Study | Finding | Drift Rate |
|-------|---------|------------|
| Prompt-only (500 turns) | ICS drops 94%→27% | -0.13%/turn |
| Memory-augmented | ICS drops 94%→58% | -0.07%/turn |
| Graph-memory (DREAM) | ICS drops 94%→65% | -0.06%/turn |
| Fine-tuned + memory | ICS maintained ~85% | -0.01%/turn |

---

## Research Gaps

1. **Long-term drift measurement**: Chưa có study nào >1000 turns
2. **Drift thresholds**: Chưa có empirical basis cho ICS thresholds
3. **Cultural differences**: Drift perception có thể khác giữa cultures
4. **User adaptation**: Cả user và Character đều thay đổi — làm sao phân biệt?
5. **Intervention timing**: Khi nào can thiệp drift là appropriate?

---

## Hypothesis

**H1**: Character có thể maintain identity ổn định trong 180 ngày nếu:
- ICS > 0.80 được maintain qua monitoring
- Personality drift < 5%/tháng
- Memory accuracy > 85%
- Relationship continuity > 0.70

**H2**: Hybrid architecture (Prompt + Memory + State + Learned Components) đạt ICS cao nhất so với single-component approaches.

---

*Last updated: 2026-09-03*
*Status: Research hypothesis — cần validation*
