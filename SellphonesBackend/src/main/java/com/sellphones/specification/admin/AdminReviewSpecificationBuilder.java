package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminReviewFilterRequest;
import com.sellphones.entity.product.Review;
import com.sellphones.entity.product.ReviewStatus;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class AdminReviewSpecificationBuilder {
    public static Specification<Review> build(AdminReviewFilterRequest request){
        Specification<Review> spec = (root, query, cb) -> cb.conjunction();

        if(request.getKeyword() != null){
            spec = spec.and(containsKeyword(request.getKeyword()));
        }

        if(request.getStartDate() != null && request.getEndDate() != null){
            spec = spec.and(hasDateBetween(request.getStartDate(), request.getEndDate()));
        }

        if(request.getVariantId() != null){
            spec = spec.and(hasVariantId(request.getVariantId()));
        }

        if(request.getUserId() != null){
            spec = spec.and(hasUserId(request.getUserId()));
        }

        if(request.getStatus() != null){
            spec = spec.and(hasStatus(request.getStatus()));
        }

        if(request.getRatingScore() != null){
            spec = spec.and(hasRatingScore(request.getRatingScore()));
        }

        return spec;
    }



    public static Specification<Review> containsKeyword(String keyword){
        return (root, query, cb) -> cb.like(cb.lower(root.get("content")), "%" + keyword.toLowerCase() + "%");
    }

    public static Specification<Review> hasDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("createdAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
    }

    public static Specification<Review> hasUserId(Long userId){
        return (root, query, cb) -> cb.equal(root.get("user").get("id"), userId);
    }

    public static Specification<Review> hasVariantId(Long variantId){
        return (root, query, cb) -> cb.equal(root.get("productVariant").get("id"), variantId);
    }

    public static Specification<Review> hasStatus(ReviewStatus status){
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    public static Specification<Review> hasRatingScore(Integer ratingScore){
        return (root, query, cb) -> cb.equal(root.get("ratingScore"), ratingScore);
    }

}
