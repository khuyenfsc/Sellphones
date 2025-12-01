package com.sellphones.controller.user.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.user.admin.*;
import com.sellphones.service.user.admin.AdminRoleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/roles")
public class AdminRoleController {

    private final AdminRoleService adminRoleService;

    @GetMapping
    public ResponseEntity<CommonResponse> getRoles(@Valid AdminRoleFilterRequest request){
        PageResponse<AdminRoleResponse> response = adminRoleService.getRoles(request);
        Map<String, Object> map = new HashMap<>();
        map.put("roles", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/all")
    public ResponseEntity<CommonResponse> getAllRoles(){
        List<AdminRoleResponse> response = adminRoleService.getAllRoles();
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse> getRoleBYId(@PathVariable Long id){
        AdminRoleDetailsResponse response = adminRoleService.getRoleDetails(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/create-role")
    public ResponseEntity<CommonResponse> createRole(@RequestBody @Valid AdminCreateRoleRequest request){
        AdminRoleResponse response = adminRoleService.createRole(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/update-role/{id}")
    public ResponseEntity<CommonResponse> editRole(
            @RequestBody @Valid AdminUpdateRoleRequest request,
            @PathVariable Long id
    ){
        adminRoleService.editRole(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited role successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete-role/{id}")
    public ResponseEntity<CommonResponse> deleteRole(@PathVariable Long id){
        adminRoleService.deleteRole(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted role successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

}
