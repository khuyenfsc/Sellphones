// PaymentInfoCard.jsx
import { CreditCard } from "lucide-react";

export default function PaymentInfoSection({  order, formatCurrency }) {
    const payment = order.payment;
    const totalDiscount = order.orderVariants?.reduce((sum, v) => sum + (v.discountAmount || 0), 0);
    if (!payment || !order) return null;

    const statusText =
        payment.status === "COMPLETED"
            ? "Đã thanh toán"
            : payment.status === "PENDING"
            ? "Chờ thanh toán"
            : payment.status === "REFUNDED"
            ? "Đã hoàn tiền"
            : payment.status;

    const statusClass =
        payment.status === "COMPLETED"
            ? "text-green-400"
            : payment.status === "PENDING"
            ? "text-yellow-400"
            : payment.status === "REFUNDED"
            ? "text-gray-400"
            : "text-red-400";

    return (
        <div className="bg-slate-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-yellow-400" />
                Thông tin thanh toán
            </h3>

            <div className="space-y-3">
                {/* Payment Method */}
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Phương thức:</span>
                    <span className="font-medium">{payment.paymentMethod.name}</span>
                </div>

                {/* Status */}
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Trạng thái:</span>
                    <span className={`font-semibold ${statusClass}`}>{statusText}</span>
                </div>

                {/* Total and Discount */}
                <div className="pt-3 border-t border-slate-700 space-y-2">
                    {totalDiscount > 0 && (
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Tổng giảm giá:</span>
                            <span className="text-red-400 font-medium">
                                -{formatCurrency(totalDiscount)}
                            </span>
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
    );
}
