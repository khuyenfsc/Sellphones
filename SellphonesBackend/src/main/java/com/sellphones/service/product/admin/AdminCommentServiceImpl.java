package com.sellphones.service.product.admin;

import com.sellphones.dto.product.admin.AdminCommentFilterRequest;
import com.sellphones.dto.product.admin.AdminCommentResponse;
import com.sellphones.dto.product.admin.AdminReviewResponse;
import com.sellphones.entity.product.Review;
import com.sellphones.repository.product.CommentRepository;
import com.sellphones.specification.admin.AdminReviewSpecificationBuilder;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import lombok.RequiredArgsConstructor;
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
public class AdminCommentServiceImpl implements AdminCommentService{

    private final CommentRepository commentRepository;

    @Override
    @PreAuthorize("hasAuthority('CLIENTS.COMMENTS.VIEW')")
    public List<AdminCommentResponse> getComments(AdminCommentFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Review> spec = AdminReviewSpecificationBuilder.build(request);

        Page<Review> reviewPage = reviewRepository.findAll(spec, pageable);
        List<Review> reviews = reviewPage.getContent();

        return reviewPage.getContent().stream()
                .map(r).toList();
    }
}
