import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditAttributeModal({ isOpen, onClose, attribute, onUpdate }) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    // Khi modal mở, set giá trị ban đầu từ attribute
    useEffect(() => {
        if (attribute) {
            setName(attribute.name || "");
        }
    }, [attribute]);

    const handleEdit = async () => {

        setLoading(true);
        await onUpdate(name.trim());

        onClose();
        setLoading(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Lớp nền đen mờ */}
                    <motion.div
                        className="fixed inset-0 bg-black z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal trượt từ phải sang */}
                    <motion.div
                        className="fixed top-0 right-0 h-full w-[400px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <h2 className="text-xl font-semibold mb-6 text-white">Chỉnh sửa thuộc tính</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-gray-300 block mb-1">Tên thuộc tính</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập tên thuộc tính"
                                />
                            </div>

                            <button
                                onClick={handleEdit}
                                disabled={loading}
                                className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {loading ? "Đang cập nhật..." : "Cập nhật thuộc tính"}
                            </button>

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
