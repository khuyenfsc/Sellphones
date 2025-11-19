// EditWarrantyModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function EditWarrantyModal({ isOpen, onClose, onUpdate, onDelete, warranty }) {
    const [name, setName] = useState("");
    const [months, setMonths] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen && warranty) {
            setName(warranty.name || "");
            setMonths(warranty.months ?? "");
            setPrice(warranty.price ?? "");
            setDescription(warranty.description || "");
            setError("");
        }
    }, [isOpen, warranty]);

    const handleUpdate = async () => {
        if (!name.trim()) {
            setError("Tên bảo hành không được để trống");
            return;
        }
        if (!months || months <= 0) {
            setError("Số tháng phải lớn hơn 0");
            return;
        }
        if (!price || price <= 0) {
            setError("Giá phải lớn hơn 0");
            return;
        }

        setLoading(true);
        setError("");
        await onUpdate(warranty.id, {
            name: name.trim(),
            months: Number(months),
            price: Number(price),
            description: description.trim(),
        });
        setLoading(false);
        onClose();
    };

    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: "Xác nhận xóa",
            text: "Bạn có chắc muốn xóa bảo hành này không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (confirm.isConfirmed && onDelete) {
            await onDelete(warranty.id);
            onClose();
        }
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
                        className="fixed top-0 right-0 h-full w-[400px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <h2 className="text-xl font-semibold mb-6 text-white">
                            Chỉnh sửa bảo hành
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-gray-300 block mb-1">Tên bảo hành</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (error) setError("");
                                    }}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập tên bảo hành"
                                />
                            </div>

                            <div>
                                <label className="text-gray-300 block mb-1">Số tháng</label>
                                <input
                                    type="number"
                                    value={months}
                                    onChange={(e) => setMonths(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập số tháng"
                                />
                            </div>

                            <div>
                                <label className="text-gray-300 block mb-1">Giá</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập giá"
                                />
                            </div>

                            <div>
                                <label className="text-gray-300 block mb-1">Mô tả</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập mô tả bảo hành"
                                    rows={3}
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button
                                onClick={handleUpdate}
                                disabled={loading}
                                className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                            >
                                {loading ? "Đang cập nhật..." : "Cập nhật bảo hành"}
                            </button>

                            <button
                                onClick={handleDelete}
                                className="mt-2 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                            >
                                Xóa bảo hành
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
