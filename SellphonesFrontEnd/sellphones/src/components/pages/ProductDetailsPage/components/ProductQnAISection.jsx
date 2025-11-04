import React, { useEffect, useState, useContext } from "react";
import CommentService from "../../../../service/CommentService";
import { AuthContext } from "../../../../context/AuthContext";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { toast } from "react-toastify";

const ProductQnASection = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [childComments, setChildComments] = useState({});
    const [loadingChild, setLoadingChild] = useState({});
    const [childPage, setChildPage] = useState({});
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [newComment, setNewComment] = useState("");
    const [sending, setSending] = useState(false);
    const { user } = useContext(AuthContext);

    const isLoggedIn = !!user;

    const fetchComments = async () => {
        if (!productId) return;
        setLoading(true);

        try {
            const data = await CommentService.getComments({
                productId,
                page: currentPage - 1,
            });

            if (data?.result) {
                setComments(data.result);
                setTotal(data.total || 0);
                setTotalPages(data.totalPages || 1);
            }
        } catch (err) {
            console.error("Lỗi khi tải bình luận:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchChildComments = async (parentId) => {
        if (childPage[parentId] === null) return;
        setLoadingChild((prev) => ({ ...prev, [parentId]: true }));

        const currentPage = childPage[parentId] || 0;

        try {
            const { comments: newComments, total } =
                await CommentService.getCommentsByParentCommentId({
                    parentId,
                    page: currentPage,
                    size: 3,
                });

            const oldList = childComments[parentId] || [];
            const updatedList = [...oldList, ...newComments];

            setChildComments((prev) => {
                const existing = prev[parentId] || [];
                const merged = [...existing, ...newComments];
                const unique = merged.filter(
                    (v, i, self) => i === self.findIndex((t) => t.id === v.id)
                );
                return { ...prev, [parentId]: unique };
            });

            if (updatedList.length >= total || newComments.length === 0) {
                setChildPage((prev) => ({ ...prev, [parentId]: null }));
            } else {
                setChildPage((prev) => ({ ...prev, [parentId]: currentPage + 1 }));
            }
        } catch (err) {
            console.error(`❌ Lỗi khi tải bình luận con (${parentId}):`, err);
        } finally {
            setLoadingChild((prev) => ({ ...prev, [parentId]: false }));
        }
    };

    const formatTimeAgo = (createdAt) => {
        if (!createdAt) return "Vừa xong";
        const date = parseISO(createdAt);
        return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    };

    const handleSendComment = async () => {
        if (!isLoggedIn) {
            toast.warn("Vui lòng đăng nhập để bình luận.");
            return;
        }

        if (!newComment.trim()) {
            toast.warn("Vui lòng nhập nội dung bình luận.");
            return;
        }

        setSending(true);
        try {
            const res = await CommentService.createComment({
                productId,
                content: newComment.trim(),
            });

            if (res.success) {
                toast.success("✅ Thêm bình luận thành công!");
                setNewComment("");
                fetchComments();
            } else {
                toast.error(res.message || "Không thể thêm bình luận.");
            }
        } catch (err) {
            console.error("❌ Lỗi gửi bình luận:", err);
            toast.error("Không thể gửi bình luận. Vui lòng thử lại.");
        } finally {
            setSending(false);
        }
    };

    const handleReply = async (parentId, productId) => {
        if (!user) {
            toast.warn("Vui lòng đăng nhập để phản hồi.");
            return;
        }

        if (!replyText.trim()) {
            toast.warn("Vui lòng nhập nội dung phản hồi.");
            return;
        }

        setSending(true);
        try {
            const res = await CommentService.replyComment({
                parentId,
                productId,
                content: replyText.trim(),
            });

            if (res.success) {
                toast.success("💬 Gửi phản hồi thành công!");
                setReplyText("");
                setReplyingTo(null);
                setChildComments((prev) => ({
                    ...prev,
                    [parentId]: [res.reply, ...(prev[parentId] || [])],
                }));
            }
        } catch (err) {
            console.error("❌ Lỗi gửi phản hồi:", err);
            toast.error("Không thể gửi phản hồi. Vui lòng thử lại.");
        } finally {
            setSending(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [productId, currentPage]);

    // --- JSX hiển thị ---
    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-6 text-black">Hỏi & Đáp</h2>

            {/* Loading spinner khi đổi trang comment */}
            {loading ? (
                <div className="flex justify-center py-6">
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                </div>
            ) : comments.length === 0 ? (
                <p className="text-gray-500 text-center py-6">
                    Chưa có câu hỏi nào cho sản phẩm này.
                </p>
            ) : (
                comments.map((item, idx) => {
                    const isAdmin = item.user?.role?.roleName === "ADMIN";

                    return (
                        <div key={item.id || idx} className="border-t pt-6">
                            <div className="flex items-start gap-3 mb-4">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
                        ${isAdmin ? "bg-red-600" : "bg-blue-500"}`}
                                >
                                    {isAdmin ? "Q" : item.user?.fullName?.charAt(0) || "?"}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-black">
                                            {isAdmin ? "Quản Trị Viên" : item.user?.fullName}
                                        </span>
                                        {isAdmin && (
                                            <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">
                                                QTV
                                            </span>
                                        )}
                                        <span className="text-sm text-gray-500">
                                            {formatTimeAgo(item.createdAt)}
                                        </span>
                                    </div>

                                    <p className="text-sm mb-2 text-black">{item.content}</p>

                                    {/* Nút phản hồi */}
                                    {isLoggedIn && (
                                        <button
                                            onClick={() =>
                                                setReplyingTo(replyingTo === item.id ? null : item.id)
                                            }
                                            className="text-red-600 text-sm flex items-center gap-1 hover:underline"
                                        >
                                            💬 Phản hồi
                                        </button>
                                    )}

                                    {/* Form phản hồi */}
                                    {replyingTo === item.id && (
                                        <div className="mt-3 ml-8">
                                            <textarea
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                placeholder="Nhập phản hồi của bạn..."
                                                rows={2}
                                                className="w-full border rounded-lg p-2 mb-2 text-black focus:ring-2 focus:ring-red-400"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleReply(item.id)}
                                                    disabled={sending}
                                                    className={`px-3 py-1.5 rounded-lg text-white ${sending
                                                            ? "bg-red-300 cursor-not-allowed"
                                                            : "bg-red-500 hover:bg-red-600"
                                                        }`}
                                                >
                                                    {sending ? "Đang gửi..." : "Gửi phản hồi"}
                                                </button>
                                                <button
                                                    onClick={() => setReplyingTo(null)}
                                                    className="px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300"
                                                >
                                                    Hủy
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Child comments */}
                                    {childComments[item.id]?.length > 0 && (
                                        <div className="ml-8 mt-4 space-y-3">
                                            {childComments[item.id].map((child, cidx) => {
                                                const isChildAdmin =
                                                    child.user?.role?.roleName === "ADMIN";
                                                return (
                                                    <div
                                                        key={`${child.id}-${cidx}`}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <div
                                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold
                                                ${isChildAdmin
                                                                    ? "bg-red-600"
                                                                    : "bg-gray-400"
                                                                }`}
                                                        >
                                                            {isChildAdmin
                                                                ? "Q"
                                                                : child.user?.fullName?.charAt(0) || "?"}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="font-semibold text-sm text-black">
                                                                    {isChildAdmin
                                                                        ? "Quản Trị Viên"
                                                                        : child.user?.fullName}
                                                                </span>

                                                                {isChildAdmin && (
                                                                    <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">
                                                                        QTV
                                                                    </span>
                                                                )}

                                                                <span className="text-xs text-gray-500">
                                                                    {formatTimeAgo(child.createdAt)}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-black">
                                                                {child.content}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Nút Xem thêm bình luận con */}
                                    <div className="ml-8 mt-2 flex items-center gap-2">
                                        {childPage[item.id] === null ? (
                                            <p className="text-sm text-gray-400">
                                                Đã hiển thị tất cả bình luận
                                            </p>
                                        ) : (
                                            <button
                                                onClick={() => fetchChildComments(item.id)}
                                                disabled={loadingChild[item.id]}
                                                className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                                            >
                                                Xem thêm bình luận
                                                {loadingChild[item.id] && (
                                                    <span className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></span>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}

            {/* Ô nhập bình luận mới */}
            <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-3 text-black">
                    Thêm câu hỏi / bình luận
                </h3>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={
                        isLoggedIn
                            ? "Nhập câu hỏi của bạn..."
                            : "Vui lòng đăng nhập để bình luận."
                    }
                    rows={3}
                    className="w-full border rounded-lg p-3 mb-3 focus:ring-2 focus:ring-red-400 text-black"
                    disabled={!isLoggedIn || sending}
                />
                <button
                    onClick={handleSendComment}
                    disabled={!isLoggedIn || sending}
                    className={`px-4 py-2 rounded-lg text-white ${!isLoggedIn
                            ? "bg-gray-400 cursor-not-allowed"
                            : sending
                                ? "bg-red-300 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600"
                        }`}
                >
                    {sending ? "Đang gửi..." : "Gửi bình luận"}
                </button>
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 gap-4 flex-wrap">
                    <button
                        disabled={currentPage === 1 || loading}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className={`px-3 py-2 rounded-lg border text-sm ${currentPage === 1 || loading
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white hover:bg-red-50 border-red-400 text-red-500"
                            }`}
                    >
                        Trang trước
                    </button>

                    <div className="flex items-center gap-2">
                        <p className="text-gray-700 font-medium">Trang</p>
                        <select
                            value={currentPage}
                            onChange={(e) => setCurrentPage(Number(e.target.value))}
                            disabled={loading}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 focus:outline-none bg-white text-black"
                        >
                            {Array.from({ length: totalPages }, (_, i) => (
                                <option
                                    key={i + 1}
                                    value={i + 1}
                                    className="bg-white text-black"
                                >
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <p className="text-gray-700 font-medium">/ {totalPages}</p>
                    </div>

                    <button
                        disabled={currentPage === totalPages || loading}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className={`px-3 py-2 rounded-lg border text-sm ${currentPage === totalPages || loading
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white hover:bg-red-50 border-red-400 text-red-500"
                            }`}
                    >
                        Trang sau
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductQnASection;
