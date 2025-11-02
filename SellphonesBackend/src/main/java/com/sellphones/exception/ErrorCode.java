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
    GET_AUTHENTICATION_MANAGER_FAILED("Failed to get authentication manager", HttpStatus.INTERNAL_SERVER_ERROR),
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
    REVIEW_NOT_FOUND("Review not found", HttpStatus.NOT_FOUND),
    COMMENT_NOT_FOUND("Comment not found", HttpStatus.NOT_FOUND),
    BRAND_NOT_FOUND("Brand not found", HttpStatus.NOT_FOUND),
    ADDRESS_NOT_FOUND("Address not found", HttpStatus.NOT_FOUND),
    CUSTOMER_NOT_FOUND("Customer not found", HttpStatus.NOT_FOUND),
    SUPPLIER_NOT_FOUND("Supplier not found", HttpStatus.NOT_FOUND),
    PRODUCT_FILTER_NOT_FOUND("Filter not found", HttpStatus.NOT_FOUND),
    PROMOTION_BANNER_NOT_FOUND("Promotion banner not found", HttpStatus.NOT_FOUND),
    STOCK_ENTRY_NOT_FOUND("Stock entry not found", HttpStatus.NOT_FOUND),
    INVALID_LOGIN_METHOD("Invalid login method. Please use the correct login option.", HttpStatus.BAD_REQUEST),
    INVENTORY_NOT_FOUND("Inventory not found", HttpStatus.NOT_FOUND),
    WAREHOUSE_NOT_FOUND("Warehouse not found", HttpStatus.NOT_FOUND),
    WARRANTY_NOT_FOUND("Warranty not found", HttpStatus.NOT_FOUND),
    SHIPMENT_NOT_FOUND("Shipment not found", HttpStatus.NOT_FOUND),
    FILTER_OPTION_NOT_FOUND("Filter option not found", HttpStatus.NOT_FOUND),
    GIFT_PRODUCT_NOT_FOUND("Filter option not found", HttpStatus.NOT_FOUND),
    PRODUCT_PROMOTION_NOT_FOUND("Product promotion not found", HttpStatus.NOT_FOUND),
    CANNOT_DELETE_CUSTOMER_ADDRESS("Cannot delete address of type 'CUSTOMER'", HttpStatus.BAD_REQUEST),
    PRODUCT_PROMOTION_NOT_FOUND_IN_PRODUCT("Product promotion not found in product", HttpStatus.NOT_FOUND),
    WARRANTY_NOT_FOUND_IN_PRODUCT("Warranty not found in product", HttpStatus.NOT_FOUND),
    PRODUCT_VARIANT_OUT_OF_STOCK("Product variant is out of stock", HttpStatus.BAD_REQUEST),
    INVALID_PROMOTION_CONFIG("Invalid promotion configuration", HttpStatus.BAD_REQUEST),
    INVALID_SHIPMENT_ITEMS("Invalid shipments items", HttpStatus.BAD_REQUEST),
    INVALID_REQUEST_FORMAT("Invalid request format", HttpStatus.BAD_REQUEST),
    INVALID_CONDITION("Invalid condition", HttpStatus.BAD_REQUEST),
    INVALID_REVIEW_REQUEST_FORMAT("Invalid review request format", HttpStatus.BAD_REQUEST),
    INVENTORY_ALREADY_EXISTS("Inventory already exists for this product variant and warehouse", HttpStatus.CONFLICT),
    WAREHOUSE_ALREADY_EXISTS("Warehouse already exists for this address", HttpStatus.CONFLICT),
    INVALID_BRAND_REQUEST_FORMAT("Invalid brand request format", HttpStatus.BAD_REQUEST),
    INVALID_PRODUCT_REQUEST_FORMAT("Invalid product request format", HttpStatus.BAD_REQUEST),
    INVALID_ACTIVE_TOKEN("Invalid active token", HttpStatus.UNAUTHORIZED),
    INVALID_ROLE("Invalid role", HttpStatus.UNAUTHORIZED),
    USER_INACTIVE("User is inactive", HttpStatus.BAD_REQUEST),
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
    INVALID_STATUS_TRANSITION("Invalid order status transition", HttpStatus.BAD_REQUEST),
    INVALID_TOKEN("Invalid token", HttpStatus.UNAUTHORIZED);

    private String message;
    private HttpStatusCode statusCode;

    ErrorCode(String message, HttpStatusCode statusCode){
        this.message = message;
        this.statusCode = statusCode;
    }

}
