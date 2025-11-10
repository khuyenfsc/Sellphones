import AxiosClient from "../../../api/AxiosClient";
import AdminService from "./AdminService";

const DashboardService = {
    async getOverallDetails(month, year) {
        try {
            //Lấy token hiện tại
            let token = localStorage.getItem("adminAccessToken");

            // Nếu chưa có token → thử refresh
            if (!token) {
                const refresh = await this.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            // Gọi API lấy dữ liệu tổng quan
            const res = await AxiosClient.get(`/admin/dashboard/overall-details`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { month, year },
            });

            // Chuẩn hóa dữ liệu trả về
            const data = res?.data?.result || {};
            return { success: true, data };

        } catch (err) {
            //Nếu lỗi 401 thì thử refresh token
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get(`/admin/dashboard/overall-details`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: { month, year },
                        });
                        const data = retryRes?.data?.result || {};
                        return { success: true, data };
                    } catch {
                        console.warn("❌ Gọi lại /overview sau refresh thất bại");
                    }
                }
            }

            // Log lỗi khác
            if (err.response?.status !== 401) {
                console.error("❌ Lỗi getOverallDetails:", err.message);
            }

            return { success: false };
        }
    },

    async getTodayDetails() {
        try {
            // Lấy token hiện tại
            let token = localStorage.getItem("adminAccessToken");

            // Nếu chưa có token → thử refresh
            if (!token) {
                const refresh = await this.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            // Gọi API lấy dữ liệu hôm nay
            const res = await AxiosClient.get(`/admin/dashboard/today-details`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Chuẩn hóa dữ liệu trả về
            const data = res?.data?.result || {};
            return { success: true, data };

        } catch (err) {
            // Nếu lỗi 401 thì thử refresh token
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get(`/admin/dashboard/today-details`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        const data = retryRes?.data?.result || {};
                        return { success: true, data };
                    } catch {
                        console.warn(" Gọi lại /overview/today sau refresh thất bại");
                    }
                }
            }

            //  Log lỗi khác
            if (err.response?.status !== 401) {
                console.error(" Lỗi getTodayDetails:", err.message);
            }

            return { success: false };
        }
    },

    async getMostSellingVariant(month, year) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await this.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/dashboard/most-selling-variant`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { month, year },
            });

            const data = res?.data?.result || res?.data?.data?.result || {};
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get(`/admin/dashboard/most-selling-variant`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: { month, year },
                        });
                        const data = retryRes?.data?.result || retryRes?.data?.data?.result || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return { success: false };
        }
    },

    async getMostStockedVariants() {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await this.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/dashboard/most-stocked-variants`, {
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
                        const retryRes = await AxiosClient.get(`/admin/dashboard/most-stocked-variants`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        const data = retryRes?.data?.result || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return { success: false };
        }
    },

    async getMostSalesUser(month, year) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await this.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/dashboard/most-sales-user`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { month, year },
            });

            const data = res?.data?.result || res?.data?.data?.result || {};
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get(`/admin/dashboard/most-sales-user`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: { month, year },
                        });
                        const data = retryRes?.data?.result || retryRes?.data?.data?.result || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return { success: false };
        }
    },

    async getTotalOrdersByDayInMonth(month, year) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await this.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/dashboard/total-orders-by-day`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { month, year },
            });

            const data = res?.data?.result || res?.data?.data?.result || {};
            return { success: true, data };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await AdminService.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get(`/admin/dashboard/total-orders-by-day`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                            params: { month, year },
                        });
                        const data = retryRes?.data?.result || retryRes?.data?.data?.result || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return { success: false };
        }
    },

    async getTotalOrdersByMonthInYear(year) {
        try {
            let token = localStorage.getItem("adminAccessToken");

            if (!token) {
                const refresh = await this.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`/admin/dashboard/total-orders-by-month/${year}`, {
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
                        const retryRes = await AxiosClient.get(`/admin/dashboard/total-orders-by-month/${year}`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        const data = retryRes?.data?.result || {};
                        return { success: true, data };
                    } catch { }
                }
            }

            return { success: false };
        }
    }



}

export default DashboardService;
