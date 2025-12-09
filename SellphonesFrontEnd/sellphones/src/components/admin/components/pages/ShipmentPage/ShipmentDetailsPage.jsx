import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminShipmentService from "../../../service/AdminShipmentService";

import { Package, Truck, MapPin, Calendar, Clock, CheckCircle, User, Phone, Mail, Box, ArrowLeft, Edit2, Save, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";

registerLocale("vi", vi);

const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);;

const ShipmentDetailsPage = () => {
    const [shipment, setShipment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditingDate, setIsEditingDate] = useState(false);
    const [expectedDate, setExpectedDate] = useState(null);

    const { shipmentId } = useParams();

    const fetchShipment = async () => {
        try {
            const res = await AdminShipmentService.getShipmentById(shipmentId);

            if (res.success) {
                setShipment(res.data);
            } else {
                toast.error(res.message || "Không thể tải thông tin shipment");
            }
        } catch (error) {
            console.error("Lỗi khi load shipment:", error);
            toast.error("Đã xảy ra lỗi khi tải shipment");
        }
    };

    useEffect(() => {
        if (shipmentId) {
            fetchShipment();
        }
    }, [shipmentId]);


    const getStatusBadge = (status) => {
        const statusMap = {
            "SHIPPING": { text: "Đang giao hàng", class: "bg-blue-600" },
            "DELIVERED": { text: "Đã giao hàng", class: "bg-green-600" },
            "PENDING": { text: "Chờ xử lý", class: "bg-yellow-600" },
            "CANCELED": { text: "Đã hủy", class: "bg-red-600" }
        };
        const statusInfo = statusMap[status] || { text: status, class: "bg-gray-600" };
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.class}`}>
                {statusInfo.text}
            </span>
        );
    };

    const handleUpdateExpectedDate = async () => {
        if (!expectedDate) {
            toast.error("Vui lòng chọn ngày giao hàng");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                expectedDeliveryDate: expectedDate.toISOString().split("T")[0],
            };

            const res = await AdminShipmentService.updateShipment(shipmentId, payload);

            if (res.success) {
                // cập nhật lại state shipment
                setShipment(prev => ({
                    ...prev,
                    expectedDeliveryDate: payload.expectedDeliveryDate,
                }));

                setIsEditingDate(false);
                toast.success("Cập nhật ngày giao hàng thành công!");
            } else {
                toast.error(res.message || "Lỗi khi cập nhật ngày giao hàng");
            }
        } catch (error) {
            console.error("Error updating date:", error);
            toast.error("Lỗi khi cập nhật ngày giao hàng");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setExpectedDate(new Date(shipment.expectedDeliveryDate));
        setIsEditingDate(false);
    };

    if (!shipment) {
        return (
            <div className="min-h-screen bg-slate-950 text-white p-6 flex items-center justify-center">
                <div className="text-xl">Đang tải...</div>
            </div>
        );
    }

    const { order, pickupAddress } = shipment;
    const customer = order.customerInfo;

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            {/* Header */}
            <div className="mb-6">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition">
                    <ArrowLeft size={20} />
                    Quay lại
                </button>

                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold">Vận đơn #{shipment.code}</h1>
                        <p className="text-gray-400 text-sm mt-1">
                            Đơn hàng: #{order.code}
                        </p>
                    </div>
                    {getStatusBadge(order.orderStatus)}
                </div>
            </div>

            <div className="flex gap-6">
                {/* Left Panel */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Delivery Partner Info */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Truck size={20} className="text-blue-400" />
                            Đơn vị vận chuyển
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="bg-slate-800 p-4 rounded-lg">
                                <Truck size={32} className="text-blue-400" />
                            </div>
                            <div>
                                <p className="text-xl font-semibold">{shipment.deliveryPartner}</p>
                                <p className="text-gray-400 text-sm">Mã vận đơn: {shipment.code}</p>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Timeline */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Clock size={20} className="text-green-400" />
                                Thời gian giao hàng
                            </h3>
                            {!isEditingDate && order.orderStatus !== "DELIVERED" && (
                                <button
                                    onClick={() => setIsEditingDate(true)}
                                    className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                                >
                                    <Edit2 size={14} />
                                    Sửa
                                </button>
                            )}
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <Calendar size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 mb-2">Ngày dự kiến giao hàng</p>
                                    {isEditingDate ? (
                                        <div className="space-y-3">
                                            <DatePicker
                                                selected={expectedDate}
                                                onChange={(date) => setExpectedDate(date)}
                                                locale="vi"
                                                dateFormat="dd/MM/yyyy"
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                minDate={new Date()}
                                                className="w-full px-4 py-2.5 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleUpdateExpectedDate}
                                                    disabled={loading}
                                                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 rounded-lg transition disabled:opacity-50"
                                                >
                                                    <Save size={14} />
                                                    Lưu
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    disabled={loading}
                                                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-600 hover:bg-gray-700 rounded-lg transition disabled:opacity-50"
                                                >
                                                    <X size={14} />
                                                    Hủy
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-lg font-semibold">
                                            {new Date(shipment.expectedDeliveryDate).toLocaleDateString("vi-VN")}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {shipment.deliveryDate && (
                                <div className="flex items-start gap-4">
                                    <div className="bg-green-600 p-2 rounded-lg">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Ngày giao hàng thực tế</p>
                                        <p className="text-lg font-semibold">
                                            {new Date(shipment.deliveryDate).toLocaleDateString("vi-VN")}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <MapPin size={20} className="text-purple-400" />
                            Thông tin địa chỉ
                        </h3>

                        <div className="space-y-4">
                            {/* Pickup Address */}
                            <div className="bg-slate-800 rounded-lg p-4">
                                <p className="text-sm text-gray-400 mb-2">Địa chỉ lấy hàng</p>
                                <p className="font-medium">
                                    {pickupAddress.street}, {pickupAddress.ward}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {pickupAddress.district}, {pickupAddress.province}
                                </p>
                            </div>

                            {/* Delivery Address */}
                            <div className="bg-slate-800 rounded-lg p-4">
                                <p className="text-sm text-gray-400 mb-2">Địa chỉ giao hàng</p>
                                <p className="font-medium">
                                    {customer.address.street}, {customer.address.ward}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {customer.address.district}, {customer.address.province}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Product List */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Box size={20} className="text-orange-400" />
                            Sản phẩm trong đơn hàng
                        </h3>
                        <div className="space-y-4">
                            {order.orderVariants.map((item, idx) => (
                                <div key={idx} className="flex gap-4 bg-slate-800 rounded-lg p-4">
                                    <img
                                        src={item.productVariant.variantImage}
                                        alt={item.productVariant.productVariantName}
                                        className="w-20 h-20 object-cover rounded-lg bg-slate-700"
                                        onError={(e) => {
                                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect fill='%23334155' width='80' height='80'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='32'%3E📦%3C/text%3E%3C/svg%3E";
                                        }}
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium">{item.productVariant.productVariantName}</p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            Số lượng: {item.quantity}
                                        </p>
                                        <p className="text-green-400 font-semibold mt-2">
                                            {formatCurrency(item.totalPrice)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-96 flex flex-col gap-6">
                    {/* Customer Info */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <User size={20} className="text-cyan-400" />
                            Thông tin khách hàng
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-400">Họ và tên</p>
                                <p className="font-medium">{customer.fullName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Số điện thoại</p>
                                <p className="font-medium flex items-center gap-2">
                                    <Phone size={16} />
                                    {customer.phoneNumber}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Email</p>
                                <p className="font-medium flex items-center gap-2">
                                    <Mail size={16} />
                                    {customer.user.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">CCCD</p>
                                <p className="font-medium">{customer.cccd}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Ngày sinh</p>
                                <p className="font-medium">
                                    {new Date(customer.dateOfBirth).toLocaleDateString("vi-VN")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-slate-900 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Package size={20} className="text-yellow-400" />
                            Tóm tắt đơn hàng
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Mã đơn hàng:</span>
                                <span className="font-medium">#{order.code}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Ngày đặt:</span>
                                <span className="font-medium">
                                    {new Date(order.orderedAt).toLocaleDateString("vi-VN")}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Trạng thái:</span>
                                {getStatusBadge(order.orderStatus)}
                            </div>
                            <div className="pt-3 border-t border-slate-700">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">Tổng cộng:</span>
                                    <span className="text-2xl font-bold text-green-400">
                                        {formatCurrency(
                                            order.orderVariants.reduce((sum, item) => sum + item.totalPrice, 0)
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ShipmentDetailsPage;