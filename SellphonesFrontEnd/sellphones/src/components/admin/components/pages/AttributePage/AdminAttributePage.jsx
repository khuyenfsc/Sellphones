import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import AdminAttributeTable from "./components/AdminAttributeTable";
import CreateAttributeModal from "./components/CreateAttributeModal";
import { is } from "date-fns/locale";
import { toast } from "react-toastify";
import AdminAttributeService from "../../../service/AdminAttributeService";

const AdminAttributePage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(true);

    const handleCreate = async (name) => {
        if (!name.trim()) {
            toast.error("Tên thuộc tính không được để trống");
        }

        try {
            const res = await AdminAttributeService.createAttribute({ name });
            if (res.success) {
                toast.success("Tạo thuộc tính thành công");
                setIsReloaded(!isReloaded);
            } else {
                toast.error(res.message || "Lỗi khi tạo thuộc tính");
            }
        } catch {
            toast.error("Lỗi khi tạo thuộc tính");
        }

    };


    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Thuộc tính</h1>
                <div className="flex gap-3">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <span>Thêm thuộc tính</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <AdminAttributeTable isReloaded={isReloaded}/>

            <CreateAttributeModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreate}
            />
        </div>
    );
};

export default AdminAttributePage;
