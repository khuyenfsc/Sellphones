import React, { useState } from "react";
import { toast } from "react-toastify";
import BrandTable from "./components/BrandTable";
import CreateBrandModal from "./components/CreateBrandModal";
import AdminBrandService from "../../../service/AdminBrandService";

const AdminBrandPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(true);

    const handleCreate = async (brandData, file) => {
        // Kiểm tra tên thương hiệu
        if (!brandData.name?.trim()) {
            toast.error("Tên thương hiệu không được để trống");
            return;
        }

        try {
            const res = await AdminBrandService.createBrand(brandData, file);
            if (res.success) {
                toast.success("Tạo thương hiệu thành công");
                setIsReloaded(!isReloaded); // reload bảng
                setIsCreateModalOpen(false);
            } else {
                toast.error(res.message || "Lỗi khi tạo thương hiệu");
            }
        } catch {
            toast.error("Lỗi khi tạo thương hiệu");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Thương hiệu</h1>
                <div className="flex gap-3">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <span>Thêm thương hiệu</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <BrandTable isReloaded={isReloaded} />

            {/* Modal tạo thương hiệu */}
            <CreateBrandModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreate}
            />
        </div>
    );
};

export default AdminBrandPage;
