package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.NewCommentRequest;
import com.sellphones.dto.product.ReplyCommentRequest;
import com.sellphones.dto.product.CommentResponse;
import org.springframework.data.repository.query.Param;

public interface CommentService {
    PageResponse<CommentResponse> getCommentByProduct(Long productId, Integer page, Integer size);
    PageResponse<CommentResponse> getCommentsByParentCommentId(Long parentId, Integer page, Integer size);
    CommentResponse addNewComment(NewCommentRequest newCommentRequest);
    CommentResponse replyComment(ReplyCommentRequest replyCommentRequest);
}
