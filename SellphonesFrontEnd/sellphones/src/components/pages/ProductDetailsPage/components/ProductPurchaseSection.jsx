import React, { useState, useEffect, useRef } from "react";
import { Check, Gift, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../../../service/ProductService";
import CartService from "../../../../service/CartService";
import { toast } from "react-toastify";


const ProductPurchaseSection = ({ product, onVariantChange, initialVariantId }) => {
    const [disabledValues, setDisabledValues] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [currentVariant, setCurrentVariant] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const skipEffectRef = useRef(false); // 🧠 flag để tránh loop
    const isResettingRef = useRef(false);
    const navigate = useNavigate(); // hook để chuyển hướng
    const attributeOrder = product?.variantAttributes?.map(a => a.attribute.name) || [];


    // --- 1️⃣ Khi tải trang: tự chọn theo thumbnailProduct
    useEffect(() => {
        const variantIdToFetch = initialVariantId || product?.thumbnailProduct?.id;

        if (!currentVariant && variantIdToFetch) {
            fetchVariantDetail(variantIdToFetch);
        }
    }, [initialVariantId, product, currentVariant]);


    useEffect(() => {
        // ⚠️ Nếu đang reset → bỏ qua logic fetch
        if (isResettingRef.current) {
            isResettingRef.current = false;
            setDisabledValues([]); // bật lại toàn bộ
            return;
        }

        if (!product?.productVariants || Object.keys(selectedOptions).length === 0) {
            setDisabledValues([]);
            return;
        }

        const selectedVals = Object.values(selectedOptions);
        const allVariants = product.productVariants.map((v) =>
            v.variantAttributes.split("-")
        );
        const allValues = [...new Set(allVariants.flat())];

        const validVariants = allVariants.filter((v) =>
            selectedVals.every((val) => v.includes(val))
        );

        const stillValid = [...new Set(validVariants.flat())];
        const toDisable = allValues.filter((val) => !stillValid.includes(val));

        setDisabledValues(toDisable);
    }, [selectedOptions]);




    const handleAddToCart = async () => {
        if (isAdding) return;
        setIsAdding(true);

        try {
            const result = await CartService.addCartItem(currentVariant?.id);

            if (result.success) {
                // ✅ Hiển thị toast thành công
                toast.success(result.result || "Đã thêm sản phẩm vào giỏ hàng!", {
                    position: "top-right",
                    autoClose: 1500,
                });

                // ✅ Chuyển hướng sau 1.5s
                setTimeout(() => {
                    navigate("/cart");
                }, 1500);
            } else {
                // ❌ Hiển thị toast lỗi
                toast.error(result.message || "Thêm sản phẩm thất bại!", {
                    position: "top-right",
                    autoClose: 1500,
                });
            }
        } catch (error) {
            console.error("❌ Lỗi khi thêm vào giỏ hàng:", error);
            toast.error("Đã xảy ra lỗi, vui lòng thử lại sau!", {
                position: "top-right",
                autoClose: 1500,
            });
        } finally {
            setIsAdding(false);
        }
    };

    const fetchVariantDetail = async (variantId) => {
        try {
            setLoading(true);
            const res = await ProductService.getProductVariantById(variantId);
            setCurrentVariant(res);
            onVariantChange(res);

            // 🧠 Cập nhật flag trước khi set state để tránh trigger lại useEffect
            skipEffectRef.current = true;

            // Gán selectedOptions theo attributeValues trả về
            const selected = {};
            res.attributeValues.forEach((att) => {
                selected[att.attribute.name] = att.strVal;
            });
            // console.log(selected);
            setSelectedOptions(selected);
        } catch (error) {
            console.error("❌ Lỗi khi tải variant:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (attributeName, value) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [attributeName]: value,
        }));
    };

    // --- Nút reset
    const handleReset = () => {
        isResettingRef.current = true;
        setSelectedOptions({});
    };

    const handleApplySelection = () => {
        if (!product?.productVariants || Object.keys(selectedOptions).length === 0) {
            return;
        }

        // ✅ Lấy thứ tự attribute chuẩn
        const orderedAttributes = product.variantAttributes.map(v => v.attribute.name);

        // ✅ Tạo chuỗi lựa chọn đúng thứ tự
        const selectedStr = orderedAttributes
            .map(attrName => selectedOptions[attrName])
            .filter(Boolean) // loại bỏ undefined
            .join("-");

        // ✅ So khớp đúng variant
        const matchedVariant = product.productVariants.find(
            v => v.variantAttributes === selectedStr
        );

        if (matchedVariant) {
            if (matchedVariant.id !== currentVariant?.id) {
                fetchVariantDetail(matchedVariant.id);
                setCurrentVariant(matchedVariant);
                onVariantChange(matchedVariant);
            } else {
                console.log("Đã chọn đúng variant hiện tại, không cần fetch lại.");
            }
        } else {
            alert("Không tồn tại biến thể phù hợp với lựa chọn này!");
        }
    };




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

                        {currentVariant?.rootPrice && (
                            <p className="text-sm text-gray-400 line-through">
                                {currentVariant.rootPrice.toLocaleString("vi-VN")}₫
                            </p>
                        )}
                    </div>
                </div>


                {/* Variant Section */}
                <div className="mb-6">
                    {product?.variantAttributes?.map((variant) => (
                        <div key={variant.attribute.name} className="mb-6">
                            <p className="font-semibold mb-3 text-black">
                                {variant.attribute.name}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {variant.allowValues.map((valObj) => {
                                    const value = valObj.attributeValue.strVal;
                                    const isSelected =
                                        selectedOptions[variant.attribute.name] === value;
                                    const isDisabled = disabledValues.includes(value);

                                    return (
                                        <button
                                            key={value}
                                            onClick={() =>
                                                !isDisabled &&
                                                handleSelect(variant.attribute.name, value)
                                            }
                                            disabled={isDisabled}
                                            className={`px-6 py-3 rounded-lg border text-black font-medium relative transition-all
                ${isSelected
                                                    ? "border-red-500 bg-red-50"
                                                    : "border-gray-300 hover:border-gray-500"
                                                }
                ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}`}
                                        >
                                            {value}
                                            {isSelected && (
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* --- Nút hành động --- */}
                    <div className="mt-4 flex items-center gap-3">
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-black font-medium"
                        >
                            Đặt lại lựa chọn
                        </button>

                        <button
                            onClick={handleApplySelection}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
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
                            {currentVariant.promotions.map((promo, index) => (
                                <div key={index} className="bg-white/30 rounded px-3 py-1">
                                    <p className="text-sm text-blue-800">{promo.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {/* Add to Cart */}
                <button
                    className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition duration-200 mb-6"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                >
                    <ShoppingCart className="w-5 h-5" />
                    {isAdding ? "Đang thêm..." : "Thêm vào giỏ hàng +"}
                </button>

                {/* Gift / Promotional Products Section */}
                {currentVariant?.giftProducts?.length > 0 && (
                    <div className="mb-6 border-2 border-pink-400 bg-pink-50 rounded-lg p-4">
                        {/* Tiêu đề */}
                        <div className="flex items-center gap-2 mb-3">
                            <Gift className="w-5 h-5 text-pink-600" />
                            <h3 className="text-lg font-bold text-pink-700">
                                Sản phẩm tặng kèm
                            </h3>
                        </div>

                        {/* Danh sách quà tặng */}
                        <div className="grid grid-cols-2 gap-4">
                            {currentVariant.giftProducts.map((gift, index) => (
                                <div
                                    key={index}
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
                            {currentVariant.warranties.map((warranty, index) => (
                                <div
                                    key={index}
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

            {/* Toast */}

        </div>
    );
};

export default ProductPurchaseSection;
