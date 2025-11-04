import React, { useState } from "react";
import { Eye, EyeOff, Calendar } from "lucide-react";
import DatePicker, { registerLocale } from "react-datepicker";
import { vi } from "date-fns/locale";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import UserService from "../../../service/UserService";

registerLocale("vi", vi);

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        birthDate: null, // lưu trực tiếp Date object ở đây
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            birthDate: date,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim())
            newErrors.fullName = "Vui lòng nhập họ và tên";

        if (!formData.birthDate) newErrors.birthDate = "Vui lòng chọn ngày sinh";

        if (!formData.email.trim()) {
            newErrors.email = "Vui lòng nhập email";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!formData.password) {
            newErrors.password = "Vui lòng nhập mật khẩu";
        } else if (
            !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/.test(
                formData.password
            )
        ) {
            newErrors.password =
                "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu nhập lại không khớp";
        }

        if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true); // ✅ Bắt đầu xử lý

        const finalData = {
            ...formData,
            dateOfBirth: formData.birthDate
                ? formData.birthDate.toISOString().split("T")[0]
                : null,
        };

        try {
            const res = await UserService.register(finalData);

            if (res.success) {
                toast.success("Đăng ký thành công! Đang chuyển hướng...", {
                    position: "top-right",
                    autoClose: 3000,
                });

                setTimeout(() => {
                    const encodedEmail = encodeURIComponent(res.email);
                    window.location.href = `/active-profile?activeToken=${res.activeToken}&email=${encodedEmail}`;
                }, 1000);
            } else {
                toast.error(res.message || "Đăng ký thất bại, vui lòng thử lại!", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (err) {
            console.error("❌ Lỗi khi đăng ký:", err);
            toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setIsSubmitting(false); // ✅ Luôn bật lại nút sau khi xong
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-600 mb-6">
                        Đăng ký trở thành SMEMBER
                    </h1>

                    <div className="flex justify-center mb-6">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-red-200 rounded-full flex items-center justify-center">
                            <span className="text-6xl">🐶</span>
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm">Hoặc điền thông tin sau</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Nhập họ và tên"
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all ${errors.fullName
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-red-500 focus:border-transparent"
                                        }`}
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.fullName}
                                    </p>
                                )}
                            </div>

                            {/* Birth Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ngày sinh
                                </label>
                                <div className="relative">
                                    <DatePicker
                                        selected={formData.birthDate}
                                        onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        locale="vi"
                                        placeholderText="dd/mm/yyyy"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all pr-10 ${errors.birthDate
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-red-500 focus:border-transparent"
                                            }`}
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                {errors.birthDate && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.birthDate}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Số điện thoại{" "}
                                    <span className="text-gray-400 text-xs">(không bắt buộc)</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Nhập số điện thoại"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Nhập email"
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all ${errors.email
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-red-500 focus:border-transparent"
                                        }`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Gender */}
                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Giới tính
                                </label>

                                <div className="flex items-center gap-6">
                                    {["MALE", "FEMALE"].map((g) => {
                                        const isSelected = formData.gender === g;

                                        return (
                                            <label
                                                key={g}
                                                htmlFor={`gender-${g}`}
                                                className="flex items-center gap-2 cursor-pointer select-none"
                                            >
                                                <input
                                                    id={`gender-${g}`}
                                                    type="radio"
                                                    name="register_gender" // ⚠️ Đổi name khác để tránh conflict toàn trang
                                                    value={g}
                                                    checked={isSelected}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({ ...prev, gender: e.target.value }))
                                                    }
                                                    className="hidden peer"
                                                />
                                                <span
                                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
              peer-checked:bg-red-500 peer-checked:border-red-500 border-gray-400`}
                                                >
                                                    {isSelected && <span className="w-2.5 h-2.5 bg-white rounded-full" />}
                                                </span>
                                                <span>{g === "MALE" ? "Nam" : "Nữ"}</span>
                                            </label>
                                        );
                                    })}
                                </div>

                                {errors.gender && (
                                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Password Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-black">Tạo mật khẩu</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mật khẩu
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Nhập mật khẩu của bạn"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all pr-10 ${errors.password
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-red-500 focus:border-transparent"
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nhập lại mật khẩu
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Nhập lại mật khẩu của bạn"
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all pr-10 ${errors.confirmPassword
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-red-500 focus:border-transparent"
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <a
                            href="/login"
                            className="py-3 px-6 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <span>←</span>
                            <span>Quay lại đăng nhập</span>
                        </a>

                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`py-3 px-6 rounded-lg font-medium transition-colors ${isSubmitting
                                    ? "bg-red-400 cursor-not-allowed text-white"
                                    : "bg-red-600 hover:bg-red-700 text-white"
                                }`}
                        >
                            {isSubmitting ? "Đang xử lý..." : "Hoàn tất đăng ký"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
