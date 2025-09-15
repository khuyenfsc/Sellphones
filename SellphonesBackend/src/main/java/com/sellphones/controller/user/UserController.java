package com.sellphones.controller.user;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.user.BasicUserResponse;
import com.sellphones.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/user-profile-basic")
    public ResponseEntity<CommonResponse> getUserProfileBasic(HttpServletRequest request){
        BasicUserResponse userResponse = userService.getUserProfileBasic();
        Map<String, Object> map = new HashMap<>();
        map.put("basic_user", userResponse);
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
