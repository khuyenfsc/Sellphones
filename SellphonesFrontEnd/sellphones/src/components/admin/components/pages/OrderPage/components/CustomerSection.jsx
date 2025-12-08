// CustomerSection.jsx
import { User } from "lucide-react";
import { useState } from "react";
import CustomerPickModal from "./CustomerPickModal";

export default function CustomerSection({ selectedCustomer, setSelectedCustomer }) {
    const [customerOpen, setCustomerOpen] = useState(false);
    return (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-3">
                <User className="w-5 h-5 text-blue-400" />
                <h3 className="text-white font-semibold">Thông tin khách hàng</h3>
            </div>

            {selectedCustomer ? (
                <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                    <div className="text-white">
                        <p className="font-medium text-lg">{selectedCustomer.fullName}</p>
                        <p className="text-gray-300 text-sm">{selectedCustomer.phoneNumber}</p>
                    </div>

                    <button
                        onClick={() => setCustomerOpen(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        Thay đổi
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setCustomerOpen(true)}
                    className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                    <User className="w-5 h-5" />
                    Chọn khách hàng
                </button>
            )}

            <CustomerPickModal
                isOpen={customerOpen}
                onClose={() => setCustomerOpen(false)}
                onPick={(customer) => {
                    setSelectedCustomer(customer);
                    setCustomerOpen(false);
                }}
            />
        </div>
    );
}
