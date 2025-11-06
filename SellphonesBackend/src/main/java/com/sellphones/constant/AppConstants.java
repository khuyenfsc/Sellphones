package com.sellphones.constant;

public class AppConstants {

    public final static String[] PUBLIC_ENDPOINTS = {
            "/api/v1/test/**",
            "/api/v1/products/**",
            "/api/v1/categories/**",
            "/api/v1/promotion-banners/**",
            "/api/v1/comments",
            "/api/v1/brands/**",
            "/api/v1/reviews",
            "/api/v1/reviews/product-variants/**",
            "/api/v1/auth/login",
            "/api/v1/auth/admin-login",
            "/api/v1/auth/refresh",
            "/api/v1/auth/logout",
            "/h2-console/**",
            "/uploads/**",
            "/api/v1/users/register",
            "/api/v1/users/send-register-otp",
            "/api/v1/users/verify-register-otp",
            "/api/v1/users/test-create-user",
            "/api/v1/users/send-forgot-password-otp",
            "/api/v1/users/verify-forgot-password-otp",
            "/api/v1/users/reset-password",
            "/api/v1/users/register-with-google",
            "/api/v1/payment/vnpay-callback",
            "/oauth2/**"
    };

    public final static String[] CUSTOMER_ENDPOINTS = {
            "/api/v1/test/users/**",
    };

    public final static String[] ADMIN_ENDPOINTS = {
            "/api/v1/admin/**",
    };

    public final static String BASE_URL = "http://localhost:8080/";

    public static String JWT_HEADER = "Authorization";


}
