import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AdminCommentService from "../../../../service/AdminCommentService";

const statusOptions = ["APPROVED", "PENDING", "DISAPPROVED"];

export default function CommentDetailModal({ isOpen, onClose, comment, setIsReloaded, isReloaded }) {
    const [status, setStatus] = useState(comment?.status || "");
    const [replyVisible, setReplyVisible] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [parentComment, setParentComment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [replyLoading, setReplyLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveStatus = async () => {
        if (!comment) return;
        setLoading(true);
        try {
            const res = await AdminCommentService.updateComment(comment.id, { status });
            if (res.success) {
                toast.success("Cập nhật trạng thái comment thành công!");
                onClose();
                setIsReloaded(!isReloaded);
            } else {
                toast.error(res.message || "Cập nhật thất bại!");
            }
        } catch (err) {
            toast.error("Đã có lỗi xảy ra khi cập nhật comment");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleReplyComment = async () => {
        if (!replyContent.trim()) {
            toast.warning("Vui lòng nhập nội dung phản hồi!");
            return;
        }
        setReplyLoading(true);
        try {
            const res = await AdminCommentService.replyComment(comment.id, {
                content: replyContent.trim(),
            });
            if (res.success) {
                toast.success("Reply comment thành công!");
                setReplyContent("");
                setReplyVisible(false);
                setIsReloaded(!isReloaded);
            } else {
                toast.error(res.message || "Reply comment thất bại!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã có lỗi xảy ra khi reply comment");
        } finally {
            setReplyLoading(false);
        }
    };

    const handleDeleteComment = async () => {
        if (!comment) return;

        const confirmResult = await Swal.fire({
            title: "Bạn chắc chắn?",
            text: "Comment sẽ bị xóa và không thể khôi phục!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
            reverseButtons: true
        });

        if (!confirmResult.isConfirmed) return;

        setLoading(true);
        try {
            const res = await AdminCommentService.deleteComment(comment.id);

            if (res.success) {
                toast.success("Xóa comment thành công!");
                onClose();
                setIsReloaded(!isReloaded);
            } else {
                toast.error(res.message || "Xóa comment thất bại!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã có lỗi xảy ra khi xóa comment");
        } finally {
            setLoading(false);
        }
    };

    const openParentComment = (parent) => setParentComment(parent);
    const closeParentComment = () => setParentComment(null);

    if (!comment) return null;

    const date = new Date(comment.createdAt);
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
                                Chi tiết Comment #{comment.id}
                            </h2>

                            <div className="flex gap-2">
                                {/* Nút Xóa */}
                                <button
                                    className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                                        }`}
                                    onClick={handleDeleteComment}
                                    disabled={loading}
                                >
                                    Xóa
                                </button>

                                {/* Nút Lưu */}
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

                        {/* Grid thông tin */}
                        <div className="grid grid-cols-2 gap-4 text-white text-sm mb-4">
                            <div className="flex gap-2">
                                <span className="font-medium">Người comment:</span>
                                <span
                                    className="text-blue-400 hover:underline cursor-pointer"
                                    onClick={() => navigate(`/admin/users/view/${comment.user.id}`)}
                                >
                                    {comment.user.fullName}
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
                                    onClick={() => navigate(`/admin/products/view/${comment.product.id}`)}
                                >
                                    {comment.product.name}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <span className="font-medium">Parent Comment:</span>
                                {comment.parentComment ? (
                                    <span
                                        className="text-blue-400 hover:underline cursor-pointer"
                                        onClick={() => openParentComment(comment.parentComment)}
                                    >
                                        #{comment.parentComment.id}
                                    </span>
                                ) : (
                                    <span>-</span>
                                )}
                            </div>

                            <div className="flex gap-2 col-span-2">
                                <span className="font-medium">Nội dung:</span>
                                <span>{comment.content}</span>
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

                        {/* Reply comment */}
                        <div className="mb-4 flex flex-col gap-2">
                            {replyVisible && (
                                <div className="flex gap-2 items-start">
                                    <textarea
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        placeholder="Nhập phản hồi..."
                                        className="flex-1 px-3 py-2 rounded-l bg-gray-800 text-white focus:outline-none resize-none h-12"
                                    />
                                    <button
                                        className={`px-4 py-2 rounded-r text-white ${replyLoading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
                                        onClick={handleReplyComment}
                                        disabled={replyLoading}
                                    >
                                        {replyLoading ? "Đang gửi..." : "Reply"}
                                    </button>
                                </div>
                            )}
                            <button
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-white w-max"
                                onClick={() => setReplyVisible(!replyVisible)}
                            >
                                {replyVisible ? "Hủy reply" : "Reply"}
                            </button>
                        </div>


                        {/* Modal parent comment */}
                        {parentComment && (
                            <CommentDetailModal
                                isOpen={true}
                                onClose={closeParentComment}
                                comment={parentComment}
                                setIsReloaded={setIsReloaded}
                                isReloaded={isReloaded}
                            />
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
