import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { toast } from "react-toastify";
import AdminWarrantyService from "../../../../service/AdminWarrantyService";
import { useNavigate } from "react-router-dom";
import WarrantiesFilterModal from "./WarrantiesFilterModal";
import EditWarrantyModal from "./EditWarrantyModal";

export default function WarrantyTable({ isReloaded }) {
    const navigate = useNavigate();
    const [warranties, setWarranties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [selectedWarranty, setSelectedWarranty] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Phân trang + tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(currentPage);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    // const [sortType, setSortType] = useState("ASC");

    const [filterRequest, setFilterRequest] = useState({
        name: null,
        page: 0,
        size: perPage,
    });

    const fetchWarranties = async () => {
        setLoading(true);
        const res = await AdminWarrantyService.getWarranties({
            ...filterRequest,
            name: searchTerm.trim() || null,
            page: currentPage - 1,
            size: perPage,
        });

        if (res.success) {
            setWarranties(res.data.result || []);
            setTotalPages(res.data.totalPages || 1);
            setTotal(res.data.total || 0);
        } else {
            toast.error(res.message || "Không thể tải danh sách bảo hành");
        }

        setLoading(false);
    };

    useEffect(() => {
        setInputValue(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchWarranties();
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
            name, 
            page: 0
        });

        setCurrentPage(1);
    };

    
    const handleEditClick = (warranty) => {
        setSelectedWarranty(warranty);
        setIsEditModalOpen(true);
    };

    const handleUpdateWarranty = async (warrantyId, warrantyData) => {
        try {
            const res = await AdminWarrantyService.updateWarranty(warrantyId, warrantyData);

            if (res.success) {
                toast.success("Cập nhật bảo hành thành công");
                fetchWarranties();
            } else {
                toast.error(res.message || "Lỗi khi cập nhật bảo hành");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi cập nhật bảo hành");
        }
    };

    const handleDeleteWarranty = async (warrantyId) => {
        try {
            const res = await AdminWarrantyService.deleteWarranty(warrantyId);

            if (res.success) {
                toast.success("Đã xóa bảo hành thành công");
                fetchWarranties();
            } else {
                toast.error(res.message || "Lỗi khi xóa bảo hành");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi xóa bảo hành");
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

    const handlePrevPage = () =>
        setCurrentPage((prev) => Math.max(prev - 1, 1));

    const handleNextPage = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <>
            {/* Header Controls */}
            <div className="flex justify-between items-center mb-6">

                {/* Tìm kiếm */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm bảo hành"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 pl-10 w-64 focus:outline-none focus:border-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    </div>

                    <span className="text-slate-400 text-sm">
                        Tổng số kết quả: {total}
                    </span>
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

                    {/* Per page */}
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
                    <span className="text-slate-400">Bảo hành / Trang</span>

                    {/* Page number */}
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

                        {/* Prev / Next */}
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
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 text-slate-400 text-sm">
                    <div className="col-span-3">Mã / Ngày tạo</div>
                    <div className="col-span-2">Tên bảo hành</div>
                    <div className="col-span-2">Thời hạn (tháng)</div>
                    <div className="col-span-2">Giá</div>
                    <div className="col-span-2">Mô tả</div>
                    <div className="col-span-1 text-center"></div>
                </div>

                {/* Body */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : warranties.length === 0 ? (
                    <div className="text-center text-slate-400 py-6">Không có bảo hành nào</div>
                ) : (
                    warranties.map((w) => {
                        const date = w.createdAt ? new Date(w.createdAt) : null;
                        const formattedDate = date
                            ? `${String(date.getDate()).padStart(2, "0")}/${String(
                                date.getMonth() + 1
                            ).padStart(2, "0")}/${date.getFullYear()}`
                            : "—";

                        return (
                            <div
                                key={w.id}
                                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition"
                            >
                                {/* ID + Date */}
                                <div className="col-span-3">
                                    <div className="font-medium">#{w.id}</div>
                                    <div className="text-slate-400 text-sm">{formattedDate}</div>
                                </div>

                                <div className="col-span-2">{w.name}</div>
                                <div className="col-span-2">{w.months} tháng</div>
                                <div className="col-span-2">{w.price.toLocaleString()} đ</div>
                                <div className="col-span-2 truncate">{w.description}</div>

                                <div className="col-span-1 text-center">
                                    <button
                                        className="text-slate-400 hover:text-white transition"
                                        onClick={() => handleEditClick(w)}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <WarrantiesFilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={handleFilter}
            />

            <EditWarrantyModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                warranty={selectedWarranty}
                onUpdate={handleUpdateWarranty}
                onDelete={handleDeleteWarranty}
            />
        </>
    );
}
