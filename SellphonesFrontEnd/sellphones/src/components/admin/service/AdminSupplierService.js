import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminSupplierService = {
    async getSuppliers(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get("/admin/suppliers", {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            const data = res?.data?.suppliers || [];
            return { success: true, data };
        } catch (err) {
            // Handle token expired -> refresh
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retry = await AxiosClient.get("/admin/suppliers", {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });

                        const data = retry?.data?.suppliers || [];
                        return { success: true, data };
                    } catch {}
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.message ||
                    "Lỗi khi lấy danh sách nhà cung cấp",
            };
        }
    },

    async getSupplierById(supplierId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/suppliers/${supplierId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = res?.data?.result || null;
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const retryToken = refresh.accessToken;
                    try {
                        const retry = await AxiosClient.get(
                            `/admin/suppliers/${supplierId}`,
                            {
                                headers: { Authorization: `Bearer ${retryToken}` },
                            }
                        );

                        return { success: true, data: retry?.data?.result };
                    } catch {}
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.message ||
                    "Lỗi khi lấy thông tin nhà cung cấp",
            };
        }
    },

    async createSupplier(supplierData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.post(
                "/admin/suppliers/create-supplier",
                supplierData,
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
                    const retryToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.post(
                            "/admin/suppliers/create-supplier",
                            supplierData,
                            {
                                headers: {
                                    Authorization: `Bearer ${retryToken}`,
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
                message:
                    err?.response?.data?.errors?.message ||
                    "Lỗi khi tạo nhà cung cấp",
            };
        }
    },

    async updateSupplier(supplierId, supplierData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/suppliers/update-supplier/${supplierId}`,
                supplierData,
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
                    const retryToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.put(
                            `/admin/suppliers/update-supplier/${supplierId}`,
                            supplierData,
                            {
                                headers: {
                                    Authorization: `Bearer ${retryToken}`,
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
                message:
                    err?.response?.data?.errors?.message ||
                    "Lỗi khi cập nhật nhà cung cấp",
            };
        }
    },

    async deleteSupplier(supplierId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(
                `/admin/suppliers/delete-supplier/${supplierId}`,
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
                    const retryToken = refresh.accessToken;

                    try {
                        const retryRes = await AxiosClient.delete(
                            `/admin/suppliers/delete-supplier/${supplierId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${retryToken}`,
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
                message:
                    err?.response?.data?.errors?.message ||
                    "Lỗi khi xóa nhà cung cấp",
            };
        }
    },

    async getStockEntries(supplierId, filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(
                `/admin/suppliers/${supplierId}/stock-entries`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: filterRequest,
                }
            );

            const data = res?.data?.stock_entries || [];
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const retryToken = refresh.accessToken;
                    try {
                        const retry = await AxiosClient.get(
                            `/admin/suppliers/${supplierId}/stock-entries`,
                            {
                                headers: { Authorization: `Bearer ${retryToken}` },
                                params: filterRequest,
                            }
                        );
                        return { success: true, data: retry?.data?.stock_entries };
                    } catch {}
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.message ||
                    "Lỗi khi lấy danh sách phiếu nhập kho",
            };
        }
    },

    async createStockEntry(supplierId, requestBody) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.post(
                `/admin/suppliers/${supplierId}/stock-entries/create-stock-entry`,
                requestBody,
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
                    const retryToken = refresh.accessToken;
                    try {
                        const retry = await AxiosClient.post(
                            `/admin/suppliers/${supplierId}/stock-entries/create-stock-entry`,
                            requestBody,
                            {
                                headers: {
                                    Authorization: `Bearer ${retryToken}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        return { success: true, data: retry?.data };
                    } catch {}
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.errors?.message ||
                    "Lỗi khi tạo phiếu nhập kho",
            };
        }
    },

    async updateStockEntry(stockEntryId, requestBody) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/suppliers/stock-entries/update-stock-entry/${stockEntryId}`,
                requestBody,
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
                    const retryToken = refresh.accessToken;

                    try {
                        const retry = await AxiosClient.put(
                            `/admin/suppliers/stock-entries/update-stock-entry/${stockEntryId}`,
                            requestBody,
                            {
                                headers: {
                                    Authorization: `Bearer ${retryToken}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        return { success: true, data: retry?.data };
                    } catch {}
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.errors?.message ||
                    "Lỗi khi cập nhật phiếu nhập kho",
            };
        }
    },

    async deleteStockEntry(stockEntryId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(
                `/admin/suppliers/stock-entries/delete-stock-entry/${stockEntryId}`,
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
                    const retryToken = refresh.accessToken;

                    try {
                        const retry = await AxiosClient.delete(
                            `/admin/suppliers/stock-entries/delete-stock-entry/${stockEntryId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${retryToken}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        return { success: true, data: retry?.data };
                    } catch {}
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.errors?.message ||
                    "Lỗi khi xóa phiếu nhập kho",
            };
        }
    },

};

export default AdminSupplierService;
