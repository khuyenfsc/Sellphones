import AxiosClient from "../../api/AxiosClient";

export class BaseAuthService {
    constructor({ basePath = "", tokenKey = "accessToken" } = {}) {
        this.basePath = basePath;   // ví dụ "" cho user, "/admin" cho admin
        this.tokenKey = tokenKey;   // ví dụ "accessToken" hoặc "adminAccessToken"
    }

    async login(email, password) {
        try {
            const res = await AxiosClient.post(
                `${this.basePath}/auth/login`,
                { email, password },
                { withCredentials: true }
            );

            const accessToken = res?.data?.result?.accessToken;

            if (accessToken) {
                // ✅ Lưu token vào localStorage theo tokenKey
                localStorage.setItem(this.tokenKey, accessToken);
                return { success: true, accessToken };
            }

            return { success: false, message: 'Lỗi đăng nhập, vui lòng thử lại sau!' };
        } catch (error) {
            console.error('❌ Lỗi login:', error);
            return { success: false, message: 'Vui lòng kiểm tra thông tin đăng nhập.' };
        }
    }

    async refreshToken() {
        try {
            const res = await AxiosClient.post(
                `${this.basePath}/auth/refresh`,
                {},
                { withCredentials: true }
            );
            const newAccessToken = res?.data?.result?.accessToken;

            if (!newAccessToken) throw new Error("Không có accessToken mới");

            localStorage.setItem(this.tokenKey, newAccessToken);
            return { success: true, accessToken: newAccessToken };
        } catch (error) {
            // 🧹 Nếu refresh thất bại → xóa token cũ
            localStorage.removeItem(this.tokenKey);
            return { success: false };
        }
    }

    async getCurrentUser() {
        try {
            let token = localStorage.getItem(this.tokenKey);

            if (!token) {
                const refresh = await this.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get(`${this.basePath}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, user: res.data?.result };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await this.refreshToken();
                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get(`${this.basePath}/auth/me`, {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        return { success: true, user: retryRes.data?.result };
                    } catch {
                        console.warn("❌ Gọi lại /auth/me sau refresh thất bại");
                    }
                }
            }
            if (err.response?.status !== 401) console.error("❌ Lỗi getCurrentUser:", err.message);
            return { success: false };
        }
    }

    /** -------------------- REFRESH TOKEN -------------------- */
    async refreshToken() {
        try {
            const res = await AxiosClient.post(`${this.basePath}/auth/refresh`, {}, { withCredentials: true });
            const accessToken = res.data?.result?.accessToken;
            if (accessToken) {
                localStorage.setItem(this.tokenKey, accessToken);
                return { success: true, accessToken };
            }
            return { success: false };
        } catch {
            return { success: false };
        }
    }

    /** -------------------- LOGOUT -------------------- */
    async logout() {
        try {
            const token = localStorage.getItem(this.tokenKey);
            if (!token) return { success: false, message: "Chưa đăng nhập" };

            const logoutData = { accessToken: token };
            await AxiosClient.post(`${this.basePath}/auth/logout`, logoutData, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            localStorage.removeItem(this.tokenKey);
            localStorage.removeItem("refreshToken");

            return { success: true, message: "Đăng xuất thành công" };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await this.refreshToken();
                if (refresh.success) {
                    const logoutData = { accessToken: refresh.accessToken };
                    await AxiosClient.post(`${this.basePath}/auth/logout`, logoutData, {
                        headers: { Authorization: `Bearer ${refresh.accessToken}` },
                        withCredentials: true,
                    });
                    localStorage.removeItem(this.tokenKey);
                    localStorage.removeItem("refreshToken");
                    return { success: true, message: "Đăng xuất thành công" };
                }
            }
            console.error("❌ Lỗi logout:", err);
            return { success: false, message: "Không thể đăng xuất" };
        }
    }

    /** -------------------- GET PROFILE -------------------- */
    async getProfile() {
        try {
            const token = localStorage.getItem(this.tokenKey);
            if (!token) return { success: false, message: "Chưa đăng nhập" };

            const res = await AxiosClient.get(`${this.basePath}/users/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, user: res.data?.result };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await this.refreshToken();
                if (refresh.success) {
                    const retryRes = await AxiosClient.get(`${this.basePath}/users/profile`, {
                        headers: { Authorization: `Bearer ${refresh.accessToken}` },
                    });
                    return { success: true, user: retryRes.data?.result };
                }
            }
            console.error("❌ Lỗi getProfile:", err);
            return { success: false, message: "Không thể lấy thông tin người dùng" };
        }
    }

    /** -------------------- UPDATE PROFILE -------------------- */
    async updateProfile(profileData) {
        try {
            const token = localStorage.getItem(this.tokenKey);
            if (!token) return { success: false, message: "Chưa đăng nhập" };

            const res = await AxiosClient.put(`${this.basePath}/users/update-profile`, profileData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, user: res.data?.result };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await this.refreshToken();
                if (refresh.success) {
                    const retryRes = await AxiosClient.put(`${this.basePath}/users/update-profile`, profileData, {
                        headers: { Authorization: `Bearer ${refresh.accessToken}` },
                    });
                    return { success: true, user: retryRes.data?.result };
                }
            }
            console.error("❌ Lỗi updateProfile:", err);
            return { success: false, message: "Không thể cập nhật thông tin người dùng" };
        }
    }

    /** -------------------- CHANGE PASSWORD -------------------- */
    async changePassword(passwordData) {
        try {
            const token = localStorage.getItem(this.tokenKey);
            if (!token) return { success: false, message: "Chưa đăng nhập" };

            await AxiosClient.put(`${this.basePath}/users/change-password`, passwordData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, message: "Đổi mật khẩu thành công" };
        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await this.refreshToken();
                if (refresh.success) {
                    await AxiosClient.put(`${this.basePath}/users/change-password`, passwordData, {
                        headers: { Authorization: `Bearer ${refresh.accessToken}` },
                    });
                    return { success: true, message: "Đổi mật khẩu thành công" };
                }
            }
            console.error("❌ Lỗi changePassword:", err);
            return {
                success: false,
                message:
                    err?.response?.data?.errors?.message ||
                    err.message ||
                    "Không thể đổi mật khẩu",
            };
        }
    }
}


