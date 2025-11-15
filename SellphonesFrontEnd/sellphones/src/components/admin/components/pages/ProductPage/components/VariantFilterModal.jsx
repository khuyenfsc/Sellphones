import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function VariantFilterModal({ isOpen, onClose, onApply }) {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [status, setStatus] = useState("");
    const [sortType, setSortType] = useState("");

    const statusOptions = {
        ACTIVE: "ACTIVE",
        INACTIVE: "INACTIVE",
    };

    const sortOptions = {
        ASC: "ID tăng dần",
        DESC: "ID giảm dần",
    };

    const handleApply = () => {
        const filters = {};
        if (minPrice !== "") filters.minPrice = Number(minPrice);
        if (maxPrice !== "") filters.maxPrice = Number(maxPrice);
        if (status !== "") filters.status = status;
        if (sortType !== "") filters.sortType = sortType;

        onClose();
        onApply(filters);
    };

    const removeFilter = (key) => {
        switch (key) {
            case "minPrice": setMinPrice(""); break;
            case "maxPrice": setMaxPrice(""); break;
            case "status": setStatus(""); break;
            case "sortType": setSortType(""); break;
        }
    };

    const SelectedPill = ({ label, onRemove }) => (
        <span className="inline-flex items-center bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full mt-1 mr-1">
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
                    <motion.div
                        className="fixed inset-0 bg-black z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed top-0 right-0 h-full w-[380px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    >
                        <h2 className="text-xl font-semibold mb-6 text-white">
                            Lọc Variant
                        </h2>

                        {/* Giá tối thiểu */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Giá tối thiểu</label>
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
                                placeholder="Nhập giá min"
                            />
                            {minPrice !== "" && (
                                <SelectedPill
                                    label={`Giá từ ${minPrice}`}
                                    onRemove={() => removeFilter("minPrice")}
                                />
                            )}
                        </div>

                        {/* Giá tối đa */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Giá tối đa</label>
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
                                placeholder="Nhập giá max"
                            />
                            {maxPrice !== "" && (
                                <SelectedPill
                                    label={`Giá đến ${maxPrice}`}
                                    onRemove={() => removeFilter("maxPrice")}
                                />
                            )}
                        </div>

                        {/* Trạng thái */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Trạng thái</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                            >
                                <option value="">-- Chọn trạng thái --</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="INACTIVE">INACTIVE</option>
                            </select>

                            {status !== "" && (
                                <SelectedPill
                                    label={`Trạng thái: ${statusOptions[status]}`}
                                    onRemove={() => removeFilter("status")}
                                />
                            )}
                        </div>

                        {/* Sắp xếp ID */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Sắp xếp theo ID</label>
                            <select
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                            >
                                <option value="">-- Chọn sắp xếp --</option>
                                {Object.entries(sortOptions).map(([key, value]) => (
                                    <option key={key} value={key}>{value}</option>
                                ))}
                            </select>

                            {sortType !== "" && (
                                <SelectedPill
                                    label={`Sắp xếp: ${sortOptions[sortType]}`}
                                    onRemove={() => removeFilter("sortType")}
                                />
                            )}
                        </div>

                        {/* Apply */}
                        <button
                            onClick={handleApply}
                            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Áp dụng bộ lọc
                        </button>

                        <button
                            onClick={onClose}
                            className="mt-2 w-full px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
                        >
                            Đóng
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
