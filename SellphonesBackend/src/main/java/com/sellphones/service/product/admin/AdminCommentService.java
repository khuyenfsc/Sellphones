package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.AdminCommentFilterRequest;
import com.sellphones.dto.product.admin.AdminCommentRequest;
import com.sellphones.dto.product.admin.AdminCommentResponse;
import com.sellphones.dto.product.admin.AdminEditingCommentRequest;

import java.util.List;

public interface AdminCommentService {
    PageResponse<AdminCommentResponse> getComments(AdminCommentFilterRequest request);
    void replyComment(AdminCommentRequest request, Long commentId);
    void editComment(AdminEditingCommentRequest request, Long commentId);
    void deleteComment(Long commentId);
}
