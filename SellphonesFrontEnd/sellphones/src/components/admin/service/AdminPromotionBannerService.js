import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminPromotionBannerService = {
    async getBanners(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get("/admin/promotion-banners", {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            const data = res?.data?.banners || {};
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;

                    try {
                        const retryRes = await AxiosClient.get("/admin/promotion-banners", {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });
                        const data = retryRes?.data?.banners || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.errors?.message ||
                    "Lỗi khi lấy danh sách banner",
            };
        }
    },

    async createBanner(bannerData, file) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const formData = new FormData();
            formData.append("banner", JSON.stringify(bannerData));
            if (file) formData.append("file", file);

            const res = await AxiosClient.post(
                "/admin/promotion-banners/create-banner",
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
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;

                    try {
                        const formData = new FormData();
                        formData.append("banner", JSON.stringify(bannerData));
                        if (file) formData.append("file", file);

                        const retryRes = await AxiosClient.post(
                            "/admin/promotion-banners/create-banner",
                            formData,
                            {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                    "Content-Type": "multipart/form-data",
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
                    "Lỗi khi tạo banner",
            };
        }
    },

    async getBannerById(bannerId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/promotion-banners/${bannerId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = res?.data?.result || {};
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;

                    try {
                        const retryRes = await AxiosClient.get(
                            `/admin/promotion-banners/${bannerId}`,
                            {
                                headers: { Authorization: `Bearer ${newToken}` },
                            }
                        );

                        const data = retryRes?.data?.result || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.errors?.message ||
                    "Lỗi khi lấy chi tiết banner",
            };
        }
    },

    async updateBanner(bannerId, bannerData, file) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const formData = new FormData();
            formData.append("banner", JSON.stringify(bannerData));
            if (file) formData.append("file", file);

            const res = await AxiosClient.put(
                `/admin/promotion-banners/update-banner/${bannerId}`,
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
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;

                    try {
                        const formData = new FormData();
                        formData.append("banner", JSON.stringify(bannerData));
                        if (file) formData.append("file", file);

                        const retryRes = await AxiosClient.put(
                            `/admin/promotion-banners/update-banner/${bannerId}`,
                            formData,
                            {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                    "Content-Type": "multipart/form-data",
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
                    "Lỗi khi cập nhật banner",
            };
        }
    },

    async deleteBanner(bannerId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(
                `/admin/promotion-banners/delete-banner/${bannerId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
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
                            `/admin/promotion-banners/delete-banner/${bannerId}`,
                            {
                                headers: { Authorization: `Bearer ${newToken}` },
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
                    "Lỗi khi xóa banner",
            };
        }
    },
};

export default AdminPromotionBannerService;
