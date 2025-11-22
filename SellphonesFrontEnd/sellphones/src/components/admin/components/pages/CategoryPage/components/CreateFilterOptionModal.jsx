import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CreateFilterOptionModal({ isOpen, onClose, onCreate }) {
    const [name, setName] = useState("");
    const [keyType, setKeyType] = useState("Bằng");
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    const [loading, setLoading] = useState(false);

    const condMap = {
        "Bằng": "bang",
        "Bé hơn bằng": "be",
        "Lớn hơn bằng": "lon",
        "Trong khoảng": "khoang",
        "Chứa": "chua"
    };

    const handleCreate = async () => {
        if (!name.trim()) {
            Swal.fire("Lỗi", "Tên option không được để trống", "error");
            return;
        }

        if (!val1.trim()) {
            Swal.fire("Lỗi", "Giá trị đầu tiên không được để trống", "error");
            return;
        }

        if (keyType === "Trong khoảng" && !val2.trim()) {
            Swal.fire("Lỗi", "Giá trị thứ hai không được để trống khi chọn 'Trong khoảng'", "error");
            return;
        }

        setLoading(true);

        await onCreate({
            name: name.trim(),
            cond: condMap[keyType],
            val1: val1.trim(),
            val2: keyType === "Trong khoảng" ? val2.trim() : null
        });

        setLoading(false);
        onClose();

        setName("");
        setKeyType("Bằng");
        setVal1("");
        setVal2("");
    };

    const requiresTwoValues = keyType === "Trong khoảng";

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

                    {/* Modal */}
                    <motion.div
                        className="fixed top-0 right-0 h-full w-[420px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <h2 className="text-xl font-semibold text-white mb-6">Tạo Filter Option mới</h2>

                        <div className="space-y-4">

                            {/* Tên option */}
                            <div>
                                <label className="text-gray-300 block mb-1">Tên hiển thị</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                    placeholder="VD: 6 GB"
                                />
                            </div>

                            {/* Dropdown key */}
                            <div>
                                <label className="text-gray-300 block mb-1">Kiểu lọc</label>
                                <select
                                    value={keyType}
                                    onChange={(e) => setKeyType(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                >
                                    <option value="Bằng">Bằng</option>
                                    <option value="Lớn hơn bằng">Lớn hơn bằng</option>
                                    <option value="Bé hơn bằng">Bé hơn bằng</option>
                                    <option value="Trong khoảng">Trong khoảng</option>
                                    <option value="Chứa">Chứa</option>
                                </select>
                            </div>

                            {/* Giá trị 1 */}
                            <div>
                                <label className="text-gray-300 block mb-1">Giá trị 1</label>
                                <input
                                    type="text"
                                    value={val1}
                                    onChange={(e) => setVal1(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                    placeholder="Nhập giá trị..."
                                />
                            </div>

                            {/* Giá trị 2 — chỉ hiện nếu keyType = Trong khoảng */}
                            {requiresTwoValues && (
                                <div>
                                    <label className="text-gray-300 block mb-1">Giá trị 2</label>
                                    <input
                                        type="text"
                                        value={val2}
                                        onChange={(e) => setVal2(e.target.value)}
                                        className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                        placeholder="Nhập giá trị thứ hai..."
                                    />
                                </div>
                            )}

                            {/* Nút tạo */}
                            <button
                                onClick={handleCreate}
                                disabled={loading}
                                className="w-full px-4 py-2 mt-6 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? "Đang tạo..." : "Tạo mới"}
                            </button>

                            {/* Nút đóng */}
                            <button
                                onClick={onClose}
                                className="w-full px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 mt-2"
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
