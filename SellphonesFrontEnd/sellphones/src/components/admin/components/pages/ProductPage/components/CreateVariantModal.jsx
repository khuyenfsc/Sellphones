import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { XCircle } from "lucide-react";

export default function CreateVariantModal({ isOpen, onClose, onCreate }) {
    const [name, setName] = useState("");
    const [rootPrice, setRootPrice] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Xem trước ảnh
    useEffect(() => {
        if (!image) return setImagePreview(null);
        const url = URL.createObjectURL(image);
        setImagePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [image]);

    const handleCreate = async () => {
        if (!name.trim()) return setError("Tên variant không được để trống");
        if (!rootPrice) return setError("Giá gốc không được để trống");
        if (!image) return setError("Vui lòng chọn ảnh variant");

        setLoading(true);
        setError("");

        const variantData = {
            productVariantName: name.trim(),
            rootPrice: rootPrice
        };

        await onCreate(variantData, image);
        setLoading(false);
        onClose();

        // Reset form
        setName("");
        setRootPrice("");
        setImage(null);
        setImagePreview(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed top-0 right-0 h-full w-[400px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <h2 className="text-xl font-semibold mb-6 text-white">
                            Tạo Variant mới
                        </h2>

                        <div className="space-y-5">
                            {/* Tên variant */}
                            <div>
                                <label className="text-gray-300 block mb-1">Tên variant</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập tên variant"
                                />
                            </div>

                            {/* Giá gốc */}
                            <div>
                                <label className="text-gray-300 block mb-1">Giá gốc</label>
                                <input
                                    type="number"
                                    value={rootPrice}
                                    onChange={(e) => setRootPrice(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập giá gốc"
                                    min={0}
                                />
                            </div>

                            {/* Ảnh variant */}
                            <div>
                                <label className="text-gray-300 block mb-1">Ảnh variant</label>
                                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-4 bg-gray-800 hover:border-blue-500 transition">
                                    {imagePreview && (
                                        <div className="relative flex flex-col items-center">
                                            <img
                                                src={imagePreview}
                                                alt="Variant"
                                                className="w-32 h-32 object-cover rounded-md mb-3 border border-gray-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setImage(null)}
                                                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 transition"
                                            >
                                                <XCircle size={16} /> Xóa ảnh
                                            </button>
                                        </div>
                                    )}
                                    <label
                                        htmlFor="variantImageUpload"
                                        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition mt-2"
                                    >
                                        {image ? "Đổi ảnh" : "Chọn ảnh"}
                                    </label>
                                    <input
                                        id="variantImageUpload"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0] || null)}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {/* Error */}
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            {/* Buttons */}
                            <button
                                onClick={handleCreate}
                                disabled={loading}
                                className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? "Đang tạo..." : "Tạo variant"}
                            </button>

                            <button
                                onClick={onClose}
                                className="w-full px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
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
