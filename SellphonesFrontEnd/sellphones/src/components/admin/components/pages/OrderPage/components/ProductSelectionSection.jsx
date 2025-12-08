// ProductSelectionSection.jsx
import { Package, Plus, ChevronRight } from "lucide-react";
import { useState } from "react";
import ProductPickModal from "../../WarehousePage/components/ProductPickModal";
import VariantPickModal from "../../WarehousePage/components/VariantPickModal";
import WarrantyPickModal from "./WarrantyPickModal";

export default function ProductSelectionSection({ 
    calculateItemTotal,
    setError,
    setSelectedItems
}) {

    const [productOpen, setProductOpen] = useState(false);
    const [variantOpen, setVariantOpen] = useState(false);
    const [warrantyOpen, setWarrantyOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedWarranty, setSelectedWarranty] = useState(null);

    const addItemToOrder = () => {
        if (!selectedProduct || !selectedVariant || !selectedWarranty) {
            setError("Bạn phải chọn đầy đủ Product - Variant - Warranty");
            return;
        }
        setError("");

        const { total, basePrice, totalDiscount, warrantyPrice } = calculateItemTotal(selectedVariant, selectedWarranty);

        const newItem = {
            productId: selectedProduct.id,
            productName: selectedProduct.productName,
            variant: selectedVariant,
            warranty: selectedWarranty,
            image: selectedVariant.variantImage || selectedProduct.image || "https://via.placeholder.com/100",
            originalPrice: selectedVariant.rootPrice || selectedVariant.currentPrice || 0,
            price: basePrice,
            totalDiscount: totalDiscount,
            warrantyPrice: warrantyPrice,
            promotions: selectedVariant.promotions || [],
            total: total,
            quantity: 1
        };
        

        setSelectedItems((prev) => [...prev, newItem]);

        setSelectedProduct(null);
        setSelectedVariant(null);
        setSelectedWarranty(null);
    };


    const resetProductSelection = () => {
        setSelectedProduct(null);
        setSelectedVariant(null);
        setSelectedWarranty(null);
    };
    return (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-3">
                <Package className="w-5 h-5 text-green-400" />
                <h3 className="text-white font-semibold">Thêm sản phẩm</h3>
            </div>

            <div className="space-y-3">
                {/* STEP 1: Select Product */}
                {!selectedProduct && (
                    <button
                        onClick={() => setProductOpen(true)}
                        className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Chọn sản phẩm
                    </button>
                )}

                {/* STEP 2: Select Variant */}
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

                {/* STEP 3: Select Warranty */}
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

                {/* STEP 4: Review & Add */}
                {selectedProduct && selectedVariant && selectedWarranty && (
                    <div className="space-y-3">
                        <div className="bg-gray-700 rounded-lg p-4">
                            <div className="flex gap-3 items-start">
                                <div className="flex-1 text-white">
                                    <h4 className="font-medium mb-1">{selectedProduct.productName}</h4>
                                    <p className="text-sm text-gray-300 mb-2">
                                        {selectedVariant.productVariantName}
                                    </p>

                                    {/* Display price details */}
                                    {(() => {
                                        const { basePrice, totalDiscount } = calculateItemTotal(
                                            selectedVariant,
                                            selectedWarranty
                                        );
                                        const hasDiscount = totalDiscount > 0;

                                        return (
                                            <>
                                                {hasDiscount && (
                                                    <p className="text-xs text-gray-400 line-through mb-1">
                                                        {(selectedVariant.rootPrice ||
                                                            selectedVariant.currentPrice ||
                                                            0).toLocaleString()}
                                                        đ
                                                    </p>
                                                )}

                                                <div className="flex items-center gap-2 mb-2">
                                                    <p className="text-red-400 font-semibold text-lg">
                                                        {basePrice.toLocaleString()}đ
                                                    </p>
                                                    {hasDiscount && (
                                                        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">
                                                            Giảm {totalDiscount.toLocaleString()}đ
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Promotions */}
                                                {selectedVariant.promotions &&
                                                    selectedVariant.promotions.length > 0 && (
                                                        <div className="space-y-1 mb-3">
                                                            {selectedVariant.promotions.map((promo, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="text-xs text-green-400 flex items-start gap-1"
                                                                >
                                                                    <span>🎁</span>
                                                                    <span>{promo.name}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                {/* Warranty */}
                                                <div className="bg-gray-600 rounded p-2 mt-2">
                                                    <p className="text-xs text-gray-300 mb-1">Gói bảo hành:</p>
                                                    <p className="text-sm font-medium text-white">{selectedWarranty.name}</p>
                                                    <p className="text-xs text-blue-400 mt-1">
                                                        + {(selectedWarranty.price || 0).toLocaleString()}đ
                                                    </p>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-gray-600 flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Tổng cộng:</span>
                                <span className="text-white font-bold text-lg">
                                    {(() => {
                                        const { total } = calculateItemTotal(
                                            selectedVariant,
                                            selectedWarranty
                                        );
                                        return total.toLocaleString();
                                    })()}
                                    đ
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

            <ProductPickModal
                isOpen={productOpen}
                onClose={() => {
                    setProductOpen(false);
                }}
                onPick={(product) => {
                    setSelectedProduct(product);
                    setSelectedVariant(null);
                    setSelectedWarranty(null);
                    setProductOpen(false);
                    setVariantOpen(true);
                }}
            />

            <VariantPickModal
                isOpen={variantOpen}
                productId={selectedProduct?.id}
                onClose={() => {
                    setVariantOpen(false);
                }}
                onPick={(variant) => {
                    setSelectedVariant(variant);
                    setSelectedWarranty(null);
                    setVariantOpen(false);
                    setWarrantyOpen(true);
                }}
            />

            <WarrantyPickModal
                isOpen={warrantyOpen}
                warranties={selectedVariant?.warranties || []}
                onClose={() => {
                    setWarrantyOpen(false);
                }}
                onPick={(w) => {
                    setSelectedWarranty(w);
                    setWarrantyOpen(false);
                }}
            />
        </div>
    );
}
