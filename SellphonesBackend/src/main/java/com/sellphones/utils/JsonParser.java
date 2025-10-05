package com.sellphones.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;

public class JsonParser {

    public static  <T> T parseRequest(String json, Class<T> clazz, ObjectMapper objectMapper) {
        try {
            return objectMapper.readValue(json, clazz);
        } catch (JsonProcessingException e) {
            throw new AppException(ErrorCode.INVALID_REQUEST_FORMAT);
        }
    }

}
