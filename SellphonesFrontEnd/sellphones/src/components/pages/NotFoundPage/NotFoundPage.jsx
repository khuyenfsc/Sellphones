import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-6">
      <AlertTriangle className="w-24 h-24 text-yellow-500 mb-6 animate-bounce" />
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Trang không tồn tại</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Có vẻ như trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
      >
        Quay về trang chủ
      </button>
    </div>
  );
}
