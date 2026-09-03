# Methodology

## Phương pháp nghiên cứu

File này mô tả phương pháp nghiên cứu được sử dụng trong Aivora Lab.

---

## Quy trình nghiên cứu

### Giai đoạn 1: Thu thập Evidence
- Tìm kiếm paper liên quan đến các RQ
- Trích xuất evidence từ paper
- Ghi nhận vào `evidence/raw-evidence.md`

### Giai đoạn 2: Chuẩn hóa Evidence
- Chuyển đổi evidence về cùng format
- Gán nhãn `[EVIDENCE]`, `[SYNTHESIS]`, v.v.
- Ghi vào `evidence/normalized-evidence.md`

### Giai đoạn 3: Phân tích chéo
- So sánh evidence từ nhiều paper
- So sánh kết quả từ nhiều AI model
- Ghi vào `synthesis/cross-paper-analysis.md` và `synthesis/cross-model-analysis.md`

### Giai đoạn 4: Tổng hợp nghiên cứu
- Rút ra kết luận từ evidence
- Xác định research gaps
- Ghi vào `synthesis/final-research.md`

### Giai đoạn 5: Đề xuất Hypothesis
- Xây dựng giả thuyết từ tổng hợp
- Kiểm tra tính hợp lý
- Ghi vào `research/hypotheses.md`

### Giai đoạn 6: Thiết kế Experiment
- Thiết kế thí nghiệm kiểm chứng hypothesis
- Xác định metric đánh giá
- Ghi proposal vào `experiments/proposed/`

### Giai đoạn 7: Chạy Experiment
- Thực hiện thí nghiệm
- Ghi kết quả vào `experiments/results/`

### Giai đoạn 8: Kết luận và Viết paper
- Tổng hợp kết quả
- So sánh với hypothesis
- Viết paper LaTeX vào `latex/`

---

## Tiêu chuẩn đánh giá evidence

| Yếu tố | Mô tả |
|---|---|
| Source quality | Nguồn từ venue uy tín (NeurIPS, ICML, ACL, AAAI, ...) |
| Reproducibility | Kết quả có thể tái hiện |
| Sample size | Cỡ mẫu đủ lớn cho kết luận thống kê |
| Baseline | Có so sánh với baseline rõ ràng |
| Statistical significance | Có p-value hoặc confidence interval |

---

## Nguyên tắc research integrity

Xem `README.md` phần **Tính toàn vẹn nghiên cứu** để biết chi tiết.

---

*Lưu ý: Đây là tài liệu phương pháp luận. Chưa tiến hành nghiên cứu thực tế.*
