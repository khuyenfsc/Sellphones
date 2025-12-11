import React, { useState, useEffect } from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";
import DashboardService from '../../../../service/DashboardService';

export default function MonthlyStatsSection({
    dateRange
}) {

    const [mostSelling, setMostSelling] = useState(null);
    const [loadingMostSelling, setLoadingMostSelling] = useState(false);
    const [mostSalesUser, setMostSalesUser] = useState(null);
    const [loadingMostSalesUser, setLoadingMostSalesUser] = useState(false);
    const [ordersByMonth, setOrdersByMonth] = useState([]);
    const [loadingOrdersByMonth, setLoadingOrdersByMonth] = useState(false);

    const fetchMostSelling = async () => {
        setLoadingMostSelling(true);
        try {
            const res = await DashboardService.getMostSellingVariant(dateRange.month, dateRange.year);
            if (res.success && res.data) {
                const item = res.data;
                const data = {
                    id: item.id,
                    name: item.productVariantName,
                    sku: item.sku,
                    image: item.variantImage,
                    stock: item.stock,
                    currentPrice: item.currentPrice || 0
                };
                setMostSelling(data);
            }
        } catch (error) {
            console.error("Lỗi tải sản phẩm bán chạy:", error);
        } finally {
            setLoadingMostSelling(false);
        }
    };

    const fetchMostSalesUser = async () => {
        setLoadingMostSalesUser(true);
        try {
            const res = await DashboardService.getMostSalesUser(dateRange.month, dateRange.year);
            if (res.success && res.data) {
                const user = res.data;
                const data = {
                    id: user.user_id,
                    fullName: user.full_name,
                    totalSales: user.total_sales || 0
                };
                setMostSalesUser(data);
            }
        } catch (error) {
            console.error("Lỗi tải khách hàng mua nhiều nhất:", error);
        } finally {
            setLoadingMostSalesUser(false);
        }
    };

    const fetchOrdersByMonth = async () => {
        setLoadingOrdersByMonth(true);
        try {
            const res = await DashboardService.getTotalOrdersByMonthInYear(dateRange.year);
            if (res.success && res.data) {
                const result = res.data || {}; // Dữ liệu dạng { "9": 8, "11": 1 }

                // Chuẩn hóa dữ liệu cho 12 tháng
                const data = Array.from({ length: 12 }, (_, i) => {
                    const month = i + 1;
                    return {
                        month: `Tháng ${month}`,
                        orders: result[month] ?? 0,
                    };
                });

                setOrdersByMonth(data);
            }
        } catch (error) {
            console.error("Lỗi tải tổng số đơn hàng theo tháng:", error);
        } finally {
            setLoadingOrdersByMonth(false);
        }
    };

    useEffect(() => {
        fetchMostSelling()
        fetchMostSalesUser();
    }, [dateRange]);

    useEffect(() => {
        fetchOrdersByMonth();
    }, [dateRange.year]);
    return (
        <div className="space-y-6">

            {/* Total Orders By Month */}
            <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Tổng đơn hàng theo tháng</h2>
                    <p className="text-sm text-gray-400">Năm {dateRange.year}</p>
                </div>

                {loadingOrdersByMonth ? (
                    <div className="animate-pulse text-gray-400">Đang tải dữ liệu...</div>
                ) : (
                    <div>
                        <div className="mb-2">
                            <p className="text-2xl font-bold">
                                {ordersByMonth
                                    .reduce((sum, item) => sum + item.orders, 0)
                                    .toLocaleString("vi-VN")}
                            </p>
                            <p className="text-sm text-gray-400">Tổng đơn hàng trong năm</p>
                        </div>

                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={ordersByMonth}
                                margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fill: "#9CA3AF", fontSize: 10 }}
                                    angle={-45}
                                    textAnchor="end"
                                    interval={0}
                                />
                                <YAxis
                                    tick={{ fill: "#9CA3AF" }}
                                    allowDecimals={false}
                                    domain={[0, (dataMax) => Math.ceil(dataMax * 1.2)]}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
                                    formatter={(value) => value.toLocaleString("vi-VN")}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="orders"
                                    stroke="#3B82F6"
                                    strokeWidth={2}
                                    dot={{ fill: "#3B82F6" }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            {/* Top Selling Product */}
            <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Top Selling Product</h2>
                    <p className="text-sm text-gray-400">
                        Tháng {dateRange.month} - {dateRange.year}
                    </p>
                </div>

                {loadingMostSelling ? (
                    <div className="animate-pulse text-gray-400">Đang tải sản phẩm...</div>
                ) : mostSelling ? (
                    <div className="flex items-center gap-3">
                        <img
                            src={mostSelling.image}
                            alt={mostSelling.name}
                            className="w-16 h-16 rounded bg-gray-700 object-cover"
                        />
                        <div className="flex-1">
                            <p className="font-medium text-white">{mostSelling.name}</p>
                            <p className="text-xl font-bold text-white mt-1">
                                {mostSelling.currentPrice.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </p>
                            <p className="text-sm text-green-400 mt-1">
                                Tồn kho: {mostSelling.stock}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400">
                        Không có sản phẩm bán chạy trong tháng này.
                    </p>
                )}
            </div>

            {/* Most Sales User */}
            <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Khách hàng mua nhiều nhất</h2>
                    <p className="text-sm text-gray-400">
                        Tháng {dateRange.month} - {dateRange.year}
                    </p>
                </div>

                {loadingMostSalesUser ? (
                    <div className="animate-pulse text-gray-400">Đang tải dữ liệu...</div>
                ) : mostSalesUser ? (
                    <div>
                        <p className="font-medium text-white">{mostSalesUser.fullName}</p>
                        <div className="flex justify-between mt-3">
                            <p className="text-xl font-bold text-white">
                                {mostSalesUser.totalSales.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400">Không có dữ liệu cho tháng này.</p>
                )}
            </div>
        </div>
    );
}
