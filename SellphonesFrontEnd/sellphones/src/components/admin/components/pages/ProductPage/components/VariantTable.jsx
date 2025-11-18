// VariantTable.jsx
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminProductService from "../../../../service/AdminProductService";
import VariantFilterModal from "./VariantFilterModal";

export default function VariantTable({ productId, isReloaded }) {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [filterRequest, setFilterRequest] = useState({
    keyword: null,
    page: 0,
    size: perPage,

    minPrice: null,
    maxPrice: null,
    status: null,
  });

  const navigate = useNavigate();

  const fetchVariants = async () => {
    setLoading(true);

    const res = await AdminProductService.getProductVariants(productId,
      {
        ...filterRequest,
        keyword: searchTerm.trim() || null,
        page: currentPage - 1,
        size: perPage,
      });

    if (res.success) {
      setVariants(res.data.result || []);
      setTotalPages(res.data.totalPages || 1);
      setTotal(res.data.total || 0);
    }

    setLoading(false);
  };

  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchVariants();
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

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-600 text-white";
      case "INACTIVE":
        return "bg-red-600 text-white";
      default:
        return "bg-yellow-600 text-white";
    }
  };

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <>

      {/* Header Controls */}
      <div className="flex justify-between items-center mb-4">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Tìm SKU / tên variant"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 w-64 text-sm focus:outline-none focus:border-blue-500"
          />

          <span className="text-slate-400 text-xs">
            Tổng số variant: {total}
          </span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-lg hover:bg-slate-700 transition text-sm"
          >
            <Filter size={16} />
            Lọc
          </button>

          <div className="flex items-center gap-2">
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-blue-500"
            >
              <option>5</option>
              <option>10</option>
              <option>25</option>
            </select>
            <span className="text-slate-400 text-xs">/ trang</span>
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const page = Number(inputValue);
                  if (page >= 1 && page <= totalPages) setCurrentPage(page);
                  else setInputValue(currentPage);
                }
              }}
              className="w-12 text-center bg-gray-800 rounded px-1 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <span className="text-xs text-slate-400">/ {totalPages}</span>

            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="p-1.5 bg-slate-800 rounded hover:bg-slate-700 transition disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="p-1.5 bg-slate-800 rounded hover:bg-slate-700 transition disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>

        </div>
      </div>


      {/* Table */}
      <div className="bg-slate-900 rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 gap-4 px-6 py-4 border-b border-slate-800 text-slate-400 text-sm">
          <div>ID / SKU</div>
          <div>Ảnh</div>
          <div>Tên variant</div>
          <div>Giá gốc / Giá hiện tại</div>
          <div>Tồn kho</div>
          <div>Status</div>
          <div></div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : variants.length === 0 ? (
          <div className="text-center text-slate-400 py-6">Không có variant nào</div>
        ) : (
          variants.map((v) => (
            <div
              key={v.id}
              className="grid grid-cols-7 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition items-center"
            >
              <div>
                <div className="font-medium">#{v.id}</div>
                <div className="text-xs text-slate-400">{v.sku}</div>
              </div>

              <div>
                <img
                  src={v.variantImage}
                  className="w-12 h-12 object-cover rounded"
                  alt={v.productVariantName}
                />
              </div>

              <div className="text-slate-200 font-medium">{v.productVariantName}</div>

              <div>
                <div>{Number(v.rootPrice).toLocaleString("vi-VN")}₫</div>
                <div className="text-green-400 font-semibold">
                  {Number(v.currentPrice).toLocaleString("vi-VN")}₫
                </div>
              </div>

              <div className="text-slate-200">{v.stock}</div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    v.status
                  )}`}
                >
                  {v.status}
                </span>
              </div>

              <div className="text-center">
                <button
                  onClick={() => navigate(`/admin/products/${productId}/variants/view/${v.id}`)}
                  className="text-slate-400 hover:text-white transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <VariantFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleFilter}
      />
    </>
  );
}
