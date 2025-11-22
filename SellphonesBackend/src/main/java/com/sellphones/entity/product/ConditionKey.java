package com.sellphones.entity.product;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum ConditionKey {
    EQUAL("bang"),
    GREATER_THAN_OR_EQUAL( "lon"),
    LESS_THAN_OR_EQUAL( "be"),
    BETWEEN( "khoang"),
    CONTAINS( "chua");

    private String code;

    ConditionKey(String code){
        this.code = code;
    }

    @JsonValue
    public String getCode() {
        return code;
    }

    @JsonCreator
    public static ConditionKey fromJson(String code) {
        for (ConditionKey key : values()) {
            if (key.getCode().equalsIgnoreCase(code)) {
                return key;
            }
        }
        throw new IllegalArgumentException("Invalid condition code: " + code);
    }
}
