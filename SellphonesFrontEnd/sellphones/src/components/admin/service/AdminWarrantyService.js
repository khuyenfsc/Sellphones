import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminWarrantyService = {
    async getWarranties(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get("/admin/warranties", {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            const data = res?.data?.warranties || {};
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get("/admin/warranties", {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });
                        const data = retryRes?.data?.warranties || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy danh sách bảo hành",
            };
        }
    },

    async getWarrantyById(warrantyId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/warranties/${warrantyId}`, {
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
                        const retryRes = await AxiosClient.get(`/admin/warranties/${warrantyId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        const data = retryRes?.data?.result || null;
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy thông tin bảo hành",
            };
        }
    },

    async createWarranty(warrantyData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.post("/admin/warranties/create-warranty", warrantyData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.post("/admin/warranties/create-warranty", warrantyData, {
                            headers: {
                                Authorization: `Bearer ${newToken}`,
                                "Content-Type": "application/json"
                            },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi tạo bảo hành",
            };
        }
    },

    async updateWarranty(warrantyId, warrantyData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/warranties/update-warranty/${warrantyId}`,
                warrantyData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
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
                            `/admin/warranties/update-warranty/${warrantyId}`,
                            warrantyData,
                            {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                    "Content-Type": "application/json"
                                },
                            }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi cập nhật bảo hành",
            };
        }
    },

    async deleteWarranty(warrantyId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(
                `/admin/warranties/delete-warranty/${warrantyId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
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
                            `/admin/warranties/delete-warranty/${warrantyId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                    "Content-Type": "application/json"
                                },
                            }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi xóa bảo hành",
            };
        }
    },
};

export default AdminWarrantyService;
