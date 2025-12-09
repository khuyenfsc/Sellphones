import { Package } from "lucide-react";
import React, { useEffect, useState } from "react";
import WarehousePickModal from "./WarehousePickModal";
import InventoryPickModal from "./InventoryPickModal";

export default function ProductInventorySelector({
    productInventories,
    setProductInventories,
    setError
}) {

    // Modal states
    const [warehouseModalOpen, setWarehouseModalOpen] = useState(false);
    const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
    const [currentProductIndex, setCurrentProductIndex] = useState(null);
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

    return (
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
                                {item.inventoryId
                                    ? `Inventory #${item.inventoryId}`
                                    : "Chọn inventory"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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
        </div>
    );
}
