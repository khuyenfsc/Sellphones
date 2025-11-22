import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AttributePickModal from "./AttributePickModal";

export default function EditFilterModal({ isOpen, onClose, onUpdate, filter }) {
    const [name, setName] = useState("");
    const [selectedAttribute, setSelectedAttribute] = useState(null);
    const [openAttributeModal, setOpenAttributeModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen && filter) {
            setName(filter.name || "");
            setSelectedAttribute(filter.attribute || null);
            setError("");
        }
    }, [isOpen, filter]);

    const handleUpdate = async () => {
        if (!name.trim()) {
            setError("Tên filter không được để trống");
            return;
        }

        if (!selectedAttribute) {
            setError("Bạn phải chọn một attribute");
            return;
        }

        setLoading(true);
        setError("");

        await onUpdate({
            name: name.trim(),
            attributeId: selectedAttribute.id,
        });

        setLoading(false);
        onClose();
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Background của modal lớn */}
                        <motion.div
                            className="fixed inset-0 bg-black z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            // Khi modal attribute mở -> khóa click background
                            onClick={() => {
                                if (!openAttributeModal) onClose();
                            }}
                        />

                        {/* Modal lớn */}
                        <motion.div
                            className="fixed top-0 right-0 h-full w-[400px] 
                                       bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <h2 className="text-xl font-semibold mb-6 text-white">
                                Chỉnh sửa Filter
                            </h2>

                            <div className="space-y-5">

                                {/* Tên Filter */}
                                <div>
                                    <label className="text-gray-300 block mb-1">Tên Filter</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            if (error) setError("");
                                        }}
                                        className="w-full px-3 py-2 rounded bg-gray-800 text-white 
                                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập tên filter"
                                    />
                                </div>

                                {/* Attribute đã chọn */}
                                <div>
                                    <label className="text-gray-300 block mb-1">Thuộc tính</label>

                                    {selectedAttribute ? (
                                        <div className="p-3 bg-gray-800 rounded text-white flex justify-between items-center">
                                            <span>{selectedAttribute.name}</span>
                                            <button
                                                onClick={() => setOpenAttributeModal(true)}
                                                className="text-blue-400 hover:text-blue-300 text-sm"
                                            >
                                                Thay đổi
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setOpenAttributeModal(true)}
                                            className="w-full px-4 py-2 bg-blue-600 text-white rounded 
                                                       transition hover:bg-blue-700"
                                        >
                                            Chọn Attribute
                                        </button>
                                    )}
                                </div>

                                {/* Error */}
                                {error && (
                                    <p className="text-red-500 text-sm mt-1">{error}</p>
                                )}

                                {/* Update Button */}
                                <button
                                    onClick={handleUpdate}
                                    disabled={loading}
                                    className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded 
                                               hover:bg-green-700 transition disabled:opacity-50"
                                >
                                    {loading ? "Đang cập nhật..." : "Cập nhật Filter"}
                                </button>

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="mt-2 w-full px-4 py-2 bg-slate-800 text-white rounded 
                                               hover:bg-slate-700 transition"
                                >
                                    Đóng
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <AttributePickModal
                isOpen={openAttributeModal}
                onClose={() => setOpenAttributeModal(false)}
                onPick={(attr) => {
                    setSelectedAttribute(attr);
                    setOpenAttributeModal(false);
                }}
                zIndex={60}
            />
        </>
    );
}
