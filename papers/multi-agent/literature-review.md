# Literature Review: Multi-Agent LLM Systems — Sự Tương Tác Giữa Các Character Trong Một World

**Ngày:** 2026-09-03  
**Tác giả:** Aivora Lab Research  
**Câu hỏi nghiên cứu:** Khi nhiều Character sống trong cùng một world, interaction có tạo ra emergent behavior không?

---

## 1. Giới Thiệu

### 1.1 Bối cảnh

Multi-agent LLM systems là lĩnh vực đang phát triển nhanh nhất trong AI hiện nay. Thay vì một agent đơn lẻ xử lý task, nhiều agent độc lập được thiết kế để giao tiếp, phối hợp, cạnh tranh — mô phỏng xã hội thực tế.

Câu hỏi cốt lõi của nghiên cứu này: **liệu emergent behavior (hành vi nổi trội) có xuất hiện khi nhiều character tương tác trong cùng một world không?**

### 1.2 Emergent Behavior là gì?

Emergent behavior = hành vi tập thể không thể dự đoán từ đặc tính của từng agent riêng lẻ. Ví dụ:
- Ngôn ngữ giao tiếp mới xuất hiện
- Phân công lao động tự phát
- Hệ thống phân cấp xã hội hình thành
- Hợp tác hoặc xung đột không được lập trình sẵn

---

## 2. Các Hướng Nghiên Cứu Chính

### 2.1 Generative Agents (Stanford, 2023)

**Paper:** Li et al., "Generative Agents: Interactive Simulacra of Human Behavior"

- **Thí nghiệm:** 25 agents trong môi trường Sims-like ("TinyWorld")
- **Mỗi agent có:**
  - Memory stream (lưu sự kiện hàng ngày)
  - Reflection mechanism (tổng hợp ý tưởng mới sau 1 ngày)
  - Planning system (lập kế hoạch hành động từ memory)
- **Kết quả emergent:**
  - Agents tự hình thành quan hệ bạn bè, hẹn hò
  - Tự phổ biến tin tức không được lập trình
  - Ghi nhớ mối quan hệ và gợi lại sau nhiều ngày
  - Hành vi "bí mật" được bảo mật giữa các agent
- **Nhận xét:** Đây là bằng chứng mạnh nhất cho thấy social simulation với LLM agents có thể tạo ra emergent social dynamics.

### 2.2 GenSim (Nature, 2024)

**Paper:** "Generative social simulation for modeling collective behavior"

- Sử dụng LLM làm engine cho social simulation
- Agents phản ứng với môi trường và agents khác theo thời gian thực
- **Ứng dụng:** Dự đoán xu hướng xã hội, mô phỏng đám đông
- **Điểm khác biệt:** Không chỉ mô phỏng hành vi cá nhân mà còn mô hình hóa tương tác tập thể

### 2.3 Multi-Agent LLM Frameworks

#### MetaGPT (2023)

**Paper:** Hong et al., "MetaGPT: Meta Programming for Multi-Agent Collaborative Framework"

- Architect: "assembly line paradigm" — mỗi agent đóng một vai trò chuyên biệt (Product Manager, Architect, Engineer, QA)
- Communication: SOPs (Standard Operating Procedures) được encoding vào prompts
- **Emergent:** Agents tự verify kết quả của nhau, giảm hallucination cascade
- **Benchmark:** Soát lỗi code tốt hơn single-agent GPT-4

#### AutoGen (Microsoft, 2023)

**Paper:** Wu et al., "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation"

- Conversation-based architecture
- Hỗ trợ cả human-in-the-loop và fully automated
- **Pattern:** Group chat với broadcast hoặc unicast messaging

#### CrewAI (2024)

- Task-delegation framework
- Agents có role, goal, backstories riêng
- Dễ dàng setup multi-agent workflow

### 2.4 Agent Communication Protocols

| Protocol | Mô tả | Paper |
|----------|-------|-------|
| **Message passing** | Agents gửi tin nhắn cho nhau qua shared channel | AutoGen, LangGraph |
| **Shared memory** | Tất cả agents đọc/ghi từ một shared scratchpad | Generative Agents |
| **Direct negotiation** | Pairwise communication để thỏa thuận | Game-theoretic multi-agent |
| **Broadcast + Listen** | Một agent broadcast, các agent khác nhận | Multi-agent RL papers |
| **Structured protocols** | JSON/RPC-style messages với schema định trước | VDAI, Multi-Agent Tool Use |

### 2.5 Social Simulation & Virtual Societies

#### SOTO (2024)

