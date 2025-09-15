package com.sellphones.constant;

public class AppConstants {

    public final static String[] PUBLIC_ENDPOINTS = {
            "/api/v1/products/**",
            "/api/v1/categories/**",
            "/api/v1/comments/**",
            "/api/v1/reviews/**",
            "/api/v1/auth/login",
            "/api/v1/auth/refresh",
            "/api/v1/auth/logout",
            "/h2-console/**"
    };

    public final static String[] CUSTOMER_ENDPOINTS = {
            "/api/v1/test/users/**",
    };

    public final static String[] ADMIN_ENDPOINTS = {
            "/api/v1/test/admin/**",
    };

    public static String JWT_HEADER = "Authorization";


}
