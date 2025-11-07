import AxiosClient from "../api/AxiosClient";
import UserService from "./UserService";

const OrderService = {
    async getTotalOrders() {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return { success: false, message: 'Chưa đăng nhập' };

            const res = await AxiosClient.get('/orders/total', {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Giải cấu trúc dữ liệu trả về theo format backend
            const total = res.data?.result?.total;

            return { success: true, total };
        } catch (err) {
            // Nếu token hết hạn → thử refresh token
            if (err.response?.status === 401) {
                const refreshResult = await this.refreshToken();
                if (refreshResult.success) {
                    const retryRes = await AxiosClient.get('/orders/total', {
                        headers: { Authorization: `Bearer ${refreshResult.accessToken}` },
                    });
                    const total = retryRes.data?.result?.total;
                    return { success: true, total };
                }
            }

            console.error('❌ Lỗi lấy tổng số đơn hàng:', err);
            return { success: false, message: 'Không thể lấy tổng số đơn hàng' };
        }
    },

    async getOrders({ startDate, endDate, page = 0, size = 10, status }) {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return { success: false, message: "Chưa đăng nhập" };

            const params = {
                startDate: startDate || null,
                endDate: endDate || null,
                page,
                size,
                status: status || null,
            };

            const res = await AxiosClient.get("/orders", {
                headers: { Authorization: `Bearer ${token}` },
                params, // ✅ gửi query params thay vì body
            });

            const result = res.data?.orders || {};
            return { success: true, result };
        } catch (err) {
            // ✅ Nếu token hết hạn → thử refresh token
            if (err.response?.status === 401) {
                const refreshResult = await UserService.refreshToken();
                if (refreshResult.success) {
                    const retryRes = await AxiosClient.get("/orders", {
                        headers: {
                            Authorization: `Bearer ${refreshResult.accessToken}`,
                        },
                        params: {
                            startDate,
                            endDate,
                            page,
                            size,
                            status,
                        },
                    });
                    const result = retryRes.data?.orders || {};
                    return { success: true, result };
                }
            }

            console.error("❌ Lỗi lấy danh sách đơn hàng:", err);
            return { success: false, message: "Không thể lấy danh sách đơn hàng" };
        }
    },

    async getOrderById(orderId) {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return { success: false, message: "Chưa đăng nhập" };
            if (!orderId) return { success: false, message: "Thiếu orderId" };

            // Gọi API lấy chi tiết đơn hàng
            const res = await AxiosClient.get(`/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = res.data?.result || {}; // giả sử API trả về { order: { ... } }
            return { success: true, result };

        } catch (err) {
            // Nếu token hết hạn → thử refresh token
            if (err.response?.status === 401) {
                const refreshResult = await UserService.refreshToken();
                if (refreshResult.success) {
                    const retryRes = await AxiosClient.get(`/orders/${orderId}`, {
                        headers: {
                            Authorization: `Bearer ${refreshResult.accessToken}`,
                        },
                    });
                    const result = retryRes.data?.result || {};
                    return { success: true, result };
                }
            }

            console.error("❌ Lỗi lấy chi tiết đơn hàng:", err);
            return { success: false, message: "Không thể lấy chi tiết đơn hàng" };
        }
    },

    async createOrder(orderData) {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return { success: false, message: "Chưa đăng nhập" };
            if (!orderData || !orderData.orderProducts?.length) {
                return { success: false, message: "Thiếu thông tin đơn hàng" };
            }

            // Gọi API tạo đơn hàng
            const res = await AxiosClient.post(`/orders`, orderData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = res.data?.result || {};
            return { success: true, result };

        } catch (err) {
            // Nếu token hết hạn → thử refresh token
            if (err.response?.status === 401) {
                const refreshResult = await UserService.refreshToken();
                if (refreshResult.success) {
                    const retryRes = await AxiosClient.post(`/orders`, orderData, {
                        headers: {
                            Authorization: `Bearer ${refreshResult.accessToken}`,
                        },
                    });
                    const result = retryRes.data?.result || {};
                    return { success: true, result };
                }
            }

            console.error("❌ Lỗi tạo đơn hàng:", err);
            return { success: false, message: "Không thể tạo đơn hàng" };
        }
    },

    async cancelOrder(orderId) {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) return { success: false, message: "Chưa đăng nhập" };
        if (!orderId) return { success: false, message: "Thiếu ID đơn hàng" };

        // Gọi API hủy đơn hàng
        const res = await AxiosClient.post(`/orders/cancel/${orderId}`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const result = res.data?.result || {};
        return { success: true, result };

    } catch (err) {
        // Token hết hạn → thử refresh token rồi gọi lại
        if (err.response?.status === 401) {
            const refreshResult = await UserService.refreshToken();
            if (refreshResult.success) {
                const retryRes = await AxiosClient.post(`/orders/cancel/${orderId}`, null, {
                    headers: {
                        Authorization: `Bearer ${refreshResult.accessToken}`,
                    },
                });
                const result = retryRes.data?.result || {};
                return { success: true, result };
            }
        }

        console.error("❌ Lỗi hủy đơn hàng:", err);
        return { success: false, message: "Không thể hủy đơn hàng" };
    }
},

    async checkUserPurchasedVariant(productVariantId) {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return { success: false, message: "Chưa đăng nhập" };
            if (!productVariantId) return { success: false, message: "Thiếu productVariantId" };

            // Gọi API kiểm tra - truyền variantId trong URL
            const res = await AxiosClient.get(
                `/order-variants/${productVariantId}/purchased`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const result = res.data?.result ?? false;
            return { success: true, result };

        } catch (err) {
            // Nếu token hết hạn → thử refresh token
            if (err.response?.status === 401) {
                const refreshResult = await UserService.refreshToken();
                if (refreshResult.success) {
                    const retryRes = await AxiosClient.get(
                        `/order-variants/${productVariantId}/purchased`,
                        {
                            headers: {
                                Authorization: `Bearer ${refreshResult.accessToken}`,
                            },
                        }
                    );
                    const result = retryRes.data?.result ?? false;
                    return { success: true, result };
                }
            }

            console.error("❌ Lỗi kiểm tra lịch sử mua hàng:", err);
            return { success: false, message: "Không thể kiểm tra lịch sử mua hàng" };
        }
    },





}

export default OrderService;
