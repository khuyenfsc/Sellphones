package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.response.ReviewResponse;
import com.sellphones.entity.product.Product;
import com.sellphones.entity.product.Review;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.ProductVariantRepository;
import com.sellphones.repository.product.ReviewRepository;
import com.sellphones.specification.ReviewSpecificationBuilder;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;

    private final ProductVariantRepository productVariantRepository;

    private final ModelMapper modelMapper;

    @Override
    public PageResponse<ReviewResponse> getReviewsByConditions(Long productVariantId, Boolean hasPhotos, Integer ratingScore, Integer page, Integer size) {
        Specification<Review> spec = ReviewSpecificationBuilder.build(productVariantId, hasPhotos, ratingScore);
        Sort.Direction direction = Sort.Direction.DESC;
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Review> reviewPage = reviewRepository.findAll(spec, pageable);
        List<Review> reviews = reviewPage.getContent();
        List<ReviewResponse> responses = reviews.stream().map(r -> modelMapper.map(r, ReviewResponse.class)).toList();

        return PageResponse.<ReviewResponse>builder()
                .result(responses)
                .total(reviewPage.getTotalElements())
                .build();
    }


}
