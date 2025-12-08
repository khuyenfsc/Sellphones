import React, { useEffect, useState } from "react";
import { Save, Package, Truck, CheckCircle, XCircle, Clock, Calendar, User, MapPin, CreditCard, Gift, Shield } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import AdminOrderService from "../../../service/AdminOrderService";
import CreateShipmentModal from "./components/CreateShipmentModal"; 
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

const statusLabel = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    SHIPPING: "Đang vận chuyển",
    DELIVERED: "Đã vận chuyển",
    CANCELED: "Đã hủy",
    WAIT_FOR_CANCELLING: "Chờ xác nhận hủy",
};

const statusColors = {
    PENDING: "bg-yellow-500/20 text-yellow-300",
    CONFIRMED: "bg-blue-500/20 text-blue-300",
    SHIPPING: "bg-purple-500/20 text-purple-300",
    DELIVERED: "bg-green-500/20 text-green-300",
    CANCELED: "bg-red-500/20 text-red-300",
    WAIT_FOR_CANCELLING: "bg-orange-500/20 text-orange-300",
};

const AdminOrderDetailsPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isCreateShipmentModalOpen, setIsCreateShipmentModalOpen] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await AdminOrderService.getOrderById(orderId);

                if (res.success) {
                    setOrder(res.data);
                } else {
                    console.error("Failed to fetch order:", res.message);
                }

            } catch (err) {
                console.error("Error fetching order:", err);
            }
        };

        fetchOrder();
    }, [orderId]);


    const handleConfirmOrder = async () => {
        setLoading(true);

        const res = await AdminOrderService.confirmOrder(orderId);

        setLoading(false);

        if (!res.success) {
            toast.error(res.message || "Lỗi khi xác nhận đơn");
            return;
        }

        setOrder(prev => ({ ...prev, orderStatus: "CONFIRMED" }));
        toast.success("Đơn hàng đã được xác nhận");
    };

    const handleCreateShipping = () => {
        setIsCreateShipmentModalOpen(true);
    };

    const handleMarkDelivered = async () => {
        setLoading(true);

        const res = await AdminOrderService.deliverOrder(orderId);

        setLoading(false);

        if (!res.success) {
            toast.error(res.message || "Lỗi khi cập nhật trạng thái giao hàng");
            return;
        }

        setOrder(prev => ({ ...prev, orderStatus: "DELIVERED" }));
        toast.success("Đơn hàng đã được đánh dấu là đã giao");
    };

    const handleCancelOrder = async () => {
        const result = await Swal.fire({
            title: "Xác nhận hủy đơn hàng?",
            text: "Bạn có chắc chắn muốn hủy đơn hàng này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Hủy đơn",
            cancelButtonText: "Thoát",
        });

        if (!result.isConfirmed) return;

        setLoading(true);
        const res = await AdminOrderService.cancelOrder(orderId);
        setLoading(false);

        if (!res.success) {
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: res.message || "Không thể hủy đơn hàng",
            });
            return;
        }

        setOrder(prev => ({ ...prev, orderStatus: "CANCELED" }));

        Swal.fire({
            icon: "success",
            title: "Đã hủy đơn hàng",
            text: "Đơn hàng đã được hủy thành công!",
        });
    };

    if (!order) {
        return (
            <div className="min-h-screen bg-slate-950 text-white p-6 flex items-center justify-center">
                <div className="text-xl">Đang tải...</div>
            </div>
        );
    }

    const customer = order.customerInfo;
    const payment = order.payment;
    const totalDiscount = order.orderVariants?.reduce((sum, v) => sum + (v.discountAmount || 0), 0);

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold">Đơn hàng #{order.code}</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        {new Date(order.orderedAt).toLocaleString("vi-VN")}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {order.orderStatus === "PENDING" && (
                        <button
                            onClick={handleConfirmOrder}
                            disabled={loading}
                            className="flex items-center gap-2 px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            <CheckCircle size={20} /> Xác nhận đơn
                        </button>
                    )}

                    {order.orderStatus === "CONFIRMED" && (
                        <button
                            onClick={handleCreateShipping}
                            disabled={loading}
                            className="flex items-center gap-2 px-5 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                        >
                            <Truck size={20} /> Tạo đơn vận chuyển
                        </button>
                    )}

                    {order.orderStatus === "SHIPPING" && (
                        <button
                            onClick={handleMarkDelivered}
                            disabled={loading}
                            className="flex items-center gap-2 px-5 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                        >
                            <Package size={20} /> Đã vận chuyển
                        </button>
                    )}

                    {(order.orderStatus === "PENDING" || order.orderStatus === "CONFIRMED") && (
                        <button
                            onClick={handleCancelOrder}
                            disabled={loading}
                            className="flex items-center gap-2 px-5 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                        >
                            <XCircle size={20} /> Hủy đơn hàng
                        </button>
                    )}
                </div>
            </div>

            <div className="flex gap-6">
                {/* Left Panel */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Customer Info */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <User size={20} className="text-blue-400" />
                            Thông tin khách hàng
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Họ và tên:</span>
                                <span className="font-medium">{customer.fullName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Số điện thoại:</span>
                                <span className="font-medium">{customer.phoneNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Ngày sinh:</span>
                                <span className="font-medium">{new Date(customer.dateOfBirth).toLocaleDateString("vi-VN")}</span>
                            </div>
                            <div className="flex items-start justify-between">
                                <span className="text-gray-400 flex items-center gap-1">
                                    <MapPin size={16} /> Địa chỉ:
                                </span>
                                <span className="font-medium text-right max-w-md">
                                    {customer.address.street}, {customer.address.ward}, {customer.address.district}, {customer.address.province}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
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
                                        <img
                                            src={product.variantImage}
                                            alt={product.productVariantName}
                                            className="w-24 h-24 object-cover rounded"
                                        />
                                        <div className="flex-1 space-y-2">
                                            <p className="font-semibold text-white">
                                                {product.productVariantName}
                                            </p>

                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div>
                                                    <span className="text-gray-400">Số lượng:</span>
                                                    <span className="ml-2 font-medium">{variant.quantity}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-400">Đơn giá:</span>
                                                    <span className="ml-2 font-medium">{formatCurrency(product.currentPrice)}</span>
                                                </div>
                                                {variant.discountAmount > 0 && (
                                                    <div>
                                                        <span className="text-gray-400">Giảm giá:</span>
                                                        <span className="ml-2 font-medium text-red-400">-{formatCurrency(variant.discountAmount)}</span>
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="text-gray-400">Thành tiền:</span>
                                                    <span className="ml-2 font-semibold text-green-400">{formatCurrency(variant.totalPrice)}</span>
                                                </div>
                                            </div>

                                            {/* Warranty */}
                                            {variant.warranty && (
                                                <div className="flex items-center gap-2 text-sm pt-2 border-t border-slate-700">
                                                    <Shield size={16} className="text-blue-400" />
                                                    <span className="text-gray-300">{variant.warranty.name} ({variant.warranty.months} tháng)</span>
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
                                                            <div key={gift.id} className="flex items-center gap-2 bg-slate-700 rounded px-2 py-1 text-xs">
                                                                <img src={gift.thumbnail} alt={gift.name} className="w-6 h-6 rounded" />
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
                                                        <div key={i} className="text-xs text-yellow-300 bg-yellow-500/10 rounded px-2 py-1 mb-1">
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
                </div>

                {/* Right Panel */}
                <div className="w-96 flex flex-col gap-6">
                    {/* Order Status */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Clock size={20} className="text-purple-400" />
                            Trạng thái đơn hàng
                        </h3>
                        <div className="space-y-3">
                            <div className={`${statusColors[order.orderStatus]} px-4 py-3 rounded-lg text-center font-semibold text-lg`}>
                                {statusLabel[order.orderStatus]}
                            </div>

                            <div className="text-sm text-gray-400 space-y-2 pt-3 border-t border-slate-700">
                                <div className="flex justify-between">
                                    <span>Mã đơn hàng:</span>
                                    <span className="font-medium text-white">{order.code}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Thời gian đặt:</span>
                                    <span className="font-medium text-white">
                                        {new Date(order.orderedAt).toLocaleString("vi-VN")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <CreditCard size={20} className="text-yellow-400" />
                            Thông tin thanh toán
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Phương thức:</span>
                                <span className="font-medium">{payment.paymentMethod.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Trạng thái:</span>
                                <span className={`font-semibold ${payment.status === "COMPLETED" ? "text-green-400" :
                                    payment.status === "PENDING" ? "text-yellow-400" :
                                        payment.status === "REFUNDED" ? "text-gray-400" : "text-red-400"
                                    }`}>
                                    {payment.status === "COMPLETED" ? "Đã thanh toán" :
                                        payment.status === "PENDING" ? "Chờ thanh toán" :
                                            payment.status === "REFUNDED" ? "Đã hoàn tiền" : payment.status}
                                </span>
                            </div>

                            <div className="pt-3 border-t border-slate-700 space-y-2">
                                {totalDiscount > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Tổng giảm giá:</span>
                                        <span className="text-red-400 font-medium">-{formatCurrency(totalDiscount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-lg font-semibold">Tổng cộng:</span>
                                    <span className="text-2xl font-bold text-green-400">
                                        {formatCurrency(order.totalPrice)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CreateShipmentModal
                isOpen={isCreateShipmentModalOpen}
                onClose={() => setIsCreateShipmentModalOpen(false)}
                // onCreate={async (payload) => {
                //     console.log("Shipment data:", payload);
                    
                // }}
                order={order}
            />
        </div>
    );
};

export default AdminOrderDetailsPage;