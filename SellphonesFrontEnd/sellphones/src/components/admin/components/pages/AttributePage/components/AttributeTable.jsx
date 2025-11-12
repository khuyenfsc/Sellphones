import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import AdminAttributeService from "../../../../service/AdminAttributeService";
import { useNavigate } from "react-router-dom";

export default function AttributeTable({ isReloaded }) {
    const navigate = useNavigate();
    const [attributes, setAttributes] = useState([]);
    const [loading, setLoading] = useState(false);

    // Phân trang + tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(currentPage);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [sortType, setSortType] = useState("ASC");

    const [filterRequest, setFilterRequest] = useState({
        keyword: null,
        sortType: sortType,
        page: 0,
        size: perPage,
    });

    const fetchAttributes = async () => {
        setLoading(true);
        const res = await AdminAttributeService.getAttributes({
            ...filterRequest,
            keyword: searchTerm.trim() || null,
            page: currentPage - 1,
            size: perPage,
            sortType: sortType
        });
        if (res.success) {
            setAttributes(res.data.result || []);
            setTotalPages(res.data.totalPages || 1);
            setTotal(res.data?.total || 0);
        } else {
            toast.error(res.message || "Không thể tải danh sách thuộc tính");
        }
        setLoading(false);
    };

    useEffect(() => {
        setInputValue(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchAttributes();
    }, [currentPage, perPage, filterRequest, isReloaded, sortType]);


    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            setFilterRequest({
                ...filterRequest,
                keyword: searchTerm,
            });
            setCurrentPage(1);
        }
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <>
            {/* Header Controls */}
            <div className="flex justify-between items-center mb-6">
                {/* Ô tìm kiếm */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm thuộc tính"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 pl-10 w-64 focus:outline-none focus:border-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    </div>

                    {/* Tổng số kết quả */}
                    <span className="text-slate-400 text-sm">
                        Tổng số kết quả: {total}
                    </span>
                </div>


                {/* Phân trang */}
                <div className="flex items-center gap-4">
                    {/* Chọn số lượng mỗi trang */}
                    <select
                        value={perPage}
                        onChange={(e) => {
                            const newSize = Number(e.target.value);
                            setPerPage(newSize);
                            setCurrentPage(1);

                            // Cập nhật filterRequest để fetch lại
                            setFilterRequest({
                                ...filterRequest,
                                page: 0,
                                size: newSize,
                            });
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                    </select>
                    <span className="text-slate-400">Thuộc tính / Trang</span>

                    {/* Chọn sắp xếp theo tên */}
                    <select
                        value={sortType}
                        onChange={(e) => {
                            setSortType(e.target.value);
                            setCurrentPage(1);
                            // // Gọi lại API fetchAttributes
                            // fetchAttributes({
                            //     ...filterRequest,
                            //     sortType: newSort,
                            //     page: 0,
                            // });
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="ASC">Sắp xếp: A → Z</option>
                        <option value="DESC">Sắp xếp: Z → A</option>
                    </select>

                    {/* Phân trang */}
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
                    <div className="col-span-2">Mã</div>
                    <div className="col-span-6">Tên thuộc tính</div>
                    <div className="col-span-2">Ngày tạo</div>
                </div>


                {/* Body */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : attributes.length === 0 ? (
                    <div className="text-center text-slate-400 py-6">Không có thuộc tính nào</div>
                ) : (
                    attributes.map((att) => {
                        // Format ngày tạo
                        const date = new Date(att.createdAt);
                        const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
                            date.getMonth() + 1
                        ).padStart(2, "0")}/${date.getFullYear()} ${String(date.getHours()).padStart(
                            2,
                            "0"
                        )}:${String(date.getMinutes()).padStart(2, "0")}`;

                        return (
                            <div
                                key={att.id}
                                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition"
                            >
                                <div className="col-span-2 font-medium">#{att.id}</div>
                                <div className="col-span-6">{att.name}</div>
                                <div className="col-span-2">{formattedDate}</div>
                                <div className="col-span-2 text-center">
                                    <button
                                        onClick={() => navigate(`/admin/attributes/view/${att.id}`)}
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
        </>
    );
}
