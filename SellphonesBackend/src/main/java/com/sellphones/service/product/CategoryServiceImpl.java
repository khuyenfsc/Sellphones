package com.sellphones.service.product;

import com.sellphones.dto.product.CategoryResponse;
import com.sellphones.dto.product.FeaturedCategoryResponse;
import com.sellphones.dto.product.ProductFilterResponse;
import com.sellphones.entity.product.Category;
import com.sellphones.entity.product.ProductFilter;
import com.sellphones.repository.product.CategoryRepository;
import com.sellphones.repository.product.ProductFilterRepository;
import com.sellphones.utils.ImageNameToImageUrlConverter;
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

    private final String categoryIconFolderName = "category_icons";

    private final ModelMapper modelMapper;

    @Override
    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(c ->
                    {
                        c.setIcon(ImageNameToImageUrlConverter.convert(c.getIcon(), categoryIconFolderName));
                        return modelMapper.map(c, CategoryResponse.class);
                    }
                )
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductFilterResponse> getProductFiltersByCategory(Long categoryId) {
        List<ProductFilter> filters = productFilterRepository.findByCategory_Id(categoryId);
        return filters.stream()
                .map(f -> modelMapper.map(f, ProductFilterResponse.class))
                .toList();
    }

    @Override
    public List<FeaturedCategoryResponse> getFeaturedCategories() {
        Boolean featuredOnHomepage = true;
        List<Category> categories = categoryRepository.findByFeaturedOnHomepage(featuredOnHomepage);
        return categories.stream()
                .map(c -> modelMapper.map(c, FeaturedCategoryResponse.class))
                .toList();
    }
}
