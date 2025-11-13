import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function CategoryFilterModal({ isOpen, onClose, onApply }) {
    const [featuredOnHomepage, setFeaturedOnHomepage] = useState("");
    const [sortType, setSortType] = useState("");

    const sortOptions = {
        ASC: "Tăng dần",
        DESC: "Giảm dần",
    };

    const homepageOptions = {
        true: "Hiển thị trên trang chủ",
        false: "Không hiển thị trên trang chủ",
    };

    const handleApply = () => {
        const filters = {};
        if (featuredOnHomepage !== "") filters.featuredOnHomepage = featuredOnHomepage;
        if (sortType) filters.sortType = sortType;

        onClose();
        onApply(filters);
    };

    const removeFilter = (key) => {
        switch (key) {
            case "featuredOnHomepage":
                setFeaturedOnHomepage("");
                break;
            case "sortType":
                setSortType("");
                break;
        }
    };

    // Pill hiển thị bộ lọc đang chọn
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
                    {/* Nền mờ */}
                    <motion.div
                        className="fixed inset-0 bg-black z-40"
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
                            Bộ lọc danh mục
                        </h2>

                        {/* Bộ lọc FeaturedOnHomepage */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">
                                Hiển thị trên trang chủ
                            </label>
                            <select
                                value={featuredOnHomepage}
                                onChange={(e) => setFeaturedOnHomepage(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Chọn trạng thái --</option>
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                            {featuredOnHomepage !== "" && (
                                <SelectedPill
                                    label={
                                        featuredOnHomepage === "true"
                                            ? "Hiển thị trên trang chủ"
                                            : "Không hiển thị"
                                    }
                                    onRemove={() => removeFilter("featuredOnHomepage")}
                                />
                            )}
                        </div>

                        {/* Bộ lọc Sắp xếp */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">
                                Kiểu sắp xếp
                            </label>
                            <select
                                value={sortType}
                                onChange={(e) => setSortType(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Chọn kiểu sắp xếp theo tên --</option>
                                {Object.entries(sortOptions).map(([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {sortType && (
                                <SelectedPill
                                    label={`Sắp xếp: ${sortOptions[sortType]}`}
                                    onRemove={() => removeFilter("sortType")}
                                />
                            )}
                        </div>

                        {/* Nút hành động */}
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
