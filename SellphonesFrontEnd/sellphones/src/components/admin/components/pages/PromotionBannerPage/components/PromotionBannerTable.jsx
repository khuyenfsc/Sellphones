import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, Search, Filter } from "lucide-react";
import { toast } from "react-toastify";
import AdminPromotionBannerService from "../../../../service/AdminPromotionBannerService";
import BannerFilterModal from "./BannerFilterModal"; // 
import EditBannerModal from "./EditBannerModal";

export default function PromotionBannerTable({ isReloaded }) {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState(null);

    // Filter modal
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filterRequest, setFilterRequest] = useState({
        status: "",
        sortType: "ASC",
        page: 0,
        size: 5,
    });

    // Phân trang + tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(currentPage);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchBanners = async () => {
        setLoading(true);
        const res = await AdminPromotionBannerService.getBanners({
            ...filterRequest,
            name: searchTerm.trim() || null,
            page: currentPage - 1,
            size: perPage,
        });
        if (res.success) {
            setBanners(res.data.result || []);
            setTotalPages(res.data.totalPages || 1);
            setTotal(res.data?.total || 0);
        } else {
            toast.error(res.message || "Không thể tải danh sách banner");
        }
        setLoading(false);
    };

    const handleUpdateBanner = async (bannerId, bannerData, file) => {
        try {
            const res = await AdminPromotionBannerService.updateBanner(bannerId, bannerData, file);

            if (res.success) {
                toast.success("Cập nhật banner thành công");
                fetchBanners(); // gọi lại danh sách banner sau khi cập nhật
            } else {
                toast.error(res.message || "Lỗi khi cập nhật banner");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi cập nhật banner");
        }
    };

    const handleDeleteBanner = async (bannerId) => {
        try {
            const res = await AdminPromotionBannerService.deleteBanner(bannerId);

            if (res.success) {
                toast.success("Đã xóa banner thành công");
                fetchBanners(); // gọi lại danh sách banner sau khi xóa
            } else {
                toast.error(res.message || "Lỗi khi xóa banner");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi xóa banner");
        }
    };


    useEffect(() => {
        setInputValue(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchBanners();
    }, [currentPage, perPage, filterRequest, isReloaded]);

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            setFilterRequest((prev) => ({ ...prev, name: searchTerm }));
            setCurrentPage(1);
        }
    };

    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const handleApplyFilter = (filters) => {
        setFilterRequest({
            ...filterRequest,
            ...filters,
            page: 0, // reset về trang 1
        });
        setCurrentPage(1);
        setIsFilterModalOpen(false);
    };

    const handleEditClick = (banner) => {
        setSelectedBanner(banner);
        setIsEditModalOpen(true);
    };

    return (
        <>
            {/* Top bar: search, filter, per page */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm banner"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 pl-10 w-64 focus:outline-none focus:border-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    </div>

                    <span className="text-slate-400 text-sm">Tổng số kết quả: {total}</span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsFilterModalOpen(true)}
                        className="flex items-center gap-1 px-3 py-2 bg-slate-800 rounded hover:bg-slate-700 transition"
                    >
                        <Filter size={16} /> Lọc
                    </button>
                    <select
                        value={perPage}
                        onChange={(e) => {
                            const newSize = Number(e.target.value);
                            setPerPage(newSize);
                            setCurrentPage(1);
                            setFilterRequest({ ...filterRequest, page: 0, size: newSize });
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                    </select>
                    <span className="text-slate-400">Banner / Trang</span>

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
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className="p-2 bg-slate-800 rounded hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                            <ChevronLeft size={18} />
                        </button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="p-2 bg-slate-800 rounded hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Banner table */}
            <div className="bg-slate-900 rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 text-slate-400 text-sm items-center">
                    <div className="col-span-2 flex flex-col justify-center">ID / Ngày tạo</div>
                    <div className="col-span-3 flex items-center">Tên banner</div>
                    <div className="col-span-3 flex justify-center items-center">Ảnh</div>
                    <div className="col-span-2 flex justify-center items-center">Trạng thái</div>
                    <div className="col-span-2 flex justify-center items-center">Hành động</div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : banners.length === 0 ? (
                    <div className="text-center text-slate-400 py-6">Không có banner nào</div>
                ) : (
                    banners.map((banner) => {
                        const date = banner.createdAt ? new Date(banner.createdAt) : null;
                        const formattedDate = date
                            ? `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
                            : "-";

                        return (
                            <div key={banner.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition items-center">
                                <div className="col-span-2 flex flex-col justify-center">
                                    <div className="font-medium">#{banner.id}</div>
                                    <div className="text-slate-400 text-sm">{formattedDate}</div>
                                </div>
                                <div className="col-span-3 flex items-center">{banner.name}</div>
                                <div className="col-span-3 flex justify-center items-center">
                                    {banner.image ? (
                                        <img src={banner.image} alt={banner.name} className="w-24 h-12 object-contain rounded" />
                                    ) : (
                                        <span className="text-slate-400 text-sm">Không có ảnh</span>
                                    )}
                                </div>
                                <div className="col-span-2 flex justify-center items-center">{banner.status}</div>
                                <div className="col-span-2 flex justify-center items-center">
                                    <button
                                        className="text-slate-400 hover:text-white transition"
                                        onClick={() => handleEditClick(banner)}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Filter modal */}
            <BannerFilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={handleApplyFilter}
            />


            <EditBannerModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onUpdate={handleUpdateBanner}
                onDelete={handleDeleteBanner}
                banner={selectedBanner}
            />
        </>
    );
}
