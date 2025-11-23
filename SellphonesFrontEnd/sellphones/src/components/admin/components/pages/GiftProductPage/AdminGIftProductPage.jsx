import React, { useState } from "react";
import { toast } from "react-toastify";
import GiftProductTable from "./components/GiftProductTable";
import CreateGiftProductModal from "./components/CreateGiftProductModal";
import AdminGiftProductService from "../../../service/AdminGiftProductService";

const AdminGiftProductPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(true);

    const handleCreate = async (giftData, file) => {
        // Validate tên sản phẩm quà tặng
        if (!giftData.name?.trim()) {
            toast.error("Tên sản phẩm quà tặng không được để trống");
            return;
        }

        try {
            const res = await AdminGiftProductService.createGiftProduct(giftData, file);

            if (res.success) {
                toast.success("Tạo sản phẩm quà tặng thành công");
                setIsReloaded(!isReloaded); // Reload bảng
                setIsCreateModalOpen(false);
            } else {
                toast.error(res.message || "Lỗi khi tạo sản phẩm");
            }
        } catch {
            toast.error("Lỗi khi tạo sản phẩm");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Sản phẩm quà tặng</h1>
                <div className="flex gap-3">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <span>Thêm quà tặng</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <GiftProductTable isReloaded={isReloaded} />

            {/* Modal tạo sản phẩm quà tặng */}
            <CreateGiftProductModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreate}
            />
        </div>
    );
};

export default AdminGiftProductPage;
