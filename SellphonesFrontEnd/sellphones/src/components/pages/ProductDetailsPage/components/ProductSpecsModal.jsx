import React from "react";

const ProductSpecsModal = ({ show, onClose, productVariant }) => {
  if (!show || !productVariant) return null;

  // Lấy danh sách attributeValues
  const attributes = productVariant?.attributeValues || [];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
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

        {/* Bảng hiển thị attribute */}
        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {attributes.length > 0 ? (
            attributes.map((attr, index) => (
              <div
                key={index}
                className="flex justify-between py-2 border-b"
              >
                <span className="text-gray-600">
                  {attr.attribute?.name}
                </span>
                <span className="font-medium text-black">
                  {attr.strVal || attr.numericVal}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">Không có thông số kỹ thuật.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSpecsModal;
