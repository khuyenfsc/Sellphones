import React, { useState } from "react";
import { toast } from "react-toastify";
import SupplierTable from "./components/SupplierTable";
import CreateSupplierModal from "./components/CreateSupplierModal";
import AdminSupplierService from "../../../service/AdminSupplierService";

const AdminSupplierPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(true);

    const handleCreate = async (supplierData, file) => {
        try {
            const res = await AdminSupplierService.createSupplier(supplierData, file);
            if (res.success) {
                toast.success("Tạo nhà cung cấp thành công");
                setIsReloaded(!isReloaded);
                setIsCreateModalOpen(false);
            } else {
                toast.error(res.message || "Lỗi khi tạo nhà cung cấp");
            }
        } catch {
            toast.error("Lỗi khi tạo nhà cung cấp");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Nhà cung cấp</h1>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                >
                    Thêm Nhà Cung Cấp
                </button>
            </div>

            <SupplierTable isReloaded={isReloaded} />

            <CreateSupplierModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreate}
            />
        </div>
    );
};

export default AdminSupplierPage;
