import React from "react";
import { DollarSign, FileText, Users } from "lucide-react";
import StatCard from "./StatCard";

export default function TodayStats({ loading, today, formatCurrency }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Tổng quan hôm nay</h2>

      {loading ? (
        <div className="animate-pulse text-gray-400">
          Đang tải dữ liệu hôm nay...
        </div>
      ) : today ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            icon={DollarSign}
            title="Doanh thu hôm nay"
            value={formatCurrency(today.total_sales ?? 0)}
          />

          <StatCard
            icon={FileText}
            title="Số đơn hôm nay"
            value={today.total_orders}
          />

          <StatCard
            icon={Users}
            title="Khách hàng hôm nay"
            value={today.total_customers}
          />
        </div>
      ) : (
        <p className="text-gray-400">Không có dữ liệu hôm nay.</p>
      )}
    </div>
  );
}
