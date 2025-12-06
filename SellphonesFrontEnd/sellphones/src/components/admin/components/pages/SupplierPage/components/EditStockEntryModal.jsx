import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function EditStockEntryModal({ isOpen, onClose, onUpdate, onDelete, entry }) {
    const [quantity, setQuantity] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Load dữ liệu khi mở modal
    useEffect(() => {
        if (entry) {
            setQuantity(entry.quantity);
            setPurchasePrice(entry.purchasePrice);
        }
    }, [entry]);

    const handleUpdate = async () => {
        if (!quantity || Number(quantity) <= 0) {
            setError("Số lượng phải lớn hơn 0");
            return;
        }
        if (!purchasePrice || Number(purchasePrice) <= 0) {
            setError("Giá phải lớn hơn 0");
            return;
        }

        setError("");
        setLoading(true);

        await onUpdate({
            id: entry.id,
            quantity: Number(quantity),
            purchasePrice: Number(purchasePrice),
        });

        setLoading(false);
        onClose();
    };

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

                setLoading(true);
                await onDelete(entry.id);
                setLoading(false);

                onClose();
            }
        });

    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Background */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 z-40"
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
                        <h2 className="text-xl font-semibold mb-6 text-white">
                            Chỉnh sửa Stock Entry
                        </h2>

                        {entry && (
                            <div className="space-y-5">
                                {/* Inventory info */}
                                <div>
                                    <label className="text-gray-300 block mb-1">
                                        Inventory (không thể thay đổi)
                                    </label>

                                    <div
                                        className="p-3 bg-gray-800 rounded text-white cursor-pointer hover:bg-gray-700 transition"
                                        onClick={() =>
                                            navigate(
                                                `/admin/warehouses/view/${entry?.inventory?.warehouse?.id}`
                                            )
                                        }
                                    >
                                        <div className="font-medium">
                                            {entry?.inventory?.productVariant?.productVariantName}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            Kho: {entry?.inventory?.warehouse?.name}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            SL hiện tại: {entry?.inventory?.quantity}
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div>
                                    <label className="text-gray-300 block mb-1">
                                        Số lượng nhập
                                    </label>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => {
                                            setQuantity(e.target.value);
                                            if (error) setError("");
                                        }}
                                        placeholder="Nhập số lượng"
                                        className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Purchase Price */}
                                <div>
                                    <label className="text-gray-300 block mb-1">
                                        Giá nhập (VNĐ)
                                    </label>
                                    <input
                                        type="number"
                                        value={purchasePrice}
                                        onChange={(e) => {
                                            setPurchasePrice(e.target.value);
                                            if (error) setError("");
                                        }}
                                        placeholder="Nhập giá"
                                        className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {error && <p className="text-red-500 text-sm">{error}</p>}

                                {/* UPDATE BUTTON — GREEN */}
                                <button
                                    onClick={handleUpdate}
                                    disabled={loading}
                                    className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                                >
                                    {loading ? "Đang lưu..." : "Cập nhật"}
                                </button>

                                {/* DELETE BUTTON — RED */}
                                <button
                                    onClick={handleDelete}
                                    disabled={loading}
                                    className="mt-2 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
                                >
                                    Xóa
                                </button>

                                {/* CLOSE BUTTON */}
                                <button
                                    onClick={onClose}
                                    className="mt-2 w-full px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition"
                                >
                                    Đóng
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default EditStockEntryModal;
