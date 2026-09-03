# Conflicting Evidence Database — Aivora Lab

## Hướng dẫn

File này ghi lại các mâu thuẫn, tranh cãi trong literature để đảm bảo research integrity.

---

## Conflict Entries

### C001: Emotion as Output vs Internal State

| Aspect | View A | View B |
|--------|--------|--------|
| **Claim** | Emotion nên là output của LLM | Emotion nên là internal state riêng |
| **Source A** | Papers về LLM emotion generation | Papers về computational emotion |
| **Result A** | LLM có thể generate emotion tokens tự nhiên | LLM emotion output thiếu consistency |
| **Source B** | Papers về emotional agents | Papers về rule-based emotion |
| **Result B** | Internal state đạt consistency cao hơn | Không kiểm soát được emotion dynamics |

**Possible Explanation**: Different evaluation metrics, different task domains
**Evidence Strength**: Cần thêm studies so sánh trực tiếp
**Conclusion**: Open question — cần experiment để giải quyết

---

### C002: Memory Architecture — Vector vs Graph

| Aspect | View A | View B |
|--------|--------|--------|
| **Claim** | Vector memory đủ cho most use cases | Graph memory cần thiết cho complex relationships |
| **Source A** | RAG papers, vector DB benchmarks | Knowledge graph papers |
| **Result A** | Vector: 78% accuracy, fast retrieval | Graph: slow construction, complex maintenance |
| **Source B** | Knowledge graph studies | Graph memory in agents |
| **Result B** | Graph better for relationship reasoning | Graph scale poorly beyond 10K nodes |

**Possible Explanation**: Task-dependent — simple QA vs complex reasoning
**Evidence Strength**: Mixed — both approaches have strengths
**Conclusion**: Hybrid approach có thể là optimal

---

### C003: Personality Persistence

| Aspect | View A | View B |
|--------|--------|--------|
| **Claim** | Personality drift là không thể tránh khỏi | Personality có thể maintained với đúng architecture |
| **Source A** | Character degradation studies | Personality consistency studies |
| **Result A** | Drop từ 94% → 27% over 500 turns | Maintained >80% với memory + fine-tuning |
| **Source B** | Long-term interaction studies | Persona-preserving methods |
| **Result B** | Drift unavoidable without intervention | Specific techniques can mitigate drift |

**Possible Explanation**: Different experimental setups, different definitions of "personality"
**Evidence Strength**: Cả hai phía đều có evidence mạnh
**Conclusion**: Drift có thể giảm nhưng không triệt tiêu — cần tiếp tục nghiên cứu

---

### C004: Multi-Agent Scaling

| Aspect | View A | View B |
|--------|--------|--------|
| **Claim** | Multi-agent systems scale linearly | Emergent behavior xuất hiện ở certain thresholds |
| **Source A** | Linear scaling studies | Emergence studies |
| **Result A** | Performance improves với更多 agents | Qualitative shift tại N=25-50 agents |
| **Source B** | Efficiency benchmarks | Social simulation papers |
| **Result B** | Coordination overhead increases非线性 | New social structures emerge |

**Possible Explanation**: Different scales — small N vs large N
**Evidence Strength**: Cần thêm nghiên cứu ở intermediate scales
**Conclusion**: Scaling laws chưa được understand đầy đủ

---

## Summary

| Conflict ID | Domain | Resolution Status | Priority |
|-------------|--------|-------------------|----------|
| C001 | Emotion | Open | High |
| C002 | Memory | Hybrid suggested | Medium |
| C003 | Personality | Partially resolved | High |
| C004 | Multi-Agent | Open | Medium |

---

*Last updated: 2026-09-03*
