package com.sellphones.exception;

import com.sellphones.dto.CommonErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CommonErrorResponse> handleAppException(Exception e){
        CommonErrorResponse errorResponse = CommonErrorResponse.builder()
                .message("Bad request")
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<CommonErrorResponse> handleAppException(AppException aex){
        CommonErrorResponse errorResponse = CommonErrorResponse.builder()
                .message(aex.getErrorCode().getMessage())
                .statusCode(aex.getErrorCode().getCode())
                .build();
        return new ResponseEntity<>(errorResponse, aex.getErrorCode().getStatusCode());
    }

}
