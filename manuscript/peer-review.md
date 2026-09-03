# Peer Review — Aivora Lab Research Paper

**Reviewer:** Anonymous Reviewer #1 (Hyper-Critical)
**Manuscript:** "Xây Dựng AI Character Có Bản Sắc Bền Vững Trong Tương Tác Dài Hạn"
**Date:** 2026-09-03
**Decision:** Major Revision Required

---

## Overall Assessment

 manuscript có cấu trúc rõ ràng, coverage rộng across 9 domains, và evidence database khá comprehensive (65 entries). Tuy nhiên, có nhiều vấn đề về methodology, statistical rigor, và overclaim cần được giải quyết trước khi publication.

**Recommendation: Major Revision**

---

## Major Issues

### M1: Evidence Quality Inconsistency [SEVERE]

**Issue:** Manuscript trộn lẫn evidence từ nhiều nguồn với quality khác nhau mà không phân biệt rõ ràng.

**Examples:**
- E-MEM-006 (LongMemEval): Vendor-reported vs independent benchmark conflict không được giải thích
- E-EVAL-002 (Mem0): 92.5% (vendor) vs 61.43% (independent) — manuscript chỉ liệt kê mà không analyze discrepancy
- Nhiều evidence từ "papers/memory/quantitative-results.md" là synthetic benchmarks, không phải peer-reviewed studies

**Required Action:**
1. Phân loại rõ ràng: Peer-reviewed vs Preprint vs Vendor benchmark
2. Giải thích conflicts (như Mem0 case)
3. Đánh giá lại strength của evidence từ non-peer-reviewed sources

---

### M2: Statistical Analysis Superficial [SEVERE]

**Issue:** Manuscript claims statistical significance nhưng thiếu nhiều elements cơ bản.

**Examples:**
- Table trong Q007 (Relationship):报告的 r=0.54*** không có confidence intervals
- "r=0.82, p<0.001" cho consistency-satisfaction correlation — sample size là bao nhiêu? meta-analysis hay single study?
- Cohen's d values (d=1.24, d=2.0) không có confidence intervals
- Multiple comparisons correction không được đề cập

**Required Action:**
1. Thêm confidence intervals cho tất cả correlations
2. Report sample sizes rõ ràng
3. Apply Bonferroni hoặc FDR correction cho multiple comparisons
4. Distinguish giữa calculated và reported statistics

---

### M3: Overclaim on Hybrid Architecture [MAJOR]

**Issue:** Manuscript claims "Hybrid architecture là optimal" nhưng evidence không support mạnh mẽ claim này.

**Analysis:**
- Personality consistency: Hybrid 0.85 vs Learned 0.81 — difference chỉ 0.04, không có statistical test
- Memory accuracy: Hybrid 91% vs LLM-based 85% — difference 6pp, nhưng latency cao hơn 5x
- Cost-complexity tradeoff không được quantified

**Required Action:**
1. Thêm cost-benefit analysis cho hybrid vs learned
2. Report statistical tests cho differences
3. Acknowledge rằng learned approach có thể competitive với更高的 budget

---

### M4: Missing Negative Evidence [MAJOR]

**Issue:** Manuscript almost entirely positive — không có discussion về failures hoặc limitations nghiêm trọng.

**Missing:**
- Studies showing hybrid approaches failing
- Cases where memory systems performed worse than naive context
- Instances where personality state caused more problems than solved
- User studies showing negative outcomes

**Required Action:**
1. Thêm section "Negative Results and Failures"
2. Discuss cases où các approaches tested trong paper không hoạt động
3. Acknowledge uncertainty areas rõ ràng hơn

---

### M5: Methodology Section Insufficient [MAJOR]

**Issue:** Methodology (Section 4) quá ngắn và thiếu details.

**Missing:**
- Search strategy details (databases, keywords, inclusion/exclusion criteria)
- PRISMA flow diagram cho literature selection
- Data extraction protocol
- Quality assessment method for included studies
- Inter-rater reliability cho evidence extraction

**Required Action:**
1. Expand methodology theo PRISMA guidelines
2. Thêm flow diagram
3. Report inter-rater reliability cho evidence extraction
4. Thêm sensitivity analysis

---

### M6: Citation Issues [MAJOR]

**Issue:** Nhiều citations thiếu thông tin đầy đủ.

