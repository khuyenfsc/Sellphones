import React, { useState, useEffect } from 'react';
import { ChevronRight } from "lucide-react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";
import DashboardService from '../../../../service/DashboardService';

export default function InventoryAndOrdersChart({
    dateRange
}) {

    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [ordersByDay, setOrdersByDay] = useState([]);
    const [loadingOrdersByDay, setLoadingOrdersByDay] = useState(false);


    const fetchMostStocked = async () => {
        setLoadingProducts(true);
        try {
            const res = await DashboardService.getMostStockedVariants();
            if (res.success) {
                const data = res.data.map(item => ({
                    id: item.id,
                    name: item.productVariantName,
                    sku: item.sku,
                    image: item.variantImage,
                    stock: item.stock,
                    price: item.currentPrice || "0 ₫"
                }));
                setProducts(data);
            }
        } catch (error) {
            console.error("Lỗi tải sản phẩm tồn kho:", error);
        } finally {
            setLoadingProducts(false);
        }
    };

    const fetchOrdersByDay = async () => {
        setLoadingOrdersByDay(true);
        try {
            const res = await DashboardService.getTotalOrdersByDayInMonth(dateRange.month, dateRange.year);
            if (res.success && res.data) {
                const result = res.data; // dạng { "1": 1, "2": 1, ... }

                // Lấy số ngày trong tháng
                const daysInMonth = new Date(dateRange.month, dateRange.month, 0).getDate();

                // Chuẩn hóa dữ liệu: nếu ngày nào backend thiếu thì set 0
                const data = Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    return {
                        date: day, // hiển thị ngày
                        sales: result[day] ?? 0
                    };
                });

                setOrdersByDay(data);
            }
        } catch (error) {
            console.error("Lỗi tải tổng số đơn hàng theo ngày:", error);
        } finally {
            setLoadingOrdersByDay(false);
        }
    };

    useEffect(() => {
        fetchOrdersByDay();
    }, [dateRange]);

    useEffect(() => {
        fetchMostStocked();
    }, []);

    return (
        <div className="lg:col-span-2">
            {/* Most Stock Products */}
            <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Sản phẩm tồn kho nhiều nhất</h2>

                {loadingProducts ? (
                    <div className="animate-pulse text-gray-400">Đang tải sản phẩm...</div>
                ) : products.length > 0 ? (
                    <div className="space-y-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center justify-between py-3 border-b border-gray-700"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-12 h-12 rounded bg-gray-700 object-cover"
                                    />
                                    <div>
                                        <p className="font-medium text-white">{product.name}</p>
                                        <p className="text-sm text-gray-400">{product.sku}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="font-semibold text-white">
                                            {product.price.toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </p>
                                        <p className="text-sm text-green-400">{product.stock}</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">Không có sản phẩm nào.</p>
                )}
            </div>

            {/* Orders Distribution Chart */}
            <div className="bg-gray-800 rounded-lg p-6 mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Phân bố đơn hàng theo ngày</h2>
                    <p className="text-sm text-gray-400">
                        Tháng {dateRange.month} - {dateRange.year}
                    </p>
                </div>

                {loadingOrdersByDay ? (
                    <div className="animate-pulse text-gray-400">Đang tải dữ liệu...</div>
                ) : (
                    <div className="w-full">
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={ordersByDay}
                                margin={{ top: 20, right: 20, left: 10, bottom: 60 }}
                                barCategoryGap="25%"
                                barGap={3}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fill: "#9CA3AF", fontSize: 10 }}
                                    angle={-45}
                                    textAnchor="end"
                                    interval={0}
                                />
                                <YAxis
                                    tick={{ fill: "#9CA3AF" }}
                                    domain={[0, (dataMax) => Math.ceil(dataMax * 1.2)]}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
                                    formatter={(value) =>
                                        value.toLocaleString("vi-VN")
                                    }
                                />
                                <Bar
                                    dataKey="sales"
                                    fill="#3B82F6"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
}
