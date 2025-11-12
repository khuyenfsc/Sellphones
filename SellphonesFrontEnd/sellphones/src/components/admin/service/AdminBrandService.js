import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminBrandService = {
    async getBrands(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await this.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get("/admin/brands", {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest, // gồm name, sortType, page, size
            });

            const data = res?.data?.brands || {};
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get("/admin/brands", {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });
                        const data = retryRes?.data?.brands || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy danh sách thương hiệu",
            };
        }
    },

    async createCategory(categoryData, file) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const formData = new FormData();
            formData.append("category", JSON.stringify(categoryData));
            if (file) formData.append("file", file);

            const res = await AxiosClient.post("/admin/categories/create-category", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const formData = new FormData();
                        formData.append("category", JSON.stringify(categoryData));
                        if (file) formData.append("file", file);

                        const retryRes = await AxiosClient.post("/admin/categories/create-category", formData, {
                            headers: {
                                Authorization: `Bearer ${newToken}`,
                                "Content-Type": "multipart/form-data",
                            },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi tạo category",
            };
        }
    },

    async getBrandById(brandId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await this.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/brands/${brandId}`, {
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
                        const retryRes = await AxiosClient.get(`/admin/brands/${brandId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        const data = retryRes?.data?.result || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy chi tiết thương hiệu",
            };
        }
    },

    async updateCategory(categoryId, categoryData, file) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const formData = new FormData();
            formData.append("category", JSON.stringify(categoryData));
            if (file) formData.append("file", file);

            const res = await AxiosClient.put(`/admin/categories/update-category/${categoryId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const formData = new FormData();
                        formData.append("category", JSON.stringify(categoryData));
                        if (file) formData.append("file", file);

                        const retryRes = await AxiosClient.put(`/admin/categories/update-category/${categoryId}`, formData, {
                            headers: {
                                Authorization: `Bearer ${newToken}`,
                                "Content-Type": "multipart/form-data",
                            },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi cập nhật category",
            };
        }
    },

    async deleteBrand(brandId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await this.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(`/admin/brands/delete-brand/${brandId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.delete(`/admin/brands/delete-brand/${brandId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi xóa thương hiệu",
            };
        }
    },
};

export default AdminBrandService;
