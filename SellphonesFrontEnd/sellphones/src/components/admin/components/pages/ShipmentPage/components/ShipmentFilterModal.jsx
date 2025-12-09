// FilterShipmentModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";

registerLocale("vi", vi);

export default function FilterShipmentModal({ isOpen, onClose, onApply }) {
    const [customerName, setCustomerName] = useState("");
    const [partner, setPartner] = useState("");
    const [status, setStatus] = useState("");
    const [expectedStart, setExpectedStart] = useState(null);
    const [expectedEnd, setExpectedEnd] = useState(null);

    const partnerOptions = {
        ViettelPost: "ViettelPost",
        GHN: "GHN",
    };

    const statusOptions = {
        SHIPPING: "Đang giao",
        DELIVERED: "Đã giao",
    };

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

        if (customerName) filters.customerName = customerName;
        if (partner) filters.partner = partner;
        if (status) filters.status = status;
        if (expectedStart) filters.expectedStart = formatDate(expectedStart);
        if (expectedEnd) filters.expectedEnd = formatDate(expectedEnd);

        onClose();
        onApply(filters);
    };

    const removeFilter = (key) => {
        switch (key) {
            case "customerName":
                setCustomerName("");
                break;
            case "partner":
                setPartner("");
                break;
            case "status":
                setStatus("");
                break;
            case "expectedStart":
                setExpectedStart(null);
                break;
            case "expectedEnd":
                setExpectedEnd(null);
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
                            Bộ lọc Shipment
                        </h2>

                        {/* Tên khách hàng */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Tên khách hàng</label>
                            <input
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Nhập tên khách hàng"
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {customerName && (
                                <SelectedPill
                                    label={`Khách: ${customerName}`}
                                    onRemove={() => removeFilter("customerName")}
                                />
                            )}
                        </div>

                        {/* Đối tác giao hàng */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Đối tác giao hàng</label>
                            <select
                                value={partner}
                                onChange={(e) => setPartner(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Chọn đối tác --</option>
                                {Object.entries(partnerOptions).map(([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {partner && (
                                <SelectedPill
                                    label={`Đối tác: ${partnerOptions[partner]}`}
                                    onRemove={() => removeFilter("partner")}
                                />
                            )}
                        </div>

                        {/* Trạng thái */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Trạng thái</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Chọn trạng thái --</option>
                                {Object.entries(statusOptions).map(([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {status && (
                                <SelectedPill
                                    label={`Trạng thái: ${statusOptions[status]}`}
                                    onRemove={() => removeFilter("status")}
                                />
                            )}
                        </div>

                        {/* Phạm vi ngày giao dự kiến */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">
                                Phạm vi ngày giao dự kiến
                            </label>
                            <div className="flex gap-4">
                                {/* Từ ngày */}
                                <div className="flex-1">
                                    <DatePicker
                                        selected={expectedStart}
                                        onChange={(date) => setExpectedStart(date)}
                                        locale="vi"
                                        dateFormat="dd/MM/yyyy"
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        className="w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {expectedStart && (
                                        <SelectedPill
                                            label={`Từ: ${formatDate(expectedStart)}`}
                                            onRemove={() => removeFilter("expectedStart")}
                                        />
                                    )}
                                </div>

                                {/* Đến ngày */}
                                <div className="flex-1">
                                    <DatePicker
                                        selected={expectedEnd}
                                        onChange={(date) => setExpectedEnd(date)}
                                        locale="vi"
                                        dateFormat="dd/MM/yyyy"
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        className="w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {expectedEnd && (
                                        <SelectedPill
                                            label={`Đến: ${formatDate(expectedEnd)}`}
                                            onRemove={() => removeFilter("expectedEnd")}
                                        />
                                    )}
                                </div>
                            </div>
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
