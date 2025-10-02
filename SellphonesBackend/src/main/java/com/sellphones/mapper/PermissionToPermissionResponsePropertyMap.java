//package com.sellphones.mapper;
//
//import com.sellphones.dto.user.admin.AdminPermissionResponse;
//import com.sellphones.entity.user.Permission;
//import org.modelmapper.Converter;
//import org.modelmapper.PropertyMap;
//import org.modelmapper.spi.MappingContext;
//
//import java.util.HashMap;
//import java.util.Map;
//
//public class PermissionToPermissionResponsePropertyMap extends PropertyMap<Permission, AdminPermissionResponse>{
//
//    private final Converter<Permission, AdminPermissionResponse> converter = new Converter<Permission, AdminPermissionResponse>() {
//        @Override
//        public AdminPermissionResponse convert(MappingContext<Permission, AdminPermissionResponse> mappingContext) {
//            Map<String, String> permissionMap = new HashMap<>();
//            Permission permission = mappingContext.getSource();
//            String[] parts = permission.getCode().split("//.");
//            for(String part : parts){
//
//            }
//            return null;
//        }
//
//        private AdminPermissionResponse buildPermissionTree(Permission permission){
//            String[] parts = permission.getCode().split("//.");
//        }
//    }
//
//    @Override
//    protected void configure() {
//
//    }
//}
