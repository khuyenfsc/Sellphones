import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminWarrantyService from "../../../service/AdminWarrantyService";
import CreateWarrantyModal from "./components/CreateWarrantyModal";
import WarrantyTable from "./components/WarrantyTable";

const AdminWarrantyPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(true);

    const handleCreate = async (warrantyData) => {
        try {
            const res = await AdminWarrantyService.createWarranty(warrantyData);
            if (res.success) {
                toast.success("Tạo bảo hành thành công");
                setIsReloaded(!isReloaded);
            } else {
                toast.error(res.message || "Lỗi khi tạo bảo hành");
            }
        } catch {
            toast.error("Lỗi khi tạo bảo hành");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Bảo hành</h1>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <span>Thêm bảo hành</span>
                </button>
            </div>

            {/* Table */}
            <WarrantyTable isReloaded={isReloaded} />

            <CreateWarrantyModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreate}
            />
        </div>
    );
};

export default AdminWarrantyPage;
