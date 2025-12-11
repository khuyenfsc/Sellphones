import { LogOut, User } from "lucide-react";
import React, { useState, useContext } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import AdminService from "../../service/AdminService";
const AdminHeader = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { admin, loading: loadingAdmin } = useContext(AdminAuthContext);

  const handleLogout = async () => {
    try {
      await AdminService.logout();
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback: clear token and redirect anyway
      localStorage.removeItem("accessToken");
      window.location.href = "/admin/login";
    }
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="/admin" 
            className="group flex items-center gap-3 transition-all duration-300"
          >

            <h1 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
              AdminPanel
            </h1>
          </a>

          {/* User Menu */}
          <div className="relative">
            {loadingAdmin ? (
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-700/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-slate-600 animate-pulse" />
                <div className="w-20 h-4 bg-slate-600 rounded animate-pulse" />
              </div>
            ) : (
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-4 py-2 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all duration-300 border border-slate-600 hover:border-slate-500 group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md group-hover:shadow-blue-500/50 transition-all duration-300">
                  <User size={18} className="text-white" />
                </div>
                <span className="text-white font-medium">
                  {admin?.fullName?.split(" ").slice(-1)[0] || "Admin"}
                </span>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                    showUserMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                
                {/* Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3 bg-slate-50 border-b border-slate-200">
                    <p className="text-sm font-semibold text-slate-900">
                      {admin?.fullName || "Administrator"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {admin?.email || "admin@example.com"}
                    </p>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 w-full text-left transition-colors duration-200 group"
                  >
                    <div className="p-1.5 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors duration-200">
                      <LogOut size={16} className="text-red-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-red-600 transition-colors duration-200">
                      Đăng xuất
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;