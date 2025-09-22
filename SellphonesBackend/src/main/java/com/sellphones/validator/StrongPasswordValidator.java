package com.sellphones.validator;

import com.sellphones.annotation.StrongPassword;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class StrongPasswordValidator implements ConstraintValidator<StrongPassword, String> {
    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        String regex = "^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-={}\\[\\]:;\"'<>,.?/`~\\\\]).{8,}$";
        return s.matches(regex);
    }
}
