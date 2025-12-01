import React, { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AdminSupplierService from "../../../service/AdminSupplierService";
import StockEntryTable from "./components/StockEntryTable";
// import EditSupplierModal from "./components/EditSupplierModal";

const SupplierDetailsPage = () => {
    const { supplierId } = useParams();
    const navigate = useNavigate();

    const [supplier, setSupplier] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(false);

    const fetchSupplier = async () => {
        try {
            const res = await AdminSupplierService.getSupplierById(supplierId);
            if (res.success) setSupplier(res.data);
        } catch (err) {
            toast.error("Lỗi khi tải thông tin nhà cung cấp");
        }
    };

    const formatDate = (isoString) => {
        if (!isoString) return "-";
        const date = new Date(isoString);
        const d = String(date.getDate()).padStart(2, "0");
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const y = date.getFullYear();
        const h = String(date.getHours()).padStart(2, "0");
        const mi = String(date.getMinutes()).padStart(2, "0");
        return `${d}/${m}/${y} ${h}:${mi}`;
    };

    const formatAddress = (addr) => {
        if (!addr) return "-";
        const { street, ward, district, province } = addr;
        return `${street}, ${ward}, ${district}, ${province}`;
    };

    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: "Xóa nhà cung cấp?",
            text: "Bạn có chắc chắn muốn xóa nhà cung cấp này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await AdminSupplierService.deleteSupplier(supplierId);
                if (res.success) {
                    toast.success("Xóa nhà cung cấp thành công!");
                    navigate("/admin/suppliers");
                } else {
                    toast.error(res.message || "Xóa thất bại");
                }
            } catch {
                toast.error("Đã xảy ra lỗi khi xóa nhà cung cấp");
            }
        }
    };

    const handleUpdate = async (updateData) => {
        try {
            const res = await AdminSupplierService.updateSupplier(supplierId, updateData);
            if (res.success) {
                toast.success("Cập nhật thành công!");
                setIsEditModalOpen(false);
                fetchSupplier();
            } else toast.error(res.message || "Cập nhật thất bại");
        } catch {
            toast.error("Lỗi khi cập nhật nhà cung cấp");
        }
    };

    useEffect(() => {
        fetchSupplier();
    }, [supplierId, isReloaded]);

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col gap-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                    {supplier ? supplier.name : "Chi tiết Supplier"}
                </h1>

                <div className="flex gap-3">

                    {/* Delete Supplier */}
                    <button
                        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                        onClick={handleDelete}
                    >
                        <XCircle size={20} />
                        <span className="text-sm font-medium">Xóa Supplier</span>
                    </button>

                    {/* Edit Supplier */}
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg 
                                   hover:bg-blue-700 transition text-white"
                        onClick={() => setIsEditModalOpen(true)}
                    >
                        Chỉnh sửa
                    </button>
                </div>
            </div>



            <div className="flex gap-6">


                {/* Left: TABLE ZONE */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="flex justify-between items-center mt-4 mb-2">
                        <h2 className="text-lg font-semibold text-white">Danh sách các phiên bản</h2>

                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Tạo phiên bản mới
                        </button>
                    </div>
                    <StockEntryTable supplierId={supplierId} />
                </div>

                {/* Right: Supplier Info */}
                <div className="w-80 bg-slate-900 rounded-lg p-6 flex flex-col gap-4">

                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold mb-2">Thông tin Supplier</h2>

                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="text-yellow-400 hover:text-yellow-200 transition px-2 py-1 
                                       rounded border border-yellow-400"
                        >
                            Sửa
                        </button>
                    </div>

                    {supplier ? (
                        <>
                            <div>
                                <span className="text-slate-400">Tên:</span>{" "}
                                <span className="text-slate-200">{supplier.name}</span>
                            </div>

                            <div>
                                <span className="text-slate-400">Người liên hệ:</span>{" "}
                                <span className="text-slate-200">{supplier.contactName}</span>
                            </div>

                            <div>
                                <span className="text-slate-400">Số điện thoại:</span>{" "}
                                <span className="text-slate-200">{supplier.phoneNumber}</span>
                            </div>

                            <div>
                                <span className="text-slate-400">Email:</span>{" "}
                                <span className="text-slate-200">{supplier.email}</span>
                            </div>

                            <div>
                                <span className="text-slate-400">Địa chỉ:</span>{" "}
                                <span className="text-slate-200">
                                    {formatAddress(supplier.address)}
                                </span>
                            </div>

                            <div>
                                <span className="text-slate-400">Mã số thuế:</span>{" "}
                                <span className="text-slate-200">{supplier.taxCode}</span>
                            </div>

                            <div>
                                <span className="text-slate-400">Trạng thái:</span>{" "}
                                <span
                                    className={`
                                        px-3 py-1 rounded-full text-sm font-semibold
                                        ${supplier.supplierStatus === "ACTIVE"
                                            ? "bg-green-600"
                                            : "bg-red-600"}
                                    `}
                                >
                                    {supplier.supplierStatus}
                                </span>
                            </div>

                            <div>
                                <span className="text-slate-400">Ngày tạo:</span>{" "}
                                <span className="text-slate-200">
                                    {formatDate(supplier.createdAt)}
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="text-slate-400">Đang tải...</div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default SupplierDetailsPage;
