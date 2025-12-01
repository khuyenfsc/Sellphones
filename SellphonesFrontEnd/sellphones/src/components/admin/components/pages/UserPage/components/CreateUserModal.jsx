import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AdminRoleService from "../../../../service/AdminRoleService";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
registerLocale("vi", vi);

export default function CreateUserModal({ isOpen, onClose, onCreate }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [roleId, setRoleId] = useState("");
    const [status, setStatus] = useState("");
    const [password, setPassword] = useState("");

    const [roles, setRoles] = useState([]);

    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        password: "",
        roleId: "",
        status: "",
    });

    const [loading, setLoading] = useState(false);

    // Load roles
    useEffect(() => {
        async function loadRoles() {
            try {
                const res = await AdminRoleService.getAllRoles();
                setRoles(res?.data || []);
            } catch (error) {
                console.error("Lỗi load roles:", error);
            }
        }

        if (isOpen) loadRoles();
    }, [isOpen]);

    // Reset fields when open
    useEffect(() => {
        if (isOpen) {
            setFullName("");
            setEmail("");
            setPhoneNumber("");
            setGender("");
            setDateOfBirth(null);
            setRoleId("");
            setStatus("");
            setPassword("");

            setErrors({});
        }
    }, [isOpen]);

    const handleCreate = async () => {
        let newErrors = {};

        if (!fullName.trim()) newErrors.fullName = "Họ tên không được để trống";
        if (!email.trim()) newErrors.email = "Email không được để trống";
        if (!password.trim()) newErrors.password = "Mật khẩu không được để trống";
        if (!roleId) newErrors.roleId = "Vui lòng chọn vai trò";
        if (!status) newErrors.status = "Vui lòng chọn trạng thái";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        setLoading(true);

        await onCreate({
            fullName,
            email,
            phoneNumber,
            gender,
            dateOfBirth: dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : null,
            roleId: Number(roleId),
            status,
            password
        });

        setLoading(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed top-0 right-0 h-full w-[450px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <h2 className="text-xl font-semibold mb-6 text-white">
                            Tạo tài khoản người dùng
                        </h2>

                        <div className="space-y-4">

                            {/* Full Name */}
                            <div>
                                <label className="text-gray-300 block mb-1">Họ và tên</label>
                                <input
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-gray-300 block mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-gray-300 block mb-1">Mật khẩu</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="text-gray-300 block mb-1">Số điện thoại</label>
                                <input
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="text-gray-300 block mb-1">Giới tính</label>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                >
                                    <option value="">-- Chọn giới tính --</option>
                                    <option value="MALE">Nam</option>
                                    <option value="FEMALE">Nữ</option>
                                    <option value="OTHER">Khác</option>
                                </select>
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="text-gray-300 block mb-1">Ngày sinh</label>
                                <DatePicker
                                    selected={dateOfBirth}
                                    onChange={(date) => setDateOfBirth(date)}
                                    locale="vi"
                                    dateFormat="dd/MM/yyyy"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    placeholderText="Chọn ngày sinh"
                                    className="w-full px-4 py-2.5 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="text-gray-300 block mb-1">Vai trò</label>
                                <select
                                    value={roleId}
                                    onChange={(e) => setRoleId(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                >
                                    <option value="">-- Chọn vai trò --</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.roleId && <p className="text-red-500 text-sm">{errors.roleId}</p>}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="text-gray-300 block mb-1">Trạng thái</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                >
                                    <option value="">-- Chọn trạng thái --</option>
                                    <option value="ACTIVE">Hoạt động</option>
                                    <option value="INACTIVE">Không hoạt động</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                            </div>

                            {/* Save */}
                            <button
                                onClick={handleCreate}
                                disabled={loading}
                                className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                            >
                                {loading ? "Đang tạo..." : "Tạo người dùng"}
                            </button>

                            {/* Close */}
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
