# Global Terminology — Aivora Lab Research

## 1. Core Concepts

| Term | Definition | Vietnamese |
|------|-----------|------------|
| AI Character | A virtual agent with persistent Identity, Personality, Memory, and Relationship capabilities designed for long-term human interaction | Nhân vật AI |
| Character State (S_t) | The complete representation of a Character at time t, including all mutable and immutable components | Trạng thái Character |
| Identity | The immutable core of a Character — who they are, including name, role, biological facts, and core values | Bản sắc |
| Personality | The stable trait structure (e.g., Big Five) that influences behavioral tendencies | Tính cách |
| Memory | Persistent storage and retrieval of information outside model parameters | Bộ nhớ |
| Internal State | The dynamic emotional and motivational state at a given moment | Trạng thái nội tại |
| Emotion | Affective responses that influence Character behavior and expression | Cảm xúc |
| Relationship | The evolving bond between a Character and a specific human user or other agents | Quan hệ |
| World State | The Character's representation of the external environment and context | Thế giới |
| Adaptation | Intentional, experience-based change that improves Character performance | Thích nghi |
| Drift | Unintended, unexplained change that degrades Character consistency | Lệch bản sắc |
| Identity Drift | Drift that crosses the threshold where the Character is no longer recognizable as itself | Lệch bản sắc |
| Personality Drift | Change in personality traits beyond acceptable thresholds | Lệch tính cách |
| Context Compilation | The process of transforming Character State + Memory + Relationship into an optimal LLM prompt | Biên dịch ngữ cảnh |
| Long-term Interaction | Sustained human-AI interaction over days, weeks, or months | Tương tác dài hạn |

## 2. Metrics

| Metric | Definition | Formula/Range |
|--------|-----------|---------------|
| ICS (Identity Consistency Score) | Composite score measuring overall identity preservation | 0.0–1.0 |
| Big Five Correlation (r) | Pearson correlation of personality traits across turns | -1.0–1.0 |
| Memory Accuracy | Retrieval recall rate for stored information | 0–100% |
| Trust Score | User-reported trust level with the Character | 1–5 Likert |
| Satisfaction Score | User-reported satisfaction with interactions | 1–5 Likert |

## 3. Evidence Types

| Type | Meaning |
|------|---------|
| [EVIDENCE] | Result reported in an external study |
| [CALCULATED] | Value computed from verified data |
| [OUR EXPERIMENT] | Result from experiments actually conducted by Aivora |
| [INFERENCE] | Researcher inference |
| [HYPOTHESIS] | Hypothesis requiring verification |
| [PROPOSED] | Aivora research proposal |
| [OPEN QUESTION] | Issue lacking sufficient evidence |

## 4. Architecture Names

| Name | Description |
|------|-------------|
| Architecture A | LLM + Prompt only |
| Architecture B | LLM + Memory (vector DB) |
| Architecture C | LLM + Memory + Relationship + State |
| Architecture D | LLM + Memory + State + Learned components |
| Architecture E | LLM + Memory + State + RL + Graph + Continual Learning |
| Aivora Architecture | Hybrid framework with 7 modules |

*Established: 2026-09-03*
*Version: 1.0*
