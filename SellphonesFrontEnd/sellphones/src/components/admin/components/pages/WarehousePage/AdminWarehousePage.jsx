import React, { useState } from "react";
import { toast } from "react-toastify";
import WarehouseTable from "./components/WarehouseTable";
import CreateWarehouseModal from "./components/CreateWarehouseModal";
import AdminWarehouseService from "../../../service/AdminWarehouseService";

const AdminWarehousePage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(true);

    const handleCreate = async (warehouseData) => {
        try {
            const res = await AdminWarehouseService.createWarehouse(warehouseData);
            if (res.success) {
                toast.success("Tạo kho hàng thành công");
                setIsReloaded(!isReloaded);
                setIsCreateModalOpen(false);
            } else {
                toast.error(res.message || "Lỗi khi tạo kho hàng");
            }
        } catch {
            toast.error("Lỗi khi tạo kho hàng");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Kho Hàng</h1>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                >
                    Thêm Kho Hàng
                </button>
            </div>

            <WarehouseTable isReloaded={isReloaded} />

            <CreateWarehouseModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreate}
            />
        </div>
    );
};

export default AdminWarehousePage;
