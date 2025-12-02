import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search, Filter, ChevronRight as ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminWarehouseService from "../../../../service/AdminWarehouseService";
import WarehouseFilterModal from "./WarehouseFilterModal";
// import EditWarehouseModal from "./EditWarehouseModal";

export default function WarehouseTable({ isReloaded }) {
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    // Search + Pagination
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const [filterRequest, setFilterRequest] = useState({
        name: null,
        page: 0,
        size: perPage,
    });

    const fetchWarehouses = async () => {
        setLoading(true);

        const res = await AdminWarehouseService.getWarehouses({
            ...filterRequest,
            name: searchTerm.trim() || null,
            page: currentPage - 1,
            size: perPage,
        });

        if (res.success) {
            setWarehouses(res.data.result || []);
            setTotalPages(res.data.totalPages || 1);
            setTotal(res.data.total || 0);
        } else {
            toast.error(res.message || "Không thể tải danh sách kho hàng");
        }

        setLoading(false);
    };

    useEffect(() => {
        setInputValue(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchWarehouses();
    }, [currentPage, perPage, filterRequest, isReloaded]);

    const handleFilter = (filters) => {
        const cleanFilters = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== "" && value != null) cleanFilters[key] = value;
        });

        setFilterRequest({
            ...cleanFilters,
            page: 0,
            size: perPage,
        });

        setCurrentPage(1);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            setFilterRequest({
                ...filterRequest,
                name: searchTerm.trim(),
            });
            setCurrentPage(1);
        }
    };

    const handleEditClick = (warehouse) => {
        setSelectedWarehouse(warehouse);
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (id, data) => {
        const res = await AdminWarehouseService.updateWarehouse(id, data);
        if (res.success) {
            toast.success("Cập nhật kho thành công");
            fetchWarehouses();
        } else toast.error(res.message || "Lỗi khi cập nhật kho");
    };

    const handleDelete = async (id) => {
        const res = await AdminWarehouseService.deleteWarehouse(id);
        if (res.success) {
            toast.success("Xóa kho thành công");
            fetchWarehouses();
        } else toast.error(res.message || "Lỗi khi xóa kho");
    };

    const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
    const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                {/* Search */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm kho hàng"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 pl-10 w-64 focus:outline-none focus:border-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    </div>
                    <span className="text-slate-400 text-sm">Tổng số: {total}</span>
                </div>

                {/* Filter + Pagination */}
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
                            setFilterRequest({ ...filterRequest, size });
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                    </select>

                    <span className="text-slate-400">Kho / Trang</span>

                    {/* Page number */}
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 flex items-center gap-1">
                            <input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        const n = Number(inputValue);
                                        if (n >= 1 && n <= totalPages) setCurrentPage(n);
                                        else setInputValue(currentPage);
                                    }
                                }}
                                className="w-16 text-center bg-gray-800 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            / {totalPages}
                        </span>

                        {/* Prev */}
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="p-2 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {/* Next */}
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="p-2 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 text-slate-400 text-sm">
                    <div className="col-span-3">Mã / Ngày tạo</div>
                    <div className="col-span-3">Tên kho</div>
                    <div className="col-span-5">Địa chỉ</div>
                    <div className="col-span-1 text-center"></div>
                </div>

                {/* Body */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : warehouses.length === 0 ? (
                    <div className="text-center text-slate-400 py-6">Không có kho hàng nào</div>
                ) : (
                    warehouses.map((w) => {
                        const date = w.createdAt ? new Date(w.createdAt) : null;
                        const formattedDate = date
                            ? `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`
                            : "—";

                        const address = w.address
                            ? `${w.address.street}, ${w.address.ward}, ${w.address.district}, ${w.address.province}`
                            : "—";

                        return (
                            <div
                                key={w.id}
                                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition"
                            >
                                <div className="col-span-3">
                                    <div className="font-medium">#{w.id}</div>
                                    <div className="text-slate-400 text-sm">{formattedDate}</div>
                                </div>

                                <div className="col-span-3">{w.name}</div>
                                <div className="col-span-5 truncate">{address}</div>

                                <div className="col-span-1 text-center">
                                    <button
                                        className="text-slate-400 hover:text-white transition"
                                        onClick={() => navigate(`/admin/warehouses/view/${w.id}`)}
                                    >
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <WarehouseFilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={handleFilter}
            />
{/* 
            <EditWarehouseModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                warehouse={selectedWarehouse}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            /> */}
        </>
    );
}
