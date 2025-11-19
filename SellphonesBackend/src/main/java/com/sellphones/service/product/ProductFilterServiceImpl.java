package com.sellphones.service.product;

import com.sellphones.dto.product.ProductFilterResponse;
import com.sellphones.entity.product.ProductFilter;
import com.sellphones.repository.product.ProductFilterRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductFilterServiceImpl implements ProductFilterService{

    private final ProductFilterRepository productFilterRepository;

    private final ModelMapper modelMapper;

    @Override
    public List<ProductFilterResponse> getProductFiltersByCategoryName(String categoryName) {
        List<ProductFilter> filters = productFilterRepository.findByCategoryName(categoryName);
        return filters.stream()
                .map(f -> modelMapper.map(f, ProductFilterResponse.class))
                .toList();
    }
}
