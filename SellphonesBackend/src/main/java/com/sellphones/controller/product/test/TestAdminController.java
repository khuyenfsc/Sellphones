package com.sellphones.controller.product.test;

import com.sellphones.dto.CommonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/test")
public class TestAdminController {

    @GetMapping("/hello")
    public String testHello(){
        return "hello admin";
    }

    @GetMapping("/authorities")
    public ResponseEntity<CommonResponse> getAuthorities(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> map = new HashMap<>();
        map.put("result", authentication.getAuthorities());
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }


}
