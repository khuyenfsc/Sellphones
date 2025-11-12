import React, { useEffect, useState } from "react";
import { ChevronRight, Trash2, XCircle, Edit2 } from "lucide-react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminAttributeService from "../../../service/AdminAttributeService";
import AttributeValueTable from "./components/AttributeValueTable";
import EditAttributeModal from "./components/EditAttributeModal";
import CreateAttributeValueModal from "./components/CreateAttirbuteValueModal";

const AttributeDetailsPage = () => {
    const [isCreateValueModalOpen, setIsCreateValueModalOpen] = useState(false);
    const navigate = useNavigate();
    const { attributeId } = useParams();
    const [isReloaded, setIsReloaded] = useState(true);

    const [attribute, setAttribute] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

    const handleUpdate = async (name) => {

        try {
            const res = await AdminAttributeService.updateAttribute(attributeId, { name });
            if (res.success) {
                toast.success("Cập nhật thuộc tính thành công!");
                setIsEditModalOpen(false);
                fetchAttribute();
            } else {
                toast.error(res.message || "Cập nhật thất bại");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi cập nhật thuộc tính");
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

    const handleCreateValue = async (valueData) => {
        const { strVal, numericVal } = valueData;

        if (!strVal?.trim()) {
            toast.error("Giá trị chuỗi (valueString) không được để trống");
            return;
        }

        try {
            const res = await AdminAttributeService.createValue(attributeId, valueData);

            if (res.success) {
                toast.success("Tạo giá trị thuộc tính thành công");
                setIsReloaded(!isReloaded);
            } else {
                toast.error(res.message || "Lỗi khi tạo giá trị thuộc tính");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi tạo giá trị thuộc tính");
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
                    {/* Nút xóa attribute */}
                    <button
                        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                        onClick={handleDelete}
                    >
                        <XCircle size={20} />
                        <span className="text-sm font-medium">Xóa Attribute</span>
                    </button>

                    {/* Nút tạo giá trị cho thuộc tính */}
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                        onClick={() => setIsCreateValueModalOpen(true)}
                    >
                        <span>Thêm giá trị mới</span>
                    </button>
                </div>

            </div>

            <div className="flex gap-6">
                {/* Left: Attribute Values */}
                <div className="flex-1 flex flex-col gap-6">
                    <AttributeValueTable
                        attributeId={attributeId}
                        isReloaded={isReloaded}
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

            <EditAttributeModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                attribute={attribute}
                onUpdate={handleUpdate}
            />

            <CreateAttributeValueModal
                isOpen={isCreateValueModalOpen}
                onClose={() => setIsCreateValueModalOpen(false)}
                onCreate={handleCreateValue}
            />
        </div>
    );
};

export default AttributeDetailsPage;
