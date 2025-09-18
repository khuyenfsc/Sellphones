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
    PAYMENT_METHOD_TYPE_NOT_FOUND("Payment method type not found", HttpStatus.NOT_FOUND),
    PAYMENT_METHOD_NOT_FOUND("Payment method not found", HttpStatus.NOT_FOUND),
    ORDER_NOT_FOUND("Order not found", HttpStatus.NOT_FOUND),
    PRODUCT_PROMOTION_NOT_FOUND_IN_PRODUCT("Product promotion not found in product", HttpStatus.NOT_FOUND),
    WARRANTY_NOT_FOUND_IN_PRODUCT("Warranty not found in product", HttpStatus.NOT_FOUND),
    PRODUCT_VARIANT_OUT_OF_STOCK("Product variant is out of stock", HttpStatus.BAD_REQUEST),
    INVALID_PROMOTION_CONFIG("Invalid promotion configuration", HttpStatus.BAD_REQUEST),
    CART_NOT_FOUND("Cart not found", HttpStatus.NOT_FOUND),
    INVALID_TOKEN("Invalid token", HttpStatus.UNAUTHORIZED);

    private String message;
    private HttpStatusCode statusCode;

    ErrorCode(String message, HttpStatusCode statusCode){
        this.message = message;
        this.statusCode = statusCode;
    }

}
