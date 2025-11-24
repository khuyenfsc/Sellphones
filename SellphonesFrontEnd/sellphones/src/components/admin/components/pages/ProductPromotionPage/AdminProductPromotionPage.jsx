import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminProductPromotionService from "../../../service/AdminProductPromotionService";
import CreatePromotionModal from "./components/CreatePromotionModal";
import ProductPromotionTable from "./components/ProductPromotionTable";

const AdminProductPromotionPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(true);

    const handleCreate = async (promotionData) => {
        try {
            const res = await AdminProductPromotionService.createPromotion(promotionData);
            if (res.success) {
                toast.success("Tạo khuyến mãi thành công");
                setIsReloaded(!isReloaded);
            } else {
                toast.error(res.message || "Lỗi khi tạo khuyến mãi");
            }
        } catch {
            toast.error("Lỗi khi tạo khuyến mãi");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Khuyến mãi sản phẩm</h1>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <span>Thêm khuyến mãi</span>
                </button>
            </div>

            {/* Table */}
            <ProductPromotionTable isReloaded={isReloaded} />

            {/* Modal */}
            <CreatePromotionModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreate}
            />
        </div>
    );
};

export default AdminProductPromotionPage;
