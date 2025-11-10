import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminOrderService = {
    async getAdminOrders(filterRequest) {
    try {
        let token = localStorage.getItem("adminAccessToken");

        if (!token) {
            const refresh = await this.refreshToken();
            if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
            token = refresh.accessToken;
        }

        const res = await AxiosClient.get("/admin/orders", {
            headers: { Authorization: `Bearer ${token}` },
            params: filterRequest,
        });

        const data = res?.data?.orders || {};
        return { success: true, data };
    } catch (err) {
        if (err.response?.status === 401) {
            const refresh = await AdminService.refreshToken();
            if (refresh.success) {
                const newToken = refresh.accessToken;
                try {
                    const retryRes = await AxiosClient.get("/admin/orders", {
                        headers: { Authorization: `Bearer ${newToken}` },
                        params: filterRequest,
                    });
                    const data = retryRes?.data?.orders || {};
                    return { success: true, data };
                } catch {}
            }
        }

        return { success: false, message: err?.response?.data?.message || "Lỗi khi lấy danh sách đơn hàng" };
    }
}

}

export default AdminOrderService;
