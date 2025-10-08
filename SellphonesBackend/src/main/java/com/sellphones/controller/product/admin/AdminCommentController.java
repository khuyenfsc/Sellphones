package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.product.admin.AdminCommentFilterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/comments")
public class AdminCommentController {

    @GetMapping
    public ResponseEntity<CommonResponse> getComments(AdminCommentFilterRequest request){

    }

}
