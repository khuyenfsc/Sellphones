import React, { useState, useContext, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from '../../context/AdminAuthContext';
import AdminService from '../../service/AdminService';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const navigate = useNavigate();
    const { admin, setAdmin, loading: loadingAdmin } = useContext(AdminAuthContext);

    // 👉 Nếu admin đã đăng nhập -> chuyển về dashboard
    useEffect(() => {
        if (!loading && admin) {
            navigate("/admin/dashboard");
        }
    }, [admin, loading, navigate]);

    const handleLogin = async () => {
        setError("");
        setLoading(true);

        const result = await AdminService.login(username, password);
        setLoading(false);

        if (result.success) {
            const res = await AdminService.getCurrentUser();
            console.log(res);
            setAdmin(res.user);

            setShowSuccess(true);
            // setTimeout(() => {
            //     window.location.href = "/admin/dashboard";
            // }, 1500);
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            
            {/* ✅ Popup Login Success */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl text-center animate-popup">
                        <div className="text-green-600 text-5xl mb-3">✔</div>
                        <h3 className="text-xl font-bold text-green-600">Đăng nhập thành công!</h3>
                        <p className="text-gray-600 text-sm mt-1">Đang chuyển hướng đến hệ thống...</p>
                    </div>
                </div>
            )}

            <div className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">ADMIN LOGIN</h1>

                <div className="mb-5">
                    <label className="block mb-2 font-medium text-gray-700">Tài khoản</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập tài khoản Admin"
                        className="w-full px-4 py-3 border rounded-lg focus:border-gray-600 outline-none text-black"
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-2 font-medium text-gray-700">Mật khẩu</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu"
                            className="w-full px-4 py-3 border rounded-lg focus:border-gray-600 outline-none pr-12 text-black"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </button>
                    </div>
                </div>

                {/* Error */}
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition
                        ${loading && "opacity-70 cursor-not-allowed"}`}
                >
                    {loading ? "Đang xử lý..." : "Đăng nhập"}
                </button>
            </div>
        </div>
    );
}
