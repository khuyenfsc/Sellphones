import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, Phone, Home } from 'lucide-react';
import BrandService from '../../../service/BrandService';


const ProductsByCategoryPage = () => {
  const [activeFilter, setActiveFilter] = useState('Bộ lọc');
  const [brands, setBrands] = useState([]);
  const { slug } = useParams();


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
    if (slug) {
      fetchBrands();
    }
  }, [slug]);

  const hotSaleProducts = [
    {
      name: 'Samsung Galaxy S24 Plus 12GB 256GB',
      price: '16.390.000đ',
      oldPrice: '27.990.000đ',
      discount: 'Giảm 5%',
      installment: 'Không gói quà tặng trị giá tới 3,44 triệu đồng trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...',
      rating: 5,
      image: '📱',
      badge: 'Giảm 5%'
    },
    {
      name: 'Xiaomi POCO X7 Pro 5G 12GB 256GB - Chính hãng...',
      price: '9.090.000đ',
      oldPrice: '10.990.000đ',
      discount: 'Giảm 5%',
      installment: 'Không gói trả trước giá trị tới 1,89 triệu đồng trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...',
      rating: 5,
      image: '📱',
      badge: 'Giảm 5%'
    },
    {
      name: 'Samsung Galaxy A07 4GB 128GB',
      price: '3.190.000đ',
      oldPrice: '3.590.000đ',
      discount: 'Giảm 6%',
      installment: 'Không gói quà tặng trị giá tới 825,000đ trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...',
      rating: 5,
      image: '📱',
      badge: 'Giảm 6%'
    },
    {
      name: 'Samsung Galaxy A26 5G 8GB 128GB',
      price: '6.270.000đ',
      oldPrice: '8.090.000đ',
      discount: 'Giảm 6%',
      installment: 'Không gói quà tặng trị giá tới 1,32 triệu đồng trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...',
      rating: 4.8,
      image: '📱',
      badge: 'Giảm 6%'
    },
    {
      name: 'Samsung Galaxy A56 5G 8GB 128GB',
      price: '9.310.000đ',
      oldPrice: '11.990.000đ',
      discount: 'Giảm 5%',
      installment: 'Không gói quà tặng trị giá tới 1,96 triệu đồng trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...',
      rating: 4.9,
      image: '📱',
      badge: 'Giảm 5%'
    },
  ];

  const filters = [
    'Bộ lọc',
    'Săn hàng',
    'Hàng mới về',
    'Xem theo giá',
    'Nhu cầu sử dụng',
    'Chip xử lí',
    'Loại điện thoại',
    'Dung lượng RAM',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">Trang chủ</span>
              <span className="text-gray-400">/</span>
              <span className="text-sm font-medium text-black bg-white px-1 rounded">
                Điện thoại
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
        <span className="text-base font-bold mb-6 text-black block">Điện thoại</span>

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



        {/* Hot Sale Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-t-lg p-4 mb-0">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <h2 className="text-2xl font-bold">HOT SALE CUỐI TUẦN</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Kết thúc sau:</span>
              <div className="flex gap-1">
                {['03', '23', '51', '51'].map((num, idx) => (
                  <span key={idx} className="bg-white text-red-600 px-2 py-1 rounded font-bold text-sm">
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hot Sale Products */}
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
        </div>

        {/* Filter Bar */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Chọn theo tiêu chí</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${activeFilter === filter
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-red-600'
                  }`}
              >
                {filter}
                {idx === 0 && ' 🔻'}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['Bộ nhớ trong', 'Tính năng đặc biệt', 'Tính năng camera', 'Tần số quét', 'Kích thước màn hình', 'Kiểu màn hình', 'Công nghệ NFC', 'Tính năng đặc biệt', 'Nhu cầu sử dụng'].map((f, idx) => (
            <button key={idx} className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:border-red-600">
              {f} 🔻
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Sắp xếp theo</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg text-sm">
                📱 Phổ biến
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                💰 Khuyến mãi HOT
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                ⭐ Giá Thấp - Cao
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                ⭐ Giá Cao - Thấp
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid Placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="relative">
                {idx % 3 === 0 && (
                  <span className="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    Giảm {[5, 6, 33][idx % 3]}%
                  </span>
                )}
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-5xl">
                  📱
                </div>
              </div>
              <h3 className="text-sm font-medium mb-2 h-10 line-clamp-2">
                Điện thoại {idx + 1}
              </h3>
              <div className="text-red-600 font-bold">Giá tốt</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductsByCategoryPage;