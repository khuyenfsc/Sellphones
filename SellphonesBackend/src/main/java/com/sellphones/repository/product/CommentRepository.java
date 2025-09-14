package com.sellphones.repository.product;

import com.sellphones.entity.product.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c WHERE c.product.id = :productId AND c.parentComment IS NULL")
    Page<Comment> findByProductId(Long productId, Pageable pageable);
}
