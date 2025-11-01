import React from "react";
import { ChevronRight } from "lucide-react";

export default function OrderHistory() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-base font-semibold mb-3">Đơn hàng gần đây</h3>

      <div className="border rounded-md p-3">
        <div className="flex justify-between items-start mb-3">
          <div className="text-sm text-gray-700 space-x-2">
            <span>Đơn hàng:</span>
            <span className="font-semibold text-black">#WB0303113402</span>
            <span>• Ngày đặt:</span>
            <span className="font-semibold">10/08/2025</span>
          </div>
          <span className="bg-red-100 text-red-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
            Đã hủy
          </span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop"
            alt="Xiaomi 14T Pro"
            className="w-16 h-16 object-cover rounded-md"
          />
          <div className="flex-1">
            <h4 className="font-medium text-sm">
              Xiaomi 14T Pro - Xanh Chi có tai CPS
            </h4>
            <p className="text-red-600 font-semibold text-sm">17.670.000đ</p>
          </div>
          <div className="text-right text-sm">
            <p className="text-gray-600">Tổng thanh toán:</p>
            <p className="text-lg font-bold text-red-600">14.870.000đ</p>
            <button className="text-red-600 hover:underline flex items-center justify-end gap-1 mt-1 text-xs">
              Xem chi tiết <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
