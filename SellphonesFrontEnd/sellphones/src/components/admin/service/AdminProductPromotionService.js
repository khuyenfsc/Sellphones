import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminProductPromotionService = {
    async getPromotions(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get("/admin/product-promotions", {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            const data = res?.data?.promotions || {};
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get("/admin/product-promotions", {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });
                        const data = retryRes?.data?.promotions || {};
                        return { success: true, data };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy danh sách khuyến mãi",
            };
        }
    },

    async getPromotionById(promoId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/product-promotions/${promoId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = res?.data?.result || null;
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get(`/admin/product-promotions/${promoId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        const data = retryRes?.data?.result || null;
                        return { success: true, data };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy thông tin khuyến mãi",
            };
        }
    },

    async createPromotion(promoData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.post(
                "/admin/product-promotions/create-promotion",
                promoData,
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
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.post(
                            "/admin/product-promotions/create-promotion",
                            promoData,
                            {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi tạo khuyến mãi",
            };
        }
    },

    async updatePromotion(promoId, promoData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/product-promotions/update-promotion/${promoId}`,
                promoData,
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
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.put(
                            `/admin/product-promotions/update-promotion/${promoId}`,
                            promoData,
                            {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi cập nhật khuyến mãi",
            };
        }
    },

    async deletePromotion(promoId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(
                `/admin/product-promotions/delete-promotion/${promoId}`,
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
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.delete(
                            `/admin/product-promotions/delete-promotion/${promoId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi xóa khuyến mãi",
            };
        }
    },
};

export default AdminProductPromotionService;
