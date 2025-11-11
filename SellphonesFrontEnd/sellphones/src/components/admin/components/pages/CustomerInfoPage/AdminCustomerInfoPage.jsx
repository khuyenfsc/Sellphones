import React, { useEffect, useState } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import AdminCustomerInfoService from "../../../service/AdminCustomerInfoService";
import CustomerFilterModal from "./components/CustomerFilterModal";
import CreateCustomerModal from "./components/CreateCustomerModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminCustomerPage = () => {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isCreateCustomerModalOpen, setIsCreateCustomerModalOpen] = useState(false);
    const navigate = useNavigate();
    const [filterRequest, setFilterRequest] = useState({
        page: 0,
        size: 10,
    });

    const handleViewCustomer = (customer) => {
        if (!customer?.id) return;
        navigate(`/admin/customers/view/${customer.id}`);
    };

    const fetchCustomers = async () => {
        setLoading(true);
        const res = await AdminCustomerInfoService.getCustomers({
            ...filterRequest,
            page: currentPage - 1,
            size: perPage,
            name: searchTerm,
        });

        if (res.success) {
            setCustomers(res.data.result);
            setTotalPages(res.data.totalPages);
        }
        setLoading(false);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            setCurrentPage(1);
            fetchCustomers();
        }
    };

    const handleApplyFilters = (filtersFromModal) => {
        setFilterRequest(filtersFromModal);
        setCurrentPage(1);
    };

    const handleCreateCustomer = async (customerData) => {
        try {
            const res = await AdminCustomerInfoService.createCustomer(customerData);
            if (!res.success) {
                toast.error(res.message || "Tạo khách hàng thất bại");
                return false;
            }

            toast.success("Tạo khách hàng thành công!");
            fetchCustomers();
            return true;
        } catch (err) {
            console.error(err);
            toast.error("Đã có lỗi xảy ra khi tạo khách hàng");
            return false;
        }
    };

    

    useEffect(() => {
        fetchCustomers();
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
                <h1 className="text-2xl font-semibold">Khách hàng</h1>
                <div className="flex gap-3">
                    <button
                        className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                        onClick={() => setIsCreateCustomerModalOpen(true)}
                    >
                        Tạo khách hàng
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
                            setCurrentPage(1);
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option>5</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    <span className="text-slate-400">Khách hàng / Trang</span>

                    <div className="flex items-center gap-2">
                        <span className="text-slate-400">
                            {currentPage} / {totalPages}
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
                    <div className="col-span-1">ID</div>
                    <div className="col-span-3">Tên khách hàng / CCCD</div>
                    <div className="col-span-3">Email</div>
                    <div className="col-span-2">Số điện thoại</div>
                    <div className="col-span-2">Địa chỉ</div>
                </div>

                {/* Body */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : customers.length === 0 ? (
                    <div className="text-center text-slate-400 py-6">Không có khách hàng nào</div>
                ) : (
                    customers.map((customer) => {
                        const email = customer.user?.email || "-";
                        const address = customer.address || {};
                        const fullAddress = [
                            address.street,
                            address.ward,
                            address.district,
                            address.province,
                        ]
                            .filter(Boolean)
                            .join(", ");

                        return (
                            <div
                                key={customer.id}
                                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition"
                            >
                                {/* ID */}
                                <div className="col-span-1 text-slate-300">{customer.id}</div>

                                {/* Tên khách hàng + CCCD */}
                                <div className="col-span-3">
                                    <div className="font-semibold text-slate-200">
                                        {customer.fullName || "-"}
                                    </div>
                                    {customer.cccd && (
                                        <div className="text-slate-200 text-sm">{customer.cccd}</div>
                                    )}
                                </div>


                                {/* Email */}
                                <div className="col-span-3 text-slate-300">{email}</div>

                                {/* Số điện thoại */}
                                <div className="col-span-2 text-slate-300">{customer.phoneNumber || "-"}</div>

                                {/* Địa chỉ */}
                                <div className="col-span-2 text-slate-400">{fullAddress || "-"}</div>

                                {/* Nút xem chi tiết */}
                                <div className="col-span-1 flex justify-center items-center">
                                    <button
                                        onClick={() => handleViewCustomer(customer)}
                                        className="text-slate-400 hover:text-white transition"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>



            <CustomerFilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={handleApplyFilters}
            />

            <CreateCustomerModal
                isOpen={isCreateCustomerModalOpen}
                onClose={() => setIsCreateCustomerModalOpen(false)}
                onCreate={handleCreateCustomer}
            />

        </div>
    );
};

export default AdminCustomerPage;
