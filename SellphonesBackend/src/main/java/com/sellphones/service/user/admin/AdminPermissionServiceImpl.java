package com.sellphones.service.user.admin;

import com.sellphones.dto.user.admin.AdminPermissionResponse;
import com.sellphones.entity.user.Permission;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.user.UserRepository;
import com.sellphones.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AdminPermissionServiceImpl implements AdminPermissionService{

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public Set<AdminPermissionResponse> getAllAdminPermissions() {
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Set<Permission> permissions = user.getRole().getPermissions();
        System.out.println(permissions);
        return buildPermissionTree(permissions);
    }

    private Set<AdminPermissionResponse> buildPermissionTree(Set<Permission> permissions){
        Map<String, AdminPermissionResponse> cache = new HashMap<>();
        Set<AdminPermissionResponse> roots = new HashSet<>();


        for(Permission permission : permissions){
            String[] parts = permission.getCode().split("\\.");
            String path = "";
            AdminPermissionResponse parent = null;
            for(String part : parts){
                path = path.isEmpty()?part : path + "." + part;
                boolean isNew = !cache.containsKey(path);
                AdminPermissionResponse node = cache.computeIfAbsent(path, k -> new AdminPermissionResponse(part));

                if(isNew){
                    if(parent != null){
                        parent.getChildPermissions().add(node);
                    }else{
                        roots.add(node);
                    }
                }

                parent = node;
            }
        }

        return roots;
    }

//    private Set<AdminPermissionResponse> buildPermissionTreeTest(List<String> permissions){
//        Map<String, AdminPermissionResponse> cache = new HashMap<>();
//        Set<AdminPermissionResponse> roots = new HashSet<>();
//
//        for(String permission : permissions){
//            String[] parts = permission.split("\\.");
//            System.out.println(Arrays.toString(parts));
//            String path = "";
//            AdminPermissionResponse parent = null;
//            for(String part : parts){
//                path = path.isEmpty()?part : path + "." + part;
//                boolean isNew = !cache.containsKey(path);
//                AdminPermissionResponse node = cache.computeIfAbsent(path, k -> new AdminPermissionResponse(part));
//                if (parent != null) {
//                    // phòng ngừa add trùng (defensive)
//                    if(isNew){
//                        parent.getChildPermissions().add(node);
//                    }
//
//                } else {
//                    if (isNew) {
//                        roots.add(node);
//                    }
//                }
//
//                parent = node;
//            }
//        }
//
//        return roots;
//    }

//    private AdminPermissionResponse getExistingResponse(Set<AdminPermissionResponse> root){
//
//    }

}
