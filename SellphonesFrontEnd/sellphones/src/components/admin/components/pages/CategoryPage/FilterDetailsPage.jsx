import React, { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminCategoryService from "../../../service/AdminCategoryService";
import FilterOptionTable from "./components/FilterOptionTable";
import EditFilterModal from "./components/EditFilterModal";
import CreateFilterOptionModal from "./components/CreateFilterOptionModal";

const FilterDetailsPage = () => {
    const { filterId } = useParams();
    const navigate = useNavigate();

    const [filter, setFilter] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(true);

    const fetchFilter = async () => {
        try {
            const res = await AdminCategoryService.getFilterById(filterId);
            if (res.success) {
                setFilter(res.data);
            } else {
                toast.error("Không thể tải thông tin Filter");
            }
        } catch (err) {
            console.error(err);
            toast.error("Lỗi khi tải Filter");
        }
    };

    useEffect(() => {
        fetchFilter();
    }, [filterId]);

    const handleUpdate = async (updatedData) => {
        try {
            const res = await AdminCategoryService.updateFilter(filterId, updatedData);
            if (res.success) {
                toast.success("Cập nhật Filter thành công!");
                setIsEditModalOpen(false);
                fetchFilter();
            } else {
                toast.error(res.message || "Cập nhật thất bại");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi cập nhật Filter");
        }
    };

    const handleDelete = async () => {
        const confirmed = await Swal.fire({
            title: "Xác nhận xóa Filter",
            text: "Filter này sẽ bị xóa vĩnh viễn!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        });

        if (!confirmed.isConfirmed) return;

        try {
            const res = await AdminCategoryService.deleteFilter(filterId);
            if (res.success) {
                toast.success("Xóa Filter thành công!");
                navigate(-1);
            } else {
                toast.error(res.message || "Xóa Filter thất bại");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi xóa Filter");
        }
    };

    const handleCreateFilterOption = async (optionData) => {
        const { name, cond, val1, val2 } = optionData;

        if (!name?.trim()) {
            toast.error("Tên option không được để trống");
            return;
        }

        if (!val1?.trim()) {
            toast.error("Giá trị đầu tiên không được để trống");
            return;
        }

        if (cond === "khoang" && !val2?.trim()) {
            toast.error("Giá trị thứ hai không được để trống khi chọn 'Trong khoảng'");
            return;
        }

        try {
            const res = await AdminCategoryService.createFilterOption(filterId, optionData); 

            if (res.success) {
                toast.success("Tạo filter option thành công");
                setIsReloaded(!isReloaded);
            } else {
                toast.error(res.message || "Lỗi khi tạo filter option");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi tạo filter option");
        }
    };

    const formatDate = (iso) => {
        if (!iso) return "-";
        const d = new Date(iso);
        return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${d.getFullYear()} ${d
                .getHours()
                .toString()
                .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                {/* Tiêu đề bên trái */}
                <h1 className="text-2xl font-semibold">
                    {filter ? `${filter.name}` : "Chi tiết Filter"}
                </h1>

                {/* Nút bên phải */}
                <div className="flex gap-2">
                    <button
                        className="flex items-center gap-2 text-white-500 hover:text-white-300 transition-colors"
                        onClick={handleDelete}
                    >
                        <XCircle size={20} />
                        <span className="text-sm font-medium">Xóa Filter</span>
                    </button>

                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        Thêm option mới
                    </button>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Left: FilterOptionTable */}
                <div className="flex-1">
                    <FilterOptionTable filterId={filterId} isReloaded={isReloaded} />
                </div>

                {/* Right: Filter info + edit */}
                <div className="w-80 bg-slate-900 rounded-lg p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold mb-2">
                            Thông tin Filter
                        </h2>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="text-yellow-400 hover:text-yellow-200 transition px-2 py-1 rounded border border-yellow-400"
                        >
                            Sửa
                        </button>
                    </div>

                    {filter ? (
                        <>
                            <div>
                                <span className="text-slate-400">Tên:</span>{" "}
                                <span className="text-slate-200">{filter.name}</span>
                            </div>
                            <div>
                                <span className="text-slate-400">Ngày tạo:</span>{" "}
                                <span className="text-slate-200">{formatDate(filter.createdAt)}</span>
                            </div>
                        </>
                    ) : (
                        <div className="text-slate-400">
                            Đang tải thông tin Filter...
                        </div>
                    )}
                </div>
            </div>

            <EditFilterModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                filter={filter}
                onUpdate={handleUpdate}
            />

            <CreateFilterOptionModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateFilterOption}
            />
        </div>
    );
};

export default FilterDetailsPage;
