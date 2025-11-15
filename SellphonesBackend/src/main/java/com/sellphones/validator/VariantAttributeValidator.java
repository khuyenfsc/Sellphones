package com.sellphones.validator;

import com.sellphones.annotation.VariantAttributeFormat;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class VariantAttributeValidator implements ConstraintValidator<VariantAttributeFormat, String> {
    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        String regex = "^(?!.*--)(?!^-)(?!.*-$)[^-]+(?:-[^-]+)*$";
        return s.matches(regex);
    }
}
