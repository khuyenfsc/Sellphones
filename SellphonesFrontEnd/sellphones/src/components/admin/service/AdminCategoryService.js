import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminCategoryService = {
    async getCategories(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/categories`, {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
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
                message: err?.response?.data?.errors?.message || "Lỗi khi tạo category",
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

    async getFilters(categoryId, filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/categories/${categoryId}/filters`, {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest
            });

            return { success: true, data: res?.data?.filters || {} };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    try {
                        const retry = await AxiosClient.get(`/admin/categories/${categoryId}/filters`, {
                            headers: { Authorization: `Bearer ${refresh.accessToken}` },
                            params: filterRequest
                        });
                        return { success: true, data: retry?.data?.result || {} };
                    } catch { }
                }
            }

            console.error("❌ Lỗi getFilters:", err.message);
            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy danh sách bộ lọc"
            };
        }
    },

    async getFilterById(filterId) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/categories/filters/${filterId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, data: res?.data?.result || {} };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get(`/admin/categories/filters/${filterId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        return { success: true, data: retryRes?.data?.result || {} };
                    } catch { }
                }
            }

            console.error("❌ Lỗi getFilterById:", err.message);
            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy thông tin filter",
            };
        }
    },

    async createFilter(categoryId, body) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.post(
                `/admin/categories/${categoryId}/filters/create-filter`,
                body,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return { success: true, data: res?.data?.result || {} };
        } catch (err) {
            if (err.response?.status === 401) {
                const fresh = await AdminService.refreshToken();
                if (fresh.success) {
                    try {
                        const retry = await AxiosClient.post(
                            `/admin/categories/${categoryId}/filters/create-filter`,
                            body,
                            { headers: { Authorization: `Bearer ${fresh.accessToken}` } }
                        );
                        return { success: true, data: retry?.data?.result || {} };
                    } catch { }
                }
            }

            console.error("❌ Lỗi createFilter:", err.message);
            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi tạo filter"
            };
        }
    },


    async updateFilter(filterId, body) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/categories/filters/update-filter/${filterId}`,
                body,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return { success: true, data: res?.data?.result || {} };
        } catch (err) {
            if (err.response?.status === 401) {
                const fresh = await AdminService.refreshToken();
                if (fresh.success) {
                    try {
                        const retry = await AxiosClient.put(
                            `/admin/categories/filters/update-filter/${filterId}`,
                            body,
                            { headers: { Authorization: `Bearer ${fresh.accessToken}` } }
                        );
                        return { success: true, data: retry?.data?.result || {} };
                    } catch { }
                }
            }

            console.error("❌ Lỗi updateFilter:", err.message);
            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi cập nhật filter"
            };
        }
    },

    async deleteFilter(filterId) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(
                `/admin/categories/filters/delete-filter/${filterId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return { success: true, data: res?.data?.result || {} };
        } catch (err) {
            if (err.response?.status === 401) {
                const fresh = await AdminService.refreshToken();
                if (fresh.success) {
                    try {
                        const retry = await AxiosClient.delete(
                            `/admin/categories/filters/delete-filter/${filterId}`,
                            { headers: { Authorization: `Bearer ${fresh.accessToken}` } }
                        );
                        return { success: true, data: retry?.data?.result || {} };
                    } catch { }
                }
            }

            console.error("❌ Lỗi deleteFilter:", err.message);
            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi xóa filter"
            };
        }
    },

    async getFilterOptions(filterId, filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(
                `/admin/categories/filters/${filterId}/options`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: filterRequest
                }
            );

            return { success: true, data: res?.data?.options || {} };
        } catch (err) {
            if (err.response?.status === 401) {
                const fresh = await AdminService.refreshToken();
                if (fresh.success) {
                    try {
                        const retry = await AxiosClient.get(
                            `/admin/categories/filters/${filterId}/options`,
                            {
                                headers: { Authorization: `Bearer ${fresh.accessToken}` },
                                params: filterRequest
                            }
                        );
                        return { success: true, data: retry?.data?.result || {} };
                    } catch { }
                }
            }

            console.error("❌ Lỗi getFilterOptions:", err.message);
            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi lấy list options"
            };
        }
    },

    async createFilterOption(filterId, body) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.post(
                `/admin/categories/filters/${filterId}/create-option`,
                body,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return { success: true, data: res?.data?.result || {} };
        } catch (err) {
            if (err.response?.status === 401) {
                const fresh = await AdminService.refreshToken();
                if (fresh.success) {
                    try {
                        const retry = await AxiosClient.post(
                            `/admin/categories/filters/${filterId}/create-option`,
                            body,
                            { headers: { Authorization: `Bearer ${fresh.accessToken}` } }
                        );
                        return { success: true, data: retry?.data?.result || {} };
                    } catch { }
                }
            }

            console.error("❌ Lỗi createFilterOption:", err.message);
            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi tạo option"
            };
        }
    },

    async updateFilterOption(optionId, body) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/categories/filters/options/update-option/${optionId}`,
                body,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return { success: true, data: res?.data?.result || {} };
        } catch (err) {
            if (err.response?.status === 401) {
                const fresh = await AdminService.refreshToken();
                if (fresh.success) {
                    try {
                        const retry = await AxiosClient.put(
                            `/admin/categories/filters/options/update-option/${optionId}`,
                            body,
                            { headers: { Authorization: `Bearer ${fresh.accessToken}` } }
                        );
                        return { success: true, data: retry?.data?.result || {} };
                    } catch { }
                }
            }

            console.error("❌ Lỗi updateFilterOption:", err.message);
            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi update option"
            };
        }
    },

    async deleteFilterOption(optionId) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(
                `/admin/categories/filters/options/delete-option/${optionId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return { success: true, data: res?.data?.result || {} };
        } catch (err) {
            if (err.response?.status === 401) {
                const fresh = await AdminService.refreshToken();
                if (fresh.success) {
                    try {
                        const retry = await AxiosClient.delete(
                            `/admin/categories/filters/options/delete-option/${optionId}`,
                            { headers: { Authorization: `Bearer ${fresh.accessToken}` } }
                        );
                        return { success: true, data: retry?.data?.result || {} };
                    } catch { }
                }
            }

            console.error("❌ Lỗi deleteFilterOption:", err.message);
            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi xóa option"
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

    async getOptionById(optionId) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/categories/options/${optionId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, data: res?.data?.result || {} };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get(`/admin/categories/options/${optionId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        return { success: true, data: retryRes?.data?.result || {} };
                    } catch { }
                }
            }
            console.error("❌ Lỗi getOptionById:", err.message);
            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy thông tin option",
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
