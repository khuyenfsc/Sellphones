package com.sellphones.mapper;

import com.sellphones.dto.product.admin.AdminCategoryRequest;
import com.sellphones.entity.product.Category;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class CategoryMapper {

    public Category mapToCategoryEntity(AdminCategoryRequest request, String iconName){
        Category category = Category.builder()
                .name(request.getName())
                .code(request.getCode())
                .icon(iconName)
                .createdAt(LocalDateTime.now())
                .build();

        return category;
    }

}
