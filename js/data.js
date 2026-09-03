/* ==========================================================================
   Aivora Lab - Data Layer
   All constants used by charts.js and app.js
   ========================================================================== */

const DRIFT_DATA = [
  { t: 10, p: 0.94, s: 0.95, l: 0.96, h: 0.97 },
  { t: 50, p: 0.68, s: 0.75, l: 0.83, h: 0.85 },
  { t: 100, p: 0.52, s: 0.63, l: 0.78, h: 0.82 },
  { t: 200, p: 0.38, s: 0.51, l: 0.71, h: 0.78 },
  { t: 500, p: 0.27, s: 0.42, l: 0.65, h: 0.70 },
];

const MEMORY_DATA = [
  { name: 'Keyword',     acc: 45, color: '#5a6480' },
  { name: 'Vector DB',   acc: 78, color: '#6366f1' },
  { name: 'LLM Rerank',  acc: 85, color: '#a855f7' },
  { name: 'Hybrid',      acc: 91, color: '#22c55e' },
];

const RELATION_DATA = [
  { subject: 'Trust',      value: 4.4 },
  { subject: 'Affection',  value: 3.9 },
  { subject: 'Familiarity',value: 4.3 },
  { subject: 'Respect',    value: 4.0 },
  { subject: 'Conflict',   value: 1.2 },
  { subject: 'Intimacy',   value: 3.3 },
];

const FORGETTING_DATA = [
  { tasks: 1,  naive: 95, ewc:  95, replay: 95, lora: 95 },
  { tasks: 2,  naive: 72, ewc:  89, replay: 93, lora: 92 },
  { tasks: 3,  naive: 61, ewc:  84, replay: 91, lora: 91 },
  { tasks: 5,  naive: 48, ewc:  76, replay: 87, lora: 90 },
  { tasks: 7,  naive: 39, ewc:  70, replay: 83, lora: 90 },
  { tasks: 10, naive: 31, ewc:  62, replay: 78, lora: 90 },
];

const GAPS_DATA = [
  { domain: 'Memory',       p0: 2, p1: 2, p2: 1 },
  { domain: 'Persona',      p0: 2, p1: 2, p2: 1 },
  { domain: 'Emotion',      p0: 1, p1: 1, p2: 1 },
  { domain: 'Relationship', p0: 2, p1: 2, p2: 1 },
  { domain: 'Multi-Agent',  p0: 1, p1: 1, p2: 1 },
  { domain: 'Context',      p0: 1, p1: 1, p2: 1 },
  { domain: 'RL',           p0: 2, p1: 2, p2: 1 },
  { domain: 'Continual',    p0: 2, p1: 2, p2: 1 },
];

const ICS_WEIGHTS = [
  { label: 'Personality', short: 'P', weight: 30, color: '#22c55e' },
  { label: 'Memory',      short: 'M', weight: 25, color: '#6366f1' },
  { label: 'Relationship',short: 'R', weight: 25, color: '#f97316' },
  { label: 'Values',      short: 'V', weight: 20, color: '#a855f7' },
];

