package com.sellphones.specification.admin;

import com.sellphones.dto.product.admin.AdminCommentFilterRequest;
import com.sellphones.entity.product.Comment;
import com.sellphones.entity.product.CommentStatus;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class AdminCommentSpecificationBuilder {
    public static Specification<Comment> build(AdminCommentFilterRequest request){
        Specification<Comment> spec = (root, query, cb) -> cb.conjunction();

        if(request.getParentId() != null){
            spec = spec.and(hasParentId(request.getParentId()));
        }

        if(request.getKeyword() != null){
            spec = spec.and(containsKeyword(request.getKeyword()));
        }

        if(request.getStartDate() != null && request.getEndDate() != null){
            spec = spec.and(hasDateBetween(request.getStartDate(), request.getEndDate()));
        }

        if(request.getProductId() != null){
            spec = spec.and(hasProductId(request.getProductId()));
        }

        if(request.getUserId() != null){
            spec = spec.and(hasUserId(request.getUserId()));
        }

        if(request.getStatus() != null){
            spec = spec.and(hasStatus(request.getStatus()));
        }

        if(request.getIsReplied() != null){
            spec = spec.and(isReplied(request.getIsReplied()));
        }

        return spec;
    }

    public static Specification<Comment> containsKeyword(String keyword){
        return (root, query, cb) -> cb.like(cb.lower(root.get("content")), "%" + keyword.toLowerCase() + "%");
    }

    public static Specification<Comment> hasDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("createdAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
    }

    public static Specification<Comment> hasUserId(Long userId){
        return (root, query, cb) -> cb.equal(root.get("user").get("id"), userId);
    }

    public static Specification<Comment> hasProductId(Long productId){
        return (root, query, cb) -> cb.equal(root.get("productVariant").get("id"), productId);
    }

    public static Specification<Comment> hasStatus(CommentStatus status){
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    public static Specification<Comment> isReplied(Boolean isReplied){
        return (root, query, cb) -> cb.equal(root.get("isReplied"), isReplied);
    }

    public static Specification<Comment> hasParentId(Long parentId){
        return (root, query, cb) -> cb.equal(root.get("parentComment").get("id"), parentId);
    }
}
