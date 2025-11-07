import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
      <h1 className="text-2xl font-bold text-black mb-2">Đặt hàng thành công!</h1>
      <p className="text-gray-600 mb-6">
        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn sẽ sớm được xử lý và giao đến địa chỉ đã chọn.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Quay về trang chủ
      </button>
    </div>
  );
}
