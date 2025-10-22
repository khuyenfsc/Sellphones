package com.sellphones.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

import java.util.Set;

public class JsonParser {

    public static  <T> T parseRequest(String json, Class<T> clazz, ObjectMapper objectMapper, Validator validator) {
        try {
            // Parse JSON -> Object
            T obj = objectMapper.readValue(json, clazz);

            // Validate tương tự @Valid
            System.out.println("violation empty");

            Set<ConstraintViolation<T>> violations = validator.validate(obj);

            if (!violations.isEmpty()) {
                // gom lỗi tương tự MethodArgumentNotValidException
                String message = violations.stream()
                        .map(ConstraintViolation::getMessage)
                        .findFirst()
                        .orElse("Invalid request");
                throw new AppException(ErrorCode.INVALID_REQUEST_FORMAT, message);
            }

            return obj;

        } catch (JsonProcessingException e) {
            throw new AppException(ErrorCode.INVALID_REQUEST_FORMAT, "Invalid JSON format");
        }
    }

}
