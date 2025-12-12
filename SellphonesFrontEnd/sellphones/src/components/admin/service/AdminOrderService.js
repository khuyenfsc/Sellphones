import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminOrderService = {
    async getAdminOrders(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };

                token = refresh.accessToken;
            }

            const res = await AxiosClient.get("/admin/orders", {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            const data = res?.data?.orders || {};
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const retryToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get("/admin/orders", {
                            headers: { Authorization: `Bearer ${retryToken}` },
                            params: filterRequest,
                        });

                        const data = retryRes?.data?.orders || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.errors?.message  ||
                    "Lỗi khi lấy danh sách đơn hàng",
            };
        }
    },

    async getOrderById(orderId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };

                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = res?.data?.result || null;
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const retryToken = refresh.accessToken;

                    try {
                        const retryRes = await AxiosClient.get(
                            `/admin/orders/${orderId}`,
                            {
                                headers: { Authorization: `Bearer ${retryToken}` },
                            }
                        );

                        const data = retryRes?.data?.result || null;
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.errors?.message  ||
                    "Lỗi khi lấy thông tin đơn hàng",
            };
        }
    },

    async createOrder(orderData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };

                token = refresh.accessToken;
            }

            const res = await AxiosClient.post(
                "/admin/orders/create",
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const retryToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.post(
                            "/admin/orders/create",
                            orderData,
                            {
                                headers: {
                                    Authorization: `Bearer ${retryToken}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.errors?.message ||
                    "Lỗi khi tạo đơn hàng",
            };
        }
    },

    async confirmOrder(orderId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };

                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/orders/confirm/${orderId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const retryToken = refresh.accessToken;

                    try {
                        const retryRes = await AxiosClient.put(
                            `/admin/orders/confirm/${orderId}`,
                            {},
                            { headers: { Authorization: `Bearer ${retryToken}` } }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message  || "Lỗi khi xác nhận đơn hàng",
            };
        }
    },

    async shipOrder(orderId, shipmentData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };

                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/orders/ship-order/${orderId}`,
                shipmentData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const retryToken = refresh.accessToken;

                    try {
                        const retryRes = await AxiosClient.put(
                            `/admin/orders/ship-order/${orderId}`,
                            shipmentData,
                            {
                                headers: {
                                    Authorization: `Bearer ${retryToken}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi cập nhật vận chuyển",
            };
        }
    },

    async deliverOrder(orderId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };

                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/orders/deliver/${orderId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const retryToken = refresh.accessToken;

                    try {
                        const retryRes = await AxiosClient.put(
                            `/admin/orders/deliver/${orderId}`,
                            {},
                            { headers: { Authorization: `Bearer ${retryToken}` } }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.errors?.message  ||
                    "Lỗi khi cập nhật trạng thái đã giao hàng",
            };
        }
    },

    async cancelOrder(orderId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };

                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/orders/cancel/${orderId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const retryToken = refresh.accessToken;

                    try {
                        const retryRes = await AxiosClient.put(
                            `/admin/orders/cancel/${orderId}`,
                            {},
                            { headers: { Authorization: `Bearer ${retryToken}` } }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message  || "Lỗi khi hủy đơn hàng",
            };
        }
    },

    async deleteOrder(orderId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };

                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(
                `/admin/orders/delete-order/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const retryToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.delete(
                            `/admin/orders/delete-order/${orderId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${retryToken}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.errors?.message ||
                    "Lỗi khi xóa đơn hàng",
            };
        }
    },
};

export default AdminOrderService;
