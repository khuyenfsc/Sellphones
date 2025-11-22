import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, Search } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import AdminCategoryService from "../../../../service/AdminCategoryService";
import { useNavigate, useParams } from "react-router-dom";
import EditFilterOptionModal from "./EditFilterOptionModal";

export default function FilterOptionTable({ filterId, isReloaded }) {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { categoryId } = useParams();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    // Search & Pagination & Sorting
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [sortType, setSortType] = useState("ASC");

    const fetchOptions = async () => {
        setLoading(true);
        try {
            const res = await AdminCategoryService.getFilterOptions(filterId, {
                keyword: searchTerm?.trim() || null,
                page: currentPage - 1,
                size: perPage,
                sortType,
            });

            if (res.success) {
                setOptions(res.data.result || []);
                setTotalPages(res.data.totalPages || 1);
                setTotal(res.data.total || 0);
            } else {
                toast.error(res.message || "Không thể tải danh sách options");
            }
        } catch (err) {
            console.error(err);
            toast.error("Lỗi khi tải danh sách options");
        }
        setLoading(false);
    };

    useEffect(() => {
        setInputValue(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchOptions();
    }, [filterId, currentPage, perPage, sortType, isReloaded]);

    const handleUpdateOption = async (optionId, optionData) => {
        try {
            const res = await AdminCategoryService.updateFilterOption(optionId, optionData);

            if (res.success) {
                toast.success("Cập nhật option thành công");
                fetchOptions();
            } else {
                toast.error(res.message || "Lỗi khi cập nhật option");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi cập nhật option");
        }
    };

    const handleDeleteOption = async (optionId) => {
        try {
            const res = await AdminCategoryService.deleteFilterOption(optionId);

            if (res.success) {
                toast.success("Đã xóa option thành công");
                fetchOptions();  
            } else {
                toast.error(res.message || "Lỗi khi xóa option");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi xóa option");
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            setCurrentPage(1);
            fetchOptions();
        }
    };

    const handlePrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const handleNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

    const formatDate = (isoString) => {
        if (!isoString) return "-";
        const date = new Date(isoString);
        return date.toLocaleString("vi-VN", { hour12: false });
    };

    return (
        <>
            {/* Header Controls */}
            <div className="flex flex-wrap justify-between items-center mb-4 gap-3">

                {/* Search + total */}
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <div className="relative flex-1 min-w-[120px]">
                        <input
                            type="text"
                            placeholder="Tìm option"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 pl-8 text-sm focus:outline-none focus:border-blue-500 placeholder:text-slate-400 text-white"
                        />
                        <Search className="absolute left-2 top-1.5 text-slate-400" size={16} />
                    </div>
                    <span className="text-slate-400 text-xs whitespace-nowrap">
                        Tổng: {total}
                    </span>
                </div>

                {/* Sort + perPage + paging */}
                <div className="flex items-center gap-2 flex-wrap">
                    <select
                        value={sortType}
                        onChange={(e) => {
                            setSortType(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-sm text-white"
                    >
                        <option value="ASC">ID ↑</option>
                        <option value="DESC">ID ↓</option>
                    </select>

                    <select
                        value={perPage}
                        onChange={(e) => {
                            setPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-sm text-white"
                    >
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                    </select>

                    <span className="text-slate-400 text-xs">/ Trang</span>

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
                        className="w-12 text-center bg-gray-800 rounded px-1 py-1 text-sm text-white"
                    />
                    <span className="text-slate-400 text-xs">/ {totalPages}</span>

                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="p-1 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="p-1 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-800 text-slate-400 text-sm font-semibold">
                    <div className="col-span-2">ID / Ngày tạo</div>
                    <div className="col-span-4">Tên</div>
                    <div className="col-span-4">Key</div>
                    <div className="col-span-2 text-center"></div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-10">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : options.length === 0 ? (
                    <div className="text-center text-slate-400 py-6">Không có option nào</div>
                ) : (
                    options.map((op) => (
                        <div
                            key={op.id}
                            className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-800 hover:bg-slate-800/50"
                        >
                            <div className="col-span-2">
                                <div className="font-medium">#{op.id}</div>
                                <div className="text-xs text-slate-400">{formatDate(op.createdAt)}</div>
                            </div>

                            <div className="col-span-4">{op.name}</div>

                            <div className="col-span-4">{op.key || "-"}</div>

                            <div className="col-span-2 text-center">
                                <button
                                    onClick={() => {
                                        setSelectedOption(op);
                                        setIsEditModalOpen(true);
                                    }}
                                    className="text-slate-400 hover:text-white"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <EditFilterOptionModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                option={selectedOption}
                onUpdate={handleUpdateOption}
                onDelete={handleDeleteOption}
            />
        </>
    );
}
