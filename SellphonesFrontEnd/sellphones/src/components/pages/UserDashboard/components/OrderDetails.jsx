import React from "react";

const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

const OrderDetails = ({ order }) => {
    if (!order) return <div>Không có thông tin đơn hàng</div>;

    const customer = order.customerInfo;

    // ✅ Tính tổng giảm giá (nếu có)
    const totalDiscount = order.orderVariants?.reduce(
        (sum, variant) => sum + (variant.discountAmount || 0),
        0
    );

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">

            {/* Thông tin khách hàng */}
            <div className="bg-white shadow-md rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-xl">Thông tin khách hàng</h3>
                <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                        <span className="font-medium">Họ và tên:</span>
                        <span>{customer?.fullName || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Số điện thoại:</span>
                        <span>{customer?.phoneNumber || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Địa chỉ:</span>
                        <span>
                            {customer?.address
                                ? `${customer.address.street}, ${customer.address.ward}, ${customer.address.district}, ${customer.address.province}`
                                : "-"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Ghi chú:</span>
                        <span>{order.note || "-"}</span>
                    </div>
                </div>
            </div>

            {/* Thông tin thanh toán */}
            <div className="bg-white shadow-md rounded-lg p-5 space-y-5">
                <h3 className="font-semibold text-xl">Thông tin thanh toán</h3>

                {/* Danh sách sản phẩm */}
                <div className="space-y-4">
                    {order.orderVariants.map((variant, idx) => {
                        const product = variant.productVariant;
                        return (
                            <div key={idx} className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row gap-4 shadow-sm">
                                <img
                                    src={product.variantImage}
                                    alt={product.productVariantName}
                                    className="w-28 h-28 object-cover rounded"
                                />
                                <div className="flex-1 space-y-2 text-gray-700">
                                    <p className="font-semibold text-lg">
                                        <a
                                            href={`/product/${product.product.id}?variant=${product.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {product.productVariantName}
                                        </a>
                                    </p>

                                    <div className="flex justify-between">
                                        <span>Số lượng:</span>
                                        <span className="font-medium">{variant.quantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Giá:</span>
                                        <span className="font-medium">{formatCurrency(product.currentPrice)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tổng:</span>
                                        <span className="font-semibold text-red-600">{formatCurrency(variant.totalPrice)}</span>
                                    </div>

                                    {/* Bảo hành */}
                                    {variant.warranty && (
                                        <div className="flex justify-between items-center">
                                            <span>Bảo hành:</span>
                                            <div className="text-right">
                                                <span className="font-medium">
                                                    {variant.warranty.name} ({variant.warranty.months} tháng)
                                                </span>
                                                <div className="text-sm text-gray-600">
                                                    {variant.warranty.price > 0
                                                        ? formatCurrency(variant.warranty.price * (variant.quantity || 1))
                                                        : "Miễn phí"}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Quà tặng */}
                                    {product.giftProducts?.length > 0 && (
                                        <div>
                                            <p className="font-medium mb-2">Quà tặng:</p>
                                            <ul className="space-y-2">
                                                {product.giftProducts.map((gift, i) => (
                                                    <li key={i} className="flex items-center gap-3">
                                                        {gift.thumbnail && (
                                                            <img
                                                                src={gift.thumbnail}
                                                                alt={gift.name}
                                                                className="w-12 h-12 object-cover rounded"
                                                            />
                                                        )}
                                                        <span>
                                                            {gift.name} ({gift.price ? formatCurrency(gift.price) : "Miễn phí"})
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Khuyến mãi */}
                                    {variant.promotions?.length > 0 && (
                                        <div>
                                            <p className="font-medium">Khuyến mãi:</p>
                                            <ul className="list-disc ml-5 space-y-1">
                                                {variant.promotions.map((promo, i) => (
                                                    <li key={i}>{promo.name}: {promo.description}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Tổng thanh toán */}
                <div className="bg-gray-50 p-5 rounded-lg space-y-3">
                    <p className="font-semibold text-lg border-b pb-2">Thanh toán</p>

                    {/* Số tiền đã giảm (nếu có) */}
                    {totalDiscount > 0 && (
                        <div className="flex justify-between text-gray-600 text-sm mt-1">
                            <span>Đã giảm:</span>
                            <span>-{formatCurrency(totalDiscount)}</span>
                        </div>
                    )}

                    {/* Tổng số tiền cần thanh toán */}
                    <div className="flex justify-between mt-2">
                        <span className="font-medium">Tổng số tiền cần thanh toán:</span>
                        <span className="text-red-600 font-semibold">
                            {formatCurrency(order.totalPrice)}
                        </span>
                    </div>

                    {/* Trạng thái thanh toán */}
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Trạng thái thanh toán:</span>
                        <span
                            className={`font-semibold ${order.paymentStatus === "COMPLETED"
                                    ? "text-green-600"
                                    : order.paymentStatus === "PENDING"
                                        ? "text-yellow-600"
                                        : order.paymentStatus === "REFUNDED"
                                            ? "text-gray-500"
                                            : "text-gray-700"
                                }`}
                        >
                            {order.paymentStatus === "COMPLETED"
                                ? "Đã thanh toán"
                                : order.paymentStatus === "PENDING"
                                    ? "Chờ thanh toán"
                                    : order.paymentStatus === "REFUNDED"
                                        ? "Đã hoàn tiền"
                                        : "Không xác định"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
