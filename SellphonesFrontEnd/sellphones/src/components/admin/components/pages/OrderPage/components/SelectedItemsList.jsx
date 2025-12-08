// SelectedItemsList.jsx
import { Minus, Plus, Trash2 } from "lucide-react";

export default function SelectedItemsList({
    selectedItems,
    totalPrice,
    setSelectedItems,
    calculateItemTotalWithQuantity,
}) {

    const removeItem = (idx) => {
        setSelectedItems((prev) => prev.filter((_, i) => i !== idx));
    };

    const updateQuantity = (idx, newQuantity) => {
        if (newQuantity < 1) return;

        setSelectedItems((prev) =>
            prev.map((item, i) => {
                if (i === idx) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };
    if (selectedItems.length === 0) return null;

    return (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-white font-semibold mb-4 flex items-center justify-between">
                <span>Sản phẩm đã chọn ({selectedItems.length})</span>
                <span className="text-green-400 text-sm">{totalPrice.toLocaleString()}đ</span>
            </h3>

            <div className="space-y-3">
                {selectedItems.map((item, idx) => (
                    <div key={idx} className="bg-gray-700 rounded-lg p-3">
                        <div className="flex gap-3">
                            <img
                                src={item.image}
                                alt={item.productName}
                                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                            />

                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-white text-sm mb-1">{item.productName}</h4>
                                <p className="text-xs text-gray-300 mb-2">{item.variant.productVariantName}</p>

                                {/* Giá gốc */}
                                {item.totalDiscount > 0 && (
                                    <p className="text-xs text-gray-400 line-through">
                                        {item.originalPrice.toLocaleString()}đ
                                    </p>
                                )}

                                {/* Giá sau giảm */}
                                <div className="flex items-center gap-2 mb-2">
                                    <p className="text-red-400 font-semibold">
                                        {item.price.toLocaleString()}đ
                                    </p>
                                    {item.totalDiscount > 0 && (
                                        <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded">
                                            -{item.totalDiscount.toLocaleString()}đ
                                        </span>
                                    )}
                                </div>

                                {/* Khuyến mãi */}
                                {item.promotions && item.promotions.length > 0 && (
                                    <div className="space-y-1 mb-2">
                                        {item.promotions.map((promo, pIdx) => (
                                            <p key={pIdx} className="text-xs text-green-400 flex items-start gap-1">
                                                <span>🎁</span>
                                                <span className="line-clamp-1">{promo.name}</span>
                                            </p>
                                        ))}
                                    </div>
                                )}

                                {/* Bảo hành */}
                                <div className="bg-gray-600 rounded px-2 py-1 inline-block mb-2">
                                    <p className="text-xs text-gray-300">
                                        Bảo hành: <span className="text-white font-medium">{item.warranty.name}</span>
                                    </p>
                                    <p className="text-xs text-blue-400">
                                        +{item.warrantyPrice.toLocaleString()}đ
                                    </p>
                                </div>

                                {/* Số lượng */}
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => updateQuantity(idx, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className="w-7 h-7 flex items-center justify-center bg-gray-600 hover:bg-gray-500
                    disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>

                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            if (!isNaN(val) && val > 0) updateQuantity(idx, val);
                                        }}
                                        className="w-16 h-7 bg-gray-600 text-white text-center rounded border border-gray-500
                    focus:border-blue-500 focus:outline-none"
                                    />

                                    <button
                                        onClick={() => updateQuantity(idx, item.quantity + 1)}
                                        className="w-7 h-7 flex items-center justify-center bg-gray-600 hover:bg-gray-500 
                    text-white rounded transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>

                                    <span className="text-xs text-gray-400 ml-1">
                                        x {item.total.toLocaleString()}đ
                                    </span>
                                </div>
                            </div>

                            {/* Xóa + Tổng */}
                            <div className="flex flex-col items-end justify-between flex-shrink-0">
                                <button
                                    onClick={() => removeItem(idx)}
                                    className="text-red-400 hover:text-red-300 transition-colors"
                                    title="Xóa sản phẩm"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>

                                <div className="text-right">
                                    <p className="text-xs text-gray-400 mb-1">Tổng:</p>
                                    <p className="text-white font-bold text-base whitespace-nowrap">
                                        {calculateItemTotalWithQuantity(item).toLocaleString()}đ
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
