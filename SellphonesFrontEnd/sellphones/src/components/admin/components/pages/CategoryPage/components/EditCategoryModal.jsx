import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { XCircle } from "lucide-react";

export default function EditCategoryModal({ isOpen, onClose, onUpdate, category }) {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [featuredOnHomepage, setFeaturedOnHomepage] = useState(false); // Trạng thái hiển thị trang chủ

    // Khi mở modal -> tải dữ liệu category
    useEffect(() => {
        if (isOpen && category) {
            setName(category.name || "");
            setCode(category.code || "");
            setPreview(category.icon || null);
            setFile(null);
            setError("");
            setFeaturedOnHomepage(category.featuredOnHomepage || false);
        }
    }, [isOpen, category]);

    // Nếu chọn ảnh mới thì tạo URL preview local
    useEffect(() => {
        if (!file) return;
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const handleRemoveImage = () => {
        setFile(null);
        setPreview(null);
    };

    const handleUpdate = async () => {
        if (!name.trim()) {
            setError("Tên category không được để trống");
            return;
        }
        if (!code.trim()) {
            setError("Mã category không được để trống");
            return;
        }

        setLoading(true);
        setError("");

        const updatedCategory = {
            name: name.trim(),
            code: code.trim(),
            featuredOnHomepage,
        };

        await onUpdate(updatedCategory, file);

        setLoading(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Lớp nền mờ */}
                    <motion.div
                        className="fixed inset-0 bg-black z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal chỉnh sửa */}
                    <motion.div
                        className="fixed top-0 right-0 h-full w-[400px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <h2 className="text-xl font-semibold mb-6 text-white">Chỉnh sửa Category</h2>

                        <div className="space-y-5">
                            {/* Tên category */}
                            <div>
                                <label className="text-gray-300 block mb-1">Tên Category</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (error) setError("");
                                    }}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập tên category"
                                />
                            </div>

                            {/* Mã category */}
                            <div>
                                <label className="text-gray-300 block mb-1">Mã Category</label>
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => {
                                        setCode(e.target.value);
                                        if (error) setError("");
                                    }}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập mã category"
                                />
                            </div>

                            {/* Hiển thị trang chủ */}
                            <div className="flex items-center gap-2">
                                <label className="text-gray-300 text-sm">Hiển thị trên trang chủ</label>
                                <input
                                    type="checkbox"
                                    checked={featuredOnHomepage}
                                    onChange={(e) => setFeaturedOnHomepage(e.target.checked)}
                                    className="w-5 h-5 accent-blue-600 rounded"
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                            {/* Ảnh category */}
                            <div>
                                <label className="text-gray-300 block mb-2">Icon Category</label>
                                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-4 bg-gray-800 hover:border-blue-500 transition">
                                    {preview ? (
                                        <div className="relative flex flex-col items-center">
                                            <img
                                                src={preview}
                                                alt="Xem trước"
                                                className="w-32 h-32 object-cover rounded-md mb-3 border border-gray-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 transition"
                                            >
                                                <XCircle size={16} /> Xóa ảnh
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 text-sm mb-2">Chưa có ảnh</p>
                                    )}

                                    <label
                                        htmlFor="fileUploadCategory"
                                        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition mt-2"
                                    >
                                        {file ? "Đổi ảnh" : "Chọn ảnh mới"}
                                    </label>
                                    <input
                                        id="fileUploadCategory"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files[0] || null)}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {/* Nút cập nhật */}
                            <button
                                onClick={handleUpdate}
                                disabled={loading}
                                className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                            >
                                {loading ? "Đang cập nhật..." : "Cập nhật Category"}
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
