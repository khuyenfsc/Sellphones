import React, { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminCategoryService from "../../../service/AdminCategoryService";
import OptionTable from "./components/OptionTable";
import FilterTable from "./components/FilterTable";
import EditCategoryModal from "./components/EditCategoryModal";
import CreateOptionModal from "./components/CreateOptionModal";

const CategoryDetailsPage = () => {
    const [isCreateOptionModalOpen, setIsCreateOptionModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(true);

    const navigate = useNavigate();
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [iconPreview, setIconPreview] = useState(category?.icon || null);

    const fetchCategory = async () => {
        try {
            const res = await AdminCategoryService.getCategoryById(categoryId);
            if (res.success) setCategory(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Lỗi khi tải thông tin category");
        }
    };

    const formatDate = (isoString) => {
        if (!isoString) return "-";
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const handleUpdate = async (updatedData, file) => {
        try {
            const res = await AdminCategoryService.updateCategory(categoryId, updatedData, file);
            if (res.success) {
                toast.success("Cập nhật category thành công!");
                setIsEditModalOpen(false);
                fetchCategory();
            } else {
                toast.error(res.message || "Cập nhật thất bại");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi cập nhật category");
        }
    };

    const handleDelete = async () => {
        if (!categoryId) {
            toast.error("Không tìm thấy category để xóa.");
            return;
        }

        const result = await Swal.fire({
            title: "Xác nhận xóa",
            text: "Bạn có chắc chắn muốn xóa category này? Sau khi xóa, các options của nó cũng sẽ bị xóa.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (result.isConfirmed) {
            try {
                const res = await AdminCategoryService.deleteCategory(categoryId);
                if (res.success) {
                    toast.success("Xóa category thành công!");
                    navigate("/admin/categories");
                } else {
                    toast.error(res.message || "Xóa category thất bại");
                }
            } catch (err) {
                console.error(err);
                toast.error("Đã xảy ra lỗi khi xóa category");
            }
        }
    };


    useEffect(() => {
        fetchCategory();
    }, [categoryId]);

    useEffect(() => {
        setIconPreview(`${category?.icon}?t=${Date.now()}`);
    }, [category]);

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                    {category ? category.name : "Chi tiết Category"}
                </h1>
                <div className="flex gap-3">
                    <button
                        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                        onClick={handleDelete}
                    >
                        <XCircle size={20} />
                        <span className="text-sm font-medium">Xóa Category</span>
                    </button>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Left: Options Table */}
                <div className="flex-1 flex flex-col gap-6">
                    <FilterTable categoryId={categoryId} />
                    <OptionTable categoryId={categoryId} isReloaded={isReloaded} />
                </div>

                {/* Right: Category Info */}
                <div className="w-80 bg-slate-900 rounded-lg p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold mb-2">Thông tin Category</h2>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="text-yellow-400 hover:text-yellow-200 transition px-2 py-1 rounded border border-yellow-400"
                        >
                            Sửa
                        </button>
                    </div>

                    {category ? (
                        <>
                            <div>
                                <span className="text-slate-400">Tên:</span>{" "}
                                <span className="text-slate-200">{category.name}</span>
                            </div>
                            <div>
                                <span className="text-slate-400">Mã:</span>{" "}
                                <span className="text-slate-200">{category.code}</span>
                            </div>
                            <div>
                                <span className="text-slate-400">Ngày tạo:</span>{" "}
                                <span className="text-slate-200">{formatDate(category.createdAt)}</span>
                            </div>
                            <div>
                                <span className="text-slate-400">Hiển thị trang chủ:</span>{" "}
                                <span className={category.featuredOnHomepage ? "text-green-500" : "text-red-500"}>
                                    {category.featuredOnHomepage ? "Có" : "Không"}
                                </span>

                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400">Icon:</span>
                                {iconPreview && (
                                    <img
                                        key={iconPreview}
                                        src={iconPreview}
                                        alt={category.name}
                                        className="w-10 h-10 object-contain rounded"
                                    />
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-slate-400">Đang tải thông tin Category...</div>
                    )}
                </div>
            </div>

            <EditCategoryModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                category={category}
                onUpdate={handleUpdate}
            />
        </div>
    );
};

export default CategoryDetailsPage;
