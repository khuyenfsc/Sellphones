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

    async register(userData) {
        try {
            const res = await AxiosClient.post(
                '/users/register',
                userData,
                { withCredentials: true }
            );

            const activeToken = res?.data?.result?.activeToken;
            const email = res?.data?.result?.email;

            if (activeToken && email) {
                return { success: true, activeToken, email };
            }

            return { success: false, message: 'Đăng ký thất bại, vui lòng thử lại sau!' };
        } catch (error) {
            console.error('❌ Lỗi đăng ký:', error);

            // ✅ Xử lý lỗi 409: người dùng đã tồn tại
            if (error.response?.status === 409) {
                const msg = error.response?.data?.errors?.message || 'Người dùng đã tồn tại.';
                return { success: false, message: msg };
            }

            // ✅ Các lỗi khác
            const fallbackMsg =
                error.response?.data?.message ||
                error.response?.data?.errors?.message ||
                'Vui lòng kiểm tra lại thông tin đăng ký.';

            return { success: false, message: fallbackMsg };
        }
    },

    async registerWithGoogle(userData) {
        try {
            const res = await AxiosClient.post(
                "/users/register/google",
                userData,
                { withCredentials: true }
            );

            // ✅ Kiểm tra phản hồi trả về từ server
            if (res?.status === 200 && res?.data?.success) {
                return {
                    success: true,
                    message: res.data?.message || "Đăng ký bằng Google thành công!",
                    user: res.data?.result || null,
                };
            }

            return {
                success: false,
                message: res?.data?.message || "Đăng ký bằng Google thất bại!",
            };
        } catch (error) {
            console.error("❌ Lỗi đăng ký Google:", error);

            // ✅ Trường hợp tài khoản đã tồn tại
            if (error.response?.status === 409) {
                const msg =
                    error.response?.data?.errors?.message ||
                    "Người dùng đã tồn tại. Vui lòng đăng nhập.";
                return { success: false, message: msg };
            }

            // ✅ Xử lý lỗi khác (400, 500, ...)
            const fallbackMsg =
                error.response?.data?.message ||
                error.response?.data?.errors?.message ||
                "Vui lòng kiểm tra lại thông tin đăng ký Google.";

            return { success: false, message: fallbackMsg };
        }
    },


    async sendRegisterOtp(activeToken, email) {
        try {
            const res = await AxiosClient.post(
                '/users/send-register-otp',
                { activeToken, email },
                { withCredentials: true }
            );

            if (res?.status === 200) {
                return { success: true, message: res.data.result || 'Mã OTP đã được gửi đến email.' };
            }

            return { success: false, message: res.data?.result || 'Gửi OTP thất bại, vui lòng thử lại!' };
        } catch (error) {
            console.error('❌ Lỗi gửi OTP:', error);

            // ✅ Xử lý lỗi email không hợp lệ hoặc token sai
            if (error.response?.status === 400) {
                const msg = error.response?.data?.errors?.message || 'Dữ liệu gửi không hợp lệ.';
                return { success: false, message: msg };
            }

            // ✅ Các lỗi khác
            const fallbackMsg =
                error.response?.data?.message ||
                error.response?.data?.errors?.message ||
                'Không thể gửi mã OTP. Vui lòng thử lại sau.';

            return { success: false, message: fallbackMsg };
        }
    },

    async verifyRegisterOtp(activeToken, email, otp) {
        try {
            const res = await AxiosClient.post(
                '/users/verify-register-otp',
                { activeToken, email, otp },
                { withCredentials: true }
            );

            if (res?.status === 200) {
                return {
                    success: true,
                    message: res.data?.result || 'Xác minh OTP thành công!',
                    data: res.data, // phòng trường hợp server trả thêm dữ liệu
                };
            }

            return {
                success: false,
                message: res.data?.result || 'Xác minh OTP thất bại, vui lòng thử lại!',
            };
        } catch (error) {
            console.error('❌ Lỗi xác minh OTP:', error);

            // ✅ Xử lý lỗi OTP sai, hết hạn hoặc dữ liệu không hợp lệ
            if (error.response?.status === 400) {
                const msg =
                    error.response?.data?.errors?.message ||
                    error.response?.data?.message ||
                    'Mã OTP không hợp lệ hoặc đã hết hạn.';
                return { success: false, message: msg };
            }

            // ✅ Các lỗi khác (server, mạng, v.v.)
            const fallbackMsg =
                error.response?.data?.message ||
                error.response?.data?.errors?.message ||
                'Không thể xác minh mã OTP. Vui lòng thử lại sau.';

            return { success: false, message: fallbackMsg };
        }
    },


    async refreshToken() {
        try {
            const res = await AxiosClient.post('/auth/refresh', {}, { withCredentials: true });
            const newAccessToken = res?.data?.result?.accessToken;

            if (!newAccessToken) throw new Error("Không có accessToken mới");

            localStorage.setItem('accessToken', newAccessToken);
            return { success: true, accessToken: newAccessToken };
        } catch (error) {
            // 🧹 Nếu refresh thất bại → xóa token cũ
            localStorage.removeItem('accessToken');
            return { success: false };
        }
    },


    async getCurrentUser() {
        try {
            let token = localStorage.getItem('accessToken');

            // ⚡️ Nếu chưa có token → thử refresh ngay
            if (!token) {
                const refresh = await this.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            // 🧭 Gọi API /auth/me
            const res = await AxiosClient.get('/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, user: res.data?.result };

        } catch (err) {
            const status = err.response?.status;

            // 🧱 Nếu token hết hạn → thử refresh 1 lần
            if (status === 401) {
                const refresh = await this.refreshToken();

                if (refresh.success) {
                    const newToken = refresh.accessToken;
                    try {
                        const retryRes = await AxiosClient.get('/auth/me', {
                            headers: { Authorization: `Bearer ${newToken}` },
                        });
                        return { success: true, user: retryRes.data?.result };
                    } catch {
                        console.warn("❌ Gọi lại /auth/me sau refresh thất bại");
                    }
                }
            }

            // 🔕 Không spam log 401 nữa, chỉ log lỗi không mong muốn
            if (status !== 401) console.error("❌ Lỗi getCurrentUser:", err.message);
            return { success: false };
        }
    },


    async getProfile() {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return { success: false, message: 'Chưa đăng nhập' };

            const res = await AxiosClient.get('/users/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Giải cấu trúc dữ liệu trả về đúng theo format của backend
            const user = res.data?.result;

            return { success: true, user };
        } catch (err) {
            // Nếu token hết hạn → thử refresh token
            if (err.response?.status === 401) {
                const refreshResult = await this.refreshToken();
                if (refreshResult.success) {
                    const retryRes = await AxiosClient.get('/users/profile', {
                        headers: { Authorization: `Bearer ${refreshResult.accessToken}` },
                    });
                    const user = retryRes.data?.result;
                    return { success: true, user };
                }
            }

            console.error('❌ Lỗi lấy thông tin người dùng:', err);
            return { success: false, message: 'Không thể lấy thông tin người dùng' };
        }
    },

    async updateProfile(profileData) {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return { success: false, message: 'Chưa đăng nhập' };

            const res = await AxiosClient.put('/users/update-profile', profileData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Giải cấu trúc dữ liệu trả về
            const updatedUser = res.data?.result;

            return { success: true, user: updatedUser };
        } catch (err) {
            // Nếu token hết hạn → thử refresh token
            if (err.response?.status === 401) {
                const refreshResult = await this.refreshToken();
                if (refreshResult.success) {
                    const retryRes = await AxiosClient.put('/users/profile', profileData, {
                        headers: { Authorization: `Bearer ${refreshResult.accessToken}` },
                    });
                    const updatedUser = retryRes.data?.result;
                    return { success: true, user: updatedUser };
                }
            }

            console.error('❌ Lỗi cập nhật thông tin người dùng:', err);
            return { success: false, message: 'Không thể cập nhật thông tin người dùng' };
        }
    },

    async changePassword(passwordData) {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return { success: false, message: 'Chưa đăng nhập' };

            // Gọi API đổi mật khẩu
            await AxiosClient.put('/users/change-password', passwordData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return { success: true, message: 'Đổi mật khẩu thành công' };
        } catch (err) {
            // Token hết hạn → thử refresh
            if (err.response?.status === 401) {
                const refreshResult = await this.refreshToken();
                if (refreshResult.success) {
                    await AxiosClient.put('/users/change-password', passwordData, {
                        headers: { Authorization: `Bearer ${refreshResult.accessToken}` },
                    });
                    return { success: true, message: 'Đổi mật khẩu thành công' };
                }
            }

            console.error('❌ Lỗi đổi mật khẩu:', err);
            return { success: false, message: 'Không thể đổi mật khẩu' };
        }
    },

    async logout() {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return { success: false, message: 'Chưa đăng nhập' };

            const logoutData = { accessToken: token };

            // Gọi API logout, gửi kèm cookie
            await AxiosClient.post('/auth/logout', logoutData, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true, // ⚠️ gửi cookie
            });

            // Xoá token localStorage sau khi logout
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken'); // nếu lưu refresh token

            return { success: true, message: 'Đăng xuất thành công' };
        } catch (err) {
            // Token hết hạn → thử refresh
            if (err.response?.status === 401) {
                const refreshResult = await this.refreshToken();
                if (refreshResult.success) {
                    const logoutData = { accessToken: refreshResult.accessToken };
                    await AxiosClient.post('/auth/logout', logoutData, {
                        headers: { Authorization: `Bearer ${refreshResult.accessToken}` },
                        withCredentials: true, // ⚠️ gửi cookie
                    });

                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');

                    return { success: true, message: 'Đăng xuất thành công' };
                }
            }

            console.error('❌ Lỗi logout:', err);
            return { success: false, message: 'Không thể đăng xuất' };
        }
    },




};

export default UserService;
