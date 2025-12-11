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
            const res = await AxiosClient.post("/customers/create", customerData, {
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
                    const refreshResult = await UserService.refreshToken(); // 👈 gọi sang AuthService
                    if (refreshResult.success) {
                        // Retry lại với token mới
                        const retryRes = await AxiosClient.post("/customers/create", customerData, {
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

    async updateCustomerInfo(id, customerData) {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return { success: false, message: "Chưa đăng nhập", data: null };

            // Gửi dữ liệu cập nhật khách hàng lên server
            const res = await AxiosClient.put(`/customers/update/${id}`, customerData, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            const result = res?.data?.result ?? null;

            return {
                success: true,
                data: result,
                message: "Cập nhật thông tin khách hàng thành công!",
            };
        } catch (error) {
            // Nếu token hết hạn → thử refresh token
            if (error.response?.status === 401) {
                try {
                    const refreshResult = await UserService.refreshToken(); // 👈 gọi sang AuthService
                    if (refreshResult.success) {
                        // Retry lại với token mới
                        const retryRes = await AxiosClient.put(`/customers/update/${id}`, customerData, {
                            headers: { Authorization: `Bearer ${refreshResult.accessToken}` },
                            withCredentials: true,
                        });

                        const result = retryRes?.data?.result ?? null;

                        return {
                            success: true,
                            data: result,
                            message: "Cập nhật thông tin khách hàng thành công (sau khi refresh token)!",
                        };
                    } else {
                        return {
                            success: false,
                            message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!",
                            data: null,
                        };
                    }
                } catch (retryError) {
                    console.error("❌ Lỗi khi retry cập nhật thông tin khách hàng:", retryError);
                    return {
                        success: false,
                        message: "Không thể làm mới token. Vui lòng đăng nhập lại!",
                        data: null,
                    };
                }
            }

            console.error("❌ Lỗi khi cập nhật thông tin khách hàng:", error);
            return {
                success: false,
                message: "Không thể cập nhật thông tin khách hàng. Vui lòng thử lại sau!",
                data: null,
            };
        }
    },

    async deleteCustomerInfo(customerInfoId) {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return { success: false, message: "Chưa đăng nhập" };

            const res = await AxiosClient.delete(
                `http://localhost:8080/api/v1/customers/delete/${customerInfoId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const result = res.data?.result || "Deleted customer info successfully";
            return { success: true, result };

        } catch (err) {
            // ✅ Nếu token hết hạn → thử refresh token
            if (err.response?.status === 401) {
                const refreshResult = await UserService.refreshToken();
                if (refreshResult.success) {
                    const retryRes = await AxiosClient.delete(
                        `http://localhost:8080/api/v1/customers/delete/${customerInfoId}`,
                        {
                            headers: { Authorization: `Bearer ${refreshResult.accessToken}` },
                        }
                    );

                    const result = retryRes.data?.result || "Deleted customer info successfully";
                    return { success: true, result };
                }
            }

            console.error("❌ Lỗi xóa Customer Info:", err);
            return { success: false, message: "Không thể xóa Customer Info" };
        }
    },

};

export default CustomerInfoService;
