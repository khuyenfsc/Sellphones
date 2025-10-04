package com.sellphones.exception;

import com.sellphones.dto.CommonErrorResponse;
import com.sellphones.dto.CommonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<CommonErrorResponse> handleAppException(Exception e){
//        Map<String, Object> errors = new HashMap<>();
//        errors.put("message", e.getMessage());
//        return new ResponseEntity<>(new CommonErrorResponse(HttpStatus.BAD_REQUEST.value(), errors), HttpStatus.BAD_REQUEST);
//    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<CommonErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, Object> errors =  ex.getBindingResult().getFieldErrors().stream().collect(Collectors.toMap(
                e -> e.getField(),
                e -> e.getDefaultMessage()
        ));
        return new ResponseEntity<>(new CommonErrorResponse(HttpStatus.BAD_REQUEST.value(), errors), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<CommonErrorResponse> handleAppException(AppException aex){
        Map<String, Object> errors = new HashMap<>();
        errors.put("message", aex.getErrorCode().getMessage());
        return new ResponseEntity<>(new CommonErrorResponse(aex.getErrorCode().getStatusCode().value(), errors), aex.getErrorCode().getStatusCode());
    }

}
