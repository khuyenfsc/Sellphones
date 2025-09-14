package com.sellphones.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {

    PRODUCT_NOT_FOUND(404, "Product not found", HttpStatus.NOT_FOUND),
    PRODUCT_VARIANT_NOT_FOUND(404, "Product variant not found", HttpStatus.NOT_FOUND),
    PRODUCT_VARIANT_ID_NULL_EXCEPTION(400, "Product variant ID Null", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(404, "User not found", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(403, "Invalid password", HttpStatus.UNAUTHORIZED),
    TOKEN_EXPIRED(403, "Token expired", HttpStatus.UNAUTHORIZED),
    TOKEN_PARSE_ERROR(403, "Token parse error", HttpStatus.UNAUTHORIZED),
    TOKEN_GENERATION_FAILED(500, "Failed to generate token", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_TOKEN(403, "Invalid token", HttpStatus.UNAUTHORIZED);

    private int code;
    private String message;
    private HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode){
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

}
