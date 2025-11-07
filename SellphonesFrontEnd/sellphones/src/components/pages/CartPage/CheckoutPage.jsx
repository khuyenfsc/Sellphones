// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SelectableCustomerAddressList from "./components/SelectableCustomerAddressList";
import CustomerInfoService from "../../../service/CustomerInfoService";
import OrderService from "../../../service/OrderService";
import VnPayService from "../../../service/VnPayService";
import { ChevronLeft } from "lucide-react";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedItems = location.state?.selectedItems || [];

    const [customerInfos, setCustomerInfos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [creatingOrder, setCreatingOrder] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // chưa chọn gì ban đầu

    // Lấy danh sách khách hàng
    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            const res = await CustomerInfoService.getCustomerInfos();
            if (res.success) {
                setCustomerInfos(res.data);
            } else {
                console.error(res.message);
            }
            setLoading(false);
        };
        fetchCustomers();
    }, []);

    // Tính tổng tiền
    const totalPrice = selectedItems.reduce((sum, item) => sum + (item.total || 0), 0);

    // Hàm tạo đơn hàng
    const handleCreateOrder = async () => {
        if (!selectedCustomer || selectedItems.length === 0 || !selectedPaymentMethod || creatingOrder) {
            toast.error("Vui lòng chọn đầy đủ thông tin trước khi thanh toán!");
            return;
        }

        const orderData = {
            customerInfoId: selectedCustomer.id,
            paymentMethodId: selectedPaymentMethod.id,
            paymentMethodType: selectedPaymentMethod.type,
            orderProducts: selectedItems.map((item) => ({
                cartItemId: item.id,
                warrantyId: item.warrantyId || null,
            })),
        };

        try {
            setCreatingOrder(true);
            const result = await OrderService.createOrder(orderData);

            if (result.success) {
                toast.success("Tạo đơn hàng thành công!");

                // Nếu thanh toán khi nhận hàng
                if (selectedPaymentMethod.type === "CASH") {
                    navigate("/order/success");
                } 
                // Nếu thanh toán qua VNPAY
                else if (selectedPaymentMethod.type === "VNPAY") {
                    const orderId = result.result?.id;
                    if (!orderId) {
                        toast.error("Không tìm thấy ID đơn hàng để thanh toán.");
                        return;
                    }

                    const paymentRes = await VnPayService.createPayment(orderId);
                    if (paymentRes.success && paymentRes.result?.url) {
                        window.location.href = paymentRes.result.url; // chuyển hướng sang URL thanh toán
                    } else {
                        toast.error("Không thể khởi tạo thanh toán VNPAY.");
                    }
                }
            } else {
                toast.error(result.message || "Tạo đơn hàng thất bại");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã có lỗi xảy ra khi tạo đơn hàng");
        } finally {
            setCreatingOrder(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Quay lại
                    </button>

                    <div className="text-lg font-semibold text-black mx-auto">Thanh toán</div>
                    <div style={{ width: 64 }}></div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
                {/* Left: địa chỉ & thanh toán */}
                <div className="flex-1 space-y-6">
                    <SelectableCustomerAddressList
                        loading={loading}
                        customerInfos={customerInfos}
                        setCustomerInfos={setCustomerInfos}
                        selectedCustomer={selectedCustomer}
                        setSelectedCustomer={setSelectedCustomer}
                    />

                    {selectedCustomer && (
                        <div className="bg-white rounded-lg shadow p-4 text-black">
                            <h2 className="font-semibold mb-2 text-black">Địa chỉ giao hàng đã chọn:</h2>
                            <p>{selectedCustomer.fullName} — {selectedCustomer.phoneNumber}</p>
                            <p>
                                {selectedCustomer.address.street}, {selectedCustomer.address.ward}, {selectedCustomer.address.district}, {selectedCustomer.address.province}
                            </p>
                        </div>
                    )}

                    {/* Chọn phương thức thanh toán */}
                    <div className="bg-white rounded-lg shadow p-4 text-black">
                        <h2 className="font-semibold mb-4">Phương thức thanh toán</h2>
                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cash"
                                    className="accent-red-600"
                                    checked={selectedPaymentMethod?.id === 1}
                                    onChange={() =>
                                        setSelectedPaymentMethod({ id: 1, type: "CASH" })
                                    }
                                />
                                Thanh toán khi nhận hàng (COD)
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="vnpay"
                                    className="accent-red-600"
                                    checked={selectedPaymentMethod?.id === 2}
                                    onChange={() =>
                                        setSelectedPaymentMethod({ id: 2, type: "VNPAY" })
                                    }
                                />
                                Thanh toán qua VNPAY
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right: danh sách sản phẩm */}
                <div className="w-full lg:w-1/2 flex flex-col space-y-4">
                    {selectedItems.length === 0 ? (
                        <p className="text-center text-gray-500">Bạn chưa chọn sản phẩm nào.</p>
                    ) : (
                        selectedItems.map((item) => (
                            <div key={item.id} className="bg-white border rounded-md p-3 flex gap-3 items-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm text-black">{item.name}</h4>
                                    <p className="text-red-600 font-semibold text-sm">{item.price.toLocaleString()}đ</p>
                                    <p className="text-gray-500 text-xs">Số lượng: {item.quantity}</p>
                                </div>
                                <div className="text-right text-sm">
                                    <p className="text-gray-600">Tổng:</p>
                                    <p className="text-lg font-bold text-red-600">{item.total.toLocaleString()}đ</p>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Nút xác nhận */}
                    <button
                        onClick={handleCreateOrder}
                        disabled={
                            !selectedCustomer ||
                            selectedItems.length === 0 ||
                            !selectedPaymentMethod ||
                            creatingOrder
                        }
                        className={`mt-4 w-full py-4 rounded-lg font-semibold text-lg transition ${
                            selectedCustomer &&
                            selectedItems.length > 0 &&
                            selectedPaymentMethod
                                ? "bg-red-600 text-white hover:bg-red-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        {creatingOrder ? "Đang tạo đơn..." : "Xác nhận mua hàng"}
                    </button>

                    {selectedItems.length > 0 && (
                        <p className="text-right font-semibold text-gray-700">
                            Tổng thanh toán: {totalPrice.toLocaleString()}đ
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
