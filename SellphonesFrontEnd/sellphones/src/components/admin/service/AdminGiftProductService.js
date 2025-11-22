import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminGiftProductService = {
    // Lấy danh sách quà tặng
    async getGiftProducts(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get("/admin/gift-products", {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            const data = res?.data?.giftProducts || {};
            return { success: true, data };
        } catch (err) {
            if (err?.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get("/admin/gift-products", {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });
                        const data = retryRes?.data?.giftProducts || {};
                        return { success: true, data };
                    } catch {}
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.errors?.message ||
                    "Lỗi khi lấy danh sách quà tặng",
            };
        }
    },

    // Tạo quà tặng mới
    async createGiftProduct(giftData, file) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const formData = new FormData();
            formData.append("giftProduct", JSON.stringify(giftData));
            if (file) formData.append("file", file);

            const res = await AxiosClient.post("/admin/gift-products/create", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            return { success: true, data: res?.data };
        } catch (err) {
            if (err?.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;

                    try {
                        const formData = new FormData();
                        formData.append("giftProduct", JSON.stringify(giftData));
                        if (file) formData.append("file", file);

                        const retryRes = await AxiosClient.post("/admin/gift-products/create", formData, {
                            headers: {
                                Authorization: `Bearer ${newToken}`,
                                "Content-Type": "multipart/form-data",
                            },
                        });

                        return { success: true, data: retryRes?.data };
                    } catch {}
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.errors?.message ||
                    "Lỗi khi tạo sản phẩm quà tặng",
            };
        }
    },

    // Lấy chi tiết theo ID
    async getGiftProductById(giftId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/gift-products/${giftId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = res?.data?.result || {};
            return { success: true, data };
        } catch (err) {
            if (err?.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;

                    try {
                        const retryRes = await AxiosClient.get(`/admin/gift-products/${giftId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });

                        const data = retryRes?.data?.result || {};
                        return { success: true, data };
                    } catch {}
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.message ||
                    "Lỗi khi lấy chi tiết quà tặng",
            };
        }
    },

    // Cập nhật quà tặng
    async updateGiftProduct(giftId, giftData, file) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const formData = new FormData();
            formData.append("giftProduct", JSON.stringify(giftData));
            if (file) formData.append("file", file);

            const res = await AxiosClient.put(
                `/admin/gift-products/update/${giftId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            if (err?.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;

                    try {
                        const formData = new FormData();
                        formData.append("giftProduct", JSON.stringify(giftData));
                        if (file) formData.append("file", file);

                        const retryRes = await AxiosClient.put(
                            `/admin/gift-products/update/${giftId}`,
                            formData,
                            {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        );

                        return { success: true, data: retryRes?.data };
                    } catch {}
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.message ||
                    "Lỗi khi cập nhật quà tặng",
            };
        }
    },

    // Xóa quà tặng
    async deleteGiftProduct(giftId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(
                `/admin/gift-products/delete/${giftId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            if (err?.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;

                    try {
                        const retryRes = await AxiosClient.delete(
                            `/admin/gift-products/delete/${giftId}`,
                            {
                                headers: { Authorization: `Bearer ${newToken}` },
                            }
                        );

                        return { success: true, data: retryRes?.data };
                    } catch {}
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.message ||
                    "Lỗi khi xóa quà tặng",
            };
        }
    },
};

export default AdminGiftProductService;
