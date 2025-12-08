import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, User, Package, Plus, Trash2, ChevronRight, Minus } from "lucide-react";

import CustomerSection from "./CustomerSection";
import ProductSelectionSection from "./ProductSelectionSection";
import SelectedItemsList from "./SelectedItemsList";

export default function CreateOrderModal({ isOpen, onClose, onCreate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);

  const calculateItemTotal = (variant, warranty) => {
    let basePrice = variant.currentPrice || 0;
    let totalDiscount = 0;
    const promotions = variant.promotions || [];

    promotions.forEach(promo => {
      if (!promo.config) return;

      let config = {};
      try {
        config = JSON.parse(promo.config);
      } catch (err) {
        console.error("Lỗi parse config:", promo.config);
        return;
      }

      // Giảm theo số tiền
      if (config.value) {
        basePrice -= config.value;
        totalDiscount += config.value;
      }

      // Giảm theo phần trăm
      if (config.percent) {
        const discount = basePrice * (config.percent / 100);
        basePrice -= discount;
        totalDiscount += discount;
      }
    });

    if (basePrice < 0) basePrice = 0;

    const warrantyPrice = warranty?.price || 0;
    const total = basePrice + warrantyPrice;

    return { total, basePrice, totalDiscount, warrantyPrice };
  };

  const calculateItemTotalWithQuantity = (item) => {
    const { total } = calculateItemTotal(item.variant, item.warranty);
    return total * item.quantity;
  };

  const handleCreate = async () => {
    if (!selectedCustomer) {
      setError("Bạn phải chọn khách hàng");
      return;
    }

    if (selectedItems.length === 0) {
      setError("Bạn phải thêm ít nhất 1 sản phẩm");
      return;
    }

    const variantsRequest = {};

    selectedItems.forEach((item) => {
      variantsRequest[item.variant.id] = {
        warranty: item.warranty.id,
        quantity: item.quantity
      };
    });

    const payload = {
      customerInfoId: selectedCustomer.id,
      variants: variantsRequest
    };

    setLoading(true);
    await onCreate(payload);
    setLoading(false);
    onClose();
  };

  const totalPrice = selectedItems.reduce((sum, item) => sum + calculateItemTotalWithQuantity(item), 0);
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-gray-900 shadow-2xl z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header - Fixed */}
              <div className="flex-shrink-0 bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  Tạo đơn hàng mới
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-auto px-6 py-6 space-y-6">

                {/* ==================== CUSTOMER SECTION ==================== */}
                <CustomerSection selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} />

                {/* ==================== ADD PRODUCT SECTION ==================== */}
                <ProductSelectionSection 
                  calculateItemTotal={calculateItemTotal} 
                  setError={setError} 
                  setSelectedItems={setSelectedItems}
                />
                {/* ==================== SELECTED ITEMS LIST ==================== */}
                <SelectedItemsList 
                  selectedItems={selectedItems}
                  totalPrice={totalPrice}
                  setSelectedItems={setSelectedItems}
                  calculateItemTotalWithQuantity={calculateItemTotalWithQuantity}
                />

                {error && (
                  <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
              </div>

              {/* Footer - Fixed */}
              <div className="flex-shrink-0 bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-3">
                {selectedItems.length > 0 && (
                  <div className="flex justify-between items-center text-white mb-2">
                    <span className="text-lg font-semibold">Tổng thanh toán:</span>
                    <span className="text-2xl font-bold text-green-400">{totalPrice.toLocaleString()}đ</span>
                  </div>
                )}

                <button
                  onClick={handleCreate}
                  disabled={loading || !selectedCustomer || selectedItems.length === 0}
                  className="w-full px-4 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold text-lg transition-colors"
                >
                  {loading ? "Đang tạo đơn..." : "Tạo đơn hàng"}
                </button>

                <button
                  onClick={onClose}
                  className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


    </>
  );
}