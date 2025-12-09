import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import AdminWarehouseService from "../../../../service/AdminWarehouseService";

export default function InventoryPickModal({
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

  // Reset internal state
  const resetAll = () => {
    setInventories([]);
    setTotal(0);
    setPage(0);
  };

  // Load inventory list
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
          setInventories((prev) => [...prev, ...list]);
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

  const loadMore = () => {
    if (inventories.length >= total) return;
    loadInventories(page + 1, true);
  };

  // Load when modal opened
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

          {/* Panel */}
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
                  {inventories.map((inv) => {
                    const isDisabled = inv.quantity < minQuantity;
                    return (
                      <div
                        key={inv.id}
                        className={`px-4 py-3 rounded transition-colors ${
                          isDisabled
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
                          <span className="font-medium">
                            Inventory #{inv.id}
                          </span>
                          <span
                            className={`text-sm ${
                              isDisabled ? "text-red-400" : "text-green-400"
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

                {/* Load More */}
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
