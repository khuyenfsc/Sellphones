import AxiosClient from "../api/AxiosClient";
import UserService from "./UserService";

const CustomerInfoService = {
    async getCustomerInfos() {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return { success: false, message: "Chưa đăng nhập", data: [] };

            // Gọi API lấy danh sách khách hàng
            const res = await AxiosClient.get("/customers", {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            const result = res?.data?.result ?? [];

            return {
                success: true,
                data: result,
            };
        } catch (error) {
            // Nếu token hết hạn (401) → thử refresh token
            if (error.response?.status === 401) {
                try {
                    const refreshResult = await UserService.refreshToken(); // 👈 gọi sang service khác
                    if (refreshResult.success) {
                        // Retry lại request với token mới
                        const retryRes = await AxiosClient.get("/customers", {
                            headers: { Authorization: `Bearer ${refreshResult.accessToken}` },
                            withCredentials: true,
                        });

                        const result = retryRes?.data?.result ?? [];

                        return {
                            success: true,
                            data: result,
                        };
                    } else {
                        return {
                            success: false,
                            message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!",
                            data: [],
                        };
                    }
                } catch (retryError) {
                    console.error("❌ Lỗi khi retry lấy danh sách khách hàng:", retryError);
                    return {
                        success: false,
                        message: "Không thể làm mới token. Vui lòng đăng nhập lại!",
                        data: [],
                    };
                }
            }

            console.error("❌ Lỗi khi lấy danh sách khách hàng:", error);
            return {
                success: false,
                message: "Không thể tải thông tin khách hàng. Vui lòng thử lại sau!",
                data: [],
            };
        }
    },

    async createCustomerInfo(customerData) {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return { success: false, message: "Chưa đăng nhập", data: null };

            // Gửi dữ liệu khách hàng lên server
            const res = await AxiosClient.post("/customers/create-customer-info", customerData, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            const result = res?.data?.result ?? null;

            return {
                success: true,
                data: result,
                message: "Tạo thông tin khách hàng thành công!",
            };
        } catch (error) {
            // Nếu token hết hạn → thử refresh token
            if (error.response?.status === 401) {
                try {
                    const refreshResult = await AuthService.refreshToken(); // 👈 gọi sang AuthService
                    if (refreshResult.success) {
                        // Retry lại với token mới
                        const retryRes = await AxiosClient.post("/customers", customerData, {
                            headers: { Authorization: `Bearer ${refreshResult.accessToken}` },
                            withCredentials: true,
                        });

                        const result = retryRes?.data?.result ?? null;

                        return {
                            success: true,
                            data: result,
                            message: "Tạo thông tin khách hàng thành công (sau khi refresh token)!",
                        };
                    } else {
                        return {
                            success: false,
                            message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!",
                            data: null,
                        };
                    }
                } catch (retryError) {
                    console.error("❌ Lỗi khi retry tạo thông tin khách hàng:", retryError);
                    return {
                        success: false,
                        message: "Không thể làm mới token. Vui lòng đăng nhập lại!",
                        data: null,
                    };
                }
            }

            console.error("❌ Lỗi khi tạo thông tin khách hàng:", error);
            return {
                success: false,
                message: "Không thể tạo thông tin khách hàng. Vui lòng thử lại sau!",
                data: null,
            };
        }
    },
};

export default CustomerInfoService;
