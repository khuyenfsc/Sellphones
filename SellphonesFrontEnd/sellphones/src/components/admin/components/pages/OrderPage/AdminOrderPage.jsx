import React, { useState, useEffect } from 'react';

import CreateOrderModal from './components/CreateOrderModal';
import OrderTable from './components/OrderTable';
import AdminOrderService from '../../../service/AdminOrderService';
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { fi, is } from 'date-fns/locale';
import { toast } from "react-toastify";

dayjs.locale("vi");

const AdminOrderPage = () => {
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);
  const [isReloaded, setIsReloaded] = useState(false);

    const handleCreateOrder = async (orderData) => {
    try {
      const res = await AdminOrderService.createOrder(orderData);

      if (res.success) {
        toast.success("Tạo đơn hàng thành công!");   
        setIsCreateOrderModalOpen(false);
        setIsReloaded(!isReloaded);
      } else {
        toast.error("Tạo đơn hàng thất bại: " + res.message);  
      }
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra khi tạo đơn hàng!"); 
    }
  };

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
      <OrderTable isReloaded={isReloaded}/>


      <CreateOrderModal
        isOpen={isCreateOrderModalOpen}
        onClose={() => setIsCreateOrderModalOpen(false)}
        onCreate={handleCreateOrder}
      />

    </div>
  );
};

export default AdminOrderPage;