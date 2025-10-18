package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminReviewFilterRequest;
import com.sellphones.dto.product.admin.AdminReviewRequest;
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

    private final String reviewImageFolderName = "reviews";

    @Override
    @PreAuthorize("hasAuthority('CUSTOMER.REVIEWS.VIEW')")
    public PageResponse<AdminReviewResponse> getReviews(AdminReviewFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC); // default
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Review> spec = AdminReviewSpecificationBuilder.build(request);

        Page<Review> reviewPage = reviewRepository.findAll(spec, pageable);
        List<Review> reviews = reviewPage.getContent();

        List<AdminReviewResponse> response = reviewPage.getContent().stream()
                .map(r ->
                    {
                        r.setImageNames(
                                r.getImageNames().stream()
                                        .map(i -> ImageNameToImageUrlConverter.convert(i, reviewImageFolderName))
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
    @PreAuthorize("hasAuthority('CUSTOMER.REVIEWS.EDIT')")
    public void editReview(AdminReviewRequest request, Long reviewId) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_FOUND));
        System.out.println("status " + request.getStatus());
        review.setStatus(request.getStatus());
    }

    @Override
    @PreAuthorize("hasAuthority('CUSTOMER.REVIEWS.DELETE')")
    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }


}
