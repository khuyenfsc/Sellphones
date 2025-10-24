import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, Phone, Home } from 'lucide-react';
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
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000000 });
  const { slug } = useParams();
  const categoryName = decodeURIComponent(slug);


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


  const handleApplyFilters = async () => {
    // Chuyển selectedOptions → dynamic conditions
    const dynamicFilters = {};

    Object.entries(selectedOptions).forEach(([groupName, option]) => {
      // Mặc định group "Giá" thì parse condition theo price-min-max
      const groupId = option.groupId; // 👈 lấy id của nhóm filter
      const condition = option.condition;

      if (groupName === "Giá" && condition.includes("-")) {
        const [min, max] = condition.split("-");
        dynamicFilters["price"] = `${min}-${max}`;
      } else {
        // Các filter khác như Màu sắc, RAM, Dung lượng...
        dynamicFilters[groupId] = condition;
      }
    });

    // Body request
    const filterRequest = {
      query: {
        _static: {
          categoryName: slug, // lấy từ useParams
          brandId: selectedOptions["Thương hiệu"]?.condition || null,
        },
        dynamic: dynamicFilters,
      },
      page: 0,
      size: 10,
      sort: "desc",
    };

    console.log("Filter body gửi đi:", filterRequest);

    try {
      const res = await ProductService.getProductsByFilters(filterRequest);
      console.log("Kết quả lọc sản phẩm:", res.data);
      setProducts(res.data?.products?.result || [])
    } catch (err) {
      console.error("Lỗi khi lọc sản phẩm:", err);
    }

    setActiveFilterGroup(null); // đóng dropdown
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
      try {
        const res = await BrandService.getByCategoryName(slug);
        setBrands(res.data?.result || []);
      } catch (err) {
        console.error('Lỗi khi tải danh sách thương hiệu:', err);
      } finally {
      }
    };

    const fetchFilters = async () => {
      try {
        const res = await CategoryService.getFilterByCategoryName(slug);
        setFilters(res.data?.result || []);
      } catch (err) {
        console.error('Lỗi khi tải danh sách bộ lọc:', err);
      } finally {
      }
    };

    if (slug) {
      fetchBrands();
      fetchFilters();
    }
  }, [slug]);

  useEffect(() => {
    handleApplyFilters(); // 👈 Gọi ngay khi component được mount
  }, []); // [] đảm bảo chỉ chạy 1 lần khi trang tải


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
              </span>              <span className="text-gray-400">/</span>
              <span className="text-sm font-medium text-black bg-white px-1 rounded">
                {categoryName}
              </span>
            </div>

          </div>
        </div>


        {/* <div className="bg-gradient-to-r from-red-50 to-pink-50 py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600">iPhone nhập khẩu từng có</p>
                <p className="text-red-600 font-bold">Giá đài cổ tên tuổi 5 triệu</p>
                <button className="mt-2 px-4 py-1 bg-red-600 text-white rounded-full text-sm">
                  Tìm ngay
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
                <h3 className="text-2xl font-bold">TECNO</h3>
                <p className="text-xl">SPARK 40 Pro+</p>
                <p className="mt-2">Giá chỉ 5.190.000đ</p>
                <button className="mt-3 px-4 py-1 bg-white text-blue-600 rounded-full text-sm font-medium">
                  MUA NGAY
                </button>
              </div>

              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 text-white">
                <p className="text-sm">5-Teacher Giảm thêm 5%</p>
                <p className="text-lg">Lên đến giá trị</p>
                <p className="text-3xl font-bold">500k <span className="text-sm">giảm</span></p>
                <p className="text-red-500 font-bold">29%</p>
                <button className="mt-2 px-4 py-1 bg-white text-gray-900 rounded-full text-sm">
                  MUA NGAY
                </button>
              </div>
            </div>
          </div>
        </div> */}
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

        {/* Hot Sale Products
        <div className="bg-white rounded-b-lg p-4 shadow-lg mb-6">
          <div className="relative">
            <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {hotSaleProducts.map((product, idx) => (
                <div key={idx} className="border border-red-200 rounded-lg p-3 hover:shadow-xl transition-all relative bg-gradient-to-b from-white to-red-50">
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    {product.badge}
                  </div>
                  <div className="absolute top-2 right-2">
                    <Heart className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="text-6xl text-center mb-3 mt-6">{product.image}</div>

                  <h3 className="text-sm font-medium mb-2 h-10 line-clamp-2">{product.name}</h3>

                  <div className="mb-2">
                    <span className="text-red-600 font-bold text-lg">{product.price}</span>
                    <span className="text-gray-400 line-through text-xs ml-2">{product.oldPrice}</span>
                  </div>

                  <p className="text-xs text-gray-600 mb-3 h-12 line-clamp-3">{product.installment}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <button className="text-blue-600 text-sm flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      Yêu thích
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div> */}
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
                        handleSelectOption("Giá", {
                          name: `${priceRange.min.toLocaleString()} - ${priceRange.max.toLocaleString()} ₫`,
                          condition: `${priceRange.min}-${priceRange.max}`,
                        });
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
        </div>


        {/* Sort Options */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-black">Sắp xếp theo</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-black">
                ↑ Giá Thấp - Cao
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-black">
                ↓ Giá Cao - Thấp
              </button>

            </div>
          </div>
        </div>

        {/* Product Grid Placeholder */}
        <ProductGrid products={products} />
      </main>
    </div>
  );
};

export default ProductsByCategoryPage;