import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import UserService from '../../../service/UserService';

export default function CreateNewPasswordPage({ email, token }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (loading) return; // tránh bấm liên tục
        setLoading(true);

        // ✅ Kiểm tra đầu vào
        if (!password || !confirmPassword) {
            toast.error("⚠️ Vui lòng nhập đầy đủ thông tin.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error("❌ Mật khẩu không khớp!");
            setLoading(false);
            return;
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{8,}$/;

        if (!passwordRegex.test(password)) {
            toast.warning(
                "🔒 Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ thường, chữ in hoa, số và ký tự đặc biệt."
            );
            setLoading(false);
            return;
        }

        try {
            // 🔹 Gọi API reset password
            const res = await UserService.resetPassword(token, password);

            if (res.success) {
                toast.success("✅ Đặt lại mật khẩu thành công!");
                navigate("/login"); // 👉 chuyển hướng về trang login
            } else {
                toast.error(res.message || "❌ Không thể đặt lại mật khẩu.");
            }
        } catch (error) {
            console.error("❌ Lỗi khi đặt lại mật khẩu:", error);
            toast.error("⚠️ Có lỗi xảy ra. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };


    const handleBack = () => {
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-xl">
                {/* Logo/Mascot */}
                <div className="flex justify-center mb-6">
                    <div className="w-32 h-32">
                        <div className="text-7xl">🐰</div>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
                    Tạo mật khẩu mới
                </h1>

                {/* Form */}
                <div className="space-y-6 text-black">
                    {/* Password Input */}
                    <div>
                        <label className="block text-gray-900 font-medium mb-2">
                            Mật khẩu
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu của bạn"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5">ⓘ</span>
                            <span>Mật khẩu tối thiểu có 8 kí tự, có ít nhất 1 chữ, 1 số, 1 chữ in hoa, 1 ký tự đặc biệt.</span>
                        </p>
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label className="block text-gray-900 font-medium mb-2">
                            Nhập lại mật khẩu
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Nhập lại mật khẩu của bạn"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Quay lại
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                        >
                            {loading ? "Đang xử lý..." : "Xác nhận"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}