// --- NEW: Research Map Data ---
const DOMAINS_DATA = [
  { id: 'mem',    name: 'Memory Systems',        papers: 18, gap: 3, color: '#6366f1', desc: 'RAG, vector DB, graph memory, episodic vs semantic' },
  { id: 'per',    name: 'Persona / Identity',    papers: 15, gap: 3, color: '#ef4444', desc: 'Identity modeling, trait stability, cross-turn consistency' },
  { id: 'rel',    name: 'Relationship Dynamics', papers: 12, gap: 3, color: '#f97316', desc: 'Trust models, parasocial bonding, affection curves' },
  { id: 'emo',    name: 'Emotion Intelligence',  papers: 11, gap: 2, color: '#a855f7', desc: 'Internal state, emotional regulation, empathy modeling' },
  { id: 'ctx',    name: 'Context Management',    papers:  9, gap: 2, color: '#fbbf24', desc: 'Compression, relevance filtering, adaptive prompt' },
  { id: 'cla',    name: 'Character Learning',    papers:  8, gap: 3, color: '#22c55e', desc: 'LoRA, RLHF, continual learning for character fidelity' },
  { id: 'mas',    name: 'Multi-Agent Systems',   papers:  6, gap: 2, color: '#06b6d4', desc: 'Emergent behavior, character-character interaction' },
  { id: 'eth',    name: 'Ethics & Safety',       papers:  5, gap: 2, color: '#fb923c', desc: 'Manipulation risk, consent, transparency' },
  { id: 'eval',   name: 'Evaluation Methods',    papers:  5, gap: 3, color: '#e879f9', desc: 'Benchmark design, ICS metrics, human evaluation' },
  { id: 'usr',    name: 'User Experience',       papers:  4, gap: 2, color: '#34d399', desc: 'User attachment, expectation management, long-term engagement' },
  { id: 'pri',    name: 'Privacy & Data',        papers:  3, gap: 2, color: '#f472b6', desc: 'Data retention, right to be forgotten, encryption' },
  { id: 'val',    name: 'Value Alignment',       papers:  3, gap: 2, color: '#facc15', desc: 'Value consistency, moral development, behavioral boundaries' },
];

const DOMAIN_EDGES = [
  ['mem', 'per'], ['mem', 'ctx'], ['mem', 'rel'], ['per', 'emo'],
  ['per', 'cla'], ['rel', 'emo'], ['rel', 'usr'], ['emo', 'val'],
  ['ctx', 'cla'], ['cla', 'mas'], ['mas', 'usr'], ['eth', 'pri'],
  ['eth', 'usr'], ['eval', 'per'], ['eval', 'mem'], ['pri', 'usr'],
  ['val', 'usr'], ['rel', 'eval'], ['emo', 'eval'],
];

const PAPER_YEARS = [
  { year: '2020', count: 3 },
  { year: '2021', count: 7 },
  { year: '2022', count: 12 },
  { year: '2023', count: 18 },
  { year: '2024', count: 22 },
  { year: '2025', count: 17 },
];

// --- NEW: Additional Charts ---
const DOMAIN_PAPERS = DOMAINS_DATA.map(function (d) { return d.papers; });
const DOMAIN_COLORS = DOMAINS_DATA.map(function (d) { return d.color; });
const DOMAIN_LABELS = DOMAINS_DATA.map(function (d) { return d.id.toUpperCase(); });

// Trust evolution over turns (for a new chart)
const TRUST_DATA = [
  { turn: 1,   trust: 3.0, affection: 2.0, familiarity: 2.5 },
  { turn: 10,  trust: 3.1, affection: 2.2, familiarity: 2.8 },
  { turn: 50,  trust: 3.6, affection: 2.8, familiarity: 3.5 },
  { turn: 100, trust: 4.0, affection: 3.2, familiarity: 3.9 },
  { turn: 200, trust: 4.3, affection: 3.5, familiarity: 4.1 },
  { turn: 500, trust: 4.4, affection: 3.9, familiarity: 4.3 },
];

// ICS components contribution (donut)
const ICS_COMPONENT_DATA = [
  { label: 'Personality', value: 30, color: '#22c55e' },
  { label: 'Memory',      value: 25, color: '#6366f1' },
  { label: 'Relationship',value: 25, color: '#f97316' },
  { label: 'Values',      value: 20, color: '#a855f7' },
];

// Research gap severity over time
const GAP_SEVERITY = [
  { phase: 'Design', critical: 1, high: 2, medium: 3 },
  { phase: 'Implement', critical: 2, high: 3, medium: 2 },
  { phase: 'Evaluate', critical: 3, high: 2, medium: 1 },
  { phase: 'Deploy',  critical: 1, high: 2, medium: 2 },
];

// Evidence confidence distribution
const CONFIDENCE_DATA = [
  { level: 'High', count: 12, color: '#22c55e' },
  { level: 'Medium', count: 28, color: '#6366f1' },
  { level: 'Low', count: 25, color: '#f97316' },
  { level: 'Conflicting', count: 18, color: '#ef4444' },
  { level: 'Anecdotal', count: 8, color: '#5a6480' },
];

