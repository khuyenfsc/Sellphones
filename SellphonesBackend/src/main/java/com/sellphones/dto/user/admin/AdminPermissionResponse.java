package com.sellphones.dto.user.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminPermissionResponse {

    private String name;

    private Set<AdminPermissionResponse> childPermissions = new HashSet<>();

    public AdminPermissionResponse(String name){
        this.name = name;
    }
}
