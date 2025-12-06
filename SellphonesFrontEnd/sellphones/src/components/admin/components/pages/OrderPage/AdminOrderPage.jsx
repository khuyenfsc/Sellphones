import React, { useState, useEffect } from 'react';

import CreateOrderModal from './components/CreateOrderModal';
import OrderTable from './components/OrderTable';
import AdminOrderService from '../../../service/AdminOrderService';
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { fi } from 'date-fns/locale';

dayjs.locale("vi");

const AdminOrderPage = () => {
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Đơn hàng</h1>
        <div className="flex gap-3">

          <button
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
            onClick={() => setIsCreateOrderModalOpen(true)}
          >
            Tạo đơn hàng
          </button>
        </div>
      </div>

      {/* Search and Controls */}
      <OrderTable/>


      <CreateOrderModal
        isOpen={isCreateOrderModalOpen}
        onClose={() => setIsCreateOrderModalOpen(false)}
      />

    </div>
  );
};

export default AdminOrderPage;