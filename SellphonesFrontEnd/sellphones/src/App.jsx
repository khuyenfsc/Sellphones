import React, { useState } from 'react';
import { Search, ShoppingCart, User, ChevronDown, ChevronRight, ChevronLeft, Gift, Tag, Laptop, Smartphone } from 'lucide-react';

export default function CellphoneSHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { icon: '📱', name: 'Điện thoại' },
    { icon: '📱', name: 'Tablet' },
    { icon: '💻', name: 'Laptop' }
  ];

  const promos = [
    { title: 'iPhone trợ giá', value: 'đến 5 triệu' },
    { title: 'Samsung trợ giá', value: 'đến 4 triệu' },
    { title: 'Laptop trợ giá', value: 'đến 4 triệu' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Red Bar
      <div className="bg-red-500 text-white text-xs py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap">
            <span>📅 Tháng - Xuất VAT đầy đủ</span>
            <span>🚚 Giao nhanh - Miễn phí cho đơn 300k</span>
            <span>🌿 Thu cũ giá ngon - Lên đời tiết kiệm</span>
            <span>📦 Sản phẩm Chính</span>
            <span>🏪 Cửa hàng gần bạn</span>
            <span>📋 Tra cứu đơn hàng</span>
            <span>📞 1800 2097</span>
          </div>
        </div>
      </div> */}

      {/* Header */}
      <header className="bg-blue-500 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              sellphones
            </h1>

            {/* Category Dropdown */}
            <button className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 backdrop-blur-md hover:bg-indigo-600 transition-colors duration-300">
              <span className="text-sm font-medium">Danh mục</span>
              <ChevronDown size={16} />
            </button>

            {/* Search */}
            <div className="w-[350px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Bạn muốn mua gì hôm nay?"
                  className="w-full px-3 py-1.5 rounded-md bg-white text-gray-800 outline-none shadow-sm focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute right-3 top-2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Cart & Login */}
            <div className="flex items-center gap-4 ml-auto">
              <button className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 backdrop-blur-md hover:bg-indigo-600 transition-colors duration-300">
                <ShoppingCart size={20} />
                <span className="text-sm font-medium">Giỏ hàng</span>
              </button>

              <button className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 backdrop-blur-md hover:bg-indigo-600 transition-colors duration-300">
                <User size={20} />
                <span className="text-sm font-medium">Đăng nhập</span>
              </button>
            </div>
          </div>
        </div>
      </header>


      {/* Quick Nav */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-3 overflow-x-auto">
            <div className="text-center whitespace-nowrap">
              <div className="text-sm font-semibold text-gray-700">MỪNG KHAI TRƯƠNG</div>
              <div className="text-xs text-gray-500">Ưu đãi cực khủng</div>
            </div>
            <div className="text-center whitespace-nowrap">
              <div className="text-sm font-semibold text-gray-700">IPHONE 17 SERIES</div>
              <div className="text-xs text-gray-500">Mua ngay</div>
            </div>
            <div className="text-center whitespace-nowrap">
              <div className="text-sm font-semibold text-gray-700">GALAXY Z7 SERIES</div>
              <div className="text-xs text-gray-500">Định cao gặp mở</div>
            </div>
            <div className="text-center whitespace-nowrap">
              <div className="text-sm font-semibold text-red-500">IPAD PRO M5</div>
              <div className="text-xs text-red-400">Đăng ký nhận tin</div>
            </div>
            <div className="text-center whitespace-nowrap">
              <div className="text-sm font-semibold text-gray-700">ACER GAMING</div>
              <div className="text-xs text-gray-500">Giá siêu rẻ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm overflow-hidden">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-red-500 text-xl">{cat.icon}</span>
                    <span className="text-sm text-gray-700">{cat.name}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Hero Banner */}
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden mb-6 shadow-lg">
              <div className="relative h-96 flex flex-col items-center justify-center text-white px-8">
                <div className="text-5xl font-bold mb-4">🍎 iPad Pro</div>
                <div className="text-2xl mb-2 text-center">Hiệu năng AI tiên tiến</div>
                <div className="text-2xl mb-8 text-center">và năng lực thay đổi cuộc chơi.</div>
                <button className="border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition font-semibold">
                  Đăng ký nhận tin
                </button>
              </div>
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
              >
                <ChevronLeft className="text-white" />
              </button>
              <button
                onClick={() => setCurrentSlide(currentSlide + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
              >
                <ChevronRight className="text-white" />
              </button>
            </div>

            {/* Product Promo Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Samsung S25 FE */}
              <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition">
                <div className="bg-gray-100 rounded-lg h-32 mb-3 flex items-center justify-center">
                  <span className="text-4xl">📱</span>
                </div>
                <div className="text-lg font-bold mb-2">Galaxy S25 FE</div>
                <div className="bg-blue-500 text-white text-center py-2 rounded-lg mb-2">
                  <div className="text-xs">Ưu đãi tới hú</div>
                  <div className="text-2xl font-bold">14.39 <span className="text-sm">triệu</span></div>
                </div>
                <div className="text-xs text-gray-600 mb-3">
                  <div>✓ Tặng Google AI Pro</div>
                  <div>✓ Trợ giá lên đời: 3 triệu đồng + 1 triệu đồng</div>
                  <div>Học sinh - sinh viên Giảm thêm 7% tối đa 700K</div>
                </div>
                <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 font-semibold transition">
                  MUA NGAY
                </button>
              </div>

              {/* AirPods Pro 3 */}
              <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition">
                <div className="bg-gray-100 rounded-lg h-32 mb-3 flex items-center justify-center">
                  <span className="text-4xl">🎧</span>
                </div>
                <div className="text-2xl font-bold mb-4 mt-8">AirPods Pro 3</div>
                <button className="w-full border-2 border-gray-800 text-gray-800 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition font-semibold mt-16">
                  Mua ngay
                </button>
              </div>

              {/* Laptop Promo */}
              <div className="bg-gradient-to-br from-red-800 to-red-600 rounded-lg p-4 shadow-sm hover:shadow-md text-white relative overflow-hidden transition">
                <div className="text-lg font-bold mb-2">Mua Laptop Online</div>
                <div className="text-2xl font-bold mb-1">Giảm thêm <span className="text-yellow-300 text-3xl">5</span> đến triệu</div>
                <div className="text-xl font-bold mb-3">+ <span className="text-yellow-300">FREE SHIP</span></div>
                <div className="text-sm mb-4">Trợ giá lên đời <span className="text-yellow-300 text-2xl font-bold">4</span> triệu</div>
                <div className="text-xs bg-white text-red-600 inline-block px-3 py-1 rounded-full font-bold">
                  Số Lượng Có Hạn - Nhanh Tay
                </div>
              </div>
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">👋</div>
                <div>
                  <div className="font-semibold text-gray-800">Chào mừng bạn đến với CellphoneS</div>
                  <div className="text-xs text-gray-500 mt-1">Nhập hội thành viên Smember để không bỏ lỡ các ưu đãi hấp dẫn.</div>
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                <button className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg text-sm hover:bg-red-50 transition font-semibold">
                  Đăng nhập
                </button>
                <button className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 transition font-semibold">
                  Đăng ký
                </button>
              </div>
              <button className="w-full flex items-center justify-between text-sm text-red-500 hover:text-red-600 transition">
                <span className="flex items-center gap-2">
                  <Gift size={16} />
                  Xem ưu đãi Smember
                </span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Education Offers */}
            <div className="bg-blue-50 rounded-lg p-4 mb-4 shadow-sm">
              <div className="font-semibold mb-3 text-gray-800">Ưu đãi cho giáo dục</div>
              <button className="w-full bg-white border border-gray-300 py-2 rounded-lg text-sm mb-2 hover:bg-gray-50 transition font-semibold">
                Đăng ký nhận ưu đãi
              </button>
              <div className="text-sm text-red-500 flex items-center gap-2 mb-2 hover:text-red-600 transition cursor-pointer">
                <Tag size={16} />
                Tựu trường lên cấp - Máy mới lên đời
              </div>
              <div className="text-sm text-red-500 flex items-center gap-2 hover:text-red-600 transition cursor-pointer">
                <Laptop size={16} />
                Laptop giảm thêm đến 500K
              </div>
            </div>

            {/* Hot Deals */}
            <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg p-4 text-white shadow-sm">
              <div className="font-semibold mb-3">Thu cũ lên đời giá hời</div>
              {promos.map((promo, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm mb-2">
                  <Smartphone size={16} />
                  <span>{promo.title} <strong>{promo.value}</strong></span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}