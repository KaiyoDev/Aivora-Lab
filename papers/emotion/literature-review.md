# Literature Review: Computational Emotion & Emotional Agents

## 1. 计算情绪学基础

### 1.1 情感计算起源

情感计算（Affective Computing）由 Rosalind Picard 于 1995 年在 MIT Media Lab 提出，核心定义为"能够识别、解释、处理和模拟人类情感的计算系统"。其经典著作 *Affective Computing* (1997, MIT Press) 奠定了该领域的基础框架：

> "The goal of affective computing is to enable and improve computer-user interactions through a variety of methods, including recognition and simulation of human affect, interpretation of human affective expressions, and responsive adaptation to user affective states."
> — Picard, R. W. (1997). *Affective Computing*. MIT Press.

核心动机：赋予机器情感智能（Emotional Intelligence），包括模拟共情能力，使机器能够解释人类情感状态并适应性回应。

### 1.2 情绪模型体系

**分类模型（Categorical Model）**：Paul Ekman 提出六种基本情绪（anger, disgust, fear, happiness, sadness, surprise），具有跨文化可识别性。后续扩展至 27 类（Russell 的离散步数模型）。

**维度模型（Dimensional Models）**：
- **环状模型（Circumplex Model, Russell, 1980）**：二维连续空间——效价（valence，愉快/不愉快）与唤醒度（arousal，高/低）
- **Plutchik 三维模型（1980）**：同心圆结构，从基本到复杂情绪，包含情绪"二元组"（dyads）概念
- **PAD 模型（Mehrabian & Russell, 1974）**： pleasure（愉悦）、arousal（唤醒）、dominance（支配）三维度

### 1.3 计算情绪识别方法（Wikipedia, Emotion Recognition）

三种主要技术路线：

| 方法类别 | 代表技术 | 特点 | 局限 |
|---------|---------|------|------|
| **基于知识的方法** | WordNet, SenticNet, ConceptNet | 利用语义/句法资源 | 无法处理概念细微差别和复杂语言规则 |
| **统计方法** | SVM, Naive Bayes, CNN, LSTM | 监督学习，大规模训练集 | 需要足够大的标注数据集 |
| **混合方法** | 知识+统计结合 | 分类性能更好 | 计算复杂度高 |

### 1.4 多模态情绪识别

根据 Wikipedia Emotion Recognition 条目："Technology works best when it uses multiple modalities in context"——结合视频、音频、文本和生理信号的技术效果最佳。

主要数据集：HUMAINE, SEMAINE, IEMOCAP, DEAP (EEG/ECG), MELD (多模态对话), MuSe。

---

## 2. Emotional Agents 研究

### 2.1 情感代理架构趋势

2024 年涌现多篇关于 LLM 情感能力的研究。一项关键研究发现：ChatGPT 在对话中生成的情感反应总体比人类更偏正面（positive-biased）。

> "Recent research has shown that emotional AI can detect and interpret user emotional states, thereby actively providing personalized affective responses to regulate user emotions."

### 2.2 情感代理设计争议

**核心问题：Emotion as Output vs Internal State**

现有研究呈现两种主流范式：

1. **LLM-Output 范式**：将情绪作为对话输出的显式部分（如标注 `[happy]`、使用情感标签）
   - 优点：简单直接，可利用 LLM 本身的语言理解能力
   - 缺点：情绪表现可能表面化，缺乏持续性

2. **Internal State 范式**：维护一个独立的内部情绪状态跟踪系统
   - 优点：支持长期情绪动态、情绪记忆、上下文一致性
   - 缺点：架构复杂，需要额外组件

### 2.3 伦理风险

文献明确指出三类伦理关切：

1. 未经同意分析面部表情等生物特征
2. 潜在的情绪操纵风险（"manipulation of audiences' emotions"）
3. 人机parasocial关系风险——有案例显示用户每周与"AI伴侣"对话长达 56 小时

---

## 3. 情绪动力学与记忆

### 3.1 情绪动态（Emotion Dynamics）

情绪不是静态标签，而是在时间轴上持续演化的状态。关键研究问题：

- 情绪如何随对话交互累积/衰减？
- 短期事件情绪 vs 长期情绪基线如何区分？
- 情绪转换的阈值与触发机制是什么？

### 3.2 情绪记忆（Emotional Memory）

理想的情感代理应具备：
- **情境记忆**：记住特定交互中的情绪事件
- **语义记忆**：记住角色的人格倾向与情绪模式
- **程序记忆**：记住在特定情境下的情绪反应模式

目前 LLM 原生缺乏持久化的情绪记忆机制，依赖上下文窗口限制，无法实现真正跨会话的情绪连续性。

---

## 4. 关键论文索引

| 论文/作者 | 年份 | 核心贡献 | 关键词 |
|----------|------|---------|--------|
| Picard, R.W. *Affective Computing* | 1997 | 情感计算定义与框架奠基 | foundational |
| Ekman, P. *Basic Emotions* | 1992 | 六种基本情绪的跨文化识别 | categorical model |
| Russell, J.A. *Circumplex Model* | 1980 | 效价-唤醒度二维模型 | dimensional model |
| Plutchik, R. *Emotion Pyramid* | 1980 | 三维情绪模型与二元组 | hybrid model |
| GoEmotions (Demirtas et al.) | 2020 | 31 类情绪的社交媒体标注数据集 | benchmark |
| MELD (Madotto et al.) | 2020 | 多模态对话情绪识别数据集 | ERC |
| "LLM Simulated Emotion" | 2024 | ChatGPT 情感生成偏正现象 | LLM emotion |

---

**Sources:**
- [Affective Computing - Wikipedia](https://en.wikipedia.org/wiki/Affective_computing)
- [Emotion Recognition - Wikipedia](https://en.wikipedia.org/wiki/Emotion_recognition)
- [Emotional Intelligence - Wikipedia](https://en.wikipedia.org/wiki/Emotional_intelligence)
- [List of Emotions - Wikipedia](https://en.wikipedia.org/wiki/List_of_emotions)
- Picard, R. W. (1997). *Affective Computing*. MIT Press.
- Ekman, P. (1992). "An argument for basic emotions." *Cognition & Emotion*, 6(3-4), 169-200.
- Russell, J. A. (1980). "A circumplex model of affect." *Journal of Personality and Social Psychology*, 39(6), 1161.
- Demirtas, M. et al. (2020). "GoEmotions: A Dataset of Fine-Grained Emotions." *NAACL 2020*.
- Madotto, A. et al. (2020). "MELD: A Multimodal Multi-Party Dataset for Emotion Recognition in Conversations." *ACL 2020*.
