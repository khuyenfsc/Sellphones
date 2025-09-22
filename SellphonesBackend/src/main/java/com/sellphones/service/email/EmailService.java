package com.sellphones.service.email;

public interface EmailService {
    void sandEmail(String subject, String content, String to);
}
