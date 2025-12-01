import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function UsersFilterModal({ isOpen, onClose, onApply }) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [gender, setGender] = useState("");
    const [provider, setProvider] = useState("");
    const [sortType, setSortType] = useState("");

    const STATUS_OPTIONS = {
        ACTIVE: "Hoạt động",
        INACTIVE: "Không hoạt động",
    };

    const GENDER_OPTIONS = {
        MALE: "Nam",
        FEMALE: "Nữ",
        OTHER: "Khác",
    };

    const PROVIDER_OPTIONS = {
        GOOGLE: "Google",
        LOCAL: "Local",
    };

    const SORT_OPTIONS = {
        ASC: "ID tăng dần",
        DESC: "ID giảm dần",
    };

    const handleApply = () => {
        const filters = {};

        if (email !== "") filters.email = email;
        if (status) filters.status = status;
        if (gender) filters.gender = gender;
        if (provider) filters.provider = provider;
        if (sortType) filters.sortType = sortType;

        onClose();
        onApply(filters);
    };

    const removeFilter = (key) => {
        switch (key) {
            case "email": setEmail(""); break;
            case "status": setStatus(""); break;
            case "gender": setGender(""); break;
            case "provider": setProvider(""); break;
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
                        className="fixed top-0 right-0 h-full w-[420px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <h2 className="text-xl font-semibold mb-6 text-white">
                            Bộ lọc người dùng
                        </h2>

                        {/* Email */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                placeholder="Nhập email"
                            />
                            {email !== "" && (
                                <SelectedPill
                                    label={`Email: ${email}`}
                                    onRemove={() => removeFilter("email")}
                                />
                            )}
                        </div>

                        {/* Status */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Trạng thái</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                            >
                                <option value="">-- Chọn trạng thái --</option>
                                {Object.entries(STATUS_OPTIONS).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                            {status && (
                                <SelectedPill
                                    label={`Trạng thái: ${STATUS_OPTIONS[status]}`}
                                    onRemove={() => removeFilter("status")}
                                />
                            )}
                        </div>

                        {/* Gender */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Giới tính</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                            >
                                <option value="">-- Chọn giới tính --</option>
                                {Object.entries(GENDER_OPTIONS).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                            {gender && (
                                <SelectedPill
                                    label={`Giới tính: ${GENDER_OPTIONS[gender]}`}
                                    onRemove={() => removeFilter("gender")}
                                />
                            )}
                        </div>

                        {/* Provider */}
                        <div className="mb-5">
                            <label className="text-gray-200 mb-1 block">Provider</label>
                            <select
                                value={provider}
                                onChange={(e) => setProvider(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                            >
                                <option value="">-- Chọn provider --</option>
                                {Object.entries(PROVIDER_OPTIONS).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                            {provider && (
                                <SelectedPill
                                    label={`Provider: ${PROVIDER_OPTIONS[provider]}`}
                                    onRemove={() => removeFilter("provider")}
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
                                {Object.entries(SORT_OPTIONS).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {value}
                                    </option>
                                ))}
                            </select>

                            {sortType && (
                                <SelectedPill
                                    label={`Sắp xếp: ${SORT_OPTIONS[sortType]}`}
                                    onRemove={() => removeFilter("sortType")}
                                />
                            )}
                        </div>

                        {/* Buttons */}
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
