import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminRoleService from "../../../service/AdminRoleService";
import CreateRoleModal from "./components/CreateRoleModal";
import RoleTable from "./components/RoleTable";
import { useNavigate } from "react-router-dom";



const AdminRolePage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleCreate = async (roleData) => {
        try {
            const res = await AdminRoleService.createRole(roleData);

            if (res.success) {
                toast.success("Tạo vai trò thành công");

                if (res.data?.id) {
                    navigate(`/admin/roles/view/${res.data.id}`);
                }
            } else {
                toast.error(res.message || "Lỗi khi tạo vai trò");
            }
        } catch (err) {
            toast.error("Lỗi khi tạo vai trò");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Quản lý vai trò</h1>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <span>Thêm vai trò</span>
                </button>
            </div>

            {/* Table */}
            <RoleTable />

            {/* Modal */}
            <CreateRoleModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreate}
            />
        </div>
    );
};

export default AdminRolePage;
