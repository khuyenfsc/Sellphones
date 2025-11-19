import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function WarrantiesFilterModal({ isOpen, onClose, onApply }) {
    const [months, setMonths] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortType, setSortType] = useState("");

    const sortOptions = {
        ASC: "Giá tăng dần",
        DESC: "Giá giảm dần",
    };

    const handleApply = () => {
        const filters = {};

        if (months !== "") filters.months = Number(months);
        if (minPrice !== "") filters.minPrice = Number(minPrice);
        if (maxPrice !== "") filters.maxPrice = Number(maxPrice);
        if (sortType) filters.sortType = sortType;

        onClose();
        onApply(filters);
    };

    const removeFilter = (key) => {
        switch (key) {
            case "months": setMonths(""); break;
            case "minPrice": setMinPrice(""); break;
            case "maxPrice": setMaxPrice(""); break;
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
                        className="fixed top-0 right-0 h-full w-[420px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <h2 className="text-xl font-semibold mb-6 text-white">
                            Bộ lọc bảo hành
                        </h2>

                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Số tháng</label>
                            <input
                                type="number"
                                value={months}
                                onChange={(e) => setMonths(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                placeholder="Nhập số tháng"
                            />
                            {months !== "" && (
                                <SelectedPill
                                    label={`${months} tháng`}
                                    onRemove={() => removeFilter("months")}
                                />
                            )}
                        </div>

                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Giá tối thiểu</label>
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                placeholder="Nhập giá min"
                            />
                            {minPrice !== "" && (
                                <SelectedPill
                                    label={`Giá từ ${minPrice}`}
                                    onRemove={() => removeFilter("minPrice")}
                                />
                            )}
                        </div>

                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Giá tối đa</label>
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                placeholder="Nhập giá max"
                            />
                            {maxPrice !== "" && (
                                <SelectedPill
                                    label={`Giá đến ${maxPrice}`}
                                    onRemove={() => removeFilter("maxPrice")}
                                />
                            )}
                        </div>

                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Sắp xếp theo giá</label>
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

                            {sortType && (
                                <SelectedPill
                                    label={`Sắp xếp: ${sortOptions[sortType]}`}
                                    onRemove={() => removeFilter("sortType")}
                                />
                            )}
                        </div>

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
