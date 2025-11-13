import React, { useState } from "react";
import { toast } from "react-toastify";
import { PlusCircle } from "lucide-react";
import AdminCategoryService from "../../../service/AdminCategoryService";
import CategoryTable from "./components/CategoryTable";
import CreateCategoryModal from "./components/CreateCategoryModal";

const AdminCategoryPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(true);

    const handleCreate = async (categoryData, file) => {
        if (!categoryData.name.trim() || !categoryData.code.trim()) {
            toast.error("Tên và mã danh mục không được để trống");
            return;
        }

        try {
            const res = await AdminCategoryService.createCategory(categoryData, file);
            if (res.success) {
                toast.success("Tạo danh mục thành công");
                setIsReloaded(!isReloaded);
                setIsCreateModalOpen(false);
            } else {
                toast.error(res.message || "Lỗi khi tạo danh mục");
            }
        } catch (error) {
            toast.error("Lỗi khi tạo danh mục");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Danh mục</h1>
                <div className="flex gap-3">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <span>Thêm danh mục</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <CategoryTable isReloaded={isReloaded} />

            {/* Modal */}
            <CreateCategoryModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreate}
            />
        </div>
    );
};

export default AdminCategoryPage;
