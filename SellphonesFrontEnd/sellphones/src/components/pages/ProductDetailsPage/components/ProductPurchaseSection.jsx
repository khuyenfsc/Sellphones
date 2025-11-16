import React, { useState, useEffect, useRef } from "react";
import { Check, Gift, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../../../service/ProductService";
import CartService from "../../../../service/CartService";
import { toast } from "react-toastify";

const ProductPurchaseSection = ({ product, onVariantChange, initialVariantId }) => {
    const [disabledValues, setDisabledValues] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({}); // Lựa chọn tạm thời của user
    const [currentVariant, setCurrentVariant] = useState(null); // Variant đang hiển thị
    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const navigate = useNavigate();

    // Load variant ban đầu
    useEffect(() => {
        const variantIdToFetch = initialVariantId || product?.thumbnailProduct?.id;
        if (variantIdToFetch && !currentVariant) {
            fetchVariantDetail(variantIdToFetch);
        }
    }, [initialVariantId, product]);

    // Tính toán disabled values dựa trên selectedOptions
    useEffect(() => {
        if (!product?.productVariants || Object.keys(selectedOptions).length === 0) {
            setDisabledValues([]);
            return;
        }

        const attrNames = product.variantAttributeNames.split("-");
        const disabled = [];

        // Lọc các variant khả dụng dựa trên selections hiện tại
        const availableVariants = product.productVariants.filter(variant => {
            const values = variant.variantAttributeValues.split("-");
            return attrNames.every((attr, idx) => {
                const selected = selectedOptions[attr];
                return !selected || values[idx] === selected;
            });
        });

        // Đánh dấu các giá trị không khả dụng
        attrNames.forEach((attr, attrIdx) => {
            const availableValuesForThisAttr = new Set(
                availableVariants.map(v => v.variantAttributeValues.split("-")[attrIdx])
            );

            // Tất cả giá trị có thể có cho attribute này
            const allValuesForThisAttr = new Set(
                product.productVariants.map(v => v.variantAttributeValues.split("-")[attrIdx])
            );

            // Những giá trị không có trong available → disable
            allValuesForThisAttr.forEach(value => {
                if (!availableValuesForThisAttr.has(value)) {
                    disabled.push(`${attr}:${value}`);
                }
            });
        });

        setDisabledValues(disabled);
    }, [selectedOptions, product]);

    const fetchVariantDetail = async (variantId) => {
        try {
            setLoading(true);
            const res = await ProductService.getProductVariantById(variantId);
            setCurrentVariant(res);
            onVariantChange?.(res);

            // Đồng bộ selectedOptions với variant hiện tại
            const attrNames = product.variantAttributeNames.split("-");
            const variantValues = res.variantAttributeValues.split("-");
            const newSelected = {};
            attrNames.forEach((attr, idx) => {
                newSelected[attr] = variantValues[idx];
            });
            setSelectedOptions(newSelected);
        } catch (error) {
            console.error("❌ Lỗi khi tải variant:", error);
            toast.error("Không thể tải thông tin phiên bản");
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (attributeName, value) => {
        setSelectedOptions(prev => ({
            ...prev,
            [attributeName]: value,
        }));
    };

    const handleReset = () => {
        // Xóa hết các lựa chọn tạm thời (bỏ dấu tích xanh)
        // Nhưng vẫn giữ nguyên variant hiện tại đang hiển thị
        setSelectedOptions({});
    };

    const handleApplySelection = () => {
        if (!product?.productVariants) return;

        const attrNames = product.variantAttributeNames.split("-");

        // Kiểm tra đã chọn đủ chưa
        for (let attr of attrNames) {
            if (!selectedOptions[attr]) {
                toast.warning(`Vui lòng chọn ${attr}`);
                return;
            }
        }

        // Ghép thành chuỗi theo thứ tự
        const selectedStr = attrNames.map(attr => selectedOptions[attr]).join("-");

        // Tìm variant khớp
        const matchedVariant = product.productVariants.find(
            v => v.variantAttributeValues === selectedStr
        );

        if (matchedVariant) {
            // Chỉ fetch nếu khác với variant hiện tại
            if (matchedVariant.id !== currentVariant?.id) {
                fetchVariantDetail(matchedVariant.id);
            }
        } else {
            toast.error("Không tồn tại phiên bản phù hợp với lựa chọn này!");
        }
    };

    const handleAddToCart = async () => {
        if (isAdding || !currentVariant) return;
        setIsAdding(true);

        try {
            const result = await CartService.addCartItem(currentVariant.id);
            if (result.success) {
                toast.success("Đã thêm sản phẩm vào giỏ hàng!");
                setTimeout(() => navigate("/cart"), 1500);
            } else {
                toast.error(result.message || "Thêm sản phẩm thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!");
        } finally {
            setIsAdding(false);
        }
    };

    if (loading && !currentVariant) {
        return (
            <div className="col-span-6">
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <p className="text-gray-500">Đang tải...</p>
                </div>
            </div>
        );
    }

    // Lấy giá trị hiện tại của variant đang hiển thị
    const currentVariantValues = currentVariant?.variantAttributeValues?.split("-") || [];

    return (
        <div className="col-span-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Price Section */}
                <div className="grid grid-cols-2 gap-4 mb-6 bg-blue-50 border border-blue-300 p-4 rounded-lg">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Giá sản phẩm</p>
                        <p className="text-3xl font-bold text-red-600">
                            {currentVariant?.currentPrice
                                ? `${currentVariant.currentPrice.toLocaleString("vi-VN")}₫`
                                : "—"}
                        </p>
                        {currentVariant?.rootPrice && currentVariant.rootPrice !== currentVariant.currentPrice && (
                            <p className="text-sm text-gray-400 line-through">
                                {currentVariant.rootPrice.toLocaleString("vi-VN")}₫
                            </p>
                        )}
                    </div>
                </div>

                {/* Variant Selection */}
                <div className="mb-6">
                    {product?.variantAttributeNames && (
                        <>
                            {product.variantAttributeNames.split("-").map((attrName, attrIndex) => {
                                // Lấy tất cả giá trị có thể cho attribute này
                                const allValues = [
                                    ...new Set(
                                        product.productVariants.map(v => 
                                            v.variantAttributeValues.split("-")[attrIndex]
                                        )
                                    ),
                                ];

                                return (
                                    <div key={attrName} className="mb-6">
                                        <p className="font-semibold mb-3 text-black">
                                            {attrName}
                                        </p>

                                        <div className="flex flex-wrap gap-3">
                                            {allValues.map(value => {
                                                // Kiểm tra xem user đã chọn giá trị này chưa
                                                const isSelected = selectedOptions[attrName] === value;
                                                
                                                // Kiểm tra disabled (chỉ disable khi có selection)
                                                const hasSelection = Object.keys(selectedOptions).length > 0;
                                                const isDisabled = hasSelection && disabledValues.includes(`${attrName}:${value}`);

                                                return (
                                                    <button
                                                        key={value}
                                                        onClick={() => !isDisabled && handleSelect(attrName, value)}
                                                        disabled={isDisabled}
                                                        className={`px-6 py-3 rounded-lg border text-black font-medium relative transition-all
                                                            ${isSelected
                                                                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                                                                : "border-gray-300 hover:border-gray-500"
                                                            }
                                                            ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}
                                                        `}
                                                    >
                                                        {value}
                                                        {isSelected && (
                                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                                <Check className="w-4 h-4 text-white" />
                                                            </div>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-4 flex items-center gap-3">
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-black font-medium transition"
                        >
                            Đặt lại lựa chọn
                        </button>

                        <button
                            onClick={handleApplySelection}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
                        >
                            Áp dụng lựa chọn
                        </button>
                    </div>
                </div>

                {/* Promotion Section */}
                {currentVariant?.promotions?.length > 0 && (
                    <div className="border-2 border-blue-700 bg-blue-100 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Gift className="w-5 h-5 text-blue-700" />
                            <h3 className="text-lg font-bold text-blue-800">Khuyến mãi</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            {currentVariant.promotions.map((promo) => (
                                <div key={promo.id} className="bg-white/30 rounded px-3 py-1">
                                    <p className="text-sm text-blue-800">{promo.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Add to Cart Button */}
                <button
                    className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition duration-200 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleAddToCart}
                    disabled={isAdding || !currentVariant}
                >
                    <ShoppingCart className="w-5 h-5" />
                    {isAdding ? "Đang thêm..." : "Thêm vào giỏ hàng +"}
                </button>

                {/* Gift Products */}
                {currentVariant?.giftProducts?.length > 0 && (
                    <div className="mb-6 border-2 border-pink-400 bg-pink-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Gift className="w-5 h-5 text-pink-600" />
                            <h3 className="text-lg font-bold text-pink-700">
                                Sản phẩm tặng kèm
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {currentVariant.giftProducts.map((gift) => (
                                <div
                                    key={gift.id}
                                    className="border rounded-lg p-4 hover:shadow-md transition-all bg-white"
                                >
                                    <div className="flex gap-3 mb-3">
                                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                                            {gift.thumbnail ? (
                                                <img
                                                    src={gift.thumbnail}
                                                    alt={gift.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-2xl">🎁</span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium mb-1 text-black line-clamp-2">
                                                {gift.name}
                                            </p>
                                            {gift.price === 0 ? (
                                                <p className="text-red-600 font-bold">Miễn phí</p>
                                            ) : (
                                                <p className="text-red-600 font-bold">
                                                    {gift.price.toLocaleString("vi-VN")}₫
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Warranty Options */}
                {currentVariant?.warranties?.length > 0 && (
                    <div className="mb-6 border-2 border-green-400 bg-green-50 rounded-lg p-4">
                        <h3 className="font-semibold mb-4 text-black flex items-center gap-2">
                            🛡️ <span>Chọn gói dịch vụ bảo hành</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {currentVariant.warranties.map((warranty) => (
                                <div
                                    key={warranty.id}
                                    className="border rounded-lg p-4 text-center hover:shadow-md transition-all bg-white cursor-pointer"
                                >
                                    <p className="text-sm font-medium mb-2 text-black">
                                        {warranty.name}
                                    </p>
                                    <p className="text-xs text-gray-500 mb-1">
                                        {warranty.description}
                                    </p>
                                    <p className="font-bold text-red-600">
                                        {warranty.price === 0
                                            ? "Miễn phí"
                                            : `${warranty.price.toLocaleString("vi-VN")}₫`}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Thời hạn: {warranty.months} tháng
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPurchaseSection;