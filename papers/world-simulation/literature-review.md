# Literature Review: World Simulation cho AI Characters

> Nghiên cứu tổng quan về persistent world simulation, agent-based modeling, và social simulation dùng LLM agents. Hướng đến câu hỏi: "Character có thể tồn tại trong một world persistent thay vì chỉ phản hồi từng message hay không?"

---

## 1. Giới thiệu

World simulation là lĩnh vực nghiên cứu đang phát triển mạnh (2024–2026) nhằm tạo ra các môi trường ảo persistent — nơi AI agents (đặc biệt là LLM-based) có thể tương tác lâu dài, duy trì trạng thái, và phát triển theo thời gian. Khác với paradigm chatbot truyền thống (stateless, mỗi request độc lập), persistent world simulation đặt character vào một "thế giới" có quy luật riêng, tồn tại độc lập với sự can thiệp của user.

---

## 2. Các hướng nghiên cứu chính

### 2.1. Social Simulation Platforms

**GenSim** (Tang et al., NAACL 2025) là nền tảng social simulation dựa trên LLM agents quy mô lớn:
- Hỗ trợ đến **100.000 agents** cùng lúc
- Abstract hóa các function phổ biến để mô phỏng customized social scenarios
- Có **error-correction mechanisms** cho long-term simulation ổn định
- Đánh giá theo hai chiều: simulation efficiency và error-correction effectiveness
- 82 citations (tính đến 2026)

**AgentSociety** sử dụng hơn **10.000 LLM-driven agents** để mô phỏng dynamics của xã hội loài người, đặc biệt tập trung vào online social media platforms. Đây được coi là framework scalable cho việc mô phỏng hành vi tập thể.

**CAREB-MAS** (Ji et al., Findings ACL 2026) áp dụng LLM multi-agent simulation để kiểm chứng lý thuyết "Differential Order Pattern" (Fei Xiaotong) — nghiên cứu cấu trúc xã hội nông thôn Trung Quốc qua lăng kính LLM agents. Phát hiện quan trọng: các agents tự phát sinh ra 5 hiện tượng xã hội (labor specialization, guanxi ethics, relational decay, emergent authority, clan-based stratification).

### 2.2. Embodied Agents trong Virtual Worlds

**Voyager** (Wang et al., arXiv 2023) là embodied lifelong learning agent trong Minecraft:
- Tự động curriculum để maximize exploration
- Ever-growing skill library chứa executable code
- Tương tác với GPT-4 qua black-box queries
- Kết quả: 3.3× unique items, 2.3× distance traveled, 15.3× faster tech tree unlock
- Chứng minh được rằng LLM agents có thể học kỹ năng mới liên tục trong một persistent world

**Agent-World** (Dong et al., arXiv 2026) đề xuất arena huấn luyện agent general-purpose với two-stage approach:
- Agentic Environment-Task Discovery: tự động khám phá databases và tool ecosystems để tạo verifiable tasks
- Continuous Self-Evolving Agent Training: multi-environment RL kết hợp dynamic gap identification
- Agent-World-8B/14B outperform strong proprietary models across 23 benchmarks

### 2.3. Evaluation & Benchmarks

**LifelongAgentBench** (Zheng et al., arXiv 2025):
- Benchmark đầu tiên đánh giá **lifelong learning ability** của LLM agents
- Ba interactive environments: Database, Operating System, Knowledge Graph
- Phát hiện: conventional experience replay kém hiệu quả do irrelevant information và context length constraints
- Đề xuất group self-consistency mechanism cải thiện performance

**AgentBench** (Liu et al., NeurIPS 2023):
- Đánh giá LLM agents như autonomous agents thực sự (không chỉ text generation)
- Tập trung vào tool use, multi-step reasoning, và action execution trong simulated environments

**CharacterBox** (Wang et al., NAACL 2025):
- Sandbox benchmark cho role-playing capability trong text-based virtual worlds
- Đánh giá character consistency — yếu tố then chốt cho persistent world

### 2.4. World Models & State Representation

**Deng et al. (2025)** đề xuất "general agentic planning through simulative reasoning with world models":
- Agents cần world model để có reliable foresight
- Environmental signals phải được process và present đúng cách cho agent
- Natural-language state representation là xu hướng chủ đạo

**Webatlas** (Cheng et al., 2025):
- Agentic memory strategy: LLM agent tự quyết định viết gì vào memory
- Quản lý cognitive load trong long-running simulations

