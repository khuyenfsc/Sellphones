import React, { useEffect, useState } from 'react';
import { ChevronRight, Heart, Star } from 'lucide-react';
import BrandService from '../../../../service/BrandService';

const FeaturedProductsSection = ({ categoryName }) => {
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [activeTab, setActiveTab] = useState('phone');

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

    if (categoryName) fetchBrands();
  }, [categoryName]);

  // Giữ nguyên danh sách products mẫu (nếu bạn chưa có API sản phẩm)
  const products = [
    {
      id: 1,
      name: 'iPhone 16 Pro Max 256GB | Chính hãng',
      price: '30.490.000₫',
      oldPrice: '34.990.000₫',
      discount: 'Giảm 13%',
      installment: 'Trả góp 0%',
      rating: 4.9,
      image: '/api/placeholder/200/200',
      promo: 'Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...',
      bgColor: 'bg-gray-100',
    },
    // ... các sản phẩm khác
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Tabs */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around py-4">
            <button className="text-red-600 font-semibold border-b-2 border-red-600 pb-2">
              {categoryName?.toUpperCase() || 'SẢN PHẨM'}
            </button>
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
              brands.map((brand, idx) => (
                <button
                  key={brand.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm whitespace-nowrap border-gray-300 hover:border-gray-400 text-black`}
                >
                  {brand.name}
                </button>
              ))
            ) : (
              <span className="text-gray-500 text-sm">Không có thương hiệu nào</span>
            )}
            <button className="flex items-center gap-1 px-4 py-2 text-blue-600 text-sm whitespace-nowrap">
              Xem tất cả <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-4 gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white text-black rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Product Image */}
              <div className={`relative ${product.bgColor} p-4`}>
                {product.discount && (
                  <span className="absolute top-1 left-1 bg-red-600 text-white text-[11px] px-1.5 py-0.5 rounded">
                    {product.discount}
                  </span>
                )}
                {product.installment && (
                  <span className="absolute top-1 right-1 bg-blue-100 text-blue-700 text-[11px] px-1.5 py-0.5 rounded">
                    {product.installment}
                  </span>
                )}
                <div className="aspect-square flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-28 h-28 object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="text-base font-semibold mb-1.5 line-clamp-2 text-gray-900">
                  {product.name}
                </h3>

                <div className="mb-1.5">
                  <span className="text-red-600 font-bold text-base">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-gray-500 text-xs line-through ml-1 block">{product.oldPrice}</span>
                  )}
                </div>

                {product.promo && (
                  <p className="text-xs text-gray-700 mb-2 line-clamp-2">{product.promo}</p>
                )}

                {/* Rating & Favorite */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-0.5 text-gray-800">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Heart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsSection;
