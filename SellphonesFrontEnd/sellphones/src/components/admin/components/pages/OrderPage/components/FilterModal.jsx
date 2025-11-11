// FilterModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";

registerLocale("vi", vi);

export default function FilterModal({ isOpen, onClose, onApply }) {
    const [orderCode, setOrderCode] = useState("");
    const [orderStatus, setOrderStatus] = useState(""); 
    const [paymentMethodType, setPaymentMethodType] = useState(""); 
    const [paymentStatus, setPaymentStatus] = useState(""); 
    const [email, setEmail] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const statusOptions = {
        PENDING: "Chờ xác nhận",
        CONFIRMED: "Đã xác nhận",
        SHIPPING: "Đang vận chuyển",
        DELIVERED: "Đã giao",
        CANCELED: "Đã hủy",
        WAIT_FOR_CANCELLING: "Chờ xác nhận hủy",
    };

    const paymentTypeOptions = {
        CASH: "Tiền mặt",
        VNPAY: "VNPAY",
    };

    const paymentStatusOptions = {
        PENDING: "Chưa thanh toán",
        COMPLETED: "Đã thanh toán",
        REFUNDED: "Hoàn tiền",
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

        if (orderCode) filters.orderCode = orderCode;
        if (orderStatus) filters.orderStatus = orderStatus;
        if (paymentMethodType) filters.paymentMethodType = paymentMethodType;
        if (paymentStatus) filters.paymentStatus = paymentStatus;
        if (email) filters.email = email;
        if (startDate) filters.startDate = formatDate(startDate);
        if (endDate) filters.endDate = formatDate(endDate);

        onClose();
        onApply(filters);
        
    };

    const removeFilter = (key) => {
        switch (key) {
            case "orderCode":
                setOrderCode("");
                break;
            case "orderStatus":
                setOrderStatus("");
                break;
            case "paymentMethodType":
                setPaymentMethodType("");
                break;
            case "paymentStatus":
                setPaymentStatus("");
                break;
            case "email":
                setEmail("");
                break;
            case "startDate":
                setStartDate(null);
                break;
            case "endDate":
                setEndDate(null);
                break;
        }
    };

    // Component hiển thị pill nhỏ bên dưới input
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
                        <h2 className="text-xl font-semibold mb-6 text-white">Các lựa chọn lọc</h2>

                        {/* Mã đơn hàng */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Mã đơn hàng</label>
                            <input
                                type="text"
                                value={orderCode}
                                onChange={(e) => setOrderCode(e.target.value)}
                                placeholder="Nhập mã đơn hàng"
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {orderCode && <SelectedPill label={`Mã: ${orderCode}`} onRemove={() => removeFilter("orderCode")} />}
                        </div>

                        {/* Trạng thái đơn hàng */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Trạng thái đơn hàng</label>
                            <select
                                value={orderStatus}
                                onChange={(e) => setOrderStatus(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Chọn trạng thái --</option>
                                {Object.entries(statusOptions).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                            {orderStatus && <SelectedPill label={`Trạng thái: ${statusOptions[orderStatus]}`} onRemove={() => removeFilter("orderStatus")} />}
                        </div>

                        {/* Kiểu thanh toán */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Kiểu thanh toán</label>
                            <select
                                value={paymentMethodType}
                                onChange={(e) => setPaymentMethodType(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Chọn kiểu thanh toán --</option>
                                {Object.entries(paymentTypeOptions).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                            {paymentMethodType && <SelectedPill label={`Thanh toán: ${paymentTypeOptions[paymentMethodType]}`} onRemove={() => removeFilter("paymentMethodType")} />}
                        </div>

                        {/* Trạng thái thanh toán */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Trạng thái thanh toán</label>
                            <select
                                value={paymentStatus}
                                onChange={(e) => setPaymentStatus(e.target.value)}
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Chọn trạng thái thanh toán --</option>
                                {Object.entries(paymentStatusOptions).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                            {paymentStatus && <SelectedPill label={`TT: ${paymentStatusOptions[paymentStatus]}`} onRemove={() => removeFilter("paymentStatus")} />}
                        </div>

                        {/* Email người dùng */}
                        <div className="mb-4">
                            <label className="text-gray-200 mb-1 block">Email người dùng</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Nhập email"
                                className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {email && <SelectedPill label={`Email: ${email}`} onRemove={() => removeFilter("email")} />}
                        </div>

                        {/* Phạm vi ngày */}
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
                                    {startDate && <SelectedPill label={`Từ: ${formatDate(startDate)}`} onRemove={() => removeFilter("startDate")} />}
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
                                    {endDate && <SelectedPill label={`Đến: ${formatDate(endDate)}`} onRemove={() => removeFilter("endDate")} />}
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
