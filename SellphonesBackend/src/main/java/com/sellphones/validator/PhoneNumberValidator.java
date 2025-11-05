package com.sellphones.validator;

import com.sellphones.annotation.ValidPhoneNumber;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PhoneNumberValidator implements ConstraintValidator<ValidPhoneNumber, String> {
    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {

        if(s == null) return true;

        if(s.isBlank()) return true;

        String regex = "^[0-9]{8,15}$";

        return s.matches(regex);
    }
}
