import React, { useEffect, useState } from "react";
import { Save, Package, Truck, CheckCircle, XCircle, Clock, Calendar, User, MapPin, CreditCard, Gift, Shield } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import AdminOrderService from "../../../service/AdminOrderService";
import CreateShipmentModal from "./components/CreateShipmentModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CustomerInfoSection from "./components/CustomerInfoSection";
import OrderProductList from "./components/OrderProductList";
import OrderStatusSection from "./components/OrderStatusSection";
import PaymentInfoSection from "./components/PaymentInfoSection";

const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);


const AdminOrderDetailsPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isCreateShipmentModalOpen, setIsCreateShipmentModalOpen] = useState(false);

    const handleCreateShipment = async (shipmentData) => {
        try {
            const res = await AdminOrderService.shipOrder(orderId, shipmentData);

            if (res.success) {
                toast.success("Cập nhật vận chuyển thành công");
                fetchOrder();
            } else {
                toast.error(res.message || "Lỗi khi cập nhật vận chuyển");
            }
        } catch {
            toast.error("Lỗi khi cập nhật vận chuyển");
        }
    };

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

    useEffect(() => {
        

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
                    <CustomerInfoSection customer={customer}/>

                    {/* Order Items */}
                    <OrderProductList order={order} formatCurrency={formatCurrency} />
                </div>

                {/* Right Panel */}
                <div className="w-96 flex flex-col gap-6">
                    {/* Order Status */}
                    <OrderStatusSection order={order} />
                    {/* Payment Info */}
                    <PaymentInfoSection order={order} formatCurrency={formatCurrency} />
                </div>
            </div>

            <CreateShipmentModal
                isOpen={isCreateShipmentModalOpen}
                onClose={() => setIsCreateShipmentModalOpen(false)}
                onCreate={handleCreateShipment}
                order={order}
            />
        </div>
    );
};

export default AdminOrderDetailsPage;