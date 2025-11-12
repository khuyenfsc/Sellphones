import { useState, useEffect } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import FilterModal from "./FilterModal";
import AdminOrderService from "../../../../service/AdminOrderService";

export default function OrderList({ customerId }) {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterRequest, setFilterRequest] = useState({
        page: 0,
        size: 10,
    });


    const [searchTerm, setSearchTerm] = useState('');
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(currentPage);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchOrders = async () => {
        setLoading(true);
        const res = await AdminOrderService.getAdminOrders({
            ...filterRequest,
            customerId: customerId,
            page: currentPage - 1,
            size: perPage,
        });

        if (res.success) {
            setOrders(res.data.result);
            setTotalPages(res.data.totalPages);
            setTotal(res.data?.total || 0);
        }
        setLoading(false);
    };

    const handleApplyFilters = (filtersFromModal) => {
        const combinedFilters = {
            ...filtersFromModal,
            customerName: searchTerm,
        };
        setFilterRequest(combinedFilters);
        setCurrentPage(1);
    };

    useEffect(() => {
        setInputValue(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchOrders({
            ...filterRequest,
            page: currentPage,
            perPage,
        });
    }, [currentPage, perPage, filterRequest]);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };


    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-500";
            case "CONFIRMED":
                return "bg-blue-500";
            case "SHIPPING":
                return "bg-purple-500";
            case "DELIVERED":
                return "bg-green-500";
            case "CANCELED":
                return "bg-red-600";
            case "WAIT_FOR_CANCELLING":
                return "bg-orange-500";
            default:
                return "bg-gray-500";
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            const filters = {
                ...filterRequest,
                customerName: searchTerm,
            };
            setFilterRequest(filters);
        }
    };


    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                {/* Ô tìm kiếm */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên khách hàng"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 pl-10 w-64 focus:outline-none focus:border-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    </div>
                    <span className="text-slate-400 text-sm">
                        Tổng số kết quả: {total}
                    </span>
                </div>

                {/* Bộ lọc + phân trang */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsFilterModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                    >
                        <Filter size={18} />
                        Lọc
                    </button>

                    <select
                        value={perPage}
                        onChange={(e) => {
                            setPerPage(Number(e.target.value));
                            setCurrentPage(1); // reset về trang 1 khi thay đổi perPage
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option>5</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    <span className="text-slate-400">Đơn hàng / Trang</span>

                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 flex items-center gap-1">
                            <input
                                type="number"
                                value={inputValue} // dùng state tạm
                                onChange={(e) => setInputValue(e.target.value)} // cho phép gõ
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        const newPage = Number(inputValue);
                                        if (newPage >= 1 && newPage <= totalPages) {
                                            setCurrentPage(newPage); // chỉ cập nhật currentPage khi Enter
                                        } else {
                                            setInputValue(currentPage); // reset nếu nhập sai
                                        }
                                    }
                                }}
                                className="w-16 text-center bg-gray-800 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            / {totalPages}
                        </span>
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="p-2 bg-slate-800 rounded hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="p-2 bg-slate-800 rounded hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 rounded-lg overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 text-slate-400 text-sm">
                    <div className="col-span-2">Order ID / Date / Status</div>
                    <div className="col-span-3">Grand Total / Pay Via</div>
                    <div className="col-span-4">Customer / Email / Phone / Address</div>
                    <div className="col-span-2">Created By</div>
                    <div className="col-span-1"></div>
                </div>

                {/* Body */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center text-slate-400 py-6">Không có đơn hàng nào</div>
                ) : (
                    orders.map((order) => {
                        const date = new Date(order.orderedAt);
                        const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
                            date.getMonth() + 1
                        ).padStart(2, "0")}/${date.getFullYear()} ${String(date.getHours()).padStart(
                            2,
                            "0"
                        )}:${String(date.getMinutes()).padStart(2, "0")}`;
                        const formattedPrice = order.totalPrice.toLocaleString("vi-VN");

                        const customer = order.customer || {};
                        const address = customer.address || {};
                        const fullAddress = `${address.street || ""}, ${address.ward || ""}, ${address.district || ""
                            }, ${address.province || ""}`;

                        return (
                            <div
                                key={order.id}
                                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition"
                            >
                                {/* Order Info */}
                                <div className="col-span-2">
                                    <div className="font-semibold">#{order.code}</div>
                                    <div className="text-sm text-slate-400 mt-1">{formattedDate}</div>
                                    <span
                                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${getStatusColor(
                                            order.orderStatus
                                        )}`}
                                    >
                                        {order.orderStatus}
                                    </span>
                                </div>

                                {/* Payment Info */}
                                <div className="col-span-3">
                                    <div className="font-semibold">{formattedPrice} ₫</div>
                                    <div className="text-sm text-slate-400 mt-1">
                                        Pay Via - {order.payment?.paymentMethod?.paymentMethodType || "N/A"}
                                    </div>
                                    <div className="text-sm text-slate-400">
                                        Payment Status - {order.payment?.status || "N/A"}
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="col-span-4">
                                    <div className="font-semibold">{customer.fullName || "Khách vãng lai"}</div>
                                    <div className="text-sm text-slate-400 mt-1">
                                        {customer.phoneNumber || "-"}
                                    </div>
                                    <div className="text-sm text-slate-400">{fullAddress}</div>
                                </div>

                                {/* Created By */}
                                <div className="col-span-2">
                                    <div className="text-sm text-slate-400">
                                        {order.createBy || "Không có thông tin"}
                                    </div>
                                </div>

                                {/* Action */}
                                <div className="col-span-1 flex items-center justify-end">
                                    <button className="text-slate-400 hover:text-white transition">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Modal */}
            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={handleApplyFilters}
            />
        </>
    );
}
