import React from "react";

export default function LogoutConfirm() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
      <p className="text-gray-700 text-sm mb-3">
        Bạn có chắc chắn muốn đăng xuất?
      </p>
      <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm">
        Xác nhận đăng xuất
      </button>
    </div>
  );
}
