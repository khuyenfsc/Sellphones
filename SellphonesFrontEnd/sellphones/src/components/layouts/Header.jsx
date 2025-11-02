import { ChevronDown, Search, ShoppingCart, User } from "lucide-react";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Category from "../pages/HomePage/components/Category";
import ProductService from "../../service/ProductService";

// 🔁 Hook debounce để tránh gọi API liên tục
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

const Header = () => {
  const [showCategory, setShowCategory] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, loading: loadingUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const debouncedKeyword = useDebounce(keyword, 500);

  // 🧠 Gọi API gợi ý sản phẩm khi người dùng ngừng nhập
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedKeyword.trim() || debouncedKeyword.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const products = await ProductService.getSuggestedProducts(debouncedKeyword);
        setSuggestions(products);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedKeyword]);

  const handleSelect = (name) => {
    setKeyword(name);
    setShowDropdown(false);
  };

  // 👉 Hàm xử lý khi tìm kiếm
  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
      setShowDropdown(false);
    }
  };

  return (
    <header className="relative bg-blue-500 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight">
            <a href="/" className="text-white hover:text-gray-200 transition-colors">
              sellphones
            </a>
          </h1>
          {/* Category Dropdown Button */}
          <button
            onClick={() => setShowCategory(!showCategory)}
            className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 backdrop-blur-md hover:bg-indigo-600 transition-colors duration-300 relative"
          >
            <span className="text-sm font-medium">Danh mục</span>
            <ChevronDown size={16} />
          </button>

          {/* 🔍 Search */}
          <div className="relative w-[350px]">
            <input
              type="text"
              placeholder="Bạn muốn mua gì hôm nay?"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(); // ⌨️ Bắt phím Enter
              }}
              className="w-full px-3 py-1.5 rounded-md bg-white text-gray-800 outline-none shadow-sm focus:ring-2 focus:ring-indigo-500"
            />

            {/* 🔍 Icon search */}
            <Search
              className="absolute right-3 top-2 text-gray-400 cursor-pointer hover:text-indigo-500 transition"
              size={18}
              onClick={handleSearch} // 🖱️ Click icon để tìm kiếm
            />

            {/* Danh sách gợi ý */}
            {showDropdown && (loading || suggestions.length > 0) && (
              <div className="absolute top-10 w-full bg-white border border-gray-200 rounded-md shadow-md z-50 max-h-64 overflow-y-auto">
                {loading ? (
                  <div className="p-3 text-sm text-gray-500">Đang tải gợi ý...</div>
                ) : (
                  suggestions.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelect(product.name)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                    >
                      {product.name}
                    </div>
                  ))
                )}
                {!loading && suggestions.length === 0 && keyword.trim().length >= 2 && (
                  <div className="p-3 text-sm text-gray-400">Không có kết quả</div>
                )}
              </div>
            )}
          </div>

          {/* Cart & Login */}
          {/* Cart & Login / User */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Nút giỏ hàng */}
            <button className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 backdrop-blur-md hover:bg-indigo-600 transition-colors duration-300">
              <ShoppingCart size={20} />
              <span className="text-sm font-medium">Giỏ hàng</span>
            </button>

            {loadingUser ? (
              <div className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 backdrop-blur-md animate-pulse">
                <User size={20} />
                <span className="text-sm font-medium">Đang tải...</span>
              </div>
            ) : user ? (
              <a
                href="/dashboard"
                className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 backdrop-blur-md hover:bg-indigo-600 transition-colors duration-300 no-underline font-normal"
              >
                <User size={20} />
                <span className="text-sm font-medium">
                  {user?.fullName?.split(" ").slice(-1)[0]}
                </span>
              </a>
            ) : (
              <a
                href="/login"
                className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 backdrop-blur-md hover:bg-indigo-600 transition-colors duration-300 no-underline font-normal"
              >
                <User size={20} />
                <span className="text-sm font-medium">Đăng nhập</span>
              </a>
            )}

          </div>

        </div>
      </div>

      {/* CATEGORY DROPDOWN */}
      {showCategory && (
        <div className="absolute left-0 top-full mt-2 w-max bg-white shadow-lg border border-gray-200 rounded-lg z-50">
          <Category />
        </div>
      )}
    </header>
  );
};

export default Header;
