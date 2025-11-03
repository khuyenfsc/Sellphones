import React from "react";
import { Gift, Shield, Minus, Plus, Trash2 } from "lucide-react";

const CartItemSection = ({
  item,
  calculateItemTotal,
  handleSelectItem,
  handleQuantityChange,
  handleDeleteItem,
  setSelectedWarrantyItem,
  formatPrice
}) => {
  const { total, totalDiscount, warrantyPrice } = calculateItemTotal(item);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="flex items-start gap-4">
        {/* Checkbox chọn sản phẩm */}
        <input
          type="checkbox"
          checked={item.selected}
          onChange={() => handleSelectItem(item.id)}
          className="appearance-none w-5 h-5 rounded-full border-2 border-blue-600 bg-white cursor-pointer transition-all duration-200 relative checked:bg-blue-600 checked:border-blue-600 checked:before:content-['✓'] checked:before:absolute checked:before:text-white checked:before:inset-0 checked:before:flex checked:before:items-center checked:before:justify-center checked:before:text-[12px] checked:before:font-bold"
        />

        {/* Hình ảnh */}
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-lg"
        />

        <div className="flex-1">
          {/* Tên sản phẩm */}
          <a
            href={`/product/${item.productId}?variant=${item.variantId}`}
            className="font-medium text-gray-900 mb-1 hover:text-blue-600 transition-colors"
          >
            {item.name}
          </a>
          <p className="text-sm text-gray-500 mb-3">{item.brand}</p>

          {/* Giá */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl font-bold text-red-600">{formatPrice(item.price)}</span>
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(item.originalPrice)}
            </span>
          </div>

          {/* Khuyến mãi */}
          {item.promotions?.length > 0 && (
            <div className="bg-red-50 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <Gift className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-600 text-sm mb-2">
                    Khuyến mãi hấp dẫn
                  </p>
                  <ul className="space-y-1">
                    {item.promotions.map((promo, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        <span className="font-medium text-gray-800">
                          {promo.name}
                        </span>
                        : {promo.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Gói bảo hành */}
          {item.warranties?.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Shield className="w-5 h-5 text-gray-800" />
                  <span>Bảo vệ toàn diện ({item.warranties.length} gói)</span>
                </div>
                <button
                  onClick={() => setSelectedWarrantyItem(item.id)}
                  className="text-red-600 text-sm font-medium hover:underline"
                >
                  Chọn gói
                </button>
              </div>

              {item.selectedWarranty && (
                <div className="ml-7 text-sm text-gray-800 bg-gray-50 rounded-lg p-2">
                  <p className="font-medium">{item.selectedWarranty.name}</p>
                  <p className="text-gray-600">
                    {item.selectedWarranty.description}
                  </p>
                  <p className="text-gray-800 mt-1">
                    +{item.selectedWarranty.price.toLocaleString()}₫
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Quà tặng kèm */}
          {item.giftProducts?.length > 0 && (
            <div className="mt-3 bg-green-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="font-medium text-green-700 text-sm">
                  Quà tặng kèm
                </span>
              </div>
              <ul className="space-y-2 ml-7">
                {item.giftProducts.map((gift, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <img
                      src={gift.thumbnail}
                      alt={gift.name}
                      className="w-10 h-10 object-cover rounded-md border"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{gift.name}</p>
                      <p className="text-xs text-gray-500">
                        {gift.price > 0
                          ? `+${formatPrice(gift.price)}`
                          : "Miễn phí"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tổng giá */}
          <div className="text-sm text-gray-700 mt-3">
            <p>Giá gốc: {formatPrice(item.price)}</p>
            {totalDiscount > 0 && (
              <p className="text-green-600">
                Giảm khuyến mãi: −{formatPrice(totalDiscount)}
              </p>
            )}
            {warrantyPrice > 0 && (
              <p className="text-blue-600">
                Bảo hành thêm: +{formatPrice(warrantyPrice)}
              </p>
            )}
            <p className="font-semibold text-red-600 mt-1">
              Tạm tính: {formatPrice(total)}
            </p>
          </div>

          {/* Số lượng */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(item.id, -1)}
                className="p-2 hover:bg-gray-100 transition"
              >
                <Minus className="w-4 h-4 text-black" />
              </button>
              <span className="w-12 text-center font-medium text-black">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.id, 1)}
                className="p-2 hover:bg-gray-100 transition"
              >
                <Plus className="w-4 h-4 text-black" />
              </button>
            </div>

            <button
              onClick={() => handleDeleteItem(item.id)}
              className="p-2 hover:bg-red-50 rounded-lg transition"
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemSection;
