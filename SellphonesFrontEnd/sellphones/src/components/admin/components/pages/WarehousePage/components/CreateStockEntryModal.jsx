import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
// import SupplierPickModal from "./SupplierPickModal";
// import InventoryPickModal from "./InventoryPickModal";

function CreateStockEntryModal({ isOpen, onClose, onCreate }) {
  const [openSupplierModal, setOpenSupplierModal] = useState(false);
  const [openInventoryModal, setOpenInventoryModal] = useState(false);

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedInventory, setSelectedInventory] = useState(null);

  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setSelectedSupplier(null);
    setSelectedInventory(null);
    setQuantity("");
    setPurchasePrice("");
    setError("");
  };

  const handleCreate = async () => {
    if (!selectedInventory) {
      setError("Bạn phải chọn một Inventory");
      return;
    }
    if (!quantity || Number(quantity) <= 0) {
      setError("Số lượng phải lớn hơn 0");
      return;
    }
    if (!purchasePrice || Number(purchasePrice) <= 0) {
      setError("Giá phải lớn hơn 0");
      return;
    }

    setError("");
    setLoading(true);

    await onCreate({
      inventoryId: selectedInventory.id,
      quantity: Number(quantity),
      purchasePrice: Number(purchasePrice),
    });

    setLoading(false);
    resetForm();
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!openSupplierModal && !openInventoryModal) onClose();
              }}
            />

            {/* Main Modal */}
            <motion.div
              className="fixed top-0 right-0 h-full w-[420px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h2 className="text-xl font-semibold mb-6 text-white">
                Tạo mới Stock Entry
              </h2>

              <div className="space-y-5">
                {/* Chọn Inventory (flow: Supplier → Inventory) */}
                <div>
                  <label className="text-gray-300 block mb-1">Inventory</label>
                  {selectedInventory ? (
                    <div className="p-3 bg-gray-800 rounded text-white">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium">{selectedInventory.productVariantName}</div>
                          <div className="text-sm text-gray-400 mt-1">
                            Supplier: {selectedSupplier?.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            SL hiện tại: {selectedInventory.quantity}
                          </div>
                        </div>
                        <button
                          onClick={() => setOpenSupplierModal(true)}
                          className="text-blue-400 hover:text-blue-300 text-sm ml-2"
                        >
                          Thay đổi
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setOpenSupplierModal(true)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Chọn Inventory
                    </button>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-gray-300 block mb-1">Số lượng nhập</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Nhập số lượng"
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="text-gray-300 block mb-1">Giá nhập (VNĐ)</label>
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => {
                      setPurchasePrice(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Nhập giá"
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  onClick={handleCreate}
                  disabled={loading}
                  className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? "Đang tạo..." : "Tạo Stock Entry"}
                </button>

                <button
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  className="mt-2 w-full px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Step 1: Pick Supplier */}
      {/* <SupplierPickModal
        isOpen={openSupplierModal}
        onClose={() => setOpenSupplierModal(false)}
        onPick={(supplier) => {
          setSelectedSupplier(supplier);
          setSelectedInventory(null); // reset inventory
          setOpenSupplierModal(false);
          setOpenInventoryModal(true); // mở modal inventory
        }}
      /> */}

      {/* Step 2: Pick Inventory */}
      {/* <InventoryPickModal
        isOpen={openInventoryModal}
        supplierId={selectedSupplier?.id}
        onClose={() => setOpenInventoryModal(false)}
        onPick={(inventory) => {
          setSelectedInventory(inventory);
          setOpenInventoryModal(false);
        }}
      /> */}
    </>
  );
}

export default CreateStockEntryModal;
