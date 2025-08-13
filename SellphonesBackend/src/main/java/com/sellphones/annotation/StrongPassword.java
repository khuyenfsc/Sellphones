package com.sellphones.annotation;

import com.sellphones.validator.PhoneNumberValidator;
import com.sellphones.validator.StrongPasswordValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Target({ElementType.FIELD})
@Constraint(validatedBy = StrongPasswordValidator.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface StrongPassword {
    String message() default "Mật khẩu phải dài ít nhất 8 ký tự, chứa ít nhất 1 chữ hoa, chứa ít nhất 1 ký tự đặc biệt";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
