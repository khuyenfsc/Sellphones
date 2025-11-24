import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { toast } from "react-toastify";
import AdminRoleService from "../../../../service/AdminRoleService";
import { useNavigate } from "react-router-dom";
// import RoleFilterModal from "./RoleFilterModal";
// import EditRoleModal from "./EditRoleModal";

export default function RoleTable() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    // Search + Pagination
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("ASC");
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const [filterRequest, setFilterRequest] = useState({
        name: null,
        roleName: null,
        page: 0,
        size: perPage,
    });

    const fetchRoles = async () => {
        setLoading(true);

        const res = await AdminRoleService.getRoles({
            ...filterRequest,
            name: searchTerm.trim() || null,
            sortType : sortType,
            page: currentPage - 1,
            size: perPage,
        });

        if (res.success) {
            setRoles(res.data.result || []);
            setTotalPages(res.data.totalPages || 1);
            setTotal(res.data.total || 0);
        } else {
            toast.error(res.message || "Không thể tải danh sách vai trò");
        }

        setLoading(false);
    };

    useEffect(() => {
        setInputValue(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchRoles();
    }, [currentPage, perPage, filterRequest, sortType]);

    const handleEditClick = (role) => {
        setSelectedRole(role);
        setIsEditModalOpen(true);
    };

    const handleUpdateRole = async (roleId, roleData) => {
        try {
            const res = await AdminRoleService.updateRole(roleId, roleData);

            if (res.success) {
                toast.success("Cập nhật vai trò thành công");
                fetchRoles();
            } else {
                toast.error(res.message || "Lỗi khi cập nhật vai trò");
            }
        } catch {
            toast.error("Đã xảy ra lỗi khi cập nhật vai trò");
        }
    };

    const handleDeleteRole = async (roleId) => {
        try {
            const res = await AdminRoleService.deleteRole(roleId);

            if (res.success) {
                toast.success("Đã xóa vai trò thành công");
                fetchRoles();
            } else {
                toast.error(res.message || "Lỗi khi xóa vai trò");
            }
        } catch {
            toast.error("Đã xảy ra lỗi khi xóa vai trò");
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
                            placeholder="Tìm kiếm vai trò"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 pl-10 w-64 focus:outline-none focus:border-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    </div>

                    <span className="text-slate-400 text-sm">Tổng số kết quả: {total}</span>
                </div>

                <div className="flex items-center gap-4">
                    <select
                        value={sortType}
                        onChange={(e) => {
                            setSortType(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="ASC">Sắp xếp: Id tăng</option>
                        <option value="DESC">Sắp xếp: Id giảm</option>
                    </select>

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
                    <span className="text-slate-400">Vai trò / Trang</span>

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
                    <div className="col-span-4">Tên vai trò</div>
                    <div className="col-span-3">RoleName</div>
                    <div className="col-span-2 text-center"></div>
                </div>

                {/* Body */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : roles.length === 0 ? (
                    <div className="text-center text-slate-400 py-6">Không có vai trò nào</div>
                ) : (
                    roles.map((r) => {
                        const created = r.createdAt ? new Date(r.createdAt) : null;
                        const format = (d) =>
                            !d
                                ? "—"
                                : `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;

                        return (
                            <div
                                key={r.id}
                                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition"
                            >
                                {/* ID + CreatedAt */}
                                <div className="col-span-3">
                                    <div className="font-medium">#{r.id}</div>
                                    <div className="text-slate-400 text-sm">{format(created)}</div>
                                </div>

                                {/* Name */}
                                <div className="col-span-4">{r.name}</div>

                                {/* RoleName */}
                                <div className="col-span-3">{r.roleName}</div>

                                {/* Edit button */}
                                <div className="col-span-2 text-center">
                                    <button
                                        className="text-slate-400 hover:text-white transition"
                                        onClick={() => navigate(`/admin/roles/view/${r.id}`)}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

        </>
    );
}
