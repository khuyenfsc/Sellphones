package com.sellphones.elasticsearch.impl;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.ProductDocumentResponse;
import com.sellphones.dto.product.ProductListResponse;
import com.sellphones.elasticsearch.CustomProductDocumentRepository;
import com.sellphones.elasticsearch.ProductDocument;
import com.sellphones.elasticsearch.ProductDocumentRepository;
import com.sellphones.elasticsearch.ProductDocumentService;
import com.sellphones.entity.product.Product;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.ProductRepository;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductDocumentServiceImpl implements ProductDocumentService {

    private final Integer MAX_SIZE_RESULT = 4;

    private final ProductRepository productRepository;

    private final CustomProductDocumentRepository customProductDocumentRepository;

    private final ModelMapper modelMapper;

    private final String productThumbnailFolder = "product_thumbnails";

    @Override
    public List<ProductDocumentResponse> getSuggestedProducts(String keyword) {
        List<ProductDocument> products = customProductDocumentRepository.getSuggestedProducts(keyword);
        return products.stream()
                .map(p -> modelMapper.map(p, ProductDocumentResponse.class))
                .toList();
    }

    @Override
    public List<ProductListResponse> getSimilarProducts(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        List<ProductDocument> products =  customProductDocumentRepository.getSimilarProducts(product);
        return products.stream()
                .map(p ->{
                            p.setThumbnail(ImageNameToImageUrlConverter.convert(p.getThumbnail(), productThumbnailFolder));
                            return modelMapper.map(p, ProductListResponse.class);
                        }
                ).toList();
    }

    @Override
    public PageResponse<ProductListResponse> searchProductsByKeyword(String keyword, Integer page, String sortType) {
        Pageable pageable = PageRequest.of(page, MAX_SIZE_RESULT);
        List<ProductDocument> products = customProductDocumentRepository.getProductsByKeyword(keyword, pageable, sortType);
        List<ProductListResponse> response = products.stream()
                .map(p -> modelMapper.map(p, ProductListResponse.class))
                .toList();
        return PageResponse.<ProductListResponse>builder()
                .result(response)
                .build();
    }




}
