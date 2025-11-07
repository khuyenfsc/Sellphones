import AxiosClient from "../api/AxiosClient";
import UserService from "./UserService";

const VnPayService = {
    async createPayment(orderId) {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return { success: false, message: "Chưa đăng nhập" };
            if (!orderId) return { success: false, message: "Thiếu mã đơn hàng" };

            // Gọi API tạo payment
            const res = await AxiosClient.post(
                `/payment/vnpay`,
                { orderId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const result = res?.data?.result || {};
            return { success: true, result };

        } catch (err) {
            // Nếu token hết hạn → thử refresh token
            if (err.response?.status === 401) {
                const refreshResult = await UserService.refreshToken();
                if (refreshResult.success) {
                    const retryRes = await AxiosClient.post(
                        `/payment/vnpay`,
                        { orderId },
                        {
                            headers: {
                                Authorization: `Bearer ${refreshResult.accessToken}`,
                            },
                        }
                    );
                    const result = retryRes.data?.result || {};
                    return { success: true, result };
                }
            }

            console.error("❌ Lỗi tạo thanh toán:", err);
            return { success: false, message: "Không thể tạo thanh toán" };
        }
    },
};

export default VnPayService;
