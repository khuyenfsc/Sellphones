import React, { useState, useEffect } from 'react';
import { DollarSign, FileText, Users } from "lucide-react";
import StatCard from "./StatCard";
import DashboardService from '../../../../service/DashboardService';
import { formatCurrency } from '../../../../../../utils/Format';

export default function TodayStats() {
    const [today, setToday] = useState(null);
    const [loadingToday, setLoadingToday] = useState(false);

    const fetchToday = async () => {
        setLoadingToday(true);
        const res = await DashboardService.getTodayDetails();
        if (res.success) setToday(res.data);
        setLoadingToday(false);
    };

    useEffect(() => {
        fetchToday();
    }, []);

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Tổng quan hôm nay</h2>

            {loadingToday ? (
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
