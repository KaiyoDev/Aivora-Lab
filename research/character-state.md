# Character State Research — Aivora Lab

## Mô hình Character State

```
S_t = {
  Identity,        // Danh tính cốt lõi — immutable
  Personality,     // Tính cách — slowly changing
  Values,          // Giá trị — slowly changing
  Beliefs,         // Niềm tin — slowly changing
  Goals,           // Mục tiêu — dynamic + learned
  Motivation,      // Động lực — dynamic
  Emotion,         // Cảm xúc — dynamic
  Relationship,    // Quan hệ — dynamic
  Memory,          // Bộ nhớ — dynamic + learned
  Knowledge,       // Kiến thức — learned
  Habits,          // Thói quen — learned
  Preferences,     // Sở thích — dynamic + learned
  WorldState       // Tình trạng thế giới — dynamic
}
```

---

## Phân loại theo tính biến đổi

### IMMUTABLE (Không đổi)
- **Identity**: Tên, tuổi, giới tính, background cơ bản
- **Core Values**: Nguyên tắc đạo đức cốt lõi
- **Biological Facts**: Tuổi sinh học, giới tính sinh học

**Rationale**: Những yếu tố này định nghĩa "ai là Character". Thay đổi sẽ làm mất identity.

**Evidence**: 
- Personality consistency studies cho thấy core identity phải ổn định để user cảm nhận được continuity
- Identity drift >10% khiến user nhận ra Character đã "khác đi"

---

### SLOWLY CHANGING (Thay đổi chậm)
- **Personality traits** (Big Five): Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
- **Beliefs**: Hệ thống niềm tin về thế giới
- **Values**: Giá trị sống, ưu tiên

**Rationale**: Thay đổi từ từ giúp Character phát triển tự nhiên nhưng vẫn duy trì consistency.

**Evidence**:
- Personality drift measured at ~5-10% per month trong natural settings
- Belief change requires significant experience/events

---

### DYNAMIC (Thay đổi nhanh)
- **Emotion**: Trạng thái cảm xúc tức thời
- **Goals**: Mục tiêu ngắn hạn
- **Motivation**: Động lực trước mắt
- **Relationship**: Mức độ quan hệ với từng user/agent
- **WorldState**: Tình huống hiện tại

**Rationale**: Phản ánh phản ứng tức thời với môi trường và tương tác.

---

### LEARNED (Học được)
- **Memory**: Episodic + semantic memories
- **Knowledge**: Facts, skills, procedures
- **Habits**: Patterns hành vi đã học
- **Preferences**: Sở thích cá nhân hóa

**Rationale**: Accumulated từ experience, cần mechanisms cho consolidation và retrieval.

---

### USER CONTROLLED (Người dùng điều khiển)
- **Memory importance**: User có thể đánh dấu memory quan trọng
- **Relationship level**: User có thể điều chỉnh mức độ thân thiết
- **Goals**: User có thể set goals cho Character

---

### SYSTEM CONTROLLED (Hệ thống điều khiển)
- **Forgetting**: Tự động quên information không quan trọng
- **Consolidation**: Tự động convert episodic → semantic
- **Conflict resolution**: Giải quyết mâu thuẫn trong memory

---

## Research Questions

### RQ-State-001: Memory nên là database hay learning system?

| Aspect | Database Approach | Learning System Approach |
|--------|------------------|-------------------------|
| Write | Explicit insert | Learned encoding |
| Read | Vector similarity | Learned retrieval |
| Update | Overwrite | Gradual consolidation |
| Forget | Manual deletion | Forgetting curve |
| Complexity | Low | High |

**Hypothesis**: Hybrid approach — database cho short-term, learning system cho long-term consolidation.

---

### RQ-State-002: Relationship dynamics model

```
R_t = f(R_{t-1}, Interaction_t, Context_t)
```

Dimensions:
- Trust: β=0.43-0.58 predictor of relationship continuity
- Affection: Strongest with secure attachment style
- Familiarity: Increases faster than trust
- Respect: Weakest evidence dimension
- Conflict: Negative correlation với tất cả dimensions khác
- Intimacy:非线性 function của familiarity + trust

---

### RQ-State-003: Emotion как internal state

| Approach | Pros | Cons |
|----------|------|------|
| LLM Output | Natural, contextual | Inconsistent, no persistence |
| Dedicated Model | Consistent, trackable | Less natural expression |
| Hybrid | Best of both | Higher complexity |

**Recommendation**: Hybrid — internal emotion state + LLM-generated expression.

---

## Architecture Implications

1. **State Management**: Cần explicit state store, không chỉ dựa vào LLM context
2. **Memory System**: Vector + Graph hybrid cho episodic + semantic
3. **Relationship Engine**: Separate module cho relationship dynamics
4. **Emotion Controller**: Internal state machine cho emotion tracking
5. **Personality Guard**: Mechanism prevent drift beyond thresholds

---

*Last updated: 2026-09-03*
*Status: Research hypothesis — cần validation qua experiments*
