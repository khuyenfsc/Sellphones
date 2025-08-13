package com.sellphones.annotation;

import com.sellphones.validator.PhoneNumberValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import org.hibernate.tool.schema.TargetType;

import java.lang.annotation.*;

@Documented
@Target({ElementType.FIELD})
@Constraint(validatedBy = PhoneNumberValidator.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPhoneNumber {
    String message() default "Số điện thoại không hợp lệ";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
