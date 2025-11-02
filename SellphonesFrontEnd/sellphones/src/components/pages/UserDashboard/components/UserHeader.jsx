import React from "react";
import { useUser } from "../../../../context/UserContext";

export default function UserHeader() {
    const { user, loadingUser, totalOrders, loadingTotal } = useUser();

    if (loadingUser) {
        return (
            <div className="bg-white shadow-sm p-4 text-gray-500 text-sm">
                Đang tải thông tin người dùng...
            </div>
        );
    }

    return (
        <div className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* User Info */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                            <div className="text-xl">🐰</div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">{user?.fullName}</h2>
                            <p className="text-gray-500 text-sm">{user?.phoneNumber}</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                🛒
                            </div>
                            <div>
                                <p className="text-lg font-bold">{totalOrders}</p>
                                <p className="text-xs text-gray-600">Đơn hàng đã mua</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-3 bg-gray-50 p-2.5 rounded-md">
                    <p className="text-xs text-gray-600">
                        📱 Tổng số đơn hàng được tính chung từ Sellphones.
                    </p>
                </div>
            </div>
        </div>
    );
}
