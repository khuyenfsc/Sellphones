package com.sellphones.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CommonErrorResponse {

    private int statusCode;

    private Map<String, Object> errors;

}
