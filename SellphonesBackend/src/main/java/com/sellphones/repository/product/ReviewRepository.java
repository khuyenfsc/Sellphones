package com.sellphones.repository.product;

import com.sellphones.entity.product.RatingStats;
import com.sellphones.entity.product.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long>, JpaSpecificationExecutor<Review> {
    @Query(value = """
        SELECT rv.rating_score AS ratingScore, COUNT(rv.id) AS total
        FROM review rv
        JOIN product_variant pv ON pv.id = rv.product_variant_id
        WHERE pv.id = :variantId AND rv.status = 'APPROVED'
        GROUP BY rv.rating_score
        ORDER BY rv.rating_score
    """, nativeQuery = true)
    List<RatingStats> findRatingStatsByVariantId(@Param("variantId") Long variantId);
}
