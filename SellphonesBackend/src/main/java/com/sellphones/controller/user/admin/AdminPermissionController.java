package com.sellphones.controller.user.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.user.admin.AdminPermissionResponse;
import com.sellphones.service.user.admin.AdminPermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/admin/permissions")
@RequiredArgsConstructor
public class AdminPermissionController {

    private final AdminPermissionService adminPermissionService;

    @GetMapping("/all")
    public ResponseEntity<CommonResponse> getPermissions(){
        System.out.println("Get all permissions");
        Set<AdminPermissionResponse> responses = adminPermissionService.getAllAdminPermissions();
        Map<String, Object> map = new HashMap<>();
        map.put("result", responses);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
