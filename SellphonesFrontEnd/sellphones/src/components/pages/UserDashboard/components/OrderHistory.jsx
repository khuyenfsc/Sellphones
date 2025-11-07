import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OrderService from "../../../../service/OrderService";
import OrderDetails from "./OrderDetails";
import { toast } from "react-toastify";

export default function OrderHistory() {
  const tabs = [
    "Tất cả",
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang vận chuyển",
    "Đã vận chuyển",
    "Đã hủy",
    "Chờ xác nhận hủy",
  ];

  const [activeTab, setActiveTab] = useState("Tất cả");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false); // loading chi tiết

  const [selectedOrder, setSelectedOrder] = useState(null); // ✅ state để lưu đơn hàng đang xem chi tiết

  const statusMap = {
    "Tất cả": null,
    "Chờ xác nhận": "PENDING",
    "Đã xác nhận": "CONFIRMED",
    "Đang vận chuyển": "SHIPPING",
    "Đã vận chuyển": "DELIVERED",
    "Đã hủy": "CANCELED",
    "Chờ xác nhận hủy": "WAIT_FOR_CANCELLING",
  };

  const statusLabel = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    SHIPPING: "Đang vận chuyển",
    DELIVERED: "Đã vận chuyển",
    CANCELED: "Đã hủy",
    WAIT_FOR_CANCELLING: "Chờ xác nhận hủy",
    null: "Tất cả",
  };

  const formatDateForBackend = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchOrders = async (page = 0) => {
    setLoading(true);
    try {
      const res = await OrderService.getOrders({
        startDate: startDate ? formatDateForBackend(startDate) : null,
        endDate: endDate ? formatDateForBackend(endDate) : null,
        page,
        size: 5,
        status: statusMap[activeTab],
      });

      if (res.success) {
        setOrders(res.result?.result || []);
        setTotalPages(res.result?.totalPages || 1);
      }
    } catch (err) {
      console.error("Lỗi fetchOrders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (orderId) => {
    setLoadingDetails(true);
    try {
      const res = await OrderService.getOrderById(orderId);
      if (res.success) {
        setSelectedOrder(res.result);
      } else {
        toast.error("Không thể lấy chi tiết đơn hàng!");
      }
    } catch (err) {
      console.error("Lỗi fetch chi tiết đơn hàng:", err);
      toast.error("Đã xảy ra lỗi khi lấy chi tiết đơn hàng!");
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchOrders(0);
  }, [activeTab]);

  useEffect(() => {
    fetchOrders(currentPage - 1);
  }, [currentPage]);

  const handleFilter = () => {
    setCurrentPage(1);
    fetchOrders(0);
  };

  // Nếu có đơn hàng được chọn => hiển thị OrderDetails
  if (selectedOrder) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <button
          onClick={() => setSelectedOrder(null)}
          className="mb-4 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-md text-sm flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> Quay lại
        </button>
        <OrderDetails order={selectedOrder} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-base font-semibold mb-3">Lịch sử mua hàng</h3>

      {/* Bộ lọc thời gian */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Từ ngày:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn ngày bắt đầu"
            className="border rounded-md px-2 py-1 text-sm w-36 focus:outline-none focus:ring focus:ring-red-200"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Đến ngày:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn ngày kết thúc"
            className="border rounded-md px-2 py-1 text-sm w-36 focus:outline-none focus:ring focus:ring-red-200"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>
        <button
          onClick={handleFilter}
          className="bg-red-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-red-600 transition"
        >
          Lọc
        </button>
        <button
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
            handleFilter();
          }}
          className="bg-gray-200 text-gray-700 text-sm px-4 py-1.5 rounded-md hover:bg-gray-300 transition"
        >
          Bỏ lọc
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm whitespace-nowrap border-b-2 transition ${activeTab === tab
              ? "border-red-500 text-red-600 font-semibold"
              : "border-transparent text-gray-600 hover:text-red-500"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Danh sách đơn hàng */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>) : orders.length === 0 ? (
          <p className="text-center text-gray-500">Không có đơn hàng nào.</p>
        ) : (
        orders.map((order) => (
          <div key={order.id} className="border rounded-md p-3 mb-3">
            <div className="flex justify-between items-start mb-3">
              <div className="text-sm text-gray-700 space-x-2">
                <span>Đơn hàng:</span>
                <span className="font-semibold text-black">{order.code}</span>
                <span>• Ngày đặt:</span>
                <span className="font-semibold">
                  {new Date(order.orderedAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${order.orderStatus === "CANCELED"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
                  }`}
              >
                {statusLabel[order.orderStatus]}
              </span>
            </div>

            {order.orderVariants.map((variant, i) => (
              <div key={i} className="flex items-center gap-3 mb-2">
                <img
                  src={variant.productVariant.variantImage}
                  alt={variant.productVariant.productVariantName}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">
                    {variant.productVariant.productVariantName}
                  </h4>
                  <p className="text-red-600 font-semibold text-sm">
                    {variant.productVariant.currentPrice.toLocaleString()}đ
                  </p>
                  <p className="text-gray-500 text-xs">Số lượng: {variant.quantity}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="text-gray-600">Tổng:</p>
                  <p className="text-lg font-bold text-red-600">
                    {variant.totalPrice.toLocaleString()}đ
                  </p>
                  <button
                    onClick={() => handleViewDetails(order.id)} // ✅ gọi fetch chi tiết theo id
                    className="text-red-600 hover:underline flex items-center justify-end gap-1 mt-1 text-xs"
                    disabled={loadingDetails}
                  >
                    {loadingDetails ? "Đang tải..." : <>Xem chi tiết <ChevronRight className="w-3 h-3" /></>}
                  </button>
                </div>
              </div>
            ))}

            <p className="text-right font-semibold text-gray-700">
              Tổng thanh toán: {order.totalPrice.toLocaleString()}đ
            </p>
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-4 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-3 py-2 rounded-lg border text-sm ${currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-red-50 border-red-400 text-red-500"
            }`}
        >
          Trang trước
        </button>

        <div className="flex items-center gap-2">
          <p className="text-gray-700 font-medium">Trang</p>
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 focus:outline-none bg-white text-black"
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <p className="text-gray-700 font-medium">/ {totalPages}</p>
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-3 py-2 rounded-lg border text-sm ${currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-red-50 border-red-400 text-red-500"
            }`}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
}
