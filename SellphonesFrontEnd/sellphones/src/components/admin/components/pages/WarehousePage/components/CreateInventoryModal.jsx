import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ProductPickModal from "./ProductPickModal";
import VariantPickModal from "./VariantPickModal";

export default function CreateInventoryModal({ isOpen, onClose, onCreate }) {
    const [selectedVariant, setSelectedVariant] = useState(null);

    const [openProductModal, setOpenProductModal] = useState(false);
    const [openVariantModal, setOpenVariantModal] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreate = async () => {
        if (!selectedVariant) {
            setError("Bạn phải chọn một Product Variant");
            return;
        }

        setError("");
        setLoading(true);

        await onCreate({
            productVariantId: selectedVariant.id
        });

        setLoading(false);
        onClose();
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Background */}
                        <motion.div
                            className="fixed inset-0 bg-black z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                if (!openProductModal && !openVariantModal) onClose();
                            }}
                        />

                        {/* Main Modal */}
                        <motion.div
                            className="fixed top-0 right-0 h-full w-[400px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <h2 className="text-xl font-semibold mb-6 text-white">
                                Tạo mới Inventory
                            </h2>

                            <div className="space-y-5">

                                {/* Chọn Variant */}
                                <div>
                                    <label className="text-gray-300 block mb-1">Product Variant</label>

                                    {selectedVariant ? (
                                        <div className="p-3 bg-gray-800 rounded text-white flex justify-between items-center">
                                            <span>{selectedVariant.productVariantName}</span>
                                            <button
                                                onClick={() => setOpenProductModal(true)}
                                                className="text-blue-400 hover:text-blue-300 text-sm"
                                            >
                                                Thay đổi
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setOpenProductModal(true)}
                                            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                        >
                                            Chọn Product Variant
                                        </button>
                                    )}
                                </div>

                                {error && (
                                    <p className="text-red-500 text-sm mt-1">{error}</p>
                                )}

                                <button
                                    onClick={handleCreate}
                                    disabled={loading}
                                    className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                                >
                                    {loading ? "Đang tạo..." : "Tạo Inventory"}
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

            {/* Step 1: Pick Product */}
            <ProductPickModal
                isOpen={openProductModal}
                onClose={() => setOpenProductModal(false)}
                onPick={(product) => {
                    setSelectedProduct(product);
                    setOpenProductModal(false);
                    setOpenVariantModal(true);
                }}
            />

            {/* Step 2: Pick Variant thuộc product */}
            <VariantPickModal
                isOpen={openVariantModal}
                productId={selectedProduct?.id}
                onClose={() => setOpenVariantModal(false)}
                onPick={(variant) => {
                    setSelectedVariant(variant);
                    setOpenVariantModal(false);
                }}
            />
        </>
    );
}
