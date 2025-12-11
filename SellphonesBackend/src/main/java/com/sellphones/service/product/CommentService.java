package com.sellphones.service.product;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.CommentRequest;
import com.sellphones.dto.product.ReplyCommentRequest;
import com.sellphones.dto.product.CommentResponse;

public interface CommentService {
    PageResponse<CommentResponse> getCommentByProduct(Long productId, Integer page, Integer size);
    PageResponse<CommentResponse> getCommentsByParentCommentId(Long parentId, Integer page, Integer size);
    CommentResponse addNewComment(CommentRequest newCommentRequest);
    CommentResponse replyComment(ReplyCommentRequest replyCommentRequest);
}
