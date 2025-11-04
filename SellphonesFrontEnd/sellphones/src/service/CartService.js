import AxiosClient from "../api/AxiosClient";
import UserService from "./UserService";

const CartService = {
    async getCart() {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return { success: false, message: "Chưa đăng nhập" };

            const res = await AxiosClient.get("/cart/items", {
                headers: { Authorization: `Bearer ${token}` },
            });

            // ✅ Lấy mảng cartItems từ response
            const result = res.data?.result?.cartItems || [];

            return { success: true, result };
        } catch (err) {
            // ✅ Nếu token hết hạn → thử refresh token
            if (err.response?.status === 401) {
                const refreshResult = await UserService.refreshToken();
                if (refreshResult.success) {
                    const retryRes = await AxiosClient.get("/cart/items", {
                        headers: {
                            Authorization: `Bearer ${refreshResult.accessToken}`,
                        },
                    });

                    const result = retryRes.data?.result?.cartItems || [];
                    return { success: true, result };
                }
            }

            console.error("❌ Lỗi lấy giỏ hàng:", err);
            return { success: false, message: "Không thể lấy giỏ hàng" };
        }
    },

    async updateQuantity(itemQuantityRequest) {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return { success: false, message: "Chưa đăng nhập" };

            const res = await AxiosClient.put("/cart/update-quantity", itemQuantityRequest, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = res.data?.result || "Updated quantity successfully";
            return { success: true, result };

        } catch (err) {
            // ✅ Nếu token hết hạn → thử refresh token
            if (err.response?.status === 401) {
                const refreshResult = await UserService.refreshToken();
                if (refreshResult.success) {
                    const retryRes = await AxiosClient.put("/cart/update-quantity", itemQuantityRequest, {
                        headers: { Authorization: `Bearer ${refreshResult.accessToken}` },
                    });

                    const result = retryRes.data?.result || "Updated quantity successfully";
                    return { success: true, result };
                }
            }

            console.error("❌ Lỗi cập nhật số lượng:", err);
            return { success: false, message: "Không thể cập nhật số lượng" };
        }
    },

    async deleteCartItem(itemId) {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return { success: false, message: "Chưa đăng nhập" };

            const res = await AxiosClient.delete(`/cart/delete-cart-item/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = res.data?.result || "Deleted cart item successfully";
            return { success: true, result };

        } catch (err) {
            // ✅ Nếu token hết hạn → thử refresh token
            if (err.response?.status === 401) {
                const refreshResult = await UserService.refreshToken();
                if (refreshResult.success) {
                    const retryRes = await AxiosClient.delete(`/cart/delete-cart-item/${itemId}`, {
                        headers: { Authorization: `Bearer ${refreshResult.accessToken}` },
                    });

                    const result = retryRes.data?.result || "Deleted cart item successfully";
                    return { success: true, result };
                }
            }

            console.error("❌ Lỗi xóa sản phẩm trong giỏ:", err);
            return { success: false, message: "Không thể xóa sản phẩm trong giỏ" };
        }
    },

    async addCartItem(productVariantId) {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return { success: false, message: "Chưa đăng nhập" };

            const res = await AxiosClient.post(
                `/cart/add-item`,
                { productVariantId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const result = res.data?.data?.result || "Thêm sản phẩm vào giỏ thành công";
            return { success: true, result };

        } catch (err) {
            // Nếu token hết hạn → thử refresh token
            if (err.response?.status === 401) {
                const refreshResult = await UserService.refreshToken();
                if (refreshResult.success) {
                    const retryRes = await AxiosClient.post(
                        `/cart/add-item`,
                        { productVariantId },
                        { headers: { Authorization: `Bearer ${refreshResult.accessToken}` } }
                    );

                    const result = retryRes.data?.data?.result || "Thêm sản phẩm vào giỏ thành công";
                    return { success: true, result };
                }
            }

            console.error("❌ Lỗi thêm sản phẩm vào giỏ:", err);
            return { success: false, message: "Không thể thêm sản phẩm vào giỏ" };
        }
    },

}

export default CartService;
