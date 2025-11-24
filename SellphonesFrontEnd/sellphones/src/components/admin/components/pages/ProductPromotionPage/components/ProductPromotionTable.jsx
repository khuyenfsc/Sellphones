import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { toast } from "react-toastify";
import AdminProductPromotionService from "../../../../service/AdminProductPromotionService";
import PromotionFilterModal from "./PromotionFilterModal";
import EditPromotionModal from "./EditPromotionModal";

export default function ProductPromotionTable({ isReloaded }) {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [selectedPromotion, setSelectedPromotion] = useState(null);

    // Search + Pagination
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const [filterRequest, setFilterRequest] = useState({
        name: null,
        type: null,
        page: 0,
        size: perPage,
    });

    const fetchPromotions = async () => {
        setLoading(true);

        const res = await AdminProductPromotionService.getPromotions({
            ...filterRequest,
            name: searchTerm.trim() || null,
            page: currentPage - 1,
            size: perPage,
        });

        if (res.success) {
            setPromotions(res.data.result || []);
            setTotalPages(res.data.totalPages || 1);
            setTotal(res.data.total || 0);
        } else {
            toast.error(res.message || "Không thể tải danh sách khuyến mãi");
        }

        setLoading(false);
    };

    useEffect(() => {
        setInputValue(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchPromotions();
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
            page: 0,
        });

        setCurrentPage(1);
    };

    const handleEditClick = (promotion) => {
        setSelectedPromotion(promotion);
        setIsEditModalOpen(true);
    };

    const handleUpdatePromotion = async (promotionId, promotionData) => {
        try {
            const res = await AdminProductPromotionService.updatePromotion(promotionId, promotionData);

            if (res.success) {
                toast.success("Cập nhật khuyến mãi thành công");
                fetchPromotions();
            } else {
                toast.error(res.message || "Lỗi khi cập nhật khuyến mãi");
            }
        } catch {
            toast.error("Đã xảy ra lỗi khi cập nhật khuyến mãi");
        }
    };

    const handleDeletePromotion = async (promotionId) => {
        try {
            const res = await AdminProductPromotionService.deletePromotion(promotionId);

            if (res.success) {
                toast.success("Đã xóa khuyến mãi thành công");
                fetchPromotions();
            } else {
                toast.error(res.message || "Lỗi khi xóa khuyến mãi");
            }
        } catch {
            toast.error("Đã xảy ra lỗi khi xóa khuyến mãi");
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            setFilterRequest({
                ...filterRequest,
                name: searchTerm,
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
                {/* Search */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm khuyến mãi"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 pl-10 w-64 focus:outline-none focus:border-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    </div>

                    <span className="text-slate-400 text-sm">Tổng số kết quả: {total}</span>
                </div>

                {/* Pagination */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsFilterModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                    >
                        <Filter size={18} />
                        Lọc
                    </button>

                    {/* Per Page */}
                    <select
                        value={perPage}
                        onChange={(e) => {
                            const size = Number(e.target.value);
                            setPerPage(size);
                            setCurrentPage(1);

                            setFilterRequest({
                                ...filterRequest,
                                page: 0,
                                size: size,
                            });
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                    </select>
                    <span className="text-slate-400">Khuyến mãi / Trang</span>

                    {/* Page Number */}
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
                            className="p-2 bg-slate-800 rounded hover:bg-slate-700 transition disabled:opacity-50"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="p-2 bg-slate-800 rounded hover:bg-slate-700 transition disabled:opacity-50"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 rounded-lg overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 text-slate-400 text-sm">
                    <div className="col-span-3">Mã / Ngày tạo</div>
                    <div className="col-span-3">Tên khuyến mãi</div>
                    <div className="col-span-2">Loại</div>
                    <div className="col-span-2">Thời gian</div>
                    <div className="col-span-1 text-center"></div>
                </div>

                {/* Body */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : promotions.length === 0 ? (
                    <div className="text-center text-slate-400 py-6">Không có khuyến mãi nào</div>
                ) : (
                    promotions.map((p) => {
                        const created = p.createdAt ? new Date(p.createdAt) : null;
                        const s = p.startDate ? new Date(p.startDate) : null;
                        const e = p.endDate ? new Date(p.endDate) : null;

                        const format = (d) =>
                            !d
                                ? "—"
                                : `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;

                        return (
                            <div
                                key={p.id}
                                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition"
                            >
                                {/* ID + CreatedAt */}
                                <div className="col-span-3">
                                    <div className="font-medium">#{p.id}</div>
                                    <div className="text-slate-400 text-sm">{format(created)}</div>
                                </div>

                                {/* Name */}
                                <div className="col-span-3">{p.name}</div>

                                {/* Type */}
                                <div className="col-span-2">
                                    {p.type === "DISCOUNT_PERCENT"
                                        ? "Giảm theo %"
                                        : p.type === "DISCOUNT_AMOUNT"
                                        ? "Giảm theo số tiền"
                                        : p.type}
                                </div>

                                {/* Start + End */}
                                <div className="col-span-2">
                                    <div>{format(s)} → {format(e)}</div>
                                </div>

                                <div className="col-span-1 text-center">
                                    <button
                                        className="text-slate-400 hover:text-white transition"
                                        onClick={() => handleEditClick(p)}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <PromotionFilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={handleFilter}
            />

            <EditPromotionModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                promotion={selectedPromotion}
                onUpdate={handleUpdatePromotion}
                onDelete={handleDeletePromotion}
            />
        </>
    );
}
