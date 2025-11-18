import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from "date-fns/locale";

export default function CommentFilterModal({ isOpen, onClose, onApply }) {

    const [userId, setUserId] = useState("");
    const [productId, setProductId] = useState("");
    const [parentId, setParentId] = useState("");

    const [isReplied, setIsReplied] = useState("");
    const [status, setStatus] = useState("");

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [sortType, setSortType] = useState("");

    const yesNoOptions = {
        true: "Có",
        false: "Không",
    };

    const statusOptions = {
        PENDING: "PENDING",
        APPROVED: "APPROVED",
        DISAPPROVED: "DISAPPROVED",
    };

    const sortOptions = {
        ASC: "Ngày tạo tăng dần",
        DESC: "Ngày tạo giảm dần",
    };

    const formatDate = (d) =>
        d
            ? `${d.getFullYear()}-${(d.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`
            : "";

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

    const removeFilter = (key) => {
        switch (key) {
            case "userId": setUserId(""); break;
            case "productId": setProductId(""); break;
            case "parentId": setParentId(""); break;
            case "isReplied": setIsReplied(""); break;
            case "status": setStatus(""); break;
            case "startDate": setStartDate(null); break;
            case "endDate": setEndDate(null); break;
            case "sortType": setSortType(""); break;
        }

    };

    const handleApply = () => {
        const filters = {};

        if (userId !== "") filters.userId = Number(userId);
        if (productId !== "") filters.productId = Number(productId);
        if (parentId !== "") filters.parentId = Number(parentId);

        if (isReplied !== "") filters.isReplied = isReplied;
        if (status !== "") filters.status = status;

        if (startDate) filters.startDate = formatDate(startDate);
        if (endDate) filters.endDate = formatDate(endDate);

        if (sortType !== "") filters.sortType = sortType;

        onClose();
        onApply(filters);
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
                        className="fixed top-0 right-0 h-full w-[420px] bg-gray-900 shadow-xl z-50 p-6 overflow-visible"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <div className="h-full overflow-auto p-6">
                            <h2 className="text-xl font-semibold mb-6 text-white">
                                Bộ lọc bình luận
                            </h2>

                            {/* userId */}
                            <div className="mb-5">
                                <label className="text-gray-200 mb-1 block">User ID</label>
                                <input
                                    type="number"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                    placeholder="Nhập userId"
                                />
                                {userId !== "" && (
                                    <SelectedPill
                                        label={`User ID: ${userId}`}
                                        onRemove={() => removeFilter("userId")}
                                    />
                                )}
                            </div>

                            {/* productId */}
                            <div className="mb-5">
                                <label className="text-gray-200 mb-1 block">Product ID</label>
                                <input
                                    type="number"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                    placeholder="Nhập productId"
                                />
                                {productId !== "" && (
                                    <SelectedPill
                                        label={`Product ID: ${productId}`}
                                        onRemove={() => removeFilter("productId")}
                                    />
                                )}
                            </div>

                            {/* parentId */}
                            <div className="mb-5">
                                <label className="text-gray-200 mb-1 block">Parent ID</label>
                                <input
                                    type="number"
                                    value={parentId}
                                    onChange={(e) => setParentId(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                    placeholder="Nhập parentId"
                                />
                                {parentId !== "" && (
                                    <SelectedPill
                                        label={`Parent ID: ${parentId}`}
                                        onRemove={() => removeFilter("parentId")}
                                    />
                                )}
                            </div>

                            {/* isReplied */}
                            <div className="mb-5">
                                <label className="text-gray-200 mb-1 block">Đã trả lời?</label>
                                <select
                                    value={isReplied}
                                    onChange={(e) => setIsReplied(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                >
                                    <option value="">-- Chọn --</option>
                                    <option value="true">Có</option>
                                    <option value="false">Không</option>
                                </select>

                                {isReplied !== "" && (
                                    <SelectedPill
                                        label={`Đã trả lời: ${yesNoOptions[isReplied]}`}
                                        onRemove={() => removeFilter("isReplied")}
                                    />
                                )}
                            </div>

                            {/* status */}
                            <div className="mb-5">
                                <label className="text-gray-200 mb-1 block">Trạng thái</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                >
                                    <option value="">-- Chọn trạng thái --</option>
                                    {Object.keys(statusOptions).map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>

                                {status !== "" && (
                                    <SelectedPill
                                        label={`Trạng thái: ${statusOptions[status]}`}
                                        onRemove={() => removeFilter("status")}
                                    />
                                )}
                            </div>

                            {/* Ngày */}
                            <div className="mb-4">
                                <label className="text-gray-200 mb-1 block">Phạm vi ngày</label>

                                <div className="flex gap-4">
                                    {/* Start Date */}
                                    <div className="flex-1">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            locale={vi}
                                            dateFormat="dd/MM/yyyy"
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                                        />
                                        {startDate && (
                                            <SelectedPill
                                                label={`Từ: ${formatDate(startDate)}`}
                                                onRemove={() => removeFilter("startDate")}
                                            />
                                        )}
                                    </div>

                                    {/* End Date */}
                                    <div className="flex-1">
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            locale={vi}
                                            dateFormat="dd/MM/yyyy"
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
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

                            {/* Sort theo ngày tạo */}
                            <div className="mb-5">
                                <label className="text-gray-200 mb-1 block">Sắp xếp theo ngày tạo</label>
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

                                {sortType !== "" && (
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
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
