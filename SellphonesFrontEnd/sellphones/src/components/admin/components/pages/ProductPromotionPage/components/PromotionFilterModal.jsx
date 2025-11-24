import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PromotionFilterModal({ isOpen, onClose, onApply }) {
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [sortType, setSortType] = useState("");

    const promotionTypes = {
        DISCOUNT_AMOUNT: "Giảm tiền",
        DISCOUNT_PERCENT: "Giảm phần trăm",
    };

    const formatDate = (date) =>
        date ? date.toISOString().split("T")[0] : "";

    const handleApply = () => {
        const filters = {};

        if (type) filters.type = type;
        if (startDate) filters.startDate = formatDate(startDate);
        if (endDate) filters.endDate = formatDate(endDate);
        if (sortType) filters.sortType = sortType;

        onClose();
        onApply(filters);
    };

    const removeFilter = (key) => {
        switch (key) {
            case "type": setType(""); break;
            case "startDate": setStartDate(null); break;
            case "endDate": setEndDate(null); break;
            case "sortType": setSortType(""); break;
        }
    };

    const SelectedPill = ({ label, onRemove }) => (
        <span className="inline-flex items-center bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full mt-1 mr-1">
            {label}
            <button onClick={onRemove} className="ml-1 font-bold">✕</button>
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
                            Bộ lọc khuyến mãi
                        </h2>

                        {/* Type */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Loại khuyến mãi</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                            >
                                <option value="">-- Chọn loại --</option>
                                {Object.entries(promotionTypes).map(([key, val]) => (
                                    <option key={key} value={key}>{val}</option>
                                ))}
                            </select>
                            {type && (
                                <SelectedPill
                                    label={`Loại: ${promotionTypes[type]}`}
                                    onRemove={() => removeFilter("type")}
                                />
                            )}
                        </div>

                        {/* Sort by ID */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Sắp xếp theo ID</label>
                            <select
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                            >
                                <option value="">-- Không sắp xếp --</option>
                                <option value="ASC">Tăng dần (ASC)</option>
                                <option value="DESC">Giảm dần (DESC)</option>
                            </select>

                            {sortType && (
                                <SelectedPill
                                    label={`ID: ${sortType}`}
                                    onRemove={() => removeFilter("sortType")}
                                />
                            )}
                        </div>

                        {/* Date Range */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Phạm vi ngày</label>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        locale="vi"
                                        dateFormat="dd/MM/yyyy"
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        className="w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {startDate && (
                                        <SelectedPill
                                            label={`Từ: ${formatDate(startDate)}`}
                                            onRemove={() => removeFilter("startDate")}
                                        />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        locale="vi"
                                        dateFormat="dd/MM/yyyy"
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        className="w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {endDate && (
                                        <SelectedPill
                                            label={`Đến: ${formatDate(endDate)}`}
                                            onRemove={() => removeFilter("endDate")}
                                        />
                                    )}
                                </div>
                            </div>
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