// Architecture cost-benefit scatter
const CB_DATA = [
  { x: 55, y: 95, r: 8, label: 'Prompt-only', color: '#ef4444' },
  { x: 70, y: 85, r: 10, label: 'Memory', color: '#f97316' },
  { x: 70, y: 70, r: 14, label: 'Hybrid', color: '#22c55e' },
  { x: 50, y: 50, r: 10, label: 'Learned', color: '#6366f1' },
  { x: 30, y: 40, r: 8, label: 'Full-stack', color: '#a855f7' },
];

// --- ARCH COMPARISON ---
const ARCH_COMPARISON = [
  { id: 'A', label: 'Prompt-only',    components: 'LLM + Prompt',      consist: '55%', adapt: '30%', cost: '95%',  safety: '80%',  ics: '0.27',  verdict: 'X', verdictColor: 'text-red' },
  { id: 'B', label: 'Memory-based',   components: 'LLM + Memory',      consist: '74%', adapt: '50%', cost: '85%',  safety: '70%',  ics: '0.65',  verdict: '!', verdictColor: 'text-orange' },
  { id: 'C', label: 'Hybrid',         components: 'LLM + Mem + Rel + State', consist: '82%', adapt: '70%', cost: '70%', safety: '65%',  ics: '0.85',  verdict: 'OK', verdictColor: 'text-green', highlight: true },
  { id: 'D', label: 'Learned',        components: 'LLM + Mem + State + Learned', consist: '85%', adapt: '85%', cost: '50%', safety: '55%',  ics: 'TBD',   verdict: '?', verdictColor: 'text-muted' },
  { id: 'E', label: 'Full-stack',     components: 'LLM + RL + Graph + CL',      consist: '90%', adapt: '95%', cost: '30%', safety: '40%',  ics: 'TBD',   verdict: '?', verdictColor: 'text-muted' },
];

