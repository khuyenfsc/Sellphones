import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, MapPin, Truck, Calendar, Package, Warehouse, DollarSign, Hash } from "lucide-react";import ProductInventorySelector from "./ProductInventorySelector";
import ShipmentInfoForm from "./ShipmentInfoForm";
;

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
  const [partner, setPartner] = useState("ViettelPost");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [code, setCode] = useState("");
  const [shippingFee, setShippingFee] = useState("");

  // Product inventories
  const [productInventories, setProductInventories] = useState([]);



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
      setPartner("ViettelPost");
      setExpectedDeliveryDate("");
      setCode("");
      setShippingFee("");
      setError("");
    }
  }, [isOpen, order]);




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
      pickupAddress,
      partner,
      expectedDeliveryDate,
      code: code.trim() || null,
      shippingFee: parseFloat(shippingFee) || 0,
      inventoryItems: Object.fromEntries(
        productInventories.map(item => ([
          item.inventoryId,
          {
            quantity: item.quantity,
            variantId: item.productVariantId
          }
        ]))
      )

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
              <ShipmentInfoForm
                pickupAddress={pickupAddress}
                setPickupAddress={setPickupAddress}
                partner={partner}
                setPartner={setPartner}
                expectedDeliveryDate={expectedDeliveryDate}
                setExpectedDeliveryDate={setExpectedDeliveryDate}
                code={code}
                setCode={setCode}
                shippingFee={shippingFee}
                setShippingFee={setShippingFee}
              />


              {/* Product Inventories */}
              <ProductInventorySelector
                productInventories={productInventories}
                setProductInventories={setProductInventories}
                setError={setError}
              />

      
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



        </>
      )}
    </AnimatePresence>
  );
}