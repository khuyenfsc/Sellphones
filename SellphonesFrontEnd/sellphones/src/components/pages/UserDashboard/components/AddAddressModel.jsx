import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddAddressModal({
    isAdding,
    handleCloseForm,
    formData,
    handleChange,
    handleSave,
    setFormData,
    errors,
}) {
    return (
        <AnimatePresence>
            {isAdding && (
                <>
                    {/* Overlay làm mờ nền */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseForm}
                    />

                    {/* Form trượt từ phải vào */}
                    <motion.div
                        className="fixed top-0 right-0 w-full sm:w-[420px] h-full bg-white shadow-2xl z-50 p-6 overflow-y-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Thêm địa chỉ mới</h2>
                            <button
                                onClick={handleCloseForm}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form nội dung */}
                        <form className="space-y-4" onSubmit={handleSave}>
                            <div>
                                <label className="block text-gray-700 mb-1">Họ và tên</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Số nhà</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-1">Phường/Xã</label>
                                    <input
                                        type="text"
                                        name="ward"
                                        value={formData.ward}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                    {errors.ward && (
                                        <p className="text-red-500 text-sm mt-1">{errors.ward}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1">Quận/Huyện</label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                    {errors.district && (
                                        <p className="text-red-500 text-sm mt-1">{errors.district}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Tỉnh/Thành phố</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                {errors.city && (
                                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Ngày sinh <span className="text-gray-400 text-sm">(tùy chọn)</span>
                                </label>
                                <DatePicker
                                    selected={formData.dateOfBirth}
                                    onChange={(date) =>
                                        setFormData((prev) => ({ ...prev, dateOfBirth: date }))
                                    }
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Chọn ngày sinh"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                {errors.dateOfBirth && (
                                    <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                                )}
                            </div>

                            {/* Nút hành động */}
                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                >
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
