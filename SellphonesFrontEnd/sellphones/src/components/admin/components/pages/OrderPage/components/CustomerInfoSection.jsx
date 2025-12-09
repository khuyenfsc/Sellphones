import { User, MapPin } from "lucide-react";

export default function CustomerInfoSection({ customer }) {
    if (!customer) return null;

    return (
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
                    <span className="font-medium">
                        {new Date(customer.dateOfBirth).toLocaleDateString("vi-VN")}
                    </span>
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
    );
}
