import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminAttributeService = {
    async getAttributes(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get("/admin/attributes", {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            const data = res?.data?.attributes || {};
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get("/admin/attributes", {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });
                        const data = retryRes?.data?.attributes || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.message || "Lỗi khi lấy danh sách thuộc tính",
            };
        }
    },

    async getAttributeById(attributeId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/attributes/${attributeId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = res?.data?.result || null; // giả sử API trả về { attribute: { ... } }
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get(`/admin/attributes/${attributeId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        const data = retryRes?.data?.result || null;
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy thông tin thuộc tính",
            };
        }
    },


    async createAttribute(attributeData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            // Gọi API tạo attribute
            const res = await AxiosClient.post("/admin/attributes/create-attribute", attributeData, {
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
                        const retryRes = await AxiosClient.post("/admin/attributes/create-attribute", attributeData, {
                            headers: {
                                Authorization: `Bearer ${newToken}`,
                                "Content-Type": "application/json"
                            },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            console.log(err);

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi tạo attribute",
            };
        }
    },

    async updateAttribute(attributeId, attributeData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            // Gọi API cập nhật attribute
            const res = await AxiosClient.put(
                `/admin/attributes/edit-attribute/${attributeId}`,
                attributeData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            // Nếu token hết hạn → refresh token rồi gọi lại
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.put(
                            `/admin/attributes/edit-attribute/${attributeId}`,
                            attributeData,
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

            console.error(err);

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi cập nhật attribute",
            };
        }
    },

    async deleteAttribute(attributeId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            // Gọi API xóa attribute
            const res = await AxiosClient.delete(
                `/admin/attributes/delete-attribute/${attributeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            // Nếu token hết hạn → refresh token rồi thử lại
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.delete(
                            `/admin/attributes/delete-attribute/${attributeId}`,
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

            console.error(err);

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi xóa attribute",
            };
        }
    },


    async getAttributeValues(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const { attributeId, ...params } = filterRequest;


            const res = await AxiosClient.get(`/admin/attributes/${attributeId}/values`, {
                headers: { Authorization: `Bearer ${token}` },
                params, // keyword, sortType, page, size
            });

            const data = res?.data?.values || {};
            return { success: true, data };
        } catch (err) {
            // Xử lý 401 -> refresh token
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const { attributeId, ...params } = filterRequest;
                        const retryRes = await AxiosClient.get(`/admin/attributes/${attributeId}/values`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params,
                        });
                        const data = retryRes?.data?.values || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy danh sách giá trị thuộc tính",
            };
        }
    },

    async createValue(attributeId, valueData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            // Gọi API tạo value
            const res = await AxiosClient.post(
                `/admin/attributes/${attributeId}/create-value`,
                valueData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            // Nếu token hết hạn, thử refresh và gọi lại
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.post(
                            `/admin/attributes/${attributeId}/create-value`,
                            valueData,
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

            console.error(err);

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi tạo giá trị thuộc tính",
            };
        }
    },

    async updateValue(valueId, valueData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            // Gọi API cập nhật value
            const res = await AxiosClient.put(
                `/admin/attributes/edit-value/${valueId}`,
                valueData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            // Nếu token hết hạn → refresh token rồi gọi lại
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.put(
                            `/admin/attributes/edit-value/${valueId}`,
                            valueData,
                            {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            console.error(err);

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi cập nhật value",
            };
        }
    },

    async deleteValue(valueId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            // Gọi API xóa value
            const res = await AxiosClient.delete(
                `/admin/attributes/delete-value/${valueId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            // Nếu token hết hạn → refresh token rồi gọi lại
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.delete(
                            `/admin/attributes/delete-value/${valueId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            console.error(err);

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi xóa value",
            };
        }
    },

    async getProductVariants(productId, filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/products/${productId}/variants`, {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });
            return { success: true, data: res?.data?.variants || {} };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    try {
                        const retryRes = await AxiosClient.get(`/admin/products/${productId}/variants`, {
                            headers: { Authorization: `Bearer ${refresh.accessToken}` },
                            params: filterRequest,
                        });
                        return { success: true, data: retryRes?.data?.variants || {} };
                    } catch { }
                }
            }
            return { success: false, message: err?.response?.data?.message || "Lỗi khi lấy danh sách biến thể" };
        }
    },

    async getProductVariantDetails(variantId) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/products/variants/${variantId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return { success: true, data: res?.data?.result || {} };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    try {
                        const retryRes = await AxiosClient.get(`/admin/products/variants/${variantId}`, {
                            headers: { Authorization: `Bearer ${refresh.accessToken}` },
                        });
                        return { success: true, data: retryRes?.data?.result || {} };
                    } catch { }
                }
            }
            return { success: false, message: err?.response?.data?.message || "Lỗi khi lấy chi tiết biến thể" };
        }
    },

    async createProductVariant(productId, variantData, file) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const formData = new FormData();
            formData.append("product_variant", JSON.stringify(variantData));
            if (file) formData.append("file", file);

            const res = await AxiosClient.post(`/admin/products/${productId}/create-variant`, formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            });
            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    try {
                        const formData = new FormData();
                        formData.append("product_variant", JSON.stringify(variantData));
                        if (file) formData.append("file", file);

                        const retryRes = await AxiosClient.post(`/admin/products/${productId}/create-variant`, formData, {
                            headers: { Authorization: `Bearer ${refresh.accessToken}`, "Content-Type": "multipart/form-data" },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }
            return { success: false, message: err?.response?.data?.errors?.message || "Lỗi khi tạo biến thể sản phẩm" };
        }
    },

    async updateProductVariant(variantId, variantData, file) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const formData = new FormData();
            formData.append("product_variant", JSON.stringify(variantData));
            if (file) formData.append("file", file);

            const res = await AxiosClient.put(`/admin/products/update-variant/${variantId}`, formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            });
            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    try {
                        const formData = new FormData();
                        formData.append("product_variant", JSON.stringify(variantData));
                        if (file) formData.append("file", file);

                        const retryRes = await AxiosClient.put(`/admin/products/update-variant/${variantId}`, formData, {
                            headers: { Authorization: `Bearer ${refresh.accessToken}`, "Content-Type": "multipart/form-data" },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }
            return { success: false, message: err?.response?.data?.message || "Lỗi khi cập nhật biến thể sản phẩm" };
        }
    },

    async deleteProductVariant(variantId) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(`/admin/products/delete-variant/${variantId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    try {
                        const retryRes = await AxiosClient.delete(`/admin/products/delete-variant/${variantId}`, {
                            headers: { Authorization: `Bearer ${refresh.accessToken}` },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }
            return { success: false, message: err?.response?.data?.message || "Lỗi khi xóa biến thể sản phẩm" };
        }
    },


}

export default AdminAttributeService;
