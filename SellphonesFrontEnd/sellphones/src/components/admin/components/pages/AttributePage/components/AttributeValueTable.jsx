import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import AdminAttributeService from "../../../../service/AdminAttributeService";

export default function AttributeValueTable({ attributeId }) {
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(false);

    // Search & Pagination & Sorting
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [sortType, setSortType] = useState("ASC");
    const [filterRequest, setFilterRequest] = useState({
        attributeId,   // truyền từ props
        keyword: "",
        page: 0,
        size: 5,
        sortType: "ASC",
    });



    const fetchValues = async () => {
        setLoading(true);
        try {
            const res = await AdminAttributeService.getAttributeValues(filterRequest);
            if (res.success) {
                setValues(res.data.result || []);
                setTotalPages(res.data.totalPages || 1);
            } else {
                toast.error(res.message || "Không thể tải danh sách giá trị");
            }
        } catch (err) {
            console.error(err);
            toast.error("Lỗi khi tải danh sách giá trị");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchValues();
    }, [filterRequest]);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Xác nhận xóa",
            text: "Bạn có chắc muốn xóa giá trị này không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await AdminAttributeService.deleteAttributeValue(attributeId, id);
                if (res.success) {
                    toast.success("Đã xóa giá trị thành công");
                    fetchValues();
                } else {
                    toast.error(res.message);
                }
            } catch {
                toast.error("Lỗi khi xóa giá trị");
            }
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            setFilterRequest(prev => ({
                ...prev,
                keyword: e.target.value,
                page: 0, // reset page về 0
            }));
        }
    };

    const handlePrevPage = () => {
        setFilterRequest(prev => ({
            ...prev,
            page: Math.max(prev.page - 1, 0),
        }));
    };
    const handleNextPage = () => {
        setFilterRequest(prev => ({
            ...prev,
            page: Math.min(prev.page + 1, totalPages - 1),
        }));
    };

    return (
        <>
            {/* Header Controls */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm giá trị"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 pl-10 w-64 focus:outline-none focus:border-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    </div>


                </div>

                <div className="flex items-center gap-4">
                    {/* Chọn sắp xếp */}
                    <select
                        value={sortType}
                        onChange={(e) => {
                            setFilterRequest(prev => ({
                                ...prev,
                                sortType: e.target.value,
                                page: 0,
                            }));
                            // setCurrentPage(1); // cập nhật state pagination nếu dùng riêng
                        }}

                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="ASC">Sắp xếp: id tăng dần</option>
                        <option value="DESC">Sắp xếp: id giảm dần</option>
                    </select>

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
                    <span className="text-slate-400">Giá trị / Trang</span>

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
                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-800 text-slate-400 text-sm font-semibold">
                    <div className="col-span-2">ID</div>
                    <div className="col-span-5">Giá trị (string)</div>
                    <div className="col-span-3">Giá trị (numeric)</div>
                    <div className="col-span-2 text-center">Hành động</div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-10">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : values.length === 0 ? (
                    <div className="text-center text-slate-400 py-6">Không có giá trị nào</div>
                ) : (
                    values.map((val) => (
                        <div
                            key={val.id}
                            className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-800 hover:bg-slate-800/50 transition"
                        >
                            <div className="col-span-2 font-medium">#{val.id}</div>
                            <div className="col-span-5">{val.strVal}</div>
                            <div className="col-span-3">{val.numericVal}</div>
                            <div className="col-span-2 text-center">
                                <button
                                    onClick={() => handleDelete(val.id)}
                                    className="text-slate-400 hover:text-white transition"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
