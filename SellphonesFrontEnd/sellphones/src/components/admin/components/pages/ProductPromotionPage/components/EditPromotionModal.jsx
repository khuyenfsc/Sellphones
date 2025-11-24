import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

export default function EditPromotionModal({ isOpen, onClose, onUpdate, onDelete, promotion }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [percent, setPercent] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Convert yyyy-mm-dd → Date object
    const parseDate = (str) => (str ? new Date(str + "T00:00:00") : null);

    const formatDate = (date) => {
        if (!date) return "";
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    };

    // Load dữ liệu cũ vào modal mỗi khi mở
    useEffect(() => {
        if (!promotion) return;

        setName(promotion.name || "");
        setDescription(promotion.description || "");
        setType(promotion.type || "");

        if (promotion.type === "DISCOUNT_PERCENT") {
            setPercent(promotion.config?.percent || "");
            setAmount("");
        } else {
            setAmount(promotion.config?.value || "");
            setPercent("");
        }

        setPaymentMethods(promotion.condition?.paymentMethods || []);
        setStartDate(parseDate(promotion.startDate));
        setEndDate(parseDate(promotion.endDate));
        setErrors({});
    }, [promotion, isOpen]);

    const togglePayment = (method) => {
        setPaymentMethods((prev) =>
            prev.includes(method)
                ? prev.filter((m) => m !== method)
                : [...prev, method]
        );
    };

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Tên không được để trống";
        if (!description.trim()) newErrors.description = "Mô tả không được để trống";
        if (!type) newErrors.type = "Hãy chọn loại khuyến mãi";
        if (type === "DISCOUNT_PERCENT" && (!percent || percent <= 0))
            newErrors.percent = "Phần trăm phải lớn hơn 0";
        if (type === "DISCOUNT_AMOUNT" && (!amount || amount <= 0))
            newErrors.amount = "Số tiền phải lớn hơn 0";
        if (!startDate) newErrors.startDate = "Chọn ngày bắt đầu";
        if (!endDate) newErrors.endDate = "Chọn ngày kết thúc";
        if (startDate && endDate && endDate < startDate)
            newErrors.endDate = "Ngày kết thúc phải sau ngày bắt đầu";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = async () => {
        if (!validate()) return;
        setLoading(true);

        const payload = {
            name: name.trim(),
            description: description.trim(),
            type: type,
            config:
                type === "DISCOUNT_PERCENT"
                    ? { percent: Number(percent) }
                    : { value: Number(amount) },
            condition: { paymentMethods },
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
        };

        await onUpdate(promotion.id, payload);
        setLoading(false);
        onClose();
    };

    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: "Xác nhận xóa",
            text: "Bạn có chắc muốn xóa khuyến mãi này không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (confirm.isConfirmed && onDelete) {
            await onDelete(promotion.id);
            onClose();
        }
    };

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
                            Chỉnh sửa khuyến mãi
                        </h2>

                        <div className="space-y-4">

                            {/* NAME */}
                            <div>
                                <label className="text-gray-300 block mb-1">Tên khuyến mãi</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="text-gray-300 block mb-1">Mô tả</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                    rows={3}
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                            </div>

                            {/* TYPE */}
                            <div>
                                <label className="text-gray-300 block mb-1">Loại khuyến mãi</label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                >
                                    <option value="">-- Chọn loại --</option>
                                    <option value="DISCOUNT_PERCENT">Giảm theo phần trăm</option>
                                    <option value="DISCOUNT_AMOUNT">Giảm theo số tiền</option>
                                </select>
                                {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                            </div>

                            {/* PERCENT */}
                            {type === "DISCOUNT_PERCENT" && (
                                <div>
                                    <label className="text-gray-300 block mb-1">Phần trăm giảm (%)</label>
                                    <input
                                        type="number"
                                        value={percent}
                                        onChange={(e) => setPercent(e.target.value)}
                                        className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                    />
                                    {errors.percent && <p className="text-red-500 text-sm">{errors.percent}</p>}
                                </div>
                            )}

                            {/* AMOUNT */}
                            {type === "DISCOUNT_AMOUNT" && (
                                <div>
                                    <label className="text-gray-300 block mb-1">Số tiền giảm</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                    />
                                    {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                                </div>
                            )}

                            {/* PAYMENT METHODS */}
                            <div>
                                <label className="text-gray-300 block mb-1">Phương thức thanh toán áp dụng</label>
                                <div className="flex gap-4 mt-1">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={paymentMethods.includes("CASH")}
                                            onChange={() => togglePayment("CASH")}
                                        />
                                        <span>Tiền mặt</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={paymentMethods.includes("VNPAY")}
                                            onChange={() => togglePayment("VNPAY")}
                                        />
                                        <span>VNPAY</span>
                                    </label>
                                </div>
                            </div>

                            {/* DATE RANGE */}
                            <div>
                                <label className="text-gray-300 block mb-1">Ngày áp dụng</label>
                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                        />
                                        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
                                    </div>
                                    <div className="flex-1">
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                        />
                                        {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* BUTTONS */}
                            <button
                                disabled={loading}
                                onClick={handleUpdate}
                                className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                            >
                                {loading ? "Đang cập nhật..." : "Cập nhật"}
                            </button>

                            <button
                                onClick={handleDelete}
                                className="mt-2 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Xóa khuyến mãi
                            </button>

                            <button
                                onClick={onClose}
                                className="mt-2 w-full px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
                            >
                                Đóng
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
