import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const AdminReviewService = {
    async getReviews(filterRequest) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get("/admin/reviews", {
                headers: { Authorization: `Bearer ${token}` },
                params: filterRequest,
            });

            const data = res?.data?.reviews || [];
            return { success: true, data };

        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retry = await AxiosClient.get("/admin/reviews", {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: filterRequest,
                        });

                        const data = retry?.data?.reviews || [];
                        return { success: true, data };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy danh sách review",
            };
        }
    },

    async getReviewById(reviewId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/reviews/${reviewId}`, {
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
                        const retry = await AxiosClient.get(`/admin/reviews/${reviewId}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });

                        const data = retry?.data?.result || {};
                        return { success: true, data };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi lấy review",
            };
        }
    },

    async updateReview(reviewId, reviewData) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                `/admin/reviews/update-review/${reviewId}`,
                reviewData,
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
                            `/admin/reviews/update-review/${reviewId}`,
                            reviewData,
                            {
                                headers: {
                                    Authorization: `Bearer ${newToken}`,
                                    "Content-Type": "application/json",
                                }
                            }
                        );

                        return { success: true, data: retry?.data };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi cập nhật review",
            };
        }
    },

    async deleteReview(reviewId) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await AdminService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(
                `/admin/reviews/delete-review/${reviewId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return { success: true, data: res?.data };

        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;

                    try {
                        const retry = await AxiosClient.delete(
                            `/admin/reviews/delete-review/${reviewId}`,
                            { headers: { Authorization: `Bearer ${newToken}` } }
                        );

                        return { success: true, data: retry?.data };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.message || "Lỗi khi xóa review",
            };
        }
    },
};

export default AdminReviewService;
