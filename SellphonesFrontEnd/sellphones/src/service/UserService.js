import AxiosClient from "../api/AxiosClient";
import { BaseAuthService } from "./base/BaseAuthService";

class UserService extends BaseAuthService {
    constructor() {
        super({ basePath: "", tokenKey: "accessToken" });
    }

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
                const msg = 'Người dùng đã tồn tại.';
                return { success: false, message: msg };
            }

            // ✅ Các lỗi khác
            const fallbackMsg =
                error.response?.data?.message ||
                error.response?.data?.errors?.message ||
                'Vui lòng kiểm tra lại thông tin đăng ký.';

            return { success: false, message: fallbackMsg };
        }
    }

    async registerWithGoogle(userData) {
        try {
            const res = await AxiosClient.post(
                "/users/register-with-google",
                userData,
                { withCredentials: true }
            );

            const accessToken = res?.data?.result?.accessToken;

            if (accessToken) {
                // ✅ Lưu token vào localStorage giống như login
                localStorage.setItem("accessToken", accessToken);

                return { success: true, accessToken };
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
    }

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
    }

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
    }

    async sendForgotPasswordOtp(email) {
        try {
            const res = await AxiosClient.post(
                '/users/send-forgot-password-otp',
                { email },
                { withCredentials: true }
            );

            if (res?.status === 200) {
                return { success: true, message: res.data.result || 'Mã OTP đặt lại mật khẩu đã được gửi đến email.' };
            }

            return { success: false, message: res.data?.result || 'Gửi OTP thất bại, vui lòng thử lại!' };
        } catch (error) {
            console.error('❌ Lỗi gửi OTP quên mật khẩu:', error);

            // ✅ Xử lý lỗi email không hợp lệ
            if (error.response?.status === 400) {
                const msg = error.response?.data?.errors?.message || 'Email không hợp lệ hoặc không tồn tại.';
                return { success: false, message: msg };
            }

            // ✅ Các lỗi khác
            const fallbackMsg =
                error.response?.data?.message ||
                error.response?.data?.errors?.message ||
                'Không thể gửi mã OTP. Vui lòng thử lại sau.';

            return { success: false, message: fallbackMsg };
        }
    }

    async verifyForgotPasswordOtp(email, otp) {
        try {
            const res = await AxiosClient.post(
                '/users/verify-forgot-password-otp',
                { email, otp },
                { withCredentials: true }
            );

            if (res?.status === 200) {
                return {
                    success: true,
                    message: 'Xác minh OTP thành công!',
                    data: res.data?.result, // đề phòng server trả thêm dữ liệu
                };
            }

            return {
                success: false,
                message: res.data?.result || 'Xác minh OTP thất bại, vui lòng thử lại!',
            };
        } catch (error) {
            console.error('❌ Lỗi xác minh OTP quên mật khẩu:', error);

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
    }

    async resetPassword(token, newPassword) {
        try {
            const res = await AxiosClient.post(
                '/users/reset-password',
                { token, newPassword },
                { withCredentials: true }
            );

            if (res?.status === 200) {
                return {
                    success: true,
                    message: res.data?.result || 'Đặt lại mật khẩu thành công!',
                    data: res.data, // phòng trường hợp server trả thêm dữ liệu
                };
            }

            return {
                success: false,
                message: res.data?.result || 'Đặt lại mật khẩu thất bại, vui lòng thử lại!',
            };
        } catch (error) {
            console.error('❌ Lỗi đặt lại mật khẩu:', error);

            // ✅ Xử lý lỗi dữ liệu không hợp lệ hoặc token hết hạn
            if (error.response?.status === 400) {
                const msg =
                    error.response?.data?.errors?.message ||
                    error.response?.data?.message ||
                    'Token không hợp lệ hoặc đã hết hạn.';
                return { success: false, message: msg };
            }

            // ✅ Các lỗi khác (server, mạng, v.v.)
            const fallbackMsg =
                error.response?.data?.message ||
                error.response?.data?.errors?.message ||
                'Không thể đặt lại mật khẩu. Vui lòng thử lại sau.';

            return { success: false, message: fallbackMsg };
        }
    }

}

export default new UserService();
