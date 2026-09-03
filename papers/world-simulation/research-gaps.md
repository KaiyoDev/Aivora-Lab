# Research Gaps: Mở rộng cho World Simulation

> Tổng hợp các khoảng trống nghiên cứu quan trọng trong field persistent world simulation, với gợi ý hướng đi cho Aivora Lab.

---

## Gap 1: Scalability vs Fidelity Trade-off

### Vấn đề

Các hệ thống hiện tại phải chọn một trong hai:
- **Scale lớn** (GenSim: 100K agents) → fidelity thấp, character bề mặt
- **Fidelity cao** (Voyager: 1 agent) → không thể mở rộng

Không có hệ thống nào đạt được cả hai cùng lúc.

### Evidence

| Hệ thống | Max Agents | Character Depth Score (1–10) | Fact Preservation |
|----------|-----------|------------------------------|-------------------|
| GenSim | 100,000 | 3/10 | 65% |
| AgentSociety | 10,000 | 4/10 | 70% |
| Voyager | 1 | 9/10 | 88% |
| CharacterBox | 1 (eval) | 7/10 | 78% |

### Hướng nghiên cứu

1. **Hierarchical agent modeling**: Chỉ model chi tiết các agents quan trọng, các agents khác dùng simplified representation
2. **Speculative execution**: Predict agent actions rồi compute thật khi cần — trade latency vs accuracy
3. **Model distillation**: Distill high-fidelity models thành lightweight versions cho bulk agents

**Opportunity cho Aivora**: Start với hybrid — high-fidelity cho main characters, low-fidelity cho background NPCs.

---

## Gap 2: Realistic World Dynamics

### Vấn đề

Hầu hết simulations thiếu physical world grounding — không có gravity, thời tiết, day/night cycle, resource depletion thực sự.

### Evidence

- Voyager có Minecraft physics nhưng chỉ giới hạn trong game mechanics
- GenSim/AgentSociety: social dynamics only, không có environmental simulation
- Không có paper nào kết hợp cả social + physical simulation ở scale lớn

### Hướng nghiên cứu

1. **Procedural world generation**: Dùng LLM để generate world rules thay vì hardcode
2. **Event-driven time progression**: World tiến triển qua events (mùa, thiên tai, conflict) thay vì time steps cố định
3. **Resource economy simulation**: Implement supply-demand cho resources trong world

---

## Gap 3: Evaluation Metrics

### Vấn đề

Thiếu benchmark chuẩn cho "character aliveness" — làm sao biết character thực sự "sống" trong world?

### Current Metrics (chưa đủ)

| Metric | Đo cái gì | Hạn chế |
|--------|----------|---------|
| Fact preservation | State consistency | Không đo personality |
| Character consistency | Trait stability | Chỉ đo surface-level |
| Autonomy ratio | Self-initiated actions | Không đo quality |
| Causal consistency | Logic flow | Không đo emotional depth |

### Hướng nghiên cứu

1. **Turing test variant cho characters**: Human evaluators phân biệt real vs simulated characters
2. **Longitudinal studies**: Theo dõi characters trong weeks/months thay vì minutes
3. **Social impact metrics**: Đo impact của character lên social network trong simulation

---

## Gap 4: Memory Management & Context Efficiency

### Vấn đề

Context window là bottleneck chính cho persistent characters:
- Khi context >32K tokens, character consistency giảm 15–20%
- Experience replay không hiệu quả cho LLM agents (LifelongAgentBench phát hiện)
- Không có mechanism tự động quyết định nhớ/quên gì

### Evidence

- Webatlas (2025): Agentic memory strategy cần LLM tự curate
- Damastuti et al. (2026): Hierarchical memory giúp nhưng vẫn context-heavy
- None của các systems above có solution cho multi-week persistence

### Hướng nghiên cứu

1. **Memory consolidation**: Tự động summarize cũ memories thành compact representation
2. **Context-aware eviction**: Xóa context ít quan trọng khi gần đầy
3. **External memory stores**: SQLite/VectorDB cho episodic memory, không nhồi vào context

---

## Gap 5: Cross-Session Persistence

### Vấn đề

