import React, { useState, useContext } from "react";
import UserService from "../../../../service/UserService";
import { AuthContext } from "../../../../context/AuthContext";

export default function LogoutConfirm({ logout }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { setUser } = useContext(AuthContext); // lấy setUser từ context

  const handleLogout = async () => {
    setLoading(true);
    setMessage("");

    try {
      const result = await UserService.logout();
      setMessage(result.message);

      if (result.success) {
        // Nếu logout thành công → có thể redirect về trang login
        setUser(null);

        window.location.href = "/login";
      }
    } catch (err) {
      console.error(err);
      setMessage("Có lỗi xảy ra khi đăng xuất");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
      <p className="text-gray-700 text-sm mb-3">
        Bạn có chắc chắn muốn đăng xuất?
      </p>
      <button
        onClick={handleLogout}
        disabled={loading}
        className={`px-4 py-2 rounded-md text-sm ${
          loading
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-red-600 hover:bg-red-700 text-white"
        }`}
      >
        {loading ? "Đang đăng xuất..." : "Xác nhận đăng xuất"}
      </button>
      {message && <p className="mt-3 text-gray-700 text-sm">{message}</p>}
    </div>
  );
}
