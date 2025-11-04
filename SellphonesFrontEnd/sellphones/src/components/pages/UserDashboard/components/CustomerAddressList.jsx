// src/components/CustomerAddressList.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, MapPin, Pencil, Trash2 } from "lucide-react";
import AddAddressModal from "./AddAddressModel";
import CustomerInfoFormModal from "./CustomerInfoFormModal";
import { motion, AnimatePresence } from "framer-motion";
import CustomerInfoService from "../../../../service/CustomerInfoService";
import { toast } from "react-toastify";


export default function CustomerAddressList({ loading, customerInfos, setCustomerInfos }) {
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});


    // ✅ Gộp luôn dateOfBirth vào formData
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        ward: "",
        district: "",
        city: "",
        dateOfBirth: null,
    });

    // ✅ Mở form
    const handleAddAddress = () => setIsAdding(true);

    const handleDelete = async (customerInfoId) => {
        // 🧠 Hiện popup xác nhận
        const confirmResult = await Swal.fire({
            title: "Bạn có chắc muốn xóa?",
            text: "Hành động này không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (!confirmResult.isConfirmed) return; // ❌ Người dùng bấm "Hủy"

        // 🔄 Gọi API xóa
        const response = await CustomerInfoService.deleteCustomerInfo(customerInfoId);

        if (response.success) {
            // ✅ Xóa thành công → cập nhật lại danh sách
            setCustomerInfos((prev) => prev.filter(info => info.id !== customerInfoId));

            await Swal.fire({
                icon: "success",
                title: "Đã xóa!",
                text: "Customer Info đã được xóa thành công.",
                timer: 1500,
                showConfirmButton: false,
            });
        } else {
            await Swal.fire({
                icon: "error",
                title: "Lỗi!",
                text: response.message || "Không thể xóa Customer Info.",
            });
        }
    };

    

    const handleCloseForm = () => {
        setIsAdding(false);
        setIsEditing(false); // 👈 reset trạng thái edit nếu đang edit
        setEditingId(null);  // 👈 reset id đang chỉnh sửa

        // Reset dữ liệu form
        setFormData({
            fullName: "",
            phone: "",
            address: "",
            ward: "",
            district: "",
            city: "",
            dateOfBirth: null,
        });

        // Xóa lỗi cũ
        setErrors({});
    };


    // ✅ Khi người dùng nhập input text
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (!validate()) return;

        const formattedData = {
            fullName: formData.fullName,
            phoneNumber: formData.phone,
            dateOfBirth: formData.dateOfBirth
                ? `${formData.dateOfBirth.getFullYear()}-${String(
                    formData.dateOfBirth.getMonth() + 1
                ).padStart(2, "0")}-${String(formData.dateOfBirth.getDate()).padStart(2, "0")}`
                : "",
            address: {
                street: formData.address,
                ward: formData.ward,
                district: formData.district,
                province: formData.city,
            },
        };

        console.log("📦 Dữ liệu gửi lên server:", formattedData);

        try {
            setIsSaving(true); // bật trạng thái đang lưu

            const res = await CustomerInfoService.createCustomerInfo(formattedData);

            if (res.success) {
                toast.success("Đã thêm địa chỉ mới thành công!");

                const updatedList = await CustomerInfoService.getCustomerInfos();
                if (updatedList.success) setCustomerInfos(updatedList.data);

                handleCloseForm(); // reset form
            } else {
                toast.error(res.message || "Không thể thêm địa chỉ mới!");
            }
        } catch (error) {
            console.error("❌ Lỗi khi tạo khách hàng:", error);
            toast.error("Đã xảy ra lỗi khi thêm địa chỉ mới!");
        } finally {
            setIsSaving(false); // tắt trạng thái đang lưu
        }
    };


    // 🧩 Khi người dùng chọn chỉnh sửa
    const handleEdit = (info) => {
        setEditingId(info.id);
        setFormData({
            fullName: info.fullName,
            phone: info.phoneNumber,
            address: info.address.street,
            ward: info.address.ward,
            district: info.address.district,
            city: info.address.province,
            dateOfBirth: info.dateOfBirth ? new Date(info.dateOfBirth) : null,
        });
        setIsEditing(true);
    };

    const handleUpdate = async () => {
        if (!validate()) return;

        const formattedData = {
            fullName: formData.fullName,
            phoneNumber: formData.phone,
            dateOfBirth: formData.dateOfBirth
                ? `${formData.dateOfBirth.getFullYear()}-${String(
                    formData.dateOfBirth.getMonth() + 1
                ).padStart(2, "0")}-${String(formData.dateOfBirth.getDate()).padStart(2, "0")}`
                : "",
            address: {
                street: formData.address,
                ward: formData.ward,
                district: formData.district,
                province: formData.city,
            },
        };

        console.log("📦 Dữ liệu cập nhật gửi lên server:", formattedData);

        try {
            setIsUpdating(true); // bật trạng thái đang update

            const res = await CustomerInfoService.updateCustomerInfo(editingId, formattedData);

            if (res.success) {
                toast.success("Cập nhật thông tin thành công!");

                const updatedList = await CustomerInfoService.getCustomerInfos();
                if (updatedList.success) setCustomerInfos(updatedList.data);

                handleCloseForm();
                setEditingId(null);
            } else {
                toast.error(res.message || "Không thể cập nhật thông tin khách hàng!");
            }
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật khách hàng:", error);
            toast.error("Đã xảy ra lỗi khi cập nhật thông tin khách hàng!");
        } finally {
            setIsUpdating(false); // tắt trạng thái đang update
        }
    };

    // ✅ Validate các trường
    const validate = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Họ và tên không được để trống";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Số điện thoại không được để trống";
        } else if (!/^(0\d{9})$/.test(formData.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ (phải có 10 chữ số và bắt đầu bằng 0)";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Địa chỉ không được để trống";
        }

        if (!formData.ward.trim()) {
            newErrors.ward = "Phường/Xã không được để trống";
        }

        if (!formData.district.trim()) {
            newErrors.district = "Quận/Huyện không được để trống";
        }

        if (!formData.city.trim()) {
            newErrors.city = "Tỉnh/Thành phố không được để trống";
        }

        // Ngày sinh: nếu có thì phải hợp lệ
        if (formData.dateOfBirth) {
            if (isNaN(new Date(formData.dateOfBirth))) {
                newErrors.dateOfBirth = "Ngày sinh không hợp lệ";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <>
            {/* Danh sách địa chỉ */}
            <div className="bg-white rounded-lg shadow-sm p-6 relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Địa chỉ nhận hàng</h2>
                    <button
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                        onClick={handleAddAddress}
                    >
                        <Plus className="w-4 h-4" />
                        Thêm địa chỉ
                    </button>
                </div>

                {loading ? (
                    <p className="text-gray-500 text-sm">Đang tải danh sách địa chỉ...</p>
                ) : customerInfos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="mb-4">
                            <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center relative">
                                <div className="absolute inset-0 flex items-center justify-center text-6xl">🐰</div>
                                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                                    <div className="bg-white rounded-lg shadow-lg p-3">
                                        <div className="text-3xl">🎁</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm">Bạn chưa có địa chỉ nào được tạo</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {customerInfos.map((info) => (
                            <div
                                key={info.id}
                                className="border border-gray-200 rounded-lg p-4 flex items-start justify-between hover:shadow-md transition"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <MapPin className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">
                                            {info.fullName} — {info.phoneNumber}
                                        </h3>
                                        <p className="text-gray-600 mt-1 text-sm">
                                            {info.address.street}, {info.address.ward}, {info.address.district},{" "}
                                            {info.address.province}
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            Ngày sinh: {new Date(info.dateOfBirth).toLocaleDateString("vi-VN")}
                                        </p>
                                    </div>
                                </div>

                                {/* Nút chỉnh sửa / xóa */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleEdit(info)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(info.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {isAdding && (
                    <CustomerInfoFormModal
                        visible={isAdding}
                        onClose={handleCloseForm}
                        title="Thêm địa chỉ mới"
                        formData={formData}
                        setFormData={setFormData}
                        errors={errors}
                        setErrors={setErrors}
                        onSubmit={handleSave}
                        isSubmitting={isSaving}
                        mode="add"
                    />
                )}

                {isEditing && (
                    <CustomerInfoFormModal
                        visible={isEditing}
                        onClose={handleCloseForm}
                        title="Chỉnh sửa địa chỉ"
                        formData={formData}
                        setFormData={setFormData}
                        errors={errors}
                        setErrors={setErrors}
                        onSubmit={handleUpdate} 
                        isSubmitting={isUpdating}
                        mode="edit"
                    />
                )}
            </AnimatePresence>


            {toast.show && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500">
                    <div
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${toast.type === "success"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                            }`}
                    >
                        {toast.type === "success" && (
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}

        </>
    );
}
