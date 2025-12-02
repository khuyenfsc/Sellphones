import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function WarehouseFilterModal({ isOpen, onClose, onApply }) {
    const [street, setStreet] = useState("");
    const [ward, setWard] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [sortType, setSortType] = useState("");

    const sortOptions = {
        ASC: "ID tăng dần",
        DESC: "ID giảm dần",
    };

    const handleApply = () => {
        const filters = {};

        if (street.trim() !== "") filters.street = street.trim();
        if (ward.trim() !== "") filters.ward = ward.trim();
        if (district.trim() !== "") filters.district = district.trim();
        if (province.trim() !== "") filters.province = province.trim();
        if (sortType) filters.sortType = sortType;

        onClose();
        onApply(filters);
    };

    const removeFilter = (key) => {
        switch (key) {
            case "street": setStreet(""); break;
            case "ward": setWard(""); break;
            case "district": setDistrict(""); break;
            case "province": setProvince(""); break;
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
                            Bộ lọc kho hàng
                        </h2>

                        {/* Street */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Tên đường</label>
                            <input
                                type="text"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                placeholder="Nhập tên đường"
                            />
                            {street !== "" && (
                                <SelectedPill
                                    label={`Đường: ${street}`}
                                    onRemove={() => removeFilter("street")}
                                />
                            )}
                        </div>

                        {/* Ward */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Phường</label>
                            <input
                                type="text"
                                value={ward}
                                onChange={(e) => setWard(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                placeholder="Nhập phường"
                            />
                            {ward !== "" && (
                                <SelectedPill
                                    label={`Phường: ${ward}`}
                                    onRemove={() => removeFilter("ward")}
                                />
                            )}
                        </div>

                        {/* District */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Quận / Huyện</label>
                            <input
                                type="text"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                placeholder="Nhập quận / huyện"
                            />
                            {district !== "" && (
                                <SelectedPill
                                    label={`Quận/Huyện: ${district}`}
                                    onRemove={() => removeFilter("district")}
                                />
                            )}
                        </div>

                        {/* Province */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Tỉnh / Thành phố</label>
                            <input
                                type="text"
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                placeholder="Nhập tỉnh / thành phố"
                            />
                            {province !== "" && (
                                <SelectedPill
                                    label={`Tỉnh/TP: ${province}`}
                                    onRemove={() => removeFilter("province")}
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
