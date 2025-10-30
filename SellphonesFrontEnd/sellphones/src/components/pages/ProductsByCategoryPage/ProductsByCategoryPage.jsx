import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Home, Package } from 'lucide-react';
import ProductGrid from '../../product/ProductGrid';
import BrandService from '../../../service/BrandService';
import CategoryService from '../../../service/CategoryService';
import ProductService from '../../../service/ProductService';


const ProductsByCategoryPage = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [activeFilterGroup, setActiveFilterGroup] = useState(null);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState("desc"); // mặc định giảm dần
  const [loading, setLoading] = useState(false); // ✅ thêm state loading
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000000 });
  const { slug } = useParams();
  const categoryName = decodeURIComponent(slug);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brandId = params.get("brand");
    setSelectedBrandId(brandId ? parseInt(brandId) : null);
  }, []);

  const toggleFilterGroup = (groupName) => {
    setActiveFilterGroup((prev) => (prev === groupName ? null : groupName));
  };

  const handleSelectOption = (filterGroup, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [filterGroup.name]: {
        groupId: filterGroup.id,
        groupName: filterGroup.name,
        optionName: option.name,
        condition: option.condition
      },
    }));
  };

  const handleSelectBrand = (brandId) => {
    setSelectedBrandId((prev) => (prev === brandId ? null : brandId)); // bấm lại để bỏ chọn
  };


  const handleApplyFilters = async () => {
    setLoading(true);

    try {
      const staticParams = {
        categoryName: slug,
        brandId: selectedBrandId,
        priceRange: `${priceRange.min}-${priceRange.max}`,
      };

      const { products, totalPages } = await ProductService.getProductsByFilters(
        selectedOptions,
        staticParams,
        currentPage - 1,
        5,
        sort
      );

      setProducts(products);
      setTotalPages(totalPages);
    } catch (err) {
      console.error("Lỗi khi lọc sản phẩm:", err);
    } finally {
      setLoading(false);
      setActiveFilterGroup(null);
    }
  };



  // Xóa option
  const handleRemoveFilter = (filterName) => {
    setSelectedOptions((prev) => {
      const newOptions = { ...prev };
      delete newOptions[filterName];
      return newOptions;
    });
  };


  useEffect(() => {
    const fetchBrands = async () => {
      const data = await BrandService.getByCategoryName(slug);
      setBrands(data);
    };

    const fetchFilters = async () => {
      const data = await CategoryService.getFiltersByCategoryName(slug);
        setFilters(data);
    };

    if (slug) {
      fetchBrands();
      fetchFilters();
    }
  }, [slug]);

  useEffect(() => {
    handleApplyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, selectedBrandId, currentPage]);



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">
                <a href="/" className="hover:underline text-blue-600">
                  Trang chủ
                </a>
              </span>              
              <span className="text-gray-400">/</span>
              <span className="text-sm font-medium text-black bg-white px-1 rounded">
                {categoryName}
              </span>
            </div>

          </div>
        </div>

      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Title */}
        <span className="text-base font-bold mb-6 text-black block">{categoryName}</span>

        {/* Brand Filters */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-4">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleSelectBrand(brand.id)}
                className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:border-red-500 hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                {/* Logo brand */}
                <img
                  src={brand.brandIcon}
                  alt={brand.name}
                  className="w-14 h-14 mb-2 object-contain"  // <-- tăng kích thước logo ở đây
                />
                <span className="text-sm font-medium text-gray-700">{brand.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-black mb-4">Chọn theo tiêu chí</h2>

          <div className="flex flex-wrap items-center justify-between gap-3 w-full">
            {/* Nhóm filter */}
            <div className="flex flex-wrap gap-2 flex-grow">
              {filters?.map((filterGroup, idx) => (
                <div key={idx} className="relative">
                  <button
                    onClick={() => toggleFilterGroup(filterGroup.name)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${activeFilterGroup === filterGroup.name
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-red-600"
                      }`}
                  >
                    {filterGroup.name} 🔻
                  </button>

                  {activeFilterGroup === filterGroup.name && (
                    <div className="absolute mt-2 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-56">
                      <div className="space-y-1">
                        {filterGroup.filterOptions?.map((option, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => {
                              handleSelectOption(filterGroup, option);
                              setActiveFilterGroup(null); // 👈 đóng popup ngay sau khi chọn
                            }}
                            className={`block w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selectedOptions[filterGroup.name]?.condition === option.condition
                              ? "bg-red-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                              }`}
                          >
                            {option.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Bộ lọc giá */}
              <div className="relative">
                <button
                  onClick={() => toggleFilterGroup("Giá")}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${activeFilterGroup === "Giá"
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-red-600"
                    }`}
                >
                  Giá 🔻
                </button>

                {activeFilterGroup === "Giá" && (
                  <div className="absolute mt-2 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-64">
                    <span className="block text-sm font-medium text-gray-800 mb-2">Khoảng giá (₫)</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={500000000}
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) }))
                        }
                        className="w-28 border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:border-red-500"
                        placeholder="Từ"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        min={0}
                        max={500000000}
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))
                        }
                        className="w-28 border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:border-red-500"
                        placeholder="Đến"
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-2">
                      {priceRange.min.toLocaleString()} ₫ - {priceRange.max.toLocaleString()} ₫
                    </div>
                    <button
                      onClick={() => {
                        // chỉ đóng popup, không set selectedOptions
                        setActiveFilterGroup(null);
                      }}
                      className="mt-3 w-full bg-red-600 text-white text-sm font-medium py-1.5 rounded-md hover:bg-red-700 transition-all"
                    >
                      Áp dụng
                    </button>

                  </div>
                )}
              </div>
            </div>

            {/* Nút lọc tổng */}
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-all"
            >
              Lọc
            </button>
          </div>

          {/* Danh sách tiêu chí đã chọn */}
          {Object.keys(selectedOptions).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(selectedOptions).map(([filterName, option]) => (
                <div
                  key={filterName}
                  className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-800"
                >
                  <span className="font-medium">
                    {filterName}: {option.name}
                  </span>
                  <button
                    onClick={() => handleRemoveFilter(filterName)}
                    className="text-gray-500 hover:text-red-600 font-bold"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Hiển thị khoảng giá đã chọn */}
          {(priceRange.min > 0 || priceRange.max < 500000000) && (
            <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-800">
              <span className="font-medium">
                Giá: {priceRange.min.toLocaleString()} - {priceRange.max.toLocaleString()} ₫
              </span>
              <button
                onClick={() =>
                  setPriceRange({ min: 0, max: 500000000 }) // reset giá về mặc định
                }
                className="text-gray-500 hover:text-red-600 font-bold"
              >
                ✖
              </button>
            </div>
          )}
        </div>

        {/* Hiển thị Brand đã chọn */}
        {selectedBrandId && (
          <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-800 mt-2">
            <span className="font-medium">
              Thương hiệu: {brands.find((b) => b.id === selectedBrandId)?.name}
            </span>
            <button
              onClick={() => setSelectedBrandId(null)}
              className="text-gray-500 hover:text-red-600 font-bold"
            >
              ✖
            </button>
          </div>
        )}



        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setSort("asc")}
            className={`px-4 py-2 border rounded-lg text-sm transition-all ${sort === "asc"
              ? "bg-red-600 text-white border-red-600"
              : "border-gray-300 text-black"
              }`}
          >
            ↑ Giá Thấp - Cao
          </button>

          <button
            onClick={() => setSort("desc")}
            className={`px-4 py-2 border rounded-lg text-sm transition-all ${sort === "desc"
              ? "bg-red-600 text-white border-red-600"
              : "border-gray-300 text-black"
              }`}
          >
            ↓ Giá Cao - Thấp
          </button>
        </div>

        {/* Product Grid Placeholder */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-700 font-medium">Đang tải sản phẩm...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <ProductGrid products={products} />

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 gap-4 flex-wrap">
              {/* Nút Trang trước */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`px-3 py-2 rounded-lg border text-sm ${currentPage === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-white hover:bg-red-50 border-red-400 text-red-500'
                  }`}
              >
                Trang trước
              </button>

              {/* Dropdown chọn trang */}
              <div className="flex items-center gap-2">
                <p className="text-gray-700 font-medium">Trang</p>
                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm 
             focus:ring-2 focus:ring-red-400 focus:outline-none 
             bg-white text-black"
                  size={1} // hiển thị dạng dropdown
                >
                  {Array.from({ length: totalPages }, (_, i) => (
                    <option
                      key={i + 1}
                      value={i + 1}
                      className="bg-white text-black" // bảo đảm màu cho từng option
                    >
                      {i + 1}
                    </option>
                  ))}
                </select>

                <p className="text-gray-700 font-medium">/ {totalPages}</p>
              </div>

              {/* Nút Trang sau */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`px-3 py-2 rounded-lg border text-sm ${currentPage === totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-white hover:bg-red-50 border-red-400 text-red-500'
                  }`}
              >
                Trang sau
              </button>
            </div>


          </>

        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Package className="w-10 h-10 mb-2" />
            <p>Không tìm thấy sản phẩm phù hợp</p>
          </div>
        )}


      </main>
    </div>
  );
};

export default ProductsByCategoryPage;