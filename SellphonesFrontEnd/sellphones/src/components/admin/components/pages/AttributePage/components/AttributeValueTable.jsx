import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import AdminAttributeService from "../../../../service/AdminAttributeService";
import EditAttributeValueModal from "./EditAttributeValueModal";

export default function AttributeValueTable({ attributeId, isReloaded }) {
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditValueModalOpen, setIsEditValueModalOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    // Search & Pagination & Sorting
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(currentPage);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [sortType, setSortType] = useState("ASC");
    const [filterRequest, setFilterRequest] = useState({
        attributeId,
        keyword: null,
        page: currentPage - 1,
        size: perPage,
        sortType: sortType,
    });



    const fetchValues = async () => {
        setLoading(true);
        try {
            const res = await AdminAttributeService.getAttributeValues(
                {
                    ...filterRequest,
                    keyword: searchTerm?.trim() || null,
                    page: currentPage - 1,
                    size: perPage,
                    sortType: sortType
                }
            );
            if (res.success) {
                setValues(res.data.result || []);
                setTotalPages(res.data.totalPages || 1);
                setTotal(res.data?.total || 0);
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
        setInputValue(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchValues();
    }, [filterRequest, isReloaded, currentPage, perPage, sortType]);

    const handleUpdateValue = async (valueId, valueData) => {
        try {
            const res = await AdminAttributeService.updateValue(valueId, valueData);

            if (res.success) {
                toast.success("Cập nhật giá trị thuộc tính thành công");
                fetchValues();
            } else {
                toast.error(res.message || "Lỗi khi cập nhật giá trị thuộc tính");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi cập nhật giá trị thuộc tính");
        }
    };

    const handleDeleteValue = async (valueId) => {
        try {
            const res = await AdminAttributeService.deleteValue(valueId);

            if (res.success) {
                toast.success("Đã xóa giá trị thành công");
                fetchValues();
            } else {
                toast.error(res.message || "Lỗi khi xóa giá trị");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi xóa giá trị");
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            setFilterRequest({
                ...filterRequest,
                keyword: searchTerm?.trim() || null,
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
                    <span className="text-slate-400 text-sm">
                        Tổng số kết quả: {total}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    {/* Chọn sắp xếp */}
                    <select
                        value={sortType}
                        onChange={(e) => {
                            setSortType(e.target.value);
                            setCurrentPage(1);
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
                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-800 text-slate-400 text-sm font-semibold">
                    <div className="col-span-2">ID</div>
                    <div className="col-span-5">Giá trị (string)</div>
                    <div className="col-span-3">Giá trị (numeric)</div>
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
                                    onClick={() => {
                                        setSelectedValue(val);
                                        setIsEditValueModalOpen(true)
                                    }}
                                    className="text-slate-400 hover:text-white transition"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <EditAttributeValueModal
                isOpen={isEditValueModalOpen}
                onClose={() => setIsEditValueModalOpen(false)}
                value={selectedValue}
                onUpdate={handleUpdateValue}
                onDelete={handleDeleteValue}
            />
        </>
    );
}
