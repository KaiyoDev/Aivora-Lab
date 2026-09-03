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

const ARCH_COMPARISON = [
  { id: 'A', label: 'Prompt-only',    components: 'LLM + Prompt',      consist: '55%', adapt: '30%', cost: '95%',  safety: '80%',  ics: '0.27',  icsColor: 'text-orange', verdict: '❌', verdictColor: 'text-red' },
  { id: 'B', label: 'Memory-based',   components: 'LLM + Memory',      consist: '74%', adapt: '50%', cost: '85%',  safety: '70%',  ics: '0.65',  icsColor: 'text-orange', verdict: '⚠', verdictColor: 'text-orange' },
  { id: 'C', label: 'Hybrid',         components: 'LLM + Mem + Rel + State', consist: '82%', adapt: '70%', cost: '70%', safety: '65%',  ics: '0.85',  icsColor: 'text-green',  verdict: '✓', verdictColor: 'text-green', highlight: true },
  { id: 'D', label: 'Learned',        components: 'LLM + Mem + State + Learned', consist: '85%', adapt: '85%', cost: '50%', safety: '55%',  ics: 'TBD',   icsColor: 'text-muted', verdict: '🔬', verdictColor: 'text-muted' },
  { id: 'E', label: 'Full-stack',     components: 'LLM + RL + Graph + CL',      consist: '90%', adapt: '95%', cost: '30%', safety: '40%',  ics: 'TBD',   icsColor: 'text-muted', verdict: '🔭', verdictColor: 'text-muted' },
];

const RQ_DATA = [
  { id:'RQ1',  cl:'Char', q:'Danh tính (identity) khác personality như thế nào?',
    a:'Identity là bất biến (tên, vai trò, giá trị cốt lõi). Personality có thể thích nghi theo ngữ cảnh. Phân biệt đúng hai khái niệm này là nền tảng của mọi persistence mechanism.',
    e:'Linh là bác sĩ 25 tuổi - điều này không đổi qua mọi turn.' },
  { id:'RQ2', cl:'Char', q:'Tại sao prompt-only bị drift sau 500 turns?',
    a:'Context window bị lấp đầy bởi hội thoại hiện tại, lấn át persona instruction ban đầu. Prompt-only không có cơ chế lưu trữ trạng thái bên ngoài LLM.',
    e:'Sau 500 turns, Linh nói chuyện như bạn bình thường thay vì bác sĩ.' },
  { id:'RQ3', cl:'Char', q:'Hybrid memory đạt 91% F1 như thế nào?',
    a:'Vector DB (ChromaDB) cho semantic search + Knowledge graph cho quan hệ thực thể + LLM rerank cho precision. Keyword chỉ 45%, vector thuần 78%.',
    e:'User nhớ "mẹ tôi" tuần trước → hệ thống truy xuất đúng context, không trả lời chung chung.' },
  { id:'RQ4', cl:'Soc',  q:'Relationship 6 dimensions - cái nào quan trọng nhất?',
    a:'Trust (β=0.58) là predictor mạnh nhất cho satisfaction. Conflict phải được quản lý, không loại bỏ. Intimacy phát triển chậm nhưng bền vững.',
    e:'Trust tăng 3.2→4.4 qua 4 tuần. User cảm thấy "cô ấy thực sự hiểu tôi".' },
  { id:'RQ5', cl:'Soc',  q:'Emotion output vs internal state - cái nào tốt hơn?',
    a:'Output-only: LLM nói "tôi buồn" → consistency 60%. Internal state: cập nhật liên tục, ảnh hưởng hành vi → consistency 82%, naturalness 4.0/5.',
    e:'Linh "buồn nhẹ" → trả lời ngắn, ít cười, đề nghị nghỉ. Không cần nói "tôi buồn".' },
  { id:'RQ6', cl:'Soc',  q:'World simulation có đáng phí không?',
    a:'Giữ nhất quán thời gian/địa điểm/quy tắc. Tăng chi phí tính toán nhưng cần thiết cho roleplay phức tạp. Không cần cho chat đơn giản.',
    e:'Linh trực 8h-20h. Nhắn 23h sẽ nhận phản hồi khác nhắn 10h.' },
  { id:'RQ7', cl:'Soc',  q:'Emergent behavior từ multi-agent có kiểm soát được không?',
    a:'Xuất hiện khi nhiều character tương tác - hành vi không dự đoán được từ agent đơn lẻ. Cơ hội (tự nhiên hơn) nhưng rủi ro (khó audit).',
    e:'Linh + Minh phát triển quan điểm chung về giáo dục sức khỏe mà không cần prompt.' },
  { id:'RQ8', cl:'Tech', q:'Context compilation - chọn lọc thông tin thế nào?',
    a:'Adaptive compression: đưa personality + recent relevant + relationship context. Bỏ turns không liên quan. Quá nhiều → noise, quá ít → quên.',
    e:'Prompt compiler chọn: "Linh, nghiêm túc" + "mẹ ốm" + "trust 4.2" - bỏ turns dạo gần không liên quan.' },
  { id:'RQ9', cl:'Tech', q:'Character cross-model consistency đạt được ra sao?',
    a:'Same state store, same memory, same relationship → similar behavior regardless of Claude/GPT/Gemini. Model là engine, không phải identity.',
    e:'Linh trên Claude giống Linh trên GPT-4 vì cùng state, memory, relationship.' },
  { id:'RQ10',cl:'Eval', q:'Test environment cho character cần gì?',
    a:'Sandbox với scripted conversations + random users + longitudinal testing. Đo ICS hàng ngày, cảnh báo nếu dưới 0.60.',
    e:'50 scripted convos + 10 random users + 7-day test → ICS daily report.' },
  { id:'RQ11',cl:'Eval', q:'ICS threshold nào là đủ?',
    a:'≥0.90 xuất sắc, 0.75-0.89 tốt, 0.60-0.74 cảnh báo, <0.60 nghiêm trọng. Architecture C đạt ~0.85 là acceptable.',
    e:'Linh ICS=0.82 sau 30 ngày → Tốt. Nếu tụt 0.55 → kích hoạt adaptation protocol.' },
  { id:'RQ12',cl:'Eval', q:'User experience với AI character khác gì app thường?',
    a:'Parasocial relationship, emotional attachment, expectation management. Không phải utility tool - cần empathy thật sự, không template.',
    e:'User nhắn 2h sáng "em buồn quá" → Linh respond empathy thật vì engine đã learn user cần comfort.' },
  { id:'RQ13',cl:'Eval', q:'Privacy - character nhớ mọi thứ thì rủi ro thế nào?',
    a:'Character lưu trữ mọi thông tin personal. Cần E2E encryption, user-controlled deletion, transparency về data. Nút "xóa ký ức" là quyền cơ bản.',
    e:'User bấm "Xóa mọi ký ức về tôi" → character quên hết, bắt đầu từ zero.' },
  { id:'RQ14',cl:'Eval', q:'Challenges sau 30+ ngày là gì?',
    a:'Memory congestion, drift acceleration, relationship saturation. Cần chapter transitions và relationship milestones.',
    e:'Sau 6 tháng, hệ thống tự động điều chỉnh style - từ "người mới quen" sang "bạn thân".' },
];
