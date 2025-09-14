package com.sellphones.specification;

import com.sellphones.entity.product.Review;
import org.springframework.data.jpa.domain.Specification;

public class ReviewSpecificationBuilder {

    public static Specification<Review> build(Long productVariantId, Boolean hasPhotos, Integer ratingScore){

        Specification<Review> spec = (root, query, cb) -> cb.conjunction();
        spec = spec.and(hasProductVariantId(productVariantId));
        if(hasPhotos != null){
            spec = spec.and(hasPhotos(hasPhotos));
        }
        if(ratingScore != null){
            spec = spec.and(hasRatingScore(ratingScore));
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

}
