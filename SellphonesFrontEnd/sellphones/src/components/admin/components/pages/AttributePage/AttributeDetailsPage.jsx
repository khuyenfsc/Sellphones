import React, { useEffect, useState } from "react";
import { ChevronRight, Trash2, XCircle, Edit2 } from "lucide-react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminAttributeService from "../../../service/AdminAttributeService";
import AttributeValueTable from "./components/AttributeValueTable";
// import EditAttributeModal from "./components/EditAttributeModal";

const AttributeDetailsPage = () => {
    const navigate = useNavigate();
    const { attributeId } = useParams();

    const [attribute, setAttribute] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Lấy thông tin attribute
    const fetchAttribute = async () => {
        try {
            const res = await AdminAttributeService.getAttributeById(attributeId);
            if (res.success) setAttribute(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Lỗi khi tải thông tin attribute");
        }
    };

    const formatDate = (isoString) => {
        if (!isoString) return "-";
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // tháng từ 0 → 11
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };



    // Lấy danh sách attribute values
    // const fetchAttributeValues = async () => {
    //     setLoadingValues(true);
    //     try {
    //         const res = await AdminAttributeService.getAttributeValues(attributeId);
    //         if (res.success) setAttributeValues(res.data);
    //     } catch (err) {
    //         console.error(err);
    //         toast.error("Lỗi khi tải danh sách giá trị attribute");
    //     }
    //     setLoadingValues(false);
    // };

    const handleUpdate = async (updatedData) => {
        if (!attributeId) return;

        try {
            const res = await AdminAttributeService.updateAttribute(attributeId, updatedData);
            if (res.success) {
                toast.success("Cập nhật attribute thành công!");
                setIsEditModalOpen(false);
                fetchAttribute();
            } else {
                toast.error(res.message || "Cập nhật thất bại");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi cập nhật attribute");
        }
    };

    const handleDelete = async () => {
        if (!attributeId) {
            toast.error("Không tìm thấy attribute để xóa.");
            return;
        }

        const result = await Swal.fire({
            title: "Xác nhận xóa",
            text: "Bạn có chắc chắn muốn xóa attribute này? Sau khi xóa, các giá trị của nó cũng sẽ bị xóa.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (result.isConfirmed) {
            try {
                const res = await AdminAttributeService.deleteAttribute(attributeId);
                if (res.success) {
                    toast.success("Xóa attribute thành công!");
                    navigate("/admin/attributes");
                } else {
                    toast.error(res.message || "Xóa attribute thất bại");
                }
            } catch (err) {
                console.error(err);
                toast.error("Đã xảy ra lỗi khi xóa attribute");
            }
        }
    };

    useEffect(() => {
        fetchAttribute();
        // fetchAttributeValues();
    }, [attributeId]);

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                    {attribute ? attribute.name : "Chi tiết Attribute"}
                </h1>
                <div className="flex gap-3">
                    <button
                        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                        onClick={handleDelete}
                    >
                        <XCircle size={20} />
                        <span className="text-sm font-medium">Xóa Attribute</span>
                    </button>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Left: Attribute Values */}
                <div className="flex-1 flex flex-col gap-6">
                    <AttributeValueTable
                        attributeId={attributeId}
                    />
                </div>

                {/* Right: Attribute Info */}
                <div className="w-80 bg-slate-900 rounded-lg p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold mb-2">Thông tin Attribute</h2>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="text-yellow-400 hover:text-yellow-200 transition px-2 py-1 rounded border border-yellow-400"
                        >
                            Sửa
                        </button>
                    </div>

                    {attribute ? (
                        <>
                            <div>
                                <span className="text-slate-400">Tên Attribute:</span>{" "}
                                <span className="text-slate-200">{attribute.name}</span>
                            </div>
                            <div>
                                <span className="text-slate-400">Ngày tạo:</span>{" "}
                                <span className="text-slate-200">{formatDate(attribute.createdAt)}</span>
                            </div>
                        </>
                    ) : (
                        <div className="text-slate-400">Đang tải thông tin Attribute...</div>
                    )}
                </div>
            </div>

            {/* <EditAttributeModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                attribute={attribute}
                onUpdate={handleUpdate}
            /> */}
        </div>
    );
};

export default AttributeDetailsPage;
