import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import UserService from '../../../service/UserService';
import { toast } from "react-toastify";

export default function ActiveProfilePage() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [countdown, setCountdown] = useState(60);
    const [isResending, setIsResending] = useState(false);
    const inputRefs = useRef([]);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const activeToken = searchParams.get('activeToken');
    const email = searchParams.get('email') ? decodeURIComponent(searchParams.get('email')) : null;

    // ✅ Nếu thiếu activeToken hoặc email → quay lại login
    useEffect(() => {
        if (!activeToken || !email) {
            navigate('/login');
            return;
        }

        // ✅ Gửi OTP ngay khi load trang
        const sendInitialOtp = async () => {
            try {
                const res = await UserService.sendRegisterOtp(activeToken, email);
                if (res.success) {
                    console.log('✅ OTP sent:', res.message);
                    setCountdown(60);
                } else {
                    console.warn('⚠️ OTP send failed:', res.message);
                }
            } catch (err) {
                console.error('❌ Error sending OTP:', err);
            }
        };

        sendInitialOtp();
    }, [activeToken, email, navigate]);

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    // ✅ Xử lý nhập OTP
    const handleInputChange = (index, value) => {
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (/^\d+$/.test(pastedData)) {
            const newOtp = pastedData.split('');
            setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
            inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
        }
    };

    const handleVerify = async () => {
        const otpCode = otp.join('');

        if (otpCode.length !== 6) {
            toast.warn("Vui lòng nhập đủ 6 chữ số OTP!", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            // ✅ Gọi API xác thực OTP
            const res = await UserService.verifyRegisterOtp(activeToken, email, otpCode);

            if (res.success) {
                toast.success("Xác thực OTP thành công!", {
                    position: "top-right",
                    autoClose: 2000,
                });

                // ✅ Chuyển hướng về trang đăng nhập sau 2s
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                toast.error("Mã OTP không hợp lệ, vui lòng thử lại!", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error("❌ Lỗi khi xác thực OTP:", error);
            toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    // ✅ Gửi lại mã OTP
    const handleResend = async () => {
        if (countdown > 0 || isResending) return; // tránh spam

        setIsResending(true);
        console.log("🔁 Resending OTP...");

        const res = await UserService.sendRegisterOtp(activeToken, email);

        if (res.success) {
            console.log("✅ OTP resent:", res.message);
            setCountdown(60); // reset lại 60s sau khi gửi
        } else {
            console.warn("⚠️ Resend failed:", res.message);
        }

        setIsResending(false);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
    };

    const handleBack = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Mascot */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                            <span className="text-6xl">🐶</span>
                        </div>
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                            <div className="flex gap-4">
                                <div className="w-1 h-8 bg-red-500 rounded-full transform -rotate-12"></div>
                                <div className="w-1 h-8 bg-red-500 rounded-full transform rotate-12"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-red-600 text-center mb-4">
                    Kích hoạt tài khoản
                </h1>

                {/* Instructions */}
                <p className="text-center text-gray-600 mb-8">
                    Vui lòng nhập mã OTP đã được gửi đến <br />
                    <span className="font-semibold text-gray-800">{email}</span>
                </p>

                {/* OTP Input Boxes (6 ô) */}
                <div className="flex justify-center gap-3 mb-8 text-black">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                        />
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-8">
                    <button
                        onClick={handleBack}
                        className="flex-1 py-3 px-6 bg-white border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <span className="text-lg">←</span>
                        <span>Quay lại</span>
                    </button>
                    <button
                        onClick={handleVerify}
                        disabled={otp.join('').length !== 6}
                        className="flex-1 py-3 px-6 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Xác nhận
                    </button>
                </div>

                {/* Resend OTP */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <p className="text-center font-semibold text-gray-800 mb-2">
                        Bạn chưa nhận được mã?
                    </p>
                    <p className="text-center text-sm text-gray-500 mb-4">
                        (Mã OTP có thời hạn 5 phút)
                    </p>

                    <button
                        onClick={handleResend}
                        disabled={countdown > 0 || isResending}
                        className="w-full py-2.5 px-4 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                        {isResending
                            ? "Đang gửi..."
                            : countdown > 0
                                ? `Nhận mã sau ${countdown}s`
                                : "Gửi lại mã"}
                    </button>
                </div>
            </div>
        </div>
    );
}
