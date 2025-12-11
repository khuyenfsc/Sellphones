import React, { useState, useContext, useEffect } from 'react';
import { AdminAuthContext } from '../../../context/AdminAuthContext';
import { AdminPermissionContext } from '../../../context/AdminPermissionContext';
import { canViewComponent, getComponentPermissions } from '../../../../../helpers/permission';
import UnauthorizedPage from '../UnauthorizedPage/UnauthorizedPage';
import OverallStats from './components/OverallStats';
import TodayStats from './components/TodayStats';
import InventoryAndOrdersChart from './components/InventoryAndOrdersChart';
import MonthlyStatsSection from './components/MonthlyStatsSection';
import { formatCurrency } from '../../../../../utils/Format';

const AdminDashboardPage = () => {
  const { admin, loading: loadingAdmin } = useContext(AdminAuthContext);
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
      <OverallStats dateRange={dateRange} />

      {/* Today's Details */}
      <TodayStats  />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <InventoryAndOrdersChart dateRange={dateRange}/>

        {/* Cột bên phải */}
        <MonthlyStatsSection dateRange={dateRange} />
      </div>

    </div>
  );
};

export default AdminDashboardPage;