import React, { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, Search, Filter  } from "lucide-react";
import { toast } from "react-toastify";
import AdminGiftProductService from "../../../../service/AdminGiftProductService";
// import EditGiftProductModal from "./EditGiftProductModal";

export default function GiftProductTable({ isReloaded }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Phân trang + tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(currentPage);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const [filterRequest, setFilterRequest] = useState({
        name: null,
        page: 0,
        size: perPage,
    });

    const fetchProducts = async () => {
        setLoading(true);
        const res = await AdminGiftProductService.getGiftProducts({
            ...filterRequest,
            name: searchTerm.trim() || null,
            page: currentPage - 1,
            size: perPage,
        });

        if (res.success) {
            setProducts(res.data.result || []);
            setTotalPages(res.data.totalPages || 1);
            setTotal(res.data?.total || 0);
        } else {
            toast.error(res.message || "Không thể tải danh sách sản phẩm quà tặng");
        }

        setLoading(false);
    };

    const handleUpdate = async (id, data, file) => {
        const res = await AdminGiftProductService.updateGiftProduct(id, data, file);
        if (res.success) {
            toast.success("Cập nhật sản phẩm quà tặng thành công");
            fetchProducts();
        } else {
            toast.error(res.message || "Lỗi khi cập nhật");
        }
    };

    const handleDelete = async (id) => {
        const res = await AdminGiftProductService.deleteGiftProduct(id);
        if (res.success) {
            toast.success("Đã xóa sản phẩm quà tặng");
            fetchProducts();
        } else {
            toast.error(res.message || "Lỗi khi xóa");
        }
    };

    useEffect(() => setInputValue(currentPage), [currentPage]);
    useEffect(() => {
        fetchProducts();
    }, [currentPage, perPage, filterRequest, isReloaded]);

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            setFilterRequest({ ...filterRequest, name: searchTerm });
            setCurrentPage(1);
        }
    };

    return (
        <>
            {/* Header Controls */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm quà tặng"
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
                            setFilterRequest({ ...filterRequest, page: 0, size: newSize });
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                    </select>

                    <span className="text-slate-400">Quà tặng / Trang</span>

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
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50"
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
                    <div className="col-span-3">Tên sản phẩm</div>
                    <div className="col-span-2">Kho</div>
                    <div className="col-span-3">Ảnh</div>
                    <div className="col-span-2"></div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center text-slate-400 py-6">Không có sản phẩm quà tặng</div>
                ) : (
                    products.map((p) => {
                        const date = p.createdAt
                            ? new Date(p.createdAt)
                            : null;

                        const formattedDate = date
                            ? `${String(date.getDate()).padStart(2, "0")}/${String(
                                date.getMonth() + 1
                            ).padStart(2, "0")}/${date.getFullYear()}`
                            : "N/A";

                        return (
                            <div
                                key={p.id}
                                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition items-center"
                            >
                                <div className="col-span-2">
                                    <div className="font-medium">#{p.id}</div>
                                    <div className="text-slate-400 text-sm">{formattedDate}</div>
                                </div>

                                <div className="col-span-3">{p.name}</div>

                                <div className="col-span-2">{p.stock}</div>

                                <div className="col-span-3">
                                    {p.thumbnail ? (
                                        <img
                                            src={p.thumbnail}
                                            alt={p.name}
                                            className="w-20 h-12 object-cover rounded"
                                        />
                                    ) : (
                                        <span className="text-slate-400">Không có ảnh</span>
                                    )}
                                </div>

                                <div className="col-span-2 text-center">
                                    <button
                                        onClick={() => {
                                            setSelectedProduct(p);
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

            {/* <EditGiftProductModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                product={selectedProduct}
            /> */}
        </>
    );
}
