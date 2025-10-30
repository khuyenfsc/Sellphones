import React, { useEffect, useState } from "react";
import CommentService from "../../../../service/CommentService";
import { formatDistanceToNow, parseISO } from "date-fns";
import { vi } from "date-fns/locale";


const ProductQnASection = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [childComments, setChildComments] = useState({});
    const [loadingChild, setLoadingChild] = useState({});
    const [childPage, setChildPage] = useState({});

    // --- Fetch dữ liệu Q&A ---
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
        // 🚫 Nếu đã tải hết (childPage = null) => không làm gì cả
        if (childPage[parentId] === null) return;

        // ✅ Bắt đầu tải
        setLoadingChild((prev) => ({ ...prev, [parentId]: true }));

        // ✅ Lấy trang hiện tại
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

            // ✅ Cập nhật danh sách bình luận con
            setChildComments((prev) => {
                const existing = prev[parentId] || [];
                const merged = [...existing, ...newComments];

                // 🔍 Loại bỏ trùng ID
                const unique = merged.filter(
                    (v, i, self) => i === self.findIndex((t) => t.id === v.id)
                );

                return { ...prev, [parentId]: unique };
            });


            // ✅ Kiểm tra còn bình luận để tải không
            if (updatedList.length >= total || newComments.length === 0) {
                // Đã hết bình luận con
                setChildPage((prev) => ({ ...prev, [parentId]: null }));
            } else {
                // Vẫn còn -> tăng page
                setChildPage((prev) => ({ ...prev, [parentId]: currentPage + 1 }));
            }
        } catch (err) {
            console.error(`❌ Lỗi khi tải bình luận con (${parentId}):`, err);
        } finally {
            // ✅ Dừng trạng thái loading
            setLoadingChild((prev) => ({ ...prev, [parentId]: false }));
        }
    };

    const formatTimeAgo = (createdAt) => {
        if (!createdAt) return "Vừa xong";
        const date = parseISO(createdAt);
        return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    };


    useEffect(() => {
        fetchComments();
    }, [productId, currentPage]);

    // --- JSX hiển thị ---
    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-6 text-black">Hỏi & Đáp</h2>

            {loading ? (
                <p className="text-gray-500 text-center py-6">Đang tải...</p>
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
                                {/* Avatar User / QTV */}
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
                        ${isAdmin ? "bg-red-600" : "bg-blue-500"}`}
                                >
                                    {isAdmin ? "Q" : item.user?.fullName?.charAt(0) || "?"}
                                </div>

                                <div className="flex-1">
                                    {/* User Info */}
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-black">
                                            {isAdmin ? "Quản Trị Viên" : item.user?.fullName}
                                        </span>

                                        {/* Huy hiệu QTV */}
                                        {isAdmin && (
                                            <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">
                                                QTV
                                            </span>
                                        )}

                                        <span className="text-sm text-gray-500">
                                            {formatTimeAgo(item.createdAt)}
                                        </span>
                                    </div>

                                    {/* Question Content */}
                                    <p className="text-sm mb-2 text-black">{item.content}</p>

                                    <button className="text-red-600 text-sm flex items-center gap-1">
                                        💬 Phản hồi
                                    </button>

                                    {/* Child Comments */}
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
                                                ${isChildAdmin ? "bg-red-600" : "bg-gray-400"}`}
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
                                    <div className="ml-8 mt-2">
                                        {loadingChild[item.id] ? (
                                            <p className="text-sm text-gray-500">Đang tải...</p>
                                        ) : childPage[item.id] === null ? (
                                            <p className="text-sm text-gray-400">
                                                Đã hiển thị tất cả bình luận
                                            </p>
                                        ) : (
                                            <button
                                                onClick={() => fetchChildComments(item.id)}
                                                className="text-blue-600 text-sm hover:underline"
                                            >
                                                Xem thêm bình luận
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}

            {/* --- Phân trang --- */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 gap-4 flex-wrap">
                    {/* Nút Trang trước */}
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className={`px-3 py-2 rounded-lg border text-sm ${currentPage === 1
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-white hover:bg-red-50 border-red-400 text-red-500"
                            }`}
                    >
                        Trang trước
                    </button>

                    {/* Dropdown chọn trang */}
                    <div className="flex items-center gap-2">
                        <p className="text-gray-700 font-medium">Trang</p>
                        <select
                            value={currentPage}
                            onChange={(e) =>
                                setCurrentPage(Number(e.target.value))
                            }
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm 
                                focus:ring-2 focus:ring-red-400 focus:outline-none 
                                bg-white text-black"
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
                        <p className="text-gray-700 font-medium">
                            / {totalPages}
                        </p>
                    </div>

                    {/* Nút Trang sau */}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className={`px-3 py-2 rounded-lg border text-sm ${currentPage === totalPages
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
