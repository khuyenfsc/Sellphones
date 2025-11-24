import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminRoleService = {
    async getRoles(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get("/admin/roles", {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            const data = res?.data?.roles || [];
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get("/admin/roles", {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });
                        const data = retryRes?.data?.roles || [];
                        return { success: true, data };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy danh sách vai trò",
            };
        }
    },

    async getRoleById(roleId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/roles/${roleId}`, {
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
                        const retryRes = await AxiosClient.get(`/admin/roles/${roleId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        const data = retryRes?.data?.result || null;
                        return { success: true, data };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy thông tin vai trò",
            };
        }
    },

    async createRole(roleData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.post("/admin/roles/create-role", roleData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return { success: true, data: res?.data.result };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.post("/admin/roles/create-role", roleData, {
                            headers: {
                                Authorization: `Bearer ${newToken}`,
                                "Content-Type": "application/json",
                            },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi tạo vai trò",
            };
        }
    },

    async updateRole(roleId, roleData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(`/admin/roles/update-role/${roleId}`, roleData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.put(`/admin/roles/update-role/${roleId}`, roleData, {
                            headers: {
                                Authorization: `Bearer ${newToken}`,
                                "Content-Type": "application/json",
                            },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi cập nhật vai trò",
            };
        }
    },

    async deleteRole(roleId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(`/admin/roles/delete-role/${roleId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.delete(`/admin/roles/delete-role/${roleId}`, {
                            headers: {
                                Authorization: `Bearer ${newToken}`,
                                "Content-Type": "application/json",
                            },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi xóa vai trò",
            };
        }
    },
};

export default AdminRoleService;