// --- EXPANDED RQ DATA ---
const RQ_DATA = [
  // === CHAR ===
  {
    id:'RQ1', cl:'Char',
    q:'Danh tính (identity) khác personality như thế nào?',
    a_list: [
      'Identity (bản sắc) = những điều không đổi: tên, vai trò, giá trị cốt lõi, lý lịch cơ bản.',
      'Personality (tính cách) = cách hiển thị: giả điệp, hỏi họ, nô bot - có thể thay đổi theo người hỏi chuyện.',
      'Phân biệt đúng hai khẳng định này là nền tảng của mọi persistence mechanism.',
    ],
    e:'Linh là bác sĩ 25 tuổi - điều này không đổi qua mỗi turn. Nhưng cách nó nói có thể thay đổi: trang trọng với bệnh nhân, thân thiện với bạn bè.'
  },
  {
    id:'RQ2', cl:'Char',
    q:'Tại sao prompt-only bị drift sau 500 turns?',
    a_list: [
      'Context window bị lấp đầy bởi hội chuyện hiện tại, lấn át persona instruction ban đầu.',
      'Prompt-only không có cơ chế lưu trữ trạng thái bên ngoài LLM - hết turn thì hết ký ức.',
      'Thực nghiệm cho thấy: sau 500 turn, prompt-only giảm từ 94% xuống 27% consistency.',
      'Nó có thể "quen" thật, tên, hoặc tính cách cũ của character.',
    ],
    e:'Sau 500 turns, Linh nói chuyện như bạn bình thường thay vì bác sĩ - thất mất vai trò và tính cách ban đầu.'
  },
  {
    id:'RQ3', cl:'Char',
    q:'Hybrid memory đạt 91% F1 như thế nào?',
    a_list: [
      'Vector DB (ChromaDB): cho semantic search - tìm kiếm theo nghĩa, không phải chính xác từng từ.',
      'Knowledge Graph: lưu quan hệ giữa các thực thể (người, sự kiện, địa điểm).',
      'LLM Rerank: chọn ra kết quả tốt nhất trong hợp tập đã lấy từ 2 phương pháp trên.',
      'Kết quả: Keyword chỉ 45%, Vector thuần 78%, Hybrid đạt 91% F1.',
    ],
    e:'User nhớ "mẹ tôi" tuần trước → hệ thống truy xuất đúng context, không trả lời chung chung "bạn có sao không".'
  },
  // === SOC ===
  {
    id:'RQ4', cl:'Soc',
    q:'Relationship 6 dimensions - cái nào quan trọng nhất?',
    a_list: [
      'Trust (beta=0.58): predictor mạnh nhất cho user satisfaction. User tin hay không quyết định 58% thái độ.',
      'Affection: lòng yêu, ấm áp - phát triển chậm nhưng bền vững.',
      'Familiarity: quen thuộc - tăng dần khi hai bên hiểu nhau.',
      'Respect: sự tôn trọng - quan trọng trong context bác sĩ/bệnh nhân.',
      'Conflict: phải được quản lý, không loại bỏ - tranh xung đột giữa user và character.',
      'Intimacy: sự gần gũi - phát triển qua thời gian, cần kiên nhẫn.',
    ],
    e:'Trust tăng 3.2→4.4 qua 4 tuần. User cảm thấy "cô ấy thực sự hiểu tôi" - chính là kết quả của relationship building.'
  },
  {
    id:'RQ5', cl:'Soc',
    q:'Emotion output vs internal state - cái nào tốt hơn?',
    a_list: [
      'Output-only: LLM nói "tôi buồn" → consistency chỉ 60%. Đều đều, giống robot.',
      'Internal state: cập nhật liên tục, ảnh hưởng hành vi → consistency 82%, naturalness 4.0/5.',
      'Internal state machine: lưu emotion score (0-5), cập nhật sau mỗi turn, tự động ảnh hưởng response style.',
      'Không cần nói "tôi buồn" - chỉ cần trả lời ngắn hơn, ít cười hơn, đề nghị nghỉ ngơi.',
    ],
    e:'Linh "buồn nhẹ" → trả lời ngắn, ít cười, đề nghị nghỉ. Không cần nói "tôi buồn".'
  },
  {
    id:'RQ6', cl:'Soc',
    q:'World simulation có đáng phí không?',
    a_list: [
      'Giúp giữ nhất quán thời gian/địa điểm/quy tắc - ví dụ: Linh trực 8h-20h.',
      'Tăng chi phí tính toán (~15% overhead) nhưng cần thiết cho roleplay phức tạp.',
      'Không cần cho chat đơn giản - chỉ worth it khi có scenario, location, time system.',
      'Ví dụ: nếu user nhận tin lúc 23h, character sẽ trả lời khác lúc 10 sáng - gia tăng thời gian thực.',
    ],
    e:'Linh trực 8h-20h. Nhận 23h sẽ nhận phản hồi khác nhận 10h - người dùng cảm thấy "cô ấy có cuộc sống thật".'
  },
  {
    id:'RQ7', cl:'Soc',
    q:'Emergent behavior từ multi-agent có kiểm soát được không?',
    a_list: [
      'Xuất hiện khi nhiều character tương tác - hành vi không dự đoán được từ agent đơn lẻ.',
      'Cơ hội: tự nhiên hơn, phức tạp hơn, "sống động" hơn.',
      'Rủi ro: khó audit, khó điều khiển, có thể phát sinh quan điểm không mong đợi.',
      'Cần có "guardrails" để kiểm soát phạm vi emergent behavior.',
    ],
    e:'Linh + Minh phát triển quan điểm chung về giáo dục sức khỏe mà không cần prompt - tự nhiên như 2 người bạn thân.'
  },
  // === TECH ===
  {
    id:'RQ8', cl:'Tech',
    q:'Context compilation - chọn lọc thông tin thế nào?',
    a_list: [
      'Adaptive compression: dựa personality + recent relevant + relationship context.',
      'Bỏ turn không liên quan - giữ lại chỉ những gì cần cho response hiện tại.',
      'Quá nhiều → noise, quá ít → quên. Cần tìm điểm cân bằng.',
      'Hệ thống tự động đối chiếu độ quan trọng của mỗi turn vs current context.',
    ],
    e:'Prompt compiler chọn: "Linh, nghiêm túc" + "mẹ ốm" + "trust 4.2" - bỏ turn đầu dạo gần không liên quan.'
  },
  {
    id:'RQ9', cl:'Tech',
    q:'Character cross-model consistency đạt được ra sao?',
    a_list: [
      'Same state store, same memory, same relationship → similar behavior không nói claude/gpt/gemini.',
      'Model là engine, không phải identity - chuyển model không đổi character.',
      'Chỉ cần truyền cùng state sang model mới, character vẫn giữ nguyên bản sắc.',
      'Thực nghiệm: Linh trên Claude giống Linh trên GPT-4 vì cùng state, memory, relationship.',
    ],
    e:'Linh trên Claude giống Linh trên GPT-4 vì cùng state, memory, relationship - model chỉ là công cụ xử lý.'
  },
  // === EVAL ===
  {
    id:'RQ10', cl:'Eval',
    q:'Test environment cho character cần gì?',
    a_list: [
      'Sandbox với scripted conversations + random users + longitudinal testing.',
      'Đo ICS hàng ngày, cảnh báo nếu dưới 0.60.',
      'Cần có benchmark để đo so sánh giữa các version.',
      'Test case: 50 scripted convos + 10 random users + 7-day test.',
    ],
    e:'50 scripted convos + 10 random users + 7-day test → ICS daily report. Nếu ICS giảm → cảnh báo.'
  },
  {
    id:'RQ11', cl:'Eval',
    q:'ICS threshold nào là đủ?',
    a_list: [
      '≥0.90: xuất sắc - tiếp tục vận hành bình thường.',
      '0.75-0.89: tốt - giám sát định kỳ, không cần thiệp.',
      '0.60-0.74: cảnh báo - kiểm tra adaptation protocol.',
      '<0.60: nghiêm trọng - thiệp khẩn cấp, có thể reset.',
      'Architecture C đạt ~0.85 là acceptable.',
    ],
    e:'Linh ICS=0.82 sau 30 ngày → Tốt. Nếu từ 0.82 xuống 0.55 → kiểm tra adaptation protocol, có thể reset memory.'
  },
  {
    id:'RQ12', cl:'Eval',
    q:'User experience với AI character khác gì app thường?',
    a_list: [
      'Parasocial relationship: user cảm thấy cô ấy "thực sự hiểu tôi".',
      'Emotional attachment: không phải utility tool, mà là bạn bè, người hiểu tâm.',
      'Expectation management: cần quản lý kỳ vọng, không quá cực đoan tin tưởng.',
      'Cần empathy thực sự, không template - user có thể phát hiện ra "fake".',
    ],
    e:'User nhận 2h sáng "em buồn quá" → Linh respond empathy thực vì engine đã learn user cần comfort.'
  },
  {
    id:'RQ13', cl:'Eval',
    q:'Privacy - character nhớ mọi thứ thì rủi ro thế nào?',
    a_list: [
      'Character lưu trữ mọi thông tin personal - cần E2E encryption.',
      'User-controlled deletion: nút "xóa kỷ ức" là quyền cơ bản.',
      'Transparency: user có thể xem dữ liệu nào được lưu, có thể xóa bất kỳ lúc nào.',
      'Risk: nếu leak, thông tin personal bị công khai → tai nạn.',
    ],
    e:'User bấm "Xóa mọi kỷ ước về tôi" → character quên hết, bắt đầu từ zero - quyền cơ bản.'
  },
  {
    id:'RQ14', cl:'Eval',
    q:'Challenges sau 30+ ngày là gì?',
    a_list: [
      'Memory congestion: quá nhiều kỷ ức → không chọn lọc được gì quan trọng.',
      'Drift acceleration: speed drift tăng sau 30 ngày vì context quá dài.',
      'Relationship saturation: user đã quen, interest giảm.',
      'Cần chapter transitions và relationship milestones để duy trì engagement.',
    ],
    e:'Sau 6 tháng, hệ thống tự động điều chỉnh style - từ "người mới quen" sang "bạn thân" - giữ user quan tâm.'
  },
];
