import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function CustomerFilterModal({ isOpen, onClose, onApply }) {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [cccd, setCccd] = useState("");
    const [sortType, setSortType] = useState("");

    const sortOptions = {
        ASC: "Tăng dần",
        DESC: "Giảm dần",
    };

    const handleApply = () => {
        const filters = {};

        if (email) filters.email = email;
        if (phoneNumber) filters.phoneNumber = phoneNumber;
        if (cccd) filters.cccd = cccd;
        if (sortType) filters.sortType = sortType;

        onClose();
        onApply(filters);
    };

    const removeFilter = (key) => {
        switch (key) {
            case "email":
                setEmail("");
                break;
            case "phoneNumber":
                setPhoneNumber("");
                break;
            case "cccd":
                setCccd("");
                break;
            case "sortType":
                setSortType("");
                break;
        }
    };

    // Component hiển thị pill nhỏ bên dưới input
    const SelectedPill = ({ label, onRemove }) => (
        <span className="inline-flex items-center bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full mt-1">
            {label}
            <button
                onClick={onRemove}
                className="ml-1 text-white hover:text-gray-200 font-bold"
            >
                ✕
            </button>
        </span>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Nền mờ */}
                    <motion.div
                        className="fixed inset-0 bg-black z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal chính */}
                    <motion.div
                        className="fixed top-0 right-0 h-full w-[520px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <h2 className="text-xl font-semibold mb-6 text-white">Bộ lọc khách hàng</h2>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Nhập email"
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {email && (
                                <SelectedPill
                                    label={`Email: ${email}`}
                                    onRemove={() => removeFilter("email")}
                                />
                            )}
                        </div>

                        {/* Số điện thoại */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Số điện thoại</label>
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Nhập số điện thoại"
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {phoneNumber && (
                                <SelectedPill
                                    label={`SĐT: ${phoneNumber}`}
                                    onRemove={() => removeFilter("phoneNumber")}
                                />
                            )}
                        </div>

                        {/* CCCD */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">CCCD</label>
                            <input
                                type="text"
                                value={cccd}
                                onChange={(e) => setCccd(e.target.value)}
                                placeholder="Nhập CCCD"
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {cccd && (
                                <SelectedPill
                                    label={`CCCD: ${cccd}`}
                                    onRemove={() => removeFilter("cccd")}
                                />
                            )}
                        </div>

                        {/* Sắp xếp */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Kiểu sắp xếp</label>
                            <select
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Chọn kiểu sắp xếp --</option>
                                {Object.entries(sortOptions).map(([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {sortType && (
                                <SelectedPill
                                    label={`Sắp xếp: ${sortOptions[sortType]}`}
                                    onRemove={() => removeFilter("sortType")}
                                />
                            )}
                        </div>

                        {/* Nút hành động */}
                        <button
                            onClick={handleApply}
                            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Áp dụng bộ lọc
                        </button>
                        <button
                            onClick={onClose}
                            className="mt-2 w-full px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition"
                        >
                            Đóng
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
