import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminCommentService = {
    async getComments(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get("/admin/comments", {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            const data = res?.data?.comments || [];
            return { success: true, data };

        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;

                    try {
                        const retry = await AxiosClient.get("/admin/comments", {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });
                        const data = retry?.data?.comments || [];
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy danh sách comment",
            };
        }
    },

    async getCommentById(commentId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/comments/${commentId}`, {
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
                        const retry = await AxiosClient.get(`/admin/comments/${commentId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });

                        const data = retry?.data?.result || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy comment",
            };
        }
    },

    async replyComment(commentId, replyData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.post(
                `/admin/comments/${commentId}/reply-comment`,
                replyData,
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
                        const retry = await AxiosClient.post(
                            `/admin/comments/${commentId}/reply-comment`,
                            replyData,
                            {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );

                        return { success: true, data: retry?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi reply comment",
            };
        }
    },

    async updateComment(commentId, commentData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/comments/update-comment/${commentId}`,
                commentData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            );

            return { success: true, data: res?.data };

        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;

                    try {
                        const retry = await AxiosClient.put(
                            `/admin/comments/update-comment/${commentId}`,
                            commentData,
                            {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                    "Content-Type": "application/json",
                                }
                            }
                        );

                        return { success: true, data: retry?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi cập nhật comment",
            };
        }
    },

    async deleteComment(commentId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(
                `/admin/comments/${commentId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            return { success: true, data: res?.data };

        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;

                    try {
                        const retry = await AxiosClient.delete(
                            `/admin/comments/${commentId}`,
                            { headers: { Authorization: `Bearer ${newToken}` } }
                        );

                        return { success: true, data: retry?.data };
                    } catch { }
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi xóa comment",
            };
        }
    },
};

export default AdminCommentService;
