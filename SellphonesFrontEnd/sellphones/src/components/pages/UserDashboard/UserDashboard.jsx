import React from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "./components/UserHeader";
import AccountSidebar from "./components/AccountSidebar";
import { UserProvider } from "../../../context/UserContext";

export default function UserDashboard() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <UserHeader />

        <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-3 gap-4">
          <AccountSidebar />

          {/* ✅ Dữ liệu user từ context dùng được ở mọi route con */}
          <div className="col-span-2 space-y-4">
            <Outlet />
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
