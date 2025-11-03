package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.*;
import com.sellphones.elasticsearch.CustomProductDocumentRepository;
import com.sellphones.elasticsearch.ProductDocument;
import com.sellphones.entity.product.Product;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.product.ProductVariantStatus;
import com.sellphones.entity.promotion.GiftProduct;
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

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    private final CustomProductDocumentRepository customProductDocumentRepository;

    private final ProductVariantRepository productVariantRepository;

    private final ModelMapper modelMapper;

    private final String thumbnailFolderName = "product_thumbnails";

    private final String productImagesFolder = "product_images";

    private final String productVariantImageFolder = "product_variant_images";

    private final String giftProductThumbnailFolder = "gift_products";

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
                .map(this::mapToProductListResponse)
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
                .map(this::mapToProductListResponse)
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

        List<ProductVariant> variants = product.getProductVariants();
        product.setProductVariants(
                variants.stream().filter(v -> v.getStatus() == ProductVariantStatus.ACTIVE).toList()
        );

        List<String> images = new ArrayList<>();
        for(String image : product.getImages()){
            images.add(ImageNameToImageUrlConverter.convert(image, productImagesFolder));
        }
        product.setImages(images);

        return modelMapper.map(product, ProductDetailsResponse.class);
    }

    @Override
    public ProductVariantResponse getProductVariantById(Long id) {
        ProductVariant productVariant = productVariantRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        productVariant.setVariantImage(ImageNameToImageUrlConverter.convert(productVariant.getVariantImage(), productVariantImageFolder));
        for(GiftProduct giftProduct : productVariant.getGiftProducts()){
            giftProduct.setThumbnail(ImageNameToImageUrlConverter.convert(giftProduct.getThumbnail(), giftProductThumbnailFolder));
        }
        return modelMapper.map(productVariant, ProductVariantResponse.class);
    }

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
                            p.setThumbnail(ImageNameToImageUrlConverter.convert(p.getThumbnail(), thumbnailFolderName));
                            return modelMapper.map(p, ProductListResponse.class);
                        }
                ).toList();
    }

    @Override
    public PageResponse<ProductListResponse> searchProductsByKeyword(String keyword, Integer page, Integer size, String sortType) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductDocument> products = customProductDocumentRepository.getProductsByKeyword(keyword, pageable, sortType);
        List<ProductListResponse> response = products.getContent().stream()
                .map(p ->{
                            p.setThumbnail(ImageNameToImageUrlConverter.convert(p.getThumbnail(), thumbnailFolderName));
                            return modelMapper.map(p, ProductListResponse.class);
                        }
                ).toList();
        return PageResponse.<ProductListResponse>builder()
                .result(response)
                .totalPages(products.getTotalPages())
                .total(products.getTotalElements())
                .build();
    }

    private ProductListResponse mapToProductListResponse(Product product){
        ProductListResponse res = modelMapper.map(product, ProductListResponse.class);
        res.setThumbnail(ImageNameToImageUrlConverter.convert(res.getThumbnail(), thumbnailFolderName));

        ProductVariant thumbnailProduct = product.getThumbnailProduct();
        if(thumbnailProduct != null){
            res.setRootPrice(product.getThumbnailProduct().getRootPrice());
            res.setCurrentPrice(product.getThumbnailProduct().getCurrentPrice());
        }

        return res;
    }

}
