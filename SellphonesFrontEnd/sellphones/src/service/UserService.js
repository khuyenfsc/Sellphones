import AxiosClient from "../api/AxiosClient";

const UserService = {
    async login(email, password) {
        try {
            const res = await AxiosClient.post(
                '/auth/login',
                { email, password },
                { withCredentials: true }
            );

            const accessToken = res?.data?.result?.accessToken;

            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                return { success: true, accessToken };
            }

            return { success: false, message: 'Lôi đăng nhập vui lòng thử lại sau!' };
        } catch (error) {
            console.error('❌ Lỗi đăng nhập:', error);
            return { success: false, message: 'Vui lòng kiểm tra thông tin đăng nhập.' };
        }
    },

    async refreshToken() {
        try {
            const res = await AxiosClient.post('/auth/refresh', {}, { withCredentials: true });
            const newAccessToken = res?.data?.result?.accessToken;

            if (newAccessToken) {
                localStorage.setItem('accessToken', newAccessToken);
                return { success: true, accessToken: newAccessToken };
            }

            return { success: false };
        } catch (error) {
            console.error('❌ Lỗi refresh token:', error);
            localStorage.removeItem('accessToken');
            return { success: false };
        }
    },

    async getCurrentUser() {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return { success: false, message: 'Chưa đăng nhập' };

            const res = await AxiosClient.get('/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, user: res.data?.result };
        } catch (err) {
            // Nếu bị 401, thử refresh token
            if (err.response?.status === 401) {
                const refreshResult = await this.refreshToken();
                if (refreshResult.success) {
                    const retryRes = await AxiosClient.get('/auth/me', {
                        headers: { Authorization: `Bearer ${refreshResult.accessToken}` },
                    });
                    return { success: true, user: retryRes.data };
                }
            }

            console.error('❌ Lỗi lấy thông tin người dùng:', err);
            return { success: false };
        }
    },
};

export default UserService;
