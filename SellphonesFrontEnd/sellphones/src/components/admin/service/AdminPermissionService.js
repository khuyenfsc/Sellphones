import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminPermissionService = {
    async getPermissions() {
        try {
            // Lấy token hiện tại
            let token = localStorage.getItem("adminAccessToken");

            // Nếu chưa có token → thử refresh
            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            //  Gọi API lấy danh sách quyền
            const res = await AxiosClient.get(`/admin/permissions/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            //  Chuẩn hóa dữ liệu
            const permissions = res?.data?.result || [];

            return { success: true, permissions };
        } catch (err) {
            // 🔁 Nếu lỗi 401 thì thử refresh token
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get(`/admin/permissions/all`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        const permissions = retryRes.data?.result || [];
                        return { success: true, permissions };
                    } catch {
                        console.warn("❌ Gọi lại /permissions sau refresh thất bại");
                    }
                }
            }

            //  Log lỗi khác
            if (err.response?.status !== 401) {
                console.error("❌ Lỗi getPermissions:", err.message);
            }

            return { success: false };
        }
    }

}

export default AdminPermissionService;

