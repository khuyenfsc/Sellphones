import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";

registerLocale("vi", vi);

export default function StockEntryFilterModal({ isOpen, onClose, onApply }) {
    const [warehouseName, setWarehouseName] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortType, setSortType] = useState("");

    const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleApply = () => {
        const filters = {};

        if (warehouseName) filters.warehouseName = warehouseName;
        if (startDate) filters.startDate = formatDate(startDate);
        if (endDate) filters.endDate = formatDate(endDate);
        if (minPrice) filters.minPrice = minPrice;
        if (maxPrice) filters.maxPrice = maxPrice;
        if (sortType) filters.sortType = sortType;

        onClose();
        onApply(filters);
    };

    const removeFilter = (key) => {
        switch (key) {
            case "warehouseName":
                setWarehouseName("");
                break;
            case "startDate":
                setStartDate(null);
                break;
            case "endDate":
                setEndDate(null);
                break;
            case "minPrice":
                setMinPrice("");
                break;
            case "maxPrice":
                setMaxPrice("");
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
                    <motion.div
                        className="fixed inset-0 bg-black z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed top-0 right-0 h-full w-[520px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <h2 className="text-xl font-semibold mb-6 text-white">
                            Bộ lọc phiếu nhập kho
                        </h2>

                        {/* Tên kho */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Tên kho</label>
                            <input
                                type="text"
                                value={warehouseName}
                                onChange={(e) => setWarehouseName(e.target.value)}
                                placeholder="Nhập tên kho"
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                            />
                            {warehouseName && (
                                <SelectedPill
                                    label={`Kho: ${warehouseName}`}
                                    onRemove={() => removeFilter("warehouseName")}
                                />
                            )}
                        </div>

                        {/* Phạm vi ngày nhập */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Phạm vi ngày nhập</label>
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
                                        className="w-full px-4 py-2.5 rounded bg-gray-800 text-white"
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
                                        className="w-full px-4 py-2.5 rounded bg-gray-800 text-white"
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

                        {/* Phạm vi giá */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Phạm vi giá</label>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        placeholder="Giá tối thiểu"
                                        className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                    />
                                    {minPrice && (
                                        <SelectedPill
                                            label={`Min: ${minPrice}`}
                                            onRemove={() => removeFilter("minPrice")}
                                        />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        placeholder="Giá tối đa"
                                        className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                    />
                                    {maxPrice && (
                                        <SelectedPill
                                            label={`Max: ${maxPrice}`}
                                            onRemove={() => removeFilter("maxPrice")}
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
