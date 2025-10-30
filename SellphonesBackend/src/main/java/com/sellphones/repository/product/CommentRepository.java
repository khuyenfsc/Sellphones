package com.sellphones.repository.product;

import com.sellphones.entity.product.Comment;
import com.sellphones.entity.product.CommentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Long>, JpaSpecificationExecutor<Comment> {
    @Query("SELECT c FROM Comment c WHERE c.product.id = :productId AND c.parentComment IS NULL AND c.status = 'APPROVED'")
    Page<Comment> findByProductId(Long productId, Pageable pageable);

    Page<Comment> findByStatusAndParentComment_Id(CommentStatus status, Long parentId, Pageable pageable);
}
