import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../../service/UserService';
import CreateNewPasswordPage from './CreateNewPasswordPage';
import { toast } from "react-toastify";

export default function PasswordResetActivePage({ email }) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [countdown, setCountdown] = useState(60);
    const [isResending, setIsResending] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [token, setToken] = useState(null);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    // ✅ Gửi OTP ngay khi load trang
    useEffect(() => {
        const sendInitialOtp = async () => {
            try {
                const res = await UserService.sendForgotPasswordOtp(email);
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

        if (email) {
            sendInitialOtp();
        } else {
            navigate("/forgot-password"); // nếu thiếu email thì quay lại
        }
    }, [email, navigate]);

    // ✅ Đếm ngược 60 giây
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    // ✅ Nhập OTP
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

    // ✅ Xác thực OTP
    const handleVerify = async () => {
        const otpCode = otp.join('');

        if (otpCode.length !== 6) {
            toast.warn("Vui lòng nhập đủ 6 chữ số OTP!", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        setIsVerifying(true);
        try {
            const res = await UserService.verifyForgotPasswordOtp(email, otpCode);

            if (res.success) {
                toast.success("Xác thực OTP thành công!", {
                    position: "top-right",
                    autoClose: 2000,
                });

                const receivedToken = res.data?.token;

                if (!receivedToken) {
                    toast.error("Không nhận được token từ server!", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    setIsVerifying(false);
                    return;
                }

                setTimeout(() => {
                    setToken(receivedToken);
                    setIsVerified(true);
                }, 1500);
            } else {
                toast.error(res.message || "Mã OTP không hợp lệ, vui lòng thử lại!", {
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
        } finally {
            setIsVerifying(false);
        }

        
    };

    // ✅ Gửi lại OTP
    const handleResend = async () => {
        if (countdown > 0 || isResending) return;

        setIsResending(true);
        console.log("🔁 Resending OTP...");

        const res = await UserService.sendForgotPasswordOtp(email);

        if (res.success) {
            console.log("✅ OTP resent:", res.message);
            setCountdown(60);
        } else {
            console.warn("⚠️ Resend failed:", res.message);
        }

        setIsResending(false);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
    };

    const handleBack = () => {
        navigate('/forgot-password');
    };

    if(isVerified){
        return <CreateNewPasswordPage email={email} token={token} />
    }

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

                <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">
                    Xác minh mã OTP
                </h1>

                <p className="text-center text-gray-600 mb-8">
                    Mã OTP đã được gửi đến: <br />
                    <span className="font-semibold text-gray-800">{email}</span>
                </p>

                {/* OTP Input */}
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
                            className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        />
                    ))}
                </div>

                {/* Buttons */}
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
                        disabled={isVerifying || otp.join('').length !== 6}
                        className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {isVerifying ? "Đang xác thực..." : "Xác nhận"}
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
