// ProductTable.jsx
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminProductService from "../../../../service/AdminProductService";
import ProductFilterModal from "./ProductFilterModal";


export default function ProductTable({ isReloaded }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [filterRequest, setFilterRequest] = useState({
    keyword: null,
    page: 0,
    size: perPage,
  });

  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);

    const res = await AdminProductService.getProducts({
      ...filterRequest,
      keyword: searchTerm.trim() || null,
      page: currentPage - 1,
      size: perPage,
    });

    if (res.success) {
      setProducts(res.data.result || []);
      setTotalPages(res.data.totalPages || 1);
      setTotal(res.data?.total || 0);
    }

    setLoading(false);
  };


  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, perPage, filterRequest, isReloaded]);


  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      setFilterRequest({
        ...filterRequest,
        keyword: searchTerm,
      });
      setCurrentPage(1);
    }
  };

  const handleFilter = (filters) => {
    const cleanFilters = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value != null) {
        cleanFilters[key] = value;
      }
    });

    setFilterRequest({
      ...cleanFilters,
      page: 0,
    });

    setCurrentPage(1);
  };

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      {/* Header Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên/danh mục/thương hiệu"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 w-80 focus:outline-none focus:border-blue-500"
          />

          <span className="text-slate-400 text-sm">Tổng số kết quả: {total}</span>
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
            }}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option>5</option>
            <option>10</option>
            <option>25</option>
          </select>
          <span className="text-slate-400">Sản phẩm / Trang</span>

          <div className="flex items-center gap-2">
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
        <div className="grid grid-cols-8 gap-4 px-6 py-4 border-b border-slate-800 text-slate-400 text-sm">
          <div>ID / Ngày tạo / Status</div>
          <div>Thumbnail / Rating</div>
          <div>Tên sản phẩm</div>
          <div>Giá gốc / Giá hiện tại</div>
          <div>Is New</div>
          <div>Is Featured</div>
          <div></div>
        </div>

        {/* Body */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-slate-400 py-6">Không có sản phẩm nào</div>
        ) : (
          products.map((prod) => {
            const date = prod.createdAt ? new Date(prod.createdAt) : null;
            const formattedDate = date
              ? `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(
                2,
                "0"
              )}/${date.getFullYear()} ${String(date.getHours()).padStart(2, "0")}:${String(
                date.getMinutes()
              ).padStart(2, "0")}`
              : "-";

            const getProductStatusColor = (status) => {
              switch (status) {
                case "ACTIVE":
                  return "bg-green-600 text-white";
                case "INACTIVE":
                  return "bg-red-600 text-white";
                default:
                  return "bg-yellow-600 text-white";
              }
            };


            return (
              <div
                key={prod.id}
                className="grid grid-cols-8 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition items-center"
              >
                <div>
                  <div className="font-medium">#{prod.id}</div>
                  <div className="text-xs text-slate-400">{formattedDate}</div>
                  <div
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getProductStatusColor(
                      prod.status
                    )}`}>
                    {prod.status}
                  </div>

                </div>
                <div className="flex items-center gap-2">
                  <img src={prod.thumbnail} alt={prod.name} className="w-12 h-12 object-cover rounded" />
                  <span className="text-yellow-400 font-semibold">{prod.averageRating?.toFixed(1) || "-"}</span>
                </div>
                <div>{prod.name}</div>
                <div>
                  <div>{prod.productThumbnail?.rootPrice?.toLocaleString()}₫</div>
                  <div className="text-green-400 font-semibold">{prod.productThumbnail?.currentPrice?.toLocaleString()}₫</div>
                </div>
                <div>
                  {prod.isNew ? <span className="text-blue-400 font-semibold">Mới</span> : <span className="text-slate-400">-</span>}
                </div>
                <div>
                  {prod.isFeatured ? <span className="text-green-400 font-semibold">Nổi bật</span> : <span className="text-slate-400">-</span>}
                </div>
                <div className="text-center">
                  <button
                    onClick={() => navigate(`/admin/products/view/${prod.id}`)}
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

      <ProductFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleFilter}
      />
    </>
  );
}
