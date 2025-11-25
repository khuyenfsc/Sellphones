package com.sellphones.controller.user.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.user.admin.AdminUserFilterRequest;
import com.sellphones.dto.user.admin.AdminUserRequest;
import com.sellphones.dto.user.admin.AdminUserResponse;
import com.sellphones.service.user.admin.AdminUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/users")
public class AdminUserController {

    private final AdminUserService adminUserService;

    @GetMapping
    public ResponseEntity<CommonResponse> getUsers(AdminUserFilterRequest request){
        PageResponse<AdminUserResponse> response = adminUserService.getUsers(request);
        Map<String, Object> map = new HashMap<>();
        map.put("users", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/create-user")
    public ResponseEntity<CommonResponse> createUser(
        @RequestBody @Valid AdminUserRequest request
    ){

        adminUserService.createUser(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created user successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/edit-user/{id}")
    public ResponseEntity<CommonResponse> editUser(
            @RequestBody @Valid AdminUserRequest request,
            @PathVariable Long id
    ){
        adminUserService.editUser(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited user successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<CommonResponse> deleteUser(@PathVariable Long id){
        adminUserService.deleteUser(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted user successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }
}
