import React, { useState } from "react";
import Swal from "sweetalert2";
import VnPayService from "../../../../service/VnPayService";
import OrderService from "../../../../service/OrderService";
import { toast } from "react-toastify";

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

const statusLabel = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  SHIPPING: "Đang vận chuyển",
  DELIVERED: "Đã vận chuyển",
  CANCELED: "Đã hủy",
  WAIT_FOR_CANCELLING: "Chờ xác nhận hủy",
  null: "Tất cả",
};

const OrderDetails = ({ order, onOrderUpdate }) => {
  const [loading, setLoading] = useState(false);

  if (!order) return <div>Không có thông tin đơn hàng</div>;

  const customer = order.customerInfo;
  const payment = order.payment;
  const isVnPay = payment?.paymentMethod?.paymentMethodType === "VNPAY";
  const isPaid = payment?.status === "COMPLETED";

  // ✅ Tổng giảm giá (nếu có)
  const totalDiscount = order.orderVariants?.reduce(
    (sum, variant) => sum + (variant.discountAmount || 0),
    0
  );

  // ✅ Hàm xử lý thanh toán VNPay
  const handlePayment = async () => {
    try {
      setLoading(true);
      const res = await VnPayService.createPayment(order.id);
      if (res.success && res.result?.url) {
        window.location.href = res.result.url;
      } else {
        toast.error("Không thể khởi tạo thanh toán.");
      }
    } catch (err) {
      console.error("❌ Lỗi khi thanh toán:", err);
      toast.error("Đã xảy ra lỗi khi khởi tạo thanh toán.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Hàm xử lý hủy đơn hàng
  const handleCancelOrder = async () => {
    const confirmResult = await Swal.fire({
      title: "Xác nhận hủy đơn hàng?",
      text: "Nếu đơn hàng đã được thanh toán, quản trị viên sẽ liên hệ lại với bạn sau.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xác nhận hủy",
      cancelButtonText: "Hủy bỏ",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      setLoading(true);
      const res = await OrderService.cancelOrder(order.id);

      if (res.success) {
        toast.success("Đơn hàng đã được hủy thành công!");

        // Cập nhật trạng thái order tại chỗ (không cần reload toàn trang)
        if (onOrderUpdate) {
          onOrderUpdate({ ...order, orderStatus: "CANCELED" });
        }
      } else {
        toast.error("Không thể hủy đơn hàng.");
      }
    } catch (err) {
      console.error("❌ Lỗi khi hủy đơn:", err);
      toast.error("Đã xảy ra lỗi khi hủy đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

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
              <div
                key={idx}
                className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row gap-4 shadow-sm"
              >
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
                    <span className="font-medium">
                      {formatCurrency(product.currentPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tổng:</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(variant.totalPrice)}
                    </span>
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
                            ? formatCurrency(
                                variant.warranty.price * (variant.quantity || 1)
                              )
                            : "Miễn phí"}
                        </div>
                      </div>
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

          {/* Phương thức thanh toán */}
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Phương thức thanh toán:</span>
            <span>{payment?.paymentMethod?.name || "Không xác định"}</span>
          </div>

          {/* Trạng thái đơn hàng */}
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Trạng thái đơn hàng:</span>
            <span className="font-semibold text-blue-600">
              {statusLabel[order.orderStatus] || order.orderStatus}
            </span>
          </div>

          {/* Số tiền đã giảm */}
          {totalDiscount > 0 && (
            <div className="flex justify-between text-gray-600 text-sm mt-1">
              <span>Đã giảm:</span>
              <span>-{formatCurrency(totalDiscount)}</span>
            </div>
          )}

          {/* Tổng tiền */}
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
              className={`font-semibold ${
                isPaid
                  ? "text-green-600"
                  : payment?.status === "PENDING"
                  ? "text-yellow-600"
                  : payment?.status === "REFUNDED"
                  ? "text-gray-500"
                  : "text-gray-700"
              }`}
            >
              {isPaid
                ? "Đã thanh toán"
                : payment?.status === "PENDING"
                ? "Chờ thanh toán"
                : payment?.status === "REFUNDED"
                ? "Đã hoàn tiền"
                : "Không xác định"}
            </span>
          </div>

          {/* Nút thanh toán VNPay */}
          {!isPaid && isVnPay && (
            <div className="mt-4 text-right">
              <button
                onClick={handlePayment}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
              >
                {loading ? "Đang khởi tạo..." : "Thanh toán ngay"}
              </button>
            </div>
          )}

          {/* ✅ Nút hủy đơn hàng */}
          {(order.orderStatus === "PENDING" ||
            order.orderStatus === "CONFIRMED") && (
            <div className="mt-4 text-right">
              <button
                onClick={handleCancelOrder}
                disabled={loading}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition"
              >
                {loading ? "Đang xử lý..." : "Hủy đơn hàng"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
