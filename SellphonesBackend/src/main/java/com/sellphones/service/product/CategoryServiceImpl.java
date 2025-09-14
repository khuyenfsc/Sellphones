package com.sellphones.service.product;

import com.sellphones.dto.product.response.CategoryResponse;
import com.sellphones.dto.product.response.FilterOptionByCategoryResponse;
import com.sellphones.dto.product.response.FilterOptionResponse;
import com.sellphones.entity.product.Category;
import com.sellphones.entity.product.FilterOption;
import com.sellphones.repository.product.CategoryRepository;
import com.sellphones.repository.product.FilterOptionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;

    private final FilterOptionRepository filterOptionRepository;

    private final ModelMapper modelMapper;

    @Override
    public List<CategoryResponse> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(category -> modelMapper.map(category, CategoryResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<FilterOptionByCategoryResponse> getFilterOptionsByCategory(Long categoryId) {
        List<FilterOption> filterOptions = filterOptionRepository.findByCategoryId(categoryId);

        if (filterOptions.isEmpty()) {
            return (List<FilterOptionByCategoryResponse>) Collections.EMPTY_LIST;
        }

        Map<Long, List<FilterOption>> grouped = filterOptions.stream()
                .collect(Collectors.groupingBy(fo -> fo.getProductFilter().getAttribute().getId()));

        return grouped.entrySet().stream()
                .map(entry -> {
                    return new FilterOptionByCategoryResponse(entry.getKey(),
                            entry.getValue().getFirst().getProductFilter().getName(),
                            entry.getValue().stream()
                                    .map(fo -> modelMapper.map(fo, FilterOptionResponse.class))
                                    .collect(Collectors.toList()));
                })
                .collect(Collectors.toList());

    }
}
