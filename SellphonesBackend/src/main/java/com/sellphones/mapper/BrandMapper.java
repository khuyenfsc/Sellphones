package com.sellphones.mapper;

import com.sellphones.dto.product.admin.AdminBrandRequest;
import com.sellphones.entity.product.Brand;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class BrandMapper {

    public Brand mapToBranEntity(AdminBrandRequest request, String fileName){
        Brand brand = Brand.builder()
                .name(request.getName())
                .brandIcon(fileName)
                .createdAt(LocalDateTime.now())
                .build();

        return brand;
    }

}
