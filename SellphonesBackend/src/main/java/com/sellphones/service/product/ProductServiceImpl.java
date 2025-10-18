package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminInventoryResponse;
import com.sellphones.dto.product.request.FilterRequest;
import com.sellphones.dto.product.response.ProductDetailsResponse;
import com.sellphones.dto.product.response.ProductListResponse;
import com.sellphones.dto.product.response.ProductVariantResponse;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.product.Product;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.ProductRepository;
import com.sellphones.repository.product.ProductVariantRepository;
import com.sellphones.specification.ProductSpecificationBuilder;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    private final ProductVariantRepository productVariantRepository;

    private final ModelMapper modelMapper;

    @Override
    public List<ProductListResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(product -> modelMapper.map(product, ProductListResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductListResponse> getFeaturedProductsByCategory(Long categoryId) {
        Boolean isFeatured = true;
        List<Product> featuredProducts = productRepository.findFirst10ByCategoryIdAndIsFeatured(categoryId, isFeatured);
        return featuredProducts.stream()
                .map(fp -> modelMapper.map(fp, ProductListResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public PageResponse<ProductListResponse> getProductByFilter(FilterRequest filter) {
        Specification<Product> productSpec = ProductSpecificationBuilder.build(filter.getQuery());
        Sort.Direction direction = Sort.Direction.fromOptionalString(filter.getSort())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "minPrice");

        Pageable pageable = PageRequest.of(filter.getPage(), filter.getSize(), sort);

        Page<Product> productPage = productRepository.findAll(productSpec, pageable);
        List<Product> products = productPage.getContent();
        List<ProductListResponse> response = products.stream()
                .map(p -> modelMapper.map(p, ProductListResponse.class))
                .collect(Collectors.toList());

        return PageResponse.<ProductListResponse>builder()
                .result(response)
                .total(productPage.getTotalElements())
                .totalPages(productPage.getTotalPages())
                .build();
    }

    @Override
    public ProductDetailsResponse getProductById(Long id) {
        Product product = productRepository.findById(id).orElseThrow( () -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        return modelMapper.map(product, ProductDetailsResponse.class);
    }

    @Override
    public ProductVariantResponse getProductVariantById(Long id) {
        ProductVariant productVariant = productVariantRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        return modelMapper.map(productVariant, ProductVariantResponse.class);
    }


}
