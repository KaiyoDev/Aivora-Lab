# Memory Architectures Literature Review

## 1. Tổng quan

Memory trong AI agents là hệ thống lưu trữ và truy xuất thông tin vượt ra ngoài context window của LLM. Bài review này tổng hợp các kiến trúc memory chính được nghiên cứu và ứng dụng trong 2024-2025.

## 2. Các loại memory theo phân loại sinh học

### 2.1 Episodic Memory (Bộ nhớ sự kiện)
- **Định nghĩa**: Lưu trữ các sự kiện cá nhân theo thời gian và không gian
- **Trong AI**: Record lại lịch sử tương tác, conversation logs, user actions
- **Papers tiêu biểu**: 
  - "GEM: A Benchmark for Grounded Episodic Memory" (2024)
  - "Towards Lifelong Learning with Episodic Memory" (2024)
- **Storage**: Vector database + metadata (timestamp, context)

### 2.2 Semantic Memory (Bộ nhớ ngữ nghĩa)
- **Định nghĩa**: Kiến thức chung về thế giới, facts, concepts
- **Trong AI**: Knowledge graph, entity relationships, domain knowledge
- **Papers tiêu biểu**:
  - "Knowledge Graph Construction for LLM Agents" (2024)
  - "Semantic Memory in Neural-Symbolic Systems" (2025)
- **Storage**: Knowledge graphs, structured databases

### 2.3 Procedural Memory (Bộ nhớ thủ tục)
- **Định nghĩa**: Kỹ năng, thao tác đã được học
- **Trong AI**: Tool use patterns, workflow templates, best practices
- **Storage**: Code repositories, function signatures, execution traces

### 2.4 Working Memory (Bộ nhớ làm việc)
- **Định nghĩa**: Thông tin đang xử lý ngay lập tức
- **Trong AI**: Current context, active task state, conversation history
- **Storage**: In-context, session state

## 3. Kiến trúc bộ nhớ theo phương pháp tiếp cận

### 3.1 Rule-Based Memory
- **Cơ chế**: Pattern matching, keyword extraction, explicit rules
- **Ưu điểm**: Deterministic, interpretable, fast retrieval
- **Nhược điểm**: Không scale được, hard to maintain
- **Use cases**: Simple chatbots, rule-based FAQ systems
- **Papers**: 
  - "Rule-Based Memory for Dialogue Systems" (2023)
  - "Explicit Memory Mechanisms in NLP" (2024)

### 3.2 Vector Memory (Embedding-based)
- **Cơ chế**: Convert text → embeddings, store in vector DB, retrieve by similarity
- **Ưu điểm**: Semantic search, scalable, supports RAG
- **Nhược điểm**: Lossy compression, needs embedding model
- **Tools**: Pinecone, Weaviate, Milvus, ChromaDB
- **Papers**:
  - "RAG: Retrieval-Augmented Generation" (Lewis et al., 2020)
  - "Vector Memory for Long-term Context" (2024)
- **Implementation**: 
  - Embedding models: text-embedding-ada-002, bge-m3, nomic-embed
  - Chunking strategies: semantic, sliding window, recursive

### 3.3 LLM-Based Memory
- **Cơ chế**: Use LLM to summarize, extract, generate memories
- **Ưu điểm**: Context-aware, natural language output
- **Nhược điểm**: Expensive, slow, non-deterministic
- **Papers**:
  - "MemGPT: Towards LLMs as Operating Systems" (2024)
  - "Self-Refinement for Memory Generation" (2024)

### 3.4 Learned/Neural Memory
- **Cơ chế**: End-to-end trainable memory components
- **Ưu điểm**: Optimized for task, can learn patterns
- **Nhược điểm**: Requires training data, less interpretable
- **Papers**:
  - "Neural Module Networks for Memory" (2024)
  - "Differentiable Memory for RL Agents" (2023)

### 3.5 Hybrid Memory
- **Cơ chế**: Combine multiple approaches
- **Trend**: Most production systems use hybrid
- **Examples**: 
  - Mem0: Vector + LLM summarization + confidence scoring
  - LangGraph: State management + memory tools

## 4. Memory Retrieval Strategies

### 4.1 Similarity Search
- **Method**: Cosine similarity, dot product on embeddings
- **Metrics**: Recall@K, Precision@K
- **Optimization**: HNSW, IVF-PQ indexes

### 4.2 Semantic Search
- **Method**: Query understanding, re-ranking
- **Techniques**: 
  - HyDE (Hypothetical Document Embeddings)
  - RRF (Reciprocal Rank Fusion)
  - Cross-encoder reranking

### 4.3 Temporal Retrieval
- **Method**: Time-based filtering, recency weighting
- **Papers**: "Time-Aware Retrieval for Long-term Memory" (2024)

### 4.4 Contextual Retrieval
- **Method**: Use conversation context to refine queries
- **Techniques**: Multi-query generation, step-back prompting

## 5. Memory Writing & Encoding

### 5.1 Extraction
- **Method**: Use LLM to extract facts, events, preferences
- **Challenges**: Noise reduction, redundancy elimination

### 5.2 Summarization
- **Method**: Compress long conversations into memories
- **Techniques**: 
  - Sliding window summary
  - Event-triggered summarization
  - Importance-weighted summary

### 5.3 Consolidation
- **Definition**: Process of stabilizing memories over time
- **Methods**: 
  - Periodic re-summarization
  - Dream-like offline consolidation
  - Priority-based storage

## 6. Memory Compression & Forgetting

### 6.1 Importance Weighting
- **Method**: Assign scores based on relevance, frequency, recency
- **Papers**: "Importance Sampling for Memory Management" (2024)

### 6.2 Forgetting Mechanisms
- **Types**:
  - Time-decay forgetting
  - Capacity-based eviction
  - Redundancy pruning
- **Papers**: "Continual Learning with Forgetting" (2024)

### 6.3 Compression Techniques
- **Lossless**: Deduplication, indexing
- **Lossy**: Summarization, embedding quantization

## 7. Key Research Papers (2024-2025)

| Paper | Year | Focus |
|-------|------|-------|
| MemGPT | 2024 | Hierarchical memory for LLM agents |
| GEM Benchmark | 2024 | Episodic memory evaluation |
| LongMemEval | 2024 | Long-term memory benchmark |
| Dream | 2024 | Background memory consolidation |
| MoMemory | 2024 | Modular memory architecture |

## 8. Industrial Implementations

### 8.1 Mem0
- **Architecture**: Add → Learn → Retrieve pipeline
- **Features**: Confidence scoring, staleness detection, BYOK
- **Storage**: PostgreSQL + Pgvector

### 8.2 LangChain Memory
- **Types**: ConversationBufferMemory, ConversationSummaryMemory
- **Integration**: Chain-memory coupling

### 8.3 Vercel AI SDK
- **Feature**: Built-in memory support for chat
- **Storage**: Provider-agnostic

## 9. Research Questions

1. Memory should be more than database? → Learning system with consolidation
2. How to balance storage cost vs. retrieval quality?
3. What's the optimal forgetting mechanism?
4. How to handle memory conflicts?
5. Can we achieve human-like memory evolution?
