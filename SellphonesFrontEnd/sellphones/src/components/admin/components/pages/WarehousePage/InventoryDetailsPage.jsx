import React, { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import AdminWarehouseService from "../../../service/AdminWarehouseService";
import StockEntryByInventoryTable from "./components/StockEntryByInventoryTable";
import CreateStockEntryModal from "./components/CreateStockEntryModal";
// import EditInventoryModal from "./components/EditInventoryModal";
// import VariantTable from "./components/VariantTable"; 

const InventoryDetailsPage = () => {
    const { inventoryId, warehouseId } = useParams();
    const navigate = useNavigate();

    const [inventory, setInventory] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(false);

    const fetchInventory = async () => {
        try {
            const res = await AdminWarehouseService.getInventoryById(inventoryId);
            if (res.success) setInventory(res.data);
        } catch (err) {
            toast.error("Lỗi khi tải thông tin inventory");
        }
    };

    const handleUpdate = async (updateData) => {
        try {
            const res = await AdminInventoryService.updateInventory(inventoryId, updateData);
            if (res.success) {
                toast.success("Cập nhật thành công!");
                setIsEditModalOpen(false);
                setIsReloaded(!isReloaded);
            } else toast.error(res.message || "Cập nhật thất bại");
        } catch {
            toast.error("Lỗi khi cập nhật inventory");
        }
    };

    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: "Xóa inventory?",
            text: "Bạn có chắc chắn muốn xóa inventory này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await AdminWarehouseService.deleteInventory(inventoryId);
                if (res.success) {
                    toast.success("Xóa inventory thành công!");
                    navigate(`/admin/warehouses/view/${warehouseId}`);
                } else {
                    toast.error(res.message || "Xóa thất bại");
                }
            } catch {
                toast.error("Đã xảy ra lỗi khi xóa inventory");
            }
        }
    };

    useEffect(() => {
        fetchInventory();
    }, [inventoryId, isReloaded]);

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col gap-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                    {inventory?.productVariant?.productVariantName}
                </h1>

                <div className="flex gap-3">
                    <button
                        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                        onClick={handleDelete}
                    >
                        <XCircle size={20} />
                        <span className="text-sm font-medium">Xóa Inventory</span>
                    </button>
                </div>
            </div>

            <div className="flex gap-6">

                {/* Left: Variant Table */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="flex justify-between items-center mt-4 mb-2">
                        <h2 className="text-lg font-semibold text-white">Danh sách các phiếu nhập kho</h2>

                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Thêm phiếu nhập kho
                        </button>
                    </div>

                    <StockEntryByInventoryTable inventoryId={inventoryId} isReloaded={isReloaded}/>
                </div>

                {/* Right: Inventory Info */}
                <div className="w-80 bg-slate-900 rounded-lg p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold mb-2">Thông tin Inventory</h2>
                    </div>

                    {inventory ? (
                        <>
                            <div>
                                <span className="text-slate-400">Tên phiên bản sản phẩm:</span>{" "}
                                <span className="text-slate-200">{inventory.productVariant?.productVariantName}</span>
                            </div>

                            <div>
                                <span className="text-slate-400">Kho:</span>{" "}
                                <span className="text-slate-200">{inventory.warehouse?.name}</span>
                            </div>

                            <div>
                                <span className="text-slate-400">Địa chỉ kho:</span>{" "}
                                <span className="text-slate-200">
                                    {inventory.warehouse
                                        ? `${inventory.warehouse.address.street}, ${inventory.warehouse.address.ward}, ${inventory.warehouse.address.district}, ${inventory.warehouse.address.province}`
                                        : "-"}
                                </span>
                            </div>

                            <div>
                                <span className="text-slate-400">Số lượng:</span>{" "}
                                <span className="text-slate-200">{inventory.quantity}</span>
                            </div>
                        </>
                    ) : (
                        <div className="text-slate-400">Đang tải...</div>
                    )}

                </div>
            </div>

            {/* <EditInventoryModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                inventory={inventory}
                onUpdate={handleUpdate}
            /> */}

            <CreateStockEntryModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                // onCreate={handleCreateStockEntry}
            />
        </div>
    );
};

export default InventoryDetailsPage;
