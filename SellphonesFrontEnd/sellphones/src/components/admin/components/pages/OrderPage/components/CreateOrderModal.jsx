import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, User, Package, Plus, Trash2, ChevronRight } from "lucide-react";
import CustomerPickModal from "./CustomerPickModal";
import ProductPickModal from "../../WarehousePage/components/ProductPickModal";
import VariantPickModal from "../../WarehousePage/components/VariantPickModal";
import WarrantyPickModal from "./WarrantyPickModal";

export default function CreateOrderModal({ isOpen, onClose, onCreate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ===== CHỌN CUSTOMER =====
  const [customerOpen, setCustomerOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // ===== CHỌN PRODUCT → VARIANT → WARRANTY =====
  const [productOpen, setProductOpen] = useState(false);
  const [variantOpen, setVariantOpen] = useState(false);
  const [warrantyOpen, setWarrantyOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedWarranty, setSelectedWarranty] = useState(null);

  // Danh sách sản phẩm đã thêm vào đơn
  const [selectedItems, setSelectedItems] = useState([]);

  // ===========================
  //   ADD ITEM
  // ===========================
  const addItemToOrder = () => {
    if (!selectedProduct || !selectedVariant || !selectedWarranty) {
      setError("Bạn phải chọn đầy đủ Product - Variant - Warranty");
      return;
    }
    setError("");

    const newItem = {
      productId: selectedProduct.id,
      productName: selectedProduct.productName,
      variant: selectedVariant,
      warranty: selectedWarranty,
      image: selectedVariant.image || selectedProduct.image || "https://via.placeholder.com/100",
      price: selectedVariant.price || 0,
      warrantyPrice: selectedWarranty.price || 0,
      total: (selectedVariant.price || 0) + (selectedWarranty.price || 0)
    };

    setSelectedItems((prev) => [...prev, newItem]);

    // Reset để chọn tiếp sản phẩm khác
    setSelectedProduct(null);
    setSelectedVariant(null);
    setSelectedWarranty(null);
  };

  // ===========================
  //   REMOVE ITEM
  // ===========================
  const removeItem = (idx) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== idx));
  };

  // ===========================
  //   RESET PRODUCT SELECTION
  // ===========================
  const resetProductSelection = () => {
    setSelectedProduct(null);
    setSelectedVariant(null);
    setSelectedWarranty(null);
  };

  // ===========================
  //   CREATE ORDER
  // ===========================
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
      variantsRequest[item.productId] = {
        variantId: item.variant.id,
        warrantyId: item.warranty.id
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

  // Tính tổng tiền
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.total, 0);

  // ===========================
  //   RENDER
  // ===========================
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
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-blue-400" />
                    <h3 className="text-white font-semibold">Thông tin khách hàng</h3>
                  </div>

                  {selectedCustomer ? (
                    <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                      <div className="text-white">
                        <p className="font-medium text-lg">{selectedCustomer.fullName}</p>
                        <p className="text-gray-300 text-sm">{selectedCustomer.phoneNumber}</p>
                      </div>
                      <button
                        onClick={() => setCustomerOpen(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Thay đổi
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setCustomerOpen(true)}
                      className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <User className="w-5 h-5" />
                      Chọn khách hàng
                    </button>
                  )}
                </div>

                {/* ==================== ADD PRODUCT SECTION ==================== */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-5 h-5 text-green-400" />
                    <h3 className="text-white font-semibold">Thêm sản phẩm</h3>
                  </div>

                  {/* Product Selection Flow */}
                  <div className="space-y-3">
                    {/* Step 1: Select Product */}
                    {!selectedProduct && (
                      <button
                        onClick={() => setProductOpen(true)}
                        className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-5 h-5" />
                        Chọn sản phẩm
                      </button>
                    )}

                    {/* Step 2: Select Variant */}
                    {selectedProduct && !selectedVariant && (
                      <div className="space-y-2">
                        <div className="bg-gray-700 rounded-lg p-3 text-white">
                          <p className="text-sm text-gray-400">Đã chọn sản phẩm:</p>
                          <p className="font-medium">{selectedProduct.productName}</p>
                        </div>
                        <button
                          onClick={() => setVariantOpen(true)}
                          className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          Chọn phiên bản
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={resetProductSelection}
                          className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                        >
                          Chọn lại sản phẩm
                        </button>
                      </div>
                    )}

                    {/* Step 3: Select Warranty */}
                    {selectedProduct && selectedVariant && !selectedWarranty && (
                      <div className="space-y-2">
                        <div className="bg-gray-700 rounded-lg p-3 text-white">
                          <p className="text-sm text-gray-400">Đã chọn:</p>
                          <p className="font-medium">{selectedProduct.productName}</p>
                          <p className="text-sm text-gray-300">{selectedVariant.productVariantName}</p>
                        </div>
                        <button
                          onClick={() => setWarrantyOpen(true)}
                          className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          Chọn bảo hành
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={resetProductSelection}
                          className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                        >
                          Chọn lại
                        </button>
                      </div>
                    )}

                    {/* Step 4: Review and Add */}
                    {selectedProduct && selectedVariant && selectedWarranty && (
                      <div className="space-y-3">
                        <div className="bg-gray-700 rounded-lg p-4">
                          <div className="flex gap-3 items-start">
                   
                            <div className="flex-1 text-white">
                              <h4 className="font-medium mb-1">{selectedProduct.productName}</h4>
                              <p className="text-sm text-gray-300 mb-1">{selectedVariant.productVariantName}</p>
                              <p className="text-red-400 font-semibold">{(selectedVariant.currentPrice || 0).toLocaleString()}đ</p>
                              <p className="text-xs text-gray-400 mt-2">Bảo hành: {selectedWarranty.name}</p>
                              <p className="text-xs text-gray-400">+ {(selectedWarranty.price || 0).toLocaleString()}đ</p>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-600 flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Tổng cộng:</span>
                            <span className="text-white font-bold text-lg">
                              {((selectedVariant.currentPrice || 0) + (selectedWarranty.price || 0)).toLocaleString()}đ
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={addItemToOrder}
                          className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          <Plus className="w-5 h-5" />
                          Thêm vào đơn hàng
                        </button>
                        <button
                          onClick={resetProductSelection}
                          className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                        >
                          Chọn lại
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* ==================== SELECTED ITEMS LIST ==================== */}
                {selectedItems.length > 0 && (
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <h3 className="text-white font-semibold mb-4 flex items-center justify-between">
                      <span>Sản phẩm đã chọn ({selectedItems.length})</span>
                      <span className="text-green-400 text-sm">{totalPrice.toLocaleString()}đ</span>
                    </h3>

                    <div className="space-y-3">
                      {selectedItems.map((item, idx) => (
                        <div key={idx} className="bg-gray-700 rounded-lg p-3 flex gap-3">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-white text-sm truncate">{item.productName}</h4>
                            <p className="text-xs text-gray-300 truncate">{item.variant.productVariantName}</p>
                            <p className="text-red-400 font-semibold text-sm mt-1">{item.price.toLocaleString()}đ</p>
                            <p className="text-xs text-gray-400">Bảo hành: {item.warranty.name} (+{item.warrantyPrice.toLocaleString()}đ)</p>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <button
                              onClick={() => removeItem(idx)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                              title="Xóa sản phẩm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <p className="text-white font-bold text-sm whitespace-nowrap">
                              {item.total.toLocaleString()}đ
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ==================== ERROR MESSAGE ==================== */}
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

      {/* ================= CHILD MODALS ================= */}

      <CustomerPickModal
        isOpen={customerOpen}
        onClose={() => setCustomerOpen(false)}
        onPick={(customer) => {
          setSelectedCustomer(customer);
          setCustomerOpen(false);
        }}
      />

      <ProductPickModal
        isOpen={productOpen}
        onClose={() => {
          setProductOpen(false);
          // Không reset state khi đóng modal
        }}
        onPick={(product) => {
          setSelectedProduct(product);
          // Reset variant và warranty khi chọn product mới
          setSelectedVariant(null);
          setSelectedWarranty(null);
          setProductOpen(false);
          // Tự động mở modal chọn variant
          setVariantOpen(true);
        }}
      />

      <VariantPickModal
        isOpen={variantOpen}
        productId={selectedProduct?.id}
        onClose={() => {
          setVariantOpen(false);
          // Không reset state khi đóng modal
        }}
        onPick={(variant) => {
          setSelectedVariant(variant);
          // Reset warranty khi chọn variant mới
          setSelectedWarranty(null);
          setVariantOpen(false);
          // Tự động mở modal chọn warranty
          setWarrantyOpen(true);
        }}
      />

      <WarrantyPickModal
        isOpen={warrantyOpen}
        warranties={selectedVariant?.warranties || []}
        onClose={() => {
          setWarrantyOpen(false);
          // Không reset state khi đóng modal
        }}
        onPick={(w) => {
          setSelectedWarranty(w);
          setWarrantyOpen(false);
        }}
      />
    </>
  );
}