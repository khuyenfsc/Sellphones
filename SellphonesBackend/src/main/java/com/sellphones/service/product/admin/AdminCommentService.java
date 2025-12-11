package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminComment_FilterRequest;
import com.sellphones.dto.product.admin.AdminCommentRequest;
import com.sellphones.dto.product.admin.AdminCommentResponse;
import com.sellphones.dto.product.admin.AdminUpdateCommentRequest;

public interface AdminCommentService {
    PageResponse<AdminCommentResponse> getComments(AdminComment_FilterRequest request);
    void replyComment(AdminCommentRequest request, Long commentId);
    void updateComment(AdminUpdateCommentRequest request, Long commentId);
    void deleteComment(Long commentId);
}
