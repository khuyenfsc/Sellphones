import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AdminReviewService from "../../../../service/AdminReviewService";

const statusOptions = ["APPROVED", "PENDING", "DISAPPROVED"];

export default function ReviewDetailModal({
    isOpen,
    onClose,
    review,
    setIsReloaded,
    isReloaded
}) {
    const [status, setStatus] = useState(review?.status || "");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (!review) return null;

    const handleSaveStatus = async () => {
        if (!review) return;
        setLoading(true);
        try {
            const res = await AdminReviewService.updateReview(review.id, { status });
            if (res.success) {
                toast.success("Cập nhật trạng thái review thành công!");
                onClose();
                setIsReloaded(!isReloaded);
            } else {
                toast.error(res.message || "Cập nhật thất bại!");
            }
        } catch (err) {
            toast.error("Đã có lỗi xảy ra khi cập nhật review");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!review) return;

        const confirm = await Swal.fire({
            title: "Bạn chắc chắn?",
            text: "Review sẽ bị xóa và không thể khôi phục!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
            reverseButtons: true
        });

        if (!confirm.isConfirmed) return;

        setLoading(true);
        try {
            const res = await AdminReviewService.deleteReview(review.id);

            if (res.success) {
                toast.success("Xóa review thành công!");
                onClose();
                setIsReloaded(!isReloaded);
            } else {
                toast.error(res.message || "Xóa review thất bại!");
            }
        } catch (err) {
            toast.error("Đã có lỗi xảy ra khi xóa review");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const date = new Date(review.createdAt);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()} ${String(date.getHours()).padStart(
        2,
        "0"
    )}:${String(date.getMinutes()).padStart(2, "0")}`;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Background */}
                    <motion.div
                        className="fixed inset-0 bg-black z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed top-0 right-0 h-full w-[600px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-semibold text-white">
                                Chi tiết Review #{review.id}
                            </h2>

                            {/* Button group */}
                            <div className="flex gap-2">
                                <button
                                    className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                                        }`}
                                    onClick={handleDelete}
                                    disabled={loading}
                                >
                                    Xóa
                                </button>

                                <button
                                    className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                    onClick={handleSaveStatus}
                                    disabled={loading}
                                >
                                    {loading ? "Đang lưu..." : "Lưu"}
                                </button>
                            </div>
                        </div>

                        {/* Grid info */}
                        <div className="grid grid-cols-2 gap-4 text-white text-sm mb-4">
                            <div className="flex gap-2">
                                <span className="font-medium">Người review:</span>
                                <span
                                    className="text-blue-400 hover:underline cursor-pointer"
                                    onClick={() => navigate(`/admin/users/view/${review.user.id}`)}
                                >
                                    {review.user.fullName}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <span className="font-medium">Ngày tạo:</span>
                                <span>{formattedDate}</span>
                            </div>

                            <div className="flex gap-2">
                                <span className="font-medium">Sản phẩm:</span>
                                <span
                                    className="text-blue-400 hover:underline cursor-pointer"
                                    onClick={() => navigate(`/admin/products/view/${review.product.id}`)}
                                >
                                    {review.productVariant.productVariantName}
                                </span>
                            </div>

                            <div className="flex gap-2 col-span-2">
                                <span className="font-medium">Rating:</span>
                                <span>{review.rating} ⭐</span>
                            </div>

                            <div className="flex gap-2 col-span-2">
                                <span className="font-medium">Nội dung:</span>
                                <span>{review.content}</span>
                            </div>

                            <div className="flex gap-2 col-span-2">
                                <span className="font-medium">Trạng thái:</span>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="bg-gray-800 text-white px-2 py-1 rounded"
                                >
                                    {statusOptions.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
