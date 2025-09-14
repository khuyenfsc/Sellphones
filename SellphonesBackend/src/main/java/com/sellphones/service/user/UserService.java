package com.sellphones.service.user;

import com.sellphones.dto.user.BasicUserResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface UserService {
    BasicUserResponse getUserProfileBasic();
}
