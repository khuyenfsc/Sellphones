// ShippingInfoForm.jsx
import { MapPin, Truck, Calendar, Hash, DollarSign } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from "date-fns/locale";

export default function ShipmentInfoForm({
    pickupAddress,
    setPickupAddress,
    partner,
    setPartner,
    expectedDeliveryDate,
    setExpectedDeliveryDate,
    code,
    setCode,
    shippingFee,
    setShippingFee
}) {
    return (
        <div className="space-y-4">
            {/* Pickup Address */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <h3 className="text-white font-semibold">Địa chỉ lấy hàng</h3>
                </div>

                {/* Street */}
                <div className="mb-3">
                    <label className="text-gray-300 text-sm">Số nhà / Đường</label>
                    <input
                        type="text"
                        value={pickupAddress.street}
                        onChange={(e) =>
                            setPickupAddress({ ...pickupAddress, street: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                        placeholder="VD: 12 Nguyễn Trãi"
                    />
                </div>

                {/* Ward */}
                <div className="mb-3">
                    <label className="text-gray-300 text-sm">Phường / Xã</label>
                    <input
                        type="text"
                        value={pickupAddress.ward}
                        onChange={(e) =>
                            setPickupAddress({ ...pickupAddress, ward: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                        placeholder="VD: Phường 5"
                    />
                </div>

                {/* District */}
                <div className="mb-3">
                    <label className="text-gray-300 text-sm">Quận / Huyện</label>
                    <input
                        type="text"
                        value={pickupAddress.district}
                        onChange={(e) =>
                            setPickupAddress({ ...pickupAddress, district: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                        placeholder="VD: Quận 3"
                    />
                </div>

                {/* Province */}
                <div>
                    <label className="text-gray-300 text-sm">Tỉnh / Thành phố</label>
                    <input
                        type="text"
                        value={pickupAddress.province}
                        onChange={(e) =>
                            setPickupAddress({ ...pickupAddress, province: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                        placeholder="VD: TP. Hồ Chí Minh"
                    />
                </div>
            </div>

            {/* Shipping Provider */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                    <Truck className="w-5 h-5 text-green-400" />
                    <h3 className="text-white font-semibold">Đơn vị vận chuyển</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {["ViettelPost", "GHN"].map((provider) => (
                        <button
                            key={provider}
                            onClick={() => setPartner(provider)}
                            className={`px-4 py-3 rounded-lg font-medium transition-colors ${partner === provider
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                        >
                            {provider}
                        </button>
                    ))}
                </div>
            </div>

            {/* Expected Delivery Date */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <h3 className="text-white font-semibold">Ngày giao hàng dự kiến</h3>
                </div>

                <DatePicker
                    selected={expectedDeliveryDate}
                    onChange={(date) => setExpectedDeliveryDate(date)}
                    locale={vi}
                    dateFormat="dd/MM/yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white 
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholderText="Chọn ngày giao hàng..."
                />
            </div>


            {/* Tracking Code & Shipping Fee */}
            <div className="grid grid-cols-2 gap-4">
                {/* Tracking Code */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center gap-2 mb-3">
                        <Hash className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-white font-semibold">Mã vận đơn</h3>
                    </div>

                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="VTP123456..."
                    />
                </div>

                {/* Shipping Fee */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        <h3 className="text-white font-semibold">Phí ship</h3>
                    </div>

                    <input
                        type="number"
                        value={shippingFee}
                        onChange={(e) => setShippingFee(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="0"
                    />
                </div>
            </div>
        </div>
    );
}
