package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.FilterRequest;
import com.sellphones.dto.product.ProductDetailsResponse;
import com.sellphones.dto.product.ProductListResponse;
import com.sellphones.dto.product.ProductVariantResponse;
import com.sellphones.entity.product.Product;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.ProductRepository;
import com.sellphones.repository.product.ProductVariantRepository;
import com.sellphones.specification.ProductSpecificationBuilder;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    private final ProductVariantRepository productVariantRepository;

    private final ModelMapper modelMapper;

    private final String thumbnailFolderName = "product_thumbnails";

    @Override
    public List<ProductListResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(product -> modelMapper.map(product, ProductListResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductListResponse> getFeaturedProductsByCategory(String categoryName) {
        Boolean isFeatured = true;
        List<Product> featuredProducts = productRepository.findFirst10ByCategory_NameAndIsFeatured(categoryName, isFeatured);

        return featuredProducts.stream()
                .map(fp -> {
                    fp.setThumbnail(ImageNameToImageUrlConverter.convert(fp.getThumbnail(), thumbnailFolderName));
                    return modelMapper.map(fp, ProductListResponse.class);
                })
                .collect(Collectors.toList());
    }

    @Override
    public PageResponse<ProductListResponse> getProductByFilter(FilterRequest filter) {
        Specification<Product> productSpec = ProductSpecificationBuilder.build(filter.getQuery());
        Sort.Direction direction = Sort.Direction.fromOptionalString(filter.getSort())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "thumbnailProduct.currentPrice");

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
