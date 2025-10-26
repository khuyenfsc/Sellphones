import React from "react";

const ProductSpecsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Nội dung modal */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Thông số kỹ thuật</h2>
          <button
            onClick={onClose}
            className="text-blue-600 text-sm hover:underline"
          >
            Đóng
          </button>
        </div>

        {/* Specs Table */}
        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Kích thước màn hình</span>
            <span className="font-medium text-black">6.9 inches</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Công nghệ màn hình</span>
            <span className="font-medium text-black">Dynamic AMOLED 2X</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Camera sau</span>
            <span className="font-medium text-black">50 MP, F1.8 + 12 MP, F2.2</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Camera trước</span>
            <span className="font-medium text-black">10 MP, F2.2</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Công nghệ NFC</span>
            <span className="font-medium text-black">Có</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Dung lượng RAM</span>
            <span className="font-medium text-black">12 GB</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Bộ nhớ trong</span>
            <span className="font-medium text-black">256 GB</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Pin</span>
            <span className="font-medium text-black">4300 mAh</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecsModal;
