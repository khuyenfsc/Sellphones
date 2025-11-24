import React, { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminRoleService from "../../../service/AdminRoleService";
import RoleInfoPanel from "./components/RoleInfoPanel";
import PermissionsTree from "./components/PermissionsTree";
// import EditRoleModal from "./components/EditRoleModal";

export default function RoleDetailsPage() {
    const { roleId } = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [isReloaded, setIsReloaded] = useState(true);

    const fetchRole = async () => {
        try {
            const res = await AdminRoleService.getRoleById(roleId);
            if (res.success) {
                setRole(res.data);
                setSelectedPermissions(res.data.permissions.map((p) => p.id));
            }
        } catch (err) {
            console.error(err);
            toast.error("Lỗi khi tải thông tin role");
        }
    };

    useEffect(() => {
        fetchRole();
    }, [roleId, isReloaded]);

    const togglePermission = (permId) => {
        setSelectedPermissions((prev) =>
            prev.includes(permId) ? prev.filter((id) => id !== permId) : [...prev, permId]
        );
    };

    const handleUpdatePermissions = async () => {
        try {
            const res = await AdminRoleService.updateRolePermissions(roleId, selectedPermissions);
            if (res.success) {
                toast.success("Cập nhật quyền thành công!");
                setIsReloaded(!isReloaded);
            } else {
                toast.error(res.message || "Cập nhật quyền thất bại");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi cập nhật quyền");
        }
    };

    const handleDeleteRole = async () => {
        const result = await Swal.fire({
            title: "Xác nhận xóa",
            text: "Bạn có chắc chắn muốn xóa role này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (result.isConfirmed) {
            try {
                const res = await AdminRoleService.deleteRole(roleId);
                if (res.success) {
                    toast.success("Xóa role thành công!");
                    navigate("/admin/roles");
                } else {
                    toast.error(res.message || "Xóa role thất bại");
                }
            } catch (err) {
                console.error(err);
                toast.error("Đã xảy ra lỗi khi xóa role");
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">{role ? role.name : "Chi tiết Role"}</h1>
                <div className="flex gap-3">
                    <button
                        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                        onClick={handleDeleteRole}
                    >
                        <XCircle size={20} />
                        <span className="text-sm font-medium">Xóa Role</span>
                    </button>

                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                        onClick={() => setIsEditModalOpen(true)}
                    >
                        <span>Sửa Role</span>
                    </button>
                </div>
            </div>

            <div className="flex gap-6">
                <div className="flex-1"> {/* Chiếm toàn bộ không gian còn lại */}
                    <PermissionsTree
                        permissions={role?.permissions}
                        selectedPermissions={selectedPermissions}
                        togglePermission={togglePermission}
                        onSave={handleUpdatePermissions}
                    />
                </div>

                <div className="w-80 flex-shrink-0"> {/* Cố định width, sát phải */}
                    <RoleInfoPanel role={role} onEdit={() => setIsEditModalOpen(true)} />
                </div>
            </div>


            {/* <EditRoleModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                role={role}
                onUpdate={() => setIsReloaded(!isReloaded)}
            /> */}
        </div>
    );
}
