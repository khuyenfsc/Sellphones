import AxiosClient from "../api/AxiosClient";
import UserService from "./UserService";

const CartService = {
    async getCart() {
        try {
            let token = localStorage.getItem("accessToken");

            if (!token) {
                const refresh = await UserService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.get("/cart/items", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = res.data?.result?.cartItems || [];
            return { success: true, result };

        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await UserService.refreshToken();
                if (refresh.success) {
                    try {
                        const retryRes = await AxiosClient.get("/cart/items", {
                            headers: { Authorization: `Bearer ${refresh.accessToken}` },
                        });

                        const result = retryRes.data?.result?.cartItems || [];
                        return { success: true, result };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message  || "Không thể lấy giỏ hàng"
            };
        }
    },

    async updateQuantity(itemQuantityRequest) {
        try {
            let token = localStorage.getItem("accessToken");

            if (!token) {
                const refresh = await UserService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.put(
                "/cart/update-quantity",
                itemQuantityRequest,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const result = res.data?.result || "Updated quantity successfully";
            return { success: true, result };

        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await UserService.refreshToken();
                if (refresh.success) {
                    try {
                        const retryRes = await AxiosClient.put(
                            "/cart/update-quantity",
                            itemQuantityRequest,
                            { headers: { Authorization: `Bearer ${refresh.accessToken}` } }
                        );

                        const result = retryRes.data?.result || "Updated quantity successfully";
                        return { success: true, result };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message  || "Không thể cập nhật số lượng"
            };
        }
    },

    async deleteCartItem(itemId) {
        try {
            let token = localStorage.getItem("accessToken");

            if (!token) {
                const refresh = await UserService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.delete(
                `/cart/delete-cart-item/${itemId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const result = res.data?.result || "Deleted cart item successfully";
            return { success: true, result };

        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await UserService.refreshToken();
                if (refresh.success) {
                    try {
                        const retryRes = await AxiosClient.delete(
                            `/cart/delete-cart-item/${itemId}`,
                            { headers: { Authorization: `Bearer ${refresh.accessToken}` } }
                        );

                        const result = retryRes.data?.result || "Deleted cart item successfully";
                        return { success: true, result };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message  || "Không thể xóa sản phẩm trong giỏ"
            };
        }
    },

    async addCartItem(productVariantId) {
        try {
            let token = localStorage.getItem("accessToken");

            if (!token) {
                const refresh = await UserService.refreshToken();
                if (!refresh.success) return { success: false, message: "Chưa đăng nhập" };
                token = refresh.accessToken;
            }

            const res = await AxiosClient.post(
                "/cart/add-item",
                { productVariantId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const result = res.data?.data?.result || "Thêm sản phẩm vào giỏ thành công";
            return { success: true, result };

        } catch (err) {
            if (err.response?.status === 401) {
                const refresh = await UserService.refreshToken();
                if (refresh.success) {
                    try {
                        const retryRes = await AxiosClient.post(
                            "/cart/add-item",
                            { productVariantId },
                            { headers: { Authorization: `Bearer ${refresh.accessToken}` } }
                        );

                        const result = retryRes.data?.data?.result || "Thêm sản phẩm vào giỏ thành công";
                        return { success: true, result };
                    } catch {}
                }
            }

            return {
                success: false,
                message: err?.response?.data?.errors?.message  || "Không thể thêm sản phẩm vào giỏ"
            };
        }
    },
};

export default CartService;
