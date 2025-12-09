import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ChevronLeft, ChevronRight, Search, Filter, ChevronRight as ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import AdminShipmentService from "../../../../service/AdminShipmentService";
import ShipmentFilterModal from "./ShipmentFilterModal";
// import ShipmentDetailModal from "./ShipmentDetailModal";

export default function ShipmentTable({ isReloaded }) {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Filter + search + pagination
    const [searchTerm, setSearchTerm] = useState("");
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filterRequest, setFilterRequest] = useState({
        code: null,
        status: null,
        deliveryPartner: null,
        page: 0,
        size: 5,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState(null);

    const statusColors = {
        SHIPPING: "bg-purple-500/20 text-purple-300",
        DELIVERED: "bg-green-500/20 text-green-300",
    };

    const fetchShipments = async () => {
        setLoading(true);
        const res = await AdminShipmentService.getShipments({
            ...filterRequest,
            code: searchTerm.trim() || null,
            page: currentPage - 1,
            size: perPage,
        });

        if (res.success) {
            setShipments(res.data.result || []);
            setTotalPages(res.data.totalPages || 1);
            setTotal(res.data.total || 0);
        } else {
            toast.error(res.message || "Không thể tải danh sách vận chuyển");
        }

        setLoading(false);
    };

    useEffect(() => {
        setInputValue(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchShipments();
    }, [currentPage, perPage, filterRequest, isReloaded]);

    const handleFilter = (filters) => {
        const clean = {};
        Object.entries(filters).forEach(([k, v]) => {
            if (v !== "" && v != null) clean[k] = v;
        });

        setFilterRequest({
            ...clean,
            code: searchTerm || null,
            page: 0
        });

        setCurrentPage(1);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            setFilterRequest({ ...filterRequest, code: searchTerm });
            setCurrentPage(1);
        }
    };

    const handlePrevPage = () =>
        setCurrentPage((prev) => Math.max(prev - 1, 1));

    const handleNextPage = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const openDetail = (shipment) => {
        setSelectedShipment(shipment);
        setIsDetailModalOpen(true);
    };

    return (
        <>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                {/* SEARCH */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm mã giao hàngf/mã đơn"
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

                {/* PAGINATION */}
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
                            const newSize = Number(e.target.value);
                            setPerPage(newSize);
                            setCurrentPage(1);
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                    </select>
                    <span className="text-slate-400">/ Trang</span>

                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 flex items-center gap-1">
                            <input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        const newPage = Number(inputValue);
                                        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
                                        else setInputValue(currentPage);
                                    }
                                }}
                                className="w-16 text-center bg-gray-800 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            / {totalPages}
                        </span>

                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="p-2 bg-slate-800 rounded hover:bg-slate-700 transition disabled:opacity-50"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="p-2 bg-slate-800 rounded hover:bg-slate-700 transition disabled:opacity-50"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-slate-900 rounded-lg overflow-hidden">

                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 text-slate-400 text-sm">
                    <div className="col-span-3">Mã vận chuyển / Trạng thái</div>
                    <div className="col-span-3">Đối tác giao hàng</div>
                    <div className="col-span-3">Ngày dự kiến giao</div>
                    <div className="col-span-2">Ngày giao thực tế</div>
                    <div className="col-span-1 text-center"></div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : shipments.length === 0 ? (
                    <div className="text-center text-slate-400 py-6">
                        Không có vận chuyển nào
                    </div>
                ) : (
                    shipments.map((s) => {

                        const expected = s.expectedDeliveryDate
                            ? new Date(s.expectedDeliveryDate).toLocaleDateString("vi-VN")
                            : "—";

                        const delivered = s.deliveryDate
                            ? new Date(s.deliveryDate).toLocaleDateString("vi-VN")
                            : "—";

                        return (
                            <div
                                key={s.code}
                                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition"
                            >
                                {/* CODE + STATUS */}
                                <div className="col-span-3 flex flex-col gap-2">
                                    <span className="font-medium">#{s.code}</span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs w-fit ${statusColors[s.status]}`}
                                    >
                                        {s.status}
                                    </span>
                                </div>

                                <div className="col-span-3">{s.deliveryPartner}</div>
                                <div className="col-span-3">{expected}</div>
                                <div className="col-span-2">{delivered}</div>

                                <div className="col-span-1 text-center">
                                    <button
                                        className="text-slate-400 hover:text-white transition"
                                        onClick={() => navigate(`/admin/shipments/view/${s.id}`)}
                                    >
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <ShipmentFilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={handleFilter}
            />

            {/* <ShipmentDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                shipment={selectedShipment}
            /> */}
        </>
    );
}
