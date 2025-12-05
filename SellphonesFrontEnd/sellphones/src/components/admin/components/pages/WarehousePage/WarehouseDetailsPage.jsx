import React, { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AdminWarehouseService from "../../../service/AdminWarehouseService";
import EditWarehouseModal from "./components/EditWarehouseModal";
import InventoryTable from "./components/InventoryTable";
// import CreateInventoryModal from "./components/CreateInventoryModal";

const WarehouseDetailsPage = () => {
    const { warehouseId } = useParams();
    const navigate = useNavigate();

    const [warehouse, setWarehouse] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(false);

    const fetchWarehouse = async () => {
        try {
            const res = await AdminWarehouseService.getWarehouseById(warehouseId);
            if (res.success) setWarehouse(res.data);
        } catch (err) {
            toast.error("Lỗi khi tải thông tin kho");
        }
    };

    const formatAddress = (addr) => {
        if (!addr) return "-";
        const { street, ward, district, province } = addr;
        return `${street}, ${ward}, ${district}, ${province}`;
    };
    
    const handleCreateInventory = async (inventoryData) => {
        try {
            const res = await AdminWarehouseService.createInventory(warehouseId, inventoryData);
            if (res.success) {
                toast.success("Tạo inventory thành công");
                setIsReloaded(!isReloaded);
                setIsCreateModalOpen(false);
            } else {
                toast.error(res.message || "Lỗi khi tạo inventory");
            }
        } catch {
            toast.error("Lỗi khi tạo inventory");
        }
    };

    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: "Xóa kho?",
            text: "Bạn có chắc chắn muốn xóa kho này? Lưu ý nếu xóa nó sẽ xóa luôn dữ liệu liên quan.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await AdminWarehouseService.deleteWarehouse(warehouseId);
                if (res.success) {
                    toast.success("Xóa kho thành công!");
                    navigate("/admin/warehouses");
                } else {
                    toast.error(res.message || "Xóa thất bại");
                }
            } catch {
                toast.error("Đã xảy ra lỗi khi xóa kho");
            }
        }
    };

    const handleUpdate = async (updateData) => {
        try {
            const res = await AdminWarehouseService.updateWarehouse(warehouseId, updateData);
            if (res.success) {
                toast.success("Cập nhật thành công!");
                setIsEditModalOpen(false);
                fetchWarehouse();
            } else toast.error(res.message || "Cập nhật thất bại");
        } catch {
            toast.error("Lỗi khi cập nhật kho");
        }
    };

    useEffect(() => {
        fetchWarehouse();
    }, [warehouseId, isReloaded]);

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col gap-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                    {warehouse ? warehouse.name : "Chi tiết Warehouse"}
                </h1>

                <div className="flex gap-3">
                    {/* Delete Warehouse */}
                    <button
                        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                        onClick={handleDelete}
                    >
                        <XCircle size={20} />
                        <span className="text-sm font-medium">Xóa Warehouse</span>
                    </button>
                </div>
            </div>

            <div className="flex gap-6">

                {/* Left: Table Zone */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="flex justify-between items-center mt-4 mb-2">
                        <h2 className="text-lg font-semibold text-white">Danh sách dữ liệu kho</h2>

                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Thêm dữ liệu mới
                        </button>
                    </div>

                    <InventoryTable warehouseId={warehouseId} isReloaded={isReloaded}/>
                </div>

                {/* Right: Warehouse Info */}
                <div className="w-80 bg-slate-900 rounded-lg p-6 flex flex-col gap-4">

                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold mb-2">Thông tin Warehouse</h2>

                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="text-yellow-400 hover:text-yellow-200 transition px-2 py-1 
                                       rounded border border-yellow-400"
                        >
                            Sửa
                        </button>
                    </div>

                    {warehouse ? (
                        <>
                            <div>
                                <span className="text-slate-400">Tên kho:</span>{" "}
                                <span className="text-slate-200">{warehouse.name}</span>
                            </div>

                            <div>
                                <span className="text-slate-400">Địa chỉ:</span>{" "}
                                <span className="text-slate-200">
                                    {formatAddress(warehouse.address)}
                                </span>
                            </div>

                            <div>
                                <span className="text-slate-400">Ngày tạo:</span>{" "}
                                <span className="text-slate-200">
                                    {new Date(warehouse.createdAt).toLocaleString()}
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="text-slate-400">Đang tải...</div>
                    )}

                </div>
            </div>

            <EditWarehouseModal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                warehouse={warehouse}
                onUpdate={handleUpdate}
            />

            {/* <CreateInventoryModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateInventory}
            /> */}
        </div>
    );
};

export default WarehouseDetailsPage;
