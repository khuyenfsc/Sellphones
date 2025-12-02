import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function InventoryFilterModal({ isOpen, onClose, onApply }) {
    const [minStock, setMinStock] = useState("");
    const [maxStock, setMaxStock] = useState("");
    const [sortType, setSortType] = useState("");

    const handleApply = () => {
        const filters = {};
        if (minStock) filters.minStock = minStock;
        if (maxStock) filters.maxStock = maxStock;
        if (sortType) filters.sortType = sortType;

        onClose();
        onApply(filters);
    };

    const removeFilter = (key) => {
        switch (key) {
            case "minStock":
                setMinStock("");
                break;
            case "maxStock":
                setMaxStock("");
                break;
            case "sortType":
                setSortType("");
                break;
        }
    };

    const SelectedPill = ({ label, onRemove }) => (
        <span className="inline-flex items-center bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full mt-1">
            {label}
            <button
                onClick={onRemove}
                className="ml-1 text-white hover:text-gray-200 font-bold"
            >
                ✕
            </button>
        </span>
    );

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
                            Bộ lọc Inventory
                        </h2>

                        {/* Khoảng stock */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Khoảng số lượng</label>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        value={minStock}
                                        onChange={(e) => setMinStock(e.target.value)}
                                        placeholder="Min"
                                        className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                    />
                                    {minStock && (
                                        <SelectedPill
                                            label={`Min: ${minStock}`}
                                            onRemove={() => removeFilter("minStock")}
                                        />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <input
                                        type="number"
                                        value={maxStock}
                                        onChange={(e) => setMaxStock(e.target.value)}
                                        placeholder="Max"
                                        className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                    />
                                    {maxStock && (
                                        <SelectedPill
                                            label={`Max: ${maxStock}`}
                                            onRemove={() => removeFilter("maxStock")}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sắp xếp theo ID */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Sắp xếp theo ID</label>
                            <select
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                            >
                                <option value="">-- Không sắp xếp --</option>
                                <option value="ASC">ID tăng dần (ASC)</option>
                                <option value="DESC">ID giảm dần (DESC)</option>
                            </select>
                            {sortType && (
                                <SelectedPill
                                    label={`Sort ID: ${sortType}`}
                                    onRemove={() => removeFilter("sortType")}
                                />
                            )}
                        </div>

                        <button
                            onClick={handleApply}
                            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Áp dụng bộ lọc
                        </button>

                        <button
                            onClick={onClose}
                            className="mt-2 w-full px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition"
                        >
                            Đóng
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
