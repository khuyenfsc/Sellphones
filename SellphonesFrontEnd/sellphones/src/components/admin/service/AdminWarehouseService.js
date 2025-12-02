import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminWarehouseService = {
    async getWarehouses(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get("/admin/warehouses", {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            const data = res?.data?.warehouses || {};
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get("/admin/warehouses", {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });
                        const data = retryRes?.data?.warehouses || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy danh sách kho",
            };
        }
    },

    async getWarehouseById(warehouseId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/warehouses/${warehouseId}`, {
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
                        const retryRes = await AxiosClient.get(`/admin/warehouses/${warehouseId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        const data = retryRes?.data?.result || null;
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy thông tin kho",
            };
        }
    },

    async createWarehouse(warehouseData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.post(
                "/admin/warehouses/create-warehouse",
                warehouseData,
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
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.post(
                            "/admin/warehouses/create-warehouse",
                            warehouseData,
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

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi tạo kho",
            };
        }
    },

    async updateWarehouse(warehouseId, warehouseData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/warehouses/update-warehouse/${warehouseId}`,
                warehouseData,
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
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.put(
                            `/admin/warehouses/update-warehouse/${warehouseId}`,
                            warehouseData,
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

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi cập nhật kho",
            };
        }
    },

    async deleteWarehouse(warehouseId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(
                `/admin/warehouses/delete-warehouse/${warehouseId}`,
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
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.delete(
                            `/admin/warehouses/delete-warehouse/${warehouseId}`,
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

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi xóa kho",
            };
        }
    },

    async getInventories(warehouseId, filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/warehouses/${warehouseId}/inventories`, {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            const data = res?.data?.inventories || [];
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get(`/admin/warehouses/${warehouseId}/inventories`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });
                        const data = retryRes?.data?.inventories || [];
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy danh sách inventory",
            };
        }
    },

    async getInventoryById(inventoryId) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/warehouses/inventories/${inventoryId}`, {
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
                        const retryRes = await AxiosClient.get(`/admin/warehouses/inventories/${inventoryId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        const data = retryRes?.data?.result || null;
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy thông tin inventory",
            };
        }
    },

    async createInventory(warehouseId, inventoryData) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.post(
                `/admin/warehouses/${warehouseId}/inventories/create-inventory`,
                inventoryData,
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.post(
                            `/admin/warehouses/${warehouseId}/inventories/create-inventory`,
                            inventoryData,
                            { headers: { Authorization: `Bearer ${newToken}`, "Content-Type": "application/json" } }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi thêm inventory",
            };
        }
    },

    async updateInventory(inventoryId, inventoryData) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/warehouses/inventories/edit-inventory/${inventoryId}`,
                inventoryData,
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.put(
                            `/admin/warehouses/inventories/edit-inventory/${inventoryId}`,
                            inventoryData,
                            { headers: { Authorization: `Bearer ${newToken}`, "Content-Type": "application/json" } }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi cập nhật inventory",
            };
        }
    },

    async deleteInventory(inventoryId) {
        try {
            let token = localStorage.getItem("adminAccessToken");
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(
                `/admin/warehouses/inventories/delete-inventory/${inventoryId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return { success: true, data: res?.data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.delete(
                            `/admin/warehouses/inventories/delete-inventory/${inventoryId}`,
                            { headers: { Authorization: `Bearer ${newToken}` } }
                        );
                        return { success: true, data: retryRes?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message || "Lỗi khi xóa inventory",
            };
        }
    },

    async getStockEntriesByInventory(inventoryId, filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success)
                    return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(
                `/admin/warehouses/inventories/${inventoryId}/stock-entries`,
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
                            `/admin/warehouses/inventories/${inventoryId}/stock-entries`,
                            {
                                headers: { Authorization: `Bearer ${retryToken}` },
                                params: filterRequest,
                            }
                        );
                        return { success: true, data: retry?.data?.stock_entries };
                    } catch { }
                }
            }

            return {
                success: false,
                message:
                    err?.response?.data?.message ||
                    "Lỗi khi lấy danh sách phiếu nhập kho theo inventory",
            };
        }
    }


};

export default AdminWarehouseService;
