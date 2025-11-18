// CommentTable.jsx
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { toast } from "react-toastify";
import AdminCommentService from "../../../../service/AdminCommentService"; // service riêng
import CommentFilterModal from "./CommentFilterModal";
import CommentDetailModal from "./CommentDetailModal";
import { useNavigate } from "react-router-dom";

export default function CommentTable() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(true);

    // Phân trang + tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(currentPage);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const [filterRequest, setFilterRequest] = useState({
        keyword: null,
        status: null,
        role: null,
        page: 0,
        size: perPage,
    });

    const fetchComments = async () => {
        setLoading(true);
        const res = await AdminCommentService.getComments({
            ...filterRequest,
            keyword: searchTerm.trim() || null,
            page: currentPage - 1,
            size: perPage,
        });

        if (res.success) {
            setComments(res.data.result || []);
            setTotalPages(res.data.totalPages || 1);
            setTotal(res.data?.total || 0);
        } else {
            toast.error(res.message || "Lỗi khi lấy dữ liệu");
        }

        setLoading(false);
    };

    useEffect(() => {
        setInputValue(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchComments();
    }, [currentPage, perPage, filterRequest, isReloaded]);

    const handleFilter = (filters) => {
        const cleanFilters = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== "" && value != null) {
                cleanFilters[key] = value;
            }
        });

        setFilterRequest({
            ...cleanFilters,
            searchTerm,
            page: 0
        });

        setCurrentPage(1);
    };


    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            setFilterRequest({
                ...filterRequest,
                keyword: searchTerm,
            });
            setCurrentPage(1);
        }
    };

    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <>
            {/* Header Controls */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm nội dung"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 pl-10 w-64 focus:outline-none focus:border-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    </div>
                    <span className="text-slate-400 text-sm">Tổng số comment: {total}</span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsFilterModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                    >
                        <Filter size={18} />
                        Lọc
                    </button>

                    <select
                        value={perPage}
                        onChange={(e) => {
                            const newSize = Number(e.target.value);
                            setPerPage(newSize);
                            setCurrentPage(1);
                            setFilterRequest({
                                ...filterRequest,
                                page: 0,
                                size: newSize,
                            });
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                    </select>
                    <span className="text-slate-400">Comments / Trang</span>

                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 flex items-center gap-1">
                            <input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        const newPage = Number(inputValue);
                                        if (newPage >= 1 && newPage <= totalPages) {
                                            setCurrentPage(newPage);
                                        } else {
                                            setInputValue(currentPage);
                                        }
                                    }
                                }}
                                className="w-16 text-center bg-gray-800 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            / {totalPages}
                        </span>

                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="p-2 bg-slate-800 rounded hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="p-2 bg-slate-800 rounded hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 rounded-lg overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-11 gap-4 px-6 py-4 border-b border-slate-800 text-slate-400 text-sm">
                    <div className="col-span-2"># / Ngày tạo</div>
                    <div className="col-span-3">Tên / Status / Role</div>
                    <div className="col-span-3">Tên sản phẩm</div>
                    <div className="col-span-3">Nội dung</div>
                </div>

                {/* Body */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : comments.length === 0 ? (
                    <div className="text-center text-slate-400 py-6">Không có comment nào</div>
                ) : (
                    comments.map((comment) => {
                        const date = new Date(comment.createdAt);
                        const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
                            date.getMonth() + 1
                        ).padStart(2, "0")}/${date.getFullYear()} ${String(date.getHours()).padStart(
                            2,
                            "0"
                        )}:${String(date.getMinutes()).padStart(2, "0")}`;

                        // Hàm trả màu cho status
                        const getStatusColor = (status) => {
                            switch (status) {
                                case "APPROVED":
                                    return "bg-green-600 text-white px-2 py-0.5 rounded";
                                case "REJECTED":
                                    return "bg-red-600 text-white px-2 py-0.5 rounded";
                                case "PENDING":
                                    return "bg-yellow-600 text-white px-2 py-0.5 rounded";
                                default:
                                    return "bg-gray-600 text-white px-2 py-0.5 rounded";
                            }
                        };

                        // Hàm trả màu cho role
                        const getRoleColor = (role) => {
                            switch (role) {
                                case "ADMIN":
                                    return "bg-purple-600 text-white px-2 py-0.5 rounded";
                                case "CUSTOMER":
                                    return "bg-blue-600 text-white px-2 py-0.5 rounded";
                                case "MODERATOR":
                                    return "bg-orange-600 text-white px-2 py-0.5 rounded";
                                default:
                                    return "bg-gray-600 text-white px-2 py-0.5 rounded";
                            }
                        };


                        return (
                            <div
                                key={comment.id}
                                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition"
                            >
                                <div className="col-span-2">
                                    <div className="font-medium">#{comment.id}</div>
                                    <div className="text-xs text-slate-400">{formattedDate}</div>
                                </div>
                                <div className="col-span-3 flex flex-col">
                                    <div className="mb-2 font-medium">{comment.user.fullName}</div>
                                    <div className="mb-2 text-xs">
                                        <span className={getStatusColor(comment.status)}>{comment.status}</span>
                                    </div>
                                    <div className="text-xs">
                                        <span className={getRoleColor(comment.user.role.roleName)}>
                                            {comment.user.role.roleName}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-3">{comment.product.name}</div>
                                <div className="col-span-3">{comment.content}</div>

                                <div className="col-span-1 flex items-center justify-center">
                                    <button
                                        onClick={() => {
                                            setSelectedComment(comment); 
                                            setModalOpen(true);           
                                        }}
                                        className="text-slate-400 hover:text-white transition"
                                    >
                                        <ChevronRight size={20} />
                                    </button>

                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <CommentFilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={handleFilter}
            />

            {selectedComment && (
                <CommentDetailModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    comment={selectedComment}
                    setIsReloaded={setIsReloaded}
                    isReloaded={isReloaded}
                />
            )}
        </>
    );
}
