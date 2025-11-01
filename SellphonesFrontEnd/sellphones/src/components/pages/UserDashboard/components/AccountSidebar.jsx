import React from "react";
import { NavLink } from "react-router-dom";
import { Settings, Clock, LogOut } from "lucide-react";

export default function AccountSidebar() {
  const menuItems = [
    { id: "account", label: "Thông tin tài khoản", icon: Settings, path: "/dashboard/account/info" },
    { id: "history", label: "Lịch sử mua hàng", icon: Clock, path: "/dashboard/account/history" },
    { id: "logout", label: "Đăng xuất", icon: LogOut, path: "/dashboard/account/logout" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {menuItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) =>
            `w-full block text-left px-3 py-2.5 flex items-center gap-2 text-sm transition ${
              isActive
                ? "bg-red-50 text-red-600 border-l-4 border-red-600"
                : "text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <item.icon className="w-4 h-4" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
}
