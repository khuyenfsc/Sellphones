import React, { useState, useEffect } from 'react';
import { Search, Upload, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import FilterModal from './components/FilterModal';
import AdminOrderService from '../../../service/AdminOrderService';
import dayjs from "dayjs";
import "dayjs/locale/vi";

dayjs.locale("vi");

const AdminOrderPage = () => {
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
  const [totalPages, setTotalPages] = useState(1);

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


  const fetchOrders = async () => {
    setLoading(true);
    const res = await AdminOrderService.getAdminOrders({
      ...filterRequest,
      page: currentPage - 1,
      size: perPage,
    });

    if (res.success) {
      setOrders(res.data.result);
      setTotalPages(res.data.totalPages);
    }
    setLoading(false);
  };

  const handleApplyFilters = (filtersFromModal) => {
    const combinedFilters = {
      ...filtersFromModal,
      customerName: searchTerm,
    };
    setFilterRequest(combinedFilters);
    setCurrentPage(1); // reset trang về 1 nếu muốn
  };

  const handleSearchKeyDown = (e) => {
    console.log("handleSearchKeyDown")

    if (e.key === "Enter") {
      const filters = {
        ...filterRequest,
        customerName: searchTerm,
      };
      fetchOrders(filters);
    }
  };

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


  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Đơn hàng</h1>
        <div className="flex gap-3">

          <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Create Order
          </button>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="flex justify-between items-center mb-6">
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
        </div>

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
            <span className="text-slate-400">
              {currentPage} of {totalPages}
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
        {/* Loading Spinner */}

        {loading ? (
          // Loading spinner khi đang load
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          // Không có đơn hàng
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
                  <div className="text-sm text-slate-400 mt-1">{customer.phoneNumber || "-"}</div>
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


      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
      />

    </div>
  );
};

export default AdminOrderPage;