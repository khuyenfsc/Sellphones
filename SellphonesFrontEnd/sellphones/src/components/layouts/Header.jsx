import { ChevronDown, Search, ShoppingCart, User, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Category from "../pages/HomePage/components/Category";

const Header = () => {
  const [showCategory, setShowCategory] = useState(false);

  return (
    <header className="relative bg-blue-500 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            sellphones
          </h1>

          {/* Category Dropdown Button */}
          <button
            onClick={() => setShowCategory(!showCategory)}
            className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 backdrop-blur-md hover:bg-indigo-600 transition-colors duration-300 relative"
          >
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
              <Search
                className="absolute right-3 top-2 text-gray-400"
                size={18}
              />
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

      {/* CATEGORY DROPDOWN — hiển thị bên dưới header */}
      {showCategory && (
        <div className="absolute left-0 top-full mt-2 w-max bg-white shadow-lg border border-gray-200 rounded-lg z-50">
          <Category />
        </div>
      )}

    </header>
  );
};

export default Header;