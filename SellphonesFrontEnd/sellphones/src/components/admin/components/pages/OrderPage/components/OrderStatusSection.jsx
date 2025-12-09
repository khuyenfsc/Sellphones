import { Clock, Truck } from "lucide-react";

const statusColors = {
    PENDING: "bg-yellow-500/20 text-yellow-300",
    CONFIRMED: "bg-blue-500/20 text-blue-300",
    SHIPPING: "bg-purple-500/20 text-purple-300",
    DELIVERED: "bg-green-500/20 text-green-300",
    CANCELED: "bg-red-500/20 text-red-300",
    WAIT_FOR_CANCELLING: "bg-orange-500/20 text-orange-300",
};

const statusLabel = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    SHIPPING: "Đang vận chuyển",
    DELIVERED: "Đã vận chuyển",
    CANCELED: "Đã hủy",
    WAIT_FOR_CANCELLING: "Chờ xác nhận hủy",
};

export default function OrderStatusSection({ order }) {
    if (!order) return null;

    const shipment = order.shipment;

    return (
        <div className="bg-slate-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock size={20} className="text-purple-400" />
                Trạng thái đơn hàng
            </h3>

            <div className="space-y-3">
                {/* Status Badge */}
                <div
                    className={`${statusColors[order.orderStatus]} px-4 py-3 rounded-lg text-center font-semibold text-lg`}
                >
                    {statusLabel[order.orderStatus]}
                </div>

                {/* Order Info */}
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

                {/* Shipment Info */}
                {shipment && (
                    <div className="text-sm text-gray-400 space-y-2 pt-4 border-t border-slate-700">
                        <div className="flex items-center gap-2 mb-1">
                            <Truck size={18} className="text-green-400" />
                            <h4 className="font-semibold text-white">Thông tin vận chuyển</h4>
                        </div>

                        <div className="flex justify-between">
                            <span>Mã vận chuyển:</span>
                            <span className="font-medium text-white">{shipment.code}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Đối tác giao hàng:</span>
                            <span className="font-medium text-white">{shipment.deliveryPartner}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Ngày giao dự kiến:</span>
                            <span className="font-medium text-white">
                                {shipment.expectedDeliveryDate
                                    ? new Date(shipment.expectedDeliveryDate).toLocaleDateString("vi-VN")
                                    : "--"}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Ngày giao thực tế:</span>
                            <span className="font-medium text-white">
                                {shipment.deliveryDate
                                    ? new Date(shipment.deliveryDate).toLocaleDateString("vi-VN")
                                    : "Chưa giao"}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
