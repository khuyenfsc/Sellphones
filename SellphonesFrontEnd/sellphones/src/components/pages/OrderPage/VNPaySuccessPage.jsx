import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function VNPaySuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
      <h1 className="text-2xl font-bold text-black mb-2">Thanh toán thành công!</h1>
      <p className="text-gray-600 mb-6">
        Giao dịch VNPAY của bạn đã được xác nhận. Đơn hàng của bạn sẽ sớm được xử lý.
      </p>

      <button
        onClick={() => navigate("/dashboard/account/history")}
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Xem đơn hàng của tôi
      </button>
    </div>
  );
}
