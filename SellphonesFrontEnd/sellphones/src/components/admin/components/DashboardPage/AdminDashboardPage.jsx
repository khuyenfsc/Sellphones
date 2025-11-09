import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ShoppingBag, FileText, Users, BarChart3, DollarSign, ChevronRight } from 'lucide-react';

const AdminDashboardPage = () => {
    console.log("AdminProtectedRoute rendered");

  const [dateRange, setDateRange] = useState({
    start: '2025-10-10',
    end: '2025-11-09'
  });

  const salesData = [
    { date: '10 Oct', sales: 0 },
    { date: '13 Oct', sales: 0 },
    { date: '16 Oct', sales: 0 },
    { date: '19 Oct', sales: 0 },
    { date: '22 Oct', sales: 0 },
    { date: '25 Oct', sales: 0 },
    { date: '28 Oct', sales: 0 },
    { date: '31 Oct', sales: 0 },
    { date: '03 Nov', sales: 0 },
    { date: '06 Nov', sales: 14 },
    { date: '09 Nov', sales: 0 }
  ];

  const visitorsData = [
    { date: '10 Oct', visitors: 0 },
    { date: '13 Oct', visitors: 0 },
    { date: '16 Oct', visitors: 0 },
    { date: '19 Oct', visitors: 0 },
    { date: '22 Oct', visitors: 0 },
    { date: '25 Oct', visitors: 0 },
    { date: '28 Oct', visitors: 0 },
    { date: '31 Oct', visitors: 0 },
    { date: '03 Nov', visitors: 0 },
    { date: '06 Nov', visitors: 1 },
    { date: '09 Nov', visitors: 0 }
  ];

  const products = [
    {
      name: 'Arctic Cozy Knit Unisex Beanie',
      sku: 'SP-Q01',
      price: '$14.00',
      stock: '99 Stock',
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Arctic Bliss Stylish Winter Scarf',
      sku: 'SP-Q02',
      price: '$17.00',
      stock: '99 Stock',
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Copy Of Copy Of Arctic Bliss Stylish Winter Scarf',
      sku: 'temporary-sku-dedca5',
      price: '$17.00',
      stock: '99 Stock',
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Copy Of Arctic Bliss Stylish Winter Scarf',
      sku: 'temporary-sku-fb0e38',
      price: '$17.00',
      stock: '99 Stock',
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Arctic Touchscreen Winter Gloves',
      sku: 'SP-Q03',
      price: '$21.00',
      stock: '100 Stock',
      image: '/api/placeholder/60/60'
    }
  ];

  const StatCard = ({ icon: Icon, title, value, change, changeType }) => (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-700 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-gray-300" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-gray-400 mt-1">{title}</p>
            {change && (
              <p className={`text-sm mt-1 ${changeType === 'up' ? 'text-red-400' : 'text-green-400'}`}>
                {changeType === 'up' ? '↑' : '↓'} {change}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hi ! Example</h1>
          <p className="text-gray-400">Quickly Review what's going on in your store</p>
        </div>
        <div className="flex gap-4">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
        </div>
      </div>

      {/* Overall Details */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Overall Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <StatCard
            icon={DollarSign}
            title="Total Sales"
            value="$14.00"
            change="17.65%"
            changeType="up"
          />
          <StatCard
            icon={FileText}
            title="Total Orders"
            value="3"
            change="0%"
            changeType="down"
          />
          <StatCard
            icon={Users}
            title="Total Customers"
            value="1"
            change="50%"
            changeType="up"
          />
          <StatCard
            icon={BarChart3}
            title="Average Order Sale"
            value="$4.67"
            change="17.65%"
            changeType="up"
          />
          <StatCard
            icon={FileText}
            title="Total Unpaid Invoices"
            value="$0.00"
          />
        </div>
      </div>

      {/* Today's Details */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Today's Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            icon={DollarSign}
            title="Today's Sales"
            value="$0.00"
            change="0%"
            changeType="down"
          />
          <StatCard
            icon={FileText}
            title="Today's Orders"
            value="0"
            change="0%"
            changeType="down"
          />
          <StatCard
            icon={Users}
            title="Today's Customers"
            value="0"
            change="0%"
            changeType="down"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Stock Threshold */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Stock Threshold</h2>
            <div className="space-y-4">
              {products.map((product, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded bg-gray-700" />
                    <div>
                      <p className="font-medium text-white">{product.name}</p>
                      <p className="text-sm text-gray-400">SKU - {product.sku}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-semibold text-white">{product.price}</p>
                      <p className="text-sm text-green-400">{product.stock}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Store Stats */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Store Stats</h2>
              <p className="text-sm text-gray-400">10 Oct - 09 Nov</p>
            </div>
            <div className="mb-2">
              <p className="text-sm text-gray-400">Total Sales</p>
              <p className="text-2xl font-bold">$14.00</p>
              <p className="text-sm text-gray-400">3 Orders</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                <YAxis tick={{ fill: '#9CA3AF' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                <Bar dataKey="sales" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Visitors</h2>
              <p className="text-sm text-gray-400">10 Oct - 09 Nov</p>
            </div>
            <div className="mb-2">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-gray-400">0 unique</p>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={visitorsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                <YAxis tick={{ fill: '#9CA3AF' }} domain={[0, 1]} />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                <Line type="monotone" dataKey="visitors" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Top Selling Products</h2>
              <p className="text-sm text-gray-400">10 Oct - 09 Nov</p>
            </div>
            <div className="flex items-center gap-3">
              <img src="/api/placeholder/60/60" alt="Arctic Cozy Knit Unisex Beanie" className="w-16 h-16 rounded bg-gray-700" />
              <div className="flex-1">
                <p className="font-medium text-white">Arctic Cozy Knit Unisex Beanie</p>
                <p className="text-xl font-bold text-white mt-1">$14.00</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Customer With Most Sales</h2>
              <p className="text-sm text-gray-400">10 Oct - 09 Nov</p>
            </div>
            <div>
              <p className="font-medium text-white">Khuyen Hoang</p>
              <p className="text-sm text-gray-400">khuyenhoang1122333@gmail.com</p>
              <div className="flex justify-between mt-3">
                <p className="text-xl font-bold text-white">$14.00</p>
                <p className="text-sm text-gray-400">3 Orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;