package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminCommentFilterRequest;
import com.sellphones.dto.product.admin.AdminCommentRequest;
import com.sellphones.dto.product.admin.AdminCommentResponse;
import com.sellphones.dto.product.admin.AdminUpdateCommentRequest;

public interface AdminCommentService {
    PageResponse<AdminCommentResponse> getComments(AdminCommentFilterRequest request);
    void replyComment(AdminCommentRequest request, Long commentId);
    void editComment(AdminUpdateCommentRequest request, Long commentId);
    void deleteComment(Long commentId);
}
