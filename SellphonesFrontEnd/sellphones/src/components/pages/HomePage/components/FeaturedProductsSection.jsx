import React, { useEffect, useState } from 'react';
import { ChevronRight, Heart, Star } from 'lucide-react';
import BrandService from '../../../../service/BrandService';
import ProductService from '../../../../service/ProductService';
import ProductGrid from '../../../product/ProductGrid';

const FeaturedProductsSection = ({ categoryName }) => {
  const [brands, setBrands] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoadingBrands(true);
        const encodedCategory = encodeURIComponent(categoryName);
        const res = await BrandService.getByCategoryName(encodedCategory);
        setBrands(res.data?.result || []);
      } catch (err) {
        console.error('Lỗi khi tải danh sách thương hiệu:', err);
      } finally {
        setLoadingBrands(false);
      }
    };

    const fetchFeaturedProducts = async () => {
      try {
        const encodedCategory = encodeURIComponent(categoryName);
        const res = await ProductService.getFeaturedProductsByCategoryName(encodedCategory);
        setFeaturedProducts(res.data?.result || []);
      } catch (err) {
        console.error('Lỗi khi tải danh sách sản phẩm:', err);
      } finally {
      }
    };

    if (categoryName) {
      fetchBrands();
      fetchFeaturedProducts();
    }
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Tabs */}
      <div className="bg-red-50/80 border-b sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around py-4">
            <span className="text-red-600 font-bold text-lg tracking-wide">
              {categoryName?.toUpperCase() || 'SẢN PHẨM'}
            </span>
          </div>
        </div>
      </div>



      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Brand Filter */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3 overflow-x-auto">
            {loadingBrands ? (
              <span className="text-gray-500 text-sm">Đang tải thương hiệu...</span>
            ) : brands.length > 0 ? (
              brands.map((brand) => (
                <a
                  key={brand.id}
                  href={`/category/${encodeURIComponent(categoryName)}?brand=${brand.id}`} // 👉 chuyển hướng thật sự
                  className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm whitespace-nowrap border-gray-300 hover:border-gray-400 text-black"
                >
                  {brand.name}
                </a>
              ))
            ) : (
              <span className="text-gray-500 text-sm">Không có thương hiệu nào</span>
            )}
            <a
              href={`/category/${encodeURIComponent(categoryName)}`}
              className="flex items-center gap-1 px-4 py-2 text-blue-600 text-sm whitespace-nowrap hover:underline"
            >
              Xem tất cả <ChevronRight size={16} />
            </a>

          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={featuredProducts} />


      </div>
    </div>
  );
};

export default FeaturedProductsSection;
