import { Package, Shield, Gift } from "lucide-react";

export default function OrderProductList({ order, formatCurrency }) {
    if (!order?.orderVariants) return null;

    return (
        <div className="bg-slate-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Package size={20} className="text-green-400" />
                Sản phẩm trong đơn hàng
            </h3>

            <div className="space-y-4">
                {order.orderVariants.map((variant, idx) => {
                    const product = variant.productVariant;

                    return (
                        <div key={idx} className="bg-slate-800 rounded-lg p-4 flex gap-4">
                            {/* Product Image */}
                            <img
                                src={product.variantImage}
                                alt={product.productVariantName}
                                className="w-24 h-24 object-cover rounded"
                            />

                            {/* Info */}
                            <div className="flex-1 space-y-2">

                                {/* Name */}
                                <p className="font-semibold text-white">
                                    {product.productVariantName}
                                </p>

                                {/* Details */}
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-gray-400">Số lượng:</span>
                                        <span className="ml-2 font-medium">{variant.quantity}</span>
                                    </div>

                                    <div>
                                        <span className="text-gray-400">Đơn giá:</span>
                                        <span className="ml-2 font-medium">
                                            {formatCurrency(product.currentPrice)}
                                        </span>
                                    </div>

                                    {variant.discountAmount > 0 && (
                                        <div>
                                            <span className="text-gray-400">Giảm giá:</span>
                                            <span className="ml-2 font-medium text-red-400">
                                                -{formatCurrency(variant.discountAmount)}
                                            </span>
                                        </div>
                                    )}

                                    <div>
                                        <span className="text-gray-400">Thành tiền:</span>
                                        <span className="ml-2 font-semibold text-green-400">
                                            {formatCurrency(variant.totalPrice)}
                                        </span>
                                    </div>
                                </div>

                                {/* Warranty */}
                                {variant.warranty && (
                                    <div className="flex items-center gap-2 text-sm pt-2 border-t border-slate-700">
                                        <Shield size={16} className="text-blue-400" />
                                        <span className="text-gray-300">
                                            {variant.warranty.name} ({variant.warranty.months} tháng)
                                        </span>
                                        {variant.warranty.price > 0 && (
                                            <span className="ml-auto text-yellow-400">
                                                +{formatCurrency(variant.warranty.price * variant.quantity)}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Gift Products */}
                                {product.giftProducts && product.giftProducts.length > 0 && (
                                    <div className="pt-2 border-t border-slate-700">
                                        <p className="text-sm text-gray-400 flex items-center gap-1 mb-2">
                                            <Gift size={14} className="text-pink-400" />
                                            Quà tặng kèm:
                                        </p>

                                        <div className="flex gap-2 flex-wrap">
                                            {product.giftProducts.map(gift => (
                                                <div
                                                    key={gift.id}
                                                    className="flex items-center gap-2 bg-slate-700 rounded px-2 py-1 text-xs"
                                                >
                                                    <img
                                                        src={gift.thumbnail}
                                                        alt={gift.name}
                                                        className="w-6 h-6 rounded"
                                                    />
                                                    <span>{gift.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Promotions */}
                                {variant.promotions && variant.promotions.length > 0 && (
                                    <div className="pt-2 border-t border-slate-700">
                                        <p className="text-sm text-gray-400 mb-1">Khuyến mãi áp dụng:</p>
                                        {variant.promotions.map((promo, i) => (
                                            <div
                                                key={i}
                                                className="text-xs text-yellow-300 bg-yellow-500/10 rounded px-2 py-1 mb-1"
                                            >
                                                {promo.name} - {promo.description}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