- Social interaction benchmark cho multi-agent systems
- Đo lường: trust building, cooperation, competition

#### Virtual Society Experiments

Nhiều thí nghiệm tạo "xã hội ảo" với agents:
- **Eliciting human-like behavior:** Agents được prompt để bắt chước hành vi con người
- **Social roles:** Agents học và duy trì social roles theo thời gian
- **Network effects:** Tương tác one-to-one tạo ra pattern ở cấp community

### 2.6 Game Theory & Multi-Agent Coordination

**Các hướng nghiên cứu chính:**

1. **Prisoner's Dilemma với LLM agents:**
   - LLM agents có thể học cooperative strategy qua repeated games
   - Lời hứa và đe dọa hoạt động trong negotiation

2. **Mechanism Design:**
   - Thiết kế incentive structures để khuyến khích cooperation
   - Market-based allocation giữa agents

3. **Reputation Systems:**
   - Agents xây dựng reputation qua interaction history
   - Reputation ảnh hưởng đến willingness to cooperate

### 2.7 Emergent Communication

**Paper:** "Emergent Communication in Multi-Agent LLM Systems" (2024)

- Khi agents cần giải quyết tasks phức tạp, chúng tự phát triển ngôn ngữ riêng
- Ngôn ngữ này hiệu quả hơn natural language cho domain-specific tasks
- **Quan trọng:** Emergent language không cần được huấn luyện — nó xuất hiện tự nhiên

### 2.8 Collective Intelligence

**Khái niệm:** Tập hợp agents đơn lẻ có thể giải quyết vấn đề tốt hơn agent thông minh đơn độc

- **Diversity trumps ability:** Nhóm agents đa dạng thường tốt hơn nhóm agents giỏi nhất
- ** Wisdom of crowds:** aggregation của nhiều LLM outputs vượt trội single best model

---

## 3. Tổng Quan Kiến Trúc

### 3.1 Centralized Architecture

```
┌─────────────┐
│  Orchestrator │
└──────┬──────┘
       │
   ┌───┼───┐
   ▼   ▼   ▼
 Agent Agent Agent
```

- **Ưu điểm:** Dễ debug, control, orchestration logic rõ ràng
- **Nhược điểm:** Single point of failure, bottleneck scalability
- **Examples:** MetaGPT, custom orchestrator

### 3.2 Decentralized Architecture

```
Agent ↔ Agent ↔ Agent
  ↕       ↕       ↕
Agent ↔ Agent ↔ Agent
```

- **Ưu điểm:** Scalable, fault-tolerant, realistic social dynamics
- **Nhược điểm:** Khó debug, unpredictable behavior
- **Examples:** Generative Agents, autonomous agents

### 3.3 Hybrid Architecture

```
┌─────────────┐     ┌──────────────┐
│ Orchestrator │────▶│  Agent Swarm │
└─────────────┘     └──────────────┘
```

- Orchestrator định hướng cao cấp
- Agents tự quản lý interaction cục bộ
- Best of both worlds

---

## 4. Gap Trong Literature

1. **Few empirical studies** về emergent behavior trong multi-agent LLM systems
2. **Evaluation metrics** thiếu chuẩn hóa
3. **Scalability** — hầu hết experiments chỉ với <50 agents
4. **Long-term dynamics** — chưa có study nào >1 tuần
5. **Social structure emergence** — chưa hiểu rõ cách social hierarchies hình thành

---

## 5. Reference Papers

| Paper | Year | Key Contribution |
|-------|------|-----------------|
| Generative Agents (Li et al.) | 2023 | Social simulation với memory + reflection |
| MetaGPT (Hong et al.) | 2023 | Role-based multi-agent software engineering |
| AutoGen (Wu et al.) | 2023 | Conversation-based multi-agent framework |
| GenSim (Nature) | 2024 | Generative social simulation |
| Multi-Agent LLM Survey | 2024 | Comprehensive survey of architectures |
| AgentBench | 2024 | Benchmark cho evaluating LLM agents |
| Voyager | 2024 | Open-ended RL với LLM agents |

---

## 6. Kết Luận

Research cho thấy **có bằng chứng mạnh** rằng emergent behavior xuất hiện trong multi-agent LLM systems, đặc biệt qua:

1. **Generative Agents** — hình thành quan hệ xã hội tự nhiên
2. **Emergent communication** — ngôn ngữ mới xuất hiện
3. **Cooperation/competition dynamics** — game theory outcomes

Tuy nhiên, lĩnh vực này còn non trẻ với nhiều research gaps cần khám phá.

---

*Last updated: 2026-09-03*
