import React, { useState, useContext, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import StatCard from './components/StatCard';
import { ShoppingBag, FileText, Users, BarChart3, DollarSign, ChevronRight } from 'lucide-react';
import { AdminAuthContext } from '../../../context/AdminAuthContext';
import { AdminPermissionContext } from '../../../context/AdminPermissionContext';
import DashboardService from '../../../service/DashboardService';
import { canViewComponent, getComponentPermissions } from '../../../../../helpers/permission';
import { Undo2Icon } from 'lucide-react';
import UnauthorizedPage from '../UnauthorizedPage/UnauthorizedPage';

const AdminDashboardPage = () => {
  const { admin, loading: loadingAdmin } = useContext(AdminAuthContext);
  const [overall, setOverall] = useState(null);
  const [loadingOverall, setLoadingOverall] = useState(true);
  const [today, setToday] = useState(null);
  const [loadingToday, setLoadingToday] = useState(false)
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [mostSelling, setMostSelling] = useState(null);
  const [loadingMostSelling, setLoadingMostSelling] = useState(false);
  const [mostSalesUser, setMostSalesUser] = useState(null);
  const [loadingMostSalesUser, setLoadingMostSalesUser] = useState(false);
  const [ordersByDay, setOrdersByDay] = useState([]);
  const [loadingOrdersByDay, setLoadingOrdersByDay] = useState(false);
  const [ordersByMonth, setOrdersByMonth] = useState([]);
  const [loadingOrdersByMonth, setLoadingOrdersByMonth] = useState(false);
  const lastName = admin?.fullName?.split(" ").slice(-1)[0] || "";
  const [dateRange, setDateRange] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const { permissions, loading: loadingPermissions } = useContext(AdminPermissionContext);
  const [authorized, setAuthorized] = useState(true);

  useEffect(() => {
    if (!loadingPermissions) {
      const canViewDashboard = canViewComponent(permissions, "DASHBOARD");
      setAuthorized(canViewDashboard);
    }
  }, [permissions, loadingPermissions]);



  const formatCurrency = (value) =>
    value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const fetchOverall = async () => {
    setLoadingOverall(true);
    const res = await DashboardService.getOverallDetails(dateRange.month, dateRange.year);
    if (res.success) setOverall(res.data);
    setLoadingOverall(false);
  };

  const fetchToday = async () => {
    setLoadingToday(true);
    const res = await DashboardService.getTodayDetails();
    if (res.success) setToday(res.data);
    setLoadingToday(false);
  };

  const fetchMostStocked = async () => {
    setLoadingProducts(true);
    try {
      const res = await DashboardService.getMostStockedVariants();
      if (res.success) {
        // Chuẩn hóa dữ liệu để dùng trong UI
        const data = res.data.map(item => ({
          id: item.id,
          name: item.productVariantName,
          sku: item.sku,
          image: item.variantImage,
          stock: item.stock,
          price: item.currentPrice || "0 ₫" // nếu có giá, không có thì 0
        }));
        setProducts(data);
      }
    } catch (error) {
      console.error("Lỗi tải sản phẩm tồn kho:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

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
    fetchOverall();
    fetchMostSelling()
    fetchMostSalesUser();
    fetchOrdersByDay();
  }, [dateRange]);

  useEffect(() => {
    fetchOrdersByMonth();
  }, [dateRange.year]);

  useEffect(() => {
    fetchToday();
    fetchMostStocked();
  }, []);

  if (loadingPermissions || loadingAdmin) return <div>Loading...</div>;
  if (!authorized) return <UnauthorizedPage />;
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          {loadingAdmin ? (
            <h1 className="text-3xl font-bold mb-2">Đang tải...</h1>
          ) : (
            <h1 className="text-3xl font-bold mb-2">Hi ! {lastName || "Quản trị viên"}</h1>
          )}
          <p className="text-gray-400">Nhanh chóng xem tổng quan cửa hàng của bạn</p>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col text-white">
            <label htmlFor="month">Tháng</label>
            <select
              id="month"
              value={dateRange.month}
              onChange={(e) => setDateRange({ ...dateRange, month: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Tháng {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col text-white">
            <label htmlFor="year">Năm</label>
            <select
              id="year"
              value={dateRange.year}
              onChange={(e) => setDateRange({ ...dateRange, year: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            >
              {Array.from(
                { length: new Date().getFullYear() - 1979 },
                (_, i) => 1980 + i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

        </div>


      </div>

      {/* Overall Details */}
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

      {/* Today's Details */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Tổng quan hôm nay</h2>

        {loadingToday ? (
          <div className="animate-pulse text-gray-400">Đang tải dữ liệu hôm nay...</div>
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


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Stock Threshold */}
        <div className="lg:col-span-2">
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
                      formatter={(value) => value.toLocaleString("vi-VN")}
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

        {/* Cột bên phải */}
        <div className="space-y-6">
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
                    {ordersByMonth.reduce((sum, item) => sum + item.orders, 0).toLocaleString("vi-VN")}
                  </p>
                  <p className="text-sm text-gray-400">Tổng đơn hàng trong năm</p>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={ordersByMonth} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
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


          { }
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
      </div>

    </div>
  );
};

export default AdminDashboardPage;