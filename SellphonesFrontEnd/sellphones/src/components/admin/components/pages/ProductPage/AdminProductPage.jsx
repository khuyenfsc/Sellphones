// AdminProductPage.jsx
import React, { useState } from "react";
import ProductTable from "./components/ProductTable";
// import CreateProductModal from "./components/CreateProductModal";

const AdminProductPage = () => {
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Sản phẩm</h1>
        <button
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
          onClick={() => setIsCreateProductModalOpen(true)}
        >
          Tạo sản phẩm
        </button>
      </div>

      <ProductTable />

      {/* <CreateProductModal
        isOpen={isCreateProductModalOpen}
        onClose={() => setIsCreateProductModalOpen(false)}
      /> */}
    </div>
  );
};

export default AdminProductPage;
