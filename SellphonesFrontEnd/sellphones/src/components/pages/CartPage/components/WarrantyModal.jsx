import React from "react";

const WarrantyModal = ({
  selectedWarrantyItem,
  cartItems,
  handleSelectWarranty,
  setSelectedWarrantyItem,
}) => {
  if (!selectedWarrantyItem) return null;

  const selectedItem = cartItems.find((it) => it.id === selectedWarrantyItem);
  if (!selectedItem) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-5 w-[90%] max-w-md shadow-lg animate-fadeIn">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Chọn gói bảo hành
        </h3>

        {selectedItem.warranties.map((w) => (
          <label
            key={w.id}
            className="flex items-start gap-3 border rounded-lg p-3 mb-2 cursor-pointer hover:bg-gray-50"
          >
            <input
              type="radio"
              name="warranty"
              value={w.id}
              checked={selectedItem.selectedWarranty?.id === w.id}
              onChange={() => handleSelectWarranty(selectedItem.id, w)}
              className="mt-1 accent-red-600"
            />
            <div>
              <p className="font-medium text-gray-900">{w.name}</p>
              <p className="text-sm text-gray-600">{w.description}</p>
              <p className="text-sm text-gray-800 mt-1">
                {w.price === 0 ? "Miễn phí" : `+${w.price.toLocaleString()}₫`}
              </p>
            </div>
          </label>
        ))}

        <div className="flex justify-end mt-4">
          <button
            onClick={() => setSelectedWarrantyItem(null)}
            className="text-sm text-gray-600 hover:text-gray-800 font-medium"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarrantyModal;
