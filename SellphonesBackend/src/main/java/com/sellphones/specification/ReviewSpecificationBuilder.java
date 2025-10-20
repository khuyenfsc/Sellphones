package com.sellphones.specification;

import com.sellphones.dto.product.ReviewFilterRequest;
import com.sellphones.entity.product.Review;
import com.sellphones.entity.product.ReviewStatus;
import org.springframework.data.jpa.domain.Specification;

public class ReviewSpecificationBuilder {

    public static Specification<Review> build(ReviewFilterRequest request){

        Specification<Review> spec = (root, query, cb) -> cb.conjunction();

        spec = spec.and(hasProductVariantId(request.getProductVariantId()));

        spec = spec.and(hasStatus(ReviewStatus.APPROVED));

        if(request.getHasPhotos() != null){
            spec = spec.and(hasPhotos(request.getHasPhotos()));
        }
        if(request.getRatingScore() != null){
            spec = spec.and(hasRatingScore(request.getRatingScore()));
        }

        return spec;
    }

    public static Specification<Review> hasProductVariantId(Long productVariantId){
        return (root, query, cb) -> cb.equal(root.get("productVariant").get("id"), productVariantId);
    }

    public static Specification<Review> hasPhotos(Boolean hasPhotos){
        return (root, query, cb) -> {
            query.distinct(true);

            if(hasPhotos){
                return cb.isNotEmpty(root.get("imageUrls"));
            }else{
                return cb.isEmpty(root.get("imageUrls"));
            }
        };
    }

    public static Specification<Review> hasRatingScore(Integer ratingScore) {
        return (root, query, cb) -> cb.equal(root.get("ratingScore"), ratingScore);
    }

    public static Specification<Review> hasStatus(ReviewStatus status) {
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }
}
