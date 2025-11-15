// AdminProductPage.jsx
import React, { useState } from "react";
import ProductTable from "./components/ProductTable";
import CreateProductModal from "./components/CreateProductModal";
import { toast } from "react-toastify";
import AdminProductService from "../../../service/AdminProductService";

const AdminProductPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isReloaded, setIsReloaded] = useState(true);

  const handleCreateProduct = async ({ name, description, categoryId, brandId, thumbnail, images }) => {
    try {
      const productData = { name, description, categoryId, brandId };

      // Gọi API tạo sản phẩm kèm thumbnail và images
      const res = await AdminProductService.createProduct(productData, thumbnail, images);

      if (res.success) {
        // Thêm sản phẩm mới vào danh sách local (tùy ý)
        setIsReloaded(!isReloaded);
        toast.success("Tạo sản phẩm thành công!");
      } else {
        toast.error(res.message || "Tạo sản phẩm thất bại!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã xảy ra lỗi khi tạo sản phẩm");
    } 
  };


  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Sản phẩm</h1>
        <button
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Tạo sản phẩm
        </button>
      </div>

      <ProductTable isReloaded={isReloaded}/>

      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProduct}
      />

    </div>
  );
};

export default AdminProductPage;
