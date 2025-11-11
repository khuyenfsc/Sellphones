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

    async getAttributeValues(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const { attributeId, ...params } = filterRequest;


            const res = await AxiosClient.get(`/admin/attributes/${attributeId}/attribute-values`, {
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
                        const retryRes = await AxiosClient.get(`/admin/attributes/${attributeId}/attribute-values`, {
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
    }



}

export default AdminAttributeService;
