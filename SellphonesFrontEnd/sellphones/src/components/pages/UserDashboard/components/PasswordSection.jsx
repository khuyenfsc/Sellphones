import { useState } from "react";
import { Edit2 } from "lucide-react";
import ChangePasswordModal from "./ChangePasswordModal";
import UserService from "../../../../service/UserService";

const PasswordSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "", // "success" | "error"
    });
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const newErrors = {};
        const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-={}[\]:;"'<>,.?/`~\\]).{8,}$/;

        if (!formData.oldPassword) {
            newErrors.oldPassword = "Vui lòng nhập mật khẩu cũ";
        }

        if (!formData.newPassword) {
            newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
        } else if (!strongPasswordRegex.test(formData.newPassword)) {
            newErrors.newPassword = "Mật khẩu phải dài ít nhất 8 ký tự, chứa ít nhất 1 chữ hoa và 1 ký tự đặc biệt";
        }

        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return; // nếu có lỗi thì dừng lại

        try {
            const res = await UserService.changePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            });

            if (res.success) {
                setToast({
                    show: true,
                    type: "success",
                    message: "Đổi mật khẩu thành công!",
                });
                setIsModalOpen(false);
                // Reset form
                setFormData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
                setErrors({});
            } else {
                setToast({
                    show: true,
                    type: "error",
                    message: "Đổi mật khẩu thất bại! Vui lòng thử lại.",
                });
            }
        } catch (err) {
            console.error("❌ Lỗi khi đổi mật khẩu:", err);
            setToast({
                show: true,
                type: "error",
                message: "Đã xảy ra lỗi khi đổi mật khẩu!",
            });
        }

        setIsModalOpen(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Mật khẩu</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                >
                    <Edit2 className="w-4 h-4" />
                    Thay đổi mật khẩu
                </button>
            </div>

            {/* Modal đổi mật khẩu */}
            <ChangePasswordModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />


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
        </div>
    );
};

export default PasswordSection;