**AgentSim** (Zerhoudi et al., 2026):
- Platform cho verifiable agent-trace simulation
- Sử dụng world-simulation tools và user-simulation tools để tái hiện cognitive processes
- Ứng dụng cho RAG task simulation

### 2.5. Persistent Character & Narrative Continuity

**"When Stories Evolve"** (Chen et al., arXiv 2026):
- Benchmark đánh giá LLM storytelling across agent architectures
- Yêu cầu: fact preservation, relationship consistency, causal dependency tracking, character state persistence
- Chỉ ra gap lớn: hầu hết LLMs thất bại khi world state thay đổi qua nhiều turns

**"Hierarchical Memory Consolidation and Context-Efficient Retrieval for Persistent Personality in LLM-Based Game NPCs"** (Damastuti et al., SSRN 2026):
- Giải quyết vấn đề long-term memory và personality persistence cho game NPCs
- Phân cấp memory: working memory → episodic memory → semantic memory
- Context-efficient retrieval để tránh context overflow

---

## 3. Xu hướng công nghệ

| Xu hướng | Mô tả | Đại diện |
|----------|-------|----------|
| Scale-up | Tăng số agent từ dozens → thousands → hundred-thousands | GenSim, AgentSociety |
| Error correction | Tự sửa lỗi simulation trong quá trình chạy | GenSim error-correction |
| Lifelong learning | Agent học và tích lũy kinh nghiệm qua time | Voyager, LifelongAgentBench |
| World modeling | Explicit representation của environment state | Deng et al., Webatlas |
| Verifiable simulation | Đảm bảo simulation output có thể kiểm chứng | AgentSim, Agent-World |
| Multi-environment RL | Kết hợp reinforcement learning với simulation | Agent-World |

---

## 4. Khoảng trống nghiên cứu

1. **Scalability vs Fidelity tradeoff**: GenSim scale được 100K agents nhưng fidelity thấp; các hệ nhỏ hơn (Voyager) có fidelity cao nhưng chỉ vài chục agents.
2. **Evaluation gap**: Chưa có benchmark chuẩn cho "character persistence" — các benchmark hiện tại tập trung vào task completion, không đo được mức độ "sống" của character trong world.
3. **Real-world grounding**: Phần lớn simulation vẫn trong environments tổng hợp (Minecraft, text-based), thiếu connection với physical world reality.
4. **Temporal consistency**: Vấn đề character maintain personality consistency qua weeks/months vẫn chưa được giải quyết triệt để.

---

## 5. References

- Tang, J. et al. (2025). GenSim: A general social simulation platform with large language model based agents. *NAACL 2025 Demo*.
- Ji, Z. et al. (2026). Emergent Relational Order in LLM Agent Societies. *Findings of ACL 2026*.
- Wang, G. et al. (2023). Voyager: An Open-Ended Embodied Agent with Large Language Models. *arXiv:2305.16291*.
- Dong, G. et al. (2026). Agent-World: Scaling Real-World Environment Synthesis for Evolving General Agent Intelligence. *arXiv:2604.18292*.
- Zheng, J. et al. (2025). LifelongAgentBench: Evaluating LLM Agents as Lifelong Learners. *arXiv:2505.11942*.
- Chen, Y. et al. (2026). When Stories Evolve: Benchmarking LLM Storytelling Across Agent Architectures. *arXiv*.
- Damastuti, A. et al. (2026). Hierarchical Memory Consolidation for Persistent Personality in LLM NPCs. *SSRN*.
- Chen, X. et al. (2024). AgentVerse: Facilitating Multi-Agent Collaboration and Exploring Emergent Behaviors. *ICLR 2024*.
- Liu, Y. et al. (2023). AgentBench: Evaluating LLMs as Autonomous Agents. *NeurIPS 2023 Datasets & Benchmarks*.
- Wang, L. et al. (2025). CharacterBox: Evaluating Role-Playing Capabilities in Text-Based Virtual Worlds. *NAACL 2025*.
- Zerhoudi, S. et al. (2026). AgentSim: A Platform for Verifiable Agent-Trace Simulation. *arXiv*.
- Cheng, H. et al. (2025). Webatlas: Agentic Memory Strategy for LLM Agents. *arXiv*.
- Deng, Y. et al. (2025). General Agentic Planning through Simulative Reasoning with World Models. *arXiv*.