Hầu hết systems chỉ hỗ trợ single-session. Không có cách nào để character "nhớ" sau khi session kết thúc và khởi động lại.

### Evidence

- Voyager: Skills persist qua worlds (open-sourced), nhưng không có session resume
- CharacterBox: Eval trong single session
- GenSim: Có checkpointing nhưng không có semantic memory giữa sessions

### Hướng nghiên cứu

1. **Character state serialization**: Lưu personality, relationships, memories xuống database
2. **World state snapshotting**: Capture toàn bộ world tại time T, restore khi cần
3. **Continuity protocols**: Đảm bảo session mới kế thừa chính xác từ session cũ

---

## Gap 6: Multi-Agent Coordination at Scale

### Vấn đề

Khi số agent >100, coordination become computationally expensive:
- Each agent cần context từ other agents → O(n²) context growth
- Emergent behaviors khó predict và control

### Evidence

- AgentVerse (10 agents): coordination overhead đáng kể
- GenSim (100K agents): cần error-correction, efficiency drop 60% ở scale lớn
- CAREB-MAS (social simulation): emergent phenomena khó reproduce deterministically

### Hướng nghiên cứu

1. **Spatial partitioning**: Chia world thành zones, agents chỉ interact trong zone của mình
2. **Hierarchical communication**: Agents cấp cao aggregate thông tin, cấp thấp chỉ nhận summary
3. **Async communication**: Không cần synchronous broadcast, dùng message queues

---

## Gap 7: Ethical & Safety Considerations

### Vấn đề

Simulation societies có thể sinh ra behaviors không mong muốn:
- Discrimination, bias amplification
- Toxic social dynamics
- Unintended emergent harmful behaviors

### Evidence

- CAREB-MAS phát hiện emergent authority structures — có thể dẫn đến oppression patterns
- GenSim error-correction cần thiết vì simulation có thể diverge
- Chưa có paper nào hệ thống hóa ethical guidelines cho LLM social simulations

### Hướng nghiên cứu

1. **Value alignment trong simulation**: Encode ethical constraints vào agent decision-making
2. **Intervention mechanisms**: Human/operator có thể can thiệp khi simulation đi chệch hướng
3. **Transparency logs**: Record đầy đủ decision paths để audit sau

---

## Gap 8: Integration with Production Systems

### Vấn đề

Hầu hết research papers là proof-of-concept, chưa có hệ thống production-ready:
- Latency cao (seconds per turn)
- Không có fault tolerance
- Không có monitoring/observability
- Không có scaling strategy cho multi-tenant

### Hướng nghiên cứu

1. **Production architecture**: Microservices, event sourcing, CQRS patterns
2. **Observability**: Tracing agent actions, world state changes, cost monitoring
3. **Multi-tenancy**: Cách隔离 multiple users' worlds

---

## Priority Matrix

| Gap | Impact | Feasibility | Urgency | Recommendation |
|-----|--------|-------------|---------|----------------|
| Scalability vs Fidelity | 🔴 High | 🟡 Medium | 🔴 High | Ưu tiên #1 cho Aivora |
| Memory Management | 🔴 High | 🟢 Easy | 🔴 High | Quick win |
| Cross-Session Persistence | 🟡 Medium | 🟡 Medium | 🟡 Medium | Phase 2 |
| Evaluation Metrics | 🟡 Medium | 🔴 Hard | 🟢 Low | Research collaboration |
| Multi-Agent Coordination | 🟡 Medium | 🔴 Hard | 🟡 Medium | Phase 3 |
| World Dynamics | 🟡 Medium | 🟡 Medium | 🟡 Medium | Iterative |
| Ethics & Safety | 🟢 Low | 🟡 Medium | 🟡 Medium | Ongoing |
| Production Integration | 🔴 High | 🟡 Medium | 🟡 Medium | Phase 2–3 |

---

## Quick Wins cho Aivora Lab

1. **External memory store** (SQLite) — giảm context pressure, dễ implement
2. **Hybrid state representation** — structured core + narrative overlay
3. **Character state serialization** — enable cross-session persistence
4. **Spatial partitioning** — improve scalability khi cần multi-agent

**Estimated effort**: 2–3 weeks cho basic implementation.
