package com.sellphones.service.promotion.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.promotion.admin.AdminProductPromotionFilterRequest;
import com.sellphones.dto.promotion.admin.AdminProductPromotionRequest;
import com.sellphones.dto.promotion.admin.AdminProductPromotionResponse;
import com.sellphones.entity.promotion.ProductPromotion;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.ProductPromotionMapper;
import com.sellphones.repository.promotion.ProductPromotionRepository;
import com.sellphones.specification.admin.AdminProductPromotionSpecificationBuilder;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminProductPromotionServiceImpl implements AdminProductPromotionService{

    private final ProductPromotionRepository productPromotionRepository;

    private final ProductPromotionMapper productPromotionMapper;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('PROMOTIONS.PRODUCT_PROMOTIONS.VIEW')")
    public PageResponse<AdminProductPromotionResponse> getProductPromotions(AdminProductPromotionFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC); // default
        Sort sort = Sort.by(direction, "name");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<ProductPromotion> spec = AdminProductPromotionSpecificationBuilder.build(request);

        Page<ProductPromotion> promotionPage = productPromotionRepository.findAll(spec, pageable);
        List<ProductPromotion> promotions = promotionPage.getContent();
        List<AdminProductPromotionResponse> response = promotions.stream()
                .map(p -> modelMapper.map(p, AdminProductPromotionResponse.class))
                .toList();

        return PageResponse.<AdminProductPromotionResponse>builder()
                .result(response)
                .total(promotionPage.getTotalElements())
                .totalPages(promotionPage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('PROMOTIONS.PRODUCT_PROMOTIONS.CREATE')")
    public void createProductPromotion(AdminProductPromotionRequest request) {
        ProductPromotion promotion = productPromotionMapper.mapToProductPromotionEntity(request);
        productPromotionRepository.save(promotion);
    }

    @Override
    @PreAuthorize("hasAuthority('PROMOTIONS.PRODUCT_PROMOTIONS.EDIT')")
    public void editProductPromotion(AdminProductPromotionRequest request, Long id) {
        ProductPromotion promotion = productPromotionRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_PROMOTION_NOT_FOUND));

        ProductPromotion editedPromotion = productPromotionMapper.mapToProductPromotionEntity(request);
        editedPromotion.setId(id);
        editedPromotion.setCreatedAt(promotion.getCreatedAt());

        productPromotionRepository.save(editedPromotion);
    }

    @Override
    @PreAuthorize("hasAuthority('PROMOTIONS.PRODUCT_PROMOTIONS.DELETE')")
    public void deleteProductPromotion(Long id) {
        productPromotionRepository.deleteById(id);
    }

}
