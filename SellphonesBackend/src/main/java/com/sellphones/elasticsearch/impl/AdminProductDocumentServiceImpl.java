package com.sellphones.elasticsearch.impl;

import com.sellphones.dto.product.admin.AdminProductFilter_Request;
import com.sellphones.dto.product.ProductListResponse;
import com.sellphones.elasticsearch.AdminProductDocumentService;
import com.sellphones.elasticsearch.CustomProductDocumentRepository;
import com.sellphones.elasticsearch.ProductDocument;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminProductDocumentServiceImpl implements AdminProductDocumentService {

    private final CustomProductDocumentRepository customProductDocumentRepository;

    private final ModelMapper modelMapper;

    private final String productThumbnailFolder = "product_thumbnails";

    @Override
    @PreAuthorize("CATALOG.PRODUCTS.VIEW")
    public List<ProductListResponse> getProducts(AdminProductFilter_Request request) {
        List<ProductDocument> products = customProductDocumentRepository.getProductsWithAdminAuthority(request);
        products.forEach(p -> p.setThumbnail(ImageNameToImageUrlConverter.convert(p.getThumbnail(), productThumbnailFolder)));
        return products.stream()
                .map(p -> modelMapper.map(p, ProductListResponse.class))
                .toList();
    }

    @Override
    public void deleteProduct(Long productId) {
        customProductDocumentRepository.deleteProduct(productId);
    }
}
