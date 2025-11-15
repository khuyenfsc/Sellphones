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


    useEffect(() => {
        const variantIdToFetch = initialVariantId || product?.thumbnailProduct?.id;

        if (!currentVariant && variantIdToFetch) {
            fetchVariantDetail(variantIdToFetch);
        }
    }, [initialVariantId, product, currentVariant]);


    useEffect(() => {
        if (isResettingRef.current) {
            isResettingRef.current = false;
            setDisabledValues([]);
            return;
        }

        if (!product?.productVariants) return;

        const attrNames = product.variantAttributeNames.split("-");
        const selectedKeys = Object.keys(selectedOptions);

        if (selectedKeys.length === 0) {
            setDisabledValues([]);
            return;
        }

        let disabled = [];

        attrNames.forEach((attr, index) => {
            const selectedValue = selectedOptions[attr];

            if (!selectedValue) return;

            const validVariants = product.productVariants.filter(v => {
                const parts = v.variantAttributeValues.split("-");
                return parts[index] === selectedValue;
            });

            const possibleValuesByAttr = validVariants.map(v => v.variantAttributeValues.split("-"));

            attrNames.forEach((otherAttr, otherIdx) => {
                if (otherAttr === attr) return;

                const allValuesThisAttr = [
                    ...new Set(
                        product.productVariants.map(v => v.variantAttributeValues.split("-")[otherIdx])
                    ),
                ];

                const validValues = [
                    ...new Set(possibleValuesByAttr.map(v => v[otherIdx])),
                ];

                allValuesThisAttr.forEach(val => {
                    if (!validValues.includes(val)) {
                        disabled.push(`${otherAttr}:${val}`);
                    }
                });
            });
        });

        setDisabledValues(disabled);
    }, [selectedOptions]);



    const handleAddToCart = async () => {
        if (isAdding) return;
        setIsAdding(true);

        try {
            const result = await CartService.addCartItem(currentVariant?.id);

            if (result.success) {
                toast.success(result.result || "Đã thêm sản phẩm vào giỏ hàng!", {
                    position: "top-right",
                    autoClose: 1500,
                });

                setTimeout(() => {
                    navigate("/cart");
                }, 1500);
            } else {
                toast.error(result.message || "Thêm sản phẩm thất bại!", {
                    position: "top-right",
                    autoClose: 1500,
                });
            }
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
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

            skipEffectRef.current = true;

            const selected = {};
            res.attributeValues.forEach((att) => {
                selected[att.attribute.name] = att.strVal;
            });
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
    if (!product?.productVariants) {
        return;
    }

    const attrNames = product.variantAttributeNames.split("-");

    // Kiểm tra xem đã chọn đủ chưa
    for (let attr of attrNames) {
        if (!selectedOptions[attr]) {
            alert(`Vui lòng chọn giá trị cho: ${attr}`);
            return;
        }
    }

    // Ghép thành chuỗi theo đúng thứ tự trong variantAttributeNames
    const selectedStr = attrNames
        .map(attr => selectedOptions[attr])
        .join("-");

    console.log("Selected String =", selectedStr);

    // Tìm variant chính xác
    const matchedVariant = product.productVariants.find(
        v => v.variantAttributeValues === selectedStr
    );

    if (matchedVariant) {
        if (matchedVariant.id !== currentVariant?.id) {
            console.log("Fetching variant:", matchedVariant.id);
            fetchVariantDetail(matchedVariant.id);
            setCurrentVariant(matchedVariant);
            onVariantChange(matchedVariant);
        } else {
            console.log("Đã đúng variant hiện tại, không fetch lại.");
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

                    {/* --- Sinh giao diện lựa chọn từ variantAttributeNames + productVariants --- */}
                    {product?.variantAttributeNames && (
                        <>
                            {product.variantAttributeNames.split("-").map((attrName, index) => {
                                // Lấy danh sách giá trị hợp lệ cho từng thuộc tính
                                const values = [
                                    ...new Set(
                                        product.productVariants.map((v) => {
                                            const parts = v.variantAttributeValues.split("-");
                                            return parts[index] || "";
                                        })
                                    ),
                                ];

                                return (
                                    <div key={attrName} className="mb-6">
                                        <p className="font-semibold mb-3 text-black">
                                            {attrName}
                                        </p>

                                        <div className="flex flex-wrap gap-3">
                                            {values.map((value) => {
                                                const isSelected =
                                                    selectedOptions[attrName] === value;
                                                const isDisabled = disabledValues.includes(
                                                    `${attrName}:${value}`
                                                );

                                                return (
                                                    <button
                                                        key={value}
                                                        onClick={() =>
                                                            !isDisabled &&
                                                            handleSelect(attrName, value)
                                                        }
                                                        disabled={isDisabled}
                                                        className={`px-6 py-3 rounded-lg border text-black font-medium relative transition-all
                                            ${isSelected
                                                                ? "border-red-500 bg-red-50"
                                                                : "border-gray-300 hover:border-gray-500"
                                                            }
                                            ${isDisabled
                                                                ? "opacity-40 cursor-not-allowed"
                                                                : ""
                                                            }`}
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
                                );
                            })}
                        </>
                    )}

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
