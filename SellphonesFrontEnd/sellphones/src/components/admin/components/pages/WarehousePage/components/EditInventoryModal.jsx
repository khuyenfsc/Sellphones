import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function EditInventoryModal({ isOpen, onClose, onDelete, inventory }) {
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (isOpen) setIsDeleting(false);
    }, [isOpen]);

    const handleDelete = async () => {
        Swal.fire({
            title: "Bạn chắc chắn muốn xóa?",
            text: "Hành động này không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsDeleting(true);
                try {
                    if (onDelete) await onDelete(inventory.id);
                    onClose();
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsDeleting(false);
                }
            }
        });
    };

    if (!inventory) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Background */}
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
                            Xóa Inventory
                        </h2>

                        <div className="space-y-5">

                            {/* Product */}
                            <div>
                                <label className="text-gray-300 block mb-1">
                                    Sản phẩm
                                </label>
                                <div className="p-3 bg-gray-800 rounded text-white">
                                    {inventory?.productVariant?.productVariantName}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div>
                                <label className="text-gray-300 block mb-1">
                                    Số lượng hiện tại
                                </label>
                                <div className="p-3 bg-gray-800 rounded text-white">
                                    {inventory?.quantity}
                                </div>
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className={`mt-6 w-full px-4 py-2 rounded text-white transition 
                                    ${isDeleting
                                        ? "bg-gray-600 cursor-not-allowed"
                                        : "bg-red-600 hover:bg-red-700"
                                    }`}
                            >
                                {isDeleting ? "Đang xóa..." : "Xóa"}
                            </button>

                            {/* Close Button */}
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
