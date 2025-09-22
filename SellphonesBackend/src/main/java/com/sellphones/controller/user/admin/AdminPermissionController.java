package com.sellphones.controller.user.admin;

import com.sellphones.dto.product.response.CommentResponse;
import com.sellphones.service.admin.AdminPermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/permissions")
@RequiredArgsConstructor
public class AdminPermissionController {

    private final AdminPermissionService adminPermissionService;

    @GetMapping("/all")
    public ResponseEntity<CommentResponse> getPermissions(){

    }

}
