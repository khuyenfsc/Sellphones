import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function VNPayFailedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <XCircle className="w-20 h-20 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold text-black mb-2">Thanh toán thất bại!</h1>
      <p className="text-gray-600 mb-6">
        Giao dịch VNPAY không thành công hoặc đã bị hủy. Vui lòng thử lại.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-400 transition"
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
}
