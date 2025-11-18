import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ProductFilterModal({ isOpen, onClose, onApply }) {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minStar, setMinStar] = useState("");
    const [maxStar, setMaxStar] = useState("");
    const [isNew, setIsNew] = useState("");
    const [isFeatured, setIsFeatured] = useState("");
    const [sortType, setSortType] = useState("");
    const [status, setStatus] = useState(""); // ⭐ thêm trạng thái sản phẩm

    const sortOptions = {
        ASC: "ID tăng dần",
        DESC: "ID giảm dần",
    };

    const yesNoOptions = {
        true: "Có",
        false: "Không",
    };

    const statusOptions = {
        ACTIVE: "ACTIVE",
        INACTIVE: "INACTIVE",
    };

    const clampStar = (val) => {
        if (!val) return "";
        let num = Number(val);
        if (num < 1) num = 1;
        if (num > 5) num = 5;
        return num;
    };

    const handleApply = () => {
        const filters = {};

        if (minPrice !== "") filters.minPrice = Number(minPrice);
        if (maxPrice !== "") filters.maxPrice = Number(maxPrice);

        if (minStar !== "") filters.minStar = Number(minStar);
        if (maxStar !== "") filters.maxStar = Number(maxStar);

        if (isNew !== "") filters.isNew = isNew;
        if (isFeatured !== "") filters.isFeatured = isFeatured;

        if (status !== "") filters.status = status; // ⭐ gửi trạng thái

        if (sortType) filters.sortType = sortType;

        onClose();
        onApply(filters);
    };

    const removeFilter = (key) => {
        switch (key) {
            case "minPrice": setMinPrice(""); break;
            case "maxPrice": setMaxPrice(""); break;
            case "minStar": setMinStar(""); break;
            case "maxStar": setMaxStar(""); break;
            case "isNew": setIsNew(""); break;
            case "isFeatured": setIsFeatured(""); break;
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
                        className="fixed top-0 right-0 h-full w-[420px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <h2 className="text-xl font-semibold mb-6 text-white">
                            Bộ lọc sản phẩm
                        </h2>

                        {/* Giá */}
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

                        {/* Sao */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Số sao tối thiểu</label>
                            <input
                                type="number"
                                value={minStar}
                                min="1"
                                max="5"
                                onChange={(e) => setMinStar(clampStar(e.target.value))}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                placeholder="1 - 5"
                            />
                            {minStar !== "" && (
                                <SelectedPill
                                    label={`Sao từ ${minStar}`}
                                    onRemove={() => removeFilter("minStar")}
                                />
                            )}
                        </div>

                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Số sao tối đa</label>
                            <input
                                type="number"
                                value={maxStar}
                                min="1"
                                max="5"
                                onChange={(e) => setMaxStar(clampStar(e.target.value))}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                placeholder="1 - 5"
                            />
                            {maxStar !== "" && (
                                <SelectedPill
                                    label={`Sao đến ${maxStar}`}
                                    onRemove={() => removeFilter("maxStar")}
                                />
                            )}
                        </div>

                        {/* Sản phẩm mới */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Sản phẩm mới</label>
                            <select
                                value={isNew}
                                onChange={(e) => setIsNew(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                            >
                                <option value="">-- Chọn --</option>
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                            {isNew !== "" && (
                                <SelectedPill
                                    label={`Sản phẩm mới: ${yesNoOptions[isNew]}`}
                                    onRemove={() => removeFilter("isNew")}
                                />
                            )}
                        </div>

                        {/* Sản phẩm nổi bật */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Sản phẩm nổi bật</label>
                            <select
                                value={isFeatured}
                                onChange={(e) => setIsFeatured(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                            >
                                <option value="">-- Chọn --</option>
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                            {isFeatured !== "" && (
                                <SelectedPill
                                    label={`Nổi bật: ${yesNoOptions[isFeatured]}`}
                                    onRemove={() => removeFilter("isFeatured")}
                                />
                            )}
                        </div>

                        {/* ⭐ TRẠNG THÁI */}
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
