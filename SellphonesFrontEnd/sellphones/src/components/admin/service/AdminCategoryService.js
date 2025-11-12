import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminCategoryService = {
    async getAllCategories(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/categories`, {
                headers: { Authorization: `Bearer ${token}` },
                filterRequest,
            });

            const data = res?.data?.categories || {};
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get(`/admin/categories`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params,
                        });
                        const data = retryRes?.data?.categories || {};
                        return { success: true, data };
                    } catch { }
                }
            }
            console.error("❌ Lỗi getAllCategories:", err.message);
            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy danh sách thể loại",
            };
        }
    },

    async getCategoryById(categoryId) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/categories/${categoryId}`, {
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
                        const retryRes = await AxiosClient.get(`/admin/categories/${categoryId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        const data = retryRes?.data?.result || {};
                        return { success: true, data };
                    } catch { }
                }
            }
            console.error("❌ Lỗi getCategoryById:", err.message);
            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy danh sách danh mục",
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


    async deleteCategory(categoryId) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            await AxiosClient.delete(`/admin/categories/delete-category/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        await AxiosClient.delete(`/admin/categories/delete-category/${categoryId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        return { success: true };
                    } catch { }
                }
            }
            console.error("❌ Lỗi deleteCategory:", err.message);
            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi xóa danh mục",
            };
        }
    },

    async getCategoryOptions(categoryId, filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/categories/${categoryId}/options`, {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            return { success: true, data: res?.data?.result || {} };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get(`/admin/categories/${categoryId}/options`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });
                        return { success: true, data: retryRes?.data?.result || {} };
                    } catch { }
                }
            }
            console.error("❌ Lỗi getCategoryOptions:", err.message);
            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy danh sách lựa chọn",
            };
        }
    },

    async createCategoryOption(categoryId, optionData) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.post(`/admin/categories/${categoryId}/create-option`, optionData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.post(`/admin/categories/${categoryId}/create-option`, optionData, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }
            return { success: false, message: err?.response?.data?.message || "Lỗi khi tạo option" };
        }
    },

    async updateCategoryOption(categoryOptionId, optionData) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(`/admin/categories/update-option/${categoryOptionId}`, optionData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.put(`/admin/categories/update-option/${categoryOptionId}`, optionData, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }
            return { success: false, message: err?.response?.data?.message || "Lỗi khi cập nhật option" };
        }
    },

    async deleteCategoryOption(categoryOptionId) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            await AxiosClient.delete(`/admin/categories/delete-option/${categoryOptionId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        await AxiosClient.delete(`/admin/categories/delete-option/${categoryOptionId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        return { success: true };
                    } catch { }
                }
            }
            return { success: false, message: err?.response?.data?.message || "Lỗi khi xóa option" };
        }
    },

    // --- CATEGORY OPTION VALUES ---
    async getCategoryOptionValues(categoryOptionId, filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/categories/options/${categoryOptionId}/values`, {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            return { success: true, data: res?.data?.result || {} };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get(`/admin/categories/options/${categoryOptionId}/values`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });
                        return { success: true, data: retryRes?.data?.result || {} };
                    } catch { }
                }
            }
            console.error("❌ Lỗi getCategoryOptionValues:", err.message);
            return { success: false };
        }
    },

    async addCategoryOptionValue(categoryOptionId, valueData) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.post(`/admin/categories/options/${categoryOptionId}/create-value`, valueData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.post(`/admin/categories/options/${categoryOptionId}/create-value`, valueData, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }
            return { success: false, message: err?.response?.data?.message || "Lỗi khi tạo value" };
        }
    },

    async editCategoryOptionValue(categoryOptionId, valueData) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(`/admin/categories/options/update-value/${categoryOptionId}`, valueData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.put(`/admin/categories/options/update-value/${categoryOptionId}`, valueData, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }
            return { success: false, message: err?.response?.data?.message || "Lỗi khi cập nhật value" };
        }
    },

    async deleteCategoryOptionValue(categoryOptionValueId) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            await AxiosClient.delete(`/admin/categories/options/delete-value/${categoryOptionValueId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        await AxiosClient.delete(`/admin/categories/options/delete-value/${categoryOptionValueId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        return { success: true };
                    } catch { }
                }
            }
            return { success: false, message: err?.response?.data?.message || "Lỗi khi xóa value" };
        }
    },
};

export default AdminCategoryService;