**Examples:**
- "Chen et al. (2024). arXiv:2402.xxxx" — arXiv ID không complete
- "Wang et al. (2024)" — conference/journal không rõ
- Several papers chỉ có "arXiv:2402.xxxx" format

**Required Action:**
1. Fix tất cả citations với đầy đủ information
2. Verify arXiv IDs và DOI
3. Thêm DOI cho tất cả papers có thể

---

## Minor Issues

### m1: Language and Style

- Some sections mix English và Vietnamese inconsistently
- Technical terms nên được define khi first use
- Table captions nên descriptive hơn

### m2: Figure Quality

- ASCII art diagrams (Fig 1 trong role-playing section) không professional
- Nên thay bằng proper figures

### m3: Section Organization

- Section 14 (Deep Learning) và 15 (ML) overlap đáng kể
- Có thể merge hoặc clarify distinction

### m4: Length Inconsistency

- Một số sections quá chi tiết (Memory: 800+ lines) trong khi sections khác rất ngắn (World-Simulation: 400 lines)
- Cần balance hơn

---

## Specific Section Comments

### Abstract
- "79 papers được phân tích" — cần thêm timeframe (2020-2026?)
- "65 evidence entries" — definition của "evidence entry" cần clear
- ICS = 0.85 claim cần statistical support

### Section 3 (RQs)
- RQ9 (Model Independence) được đề cập nhưng không có results section riêng
- Cần thêm subsection hoặc move đến Appendix

### Section 5 (Literature Review)
- quá dài và repetitive
- Nên condense thành 2-3 subsections thay vì 5.1.1, 5.1.2, 5.1.3

### Section 7 (Personality)
- Drift rates (-0.13%/turn) cần clarification: tính trên turn hay trên token?
- Cross-turn consistency measurement methodology không clear

### Section 8 (Memory)
- "91% F1" — F1 của task gì? retrieval? QA? consolidation?
- Generalization gap (34pp) là finding quan trọng nhất — nên highlight rõ hơn

### Section 9 (Relationship)
- Bickmore & Picard (2005) là 20+ năm trước — cần supplement với recent studies
- Cultural bias (90%+ Western) cần discussion sâu hơn

### Section 12 (Multi-Agent)
- "Optimal agent count: 5-7" — từ source nào? cần citation
- CAREB-MAS (2026) là future-dated paper — verify existence

### Section 21 (Evaluation)
- "Hybrid evaluation ROI 2.5x" — calculation methodology không clear
- Cost figures ($0.01, $2.50, $0.80) cần source

### Section 25 (Proposed Framework)
- Architecture diagram quá abstract — cần detailed component interactions
- Implementation roadmap là speculation, không có evidence support

---

## Questions for Authors

1. **Evidence selection bias:** Làm sao đảm bảo không cherry-picking papers support hypothesis?
2. **Statistical power:** Hầu hết studies có small N (<100) — làm sao generalizable?
3. **Publication bias:** Negative results có được tìm kiếm không?
4. **Cultural validity:** Western-centric findings có áp dụng được cho Vietnamese context không?
5. **Practical feasibility:** Architecture C với 7 modules — resource requirements thực tế là bao nhiêu?
6. **Baseline comparison:** So sánh với what baseline? Zero-shot LLM? Fine-tuned model?
7. **Ablation studies:** Đã có ablation cho từng component không?
8. **User studies:** Human evaluation methodology chi tiết là gì?

---

## Revision Checklist

- [ ] Fix all citation errors
- [ ] Add confidence intervals for statistics
- [ ] Apply multiple comparisons correction
- [ ] Expand methodology section (PRISMA)
- [ ] Add negative results discussion
- [ ] Resolve evidence conflicts (Mem0, etc.)
- [ ] Balance section lengths
- [ ] Replace ASCII figures with proper visualizations
- [ ] Answer all reviewer questions
- [ ] Add limitations subsection trong mỗi domain section
- [ ] Clarify statistical methods
- [ ] Verify all arXiv IDs and DOIs
- [ ] Add sensitivity analysis
- [ ] Include power analysis

---

## Final Recommendation

 manuscript có potential nhưng cần **Major Revision** trước khi xem xét publication. Các issues về evidence quality, statistical rigor, và missing negative results là critical cần address.

**Estimated revision time:** 2-4 weeks
**Recommended action:** Address all Major Issues, then resubmit for review.

---

*Reviewer Signature: Anonymous Reviewer #1*
*Date: 2026-09-03*
