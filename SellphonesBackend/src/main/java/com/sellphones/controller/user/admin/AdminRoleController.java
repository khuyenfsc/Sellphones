package com.sellphones.controller.user.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.user.admin.AdminRoleDetailsResponse;
import com.sellphones.dto.user.admin.AdminRoleFilterRequest;
import com.sellphones.dto.user.admin.AdminRoleListResponse;
import com.sellphones.dto.user.admin.AdminRoleRequest;
import com.sellphones.service.user.admin.AdminRoleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/roles")
public class AdminRoleController {

    private final AdminRoleService adminRoleService;

    @GetMapping
    public ResponseEntity<CommonResponse> getRoles(AdminRoleFilterRequest request){
        PageResponse<AdminRoleListResponse> response = adminRoleService.getRoles(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @GetMapping("/role-details/{id}")
    public ResponseEntity<CommonResponse> getRoleDetails(@PathVariable Long id){
        AdminRoleDetailsResponse response = adminRoleService.getRoleDetails(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/create-role")
    public ResponseEntity<CommonResponse> createRole(@RequestBody @Valid AdminRoleRequest request){
        adminRoleService.createRole(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created role successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/edit-role/{id}")
    public ResponseEntity<CommonResponse> editRole(
            @RequestBody @Valid AdminRoleRequest request,
            @PathVariable Long id
    ){
        adminRoleService.editRole(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited role successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-role/{id}")
    public ResponseEntity<CommonResponse> deleteRole(@PathVariable Long id){
        adminRoleService.deleteRole(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted role successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

}
