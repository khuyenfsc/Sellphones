import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserService from "../../../service/UserService";
import PasswordResettActivePage from "./PasswordResetActivePage";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSendOtp = async () => {
    setError("");

    if (!email.trim()) {
      setError("Vui lòng nhập địa chỉ email.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Địa chỉ email không hợp lệ.");
      return;
    }

    setLoading(true);
    try {
      const res = await UserService.sendForgotPasswordOtp(email);

      if (res.success) {
        setOtpSent(true); // ✅ Chuyển sang component khác
      } else {
        setError(res.message || "Không thể gửi mã OTP. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("❌ Lỗi gửi OTP:", err);
      setError(err?.response?.data?.errors?.message  || err.message || "Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
    
  };

  if (otpSent) {
    return <PasswordResettActivePage email={email} />;
  }


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
            <div className="text-6xl">🐰</div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">
          Tạo mật khẩu mới
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-center mb-8">
          Hãy nhập email của bạn vào bên dưới để bắt đầu quá trình khôi phục mật khẩu.
        </p>

        {/* Input field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Nhập địa chỉ email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none text-black focus:ring-2 ${error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-red-500 focus:border-transparent"
              }`}
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={20} />
            Quay lại đăng nhập
          </button>

          <button
            type="button"
            onClick={handleSendOtp}
            disabled={loading}
            className={`flex-1 px-6 py-3 rounded-lg font-medium text-white transition-colors ${loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Đang gửi..." : "Tiếp tục"}
          </button>
        </div>
      </div>
    </div>
  );
}
