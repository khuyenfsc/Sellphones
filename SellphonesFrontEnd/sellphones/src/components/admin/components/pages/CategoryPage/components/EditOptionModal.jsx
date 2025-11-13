import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function EditOptionModal({ isOpen, onClose, onUpdate, option }) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Khi mở modal → tải dữ liệu option
    useEffect(() => {
        if (isOpen && option) {
            setName(option.name || "");
            setError("");
        }
    }, [isOpen, option]);

    const handleUpdate = async () => {
        if (!name.trim()) {
            setError("Tên option không được để trống");
            return;
        }

        setLoading(true);
        setError("");

        const updatedOption = {
            name: name.trim(),
        };

        await onUpdate(updatedOption);

        setLoading(false);
        onClose();
    };

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

                    {/* Modal chỉnh sửa Option */}
                    <motion.div
                        className="fixed top-0 right-0 h-full w-[400px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <h2 className="text-xl font-semibold mb-6 text-white">Chỉnh sửa Option</h2>

                        <div className="space-y-5">
                            {/* Tên Option */}
                            <div>
                                <label className="text-gray-300 block mb-1">Tên Option</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (error) setError("");
                                    }}
                                    className={`w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 ${
                                        error
                                            ? "focus:ring-red-500 border border-red-500"
                                            : "focus:ring-blue-500"
                                    }`}
                                    placeholder="Nhập tên option"
                                />
                                {error && (
                                    <p className="text-red-500 text-sm mt-1">{error}</p>
                                )}
                            </div>

                            {/* Nút cập nhật */}
                            <button
                                onClick={handleUpdate}
                                disabled={loading}
                                className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                            >
                                {loading ? "Đang cập nhật..." : "Cập nhật Option"}
                            </button>

                            {/* Nút đóng */}
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
