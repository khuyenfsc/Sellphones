package com.sellphones.service.product;

import com.sellphones.dto.product.CategoryResponse;
import com.sellphones.dto.product.ProductFilterResponse;
import com.sellphones.entity.product.Category;
import com.sellphones.entity.product.ProductFilter;
import com.sellphones.repository.product.CategoryRepository;
import com.sellphones.repository.product.ProductFilterRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;

    private final ProductFilterRepository productFilterRepository;

    private final ModelMapper modelMapper;

    @Override
    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(category -> modelMapper.map(category, CategoryResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductFilterResponse> getProductFiltersByCategory(Long categoryId) {
        List<ProductFilter> filters = productFilterRepository.findByCategory_Id(categoryId);
        return filters.stream()
                .map(f -> modelMapper.map(f, ProductFilterResponse.class))
                .toList();
    }
}
