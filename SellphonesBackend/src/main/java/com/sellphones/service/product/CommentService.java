package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.request.NewCommentRequest;
import com.sellphones.dto.product.request.ReplyCommentRequest;
import com.sellphones.dto.product.response.CommentResponse;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentService {
    PageResponse<CommentResponse> getCommentByProduct(@Param("productId") Long productId, Integer page, Integer size);
    void addNewComment(NewCommentRequest newCommentRequest);
    void replyComment(ReplyCommentRequest replyCommentRequest);
}
