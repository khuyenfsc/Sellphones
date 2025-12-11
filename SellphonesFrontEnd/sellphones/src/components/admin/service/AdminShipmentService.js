import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminShipmentService = {

    async getShipments(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get("/admin/shipments", {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            const data = res?.data?.shipments || {};
            return { success: true, data };
        } catch (err) {

            // auto refresh token
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    try {
                        const retryRes = await AxiosClient.get("/admin/shipments", {
                            headers: { Authorization: `Bearer ${refresh.accessToken}` },
                            params: filterRequest,
                        });
                        const data = retryRes?.data?.shipments || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy danh sách shipment",
            };
        }
    },

    async getShipmentById(shipmentId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/shipments/${shipmentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = res?.data?.result || null;
            return { success: true, data };
        } catch (err) {

            // auto refresh token
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    try {
                        const retryRes = await AxiosClient.get(`/admin/shipments/${shipmentId}`, {
                            headers: { Authorization: `Bearer ${refresh.accessToken}` },
                        });
                        const data = retryRes?.data?.result || null;
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy thông tin shipment",
            };
        }
    },

    async updateShipment(shipmentId, payload) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/shipments/update/${shipmentId}`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const data = res?.data?.result || null;
            return { success: true, data };
        } catch (err) {
            // auto refresh token
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    try {
                        const retryRes = await AxiosClient.put(
                            `/admin/shipments/update/${shipmentId}`,
                            payload,
                            { headers: { Authorization: `Bearer ${refresh.accessToken}` } }
                        );
                        const data = retryRes?.data?.result || null;
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi cập nhật shipment",
            };
        }
    },

};

export default AdminShipmentService;
