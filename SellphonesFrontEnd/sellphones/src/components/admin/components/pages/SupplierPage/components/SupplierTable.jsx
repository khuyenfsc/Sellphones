import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { toast } from "react-toastify";
import AdminSupplierService from "../../../../service/AdminSupplierService";
import { useNavigate } from "react-router-dom";
import SupplierFilterModal from "./SupplierFilterModal";
// import EditSupplierModal from "./EditSupplierModal";

export default function SupplierTable({ isReloaded }) {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Pagination + search
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(currentPage);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const [filterRequest, setFilterRequest] = useState({
        name: null,
        contactName: null,
        phoneNumber: null,
        email: null,
        taxCode: null,
        status: null,
        page: 0,
        size: perPage,
    });

    const fetchSuppliers = async () => {
        setLoading(true);
        try {
            const res = await AdminSupplierService.getSuppliers({
                ...filterRequest,
                name: searchTerm.trim() || null,
                page: currentPage - 1,
                size: perPage,
            });

            if (res.success) {
                setSuppliers(res.data.result || []);
                setTotalPages(res.data.totalPages || 1);
                setTotal(res.data.total || 0);
            } else {
                toast.error(res.message || "Không thể tải danh sách nhà cung cấp");
            }
        } catch (err) {
            toast.error("Đã xảy ra lỗi khi tải dữ liệu");
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        setInputValue(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchSuppliers();
    }, [currentPage, perPage, filterRequest, isReloaded]);

    const handleFilter = (filters) => {
        const cleanFilters = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== "" && value != null) cleanFilters[key] = value;
        });

        setFilterRequest({ ...cleanFilters, page: 0 });
        setCurrentPage(1);
    };

    const handleEditClick = (supplier) => {
        setSelectedSupplier(supplier);
        setIsEditModalOpen(true);
    };

    const handleUpdateSupplier = async (supplierId, supplierData) => {
        try {
            const res = await AdminSupplierService.updateSupplier(supplierId, supplierData);
            if (res.success) {
                toast.success("Cập nhật nhà cung cấp thành công");
                fetchSuppliers();
            } else {
                toast.error(res.message || "Lỗi khi cập nhật nhà cung cấp");
            }
        } catch (err) {
            toast.error("Đã xảy ra lỗi khi cập nhật");
            console.error(err);
        }
    };

    const handleDeleteSupplier = async (supplierId) => {
        try {
            const res = await AdminSupplierService.deleteSupplier(supplierId);
            if (res.success) {
                toast.success("Đã xóa nhà cung cấp");
                fetchSuppliers();
            } else {
                toast.error(res.message || "Lỗi khi xóa nhà cung cấp");
            }
        } catch (err) {
            toast.error("Đã xảy ra lỗi khi xóa");
            console.error(err);
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            setFilterRequest({ ...filterRequest, name: searchTerm });
            setCurrentPage(1);
        }
    };

    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const formatAddress = (address) => {
        if (!address) return "";
        return `${address.street}, ${address.ward}, ${address.district}, ${address.province}`;
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        const date = new Date(dateStr);
        return `${String(date.getDate()).padStart(2, "0")}/${String(
            date.getMonth() + 1
        ).padStart(2, "0")}/${date.getFullYear()}`;
    };

    return (
        <>
            {/* Header Controls */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm nhà cung cấp"
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
                        <Filter size={18} /> Lọc
                    </button>

                    <select
                        value={perPage}
                        onChange={(e) => {
                            const newSize = Number(e.target.value);
                            setPerPage(newSize);
                            setCurrentPage(1);
                            setFilterRequest({ ...filterRequest, page: 0, size: newSize });
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                    </select>
                    <span className="text-slate-400">Nhà cung cấp / Trang</span>

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
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 text-slate-400 text-sm">
                    <div className="col-span-2">Mã / Ngày tạo</div>
                    <div className="col-span-3">Tên & Địa chỉ</div>
                    <div className="col-span-1">Contact</div>
                    <div className="col-span-1">Phone</div>
                    <div className="col-span-2">Email</div>
                    <div className="col-span-1">Tax Code</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1 text-center"></div>
                </div>

                {/* Body */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : suppliers.length === 0 ? (
                    <div className="text-center text-slate-400 py-6">Không có nhà cung cấp nào</div>
                ) : (
                    suppliers.map((s) => (
                        <div
                            key={s.id}
                            className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition"
                        >
                            <div className="col-span-2">
                                <div className="font-medium">#{s.id}</div>
                                <div className="text-slate-400 text-sm">{formatDate(s.createdAt)}</div>
                            </div>
                            <div className="col-span-3">
                                <div className="font-medium">{s.name}</div>
                                <div className="text-slate-400 text-sm truncate">{formatAddress(s.address)}</div>
                            </div>
                            <div className="col-span-1">{s.contactName}</div>
                            <div className="col-span-1">{s.phoneNumber}</div>
                            <div className="col-span-2 truncate">{s.email}</div>
                            <div className="col-span-1">{s.taxCode}</div>
                            <div className="col-span-1">
                                <span
                                    className={`
            px-3 py-1 rounded-full text-sm font-semibold
            ${s.supplierStatus === "ACTIVE" ? "bg-green-600" : "bg-red-600"}
        `}
                                >
                                    {s.supplierStatus}
                                </span>
                            </div>

                            <div className="col-span-1 text-center">
                                <button
                                    className="text-slate-400 hover:text-white transition"
                                    onClick={() => navigate(`/admin/suppliers/view/${s.id}`)}
                                >
                                    <ChevronRight size={20} />
                                </button>

                            </div>
                        </div>
                    ))
                )}
            </div>

            <SupplierFilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={handleFilter}
            />

        </>
    );
}
