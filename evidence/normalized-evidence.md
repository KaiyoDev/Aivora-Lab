# Normalized Evidence

## Hướng dẫn

File này chứa evidence đã được chuẩn hóa về cùng format, sẵn sàng cho phân tích chéo.

**Quy tắc:**
- Mỗi evidence phải có source truy ngược được.
- Gán nhãn rõ ràng: `[EVIDENCE]`, `[SYNTHESIS]`, `[INFERENCE]`, v.v.
- Không thêm inference vào đây — nếu là suy luận, dùng nhãn `[INFERENCE]`.

---

## Hệ thống nhãn

| Nhãn | Định nghĩa |
|---|---|
| `[EVIDENCE]` | Kết quả được hỗ trợ trực tiếp bởi nguồn nghiên cứu |
| `[SYNTHESIS]` | Kết luận được tổng hợp từ nhiều evidence |
| `[INFERENCE]` | Suy luận logic từ evidence nhưng chưa được kiểm chứng trực tiếp |
| `[HYPOTHESIS]` | Giả thuyết cần được kiểm chứng bằng experiment |
| `[PROPOSED]` | Đề xuất thiết kế/kiến trúc của Aivora |
| `[OPEN QUESTION]` | Câu hỏi chưa có evidence đủ mạnh để kết luận |

---

## Template Entry

### Evidence ID

### Nội dung evidence (đã chuẩn hóa)

### Nhãn
> `[EVIDENCE]` / `[INFERENCE]` / ...

### Source
- **Paper:**
- **URL / DOI:**

### RQ liên quan
> Liên quan đến RQ nào?

### Mức độ tin cậy
- [ ] Thấp
- [ ] Trung bình
- [ ] Cao

### Ghi chú
> Notes thêm nếu có.

---

## Tình trạng hiện tại

Chưa có evidence nào được chuẩn hóa.

---

*Lưu ý: Chỉ tạo template. Chưa điền dữ liệu thật.*
