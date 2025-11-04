import React, { useState } from "react";
import { X, Star, Image as ImageIcon } from "lucide-react";
import ReviewService from "../../../../service/ReviewService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // đảm bảo có dòng này (hoặc trong App.jsx)

export default function ReviewModal({ variantId, onClose, onReviewSuccess }) {
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [text, setText] = useState("");
    const [images, setImages] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setImages(previews);
    };

    // ✅ Hàm submit có xử lý lỗi & popup
    const handleSubmit = async () => {
        if (!rating || !text.trim()) {
            toast.warn("⚠️ Vui lòng nhập nội dung và chọn số sao!");
            return;
        }

        setSubmitting(true);

        try {
            const reviewData = {
                productVariantId: variantId,
                ratingScore: rating,
                content: text.trim(),
            };

            const files = images.map(img => img.file);

            // 🧠 Gọi API
            const result = await ReviewService.createReview(reviewData, files);

            if (result.success) {
                toast.success("🎉 Gửi đánh giá thành công!");

                // ✅ Gọi callback cập nhật review ở component cha
                if (typeof onReviewSuccess === "function") {
                    onReviewSuccess(result.result);
                }

                // ✅ Reset form sau khi gửi thành công
                setRating(0);
                setText("");
                setImages([]);

                onClose();
            } else {
                toast.error(result.message || "❌ Không thể gửi đánh giá. Vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi gửi đánh giá:", error);
            toast.error("🚫 Đã xảy ra lỗi khi gửi đánh giá. Kiểm tra kết nối mạng!");
        } finally {
            // ✅ Dù lỗi hay thành công đều dừng loading
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    disabled={submitting}
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center text-black">
                    Viết đánh giá sản phẩm
                </h2>

                {/* Chọn số sao */}
                <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                        <Star
                            key={star}
                            size={30}
                            className={`cursor-pointer transition-colors ${
                                (hoveredStar || rating) >= star
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                            }`}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>

                {/* Nhập nội dung */}
                <textarea
                    className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Chia sẻ cảm nhận của bạn..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    disabled={submitting}
                />

                {/* Upload ảnh */}
                <div className="mb-4">
                    <label className="flex items-center gap-2 text-blue-600 cursor-pointer">
                        <ImageIcon size={20} />
                        <span>Chọn ảnh</span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                            disabled={submitting}
                        />
                    </label>

                    {images.length > 0 && (
                        <div className="mt-3 grid grid-cols-4 gap-2">
                            {images.map((img, i) => (
                                <div key={i} className="relative">
                                    <img
                                        src={img.url}
                                        alt={`preview-${i}`}
                                        className="w-full h-20 object-cover rounded-lg border"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Nút hành động */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                        disabled={submitting}
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className={`px-4 py-2 rounded-lg text-white ${
                            submitting
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {submitting ? "Đang gửi..." : "Gửi đánh giá"}
                    </button>
                </div>
            </div>
        </div>
    );
}
