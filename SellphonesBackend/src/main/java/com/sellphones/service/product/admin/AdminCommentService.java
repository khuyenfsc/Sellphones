package com.sellphones.service.product.admin;

import com.sellphones.dto.product.admin.AdminCommentFilterRequest;
import com.sellphones.dto.product.admin.AdminCommentResponse;

import java.util.List;

public interface AdminCommentService {
    List<AdminCommentResponse> getComments(AdminCommentFilterRequest request);
}
