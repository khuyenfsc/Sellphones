package com.sellphones.service.product;

import com.sellphones.dto.product.BrandResponse;

import java.util.List;

public interface BrandService {
    List<BrandResponse> getBrandByCategoryId(Long categoryId);
    List<BrandResponse> getBrandByCategoryName(String categoryName);
}
