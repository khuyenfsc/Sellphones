import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditCustomerModal({ isOpen, onClose, customer, onUpdate }) {
    const [formData, setFormData] = useState({
        fullName: "",
        cccd: "",
        phoneNumber: "",
        street: "",
        ward: "",
        district: "",
        province: "",
        dateOfBirth: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (customer) {
            setFormData({
                fullName: customer.fullName || "",
                cccd: customer.cccd || "",
                phoneNumber: customer.phoneNumber || "",
                street: customer.address?.street || "",
                ward: customer.address?.ward || "",
                district: customer.address?.district || "",
                province: customer.address?.province || "",
                dateOfBirth: customer.dateOfBirth || "",
            });
        }
    }, [customer]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Họ và tên không được để trống";
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Số điện thoại không được để trống";
        if (!formData.street.trim()) newErrors.street = "Số nhà / Đường không được để trống";
        if (!formData.ward.trim()) newErrors.ward = "Phường/Xã không được để trống";
        if (!formData.district.trim()) newErrors.district = "Quận/Huyện không được để trống";
        if (!formData.province.trim()) newErrors.province = "Tỉnh/Thành phố không được để trống";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        if (!customer?.id) {
            toast.error("Không tìm thấy ID khách hàng.");
            return;
        }

        setIsSubmitting(true);
        try {
            const editedCustomer = {
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                cccd: formData.cccd || null,
                dateOfBirth: formData.dateOfBirth || null,
                address: {
                    street: formData.street,
                    ward: formData.ward,
                    district: formData.district,
                    province: formData.province,
                },
            };

            await onUpdate(editedCustomer);
            onClose();
        } catch (err) {
            toast.error("Cập nhật thất bại!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed top-0 right-0 h-full w-[500px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <h2 className="text-xl font-semibold mb-6 text-white">Chỉnh sửa khách hàng</h2>

                        <div className="space-y-4">
                            {/* Họ và tên */}
                            <div>
                                <label className="text-gray-300 block mb-1">Họ và tên</label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => handleChange("fullName", e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập họ và tên"
                                />
                                {errors.fullName && <div className="text-red-500 text-sm mt-1">{errors.fullName}</div>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="text-gray-300 block mb-1">Số điện thoại</label>
                                <input
                                    type="text"
                                    value={formData.phoneNumber}
                                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập số điện thoại"
                                />
                                {errors.phoneNumber && <div className="text-red-500 text-sm mt-1">{errors.phoneNumber}</div>}
                            </div>

                            {/* CCCD */}
                            <div>
                                <label className="text-gray-300 block mb-1">CCCD (tùy chọn)</label>
                                <input
                                    type="text"
                                    value={formData.cccd}
                                    onChange={(e) => handleChange("cccd", e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập CCCD"
                                />
                            </div>

                            {/* Ngày sinh */}
                            <div>
                                <label className="text-gray-300 block mb-1">Ngày sinh (tùy chọn)</label>
                                <DatePicker
                                    selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
                                    onChange={(date) =>
                                        handleChange("dateOfBirth", date ? date.toISOString().split("T")[0] : "")
                                    }
                                    dateFormat="dd/MM/yyyy"
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholderText="Chọn ngày sinh"
                                />
                            </div>

                            {/* Địa chỉ */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-300 block mb-1">Số nhà / Đường</label>
                                    <input
                                        type="text"
                                        value={formData.street}
                                        onChange={(e) => handleChange("street", e.target.value)}
                                        className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.street && <div className="text-red-500 text-sm mt-1">{errors.street}</div>}
                                </div>
                                <div>
                                    <label className="text-gray-300 block mb-1">Phường / Xã</label>
                                    <input
                                        type="text"
                                        value={formData.ward}
                                        onChange={(e) => handleChange("ward", e.target.value)}
                                        className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.ward && <div className="text-red-500 text-sm mt-1">{errors.ward}</div>}
                                </div>
                                <div>
                                    <label className="text-gray-300 block mb-1">Quận / Huyện</label>
                                    <input
                                        type="text"
                                        value={formData.district}
                                        onChange={(e) => handleChange("district", e.target.value)}
                                        className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.district && <div className="text-red-500 text-sm mt-1">{errors.district}</div>}
                                </div>
                                <div>
                                    <label className="text-gray-300 block mb-1">Tỉnh / Thành phố</label>
                                    <input
                                        type="text"
                                        value={formData.province}
                                        onChange={(e) => handleChange("province", e.target.value)}
                                        className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.province && <div className="text-red-500 text-sm mt-1">{errors.province}</div>}
                                </div>
                            </div>

                            {/* Nút Lưu */}
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`mt-6 w-full px-4 py-2 rounded text-white transition ${isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                            >
                                {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                            </button>

                            <button
                                onClick={onClose}
                                className="mt-2 w-full px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition"
                            >
                                Đóng
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
