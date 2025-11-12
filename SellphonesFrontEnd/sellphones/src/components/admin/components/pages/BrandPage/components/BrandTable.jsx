import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, Search } from "lucide-react";
import { toast } from "react-toastify";
import AdminBrandService from "../../../../service/AdminBrandService";
import EditBrandModal from "./EditBrandModal";

export default function BrandTable({ isReloaded }) {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

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

    const fetchBrands = async () => {
        setLoading(true);
        const res = await AdminBrandService.getBrands({
            ...filterRequest,
            keyword: searchTerm.trim() || null,
            page: currentPage - 1,
            size: perPage,
            sortType: sortType
        });
        if (res.success) {
            setBrands(res.data.result || []);
            setTotalPages(res.data.totalPages || 1);
            setTotal(res.data?.total || 0);
        } else {
            toast.error(res.message || "Không thể tải danh sách thương hiệu");
        }
        setLoading(false);
    };

    const handleUpdateBrand = async (brandId, brandData, file) => {
        try {
            const res = await AdminBrandService.updateBrand(brandId, brandData, file);

            if (res.success) {
                toast.success("Cập nhật thương hiệu thành công");
                fetchBrands(); // gọi lại danh sách sau khi cập nhật
            } else {
                toast.error(res.message || "Lỗi khi cập nhật thương hiệu");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi cập nhật thương hiệu");
        }
    };

    const handleDeleteBrand = async (brandId) => {
        try {
            const res = await AdminBrandService.deleteBrand(brandId);

            if (res.success) {
                toast.success("Đã xóa thương hiệu thành công");
                fetchBrands(); // gọi lại danh sách sau khi xóa
            } else {
                toast.error(res.message || "Lỗi khi xóa thương hiệu");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi xóa thương hiệu");
        }
    };

    useEffect(() => {
        setInputValue(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchBrands();
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
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm thương hiệu"
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
                    <select
                        value={perPage}
                        onChange={(e) => {
                            const newSize = Number(e.target.value);
                            setPerPage(newSize);
                            setCurrentPage(1);
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
                    <span className="text-slate-400">Thương hiệu / Trang</span>

                    <select
                        value={sortType}
                        onChange={(e) => {
                            setSortType(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="ASC">Sắp xếp: A → Z</option>
                        <option value="DESC">Sắp xếp: Z → A</option>
                    </select>

                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 flex items-center gap-1">
                            <input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        const newPage = Number(inputValue);
                                        if (newPage >= 1 && newPage <= totalPages) {
                                            setCurrentPage(newPage);
                                        } else {
                                            setInputValue(currentPage);
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
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 text-slate-400 text-sm">
                    <div className="col-span-2">ID / Ngày tạo</div>
                    <div className="col-span-4">Tên thương hiệu</div>
                    <div className="col-span-4">Ảnh</div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : brands.length === 0 ? (
                    <div className="text-center text-slate-400 py-6">Không có thương hiệu nào</div>
                ) : (
                    brands.map((brand) => {
                        const date = new Date(brand.createdAt);
                        const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
                            date.getMonth() + 1
                        ).padStart(2, "0")}/${date.getFullYear()} ${String(date.getHours()).padStart(
                            2,
                            "0"
                        )}:${String(date.getMinutes()).padStart(2, "0")}`;

                        return (
                            <div
                                key={brand.id}
                                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition items-center"
                            >
                                <div className="col-span-2">
                                    <div className="font-medium">#{brand.id}</div>
                                    <div className="text-slate-400 text-sm">{formattedDate}</div>
                                </div>
                                <div className="col-span-4">{brand.name}</div>
                                <div className="col-span-4">
                                    {brand.brandIcon ? (
                                        <img
                                            src={brand.brandIcon}
                                            alt={brand.name}
                                            className="w-20 h-12 object-contain rounded"
                                        />
                                    ) : (
                                        <span className="text-slate-400 text-sm">Không có ảnh</span>
                                    )}
                                </div>
                                <div className="col-span-2 text-center">
                                    <button
                                        onClick={() => {
                                            setSelectedBrand(brand);
                                            setIsEditModalOpen(true);
                                        }}
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

            <EditBrandModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onUpdate={handleUpdateBrand}
                onDelete={handleDeleteBrand}
                brand={selectedBrand}
            />
        </>
    );
}
