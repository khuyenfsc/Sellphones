package com.sellphones.annotation;

import com.sellphones.validator.StrongPasswordValidator;
import com.sellphones.validator.VariantAttributeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Target({ElementType.FIELD})
@Constraint(validatedBy = VariantAttributeValidator.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface VariantAttributeFormat {
    String message() default "Sai format của tên các thuộc tính (VD: RAM-ROM)";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
