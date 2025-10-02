package com.sellphones.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {

    PRODUCT_NOT_FOUND( "Product not found", HttpStatus.NOT_FOUND),
    PRODUCT_VARIANT_NOT_FOUND("Product variant not found", HttpStatus.NOT_FOUND),
    PRODUCT_VARIANT_ID_NULL_EXCEPTION("Product variant ID Null", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND("User not found", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD("Invalid password", HttpStatus.UNAUTHORIZED),
    TOKEN_EXPIRED("Token expired", HttpStatus.UNAUTHORIZED),
    TOKEN_PARSE_ERROR("Token parse error", HttpStatus.UNAUTHORIZED),
    TOKEN_GENERATION_FAILED("Failed to generate token", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_AUTHORIZATION_HEADER("Invalid authorization header", HttpStatus.UNAUTHORIZED),
    CART_ITEM_ALREADY_EXISTS("Cart item already exists in the cart", HttpStatus.CONFLICT),
    CART_ITEM_NOT_FOUND("Cart item not found", HttpStatus.NOT_FOUND),
    ROLE_NOT_FOUND("Role not found", HttpStatus.NOT_FOUND),
    PAYMENT_METHOD_TYPE_NOT_FOUND("Payment method type not found", HttpStatus.NOT_FOUND),
    PAYMENT_METHOD_NOT_FOUND("Payment method not found", HttpStatus.NOT_FOUND),
    ORDER_NOT_FOUND("Order not found", HttpStatus.NOT_FOUND),
    ATTRIBUTE_NOT_FOUND("Attribute not found", HttpStatus.NOT_FOUND),
    ATTRIBUTE_VALUE_NOT_FOUND("Attribute value not found", HttpStatus.NOT_FOUND),
    CATEGORY_OPTION_NOT_FOUND("Category option not found", HttpStatus.NOT_FOUND),
    CATEGORY_OPTION_VALUE_NOT_FOUND("Category option not found", HttpStatus.NOT_FOUND),
    CATEGORY_NOT_FOUND("Category not found", HttpStatus.NOT_FOUND),
    COMMENT_NOT_FOUND("Comment not found", HttpStatus.NOT_FOUND),
    BRAND_NOT_FOUND("Brand not found", HttpStatus.NOT_FOUND),
    PRODUCT_PROMOTION_NOT_FOUND_IN_PRODUCT("Product promotion not found in product", HttpStatus.NOT_FOUND),
    WARRANTY_NOT_FOUND_IN_PRODUCT("Warranty not found in product", HttpStatus.NOT_FOUND),
    PRODUCT_VARIANT_OUT_OF_STOCK("Product variant is out of stock", HttpStatus.BAD_REQUEST),
    INVALID_PROMOTION_CONFIG("Invalid promotion configuration", HttpStatus.BAD_REQUEST),
    INVALID_REVIEW_REQUEST_FORMAT("Invalid review request format", HttpStatus.BAD_REQUEST),
    INVALID_BRAND_REQUEST_FORMAT("Invalid brand request format", HttpStatus.BAD_REQUEST),
    INVALID_ACTIVE_TOKEN("Invalid active token", HttpStatus.UNAUTHORIZED),
    INVALID_ROLE("Invalid role", HttpStatus.UNAUTHORIZED),
    NOT_CUSTOMER("User is not allowed to login as customer", HttpStatus.FORBIDDEN),
    EMPTY_FILE("Empty file", HttpStatus.BAD_REQUEST),
    INVALID_OTP("Invalid otp", HttpStatus.BAD_REQUEST),
    INVALID_RESET_TOKEN("Invalid reset otp", HttpStatus.BAD_REQUEST),
    CANNOT_STORE_FILE_OUTSIDE_CURRENT_DIRECTORY("Cannot store file outside current directory", HttpStatus.BAD_REQUEST),
    CANNOT_READ_FILE_OUTSIDE_CURRENT_DIRECTORY("Cannot store file outside current directory", HttpStatus.BAD_REQUEST),
    CANCEL_ORDER_FAILED("Cancel order failed", HttpStatus.BAD_REQUEST),
    INVALID_ATTRIBUTE_ID("Invalid attribute id", HttpStatus.BAD_REQUEST),
    CANNOT_READ_FILE("Cannot read file", HttpStatus.BAD_REQUEST),
    FILE_UPLOAD_FAILED("File upload failed", HttpStatus.BAD_REQUEST),
    INVALID_RESET_PASSWORD_TOKEN("Invalid reset password token", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND_FOR_ACTIVE_TOKEN("OTP not found for the given email", HttpStatus.NOT_FOUND),
    OTP_NOT_FOUND_FOR_EMAIL("User not found for the given active token", HttpStatus.NOT_FOUND),
    TIME_LIMIT_NOT_REACHED("OTP request too soon. Please wait at least 60 seconds before retrying", HttpStatus.BAD_REQUEST),
    USER_ALREADY_EXISTS("User already exists", HttpStatus.CONFLICT),
    CART_NOT_FOUND("Cart not found", HttpStatus.NOT_FOUND),
    UNAUTHORIZED_ADMIN_ACCESS("You do not have permission to access admin resources", HttpStatus.FORBIDDEN),
    UNAUTHORIZED_CUSTOMER_ACCESS("You do not have permission to access customer resources", HttpStatus.FORBIDDEN),
    INVALID_TOKEN("Invalid token", HttpStatus.UNAUTHORIZED);

    private String message;
    private HttpStatusCode statusCode;

    ErrorCode(String message, HttpStatusCode statusCode){
        this.message = message;
        this.statusCode = statusCode;
    }

}
