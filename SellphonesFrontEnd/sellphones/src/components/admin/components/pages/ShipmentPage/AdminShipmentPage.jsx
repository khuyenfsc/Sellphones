import React, { useState } from 'react';

import ShipmentTable from './components/ShipmentTable';
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { toast } from "react-toastify";

dayjs.locale("vi");

const AdminShipmentPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Giao hàng</h1>
      </div>

      {/* Table */}
      <ShipmentTable />

    </div>
  );
};

export default AdminShipmentPage;
