package com.sellphones.elasticsearch.impl;

import com.sellphones.dto.product.admin.AdminProductFilterRequest;
import com.sellphones.dto.product.response.ProductListResponse;
import com.sellphones.elasticsearch.AdminProductDocumentService;
import com.sellphones.elasticsearch.CustomProductDocumentRepository;
import com.sellphones.elasticsearch.ProductDocument;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminProductDocumentServiceImpl implements AdminProductDocumentService {

    private final CustomProductDocumentRepository customProductDocumentRepository;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("CATALOG.PRODUCTS.VIEW")
    public List<ProductListResponse> getProducts(AdminProductFilterRequest request) {
        List<ProductDocument> products = customProductDocumentRepository.getProductsWithAdminAuthority(request);
        return products.stream()
                .map(p -> modelMapper.map(p, ProductListResponse.class))
                .toList();
    }
}
