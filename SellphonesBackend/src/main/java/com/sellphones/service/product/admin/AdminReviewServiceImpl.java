package com.sellphones.service.product.admin;

import com.sellphones.constant.AppConstants;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminReview_FilterRequest;
import com.sellphones.dto.product.admin.AdminUpdateReviewRequest;
import com.sellphones.dto.product.admin.AdminReviewResponse;
import com.sellphones.entity.product.Review;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.ReviewRepository;
import com.sellphones.specification.admin.AdminReviewSpecificationBuilder;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import jakarta.transaction.Transactional;
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
public class AdminReviewServiceImpl implements AdminReviewService{

    private final ReviewRepository reviewRepository;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('CUSTOMER.REVIEWS')")
    public PageResponse<AdminReviewResponse> getReviews(AdminReview_FilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "createdAt", "id");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Review> spec = AdminReviewSpecificationBuilder.build(request);

        Page<Review> reviewPage = reviewRepository.findAll(spec, pageable);

        List<AdminReviewResponse> response = reviewPage.getContent().stream()
                .map(r ->
                    {
                        r.setImageNames(
                                r.getImageNames().stream()
                                        .map(i -> ImageNameToImageUrlConverter.convert(i, AppConstants.REVIEW_IMAGE_FOLDER))
                                        .toList()
                        );
                        return modelMapper.map(r, AdminReviewResponse.class);
                    }
                ).toList();

        return PageResponse.<AdminReviewResponse>builder()
                .result(response)
                .total(reviewPage.getTotalElements())
                .totalPages(reviewPage.getTotalPages())
                .build();

    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CUSTOMER.REVIEWS')")
    public void updateReview(AdminUpdateReviewRequest request, Long reviewId) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_FOUND));
        review.setStatus(request.getStatus());
    }

    @Override
    @PreAuthorize("hasAuthority('CUSTOMER.REVIEWS')")
    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }


}
