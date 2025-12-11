import React, { useState, useEffect } from 'react';
import { DollarSign, FileText, Users, BarChart3 } from "lucide-react";
import StatCard from "./StatCard";
import DashboardService from "../../../../service/DashboardService";

export default function OverallStats({ dateRange, formatCurrency }) {
    const [overall, setOverall] = useState(null);
    const [loadingOverall, setLoadingOverall] = useState(true);
    const fetchOverall = async () => {
        setLoadingOverall(true);
        const res = await DashboardService.getOverallDetails(dateRange.month, dateRange.year);
        if (res.success) setOverall(res.data);
        setLoadingOverall(false);
    };

      useEffect(() => {
        fetchOverall();
      }, [dateRange]);


    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Tổng quan</h2>

            {loadingOverall ? (
                <div className="animate-pulse text-gray-400">Đang tải dữ liệu...</div>
            ) : overall ? (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <StatCard
                        icon={DollarSign}
                        title="Tổng doanh thu"
                        value={formatCurrency(overall.total_sales ?? 0)}
                    />

                    <StatCard
                        icon={FileText}
                        title="Tổng số đơn hàng"
                        value={overall.total_orders}
                    />

                    <StatCard
                        icon={Users}
                        title="Tổng số khách hàng"
                        value={overall.total_customers}
                    />

                    <StatCard
                        icon={BarChart3}
                        title="Giá trị trung bình/đơn"
                        value={
                            overall.total_orders > 0
                                ? formatCurrency(overall.total_sales / overall.total_orders)
                                : "0 ₫"
                        }
                    />

                    <StatCard
                        icon={FileText}
                        title="Đơn chưa thanh toán"
                        value={overall.total_unpaid_orders}
                    />
                </div>
            ) : (
                <p className="text-gray-400">Không có dữ liệu cho tháng này.</p>
            )}
        </div>
    );
}
