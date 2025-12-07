import { motion, AnimatePresence } from "framer-motion";
import { XCircle } from "lucide-react";

export default function WarrantyPickModal({ isOpen, onClose, onPick, warranties = [] }) {

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/40 z-[60]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed top-0 right-0 h-full w-[400px] bg-gray-900 z-[70] shadow-xl p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <h2 className="text-xl font-semibold mb-4 text-white">
                            Chọn gói Bảo hành
                        </h2>

                        {warranties.length === 0 && (
                            <p className="text-gray-400">Variant này không có bảo hành</p>
                        )}

                        <div className="space-y-2">
                            {warranties.map(w => (
                                <div
                                    key={w.id}
                                    className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded cursor-pointer"
                                    onClick={() => onPick(w)}
                                >
                                    <p className="font-semibold">{w.name}</p>
                                    <p className="text-sm text-gray-400">
                                        {w.months} tháng — {w.price?.toLocaleString()} đ
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-4 w-full bg-slate-800 text-white py-2 rounded"
                        >
                            Đóng
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
