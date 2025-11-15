import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminProductService = {
    async getProducts(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get("/admin/products", {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            const data = res?.data?.products || {};
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get("/admin/products", {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });
                        const data = retryRes?.data?.products || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi lấy danh sách sản phẩm",
            };
        }
    },

    async getProductById(productId) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/products/${productId}`, {
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
                        const retryRes = await AxiosClient.get(`/admin/products/${productId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        const data = retryRes?.data?.result || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy chi tiết sản phẩm",
            };
        }
    },

    async createProduct(productData, thumbnailFile, imageFiles) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const formData = new FormData();
            formData.append("product", JSON.stringify(productData));
            if (thumbnailFile) formData.append("file", thumbnailFile);
            if (imageFiles && imageFiles.length > 0) {
                imageFiles.forEach((file) => formData.append("files", file));
            }

            const res = await AxiosClient.post("/admin/products/create-product", formData, {
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
                        formData.append("product", JSON.stringify(productData));
                        if (thumbnailFile) formData.append("file", thumbnailFile);
                        if (imageFiles && imageFiles.length > 0) {
                            imageFiles.forEach((file) => formData.append("files", file));
                        }

                        const retryRes = await AxiosClient.post("/admin/products/create-product", formData, {
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
                message: err?.response?.data?.errors?.message || "Lỗi khi tạo sản phẩm",
            };
        }
    },

    async updateProduct(productId, productData, thumbnailFile, imageFiles) {
        try {
            console.log(imageFiles);
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const formData = new FormData();
            formData.append("product", JSON.stringify(productData));
            if (thumbnailFile) formData.append("file", thumbnailFile);
            if (imageFiles && imageFiles.length > 0) {
                imageFiles.forEach((file) => formData.append("files", file));
            }

            console.log(imageFiles);

            const res = await AxiosClient.put(`/admin/products/update-product/${productId}`, formData, {
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
                        formData.append("product", JSON.stringify(productData));
                        if (thumbnailFile) formData.append("file", thumbnailFile);
                        if (imageFiles && imageFiles.length > 0) {
                            imageFiles.forEach((file) => formData.append("files", file));
                        }

                        const retryRes = await AxiosClient.put(`/admin/products/update-product/${productId}`, formData, {
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
                message: err?.response?.data?.message || "Lỗi khi cập nhật sản phẩm",
            };
        }
    },

    async deleteProduct(productId) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(`/admin/products/delete-product/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.delete(`/admin/products/delete-product/${productId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi xóa sản phẩm",
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
                    const newToken = refresh.accessToken;
                    try {
                        const retry = await AxiosClient.get(`/admin/products/${productId}/variants`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });
                        return { success: true, data: retry?.data?.variants || {} };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi lấy danh sách biến thể",
            };
        }
    },

    async createProductVariant(productId, formData) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.post(
                `/admin/products/${productId}/create-variant`,
                formData,
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
            );

            return { success: true, data: res?.data || {} };

        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retry = await AxiosClient.post(
                            `/admin/products/${productId}/create-variant`,
                            formData,
                            { headers: { Authorization: `Bearer ${newToken}`, "Content-Type": "multipart/form-data" } }
                        );
                        return { success: true, data: retry?.data || {} };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi tạo biến thể",
            };
        }
    },

    async updateProductVariant(variantId, formData) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/products/update-variant/${variantId}`,
                formData,
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
            );

            return { success: true, data: res?.data || {} };

        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retry = await AxiosClient.put(
                            `/admin/products/update-variant/${variantId}`,
                            formData,
                            { headers: { Authorization: `Bearer ${newToken}`, "Content-Type": "multipart/form-data" } }
                        );
                        return { success: true, data: retry?.data || {} };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi sửa biến thể",
            };
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

            const res = await AxiosClient.delete(
                `/admin/products/delete-variant/${variantId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return { success: true, data: res?.data || {} };

        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retry = await AxiosClient.delete(
                            `/admin/products/delete-variant/${variantId}`,
                            { headers: { Authorization: `Bearer ${newToken}` } }
                        );
                        return { success: true, data: retry?.data || {} };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi xóa biến thể",
            };
        }
    }


};

export default AdminProductService;
