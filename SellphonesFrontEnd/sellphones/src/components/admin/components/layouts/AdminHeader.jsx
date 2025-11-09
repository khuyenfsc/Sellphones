import { Menu, User, LogOut, Box, ShoppingCart, BarChart2 } from "lucide-react";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";

const AdminHeader = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { admin, loading: loadingAdmin } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xử lý logout
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white py-3 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <a href="/admin" className="hover:text-gray-300 transition-colors">
            AdminPanel
          </a>
        </h1>


        {/* User info & menu */}
        <div className="relative">
          {loadingAdmin ? (
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded animate-pulse">
              <User size={20} />
              <span>Đang tải...</span>
            </div>
          ) : (
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
            >
              <User size={20} />
              <span>{admin?.fullName?.split(" ").slice(-1)[0]}</span>
              <Menu size={16} />
            </button>
          )}

          {/* Dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
