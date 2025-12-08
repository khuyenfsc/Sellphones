import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AdminWarehouseService from "../../../../service/AdminWarehouseService";
import { X, MapPin, Truck, Calendar, Package, Warehouse, DollarSign, Hash } from "lucide-react";

// Mock services - replace with your actual services
// const WarehouseService = {
//   getWarehouses: async () => ({
//     success: true,
//     data: [
//       { id: 1, name: "Kho Hà Nội" },
//       { id: 2, name: "Kho TP.HCM" },
//       { id: 3, name: "Kho Đà Nẵng" }
//     ]
//   })
// };

// const InventoryService = {
//   getInventories: async ({ warehouseId, productVariantId }) => ({
//     success: true,
//     data: {
//       result: [
//         { id: 1, quantity: 50, warehouseId, productVariantId },
//         { id: 2, quantity: 30, warehouseId, productVariantId },
//         { id: 3, quantity: 5, warehouseId, productVariantId }
//       ]
//     }
//   })
// };


function WarehousePickModal({ isOpen, onClose, onPick }) {
  const [query, setQuery] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [loading, setLoading] = useState(false);

  const resetAll = () => {
    setQuery("");
    setWarehouses([]);
    setTotal(0);
    setPage(0);
  };

  const loadWarehouses = async (page = 0, keyword = null, append = false) => {
    setLoading(true);
    try {
      const res = await AdminWarehouseService.getWarehouses({
        keyword: keyword || null,
        page,
        size: pageSize,
      });

      if (res.success) {
        const list = res.data.result || [];
        if (append) {
          setWarehouses(prev => [...prev, ...list]);
        } else {
          setWarehouses(list);
        }
        setTotal(res.data.total || 0);
        setPage(page);
      } else {
        toast.error(res.message || "Không thể tải danh sách kho");
      }
    } catch (err) {
      toast.error("Lỗi khi tải danh sách kho");
    }
    setLoading(false);
  };

  const loadMore = () => {
    if (warehouses.length >= total) return;
    loadWarehouses(page + 1, query.trim() ? query.trim() : null, true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      loadWarehouses(0, query.trim() ? query.trim() : null, false);
    }
  };

  const clearInput = () => {
    setQuery("");
    loadWarehouses(0, null, false);
  };

  const handleSelect = (warehouse) => {
    onPick(warehouse);
    resetAll();
  };

  useEffect(() => {
    if (isOpen) {
      resetAll();
      loadWarehouses(0, null, false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-[400px] bg-gray-900 z-[90] shadow-xl p-6 overflow-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-white">
              Chọn Kho Hàng
            </h2>

            {/* Search */}
            <div className="mb-4 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full px-3 py-2 rounded bg-gray-800 text-white"
                placeholder="Nhập tên kho và Enter..."
              />
              {query && (
                <button
                  onClick={clearInput}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <XCircle size={18} />
                </button>
              )}
            </div>

            {/* Loading */}
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {/* List */}
                <div className="space-y-2 max-h-[70vh] overflow-auto">
                  {warehouses.map(wh => (
                    <div
                      key={wh.id}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded cursor-pointer transition-colors"
                      onClick={() => handleSelect(wh)}
                    >
                      <div className="flex items-center gap-2">
                        <Warehouse className="w-4 h-4 text-blue-400" />
                        <span className="font-medium">{wh.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load more */}
                {total > warehouses.length && (
                  <div className="mt-2 text-right">
                    <span
                      className="text-blue-400 text-sm hover:underline cursor-pointer"
                      onClick={loadMore}
                    >
                      Xem thêm {total - warehouses.length} kho...
                    </span>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


// Inventory Selection Modal

function InventoryPickModal({
  isOpen,
  onClose,
  onPick,
  warehouseId,
  productVariantId,
  minQuantity
}) {
  const [inventories, setInventories] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [loading, setLoading] = useState(false);

  // reset state
  const resetAll = () => {
    setInventories([]);
    setTotal(0);
    setPage(0);
  };

  // load inventories with paging
  const loadInventories = async (page = 0, append = false) => {
    if (!warehouseId || !productVariantId) return;

    setLoading(true);
    try {
      const res = await AdminWarehouseService.getInventories(warehouseId, {
        productVariantId,
        page,
        size: pageSize
      });

      if (res.success) {
        const list = res.data.result || [];

        if (append) {
          setInventories(prev => [...prev, ...list]);
        } else {
          setInventories(list);
        }

        setTotal(res.data.total || 0);
        setPage(page);
      } else {
        toast.error(res.message || "Không thể tải tồn kho");
      }
    } catch (err) {
      console.error("Lỗi tải inventory:", err);
      toast.error("Lỗi khi tải tồn kho");
    }

    setLoading(false);
  };

  // Load more
  const loadMore = () => {
    if (inventories.length >= total) return;
    loadInventories(page + 1, true);
  };

  // Load data when modal opens
  useEffect(() => {
    if (isOpen) {
      resetAll();
      loadInventories(0, false);
    }
  }, [isOpen, warehouseId, productVariantId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[400px] bg-gray-900 z-[90] shadow-xl p-6 overflow-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-white">
              Chọn Inventory
            </h2>

            {/* Loading */}
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {/* List */}
                <div className="space-y-2 max-h-[70vh] overflow-auto">
                  {inventories.map(inv => {
                    const isDisabled = inv.quantity < minQuantity;
                    return (
                      <div
                        key={inv.id}
                        className={`px-4 py-3 rounded transition-colors ${isDisabled
                          ? "bg-gray-800 opacity-50 cursor-not-allowed"
                          : "bg-gray-800 hover:bg-gray-700 cursor-pointer"
                          }`}
                        onClick={() => {
                          if (!isDisabled) {
                            onPick(inv);
                            onClose();
                          }
                        }}
                      >
                        <div className="flex items-center justify-between text-white">
                          <span className="font-medium">Inventory #{inv.id}</span>
                          <span
                            className={`text-sm ${isDisabled ? "text-red-400" : "text-green-400"
                              }`}
                          >
                            Tồn: {inv.quantity}
                          </span>
                        </div>

                        {isDisabled && (
                          <p className="text-xs text-red-400 mt-1">
                            Không đủ số lượng (cần {minQuantity})
                          </p>
                        )}
                      </div>
                    );
                  })}

                  {inventories.length === 0 && (
                    <div className="text-center text-gray-400 py-6">
                      Không tìm thấy inventory
                    </div>
                  )}
                </div>

                {/* Load more */}
                {total > inventories.length && (
                  <div className="mt-3 text-right">
                    <span
                      onClick={loadMore}
                      className="text-blue-400 text-sm hover:underline cursor-pointer"
                    >
                      Xem thêm {total - inventories.length} kho hàng...
                    </span>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Main Component
export default function CreateShipmentModal({ isOpen, onClose, onCreate, order }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [pickupAddress, setPickupAddress] = useState({
    street: "",
    ward: "",
    district: "",
    province: ""
  });
  const [shippingProvider, setShippingProvider] = useState("ViettelPost");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [shippingFee, setShippingFee] = useState("");

  // Product inventories
  const [productInventories, setProductInventories] = useState([]);

  // Modal states
  const [warehouseModalOpen, setWarehouseModalOpen] = useState(false);
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);

  useEffect(() => {
    if (isOpen && order) {
      // Initialize product inventories from order
      const items = order.orderVariants?.map(ov => ({
        orderVariantId: ov.id,
        productVariantId: ov.productVariant.id,
        productVariantName: ov.productVariant.productVariantName,
        quantity: ov.quantity,
        warehouseId: null,
        warehouseName: null,
        inventoryId: null
      })) || [];
      setProductInventories(items);

      // Reset form
      setPickupAddress({
        street: "",
        ward: "",
        district: "",
        province: ""
      });
      setShippingProvider("ViettelPost");
      setExpectedDeliveryDate("");
      setTrackingCode("");
      setShippingFee("");
      setError("");
    }
  }, [isOpen, order]);

  const handleWarehousePick = (warehouse) => {
    if (currentProductIndex !== null) {
      const newItems = [...productInventories];
      newItems[currentProductIndex] = {
        ...newItems[currentProductIndex],
        warehouseId: warehouse.id,
        warehouseName: warehouse.name,
        inventoryId: null  // reset
      };
      setProductInventories(newItems);
    }

    // Đóng modal chọn kho
    setWarehouseModalOpen(false);

    // Mở modal chọn inventory ngay sau khi chọn kho
    setTimeout(() => {
      setInventoryModalOpen(true);
    }, 150);
  };

  const handleInventoryPick = (inventory) => {
    if (currentProductIndex !== null) {
      const newItems = [...productInventories];
      newItems[currentProductIndex] = {
        ...newItems[currentProductIndex],
        inventoryId: inventory.id
      };
      setProductInventories(newItems);
    }
  };

  const handleCreate = async () => {
    // Validate address fields
    console.log("pickupAddress hiện tại:", pickupAddress);
    if (!pickupAddress.street.trim() ||
      !pickupAddress.ward.trim() ||
      !pickupAddress.district.trim() ||
      !pickupAddress.province.trim()) {
      setError("Vui lòng nhập đầy đủ địa chỉ: số nhà/đường, phường/xã, quận/huyện, tỉnh/thành phố");
      return;
    }

    if (!expectedDeliveryDate) {
      setError("Vui lòng chọn ngày giao hàng dự kiến");
      return;
    }

    const incompleteProducts = productInventories.filter(
      item => !item.warehouseId || !item.inventoryId
    );

    if (incompleteProducts.length > 0) {
      setError("Vui lòng chọn kho và inventory cho tất cả sản phẩm");
      return;
    }

    const payload = {
      orderId: order.id,
      pickupAddress, // 👈 gửi dạng object theo BE yêu cầu
      shippingProvider,
      expectedDeliveryDate,
      trackingCode: trackingCode.trim() || null,
      shippingFee: parseFloat(shippingFee) || 0,
      productInventories: productInventories.map(item => ({
        orderVariantId: item.orderVariantId,
        inventoryId: item.inventoryId
      }))
    };

    setLoading(true);
    setError("");
    await onCreate(payload);
    setLoading(false);
    onClose();
  };


  if (!order) return null;

  return (
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
            className="fixed top-0 right-0 h-full w-full max-w-3xl bg-gray-900 shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Tạo Đơn Ship - #{order.id}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto px-6 py-6 space-y-6">

              {/* Pickup Address */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <h3 className="text-white font-semibold">Địa chỉ lấy hàng</h3>
                </div>

                {/* Street */}
                <div className="mb-3">
                  <label className="text-gray-300 text-sm">Số nhà / Đường</label>
                  <input
                    type="text"
                    value={pickupAddress.street}
                    onChange={(e) =>
                      setPickupAddress({ ...pickupAddress, street: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                    placeholder="VD: 12 Nguyễn Trãi"
                  />
                </div>

                {/* Ward */}
                <div className="mb-3">
                  <label className="text-gray-300 text-sm">Phường / Xã</label>
                  <input
                    type="text"
                    value={pickupAddress.ward}
                    onChange={(e) =>
                      setPickupAddress({ ...pickupAddress, ward: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                    placeholder="VD: Phường 5"
                  />
                </div>

                {/* District */}
                <div className="mb-3">
                  <label className="text-gray-300 text-sm">Quận / Huyện</label>
                  <input
                    type="text"
                    value={pickupAddress.district}
                    onChange={(e) =>
                      setPickupAddress({ ...pickupAddress, district: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                    placeholder="VD: Quận 3"
                  />
                </div>

                {/* Province */}
                <div>
                  <label className="text-gray-300 text-sm">Tỉnh / Thành phố</label>
                  <input
                    type="text"
                    value={pickupAddress.province}
                    onChange={(e) =>
                      setPickupAddress({ ...pickupAddress, province: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                    placeholder="VD: TP. Hồ Chí Minh"
                  />
                </div>
              </div>

              {/* Shipping Provider */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="w-5 h-5 text-green-400" />
                  <h3 className="text-white font-semibold">Đơn vị vận chuyển</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {["ViettelPost", "GHN"].map(provider => (
                    <button
                      key={provider}
                      onClick={() => setShippingProvider(provider)}
                      className={`px-4 py-3 rounded-lg font-medium transition-colors ${shippingProvider === provider
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </div>

              {/* Expected Delivery Date */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <h3 className="text-white font-semibold">Ngày giao hàng dự kiến</h3>
                </div>
                <input
                  type="date"
                  value={expectedDeliveryDate}
                  onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Tracking Code & Shipping Fee */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Hash className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-white font-semibold">Mã vận đơn</h3>
                  </div>
                  <input
                    type="text"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="VTP123456..."
                  />
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <h3 className="text-white font-semibold">Phí ship</h3>
                  </div>
                  <input
                    type="number"
                    value={shippingFee}
                    onChange={(e) => setShippingFee(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Product Inventories */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-orange-400" />
                  <h3 className="text-white font-semibold">Chọn Kho & Inventory</h3>
                </div>

                <div className="space-y-3">
                  {productInventories.map((item, index) => (
                    <div key={item.orderVariantId} className="bg-gray-700 rounded-lg p-4">
                      <div className="mb-3">
                        <p className="text-white font-medium">{item.productVariantName}</p>
                        <p className="text-sm text-gray-400">Số lượng: {item.quantity}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Select Warehouse */}
                        <button
                          onClick={() => {
                            setCurrentProductIndex(index);
                            setWarehouseModalOpen(true);
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${item.warehouseId
                            ? "bg-blue-600 text-white"
                            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                            }`}
                        >
                          {item.warehouseName || "Chọn kho"}
                        </button>

                        {/* Select Inventory */}
                        <button
                          onClick={() => {
                            if (!item.warehouseId) {
                              setError("Vui lòng chọn kho trước");
                              return;
                            }
                            setCurrentProductIndex(index);
                            setInventoryModalOpen(true);
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${item.inventoryId
                            ? "bg-green-600 text-white"
                            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                            }`}
                          disabled={!item.warehouseId}
                        >
                          {item.inventoryId ? `Inventory #${item.inventoryId}` : "Chọn inventory"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-3">
              <button
                onClick={handleCreate}
                disabled={loading}
                className="w-full px-4 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold text-lg transition-colors"
              >
                {loading ? "Đang tạo..." : "Tạo Đơn Ship"}
              </button>

              <button
                onClick={onClose}
                className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                Đóng
              </button>
            </div>
          </motion.div>

          {/* Warehouse Modal */}
          <WarehousePickModal
            isOpen={warehouseModalOpen}
            onClose={() => setWarehouseModalOpen(false)}
            onPick={handleWarehousePick}
          />

          {/* Inventory Modal */}
          {currentProductIndex !== null && (
            <InventoryPickModal
              isOpen={inventoryModalOpen}
              onClose={() => setInventoryModalOpen(false)}
              onPick={handleInventoryPick}
              warehouseId={productInventories[currentProductIndex]?.warehouseId}
              productVariantId={productInventories[currentProductIndex]?.productVariantId}
              minQuantity={productInventories[currentProductIndex]?.quantity}
            />
          )}

        </>
      )}
    </AnimatePresence>
  );
}