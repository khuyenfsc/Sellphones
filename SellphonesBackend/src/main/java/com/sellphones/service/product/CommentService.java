package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.response.CommentResponse;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentService {
    PageResponse<CommentResponse> getCommentByProduct(@Param("productId") Long productId, Integer page, Integer size);
}
