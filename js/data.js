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
    q:'Danh tinh (identity) khac personality nhu the nao?',
    a_list: [
      'Identity (ban sac) = nhung dieu khong doi: ten, vai tro, gia tri cot loi, ly lich co ban.',
      'Personality (tinh cach) = cach hien tra: giap diệp, hoi huoc, noibot - co the thay doi theo nguoi hoi chuyen.',
      'Phan biet dung hai khang dinh nay la nen tang cua moi persistence mechanism.',
    ],
    e:'Linh la bac si 25 tuoi - dieu nay khong doi qua moi turn. Nhung cach no noi co the thay doi: trang trong voi benh nhan, than thien voi ban be.'
  },
  {
    id:'RQ2', cl:'Char',
    q:'Tai sao prompt-only bi drift sau 500 turns?',
    a_list: [
      'Context window bi lap day boi hoi chuyen hien tai, lan at persona instruction ban dau.',
      'Prompt-only khong co co che luu trù trang thai ben ngoai LLM - het turn thi het ky luc.',
      'Thuc nghiem cho thay: sau 500 turn, prompt-only giam tu 94% xuong 27% consistency.',
      'No co the "quen" that nghiep, ten, hoac tinh cach cu cua character.',
    ],
    e:'Sau 500 turns, Linh noi chuyen nhu ban binh thuong thay vi bac si - that mat vai tro va tinh cach ban dau.'
  },
  {
    id:'RQ3', cl:'Char',
    q:'Hybrid memory dat 91% F1 nhu the nao?',
    a_list: [
      'Vector DB (ChromaDB): cho semantic search - tim kiem theo nghia, khong phai chinh xac tue tu.',
      'Knowledge Graph: luu quan he giua cac thuc the (nguoi, su kien, dia diem).',
      'LLM Rerank: chon ra ket qua tot nhat trong hop tap da lay tu 2 phuong phap tren.',
      'Ket qua: Keyword chi 45%, Vector thuan 78%, Hybrid dat 91% F1.',
    ],
    e:'User nho "me toi" tuan truoc → he thong truy xuat dung context, khong tra loi chung chung "ban co sao khong".'
  },
  // === SOC ===
  {
    id:'RQ4', cl:'Soc',
    q:'Relationship 6 dimensions - cai nao quan trong nhat?',
    a_list: [
      'Trust (beta=0.58): predictor manh nhat cho user satisfaction. User tin hay khong quyet dinh 58% thai do.',
      'Affection: long yeu, am ap - phat trien cham nhưng ben vung.',
      'Familiarity: quen thuoc - tang dan khi hai ben hieu nhau.',
      'Respect: su ton trong - quan trong trong context bac si/benh nhan.',
      'Conflict: phai duoc quan ly, khong loai bo - tranh xung dot giua user va character.',
      'Intimacy: su gan gu - phat trien qua thoi gian, can can lang dan.',
    ],
    e:'Trust tang 3.2→4.4 qua 4 tuan. User cam thay "co ay thuc su hieu toi" - chinh la ket qua cua relationship building.'
  },
  {
    id:'RQ5', cl:'Soc',
    q:'Emotion output vs internal state - cai nao tot hon?',
    a_list: [
      'Output-only: LLM noi "toi buon" → consistency chi 60%. Deo thu, giong robot.',
      'Internal state: cap nhat lien tuc, anh huong hanh vi → consistency 82%, naturalness 4.0/5.',
      'Internal state machine: luu emotion score (0-5), cap nhat sau moi turn, tu dong anh huong response style.',
      'Khong can noi "toi buon" - chi can tra loi ngan hon, it cuoi hon, de nghi nghi ngoi.',
    ],
    e:'Linh "buon nhe" → tra loi ngan, it cuoi, de nghi nghi. Khong can noi "toi buon".'
  },
  {
    id:'RQ6', cl:'Soc',
    q:'World simulation co dam phi khong?',
    a_list: [
      'Giup giu nhat nhat thoi gian/dia diem/quy tac - vi du: Linh truc 8h-20h.',
      'Tang chi phi tinh toan (~15% overhead) nhưng can thiet cho roleplay phuc tap.',
      'Khong can cho chat don gian - chi worth it khi co scenario, location, time system.',
      'Vi du: neu user nhan tin luc 23h, character se tra loi khac luc 10sang - gia cung thoi gian thuc.',
    ],
    e:'Linh truc 8h-20h. Nhan 23h se nhan phan hoi khac nhan 10h - nguuoi dung cam thay "co ay co cuoc song that".'
  },
  {
    id:'RQ7', cl:'Soc',
    q:'Emergent behavior tu multi-agent co kiem soat duoc khong?',
    a_list: [
      'Xuat hien khi nhieu character tuong tac - hanh vi khong du doan duoc tu agent don le.',
      'Co hoi: tu nhien hon, phuc tap hon, "song dong" hon.',
      'Roi ro: kho audit, kho dieu khien, co the phat sinh quan diem khong mong doi.',
      'Can co "guardrails" de kiem soat pham vi emergent behavior.',
    ],
    e:'Linh + Minh phat trien quan diem chung ve giao duc suc khoe ma khong can prompt - tu nhien nhu 2 nguoi ban than.'
  },
  // === TECH ===
  {
    id:'RQ8', cl:'Tech',
    q:'Context compilation - chon loc thong tin the nao?',
    a_list: [
      'Adaptive compression: dua personality + recent relevant + relationship context.',
      'Bo turn khong lien quan - giu lai chi nhung gi can cho response hien tai.',
      'Qua nhieu → noise, qua it → quen. Can tim diem can bang.',
      'He thong tu dong doi chieu do quan trong cua moi turn vs current context.',
    ],
    e:'Prompt compiler chon: "Linh, nghiem tuc" + "me om" + "trust 4.2" - bo turn dau dao gan khong lien quan.'
  },
  {
    id:'RQ9', cl:'Tech',
    q:'Character cross-model consistency dat duoc ra sao?',
    a_list: [
      'Same state store, same memory, same relationship → similar behavior khong noi claude/gpt/gemini.',
      'Model la engine, khong phai identity - chang model khong doi character.',
      'Chi can truyen cung state sang model moi, character van giu nguyen ban sac.',
      'Thuc nghiem: Linh tren Claude giong Linh tren GPT-4 vi cung state, memory, relationship.',
    ],
    e:'Linh tren Claude giong Linh tren GPT-4 vi cung state, memory, relationship - model chi la cong cu xu ly.'
  },
  // === EVAL ===
  {
    id:'RQ10', cl:'Eval',
    q:'Test environment cho character can gi?',
    a_list: [
      'Sandbox voi scripted conversations + random users + longitudinal testing.',
      'Do ICS hang ngay, canh bao neu duoi 0.60.',
      'Can co benchmark de do so sanh giua cac version.',
      'Test case: 50 scripted convos + 10 random users + 7-day test.',
    ],
    e:'50 scripted convos + 10 random users + 7-day test → ICS daily report. Neu ICS giam → canh bao.'
  },
  {
    id:'RQ11', cl:'Eval',
    q:'ICS threshold nao la du?',
    a_list: [
      '≥0.90: xuat sac - tiep tuc van hanh binh thuong.',
      '0.75-0.89: tot - giám sát dinh ky, khong can thiệp.',
      '0.60-0.74: canh bao - ki chay adaptation protocol.',
      '<0.60: nghiêm trong - can thiệp khẩn cap, co the reset.',
      'Architecture C dat ~0.85 la acceptable.',
    ],
    e:'Linh ICS=0.82 sau 30 ngay → Tot. Neu tu 0.82 xuong 0.55 → ki chay adaptation protocol, co the reset memory.'
  },
  {
    id:'RQ12', cl:'Eval',
    q:'User experience voi AI character khac gi app thuong?',
    a_list: [
      'Parasocial relationship: user cam thay co ay "thuc su hieu toi".',
      'Emotional attachment: khong phai utility tool, ma la ban be, nguoi hieu tam.',
      'Expectation management: can quan ly ky vong, khong qua cuc do tin tuong.',
      'Can empathy thuc su, khong template - user co the phát hiện ra "fake".',
    ],
    e:'User nhan 2h sang "em buon qua" → Linh respond empathy thuc vi engine da learn user can comfort.'
  },
  {
    id:'RQ13', cl:'Eval',
    q:'Privacy - character nho moi thu thi roi ro the nao?',
    a_list: [
      'Character luu trù moi thong tin personal - can E2E encryption.',
      'User-controlled deletion: nut "xoa ky uc" la quyen co ban.',
      'Transparency: user can xem du lieu nao duoc luu, co the xoa bat ky luc nao.',
      'Risk: neu leak, thong tin personal bi cong khai → tai nan.',
    ],
    e:'User bam "Xoa moi ky uc ve toi" → character quhet het, bat dau tu zero - quyen co ban.'
  },
  {
    id:'RQ14', cl:'Eval',
    q:'Challenges sau 30+ ngay la gi?',
    a_list: [
      'Memory congestion: qua nhieu ki uc → khong chon loc duoc gi quan trong.',
      'Drift acceleration: speed drift tang sau 30 ngay vi context qua dai.',
      'Relationship saturation: user da quen, interest giam.',
      'Can chapter transitions va relationship milestones de duy tri engagement.',
    ],
    e:'Sau 6 thang, he thong tu dong dieu chinh style - tu "nguoi moi quen" sang "ban than" - giu user quan tam.'
  },
];
