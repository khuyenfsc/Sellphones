import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminUserService from "../../../service/AdminUserService";
// import CreateUserModal from "./components/CreateUserModal";
import UserTable from "./components/UserTable";

const AdminUserPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(true);

    const handleCreate = async (userData) => {
        try {
            const res = await AdminUserService.createUser(userData);
            if (res.success) {
                toast.success("Tạo người dùng thành công");
                setIsReloaded(!isReloaded); 
            } else {
                toast.error(res.message || "Lỗi khi tạo người dùng");
            }
        } catch {
            toast.error("Lỗi khi tạo người dùng");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <span>Thêm người dùng</span>
                </button>
            </div>

            <UserTable isReloaded={isReloaded} />

            {/* <CreateUserModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreate}
            /> */}
        </div>
    );
};

export default AdminUserPage;
